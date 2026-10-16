// FAQ: native <details> (keyboard and screen readers for free) with a smooth open/close.
// One question per niche plus the common ones from i18n.

import { h } from '../core/dom.js';

export default {
  render(ctx) {
    const { t, content } = ctx;
    const items = [...content.faq, ...t('faq.common').map(([q, a]) => ({ q, a }))];
    return h('section', { class: 'sec fq-sec' },
      h('div', { class: 'wrap fq-wrap' },
        h('header', { class: 'sec-head' },
          h('p', { class: 'eyebrow', text: t('faq.eyebrow') }),
          h('h2', { 'data-split': '', text: t('faq.title') })),
        h('div', { class: 'fq-list' }, items.map((it, i) => h('details', { class: 'fq-item', 'data-reveal': '', style: `--i:${i % 4}` },
          h('summary', null, h('span', { text: it.q }), h('span', { class: 'fq-plus', 'aria-hidden': 'true' })),
          h('div', { class: 'fq-a' }, h('p', { text: it.a })))))));
  }
};
