// Service cards that tilt in 3D under the mouse or a finger, with a moving light reflex.
// Shows the first six services from the app; the price book / price list has the rest.

import { h, icon } from '../core/dom.js';
import { tilt } from '../core/motion.js';
import { bookButton, formatDuration } from '../../shared/live.js';

const MAX = 6;
const ICONS = { barber: 'scissors', beauty: 'sparkle', nails: 'heart', spa: 'heart', detailing: 'car', trainer: 'user', dental: 'sparkle', derma: 'heart', clinic: 'heart', tattoo: 'sparkle' };

export default {
  render(ctx) {
    const { t } = ctx;
    return h('section', { class: 'sec svc-sec' },
      h('div', { class: 'wrap' },
        h('header', { class: 'sec-head' },
          h('p', { class: 'eyebrow', text: t('services.eyebrow') }),
          h('h2', { 'data-split': '', text: t('services.title') }),
          h('p', { class: 'lead', text: t('services.lead') })),
        h('div', { class: 'svc-grid', 'aria-live': 'polite' }, Array.from({ length: 3 }, () => h('div', { class: 'svc-card card svc-skel' }, h('span', { class: 'skeleton', style: 'width:60%' }), h('span', { class: 'skeleton', style: 'width:35%' }), h('span', { class: 'skeleton', style: 'width:85%;min-height:40px' })))),
        h('p', { class: 'svc-more' })));
  },

  update(el, ctx) {
    const { t, data } = ctx;
    const grid = el.querySelector('.svc-grid');
    const more = el.querySelector('.svc-more');
    if (data.failed || !data.services.length) {
      grid.replaceChildren(h('div', { class: 'data-error card' }, t('common.failed'), h('br'), bookButton(t('common.failedLink'), { linkId: ctx.linkId, className: 'link' })));
      more.replaceChildren();
      return;
    }
    const items = data.services.slice(0, MAX);
    grid.replaceChildren(...items.map((svc, i) => {
      const card = h('article', { class: 'svc-card card', 'data-reveal': '', style: `--i:${i % 3}` },
        h('span', { class: 'svc-glare', 'aria-hidden': 'true' }),
        h('div', { class: 'svc-top' },
          h('span', { class: 'svc-icon', 'aria-hidden': 'true' }, icon(ICONS[ctx.niche] || 'sparkle', 22)),
          h('span', { class: 'svc-no', 'aria-hidden': 'true', text: String(i + 1).padStart(2, '0') })),
        h('h3', { class: 'svc-name', text: svc.name }),
        h('p', { class: 'svc-meta' }, h('span', { text: formatDuration(svc.durationMinutes) }), h('strong', { text: ctx.priceText(svc) })),
        svc.description ? h('p', { class: 'svc-desc', text: svc.description }) : null,
        bookButton(t('common.bookNow'), { linkId: ctx.linkId, service: svc, className: 'svc-book' }));
      card.querySelector('.svc-book').appendChild(h('span', { class: 'sr-only', text: `: ${svc.name}` }));
      return card;
    }));
    const target = ctx.isOn('book') || ctx.isOn('prices') ? ctx.anchor('book', 'prices') : '';
    more.replaceChildren(data.services.length > MAX && target ? h('a', { class: 'btn btn-ghost', href: target, text: t('common.seeAll', { n: data.services.length }) }) : '');
    // Cards added after mount need the reveal + tilt wiring again.
    el.dispatchEvent(new CustomEvent('bx:content', { bubbles: false }));
  },

  activate(el) {
    let stops = [];
    const wire = () => {
      stops.forEach(fn => fn());
      stops = [...el.querySelectorAll('.svc-card:not(.svc-skel)')].map(card => tilt(card, { max: 9 }));
      for (const card of el.querySelectorAll('[data-reveal]:not(.is-in)')) card.classList.add('is-in');
    };
    wire();
    el.addEventListener('bx:content', wire);
    return () => { stops.forEach(fn => fn()); el.removeEventListener('bx:content', wire); };
  }
};
