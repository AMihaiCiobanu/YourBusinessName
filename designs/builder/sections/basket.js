// Visit planner (original): tick services and the total time and price add up live, then book.
// Prices "on request" are left out of the total and the summary says so. The booking page takes
// one service, so "Book" opens it on the first service picked.

import { h, icon } from '../core/dom.js';
import { bookButton, formatDuration, formatPrice } from '../../shared/live.js';

export default {
  render(ctx) {
    const { t } = ctx;
    return h('section', { class: 'sec bk2-sec' },
      h('div', { class: 'wrap' },
        h('header', { class: 'sec-head' },
          h('p', { class: 'eyebrow', text: t('basket.eyebrow') }),
          h('h2', { 'data-split': '', text: t('basket.title') }),
          h('p', { class: 'lead', text: t('basket.lead') })),
        h('div', { class: 'bs-grid' },
          h('fieldset', { class: 'bs-list' }, h('legend', { class: 'sr-only', text: t('basket.title') }), h('span', { class: 'skeleton', style: 'min-height:200px' })),
          h('aside', { class: 'bs-sum card', 'aria-live': 'polite' }))));
  },

  update(el, ctx) {
    const { t, data } = ctx;
    const list = el.querySelector('.bs-list');
    const sum = el.querySelector('.bs-sum');
    if (data.failed || !data.services.length) {
      list.replaceChildren(h('div', { class: 'data-error' }, t('common.failed')));
      sum.replaceChildren();
      return;
    }
    const picked = new Set();
    const draw = () => {
      const items = data.services.filter(s => picked.has(s.id));
      const minutes = items.reduce((a, s) => a + s.durationMinutes, 0);
      const known = items.filter(s => s.showPrice !== false);
      const total = known.reduce((a, s) => a + s.price, 0);
      const first = items[0];
      const cta = bookButton(items.length > 1 ? t('basket.bookMany', { n: items.length }) : t('basket.bookOne'), { linkId: ctx.linkId, service: first, className: 'btn bs-book' });
      if (!items.length) { cta.setAttribute('aria-disabled', 'true'); cta.classList.add('is-off'); cta.addEventListener('click', e => e.preventDefault(), { capture: true }); }
      const clear = h('button', { type: 'button', class: 'bs-clear', text: t('basket.clear') });
      clear.addEventListener('click', () => { picked.clear(); list.querySelectorAll('input').forEach(i => { i.checked = false; }); draw(); });
      sum.replaceChildren(...[
        h('p', { class: 'bs-count', text: items.length ? t('basket.picked', { n: items.length }) : t('basket.empty') }),
        h('dl', { class: 'bs-totals' },
          h('div', null, h('dt', { text: t('basket.time') }), h('dd', null, icon('clock', 18), minutes ? formatDuration(minutes) : '—')),
          h('div', null, h('dt', { text: t('basket.total') }), h('dd', { class: 'bs-total', text: items.length ? formatPrice(total, data.currency) : '—' }))),
        known.length < items.length ? h('p', { class: 'note', text: t('basket.partial') }) : null,
        cta,
        items.length ? clear : null].filter(Boolean));
    };
    list.replaceChildren(h('legend', { class: 'sr-only', text: t('basket.title') }), ...data.services.map(s => {
      const id = `bs-${s.id}`;
      const input = h('input', { type: 'checkbox', id, value: s.id });
      input.addEventListener('change', () => { if (input.checked) picked.add(s.id); else picked.delete(s.id); draw(); });
      return h('label', { class: 'bs-item', for: id }, input,
        h('span', { class: 'bs-check', 'aria-hidden': 'true' }, icon('check', 16)),
        h('span', { class: 'bs-name' }, s.name, h('small', { text: formatDuration(s.durationMinutes) })),
        h('span', { class: 'bs-price', text: ctx.priceText(s) }));
    }));
    draw();
  }
};
