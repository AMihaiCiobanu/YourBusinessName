// Before / after side by side: the two photos next to each other, each with its label, nothing to
// drag. The demo uses one photo with a dull filter as the "before", like the slider version.

import { h, photo } from '../core/dom.js';
import { altOf } from '../content/photos.js';

export default {
  render(ctx) {
    const { t, content, lang } = ctx;
    const p = content.compare.photo;
    const side = (key, cls) => h('figure', { class: `cd-fig ${cls}`, 'data-reveal': '', style: `--i:${cls === 'cd-a' ? 1 : 0}` },
      photo(p, { w: 720, h: 720, sizes: '(max-width: 700px) 50vw, 480px', alt: `${t(`compare.${key}`)}: ${altOf(p, lang)}` }),
      h('figcaption', { class: 'cd-tag', text: t(`compare.${key}`) }));
    return h('section', { class: 'sec cd-sec' },
      h('div', { class: 'wrap' },
        h('header', { class: 'sec-head center' },
          h('p', { class: 'eyebrow', text: t('compare.eyebrow') }),
          h('h2', { 'data-split': '', text: t('compare.title') }),
          h('p', { class: 'lead', text: content.compare.caption })),
        h('div', { class: 'cd-grid' }, side('before', 'cd-b'), side('after', 'cd-a')),
        h('p', { class: 'note center', text: t('compare.note') })));
  }
};
