// Orbit design. Services and hours come live from the booking link once BOOKING_LINK_ID is set
// (see ../shared/live.js); until then the sample below is shown. Reviews are sample text.

import { setLang, loadData, setupBooking, bookButton, el, formatPrice, formatDuration, weekRows, openState } from '../shared/live.js';
import { mountDemo } from '../shared/demo.js';

// Client page: put the id of the public booking link from the Appointments & Reports app here.
const BOOKING_LINK_ID = '';

const SAMPLE = {
  currency: 'USD',
  hasHours: true,
  hours: [{ start: 600, end: 1260 }, { start: 600, end: 1260 }, { start: 600, end: 1260 }, { start: 600, end: 1260 }, { start: 600, end: 1260 }, { start: 600, end: 1080 }, null],
  services: [
    { id: 's1', name: 'Swedish massage', durationMinutes: 60, price: 75, showPrice: true, description: 'Long, flowing strokes that slow everything down.' },
    { id: 's2', name: 'Deep tissue massage', durationMinutes: 60, price: 85, showPrice: true, description: 'Firm pressure for knots and stubborn tension.' },
    { id: 's3', name: 'Hot stone massage', durationMinutes: 90, price: 110, showPrice: true, description: 'Warm basalt stones melt the muscles from the outside in.' },
    { id: 's4', name: 'Aromatherapy massage', durationMinutes: 60, price: 80, showPrice: true, description: 'Essential oils chosen for how you want to feel after.' },
    { id: 's5', name: 'Back, neck & shoulders', durationMinutes: 30, price: 45, showPrice: true, description: 'A focused reset for desk-bound shoulders.' },
    { id: 's6', name: 'Sports massage', durationMinutes: 45, price: 65, showPrice: true, description: 'Recovery work for runners, lifters and weekend heroes.' },
    { id: 's7', name: 'Couples massage', durationMinutes: 60, price: 150, showPrice: true, description: 'Two therapists, two tables, one shared hour.' },
    { id: 's8', name: 'Reflexology', durationMinutes: 45, price: 55, showPrice: true, description: 'Pressure-point work on the feet, deeply calming.' },
    { id: 's9', name: 'Full-day retreat', durationMinutes: 240, price: 260, showPrice: true, description: 'Massage, facial, scalp ritual and tea. The full orbit.' }
  ]
};

const REVIEWS = [
  { q: 'I genuinely forgot where I was for an hour. Best hot stone massage I have had.', n: 'Client name', s: 'Hot stone massage' },
  { q: 'Booked at midnight, got a slot the next morning. My shoulders thank you.', n: 'Client name', s: 'Back, neck & shoulders' },
  { q: 'Firm where it needed to be, gentle everywhere else. Already booked my next one.', n: 'Client name', s: 'Deep tissue massage' },
  { q: 'We did the couples massage for our anniversary. Pure calm, start to finish.', n: 'Client name', s: 'Couples massage' },
  { q: 'Perfect after marathon training. Legs feel brand new.', n: 'Client name', s: 'Sports massage' }
];

// Planet colours, cycled.
const PALETTE = [['#67e8f9', '#1e3a8a'], ['#f0abfc', '#6b21a8'], ['#fcd34d', '#b45309'], ['#a78bfa', '#312e81'], ['#86efac', '#065f46'], ['#fda4af', '#9f1239'], ['#93c5fd', '#1e40af']];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

setLang('en');
mountDemo('orbit');
setupBooking({ linkId: BOOKING_LINK_ID, theme: 'dark' });

function colours(node, i) {
  const [c1, c2] = PALETTE[i % PALETTE.length];
  node.style.setProperty('--c1', c1);
  node.style.setProperty('--c2', c2);
}

// ---------- treatments ----------

let current = null;

function renderBrief(svc, data) {
  const brief = document.getElementById('brief');
  brief.replaceChildren();
  if (!svc) return;
  brief.appendChild(el('p', 'tag', 'Mission brief'));
  brief.appendChild(el('h3', null, svc.name));
  if (svc.description) brief.appendChild(el('p', null, svc.description));
  const stats = el('div', 'stats');
  const flight = el('div', 'stat');
  flight.appendChild(el('span', null, 'Flight time'));
  flight.appendChild(el('strong', null, formatDuration(svc.durationMinutes)));
  stats.appendChild(flight);
  if (svc.showPrice) {
    const ticket = el('div', 'stat');
    ticket.appendChild(el('span', null, 'Ticket'));
    ticket.appendChild(el('strong', null, formatPrice(svc.price, data.currency)));
    stats.appendChild(ticket);
  }
  brief.appendChild(stats);
  brief.appendChild(bookButton('Book this orbit', { linkId: BOOKING_LINK_ID, service: svc, className: 'btn btn-glow' }));
}

