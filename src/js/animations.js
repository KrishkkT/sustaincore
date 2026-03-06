import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth entrance for hero text
    const heroTimeline = gsap.timeline();
    heroTimeline
        .to('.animate-fade-in', { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' })
        .to('.animate-slide-up', { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: 'expo.out' }, '-=0.8');

    // 2. Class-based Reveal on Scroll
    const revealElements = gsap.utils.toArray('.reveal-on-scroll');

    revealElements.forEach(elem => {
        // Initial check: if already in viewport, just show it
        const rect = elem.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            gsap.set(elem, { opacity: 1, y: 0 });
            return;
        }

        gsap.to(elem, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
                trigger: elem,
                start: "top bottom-=50", // More reliable for all screen sizes
                once: true,
                onEnter: () => {
                    // Force refresh after reveal to fix any height shifts
                    setTimeout(() => ScrollTrigger.refresh(), 100);
                }
            }
        });
    });

    // Refresh ScrollTrigger after a slight delay to ensure all heights are calculated
    const refreshTrigger = () => {
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500); // Increased delay for better stability
    };

    if (document.readyState === 'complete') {
        refreshTrigger();
    } else {
        window.addEventListener('load', refreshTrigger);
    }

    // 3. Magnetic Buttons Effect
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary, .glass-premium');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.5,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });

    // 4. Parallax Mission Stats
    const statsSection = document.querySelector('.bg-brand-softGray');
    if (statsSection) {
        gsap.from(statsSection.querySelectorAll('.rounded-4xl'), {
            y: 60,
            opacity: 0,
            stagger: 0.2,
            scrollTrigger: {
                trigger: statsSection,
                start: 'top 85%',
                once: true
            }
        });
    }

    // 5. Header Stability
    const header = document.querySelector('#main-nav');
    if (header) {
        gsap.set(header, { y: 0, opacity: 1 });
    }
});
