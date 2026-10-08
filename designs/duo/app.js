// Duo design: one studio, two specialists. Each person has their own public booking link in the
// Appointments & Reports app, so their services, hours and booking calendar are separate. Set each
// person's `linkId` and their tab goes live (see ../shared/live.js); until then the samples show.

import { setLang, loadData, setupBooking, bookButton, bookingUrl, el, formatPrice, formatDuration, weekRows, openState, serviceGroups } from '../shared/live.js';
import { mountDemo } from '../shared/demo.js';

const STAFF = [
  {
    key: 'ana',
    name: 'Ana',
    role: 'Hair stylist',
    color: 'var(--a1)',
    // Client page: the id of Ana's public booking link.
    linkId: '',
    bio: 'Cuts, colour and blow-dries that grow out gracefully. Ten years behind the chair and still obsessed with a good balayage.',
    tags: ['Balayage', 'Precision cuts', 'Curly hair', 'Event styling'],
    photos: [
      ['photo-1562322140-8baeececf3df', 'Stylist blow-drying a client’s hair'],
      ['photo-1522337360788-8b13dee7a37e', 'Long wavy hair after a blow-dry'],
      ['photo-1580618672591-eb180b1a973f', 'Hair being styled with a brush and dryer']
    ],
    reviews: [
      { q: 'Ana finally fixed my colour after years of brassy blonde. I could cry.', n: 'Client name', s: 'Balayage' },
      { q: 'Quick, kind and the cut grows out perfectly. Booking online is so easy.', n: 'Client name', s: 'Cut & style' }
    ],
    sample: {
      currency: 'USD',
      hasHours: true,
      hours: [null, { start: 540, end: 1020 }, { start: 720, end: 1200 }, { start: 540, end: 1020 }, { start: 540, end: 1020 }, { start: 540, end: 900 }, null],
      services: [
        { id: 'a1', name: 'Cut & style', durationMinutes: 60, price: 55, showPrice: true, description: 'Consultation, wash, cut and finish.' },
        { id: 'a2', name: 'Blow-dry', durationMinutes: 45, price: 35, showPrice: true, description: 'Smooth, bouncy or beachy.' },
        { id: 'a3', name: 'Root colour', durationMinutes: 90, price: 75, showPrice: true, description: 'Regrowth touch-up with gloss.' },
        { id: 'a4', name: 'Balayage', durationMinutes: 180, price: 160, showPrice: true, description: 'Hand-painted, soft and low-maintenance.' },
        { id: 'a5', name: 'Event hair & updo', durationMinutes: 60, price: 65, showPrice: true, description: 'Weddings, parties, photos.' }
      ]
    }
  },
  {
    key: 'maria',
    name: 'Maria',
    role: 'Nail artist',
    color: 'var(--a2)',
    // Client page: the id of Maria's public booking link.
    linkId: '',
    bio: 'Clean, strong nails with detail you can see from across the room. Gel, BIAB and hand-painted art.',
    tags: ['BIAB', 'Gel', 'Hand-painted art', 'Spa pedicure'],
    photos: [
      ['photo-1604654894610-df63bc536371', 'Dark glossy manicure with gold accents'],
      ['photo-1607779097040-26e80aa78e66', 'Soft lilac nails on a cream sweater'],
      ['photo-1519014816548-bf5fe059798b', 'Red nails with hand-written love lettering']
    ],
    reviews: [
      { q: 'Three weeks and not a single chip. Maria’s nail art is next level.', n: 'Client name', s: 'Gel manicure' },
      { q: 'Booked my pedicure at midnight, best decision of the week.', n: 'Client name', s: 'Spa pedicure' }
    ],
    sample: {
      currency: 'USD',
      hasHours: true,
      hours: [{ start: 600, end: 1140 }, { start: 600, end: 1140 }, { start: 600, end: 1140 }, { start: 600, end: 1140 }, { start: 600, end: 1140 }, { start: 600, end: 840 }, null],
      services: [
        { id: 'm1', name: 'Gel manicure', durationMinutes: 60, price: 45, showPrice: true, description: 'Long-lasting colour, high shine.' },
        { id: 'm2', name: 'BIAB overlay', durationMinutes: 75, price: 55, showPrice: true, description: 'Strength for natural nails.' },
        { id: 'm3', name: 'Classic manicure', durationMinutes: 45, price: 30, showPrice: true, description: 'Shape, cuticles and polish.' },
        { id: 'm4', name: 'Spa pedicure', durationMinutes: 60, price: 50, showPrice: true, description: 'Soak, scrub, massage and polish.' },
        { id: 'm5', name: 'Nail art (per set)', durationMinutes: 30, price: 20, showPrice: true, description: 'From minimal to statement.' }
      ]
    }
  }
];

