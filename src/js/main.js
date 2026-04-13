import '../css/main.css';
import { header, footer } from './components.js';
import { translator } from './translator.js';
import './form-handler.js';

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

    // 3. Mobile Setup
    const setupMobileMenu = () => {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const closeBtn = document.getElementById('close-menu');
        const mobileMenu = document.getElementById('mobile-menu');
    const heroVideo = document.getElementById('hero-video');

    // Force Hero Video Autoplay (Mobile Fix)
    const forceVideoPlay = () => {
        if (heroVideo) {
            heroVideo.muted = true;
            heroVideo.play().catch(e => console.log("Autoplay prevented:", e));
        }
    };

    if (heroVideo) {
        forceVideoPlay();
        // Fallback for some browsers that require a tiny bit of interaction or re-trigger
        window.addEventListener('load', forceVideoPlay);
        document.body.addEventListener('touchstart', forceVideoPlay, { once: true });
    }
        const servicesToggle = document.getElementById('mobile-services-toggle');
        const servicesList = document.getElementById('mobile-services-list');

        if (menuBtn && mobileMenu) menuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });
        
        if (closeBtn && mobileMenu) closeBtn.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = ''; // Restore scroll
        });

        if (servicesToggle && servicesList) {
            servicesToggle.addEventListener('click', () => {
                const isHidden = servicesList.classList.toggle('hidden');
                servicesToggle.querySelector('svg').classList.toggle('rotate-180', !isHidden);
            });
        }
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
    setupSubNavScroll();
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

        // Desktop Hover
        container.addEventListener('mouseenter', () => {
            if (window.innerWidth >= 1024) {
                clearTimeout(timer);
                container.classList.add(openClass);
            }
        });
        container.addEventListener('mouseleave', () => {
            if (window.innerWidth >= 1024) {
                timer = setTimeout(() => container.classList.remove(openClass), 150);
            }
        });

        // Mobile/Tablet Click
        if (trigger) {
            trigger.addEventListener('click', (e) => {
                if (window.innerWidth < 1024) {
                    const isOpen = container.classList.contains(openClass);
                    
                    // Close other open dropdowns
                    document.querySelectorAll('.' + openClass).forEach(s => { 
                        if (s !== container) s.classList.remove(openClass); 
                    });
                    
                    container.classList.toggle(openClass, !isOpen);
                    
                    // Prevent navigation if it's a dropdown trigger
                    if (trigger.classList.contains('sp-dropdown-toggle') || trigger.id === 'nav-services-toggle') {
                       e.preventDefault();
                    }
                }
            });
        }
    };

    // Close dropdowns when clicking anywhere outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 1024) {
            if (!e.target.closest('.sp-sub-nav-item') && !e.target.closest('#nav-services-dropdown')) {
                document.querySelectorAll('.dropdown-open').forEach(el => {
                    el.classList.remove('dropdown-open');
                });
            }
        }
    });

    // --- Mobile Flip Cards ---
    const setupFlipCards = () => {
        const cards = document.querySelectorAll('.flip-card');
        cards.forEach(card => {
            card.addEventListener('click', function(e) {
                if (window.innerWidth < 1024) {
                    // If they clicked a link in the back, don't flip back immediately
                    if (e.target.closest('.flip-btn') || e.target.closest('.svc-learn-more')) return;
                    
                    const isFlipped = this.classList.toggle('is-flipped');
                    
                    // Close other cards
                    cards.forEach(c => { if (c !== this) c.classList.remove('is-flipped'); });
                }
            });
        });
    };
    // Initialize components
    setupFlipCards();
    setupSubNavScroll();
    setupBackToTop();

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

const setupSubNavScroll = () => {
    const nav = document.querySelector('.sp-sub-nav');
    const inner = document.querySelector('.sp-sub-nav-inner');
    if (!nav || !inner) return;

    // Inject Arrows (only if they don't exist)
    if (nav.querySelector('.sp-nav-arrow')) return;

    const leftArrow = document.createElement('button');
    leftArrow.className = 'sp-nav-arrow left';
    leftArrow.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>';
    
    const rightArrow = document.createElement('button');
    rightArrow.className = 'sp-nav-arrow right';
    rightArrow.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';

    nav.appendChild(leftArrow);
    nav.appendChild(rightArrow);

    const updateArrows = () => {
        if (window.innerWidth > 1210) {
            leftArrow.style.display = 'none';
            rightArrow.style.display = 'none';
            return;
        }

        const isOverflowing = inner.scrollWidth > inner.clientWidth;
        if (!isOverflowing) {
            leftArrow.style.display = 'none';
            rightArrow.style.display = 'none';
            return;
        }

        leftArrow.style.display = inner.scrollLeft > 10 ? 'flex' : 'none';
        rightArrow.style.display = (inner.scrollLeft + inner.clientWidth < inner.scrollWidth - 10) ? 'flex' : 'none';
    };

    inner.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);
    
    leftArrow.addEventListener('click', () => {
        inner.scrollBy({ left: -200, behavior: 'smooth' });
    });
    
    rightArrow.addEventListener('click', () => {
        inner.scrollBy({ left: 200, behavior: 'smooth' });
    });

    // Initial check
    setTimeout(updateArrows, 500);
};
