import '../css/main.css';
import { header, footer } from './components.js';
import { translator } from './translator.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Setup Translator
    window.sustainTranslator = translator;
    await translator.init();

    // 2. Inject Shared Components
    const headerPlaceholder = document.getElementById('header-root');
    const footerPlaceholder = document.getElementById('footer-root');

    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = header;
        translator.translatePage();
        translator.updateUI();
    }
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footer;
        translator.translatePage();
    }

    // 3. Theme & Mobile Setup
    const htmlElement = document.documentElement;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('sustain-theme') || 'light';
    if (savedTheme === 'dark') htmlElement.classList.add('dark');

    if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-checked', savedTheme === 'dark');
        themeToggleBtn.addEventListener('click', () => {
            const isDark = htmlElement.classList.toggle('dark');
            localStorage.setItem('sustain-theme', isDark ? 'dark' : 'light');
            themeToggleBtn.setAttribute('aria-checked', isDark);
        });
    }

    const setupMobileMenu = () => {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const closeBtn = document.getElementById('close-menu');
        const mobileMenu = document.getElementById('mobile-menu');
        if (menuBtn && mobileMenu) menuBtn.addEventListener('click', () => mobileMenu.classList.remove('translate-x-full'));
        if (closeBtn && mobileMenu) closeBtn.addEventListener('click', () => mobileMenu.classList.add('translate-x-full'));
    };
    setupMobileMenu();

    // 4. Sticky Nav
    const mainNav = document.getElementById('main-nav');
    const subNav = document.querySelector('.sp-sub-nav');
    const updateSticky = () => {
        const scrolled = window.scrollY > 120;
        if (mainNav) mainNav.classList.toggle('scrolled', scrolled);
        if (subNav) subNav.classList.toggle('scrolled', scrolled);
    };
    window.addEventListener('scroll', updateSticky, { passive: true });
    updateSticky();

    // 5. Global UI Handlers
    setupUnifiedUI();
    setupBackToTop();
});

function setupUnifiedUI() {
    // --- Tabs & Panels ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.panel');
    const megaLinks = document.querySelectorAll('.mega-item');

    const activateTab = (id) => {
        tabBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-tab') === id));
        panels.forEach(p => p.classList.toggle('active', p.id === id));
    };

    tabBtns.forEach(btn => btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-tab');
        activateTab(id);
        document.getElementById('services-scroll-target')?.scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, null, `#${id}`);
    }));

    // --- High-Precision FAQ Accordion ---
    const faqBtns = document.querySelectorAll('.faq-btn, .sp-faq-btn');
    faqBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const item = btn.closest('.faq-item, .sp-faq-item');
            if (!item) return;

            const isManualToggle = item.classList.contains('active');
            
            // Auto-Accordion: Close others in same list
            const siblings = item.parentElement?.querySelectorAll('.faq-item.active, .sp-faq-item.active');
            siblings?.forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                    const otherAns = activeItem.querySelector('.faq-ans, .sp-faq-ans');
                    if (otherAns) otherAns.style.maxHeight = null;
                }
            });

            // Toggle Current
            item.classList.toggle('active');
            const ans = item.querySelector('.faq-ans, .sp-faq-ans');
            if (ans) {
                ans.style.maxHeight = item.classList.contains('active') ? (ans.scrollHeight + 32) + 'px' : null;
            }
        });
    });

    // --- Dropdowns & Navigation ---
    const setupDropdown = (container, opts = {}) => {
        const openClass = opts.openClass || 'dropdown-open';
        const trigger = opts.trigger || container.querySelector('a, button');
        let timer = null;

        container.addEventListener('mouseenter', () => {
            clearTimeout(timer);
            container.classList.add(openClass);
        });
        container.addEventListener('mouseleave', () => {
            timer = setTimeout(() => container.classList.remove(openClass), 150);
        });

        if (trigger) {
            trigger.addEventListener('click', (e) => {
                if (window.innerWidth < 1024 || trigger.getAttribute('href') === '#') {
                    e.preventDefault();
                    container.classList.toggle(openClass);
                }
            });
        }
    };

    document.querySelectorAll('.sp-sub-nav-item, #nav-services-dropdown').forEach(el => setupDropdown(el));

    // Handle Hash on Load
    const hash = window.location.hash.substring(1);
    if (hash) activateTab(hash);
}

// Toast System
window.showToast = (title, message, type = 'success') => {
    let container = document.querySelector('.toast-container') || document.createElement('div');
    if (!container.parentElement) {
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<div class="toast-content"><div class="toast-title">${title}</div><div class="toast-message">${message}</div></div>`;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 600); }, 4000);
};

const setupBackToTop = () => {
    const btn = document.createElement('div');
    btn.className = 'back-to-top';
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
    document.body.appendChild(btn);
    window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 400));
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
};
