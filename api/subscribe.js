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
        console.error("Subs DB Read Error:", e);
        return { subscribers: [], articles: [] };
    }
}

function saveDb(db) {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
    } catch (e) {
        console.error("Subs DB Write Error:", e);
        throw e;
    }
}

export default async function handler(request, response) {
    const { method } = request;

    // CORS Headers
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (method === 'OPTIONS') return response.status(200).end();

    try {
        if (method === 'GET') {
            const db = getDb();
            return response.status(200).json({ success: true, count: db.subscribers.length, data: db.subscribers });
        }

        if (method === 'POST') {
            const { email } = request.body;

            if (!email || !email.includes('@')) {
                return response.status(400).json({ success: false, error: "Valid corporate email required" });
            }

            // Persistence Loop
            const db = getDb();
            const newSub = { 
                email, 
                date: new Date().toISOString(), 
                source: "Insights Page" 
            };
            
            db.subscribers.unshift(newSub);
            saveDb(db);

            // [TRIGGER] Internal Welcome Email
            try {
                const protocol = request.headers['x-forwarded-proto'] || 'http';
                const host = request.headers.host || 'localhost:3001';
                const origin = `${protocol}://${host}`;
                console.log(`[API Bridge] [DB PERSIST] Triggering Welcome: ${origin}/api/send-email`);
                
                await fetch(`${origin}/api/send-email`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        subscriberEmail: email,
                        templateType: 'welcome'
                    })
                });
            } catch (e) {
                console.warn("Welcome trigger failed (Silently continuing):", e);
            }

            return response.status(200).json({ 
                success: true, 
                message: "Subscription recorded & persisted. Welcome aboard!" 
            });
        }

        if (method === 'DELETE') {
            const { email } = request.query;
            const db = getDb();
            db.subscribers = db.subscribers.filter(s => s.email !== email);
            saveDb(db);
            return response.status(200).json({ success: true, message: `Subscriber ${email} revoked.` });
        }

        response.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        return response.status(405).end(`Method ${method} Not Allowed`);

    } catch (error) {
        console.error("Subscription Error:", error);
        return response.status(500).json({ success: false, error: "Internal Server Error" });
    }
}
