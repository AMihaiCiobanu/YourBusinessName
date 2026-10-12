// Listing design: gallery, service categories, team, portfolio and a sticky booking card.
// Services, hours and booking come live from the booking link once a link id is set (see
// ../shared/live.js); until then the sample below is shown. Photos, team and the "good to know"
// list are samples. The app has no service categories: a service is standard, a subscription
// (isSubscription) or a class (isClass), so the chips are Services / Packages / Classes.

import { setLang, loadData, setupBooking, bookButton, el, formatPrice, formatDuration, weekRows, openState, serviceGroups } from '../shared/live.js';
import { mountDemo } from '../shared/demo.js?v=4';

// Client page: put the id of the public booking link from the Appointments & Reports app here.
const BOOKING_LINK_ID = '';

const SAMPLE = {
  currency: 'USD',
  hasHours: true,
  hours: [null, { start: 600, end: 1260 }, { start: 600, end: 1260 }, { start: 600, end: 1260 }, { start: 600, end: 1260 }, { start: 600, end: 1260 }, { start: 600, end: 1260 }],
  services: [
    { id: 's1', name: 'Classic cut', durationMinutes: 20, price: 22, showPrice: true, description: '' },
    { id: 's2', name: 'Skin fade', durationMinutes: 30, price: 28, showPrice: true, description: 'Zero on the sides.' },
    { id: 's3', name: 'Beard trim', durationMinutes: 20, price: 20, showPrice: true, description: '' },
    { id: 's4', name: 'Hot towel shave', durationMinutes: 30, price: 25, showPrice: true, description: '' },
    { id: 's5', name: 'Retro pack', durationMinutes: 60, price: 52, showPrice: true, description: 'Cut, shave and massage.' },
    { id: 's6', name: 'Monthly cuts', durationMinutes: 30, price: 80, showPrice: true, description: '4 cuts a month, one price.', isSubscription: true },
    { id: 's7', name: 'Beard care workshop', durationMinutes: 90, price: 35, showPrice: true, description: 'Small group, tools included.', isClass: true }
  ]
};

// Client page: one booking link per team member, or leave '' to book the shop's own link.
const TEAM = [
  { name: 'Vlad', role: 'Senior barber', linkId: '' },
  { name: 'Edward', role: 'Barber', linkId: '' },
  { name: 'Alexandru', role: 'Barber', linkId: '' },
  { name: 'Diana', role: 'Stylist', linkId: '' },
  { name: 'Daniel', role: 'Barber', linkId: '' }
];

const PORTFOLIO = [
  'photo-1599351431202-1e0f0137899a', 'photo-1622286342621-4bd786c2447c', 'photo-1621605815971-fbc98d665033',
  'photo-1503951914875-452162b0f3f1', 'photo-1605497788044-5a32c7078486', 'photo-1532710093739-9470acff878f'
];

setLang('en');
mountDemo('listing');
setupBooking({ linkId: BOOKING_LINK_ID, theme: 'light' });

// ---------- services with chips per type (services, packages, classes) ----------

let groups = [];
let current = 'all';
const chips = document.getElementById('chips');
const list = document.getElementById('svc-list');
let currency = '';

function renderList() {
  list.replaceChildren();
  const shown = current === 'all' ? groups.flatMap(g => g.items) : groups.find(g => g.label === current)?.items || [];
  for (const svc of shown) {
    const li = el('li', 'svc');
    const info = el('div', 'svc-info');
    info.appendChild(el('p', 'svc-name', svc.name));
    info.appendChild(el('p', 'svc-meta', [formatDuration(svc.durationMinutes), svc.description].filter(Boolean).join(' · ')));
    li.appendChild(info);
    li.appendChild(el('span', 'svc-price', svc.showPrice ? formatPrice(svc.price, currency) : ''));
    li.appendChild(bookButton('Book', { linkId: BOOKING_LINK_ID, service: svc, className: 'btn btn-sm btn-line' }));
    list.appendChild(li);
  }
}

function renderChips() {
  chips.replaceChildren();
  if (groups.length < 2) return;
  for (const label of ['all', ...groups.map(g => g.label)]) {
    const chip = el('button', 'chip', label === 'all' ? 'All' : label);
    chip.type = 'button';
    chip.setAttribute('role', 'tab');
    chip.setAttribute('aria-selected', String(label === current));
    chip.addEventListener('click', () => { current = label; renderChips(); renderList(); });
    chips.appendChild(chip);
  }
}

function renderServices(data) {
  currency = data.currency;
  groups = serviceGroups(data);
  if (current !== 'all' && !groups.some(g => g.label === current)) current = 'all';
  if (!data.services.length) {
    document.getElementById('services-note').textContent = 'All services and prices are on the booking page.';
  }
  renderChips();
  renderList();
}

// ---------- hours and open state ----------

function renderHours(data) {
  const week = document.getElementById('week');
  week.replaceChildren();
  if (!data.hasHours) {
    document.getElementById('hours-note').textContent = 'See the free times on the booking page.';
    return;
  }
  for (const row of weekRows(data)) {
    const li = el('li', row.isToday ? 'is-today' : '');
    li.appendChild(el('span', null, row.label));
    li.appendChild(el('span', null, row.text));
    week.appendChild(li);
  }
  const state = openState(data, { open: 'Open until', closed: 'Closed now · book online' });
  for (const id of ['status', 'side-status', 'bar-status']) {
    const node = document.getElementById(id);
    node.textContent = state.label;
    node.classList.toggle('is-open', state.isOpen);
    node.hidden = false;
  }
}

loadData({ linkId: BOOKING_LINK_ID, sample: SAMPLE }, data => {
  renderServices(data);
  renderHours(data);
});

// ---------- team ----------

const teamList = document.getElementById('team-list');
for (const p of TEAM) {
  const li = el('li');
  const item = bookButton('', { linkId: p.linkId || BOOKING_LINK_ID, className: 'member' });
  item.setAttribute('aria-label', `Book with ${p.name}`);
  item.appendChild(el('span', 'avatar', p.name[0]));
  item.appendChild(el('span', 'm-name', p.name));
  item.appendChild(el('span', 'm-role', p.role));
  li.appendChild(item);
  teamList.appendChild(li);
}

// ---------- portfolio ----------

const grid = document.getElementById('grid');
for (const id of PORTFOLIO) {
  const img = el('img');
  img.src = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=500&h=500&q=65`;
  img.alt = 'Sample work';
  img.width = 500;
  img.height = 500;
  img.loading = 'lazy';
  img.addEventListener('error', () => img.remove(), { once: true });
  grid.appendChild(img);
}

// ---------- tabs follow the scroll ----------

const tabLinks = [...document.querySelectorAll('#tabs a')];
const spy = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    for (const a of tabLinks) a.classList.toggle('is-on', a.getAttribute('href') === `#${entry.target.id}`);
  }
}, { rootMargin: '-30% 0px -60% 0px' });
for (const a of tabLinks) spy.observe(document.querySelector(a.getAttribute('href')));
