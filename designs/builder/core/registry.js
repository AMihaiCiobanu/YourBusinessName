// Every section the builder offers. Each one lives in sections/<id>.js (+ sections/<id>.css) and is
// only imported when it is switched on. To add a section: add a line here, write the two files and
// add its name and description under `sec.<id>` in i18n/en.js and i18n/ro.js (see docs/report.md).
//
// label   English name, used in the "Get my page" email whatever language the page is in.
// badges  small tags shown in the builder list (3d, live, original, new).
// nav     header link group; the first visible section of a group gets the link.
// fixed   floats over the page (not part of the order).
// data    re-rendered when services / hours arrive from the app.

export const SECTIONS = [
  { id: 'hero', label: '3D hero', badges: ['3d'] },
  { id: 'slider', label: 'Fullscreen photo slider', badges: [], nav: 'gallery' },
  { id: 'services', label: 'Service cards with 3D tilt', badges: ['3d', 'live'], nav: 'services', data: true },
  { id: 'book', label: 'Price menu as a 3D book', badges: ['3d', 'live'], nav: 'prices', data: true },
  { id: 'prices', label: 'Price list', badges: ['live'], nav: 'prices', data: true },
  { id: 'basket', label: 'Service basket calculator', badges: ['original', 'live'], data: true },
  { id: 'compare', label: 'Before / after slider', badges: [], nav: 'gallery' },
  { id: 'stats', label: 'Animated counters', badges: [] },
  { id: 'coverflow', label: '3D coverflow gallery', badges: ['3d'], nav: 'gallery' },
  { id: 'filmstrip', label: 'Filmstrip gallery', badges: [], nav: 'gallery' },
  { id: 'insta', label: 'Instagram-style grid', badges: [], nav: 'gallery' },
  { id: 'team', label: 'Team flip cards', badges: ['3d'], nav: 'team' },
  { id: 'products', label: 'Products for sale', badges: ['new'], nav: 'shop' },
  { id: 'gift', label: '3D gift card', badges: ['original', '3d'] },
  { id: 'loyalty', label: 'Loyalty stamp card', badges: ['original'] },
  { id: 'reviews', label: 'Reviews carousel', badges: [], nav: 'reviews' },
  { id: 'faq', label: 'FAQ', badges: [] },
  { id: 'hours', label: 'Hours with live "open now"', badges: ['live', 'original'], nav: 'contact', data: true },
  { id: 'map', label: 'Stylised map', badges: ['original'], nav: 'contact' },
  { id: 'booking', label: 'Booking form', badges: ['live'], nav: 'book', data: true },
  { id: 'contactbar', label: 'Sticky WhatsApp / phone bar', badges: [], fixed: true, data: true }
];

export const BY_ID = Object.fromEntries(SECTIONS.map(s => [s.id, s]));

// What a first-time visitor sees: rich, but light enough for a fast first load on a phone.
export const DEFAULT_ON = ['hero', 'services', 'book', 'compare', 'stats', 'coverflow', 'team', 'reviews', 'hours', 'map', 'faq', 'booking', 'contactbar'];

// Header link labels (i18n keys under nav.*), in the order they appear.
export const NAV_GROUPS = ['services', 'prices', 'gallery', 'team', 'shop', 'reviews', 'contact'];

const modules = new Map();
export function loadSection(id) {
  if (!modules.has(id)) modules.set(id, import(`../sections/${id}.js`).then(m => m.default));
  return modules.get(id);
}
