import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Log requests
app.use((req, res, next) => {
    console.log(`\n[API Bridge] ${req.method} ${req.url}`);
    next();
});

// Dynamically load API routes from /api folder
const apiDir = path.join(__dirname, 'api');

if (fs.existsSync(apiDir)) {
    const files = fs.readdirSync(apiDir);
    
    for (const file of files) {
        if (file.endsWith('.js')) {
            const routeName = file.replace('.js', '');
            
            // Register route
            app.all(`/api/${routeName}`, async (req, res) => {
                try {
                    const fullPath = path.resolve(apiDir, file);
                    const moduleUrl = pathToFileURL(fullPath).href;
                    const module = await import(moduleUrl);
                    const handler = module.default;
                    
                    if (typeof handler === 'function') {
                        // Compatibility Bridge: Vercel 'res.status().json()'
                        // Express matches this natively, so we just call the handler
                        await handler(req, res);
                    } else {
                        res.status(500).json({ error: `No default export in ${file}` });
                    }
                } catch (err) {
                    // CRITICAL: Send real error info to the browser for diagnosis
                    console.error(`\n❌ [API Error] /api/${routeName}:`, err.message);
                    console.error(err.stack);
                    
                    res.status(500).json({ 
                        success: false, 
                        error: "Bridge Execution Failure", 
                        details: err.message,
                        stack: err.stack?.split('\n')[1].trim() // Send just the first line of the stack for safety
                    });
                }
            });
            
            console.log(`[API Bridge] Listening for: /api/${routeName}`);
        }
    }
}

app.listen(PORT, () => {
    console.log(`\n🚀 [API Bridge] Listening on http://localhost:${PORT}`);
    console.log(`🤖 [API Bridge] This is your "Drama-Free" local backend. READY.`);
});
