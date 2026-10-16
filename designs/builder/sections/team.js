// Team flip cards: photo, name and role on the front; specialties and "Book with …" on the back.
// The flip is a real button (aria-pressed), so it works with keyboard and screen readers; on a
// mouse it also flips on hover. Reduced motion swaps the faces without the 3D turn.

import { h, photo, icon } from '../core/dom.js';
import { altOf } from '../content/photos.js';
import { bookButton } from '../../shared/live.js';

export default {
  render(ctx) {
    const { t, content, lang } = ctx;
    const cards = content.team.map((m, i) => {
      const flip = h('button', { type: 'button', class: 'tm-flip icon-btn', 'aria-pressed': 'false', 'aria-label': t('team.flip', { name: m.name }) }, icon('flip', 18));
      const card = h('li', { class: 'tm-card', 'data-reveal': '', style: `--i:${i}` },
        h('div', { class: 'tm-inner' },
          h('div', { class: 'tm-face tm-front' },
            photo(m.photo, { w: 600, h: 760, sizes: '(max-width: 700px) 90vw, 360px', alt: altOf(m.photo, lang) }),
            h('div', { class: 'tm-cap' }, h('h3', { text: m.name }), h('p', { text: m.role }))),
          h('div', { class: 'tm-face tm-back', 'aria-hidden': 'true' },
            h('p', { class: 'eyebrow', text: t('team.specialties') }),
            h('h3', { text: m.name }),
            h('ul', { class: 'tm-tags' }, m.tags.map(tag => h('li', { class: 'chip', text: tag }))),
            bookButton(t('common.bookWith', { name: m.name }), { linkId: ctx.linkId, className: 'btn btn-sm tm-book' }))),
        flip);
      const back = card.querySelector('.tm-back');
      const front = card.querySelector('.tm-front');
      const bookBtn = back.querySelector('.tm-book');
      bookBtn.tabIndex = -1;
      flip.addEventListener('click', () => {
        const on = flip.getAttribute('aria-pressed') !== 'true';
        flip.setAttribute('aria-pressed', String(on));
        flip.setAttribute('aria-label', t(on ? 'team.flipBack' : 'team.flip', { name: m.name }));
        card.classList.toggle('is-flipped', on);
        back.setAttribute('aria-hidden', String(!on));
        front.setAttribute('aria-hidden', String(on));
        bookBtn.tabIndex = on ? 0 : -1;
      });
      return card;
    });
    return h('section', { class: 'sec tm-sec' },
      h('div', { class: 'wrap' },
        h('header', { class: 'sec-head' },
          h('p', { class: 'eyebrow', text: t('team.eyebrow') }),
          h('h2', { 'data-split': '', text: t('team.title') })),
        h('ul', { class: 'tm-grid' }, cards),
        h('p', { class: 'note', text: t('common.sampleNote') })));
  }
};
