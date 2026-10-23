// Masonry gallery: photos of mixed shapes in columns, Pinterest style. Plain CSS columns, no
// library; tapping a photo opens the shared full-screen viewer (lightbox.js picks up .gallery).

import { h, photo } from '../core/dom.js';
import { altOf } from '../content/photos.js';

// Width × height of each tile in turn, so the columns end up uneven like a real feed.
const SHAPES = [[600, 800], [600, 600], [600, 450], [600, 750], [600, 900], [600, 600], [600, 480], [600, 800], [600, 680], [600, 560]];

export default {
  render(ctx) {
    const { t, content, lang } = ctx;
    const shots = content.photos.slice(0, SHAPES.length);
    return h('section', { class: 'sec ms-sec' },
      h('div', { class: 'wrap' },
        h('header', { class: 'sec-head center' },
          h('p', { class: 'eyebrow', text: t('masonry.eyebrow') }),
          h('h2', { 'data-split': '', text: t('masonry.title') }),
          h('p', { class: 'lead', text: t('masonry.lead') })),
        h('ul', { class: 'ms-grid gallery' }, shots.map((p, i) => h('li', { class: 'ms-cell', 'data-reveal': '', style: `--i:${i % 3}` },
          h('figure', { class: 'ms-fig' },
            photo(p, { w: SHAPES[i][0], h: SHAPES[i][1], sizes: '(max-width: 600px) 50vw, 360px', alt: altOf(p, lang) }))))),
        h('p', { class: 'note center', text: t('common.sampleNote') })));
  }
};
