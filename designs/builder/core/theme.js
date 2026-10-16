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

export function accentFor(skin, accent) {
  return /^#[0-9a-f]{6}$/i.test(accent || '') ? accent.toLowerCase() : SKIN_META[skin].accent;
}

export function applyTheme({ skin, accent }) {
  const meta = SKIN_META[skin] || SKIN_META.luxe;
  const base = accentFor(skin, accent);
  const root = document.documentElement;
  root.dataset.skin = skin;
  const ink = contrast(base, '#ffffff') >= contrast(base, '#111111') ? '#ffffff' : '#111111';
  const text = readable(base, meta.text, [meta.bg, meta.surface]);
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
