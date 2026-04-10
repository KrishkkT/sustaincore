
class SustainTranslator {
    constructor() {
        this.currentLang = localStorage.getItem('sustain-lang') || 'en';
        this.translations = {};
        this.observer = null;
    }

    async init() {
        console.log(`[Translator] Initializing. Current localStorage lang: ${localStorage.getItem('sustain-lang')}`);
        try {
            // 1. Setup observer FIRST so it catches header/footer injection in main.js
            this.setupMutationObserver();
            
            // 2. Load translations for the saved language
            await this.loadTranslations(this.currentLang);
            
            // 3. Initial translation pass
            this.translatePage();
            this.updateUI();
            this.setupUIListeners();
            
            console.log('[Translator] Initialization complete for:', this.currentLang);
        } catch (e) {
            console.error('[Translator] Initialization failed:', e);
        }
    }

    async loadTranslations(lang) {
        const url = `/locales/${lang}.json`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Status ${response.status}`);
            const json = await response.json();
            
            this.translations[lang] = json;
            this.currentLang = lang;
            localStorage.setItem('sustain-lang', lang);
            document.documentElement.lang = lang;
            console.log(`[Translator] Loaded ${lang} successfully`);
        } catch (error) {
            console.warn(`[Translator] Could not load ${lang} from ${url}, falling back to English.`, error);
            if (lang !== 'en') {
                await this.loadTranslations('en');
            }
        }
    }

    translatePage() {
        const langData = this.translations[this.currentLang];
        if (!langData) {
            console.error(`[Translator] No data loaded for ${this.currentLang}`);
            return;
        }

        const elements = document.querySelectorAll('[data-i18n], [data-i18n-attr]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const attrData = el.getAttribute('data-i18n-attr');

            if (key) {
                const translation = this.getNestedTranslation(key);
                if (translation !== null && translation !== undefined) {
                    if (translation.includes('<')) {
                        el.innerHTML = translation;
                    } else {
                        el.textContent = translation;
                    }
                }
            }

            if (attrData) {
                const pairs = attrData.split(',').map(p => p.trim());
                pairs.forEach(pair => {
                    const [attr, attrKey] = pair.split(':').map(s => s.trim());
                    const translation = this.getNestedTranslation(attrKey);
                    if (translation !== null && translation !== undefined) {
                        el.setAttribute(attr, translation);
                    }
                });
            }
        });
        
        // Sync selects
        document.querySelectorAll('.lang-selector').forEach(sel => {
            if (sel.value !== this.currentLang) sel.value = this.currentLang;
        });
    }

    getNestedTranslation(key) {
        if (!this.translations[this.currentLang]) return null;

        // Try direct hierarchical lookup first
        let result = key.split('.').reduce((obj, k) => obj && obj[k], this.translations[this.currentLang]);

        if (result === null || result === undefined) {
            // Global Fallback Search
            // If the key is e.g. "files_1-brsr.top_1000", find "top_1000" globally
            const parts = key.split('.');
            const baseKey = parts[parts.length - 1];
            
            // Search sections in priority order
            const searchSections = ['shared', 'navbar', 'footer', 'index', 'services', 'air-monitoring', 'carbon-climate', 'esg-reporting', 'ratings-targets', 'clearances-eia', 'environmental-audits', 'water-testing'];
            
            for (const section of searchSections) {
                const sectionObj = this.translations[this.currentLang][section];
                if (sectionObj && sectionObj[baseKey] !== undefined) {
                    return sectionObj[baseKey];
                }
            }

            // Ultimate fallback: Search EVERY section
            const langData = this.translations[this.currentLang];
            for (const sectionName in langData) {
                if (typeof langData[sectionName] === 'object' && langData[sectionName][baseKey] !== undefined) {
                    return langData[sectionName][baseKey];
                }
            }
        }

        return result;
    }

    async setLanguage(lang) {
        if (lang === this.currentLang) return;
        await this.loadTranslations(lang);
        this.translatePage();
        this.updateUI();
        
        // Dispatch event for other components to react
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }

    updateUI() {
        // Update language selector buttons
        const currentLangLabel = document.getElementById('current-lang-label');
        const currentLangFlag = document.getElementById('current-lang-flag');
        
        if (currentLangLabel && currentLangFlag) {
            const btn = document.querySelector(`.lang-option[data-lang="${this.currentLang}"]`);
            if (btn) {
                currentLangLabel.textContent = this.currentLang.toUpperCase();
                currentLangFlag.textContent = btn.getAttribute('data-flag');
            }
        }

        // Highlight active language
        document.querySelectorAll('.lang-option').forEach(opt => {
            if (opt.getAttribute('data-lang') === this.currentLang) {
                opt.classList.add('bg-slate-100', 'dark:bg-white/10');
            } else {
                opt.classList.remove('bg-slate-100', 'dark:bg-white/10');
            }
        });
    }

    setupUIListeners() {
        // Find language options in the navbar
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.lang-option, .lang-switch-btn');
            if (btn) {
                const lang = btn.getAttribute('data-lang');
                this.setLanguage(lang);
            }
        });
    }

    setupMutationObserver() {
        if (this.observer) this.observer.disconnect();
        
        this.observer = new MutationObserver((mutations) => {
            let shouldTranslate = false;
            mutations.forEach(mutation => {
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) { // Element node
                            if (node.hasAttribute('data-i18n') || node.hasAttribute('data-i18n-attr') || node.querySelector('[data-i18n], [data-i18n-attr]')) {
                                shouldTranslate = true;
                            }
                        }
                    });
                }
            });
            
            if (shouldTranslate) {
                // Throttle translation to avoid recursion
                if (this._timeout) clearTimeout(this._timeout);
                this._timeout = setTimeout(() => {
                    this.translatePage();
                    this.updateUI(); 
                }, 50);
            }
        });

        this.observer.observe(document.body, { childList: true, subtree: true });
    }
}

// Export the class and a singleton instance
export default SustainTranslator;
export const translator = new SustainTranslator();
