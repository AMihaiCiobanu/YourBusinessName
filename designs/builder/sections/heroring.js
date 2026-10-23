// Hero with a ring of photos in CSS 3D. Scrolling the page and dragging the ring (mouse or finger)
// turn it; after a flick it coasts and slows down. Nothing turns on its own apart from one short
// turn as it appears, so it needs no pause button. Frames run only while something moves and the
// hero is on screen. Reduced motion: the ring stands still, the first photo in front.

import { h, photo } from '../core/dom.js';
import { motion, onVisible } from '../core/motion.js';
import { altOf } from '../content/photos.js';
import { heroFrame, updateStatus, dragTurn } from './herocopy.js';

const N = 8;
const INTRO = 1600;

export default {
  render(ctx) {
    const { content, lang } = ctx;
    const cards = content.photos.slice(0, N).map((p, i) =>
      h('figure', { class: 'hr-card', style: `--k:${i}` },
        photo(p, { w: 300, h: 400, sizes: '(max-width: 700px) 40vw, 240px', alt: altOf(p, lang), eager: i < 2 || i === N - 1, priority: i === 0 })));
    const stage = h('div', { class: 'hr-stage', 'data-reveal': '' },
      h('div', { class: 'hr-tilt' }, h('div', { class: 'hr-ring' }, cards)),
      h('div', { class: 'hr-floor', 'aria-hidden': 'true' }));
    return heroFrame(ctx, 'hr-sec', stage);
  },

  update(el, ctx) {
    updateStatus(el.querySelector('.hx-status'), ctx);
  },

  activate(el) {
    if (motion.reduced) return null;
    const stage = el.querySelector('.hr-stage');
    const ring = el.querySelector('.hr-ring');
    const t0 = performance.now();
    let angle = 0;
    let vel = 0;
    let dragging = false;
    let visible = true;
    let raf = 0;

    const frame = now => {
      raf = 0;
      if (!dragging) {
        angle += vel;
        vel *= 0.94;
        if (Math.abs(vel) < 0.02) vel = 0;
      }
      const k = Math.min(1, (now - t0) / INTRO);
      const intro = 140 * (1 - k) ** 3;
      const turn = angle + intro + window.scrollY * 0.12;
      ring.style.transform = `translateZ(calc(var(--r) * -1)) rotateY(${(-turn).toFixed(2)}deg)`;
      if (vel || dragging || k < 1) schedule();
    };
    const schedule = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame); };

    const stopDrag = dragTurn(stage, {
      onStart: () => { dragging = true; vel = 0; schedule(); },
      onMove: d => { angle -= d; },
      onEnd: v => { dragging = false; vel = -v; schedule(); }
    });
    const stopWatch = onVisible(el, on => { visible = on; if (on) schedule(); }, { once: false, rootMargin: '0px' });
    window.addEventListener('scroll', schedule, { passive: true });
    document.addEventListener('visibilitychange', schedule);
    schedule();

    return () => {
      cancelAnimationFrame(raf);
      stopDrag();
      stopWatch();
      window.removeEventListener('scroll', schedule);
      document.removeEventListener('visibilitychange', schedule);
      ring.style.transform = '';
    };
  }
};
