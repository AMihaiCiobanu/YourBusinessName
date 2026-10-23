// Wide map: the stylised map from map.js across the whole width, with the address, phone and
// Directions in a card on top. Google Maps opens in a new tab, so nothing from Google loads here.

import { h, icon } from '../core/dom.js';
import { mapArt } from './map.js?v=4'; // same ?v= as VERSION in core/registry.js

export default {
  render(ctx) {
    const { t } = ctx;
    const address = t('map.address');
    return h('section', { class: 'sec mc-sec' },
      h('div', { class: 'mc-map' }, mapArt()),
      h('div', { class: 'wrap mc-wrap' },
        h('div', { class: 'mc-card card', 'data-reveal': '' },
          h('p', { class: 'eyebrow', text: t('map.eyebrow') }),
          h('h2', { text: t('map.title') }),
          h('ul', { class: 'mc-list' },
            h('li', null, icon('pin', 20), h('span', null, address, h('br'), h('span', { class: 'sample-tag', text: t('map.sample') }))),
            h('li', null, icon('phone', 20), h('button', { type: 'button', class: 'mc-link', 'data-demo': 'call', text: t('map.phone') }))),
          h('a', { class: 'btn', href: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`, target: '_blank', rel: 'noopener' }, icon('directions', 18), t('map.directions')))));
  }
};
