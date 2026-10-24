// Contact bar, "Status bar": a bar fixed to the bottom edge. The Call button is the wide one on the left and
// carries open / closed with today's hours; WhatsApp is round; Book always says Online.

import { h } from '../core/dom.js';
import { contactButtons, callIcon, whatsappIcon, bookIcon, bookLabel, fillCallState, hideOnScroll } from '../core/contactbits.js';

export default {
  render(ctx) {
    const { t } = ctx;
    const { call, whatsapp, book } = contactButtons(ctx, {
      callBody: [callIcon(22), h('span', { class: 'cx-text' },
        h('span', { text: t('contactbar.call') }),
        h('small', { class: 'cx-state', 'data-cx-state': '' }),
        h('small', { class: 'cx-hours', 'data-cx-hours': '' }))],
      whatsappBody: [whatsappIcon(22), h('span', { class: 'sr-only', text: t('contactbar.whatsapp') })],
      bookBody: [bookIcon(20), bookLabel(ctx)]
    });
    whatsapp.classList.add('cx-round');
    return h('aside', { class: 'cx cx-status', 'aria-label': t('contactbar.label') }, h('div', { class: 'cx-inner' }, call, whatsapp, book));
  },
  update: fillCallState,
  activate: hideOnScroll
};
