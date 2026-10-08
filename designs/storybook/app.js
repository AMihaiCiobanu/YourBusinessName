// Storybook design. Services and hours come live from the booking link once BOOKING_LINK_ID is
// set (see ../shared/live.js); until then the sample below is shown. Reviews are sample text,
// laid out as a guest book you leaf through.

import { setLang, loadData, setupBooking, bookButton, el, formatPrice, formatDuration, weekRows, openState, serviceGroups } from '../shared/live.js';
import { mountDemo } from '../shared/demo.js';

// Client page: put the id of the public booking link from the Appointments & Reports app here.
const BOOKING_LINK_ID = '';

const SAMPLE = {
  currency: 'USD',
  hasHours: true,
  hours: [null, { start: 600, end: 1140 }, { start: 600, end: 1140 }, { start: 600, end: 1200 }, { start: 600, end: 1200 }, { start: 540, end: 960 }, null],
  services: [
    { id: 's1', name: 'Classic lash extensions', durationMinutes: 120, price: 120, showPrice: true, description: 'One extension per natural lash, for a soft mascara look.' },
    { id: 's2', name: 'Hybrid lash set', durationMinutes: 150, price: 150, showPrice: true, description: 'Classic and volume mixed for texture and fullness.' },
    { id: 's3', name: 'Lash lift & tint', durationMinutes: 60, price: 65, showPrice: true, description: 'Your own lashes, lifted and darkened for six weeks.' },
    { id: 's4', name: 'Brow lamination & tint', durationMinutes: 60, price: 60, showPrice: true, description: 'Brushed-up, fuller brows that hold their shape.' },
    { id: 's5', name: 'Soft glam makeup', durationMinutes: 60, price: 90, showPrice: true, description: 'Glowing skin, defined eyes, made to last the night.' },
    { id: 's6', name: 'Bridal makeup', durationMinutes: 90, price: 180, showPrice: true, description: 'Your wedding-day look, calm and unhurried.' },
    { id: 's7', name: 'Makeup lesson', durationMinutes: 90, price: 110, showPrice: true, description: 'Learn a five-minute routine with the products you own.' },
    { id: 'p1', name: 'Bridal package: trial + wedding day', durationMinutes: 180, price: 320, showPrice: true, description: 'A full trial weeks before, then the big day.', isSubscription: true },
    { id: 'p2', name: 'Lash club: 4 infills', durationMinutes: 60, price: 200, showPrice: true, description: 'Four infills booked as you go, at a better price.', isSubscription: true }
  ]
};

const REVIEWS = [
  { q: 'I have never felt so calm before a wedding. The makeup lasted through tears, dancing and a rainy photoshoot.', n: 'Client name', s: 'Bridal makeup' },
  { q: 'My lashes look like mine, just better. Booking the infill takes ten seconds.', n: 'Client name', s: 'Classic lash extensions' },
  { q: 'She taught me a routine I actually use every morning. Worth every minute.', n: 'Client name', s: 'Makeup lesson' },
  { q: 'Soft glam that still looked like me. Every photo from that night is a keeper.', n: 'Client name', s: 'Soft glam makeup' },
  { q: 'Brows that stay put all day. The studio is so peaceful I nearly fell asleep.', n: 'Client name', s: 'Brow lamination' },
  { q: 'Clean, careful and kind. I booked my next three appointments before leaving.', n: 'Client name', s: 'Hybrid lash set' }
];

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'];
const roman = n => ROMAN[n - 1] || String(n);

setLang('en');
mountDemo('storybook');
setupBooking({ linkId: BOOKING_LINK_ID, theme: 'light' });

// ---------- menu ----------

let menuData = null;
let activeGroup = 'services';

function renderMenu(data) {
  menuData = data;
  const groups = serviceGroups(data);
  const tabs = document.getElementById('menu-tabs');
  const list = document.getElementById('menu-list');
  document.getElementById('menu-note').hidden = groups.length > 0;
  if (!groups.some(g => g.key === activeGroup)) activeGroup = groups[0]?.key || 'services';

  tabs.replaceChildren();
  tabs.hidden = groups.length < 2;
  for (const g of groups) {
    const tab = el('button', 'tab', g.label);
    tab.type = 'button';
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', String(g.key === activeGroup));
    tab.addEventListener('click', () => { activeGroup = g.key; renderMenu(menuData); });
    tabs.appendChild(tab);
  }

  list.replaceChildren();
  const group = groups.find(g => g.key === activeGroup);
  (group?.items || []).forEach((svc, i) => {
    const item = el('li', 'toc-item');
    const link = bookButton('', { linkId: BOOKING_LINK_ID, service: svc, className: 'toc-link' });
    link.appendChild(el('span', 'toc-num', roman(i + 1)));
    const line = el('span', 'toc-line');
    line.appendChild(el('span', 'toc-name', svc.name));
    line.appendChild(el('span', 'toc-dots'));
    if (svc.showPrice) line.appendChild(el('span', 'toc-price', formatPrice(svc.price, data.currency)));
    link.appendChild(line);
    link.appendChild(el('span', 'toc-meta', formatDuration(svc.durationMinutes)));
    if (svc.description) link.appendChild(el('span', 'toc-desc', svc.description));
    link.appendChild(el('span', 'toc-cta', 'Choose a time →'));
    item.appendChild(link);
    list.appendChild(item);
  });
}

// ---------- hours ----------

function renderHours(data) {
  const tbody = document.querySelector('#hours tbody');
  tbody.replaceChildren();
  const status = document.getElementById('status');
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
  const state = openState(data, { open: 'Open today · until', closed: 'Closed now · book online any time' });
  status.textContent = state.label;
  status.classList.toggle('is-open', state.isOpen);
  status.hidden = false;
}

