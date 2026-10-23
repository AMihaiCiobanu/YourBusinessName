// Turns a niche file into what the sections use, in the page language. Services and hours come out
// in the same shape as a live read from the app (designs/shared/live.js), so the sections cannot
// tell the sample from real data.
//
// The Romanian page shows prices in lei (×5, rounded to 5), the Polish one in złoty (×4.3, rounded
// to 5), the others in euro, which also
// shows that the currency comes from the data and is never hardcoded in a section.

import { photosFor, PHOTOS } from './photos.js';
import { currencyOf } from '../core/i18n.js';

const files = new Map();
function file(niche) {
  if (!files.has(niche)) files.set(niche, import(`./${niche}.js`).then(m => m.default));
  return files.get(niche);
}

const KIND = { p: 'isSubscription', c: 'isClass' };

function price(eur, lang) {
  const rate = { RON: 5, PLN: 4.3 }[currencyOf(lang)];
  return rate ? Math.round((eur * rate) / 5) * 5 : eur;
}

// ?sample=many: a long list (packages and classes included) to check how the book paginates.
function many(services) {
  const out = [];
  for (let round = 0; round < 4; round++) {
    for (const s of services) {
      out.push({ ...s, id: `${s.id}-${round}`, name: round ? `${s.name} ${['', 'II', 'III', 'IV'][round]}` : s.name, showPrice: !(round === 2 && out.length % 5 === 0) });
    }
  }
  return out;
}

export async function loadContent(niche, lang, { manyServices = false } = {}) {
  const src = await file(niche);
  const text = src[lang] || src.en;
  const photos = photosFor(niche);

  let services = text.services.map(([name, min, eur, description, kind = ''], i) => ({
    id: `${niche}-${i + 1}`,
    name,
    durationMinutes: min,
    price: price(eur, lang),
    showPrice: true,
    description,
    isClass: KIND[kind] === 'isClass',
    isSubscription: KIND[kind] === 'isSubscription'
  }));
  if (manyServices) services = many(services);

  const [clients, years, rating, extra] = src.stats;
  return {
    niche,
    lang,
    photos,
    tagline: text.tagline,
    h1: text.h1,
    lead: text.lead,
    sample: {
      currency: currencyOf(lang),
      hasHours: true,
      hours: src.hours.map(r => (r ? { start: r[0], end: r[1] } : null)),
      services
    },
    stats: [
      { value: clients, suffix: '+', key: 'clients' },
      { value: years, key: 'years' },
      { value: rating, decimals: 1, key: 'rating' },
      { value: extra, suffix: '+', label: text.stat4 }
    ],
    team: text.team.map(([name, role, tags], i) => ({ name, role, tags, photo: PHOTOS.team[(i * 2 + (niche.length % 2)) % PHOTOS.team.length] })),
    products: text.products.map(([name, size, badge], i) => ({ name, size, badge, price: price(src.products[i][0], lang), photo: PHOTOS.products[src.products[i][1]] })),
    reviews: text.reviews.map(([quote, name, service]) => ({ quote, name, service })),
    faq: text.faq.map(([q, a]) => ({ q, a })),
    slides: text.slides.map(([title, body], i) => ({ title, body, photo: photos[i] })),
    compare: { caption: text.compare, photo: photos[{ detailing: 3, dental: 8, derma: 7 }[niche] ?? 1] }
  };
}
