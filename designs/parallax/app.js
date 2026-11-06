// Parallax design. Prices and hours come live from the booking link once BOOKING_LINK_ID is set
// (see ../shared/live.js); until then the sample below is shown. Photos and reviews are samples.
// The scroll effects run only when <html> has the `fx` class (no reduced-motion request).

import { setLang, loadData, setupBooking, bookButton, el, formatPrice, formatDuration, formatTime, weekRows, openState } from '../shared/live.js';
import { mountDemo } from '../shared/demo.js?v=6';

// Client page: put the id of the public booking link from the Appointments & Reports app here.
const BOOKING_LINK_ID = '';

const SAMPLE = {
  currency: 'USD',
  hasHours: true,
  hours: [null, { start: 600, end: 1140 }, { start: 600, end: 1140 }, { start: 600, end: 1200 }, { start: 600, end: 1200 }, { start: 540, end: 1080 }, { start: 600, end: 960 }],
  services: [
    { id: 's1', name: 'Cut & finish', durationMinutes: 60, price: 55, showPrice: true, description: 'Wash, cut, blow-dry' },
    { id: 's2', name: 'Long layers', durationMinutes: 75, price: 65, showPrice: true, description: 'Shaped to grow out well' },
    { id: 's3', name: 'Root colour', durationMinutes: 90, price: 70, showPrice: true, description: 'Includes toner' },
    { id: 's4', name: 'Balayage', durationMinutes: 180, price: 160, showPrice: true, description: 'Hand-painted, with cut' },
    { id: 's5', name: 'Blow-dry & style', durationMinutes: 45, price: 35, showPrice: true, description: '' },
    { id: 's6', name: 'Gloss treatment', durationMinutes: 30, price: 30, showPrice: true, description: 'Shine and softness' }
  ]
};

const REVIEWS = [
  { q: 'I’ve never had a cut grow out this well. Three months later it still has shape.', n: 'Client name', s: 'Long layers' },
  { q: 'The balayage looks like I came back from a month by the sea.', n: 'Client name', s: 'Balayage' },
  { q: 'Booked at midnight, sat down on the minute, left with a plan for my hair.', n: 'Client name', s: 'Cut & finish' },
  { q: 'Finally a colour that fades nicely instead of turning brassy.', n: 'Client name', s: 'Root colour' }
];

setLang('en');
mountDemo('parallax');
setupBooking({ linkId: BOOKING_LINK_ID, theme: 'dark' });

const FX = document.documentElement.classList.contains('fx');

// ---------- services ----------

const menu = document.getElementById('menu');

function renderMenu(data) {
  menu.replaceChildren();
  if (!data.services.length) {
    document.getElementById('menu-note').textContent = 'All services and prices are on the booking page.';
    return;
  }
  data.services.forEach((svc, i) => {
    const li = el('li');
    li.style.setProperty('--i', String(i));
    const item = bookButton('', { linkId: BOOKING_LINK_ID, service: svc, className: 'menu-item' });
    item.appendChild(el('span', 'm-name', svc.name));
    item.appendChild(el('span', 'm-price', svc.showPrice ? formatPrice(svc.price, data.currency) : ''));
    const meta = el('span', 'm-meta', formatDuration(svc.durationMinutes) + (svc.description ? ` · ${svc.description}` : ''));
    meta.appendChild(el('strong', null, 'Book →'));
    item.appendChild(meta);
    li.appendChild(item);
    menu.appendChild(li);
  });
  if (FX) reveals.observe(menu);
  measure();
}

// ---------- hours ----------

const short = minutes => formatTime(minutes).replace(':00', '');
const shortRange = range => `${short(range.start)}–${short(range.end)}`;

function renderHours(data) {
  const big = document.getElementById('big-time');
  const week = document.getElementById('week');
  const status = document.getElementById('status');
  week.replaceChildren();
  if (!data.hasHours) {
    big.textContent = 'Book online';
    document.getElementById('hours-note').textContent = 'See the free times on the booking page.';
    status.hidden = true;
    return;
  }
  const rows = weekRows(data);
  const now = rows.find(r => r.isToday);
  big.textContent = now.range ? `Today ${shortRange(now.range)}` : 'Closed today';
  for (const row of rows) {
    const li = el('li', row.isToday ? 'is-today' : '');
    li.appendChild(el('b', null, row.short));
    li.append(row.range ? shortRange(row.range) : 'Closed');
    week.appendChild(li);
  }
  const state = openState(data, { open: 'Open now · until', closed: 'Closed now · book online' });
  status.textContent = state.label;
  status.classList.toggle('is-open', state.isOpen);
  status.hidden = false;
}

// ---------- reviews, one at a time ----------

const quoteBox = document.querySelector('.quote');
const quoteText = document.getElementById('quote-text');
const quoteWho = document.getElementById('quote-who');
const dots = document.getElementById('dots');
let current = 0;
let timer = 0;

