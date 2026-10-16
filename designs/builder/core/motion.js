// Scroll animations for every section, without a library: reveal on enter, word-by-word headings,
// light parallax and counters. All of it is off when the visitor prefers reduced motion or switches
// "Reduce motion" on in the builder; then elements are simply shown in their final state.

const media = window.matchMedia('(prefers-reduced-motion: reduce)');
let forced = false;
const listeners = new Set();

export const motion = {
  get reduced() { return media.matches || forced; },
  get system() { return media.matches; },
  force(value) {
    forced = !!value;
    document.documentElement.classList.toggle('reduce-motion', motion.reduced);
    for (const fn of listeners) fn(motion.reduced);
  },
  onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }
};
media.addEventListener('change', () => motion.force(forced));

export const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Runs cb the first time `node` comes near the viewport. Returns a function that cancels it.
export function onVisible(node, cb, { rootMargin = '300px 0px', once = true } = {}) {
  if (!('IntersectionObserver' in window)) { cb(true); return () => {}; }
  const io = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        cb(true);
        if (once) io.disconnect();
      } else if (!once) cb(false);
    }
  }, { rootMargin });
  io.observe(node);
  return () => io.disconnect();
}

// ---------- reveal + split text ----------

let revealer = null;
function getRevealer() {
  if (!revealer && 'IntersectionObserver' in window) {
    revealer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        revealer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  }
  return revealer;
}

// Splits a heading into words. The full sentence stays readable for screen readers (sr-only copy);
// the animated words are aria-hidden.
export function splitWords(node) {
  if (node.dataset.splitDone) return;
  const text = node.textContent;
  node.textContent = '';
  const sr = document.createElement('span');
  sr.className = 'sr-only';
  sr.textContent = text;
  const shown = document.createElement('span');
  shown.setAttribute('aria-hidden', 'true');
  text.split(/(\s+)/).forEach((part, i) => {
    if (/^\s+$/.test(part)) { shown.append(part); return; }
    const outer = document.createElement('span');
    outer.className = 'w';
    const inner = document.createElement('span');
    inner.textContent = part;
    inner.style.setProperty('--wi', String(Math.floor(i / 2)));
    outer.appendChild(inner);
    shown.appendChild(outer);
  });
  node.append(sr, shown);
  node.dataset.splitDone = '1';
}

export function reveal(root) {
  for (const node of root.querySelectorAll('[data-split]')) splitWords(node);
  const targets = [...root.querySelectorAll('[data-reveal], [data-split]')];
  if (root.matches?.('[data-reveal]')) targets.push(root);
  const io = getRevealer();
  for (const node of targets) {
    if (!io || motion.reduced) node.classList.add('is-in');
    else io.observe(node);
  }
}

// ---------- parallax ----------

const parallaxNodes = new Set();
let ticking = false;
function updateParallax() {
  ticking = false;
  const vh = window.innerHeight;
  for (const node of parallaxNodes) {
    if (!node.isConnected) { parallaxNodes.delete(node); continue; }
    const rect = node.parentElement.getBoundingClientRect();
    if (rect.bottom < -100 || rect.top > vh + 100) continue;
    const speed = Number(node.dataset.parallax) || 0.15;
    const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
    node.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
  }
}
function requestParallax() {
  if (!ticking && !motion.reduced) { ticking = true; requestAnimationFrame(updateParallax); }
}
window.addEventListener('scroll', requestParallax, { passive: true });
window.addEventListener('resize', requestParallax, { passive: true });
motion.onChange(reduced => {
  if (reduced) for (const node of parallaxNodes) node.style.transform = '';
  else requestParallax();
});

export function parallax(root) {
  for (const node of root.querySelectorAll('[data-parallax]')) parallaxNodes.add(node);
  requestParallax();
}

// ---------- counters ----------

export function countUp(node, to, { decimals = 0, duration = 1600, format = v => v.toFixed(decimals) } = {}) {
  if (motion.reduced) { node.textContent = format(to); return () => {}; }
  let raf = 0;
  const cancel = onVisible(node, () => {
    const start = performance.now();
    const step = now => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - p) ** 3;
      node.textContent = format(to * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  }, { rootMargin: '0px 0px -10% 0px' });
  node.textContent = format(0);
  return () => { cancel(); cancelAnimationFrame(raf); };
}

// ---------- tilt ----------

// 3D tilt that follows the pointer (mouse hover or a finger dragging on the card). Sets --rx/--ry
// for the rotation and --gx/--gy for the light reflex; the CSS does the rest.
export function tilt(node, { max = 10 } = {}) {
  if (motion.reduced) return () => {};
  let raf = 0;
  let pending = null;
  const apply = () => {
    raf = 0;
    if (!pending) return;
    const { x, y } = pending;
    node.style.setProperty('--ry', `${((x - 0.5) * 2 * max).toFixed(2)}deg`);
    node.style.setProperty('--rx', `${((0.5 - y) * 2 * max).toFixed(2)}deg`);
    node.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
    node.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
  };
  const move = e => {
    const rect = node.getBoundingClientRect();
    pending = { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height };
    node.classList.add('is-tilting');
    if (!raf) raf = requestAnimationFrame(apply);
  };
  const leave = () => {
    pending = null;
    node.classList.remove('is-tilting');
    node.style.setProperty('--rx', '0deg');
    node.style.setProperty('--ry', '0deg');
  };
  node.addEventListener('pointermove', move);
  node.addEventListener('pointerleave', leave);
  node.addEventListener('pointercancel', leave);
  node.addEventListener('pointerup', e => { if (e.pointerType !== 'mouse') leave(); });
  return () => {
    node.removeEventListener('pointermove', move);
    node.removeEventListener('pointerleave', leave);
    node.removeEventListener('pointercancel', leave);
    cancelAnimationFrame(raf);
  };
}

// Device tilt for phones (hero, gift card). iOS asks for permission, which can only be requested
// from a tap; callers pass the event of that tap. Returns a cleanup function.
export function deviceTilt(cb) {
  if (motion.reduced || !('DeviceOrientationEvent' in window)) return () => {};
  const handler = e => {
    if (e.beta == null || e.gamma == null) return;
    cb(Math.max(-1, Math.min(1, e.gamma / 30)), Math.max(-1, Math.min(1, (e.beta - 45) / 30)));
  };
  window.addEventListener('deviceorientation', handler);
  return () => window.removeEventListener('deviceorientation', handler);
}

export async function askTiltPermission() {
  const D = window.DeviceOrientationEvent;
  if (D && typeof D.requestPermission === 'function') {
    try { return (await D.requestPermission()) === 'granted'; } catch { return false; }
  }
  return true;
}
