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
    } catch (e) { }

    // Load API local Hardcoded dictionary (Higher Priority)
    try {
        if (fs.existsSync(API_INIT_PATH)) {
            const apiLocal = JSON.parse(fs.readFileSync(API_INIT_PATH, 'utf8'));
            Object.assign(translationInit, apiLocal);
        }
    } catch (e) { }

    console.log(`[Translate API] Dictionary merged: ${Object.keys(translationInit).length} keys.`);
    return translationInit;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { texts } = req.body;

    // AI Dependency has been eliminated in favor of public/translations.json
    // This endpoint now acts as a silent fallback that returns original text.
    return res.json({ translated: texts });
}