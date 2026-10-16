// The price list as a 3D book with turning pages (StPageFlip 2.0.7, loaded only when this section
// nears the screen). Drag a corner with the mouse or a finger, click/tap the page edges, use the
// arrow keys or the buttons. Two pages side by side on wide screens, one page on phones.
//
// The services come from the app (or the sample) and can be any number, with long names or no
// description, so pages are filled by measuring: lines are added to an off-screen page of the real
// size until it overflows. A group that does not fit continues on the next page with
// "(continued)". The book is rebuilt when fresh data arrives or the width changes.
//
// Reduced motion, or the library failing to load: the same pages in a flat, swipeable row.

import { h, icon, photo } from '../core/dom.js';
import { libs } from '../core/loader.js';
import { motion } from '../core/motion.js';
import { altOf } from '../content/photos.js';
import { bookButton, serviceGroups, formatDuration, weekRows } from '../../shared/live.js';

const RATIO = 1.4; // page height / width
const MIN_W = 300;
const MAX_W = 480;

// Same rule as StPageFlip's "stretch" size, so measured pages match the real ones.
function pageSize(holderWidth) {
  const block = Math.min(holderWidth, MAX_W * 2);
  const portrait = block < MIN_W * 2;
  const w = Math.floor(Math.min(portrait ? block : block / 2, MAX_W));
  return { w, h: Math.floor(w * RATIO), portrait };
}

// ---------- paper sound (off by default) ----------

