// Booking request form. The service list comes from the app; the times offered for a date follow
// the opening hours of that day (30-minute steps, minus the service length, nothing in the past).
// Nothing is sent anywhere: on the demo it explains what would happen; on a page with a booking
// link it opens the real booking calendar on the chosen service (where the client confirms).

import { h } from '../core/dom.js';
import { bookButton, formatDuration, formatTime } from '../../shared/live.js';

const STEP = 30;
const pad = n => String(n).padStart(2, '0');
const isoDay = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

function slots(data, service, dateStr) {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split('-').map(Number);
  const day = new Date(y, m - 1, d);
  const range = data.hours[(day.getDay() + 6) % 7];
  if (!range) return [];
  const length = service?.durationMinutes || STEP;
  const now = new Date();
  const isToday = isoDay(now) === dateStr;
  const minNow = now.getHours() * 60 + now.getMinutes() + 30;
  const out = [];
  for (let t = range.start; t + length <= range.end; t += STEP) {
    if (isToday && t < minNow) continue;
    // Demo: a few times look taken, the same ones on every visit.
    if (!data.live && ((t / STEP + d) % 4 === 1)) continue;
    out.push(t);
  }
  return out;
}

export default {
  render(ctx) {
    const { t } = ctx;
    const today = isoDay(new Date());
    const max = isoDay(new Date(Date.now() + 60 * 864e5));
    const field = (id, label, control) => h('div', { class: 'bf-field' }, h('label', { for: id, text: label }), control);
    const form = h('form', { class: 'bf-form card', novalidate: true },
      field('bf-service', t('booking.service'), h('select', { id: 'bf-service', name: 'service', required: true }, h('option', { value: '', text: t('common.loading') }))),
      h('div', { class: 'bf-row' },
        field('bf-date', t('booking.date'), h('input', { id: 'bf-date', name: 'date', type: 'date', min: today, max, required: true })),
        field('bf-time', t('booking.time'), h('select', { id: 'bf-time', name: 'time', required: true, disabled: true }, h('option', { value: '', text: t('booking.pickDate') })))),
      h('p', { class: 'bf-day-note', 'aria-live': 'polite' }),
      h('div', { class: 'bf-row' },
        field('bf-name', t('booking.name'), h('input', { id: 'bf-name', name: 'name', type: 'text', autocomplete: 'name', required: true, maxlength: '60' })),
        field('bf-phone', t('booking.phone'), h('input', { id: 'bf-phone', name: 'phone', type: 'tel', autocomplete: 'tel', inputmode: 'tel', required: true, maxlength: '20' }))),
      field('bf-note', t('booking.note'), h('textarea', { id: 'bf-note', name: 'note', rows: '3', maxlength: '300' })),
      h('p', { class: 'bf-error', role: 'alert' }),
      h('button', { type: 'submit', class: 'btn bf-submit', text: t('booking.submit') }));

    const section = h('section', { class: 'sec bf-sec' },
      h('div', { class: 'wrap bf-grid' },
        h('header', { class: 'sec-head' },
          h('p', { class: 'eyebrow', text: t('booking.eyebrow') }),
          h('h2', { 'data-split': '', text: t('booking.title') }),
          h('p', { class: 'lead', text: t('booking.lead') })),
        form));

    const $ = sel => form.querySelector(sel);
    const service = () => ctx.data?.services.find(s => s.id === $('#bf-service').value);
    const refreshTimes = () => {
      const list = ctx.data ? slots(ctx.data, service(), $('#bf-date').value) : null;
      const select = $('#bf-time');
      const note = $('.bf-day-note');
      note.textContent = '';
      if (!list) { select.replaceChildren(h('option', { value: '', text: t('booking.pickDate') })); select.disabled = true; return; }
      if (!list.length) {
        note.textContent = ctx.data.hours[(new Date(`${$('#bf-date').value}T12:00`).getDay() + 6) % 7] ? t('booking.noSlots') : t('booking.closedDay');
        select.replaceChildren(h('option', { value: '', text: '—' }));
        select.disabled = true;
        return;
      }
      const keep = select.value;
      select.replaceChildren(h('option', { value: '', text: t('booking.choose') }), ...list.map(m => h('option', { value: String(m), text: formatTime(m), selected: String(m) === keep })));
      select.disabled = false;
    };
    $('#bf-service').addEventListener('change', refreshTimes);
    $('#bf-date').addEventListener('change', refreshTimes);
    section._refreshTimes = refreshTimes;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const missing = [];
      for (const [sel, key] of [['#bf-service', 'service'], ['#bf-date', 'date'], ['#bf-time', 'time'], ['#bf-name', 'name'], ['#bf-phone', 'phone']]) {
        const input = $(sel);
        const bad = !input.value.trim();
        input.setAttribute('aria-invalid', String(bad));
        if (bad) missing.push(t(`booking.${key}`).toLowerCase());
      }
      const error = $('.bf-error');
      if (missing.length) {
        error.textContent = t('booking.missing', { fields: missing.join(', ') });
        form.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }
      error.textContent = '';
      if (ctx.linkId) {
        // Hand over to the real booking calendar on this service (live.js opens it in a dialog).
        const svc = service();
        const opener = bookButton('', { linkId: ctx.linkId, service: svc });
        opener.hidden = true;
        document.body.appendChild(opener);
        opener.click();
        opener.remove();
        return;
      }
      ctx.toast(t('common.demoForm'));
    });
    return section;
  },

  update(el, ctx) {
    const { t, data } = ctx;
    const select = el.querySelector('#bf-service');
    const keep = select.value;
    select.replaceChildren(h('option', { value: '', text: t('booking.choose') }),
      ...data.services.map(s => h('option', { value: s.id, text: `${s.name} · ${formatDuration(s.durationMinutes)} · ${ctx.priceText(s)}`, selected: s.id === keep })));
    el._refreshTimes?.();
  }
};
