// Number ticker: the four numbers in a band that scrolls from right to left without end. It pauses
// on hover, on keyboard focus and with the pause button (moving content needs one, WCAG 2.2.2), and
// stands still with reduced motion. Screen readers get the plain list once; the moving copies are
// hidden from them.

import { h, icon } from '../core/dom.js';
import { motion } from '../core/motion.js';
import { localeOf } from '../core/i18n.js';

export default {
  render(ctx) {
    const { t, content, lang } = ctx;
    const items = content.stats.map(s => {
      const nf = new Intl.NumberFormat(localeOf(lang), { minimumFractionDigits: s.decimals || 0, maximumFractionDigits: s.decimals || 0 });
      return { value: `${nf.format(s.value)}${s.suffix || ''}`, star: s.key === 'rating', label: s.label || t(`stats.${s.key}`) };
    });
    // Each moving list holds the items twice, so one list is always wider than the band and the
    // loop (the track slides by exactly one list) has no gap.
    const list = () => h('ul', { class: 'tk-list' }, [...items, ...items].map(it => h('li', { class: 'tk-item' },
      h('strong', { class: 'tk-num' }, it.value, it.star ? icon('star', 22, 'tk-star') : null), h('span', { class: 'tk-label', text: it.label }), icon('sparkle', 18, 'tk-sep'))));
    const pause = h('button', { type: 'button', class: 'icon-btn tk-pause', 'aria-pressed': 'false', 'aria-label': t('common.pause') }, icon('pause', 18));
    return h('section', { class: 'sec tk-sec' },
      h('h2', { class: 'sr-only', text: t('stats.title') }),
      h('ul', { class: 'sr-only' }, items.map(it => h('li', { text: `${it.value}${it.star ? '/5' : ''} ${it.label}` }))),
      h('div', { class: 'tk-band' },
        h('div', { class: 'tk-track', 'aria-hidden': 'true' }, list(), list()),
        pause));
  },

  activate(el, ctx) {
    const band = el.querySelector('.tk-band');
    const pause = el.querySelector('.tk-pause');
    if (motion.reduced) { pause.hidden = true; return null; }
    const onClick = () => {
      const paused = !band.classList.contains('is-paused');
      band.classList.toggle('is-paused', paused);
      pause.setAttribute('aria-pressed', String(paused));
      pause.setAttribute('aria-label', ctx.t(paused ? 'common.play' : 'common.pause'));
      pause.replaceChildren(icon(paused ? 'play' : 'pause', 18));
    };
    pause.addEventListener('click', onClick);
    return () => pause.removeEventListener('click', onClick);
  }
};