let audio = null;
function rustle() {
  try {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    const len = Math.floor(audio.sampleRate * 0.32);
    const buffer = audio.createBuffer(1, len, audio.sampleRate);
    const ch = buffer.getChannelData(0);
    for (let i = 0; i < len; i++) ch[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 2;
    const src = audio.createBufferSource();
    src.buffer = buffer;
    const filter = audio.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = 0.8;
    filter.frequency.setValueAtTime(2600, audio.currentTime);
    filter.frequency.exponentialRampToValueAtTime(700, audio.currentTime + 0.3);
    const gain = audio.createGain();
    gain.gain.value = 0.18;
    src.connect(filter).connect(gain).connect(audio.destination);
    src.start();
  } catch { /* no audio: silent */ }
}

// ---------- pages ----------

function serviceLine(svc, ctx) {
  const line = bookButton('', { linkId: ctx.linkId, service: svc, className: 'bk-line' });
  line.append(
    h('span', { class: 'sr-only', text: `${ctx.t('common.book')}: ` }),
    h('span', { class: 'bk-row' }, h('span', { class: 'bk-name', text: svc.name }), h('span', { class: 'bk-dots', 'aria-hidden': 'true' }), h('span', { class: 'bk-price', text: ctx.priceText(svc) })),
    h('span', { class: 'bk-meta' }, formatDuration(svc.durationMinutes), svc.description ? ` · ${svc.description}` : '')
  );
  return h('li', { class: 'bk-item' }, line);
}

function page(kind, kids, { hard = false } = {}) {
  return h('div', { class: `bk-page bk-${kind}`, 'data-density': hard ? 'hard' : 'soft' },
    h('div', { class: 'bk-inner' }, kids));
}

function paginate(ctx, size, measureHost) {
  const groups = serviceGroups(ctx.data);
  const showTitles = groups.length > 1;
  const probe = page('menu', []);
  probe.classList.add('bk-probe');
  probe.style.cssText = `--pw:${size.w}px;width:${size.w}px;height:${size.h}px`;
  measureHost.appendChild(probe);
  const inner = probe.firstChild;

  const pages = [];
  const contents = [];
  let list = null;
  const overflow = () => inner.scrollHeight > inner.clientHeight + 1;
  const open = title => {
    const added = [];
    if (title) added.push(inner.appendChild(h('h3', { class: 'bk-group', text: title })));
    list = inner.appendChild(h('ul', { class: 'bk-list' }));
    added.push(list);
    return added;
  };
  const flush = () => {
    if (inner.querySelector('.bk-item')) pages.push([...inner.childNodes].map(n => n.cloneNode(true)));
    inner.replaceChildren();
  };

  for (const group of groups) {
    const title = showTitles ? group.label : null;
    group.items.forEach((svc, i) => {
      if (i === 0) {
        // The group title and its first line go together: on this page if both fit, else on a new one.
        const added = open(title);
        list.appendChild(serviceLine(svc, ctx));
        if (overflow() && inner.childNodes.length > added.length) {
          for (const n of added) n.remove();
          flush();
          open(title);
          list.appendChild(serviceLine(svc, ctx));
        }
        contents.push({ label: group.label, index: pages.length });
        return;
      }
      const item = list.appendChild(serviceLine(svc, ctx));
      if (overflow()) {
        item.remove();
        flush();
        open(title ? ctx.t('book.continued', { group: group.label }) : null);
        list.appendChild(item);
      }
    });
  }
  flush();
  probe.remove();
  return { pages, contents: showTitles ? contents : [] };
}

function buildPages(ctx, size, measureHost) {
  const { t, content, lang, name } = ctx;
  const shots = content.photos;
  const { pages: menu, contents } = paginate(ctx, size, measureHost);
  // Printed page numbers match the counter under the book: cover = 1, photo = 2, intro = 3.
  const firstMenuNo = 4;
  const out = [];

  out.push(page('cover', [
    h('span', { class: 'bk-ornament', 'aria-hidden': 'true' }),
    h('p', { class: 'bk-cover-name', text: name }),
    h('p', { class: 'bk-cover-title', text: t('book.coverTitle') }),
    h('p', { class: 'bk-cover-sub', text: `${t('book.coverSub')} · ${new Date().getFullYear()}` })
  ], { hard: true }));

  out.push(page('photo', [photo(shots[3] || shots[0], { w: 520, h: 728, sizes: `${size.w}px`, alt: altOf(shots[3] || shots[0], lang) })]));

  const toc = contents.length
    ? h('ol', { class: 'bk-toc' }, contents.map(c => h('li', null, h('span', { text: c.label }), h('span', { class: 'bk-dots', 'aria-hidden': 'true' }), h('span', { text: String(c.index + firstMenuNo) }))))
    : null;
  out.push(page('intro', [
    h('h3', { class: 'bk-title', text: t('book.introTitle') }),
    h('p', { class: 'bk-text', text: t('book.introText') }),
    toc ? h('p', { class: 'bk-group', text: t('book.contents') }) : null,
    toc
  ]));

  menu.forEach((nodes, i) => {
    const p = page('menu', nodes);
    p.firstChild.appendChild(h('span', { class: 'bk-num', text: String(i + firstMenuNo) }));
    out.push(p);
  });

  // Closing spread: hours + booking. Keep an even count before the back cover.
  const rows = weekRows(ctx.data);
  const closing = page('closing', [
    h('h3', { class: 'bk-title', text: t('book.closingTitle') }),
    h('p', { class: 'bk-text', text: t('book.closingText') }),
    ctx.data.hasHours ? h('p', { class: 'bk-group', text: t('book.hours') }) : null,
    ctx.data.hasHours ? h('ul', { class: 'bk-hours' }, rows.map(r => h('li', { class: r.isToday ? 'is-today' : null }, h('span', { text: r.short }), h('span', { text: r.text })))) : null,
    bookButton(t('common.book'), { linkId: ctx.linkId, className: 'btn btn-sm bk-cta' })
  ]);
  if ((out.length + 2) % 2 === 1) out.push(page('photo', [photo(shots[4] || shots[1], { w: 520, h: 728, sizes: `${size.w}px`, alt: altOf(shots[4] || shots[1], lang) })]));
  out.push(closing);
  out.push(page('back', [h('span', { class: 'bk-ornament', 'aria-hidden': 'true' }), h('p', { class: 'bk-cover-name', text: name })], { hard: true }));
  for (const p of out) p.style.setProperty('--pw', `${size.w}px`);
  return out;
}

// ---------- section ----------

const state = new WeakMap();

export default {
  render(ctx) {
    const { t } = ctx;
    const holder = h('div', { class: 'bk-holder' });
    const stage = h('div', { class: 'bk-stage', tabindex: '0', role: 'region', 'aria-roledescription': 'book', 'aria-label': t('book.label') }, holder);
    const count = h('p', { class: 'bk-count', 'aria-live': 'polite' });
    const prev = h('button', { type: 'button', class: 'icon-btn bk-prev', 'aria-label': t('book.prevPage') }, icon('arrowLeft', 20));
    const next = h('button', { type: 'button', class: 'icon-btn bk-next', 'aria-label': t('book.nextPage') }, icon('arrowRight', 20));
    const sound = h('button', { type: 'button', class: 'icon-btn bk-sound', 'aria-pressed': 'false', 'aria-label': t('book.soundOn') }, icon('mute', 18));
    const section = h('section', { class: 'sec book-sec' },
      h('div', { class: 'wrap' },
        h('header', { class: 'sec-head center' },
          h('p', { class: 'eyebrow', text: t('book.eyebrow') }),
          h('h2', { 'data-split': '', text: t('book.title') }),
          h('p', { class: 'lead', text: t('book.lead') })),
        stage,
        h('div', { class: 'bk-controls' }, prev, count, next, sound),
        h('div', { class: 'bk-measure', 'aria-hidden': 'true' })));
    // Before the library loads: a closed book with skeleton lines.
    holder.appendChild(h('div', { class: 'bk-placeholder', 'aria-hidden': 'true' },
      h('span', { class: 'bk-ornament' }), h('p', { class: 'bk-cover-name', text: ctx.name }), h('p', { class: 'bk-cover-title', text: t('book.coverTitle') })));
    state.set(section, { flip: null, soundOn: false, ready: false, width: 0, startPage: 0, ctx });
    return section;
  },

  update(el, ctx) {
    const s = state.get(el);
    s.ctx = ctx;
    if (s.ready) build(el);
  },

  activate(el, ctx) {
    const s = state.get(el);
    s.ctx = ctx;
    const stage = el.querySelector('.bk-stage');
    const sound = el.querySelector('.bk-sound');

    sound.addEventListener('click', () => {
      s.soundOn = !s.soundOn;
      sound.setAttribute('aria-pressed', String(s.soundOn));
      sound.setAttribute('aria-label', s.ctx.t(s.soundOn ? 'book.soundOff' : 'book.soundOn'));
      sound.replaceChildren(icon(s.soundOn ? 'volume' : 'mute', 18));
      if (s.soundOn) rustle();
    });
    el.querySelector('.bk-prev').addEventListener('click', () => turn(el, -1));
    el.querySelector('.bk-next').addEventListener('click', () => turn(el, 1));
    stage.addEventListener('keydown', e => {
      const keys = { ArrowLeft: -1, ArrowRight: 1, PageUp: -1, PageDown: 1 };
      if (keys[e.key]) { e.preventDefault(); turn(el, keys[e.key]); }
      if (e.key === 'Home' || e.key === 'End') { e.preventDefault(); goTo(el, e.key === 'Home' ? 0 : Infinity); }
    });

    // Touch: a mostly horizontal drag belongs to the book, a vertical one scrolls the page. Without
    // this the browser claims the gesture as a scroll after the first move and slow page drags stop.
    let touch = null;
    stage.addEventListener('touchstart', e => {
      const p = e.touches[0];
      touch = p ? { x: p.clientX, y: p.clientY, dir: '' } : null;
    }, { passive: true });
    stage.addEventListener('touchmove', e => {
      const p = e.touches[0];
      if (!touch || !p || !s.flip) return;
      if (!touch.dir) {
        const dx = Math.abs(p.clientX - touch.x);
        const dy = Math.abs(p.clientY - touch.y);
        if (dx > 4 || dy > 4) touch.dir = dx >= dy ? 'h' : 'v';
        // A scroll must not end in a page turn: StPageFlip would treat the release as a tap.
        if (touch.dir === 'v') {
          const ui = s.flip.getUI?.();
          if (ui) ui.touchPoint = null;
          s.flip.isUserTouch = false;
        }
      }
      if (touch.dir === 'h' && e.cancelable) e.preventDefault();
    }, { passive: false });

    let timer = 0;
    const ro = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const width = el.querySelector('.bk-stage').clientWidth;
        if (s.ready && Math.abs(width - s.width) > 24) build(el);
      }, 250);
    });
    ro.observe(stage);

    const useLib = !motion.reduced;
    (useLib ? libs.pageFlip() : Promise.reject(new Error('reduced motion')))
      .then(PageFlip => { s.PageFlip = PageFlip; })
      .catch(err => { if (useLib) console.warn('Book: flat fallback', err.message); s.PageFlip = null; })
      .finally(() => { s.ready = true; build(el); });

    return () => {
      ro.disconnect();
      clearTimeout(timer);
      s.flip?.destroy();
      s.flip = null;
    };
  }
};

