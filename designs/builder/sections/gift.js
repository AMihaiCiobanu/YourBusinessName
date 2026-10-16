// Gift card designer (original): a card that leans in 3D under the mouse / finger and turns over to
// show the message. Amount, names and message update the card live. The request button sends
// nothing on the demo; on a real page it opens WhatsApp or email with the details filled in.

import { h, icon } from '../core/dom.js';
import { tilt } from '../core/motion.js';
import { formatPrice } from '../../shared/live.js';

const AMOUNTS = { EUR: [50, 100, 150], RON: [250, 500, 750] };

export default {
  render(ctx) {
    const { t, lang, name } = ctx;
    const currency = lang === 'ro' ? 'RON' : 'EUR';
    const amounts = AMOUNTS[currency];
    const card = h('div', { class: 'gc-card' },
      h('div', { class: 'gc-inner' },
        h('div', { class: 'gc-face gc-front' },
          h('span', { class: 'gc-glare', 'aria-hidden': 'true' }),
          h('div', { class: 'gc-row' }, h('span', { class: 'gc-brand', text: name }), icon('gift', 26)),
          h('p', { class: 'gc-label', text: t('gift.card') }),
          h('p', { class: 'gc-amount', text: formatPrice(amounts[1], currency) }),
          h('div', { class: 'gc-row gc-small' }, h('span', { class: 'gc-to-show' }), h('span', { text: t('gift.valid') }))),
        h('div', { class: 'gc-face gc-back' },
          h('p', { class: 'gc-msg' }),
          h('p', { class: 'gc-from' }))));

    const amountGroup = h('div', { class: 'gc-amounts', role: 'radiogroup', 'aria-label': t('gift.amount') });
    amounts.forEach((a, i) => {
      const id = `gc-a-${a}`;
      amountGroup.appendChild(h('label', { class: 'gc-chip', for: id }, h('input', { type: 'radio', name: 'gc-amount', id, value: String(a), checked: i === 1 }), h('span', { text: formatPrice(a, currency) })));
    });
    const other = h('input', { type: 'number', class: 'gc-other', min: '10', max: '5000', step: '5', inputmode: 'numeric', placeholder: t('gift.other'), 'aria-label': t('gift.otherAria') });
    amountGroup.appendChild(other);
    const field = (id, label, input) => h('div', { class: 'gc-field' }, h('label', { for: id, text: label }), input);
    const to = h('input', { id: 'gc-to', type: 'text', maxlength: '30', placeholder: t('gift.toPh') });
    const from = h('input', { id: 'gc-from', type: 'text', maxlength: '30', placeholder: t('gift.fromPh') });
    const msg = h('textarea', { id: 'gc-msg', rows: '2', maxlength: '120', placeholder: t('gift.msgPh') });
    const flip = h('button', { type: 'button', class: 'btn btn-ghost btn-sm', 'aria-pressed': 'false' }, icon('flip', 16), t('gift.flip'));

    const draw = () => {
      const picked = amountGroup.querySelector('input[type=radio]:checked');
      const value = Number(other.value) > 0 ? Number(other.value) : Number(picked?.value || amounts[1]);
      card.querySelector('.gc-amount').textContent = formatPrice(value, currency);
      card.querySelector('.gc-to-show').textContent = to.value ? `${t('gift.to')} ${to.value}` : '';
      card.querySelector('.gc-msg').textContent = msg.value || t('gift.msgPh');
      card.querySelector('.gc-from').textContent = `— ${from.value || t('gift.fromPh')}`;
    };
    amountGroup.addEventListener('change', e => { if (e.target.type === 'radio') other.value = ''; draw(); });
    other.addEventListener('input', () => { if (other.value) amountGroup.querySelectorAll('input[type=radio]').forEach(r => { r.checked = false; }); draw(); });
    for (const input of [to, from, msg]) input.addEventListener('input', draw);
    msg.addEventListener('focus', () => setFlip(true));
    to.addEventListener('focus', () => setFlip(false));
    const setFlip = on => { card.classList.toggle('is-flipped', on); flip.setAttribute('aria-pressed', String(on)); };
    flip.addEventListener('click', () => setFlip(!card.classList.contains('is-flipped')));
    draw();

    return h('section', { class: 'sec gc-sec' },
      h('div', { class: 'wrap gc-grid' },
        h('div', { class: 'gc-stage', 'aria-live': 'polite' }, card),
        h('div', null,
          h('header', { class: 'sec-head' },
            h('p', { class: 'eyebrow', text: t('gift.eyebrow') }),
            h('h2', { 'data-split': '', text: t('gift.title') }),
            h('p', { class: 'lead', text: t('gift.lead') })),
          h('div', { class: 'gc-form' },
            h('p', { class: 'gc-l', text: t('gift.amount') }), amountGroup,
            h('div', { class: 'gc-two' }, field('gc-to', t('gift.to'), to), field('gc-from', t('gift.from'), from)),
            field('gc-msg', t('gift.message'), msg),
            h('div', { class: 'actions' }, h('button', { type: 'button', class: 'btn', 'data-demo': 'gift' }, icon('gift', 18), t('gift.cta')), flip)))));
  },

  activate(el) {
    const card = el.querySelector('.gc-card');
    return tilt(card, { max: 14 });
  }
};
