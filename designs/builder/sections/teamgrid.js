// Team as profile cards: a round photo, name, role, specialties and a "Book with …" button, all
// visible at once (no flipping).

import { h, photo } from '../core/dom.js';
import { altOf } from '../content/photos.js';
import { bookButton } from '../../shared/live.js';

export default {
  render(ctx) {
    const { t, content, lang } = ctx;
    return h('section', { class: 'sec tg-sec' },
      h('div', { class: 'wrap' },
        h('header', { class: 'sec-head center' },
          h('p', { class: 'eyebrow', text: t('team.eyebrow') }),
          h('h2', { 'data-split': '', text: t('team.title') })),
        h('ul', { class: 'tg-grid' }, content.team.map((m, i) => h('li', { class: 'tg-card card', 'data-reveal': '', style: `--i:${i}` },
          photo(m.photo, { w: 240, h: 240, sizes: '120px', alt: altOf(m.photo, lang), className: 'tg-photo' }),
          h('h3', { class: 'tg-name', text: m.name }),
          h('p', { class: 'tg-role', text: m.role }),
          h('ul', { class: 'tg-tags', 'aria-label': t('team.specialties') }, m.tags.map(tag => h('li', { class: 'chip', text: tag }))),
          bookButton(t('common.bookWith', { name: m.name }), { linkId: ctx.linkId, className: 'btn btn-sm btn-ghost tg-book' })))),
        h('p', { class: 'note center', text: t('common.sampleNote') })));
  }
};
