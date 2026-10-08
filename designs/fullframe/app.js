// Full frame design. Prices and hours come live from the booking link once BOOKING_LINK_ID is set
// (see ../shared/live.js); until then the sample below is shown. Photos and reviews are samples.

import { setLang, loadData, setupBooking, bookButton, el, formatPrice, formatDuration, formatTime, weekRows, openState } from '../shared/live.js';
import { mountDemo } from '../shared/demo.js';

// Client page: put the id of the public booking link from the Appointments & Reports app here.
const BOOKING_LINK_ID = '';

const SAMPLE = {
  currency: 'USD',
  hasHours: true,
  hours: [null, { start: 540, end: 1140 }, { start: 540, end: 1140 }, { start: 540, end: 1140 }, { start: 540, end: 1200 }, { start: 480, end: 1020 }, null],
  services: [
    { id: 's1', name: 'Classic cut', durationMinutes: 30, price: 25, showPrice: true, description: '' },
    { id: 's2', name: 'Skin fade', durationMinutes: 45, price: 30, showPrice: true, description: '' },
    { id: 's3', name: 'Cut + beard', durationMinutes: 50, price: 38, showPrice: true, description: '' },
    { id: 's4', name: 'Beard shape-up', durationMinutes: 20, price: 15, showPrice: true, description: '' },
    { id: 's5', name: 'Hot towel shave', durationMinutes: 30, price: 28, showPrice: true, description: '' },
    { id: 's6', name: 'Buzz cut', durationMinutes: 15, price: 15, showPrice: true, description: '' },
    { id: 's7', name: 'Kids cut', durationMinutes: 25, price: 18, showPrice: true, description: '' }
  ]
};

const REVIEWS = [
  { q: 'In and out on time. Fade was spot on.', n: 'Client name', s: 'Skin fade' },
  { q: 'Best hot towel shave in town, hands down.', n: 'Client name', s: 'Hot towel shave' },
  { q: 'Booked from the bus, sat down on the minute.', n: 'Client name', s: 'Classic cut' },
  { q: 'My kid actually asks to come back.', n: 'Client name', s: 'Kids cut' }
];

setLang('en');
mountDemo('fullframe');
setupBooking({ linkId: BOOKING_LINK_ID, theme: 'dark' });

// ---------- the frame: each section brings in its photo ----------

const photos = [...document.querySelectorAll('#backdrop img')];
const captionN = document.getElementById('caption-n');
const captionT = document.getElementById('caption-t');
let shown = 0;

function show(index) {
  if (index === shown || !photos[index]) return;
  photos[shown].classList.remove('is-on');
  photos[index].classList.add('is-on');
  shown = index;
  captionN.textContent = String(index + 1).padStart(2, '0');
  captionT.textContent = photos[index].dataset.caption;
}

const frames = new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) show(Number(entry.target.dataset.bg));
}, { rootMargin: '-45% 0px -45% 0px' });
for (const section of document.querySelectorAll('[data-bg]')) frames.observe(section);

// Warm up the other photos once the first one is in.
window.addEventListener('load', () => { for (const img of photos) img.decode?.().catch(() => {}); });

const top = document.querySelector('.top');
const onScroll = () => top.classList.toggle('is-solid', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- price board ----------

function renderBoard(data) {
  const list = document.getElementById('board-list');
  list.replaceChildren();
  if (!data.services.length) {
    document.getElementById('board-note').textContent = 'All cuts and prices are on the booking page.';
    return;
  }
  for (const svc of data.services) {
    const li = el('li');
    const item = bookButton('', { linkId: BOOKING_LINK_ID, service: svc, className: 'board-item' });
    item.appendChild(el('span', 'b-name', svc.name));
    item.appendChild(el('span', 'b-price', svc.showPrice ? formatPrice(svc.price, data.currency) : ''));
    const meta = el('span', 'b-meta', formatDuration(svc.durationMinutes) + (svc.description ? ` · ${svc.description}` : ''));
    meta.appendChild(el('strong', null, 'Book →'));
    item.appendChild(meta);
    li.appendChild(item);
    list.appendChild(li);
  }
}

// ---------- hours ----------

// Poster-size times: "9 AM–7 PM", minutes only when they are not :00.
const short = minutes => formatTime(minutes).replace(':00', '');
const shortRange = range => `${short(range.start)}–${short(range.end)}`;

function renderHours(data) {
  const big = document.getElementById('big-time');
  const week = document.getElementById('week');
  const today = document.getElementById('today');
  week.replaceChildren();
  if (!data.hasHours) {
    big.textContent = 'Book online';
    document.getElementById('hours-note').textContent = 'See the free times on the booking page.';
    today.hidden = true;
    return;
  }
  const rows = weekRows(data);
  const now = rows.find(r => r.isToday);
  big.textContent = now.range ? shortRange(now.range) : 'Closed today';
  for (const row of rows) {
    const li = el('li', row.isToday ? 'is-today' : row.range ? 'open' : 'closed');
    li.appendChild(el('b', null, row.short));
    li.append(row.range ? shortRange(row.range) : 'Closed');
    week.appendChild(li);
  }
  const state = openState(data, { open: 'Open now · until', closed: 'Closed now · book online' });
  today.textContent = state.label;
  today.classList.toggle('is-open', state.isOpen);
  today.hidden = false;
}

loadData({ linkId: BOOKING_LINK_ID, sample: SAMPLE }, data => {
  renderBoard(data);
  renderHours(data);
});

// ---------- one review at a time ----------

const quote = document.getElementById('quote');
const dots = document.getElementById('dots');
let currentReview = 0;
let timer = 0;

function renderQuote(i) {
  currentReview = i;
  const r = REVIEWS[i];
  quote.replaceChildren();
  quote.appendChild(el('blockquote', null, r.q));
  const cap = el('figcaption', null, `${r.n} · ${r.s}`);
  cap.appendChild(el('span', 'tag', 'Sample review'));
  quote.appendChild(cap);
  for (const [k, dot] of [...dots.children].entries()) dot.setAttribute('aria-current', String(k === i));
}

function goTo(i) {
  quote.classList.add('is-fading');
  setTimeout(() => { renderQuote(i); quote.classList.remove('is-fading'); }, 350);
}

REVIEWS.forEach((r, i) => {
  const dot = el('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `Review ${i + 1}`);
  dot.addEventListener('click', () => { clearInterval(timer); goTo(i); });
  dots.appendChild(dot);
});
renderQuote(0);
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  timer = setInterval(() => goTo((currentReview + 1) % REVIEWS.length), 6000);
}
