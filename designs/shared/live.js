// Live data for the design pages. Services, working hours and online booking come from the owner's
// Appointments & Reports account through their public booking link, the same way NailsByClemi does
// it: set a page's link id and everything below goes live. With no link id (the demo), the page
// renders the sample data it passes in, and booking buttons only explain what they would do.
//
// The result of a live read is cached in localStorage for 5 minutes so repeat visits render
// instantly without hitting Firestore.

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
const CACHE_TTL_MS = 5 * 60 * 1000;

// Local preview talks to the main site served on :8080; production uses the live booking page.
const BOOKING_ORIGIN = location.hostname === 'localhost' ? 'http://localhost:8080' : 'https://appointmentsapps.com';

// Monday first. Keys as stored in users/{uid}/setari/bookingPublic (minutes from midnight).
const DAY_KEYS = ['Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata', 'Duminica'];

const TEXT = {
  en: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    short: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    closed: 'Closed',
    free: 'Free',
    groups: ['Services', 'Packages', 'Classes'],
    dialogTitle: 'Book online',
    close: 'Close',
    loading: 'Loading the calendar…',
    demo: name => name
      ? `Demo page: on your page, this opens the booking calendar for “${name}”.`
      : 'Demo page: on your page, this opens your online booking calendar.'
  },
  ro: {
    days: ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică'],
    short: ['Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm', 'Dum'],
    closed: 'Închis',
    free: 'Gratuit',
    groups: ['Servicii', 'Abonamente', 'Cursuri'],
    dialogTitle: 'Programare online',
    close: 'Închide',
    loading: 'Se încarcă calendarul…',
    demo: name => name
      ? `Pagină demo: pe pagina ta, aici se deschide calendarul de programare pentru „${name}”.`
      : 'Pagină demo: pe pagina ta, aici se deschide calendarul de programare online.'
  },
  fr: {
    days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    short: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    closed: 'Fermé',
    free: 'Gratuit',
    groups: ['Prestations', 'Forfaits', 'Cours'],
    dialogTitle: 'Réserver en ligne',
    close: 'Fermer',
    loading: 'Chargement du calendrier…',
    demo: name => name
      ? `Page de démo : sur votre page, ce bouton ouvre le calendrier de réservation pour « ${name} ».`
      : 'Page de démo : sur votre page, ce bouton ouvre votre calendrier de réservation en ligne.'
  },
  es: {
    days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    short: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    closed: 'Cerrado',
    free: 'Gratis',
    groups: ['Servicios', 'Bonos', 'Clases'],
    dialogTitle: 'Reservar online',
    close: 'Cerrar',
    loading: 'Cargando el calendario…',
    demo: name => name
      ? `Página de demostración: en tu página, aquí se abre el calendario de reservas para «${name}».`
      : 'Página de demostración: en tu página, aquí se abre tu calendario de reservas online.'
  },
  pt: {
    days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'],
    short: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    closed: 'Fechado',
    free: 'Grátis',
    groups: ['Serviços', 'Pacotes', 'Aulas'],
    dialogTitle: 'Marcar online',
    close: 'Fechar',
    loading: 'A carregar o calendário…',
    demo: name => name
      ? `Página de demonstração: na sua página, aqui abre o calendário de marcações para «${name}».`
      : 'Página de demonstração: na sua página, aqui abre o seu calendário de marcações online.'
  },
  pl: {
    days: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
    short: ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nd'],
    closed: 'Zamknięte',
    free: 'Bezpłatnie',
    groups: ['Usługi', 'Karnety', 'Zajęcia'],
    dialogTitle: 'Rezerwacja online',
    close: 'Zamknij',
    loading: 'Ładowanie kalendarza…',
    demo: name => name
      ? `Strona demo: na Twojej stronie tu otworzy się kalendarz rezerwacji dla „${name}”.`
      : 'Strona demo: na Twojej stronie tu otworzy się Twój kalendarz rezerwacji online.'
  },
  it: {
    days: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'],
    short: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
    closed: 'Chiuso',
    free: 'Gratis',
    groups: ['Servizi', 'Pacchetti', 'Corsi'],
    dialogTitle: 'Prenota online',
    close: 'Chiudi',
    loading: 'Caricamento del calendario…',
    demo: name => name
      ? `Pagina demo: sulla tua pagina, qui si apre il calendario delle prenotazioni per «${name}».`
      : 'Pagina demo: sulla tua pagina, qui si apre il tuo calendario di prenotazione online.'
  },
  el: {
    days: ['Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο', 'Κυριακή'],
    short: ['Δευ', 'Τρί', 'Τετ', 'Πέμ', 'Παρ', 'Σάβ', 'Κυρ'],
    closed: 'Κλειστά',
    free: 'Δωρεάν',
    groups: ['Υπηρεσίες', 'Πακέτα', 'Μαθήματα'],
    dialogTitle: 'Κράτηση online',
    close: 'Κλείσιμο',
    loading: 'Φόρτωση ημερολογίου…',
    demo: name => name
      ? `Σελίδα επίδειξης: στη σελίδα σας, εδώ ανοίγει το ημερολόγιο κρατήσεων για «${name}».`
      : 'Σελίδα επίδειξης: στη σελίδα σας, εδώ ανοίγει το online ημερολόγιο κρατήσεών σας.'
  }
};

