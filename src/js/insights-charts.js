document.addEventListener('DOMContentLoaded', () => {
    // Counter Logic
    const el = document.getElementById('counter');
    if (el) {
        const target = 1.6;
        const duration = 2600;
        const delay = 800;
        let start = null;
        function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
        function animate(ts) {
            if (!start) start = ts;
            const p = Math.min((ts - start) / duration, 1);
            el.textContent = (easeOutExpo(p) * target).toFixed(1);
            if (p < 1) requestAnimationFrame(animate);
            else el.textContent = '1.6';
        }
        setTimeout(() => requestAnimationFrame(animate), delay);
    }

    // Chart.js Configuration
    if (typeof Chart !== 'undefined') {
        const GRID = 'rgba(255,255,255,0.06)';
        const TICK = 'rgba(255,255,255,0.3)';
        const FONT = { family: 'Inter', size: 10 };

        function baseOpts(yLabel) {
            return {
                responsive: true,
                maintainAspectRatio: false,
                animation: { duration: 1200, easing: 'easeOutQuart' },
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                scales: {
                    x: {
                        ticks: { color: TICK, font: FONT, maxRotation: 0 },
                        grid: { color: GRID, drawBorder: false },
                        border: { color: 'rgba(255,255,255,0.15)' }
                    },
                    y: {
                        title: { display: true, text: yLabel, color: 'rgba(255,255,255,0.3)', font: { family:'Inter', size:9 } },
                        ticks: { color: TICK, font: FONT },
                        grid: { color: GRID, drawBorder: false },
                        border: { color: 'rgba(255,255,255,0.15)' }
                    }
                }
            };
        }

        const c1El = document.getElementById('c1');
        if (c1El) {
            new Chart(c1El, {
                type: 'line',
                data: {
                    labels: ['1980','1985','1990','1995','2000','2005','2010','2015','2020','2024'],
                    datasets: [{
                        data: [0.27, 0.12, 0.45, 0.38, 0.42, 0.68, 0.72, 0.90, 1.02, 1.60],
                        borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.08)',
                        borderWidth: 2, pointRadius: 3, pointBackgroundColor: '#ef4444', fill: true, tension: 0.4
                    }]
                },
                options: { ...baseOpts('°C above baseline'), scales: { ...baseOpts('°C above baseline').scales, y: { ...baseOpts('°C above baseline').scales.y, min: 0, max: 1.8 } } }
            });
        }

        const c2El = document.getElementById('c2');
        if (c2El) {
            new Chart(c2El, {
                type: 'bar',
                data: {
                    labels: ['2000','2005','2010','2015','2018','2020','2021','2022','2023'],
                    datasets: [{
                        data: [25.0, 28.5, 32.0, 33.5, 34.8, 31.5, 33.9, 36.0, 37.0],
                        backgroundColor: 'rgba(249,115,22,0.6)', borderColor: '#f97316', borderWidth: 1, borderRadius: 3
                    }]
                },
                options: { ...baseOpts('GtCO₂'), scales: { ...baseOpts('GtCO₂').scales, y: { ...baseOpts('GtCO₂').scales.y, min: 20, max: 40 } } }
            });
        }

        const c3El = document.getElementById('c3');
        if (c3El) {
            new Chart(c3El, {
                type: 'bar',
                data: {
                    labels: ['2025','2030','2035','2040','2045','2050'],
                    datasets: [{
                        data: [2.5, 6.0, 12.0, 20.0, 30.0, 38.0],
                        backgroundColor: 'rgba(234,179,8,0.6)', borderColor: '#eab308', borderWidth: 1, borderRadius: 3
                    }]
                },
                options: { ...baseOpts('$T projected loss'), scales: { ...baseOpts('$T projected loss').scales, y: { ...baseOpts('$T projected loss').scales.y, min: 0, max: 42 } } }
            });
        }

        const c4El = document.getElementById('c4');
        if (c4El) {
            new Chart(c4El, {
                type: 'line',
                data: {
                    labels: ['2018','2019','2020','2021','2022','2023','2024','2025','2027','2030'],
                    datasets: [{
                        data: [3.0, 3.5, 3.8, 4.2, 4.8, 5.3, 6.0, 7.2, 10.0, 14.0],
                        borderColor: '#4caf7d', backgroundColor: 'rgba(76,175,125,0.1)',
                        borderWidth: 2, pointRadius: 3, pointBackgroundColor: '#4caf7d', fill: true, tension: 0.4
                    }]
                },
                options: { ...baseOpts('Market size ($T)'), scales: { ...baseOpts('Market size ($T)').scales, y: { ...baseOpts('Market size ($T)').scales.y, min: 0, max: 16 } } }
            });
        }
    }
});
