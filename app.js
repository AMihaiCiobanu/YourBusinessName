// Demo page shown to prospective clients. One page, four layouts: the visitor picks their kind
// of business and the copy, services, colours and illustration change. `?type=` selects one
// directly, so a link can be sent already set to the right niche.
//
// Every niche books against the same demo account (BOOKING_LINK_ID). Opening hours are read live
// from that account; the services shown are fixed examples per niche, because one account can
// only hold one set of services.

const BOOKING_LINK_ID = '1ea9b2d4-c571-4ed0-960c-6154e8f1de60';
const CACHE_KEY = 'ybn_hours_v2';
const CACHE_TTL_MS = 5 * 60 * 1000;

const FIREBASE_VERSION = '10.14.1';
const firebaseConfig = {
  apiKey: 'AIzaSyDVcYMPg0lWd4tMxlfm5MLS8T6jtEXcoi8',
  authDomain: 'appointmentssync-c680f.firebaseapp.com',
  projectId: 'appointmentssync-c680f',
  storageBucket: 'appointmentssync-c680f.firebasestorage.app',
  messagingSenderId: '600609525849',
  appId: '1:600609525849:web:6d37c54629691bf6752148'
};
const RECAPTCHA_SITE_KEY = '6LcieqUsAAAAAJi2J0k-aawVuqpArTNRx1iccCRr';

const CURRENCY_SYMBOLS = {
  RON: 'lei', EUR: '€', GBP: '£', USD: '$', BRL: 'R$', CHF: 'Fr', HUF: 'Ft', BGN: 'лв', PLN: 'zł',
  INR: '₹', TRY: '₺', SEK: 'kr', NOK: 'kr', DKK: 'kr', CZK: 'Kč', AED: 'د.إ',
  RUB: '₽', KZT: '₸', KGS: 'с', UZS: "so'm"
};

// Monday first, keys as stored in users/{uid}/setari/bookingPublic (minutes from midnight).
const DAYS = [
  { label: 'Monday', key: 'Luni' },
  { label: 'Tuesday', key: 'Marti' },
  { label: 'Wednesday', key: 'Miercuri' },
  { label: 'Thursday', key: 'Joi' },
  { label: 'Friday', key: 'Vineri' },
  { label: 'Saturday', key: 'Sambata' },
  { label: 'Sunday', key: 'Duminica' }
];

// Local preview talks to the main site served on :8080; production uses the live booking page.
const BOOKING_ORIGIN = location.hostname === 'localhost' ? 'http://localhost:8080' : 'https://appointmentsapps.com';
const bookingUrl = `https://appointmentsapps.com/booking/?id=${BOOKING_LINK_ID}`;

const NICHES = {
  nails: {
    title: 'Your Business Name — Nail & hair salon booking page demo',
    eyebrow: 'Manicure · Pedicure · Hair',
    h1Pre: 'Beautiful nails, ',
    h1Em: 'an hour just for you.',
    lead: 'Careful work, quality products and a calm space, so you leave relaxed and with a look that lasts for days.',
    proof: 'Book 24/7 · No phone calls · Instant confirmation',
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
// Example prices follow the demo account's currency once it has loaded.
let currency = 'USD';

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

function formatPrice(amount) {
  const symbol = CURRENCY_SYMBOLS[currency] || currency;
  return symbol.length > 1 && /^[a-zA-Z]/.test(symbol) ? `${amount} ${symbol}` : `${symbol}${amount}`;
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
    const card = el('a', 'service');
    card.href = bookingUrl;

    const top = el('div', 'service-top');
    top.appendChild(el('span', 'service-name', svc.name));
    top.appendChild(el('span', 'service-price', svc.price > 0 ? formatPrice(svc.price) : 'Free'));
    card.appendChild(top);

    card.appendChild(el('span', 'service-meta', formatDuration(svc.min)));
    card.appendChild(el('p', 'service-desc', svc.desc));
    card.appendChild(el('span', 'service-cta', 'Book now →'));
    container.appendChild(card);
  }
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
  renderGallery(niche);
  renderReviews(niche);
  syncThemeColor();

  if (updateUrl) {
    const url = new URL(location.href);
    url.searchParams.set('type', currentNiche);
    history.replaceState(history.state, '', url);
  }
}

// ---------- opening hours (live) ----------

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data && Array.isArray(data.hours) ? data : null;
  } catch {
    return null;
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch { /* storage unavailable: page still works, just without caching */ }
}

async function fetchHours() {
  const base = `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}`;
  const [{ initializeApp }, { initializeAppCheck, ReCaptchaV3Provider }, fs] = await Promise.all([
    import(`${base}/firebase-app.js`),
    import(`${base}/firebase-app-check.js`),
    import(`${base}/firebase-firestore.js`)
  ]);
  const { getFirestore, doc, getDoc } = fs;

  const app = initializeApp(firebaseConfig);
  try {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(RECAPTCHA_SITE_KEY),
      isTokenAutoRefreshEnabled: true
    });
  } catch { /* App Check enforcement is off; never block the read on it */ }
  const db = getFirestore(app);

  const linkSnap = await getDoc(doc(db, 'bookingLinks', BOOKING_LINK_ID));
  if (!linkSnap.exists()) throw new Error('booking link missing');
  const link = linkSnap.data();
  const expiresAt = link.expiresAt?.toDate?.() || null;
  if (link.isDeleted || link.active === false || (expiresAt && expiresAt.getTime() < Date.now()) || !link.uid) {
    throw new Error('booking link inactive');
  }

  const publicSnap = await getDoc(doc(db, `users/${link.uid}/setari/bookingPublic`));
  const settings = publicSnap.exists() ? publicSnap.data() : {};

  const hours = DAYS.map(day => {
    const start = Number(settings[`programStart${day.key}`] || 0);
    const end = Number(settings[`programEnd${day.key}`] || 0);
    return start >= 0 && end > start && end <= 1439 ? { start, end } : null;
  });

  return { fetchedAt: Date.now(), currency: settings.currency || 'USD', hasHours: Object.keys(settings).length > 0, hours };
}

