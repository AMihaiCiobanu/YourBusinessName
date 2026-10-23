// The frame shared by the CSS 3D heroes (photo ring, photo cube, floating cards): background, the
// text half (eyebrow, two-line h1 split word by word, lead, the two buttons, the live "open now"
// line) and a slot for the 3D visual. Not a section itself; its styles are herocopy.css, which each
// hero's stylesheet @imports so they arrive together.

import { h } from '../core/dom.js';
import { bookButton, openState } from '../../shared/live.js';

export function heroFrame(ctx, kind, visual) {
  const { t, content } = ctx;
  const [l1, l2] = content.h1;
  return h('section', { class: `sec hx-sec ${kind}` },
    h('div', { class: 'hx-bg', 'aria-hidden': 'true' }),
    h('div', { class: 'wrap hx-grid' },
      h('div', { class: 'hx-copy' },
        h('p', { class: 'eyebrow', text: content.tagline }),
        h('h1', null, h('span', { class: 'hx-l1', 'data-split': '', text: l1 }), ' ', h('span', { class: 'hx-l2', 'data-split': '', text: l2 })),
        h('p', { class: 'hx-lead', text: content.lead }),
        h('div', { class: 'actions' },
          bookButton(t('hero.primary'), { linkId: ctx.linkId, className: 'btn' }),
          h('a', { class: 'btn btn-ghost', href: ctx.anchor('book', 'prices', 'services', 'basket'), text: t('hero.secondary') })),
        h('p', { class: 'hx-status', hidden: true })),
      h('div', { class: 'hx-visual' }, visual)));
}

// Fills `node` with "Open now" / "Closed now" from the app's hours; hides it while there is no data.
export function updateStatus(node, ctx) {
  const state = ctx.data && openState(ctx.data, { open: ctx.t('hours.badgeOpen', { time: '' }).replace(/\s*$/, ''), closed: ctx.t('hours.badgeClosed') });
  if (!state) { node.hidden = true; return null; }
  node.textContent = state.label;
  node.classList.toggle('is-open', state.isOpen);
  node.hidden = false;
  return state;
}

// Turns horizontal drags on `node` into degrees (mouse or finger; vertical swipes still scroll the
// page, thanks to touch-action: pan-y in the CSS). onMove(deltaDeg) while dragging, onEnd(velocity)
// on release. Returns a cleanup function.
export function dragTurn(node, { onStart, onMove, onEnd, degPerPx = 0.35 }) {
  let id = null;
  let lastX = 0;
  let lastT = 0;
  let vel = 0;
  const down = e => {
    if (e.button > 0) return;
    id = e.pointerId;
    lastX = e.clientX;
    lastT = e.timeStamp;
    vel = 0;
    try { node.setPointerCapture(id); } catch { /* the pointer is already gone */ }
    node.classList.add('is-dragging');
    onStart?.();
  };
  const move = e => {
    if (e.pointerId !== id) return;
    const d = (e.clientX - lastX) * degPerPx;
    const dt = Math.max(1, e.timeStamp - lastT);
    // Degrees per frame (16 ms), capped so a very fast flick still coasts at a readable speed.
    vel = Math.max(-12, Math.min(12, vel * 0.6 + (d / dt) * 16 * 0.4));
    lastX = e.clientX;
    lastT = e.timeStamp;
    onMove(d);
  };
  const up = e => {
    if (e.pointerId !== id) return;
    id = null;
    node.classList.remove('is-dragging');
    onEnd?.(vel);
  };
  node.addEventListener('pointerdown', down);
  node.addEventListener('pointermove', move);
  node.addEventListener('pointerup', up);
  node.addEventListener('pointercancel', up);
  return () => {
    node.removeEventListener('pointerdown', down);
    node.removeEventListener('pointermove', move);
    node.removeEventListener('pointerup', up);
    node.removeEventListener('pointercancel', up);
  };
}
