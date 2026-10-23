// Gift card as a wide banner: the offer, the amounts clients choose most and a call button. Paid for
// at the salon, so there is no form; on the demo the button shows a toast, on a real page it calls.

import { h, icon } from '../core/dom.js';
import { formatPrice } from '../../shared/live.js';

const AMOUNTS = { EUR: [50, 100, 200], RON: [250, 500, 1000] };

export default {
  render(ctx) {
    const { t, lang } = ctx;
    const currency = lang === 'ro' ? 'RON' : 'EUR';
    return h('section', { class: 'sec gb-sec' },
      h('div', { class: 'wrap' },
        h('div', { class: 'gb-banner', 'data-reveal': '' },
          h('span', { class: 'gb-icon', 'aria-hidden': 'true' }, icon('gift', 34)),
          h('div', { class: 'gb-copy' },
            h('p', { class: 'eyebrow', text: t('gift.eyebrow') }),
            h('h2', { text: t('gift.title') }),
            h('p', { text: t('gift.lead') })),
          h('div', { class: 'gb-side' },
            h('p', { class: 'gb-label', text: t('giftbanner.amounts') }),
            h('ul', { class: 'gb-amounts' }, AMOUNTS[currency].map(a => h('li', { class: 'gb-amount', text: formatPrice(a, currency) }))),
            h('button', { type: 'button', class: 'btn', 'data-demo': 'call' }, icon('phone', 18), t('gift.cta'))))));
  }
};
