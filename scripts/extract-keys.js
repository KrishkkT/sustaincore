
import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

const ROOT_DIR = 'v:\\SustainCore';
const LOCALES_DIR = path.join(ROOT_DIR, 'locales');
const SRC_DIR = path.join(ROOT_DIR, 'src');

async function extractKeys() {
    const enDictionary = {};

    // 1. Process all HTML files
    const htmlFiles = getAllFiles(ROOT_DIR, '.html');
    console.log(`Processing ${htmlFiles.length} HTML files...`);

    for (const file of htmlFiles) {
        if (file.includes('node_modules') || file.includes('.git') || file.includes('dist')) continue;
        
        const content = fs.readFileSync(file, 'utf8');
        const $ = cheerio.load(content);

        // Extract [data-i18n]
        $('[data-i18n]').each((i, el) => {
            const key = $(el).attr('data-i18n');
            // For inputs/textareas, we might want placeholder, but data-i18n usually handles textContent
            let text = $(el).html().trim().replace(/\s+/g, ' ');
            if (key && text) {
                // If it's a simple key but actually a placeholder (e.g. newsletter email)
                if ($(el).is('input') || $(el).is('textarea')) {
                    text = $(el).attr('placeholder') || text;
                }
                setNestedValue(enDictionary, key, text);
            }
        });

        // Extract [data-i18n-attr]
        $('[data-i18n-attr]').each((i, el) => {
            const attrData = $(el).attr('data-i18n-attr');
            const pairs = attrData.split(',').map(p => p.trim());
            pairs.forEach(pair => {
                const [attr, key] = pair.split(':').map(s => s.trim());
                const val = $(el).attr(attr);
                if (key && val) {
                    setNestedValue(enDictionary, key, val);
                }
            });
        });
    }

    // 2. Process JS files for component templates (special case for components.js)
    const componentFile = path.join(SRC_DIR, 'js', 'components.js');
    if (fs.existsSync(componentFile)) {
        const content = fs.readFileSync(componentFile, 'utf8');
        // Extract data-i18n from JS strings
        const i18nRegex = /data-i18n="([^"]+)"[^>]*>(.*?)<\//g;
        let match;
        while ((match = i18nRegex.exec(content)) !== null) {
            const key = match[1];
            const text = match[2].trim().replace(/\s+/g, ' ');
            setNestedValue(enDictionary, key, text);
        }
        
        // Also check if components.js has data-i18n-attr
        const i18nAttrRegex = /data-i18n-attr="([^"]+)"/g;
        let attrMatch;
        while ((attrMatch = i18nAttrRegex.exec(content)) !== null) {
            const attrData = attrMatch[1];
            const pairs = attrData.split(',').map(p => p.trim());
            pairs.forEach(pair => {
                const [attr, key] = pair.split(':').map(s => s.trim());
                // We can't easily get the value from JS string without parsing it, but we can at least ensure the key exists in en.json
                if (key) {
                    setNestedValue(enDictionary, key, ""); // Placeholder for manual check
                }
            });
        }
    }

    // Write en.json
    if (!fs.existsSync(LOCALES_DIR)) fs.mkdirSync(LOCALES_DIR);
    fs.writeFileSync(path.join(LOCALES_DIR, 'en.json.extracted'), JSON.stringify(enDictionary, null, 2));
    console.log('Successfully extracted keys to locales/en.json.extracted');
}

function getAllFiles(dirPath, extension, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
                arrayOfFiles = getAllFiles(fullPath, extension, arrayOfFiles);
            }
        } else {
            if (file.endsWith(extension)) {
                arrayOfFiles.push(fullPath);
            }
        }
    });

    return arrayOfFiles;
}

function setNestedValue(obj, key, value) {
    const parts = key.split('.');
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
    }
    const lastPart = parts[parts.length - 1];
    if (!current[lastPart]) {
        current[lastPart] = value;
    }
}

extractKeys();
