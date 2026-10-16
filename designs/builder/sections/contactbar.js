// Contact bar that floats at the bottom: Call, WhatsApp and Book, with the open state on the
// booking button. On a client page the two contact buttons become tel: and https://wa.me/ links.

import { h, icon } from '../core/dom.js';
import { bookButton, openState } from '../../shared/live.js';

export default {
  render(ctx) {
    const { t } = ctx;
    const book = bookButton('', { linkId: ctx.linkId, className: 'cb-btn cb-book' });
    book.append(icon('calendar', 20), h('span', { class: 'cb-text' }, h('span', { text: t('contactbar.book') }), h('small', { class: 'cb-state' })));
    return h('aside', { class: 'cb', 'aria-label': t('contactbar.label') },
      h('div', { class: 'cb-inner' },
        h('button', { type: 'button', class: 'cb-btn', 'data-demo': 'call' }, icon('phone', 20), h('span', { text: t('contactbar.call') })),
        h('button', { type: 'button', class: 'cb-btn cb-wa', 'data-demo': 'whatsapp' }, icon('whatsapp', 20), h('span', { text: t('contactbar.whatsapp') })),
        book));
  },

  update(el, ctx) {
    const node = el.querySelector('.cb-state');
    const state = ctx.data && openState(ctx.data, { open: ctx.t('hours.openNow'), closed: ctx.t('hours.closedNow') });
    node.textContent = state ? (state.isOpen ? ctx.t('hours.openNow') : ctx.t('hours.closedNow')) : '';
    node.classList.toggle('is-open', !!state?.isOpen);
  },

  activate(el) {
    // Hide while scrolling down quickly, show again when scrolling up or stopping.
    let last = window.scrollY;
    let timer = 0;
    const onScroll = () => {
      const y = window.scrollY;
      el.classList.toggle('is-hidden', y > last + 4 && y > 400);
      last = y;
      clearTimeout(timer);
      timer = setTimeout(() => el.classList.remove('is-hidden'), 700);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(timer); };
  }
};
