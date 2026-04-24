import fs from 'fs';
import path from 'path';

const IS_VERCEL = process.env.VERCEL === '1';
const DB_PATH = IS_VERCEL 
    ? path.join('/tmp', 'db.json') 
    : path.resolve(process.cwd(), 'api', 'db.json');

function getDb() {
    try {
        if (!fs.existsSync(DB_PATH)) {
            if (IS_VERCEL) {
                const bundlePath = path.resolve(process.cwd(), 'api', 'db.json');
                if (fs.existsSync(bundlePath)) {
                    fs.copyFileSync(bundlePath, DB_PATH);
                } else {
                    return { subscribers: [], articles: [] };
                }
            } else {
                return { subscribers: [], articles: [] };
            }
        }
        return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    } catch (e) {
        console.error("DB Read Error:", e);
        return { subscribers: [], articles: [] };
    }
}

function saveDb(db) {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
    } catch (e) {
        console.error("DB Write Error:", e);
        throw e;
    }
}

// Utility for translating long technical articles
async function translateLongText(text, targetLang) {
    if (!text) return "";
    try {
        const { translate } = await import('bing-translate-api');
        // Split into chunks of 1000 chars (safe API limit)
        const chunks = text.match(/[\s\S]{1,1000}/g) || [text];
        const translations = await Promise.all(
            chunks.map(chunk => translate(chunk, null, targetLang).then(res => res.translation))
        );
        return translations.join('');
    } catch (e) {
        console.warn("[API] Translation failed for chunk:", e.message);
        return text; // Fallback to original
    }
}

export default async function handler(request, response) {
    const { method } = request;

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (method === 'OPTIONS') return response.status(200).end();

    try {
        const db = getDb();

        switch (method) {
            case 'GET':
                return response.status(200).json({ success: true, count: db.articles.length, data: db.articles });

            case 'POST':
                const newArt = request.body;
                if (!newArt.title || !newArt.description || !newArt.content) {
                    return response.status(400).json({ success: false, error: "Missing required fields" });
                }

                const points = newArt.content.split('\n').filter(p => p.trim().length > 10);
                if (points.length < 5) {
                    return response.status(400).json({ success: false, error: "Article content is too short. Minimum 5 points." });
                }

                const id = "art-" + Math.random().toString(36).substr(2, 5).toUpperCase();
                
                const title_de = await translateLongText(newArt.title, 'de');
                const description_de = await translateLongText(newArt.description, 'de');
                const content_de = await translateLongText(newArt.content, 'de');

                const added = {
                    id,
                    title: newArt.title, title_de,
                    description: newArt.description, description_de,
                    content: newArt.content, content_de,
                    imageUrl: newArt.imageUrl || "/images/insight-default.png",
                    category: newArt.category || "Insight",
                    author: newArt.author || "SustainCore",
                    readTime: "8 Min Read",
                    date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                    accent: newArt.accent || "blue"
                };
                
                db.articles.unshift(added); 
                saveDb(db);

                // Broadcast
                try {
                    const protocol = request.headers['x-forwarded-proto'] || 'http';
                    const host = request.headers.host || 'localhost:3001';
                    await fetch(`${protocol}://${host}/api/send-email`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ templateType: 'article', articleData: added })
                    });
                } catch (e) {}

                return response.status(201).json({ success: true, data: added });

            case 'PATCH':
                const updateId = request.query.id;
                const updateData = request.body;
                const index = db.articles.findIndex(a => a.id === updateId);
                if (index === -1) return response.status(404).json({ success: false, error: "Not found" });

                if (updateData.title) updateData.title_de = await translateLongText(updateData.title, 'de');
                if (updateData.description) updateData.description_de = await translateLongText(updateData.description, 'de');
                if (updateData.content) updateData.content_de = await translateLongText(updateData.content, 'de');

                db.articles[index] = { ...db.articles[index], ...updateData };
                saveDb(db);
                return response.status(200).json({ success: true, data: db.articles[index] });

            case 'DELETE':
                db.articles = db.articles.filter(a => a.id !== request.query.id);
                saveDb(db);
                return response.status(200).json({ success: true });

            default:
                return response.status(405).end();
        }
    } catch (error) {
        return response.status(500).json({ success: false, error: error.message });
    }
}
