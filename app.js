// Demo page shown to prospective clients. One page, four layouts: the visitor picks their kind
// of business and the copy, colours, illustration, services, hours, gallery and reviews change.
// `?type=` selects one directly, so a link can be sent already set to the right niche.
//
// Everything here is static example content. Nothing is loaded from an account and the booking
// buttons are inert: they only show what the real page would offer.

import { wirePicker } from './designs/shared/demo.js';

// Monday first.
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const NICHES = {
  nails: {
    title: 'Your Business Name — Nail & hair salon booking page demo',
    eyebrow: 'Manicure · Pedicure · Hair',
    h1Pre: 'Beautiful nails, ',
    h1Em: 'an hour just for you.',
    lead: 'Careful work, quality products and a calm space, so you leave relaxed and with a look that lasts for days.',
    proof: 'Book 24/7 · No phone calls · Instant confirmation',
    hours: [[540,1080],[540,1080],[540,1080],[540,1080],[540,1080],[600,900],null],
    whyEyebrow: 'Why clients choose us',
    whyTitle: 'Detail you can see',
    why: [
      { t: 'Clean and careful', d: 'Sterilised tools and close attention to every nail.' },
      { t: 'Quality products', d: 'Finishes that stay glossy and chip-free for longer.' },
      { t: 'A calm hour', d: 'No rush, no waiting room: your slot is yours.' }
    ],
    services: [
      { name: 'Classic manicure', min: 45, price: 30, desc: 'Shaping, cuticle care and polish.' },
      { name: 'Gel manicure', min: 60, price: 45, desc: 'Long-lasting colour with a high-shine finish.' },
      { name: 'Spa pedicure', min: 60, price: 50, desc: 'Soak, scrub and polish for soft, happy feet.' },
      { name: 'Nail art (per set)', min: 30, price: 20, desc: 'Hand-painted designs, from subtle to bold.' },
      { name: 'Blow-dry & styling', min: 45, price: 35, desc: 'Wash, blow-dry and finish.' },
      { name: 'Haircut & style', min: 60, price: 55, desc: 'Consultation, cut and styling.' }
    ]
  },
  barber: {
    title: 'Your Business Name — Barbershop booking page demo',
    eyebrow: 'Cuts · Fades · Beards',
    h1Pre: 'Sharp cuts, ',
    h1Em: 'right on time.',
    lead: 'Classic technique and a clean finish. Pick your chair time online and walk in knowing it is yours.',
    proof: 'Book 24/7 · Your slot is reserved · No waiting around',
    hours: [null,[540,1140],[540,1140],[540,1140],[540,1140],[540,1020],null],
    whyEyebrow: 'The shop',
    whyTitle: 'Old-school craft, no queue',
    why: [
      { t: 'Sharp every time', d: 'Fades, tapers and beards finished with a straight razor.' },
      { t: 'Your time is respected', d: 'Reserve a slot and skip the wait on the bench.' },
      { t: 'Regulars welcome', d: 'Rebook your usual cut in a few taps, any hour of the day.' }
    ],
    services: [
      { name: 'Classic haircut', min: 30, price: 25, desc: 'Scissor or clipper cut, neck shave and style.' },
      { name: 'Skin fade', min: 45, price: 30, desc: 'Tight, clean blend from skin to length.' },
      { name: 'Beard trim & shape', min: 20, price: 15, desc: 'Line-up, shaping and hot towel.' },
      { name: 'Haircut + beard', min: 50, price: 38, desc: 'The full treatment, one booking.' },
      { name: 'Hot towel shave', min: 30, price: 28, desc: 'Straight-razor shave with a hot towel.' },
      { name: 'Kids cut (under 12)', min: 25, price: 18, desc: 'Patient hands, quick and tidy.' }
    ]
  },
  detailing: {
    title: 'Your Business Name — Car detailing booking page demo',
    eyebrow: 'Interior · Exterior · Protection',
    h1Pre: 'Your car, ',
    h1Em: 'like the day you bought it.',
    lead: 'Deep interior cleaning, odour removal and protection. Book your drop-off slot online and know the price up front.',
    proof: 'Book 24/7 · Clear packages · Fixed prices',
    hours: [[480,1020],[480,1020],[480,1020],[480,1020],[480,1020],[540,780],null],
    whyEyebrow: 'The process',
    whyTitle: 'Every corner, not just the seats',
    why: [
      { t: 'Deep, not quick', d: 'Vents, seams, door cards and the spots a vacuum misses.' },
      { t: 'Safe on every material', d: 'The right product for leather, fabric and plastics.' },
      { t: 'Fixed packages', d: 'Pick a package, see the time and the price, then book.' }
    ],
    services: [
      { name: 'Interior express clean', min: 90, price: 70, desc: 'Vacuum, wipe-down and glass.' },
      { name: 'Full interior detail', min: 180, price: 160, desc: 'Deep clean of seats, carpets, dash and door cards.' },
      { name: 'Leather clean & condition', min: 60, price: 60, desc: 'Gentle clean and a protective conditioner.' },
      { name: 'Ozone odour treatment', min: 45, price: 40, desc: 'Removes smoke, pet and damp smells.' },
      { name: 'Pet hair removal', min: 60, price: 45, desc: 'Embedded hair lifted from fabric and carpet.' },
      { name: 'Interior + exterior package', min: 240, price: 250, desc: 'Full interior detail with wash and wax.' }
    ]
  },
  trainer: {
    title: 'Your Business Name — Personal trainer booking page demo',
    eyebrow: 'Personal training · Coaching',
    h1Pre: 'Train smarter, ',
    h1Em: 'see real progress.',
    lead: 'One-to-one sessions built around your goals. Choose a time that fits your week and book it in seconds.',
    proof: 'Book 24/7 · Easy rescheduling · Sessions that fit your week',
    hours: [[360,1200],[360,1200],[360,1200],[360,1200],[360,1200],[480,780],null],
    whyEyebrow: 'The coaching',
    whyTitle: 'A plan made for you',
    why: [
      { t: 'Built around your goals', d: 'Strength, fat loss or mobility: no copy-paste programmes.' },
      { t: 'Form first', d: 'Hands-on coaching so every rep counts and stays safe.' },
      { t: 'Flexible sessions', d: 'Early mornings to evenings, booked in a few taps.' }
    ],
    services: [
      { name: 'Free intro session', min: 30, price: 0, desc: 'Meet, set goals and try a short workout.' },
      { name: '1-to-1 personal training', min: 60, price: 50, desc: 'A full session tailored to you.' },
      { name: 'Partner training (2 people)', min: 60, price: 70, desc: 'Train with a friend, split the cost.' },
      { name: 'Online coaching call', min: 45, price: 35, desc: 'Review progress and adjust your plan.' },
      { name: 'Nutrition consultation', min: 45, price: 40, desc: 'Practical eating plan, no crash diets.' },
      { name: 'Mobility & stretch session', min: 45, price: 40, desc: 'Move better and recover faster.' }
    ]
  }
};

