// Instagram-style grid: square photos with a hover overlay; tapping one opens the shared
// full-screen viewer (lightbox.js picks up the .gallery class). On a client page the photos can be
// the client's own posts, picked by hand.

import { h, photo, icon } from '../core/dom.js';
import { altOf } from '../content/photos.js';

export default {
  render(ctx) {
    const { t, content, lang } = ctx;
    const shots = [...content.photos, ...content.photos].slice(0, 9);
    return h('section', { class: 'sec ig-sec' },
      h('div', { class: 'wrap' },
        h('header', { class: 'sec-head ig-head' },
          h('div', null,
            h('p', { class: 'eyebrow', text: t('insta.eyebrow') }),
            h('h2', { text: t('insta.title') }),
            h('p', { class: 'lead', text: t('insta.lead') })),
          h('button', { type: 'button', class: 'btn btn-ghost', 'data-demo': 'social' }, icon('instagram', 18), t('insta.follow'))),
        h('ul', { class: 'ig-grid gallery' }, shots.map((p, i) => h('li', { class: 'ig-cell', 'data-reveal': '', style: `--i:${i % 3}` },
          h('figure', { class: 'ig-fig' },
            photo(p, { w: 480, h: 480, sizes: '(max-width: 600px) 33vw, 380px', alt: altOf(p, lang) }),
            h('figcaption', { class: 'ig-over', 'aria-hidden': 'true' }, icon('heart', 18), String(40 + ((i * 37) % 260)))))))));
  }
};
