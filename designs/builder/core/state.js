// The page configuration: one small JSON object, mirrored in the URL hash (so a link reproduces the
// page) and in localStorage (so a returning visitor finds their page again). The hash wins over
// storage; anything missing or invalid falls back to the defaults.
//
// Hash format, kept short so it fits in the "Get my page" email:
//   #n=barber&k=luxe&a=c9a961&l=ro&b=Studio%20Ana&f=halloween&s=hero.prices-book.gallery-insta.team
// n niche · k skin · a accent (hex, empty = theme default) · l language · b business name ·
// f seasonal theme (core/season.js; left out when 'none') ·
// s visible sections in order, `group-type` (just `group` when it has one type). Old links that name
// sections by their former ids (`coverflow`, `book`) still work. `?link=<id>` and `?sample=many`
// stay in the query string (preview only).
//
// items: every row of the builder, in page order: { id, group, type, on }. `id` is unique on the
// page (`gallery`, `gallery2`) and names the section element (`#s-gallery2`).

import { GROUPS, GROUP, LEGACY, DEFAULT_ON, typeOf } from './registry.js';
import { SEASON_CHOICES } from './season.js';

export const NICHES = ['beauty', 'nails', 'barber', 'spa', 'detailing', 'trainer', 'dental', 'derma', 'clinic', 'tattoo'];
export const SKINS = ['luxe', 'clean', 'bold'];
export const LANGS = ['en', 'ro', 'fr', 'es', 'pt', 'pl', 'it', 'el'];
const STORE_KEY = 'builder:v2';
const OLD_STORE_KEY = 'builder:v1';
const NAME_MAX = 40;

function defaultLang() {
  try { const code = (navigator.language || '').toLowerCase().slice(0, 2); return LANGS.includes(code) ? code : 'en'; } catch { return 'en'; }
}

// ---------- items ----------

// `gallery-insta`, `hero`, or an old section id → { group, type }, or null.
export function parseToken(token) {
  if (LEGACY[token]) { const [group, type] = LEGACY[token]; return { group, type }; }
  const [group, type] = String(token).split('-', 2);
  const g = GROUP[group];
  if (!g) return null;
  if (type === undefined) return { group, type: g.types[0].id };
  return g.types.some(ty => ty.id === type) ? { group, type } : null;
}

export function itemToken(item) {
  return GROUP[item.group].types.length > 1 ? `${item.group}-${typeOf(item).id}` : item.group;
}

export function nextId(items, group) {
  if (!items.some(it => it.id === group)) return group;
  let n = 2;
  while (items.some(it => it.id === `${group}${n}`)) n++;
  return `${group}${n}`;
}

// Any list of { group, type, on } → valid items: unknown entries dropped, a single-use group kept
// once (its first visible copy, else its first), every group present (missing ones appended, off),
// fresh ids. `prune` also drops hidden copies of a multi group that has a visible one, so a link,
// a ready page or an old save does not leave stray unticked galleries in the list.
function normalize(list, { prune = false } = {}) {
  const valid = (Array.isArray(list) ? list : [])
    .filter(it => it && GROUP[it.group])
    .map(it => ({ group: it.group, type: typeOf(it).id, on: !!it.on }));
  const keep = new Set();
  for (const g of GROUPS) {
    const mine = valid.filter(it => it.group === g.id);
    if (!mine.length) continue;
    let kept;
    if (!g.multi) kept = [mine.find(it => it.on) || mine[0]];
    else if (prune && mine.some(it => it.on)) kept = mine.filter(it => it.on);
    else if (prune) kept = mine.slice(0, 1);
    else kept = mine;
    kept.forEach(it => keep.add(it));
  }
  const out = valid.filter(it => keep.has(it));
  for (const g of GROUPS) if (!out.some(it => it.group === g.id)) out.push({ group: g.id, type: g.types[0].id, on: false });
  const withIds = [];
  for (const it of out) withIds.push({ id: nextId(withIds, it.group), ...it });
  return withIds;
}

// Visible tokens first, then the rows of `rest` (turned off), e.g. the visitor's current list.
export function itemsFrom(tokens, rest = []) {
  const on = tokens.map(parseToken).filter(Boolean).map(it => ({ ...it, on: true }));
  return normalize([...on, ...rest.map(it => ({ ...it, on: false }))], { prune: true });
}

export function defaults() {
  return {
    niche: 'beauty',
    skin: 'luxe',
    accent: '',
    lang: defaultLang(),
    name: '',
    season: 'none',
    items: itemsFrom(DEFAULT_ON)
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
  if (SEASON_CHOICES.includes(raw.season)) s.season = raw.season;
  if (typeof raw.name === 'string') s.name = raw.name.replace(/\s+/g, ' ').trim().slice(0, NAME_MAX);
  if (Array.isArray(raw.items)) s.items = normalize(raw.items);
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
  if (params.has('f')) out.season = params.get('f');
  if (params.has('s')) out.tokens = params.get('s').split('.').filter(Boolean);
  return out;
}

export function encodeHash(s) {
  const params = new URLSearchParams();
  params.set('n', s.niche);
  params.set('k', s.skin);
  if (s.accent) params.set('a', s.accent.slice(1));
  params.set('l', s.lang);
  if (s.name) params.set('b', s.name);
  if (s.season && s.season !== 'none') params.set('f', s.season);
  params.set('s', visible(s).map(itemToken).join('.'));
  return `#${params.toString()}`;
}

function readStore() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (saved) return saved;
    // A save from before groups: { order: [ids], on: [ids] } with the old section ids.
    const old = JSON.parse(localStorage.getItem(OLD_STORE_KEY) || 'null');
    if (!old || !Array.isArray(old.order) || !Array.isArray(old.on)) return old;
    const rows = old.order.map(id => { const it = parseToken(id); return it && { ...it, on: old.on.includes(id) }; });
    return { ...old, items: normalize(rows, { prune: true }) };
  } catch { return null; }
}

export function loadState() {
  const base = defaults();
  const stored = sanitize(readStore(), base);
  const fromHash = decodeHash(location.hash);
  if (!fromHash) return stored;
  // A shared link sets what it names; the visitor's own hidden rows are kept, after it.
  const merged = sanitize(fromHash, stored);
  if (fromHash.tokens) merged.items = itemsFrom(fromHash.tokens, stored.items);
  return merged;
}

export function saveState(s) {
  const { items, ...rest } = s;
  const save = { ...rest, items: items.map(({ group, type, on }) => ({ group, type, on })) };
  try { localStorage.setItem(STORE_KEY, JSON.stringify(save)); } catch { /* private mode: the URL still carries the page */ }
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

export const visible = s => s.items.filter(it => it.on);
