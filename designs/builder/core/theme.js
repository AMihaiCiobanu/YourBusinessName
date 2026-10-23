// Themes are CSS (styles.css, [data-skin]); this file only applies the skin and derives the accent
// colours, so any colour a client picks stays readable:
//   --accent        the chosen colour (backgrounds, borders, decorations)
//   --accent-ink    black or white text on top of the accent, whichever contrasts more
//   --accent-text   the accent nudged towards the text colour until it reaches 4.5:1 on the page
//                   background and on cards (WCAG AA for normal text)
//   --accent-soft   a light wash of the accent for chips and highlights

export const SKIN_META = {
  luxe: { accent: '#c9a961', bg: '#0e0d0c', surface: '#1b1916', text: '#f4efe7', dark: true },
  clean: { accent: '#2f6f62', bg: '#fbfaf8', surface: '#ffffff', text: '#1c1b19', dark: false },
  bold: { accent: '#ff4d6d', bg: '#fff4e6', surface: '#ffffff', text: '#17112e', dark: false }
};

// Seasonal palettes (core/season.js): they replace the skin's colours while a season is on, the skin
// keeps its fonts and shapes. Same values as season/palettes.css (that file paints the first frame).
export const SEASON_META = {
  halloween: { accent: '#ff7a1a', bg: '#150f1f', bg2: '#1d1429', surface: '#251a35', text: '#f4ecff', dark: true },
  blackfriday: { accent: '#ffd60a', bg: '#0a0a0a', bg2: '#121212', surface: '#1a1a1a', text: '#fafafa', dark: true },
  christmas: { accent: '#ef4444', bg: '#0f1f17', bg2: '#132a1f', surface: '#183326', text: '#f5f1e8', dark: true },
  newyear: { accent: '#f5c542', bg: '#0b1026', bg2: '#10173a', surface: '#161e47', text: '#f3f1ff', dark: true },
  valentine: { accent: '#e0245e', bg: '#fff3f6', bg2: '#ffe8ef', surface: '#ffffff', text: '#3a0f1f', dark: false },
  spring: { accent: '#e5486b', bg: '#fbfcf7', bg2: '#f0f6ea', surface: '#ffffff', text: '#1f2a1c', dark: false },
  easter: { accent: '#7cb342', bg: '#fdfaf2', bg2: '#f4efff', surface: '#ffffff', text: '#2b2540', dark: false },
  summer: { accent: '#ff8a3d', bg: '#f2fbfc', bg2: '#e2f4f6', surface: '#ffffff', text: '#0f2a33', dark: false }
};

export const ACCENT_PRESETS = ['#c9a961', '#b87333', '#e8553d', '#ff4d6d', '#d46aa6', '#8b5cf6', '#4361ee', '#2f6f62', '#0e9f9a', '#5c8a3a'];

function rgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
const toHex = c => `#${c.map(v => Math.round(v).toString(16).padStart(2, '0')).join('')}`;

function luminance(hex) {
  const [r, g, b] = rgb(hex).map(v => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}

const mix = (a, b, t) => toHex(rgb(a).map((v, i) => v + (rgb(b)[i] - v) * t));

// Moves `color` towards `target` in small steps until it reaches `ratio` against every background.
function readable(color, target, backgrounds, ratio = 4.5) {
  for (let t = 0; t <= 1.0001; t += 0.05) {
    const c = mix(color, target, t);
    if (backgrounds.every(bg => contrast(c, bg) >= ratio)) return c;
  }
  return target;
}

const metaFor = (skin, season) => SEASON_META[season] || SKIN_META[skin] || SKIN_META.luxe;

// The colour the visitor picked, else the season's, else the skin's.
export function accentFor(skin, accent, season = '') {
  return /^#[0-9a-f]{6}$/i.test(accent || '') ? accent.toLowerCase() : metaFor(skin, season).accent;
}

// `season` is the resolved season ('' for none), see core/season.js.
export function applyTheme({ skin, accent }, season = '') {
  const meta = metaFor(skin, season);
  const base = accentFor(skin, accent, season);
  const root = document.documentElement;
  root.dataset.skin = skin;
  if (season) root.dataset.season = season; else delete root.dataset.season;
  const ink = contrast(base, '#ffffff') >= contrast(base, '#111111') ? '#ffffff' : '#111111';
  // Seasons also check their tinted section background (--bg-2), which is further from white / black.
  const text = readable(base, meta.text, [meta.bg, meta.surface, meta.bg2 || meta.bg]);
  const vars = {
    '--accent': base,
    '--accent-ink': ink,
    '--accent-text': text,
    '--accent-soft': mix(meta.bg, base, meta.dark ? 0.18 : 0.12),
    // live.js dialog + toast colours
    '--lv-surface': meta.surface,
    '--lv-text': meta.text,
    '--lv-accent': base
  };
  for (const [k, v] of Object.entries(vars)) root.style.setProperty(k, v);
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = meta.bg;
  return { ...meta, accent: base, ink, accentText: text };
}

// RGB in 0..1 for WebGL.
export function glColor(hex) { return rgb(hex).map(v => v / 255); }