// Services spread over up to three rings; planet size grows with the treatment's length.
function renderSystem(data) {
  const system = document.getElementById('system');
  system.replaceChildren();
  const services = data.services;
  if (!services.length) return;

  const ringCount = Math.min(3, Math.max(1, Math.ceil(services.length / 3)));
  const rings = Array.from({ length: ringCount }, () => []);
  services.forEach((svc, i) => rings[i % ringCount].push({ svc, i }));
  const longest = Math.max(...services.map(s => s.durationMinutes));

  const sun = el('div', 'sun', 'You,\nrelaxed');
  sun.style.whiteSpace = 'pre-line';
  system.appendChild(sun);

  rings.forEach((members, r) => {
    const ring = el('div', 'ring');
    const diameter = 34 + (r + 1) * (62 / ringCount);
    ring.style.setProperty('--d', `${diameter}%`);
    ring.style.setProperty('--dur', `${70 + r * 35}s`);
    const offset = r * 40;
    members.forEach(({ svc, i }, k) => {
      const slot = el('div', 'slot');
      // The slot sits on the ring's edge: half the ring's own width out from its centre.
      const angle = offset + (360 / members.length) * k;
      slot.style.transform = `rotate(${angle}deg) translateX(calc(var(--ring-px) / 2)) rotate(${-angle}deg)`;
      const btn = el('button', 'planet-btn');
      btn.type = 'button';
      const size = 26 + Math.round(30 * (svc.durationMinutes / longest));
      btn.style.setProperty('--s', `${size}px`);
      btn.style.setProperty('--dur', `${70 + r * 35}s`);
      colours(btn, i);
      btn.setAttribute('aria-pressed', String(svc === current));
      btn.setAttribute('aria-label', `${svc.name}, ${formatDuration(svc.durationMinutes)}${svc.showPrice ? `, ${formatPrice(svc.price, data.currency)}` : ''}`);
      btn.appendChild(el('span', 'label', svc.name));
      btn.addEventListener('click', () => {
        current = svc;
        for (const b of system.querySelectorAll('.planet-btn')) b.setAttribute('aria-pressed', String(b === btn));
        renderBrief(svc, data);
      });
      slot.appendChild(btn);
      ring.appendChild(slot);
    });
    system.appendChild(ring);
  });
  sizeRings();
}

// Each slot needs its ring's diameter in pixels to sit on the edge.
function sizeRings() {
  for (const ring of document.querySelectorAll('#system .ring')) ring.style.setProperty('--ring-px', `${ring.offsetWidth}px`);
}
window.addEventListener('resize', sizeRings);

function renderMissions(data) {
  const list = document.getElementById('missions');
  list.replaceChildren();
  data.services.forEach((svc, i) => {
    const li = el('li');
    const card = bookButton('', { linkId: BOOKING_LINK_ID, service: svc, className: 'mission' });
    const orb = el('span', 'orb');
    colours(orb, i);
    card.appendChild(orb);
    card.appendChild(el('span', 'm-name', svc.name));
    card.appendChild(el('span', 'm-price', svc.showPrice ? formatPrice(svc.price, data.currency) : ''));
    card.appendChild(el('span', 'm-meta', `${formatDuration(svc.durationMinutes)} · tap to book`));
    if (svc.description) card.appendChild(el('span', 'm-desc', svc.description));
    li.appendChild(card);
    list.appendChild(li);
  });
}

// ---------- mission control ----------

