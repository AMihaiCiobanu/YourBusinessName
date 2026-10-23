// Products as a compact list: thumbnail, name and size, price, Reserve. Same hand-typed products as
// the product cards (content/<niche>.js on the demo); nothing is sold online.

import { h, photo, icon } from '../core/dom.js';
import { altOf } from '../content/photos.js';
import { formatPrice } from '../../shared/live.js';

export default {
  render(ctx) {
    const { t, content, lang } = ctx;
    const currency = lang === 'ro' ? 'RON' : 'EUR';
    return h('section', { class: 'sec pd-sec' },
      h('div', { class: 'wrap pd-wrap' },
        h('header', { class: 'sec-head' },
          h('p', { class: 'eyebrow', text: t('products.eyebrow') }),
          h('h2', { 'data-split': '', text: t('products.title') }),
          h('p', { class: 'lead', text: t('products.lead') })),
        h('ul', { class: 'pd-list card' }, content.products.map(p => h('li', { class: 'pd-row' },
          photo(p.photo, { w: 160, h: 160, sizes: '80px', alt: altOf(p.photo, lang), className: 'pd-photo' }),
          h('div', { class: 'pd-text' },
            h('h3', { class: 'pd-name' }, p.name, p.badge ? h('span', { class: 'chip pd-badge', text: p.badge }) : null),
            h('p', { class: 'muted', text: p.size })),
          h('strong', { class: 'pd-price', text: formatPrice(p.price, currency) }),
          h('button', { type: 'button', class: 'icon-btn pd-buy', 'data-demo': 'reserve', 'data-name': p.name, 'aria-label': t('products.reserveAria', { name: p.name }) }, icon('bag', 18))))),
        h('p', { class: 'note', text: t('products.note') })));
  }
};
