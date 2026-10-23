// Number strip: the same four numbers as the counters, in one coloured band, without animation.

import { h, icon } from '../core/dom.js';

export default {
  render(ctx) {
    const { t, content, lang } = ctx;
    const items = content.stats.map(s => {
      const nf = new Intl.NumberFormat(lang === 'ro' ? 'ro-RO' : 'en-GB', { minimumFractionDigits: s.decimals || 0, maximumFractionDigits: s.decimals || 0 });
      const label = s.label || t(`stats.${s.key}`);
      return h('li', { class: 'sb-item' },
        h('span', { class: 'sb-num' }, nf.format(s.value), s.key === 'rating' ? icon('star', 22, 'sb-star') : (s.suffix || '')),
        h('span', { class: 'sb-label', text: label }));
    });
    return h('section', { class: 'sec sb-sec' },
      h('div', { class: 'wrap' },
        h('h2', { class: 'sr-only', text: t('stats.title') }),
        h('ul', { class: 'sb-list', 'data-reveal': '' }, items)));
  }
};
