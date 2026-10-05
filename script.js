// ===== مؤقّت التحضير =====
const clock = document.getElementById('clock');
const timerBox = document.querySelector('.timer');
const statusEl = document.getElementById('status');
const startBtn = document.getElementById('start');
const methodBtns = document.querySelectorAll('.methods .chip');

let total = 180, left = total, id = null;

const fmt = s => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
const render = () => { clock.textContent = fmt(left); };

function stop() { clearInterval(id); id = null; startBtn.textContent = 'ابدأ التحضير'; }

function reset() {
  stop(); left = total; timerBox.classList.remove('done');
  statusEl.textContent = ''; render();
}

startBtn.addEventListener('click', () => {
  if (id) { stop(); statusEl.textContent = 'متوقف مؤقتًا'; return; }
  if (left === 0) reset();
  timerBox.classList.remove('done');
  statusEl.textContent = 'جارٍ التحضير...';
  startBtn.textContent = 'إيقاف مؤقت';
  id = setInterval(() => {
    left--; render();
    if (left <= 0) {
      stop(); timerBox.classList.add('done');
      statusEl.textContent = 'قهوتك جاهزة. بالهناء والعافية!';
    }
  }, 1000);
});

document.getElementById('reset').addEventListener('click', reset);

methodBtns.forEach(btn => btn.addEventListener('click', () => {
  methodBtns.forEach(b => { b.classList.remove('is-on'); b.setAttribute('aria-pressed', 'false'); });
  btn.classList.add('is-on'); btn.setAttribute('aria-pressed', 'true');
  total = Number(btn.dataset.sec); reset();
}));

// ===== تصفية البُن =====
const filterBtns = document.querySelectorAll('.filters .chip');
const items = document.querySelectorAll('#list li');

filterBtns.forEach(btn => btn.addEventListener('click', () => {
  filterBtns.forEach(b => { b.classList.remove('is-on'); b.setAttribute('aria-pressed', 'false'); });
  btn.classList.add('is-on'); btn.setAttribute('aria-pressed', 'true');
  const r = btn.dataset.roast;
  items.forEach(li => { li.hidden = r !== 'all' && li.dataset.roast !== r; });
}));