setLang('en');
mountDemo('duo');
setupBooking({ theme: 'light' });

const loaded = {};
let active = STAFF.find(p => `#${p.key}` === location.hash) || STAFF[0];

const tabs = document.getElementById('tabs');
const glider = tabs.querySelector('.switch-glider');
const panel = document.getElementById('panel');

// ---------- people (hero cards) and tabs ----------

function personCard(p) {
  const card = el('button', 'person');
  card.type = 'button';
  card.style.setProperty('--pc', p.color);
  card.appendChild(el('span', 'avatar', p.name[0]));
  card.appendChild(el('span', 'p-name', p.name));
  card.appendChild(el('span', 'p-go', '→'));
  card.appendChild(el('span', 'p-role', p.role));
  const status = el('span', 'p-status', 'Checking hours…');
  status.dataset.status = p.key;
  card.appendChild(status);
  card.addEventListener('click', () => {
    select(p);
    document.getElementById('team').scrollIntoView({ behavior: 'smooth' });
  });
  card.dataset.person = p.key;
  return card;
}

for (const p of STAFF) {
  document.getElementById('people').appendChild(personCard(p));

  const tab = el('button', 'tab');
  tab.type = 'button';
  tab.id = `tab-${p.key}`;
  tab.setAttribute('role', 'tab');
  tab.setAttribute('aria-controls', 'panel');
  tab.style.setProperty('--pc', p.color);
  tab.appendChild(el('span', 'mini', p.name[0]));
  tab.append(p.name);
  tab.appendChild(el('small', null, p.role));
  tab.addEventListener('click', () => select(p));
  tab.dataset.person = p.key;
  tabs.appendChild(tab);

  const both = bookButton(`Book with ${p.name}`, { linkId: p.linkId, className: 'btn' });
  both.style.setProperty('--pc', p.color);
  document.getElementById('book-both').appendChild(both);
}

// Arrow keys move between tabs, as in any tab list.
tabs.addEventListener('keydown', e => {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
  const i = STAFF.indexOf(active);
  const next = STAFF[(i + (e.key === 'ArrowRight' ? 1 : STAFF.length - 1)) % STAFF.length];
  select(next);
  document.getElementById(`tab-${next.key}`).focus();
});

function moveGlider() {
  const tab = document.getElementById(`tab-${active.key}`);
  glider.style.width = `${tab.offsetWidth}px`;
  glider.style.transform = `translateX(${tab.offsetLeft - 6}px)`;
}
window.addEventListener('resize', moveGlider);

function select(p) {
  const changed = p !== active;
  active = p;
  document.body.dataset.person = p.key;
  history.replaceState(history.state, '', `#${p.key}`);
  for (const tab of tabs.querySelectorAll('.tab')) {
    const on = tab.dataset.person === p.key;
    tab.setAttribute('aria-selected', String(on));
    tab.tabIndex = on ? 0 : -1;
  }
  for (const card of document.querySelectorAll('.person')) card.setAttribute('aria-current', String(card.dataset.person === p.key));
  panel.setAttribute('aria-labelledby', `tab-${p.key}`);
  moveGlider();

  // The header and sticky buttons book whoever is selected.
  for (const id of ['top-book', 'sticky-book']) {
    const btn = document.getElementById(id);
    btn.textContent = `Book with ${p.name}`;
    if (p.linkId) {
      btn.dataset.link = p.linkId;
      btn.href = bookingUrl(p.linkId);
    } else {
      delete btn.dataset.link;
      btn.href = '#';
    }
  }
  document.getElementById('top-book').textContent = 'Book';
  renderPanel(changed);
}

// ---------- the panel ----------

function profileCard(p) {
  const card = el('div', 'card profile');
  const avatar = el('span', 'avatar', p.name[0]);
  avatar.style.setProperty('--pc', p.color);
  card.appendChild(avatar);
  card.appendChild(el('h2', null, p.name));
  card.appendChild(el('p', 'role', p.role));
  card.appendChild(el('p', null, p.bio));
  const chips = el('ul', 'chips');
  for (const t of p.tags) chips.appendChild(el('li', null, t));
  card.appendChild(chips);
  card.appendChild(bookButton(`Book with ${p.name}`, { linkId: p.linkId, className: 'btn' }));
  return card;
}