const CURRENCY_SYMBOLS = {
  RON: 'lei', EUR: '€', GBP: '£', USD: '$', BRL: 'R$', CHF: 'Fr', HUF: 'Ft', BGN: 'лв', PLN: 'zł',
  INR: '₹', TRY: '₺', SEK: 'kr', NOK: 'kr', DKK: 'kr', CZK: 'Kč', AED: 'د.إ',
  RUB: '₽', KZT: '₸', KGS: 'с', UZS: "so'm"
};
const SYMBOL_FIRST = new Set(['USD', 'GBP', 'BRL', 'INR']);

let lang = 'en';
export function setLang(code) { if (TEXT[code]) lang = code; }
export function t(key) { return TEXT[lang][key]; }

// ---------- formatting ----------

export function formatPrice(amount, currencyCode) {
  if (!(amount > 0)) return TEXT[lang].free;
  const symbol = CURRENCY_SYMBOLS[currencyCode] || currencyCode;
  const value = Number.isInteger(amount) ? String(amount) : amount.toFixed(2);
  return SYMBOL_FIRST.has(currencyCode) ? `${symbol}${value}` : `${value} ${symbol}`;
}

export function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

// English pages use 12-hour time, every other language 24-hour.
export function formatTime(minutes) {
  const h24 = Math.floor(minutes / 60);
  const m = String(minutes % 60).padStart(2, '0');
  if (lang !== 'en') return `${String(h24).padStart(2, '0')}:${m}`;
  return `${h24 % 12 || 12}:${m} ${h24 < 12 ? 'AM' : 'PM'}`;
}

export function formatRange(range) {
  return range ? `${formatTime(range.start)} – ${formatTime(range.end)}` : TEXT[lang].closed;
}

export function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

// ---------- derived views ----------

// Rows for an hours table, Monday first, with today flagged.
export function weekRows(data) {
  const todayIndex = (new Date().getDay() + 6) % 7;
  return TEXT[lang].days.map((label, i) => ({
    label,
    short: TEXT[lang].short[i],
    range: data.hours[i] || null,
    text: formatRange(data.hours[i] || null),
    isToday: i === todayIndex
  }));
}

// { isOpen, today, label } for an "open now" badge, or null when the hours are unknown.
export function openState(data, { open = 'Open now · until', closed = 'Closed now · book online' } = {}) {
  if (!data.hasHours) return null;
  const now = new Date();
  const today = data.hours[(now.getDay() + 6) % 7];
  const minutes = now.getHours() * 60 + now.getMinutes();
  const isOpen = !!today && minutes >= today.start && minutes < today.end;
  return { isOpen, today, label: isOpen ? `${open} ${formatTime(today.end)}` : closed };
}

// Services split into Services / Packages / Classes, empty groups dropped.
export function serviceGroups(data) {
  const [services, packages, classes] = TEXT[lang].groups;
  return [
    { key: 'services', label: services, items: data.services.filter(s => !s.isClass && !s.isSubscription) },
    { key: 'packages', label: packages, items: data.services.filter(s => s.isSubscription) },
    { key: 'classes', label: classes, items: data.services.filter(s => s.isClass) }
  ].filter(g => g.items.length);
}

// ---------- loading ----------

function readCache(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key) || 'null');
    return data && Array.isArray(data.services) ? data : null;
  } catch {
    return null;
  }
}

function writeCache(key, data) {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch { /* no storage: just no cache */ }
}