function showReview(i) {
  current = i;
  quoteText.textContent = REVIEWS[i].q;
  quoteWho.textContent = `${REVIEWS[i].n} · ${REVIEWS[i].s}`;
  for (const [k, dot] of [...dots.children].entries()) dot.setAttribute('aria-current', String(k === i));
}
function goTo(i) {
  quoteBox.classList.add('is-fading');
  setTimeout(() => { showReview(i); quoteBox.classList.remove('is-fading'); }, 350);
}
REVIEWS.forEach((r, i) => {
  const dot = el('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `Review ${i + 1}`);
  dot.addEventListener('click', () => { clearInterval(timer); goTo(i); });
  dots.appendChild(dot);
});
showReview(0);
if (FX) timer = setInterval(() => goTo((current + 1) % REVIEWS.length), 7000);

// ---------- header + progress (always) ----------

const top = document.getElementById('top');
const bar = document.getElementById('progress');

// ---------- scroll effects ----------

// Sections arrive once, each with the effect named in data-reveal.
const reveals = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    (watched.get(entry.target) || entry.target).classList.add('is-in');
    reveals.unobserve(entry.target);
  }
}, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

// The statement: one span per word, lit in order as it crosses the screen.
const statement = document.querySelector('[data-words]');
const ACCENT = new Set(['listen', 'cut', 'yourself']);
let words = [];
if (FX && statement) {
  const text = statement.textContent.trim();
  statement.replaceChildren(el('span', 'sr-only', text));
  text.split(/\s+/).forEach((word, i, all) => {
    const span = el('span', 'w', word);
    span.setAttribute('aria-hidden', 'true');
    if (ACCENT.has(word.replace(/[^a-z]/gi, '').toLowerCase())) span.classList.add('is-accent');
    statement.append(span, i < all.length - 1 ? ' ' : '');
    words.push(span);
  });
}

const layers = [...document.querySelectorAll('[data-speed]')].map(node => ({
  node, speed: Number(node.dataset.speed), parent: node.parentElement, slack: Infinity
}));
const fade = document.querySelector('[data-fade]');
const hero = document.getElementById('hero');
const reel = document.getElementById('work');
const track = document.getElementById('reel-track');
const cards = [...document.querySelectorAll('.stack .card')];
cards.forEach((card, i) => card.style.setProperty('--i', String(i)));

let vh = window.innerHeight;
let reelTrip = 0;

function measure() {
  vh = window.innerHeight;
  for (const layer of layers) {
    // A photo bigger than its frame may only move as far as its spare edge; the hero layers are free.
    const spare = (layer.node.offsetHeight - layer.parent.offsetHeight) / 2;
    layer.slack = layer.parent.classList.contains('hero') || layer.node.parentElement === hero || spare <= 0 ? Infinity : spare;
  }
  if (FX && track) {
    reelTrip = Math.max(0, track.scrollWidth - window.innerWidth + 40);
    reel.style.setProperty('--reel-h', `${Math.round(vh + reelTrip)}px`);
  }
  update();
}

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
let queued = false;

function update() {
  queued = false;
  const y = window.scrollY;
  top.classList.toggle('is-solid', y > 40);
  const max = document.documentElement.scrollHeight - vh;
  bar.style.transform = `scaleX(${max > 0 ? clamp(y / max, 0, 1) : 0})`;
  if (!FX) return;

  // Layers: each moves at its own speed against its section's distance from the screen centre.
  for (const layer of layers) {
    const r = layer.parent.getBoundingClientRect();
    if (r.bottom < -200 || r.top > vh + 200) continue;
    const shift = clamp(-(r.top + r.height / 2 - vh / 2) * layer.speed, -layer.slack, layer.slack);
    layer.node.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
  }

  // Hero text drifts down and fades as the hero leaves.
  const h = hero.offsetHeight;
  if (y < h) {
    const p = y / h;
    fade.style.opacity = String(clamp(1 - p * 1.4, 0, 1));
    fade.style.transform = `translate3d(0, ${(p * 90).toFixed(1)}px, 0)`;
  }

  // Statement words.
  if (words.length) {
    const r = statement.getBoundingClientRect();
    const p = clamp((vh * 0.85 - r.top) / (vh * 0.5 + r.height * 0.6), 0, 1);
    const lit = Math.round(p * words.length);
    words.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
  }

  // Reel: vertical scroll through the pinned section becomes a sideways trip.
  if (reelTrip) {
    const r = reel.getBoundingClientRect();
    const p = clamp(-r.top / (r.height - vh), 0, 1);
    track.style.transform = `translate3d(${(-p * reelTrip).toFixed(1)}px, 0, 0)`;
  }

  // Steps: a card shrinks back a little as the next one slides over it.
  for (let i = 0; i < cards.length - 1; i++) {
    const a = cards[i].getBoundingClientRect();
    const b = cards[i + 1].getBoundingClientRect();
    const p = clamp(1 - (b.top - a.top) / (vh * 0.6), 0, 1);
    cards[i].style.transform = `scale(${(1 - p * 0.06).toFixed(3)})`;
    cards[i].style.filter = p > 0 ? `brightness(${(1 - p * 0.25).toFixed(3)})` : '';
  }
}

function onScroll() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(update);
}

// A frame hidden by clip-path has no visible area, so the observer would never see it arrive:
// those are watched through their parent instead.
const watched = new Map();
if (FX) for (const node of document.querySelectorAll('[data-reveal]')) {
  const clipped = node.dataset.reveal === 'wipe' || node.dataset.reveal === 'curtain';
  const target = clipped ? node.parentElement : node;
  if (clipped) watched.set(target, node);
  reveals.observe(target);
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', measure);
window.addEventListener('load', measure);
for (const img of track.querySelectorAll('img')) img.addEventListener('load', measure, { once: true });
measure();

// Data last: the sample renders at once and needs the scroll code above.
loadData({ linkId: BOOKING_LINK_ID, sample: SAMPLE }, data => {
  renderMenu(data);
  renderHours(data);
});