function renderConsole(data) {
  const tracks = document.getElementById('tracks');
  const led = document.getElementById('led');
  const status = document.getElementById('console-status');
  const badge = document.getElementById('status');
  tracks.replaceChildren();

  if (!data.hasHours) {
    status.textContent = 'Launch windows are on the booking page';
    badge.hidden = true;
    return;
  }
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  for (const row of weekRows(data)) {
    const track = el('div', 'track');
    if (row.isToday) track.classList.add('today');
    if (!row.range) track.classList.add('closed');
    track.appendChild(el('span', 'track-day', row.short));
    const bar = el('div', 'track-bar');
    if (row.range) {
      const fill = el('span', 'track-fill');
      fill.style.left = `${(row.range.start / 1440) * 100}%`;
      fill.style.width = `${((row.range.end - row.range.start) / 1440) * 100}%`;
      bar.appendChild(fill);
    }
    if (row.isToday) {
      const line = el('span', 'track-now');
      line.style.left = `${(nowMinutes / 1440) * 100}%`;
      bar.appendChild(line);
    }
    track.appendChild(bar);
    track.appendChild(el('span', 'track-text', row.isToday ? `Today · ${row.text}` : row.text));
    tracks.appendChild(track);
  }

  const state = openState(data, { open: 'Open now · until', closed: 'Closed now · book online' });
  led.classList.toggle('on', state.isOpen);
  status.textContent = state.isOpen ? 'All systems open' : 'Docked for now · online booking is always on';
  badge.textContent = state.label;
  badge.classList.toggle('is-open', state.isOpen);
  badge.hidden = false;
}

function tickClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
}
tickClock();
setInterval(tickClock, 1000);

loadData({ linkId: BOOKING_LINK_ID, sample: SAMPLE }, data => {
  document.getElementById('services-note').hidden = data.services.length > 0;
  if (!current || !data.services.some(s => s.id === current.id)) current = data.services[0] || null;
  else current = data.services.find(s => s.id === current.id);
  renderSystem(data);
  renderBrief(current, data);
  renderMissions(data);
  renderConsole(data);
});

// ---------- transmissions ----------

function signalCard(r, hidden) {
  const card = el('figure', 'signal');
  if (hidden) card.setAttribute('aria-hidden', 'true');
  const wave = el('div', 'wave');
  for (let i = 0; i < 18; i++) {
    const bar = el('span');
    bar.style.height = `${6 + Math.round(Math.abs(Math.sin(i * 1.7)) * 16)}px`;
    bar.style.animationDelay = `${(i % 6) * 0.1}s`;
    wave.appendChild(bar);
  }
  card.appendChild(wave);
  card.appendChild(el('blockquote', null, `“${r.q}”`));
  const cap = el('figcaption');
  cap.appendChild(el('strong', null, r.n));
  cap.append(` · ${r.s}`);
  cap.appendChild(el('span', 'sample', 'Sample'));
  card.appendChild(cap);
  return card;
}

const track = el('div', 'marquee-track');
REVIEWS.forEach(r => track.appendChild(signalCard(r, false)));
if (!reduceMotion) REVIEWS.forEach(r => track.appendChild(signalCard(r, true))); // second copy for a seamless loop
document.getElementById('marquee').appendChild(track);

// ---------- starfield ----------

const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];
let shooting = null;
let w = 0;
let h = 0;

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const count = Math.round((w * h) / 4200);
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.3 + 0.2,
    depth: Math.random() * 0.8 + 0.2,
    phase: Math.random() * Math.PI * 2,
    hue: Math.random() < 0.15 ? (Math.random() < 0.5 ? 190 : 280) : 0
  }));
}

function draw(time) {
  ctx.clearRect(0, 0, w, h);
  const scroll = window.scrollY;
  for (const s of stars) {
    const y = (((s.y - scroll * s.depth * 0.15) % h) + h) % h;
    const alpha = reduceMotion ? 0.8 : 0.45 + 0.55 * Math.abs(Math.sin(time / 1400 + s.phase));
    ctx.beginPath();
    ctx.arc(s.x, y, s.r * s.depth + 0.2, 0, Math.PI * 2);
    ctx.fillStyle = s.hue ? `hsla(${s.hue}, 90%, 80%, ${alpha})` : `rgba(255,255,255,${alpha})`;
    ctx.fill();
  }
  if (shooting) {
    const p = (time - shooting.start) / 900;
    if (p >= 1) shooting = null;
    else {
      const x = shooting.x + p * 420;
      const y = shooting.y + p * 160;
      const grad = ctx.createLinearGradient(x - 120, y - 46, x, y);
      grad.addColorStop(0, 'rgba(255,255,255,0)');
      grad.addColorStop(1, `rgba(255,255,255,${1 - p})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(x - 120, y - 46);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  } else if (Math.random() < 0.003) {
    shooting = { x: Math.random() * w * 0.7, y: Math.random() * h * 0.4, start: time };
  }
  if (!reduceMotion) requestAnimationFrame(draw);
}

resize();
window.addEventListener('resize', () => { resize(); if (reduceMotion) draw(0); });
if (reduceMotion) {
  draw(0);
  window.addEventListener('scroll', () => draw(0), { passive: true });
} else {
  requestAnimationFrame(draw);
}