// Placeholder gallery captions and sample reviews, per niche. The first gallery tile is the
// "Your image" slot; the reviews are dummy text and are labelled as samples on the page.
const NICHE_EXTRAS = {
  nails: {
    galleryEyebrow: 'Our work',
    galleryTitle: 'Fresh sets, finished with care',
    gallery: ['Gel manicure', 'Nail art', 'French tips', 'Spa pedicure', 'Seasonal colours'],
    reviews: [
      { q: 'Careful, clean and calm. My gel set looked perfect for three weeks.', n: 'Client name', s: 'Gel manicure' },
      { q: 'Booking took ten seconds and I got my slot right away. Love the nail art!', n: 'Client name', s: 'Nail art' },
      { q: 'The most relaxing hour of my week. I always leave with a smile.', n: 'Client name', s: 'Spa pedicure' }
    ]
  },
  barber: {
    galleryEyebrow: 'The cuts',
    galleryTitle: 'Clean lines, every time',
    gallery: ['Skin fade', 'Classic cut', 'Beard shape-up', 'Hot towel shave', 'The shop'],
    reviews: [
      { q: 'In and out on time, and the fade was spot on. No more waiting on the bench.', n: 'Client name', s: 'Skin fade' },
      { q: 'Best beard shape-up I have had. Rebooking takes two taps.', n: 'Client name', s: 'Beard trim' },
      { q: 'Proper hot towel shave and a great chat. Worth every minute.', n: 'Client name', s: 'Hot towel shave' }
    ]
  },
  detailing: {
    galleryEyebrow: 'Before & after',
    galleryTitle: 'Results you can see (and smell)',
    gallery: ['Seats & leather', 'Dashboard', 'Carpets', 'Door cards', 'Finished interior'],
    reviews: [
      { q: 'The car felt brand new inside. Even the smoke smell from the previous owner is gone.', n: 'Client name', s: 'Ozone treatment' },
      { q: 'Clear price, clear time, and it was ready exactly when they said.', n: 'Client name', s: 'Full interior detail' },
      { q: 'Dog hair everywhere, and now there is none. Honestly impressive work.', n: 'Client name', s: 'Pet hair removal' }
    ]
  },
  trainer: {
    galleryEyebrow: 'In action',
    galleryTitle: 'Where the work happens',
    gallery: ['Strength session', 'Mobility work', 'Partner training', 'Outdoor workout', 'The studio'],
    reviews: [
      { q: 'Three months in and I am stronger than ever. The plan actually fits my week.', n: 'Client name', s: '1-to-1 training' },
      { q: 'Great form coaching, zero pressure. Rescheduling is easy when work gets busy.', n: 'Client name', s: 'Online coaching' },
      { q: 'Trained with my sister and had a blast. Highly recommend the partner sessions.', n: 'Client name', s: 'Partner training' }
    ]
  }
};
for (const key of Object.keys(NICHE_EXTRAS)) Object.assign(NICHES[key], NICHE_EXTRAS[key]);


