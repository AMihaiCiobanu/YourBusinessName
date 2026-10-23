// Seasonal themes: colours and decorations laid over the page for a holiday (Halloween, Christmas…),
// on top of whichever theme (skin) is picked. The palette is CSS (season/palettes.css, also mirrored
// in core/theme.js for the accent maths); the decorations load on demand (season/decor.js).
//
// state.season is 'none', 'auto' (picked by today's date, the way a real client page switches itself,
// see NailsByClemi's Halloween) or one of SEASONS.

export const SEASONS = ['halloween', 'blackfriday', 'christmas', 'newyear', 'valentine', 'spring', 'easter', 'summer'];
export const SEASON_CHOICES = ['none', 'auto', ...SEASONS];

// Easter Sunday as [month (0-based), day]. Western: Gregorian computus (Meeus/Jones/Butcher).
// Orthodox: Julian computus, moved to the Gregorian calendar (+13 days, valid 1900–2099).
function westernEaster(y) {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4;
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
  const hh = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - hh - k) % 7, m = Math.floor((a + 11 * hh + 22 * l) / 451);
  return new Date(y, Math.floor((hh + l - 7 * m + 114) / 31) - 1, ((hh + l - 7 * m + 114) % 31) + 1);
}
function orthodoxEaster(y) {
  const a = y % 4, b = y % 7, c = y % 19, d = (19 * c + 15) % 30, e = (2 * a + 4 * b - d + 34) % 7;
  const month = Math.floor((d + e + 114) / 31), day = ((d + e + 114) % 31) + 1;
  return new Date(y, month - 1, day + 13);
}

const DAY = 86400000;

// The season for a date: Halloween 15 Oct – 2 Nov (as on NailsByClemi), Black Friday 20–30 Nov,
// Christmas 1–26 Dec, New Year 27 Dec – 7 Jan, Valentine's 7–15 Feb, spring (Mărțișor, 8 March)
// 1–10 Mar, Easter the 10 days before to 1 day after (Orthodox date for RO and EL pages),
// summer 15 Jun – 31 Aug.
export function seasonForDate(date = new Date(), lang = 'en') {
  const m = date.getMonth(), d = date.getDate(), md = m * 100 + d;
  const easter = (lang === 'ro' || lang === 'el' ? orthodoxEaster : westernEaster)(date.getFullYear());
  const day = new Date(date.getFullYear(), m, d);
  const fromEaster = Math.round((day - easter) / DAY);
  if (fromEaster >= -10 && fromEaster <= 1) return 'easter';
  if (md >= 915 && md <= 1002) return 'halloween';
  if (md >= 1020 && md <= 1030) return 'blackfriday';
  if (md >= 1101 && md <= 1126) return 'christmas';
  if (md >= 1127 || md <= 7) return 'newyear';
  if (md >= 107 && md <= 115) return 'valentine';
  if (md >= 201 && md <= 210) return 'spring';
  if (md >= 515 && md <= 731) return 'summer';
  return '';
}

// 'none' → '', 'auto' → today's season (or ''), a season → itself.
export function resolveSeason(choice, lang = 'en', date = new Date()) {
  if (choice === 'auto') return seasonForDate(date, lang);
  return SEASONS.includes(choice) ? choice : '';
}
