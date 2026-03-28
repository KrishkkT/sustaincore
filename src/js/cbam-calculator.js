import { CN_CODES } from './cbam-data.js';

/**
 * SustainCore CBAM Calculator & Interactive Suite
 * Implements EU methodology (Regulation 2023/956)
 */

// ─── CONSTANTS ─────────────────────────────────────────────────────────
// ... [rest of the file content] ...
// (Note: I will include the full updated file content in the ReplacementContent)


// ─── CONSTANTS ─────────────────────────────────────────────────────────
const CBAM_FACTORS = {
    2026: 0.025, 2027: 0.05, 2028: 0.10, 2029: 0.16, 
    2030: 0.22, 2031: 0.34, 2032: 0.49, 2033: 0.70, 2034: 1.00
};

const SECTOR_DEFAULTS = {
    'steel': { base: 1.89, actual: 1.10, label: 'Iron & Steel' },
    'aluminium': { base: 1.49, actual: 0.85, label: 'Aluminium' },
    'cement': { base: 0.83, actual: 0.61, label: 'Cement' },
    'fertiliser': { base: 1.69, actual: 1.05, label: 'Fertilisers' },
    'hydrogen': { base: 10.4, actual: 6.5, label: 'Hydrogen' },
    'electricity': { base: 0.55, actual: 0.35, label: 'Electricity' }
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
const fv = (n) => (parseFloat(n)||0).toLocaleString();

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
        document.getElementById('s-def-ef').value = (d.base * markup).toFixed(3);
        document.getElementById('s-act-ef').value = d.actual.toFixed(3);
    }
    simpleCalc();
}

function simpleCalc() {
    const vol = parseFloat(document.getElementById('s-vol').value) || 0;
    const ets = parseFloat(document.getElementById('s-ets').value) || 70;
    const defEf = parseFloat(document.getElementById('s-def-ef').value) || 0;
    const actEf = parseFloat(document.getElementById('s-act-ef').value) || 0;
    const yr = parseInt(document.getElementById('s-year').value) || 2026;
    const factor = CBAM_FACTORS[yr] || 0.025;
    
    // Formula: Certificates = Volume × EmissionFactor × Factor; Cost = Certs × ETS_price
    const certsDefault = vol * defEf * factor;
    const certsActual = vol * actEf * factor;
    const costDefault = certsDefault * ets;
    const costActual = certsActual * ets;
    const saving = costDefault - costActual;
    
    // Update UI Results
    document.getElementById('r-vol').textContent = fv(vol) + ' tonnes';
    document.getElementById('r-def-ef').textContent = ft(defEf, 3) + ' tCO₂e/t (default + markup)';
    document.getElementById('r-act-ef').textContent = ft(actEf, 3) + ' tCO₂e/t (verified)';
    document.getElementById('r-ets').textContent = '€' + ets + '/t';
    document.getElementById('r-factor').textContent = (factor * 100).toFixed(1) + '% (' + yr + ')';
    document.getElementById('r-certs-def').textContent = ft(certsDefault, 1) + ' tCO₂e';
    document.getElementById('r-certs-act').textContent = ft(certsActual, 1) + ' tCO₂e';
    document.getElementById('r-def-cost').textContent = fe(costDefault);
    document.getElementById('r-act-cost').textContent = fe(costActual);
    document.getElementById('r-saving').textContent = fe(saving);
    
    const box = document.getElementById('rib-save');
    if (saving > 100) {
        if (box) box.style.display = 'block';
        const msg = document.getElementById('rib-save-msg');
        if (msg) {
            msg.innerHTML = `Using <strong>verified actual emissions data</strong> instead of EU default values saves <strong>${fe(saving)}</strong> in CBAM certificate costs in ${yr}. This saving grows each year as the CBAM phase-in factor rises and ETS prices increase.`;
        }
    } else if (box) {
        box.style.display = 'none';
    }
}

// ─── DETAILED CN MULTI-PRODUCT ─────────────────────────────────────────
let rowCounter = 0;

