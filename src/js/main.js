import '../css/main.css';
import { header, footer } from './components.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inject Header and Footer
    const headerPlaceholder = document.getElementById('header-root');
    const footerPlaceholder = document.getElementById('footer-root');

    if (headerPlaceholder) headerPlaceholder.innerHTML = header;
    if (footerPlaceholder) footerPlaceholder.innerHTML = footer;

    // Mobile menu toggle logic
    const setupMobileMenu = () => {
        const menuBtn = document.querySelector('button.md\\:hidden');
        if (menuBtn) {
            menuBtn.addEventListener('click', () => {
                // Simple alert for now, can be expanded to a real menu
                console.log('Mobile menu clicked');
            });
        }
    };

    setupMobileMenu();
});
