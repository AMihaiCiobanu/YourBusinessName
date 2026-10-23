// The builder panel: a side panel on wide screens, a bottom sheet on phones. Two tabs:
// Sections (language first, then tick to show, pick the type, add another gallery, drag the handle /
// arrows / Alt+arrows to reorder) and Style (business,
// name, theme, seasonal theme, accent, motion, phone preview). Every control calls change(patch, kind);
// app.js applies it to the page.

import { GROUP, typeOf } from '../core/registry.js';
import { NICHES, SKINS, LANGS, itemsFrom, nextId } from '../core/state.js';
import { ACCENT_PRESETS, SKIN_META, accentFor } from '../core/theme.js';
import { SEASON_CHOICES, resolveSeason } from '../core/season.js';
import { t, langName } from '../core/i18n.js';
import { h, icon } from '../core/dom.js';
import { PRESETS } from './presets.js';

const OPEN_KEY = 'builder:panel';

export function mountPanel({ state, change, reset, shareUrl, toast, motion, getPageHref, jump }) {
  const panel = h('aside', { class: 'bp', id: 'builder', 'aria-labelledby': 'bp-title' });
  const fab = h('button', { type: 'button', class: 'bp-fab', 'aria-controls': 'builder', 'aria-expanded': 'false' });
  const live = h('p', { class: 'sr-only', 'aria-live': 'polite', id: 'bp-live' });
  document.body.append(panel, fab, live);

  let tab = 'sections';
  let open = false;
  let phone = false;
  const wide = window.matchMedia('(min-width: 1100px)');

  const announce = msg => { live.textContent = ''; requestAnimationFrame(() => { live.textContent = msg; }); };

  // ---------- open / close ----------

  function setOpen(value, { focus = true, remember = true } = {}) {
    open = value;
    panel.classList.toggle('is-open', open);
    document.body.classList.toggle('bp-open', open);
    fab.setAttribute('aria-expanded', String(open));
    fab.hidden = open && wide.matches;
    if (remember) { try { localStorage.setItem(OPEN_KEY, open ? '1' : '0'); } catch { /* ignore */ } }
    if (open && focus) panel.querySelector('.bp-close')?.focus();
    if (!open && focus) fab.focus();
  }

  fab.addEventListener('click', () => setOpen(!open));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && open && panel.contains(document.activeElement) && !wide.matches) setOpen(false);
  });
  wide.addEventListener('change', () => setOpen(open, { focus: false, remember: false }));

  // ---------- sections tab ----------

  const list = h('ol', { class: 'bp-list', 'aria-describedby': 'bp-hint' });
  const floating = h('ul', { class: 'bp-list bp-list-fixed' });
  const count = h('p', { class: 'bp-count', 'aria-live': 'polite' });

  const itemOf = id => state.items.find(it => it.id === id);
  const typeName = type => t(`sec.${type.mod}.name`);
  // A group with several types is named after the group ("Photo gallery"), a single-type one after
  // its type. Copies of a group are numbered in page order: "Photo gallery 2".
  function secName(id) {
    const item = itemOf(id);
    if (!item) return '';
    const g = GROUP[item.group];
    const base = g.types.length > 1 ? t(`grp.${g.id}.name`) : typeName(typeOf(item));
    const same = state.items.filter(it => it.group === item.group);
    return same.length > 1 ? `${base} ${same.indexOf(item) + 1}` : base;
  }

  function badges(type) {
    const wrap = h('span', { class: 'bp-badges' });
    for (const b of type.badges) wrap.appendChild(h('span', { class: `bp-badge bp-badge-${b}`, text: t(`ui.badge.${b}`) }));
    return wrap;
  }

  // Under the name: the type select and, for a group that can repeat, add / remove a copy.
  function extras(item) {
    const g = GROUP[item.group];
    if (g.types.length < 2 && !g.multi) return null;
    const wrap = h('div', { class: 'bp-extra' });
    if (g.types.length > 1) {
      const selectId = `bp-type-${item.id}`;
      wrap.appendChild(h('label', { class: 'bp-type-l', for: selectId }, t('ui.type'), h('span', { class: 'sr-only', text: ` · ${secName(item.id)}` })));
      wrap.appendChild(h('select', { class: 'bp-select bp-type', id: selectId },
        g.types.map(ty => h('option', { value: ty.id, text: typeName(ty), selected: ty.id === typeOf(item).id }))));
    }
    if (g.multi) {
      // Another copy only makes sense next to one that is on the page.
      if (item.on) wrap.appendChild(h('button', { type: 'button', class: 'bp-mini bp-add', id: `bp-add-${item.id}` }, icon('plus', 14), t(`grp.${g.id}.add`) === `grp.${g.id}.add` ? t('ui.addCopy') : t(`grp.${g.id}.add`)));
      if (state.items.filter(it => it.group === item.group).length > 1) {
        wrap.appendChild(h('button', { type: 'button', class: 'bp-mini bp-remove', id: `bp-rm-${item.id}`, 'aria-label': t('ui.removeCopy', { name: secName(item.id) }) }, icon('close', 14)));
      }
    }
    return wrap;
  }

  function row(item, { fixed = false } = {}) {
    const { id } = item;
    const type = typeOf(item);
    const checkId = `bp-on-${id}`;
    const li = h('li', { class: `bp-row${item.on ? ' is-on' : ''}`, dataset: { id } });
    if (!fixed) {
      li.appendChild(h('button', { type: 'button', class: 'bp-grip', id: `bp-grip-${id}`, 'aria-label': t('ui.drag', { name: secName(id) }) }, icon('grip', 18)));
    }
    li.appendChild(h('input', { type: 'checkbox', id: checkId, class: 'bp-toggle', checked: item.on, 'aria-describedby': `${checkId}-d` }));
    li.appendChild(h('label', { for: checkId, class: 'bp-label' },
      h('span', { class: 'bp-name' }, secName(id), badges(type)),
      h('span', { class: 'bp-desc', id: `${checkId}-d`, text: t(`sec.${type.mod}.desc`) })));
    if (!fixed) {
      li.appendChild(h('span', { class: 'bp-move' },
        h('button', { type: 'button', class: 'bp-arrow', id: `bp-up-${id}`, 'data-dir': '-1', 'aria-label': t('ui.moveUp', { name: secName(id) }) }, icon('arrowUp', 16)),
        h('button', { type: 'button', class: 'bp-arrow', id: `bp-down-${id}`, 'data-dir': '1', 'aria-label': t('ui.moveDown', { name: secName(id) }) }, icon('arrowDown', 16))));
    }
    const more = extras(item);
    if (more) li.appendChild(more);
    return li;
  }

  const isFixed = item => !!GROUP[item.group].fixed;
  const movable = () => state.items.filter(it => !isFixed(it)).map(it => it.id);

  function renderList() {
    list.replaceChildren(...state.items.filter(it => !isFixed(it)).map(it => row(it)));
    floating.replaceChildren(...state.items.filter(isFixed).map(it => row(it, { fixed: true })));
    updateCount();
  }

  function updateCount() {
    count.textContent = t('ui.count', { on: state.items.filter(it => it.on).length, total: state.items.length });
    const ids = movable();
    list.querySelectorAll('.bp-row').forEach((li, i) => {
      const [up, down] = li.querySelectorAll('.bp-arrow');
      up.disabled = i === 0;
      down.disabled = i === ids.length - 1;
    });
  }

  const setItems = items => change({ items }, 'sections');
  const jumpSoon = id => setTimeout(() => { if (!wide.matches) return; jump(id); }, 350);

  function toggle(id, on) {
    setItems(state.items.map(it => (it.id === id ? { ...it, on } : it)));
    announce(t(on ? 'ui.added' : 'ui.removed', { name: secName(id) }));
    if (on) jumpSoon(id);
  }

  function setType(id, type) {
    const item = itemOf(id);
    setItems(state.items.map(it => (it.id === id ? { ...it, type } : it)));
    announce(t('ui.typeChanged', { name: secName(id), type: typeName(typeOf({ group: item.group, type })) }));
    if (item.on) jumpSoon(id);
  }

  // A new copy goes right after this one, on, with a type not on the page yet when there is one.
  function addCopy(id) {
    const item = itemOf(id);
    const g = GROUP[item.group];
    const used = state.items.filter(it => it.group === g.id && it.on).map(it => it.type);
    const type = (g.types.find(ty => !used.includes(ty.id)) || typeOf(item)).id;
    const copy = { id: nextId(state.items, g.id), group: g.id, type, on: true };
    const items = [...state.items];
    items.splice(items.indexOf(item) + 1, 0, copy);
    setItems(items);
    renderList();
    list.querySelector(`#bp-type-${copy.id}`)?.focus();
    announce(t('ui.added', { name: secName(copy.id) }));
    jumpSoon(copy.id);
  }

  function removeCopy(id) {
    const name = secName(id);
    const item = itemOf(id);
    const items = state.items.filter(it => it.id !== id);
    setItems(items);
    renderList();
    const sibling = items.find(it => it.group === item.group);
    (list.querySelector(`#bp-add-${sibling?.id}`) || list.querySelector(`#bp-on-${sibling?.id}`))?.focus();
    announce(t('ui.removed', { name }));
  }

  function move(id, to) {
    const ids = movable();
    const from = ids.indexOf(id);
    if (from < 0 || to < 0 || to >= ids.length || to === from) return;
    ids.splice(to, 0, ids.splice(from, 1)[0]);
    setItems([...ids.map(itemOf), ...state.items.filter(isFixed)]);
    renderList();
    list.querySelector(`[data-id="${id}"] .bp-grip`)?.focus();
    announce(t('ui.moved', { name: secName(id), pos: to + 1, total: ids.length }));
  }

  for (const host of [list, floating]) {
    host.addEventListener('change', e => {
      const select = e.target.closest('.bp-type');
      if (select) { setType(select.closest('.bp-row').dataset.id, select.value); return; }
      const input = e.target.closest('.bp-toggle');
      if (!input) return;
      const li = input.closest('.bp-row');
      li.classList.toggle('is-on', input.checked);
      toggle(li.dataset.id, input.checked);
    });
  }

  list.addEventListener('click', e => {
    const mini = e.target.closest('.bp-add, .bp-remove');
    if (mini) {
      const id = mini.closest('.bp-row').dataset.id;
      if (mini.classList.contains('bp-add')) addCopy(id); else removeCopy(id);
      return;
    }
    const arrow = e.target.closest('.bp-arrow');
    if (!arrow) return;
    const id = arrow.closest('.bp-row').dataset.id;
    const ids = movable();
    move(id, ids.indexOf(id) + Number(arrow.dataset.dir));
    list.querySelector(`[data-id="${id}"] .bp-arrow[data-dir="${arrow.dataset.dir}"]`)?.focus();
  });

  list.addEventListener('keydown', e => {
    const grip = e.target.closest('.bp-grip, .bp-toggle, .bp-arrow');
    if (!grip || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')) return;
    if (!e.altKey && !grip.classList.contains('bp-grip')) return;
    e.preventDefault();
    const id = grip.closest('.bp-row').dataset.id;
    move(id, movable().indexOf(id) + (e.key === 'ArrowUp' ? -1 : 1));
  });

  // Pointer drag on the handle: the row follows the finger / mouse and the others make room.
  list.addEventListener('pointerdown', e => {
    const grip = e.target.closest('.bp-grip');
    if (!grip || e.button > 0) return;
    e.preventDefault();
    const li = grip.closest('.bp-row');
    const rows = [...list.children];
    const startY = e.clientY;
    const heights = rows.map(r => r.getBoundingClientRect());
    const from = rows.indexOf(li);
    let to = from;
    li.classList.add('is-dragging');
    grip.setPointerCapture(e.pointerId);

    const onMove = ev => {
      const dy = ev.clientY - startY;
      li.style.transform = `translateY(${dy}px)`;
      const center = heights[from].top + heights[from].height / 2 + dy;
      to = rows.findIndex((r, i) => center < heights[i].top + heights[i].height / 2 + (i > from ? heights[from].height / 2 : 0) - (i > from ? heights[i].height / 2 : 0));
      if (to < 0) to = rows.length - 1;
      rows.forEach((r, i) => {
        if (r === li) return;
        let shift = 0;
        if (from < to && i > from && i <= to) shift = -heights[from].height - 6;
        if (from > to && i >= to && i < from) shift = heights[from].height + 6;
        r.style.transform = shift ? `translateY(${shift}px)` : '';
      });
    };
    const onUp = () => {
      grip.removeEventListener('pointermove', onMove);
      grip.removeEventListener('pointerup', onUp);
      grip.removeEventListener('pointercancel', onUp);
      rows.forEach(r => { r.style.transform = ''; });
      li.classList.remove('is-dragging');
      if (to !== from) move(li.dataset.id, to);
    };
    grip.addEventListener('pointermove', onMove);
    grip.addEventListener('pointerup', onUp);
    grip.addEventListener('pointercancel', onUp);
  });

  // ---------- style tab ----------

  function field(label, control, hint) {
    return h('div', { class: 'bp-field' }, label, control, hint ? h('p', { class: 'bp-hint', text: hint }) : null);
  }

  function renderStyle() {
    const nicheSelect = h('select', { id: 'bp-niche', class: 'bp-select' },
      NICHES.map(n => h('option', { value: n, text: t(`niches.${n}`), selected: n === state.niche })));
    nicheSelect.addEventListener('change', () => change({ niche: nicheSelect.value }, 'content'));

    const nameInput = h('input', { id: 'bp-name', class: 'bp-input', type: 'text', maxlength: '40', autocomplete: 'organization', value: state.name, placeholder: t('ui.namePh') });
    nameInput.addEventListener('input', () => change({ name: nameInput.value.replace(/\s+/g, ' ').trimStart().slice(0, 40) }, 'name'));

    const skins = h('div', { class: 'bp-skins', role: 'radiogroup', 'aria-labelledby': 'bp-skin-l' });
    for (const s of SKINS) {
      const meta = SKIN_META[s];
      const input = h('input', { type: 'radio', name: 'bp-skin', id: `bp-skin-${s}`, value: s, checked: s === state.skin });
      input.addEventListener('change', () => { change({ skin: s }, 'theme'); announce(t('ui.themeChanged', { name: t(`skins.${s}.name`) })); });
      skins.appendChild(h('label', { class: `bp-skin bp-skin-${s}`, for: `bp-skin-${s}` },
        input,
        h('span', { class: 'bp-skin-preview', 'aria-hidden': 'true', style: `--p-bg:${meta.bg};--p-text:${meta.text};--p-accent:${meta.accent}` }, h('b', { text: 'Aa' }), h('i'), h('i')),
        h('span', { class: 'bp-skin-name', text: t(`skins.${s}.name`) }),
        h('span', { class: 'bp-skin-desc', text: t(`skins.${s}.desc`) })));
    }

    // Seasonal theme: a holiday look over the page. 'Automatic' says which season today gives.
    const nowSeason = resolveSeason('auto', state.lang);
    const seasonSelect = h('select', { id: 'bp-season', class: 'bp-select', 'aria-describedby': 'bp-season-h' },
      SEASON_CHOICES.map(s => h('option', { value: s, selected: s === state.season,
        text: s === 'auto' ? t('ui.seasonAuto', { name: t(`season.${nowSeason || 'none'}.name`) }) : t(`season.${s}.name`) })));
    seasonSelect.addEventListener('change', () => {
      change({ season: seasonSelect.value }, 'theme');
      announce(t('ui.themeChanged', { name: seasonSelect.selectedOptions[0].text }));
    });

    const season = resolveSeason(state.season, state.lang);
    const swatches = h('div', { class: 'bp-swatches', role: 'radiogroup', 'aria-labelledby': 'bp-accent-l' });
    const current = state.accent || '';
    const addSwatch = (value, label, color) => {
      const id = `bp-acc-${value.replace('#', '') || 'theme'}`;
      const input = h('input', { type: 'radio', name: 'bp-accent', id, value, checked: value === current });
      input.addEventListener('change', () => change({ accent: value }, 'theme'));
      swatches.appendChild(h('label', { class: `bp-swatch${value ? '' : ' bp-swatch-theme'}`, for: id, title: label, style: `--sw:${color}` }, input, h('span', { class: 'sr-only', text: label })));
    };
    addSwatch('', t('ui.accentReset'), accentFor(state.skin, '', season));
    for (const c of ACCENT_PRESETS) addSwatch(c, c, c);
    const picker = h('input', { type: 'color', id: 'bp-color', class: 'bp-color', value: accentFor(state.skin, state.accent, season), 'aria-label': t('ui.customColor') });
    let colorTimer = 0;
    picker.addEventListener('input', () => {
      clearTimeout(colorTimer);
      colorTimer = setTimeout(() => change({ accent: picker.value.toLowerCase() }, 'theme'), 60);
    });

    // Each language in its own name. It sits first in the sections tab, not here.
    const langSelect = h('select', { id: 'bp-lang', class: 'bp-select' },
      LANGS.map(code => h('option', { value: code, lang: code, text: langName(code), selected: code === state.lang })));
    langSelect.addEventListener('change', () => change({ lang: langSelect.value }, 'content'));
    langSlot.replaceChildren(h('label', { for: 'bp-lang', class: 'bp-label-t', text: t('ui.lang') }), langSelect);

    const motionInput = h('input', { type: 'checkbox', id: 'bp-motion', class: 'bp-switch', checked: motion.get(), disabled: motion.system() });
    motionInput.addEventListener('change', () => motion.set(motionInput.checked));
    const phoneInput = h('input', { type: 'checkbox', id: 'bp-phone', class: 'bp-switch', checked: phone });
    phoneInput.addEventListener('change', () => {
      phone = phoneInput.checked;
      document.body.classList.toggle('phone-preview', phone);
      window.dispatchEvent(new Event('resize'));
    });

    styleTab.replaceChildren(
      field(h('label', { for: 'bp-niche', class: 'bp-label-t', text: t('ui.business') }), nicheSelect),
      field(h('label', { for: 'bp-name', class: 'bp-label-t', text: t('ui.name') }), nameInput),
      field(h('p', { id: 'bp-skin-l', class: 'bp-label-t', text: t('ui.theme') }), skins),
      h('div', { class: 'bp-field' }, h('label', { for: 'bp-season', class: 'bp-label-t', text: t('ui.season') }), seasonSelect, h('p', { class: 'bp-hint', id: 'bp-season-h', text: t('ui.seasonHint') })),
      field(h('p', { id: 'bp-accent-l', class: 'bp-label-t', text: t('ui.accent') }), h('div', { class: 'bp-accent' }, swatches, h('label', { class: 'bp-color-wrap', for: 'bp-color' }, picker, h('span', { text: t('ui.customColor') })))),
      h('div', { class: 'bp-field bp-field-row' }, motionInput, h('label', { for: 'bp-motion' }, h('span', { class: 'bp-label-t', text: t('ui.motion') }), h('span', { class: 'bp-hint', text: t('ui.motionHint') }))),
      h('div', { class: 'bp-field bp-field-row bp-desktop-only' }, phoneInput, h('label', { for: 'bp-phone', class: 'bp-label-t', text: t('ui.phone') }))
    );
  }

  // ---------- frame ----------

  const sectionsTab = h('div', { class: 'bp-tab', id: 'bp-tab-sections', role: 'tabpanel', 'aria-labelledby': 'bp-t-sections' });
  const styleTab = h('div', { class: 'bp-tab', id: 'bp-tab-style', role: 'tabpanel', 'aria-labelledby': 'bp-t-style' });
  const langSlot = h('div', { class: 'bp-field' });

  function tabButton(key, label) {
    const btn = h('button', { type: 'button', role: 'tab', id: `bp-t-${key}`, 'aria-controls': `bp-tab-${key}`, class: 'bp-tabbtn' }, icon(key === 'sections' ? 'layers' : 'sliders', 16), label);
    btn.addEventListener('click', () => selectTab(key));
    btn.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const next = key === 'sections' ? 'style' : 'sections';
      selectTab(next);
      panel.querySelector(`#bp-t-${next}`).focus();
    });
    return btn;
  }

  function selectTab(key) {
    tab = key;
    for (const k of ['sections', 'style']) {
      const btn = panel.querySelector(`#bp-t-${k}`);
      btn.setAttribute('aria-selected', String(k === key));
      btn.tabIndex = k === key ? 0 : -1;
      panel.querySelector(`#bp-tab-${k}`).hidden = k !== key;
    }
  }

  function renderFrame() {
    const closeBtn = h('button', { type: 'button', class: 'bp-close', 'aria-label': t('ui.close') }, icon('close', 20));
    closeBtn.addEventListener('click', () => setOpen(false));
    const copyBtn = h('button', { type: 'button', class: 'bp-btn' }, icon('copy', 16), t('ui.copy'));
    copyBtn.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(shareUrl()); toast(t('ui.copied')); } catch { toast(t('ui.copyFailed')); }
    });
    const resetBtn = h('button', { type: 'button', class: 'bp-btn' }, icon('reset', 16), t('ui.reset'));
    resetBtn.addEventListener('click', () => { reset(); toast(t('ui.resetDone')); });
    const send = h('a', { class: 'bp-btn bp-btn-primary', 'data-getpage': '', href: getPageHref(), title: t('ui.sendHint') }, icon('send', 16), t('ui.send'));

    const presets = h('div', { class: 'bp-presets', role: 'group', 'aria-labelledby': 'bp-presets-l' },
      PRESETS.map(p => {
        const btn = h('button', { type: 'button', class: 'bp-preset', style: `--p-accent:${p.accent || SKIN_META[p.skin].accent};--p-bg:${SKIN_META[p.skin].bg};--p-text:${SKIN_META[p.skin].text}` },
          h('span', { class: 'bp-preset-dot', 'aria-hidden': 'true' }),
          h('span', null, h('b', { text: t(`niches.${p.niche}`) }), h('small', { text: t(`skins.${p.skin}.name`) })));
        btn.addEventListener('click', () => {
          change({ niche: p.niche, skin: p.skin, accent: p.accent, items: itemsFrom(p.sections, state.items) }, 'content');
          announce(t('ui.presetDone', { name: `${t(`niches.${p.niche}`)} · ${t(`skins.${p.skin}.name`)}` }));
        });
        return btn;
      }));

    sectionsTab.replaceChildren(
      langSlot,
      h('p', { class: 'bp-label-t', id: 'bp-presets-l', text: t('ui.presets') }),
      h('p', { class: 'bp-hint', text: t('ui.presetsHint') }),
      presets,
      h('p', { class: 'bp-label-t bp-sub', text: t('ui.ownMix') }),
      h('p', { class: 'bp-hint', id: 'bp-hint', text: t('ui.sectionsHint') }),
      count,
      list,
      h('p', { class: 'bp-label-t bp-sub', text: t('ui.floating') }),
      floating,
      h('div', { class: 'bp-new' },
        h('p', { class: 'bp-label-t', text: t('ui.newTitle') }),
        h('p', { class: 'bp-hint', text: t('ui.newText') }),
        h('a', { class: 'bp-newlink', 'data-getpage': '', href: getPageHref(), text: t('ui.newLink') }),
        h('p', { class: 'bp-hint', text: t('ui.included') }))
    );

    panel.replaceChildren(
      h('div', { class: 'bp-head' },
        h('span', { class: 'bp-handle', 'aria-hidden': 'true' }),
        h('div', null, h('h2', { id: 'bp-title', text: t('ui.title') }), h('p', { class: 'bp-lead', text: t('ui.lead') })),
        closeBtn),
      h('div', { class: 'bp-tabs', role: 'tablist', 'aria-label': t('ui.title') }, tabButton('sections', t('ui.tabSections')), tabButton('style', t('ui.tabStyle'))),
      h('div', { class: 'bp-body' }, sectionsTab, styleTab),
      h('div', { class: 'bp-foot' }, copyBtn, resetBtn, send)
    );
    fab.replaceChildren(icon('sparkle', 18), h('span', { text: t('ui.open') }));
    fab.title = t('ui.openAria');
    renderList();
    renderStyle();
    selectTab(tab);
  }

  renderFrame();

  let stored = null;
  try { stored = localStorage.getItem(OPEN_KEY); } catch { /* ignore */ }
  setOpen(stored ? stored === '1' && wide.matches : wide.matches, { focus: false, remember: false });

  return {
    // State changed elsewhere (reset, link): bring the controls back in line.
    refresh(kind = '', patch = {}) {
      // Typing a name or dragging the colour picker must not rebuild the control in use.
      if (kind === 'name' || (kind === 'theme' && !('skin' in patch) && !('season' in patch))) return;
      const scroll = panel.querySelector('.bp-body')?.scrollTop || 0;
      const focusedId = document.activeElement?.id;
      renderList();
      renderStyle();
      panel.querySelector('.bp-body').scrollTop = scroll;
      if (focusedId) document.getElementById(focusedId)?.focus();
    },
    // Language changed: rebuild every label.
    relabel() {
      const scroll = panel.querySelector('.bp-body')?.scrollTop || 0;
      renderFrame();
      panel.querySelector('.bp-body').scrollTop = scroll;
      panel.querySelector('#bp-lang')?.focus();
    }
  };
}
