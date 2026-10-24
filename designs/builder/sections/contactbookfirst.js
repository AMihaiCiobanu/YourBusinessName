// Contact bar, "Book first": a wide Book button with two round buttons beside it. A small dot on the Call
// button shows open / closed (and its label says it); Book always says Online.

import { h } from '../core/dom.js';
import { contactButtons, callIcon, whatsappIcon, bookIcon, bookLabel, fillCallState, hideOnScroll } from '../core/contactbits.js';

export default {
  render(ctx) {
    const { t } = ctx;
    const { call, whatsapp, book } = contactButtons(ctx, {
      callBody: [callIcon(24), h('span', { class: 'cx-pip', 'aria-hidden': 'true' }), h('span', { class: 'sr-only', text: t('contactbar.call') })],
      whatsappBody: [whatsappIcon(24), h('span', { class: 'sr-only', text: t('contactbar.whatsapp') })],
      bookBody: [bookIcon(24), bookLabel(ctx)]
    });
    call.classList.add('cx-round');
    whatsapp.classList.add('cx-round');
    return h('aside', { class: 'cx cx-bookfirst', 'aria-label': t('contactbar.label') }, h('div', { class: 'cx-inner' }, call, whatsapp, book));
  },
  update: fillCallState,
  activate: hideOnScroll
};
