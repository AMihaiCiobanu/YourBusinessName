// Hero with one big photo and cards floating in front of it at different depths (rating, clients,
// years, a second photo). The scene leans with the mouse or the phone's tilt, so the near cards move
// more than the far ones; the cards also bob slowly. Same first photo, size and sizes as the 3D hero,
// so the preload in index.html serves it. Reduced motion: a still, slightly turned scene.

import { h, photo, icon } from '../core/dom.js';
import { motion, finePointer, deviceTilt } from '../core/motion.js';
import { altOf } from '../content/photos.js';
import { heroFrame, updateStatus } from './herocopy.js';

export default {
  render(ctx) {
    const { t, content, lang } = ctx;
    const [main, second] = content.photos;
    const [clients, years, rating] = content.stats;
    // The page language as the locale (ro → 1.900, en → 1,900); no dependency on the language table.
    const nf = new Intl.NumberFormat(lang);
    const nf1 = new Intl.NumberFormat(lang, { minimumFractionDigits: 1 });
    const chip = (cls, ...kids) => h('div', { class: `hf-chip ${cls}` }, ...kids);
    const scene = h('div', { class: 'hf-scene' },
      h('figure', { class: 'hf-photo' }, photo(main, { w: 640, h: 800, sizes: '(max-width: 700px) 60vw, 420px', alt: altOf(main, lang), eager: true, priority: true })),
      h('figure', { class: 'hf-thumb' }, photo(second, { w: 320, h: 320, sizes: '(max-width: 700px) 30vw, 160px', alt: altOf(second, lang) })),
      chip('hf-rating', icon('star', 18), h('b', { text: nf1.format(rating.value) }), h('span', { text: t('stats.rating') })),
      chip('hf-clients', icon('heart', 18), h('b', { text: `${nf.format(clients.value)}${clients.suffix}` }), h('span', { text: t('stats.clients') })),
      chip('hf-years', h('b', { text: nf.format(years.value) }), h('span', { text: t('stats.years') })));
    return heroFrame(ctx, 'hf-sec', h('div', { class: 'hf-stage', 'data-reveal': '' }, scene));
  },

  update(el, ctx) {
    updateStatus(el.querySelector('.hx-status'), ctx);
  },

  activate(el) {
    if (motion.reduced) return null;
    const scene = el.querySelector('.hf-scene');
    let raf = 0;
    let next = null;
    const set = (x, y) => {
      next = { x, y };
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        scene.style.setProperty('--px', next.x.toFixed(3));
        scene.style.setProperty('--py', next.y.toFixed(3));
      });
    };
    const onMove = e => {
      const r = el.getBoundingClientRect();
      set(((e.clientX - r.left) / r.width - 0.5) * 2, ((e.clientY - r.top) / r.height - 0.5) * 2);
    };
    const onLeave = () => set(0, 0);
    let stopTilt = () => {};
    if (finePointer()) {
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
    } else {
      stopTilt = deviceTilt((x, y) => set(x, y));
    }
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      stopTilt();
      scene.style.removeProperty('--px');
      scene.style.removeProperty('--py');
    };
  }
};
