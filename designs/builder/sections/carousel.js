// Swipe carousel: a row of tall photo cards that scrolls sideways with snap points, plus previous /
// next buttons. No library and no autoplay; tapping a photo opens the shared full-screen viewer.

import { h, photo, icon } from '../core/dom.js';
import { altOf } from '../content/photos.js';
import { motion } from '../core/motion.js';

export default {
  render(ctx) {
    const { t, content, lang } = ctx;
    const total = content.photos.length;
    return h('section', { class: 'sec cr-sec' },
      h('div', { class: 'wrap' },
        h('header', { class: 'sec-head cr-head' },
          h('div', null,
            h('p', { class: 'eyebrow', text: t('carousel.eyebrow') }),
            h('h2', { 'data-split': '', text: t('carousel.title') })),
          h('div', { class: 'cr-btns' },
            h('button', { type: 'button', class: 'icon-btn cr-prev', 'aria-label': t('common.prev'), disabled: true }, icon('arrowLeft', 18)),
            h('button', { type: 'button', class: 'icon-btn cr-next', 'aria-label': t('common.next') }, icon('arrowRight', 18)))),
        h('div', { class: 'cr-track gallery', tabindex: '0', role: 'region', 'aria-label': t('carousel.label') },
          content.photos.map((p, i) => h('div', { class: 'cr-card' },
            h('figure', { class: 'cr-fig' },
              photo(p, { w: 480, h: 600, sizes: '(max-width: 600px) 72vw, 300px', alt: altOf(p, lang) }),
              h('figcaption', { class: 'sr-only', text: t('common.photoOf', { n: i + 1, total }) }))))),
        h('p', { class: 'note', text: t('common.sampleNote') })));
  },

  activate(el) {
    const track = el.querySelector('.cr-track');
    const prev = el.querySelector('.cr-prev');
    const next = el.querySelector('.cr-next');
    const step = dir => {
      const card = track.querySelector('.cr-card');
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      track.scrollBy({ left: dir * ((card?.offsetWidth || 300) + gap), behavior: motion.reduced ? 'auto' : 'smooth' });
    };
    const sync = () => {
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    };
    const onPrev = () => step(-1);
    const onNext = () => step(1);
    prev.addEventListener('click', onPrev);
    next.addEventListener('click', onNext);
    track.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
    return () => {
      prev.removeEventListener('click', onPrev);
      next.removeEventListener('click', onNext);
      track.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }
};
