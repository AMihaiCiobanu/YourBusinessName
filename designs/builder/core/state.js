// The page configuration: one small JSON object, mirrored in the URL hash (so a link reproduces the
// page) and in localStorage (so a returning visitor finds their page again). The hash wins over
// storage; anything missing or invalid falls back to the defaults.
//
// Hash format, kept short so it fits in the "Get my page" email:
//   #n=barber&k=luxe&a=c9a961&l=ro&b=Studio%20Ana&s=hero.book.team
// n niche · k skin · a accent (hex, empty = theme default) · l language · b business name ·
// s visible sections in order. `?link=<id>` and `?sample=many` stay in the query string (preview only).

import { SECTIONS, DEFAULT_ON, BY_ID } from './registry.js';

export const NICHES = ['beauty', 'nails', 'barber', 'spa', 'detailing', 'trainer', 'clinic', 'tattoo'];
export const SKINS = ['luxe', 'clean', 'bold'];
export const LANGS = ['en', 'ro'];
const STORE_KEY = 'builder:v1';
const NAME_MAX = 40;

const ALL_IDS = SECTIONS.map(s => s.id);

function defaultLang() {
  try { return (navigator.language || '').toLowerCase().startsWith('ro') ? 'ro' : 'en'; } catch { return 'en'; }
}

export function defaults() {
  return {
    niche: 'beauty',
    skin: 'luxe',
    accent: '',
    lang: defaultLang(),
    name: '',
    order: [...DEFAULT_ON, ...ALL_IDS.filter(id => !DEFAULT_ON.includes(id))],
    on: [...DEFAULT_ON]
  };
}

const isHex = v => typeof v === 'string' && /^#[0-9a-f]{6}$/i.test(v);

// Fills gaps and drops unknown values, whatever the source.
function sanitize(raw, base) {
  const s = { ...base };
  if (!raw || typeof raw !== 'object') return s;
  if (NICHES.includes(raw.niche)) s.niche = raw.niche;
  if (SKINS.includes(raw.skin)) s.skin = raw.skin;
  if (raw.accent === '' || isHex(raw.accent)) s.accent = raw.accent.toLowerCase();
  if (LANGS.includes(raw.lang)) s.lang = raw.lang;
  if (typeof raw.name === 'string') s.name = raw.name.replace(/\s+/g, ' ').trim().slice(0, NAME_MAX);
  if (Array.isArray(raw.order)) {
    const known = raw.order.filter(id => BY_ID[id]);
    s.order = [...new Set([...known, ...ALL_IDS])];
  }
  if (Array.isArray(raw.on)) s.on = [...new Set(raw.on.filter(id => BY_ID[id]))];
  return s;
}

export function decodeHash(hash) {
  const params = new URLSearchParams(String(hash || '').replace(/^#/, ''));
  if (![...params.keys()].length) return null;
  const out = {};
  if (params.has('n')) out.niche = params.get('n');
  if (params.has('k')) out.skin = params.get('k');
  if (params.has('a')) { const a = params.get('a'); out.accent = a ? `#${a}` : ''; }
  if (params.has('l')) out.lang = params.get('l');
  if (params.has('b')) out.name = params.get('b');
  if (params.has('s')) {
    const on = params.get('s').split('.').filter(Boolean);
    out.on = on;
    out.order = on; // hidden sections are appended by sanitize()
  }
  return out;
}

export function encodeHash(s) {
  const params = new URLSearchParams();
  params.set('n', s.niche);
  params.set('k', s.skin);
  if (s.accent) params.set('a', s.accent.slice(1));
  params.set('l', s.lang);
  if (s.name) params.set('b', s.name);
  params.set('s', s.order.filter(id => s.on.includes(id)).join('.'));
  return `#${params.toString()}`;
}

function readStore() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || 'null'); } catch { return null; }
}

export function loadState() {
  const base = defaults();
  const stored = sanitize(readStore(), base);
  const fromHash = decodeHash(location.hash);
  if (!fromHash) return stored;
  // A shared link sets what it names; the visitor's own order for hidden sections is kept.
  const merged = sanitize(fromHash, stored);
  if (fromHash.order) merged.order = [...new Set([...fromHash.order.filter(id => BY_ID[id]), ...stored.order])];
  return merged;
}

export function saveState(s) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch { /* private mode: the URL still carries the page */ }
  try { history.replaceState(history.state, '', `${location.pathname}${location.search}${encodeHash(s)}`); } catch { /* ignore */ }
}

export function shareUrl(s) {
  return `${location.origin}${location.pathname}${encodeHash(s)}`;
}

export function query(name) {
  try { return new URLSearchParams(location.search).get(name) || ''; } catch { return ''; }
}

// Booking link ids are Firestore document ids: letters, digits, - and _.
export function linkFromUrl() {
  const id = query('link');
  return /^[A-Za-z0-9_-]{6,64}$/.test(id) ? id : '';
}

export const visible = s => s.order.filter(id => s.on.includes(id));
