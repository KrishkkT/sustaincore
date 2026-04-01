import { CN_CODES } from './cbam-data.js';

/**
 * SustainCore CBAM Calculator & Interactive Suite
 * Implements EU methodology (Regulation 2023/956)
 */

// ─── CONSTANTS ─────────────────────────────────────────────────────────
const CBAM_FACTORS = {
    2026: 0.025, 2027: 0.05, 2028: 0.10, 2029: 0.16,
    2030: 0.22, 2031: 0.34, 2032: 0.49, 2033: 0.70, 2034: 1.00
};

const SECTOR_DEFAULTS = {
    'steel': { direct: 2.018, indirect: 0.705, actual: 1.10, label: 'Iron & Steel' },
    'aluminium': { direct: 2.697, indirect: 8.877, actual: 0.85, label: 'Aluminium' },
    'cement': { direct: 0.895, indirect: 0.078, actual: 0.61, label: 'Cement' },
    'fertiliser': { direct: 1.580, indirect: 0.088, actual: 1.05, label: 'Fertilisers' },
    'hydrogen': { direct: 10.4, indirect: 0, actual: 6.5, label: 'Hydrogen' },
    'electricity': { direct: 0.55, indirect: 0, actual: 0.35, label: 'Electricity' }
};

const DEADLINES = [
    { name: 'Authorised Declarant Registration Deadline', date: new Date('2026-03-31T23:59:00') },
    { name: 'First Annual Declaration (2026 imports)', date: new Date('2027-09-30T23:59:00') },
    { name: 'CBAM Certificate Sales Open', date: new Date('2027-02-01T00:00:00') }
];

// ─── CURRENCY LOGIC ───────────────────────────────────────────────────────
const CURRENCIES = {
    'EUR': { rate: 1.0, sym: '€' },
    'USD': { rate: 1.10, sym: '$' },
    'INR': { rate: 91.0, sym: '₹' }
};
let activeCurr = 'EUR';

function setCurrency(curr) {
    if (!CURRENCIES[curr]) return;
    activeCurr = curr;

    // Update UI buttons
    document.querySelectorAll('.curr-btn').forEach(btn => {
        const isSelected = btn.getAttribute('data-curr') === curr;
        btn.classList.toggle('active', isSelected);
        btn.classList.toggle('bg-white', isSelected);
        btn.classList.toggle('dark:bg-slate-700', isSelected);
        btn.classList.toggle('text-brand-charcoal', isSelected);
        btn.classList.toggle('dark:text-white', isSelected);
        btn.classList.toggle('shadow-sm', isSelected);
        btn.classList.toggle('text-slate-400', !isSelected);
    });

    // Update Slider Labels with Currency conversion
    const c = CURRENCIES[curr];
    const ticks = [10, 45, 80, 115, 150];
    ticks.forEach((val, i) => {
        const sEl = document.getElementById(`s-ets-l${i + 1}`);
        const dEl = document.getElementById(`d-ets-l${i + 1}`);
        if (sEl) sEl.textContent = c.sym + Math.round(val * c.rate);
        if (dEl) dEl.textContent = c.sym + Math.round(val * c.rate);
    });

    // Recalculate everything
    simpleCalc();
    detailCalc();
    phaseCalc();
}

// ─── UTILITIES ────────────────────────────────────────────────────────────
const fe = (n) => {
    const c = CURRENCIES[activeCurr];
    const val = Math.round(n * c.rate);
    return c.sym + val.toLocaleString();
};
const ft = (n, d = 2) => (typeof n === 'number' ? n.toFixed(d) : '0.00');
const fv = (n) => (parseFloat(n) || 0).toLocaleString();

const getMarkup = (sector, year) => {
    if (year <= 2026) return 1.10; // +10% 
    if (year === 2027) return 1.20; // +20%
    return 1.30; // +30% for 2028 and beyond
};

// ─── SIMPLE ESTIMATOR ──────────────────────────────────────────────────
function sectorChange() {
    const s = document.getElementById('s-sector').value;
    const yr = parseInt(document.getElementById('s-year').value) || 2026;
    const d = SECTOR_DEFAULTS[s];

    if (d) {
        const markup = getMarkup(s, yr);
        const totalEl = document.getElementById('s-def-ef');

        const directVal = d.direct * markup;
        const indirectVal = d.indirect * markup;
        const totalVal = directVal + indirectVal;

        if (totalEl) totalEl.value = totalVal.toFixed(3);

        const actEl = document.getElementById('s-act-ef');
        if (actEl) actEl.value = d.actual.toFixed(3);
    }
    simpleCalc();
}

