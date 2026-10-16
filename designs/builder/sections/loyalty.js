// Loyalty stamp card (original): six circles; four get "stamped" one after the other when the card
// scrolls into view, the sixth is the free visit. Static (all four stamped) with reduced motion.

import { h, icon } from '../core/dom.js';
import { motion, onVisible } from '../core/motion.js';

const TOTAL = 6;
const DONE = 4;

export default {
  render(ctx) {
    const { t, name } = ctx;
    const stamps = Array.from({ length: TOTAL }, (_, i) => h('li', { class: `ly-stamp${i === TOTAL - 1 ? ' ly-free' : ''}`, style: `--i:${i}` },
      i === TOTAL - 1 ? h('span', { class: 'ly-free-t', text: t('loyalty.free') }) : h('span', { class: 'ly-n', text: String(i + 1) }),
      h('span', { class: 'ly-ink', 'aria-hidden': 'true' }, icon('check', 22))));
    return h('section', { class: 'sec ly-sec' },
      h('div', { class: 'wrap ly-grid' },
        h('header', { class: 'sec-head' },
          h('p', { class: 'eyebrow', text: t('loyalty.eyebrow') }),
          h('h2', { 'data-split': '', text: t('loyalty.title') }),
          h('p', { class: 'lead', text: t('loyalty.lead') })),
        h('figure', { class: 'ly-card', 'data-reveal': '' },
          h('div', { class: 'ly-top' }, h('span', { class: 'ly-brand', text: name }), icon('heart', 22)),
          h('ol', { class: 'ly-stamps', 'aria-hidden': 'true' }, stamps),
          h('figcaption', { class: 'ly-cap' }, h('span', { class: 'ly-progress', text: t('loyalty.progress', { n: DONE, total: TOTAL }) }), h('span', { class: 'sample-tag', text: t('loyalty.sample') })))));
  },

  activate(el) {
    const stamps = [...el.querySelectorAll('.ly-stamp')].slice(0, DONE);
    if (motion.reduced) { stamps.forEach(s => s.classList.add('is-stamped')); return null; }
    const timers = [];
    const cancel = onVisible(el.querySelector('.ly-card'), () => {
      stamps.forEach((s, i) => timers.push(setTimeout(() => s.classList.add('is-stamped'), 400 + i * 420)));
    }, { rootMargin: '0px 0px -20% 0px' });
    return () => { cancel(); timers.forEach(clearTimeout); };
  }
};