function getSectorCNOptions(sector) {
    // Filter CN_CODES from cbam-data.js (assumed global or imported)
    return CN_CODES.filter(c => c[2] === sector).map(c => {
        const total = (c[3] || 0) + (c[4] || 0);
        return `<option value="${c[0]}" data-def="${total.toFixed(3)}">${c[0]} — ${c[1].substring(0,60)}...</option>`;
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
                <select class="w-full bg-white dark:bg-slate-900 border-none rounded-xl px-4 py-3 text-xs font-medium outline-none" onchange="updateCnList(${id}, this.value)">${sectorOpts}</select>
            </div>
            <div class="space-y-2 lg:col-span-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Product / CN Code <span id="def-hint-${id}" class="text-brand-green font-bold normal-case"></span></label>
                <select id="cn-sel-${id}" class="w-full bg-white dark:bg-slate-900 border-none rounded-xl px-4 py-3 text-xs font-medium outline-none" onchange="onCnChange(${id})">${cnOpts}</select>
            </div>
            <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Vol (t/yr)</label>
                <input type="number" id="vol-${id}" value="1000" min="0" class="w-full bg-white dark:bg-slate-900 border-none rounded-xl px-4 py-3 text-xs font-medium outline-none" oninput="detailCalc()" />
            </div>
            <div class="space-y-2 relative">
                <button onclick="removeRow(${id})" class="absolute -top-6 right-0 text-red-500 hover:text-red-600 text-xs font-bold transition-colors" title="Remove row">✕ Remove</button>
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Actual EF</label>
                <input type="number" id="aef-${id}" step="0.001" placeholder="Verified" class="w-full bg-emerald-50/50 dark:bg-emerald-900/5 border border-emerald-100 dark:border-emerald-900/20 rounded-xl px-4 py-3 text-xs font-bold text-emerald-600 dark:text-emerald-400 outline-none" oninput="detailCalc()" />
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
        const def = parseFloat(opt.getAttribute('data-def')) || 0;
        const hint = document.getElementById('def-hint-' + id);
        if (hint) hint.textContent = `Default: ${def.toFixed(3)}`;
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
    const ets = parseFloat(document.getElementById('d-ets').value) || 70;
    const factor = CBAM_FACTORS[yr] || 0.025;
    const rows = document.querySelectorAll('#product-rows .product-row');
    
    let totalCostDef = 0;
    let totalCostAct = 0;
    let tableHtml = '';

    rows.forEach(row => {
        const id = row.id.replace('prow-', '');
        const cnSel = document.getElementById('cn-sel-' + id);
        if (!cnSel) return;
        
        const opt = cnSel.options[cnSel.selectedIndex];
        const cnFull = opt.text;
        const cnCode = opt.value;
        const cnName = cnFull.includes(' — ') ? cnFull.split(' — ')[1].split(' [')[0] : 'Product';
        // Cleaner CN Name in summary
        const shortName = cnCode + ' ' + (cnName.length > 25 ? cnName.substring(0, 22) + '...' : cnName);

        const defEfBase = parseFloat(opt.getAttribute('data-def')) || 0;
        const sectorSel = row.querySelector('select');
        const sector = sectorSel ? sectorSel.value : 'steel';
        const markup = getMarkup(sector, yr);
        const defEf = defEfBase * markup;
        
        const vol = parseFloat(document.getElementById('vol-' + id).value) || 0;
        const aefInput = document.getElementById('aef-' + id);
        const actEf = aefInput && aefInput.value ? parseFloat(aefInput.value) : null;
        
        const certsDef = vol * defEf * factor;
        const certsAct = actEf !== null ? vol * actEf * factor : certsDef;
        
        const costDef = certsDef * ets;
        const costAct = certsAct * ets;
        const saving = costDef - costAct;
        
        totalCostDef += costDef;
        totalCostAct += costAct;

        tableHtml += `
            <tr class="border-b border-slate-50 dark:border-slate-800/50 text-xs">
                <td class="py-4 px-4 font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">${shortName}</td>
                <td class="py-4 px-4">${fv(vol)}</td>
                <td class="py-4 px-4 text-red-400 font-bold">${ft(defEf, 3)}</td>
                <td class="py-4 px-4 font-bold ${actEf !== null ? 'text-emerald-500' : 'text-slate-400'}">${actEf !== null ? ft(actEf, 3) : 'Default'}</td>
                <td class="py-4 px-4 text-slate-700 dark:text-white font-bold">${fe(costDef)}</td>
                <td class="py-4 px-4 text-emerald-500 font-bold">${fe(costAct)}</td>
                <td class="py-4 px-4 font-black ${saving > 0 ? 'text-brand-blue' : 'text-slate-400'}">${saving > 0 ? fe(saving) : '—'}</td>
            </tr>
        `;
    });

    const tbody = document.getElementById('det-tbody');
    if (tbody) tbody.innerHTML = tableHtml;
    
    document.getElementById('dt-cost-def').textContent = fe(totalCostDef);
    document.getElementById('dt-cost-act').textContent = fe(totalCostAct);
    const totalSaving = totalCostDef - totalCostAct;
    document.getElementById('dt-saving').textContent = fe(totalSaving);
    
    const savingBadge = document.getElementById('dt-saving-badge');
    if (savingBadge) {
        savingBadge.className = `inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ml-2 ${totalSaving > 0 ? 'bg-amber-400/20 text-amber-400' : 'bg-slate-800 text-slate-500'}`;
        savingBadge.textContent = totalSaving > 0 ? `SAVE ${Math.round((totalSaving/totalCostDef)*100)}%` : 'NO SAVING';
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
    
    if (!tbody) return;
    
    tbody.innerHTML = PO_SCHEDULE.map(r => {
        const ets = Math.round(baseEts * r.etsMult);
        const certs = vol * ef * r.f;
        const cost = certs * ets;
        const pct = Math.round(r.f * 100);
        
        return `<tr class="${r.yr === 2026 ? 'bg-white/5' : ''} border-b border-white/5 text-[11px]">
            <td class="py-3 px-2 font-bold">${r.yr}</td>
            <td class="py-3 px-2">${(r.f * 100).toFixed(1)}%</td>
            <td class="py-3 px-2 text-muted-foreground">€${ets}/t</td>
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
        ['cd-d', 'cd-h', 'cd-m', 'cd-s'].forEach(id => document.getElementById(id).textContent = '00');
        return;
    }
    const d = Math.floor(diff / 864e5), h = Math.floor(diff % 864e5 / 36e5), m = Math.floor(diff % 36e5 / 6e4), s = Math.floor(diff % 6e4 / 1e3);
    document.getElementById('cd-d').textContent = String(d).padStart(2, '0');
    document.getElementById('cd-h').textContent = String(h).padStart(2, '0');
    document.getElementById('cd-m').textContent = String(m).padStart(2, '0');
    document.getElementById('cd-s').textContent = String(s).padStart(2, '0');
}

// ─── INITIALIZATION ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Initial Calc Setup
    sectorChange();
    
    // Add 2 initial rows for Detailed Calculator (User requested exactly 2 by default)
    addProductRow('steel');
    addProductRow('aluminium');
    
    phaseCalc();
    
    // Countdown setup
    setDL(1);
    setInterval(tick, 1000);
});
