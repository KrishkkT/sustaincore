

// Ensure hero video autoplays
document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.hero-video');
  if (video) {
    video.muted = true;
    video.play().catch(err => {
      console.warn("Hero video autoplay was prevented by browser. Retrying on first interaction.", err);
      // Fallback: try to play on any user interaction if blocked
      const playOnInteraction = () => {
        video.play();
        document.removeEventListener('click', playOnInteraction);
        document.removeEventListener('touchstart', playOnInteraction);
      };
      document.addEventListener('click', playOnInteraction);
      document.addEventListener('touchstart', playOnInteraction);
    });
  }
});

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


  // Form logic (already updated to avoid errors)


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
  async function handleSubmit(e) {
    e.preventDefault();
    
    const form = e.target.closest('div'); // The form wrapper
    const name = form.querySelector('input[placeholder="Full name"]').value;
    const company = form.querySelector('input[placeholder="Company name"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const phone = document.getElementById('phone-input').value;
    const countryCode = document.getElementById('flag-code').textContent;
    const service = form.querySelector('select').value;
    const message = form.querySelector('textarea').value;

    const sel = document.getElementById('country-select');
    const c = countryData[sel.value];
    const digits = phone.replace(/\D/g,'');
    const wrap = document.getElementById('phone-wrap');
    const errMsg = document.getElementById('phone-error-msg');

    // Validation
    if (!name || !email || !service) {
      alert('Please fill in all required fields (Name, Email, and Service).');
      return;
    }

    if (digits.length > 0 && (digits.length < c.min || digits.length > c.max)) {
      wrap.classList.add('phone-error');
      errMsg.style.display = 'block';
      errMsg.textContent = 'Please enter a valid phone number.';
      return;
    }

    const submitBtn = form.querySelector('.s5-submit');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="animate-pulse">Processing...</span>';
    submitBtn.disabled = true;

    try {
      const response = await fetch('https://formspree.io/f/maqlwazp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          company,
          email,
          phone: `${countryCode} ${digits}`,
          service,
          message,
          source: 'Homepage Consultation Form'
        })
      });

      if (response.ok) {
        showSuccessModal();
        // Clear form
        form.querySelectorAll('input, textarea').forEach(i => i.value = '');
        form.querySelector('select').value = '';
        wrap.classList.remove('phone-valid','phone-error');
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      alert('Oops! There was a problem submitting your form. Please try again later.');
    } finally {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  }

  function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
      modal.classList.add('active');
      // Auto-close after 5 seconds
      setTimeout(() => {
        modal.classList.remove('active');
      }, 5000);
    } else {
      alert('Message sent successfully! We will be in touch shortly.');
    }
  }

  // Global close function for modal
  window.closeModal = function() {
    const modal = document.getElementById('success-modal');
    if (modal) modal.classList.remove('active');
  };
