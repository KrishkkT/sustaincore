import fs from 'fs';
import path from 'path';

const DB_PATH = path.resolve(process.cwd(), 'api', 'db.json');

function getDb() {
    try {
        if (!fs.existsSync(DB_PATH)) return { subscribers: [], articles: [] };
        return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    } catch {
        return { subscribers: [], articles: [] };
    }
}

function saveDb(db) {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

export default async function handler(request, response) {
    const { method } = request;

    // CORS Headers
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
                if (!newArt.title || !newArt.description) {
                    return response.status(400).json({ success: false, error: "Missing required fields (title, description)" });
                }
                const id = "art-" + Math.random().toString(36).substr(2, 5).toUpperCase();
                const added = {
                    id,
                    title: newArt.title,
                    description: newArt.description,
                    content: newArt.content || newArt.description, // Fallback to description if no content
                    category: newArt.category || "Insight",
                    author: newArt.author || "SustainCore",
                    readTime: newArt.readTime || "4 Min Read",
                    date: newArt.date || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                    accent: newArt.accent || "blue"
                };
                
                db.articles.unshift(added); 
                saveDb(db);

                // [TRIGGER] Broadcast to All Subscribers
                try {
                    const protocol = request.headers['x-forwarded-proto'] || 'http';
                    const host = request.headers.host || 'localhost:3001';
                    const origin = `${protocol}://${host}`;

                    await fetch(`${origin}/api/send-email`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            templateType: 'article',
                            articleData: added
                        })
                    });
                } catch (e) {
                    console.warn("Broadcast trigger failed (Silently continuing):", e);
                }

                return response.status(201).json({ success: true, message: "Article created & Persisted", data: added });

            case 'PATCH':
                const updateId = request.query.id;
                const updateData = request.body;
                const index = db.articles.findIndex(a => a.id === updateId);
                if (index === -1) return response.status(404).json({ success: false, error: "Article not found" });
                db.articles[index] = { ...db.articles[index], ...updateData };
                saveDb(db);
                return response.status(200).json({ success: true, message: "Article updated", data: db.articles[index] });

            case 'DELETE':
                const deleteId = request.query.id;
                db.articles = db.articles.filter(a => a.id !== deleteId);
                saveDb(db);
                return response.status(200).json({ success: true, message: `Article ${deleteId} deleted from disk` });

            default:
                response.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
                return response.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        return response.status(500).json({ success: false, error: error.message });
    }
}
