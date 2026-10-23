// Gift card (original): a card that leans in 3D under the mouse / finger and turns over to show a
// message. No form: the gift card is paid for at the salon, so the button only asks the client to
// call. On the demo it shows a toast; on a real page it is a tel: link, like the other call buttons.

import { h, icon } from '../core/dom.js';
import { tilt } from '../core/motion.js';
import { formatPrice } from '../../shared/live.js';
import { currencyOf } from '../core/i18n.js';

const AMOUNT = { EUR: 100, RON: 500, PLN: 400 };

export default {
  render(ctx) {
    const { t, lang, name } = ctx;
    const currency = currencyOf(lang);
    const card = h('div', { class: 'gc-card' },
      h('div', { class: 'gc-inner' },
        h('div', { class: 'gc-face gc-front' },
          h('span', { class: 'gc-glare', 'aria-hidden': 'true' }),
          h('div', { class: 'gc-row' }, h('span', { class: 'gc-brand', text: name }), icon('gift', 26)),
          h('p', { class: 'gc-label', text: t('gift.card') }),
          h('p', { class: 'gc-amount', text: formatPrice(AMOUNT[currency], currency) }),
          h('div', { class: 'gc-row gc-small' }, h('span'), h('span', { text: t('gift.valid') }))),
        h('div', { class: 'gc-face gc-back' },
          h('p', { class: 'gc-msg', text: t('gift.msg') }),
          h('p', { class: 'gc-from', text: `— ${name}` }))));

    const flip = h('button', { type: 'button', class: 'btn btn-ghost btn-sm', 'aria-pressed': 'false' }, icon('flip', 16), t('gift.flip'));
    flip.addEventListener('click', () => {
      const on = !card.classList.contains('is-flipped');
      card.classList.toggle('is-flipped', on);
      flip.setAttribute('aria-pressed', String(on));
    });

    return h('section', { class: 'sec gc-sec' },
      h('div', { class: 'wrap gc-grid' },
        h('div', { class: 'gc-stage' }, card),
        h('div', null,
          h('header', { class: 'sec-head' },
            h('p', { class: 'eyebrow', text: t('gift.eyebrow') }),
            h('h2', { 'data-split': '', text: t('gift.title') }),
            h('p', { class: 'lead', text: t('gift.lead') })),
          h('div', { class: 'actions' }, h('button', { type: 'button', class: 'btn', 'data-demo': 'call' }, icon('phone', 18), t('gift.cta')), flip))));
  },

  activate(el) {
    const card = el.querySelector('.gc-card');
    return tilt(card, { max: 14 });
  }
};
