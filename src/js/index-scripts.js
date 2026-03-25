
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
function resize() {
  canvas.width  = canvas.offsetWidth  * devicePixelRatio;
  canvas.height = canvas.offsetHeight * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);
}
resize();
window.addEventListener('resize', resize);
const W = () => canvas.offsetWidth;
const H = () => canvas.offsetHeight;

const particles = Array.from({length: 100}, () => ({
  x: Math.random() * 1400, y: Math.random() * 900,
  r: Math.random() * 2.2 + 0.3,
  dx: (Math.random() - 0.5) * 0.35,
  dy: -(Math.random() * 0.45 + 0.08),
  opacity: Math.random() * 0.55 + 0.08,
  color: Math.random() > 0.55 ? '#4caf7d' : Math.random() > 0.5 ? '#a8e6c3' : '#ffffff',
  pulse: Math.random() * Math.PI * 2
}));

const blobs = [
  { x: 0.72, y: 0.28, r: 300, color: 'rgba(45,122,79,0.13)',  dx:  0.0003,  dy:  0.00015 },
  { x: 0.25, y: 0.65, r: 220, color: 'rgba(76,175,125,0.07)', dx: -0.00018, dy:  0.00025 },
  { x: 0.88, y: 0.72, r: 180, color: 'rgba(13,43,30,0.5)',    dx:  0.00012, dy: -0.0002  },
];

let t = 0;
function draw() {
  const w = W(), h = H();
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#050f09';
  ctx.fillRect(0, 0, w, h);

  blobs.forEach(b => {
    b.x += b.dx; b.y += b.dy;
    if (b.x < 0.1 || b.x > 0.9) b.dx *= -1;
    if (b.y < 0.1 || b.y > 0.9) b.dy *= -1;
    const g = ctx.createRadialGradient(b.x*w, b.y*h, 0, b.x*w, b.y*h, b.r);
    g.addColorStop(0, b.color); g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(b.x*w, b.y*h, b.r, 0, Math.PI*2); ctx.fill();
  });

  ctx.strokeStyle = 'rgba(76,175,125,0.035)'; ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 65) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke(); }
  for (let y = 0; y < h; y += 65) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke(); }

  particles.forEach(p => {
    p.pulse += 0.018;
    ctx.globalAlpha = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));
    ctx.fillStyle = p.color;
    ctx.beginPath(); ctx.arc(p.x % w, p.y % h, p.r, 0, Math.PI*2); ctx.fill();
    p.x += p.dx; p.y += p.dy;
    if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
    if (p.x < 0) p.x = w;
    if (p.x > w) p.x = 0;
  });

  ctx.globalAlpha = 0.1 + 0.035 * Math.sin(t * 0.4);
  const streak = ctx.createLinearGradient(0, 0, w, 0);
  streak.addColorStop(0, 'transparent');
  streak.addColorStop(0.25, '#4caf7d');
  streak.addColorStop(0.75, '#2d7a4f');
  streak.addColorStop(1, 'transparent');
  ctx.fillStyle = streak;
  ctx.fillRect(0, h * (0.68 + 0.03 * Math.sin(t * 0.18)), w, 1.5);
  ctx.globalAlpha = 1;
  t += 0.016;
  requestAnimationFrame(draw);
}
draw();


  const el = document.getElementById('counter');
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


  const GRID = 'rgba(255,255,255,0.06)';
  const TICK = 'rgba(255,255,255,0.3)';
  const FONT = { family: 'DM Sans', size: 10 };

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
          title: { display: true, text: yLabel, color: 'rgba(255,255,255,0.3)', font: { family:'DM Sans', size:9 } },
          ticks: { color: TICK, font: FONT },
          grid: { color: GRID, drawBorder: false },
          border: { color: 'rgba(255,255,255,0.15)' }
        }
      }
    };
  }

  new Chart(document.getElementById('c1'), {
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

  new Chart(document.getElementById('c2'), {
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

  new Chart(document.getElementById('c3'), {
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

  new Chart(document.getElementById('c4'), {
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


  const countryData = {};
  document.querySelectorAll('#country-select option').forEach(opt => {
    countryData[opt.value] = {
      flag: opt.getAttribute('data-flag'),
      code: opt.getAttribute('data-code'),
      min: parseInt(opt.getAttribute('data-min')),
      max: parseInt(opt.getAttribute('data-max')),
      name: opt.text.split(' (')[0]
    };
  });
  function updateFlag(sel) {
    const c = countryData[sel.value];
    document.getElementById('flag-emoji').textContent = c.flag;
    document.getElementById('flag-code').textContent = c.code;
    const input = document.getElementById('phone-input');
    input.value = ''; input.maxLength = c.max;
    const wrap = document.getElementById('phone-wrap');
    const errMsg = document.getElementById('phone-error-msg');
    wrap.classList.remove('phone-error','phone-valid');
    errMsg.style.display = 'none';
  }
  function onPhoneInput(input) {
    const digits = input.value.replace(/\D/g,'');
    const sel = document.getElementById('country-select');
    const c = countryData[sel.value];
    input.value = digits.slice(0, c.max);
    const wrap = document.getElementById('phone-wrap');
    const errMsg = document.getElementById('phone-error-msg');
    if (digits.length === 0) { wrap.classList.remove('phone-error','phone-valid'); errMsg.style.display='none'; }
    else if (digits.length >= c.min && digits.length <= c.max) { wrap.classList.remove('phone-error'); wrap.classList.add('phone-valid'); errMsg.style.display='none'; }
  }
  function handleSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('phone-input');
    const sel = document.getElementById('country-select');
    const c = countryData[sel.value];
    const digits = input.value.replace(/\D/g,'');
    const wrap = document.getElementById('phone-wrap');
    const errMsg = document.getElementById('phone-error-msg');
    if (digits.length > 0 && (digits.length < c.min || digits.length > c.max)) {
      wrap.classList.add('phone-error'); wrap.classList.remove('phone-valid');
      errMsg.style.display = 'block';
      errMsg.textContent = c.min === c.max
        ? 'Please enter a valid ' + c.min + '-digit number for ' + c.name
        : 'Please enter a valid ' + c.min + '\u2013' + c.max + ' digit number for ' + c.name;
      input.focus(); return;
    }
    wrap.classList.remove('phone-error'); errMsg.style.display='none';
    alert('Message sent successfully! We will be in touch shortly.');
  }
