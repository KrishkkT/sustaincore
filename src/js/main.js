import '../css/main.css';
import { header, footer } from './components.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inject Header and Footer
    const headerPlaceholder = document.getElementById('header-root');
    const footerPlaceholder = document.getElementById('footer-root');

    if (headerPlaceholder) headerPlaceholder.innerHTML = header;
    if (footerPlaceholder) footerPlaceholder.innerHTML = footer;

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');

    // Initial state: Always force Light Mode on refresh for "Light-First" excellence
    document.documentElement.classList.remove('dark');
    if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-checked', 'false');
    }
    // We can still keep the toggle logic working for the current session

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                themeToggleBtn.setAttribute('aria-checked', 'false');
            } else {
                document.documentElement.classList.add('dark');
                themeToggleBtn.setAttribute('aria-checked', 'true');
            }
        });
    }

    // Mobile menu toggle logic
    const setupMobileMenu = () => {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const closeBtn = document.getElementById('close-menu');
        const mobileMenu = document.getElementById('mobile-menu');

        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                mobileMenu.classList.remove('translate-x-full');
            });
        }

        if (closeBtn && mobileMenu) {
            closeBtn.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
            });
        }

        // Also close menu when a link inside it is clicked
        const mobileLinks = document.querySelectorAll('#mobile-menu a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenu) mobileMenu.classList.add('translate-x-full');
            });
        });
    };

    setupMobileMenu();
});

document.addEventListener('DOMContentLoaded', () => {
    // Services Tabs Logic - Custom Mapping for 4 Pillars -> 8 existing sections
    const tabBtns = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.panel');
    
    if(tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // remove active from all
                tabBtns.forEach(b => b.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                
                // add active to clicked
                btn.classList.add('active');
                
                // direct 1:1 mapping from data-tab to panel ID
                const targetId = btn.getAttribute('data-tab');
                const p = document.getElementById(targetId);
                if(p) p.classList.add('active');
            });
        });

        // Trigger the active tab on load to ensure mapped panels are displayed
        const initialActive = document.querySelector('.tab-btn.active');
        if(initialActive) {
            initialActive.click();
        }
    }

    // FAQ Accordion Logic
    const faqBtns = document.querySelectorAll('.faq-btn');
    faqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all others in same panel
            const panel = item.closest('.panel');
            if(panel) {
                panel.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            }
            
            if(!isActive) item.classList.add('active');
        });
    });
});