function simpleCalc() {
    const vol = parseFloat(document.getElementById('s-vol').value) || 0;
    const etsBase = parseFloat(document.getElementById('s-ets').value) || 70;
    const c = CURRENCIES[activeCurr];
    const ets = etsBase * c.rate; // Scale input by current rate

    // Update live display for ETS range
    const etsDisplay = document.getElementById('s-ets-val');
    if (etsDisplay) {
        etsDisplay.textContent = c.sym + Math.round(ets);
    }

    // Granular inputs
    const defEf = parseFloat(document.getElementById('s-def-ef').value) || 0;
    const actEf = parseFloat(document.getElementById('s-act-ef').value) || 0;
    const yr = parseInt(document.getElementById('s-year').value) || 2026;
    const factor = CBAM_FACTORS[yr] || 0.025;

    const costDef = vol * defEf * factor * ets;
    const costAct = vol * actEf * factor * ets;
    const saving = costDef - costAct;

    const resDef = document.getElementById('s-res-def');
    const resAct = document.getElementById('s-res-act');
    const resSave = document.getElementById('s-res-save');

    if (resDef) resDef.textContent = fe(costDef);
    if (resAct) resAct.textContent = fe(costAct);
    if (resSave) {
        resSave.textContent = fe(saving);
        resSave.className = saving >= 0 ? 'text-green-500 font-bold' : 'text-red-500 font-bold';
    }

    const breakdown = document.getElementById('s-breakdown');
    if (breakdown) {
        breakdown.innerHTML = `${fv(vol)} t × ${ft(defEf, 3)} EF × ${(factor * 100).toFixed(1)}% factor × ${c.sym}${Math.round(ets)}`;
    }

    const box = document.getElementById('rib-save');
    if (saving > 100) {
        if (box) box.style.display = 'block';
        const msg = document.getElementById('rib-save-msg');
        if (msg) {
            msg.innerHTML = `Using <strong>verified actual emissions data</strong> instead of EU default values saves <strong>${fe(saving)}</strong> in CBAM costs in ${yr}.`;
        }
    } else if (box) {
        box.style.display = 'none';
    }

    // Update Bottom Summary IDs
    const rTotalDef = document.getElementById('r-total-def');
    const rTotalAct = document.getElementById('r-total-act');
    const rVol = document.getElementById('r-vol');
    const rDefEf = document.getElementById('r-def-ef');
    const rActEf = document.getElementById('r-act-ef');
    const rEts = document.getElementById('r-ets');
    const rFactor = document.getElementById('r-factor');

    if (rTotalDef) rTotalDef.textContent = fe(costDef);
    if (rTotalAct) rTotalAct.textContent = fe(costAct);
    if (rVol) rVol.textContent = fv(vol) + ' t';
    if (rDefEf) rDefEf.textContent = ft(defEf, 3);
    if (rActEf) rActEf.textContent = ft(actEf, 3);
    if (rEts) rEts.textContent = c.sym + Math.round(ets) + '/t';
    if (rFactor) rFactor.textContent = (factor * 100).toFixed(1) + '%';
}

// ─── DETAILED CN MULTI-PRODUCT ─────────────────────────────────────────
let rowCounter = 0;

function getSectorCNOptions(sector) {
    // Filter CN_CODES from imported module
    return CN_CODES.filter(c => c[2] === sector).map(c => {
        const direct = c[3] || 0; const indirect = c[4] || 0; const total = direct + indirect;
        return `<option value="${c[0]}" data-direct="${direct.toFixed(3)}" data-indirect="${indirect.toFixed(3)}" data-def="${total.toFixed(3)}">${c[0]} — ${c[1].substring(0, 60)}...</option>`;
    }).join('');
}

