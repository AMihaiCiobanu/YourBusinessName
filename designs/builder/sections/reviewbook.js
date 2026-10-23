// Reviews as a guest book with turning pages: the same book as the price menu (book.js), with one
// review per page. Needs no data from the app, so it opens as soon as the library is in.

import { h, icon, photo } from '../core/dom.js';
import { altOf } from '../content/photos.js';
import { bookButton } from '../../shared/live.js';
import { makeBook, page } from './book.js?v=4'; // same ?v= as VERSION in core/registry.js

function buildPages(ctx, size) {
  const { t, content, lang, name } = ctx;
  const shots = content.photos;
  const rating = new Intl.NumberFormat(lang === 'ro' ? 'ro-RO' : 'en-GB', { minimumFractionDigits: 1 }).format(content.stats[2].value);
  const stars = () => h('span', { class: 'bk-stars', role: 'img', 'aria-label': '5/5' }, Array.from({ length: 5 }, () => icon('star', 16)));
  const out = [];

  out.push(page('cover', [
    h('span', { class: 'bk-ornament', 'aria-hidden': 'true' }),
    h('p', { class: 'bk-cover-name', text: name }),
    h('p', { class: 'bk-cover-title', text: t('reviewbook.coverTitle') }),
    h('p', { class: 'bk-cover-sub', text: `${t('reviewbook.coverSub')} · ${new Date().getFullYear()}` })
  ], { hard: true }));

  out.push(page('intro', [
    h('h3', { class: 'bk-title', text: t('reviewbook.introTitle') }),
    h('p', { class: 'bk-rating', text: rating }),
    stars(),
    h('p', { class: 'bk-text', text: t('reviews.summary', { rating, count: 128 }) })
  ]));

  content.reviews.forEach((r, i) => {
    const p = page('review', [
      stars(),
      h('blockquote', { class: 'bk-quote', text: `“${r.quote}”` }),
      h('p', { class: 'bk-who' }, h('strong', { text: r.name }), h('span', { text: r.service })),
      h('span', { class: 'bk-sample', text: t('reviews.sample') })
    ]);
    p.firstChild.appendChild(h('span', { class: 'bk-num', text: String(i + 3) }));
    out.push(p);
  });

  const closing = page('closing', [
    h('h3', { class: 'bk-title', text: t('reviewbook.closingTitle') }),
    h('p', { class: 'bk-text', text: t('reviewbook.closingText') }),
    bookButton(t('common.book'), { linkId: ctx.linkId, className: 'btn btn-sm bk-cta' })
  ]);
  // Keep an even count before the back cover.
  if ((out.length + 2) % 2 === 1) out.push(page('photo', [photo(shots[2] || shots[0], { w: 520, h: 728, sizes: `${size.w}px`, alt: altOf(shots[2] || shots[0], lang) })]));
  out.push(closing);
  out.push(page('back', [h('span', { class: 'bk-ornament', 'aria-hidden': 'true' }), h('p', { class: 'bk-cover-name', text: name })], { hard: true }));
  for (const p of out) p.style.setProperty('--pw', `${size.w}px`);
  return out;
}

export default makeBook({ key: 'reviewbook', pages: buildPages, check: () => null });
