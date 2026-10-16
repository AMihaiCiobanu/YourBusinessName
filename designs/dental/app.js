// Bright: dental clinic design. Treatments and hours come live from the booking link once
// BOOKING_LINK_ID is set (see ../shared/live.js); until then the sample below is shown.
// Team, reviews and photos are samples.

import { setLang, loadData, setupBooking, el } from '../shared/live.js';
import { mountDemo } from '../shared/demo.js?v=5';
import { setupBackdrop, solidHeader, treatmentBoard, compare, reviews, hours } from '../shared/clinic.js?v=1';

// Client page: put the id of the public booking link from the Appointments & Reports app here.
const BOOKING_LINK_ID = '';

const s = (id, name, durationMinutes, price, description, extra = {}) => ({ id, name, durationMinutes, price, showPrice: true, description, ...extra });
const SAMPLE = {
  currency: 'EUR',
  hasHours: true,
  hours: [{ start: 480, end: 1200 }, { start: 480, end: 1200 }, { start: 480, end: 1200 }, { start: 480, end: 1200 }, { start: 480, end: 1140 }, { start: 540, end: 840 }, null],
  services: [
    s('d1', 'Check-up & digital X-ray', 30, 35, 'Full exam, X-ray and a written plan.'),
    s('d2', 'Scale & polish (hygiene)', 45, 55, 'Tartar removal, air polishing and tips.'),
    s('d3', 'Emergency visit (tooth pain)', 30, 45, 'Same-day relief, then we plan the fix.'),
    s('d4', 'Tooth-coloured filling', 45, 70, 'Composite filling that matches your tooth.'),
    s('d5', 'Root canal (per tooth)', 90, 220, 'Done under the microscope, in one or two visits.'),
    s('d6', 'In-office whitening', 75, 250, 'Up to eight shades brighter in one session.'),
    s('d7', 'Clear aligners consultation', 45, 0, '3D scan and a preview of your new smile.'),
    s('d8', 'Implant consultation & 3D scan', 45, 60, 'Plan, timeline and cost, all in writing.'),
    s('d9', 'Kids check-up (under 12)', 30, 25, 'Friendly first visits, fluoride and sealants.'),
    s('d10', 'Hygiene membership (2 visits/year)', 45, 95, 'Two hygiene visits and check-ups a year.', { isSubscription: true })
  ]
};

const CONCERNS = [
  { id: 'checkup', label: 'Check-up & cleaning', words: ['check', 'hygien', 'scale', 'polish', 'control', 'igien', 'detartraj', 'periaj'] },
  { id: 'pain', label: 'Tooth pain', words: ['emergency', 'pain', 'root', 'filling', 'urgen', 'durere', 'canal', 'obtura', 'plomb'] },
  { id: 'white', label: 'Whiter teeth', words: ['whiten', 'albire', 'polish'] },
  { id: 'straight', label: 'Straighter teeth', words: ['align', 'brace', 'orthodon', 'aparat', 'ortodon'] },
  { id: 'implant', label: 'Missing tooth', words: ['implant', 'crown', 'bridge', 'coroan', 'punte', 'proteza'] },
  { id: 'kids', label: 'For kids', words: ['kid', 'child', 'copii', 'pedodon'] }
];

const REVIEWS = [
  { q: 'I had not been to a dentist in eight years. They made it calm, clear and painless.', n: 'Patient name', s: 'Check-up' },
  { q: 'Woke up with tooth pain, booked online at 7 AM and was seen before lunch.', n: 'Patient name', s: 'Emergency visit' },
  { q: 'The price on the plan was exactly what I paid. No surprises at all.', n: 'Patient name', s: 'Implant' },
  { q: 'My kids actually look forward to going. That says everything.', n: 'Patient name', s: 'Kids check-up' }
];

setLang('en');
mountDemo('dental');
setupBooking({ linkId: BOOKING_LINK_ID, theme: 'light' });
setupBackdrop({ backdrop: document.getElementById('backdrop'), caption: document.getElementById('caption') });
solidHeader(document.querySelector('.top'));

const board = treatmentBoard({
  list: document.getElementById('board'),
  chips: document.getElementById('chips'),
  note: document.getElementById('board-note'),
  linkId: BOOKING_LINK_ID,
  concerns: CONCERNS,
  labels: {
    all: 'All treatments',
    book: 'Book →',
    onRequest: 'Price on request',
    empty: 'All treatments and prices are on the booking page.',
    noMatch: 'Nothing listed for this yet. Book a check-up and we will advise you.',
    live: 'Live from the booking app: change a price there, it changes here.'
  }
});

loadData({ linkId: BOOKING_LINK_ID, sample: SAMPLE }, data => {
  board.render(data);
  hours({
    big: document.getElementById('big-time'),
    week: document.getElementById('week'),
    today: document.getElementById('today'),
    note: document.getElementById('hours-note'),
    data,
    labels: { bookOnline: 'Book online', seeTimes: 'See the free times on the booking page.', closedToday: 'Closed today', closed: 'Closed', openUntil: 'Open now · until', closedNow: 'Closed now · book online' }
  });
});

compare(document.getElementById('cmp'));
reviews({ quote: document.getElementById('quote'), dots: document.getElementById('dots'), items: REVIEWS, sampleLabel: 'Sample review' });

// The map loads only when asked (no Google requests before that).
document.getElementById('map-load').addEventListener('click', () => {
  const frame = el('iframe');
  frame.title = 'Map to the clinic';
  frame.loading = 'lazy';
  frame.referrerPolicy = 'no-referrer-when-downgrade';
  frame.src = `https://www.google.com/maps?q=${encodeURIComponent('Piața Unirii, Cluj-Napoca')}&output=embed`;
  document.getElementById('map').replaceChildren(frame);
});

// Demo: the call buttons explain what they do on a real page (tel: link).
let toastTimer = 0;
document.addEventListener('click', e => {
  if (!e.target.closest('[data-demo-call]')) return;
  let node = document.querySelector('.lv-toast.cl-toast');
  if (!node) { node = el('div', 'lv-toast cl-toast'); node.setAttribute('role', 'status'); document.body.appendChild(node); }
  node.textContent = 'Demo page: on your page this calls the clinic straight away.';
  node.classList.add('is-shown');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove('is-shown'), 3800);
});
