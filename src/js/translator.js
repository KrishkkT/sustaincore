/**
 * SustainTranslator (Zero-Touch Edition)
 * A powerful, client-side translation engine that scans the entire page 
 * and translates it via the /api/translate endpoint using Groq (LLM).
 * Supports persistence, dynamic content, and all 50+ pages automatically.
 */

class SustainTranslator {
    constructor() {
        this.currentLang = localStorage.getItem('sustain-lang') || 'en';
        this.isTranslating = false;
        
        // This will be populated from translations.json
        this.LOCAL_DICTIONARY = {};

        this.langMetadata = {
            'en': { flag: '🇺🇸', label: 'EN' },
            'de': { flag: '🇩🇪', label: 'DE' },
            'fr': { flag: '🇫🇷', label: 'FR' },
            'es': { flag: '🇲🇽', label: 'ES' }
        };

        this.init();
    }

    async init() {
        // 1. Fetch the master dictionary (Zero AI / Zero Cost)
        await this.loadDictionary();

        if (this.currentLang !== 'en') {
            this.translateFullPage(false); 
            
            // MULTI-PASS SANITIZER: Catch race conditions (GSAP, delayed injections)
            [1000, 2500, 5000].forEach(delay => {
                setTimeout(() => this.translateFullPage(false), delay);
            });
        }

        // Observer for dynamic content
        this.observer = new MutationObserver((mutations) => {
            if (this.currentLang === 'en' || this.isTranslating) return;
            
            let shouldScan = false;
            mutations.forEach(m => {
                if (m.type === 'characterData' || m.addedNodes.length > 0) {
                    shouldScan = true;
                }
            });

            if (shouldScan) {
                clearTimeout(this.throttleTimer);
                this.throttleTimer = setTimeout(() => this.translateFullPage(false), 400);
            }
        });

        if (document.body) {
            this.observer.observe(document.body, { childList: true, subtree: true, characterData: true });
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                if (document.body) this.observer.observe(document.body, { childList: true, subtree: true, characterData: true });
            });
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupUIListeners());
        } else {
            this.setupUIListeners();
        }

        this.injectStyles();
    }

    async loadDictionary() {
        try {
            const response = await fetch('/translations.json?v=' + Date.now());
            if (response.ok) {
                this.LOCAL_DICTIONARY = await response.json();
                console.log(`[SustainTranslator] Dictionary Loaded. Languages: ${Object.keys(this.LOCAL_DICTIONARY).join(', ')}`);
            } else {
                console.warn('[SustainTranslator] Could not find translations.json in public/. AI Fallback missing.');
            }
        } catch (e) {
            console.error('[SustainTranslator] Dictionary Fetch Error:', e.message);
        }
    }

    setupUIListeners() {
        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.addEventListener('click', () => {
                const lang = opt.getAttribute('data-lang');
                if (lang === this.currentLang) return;
                this.setLanguage(lang, true);
            });
        });
        this.updateUIState(this.currentLang);
    }

    async setLanguage(langCode, isManual = false) {
        this.currentLang = langCode;
        localStorage.setItem('sustain-lang', langCode);
        this.updateUIState(langCode);

        if (langCode === 'en') {
            window.location.reload(); 
            return;
        }

        // FORCE WIPE markers to allow instant re-translation
        document.querySelectorAll('*').forEach(el => {
            el.__translatedText = null;
        });

        await this.translateFullPage(isManual);
    }

    async translateFullPage(showToast = true) {
        if (this.isTranslating) return;
        this.isTranslating = true;
        
        const textNodes = this.getTextNodes(document.body);
        this.translateTextBatch(textNodes);
        
        this.isTranslating = false;
    }

    getTextNodes(parent) {
        if (!parent) return [];
        const textNodes = [];

        const walk = document.createTreeWalker(parent, NodeFilter.SHOW_TEXT, {
            acceptNode: (node) => {
                const p = node.parentElement;
                if (!p || 
                    ['SCRIPT', 'STYLE', 'IFRAME', 'NOSCRIPT'].includes(p.tagName) || 
                    p.closest('.notranslate') ||
                    p.closest('#lang-selector-root') || 
                    node.textContent.trim().length === 0
                ) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        }, false);

        let node;
        while (node = walk.nextNode()) {
            if (!node.__orig) {
                node.__orig = node.textContent.replace(/\s+/g, ' ').trim();
            }
            textNodes.push(node);
        }

        const selector = 'button,input[type="button"],input[type="submit"],input[placeholder],[placeholder],[alt],[title]';
        const elements = parent.querySelectorAll ? parent.querySelectorAll(selector) : [];
        
        elements.forEach(el => {
            if (el.closest('.notranslate')) return;

            if (el.tagName === 'INPUT' && (el.type === 'button' || el.type === 'submit') && el.value) {
                if (!el.__origValue) el.__origValue = el.value.trim();
                textNodes.push({ type: 'value', el, __orig: el.__origValue });
            }

            ['placeholder', 'alt', 'title'].forEach(attr => {
                const val = el.getAttribute(attr);
                if (val && val.trim().length > 1) {
                    const key = `__orig_${attr}`;
                    if (!el[key]) el[key] = val.trim();
                    textNodes.push({ type: 'attribute', el, attr, __orig: el[key] });
                }
            });
        });

        return textNodes;
    }

    translateTextBatch(nodes) {
        const langDict = this.LOCAL_DICTIONARY[this.currentLang] || {};

        nodes.forEach(node => {
            const orig = node.__orig;
            const trans = langDict[orig];
            
            if (trans) {
                if (node.nodeType === Node.TEXT_NODE) {
                    node.textContent = trans;
                    node.__translatedText = trans;
                } else if (node.type === 'attribute') {
                    node.el.setAttribute(node.attr, trans);
                } else if (node.type === 'value') {
                    node.el.value = trans;
                }
            }
        });
    }

    updateUIState(langCode) {
        const meta = this.langMetadata[langCode] || this.langMetadata['en'];
        const flagEl = document.getElementById('current-lang-flag');
        const labelEl = document.getElementById('current-lang-label');
        if (flagEl) flagEl.textContent = meta.flag;
        if (labelEl) labelEl.textContent = meta.label;
        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.classList.toggle('active', opt.getAttribute('data-lang') === langCode);
        });
    }

    injectStyles() {
        if (document.getElementById('sustain-translator-styles')) return;
        const style = document.createElement('style');
        style.id = 'sustain-translator-styles';
        style.innerHTML = `
            .notranslate { translate: no !important; }
            [lang]:not([lang="en"]) .hero-headline span { white-space: nowrap; }
        `;
        document.head.appendChild(style);
    }
}

window.sustainTranslator = new SustainTranslator();

