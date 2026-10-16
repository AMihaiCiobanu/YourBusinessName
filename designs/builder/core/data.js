// Services and hours for the sections. Same source as every other page in the demo:
// designs/shared/live.js, which reads a booking link the way NailsByClemi does
// (bookingLinks/{id} → users/{uid}/servicii + users/{uid}/setari/bookingPublic, 5-minute cache).
//
// Without a link (the demo) the sample from content/ is passed through the same function, so
// the sections get exactly the shape a real page gets: { currency, services, hours, hasHours,
// live, failed }. With a link, the first call may hand over cached data, then fresh data.

import { loadData, setLang as setLiveLang, formatPrice } from '../../shared/live.js';
import { t } from './i18n.js';

let lastLive = null;
let liveStarted = '';

export function setDataLang(lang) { setLiveLang(lang); }

export function startData({ linkId, sample }, onData) {
  if (!linkId) {
    loadData({ linkId: '', sample }, onData);
    return;
  }
  if (liveStarted === linkId && lastLive) { onData(lastLive); return; }
  liveStarted = linkId;
  loadData({ linkId, sample }, data => { lastLive = data; onData(data); });
}

// Price text for one service, following the app's own settings.
export function priceText(service, currency) {
  if (service.showPrice === false) return t('common.onRequest');
  return formatPrice(service.price, currency);
}

export const hasKnownPrice = s => s.showPrice !== false;
