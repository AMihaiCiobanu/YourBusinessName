// Counters that run up once when they scroll into view. The final number is always in the
// accessible name, so screen readers never hear the animation.

import { h, icon } from '../core/dom.js';
import { countUp } from '../core/motion.js';
import { localeOf } from '../core/i18n.js';

function formatter(lang, decimals) {
  const nf = new Intl.NumberFormat(localeOf(lang), { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return v => nf.format(decimals ? v : Math.round(v));
}

export default {
  render(ctx) {
    const { t, content, lang } = ctx;
    const items = content.stats.map((s, i) => {
      const fmt = formatter(lang, s.decimals || 0);
      const label = s.label || t(`stats.${s.key}`);
      const final = `${fmt(s.value)}${s.suffix || ''}`;
      return h('li', { class: 'st-item', 'data-reveal': '', style: `--i:${i}`, 'aria-label': `${final} ${label}` },
        h('span', { class: 'st-num', 'aria-hidden': 'true' }, h('span', { class: 'st-val', dataset: { to: String(s.value), dec: String(s.decimals || 0) }, text: final }), s.key === 'rating' ? icon('star', 26, 'st-star') : h('span', { class: 'st-suf', text: s.suffix || '' })),
        h('span', { class: 'st-label', 'aria-hidden': 'true', text: label }));
    });
    return h('section', { class: 'sec st-sec' },
      h('div', { class: 'wrap' },
        h('header', { class: 'sec-head center' },
          h('p', { class: 'eyebrow', text: t('stats.eyebrow') }),
          h('h2', { 'data-split': '', text: t('stats.title') })),
        h('ul', { class: 'st-list' }, items)));
  },

  activate(el, ctx) {
    const stops = [...el.querySelectorAll('.st-val')].map(node => {
      const dec = Number(node.dataset.dec);
      return countUp(node, Number(node.dataset.to), { decimals: dec, format: formatter(ctx.lang, dec) });
    });
    return () => stops.forEach(fn => fn());
  }
};
