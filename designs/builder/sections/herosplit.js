// Split hero: the headline and buttons on one side, one big photo on the other. No WebGL and no 3D,
// so it is the lightest first screen. Same first photo, width and sizes as the 3D hero, so the
// preload in index.html serves both.

import { h, photo, icon } from '../core/dom.js';
import { altOf } from '../content/photos.js';
import { bookButton, openState } from '../../shared/live.js';

export default {
  render(ctx) {
    const { t, content, lang } = ctx;
    const [l1, l2] = content.h1;
    const shot = content.photos[0];
    const [clients, , rating] = content.stats;
    const nf = new Intl.NumberFormat(lang === 'ro' ? 'ro-RO' : 'en-GB');
    const nf1 = new Intl.NumberFormat(lang === 'ro' ? 'ro-RO' : 'en-GB', { minimumFractionDigits: 1 });
    return h('section', { class: 'sec hs-sec' },
      h('div', { class: 'wrap hs-grid' },
        h('div', { class: 'hs-copy' },
          h('p', { class: 'eyebrow', text: content.tagline }),
          h('h1', null, h('span', { class: 'hs-l1', text: l1 }), ' ', h('span', { class: 'hs-l2', text: l2 })),
          h('p', { class: 'hs-lead', text: content.lead }),
          h('div', { class: 'actions' },
            bookButton(t('hero.primary'), { linkId: ctx.linkId, className: 'btn' }),
            h('a', { class: 'btn btn-ghost', href: ctx.anchor('book', 'prices', 'services', 'basket'), text: t('hero.secondary') })),
          h('p', { class: 'hs-proof' },
            h('span', null, icon('star', 16), nf1.format(rating.value)),
            h('span', { text: `${nf.format(clients.value)}${clients.suffix} ${t('stats.clients')}` })),
          h('p', { class: 'hs-status', hidden: true })),
        h('figure', { class: 'hs-photo' },
          photo(shot, { w: 640, h: 800, sizes: '(max-width: 700px) 60vw, 420px', alt: altOf(shot, lang), eager: true, priority: true }))));
  },

  update(el, ctx) {
    const node = el.querySelector('.hs-status');
    const state = ctx.data && openState(ctx.data, { open: ctx.t('hours.badgeOpen', { time: '' }).replace(/\s*$/, ''), closed: ctx.t('hours.badgeClosed') });
    if (!state) { node.hidden = true; return; }
    node.textContent = state.label;
    node.classList.toggle('is-open', state.isOpen);
    node.hidden = false;
  }
};
