// UI and section texts. Each language is one module in i18n/; only the active one is loaded.
// t('a.b.c', { name }) looks up a dotted key and fills {placeholders}. A missing key returns the
// English text if it is loaded, else the key itself, so a gap is visible but never breaks the page.

let dict = {};
let fallback = {};
let lang = 'en';

const lookup = (src, key) => key.split('.').reduce((node, part) => (node == null ? node : node[part]), src);

export async function loadLang(code) {
  const [main, en] = await Promise.all([
    import(`../i18n/${code}.js`),
    code === 'en' ? null : import('../i18n/en.js').catch(() => null)
  ]);
  dict = main.default;
  fallback = en ? en.default : dict;
  lang = code;
  document.documentElement.lang = code;
}

export function t(key, vars) {
  let value = lookup(dict, key);
  if (value == null) value = lookup(fallback, key);
  if (value == null) return key;
  if (typeof value !== 'string' || !vars) return value;
  return value.replace(/\{(\w+)\}/g, (_, name) => (vars[name] != null ? String(vars[name]) : ''));
}

// English text whatever the page language: the "Get my page" email is always read in English.
export function tEn(key) {
  const value = lookup(fallback, key);
  return typeof value === 'string' ? value : key;
}

export const getLang = () => lang;

// Number format, currency of the sample prices (content/index.js converts them) and the language's
// own name (the selector) and English name (the "Get my page" email).
const LANG_META = {
  en: { locale: 'en-GB', currency: 'EUR', name: 'English', en: 'English' },
  ro: { locale: 'ro-RO', currency: 'RON', name: 'Română', en: 'Romanian' },
  fr: { locale: 'fr-FR', currency: 'EUR', name: 'Français', en: 'French' },
  es: { locale: 'es-ES', currency: 'EUR', name: 'Español', en: 'Spanish' },
  pt: { locale: 'pt-PT', currency: 'EUR', name: 'Português', en: 'Portuguese' },
  pl: { locale: 'pl-PL', currency: 'PLN', name: 'Polski', en: 'Polish' },
  it: { locale: 'it-IT', currency: 'EUR', name: 'Italiano', en: 'Italian' },
  el: { locale: 'el-GR', currency: 'EUR', name: 'Ελληνικά', en: 'Greek' }
};
const metaOf = code => LANG_META[code] || LANG_META.en;
export const localeOf = code => metaOf(code).locale;
export const currencyOf = code => metaOf(code).currency;
export const langName = code => metaOf(code).name;
export const langNameEn = code => metaOf(code).en;
