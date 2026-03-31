/**
 * CBAM Evolutions Timeline Component
 * Handles dynamic phase detection based on current year
 * and updates UI classes for active state highlighting.
 */

document.addEventListener('DOMContentLoaded', () => {
    const phases = [
        { id: 'phase-01', start: 0, end: 2025 },
        { id: 'phase-02', start: 2026, end: 2027 },
        { id: 'phase-03', start: 2028, end: 2033 },
        { id: 'phase-04', start: 2034, end: 9999 }
    ];

    const currentYear = new Date().getFullYear();
    let activeIndex = 0;

    // Detect active phase based on current year
    phases.forEach((phase, index) => {
        if (currentYear >= phase.start && currentYear <= phase.end) {
            activeIndex = index;
        }
    });

    const timelineProgress = document.getElementById('timeline-progress');
    const phaseElements = document.querySelectorAll('.timeline-phase');

    const updateTimeline = () => {
        const isMobile = window.innerWidth < 1024;
        
        // Update progress bar
        if (timelineProgress) {
            const progress = (activeIndex / (phases.length - 1)) * 100;
            if (isMobile) {
                timelineProgress.style.width = '100%';
                timelineProgress.style.height = `${progress}%`;
            } else {
                timelineProgress.style.height = '100%';
                timelineProgress.style.width = `${progress}%`;
            }
        }

        // Update phase cards
        phaseElements.forEach((el, index) => {
            const card = el.querySelector('.phase-card');
            const title = el.querySelector('.phase-title');

            if (index === activeIndex) {
                // Active State
                el.classList.add('active-phase');
                if (card) {
                    card.classList.remove('opacity-60', 'scale-95', 'grayscale');
                    card.classList.add('opacity-100', 'scale-105', 'shadow-2xl', 'border-brand-blue', 'dark:border-white/20');
                    card.style.transform = isMobile ? 'translateX(10px) scale(1.03)' : 'scale(1.05)';
                }
                if (title) {
                    title.classList.add('text-brand-blue', 'dark:text-brand-green', 'font-black');
                    title.classList.remove('text-slate-400');
                }
            } else {
                // Inactive State
                el.classList.remove('active-phase');
                if (card) {
                    card.classList.add('opacity-60', 'scale-95', 'grayscale');
                    card.classList.remove('opacity-100', 'scale-105', 'shadow-2xl', 'border-brand-blue', 'dark:border-white/20');
                    card.style.transform = '';
                }
                if (title) {
                    title.classList.remove('text-brand-blue', 'dark:text-brand-green', 'font-black');
                    title.classList.add('text-slate-400');
                }
            }
        });
    };

    // Initial update
    updateTimeline();

    // Re-calculate on resize for potentially different layouts
    window.addEventListener('resize', updateTimeline);
});
