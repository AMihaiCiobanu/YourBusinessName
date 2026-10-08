// Depth design. Prices and hours come live from the booking link once BOOKING_LINK_ID is set
// (see ../shared/live.js); until then the sample below is shown. Portfolio and reviews are samples.

import { setLang, loadData, setupBooking, bookButton, el, formatPrice, formatDuration, weekRows, openState } from '../shared/live.js';
import { mountDemo } from '../shared/demo.js';

// Client page: put the id of the public booking link from the Appointments & Reports app here.
const BOOKING_LINK_ID = '';

const SAMPLE = {
  currency: 'USD',
  hasHours: true,
  hours: [null, { start: 720, end: 1200 }, { start: 720, end: 1200 }, { start: 720, end: 1200 }, { start: 720, end: 1260 }, { start: 660, end: 1260 }, null],
  services: [
    { id: 's1', name: 'Free consultation', durationMinutes: 30, price: 0, showPrice: true, description: 'Talk through your idea, placement and size. No pressure.' },
    { id: 's2', name: 'Small tattoo', durationMinutes: 60, price: 90, showPrice: true, description: 'Up to 5 cm. Symbols, dates, tiny line work.' },
    { id: 's3', name: 'Fine line & script', durationMinutes: 90, price: 130, showPrice: true, description: 'Delicate single-needle work and lettering.' },
    { id: 's4', name: 'Palm-size piece', durationMinutes: 150, price: 200, showPrice: true, description: 'A custom drawing roughly the size of your palm.' },
    { id: 's5', name: 'Half-day session', durationMinutes: 240, price: 380, showPrice: true, description: 'For larger pieces and sleeves, booked in sessions.' },
    { id: 's6', name: 'Full-day session', durationMinutes: 420, price: 650, showPrice: true, description: 'A full day in the chair, breaks included.' },
    { id: 's7', name: 'Cover-up consultation', durationMinutes: 30, price: 0, showPrice: true, description: 'We look at the old piece and plan the new one.' },
    { id: 's8', name: 'Touch-up', durationMinutes: 30, price: 40, showPrice: true, description: 'Refresh lines and colour on healed work.' }
  ]
};

const PORTFOLIO = [
  { src: 'photo-1598371839696-5c5bb00bdc28', alt: 'Black and grey floral sleeve on a shoulder', caption: 'Floral sleeve' },
  { src: 'photo-1565058379802-bbe93b2f703a', alt: 'Tattoo artist in black gloves at work', caption: 'In the chair' },
  { src: 'photo-1542727365-19732a80dcfd', alt: 'Small fine line branch tattoo on a wrist', caption: 'Fine line' },
  { src: 'photo-1568515045052-f9a854d70bfd', alt: 'Heavily tattooed hands and forearms', caption: 'Hand work' },
  { src: 'photo-1611501275019-9b5cda994e8d', alt: 'Detailed blackwork tattoo on an arm', caption: 'Blackwork' },
  { src: 'photo-1599351431202-1e0f0137899a', alt: 'Tattooed hands at work in the studio', caption: 'The studio' }
];

const REVIEWS = [
  { q: 'Came in with a rough idea, left with the best piece on my body. Clean studio, calm hands.', n: 'Client name', s: 'Palm-size piece' },
  { q: 'Booking a consult online at 1 AM was a game changer. No DMs, no waiting.', n: 'Client name', s: 'Free consultation' },
  { q: 'Covered a 10-year-old mistake. You honestly cannot tell it was ever there.', n: 'Client name', s: 'Cover-up' },
  { q: 'The fine line work is unreal. Healed perfectly, crisp as day one.', n: 'Client name', s: 'Fine line & script' },
  { q: 'Full-day session that flew by. Great music, good breaks, incredible result.', n: 'Client name', s: 'Full-day session' }
];

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

setLang('en');
mountDemo('depth');
setupBooking({ linkId: BOOKING_LINK_ID, theme: 'dark' });

// ---------- hero parallax ----------

const scene = document.getElementById('scene');
if (finePointer && !reduceMotion) {
  document.getElementById('hero').addEventListener('pointermove', e => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    scene.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
  });
  document.getElementById('hero').addEventListener('pointerleave', () => { scene.style.transform = ''; });
}

