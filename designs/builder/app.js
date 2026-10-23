// Page builder: the prospect picks a business type, sections, order, theme and colour, and sees
// their page change live. The choice lives in the URL and in localStorage (core/state.js) and goes
// into the "Get my page" email, so we know exactly what they built.
//
// Services and hours use the same live code as the other designs (../shared/live.js). Open the page
// with ?link=<booking link id> to preview a real account's prices, or ?sample=many for a long list.

import { loadState, saveState, shareUrl, encodeHash, visible, linkFromUrl, query, defaults } from './core/state.js';
import { GROUP, typeOf } from './core/registry.js';
import { loadLang, t, tEn } from './core/i18n.js';
import { applyTheme, accentFor } from './core/theme.js';
import { motion } from './core/motion.js';
import { startData, setDataLang, priceText } from './core/data.js';
import { createPage } from './core/page.js';
import { h } from './core/dom.js';
import { loadContent } from './content/index.js';
import { mountPanel } from './builder/panel.js';
import { setupBooking } from '../shared/live.js';
import { mountDemo, getPageMailto } from '../shared/demo.js?v=5';

const state = loadState();
const linkId = linkFromUrl();
const manyServices = query('sample') === 'many';
const MOTION_KEY = 'builder:motion';

let content = null;
let data = null;
let theme = null;

const displayName = () => state.name || t('brandDefault');

// A key names a section type (its file: 'book', 'prices') or a whole group ('gallery').
const matches = key => it => typeOf(it).mod === key || it.group === key;
const shownBy = key => { const shown = visible(state); return shown.find(it => typeOf(it).mod === key) || shown.find(matches(key)); };

// Link to the first visible section of the first key that is on the page.
function anchor(...keys) {
  for (const key of keys) {
    const item = shownBy(key);
    if (item) return `#s-${item.id}`;
  }
  return '#page';
}

let toastTimer = 0;
function toast(message) {
  let node = document.querySelector('.bx-toast');
  if (!node) {
    node = h('div', { class: 'lv-toast bx-toast', role: 'status' });
    document.body.appendChild(node);
  }
  node.textContent = message;
  node.classList.add('is-shown');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove('is-shown'), 3800);
}

const ctx = () => ({
  t,
  lang: state.lang,
  niche: state.niche,
  name: displayName(),
  content,
  data,
  linkId,
  skin: state.skin,
  theme,
  get reduced() { return motion.reduced; },
  anchor,
  toast,
  priceText: s => priceText(s, data?.currency || ''),
  isOn: key => visible(state).some(matches(key))
});

// ---------- "Get my page" ----------

function setupText() {
  const sections = visible(state).map(it => {
    const g = GROUP[it.group];
    return g.types.length > 1 ? `${g.label}: ${typeOf(it).label}` : typeOf(it).label;
  });
  return [
    'My page setup from the page builder:',
    `- Type of business: ${tEn(`niches.${state.niche}`)}`,
    state.name ? `- Name on the page: ${state.name}` : null,
    `- Theme: ${tEn(`skins.${state.skin}.name`)}, accent colour ${accentFor(state.skin, state.accent)}`,
    `- Page language: ${state.lang === 'ro' ? 'Romanian' : 'English'}`,
    `- Sections, in order: ${sections.join(', ')}`,
    `- Link to this setup: ${shareUrl(state)}`,
    '', ''
  ].filter(line => line !== null).join('\n');
}

function updateGetPage() {
  const href = getPageMailto(setupText());
  for (const a of document.querySelectorAll('[data-getpage]')) a.href = href;
}

// ---------- changes from the builder ----------

let page = null;
let panel = null;
let contentJob = 0;

async function reloadContent() {
  const job = ++contentJob;
  const next = await loadContent(state.niche, state.lang, { manyServices });
  if (job !== contentJob) return false;
  content = next;
  startData({ linkId, sample: content.sample }, fresh => {
    data = fresh;
    page?.dataChanged();
  });
  return true;
}

function updateTitle() {
  document.title = t('meta.title', { name: displayName() });
}

let nameTimer = 0;
async function change(patch, kind) {
  const langChanged = patch.lang && patch.lang !== state.lang;
  Object.assign(state, patch);
  saveState(state);
  updateGetPage();

  if (kind === 'theme') {
    theme = applyTheme(state);
    page.themeChanged();
  } else if (kind === 'sections') {
    await page.sync(visible(state));
  } else if (kind === 'name') {
    updateTitle();
    page.renderHeader();
    page.renderFooter();
    clearTimeout(nameTimer);
    nameTimer = setTimeout(() => page.refresh(['book', 'reviewbook', 'gift', 'map', 'mapwide']), 400);
  } else if (kind === 'content') {
    if (langChanged) {
      await loadLang(state.lang);
      setDataLang(state.lang);
      panel.relabel();
    }
    if (!(await reloadContent())) return;
    theme = applyTheme(state); // a ready page also sets the theme and colour
    updateTitle();
    await page.rebuild(visible(state));
  }
  panel.refresh(kind, patch);
}

function resetAll() {
  const fresh = defaults();
  fresh.lang = state.lang;
  Object.assign(state, fresh);
  theme = applyTheme(state);
  change({}, 'content');
}

// ---------- demo buttons ----------

document.addEventListener('click', e => {
  const node = e.target.closest('[data-demo]');
  if (!node) return;
  e.preventDefault();
  const kind = node.dataset.demo;
  const messages = {
    call: t('common.demoCall'),
    whatsapp: t('common.demoWhatsapp'),
    social: t('common.demoSocial'),
    form: t('common.demoForm'),
    reserve: t('common.demoReserve', { name: node.dataset.name || '' })
  };
  toast(messages[kind] || t('common.sampleNote'));
});

// ---------- boot ----------

async function boot() {
  try { if (localStorage.getItem(MOTION_KEY) === '1') motion.force(true); } catch { /* ignore */ }
  document.documentElement.classList.toggle('reduce-motion', motion.reduced);

  await loadLang(state.lang);
  setDataLang(state.lang);
  theme = applyTheme(state);
  mountDemo('builder');

  const main = document.getElementById('page');
  const overlay = document.getElementById('overlay');
  await reloadContent();
  page = createPage({ main, overlay, ctx });
  updateTitle();

  // The panel first, so the page is laid out with it from the very first paint.
  panel = mountPanel({
    state,
    change,
    reset: resetAll,
    shareUrl: () => shareUrl(state),
    toast,
    motion: {
      get: () => motion.reduced,
      system: () => motion.system,
      set: value => {
        motion.force(value);
        try { localStorage.setItem(MOTION_KEY, value ? '1' : '0'); } catch { /* ignore */ }
        page.rebuild(visible(state));
      }
    },
    getPageHref: () => getPageMailto(setupText()),
    jump: id => page.element(id)?.scrollIntoView({ behavior: motion.reduced ? 'auto' : 'smooth', block: 'start' })
  });

  setupBooking({ linkId, theme: () => (state.skin === 'luxe' ? 'dark' : 'light') });
  await page.sync(visible(state));
  page.renderFooter();
  updateGetPage();
}

// A different setup pasted into the address bar: start again from it.
window.addEventListener('hashchange', () => {
  if (location.hash && location.hash !== encodeHash(state)) location.reload();
});

boot().catch(err => {
  console.error('Page builder failed to start', err);
  const loading = document.getElementById('page-loading');
  if (loading) loading.textContent = 'The page could not load. Please refresh.'; // i18n may be what failed
});
