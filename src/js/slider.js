document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('service-slider');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const container = document.getElementById('service-slider-container');

    if (!slider || !prevBtn || !nextBtn || !container) return;

    let currentIndex = 0;
    const cards = slider.querySelectorAll('.card');
    const totalCards = cards.length;

    // Function to calculate gap from CSS (gap-12 = 3rem = 48px)
    const gap = 48;

    const updateSlider = () => {
        const cardWidth = cards[0].offsetWidth;
        const offset = currentIndex * (cardWidth + gap);
        slider.style.transform = `translateX(-${offset}px)`;

        // Update button states
        prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
        prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';

        nextBtn.style.opacity = currentIndex >= totalCards - 1 ? '0.3' : '1';
        nextBtn.style.pointerEvents = currentIndex >= totalCards - 1 ? 'none' : 'auto';
    };

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    // Initial state
    updateSlider();

    // Handle resize
    window.addEventListener('resize', updateSlider);
});
