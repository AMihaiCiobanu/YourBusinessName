// Fullscreen photo slider (Swiper): autoplay, swipe, keyboard, parallax on the text and a pause
// button (moving content needs one, WCAG 2.2.2). Before Swiper loads, or with reduced motion, the
// first slide shows on its own and the others are a swipeable row.

import { h, photo, icon } from '../core/dom.js';
import { libs } from '../core/loader.js';
import { motion } from '../core/motion.js';
import { altOf } from '../content/photos.js';
import { bookButton } from '../../shared/live.js';

export default {
  render(ctx) {
    const { t, content, lang } = ctx;
    const slides = content.slides.concat(content.slides.slice(0, 1).map(s => ({ ...s, photo: content.photos[5] || s.photo })));
    const total = slides.length;
    return h('section', { class: 'sec sl-sec', 'aria-roledescription': 'carousel', 'aria-label': t('slider.label') },
      h('div', { class: 'swiper sl' },
        h('div', { class: 'swiper-wrapper' }, slides.map((s, i) => h('div', { class: 'swiper-slide sl-slide', role: 'group', 'aria-roledescription': 'slide', 'aria-label': t('slider.slide', { n: i + 1, total }) },
          h('div', { class: 'sl-bg', 'data-swiper-parallax': '30%' }, photo(s.photo, { w: 1800, h: 1100, sizes: '100vw', alt: altOf(s.photo, lang) })),
          h('div', { class: 'wrap sl-copy' },
            h('p', { class: 'eyebrow', 'data-swiper-parallax': '-300', text: `${String(i + 1).padStart(2, '0')} · ${t('slider.eyebrow')}` }),
            h('h2', { 'data-swiper-parallax': '-500', text: s.title }),
            h('p', { class: 'sl-text', 'data-swiper-parallax': '-700', text: s.body }),
            i === 0 ? bookButton(t('common.book'), { linkId: ctx.linkId, className: 'btn' }) : null)))),
        h('div', { class: 'wrap sl-ui' },
          h('div', { class: 'swiper-pagination sl-dots' }),
          h('div', { class: 'sl-btns' },
            h('button', { type: 'button', class: 'icon-btn sl-play', 'aria-label': t('common.pause') }, icon('pause', 18)),
            h('button', { type: 'button', class: 'icon-btn sl-prev', 'aria-label': t('common.prev') }, icon('arrowLeft', 18)),
            h('button', { type: 'button', class: 'icon-btn sl-next', 'aria-label': t('common.next') }, icon('arrowRight', 18))))));
  },

  async activate(el, ctx) {
    let Swiper;
    try { Swiper = await libs.swiper(); } catch { return null; }
    if (!el.isConnected) return null;
    const node = el.querySelector('.sl');
    node.classList.add('is-live');
    const auto = !motion.reduced;
    const swiper = new Swiper(node, {
      loop: true,
      speed: motion.reduced ? 0 : 1100,
      parallax: !motion.reduced,
      grabCursor: true,
      keyboard: { enabled: true, onlyInViewport: true },
      autoplay: auto ? { delay: 5200, disableOnInteraction: false, pauseOnMouseEnter: true } : false,
      pagination: { el: node.querySelector('.sl-dots'), clickable: true },
      navigation: { prevEl: node.querySelector('.sl-prev'), nextEl: node.querySelector('.sl-next') },
      a11y: { enabled: true, prevSlideMessage: ctx.t('common.prev'), nextSlideMessage: ctx.t('common.next') }
    });
    const play = node.querySelector('.sl-play');
    const setPlay = running => {
      play.setAttribute('aria-label', ctx.t(running ? 'common.pause' : 'common.play'));
      play.replaceChildren(icon(running ? 'pause' : 'play', 18));
    };
    if (!auto) { play.hidden = true; } else {
      play.addEventListener('click', () => {
        if (swiper.autoplay.running) swiper.autoplay.stop(); else swiper.autoplay.start();
        setPlay(swiper.autoplay.running);
      });
      // Only run while visible.
      const io = new IntersectionObserver(([e]) => { if (!swiper.destroyed && play.getAttribute('aria-label') === ctx.t('common.pause')) e.isIntersecting ? swiper.autoplay.start() : swiper.autoplay.stop(); });
      io.observe(node);
      return () => { io.disconnect(); swiper.destroy(true, true); };
    }
    return () => swiper.destroy(true, true);
  }
};
