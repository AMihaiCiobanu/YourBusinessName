// Opening hours from the app, with a live "open now" state and today's timeline: a bar from
// opening to closing with a marker at the current time that moves every minute.

import { h, icon } from '../core/dom.js';
import { weekRows, formatTime } from '../../shared/live.js';

const DAY = 1440;

function nextOpening(data, ctx) {
  const now = new Date();
  const today = (now.getDay() + 6) % 7;
  const minutes = now.getHours() * 60 + now.getMinutes();
  const days = weekRows(data).map(r => (ctx.lang === 'en' || ctx.lang === 'el' ? r.label : r.label.toLowerCase()));
  for (let k = 0; k < 7; k++) {
    const d = (today + k) % 7;
    const r = data.hours[d];
    if (!r) continue;
    if (k === 0 && minutes >= r.start) continue;
    if (k === 0) return ctx.t('hours.opensToday', { time: formatTime(r.start) });
    return ctx.t('hours.opensOn', { day: days[d], time: formatTime(r.start) });
  }
  return '';
}

function duration(min) {
  const hh = Math.floor(min / 60);
  const mm = min % 60;
  return hh ? `${hh} h${mm ? ` ${mm} min` : ''}` : `${mm} min`;
}

export default {
  render(ctx) {
    const { t } = ctx;
    return h('section', { class: 'sec hr-sec' },
      h('div', { class: 'wrap hr-grid' },
        h('div', null,
          h('header', { class: 'sec-head' },
            h('p', { class: 'eyebrow', text: t('hours.eyebrow') }),
            h('h2', { 'data-split': '', text: t('hours.title') })),
          h('div', { class: 'hr-now card', 'aria-live': 'polite' }, h('span', { class: 'skeleton', style: 'width:70%;min-height:28px' })),
          h('div', { class: 'hr-line', role: 'img' })),
        h('div', { class: 'hr-week card' }, h('table', { class: 'hr-table' }, h('tbody')),
          h('p', { class: 'note', text: t('hours.note') }))));
  },

  update(el, ctx) {
    const { t, data } = ctx;
    const now = el.querySelector('.hr-now');
    const line = el.querySelector('.hr-line');
    const tbody = el.querySelector('tbody');
    if (!data.hasHours) {
      now.replaceChildren(h('p', { text: t('hours.noHours') }));
      line.replaceChildren();
      tbody.replaceChildren();
      return;
    }
    tbody.replaceChildren(...weekRows(data).map(r => h('tr', { class: [r.isToday ? 'is-today' : '', r.range ? '' : 'is-closed'].join(' ').trim() || null },
      h('th', { scope: 'row', text: r.label }), h('td', { text: r.text }))));
    paint(el, ctx);
  },

  activate(el, ctx) {
    const timer = setInterval(() => { if (ctx.data?.hasHours) paint(el, ctx); }, 60000);
    return () => clearInterval(timer);
  }
};

function paint(el, ctx) {
  const { t, data } = ctx;
  const nowEl = el.querySelector('.hr-now');
  const line = el.querySelector('.hr-line');
  const d = new Date();
  const today = data.hours[(d.getDay() + 6) % 7];
  const minutes = d.getHours() * 60 + d.getMinutes();
  const open = !!today && minutes >= today.start && minutes < today.end;

  nowEl.replaceChildren(
    h('span', { class: `hr-dot${open ? ' is-open' : ''}`, 'aria-hidden': 'true' }),
    h('div', null,
      h('p', { class: 'hr-state', text: open ? `${t('hours.openNow')} · ${t('hours.until', { time: formatTime(today.end) })}` : t('hours.closedNow') }),
      h('p', { class: 'muted', text: open ? t('hours.closesIn', { time: duration(today.end - minutes) }) : nextOpening(data, ctx) })),
    icon('clock', 26, 'hr-clock'));

  if (!today) {
    line.setAttribute('aria-label', t('hours.closedToday'));
    line.replaceChildren(h('p', { class: 'muted', text: t('hours.closedToday') }));
    return;
  }
  const from = Math.max(0, today.start - 60);
  const to = Math.min(DAY, today.end + 60);
  const pos = v => `${(((v - from) / (to - from)) * 100).toFixed(2)}%`;
  const nowPos = Math.max(from, Math.min(to, minutes));
  line.setAttribute('aria-label', `${t('hours.timeline')}: ${formatTime(today.start)} – ${formatTime(today.end)}, ${t('hours.now').toLowerCase()} ${formatTime(minutes)}`);
  line.replaceChildren(
    h('p', { class: 'hr-line-title', 'aria-hidden': 'true', text: t('hours.today') }),
    h('div', { class: 'hr-bar', 'aria-hidden': 'true' },
      h('span', { class: 'hr-open', style: `left:${pos(today.start)};width:calc(${pos(today.end)} - ${pos(today.start)})` }),
      h('span', { class: 'hr-past', style: `width:${pos(nowPos)}` }),
      // --f (0 → 1) slides the label from left-aligned to right-aligned so it never leaves the bar.
      h('span', { class: 'hr-needle', style: `left:${pos(nowPos)};--f:${((nowPos - from) / (to - from)).toFixed(3)}` }, h('span', { text: `${t('hours.now')} ${formatTime(minutes)}` }))),
    h('div', { class: 'hr-ticks', 'aria-hidden': 'true' },
      h('span', { style: `left:${pos(today.start)}`, text: formatTime(today.start) }),
      h('span', { style: `left:${pos(today.end)}`, text: formatTime(today.end) })));
}
