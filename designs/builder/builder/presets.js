// Ready-made pages for visitors who would rather not build one: one tap sets the business type,
// theme, colour and a sensible set of sections (`group-type`, as in the URL, see core/state.js).
// Names come from i18n (niche · theme).

export const PRESETS = [
  { niche: 'barber', skin: 'luxe', accent: '#b87333', sections: ['hero', 'gallery-slider', 'prices-cards', 'prices-book', 'team', 'products', 'reviews', 'hours', 'map', 'contactbar'] },
  { niche: 'beauty', skin: 'clean', accent: '#d46aa6', sections: ['hero', 'prices-cards', 'compare', 'team', 'gallery-insta', 'reviews', 'gift', 'hours', 'map', 'prices-booking', 'contactbar'] },
  { niche: 'nails', skin: 'bold', accent: '', sections: ['hero', 'prices-cards', 'gallery-insta', 'gallery-coverflow', 'prices-list', 'loyalty', 'products', 'reviews', 'hours', 'contactbar'] },
  { niche: 'spa', skin: 'luxe', accent: '', sections: ['hero', 'gallery-slider', 'prices-book', 'gift', 'team', 'reviews', 'faq', 'hours', 'map', 'contactbar'] },
  { niche: 'detailing', skin: 'luxe', accent: '#4361ee', sections: ['hero', 'prices-cards', 'compare', 'prices-basket', 'gallery-filmstrip', 'reviews', 'faq', 'hours', 'map', 'prices-booking', 'contactbar'] },
  { niche: 'trainer', skin: 'bold', accent: '#4361ee', sections: ['hero', 'prices-cards', 'stats', 'team', 'compare', 'reviews', 'faq', 'prices-booking', 'contactbar'] },
  { niche: 'dental', skin: 'clean', accent: '#0e9f9a', sections: ['hero', 'prices-cards', 'prices-list', 'compare', 'team', 'stats', 'reviews', 'faq', 'hours', 'map', 'prices-booking', 'contactbar'] },
  { niche: 'derma', skin: 'clean', accent: '#a4553a', sections: ['hero', 'prices-cards', 'prices-book', 'compare', 'team', 'products', 'faq', 'reviews', 'hours', 'map', 'prices-booking', 'contactbar'] },
  { niche: 'clinic', skin: 'clean', accent: '#2f6f62', sections: ['hero', 'prices-cards', 'prices-list', 'team', 'stats', 'faq', 'hours', 'map', 'prices-booking', 'contactbar'] },
  { niche: 'tattoo', skin: 'luxe', accent: '#e8553d', sections: ['hero', 'gallery-coverflow', 'prices-cards', 'prices-book', 'team', 'gift', 'reviews', 'faq', 'hours', 'map', 'contactbar'] }
];