// ---------- portfolio ring ----------

const carousel = document.getElementById('carousel');
const stage = carousel.parentElement;
const step = 360 / PORTFOLIO.length;
let angle = 0;
let target = 0;
let dragging = null;
let idleSince = performance.now();

PORTFOLIO.forEach((p, i) => {
  const card = el('figure', 'ring-card');
  const img = el('img');
  img.src = `https://images.unsplash.com/${p.src}?auto=format&fit=crop&w=500&h=680&q=70`;
  img.alt = p.alt;
  img.loading = 'lazy';
  img.width = 500;
  img.height = 680;
  card.appendChild(img);
  card.appendChild(el('figcaption', null, p.caption));
  card.dataset.i = String(i);
  carousel.appendChild(card);
});

function placeCards() {
  const width = carousel.offsetWidth;
  const radius = Math.round((width / 2) / Math.tan(Math.PI / PORTFOLIO.length)) + 110;
  carousel.querySelectorAll('.ring-card').forEach((card, i) => {
    card.style.transform = `rotateY(${i * step}deg) translateZ(${radius}px)`;
  });
  carousel.dataset.radius = String(radius);
}

function renderRing() {
  carousel.style.transform = `translateZ(-${carousel.dataset.radius}px) rotateX(-7deg) rotateY(${angle}deg)`;
}

function tick(now) {
  if (!dragging && !reduceMotion && now - idleSince > 2500) target -= 0.06; // slow idle spin
  angle += (target - angle) * 0.12;
  renderRing();
  requestAnimationFrame(tick);
}

function snap(dir) {
  target = Math.round(target / step) * step + dir * step;
  idleSince = performance.now();
}

stage.addEventListener('pointerdown', e => {
  dragging = { x: e.clientX, start: target };
  stage.setPointerCapture(e.pointerId);
});
stage.addEventListener('pointermove', e => {
  if (!dragging) return;
  target = dragging.start + (e.clientX - dragging.x) * 0.35;
});
const endDrag = () => {
  if (!dragging) return;
  dragging = null;
  target = Math.round(target / step) * step;
  idleSince = performance.now();
};
stage.addEventListener('pointerup', endDrag);
stage.addEventListener('pointercancel', endDrag);
document.getElementById('ring-prev').addEventListener('click', () => snap(1));
document.getElementById('ring-next').addEventListener('click', () => snap(-1));
window.addEventListener('resize', () => { placeCards(); renderRing(); });
placeCards();
renderRing();
requestAnimationFrame(tick);

// ---------- prices as flip cards ----------

function renderFlips(data) {
  const grid = document.getElementById('flips');
  grid.replaceChildren();
  document.getElementById('services-note').hidden = data.services.length > 0;

  data.services.forEach((svc, i) => {
    const flip = el('div', 'flip');
    const inner = el('div', 'flip-inner');

    const front = el('button', 'side side-front');
    front.type = 'button';
    front.setAttribute('aria-label', `${svc.name}: show details`);
    front.appendChild(el('span', 'f-num', String(i + 1).padStart(2, '0')));
    front.appendChild(el('span', 'f-name', svc.name));
    const row = el('span', 'f-row');
    row.appendChild(el('span', 'f-price', svc.showPrice ? formatPrice(svc.price, data.currency) : ''));
    row.appendChild(el('span', 'f-hint', 'Flip ↻'));
    front.appendChild(row);

    const back = el('div', 'side side-back');
    back.appendChild(el('h3', null, svc.name));
    back.appendChild(el('span', 'b-meta', `${formatDuration(svc.durationMinutes)}${svc.showPrice ? ` · ${formatPrice(svc.price, data.currency)}` : ''}`));
    if (svc.description) back.appendChild(el('p', null, svc.description));
    const actions = el('div', 'b-actions');
    actions.appendChild(bookButton('Book', { linkId: BOOKING_LINK_ID, service: svc, className: 'b-book' }));
    const backBtn = el('button', 'b-back', 'Back');
    backBtn.type = 'button';
    actions.appendChild(backBtn);
    back.appendChild(actions);
    back.inert = true;

    const setFlipped = on => {
      flip.classList.toggle('is-flipped', on);
      back.inert = !on;
      front.inert = on;
      (on ? back.querySelector('.b-book') : front).focus({ preventScroll: true });
    };
    front.addEventListener('click', () => setFlipped(true));
    backBtn.addEventListener('click', () => setFlipped(false));

    inner.append(front, back);
    flip.appendChild(inner);
    grid.appendChild(flip);
  });
}

