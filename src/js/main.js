import '../css/main.css';
import { header, footer } from './components.js';
import './cbam-calculator.js';
import './cbam-timer.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inject Header and Footer
    const headerPlaceholder = document.getElementById('header-root');
    const footerPlaceholder = document.getElementById('footer-root');

    if (headerPlaceholder) headerPlaceholder.innerHTML = header;
    if (footerPlaceholder) footerPlaceholder.innerHTML = footer;

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Load theme from localStorage or default to Light
    const savedTheme = localStorage.getItem('sustain-theme') || 'light';

    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark');
        if (themeToggleBtn) themeToggleBtn.setAttribute('aria-checked', 'true');
    } else {
        htmlElement.classList.remove('dark');
        if (themeToggleBtn) themeToggleBtn.setAttribute('aria-checked', 'false');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function () {
            if (htmlElement.classList.contains('dark')) {
                htmlElement.classList.remove('dark');
                themeToggleBtn.setAttribute('aria-checked', 'false');
                localStorage.setItem('sustain-theme', 'light');
            } else {
                htmlElement.classList.add('dark');
                themeToggleBtn.setAttribute('aria-checked', 'true');
                localStorage.setItem('sustain-theme', 'dark');
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

        // Services sub-list toggle for mobile menu
        const mobileServicesToggle = document.getElementById('mobile-services-toggle');
        const mobileServicesList = document.getElementById('mobile-services-list');

        if (mobileServicesToggle && mobileServicesList) {
            mobileServicesToggle.addEventListener('click', () => {
                mobileServicesList.classList.toggle('hidden');
                mobileServicesToggle.querySelector('svg').classList.toggle('rotate-180');
            });
        }
    };

    setupMobileMenu();

    // Mobile friendly flip cards (tap-based interaction)
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // only use tap on narrow screens to avoid conflict with desktop hover
            if (window.matchMedia('(max-width: 1023px)').matches) {
                card.classList.toggle('is-flipped');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Services Tabs & Global Navigation Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.panel');
    const megaLinks = document.querySelectorAll('.mega-item');

    const scrollToContentTop = () => {
        const target = document.getElementById('services-scroll-target') || document.getElementById('services-nav-anchor');
        if (!target) return;

        // Using scrollIntoView for more robust native behavior
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    const activateTab = (targetId) => {
        // btn-secondary logic for tabs
        tabBtns.forEach(b => {
            if (b.getAttribute('data-tab') === targetId) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });
        // panel visibility
        panels.forEach(p => {
            if (p.id === targetId) {
                p.classList.add('active');
            } else {
                p.classList.remove('active');
            }
        });
    };

    // Attach to Tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = btn.getAttribute('data-tab');
            activateTab(targetId);
            scrollToContentTop();
            history.pushState(null, null, `#${targetId}`);
        });
    });

    // Attach to Mega Menu Links (if on same page)
    megaLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.includes('#')) {
                const targetId = href.split('#')[1];
                const onServicesPage = window.location.pathname.includes('services.html');

                if (onServicesPage) {
                    // Prevent default jump if already on services page
                    e.preventDefault();
                    activateTab(targetId);
                    scrollToContentTop();
                    history.pushState(null, null, `#${targetId}`);
                }
            }
        });
    });

    // Handle Hash on Load/Change
    const handleHash = () => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const targetBtn = document.querySelector(`.tab-btn[data-tab="${hash}"]`);
            if (targetBtn) {
                activateTab(hash);
                // Trigger scroll after a slight delay to allow panels to display
                setTimeout(scrollToContentTop, 100);
            }
        } else if (tabBtns.length > 0) {
            const initialActive = document.querySelector('.tab-btn.active');
            if (initialActive) {
                const targetId = initialActive.getAttribute('data-tab');
                activateTab(targetId);
            }
        }
    };

    window.addEventListener('load', handleHash);
    window.addEventListener('hashchange', handleHash);


    // FAQ Accordion Logic
    const faqBtns = document.querySelectorAll('.faq-btn, .sp-faq-btn');
    faqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;

            // Close all other FAQ items site-wide
            document.querySelectorAll('.faq-item.active, .sp-faq-item.active').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle the clicked one
            item.classList.toggle('active');
        });
    });
});

// Toast Notification System
const createToastContainer = () => {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    return container;
};

window.showToast = (title, message, type = 'success') => {
    const container = createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icon = type === 'success' ?
        `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>` :
        `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;

    toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
    `;

    container.appendChild(toast);

    // Trigger entrance animation
    setTimeout(() => toast.classList.add('show'), 100);

    // Auto-remove after 5 seconds
    const removeToast = () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 600);
    };

    const autoRemove = setTimeout(removeToast, 5000);

    toast.querySelector('.toast-close').addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeToast();
    });
};

// Update Formspree Submission Logic to use Toasts
window.handleSubmit = async function (event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;

    // Use current ID from the form action as safety, or hardcode if preferred
    // The user changed it to https://formspree.io/f/maqlwazp

    button.disabled = true;
    button.innerHTML = 'Sending...';

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            window.showToast('Message Sent', 'Thank you! Our technical team will reach out shortly.', 'success');
            form.reset();
        } else {
            const result = await response.json();
            window.showToast('Submission Error', result.errors ? result.errors[0].message : 'Unable to send message. Please try again.', 'error');
        }
    } catch (error) {
        window.showToast('System Offline', 'Could not connect to the server. Please check your internet.', 'error');
    } finally {
        button.disabled = false;
        button.innerHTML = originalText;
    }
};
