// Shared parts of the clinic designs (dental, derma): a full-screen photo behind the page that
// changes per section (like fullframe), a "What brings you in?" finder that filters the live
// treatment list, a before/after slider, one review at a time and big opening hours.
// Treatments and hours come from ../shared/live.js like every other design.

import { el, bookButton, formatPrice, formatDuration, formatTime, weekRows, openState } from './live.js';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- backdrop: each [data-bg] section brings in its photo ----------

export function setupBackdrop({ backdrop, caption }) {
  const photos = [...backdrop.querySelectorAll('img')];
  let shown = 0;
  const show = i => {
    if (i === shown || !photos[i]) return;
    photos[shown].classList.remove('is-on');
    photos[i].classList.add('is-on');
    shown = i;
    if (caption) {
      caption.querySelector('[data-n]').textContent = String(i + 1).padStart(2, '0');
      caption.querySelector('[data-t]').textContent = photos[i].dataset.caption || '';
    }
  };
  const io = new IntersectionObserver(entries => {
    for (const e of entries) if (e.isIntersecting) show(Number(e.target.dataset.bg));
  }, { rootMargin: '-45% 0px -45% 0px' });
  for (const s of document.querySelectorAll('[data-bg]')) io.observe(s);
  // Load the other photos once the page is in, so a fast scroll never shows an empty frame.
  window.addEventListener('load', () => {
    for (const img of photos) { if (img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; } }
  });
}

export function solidHeader(top) {
  const onScroll = () => top.classList.toggle('is-solid', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ---------- treatments board with a concern finder ----------

// concerns: [{ id, label, words: ['whiten', 'albire', …] }] — a service matches when its name or
// description contains one of the words (any language), so it works with real data from the app.
export function treatmentBoard({ list, chips, note, linkId, concerns, labels }) {
  let data = null;
  let active = 'all';
  const matches = (svc, c) => {
    const text = `${svc.name} ${svc.description}`.toLowerCase();
    return c.words.some(w => text.includes(w));
  };

  const draw = () => {
    list.replaceChildren();
    if (!data) return;
    if (!data.services.length) { note.textContent = labels.empty; return; }
    const concern = concerns.find(c => c.id === active);
    const items = concern ? data.services.filter(s => matches(s, concern)) : data.services;
    for (const svc of items) {
      const item = bookButton('', { linkId, service: svc, className: 'board-item' });
      item.appendChild(el('span', 'b-name', svc.name));
      item.appendChild(el('span', 'b-price', svc.showPrice ? formatPrice(svc.price, data.currency) : labels.onRequest));
      const meta = el('span', 'b-meta', formatDuration(svc.durationMinutes) + (svc.description ? ` · ${svc.description}` : ''));
      meta.appendChild(el('strong', null, labels.book));
      item.appendChild(meta);
      const li = el('li');
      li.appendChild(item);
      list.appendChild(li);
    }
    note.textContent = concern && !items.length ? labels.noMatch : labels.live;
  };

  const all = [{ id: 'all', label: labels.all }, ...concerns];
  for (const c of all) {
    const chip = el('button', 'chip', c.label);
    chip.type = 'button';
    chip.setAttribute('aria-pressed', String(c.id === active));
    chip.addEventListener('click', () => {
      active = c.id;
      for (const b of chips.children) b.setAttribute('aria-pressed', String(b === chip));
      draw();
    });
    chips.appendChild(chip);
  }
  return { render(fresh) { data = fresh; draw(); } };
}

// ---------- before / after ----------

export function compare(frame) {
  const range = frame.querySelector('input[type=range]');
  const set = v => { frame.style.setProperty('--pos', `${v}%`); range.setAttribute('aria-valuetext', `${Math.round(v)}%`); };
  range.addEventListener('input', () => set(Number(range.value)));
  frame.addEventListener('pointerdown', e => {
    if (e.button > 0 || e.target === range) return;
    const move = ev => {
      const r = frame.getBoundingClientRect();
      const v = Math.max(0, Math.min(100, ((ev.clientX - r.left) / r.width) * 100));
      range.value = String(Math.round(v));
      set(v);
    };
    move(e);
    frame.setPointerCapture(e.pointerId);
    frame.addEventListener('pointermove', move);
    const up = () => { frame.removeEventListener('pointermove', move); frame.removeEventListener('pointerup', up); };
    frame.addEventListener('pointerup', up);
  });
  set(50);
}

// ---------- one review at a time ----------

export function reviews({ quote, dots, items, sampleLabel }) {
  let current = 0;
  let timer = 0;
  const render = i => {
    current = i;
    const r = items[i];
    quote.replaceChildren();
    quote.appendChild(el('blockquote', null, r.q));
    const cap = el('figcaption', null, `${r.n} · ${r.s}`);
    cap.appendChild(el('span', 'tag', sampleLabel));
    quote.appendChild(cap);
    for (const [k, d] of [...dots.children].entries()) d.setAttribute('aria-current', String(k === i));
  };
  const go = i => {
    quote.classList.add('is-fading');
    setTimeout(() => { render(i); quote.classList.remove('is-fading'); }, reduced() ? 0 : 350);
  };
  items.forEach((_, i) => {
    const dot = el('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Review ${i + 1}`);
    dot.addEventListener('click', () => { clearInterval(timer); go(i); });
    dots.appendChild(dot);
  });
  render(0);
  if (!reduced()) timer = setInterval(() => { if (!quote.matches(':hover')) go((current + 1) % items.length); }, 7000);
}

// ---------- big hours ----------

const short = m => formatTime(m).replace(':00', '');
const shortRange = r => `${short(r.start)}–${short(r.end)}`;

export function hours({ big, week, today, note, data, labels }) {
  week.replaceChildren();
  if (!data.hasHours) {
    big.textContent = labels.bookOnline;
    note.textContent = labels.seeTimes;
    today.hidden = true;
    return;
  }
  const rows = weekRows(data);
  const now = rows.find(r => r.isToday);
  big.textContent = now.range ? shortRange(now.range) : labels.closedToday;
  for (const row of rows) {
    const li = el('li', row.isToday ? 'is-today' : row.range ? 'open' : 'closed');
    li.appendChild(el('b', null, row.short));
    li.append(row.range ? shortRange(row.range) : labels.closed);
    week.appendChild(li);
  }
  const state = openState(data, { open: labels.openUntil, closed: labels.closedNow });
  today.textContent = state.label;
  today.classList.toggle('is-open', state.isOpen);
  today.hidden = false;
}
