// Skin: dermatology clinic design. Treatments and hours come live from the booking link once
// BOOKING_LINK_ID is set (see ../shared/live.js); until then the sample below is shown.
// Doctor profile, reviews and photos are samples.

import { setLang, loadData, setupBooking, el } from '../shared/live.js';
import { mountDemo } from '../shared/demo.js?v=5';
import { setupBackdrop, solidHeader, treatmentBoard, compare, reviews, hours } from '../shared/clinic.js?v=1';

// Client page: put the id of the public booking link from the Appointments & Reports app here.
const BOOKING_LINK_ID = '';

const s = (id, name, durationMinutes, price, description, extra = {}) => ({ id, name, durationMinutes, price, showPrice: true, description, ...extra });
const SAMPLE = {
  currency: 'EUR',
  hasHours: true,
  hours: [{ start: 540, end: 1140 }, { start: 600, end: 1200 }, { start: 540, end: 1140 }, { start: 600, end: 1200 }, { start: 540, end: 1020 }, null, null],
  services: [
    s('m1', 'Dermatology consultation', 30, 60, 'Diagnosis, treatment plan and prescription.'),
    s('m2', 'Mole check (dermatoscopy)', 20, 50, 'Every mole checked under magnification.'),
    s('m3', 'Digital mole mapping', 40, 90, 'Photo map to follow changes over time.'),
    s('m4', 'Acne treatment plan', 30, 60, 'Medical plan plus follow-up after six weeks.'),
    s('m5', 'Rosacea & redness consultation', 30, 60, 'Triggers, creams and laser options explained.'),
    s('m6', 'Hair loss consultation (trichoscopy)', 40, 70, 'Scalp exam under magnification and a plan.'),
    s('m7', 'Chemical peel', 45, 90, 'Brighter, smoother skin, strength chosen by the doctor.'),
    s('m8', 'Pigmentation laser (per area)', 30, 150, 'For sun spots and uneven tone.'),
    s('m9', 'Benign lesion removal', 30, 0, 'Price after the consultation, depending on size.', { showPrice: false }),
    s('m10', 'Peel series (3 sessions)', 45, 240, 'Three peels, two weeks apart.', { isSubscription: true })
  ]
};

const CONCERNS = [
  { id: 'acne', label: 'Acne & scars', words: ['acne', 'acnee', 'scar', 'cicatri', 'peel'] },
  { id: 'moles', label: 'Moles & spots check', words: ['mole', 'alun', 'nev', 'dermatosc', 'lesion', 'mapping', 'cartograf'] },
  { id: 'pigment', label: 'Pigmentation', words: ['pigment', 'spot', 'pată', 'pete', 'laser', 'peel', 'melasm'] },
  { id: 'red', label: 'Redness & rosacea', words: ['rosacea', 'rozacee', 'redness', 'roșea', 'cuperoz', 'laser'] },
  { id: 'hair', label: 'Hair loss', words: ['hair', 'scalp', 'tricho', 'păr', 'alopec', 'capilar'] },
  { id: 'age', label: 'Fine lines & glow', words: ['peel', 'laser', 'line', 'rid', 'glow', 'rejuven', 'mezo'] }
];

const REVIEWS = [
  { q: 'Ten years of acne and nobody explained it like this. Three months later, my skin is clear.', n: 'Patient name', s: 'Acne treatment plan' },
  { q: 'The mole check was quick, thorough and calming. I finally do it every year.', n: 'Patient name', s: 'Mole check' },
  { q: 'She told me which treatments I did not need. That is why I trust her.', n: 'Patient name', s: 'Consultation' },
  { q: 'The sun spots on my cheeks are gone after two laser sessions.', n: 'Patient name', s: 'Pigmentation laser' }
];

setLang('en');
mountDemo('derma');
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
    onRequest: 'Price after consultation',
    empty: 'All treatments and prices are on the booking page.',
    noMatch: 'Nothing listed for this yet. Book a consultation and the doctor will advise you.',
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

document.getElementById('map-load').addEventListener('click', () => {
  const frame = el('iframe');
  frame.title = 'Map to the clinic';
  frame.loading = 'lazy';
  frame.referrerPolicy = 'no-referrer-when-downgrade';
  frame.src = `https://www.google.com/maps?q=${encodeURIComponent('Piața Unirii, Cluj-Napoca')}&output=embed`;
  document.getElementById('map').replaceChildren(frame);
});

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
