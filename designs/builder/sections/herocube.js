// Hero with a cube of four photos in CSS 3D, turned a little so two faces show. The arrows, a drag
// or a swipe turn it a quarter at a time; with a mouse it also leans towards the pointer. It never
// turns on its own. Reduced motion: the arrows still turn it, without the animation.

import { h, photo, icon } from '../core/dom.js';
import { motion, finePointer } from '../core/motion.js';
import { altOf } from '../content/photos.js';
import { heroFrame, updateStatus, dragTurn } from './herocopy.js';

const LEAN_X = -12;
const LEAN_Y = -26;

export default {
  render(ctx) {
    const { t, content, lang } = ctx;
    const faces = content.photos.slice(0, 4).map((p, i) =>
      h('figure', { class: `hc-face hc-f${i}` },
        photo(p, { w: 480, h: 480, sizes: '(max-width: 700px) 60vw, 300px', alt: altOf(p, lang), eager: i < 2, priority: i === 0 })));
    const stage = h('div', { class: 'hc-stage', 'data-reveal': '' },
      h('div', { class: 'hc-cube' }, faces,
        h('div', { class: 'hc-face hc-top', 'aria-hidden': 'true' }),
        h('div', { class: 'hc-face hc-bottom', 'aria-hidden': 'true' })),
      h('div', { class: 'hc-shadow', 'aria-hidden': 'true' }));
    const nav = h('div', { class: 'hc-nav' },
      h('button', { type: 'button', class: 'icon-btn hc-prev', 'aria-label': t('common.prev') }, icon('arrowLeft', 18)),
      h('button', { type: 'button', class: 'icon-btn hc-next', 'aria-label': t('common.next') }, icon('arrowRight', 18)));
    return heroFrame(ctx, 'hc-sec', [stage, nav]);
  },

  update(el, ctx) {
    updateStatus(el.querySelector('.hx-status'), ctx);
  },

  activate(el) {
    const stage = el.querySelector('.hc-stage');
    const cube = el.querySelector('.hc-cube');
    let turn = 0;
    let drag = 0;
    let lean = { x: 0, y: 0 };

    const apply = () => {
      const rx = LEAN_X - lean.y * 10;
      const ry = LEAN_Y + lean.x * 14 - turn * 90 + drag;
      cube.style.transform = `translateZ(calc(var(--half) * -1)) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    };
    const go = step => { turn += step; drag = 0; apply(); };
    const prev = () => go(-1);
    const next = () => go(1);
    el.querySelector('.hc-prev').addEventListener('click', prev);
    el.querySelector('.hc-next').addEventListener('click', next);

    // A drag of a third of a face (30deg) or a flick turns it one face; less springs back.
    const stopDrag = dragTurn(stage, {
      onMove: d => { drag += d; apply(); },
      onEnd: v => {
        const step = drag < -30 || v < -2 ? 1 : drag > 30 || v > 2 ? -1 : 0;
        go(step);
      }
    });

    const onMove = e => {
      const r = el.getBoundingClientRect();
      lean = { x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 };
      if (!stage.classList.contains('is-dragging')) apply();
    };
    const lean3d = finePointer() && !motion.reduced;
    if (lean3d) el.addEventListener('pointermove', onMove);

    return () => {
      el.querySelector('.hc-prev').removeEventListener('click', prev);
      el.querySelector('.hc-next').removeEventListener('click', next);
      el.removeEventListener('pointermove', onMove);
      stopDrag();
      cube.style.transform = '';
    };
  }
};