const ALL_SECTORS = [
    { val: 'steel', label: 'Iron & Steel' },
    { val: 'aluminium', label: 'Aluminium' },
    { val: 'cement', label: 'Cement' },
    { val: 'fertiliser', label: 'Fertilisers' },
    { val: 'hydrogen', label: 'Hydrogen' },
    { val: 'electricity', label: 'Electricity' },
];

function addProductRow(sectorDefault = 'steel') {
    const id = ++rowCounter;
    const sectorOpts = ALL_SECTORS.map(s => `<option value="${s.val}"${s.val === sectorDefault ? ' selected' : ''}>${s.label}</option>`).join('');
    const cnOpts = getSectorCNOptions(sectorDefault);

    const row = document.createElement('div');
    row.className = 'product-row relative bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 animate-slide-up';
    row.id = `prow-${id}`;
    row.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
            <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Sector</label>
                <select class="w-full bg-white dark:bg-slate-900 border-none rounded-xl px-4 py-3 text-xs font-medium outline-none" onchange="window.updateCnList(${id}, this.value)">${sectorOpts}</select>
            </div>
            <div class="space-y-2 lg:col-span-2">
                <div class="flex justify-between items-center">
                    <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Product / CN Code</label>
                    <div id="def-hint-${id}" class="text-[9px] text-brand-green font-bold"></div>
                </div>
                <select id="cn-sel-${id}" class="w-full bg-white dark:bg-slate-900 border-none rounded-xl px-4 py-3 text-xs font-medium outline-none" onchange="window.onCnChange(${id})">${cnOpts}</select>
            </div>
            <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Vol (t/yr)</label>
                <input type="number" id="vol-${id}" value="1000" min="0" class="w-full bg-white dark:bg-slate-900 border-none rounded-xl px-4 py-3 text-xs font-medium outline-none" oninput="window.detailCalc()" />
            </div>
            <div class="space-y-2 relative">
                <button onclick="window.removeRow(${id})" class="absolute -top-6 right-0 text-red-500 hover:text-red-600 text-xs font-bold transition-colors" title="Remove row">✕ Remove</button>
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Actual EF</label>
                <input type="number" id="aef-${id}" step="0.001" placeholder="Verified" class="w-full bg-emerald-50/50 dark:bg-emerald-900/5 border border-emerald-100 dark:border-emerald-900/20 rounded-xl px-4 py-3 text-xs font-bold text-emerald-600 dark:text-emerald-400 outline-none" oninput="window.detailCalc()" />
            </div>
        </div>
    `;

    document.getElementById('product-rows').appendChild(row);
    onCnChange(id);
    detailCalc();
}

function updateCnList(id, sector) {
    const sel = document.getElementById('cn-sel-' + id);
    if (sel) {
        sel.innerHTML = getSectorCNOptions(sector);
        onCnChange(id);
    }
}

function onCnChange(id) {
    const sel = document.getElementById('cn-sel-' + id);
    const opt = sel ? sel.options[sel.selectedIndex] : null;
    if (opt) {
        const d = parseFloat(opt.getAttribute('data-direct')) || 0;
        const i = parseFloat(opt.getAttribute('data-indirect')) || 0;
        const t = parseFloat(opt.getAttribute('data-def')) || 0;
        const hint = document.getElementById('def-hint-' + id);
        if (hint) {
            if (d === 0 && i === 0) {
                hint.classList.replace('text-brand-green', 'text-slate-400');
                hint.innerHTML = `<span class="opacity-50 italic">No default emission data found for this code.</span>`;
            } else {
                hint.classList.replace('text-slate-400', 'text-brand-green');
                hint.innerHTML = `Total EF: <strong>${t.toFixed(3)}</strong> t CO₂/t`;
            }
        }
    }
    detailCalc();
}

function removeRow(id) {
    const el = document.getElementById('prow-' + id);
    if (el) el.remove();
    detailCalc();
}

function detailCalc() {
    const yr = parseInt(document.getElementById('d-year').value) || 2026;
    const etsBase = parseFloat(document.getElementById('d-ets').value) || 70;
    const c = CURRENCIES[activeCurr];
    const ets = etsBase * c.rate;

    // Update live display for ETS price if it exists
    const etsDisplay = document.getElementById('d-ets-val');
    if (etsDisplay) {
        etsDisplay.textContent = c.sym + Math.round(ets) + '/t';
    }

    const factor = CBAM_FACTORS[yr] || 0.025;
    const rows = document.querySelectorAll('#product-rows .product-row');

    let totalCostDef = 0;
    let totalCostAct = 0;
    let totalVol = 0;
    let tableHtml = '';

    rows.forEach(row => {
        const id = row.id.replace('prow-', '');
        const cnSel = document.getElementById('cn-sel-' + id);
        if (!cnSel) return;

        const opt = cnSel.options[cnSel.selectedIndex];
        if (!opt) return;

        const cnFull = opt.text;
        const cnCode = opt.value;
        const cnName = cnFull.includes(' — ') ? cnFull.split(' — ')[1].split(' [')[0] : 'Product';
        // Cleaner CN Name in summary
        const shortName = cnCode + ' ' + (cnName.length > 20 ? cnName.substring(0, 18) + '...' : cnName);

        const defEfBase = parseFloat(opt.getAttribute('data-def')) || 0;

        const sectorSel = row.querySelector('select');
        const sector = sectorSel ? sectorSel.value : 'steel';
        const markup = getMarkup(sector, yr);
        const defEf = defEfBase * markup;

        const vol = parseFloat(document.getElementById('vol-' + id).value) || 0;
        const aefInput = document.getElementById('aef-' + id);
        const actEf = (aefInput && aefInput.value !== '') ? parseFloat(aefInput.value) : null;

        const costDef = vol * defEf * factor * ets;
        const costAct = actEf !== null ? (vol * actEf * factor * ets) : costDef;
        const saving = costDef - costAct;

        totalCostDef += costDef;
        totalCostAct += costAct;
        totalVol += vol;

        let savingClass = 'text-slate-400';
        let savingText = '—';

        if (Math.abs(saving) > 0.01) {
            savingClass = saving > 0 ? 'text-brand-blue' : 'text-red-500';
            savingText = fe(saving);
        }

        tableHtml += `
            <tr class="border-b border-slate-100 dark:border-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50 transition-colors text-[10px]">
                <td class="py-4 px-4 font-bold max-w-[150px] truncate" title="${cnFull}">${shortName}</td>
                <td class="py-4 px-2 text-slate-500 font-medium">${fv(vol)}</td>
                <td class="py-4 px-2 text-red-500 font-bold">${ft(defEf, 3)}</td>
                <td class="py-4 px-2 font-bold ${actEf !== null ? 'text-emerald-500' : 'text-slate-400'}">${actEf !== null ? ft(actEf, 3) : 'Default'}</td>
                <td class="py-4 px-2 text-slate-700 dark:text-white font-bold text-red-400">${fe(costDef)}</td>
                <td class="py-4 px-2 text-emerald-500 font-bold">${fe(costAct)}</td>
                <td class="py-4 px-4 font-black ${savingClass}">${savingText}</td>
            </tr>
        `;
    });

    const tbody = document.getElementById('det-tbody');
    if (tbody) tbody.innerHTML = tableHtml || `<tr><td colspan="7" class="py-8 text-center text-slate-400 italic">No products added yet. Click above to begin.</td></tr>`;

    // Global Totals and Savings
    const totalSaving = Math.max(0, totalCostDef - totalCostAct);

    // Update Sticky Summary Sidebar
    const defCostEl = document.getElementById('dt-cost-def');
    const actCostEl = document.getElementById('dt-cost-act');
    const savingEl = document.getElementById('dt-saving');
    const savingBadge = document.getElementById('dt-saving-badge');

    if (defCostEl) defCostEl.textContent = fe(totalCostDef);
    if (actCostEl) actCostEl.textContent = fe(totalCostAct);
    if (savingEl) {
        savingEl.textContent = fe(totalSaving);
        let colorClass = "text-white/30";
        if (totalSaving > 0.01) colorClass = "text-white";
        if (totalSaving < -0.01) colorClass = "text-red-400";
        savingEl.className = `text-4xl font-display font-black ${colorClass} leading-none tracking-tighter`;
    }

    if (savingBadge) {
        const pct = totalCostDef > 0 ? Math.round((totalSaving / totalCostDef) * 100) : 0;
        if (totalSaving > 0.01) {
            savingBadge.className = 'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-amber-400/20 text-amber-400';
            savingBadge.textContent = `SAVE ${pct}%`;
        } else if (totalSaving < -0.01) {
            savingBadge.className = 'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-red-500/20 text-red-400';
            savingBadge.textContent = `EXCESS COST`;
        } else {
            savingBadge.className = 'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-white/10 text-white/30';
            savingBadge.textContent = `NO SAVING`;
        }
        savingBadge.style.display = 'inline-flex';
    }

    // Update Table Footer Summary
    const footVol = document.getElementById('det-total-vol');
    const footDef = document.getElementById('det-total-def');
    const footAct = document.getElementById('det-total-act');
    const footSave = document.getElementById('det-total-save');

    if (footVol) footVol.textContent = fv(totalVol) + ' t';
    if (footDef) footDef.textContent = fe(totalCostDef);
    if (footAct) footAct.textContent = fe(totalCostAct);
    if (footSave) {
        footSave.textContent = Math.abs(totalSaving) > 0.01 ? fe(totalSaving) : '—';
        footSave.className = `py-5 px-4 font-black ${totalSaving > 0.01 ? 'text-brand-blue' : (totalSaving < -0.01 ? 'text-red-500' : 'text-slate-400')}`;
    }
}

// ─── PHASE-OUT PROJECTION ───────────────────────────────────────────────
const PO_SCHEDULE = [
    { yr: 2026, f: 0.025, etsMult: 1.00, markup: '+10%' },
    { yr: 2027, f: 0.050, etsMult: 1.05, markup: '+20%' },
    { yr: 2028, f: 0.100, etsMult: 1.10, markup: '+30%' },
    { yr: 2029, f: 0.160, etsMult: 1.16, markup: '+30%' },
    { yr: 2030, f: 0.220, etsMult: 1.22, markup: '+30%' },
    { yr: 2031, f: 0.340, etsMult: 1.28, markup: '+30%' },
    { yr: 2032, f: 0.490, etsMult: 1.34, markup: '+30%' },
    { yr: 2033, f: 0.700, etsMult: 1.41, markup: '+30%' },
    { yr: 2034, f: 1.000, etsMult: 1.48, markup: '+30%' },
];

function phaseCalc() {
    const vol = parseFloat(document.getElementById('po-vol').value) || 10000;
    const ef = parseFloat(document.getElementById('po-ef').value) || 1.9;
    const baseEts = parseFloat(document.getElementById('po-ets').value) || 70;
    const tbody = document.getElementById('po-tbody');
    const c = CURRENCIES[activeCurr];

    if (!tbody) return;

    tbody.innerHTML = PO_SCHEDULE.map(r => {
        const ets = Math.round(baseEts * r.etsMult);
        const certs = vol * ef * r.f;
        const cost = certs * ets;
        const pct = Math.round(r.f * 100);

        return `<tr class="${r.yr === 2026 ? 'bg-white/5' : ''} border-b border-white/5 text-[11px]">
            <td class="py-3 px-2 font-bold">${r.yr}</td>
            <td class="py-3 px-2">${(r.f * 100).toFixed(1)}%</td>
            <td class="py-3 px-2 text-muted-foreground">${c.sym}${Math.round(ets)}/t</td>
            <td class="py-3 px-2 text-muted-foreground">${r.markup}</td>
            <td class="py-3 px-2">${ft(certs, 0)}</td>
            <td class="py-3 px-2 font-bold text-red-400">${fe(cost)}</td>
            <td class="py-3 px-2 hidden sm:table-cell">
                <div class="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div class="h-full bg-red-400 opacity-80" style="width: ${pct}%"></div>
                </div>
            </td>
        </tr>`;
    }).join('');
}

// ─── UI HANDLERS ────────────────────────────────────────────────────────
function switchCalcTab(name, btn) {
    // Remove active class from all tabs
    document.querySelectorAll('.calc-tab').forEach(b => {
        b.classList.remove('active');
        b.classList.remove('text-brand-blue');
        b.classList.remove('border-brand-blue');
        b.classList.add('text-slate-400');
    });

    // Hide all content panes
    document.querySelectorAll('.calc-content').forEach(p => {
        p.classList.add('hidden');
        p.classList.remove('block');
    });

    // Activate selected tab
    btn.classList.add('active');
    btn.classList.add('text-brand-blue');
    btn.classList.add('border-brand-blue');
    btn.classList.remove('text-slate-400');

    const pane = document.getElementById('calc-' + name);
    if (pane) {
        pane.classList.remove('hidden');
        pane.classList.add('block');
    }
}

// ─── COUNTDOWN ─────────────────────────────────────────────────────────
let curDL = 1;
function setDL(i) {
    curDL = i;
    document.querySelectorAll('.cd-sw-btn').forEach((b, j) => b.classList.toggle('active', j === i));
    const d = DEADLINES[i];
    document.getElementById('cd-name').textContent = d.name;
    const dateStr = d.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    document.getElementById('cd-date').textContent = 'Due: ' + dateStr;
    tick();
}

function tick() {
    const now = new Date(), diff = DEADLINES[curDL].date - now;
    if (diff <= 0) {
        ['cd-d', 'cd-h', 'cd-m', 'cd-s'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = '00';
        });
        return;
    }
    const d = Math.floor(diff / 864e5), h = Math.floor(diff % 864e5 / 36e5), m = Math.floor(diff % 36e5 / 6e4), s = Math.floor(diff % 6e4 / 1e3);
    const dayEl = document.getElementById('cd-d');
    const hrEl = document.getElementById('cd-h');
    const minEl = document.getElementById('cd-m');
    const secEl = document.getElementById('cd-s');

    if (dayEl) dayEl.textContent = String(d).padStart(2, '0');
    if (hrEl) hrEl.textContent = String(h).padStart(2, '0');
    if (minEl) minEl.textContent = String(m).padStart(2, '0');
    if (secEl) secEl.textContent = String(s).padStart(2, '0');
}

// ─── EVOLUTION TIMELINE ───────────────────────────────────────────────
function updateEvolutionTimeline() {
    const currentYear = new Date().getFullYear();
    const phases = [
        { id: 'phase-01', startYear: 2023, endYear: 2025, gridPosition: 12.5 },
        { id: 'phase-02', startYear: 2026, endYear: 2027, gridPosition: 37.5 },
        { id: 'phase-03', startYear: 2028, endYear: 2033, gridPosition: 62.5 },
        { id: 'phase-04', startYear: 2034, endYear: 2035, gridPosition: 87.5 }
    ];

    let activePhaseId = 'phase-02';
    let progressPct = 37.5;

    // Disabled dynamic date logic to hardcode timeline at Phase 02 (Definitive Launch)
    /*
    for (const phase of phases) {
        if (currentYear >= phase.startYear && currentYear <= phase.endYear) {
            activePhaseId = phase.id;
            progressPct = phase.gridPosition;
            break;
        }
    }
    */

    const progressEl = document.getElementById('timeline-progress');
    if (progressEl) {
        progressEl.style.width = progressPct + '%';
    }

    document.querySelectorAll('.timeline-phase').forEach(el => {
        el.classList.remove('active-phase');
        if (el.id === activePhaseId) {
            el.classList.add('active-phase');
        }
    });
}

// ─── INITIALIZATION ────────────────────────────────────────────────────
// Run initializations
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}

function initAll() {
    // Initial Calc Setup
    if (document.getElementById('s-sector')) sectorChange();

    // Add 2 initial rows for Detailed Calculator
    const rowsCont = document.getElementById('product-rows');
    if (rowsCont && rowsCont.children.length === 0) {
        addProductRow('steel');
    }

    if (document.getElementById('po-vol')) phaseCalc();

    // Countdown setup
    if (document.getElementById('cd-name')) {
        setDL(1);
        setInterval(tick, 1000);
    }

    // Timeline setup
    if (document.getElementById('timeline-progress')) {
        updateEvolutionTimeline();
        // Update every 10 minutes to keep it "live" during long sessions
        setInterval(updateEvolutionTimeline, 10 * 60 * 1000);
    }

    // Default calculator tab activation (fix edge cases where inline markup may not set JS state)
    const firstTab = document.querySelector('.calc-tab');
    if (firstTab) {
        switchCalcTab('simple', firstTab);
    }
}

function downloadDetailedExcel() {
    const yr = parseInt(document.getElementById('d-year').value) || 2026;
    const ets = parseFloat(document.getElementById('d-ets').value) || 70; // This is always EUR in input base
    const factor = CBAM_FACTORS[yr] || 0.025;
    const rows = document.querySelectorAll('#product-rows .product-row');

    const excelData = [];
    let totalDefCost = 0;
    let totalActCost = 0;
    let totalSavings = 0;

    rows.forEach(row => {
        const id = row.id.replace('prow-', '');
        const cnSel = document.getElementById('cn-sel-' + id);
        if (!cnSel) return;

        const opt = cnSel.options[cnSel.selectedIndex];
        const cnFull = opt.text;
        const cnCode = opt.value;
        const cnName = cnFull.includes(' — ') ? cnFull.split(' — ')[1].split(' [')[0] : 'Product';

        const sectorSel = row.querySelector('select');
        const sectorVal = sectorSel ? sectorSel.value : 'steel';
        const sectorLabel = ALL_SECTORS.find(s => s.val === sectorVal)?.label || sectorVal;
        const markup = getMarkup(sectorVal, yr);

        const defEfBase = parseFloat(opt.getAttribute('data-def')) || 0;
        const defEf = defEfBase * markup;

        const vol = parseFloat(document.getElementById('vol-' + id).value) || 0;
        const aefInput = document.getElementById('aef-' + id);
        const actEf = aefInput && aefInput.value ? parseFloat(aefInput.value) : null;

        const costDef = vol * defEf * factor * ets;
        const costAct = actEf !== null ? (vol * actEf * factor * ets) : costDef;
        const saving = costDef - costAct;

        totalDefCost += costDef;
        totalActCost += costAct;
        totalSavings += saving;

        excelData.push({
            "Sector": sectorLabel,
            "CN Code": cnCode,
            "Product Name": cnName,
            "Volume (t/yr)": vol,
            "Default EF": Number(defEf.toFixed(3)),
            "Actual EF": actEf !== null ? Number(actEf.toFixed(3)) : "Using Default",
            "Total Default Cost (€)": Number(costDef.toFixed(2)),
            "Actual Cost (€)": Number(costAct.toFixed(2)),
            "Savings (€)": Number(saving.toFixed(2)),
            "Status": saving > 0.01 ? "Saving" : (saving < -0.01 ? "Excess Cost" : "Neutral")
        });
    });

    // Add totals row
    const summarySheet = [
        ...excelData,
        {}, // Empty row
        {
            "Sector": "TOTAL",
            "Volume (t/yr)": Number(excelData.reduce((s, r) => s + r["Volume (t/yr)"], 0).toFixed(0)),
            "Total Default Cost (€)": Number(totalDefCost.toFixed(2)),
            "Actual Cost (€)": Number(totalActCost.toFixed(2)),
            "Savings (€)": Number(totalSavings.toFixed(2))
        }
    ];

    const worksheet = XLSX.utils.json_to_sheet(summarySheet);
    const workbook = XLSX.utils.book_new();

    // Bold headers & Auto Width logic
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    const wscols = [];
    for (let C = range.s.c; C <= range.e.c; ++C) {
        let max_len = 15;
        for (let R = range.s.r; R <= range.e.r; ++R) {
            const cell = worksheet[XLSX.utils.encode_cell({ r: R, c: C })];
            if (cell && cell.v) {
                const len = cell.v.toString().length;
                if (len > max_len) max_len = len;
            }
        }
        wscols.push({ wch: max_len + 2 });
    }
    worksheet['!cols'] = wscols;

    XLSX.utils.book_append_sheet(workbook, worksheet, "CBAM Exposure");
    XLSX.writeFile(workbook, "CBAM_Exposure_Summary.xlsx");
}

// Expose functions to window for inline onclick handlers
window.setCurrency = setCurrency;
window.sectorChange = sectorChange;
window.simpleCalc = simpleCalc;
window.addProductRow = addProductRow;
window.updateCnList = updateCnList;
window.onCnChange = onCnChange;
window.removeRow = removeRow;
window.detailCalc = detailCalc;
window.phaseCalc = phaseCalc;
window.switchCalcTab = switchCalcTab;
window.setDL = setDL;
window.updateEvolutionTimeline = updateEvolutionTimeline;
window.downloadDetailedExcel = downloadDetailedExcel;
