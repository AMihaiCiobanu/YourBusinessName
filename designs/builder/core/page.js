// The live page: header, the visible sections in order, footer. Sections are mounted, moved and
// removed as the builder changes. The page shows items ({ id, group, type }, see core/state.js);
// each item's type module gets a context (texts, content, live data, helpers) and may define:
//   render(ctx)          → the <section> element (required)
//   activate(el, ctx)    → runs once the section is near the screen; returns a cleanup function
//   update(el, ctx)      → services / hours changed (sections marked `data` in the registry)
//   onTheme(el, ctx)     → skin or accent changed
//   destroy(el)          → extra cleanup when removed

import { GROUP, NAV_GROUPS, loadSection, typeOf, navOf } from './registry.js';
import { sectionStyle } from './loader.js';
import { reveal, parallax, onVisible } from './motion.js';
import { h, icon } from './dom.js';
import { t } from './i18n.js';
import { bookButton } from '../../shared/live.js';
import { MADE_BY } from '../../shared/demo.js?v=5';

export function createPage({ main, overlay, ctx }) {
  const mounted = new Map(); // item id → { el, mod, type, cleanups }
  let order = []; // items

  const header = h('header', { class: 'top', id: 'top' });
  const sectionsHost = h('div', { class: 'sections', id: 'sections' });
  const footer = h('footer', { class: 'foot', id: 'foot', hidden: true }); // shown once sections are in
  main.replaceChildren(header, sectionsHost, footer);

  // ---------- header + footer ----------

  function renderHeader() {
    const c = ctx();
    const name = c.name;
    const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase() || 'YB';
    const nav = h('nav', { class: 'top-nav', 'aria-label': t('nav.label') });
    const seen = new Set();
    for (const group of NAV_GROUPS) {
      const item = order.find(it => navOf(it) === group && mounted.has(it.id));
      if (!item || seen.has(group)) continue;
      seen.add(group);
      nav.appendChild(h('a', { href: `#s-${item.id}`, text: t(`nav.${group}`) }));
    }
    header.replaceChildren(h('div', { class: 'wrap top-inner' },
      h('a', { class: 'brand', href: '#page' }, h('span', { class: 'brand-mark', 'aria-hidden': 'true', text: initials }), h('span', { class: 'brand-name', text: name })),
      nav,
      bookButton(t('common.book'), { linkId: c.linkId, className: 'btn btn-sm top-book' })
    ));
  }

  function renderFooter() {
    const c = ctx();
    const social = h('ul', { class: 'foot-social', 'aria-label': t('footer.social') });
    for (const [key, label] of [['instagram', 'Instagram'], ['facebook', 'Facebook'], ['tiktok', 'TikTok']]) {
      social.appendChild(h('li', null, h('button', { type: 'button', class: 'icon-btn', 'aria-label': label, 'data-demo': 'social' }, icon(key, 20))));
    }
    const madeBy = h('p', { class: 'footer-madeby' });
    madeBy.innerHTML = MADE_BY; // static markup from demo.js
    footer.hidden = false;
    footer.replaceChildren(h('div', { class: 'wrap foot-inner' },
      h('div', { class: 'foot-brand' },
        h('p', { class: 'foot-name', text: c.name }),
        h('p', { class: 'muted', text: c.content.tagline })),
      h('address', { class: 'foot-contact' },
        h('span', null, icon('pin', 16), t('map.address')),
        h('span', null, icon('phone', 16), t('map.phone')),
        h('span', null, icon('send', 16), t('map.email'))),
      social,
      h('p', { class: 'foot-legal muted' },
        t('footer.rights', { year: new Date().getFullYear(), name: c.name }), ' · ',
        t('footer.powered'), ' ', h('a', { href: 'https://appointmentsapps.com/', target: '_blank', rel: 'noopener', text: 'Appointments & Reports' })),
      h('p', { class: 'foot-legal muted small', text: t('footer.sample') }),
      madeBy
    ));
  }

  // ---------- sections ----------

  async function prepare(item) {
    const file = typeOf(item).mod;
    const [mod] = await Promise.all([loadSection(file), sectionStyle(file).catch(() => null)]);
    return mod;
  }

  function build(item, mod) {
    const { id } = item;
    const type = typeOf(item);
    const c = ctx();
    let el;
    try {
      el = mod.render(c);
    } catch (err) {
      console.error(`Section ${id} failed to render`, err);
      return null;
    }
    el.id = `s-${id}`;
    el.dataset.section = id;
    el.setAttribute('aria-label', el.getAttribute('aria-label') || t(`sec.${type.mod}.name`));
    const rec = { el, mod, type: type.mod, cleanups: [] };
    if (mod.update && c.data) safe(() => mod.update(el, c));
    return rec;
  }

  function activate(id, rec) {
    reveal(rec.el);
    parallax(rec.el);
    if (rec.mod.activate) {
      rec.cleanups.push(onVisible(rec.el, () => {
        try {
          const done = rec.mod.activate(rec.el, ctx());
          if (typeof done === 'function') rec.cleanups.push(done);
          else if (done && typeof done.then === 'function') done.then(fn => { if (typeof fn === 'function') rec.cleanups.push(fn); }).catch(err => console.warn(`Section ${id}:`, err));
        } catch (err) {
          console.error(`Section ${id} failed to start`, err);
        }
      }, { rootMargin: '400px 0px' }));
    }
  }

  function unmount(id) {
    const rec = mounted.get(id);
    if (!rec) return;
    for (const fn of rec.cleanups) safe(fn);
    if (rec.mod.destroy) safe(() => rec.mod.destroy(rec.el));
    rec.el.remove();
    mounted.delete(id);
  }

  function host(item) { return GROUP[item.group].fixed ? overlay : sectionsHost; }

  function place() {
    for (const item of order) {
      const rec = mounted.get(item.id);
      if (rec) host(item).appendChild(rec.el); // appendChild moves nodes already in place
    }
  }

  // Shows exactly `items`, in that order. Only changed sections are touched; a section whose type
  // changed is mounted again.
  async function sync(items) {
    order = items;
    for (const [id, rec] of [...mounted]) {
      const item = items.find(it => it.id === id);
      if (!item || typeOf(item).mod !== rec.type) unmount(id);
    }
    const missing = items.filter(it => !mounted.has(it.id));
    // The first section is what the visitor sees first: show it as soon as it is ready, then the rest.
    const first = mounted.size === 0 ? missing.slice(0, 1) : [];
    const rest = missing.filter(it => !first.includes(it));
    for (const batch of [first, rest]) {
      if (!batch.length) continue;
      if (batch === rest && first.length) await firstPaint(mounted.get(first[0].id)?.el);
      const mods = await Promise.all(batch.map(it => prepare(it).catch(err => { console.error(err); return null; })));
      if (order !== items) return; // a newer change won
      batch.forEach((item, i) => {
        if (!mods[i] || mounted.has(item.id)) return;
        const rec = build(item, mods[i]);
        if (rec) mounted.set(item.id, rec);
      });
      place();
      batch.forEach(item => { const rec = mounted.get(item.id); if (rec) activate(item.id, rec); });
      renderHeader();
    }
    // Pure reorder or removal: nothing was missing, but the order and the header still change.
    if (!missing.length) {
      place();
      renderHeader();
    }
  }

  // Niche, language or name changed: every section is rebuilt from scratch.
  async function rebuild(items) {
    for (const id of [...mounted.keys()]) unmount(id);
    renderFooter();
    await sync(items);
  }

  function dataChanged() {
    const c = ctx();
    for (const [id, rec] of mounted) if (rec.mod.update) safe(() => rec.mod.update(rec.el, c), id);
  }

  function themeChanged() {
    const c = ctx();
    for (const [id, rec] of mounted) if (rec.mod.onTheme) safe(() => rec.mod.onTheme(rec.el, c), id);
  }

  // Re-renders only the sections of the given types (e.g. the ones that print the business name).
  async function refresh(mods) {
    const hit = [...mounted].filter(([, rec]) => mods.includes(rec.type)).map(([id]) => id);
    for (const id of hit) unmount(id);
    if (hit.length) await sync(order);
  }

  return { sync, rebuild, refresh, dataChanged, themeChanged, renderHeader, renderFooter, element: id => mounted.get(id)?.el };
}

// Lets the first section's main photo (the LCP on phones) load before the sections below the
// fold start fetching theirs. Never waits more than 1.2 s.
function firstPaint(el) {
  const img = el?.querySelector('img[fetchpriority="high"]');
  if (!img || img.complete) return Promise.resolve();
  return new Promise(resolve => {
    const done = () => { clearTimeout(timer); resolve(); };
    const timer = setTimeout(done, 1200);
    img.addEventListener('load', done, { once: true });
    img.addEventListener('error', done, { once: true });
  });
}

function safe(fn, label = '') {
  try { fn(); } catch (err) { console.error(`Section ${label}`, err); }
}
