// FAQ as cards: every answer visible at once, in a grid. Same questions as the accordion.

import { h } from '../core/dom.js';

export default {
  render(ctx) {
    const { t, content } = ctx;
    const items = [...content.faq, ...t('faq.common').map(([q, a]) => ({ q, a }))];
    return h('section', { class: 'sec fg-sec' },
      h('div', { class: 'wrap' },
        h('header', { class: 'sec-head center' },
          h('p', { class: 'eyebrow', text: t('faq.eyebrow') }),
          h('h2', { 'data-split': '', text: t('faq.title') })),
        h('ul', { class: 'fg-grid' }, items.map((it, i) => h('li', { class: 'fg-card card', 'data-reveal': '', style: `--i:${i % 3}` },
          h('h3', { class: 'fg-q', text: it.q }),
          h('p', { class: 'fg-a', text: it.a }))))));
  }
};
