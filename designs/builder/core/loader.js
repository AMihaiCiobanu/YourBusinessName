// Loads styles and third-party libraries once, on demand. Libraries come from jsDelivr with an exact
// version, and only when a section that needs them is switched on and close to the screen.

const cache = new Map();

function once(key, make) {
  if (!cache.has(key)) cache.set(key, make().catch(err => { cache.delete(key); throw err; }));
  return cache.get(key);
}

export function loadStyle(href) {
  return once(`css:${href}`, () => new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => resolve(link);
    link.onerror = () => reject(new Error(`style failed: ${href}`));
    document.head.appendChild(link);
  }));
}

export function loadScript(src) {
  return once(`js:${src}`, () => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`script failed: ${src}`));
    document.head.appendChild(script);
  }));
}

const SWIPER = 'https://cdn.jsdelivr.net/npm/swiper@11.2.10';
const PAGE_FLIP = 'https://cdn.jsdelivr.net/npm/page-flip@2.0.7/dist/js/page-flip.browser.js';

export const libs = {
  swiper: () => once('lib:swiper', async () => {
    await Promise.all([loadStyle(`${SWIPER}/swiper-bundle.min.css`), loadScript(`${SWIPER}/swiper-bundle.min.js`)]);
    if (!window.Swiper) throw new Error('Swiper missing');
    return window.Swiper;
  }),
  pageFlip: () => once('lib:pageflip', async () => {
    await loadScript(PAGE_FLIP);
    if (!window.St?.PageFlip) throw new Error('PageFlip missing');
    return window.St.PageFlip;
  })
};

// Section stylesheets live next to their scripts.
export function sectionStyle(id) {
  return loadStyle(new URL(`../sections/${id}.css?v=3`, import.meta.url).href);
}
