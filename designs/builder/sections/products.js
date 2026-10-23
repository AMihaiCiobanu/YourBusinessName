// Products the client sells at the studio. These are NOT in the Appointments app: they are typed
// in by hand for each client page (name, size, price, photo, optional badge), in content/<niche>.js
// for the demo. "Reserve" sends a message (WhatsApp / email) on a real page; nothing is sold online.

import { h, photo, icon } from '../core/dom.js';
import { altOf } from '../content/photos.js';
import { formatPrice } from '../../shared/live.js';
import { currencyOf } from '../core/i18n.js';

export default {
  render(ctx) {
    const { t, content, lang } = ctx;
    const currency = currencyOf(lang);
    return h('section', { class: 'sec pr-sec' },
      h('div', { class: 'wrap' },
        h('header', { class: 'sec-head' },
          h('p', { class: 'eyebrow', text: t('products.eyebrow') }),
          h('h2', { 'data-split': '', text: t('products.title') }),
          h('p', { class: 'lead', text: t('products.lead') })),
        h('ul', { class: 'pr-grid' }, content.products.map((p, i) => h('li', { class: 'pr-card card', 'data-reveal': '', style: `--i:${i}` },
          h('div', { class: 'pr-photo' },
            photo(p.photo, { w: 520, h: 600, sizes: '(max-width: 600px) 50vw, 280px', alt: altOf(p.photo, lang) }),
            p.badge ? h('span', { class: 'pr-badge', text: p.badge }) : null),
          h('div', { class: 'pr-body' },
            h('h3', { class: 'pr-name', text: p.name }),
            h('p', { class: 'pr-size muted', text: p.size }),
            h('div', { class: 'pr-foot' },
              h('strong', { class: 'pr-price', text: formatPrice(p.price, currency) }),
              h('button', { type: 'button', class: 'btn btn-sm pr-buy', 'data-demo': 'reserve', 'data-name': p.name, 'aria-label': t('products.reserveAria', { name: p.name }) }, icon('bag', 16), t('products.reserve'))))))),
        h('p', { class: 'note', text: t('products.note') })));
  }
};