// ---------- hours ----------

function renderHours(data) {
  const tbody = document.querySelector('#hours tbody');
  const status = document.getElementById('status');
  tbody.replaceChildren();
  if (!data.hasHours) {
    document.getElementById('hours-note').textContent = 'See the free times on the booking page.';
    status.hidden = true;
    return;
  }
  for (const row of weekRows(data)) {
    const tr = el('tr');
    if (row.isToday) tr.classList.add('today');
    if (!row.range) tr.classList.add('closed');
    tr.appendChild(el('td', null, row.label));
    tr.appendChild(el('td', null, row.text));
    tbody.appendChild(tr);
  }
  const state = openState(data, { open: 'Studio open · until', closed: 'Studio closed · book online any time' });
  status.textContent = state.label;
  status.classList.toggle('is-open', state.isOpen);
  status.hidden = false;
}

loadData({ linkId: BOOKING_LINK_ID, sample: SAMPLE }, data => {
  renderFlips(data);
  renderHours(data);
});

// ---------- process: the stack opens when it scrolls in, steps light up their layer ----------

const iso = document.getElementById('iso');
const slabs = [...iso.querySelectorAll('.slab')];
new IntersectionObserver(entries => {
  for (const entry of entries) iso.classList.toggle('is-open', entry.isIntersecting);
}, { threshold: 0.4 }).observe(iso);
for (const li of document.querySelectorAll('#steps li')) {
  const on = () => {
    for (const other of document.querySelectorAll('#steps li')) other.classList.toggle('is-active', other === li);
    slabs.forEach((s, i) => s.classList.toggle('is-active', String(i) === li.dataset.layer));
  };
  li.addEventListener('pointerenter', on);
  li.addEventListener('click', on);
}

// ---------- review deck ----------

const deck = document.getElementById('deck');
let order = REVIEWS.map((_, i) => i);

function renderDeck() {
  deck.replaceChildren();
  // Back of the deck first so the top card is last in the DOM (on top).
  [...order].reverse().forEach((idx, k) => {
    const pos = order.length - 1 - k;
    const r = REVIEWS[idx];
    const card = el('figure', 'deal');
    card.style.setProperty('--pos', String(Math.min(pos, 3)));
    card.style.zIndex = String(order.length - pos);
    if (pos > 3) card.style.opacity = '0';
    if (pos > 0) card.setAttribute('aria-hidden', 'true');
    card.appendChild(el('span', 'count', `${idx + 1} / ${REVIEWS.length}`));
    const stars = el('span', 'stars', '★★★★★');
    stars.setAttribute('aria-label', '5 out of 5 stars');
    card.appendChild(stars);
    card.appendChild(el('blockquote', null, `“${r.q}”`));
    const cap = el('figcaption');
    cap.appendChild(el('strong', null, r.n));
    cap.append(` · ${r.s}`);
    cap.appendChild(el('span', 'sample', 'Sample'));
    card.appendChild(cap);
    deck.appendChild(card);
  });
}

let dealing = false;
function deal() {
  if (dealing) return;
  dealing = true;
  deck.lastElementChild?.classList.add('is-thrown');
  setTimeout(() => {
    order = [...order.slice(1), order[0]];
    renderDeck();
    dealing = false;
  }, reduceMotion ? 0 : 450);
}
deck.addEventListener('click', deal);
deck.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') { e.preventDefault(); deal(); }
});
renderDeck();

// ---------- tilt cards ----------

if (finePointer && !reduceMotion) {
  for (const card of document.querySelectorAll('.tilt-card')) {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  }
}
