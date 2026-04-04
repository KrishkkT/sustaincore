import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CACHE_PATH = path.join(__dirname, 'translations-cache.json');
const ROOT_INIT_PATH = path.join(__dirname, '../sustain-translations-init.json');
const API_INIT_PATH = path.join(__dirname, 'sustain-translations-init.json');

// Global lookup table (Lazy load and merge)
let translationInit = null;
function getInitLookup() {
    if (translationInit) return translationInit;
    translationInit = {};
    
    // Load Root large dictionary
    try {
        if (fs.existsSync(ROOT_INIT_PATH)) {
            const root = JSON.parse(fs.readFileSync(ROOT_INIT_PATH, 'utf8'));
            Object.assign(translationInit, root);
        }
    } catch (e) {}

    // Load API local Hardcoded dictionary (Higher Priority)
    try {
        if (fs.existsSync(API_INIT_PATH)) {
            const apiLocal = JSON.parse(fs.readFileSync(API_INIT_PATH, 'utf8'));
            Object.assign(translationInit, apiLocal);
        }
    } catch (e) {}

    console.log(`[Translate API] Dictionary merged: ${Object.keys(translationInit).length} keys.`);
    return translationInit;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { texts, targetLang } = req.body;
    
    if (!texts || !Array.isArray(texts) || !targetLang) {
        return res.status(400).json({ error: 'Invalid Request: texts (array) and targetLang (string) are required.' });
    }

    if (targetLang === 'en') {
        return res.json({ translated: texts });
    }

    try {
        const cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
        const initDict = getInitLookup();
        
        const results = [];
        const missingIndices = [];
        const missingTexts = [];

        // 1. Triple-Layer Lookup: Dictionary -> Local Cache -> AI
        texts.forEach((text, i) => {
            const cacheKey = `${targetLang}:${text}`;
            
            // Priority 1: High-Fidelity Dictionary
            if (initDict[cacheKey] && initDict[cacheKey] !== null) {
                results[i] = initDict[cacheKey];
            } 
            // Priority 2: Persistent Cache
            else if (cache[cacheKey]) {
                results[i] = cache[cacheKey];
            } 
            // Priority 3: Needs AI
            else {
                results[i] = null;
                missingIndices.push(i);
                missingTexts.push(text);
            }
        });

        // 2. If nothing missing, return immediately
        if (missingTexts.length === 0) {
            return res.json({ translated: results });
        }

        // 3. Batch translate missing texts via Groq
        console.log(`[Translate API] Translating ${missingTexts.length} new strings for ${targetLang}...`);
        
        // Split into chunks of 30 to stay within token/prompt limits and ensure quality
        const chunkSize = 30;
        for (let i = 0; i < missingTexts.length; i += chunkSize) {
            const chunk = missingTexts.slice(i, i + chunkSize);
            const translatedChunk = await groqTranslateBatch(chunk, targetLang);
            
            // Map back to results and update cache
            translatedChunk.forEach((trans, j) => {
                const originalIndex = missingIndices[i + j];
                const originalText = chunk[j];
                results[originalIndex] = trans;
                
                const cacheKey = `${targetLang}:${originalText}`;
                cache[cacheKey] = trans;
            });
        }

        // 4. Save Cache
        fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
        
        return res.json({ translated: results });

    } catch (err) {
        console.error('[Translate API] Error:', err.message);
        return res.status(500).json({ success: false, error: err.message });
    }
}

async function groqTranslateBatch(texts, targetLang) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error("GROQ_API_KEY not found in .env");

    const langName = {
        'hi': 'Hindi',
        'gu': 'Gujarati',
        'de': 'German',
        'fr': 'French',
        'es': 'Spanish'
    }[targetLang] || targetLang;

    const prompt = `You are a professional web content translator for SustainCore.
You will receive a JSON array of English strings. Translate each accurately into ${langName}.
Return ONLY a valid JSON object with a single key "translations" which contains the array of translated strings in the EXACT same order. 

Example Input: ["Our Mission", "Join Us"]
Example Output: { "translations": ["हमारा मिशन", "हमसे जुड़ें"] }

Input Array: ${JSON.stringify(texts)}`;

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: 'Output ONLY a JSON object with a "translations" key.' },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.1,
                response_format: { type: "json_object" }
            })
        });

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message || 'Groq API Error');
        }

        const content = data.choices[0].message.content.trim();
        const parsed = JSON.parse(content);
        
        // Handle different possible object structures
        const finalArray = parsed.translations || parsed.translated || Object.values(parsed)[0];
        
        if (!Array.isArray(finalArray) || finalArray.length !== texts.length) {
            console.error('[Translate API] Mismatched array size or invalid format:', content);
            return texts; 
        }

        return finalArray;
    } catch (err) {
        console.error('[Translate API] Groq Fetch Error:', err.message);
        return texts; 
    }
}