let firestorePromise = null;
function firestore() {
  if (!firestorePromise) {
    const base = `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}`;
    firestorePromise = Promise.all([
      import(`${base}/firebase-app.js`),
      import(`${base}/firebase-app-check.js`),
      import(`${base}/firebase-firestore.js`)
    ]).then(([{ initializeApp }, { initializeAppCheck, ReCaptchaV3Provider }, fs]) => {
      const app = initializeApp(firebaseConfig);
      try {
        initializeAppCheck(app, { provider: new ReCaptchaV3Provider(RECAPTCHA_SITE_KEY), isTokenAutoRefreshEnabled: true });
      } catch { /* App Check enforcement is off; never block the read on it */ }
      return { fs, db: fs.getFirestore(app) };
    });
  }
  return firestorePromise;
}

async function fetchLive(linkId) {
  const { fs, db } = await firestore();
  const { doc, getDoc, collection, getDocs, query, where, Timestamp } = fs;

  const linkSnap = await getDoc(doc(db, 'bookingLinks', linkId));
  if (!linkSnap.exists()) throw new Error('booking link missing');
  const link = linkSnap.data();
  const expiresAt = link.expiresAt?.toDate?.() || null;
  if (link.isDeleted || link.active === false || (expiresAt && expiresAt.getTime() < Date.now()) || !link.uid) {
    throw new Error('booking link inactive');
  }

  const [publicSnap, servicesSnap] = await Promise.all([
    getDoc(doc(db, `users/${link.uid}/setari/bookingPublic`)),
    getDocs(collection(db, `users/${link.uid}/servicii`))
  ]);
  const settings = publicSnap.exists() ? publicSnap.data() : {};

  let services = servicesSnap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .filter(s => s.isDeleted !== true && s.showService !== false)
    .map(s => ({
      id: s.id,
      name: s.nume || '',
      durationMinutes: Number(s.durataMinute || 0),
      price: Number(s.pret || 0),
      showPrice: s.showPrice !== false,
      description: s.serviceDescription || '',
      isClass: s.tipServiciu === 'CLASS',
      isSubscription: s.tipServiciu === 'SUBSCRIPTION'
    }))
    .filter(s => s.name && s.durationMinutes > 0)
    .sort((a, b) => a.name.localeCompare(b.name, lang));

  // Same rule as the booking page: a class whose whole series has already been held cannot be
  // booked on any date, so it is not listed. A failed read keeps every class listed.
  if (services.some(s => s.isClass)) {
    try {
      const dayStart = new Date();
      dayStart.setHours(0, 0, 0, 0);
      const sessionsSnap = await getDocs(query(
        collection(db, `users/${link.uid}/classSessions`),
        where('startDate', '>=', Timestamp.fromDate(dayStart))
      ));
      const bookable = new Set(sessionsSnap.docs
        .map(d => d.data())
        .filter(row => {
          const start = row.startDate?.toDate?.();
          const end = row.endDate?.toDate?.();
          return row.isDeleted !== true && start && end && end > start;
        })
        .map(row => row.serviceId || ''));
      services = services.filter(s => !s.isClass || bookable.has(s.id));
    } catch { /* keep every class listed */ }
  }

  const hours = DAY_KEYS.map(key => {
    const start = Number(settings[`programStart${key}`] || 0);
    const end = Number(settings[`programEnd${key}`] || 0);
    return start >= 0 && end > start && end <= 1439 ? { start, end } : null;
  });

  return {
    fetchedAt: Date.now(),
    live: true,
    currency: settings.currency || 'RON',
    hasHours: Object.keys(settings).length > 0,
    services,
    hours
  };
}

// Calls render(data) with the sample (no link id), or with the cached and then the fresh live
// data. If the live read fails and nothing is cached, render gets an empty result with
// `failed: true`, so the page can point visitors to the booking page instead.
export async function loadData({ linkId, sample }, render) {
  if (!linkId) {
    render({ ...sample, live: false });
    return;
  }
  const key = `live_${linkId}`;
  const cached = readCache(key);
  if (cached) render(cached);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) return;
  try {
    const fresh = await fetchLive(linkId);
    writeCache(key, fresh);
    render(fresh);
  } catch (err) {
    console.warn('Could not load services', err);
    if (!cached) render({ live: true, failed: true, currency: '', hasHours: false, services: [], hours: [] });
  }
}

// ---------- booking ----------

export function bookingUrl(linkId, serviceId) {
  const url = `https://appointmentsapps.com/booking?id=${encodeURIComponent(linkId)}`;
  return serviceId ? `${url}&service=${encodeURIComponent(serviceId)}` : url;
}

