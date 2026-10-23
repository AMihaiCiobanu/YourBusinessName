// Round contact buttons in the bottom corner: WhatsApp and Call, one tap each. A lighter
// alternative to the contact bar; on a client page they become https://wa.me/ and tel: links.

import { h, icon } from '../core/dom.js';

export default {
  render(ctx) {
    const { t } = ctx;
    return h('aside', { class: 'fab', 'aria-label': t('contactbar.label') },
      h('button', { type: 'button', class: 'fab-btn fab-call', 'data-demo': 'call', 'aria-label': t('contactbar.call') }, icon('phone', 22)),
      h('button', { type: 'button', class: 'fab-btn fab-wa', 'data-demo': 'whatsapp', 'aria-label': t('contactbar.whatsapp') }, icon('whatsapp', 26)));
  }
};
