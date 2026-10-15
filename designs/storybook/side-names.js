// Side names: the page sections written along the right edge. Names already read stack small at
// the top, the current one is big, the next ones wait sideways at the bottom and swing up as you
// scroll to them. Each name links to its section. Sections come from
// `main > section[data-side-name="Name"]`. Desktop only.

import { el } from '../shared/live.js';

const NAME_SIZE = 32;     // px, font size of the current name
const SMALL = 0.5;        // scale of names that are not current
const DIM = 0.8;          // opacity of names that are not current
const MARGIN = 24;        // px between the names and the right edge
const GAP = 22;           // px between stacked names at the top
const LIFT = 14;          // px of extra room the current name takes
const SIDE_SLOTS = 3;     // upcoming names shown sideways at the bottom
const ACTIVE_TOP = 0.4;   // a section is current once its top passes this share of the viewport...
const ACTIVE_SHIFT = 0.5; // ...and the line slides down by this much over the page so the last one is reachable
const ENTER = 0.5;        // viewport heights of scrolling a name takes to swing in

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const lerp = (a, b, t) => a + (b - a) * t;

export function mountSideNames() {
  const sections = [...document.querySelectorAll('main > section[data-side-name]')];
  if (sections.length < 2) return;
  const wide = window.matchMedia('(min-width: 768px)');
  const header = document.querySelector('.top');
  const tones = sections.map(s => (s.classList.contains('paper') ? 'light' : 'dark'));

  const nav = el('nav', 'side-names');
  nav.setAttribute('aria-label', 'Page sections');
  const labels = sections.map(s => {
    const a = el('a', 'side-name', s.dataset.sideName);
    a.href = `#${s.id}`;
    nav.appendChild(a);
    return a;
  });
  document.body.appendChild(nav);

  let tops = [];
  let starts = [];
  let widths = [];
  let docH = 0, vw = 0, vh = 0;
  let shownCurrent = -1;

  function measure() {
    if (!wide.matches) return;
    vw = nav.clientWidth;
    vh = window.innerHeight;
    docH = document.documentElement.scrollHeight;
    const max = Math.max(1, docH - vh);
    tops = sections.map(s => s.getBoundingClientRect().top + window.scrollY);
    // scroll position at which each section becomes current
    starts = tops.map((t, i) => (i === 0 ? 0 : Math.max(0, (t - ACTIVE_TOP * vh) / (1 + (ACTIVE_SHIFT * vh) / max))));
    widths = labels.map(a => a.offsetWidth);
    update();
  }

  function update() {
    if (!wide.matches || !starts.length) return;
    const n = sections.length;
    const max = Math.max(1, docH - vh);
    const s = clamp(window.scrollY, 0, max);

    // names start under the header: at the very top the demo bar still sits above it
    const top = header ? Math.max(0, Math.round(header.getBoundingClientRect().bottom)) : 0;
    const bottom = vh - 70;
    const step = Math.max(40, Math.min(104, (bottom - top - 260) / (SIDE_SLOTS - 1)));
    const sidePos = d => bottom - (SIDE_SLOTS - d) * step;

    // c: continuous index of the current section (3.4 = a bit of the way from 3 to 4)
    let i = 0;
    while (i + 1 < n && starts[i + 1] <= s) i++;
    const c = i + (i + 1 < n ? clamp(1 - (starts[i + 1] - s) / (ENTER * vh), 0, 1) : 0);

    const right = vw - MARGIN;
    const sideX = right - (NAME_SIZE * SMALL) / 2;
    labels.forEach((a, j) => {
      const d = j - c;
      const w = widths[j];
      const stackY = top + 30 + j * GAP;
      let cx, cy, rot, sc, op;
      if (d <= -1) {
        sc = SMALL; rot = 0; op = DIM;
        cx = right - (w * sc) / 2; cy = stackY;
      } else if (d <= 0) {
        const t = d + 1;
        sc = lerp(SMALL, 1, t); rot = 0; op = lerp(DIM, 1, t);
        cx = right - (w * sc) / 2; cy = lerp(stackY, stackY + LIFT, t);
      } else if (d <= 1) {
        sc = lerp(1, SMALL, d); rot = lerp(0, -90, d); op = lerp(1, DIM, d);
        cx = lerp(right - w / 2, sideX, d); cy = lerp(stackY + LIFT, sidePos(1), d);
      } else {
        sc = SMALL; rot = -90; op = DIM * clamp(SIDE_SLOTS + 1 - d, 0, 1);
        cx = sideX; cy = sidePos(d);
      }
      a.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0) translate(-50%, -50%) rotate(${rot.toFixed(1)}deg) scale(${sc.toFixed(3)})`;
      a.style.opacity = op.toFixed(2);
      a.style.visibility = op < 0.01 ? 'hidden' : '';

      // names read dark on paper sections and light on dark ones
      let k = 0;
      const y = s + cy;
      while (k + 1 < n && tops[k + 1] <= y) k++;
      if (a.dataset.tone !== tones[k]) a.dataset.tone = tones[k];
    });

    const current = Math.round(c);
    if (current !== shownCurrent) {
      shownCurrent = current;
      labels.forEach((a, j) => (j === current ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
    }
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', measure);
  wide.addEventListener('change', measure);
  new ResizeObserver(measure).observe(document.body);
  document.fonts?.ready.then(measure);
  measure();
}