function current(el) {
  const s = state.get(el);
  if (s.flip) return s.flip.getCurrentPageIndex();
  const flat = el.querySelector('.bk-flat');
  if (!flat) return 0;
  return Math.round(flat.scrollLeft / (flat.firstChild?.getBoundingClientRect().width || 1));
}

function turn(el, dir) {
  const s = state.get(el);
  if (s.flip) {
    if (dir > 0) s.flip.flipNext('top'); else s.flip.flipPrev('top');
    return;
  }
  goTo(el, current(el) + dir);
}

function goTo(el, index) {
  const s = state.get(el);
  if (s.flip) {
    const n = Math.max(0, Math.min(s.flip.getPageCount() - 1, index));
    s.flip.flip(n, 'top');
    return;
  }
  const flat = el.querySelector('.bk-flat');
  if (!flat) return;
  const pages = flat.children;
  const i = Math.max(0, Math.min(pages.length - 1, index));
  flat.scrollTo({ left: pages[i].offsetLeft - flat.offsetLeft, behavior: motion.reduced ? 'auto' : 'smooth' });
  setTimeout(() => counter(el), 360);
}

function counter(el) {
  const s = state.get(el);
  const total = s.flip ? s.flip.getPageCount() : el.querySelectorAll('.bk-flat > .bk-page').length;
  const i = current(el);
  const portrait = !s.flip || s.flip.getOrientation() === 'portrait';
  // In a spread, name the right-hand page too.
  const label = portrait || i === 0 || i >= total - 1 ? String(i + 1) : `${i + 1}–${i + 2}`;
  el.querySelector('.bk-count').textContent = s.ctx.t('book.page', { n: label, total });
  el.querySelector('.bk-prev').disabled = i <= 0;
  el.querySelector('.bk-next').disabled = i >= total - (portrait ? 1 : 2);
}

