// Marketplace design: a booking-app style listing. Services, hours and booking come live from the
// booking link once a link id is set (see ../shared/live.js); until then the sample below is
// shown. Photos and specialists are samples. The app has no service categories: a service is
// standard, a subscription (isSubscription) or a class (isClass), so the page groups by those.

import { setLang, loadData, setupBooking, bookButton, el, formatPrice, formatDuration, weekRows, openState, serviceGroups } from '../shared/live.js';
import { mountDemo } from '../shared/demo.js?v=5';

// Client page: put the id of the public booking link from the Appointments & Reports app here.
const BOOKING_LINK_ID = '';

const SAMPLE = {
  currency: 'USD',
  hasHours: true,
  hours: [null, { start: 540, end: 1260 }, { start: 540, end: 1260 }, { start: 600, end: 1260 }, { start: 600, end: 1260 }, { start: 600, end: 1260 }, { start: 540, end: 1020 }],
  services: [
    { id: 's1', name: 'Haircut & styling', durationMinutes: 40, price: 30, showPrice: true, description: '' },
    { id: 's2', name: 'Skin fade', durationMinutes: 45, price: 35, showPrice: true, description: '' },
    { id: 's3', name: 'Long hair', durationMinutes: 60, price: 40, showPrice: true, description: '' },
    { id: 's4', name: 'Beard trim & shave', durationMinutes: 30, price: 22, showPrice: true, description: '' },
    { id: 's5', name: 'Gentleman’s pack', durationMinutes: 70, price: 48, showPrice: true, description: 'Cut, beard and hot towel.' },
    { id: 's6', name: 'Monthly cuts', durationMinutes: 40, price: 90, showPrice: true, description: '4 cuts a month, one price.', isSubscription: true },
    { id: 's7', name: 'Beard care workshop', durationMinutes: 90, price: 35, showPrice: true, description: 'Small group, tools and products included.', isClass: true }
  ]
};

// Client page: one booking link per specialist, or leave '' to book the shop's own link.
const SPECIALISTS = [
  { name: 'Alex', role: 'Barber', linkId: '' },
  { name: 'Vlad', role: 'Barber', linkId: '' },
  { name: 'Diana', role: 'Stylist', linkId: '' },
  { name: 'Daniel', role: 'Barber', linkId: '' }
];

setLang('en');
mountDemo('marketplace');
setupBooking({ linkId: BOOKING_LINK_ID, theme: 'light' });

// ---------- services, grouped ----------

function renderServices(data) {
  const host = document.getElementById('groups');
  host.replaceChildren();
  if (!data.services.length) {
    document.getElementById('services-note').textContent = 'All services and prices are on the booking page.';
    return;
  }
  for (const group of serviceGroups(data)) {
    const box = el('section', 'group');
    box.appendChild(el('h3', null, group.label));
    const list = el('ul', 'svc-list');
    for (const svc of group.items) {
      const li = el('li', 'svc');
      const info = el('div', 'svc-info');
      info.appendChild(el('p', 'svc-name', svc.name));
      info.appendChild(el('p', 'svc-meta', [formatDuration(svc.durationMinutes), svc.showPrice ? formatPrice(svc.price, data.currency) : '', svc.description].filter(Boolean).join(' · ')));
      li.appendChild(info);
      li.appendChild(bookButton('Book', { linkId: BOOKING_LINK_ID, service: svc, className: 'btn btn-sm' }));
      list.appendChild(li);
    }
    box.appendChild(list);
    host.appendChild(box);
  }
}

// ---------- hours and open state ----------

function renderHours(data) {
  const week = document.getElementById('week');
  const status = document.getElementById('status');
  week.replaceChildren();
  if (!data.hasHours) {
    document.getElementById('hours-note').textContent = 'See the free times on the booking page.';
    status.hidden = true;
    return;
  }
  for (const row of weekRows(data)) {
    const li = el('li', row.isToday ? 'is-today' : '');
    li.appendChild(el('span', null, row.label));
    li.appendChild(el('span', null, row.text));
    week.appendChild(li);
  }
  const state = openState(data);
  status.textContent = state.label;
  status.classList.toggle('is-open', state.isOpen);
  status.hidden = false;
}

loadData({ linkId: BOOKING_LINK_ID, sample: SAMPLE }, data => {
  renderServices(data);
  renderHours(data);
});

// ---------- specialists ----------

const staff = document.getElementById('staff');
for (const p of SPECIALISTS) {
  const li = el('li', 'person');
  li.appendChild(el('span', 'avatar', p.name[0]));
  li.appendChild(el('p', 'person-name', p.name));
  li.appendChild(el('p', 'person-role', p.role));
  const book = bookButton('Book', { linkId: p.linkId || BOOKING_LINK_ID, className: 'btn btn-sm btn-ghost' });
  book.setAttribute('aria-label', `Book with ${p.name}`);
  li.appendChild(book);
  staff.appendChild(li);
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

// Show the sections kept out of the layout until now (js-wait, see index.html).
document.documentElement.classList.remove('js-wait');
if (location.hash.length > 1) document.getElementById(location.hash.slice(1))?.scrollIntoView();
