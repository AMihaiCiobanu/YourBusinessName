// Contact bar, "Dock": one pill, three equal cells with the icon over the label. Open / closed sits under
// "Call" only; Book always says Online. On a client page the contact buttons become tel: and https://wa.me/ links.

import { h } from '../core/dom.js';
import { contactButtons, callIcon, whatsappIcon, bookIcon, bookLabel, fillCallState, hideOnScroll } from '../core/contactbits.js';

export default {
  render(ctx) {
    const { t } = ctx;
    const { call, whatsapp, book } = contactButtons(ctx, {
      callBody: [callIcon(22), h('span', { class: 'cx-text' }, h('span', { text: t('contactbar.call') }), h('small', { class: 'cx-state', 'data-cx-state': '' }))],
      whatsappBody: [whatsappIcon(22), h('span', { class: 'cx-text', text: t('contactbar.whatsapp') })],
      bookBody: [bookIcon(22), bookLabel(ctx)]
    });
    return h('aside', { class: 'cx cx-dock', 'aria-label': t('contactbar.label') }, h('div', { class: 'cx-inner' }, call, whatsapp, book));
  },
  update: fillCallState,
  activate: hideOnScroll
};
