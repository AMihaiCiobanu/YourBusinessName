// Loyalty as a progress line: six visits on a line, four done, the sixth is free. Static, so it
// reads the same with reduced motion.

import { h, icon } from '../core/dom.js';

const TOTAL = 6;
const DONE = 4;

export default {
  render(ctx) {
    const { t } = ctx;
    const steps = Array.from({ length: TOTAL }, (_, i) => {
      const free = i === TOTAL - 1;
      return h('li', { class: `lp-step${i < DONE ? ' is-done' : ''}${free ? ' is-free' : ''}` },
        h('span', { class: 'lp-dot' }, free ? icon('gift', 20) : i < DONE ? icon('check', 18) : String(i + 1)),
        h('span', { class: 'lp-cap', text: free ? t('loyalty.free') : String(i + 1) }));
    });
    return h('section', { class: 'sec lp-sec' },
      h('div', { class: 'wrap' },
        h('header', { class: 'sec-head center' },
          h('p', { class: 'eyebrow', text: t('loyalty.eyebrow') }),
          h('h2', { 'data-split': '', text: t('loyalty.title') }),
          h('p', { class: 'lead', text: t('loyalty.lead') })),
        h('figure', { class: 'lp-card card', 'data-reveal': '' },
          h('ol', { class: 'lp-line', style: `--done:${(DONE - 1) / (TOTAL - 1)}`, 'aria-hidden': 'true' }, steps),
          h('figcaption', { class: 'lp-foot' }, h('strong', { text: t('loyalty.progress', { n: DONE, total: TOTAL }) }), h('span', { class: 'sample-tag', text: t('loyalty.sample') })))));
  }
};
