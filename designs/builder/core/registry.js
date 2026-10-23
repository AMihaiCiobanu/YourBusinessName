// Every section the builder offers, as groups. A group is one row in the builder ("Photo gallery",
// "Prices") and has one or more types the visitor picks from a select. Each type lives in
// sections/<mod>.js (+ sections/<mod>.css) and is only imported when it is on the page. To add a
// type: add it to its group here, write the two files and add its name and description under
// `sec.<mod>` in i18n/en.js and i18n/ro.js (see docs/report.md).
//
// group   id      short, in the URL (`gallery`); a page item is `gallery-coverflow`, or just `hero`
//                 when the group has a single type
//         label   English name, used in the "Get my page" email whatever language the page is in
//         nav     header link group; the first visible section of a group gets the link
//         fixed   floats over the page (not part of the order)
//         multi   can be on the page more than once ("+ Add another"); every group with a type select
//                 is, except the hero (one h1 per page) and the floating contact buttons
// type    id      short, in the URL; unique inside its group
//         mod     file name in sections/ (defaults to id)
//         badges  small tags shown in the builder list (3d, live, original, new)
//         nav     header link group, when it differs from the group's
//         data    re-rendered when services / hours arrive from the app

const type = (id, label, badges = [], extra = {}) => ({ id, mod: extra.mod || id, label, badges, nav: extra.nav, data: !!extra.data });

export const GROUPS = [
  {
    id: 'hero', label: 'Hero', types: [
      type('3d', '3D hero', ['3d'], { mod: 'hero' }),
      type('split', 'Split hero with one photo', ['new'], { mod: 'herosplit' })
    ]
  },
  {
    id: 'gallery', label: 'Photo gallery', nav: 'gallery', multi: true, types: [
      type('coverflow', '3D coverflow', ['3d']),
      type('slider', 'Fullscreen photo slider'),
      type('filmstrip', 'Filmstrip'),
      type('insta', 'Instagram-style grid'),
      type('masonry', 'Masonry grid', ['new']),
      type('carousel', 'Swipe carousel', ['new'])
    ]
  },
  // Every way of showing the services from the app: cards, price book, price list, planner, form.
  {
    id: 'prices', label: 'Prices', nav: 'prices', multi: true, types: [
      type('book', 'Price menu as a 3D book', ['3d', 'live'], { data: true }),
      type('list', 'Price list', ['live'], { mod: 'prices', data: true }),
      type('cards', 'Service cards with 3D tilt', ['3d', 'live'], { mod: 'services', nav: 'services', data: true }),
      type('basket', 'Service basket calculator', ['original', 'live'], { data: true }),
      type('booking', 'Booking form', ['live'], { nav: 'book', data: true })
    ]
  },
  {
    id: 'compare', label: 'Before / after', nav: 'gallery', multi: true, types: [
      type('slider', 'Before / after slider', [], { mod: 'compare' }),
      type('duo', 'Before / after side by side', ['new'], { mod: 'compareduo' })
    ]
  },
  {
    id: 'stats', label: 'Numbers', multi: true, types: [
      type('counters', 'Animated counters', [], { mod: 'stats' }),
      type('band', 'Number strip', ['new'], { mod: 'statsband' }),
      type('ticker', 'Scrolling number ticker', ['new'], { mod: 'statsticker' })
    ]
  },
  {
    id: 'team', label: 'Team', nav: 'team', multi: true, types: [
      type('flip', 'Team flip cards', ['3d'], { mod: 'team' }),
      type('cards', 'Team profile cards', ['new'], { mod: 'teamgrid' })
    ]
  },
  {
    id: 'products', label: 'Products', nav: 'shop', multi: true, types: [
      type('cards', 'Product cards', [], { mod: 'products' }),
      type('list', 'Product list', ['new'], { mod: 'productlist' })
    ]
  },
  {
    id: 'gift', label: 'Gift card', multi: true, types: [
      type('card', '3D gift card', ['original', '3d'], { mod: 'gift' }),
      type('banner', 'Gift card banner', ['new'], { mod: 'giftbanner' })
    ]
  },
  {
    id: 'loyalty', label: 'Loyalty card', multi: true, types: [
      type('stamps', 'Loyalty stamp card', ['original'], { mod: 'loyalty' }),
      type('line', 'Loyalty progress line', ['new'], { mod: 'loyaltyline' })
    ]
  },
  {
    id: 'reviews', label: 'Reviews', nav: 'reviews', multi: true, types: [
      type('carousel', 'Reviews carousel', [], { mod: 'reviews' }),
      type('book', 'Guest book with turning pages', ['3d', 'new'], { mod: 'reviewbook' })
    ]
  },
  {
    id: 'faq', label: 'FAQ', multi: true, types: [
      type('accordion', 'FAQ accordion', [], { mod: 'faq' }),
      type('cards', 'FAQ cards', ['new'], { mod: 'faqgrid' })
    ]
  },
  {
    id: 'hours', label: 'Hours', nav: 'contact', multi: true, types: [
      type('live', 'Hours with live "open now"', ['live', 'original'], { mod: 'hours', data: true }),
      type('card', 'Hours card', ['live', 'new'], { mod: 'hourscard', data: true })
    ]
  },
  {
    id: 'map', label: 'Map', nav: 'contact', multi: true, types: [
      type('styled', 'Stylised map', ['original'], { mod: 'map' }),
      type('wide', 'Wide map', ['new'], { mod: 'mapwide' })
    ]
  },
  {
    id: 'contactbar', label: 'Contact buttons', fixed: true, types: [
      type('bar', 'Sticky WhatsApp / phone bar', [], { mod: 'contactbar', data: true }),
      type('bubbles', 'Round WhatsApp / phone buttons', ['new'], { mod: 'contactfab' })
    ]
  }
];

export const GROUP = Object.fromEntries(GROUPS.map(g => [g.id, g]));

// The type of a page item ({ group, type }); an unknown type falls back to the group's first.
export function typeOf(item) {
  const g = GROUP[item.group];
  return g.types.find(ty => ty.id === item.type) || g.types[0];
}

export const navOf = item => typeOf(item).nav || GROUP[item.group].nav;

// Section ids used before groups existed (links already sent by email still carry them).
export const LEGACY = {
  slider: ['gallery', 'slider'],
  coverflow: ['gallery', 'coverflow'],
  filmstrip: ['gallery', 'filmstrip'],
  insta: ['gallery', 'insta'],
  services: ['prices', 'cards'],
  book: ['prices', 'book'],
  prices: ['prices', 'list'],
  basket: ['prices', 'basket'],
  booking: ['prices', 'booking']
};

// What a first-time visitor sees: rich, but light enough for a fast first load on a phone.
export const DEFAULT_ON = ['hero', 'prices-cards', 'prices-book', 'compare', 'stats', 'gallery-coverflow', 'team', 'reviews', 'hours', 'map', 'faq', 'prices-booking', 'contactbar'];

// Header link labels (i18n keys under nav.*), in the order they appear.
export const NAV_GROUPS = ['services', 'prices', 'gallery', 'team', 'shop', 'reviews', 'contact'];

// Bump when a section module changes what it exports, so a browser never mixes a cached old file
// with a new one. Sections that import each other use the same ?v= (reviewbook → book, mapwide → map).
const VERSION = 4;
const modules = new Map();
export function loadSection(mod) {
  if (!modules.has(mod)) modules.set(mod, import(`../sections/${mod}.js?v=${VERSION}`).then(m => m.default));
  return modules.get(mod);
}