// A closed book in a spread shows one page in one half of the frame: the front cover on the right,
// the back cover on the left. Shift it by half a page so it sits in the middle.
function center(el, opening = false) {
  const s = state.get(el);
  const holder = el.querySelector('.bk-holder');
  let shift = 0;
  if (s.flip && !opening && s.flip.getOrientation() !== 'portrait') {
    const i = s.flip.getCurrentPageIndex();
    const total = s.flip.getPageCount();
    const half = (el.querySelector('.stf__block')?.offsetWidth || 0) / 4;
    if (i === 0) shift = -half;
    else if (i >= total - 1 && total % 2 === 0) shift = half;
  }
  holder.style.setProperty('--bk-shift', `${Math.round(shift)}px`);
}

function build(el) {
  const s = state.get(el);
  const ctx = s.ctx;
  const stage = el.querySelector('.bk-stage');
  const holder = el.querySelector('.bk-holder');
  if (!ctx.data) return; // still loading: keep the closed-book placeholder

  if (ctx.data.failed || !ctx.data.services.length) {
    s.flip?.destroy();
    s.flip = null;
    holder.replaceChildren(h('div', { class: 'data-error' }, ctx.t('common.failed'), h('br'), bookButton(ctx.t('common.failedLink'), { linkId: ctx.linkId, className: 'link' })));
    return;
  }

  const startPage = s.flip ? s.flip.getCurrentPageIndex() : current(el);
  s.width = stage.clientWidth;
  const size = pageSize(s.width);
  const pages = buildPages(ctx, size, el.querySelector('.bk-measure'));

  s.flip?.destroy();
  s.flip = null;
  holder.replaceChildren();
  holder.style.removeProperty('--bk-shift');

  if (s.PageFlip) {
    const root = h('div', { class: 'bk-root' });
    holder.appendChild(root);
    try {
      const flip = new s.PageFlip(root, {
        width: 420,
        height: Math.round(420 * RATIO),
        size: 'stretch',
        minWidth: MIN_W,
        maxWidth: MAX_W,
        minHeight: Math.round(MIN_W * RATIO),
        maxHeight: Math.round(MAX_W * RATIO),
        showCover: true,
        usePortrait: true,
        drawShadow: true,
        maxShadowOpacity: 0.55,
        flippingTime: 850,
        mobileScrollSupport: true,
        startPage: Math.min(startPage, pages.length - 1)
      });
      flip.loadFromHTML(pages);
      flip.on('flip', () => counter(el));
      flip.on('changeOrientation', () => { counter(el); center(el); });
      flip.on('changeState', e => {
        if (e.data === 'flipping' && s.soundOn) rustle();
        // Any turn or corner fold opens the book, so it slides to the middle while the page turns;
        // back at rest, a closed book moves over its one visible half again.
        center(el, e.data !== 'read');
      });
      // A swipe up to 0.4 s turns the page (library default 0.25 s felt too strict on phones).
      const ui = flip.getUI?.();
      if (ui && 'swipeTimeout' in ui) ui.swipeTimeout = 400;
      s.flip = flip;
      holder.classList.toggle('is-portrait', size.portrait);
      counter(el);
      center(el);
      return;
    } catch (err) {
      console.warn('Book: flat fallback', err);
      root.remove();
    }
  }

  // Flat fallback: the same pages in a scroll-snap row.
  const flat = h('div', { class: 'bk-flat', tabindex: '-1' }, pages);
  for (const p of pages) p.style.cssText += `;width:${size.w}px;height:${size.h}px`;
  holder.appendChild(flat);
  let raf = 0;
  flat.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => counter(el)); }, { passive: true });
  counter(el);
}
