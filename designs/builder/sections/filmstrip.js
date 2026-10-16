// Filmstrip: one big photo and a strip of thumbnails under it (Swiper thumbs). Without Swiper the
// thumbnails are plain buttons that swap the big photo.

import { h, photo } from '../core/dom.js';
import { libs } from '../core/loader.js';
import { motion } from '../core/motion.js';
import { altOf } from '../content/photos.js';

export default {
  render(ctx) {
    const { t, content, lang } = ctx;
    const shots = content.photos;
    const main = h('div', { class: 'swiper fs-main gallery' },
      h('div', { class: 'swiper-wrapper' }, shots.map(p => h('figure', { class: 'swiper-slide fs-slide' }, photo(p, { w: 1400, h: 860, sizes: '(max-width: 900px) 100vw, 1100px', alt: altOf(p, lang) }), h('figcaption', { text: altOf(p, lang) })))));
    const thumbs = h('div', { class: 'swiper fs-thumbs', role: 'group', 'aria-label': t('filmstrip.thumbs') },
      h('div', { class: 'swiper-wrapper' }, shots.map((p, i) => h('button', { type: 'button', class: 'swiper-slide fs-thumb', 'aria-label': t('common.photoOf', { n: i + 1, total: shots.length }) }, photo(p, { w: 220, h: 150, sizes: '140px', alt: '' })))));
    return h('section', { class: 'sec fs-sec' },
      h('div', { class: 'wrap' },
        h('header', { class: 'sec-head' },
          h('p', { class: 'eyebrow', text: t('filmstrip.eyebrow') }),
          h('h2', { 'data-split': '', text: t('filmstrip.title') })),
        main, thumbs,
        h('p', { class: 'note', text: t('common.sampleNote') })));
  },

  async activate(el, ctx) {
    const thumbsNode = el.querySelector('.fs-thumbs');
    const mainNode = el.querySelector('.fs-main');
    const plain = () => {
      const slides = [...mainNode.querySelectorAll('.fs-slide')];
      const pick = i => slides.forEach((s, j) => { s.hidden = i !== j; });
      thumbsNode.querySelectorAll('.fs-thumb').forEach((b, i) => b.addEventListener('click', () => pick(i)));
      pick(0);
    };
    let Swiper;
    try { Swiper = await libs.swiper(); } catch { plain(); return null; }
    if (!el.isConnected) return null;
    el.classList.add('is-live');
    const thumbs = new Swiper(thumbsNode, { slidesPerView: 'auto', spaceBetween: 10, watchSlidesProgress: true, freeMode: true });
    const main = new Swiper(mainNode, {
      speed: motion.reduced ? 0 : 600,
      effect: motion.reduced ? 'slide' : 'fade',
      fadeEffect: { crossFade: true },
      keyboard: { enabled: true, onlyInViewport: true },
      thumbs: { swiper: thumbs },
      a11y: { enabled: true, prevSlideMessage: ctx.t('common.prev'), nextSlideMessage: ctx.t('common.next') }
    });
    return () => { main.destroy(true, true); thumbs.destroy(true, true); };
  }
};
