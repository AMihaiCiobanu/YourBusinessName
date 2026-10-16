// Before / after: the "after" photo is clipped at the handle. Drag with mouse or finger, or use the
// keyboard: the control is a real range input (arrows, Home/End, Page up/down), so screen readers
// announce it as a slider. The demo uses one photo with a dull filter as the "before".

import { h, photo } from '../core/dom.js';
import { altOf } from '../content/photos.js';

export default {
  render(ctx) {
    const { t, content, lang } = ctx;
    const p = content.compare.photo;
    const before = photo(p, { w: 1200, h: 750, sizes: '(max-width: 900px) 100vw, 1000px', alt: `${t('compare.before')}: ${altOf(p, lang)}`, className: 'cmp-before' });
    const after = photo(p, { w: 1200, h: 750, sizes: '(max-width: 900px) 100vw, 1000px', alt: `${t('compare.after')}: ${altOf(p, lang)}`, className: 'cmp-after-img' });
    const range = h('input', { type: 'range', class: 'cmp-range', min: '0', max: '100', value: '50', step: '1', 'aria-label': t('compare.handle'), 'aria-valuetext': '50%' });
    const frame = h('div', { class: 'cmp-frame', style: '--pos:50%' },
      before,
      h('div', { class: 'cmp-after', 'aria-hidden': 'false' }, after),
      h('span', { class: 'cmp-tag cmp-tag-b', 'aria-hidden': 'true', text: t('compare.before') }),
      h('span', { class: 'cmp-tag cmp-tag-a', 'aria-hidden': 'true', text: t('compare.after') }),
      h('span', { class: 'cmp-handle', 'aria-hidden': 'true' }, h('span', { class: 'cmp-knob' })),
      range);
    const set = v => {
      frame.style.setProperty('--pos', `${v}%`);
      range.setAttribute('aria-valuetext', `${Math.round(v)}%`);
    };
    range.addEventListener('input', () => set(Number(range.value)));
    // Pointer drag anywhere on the photo (the range alone has a tiny hit area on touch).
    frame.addEventListener('pointerdown', e => {
      if (e.button > 0) return;
      const move = ev => {
        const r = frame.getBoundingClientRect();
        const v = Math.max(0, Math.min(100, ((ev.clientX - r.left) / r.width) * 100));
        range.value = String(Math.round(v));
        set(v);
      };
      move(e);
      frame.setPointerCapture(e.pointerId);
      frame.addEventListener('pointermove', move);
      const up = () => { frame.removeEventListener('pointermove', move); frame.removeEventListener('pointerup', up); frame.removeEventListener('pointercancel', up); };
      frame.addEventListener('pointerup', up);
      frame.addEventListener('pointercancel', up);
    });

    return h('section', { class: 'sec cmp-sec' },
      h('div', { class: 'wrap' },
        h('header', { class: 'sec-head center' },
          h('p', { class: 'eyebrow', text: t('compare.eyebrow') }),
          h('h2', { 'data-split': '', text: t('compare.title') }),
          h('p', { class: 'lead', text: content.compare.caption })),
        h('figure', { class: 'cmp', 'data-reveal': '' }, frame, h('figcaption', { class: 'note center', text: t('compare.note') }))));
  }
};