function renderHours(data) {
  if (data.currency && data.currency !== currency) {
    currency = data.currency;
    renderServices(NICHES[currentNiche]);
  }
  const tbody = document.querySelector('#hours-table tbody');
  const note = document.getElementById('hours-note');
  const badge = document.getElementById('open-badge');
  tbody.replaceChildren();

  if (!data.hasHours) {
    note.textContent = 'See the free times on the booking page.';
    return;
  }
  note.textContent = 'Hours can vary on days off — exact times are shown when you book.';

  const now = new Date();
  const todayIndex = (now.getDay() + 6) % 7; // Monday = 0
  DAYS.forEach((day, i) => {
    const range = data.hours[i];
    const row = el('tr');
    if (i === todayIndex) row.classList.add('today');
    if (!range) row.classList.add('closed');
    row.appendChild(el('td', null, day.label));
    row.appendChild(el('td', null, range ? `${formatTime(range.start)} – ${formatTime(range.end)}` : 'Closed'));
    tbody.appendChild(row);
  });

  const today = data.hours[todayIndex];
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const isOpen = !!today && nowMinutes >= today.start && nowMinutes < today.end;
  badge.textContent = isOpen ? `Open now · until ${formatTime(today.end)}` : 'Closed now · book online';
  badge.classList.toggle('is-open', isOpen);
  badge.hidden = false;
}

// ---------- booking dialog ----------

// The booking page itself runs inside the dialog (embed=1), opened on its calendar, so visitors
// try the booking without leaving this page. Modifier clicks still open the booking page in a
// new tab, and without JavaScript every link goes there directly.

function embeddedBookingUrl() {
  const params = new URLSearchParams({
    id: BOOKING_LINK_ID,
    embed: '1',
    lang: 'en',
    theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
  });
  return `${BOOKING_ORIGIN}/booking/?${params}`;
}

function setupBookingDialog() {
  const dialog = document.getElementById('booking-dialog');
  const body = document.getElementById('booking-dialog-body');
  if (!dialog || typeof dialog.showModal !== 'function') return; // old browser: plain links

  // A fresh iframe per opening: changing an existing iframe's src adds entries to the joint
  // session history, which would make Back step through the iframe instead of closing.
  let frame = null;
  // A reload while the dialog was open lands back on its history entry; start clean.
  if (history.state?.bookingDialog) history.replaceState(null, '');

  function finishClose() {
    if (dialog.open) dialog.close();
    document.documentElement.classList.remove('dialog-open');
    frame?.remove();
    frame = null;
  }

  // Opening pushes a history entry so the phone's Back button closes the dialog
  // instead of leaving the page.
  function requestClose() {
    if (history.state?.bookingDialog) history.back();
    else finishClose();
  }

  function open() {
    frame?.remove();
    frame = document.createElement('iframe');
    frame.title = 'Book online';
    frame.src = embeddedBookingUrl();
    // The booking page reports when its first screen (the calendar) has settled; until then
    // the loader stays up. Fallback in case that message never arrives.
    const shown = frame;
    frame.addEventListener('load', () => setTimeout(() => reveal(shown), 8000), { once: true });
    body.appendChild(frame);
    document.documentElement.classList.add('dialog-open');
    dialog.showModal();
    history.pushState({ bookingDialog: true }, '');
  }

  function reveal(target) {
    if (target && target === frame) frame.classList.add('is-loaded');
  }

  window.addEventListener('message', e => {
    if (e.origin === BOOKING_ORIGIN && e.data?.type === 'booking-ready' && e.source === frame?.contentWindow) {
      reveal(frame);
    }
  });

  document.getElementById('booking-dialog-close').addEventListener('click', requestClose);
  dialog.addEventListener('cancel', e => { e.preventDefault(); requestClose(); });
  dialog.addEventListener('click', e => { if (e.target === dialog) requestClose(); });
  window.addEventListener('popstate', () => { if (dialog.open) finishClose(); });

  document.addEventListener('click', e => {
    const link = e.target.closest('a.service, a.booking-link');
    if (!link || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    open();
  });
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

async function init() {
  setupThemeToggle();
  setupBookingDialog();
  document.getElementById('year').textContent = String(new Date().getFullYear());

  applyNiche(nicheFromUrl());
  document.getElementById('niche-select').addEventListener('change', e => {
    applyNiche(e.target.value, { updateUrl: true });
  });

  const cached = readCache();
  if (cached) renderHours(cached);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) return;

  try {
    const fresh = await fetchHours();
    writeCache(fresh);
    renderHours(fresh);
  } catch (err) {
    console.warn('Could not load opening hours', err);
    if (!cached) document.getElementById('hours-note').textContent = 'See the free times on the booking page.';
  }
}

init();