function servicesCard(p, data) {
  const card = el('div', 'card services-card');
  const head = el('div', 'svc-head');
  head.appendChild(el('h3', null, `${p.name}’s services`));
  card.appendChild(head);
  if (!data) {
    card.appendChild(el('p', 'fine', 'Loading…'));
    return card;
  }
  head.appendChild(el('small', null, data.live ? 'Live from the booking app' : 'Example list · live on your page'));
  const groups = serviceGroups(data);
  if (!groups.length) {
    card.appendChild(el('p', 'fine', 'All services are on the booking page.'));
    return card;
  }
  for (const g of groups) {
    if (groups.length > 1) card.appendChild(el('p', 'svc-group', g.label));
    const list = el('ul', 'svc-list');
    for (const svc of g.items) {
      const li = el('li');
      const row = bookButton('', { linkId: p.linkId, service: svc, className: 'svc' });
      row.appendChild(el('span', 'svc-name', svc.name));
      row.appendChild(el('span', 'svc-price', svc.showPrice ? formatPrice(svc.price, data.currency) : ''));
      row.appendChild(el('span', 'svc-go', '→'));
      row.appendChild(el('span', 'svc-meta', [formatDuration(svc.durationMinutes), svc.description].filter(Boolean).join(' · ')));
      li.appendChild(row);
      list.appendChild(li);
    }
    card.appendChild(list);
  }
  return card;
}

function hoursCard(p, data) {
  const card = el('div', 'card hours-card');
  card.appendChild(el('p', 'label', `${p.name}’s hours`));
  if (!data?.hasHours) {
    card.appendChild(el('p', 'fine', 'See the free times on the booking page.'));
    return card;
  }
  const state = openState(data, { open: 'In today · until', closed: 'Not in right now' });
  const status = el('p', `status${state.isOpen ? ' is-open' : ''}`, state.label);
  card.appendChild(status);
  const days = el('ul', 'days');
  for (const row of weekRows(data)) {
    const li = el('li', [row.isToday && 'today', !row.range && 'closed'].filter(Boolean).join(' '));
    li.appendChild(el('span', null, row.short));
    li.appendChild(el('span', null, row.text));
    days.appendChild(li);
  }
  card.appendChild(days);
  card.appendChild(el('p', 'fine', 'From their own calendar in the app.'));
  return card;
}

function workCard(p) {
  const card = el('figure', 'card work-card');
  for (const [id, alt] of p.photos) {
    const img = el('img');
    img.src = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&h=600&q=70`;
    img.alt = alt;
    img.loading = 'lazy';
    img.width = 600;
    img.height = 600;
    card.appendChild(img);
  }
  card.appendChild(el('figcaption', null, `Sample photos of ${p.name}’s work`));
  return card;
}

function reviewCard(p) {
  const r = p.reviews[0];
  const card = el('figure', 'card review-card');
  const stars = el('span', 'stars', '★★★★★');
  stars.setAttribute('aria-label', '5 out of 5 stars');
  card.appendChild(stars);
  card.appendChild(el('blockquote', null, `“${r.q}”`));
  const cap = el('figcaption', null, `${r.n} · ${r.s}`);
  cap.appendChild(el('span', 'sample', 'Sample'));
  card.appendChild(cap);
  return card;
}

function renderPanel(animate) {
  const p = active;
  const data = loaded[p.key];
  panel.replaceChildren(profileCard(p), servicesCard(p, data), hoursCard(p, data), workCard(p), reviewCard(p));
  if (animate) {
    panel.classList.remove('is-entering');
    void panel.offsetWidth; // restart the entrance animation
    panel.classList.add('is-entering');
  }
}

function renderStatus(p) {
  const node = document.querySelector(`[data-status="${p.key}"]`);
  const state = loaded[p.key] && openState(loaded[p.key], { open: 'In today · until', closed: 'Not in right now · book online' });
  node.textContent = state ? state.label : 'Book online any time';
  node.classList.toggle('is-open', !!state?.isOpen);
}

// ---------- boot ----------

select(active);
for (const p of STAFF) {
  loadData({ linkId: p.linkId, sample: p.sample }, data => {
    loaded[p.key] = data;
    renderStatus(p);
    if (p === active) renderPanel(false);
  });
}
document.fonts?.ready.then(moveGlider);
