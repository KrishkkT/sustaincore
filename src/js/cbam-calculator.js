
document.addEventListener('DOMContentLoaded', () => {
    const netmassInput = document.getElementById('calc-netmass');
    const seeInput = document.getElementById('calc-see');
    const benchmarkInput = document.getElementById('calc-benchmark');
    const costInput = document.getElementById('calc-cost');
    const industrySelect = document.querySelector('.input-group select');

    // Output elements
    const outNetmass = document.getElementById('out-netmass');
    const outEmissions = document.getElementById('out-emissions');
    const outPhaseout = document.getElementById('out-phaseout');
    const outCost = document.getElementById('out-cost');

    // Industry benchmarks (Sample data based on EU defaults)
    const benchmarks = {
        'Iron & Steel (72, 73)': 1.6,
        'Aluminium (76)': 2.1,
        'Cement (2523)': 0.8,
        'Fertilizers (3102, 3105)': 1.9,
        'Hydrogen (2804 10 00)': 10.4
    };

    // Current Phase-out Protection for 2026: 2.5% reduction in free allowance (so 97.5% remains)
    // Actually, CBAM phase-in starts at 2.5% in 2026, meaning 97.5% free allocation is still there.
    // The obligation is on the DELTA above the free allowance.
    const phaseOutProtection = 0.975; 

    // Constants for currencies
    const rates = {
        EUR: 1,
        USD: 1.09,
        INR: 90
    };
    let currentCurrency = 'EUR';

    const formatCurrency = (val) => {
        const symbol = currentCurrency === 'EUR' ? '€' : currentCurrency === 'USD' ? '$' : '₹';
        return symbol + Math.round(val).toLocaleString();
    };

    const calculate = () => {
        const netmass = parseFloat(netmassInput.value) || 0;
        const see = parseFloat(seeInput.value) || 0;
        const benchmark = parseFloat(benchmarkInput.value) || 0;
        const etsPrice = parseFloat(costInput.value) || 0;

        const totalEmissions = netmass * see;
        const allowance = benchmark * netmass * phaseOutProtection;
        const obligation = Math.max(0, totalEmissions - allowance);
        const costEUR = obligation * etsPrice;

        // Update UI
        outNetmass.innerText = netmass.toLocaleString() + ' t';
        outEmissions.innerText = Math.round(totalEmissions).toLocaleString() + ' tCO₂';
        outPhaseout.innerText = (phaseOutProtection * 100).toFixed(2) + '%';
        
        const costConverted = costEUR * rates[currentCurrency];
        outCost.innerText = formatCurrency(costConverted);
    };

    // Attach listeners
    [netmassInput, seeInput, benchmarkInput, costInput].forEach(el => {
        if(el) el.addEventListener('input', calculate);
    });

    if (industrySelect) {
        industrySelect.addEventListener('change', (e) => {
            const val = benchmarks[e.target.value];
            if (val) {
                benchmarkInput.value = val;
                calculate();
            }
        });
    }

    // Add Currency Toggle in UI
    const resultsContainer = document.querySelector('.calc-results');
    if (resultsContainer) {
        const toggleDiv = document.createElement('div');
        toggleDiv.className = 'currency-toggle flex gap-2 mt-4';
        toggleDiv.innerHTML = `
            <button class="px-3 py-1 text-[10px] font-bold border rounded hover:bg-brand-blue hover:text-white transition-all active" data-cur="EUR">EUR</button>
            <button class="px-3 py-1 text-[10px] font-bold border rounded hover:bg-brand-blue hover:text-white transition-all" data-cur="USD">USD</button>
            <button class="px-3 py-1 text-[10px] font-bold border rounded hover:bg-brand-blue hover:text-white transition-all" data-cur="INR">INR</button>
        `;
        resultsContainer.appendChild(toggleDiv);

        toggleDiv.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                toggleDiv.querySelectorAll('button').forEach(b => b.classList.remove('active', 'bg-brand-blue', 'text-white'));
                btn.classList.add('active', 'bg-brand-blue', 'text-white');
                currentCurrency = btn.getAttribute('data-cur');
                calculate();
            });
        });
        // Set initial active state for EUR
        toggleDiv.querySelector('[data-cur="EUR"]').classList.add('bg-brand-blue', 'text-white');
    }

    calculate();
});
