// Reviews carousel without a library: a scroll-snap track (swipe works natively), arrows, dots and a
// gentle autoplay that stops on hover, on focus, after any interaction and with reduced motion.

import { h, icon } from '../core/dom.js';
import { motion, onVisible } from '../core/motion.js';

export default {
  render(ctx) {
    const { t, content, lang } = ctx;
    const rating = new Intl.NumberFormat(lang === 'ro' ? 'ro-RO' : 'en-GB', { minimumFractionDigits: 1 }).format(content.stats[2].value);
    const cards = content.reviews.map((r, i) => h('div', { class: 'rv-card card', role: 'group', 'aria-roledescription': 'slide', 'aria-label': `${i + 1} / ${content.reviews.length}` },
      h('span', { class: 'rv-stars', role: 'img', 'aria-label': '5/5' }, Array.from({ length: 5 }, () => icon('star', 18))),
      h('blockquote', { class: 'rv-quote', text: `“${r.quote}”` }),
      h('p', { class: 'rv-who' }, h('strong', { text: r.name }), h('span', { class: 'muted', text: r.service })),
      h('span', { class: 'sample-tag', text: t('reviews.sample') })));
    const track = h('div', { class: 'rv-track', tabindex: '0', role: 'region', 'aria-label': t('reviews.label') }, cards);
    const dots = h('div', { class: 'rv-dots' }, content.reviews.map((_, i) => h('button', { type: 'button', class: 'rv-dot', 'aria-label': t('reviews.goto', { n: i + 1 }) })));
    return h('section', { class: 'sec rv-sec', 'aria-roledescription': 'carousel' },
      h('div', { class: 'wrap' },
        h('header', { class: 'sec-head rv-head' },
          h('div', null,
            h('p', { class: 'eyebrow', text: t('reviews.eyebrow') }),
            h('h2', { 'data-split': '', text: t('reviews.title') }),
            h('p', { class: 'lead', text: t('reviews.summary', { rating, count: 128 }) })),
          h('div', { class: 'rv-nav' },
            h('button', { type: 'button', class: 'icon-btn rv-prev', 'aria-label': t('common.prev') }, icon('arrowLeft', 20)),
            h('button', { type: 'button', class: 'icon-btn rv-next', 'aria-label': t('common.next') }, icon('arrowRight', 20)))),
        track,
        dots));
  },

  activate(el) {
    const track = el.querySelector('.rv-track');
    const cards = [...track.children];
    const dots = [...el.querySelectorAll('.rv-dot')];
    const index = () => {
      const left = track.scrollLeft;
      let best = 0;
      cards.forEach((c, i) => { if (Math.abs(c.offsetLeft - track.offsetLeft - left) < Math.abs(cards[best].offsetLeft - track.offsetLeft - left)) best = i; });
      return best;
    };
    const go = i => {
      const n = (i + cards.length) % cards.length;
      track.scrollTo({ left: cards[n].offsetLeft - track.offsetLeft, behavior: motion.reduced ? 'auto' : 'smooth' });
    };
    const mark = () => { const i = index(); dots.forEach((d, j) => d.setAttribute('aria-current', String(i === j))); };
    let raf = 0;
    track.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(mark); }, { passive: true });
    mark();

    let stopped = motion.reduced;
    const stop = () => { stopped = true; };
    el.querySelector('.rv-prev').addEventListener('click', () => { stop(); go(index() - 1); });
    el.querySelector('.rv-next').addEventListener('click', () => { stop(); go(index() + 1); });
    dots.forEach((d, i) => d.addEventListener('click', () => { stop(); go(i); }));
    track.addEventListener('pointerdown', stop);
    track.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); stop(); go(index() + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); stop(); go(index() - 1); }
    });
    let hover = false;
    el.addEventListener('pointerenter', () => { hover = true; });
    el.addEventListener('pointerleave', () => { hover = false; });
    let inView = false;
    const unwatch = onVisible(el, v => { inView = v; }, { once: false, rootMargin: '0px' });
    const timer = setInterval(() => {
      if (stopped || hover || !inView || document.hidden || el.contains(document.activeElement)) return;
      go(index() + 1);
    }, 6000);
    return () => { clearInterval(timer); unwatch(); };
  }
};