const DEFAULT_NICHE = 'nails';
let currentNiche = DEFAULT_NICHE;

// ---------- helpers ----------

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

function formatTime(minutes) {
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const h12 = h24 % 12 || 12;
  return `${h12}:${String(m).padStart(2, '0')} ${h24 < 12 ? 'AM' : 'PM'}`;
}

function nicheFromUrl() {
  try {
    const t = new URLSearchParams(location.search).get('type');
    return t && NICHES[t] ? t : DEFAULT_NICHE;
  } catch {
    return DEFAULT_NICHE;
  }
}

// ---------- niche content ----------

function renderServices(niche) {
  const container = document.getElementById('services-list');
  container.replaceChildren();
  for (const svc of niche.services) {
    const card = el('div', 'service');

    const top = el('div', 'service-top');
    top.appendChild(el('span', 'service-name', svc.name));
    top.appendChild(el('span', 'service-price', svc.price > 0 ? `$${svc.price}` : 'Free'));
    card.appendChild(top);

    card.appendChild(el('span', 'service-meta', formatDuration(svc.min)));
    card.appendChild(el('p', 'service-desc', svc.desc));

    const book = el('button', 'service-book demo-btn', 'Book now →');
    book.type = 'button';
    card.appendChild(book);
    container.appendChild(card);
  }
}