// A booking control. Live: a real link to the booking page (the dialog takes over plain clicks).
// Demo: a button that shows the demo note.
export function bookButton(text, { linkId, service, className = '' } = {}) {
  const node = linkId ? el('a', className, text) : el('button', className, text);
  node.dataset.book = '';
  if (linkId) {
    node.href = bookingUrl(linkId, service?.id);
    node.dataset.link = linkId;
  } else {
    node.type = 'button';
  }
  if (service) {
    node.dataset.service = service.id;
    node.dataset.serviceName = service.name;
  }
  return node;
}

let toastTimer = 0;
function toast(message) {
  let node = document.querySelector('.lv-toast');
  if (!node) {
    node = el('div', 'lv-toast');
    node.setAttribute('role', 'status');
    document.body.appendChild(node);
  }
  node.textContent = message;
  node.classList.add('is-shown');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove('is-shown'), 3800);
}

const CLOSE_ICON = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

// Every [data-book] element opens booking. `linkId` is the page's default link; an element's own
// data-link wins (a team page has one link per person). Static [data-book] links in the markup
// get their href here. The booking page runs inside a dialog (embed=1), opened straight on the
// chosen service; modifier clicks still open it in a new tab.
export function setupBooking({ linkId = '', theme = 'light' } = {}) {
  for (const node of document.querySelectorAll('a[data-book]:not([data-link])')) {
    if (linkId) {
      node.href = bookingUrl(linkId, node.dataset.service);
      node.dataset.link = linkId;
    }
  }

  const dialog = el('dialog', 'lv-dialog');
  dialog.setAttribute('aria-label', TEXT[lang].dialogTitle);
  const bar = el('div', 'lv-dialog-bar');
  bar.appendChild(el('h2', null, TEXT[lang].dialogTitle));
  const closeBtn = el('button', 'lv-dialog-close');
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', TEXT[lang].close);
  closeBtn.innerHTML = CLOSE_ICON; // static markup above
  bar.appendChild(closeBtn);
  const body = el('div', 'lv-dialog-body');
  const loading = el('p', 'lv-dialog-loading');
  loading.appendChild(el('span', 'lv-spinner'));
  loading.append(TEXT[lang].loading);
  body.appendChild(loading);
  dialog.append(bar, body);
  document.body.appendChild(dialog);
  const canDialog = typeof dialog.showModal === 'function';

  // A fresh iframe per opening: changing an existing iframe's src adds entries to the joint
  // session history, which would make Back step through the iframe instead of closing.
  let frame = null;
  if (history.state?.bookingDialog) history.replaceState(null, '');

  function finishClose() {
    if (dialog.open) dialog.close();
    document.documentElement.classList.remove('lv-dialog-open');
    frame?.remove();
    frame = null;
  }

  // Opening pushes a history entry so the phone's Back button closes the dialog.
  function requestClose() {
    if (history.state?.bookingDialog) history.back();
    else finishClose();
  }

  function open(link, serviceId) {
    const params = new URLSearchParams({ id: link, embed: '1', lang, theme: typeof theme === 'function' ? theme() : theme });
    if (serviceId) params.set('service', serviceId);
    frame?.remove();
    frame = el('iframe');
    frame.title = TEXT[lang].dialogTitle;
    frame.src = `${BOOKING_ORIGIN}/booking/?${params}`;
    const shown = frame;
    frame.addEventListener('load', () => setTimeout(() => reveal(shown), 8000), { once: true });
    body.appendChild(frame);
    document.documentElement.classList.add('lv-dialog-open');
    dialog.showModal();
    history.pushState({ bookingDialog: true }, '');
  }

  function reveal(target) {
    if (target && target === frame) frame.classList.add('is-loaded');
  }

  window.addEventListener('message', e => {
    if (e.origin === BOOKING_ORIGIN && e.data?.type === 'booking-ready' && e.source === frame?.contentWindow) reveal(frame);
  });
  closeBtn.addEventListener('click', requestClose);
  dialog.addEventListener('cancel', e => { e.preventDefault(); requestClose(); });
  dialog.addEventListener('click', e => { if (e.target === dialog) requestClose(); });
  window.addEventListener('popstate', () => { if (dialog.open) finishClose(); });

  document.addEventListener('click', e => {
    const node = e.target.closest('[data-book]');
    if (!node || e.defaultPrevented) return;
    const link = node.dataset.link || linkId;
    if (!link) {
      e.preventDefault();
      toast(TEXT[lang].demo(node.dataset.serviceName || ''));
      return;
    }
    if (!canDialog || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    open(link, node.dataset.service || '');
  });
}
