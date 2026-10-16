// Plain price list, grouped like the booking page (Services / Packages / Classes, headings only
// when there is more than one group). Long lists show the first eight and a "See all" toggle.

import { h } from '../core/dom.js';
import { bookButton, serviceGroups, formatDuration } from '../../shared/live.js';

const FIRST = 8;

export default {
  render(ctx) {
    const { t } = ctx;
    return h('section', { class: 'sec pl-sec' },
      h('div', { class: 'wrap pl-wrap' },
        h('header', { class: 'sec-head center' },
          h('p', { class: 'eyebrow', text: t('prices.eyebrow') }),
          h('h2', { 'data-split': '', text: t('prices.title') }),
          h('p', { class: 'lead', text: t('prices.lead') })),
        h('div', { class: 'pl-list card', 'aria-live': 'polite', 'aria-busy': 'true' },
          Array.from({ length: 4 }, () => h('div', { class: 'pl-skel' }, h('span', { class: 'skeleton', style: 'width:55%' }), h('span', { class: 'skeleton', style: 'width:15%' })))),
        h('p', { class: 'pl-more center' })));
  },

  update(el, ctx) {
    const { t, data } = ctx;
    const box = el.querySelector('.pl-list');
    const more = el.querySelector('.pl-more');
    box.setAttribute('aria-busy', 'false');
    if (data.failed || !data.services.length) {
      box.replaceChildren(h('div', { class: 'data-error' }, t('common.failed'), h('br'), bookButton(t('common.failedLink'), { linkId: ctx.linkId, className: 'link' })));
      more.replaceChildren();
      return;
    }
    const groups = serviceGroups(data);
    let shown = 0;
    const nodes = [];
    for (const g of groups) {
      if (groups.length > 1) nodes.push(h('h3', { class: 'pl-group', text: g.label }));
      for (const s of g.items) {
        const row = bookButton('', { linkId: ctx.linkId, service: s, className: 'pl-row' });
        row.append(
          h('span', { class: 'sr-only', text: `${t('common.book')}: ` }),
          h('span', { class: 'pl-main' }, h('span', { class: 'pl-name', text: s.name }), s.description ? h('span', { class: 'pl-desc', text: s.description }) : null),
          h('span', { class: 'pl-time', text: formatDuration(s.durationMinutes) }),
          h('span', { class: 'pl-price', text: ctx.priceText(s) }));
        if (shown >= FIRST) row.classList.add('pl-extra');
        nodes.push(row);
        shown++;
      }
    }
    box.replaceChildren(...nodes);
    box.classList.remove('is-all');
    if (shown > FIRST) {
      const btn = h('button', { type: 'button', class: 'btn btn-ghost', 'aria-expanded': 'false', text: t('common.seeAll', { n: shown }) });
      btn.addEventListener('click', () => {
        const all = box.classList.toggle('is-all');
        btn.setAttribute('aria-expanded', String(all));
        btn.textContent = all ? t('common.showLess') : t('common.seeAll', { n: shown });
      });
      more.replaceChildren(btn);
    } else more.replaceChildren();
  }
};