function renderHours(niche) {
  const tbody = document.querySelector('#hours-table tbody');
  const badge = document.getElementById('open-badge');
  tbody.replaceChildren();

  const now = new Date();
  const todayIndex = (now.getDay() + 6) % 7; // Monday = 0
  DAYS.forEach((label, i) => {
    const range = niche.hours[i];
    const row = el('tr');
    if (i === todayIndex) row.classList.add('today');
    if (!range) row.classList.add('closed');
    row.appendChild(el('td', null, label));
    row.appendChild(el('td', null, range ? `${formatTime(range[0])} – ${formatTime(range[1])}` : 'Closed'));
    tbody.appendChild(row);
  });

  const today = niche.hours[todayIndex];
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const isOpen = !!today && nowMinutes >= today[0] && nowMinutes < today[1];
  badge.textContent = isOpen ? `Open now · until ${formatTime(today[1])}` : 'Closed now · book online';
  badge.classList.toggle('is-open', isOpen);
  badge.hidden = false;
}

function renderWhy(niche) {
  const list = document.getElementById('why-list');
  list.replaceChildren();
  niche.why.forEach((item, i) => {
    const card = el('div', 'why-item');
    card.appendChild(el('span', 'why-num', String(i + 1)));
    card.appendChild(el('h3', null, item.t));
    card.appendChild(el('p', null, item.d));
    list.appendChild(card);
  });
}

const IMAGE_ICON = '<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-8 9"/></svg>';

function renderGallery(niche) {
  const list = document.getElementById('gallery-list');
  list.replaceChildren();
  ['Your image', ...niche.gallery].forEach((caption, i) => {
    const tile = el('figure', i === 0 ? 'photo photo-main' : 'photo');
    tile.dataset.tone = String(i % 6);
    const icon = el('span', 'photo-icon');
    icon.innerHTML = IMAGE_ICON; // static markup defined above, no user data
    tile.appendChild(icon);
    tile.appendChild(el('figcaption', null, caption));
    list.appendChild(tile);
  });
}

function renderReviews(niche) {
  const list = document.getElementById('reviews-list');
  list.replaceChildren();
  for (const r of niche.reviews) {
    const card = el('figure', 'review');
    const stars = el('span', 'stars', '★★★★★');
    stars.setAttribute('role', 'img');
    stars.setAttribute('aria-label', '5 out of 5 stars');
    card.appendChild(stars);
    card.appendChild(el('blockquote', null, `“${r.q}”`));
    const cap = el('figcaption');
    cap.appendChild(el('strong', null, r.n));
    cap.appendChild(el('span', 'review-service', r.s));
    cap.appendChild(el('span', 'review-sample', 'Sample review'));
    card.appendChild(cap);
    list.appendChild(card);
  }
}

function applyNiche(key, { updateUrl = false } = {}) {
  const niche = NICHES[key] || NICHES[DEFAULT_NICHE];
  currentNiche = NICHES[key] ? key : DEFAULT_NICHE;

  document.documentElement.setAttribute('data-niche', currentNiche);
  document.title = niche.title;
  document.getElementById('niche-select').value = currentNiche;
  for (const node of document.querySelectorAll('[data-t]')) {
    const value = niche[node.dataset.t];
    if (value != null) node.textContent = value;
  }
  renderWhy(niche);
  renderServices(niche);
  renderHours(niche);
  renderGallery(niche);
  renderReviews(niche);
  syncThemeColor();

  if (updateUrl) {
    const url = new URL(location.href);
    url.searchParams.set('type', currentNiche);
    history.replaceState(history.state, '', url);
  }
}

// ---------- theme ----------

function syncThemeColor() {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || meta.content;
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  syncThemeColor();
}

function setupThemeToggle() {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch { /* choice lasts for this visit only */ }
  });

  // Until the visitor picks a theme, keep following the system setting.
  media.addEventListener('change', e => {
    let saved = null;
    try { saved = localStorage.getItem('theme'); } catch { /* ignore */ }
    if (!saved) applyTheme(e.matches ? 'dark' : 'light');
  });
}

// ---------- boot ----------

setupThemeToggle();
document.getElementById('year').textContent = String(new Date().getFullYear());
applyNiche(nicheFromUrl());
// The picker also lists the alternative page designs in designs/; picking one opens it.
wirePicker(document.getElementById('niche-select'), {
  current: currentNiche,
  onNiche: value => applyNiche(value, { updateUrl: true })
});
