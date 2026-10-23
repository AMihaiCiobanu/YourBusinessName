// Hours in one card: open now / closed now, the week with today marked, and Call / Book buttons.
// Hours come live from the app, like the timeline version.

import { h, icon } from '../core/dom.js';
import { bookButton, openState, weekRows } from '../../shared/live.js';

export default {
  render(ctx) {
    const { t } = ctx;
    return h('section', { class: 'sec hc-sec' },
      h('div', { class: 'wrap' },
        h('div', { class: 'hc-card card', 'data-reveal': '' },
          h('header', { class: 'hc-head' },
            h('div', null,
              h('p', { class: 'eyebrow', text: t('hours.eyebrow') }),
              h('h2', { text: t('hours.title') })),
            h('p', { class: 'hc-state', 'aria-live': 'polite' })),
          h('table', { class: 'hc-table' }, h('tbody')),
          h('div', { class: 'actions hc-actions' },
            bookButton(t('common.book'), { linkId: ctx.linkId, className: 'btn' }),
            h('button', { type: 'button', class: 'btn btn-ghost', 'data-demo': 'call' }, icon('phone', 18), t('contactbar.call'))),
          h('p', { class: 'note', text: t('hours.note') }))));
  },

  update(el, ctx) {
    const { t, data } = ctx;
    const stateEl = el.querySelector('.hc-state');
    const tbody = el.querySelector('tbody');
    if (!data.hasHours) {
      stateEl.textContent = t('hours.noHours');
      tbody.replaceChildren();
      return;
    }
    const state = openState(data);
    stateEl.textContent = state.isOpen ? t('hours.openNow') : t('hours.closedNow');
    stateEl.classList.toggle('is-open', state.isOpen);
    tbody.replaceChildren(...weekRows(data).map(r => h('tr', { class: [r.isToday ? 'is-today' : '', r.range ? '' : 'is-closed'].join(' ').trim() || null },
      h('th', { scope: 'row', text: r.label }), h('td', { text: r.text }))));
  }
};