loadData({ linkId: BOOKING_LINK_ID, sample: SAMPLE }, data => {
  renderMenu(data);
  renderHours(data);
});

// ---------- guest book ----------

const book = document.getElementById('book');
const prevBtn = document.getElementById('book-prev');
const nextBtn = document.getElementById('book-next');
const count = document.getElementById('book-count');
const wide = window.matchMedia('(min-width: 760px)');
let leaves = [];
let turned = 0;

function page(className) {
  return el('div', `pg ${className}`);
}

function coverPage() {
  const p = page('pg-cover');
  p.appendChild(el('p', 'cover-kicker', 'Your Business Name'));
  p.appendChild(el('p', 'cover-title', 'Guest book'));
  p.appendChild(el('p', 'cover-sub', 'kind words from our clients'));
  p.appendChild(el('p', 'cover-hint', 'Tap to open'));
  return p;
}

function introPage() {
  const p = page('pg-intro pg-plain');
  p.appendChild(el('h3', null, 'Written by our clients'));
  const rule = el('div', 'rule');
  rule.appendChild(el('span'));
  p.appendChild(rule);
  p.appendChild(el('p', null, 'These are sample reviews for the demo. On your page, your own reviews fill this book, one page each.'));
  return p;
}

function reviewPage(r, folio) {
  const p = page('pg-review');
  const stars = el('span', 'stars', '★★★★★');
  stars.setAttribute('aria-label', '5 out of 5 stars');
  p.appendChild(stars);
  p.appendChild(el('span', 'dropq', '“'));
  p.appendChild(el('blockquote', null, r.q));
  const by = el('p', 'by', r.n);
  by.appendChild(el('span', null, r.s));
  p.appendChild(by);
  p.appendChild(el('span', 'sample-tag', 'Sample review'));
  p.appendChild(el('span', 'pg-folio', `— ${folio} —`));
  return p;
}

function endPage() {
  const p = page('pg-end pg-plain');
  p.appendChild(el('h3', null, 'Your page is next'));
  p.appendChild(el('p', null, 'Come in, and leave a few words of your own.'));
  p.appendChild(bookButton('Book a visit', { linkId: BOOKING_LINK_ID, className: 'btn btn-gold' }));
  return p;
}

function blankPage() {
  return page('pg-plain');
}

// Wide screens show an open spread (two pages per leaf: front and back). Phones show one page:
// each page gets its own leaf and the back of every leaf is plain paper.
function buildBook() {
  const pages = [coverPage(), introPage(), ...REVIEWS.map((r, i) => reviewPage(r, i + 1)), endPage()];
  const pairs = [];
  if (wide.matches) {
    for (let i = 0; i < pages.length; i += 2) pairs.push([pages[i], pages[i + 1] || blankPage()]);
  } else {
    for (const p of pages) pairs.push([p, blankPage()]);
  }

  book.replaceChildren();
  leaves = pairs.map(([front, back]) => {
    const leaf = el('div', 'leaf');
    const f = el('div', 'face front');
    const b = el('div', 'face back');
    f.appendChild(front);
    b.appendChild(back);
    leaf.append(f, b);
    leaf.addEventListener('click', e => {
      if (e.target.closest('[data-book]')) return;
      if (leaf.classList.contains('turned')) go(-1); else go(1);
    });
    book.appendChild(leaf);
    return leaf;
  });
  turned = Math.min(turned, leaves.length);
  layout();
}

// Turned leaves stack on the left, the rest on the right; the leaf in motion stays on top.
function layout(moving) {
  const n = leaves.length;
  leaves.forEach((leaf, i) => {
    const isTurned = i < turned;
    leaf.classList.toggle('turned', isTurned);
    leaf.style.zIndex = String(leaf === moving ? n + 1 : isTurned ? i + 1 : n - i);
    leaf.setAttribute('aria-hidden', 'true');
  });
  book.classList.toggle('is-closed', turned === 0);
  book.classList.toggle('is-done', turned === n);
  prevBtn.disabled = turned === 0;
  nextBtn.disabled = turned === n;

  const total = wide.matches ? n * 2 : n;
  const shown = wide.matches ? Math.min(turned * 2, total) : turned + 1;
  count.textContent = turned === 0 ? 'Cover' : turned === n && wide.matches ? 'Back cover' : `Page ${Math.min(shown, total)} of ${total}`;
}

function go(step) {
  const next = Math.max(0, Math.min(leaves.length, turned + step));
  if (next === turned) return;
  const moving = leaves[step > 0 ? turned : next];
  turned = next;
  layout(moving);
  setTimeout(() => layout(), 900);
}

prevBtn.addEventListener('click', () => go(-1));
nextBtn.addEventListener('click', () => go(1));
book.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
});

// Swipe: a horizontal drag turns a page; the click that follows is swallowed.
let startX = null;
let swiped = false;
book.addEventListener('pointerdown', e => { startX = e.clientX; swiped = false; });
book.addEventListener('pointerup', e => {
  if (startX == null) return;
  const dx = e.clientX - startX;
  startX = null;
  if (Math.abs(dx) > 40) { swiped = true; go(dx < 0 ? 1 : -1); }
});
book.addEventListener('click', e => { if (swiped) { e.stopPropagation(); swiped = false; } }, true);

wide.addEventListener('change', () => { turned = 0; buildBook(); });
buildBook();

// Screen readers get every review as a plain list.
const srList = document.getElementById('reviews-sr');
for (const r of REVIEWS) srList.appendChild(el('li', null, `${r.q} ${r.n}, ${r.s}. Sample review.`));
