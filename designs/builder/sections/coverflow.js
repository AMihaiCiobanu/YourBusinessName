// 3D coverflow gallery (Swiper effect-coverflow). Until Swiper loads, or with reduced motion, the
// same photos sit in a plain scroll-snap row, so the section is never empty. Tap a photo to see it
// full screen (shared lightbox, via the .gallery class).

import { h, photo } from '../core/dom.js';
import { libs } from '../core/loader.js';
import { motion } from '../core/motion.js';
import { altOf } from '../content/photos.js';

export default {
  render(ctx) {
    const { t, content, lang } = ctx;
    const slides = content.photos.map((p, i) => h('figure', { class: 'swiper-slide cf-slide' },
      photo(p, { w: 560, h: 740, sizes: '(max-width: 600px) 70vw, 380px', alt: altOf(p, lang) }),
      h('figcaption', { class: 'sr-only', text: t('common.photoOf', { n: i + 1, total: content.photos.length }) })));
    return h('section', { class: 'sec cf-sec' },
      h('div', { class: 'wrap' },
        h('header', { class: 'sec-head center' },
          h('p', { class: 'eyebrow', text: t('coverflow.eyebrow') }),
          h('h2', { 'data-split': '', text: t('coverflow.title') }))),
      h('div', { class: 'swiper cf gallery', role: 'region', 'aria-label': t('coverflow.label') },
        h('div', { class: 'swiper-wrapper' }, slides),
        h('div', { class: 'swiper-pagination' })),
      h('p', { class: 'note center', text: t('common.sampleNote') }));
  },

  async activate(el, ctx) {
    if (motion.reduced) return null;
    let Swiper;
    try { Swiper = await libs.swiper(); } catch { return null; }
    if (!el.isConnected) return null;
    const node = el.querySelector('.cf');
    node.classList.add('is-live');
    const swiper = new Swiper(node, {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      loop: true,
      initialSlide: 2,
      speed: 650,
      coverflowEffect: { rotate: 38, stretch: 0, depth: 160, modifier: 1, slideShadows: true },
      keyboard: { enabled: true, onlyInViewport: true },
      pagination: { el: node.querySelector('.swiper-pagination'), clickable: true },
      a11y: {
        enabled: true,
        prevSlideMessage: ctx.t('common.prev'),
        nextSlideMessage: ctx.t('common.next'),
        paginationBulletMessage: ctx.t('slider.slide', { n: '{{index}}', total: ctx.content.photos.length })
      }
    });
    return () => swiper.destroy(true, true);
  }
};
