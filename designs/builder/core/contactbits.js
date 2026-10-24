// Shared by the contact bar variants (sections/contactdock, contactbookfirst, contactstatus).
// Only the Call button can be "closed" (a phone call needs someone to pick up); booking never closes.

import { h, icon } from './dom.js';
import { bookButton, openState, formatTime } from '../../shared/live.js';

// The three buttons. `callBody` and `bookBody` are the children of the call / book buttons.
export function contactButtons(ctx, { callBody, whatsappBody, bookBody }) {
  const call = h('button', { type: 'button', class: 'cx-btn cx-call', 'data-demo': 'call' }, ...callBody);
  const whatsapp = h('button', { type: 'button', class: 'cx-btn cx-wa', 'data-demo': 'whatsapp' }, ...whatsappBody);
  const book = bookButton('', { linkId: ctx.linkId, className: 'cx-btn cx-book' });
  book.append(...bookBody);
  return { call, whatsapp, book };
}

export const callIcon = size => icon('phone', size);
export const whatsappIcon = size => icon('whatsapp', size);
export const bookIcon = size => icon('calendar', size);

// "Book" with a green "Online" under it, always.
export function bookLabel(ctx) {
  return h('span', { class: 'cx-text' }, h('span', { text: ctx.t('contactbar.book') }), h('small', { class: 'cx-online', text: ctx.t('contactbar.online') }));
}

// Fills [data-cx-state] (open now / closed now) and [data-cx-hours] (today's hours) once hours are known.
export function fillCallState(el, ctx) {
  const state = ctx.data && openState(ctx.data, { open: ctx.t('hours.openNow'), closed: ctx.t('hours.closedNow') });
  const call = el.querySelector('.cx-call');
  el.querySelectorAll('[data-cx-state]').forEach(node => { node.textContent = state ? (state.isOpen ? ctx.t('hours.openNow') : ctx.t('hours.closedNow')) : ''; });
  el.querySelectorAll('[data-cx-hours]').forEach(node => {
    node.textContent = state?.today ? `${formatTime(state.today.start)} – ${formatTime(state.today.end)}` : '';
  });
  call.classList.toggle('has-state', !!state);
  call.classList.toggle('is-open', !!state?.isOpen);
  if (state) call.setAttribute('aria-label', `${ctx.t('contactbar.call')}: ${state.isOpen ? ctx.t('hours.openNow') : ctx.t('hours.closedNow')}`);
  else call.removeAttribute('aria-label');
}

// Hide while scrolling down quickly, show again when scrolling up or stopping.
export function hideOnScroll(el) {
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
