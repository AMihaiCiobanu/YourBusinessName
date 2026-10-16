// Prospect-only chrome shared by the demo pages: the picker that switches between the classic
// page (four business types) and the alternative designs, the "Get my page" email, and the
// "Made by SoftApps" credit. A real client page drops the picker and the email, keeps the credit.

export const NICHES = [
  { value: 'nails', label: 'Nail & hair salon' },
  { value: 'barber', label: 'Barbershop' },
  { value: 'detailing', label: 'Car detailing' },
  { value: 'trainer', label: 'Personal trainer' }
];

export const DESIGNS = [
  { slug: 'storybook', label: 'Makeup & lashes · Storybook' },
  { slug: 'orbit', label: 'Massage & spa · Orbit (space)' },
  { slug: 'depth', label: 'Tattoo studio · Depth (3D)' },
  { slug: 'fullframe', label: 'Barbershop · Full frame' },
  { slug: 'duo', label: 'Salon, two specialists · Duo' },
  { slug: 'marketplace', label: 'Barbershop · Marketplace listing' },
  { slug: 'listing', label: 'Barbershop · Gallery listing' },
  { slug: 'dental', label: 'Dental clinic · Bright' },
  { slug: 'derma', label: 'Dermatologist · Skin' },
  { slug: 'builder', label: '✦ Build your own: mix sections, theme, colour' }
];

export const GET_PAGE_MAILTO = 'mailto:contact@appointmentsapps.com?subject=I%27d%20like%20my%20own%20website%20for%20my%20business&body=Hi%2C%0A%0AI%27d%20like%20more%20information%20about%20how%20I%20could%20get%20my%20own%20booking%20website.%0A%0AA%20few%20details%20about%20me%3A%0A-%20Business%20name%3A%0A-%20Type%20of%20business%20%28e.g.%20nails%2C%20hair%2C%20massage%29%3A%0A-%20City%3A%0A-%20Phone%20number%3A%0A-%20Facebook%20page%20link%3A%0A-%20Instagram%20profile%20link%3A%0A%0AI%27d%20like%20to%20know%3A%0A-%20How%20much%20it%20costs%20and%20what%20is%20included%0A-%20How%20long%20it%20takes%20to%20get%20ready%0A-%20Whether%20I%20can%20use%20my%20own%20domain%20%28e.g.%20my-business.com%29%0A-%20How%20services%20and%20opening%20hours%20stay%20in%20sync%20with%20the%20app%0A%0AI%20agree%20to%20have%20a%20meeting%20to%20discuss%20the%20project%20and%20what%20I%20want%20for%20my%20page.%0AI%27m%20available%20on%20this%20date%3A%20......%2C%20between%20these%20hours%3A%20......%0A%0AThank%20you%21';

export function designUrl(slug) { return `/designs/${slug}/`; }

// The "Get my page" email with `extra` text added after the questions, just before the meeting
// line (or at the end if the template changes). Used by pages that know what the prospect picked.
export function getPageMailto(extra) {
  if (!extra) return GET_PAGE_MAILTO;
  const url = new URL(GET_PAGE_MAILTO);
  const subject = url.searchParams.get('subject') || '';
  const body = url.searchParams.get('body') || '';
  const at = body.indexOf('I agree to have a meeting');
  const full = at >= 0 ? body.slice(0, at) + extra + body.slice(at) : `${body}\n\n${extra}`;
  return `mailto:${url.pathname}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(full)}`;
}

// Adds the design options to a picker and makes choosing one navigate. Niche options either
// stay on the classic page (onNiche) or go back to it.
export function wirePicker(select, { current, onNiche } = {}) {
  if (!select.querySelector('option[value="nails"]')) {
    const group = document.createElement('optgroup');
    group.label = 'Classic page';
    for (const n of NICHES) group.appendChild(new Option(n.label, n.value));
    select.appendChild(group);
  }
  const group = document.createElement('optgroup');
  group.label = 'More page designs';
  for (const d of DESIGNS) group.appendChild(new Option(d.label, `design:${d.slug}`));
  select.appendChild(group);
  if (current) select.value = current;

  select.addEventListener('change', () => {
    const value = select.value;
    if (value.startsWith('design:')) location.href = designUrl(value.slice(7));
    else if (onNiche) onNiche(value);
    else location.href = `/?type=${encodeURIComponent(value)}`;
  });
}

export const MADE_BY = `<a href="https://softsapps.com" target="_blank" rel="noopener" aria-label="Made by SoftApps">
  <span class="madeby-label">Made by</span>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 100" role="img" aria-label="SoftApps">
    <defs><linearGradient id="saLogo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset="0.5" stop-color="#7c3aed"/><stop offset="1" stop-color="#ec4899"/></linearGradient></defs>
    <rect x="6" y="14" width="72" height="72" rx="20" fill="#0a0e1a"/>
    <rect x="6" y="14" width="72" height="72" rx="20" fill="none" stroke="url(#saLogo)" stroke-width="2.5"/>
    <path d="M56 38 C56 31 49 29 42 29 C34 29 28 32 28 39 C28 47 37 49 42 51 C47 53 56 55 56 63 C56 70 48 72 42 72 C35 72 28 70 28 62" fill="none" stroke="url(#saLogo)" stroke-width="8" stroke-linecap="round"/>
    <text x="96" y="62" font-family="'Space Grotesk', system-ui, sans-serif" font-size="42" font-weight="700" fill="currentColor">Soft<tspan fill="url(#saLogo)">Apps</tspan></text>
  </svg>
</a>`;

// The "what you get" pill in the demo bar and the card it opens. Same markup on the classic
// page and on every design; each stylesheet gives `.perks*` its own colours.
const PERKS = `<button type="button" class="perks-pill" aria-expanded="false" aria-controls="perks-pop">
    <span aria-hidden="true">🎁</span><b><span class="perks-full">Free website</span><span class="perks-short">Free site</span></b><span class="perks-long"> · in any language</span>
    <svg class="perks-caret" viewBox="0 0 12 8" width="10" height="7" aria-hidden="true"><path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </button>
  <div class="perks-pop" id="perks-pop" role="region" aria-label="What you get" hidden>
    <div><span aria-hidden="true">🌐</span><strong>Your own address</strong><em>yourbusinessname.appointmentsapps.com, or your own domain like yourbusiness.com</em></div>
    <div><span aria-hidden="true">🎁</span><strong>Free with a yearly plan</strong><em>Free website when you buy a yearly subscription to the Appointments app, if you pick one of these demo designs.</em></div>
    <div><span aria-hidden="true">🗣️</span><strong>In any language</strong><em>We build your site in the language your clients speak.</em></div>
    <div><span aria-hidden="true">⚡</span><strong>Live from the app</strong><em>Services, hours and booking come straight from your Appointments app.</em></div>
    <a class="perks-app" href="https://appointmentsapps.com" target="_blank" rel="noopener">See the app</a>
  </div>`; // static markup

// Fills `host` (an element inside the demo bar) with the pill + card and wires open/close.
export function mountPerks(host) {
  host.classList.add('perks');
  host.innerHTML = PERKS;
  const pill = host.querySelector('.perks-pill');
  const pop = host.querySelector('.perks-pop');
  const set = (open) => { pop.hidden = !open; pill.setAttribute('aria-expanded', String(open)); };
  pill.addEventListener('click', (e) => { e.stopPropagation(); set(pop.hidden); });
  document.addEventListener('click', (e) => { if (!pop.hidden && !pop.contains(e.target)) set(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !pop.hidden) { set(false); pill.focus(); } });
}

// Demo bar at the top of a design page, plus the shared bits: "Get my page" links
// ([data-getpage]) and the Made by credit (.footer-madeby).
export function mountDemo(slug) {
  const bar = document.createElement('div');
  bar.className = 'dm-bar';
  bar.innerHTML = `<div class="dm-bar-inner">
    <label class="dm-pick"><span>Preview</span><select aria-label="Choose a page design to preview"></select></label>
    <div class="dm-perks"></div>
    <a class="dm-get" data-getpage>Get my page</a>
  </div>`; // static markup
  document.body.prepend(bar);
  wirePicker(bar.querySelector('select'), { current: `design:${slug}` });
  mountPerks(bar.querySelector('.dm-perks'));

  for (const a of document.querySelectorAll('[data-getpage]')) a.href = GET_PAGE_MAILTO;
  for (const p of document.querySelectorAll('.footer-madeby')) p.innerHTML = MADE_BY; // static markup
  for (const y of document.querySelectorAll('[data-year]')) y.textContent = String(new Date().getFullYear());
  setupMailFallback();
}

// ---------- "Get my page" when no email app opens ----------

// A mailto: link does nothing where no email app is set up, and the in-app browsers of Instagram
// or Facebook often block it. If the page is still in front 1.5 s after the click (the email app
// never took over), a small dialog offers the same message to copy, or opened in Gmail.
const MAIL_CSS = `
.mf{color-scheme:light;width:min(560px,calc(100vw - 24px));max-height:calc(100dvh - 24px);padding:0;border:0;border-radius:18px;background:#fff;color:#16161a;box-shadow:0 30px 80px rgba(0,0,0,.4);font:400 .95rem/1.5 'DM Sans',system-ui,-apple-system,'Segoe UI',sans-serif}
.mf::backdrop{background:rgba(10,10,14,.55)}
.mf-in{display:grid;gap:12px;padding:22px}
.mf h2{margin:0;font:700 1.25rem/1.25 'DM Sans',system-ui,sans-serif}
.mf p{margin:0;color:#4a4a55}
.mf-to{display:flex;flex-wrap:wrap;align-items:center;gap:8px;font-weight:700}
.mf-copy-to{min-height:44px;padding:6px 12px;border:1px solid #d9d9e0;border-radius:10px;background:#fff;color:#16161a;font:600 .85rem/1 inherit;cursor:pointer}
.mf textarea{width:100%;min-height:180px;padding:12px;border:1px solid #d9d9e0;border-radius:12px;font:400 .85rem/1.45 ui-monospace,Menlo,monospace;color:#16161a;background:#f7f7f9;resize:vertical}
.mf-row{display:flex;flex-wrap:wrap;gap:8px}
.mf-row a,.mf-row button{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:8px 16px;border:1px solid #d9d9e0;border-radius:12px;background:#fff;color:#16161a;font:700 .92rem/1 inherit;text-decoration:none;cursor:pointer}
.mf-row .mf-main{background:#16161a;border-color:#16161a;color:#fff}
.mf-x{position:absolute;top:10px;right:10px;width:44px;height:44px;border:0;border-radius:50%;background:transparent;font-size:24px;line-height:1;cursor:pointer;color:#16161a}
.mf :focus-visible{outline:3px solid #5b3df5;outline-offset:2px}`;

let mailDialog = null;

function showMailDialog(href) {
  const url = new URL(href);
  const to = decodeURIComponent(url.pathname);
  const subject = url.searchParams.get('subject') || '';
  const body = url.searchParams.get('body') || '';
  if (!mailDialog) {
    const style = document.createElement('style');
    style.textContent = MAIL_CSS;
    document.head.appendChild(style);
    mailDialog = document.createElement('dialog');
    mailDialog.className = 'mf';
    mailDialog.setAttribute('aria-labelledby', 'mf-title');
    mailDialog.innerHTML = `<div class="mf-in">
      <button type="button" class="mf-x" aria-label="Close">×</button>
      <h2 id="mf-title">Didn't your email app open?</h2>
      <p>Send this message to us from any email account. We reply within one working day.</p>
      <p class="mf-to">To: <span data-to></span> <button type="button" class="mf-copy-to">Copy address</button></p>
      <label><span class="mf-sr" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Message</span><textarea readonly data-body></textarea></label>
      <div class="mf-row">
        <button type="button" class="mf-main mf-copy">Copy the message</button>
        <a data-gmail target="_blank" rel="noopener">Open in Gmail</a>
        <a data-mailto>Try the email app again</a>
      </div>
      <p class="mf-done" role="status"></p>
    </div>`; // static markup; the texts below are set as text
    document.body.appendChild(mailDialog);
    mailDialog.querySelector('.mf-x').addEventListener('click', () => mailDialog.close());
    mailDialog.addEventListener('click', e => { if (e.target === mailDialog) mailDialog.close(); });
    const copy = async (text, msg) => {
      const done = mailDialog.querySelector('.mf-done');
      try { await navigator.clipboard.writeText(text); done.textContent = msg; }
      catch { mailDialog.querySelector('[data-body]').select(); done.textContent = 'Select the text and copy it (Ctrl/Cmd + C).'; }
    };
    mailDialog.querySelector('.mf-copy').addEventListener('click', () => copy(`${mailDialog.dataset.subject}\n\n${mailDialog.querySelector('[data-body]').value}`, 'Message copied. Paste it into a new email.'));
    mailDialog.querySelector('.mf-copy-to').addEventListener('click', () => copy(mailDialog.dataset.to, 'Address copied.'));
  }
  mailDialog.dataset.to = to;
  mailDialog.dataset.subject = subject;
  mailDialog.querySelector('[data-to]').textContent = to;
  mailDialog.querySelector('[data-body]').value = body;
  mailDialog.querySelector('.mf-done').textContent = '';
  mailDialog.querySelector('[data-mailto]').href = href;
  mailDialog.querySelector('[data-gmail]').href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  if (!mailDialog.open) mailDialog.showModal();
}

let mailFallbackOn = false;
export function setupMailFallback() {
  if (mailFallbackOn) return;
  mailFallbackOn = true;
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="mailto:contact@appointmentsapps.com"]');
    if (!a || e.defaultPrevented || a.closest('.mf')) return;
    let left = false;
    const leave = () => { left = true; };
    window.addEventListener('blur', leave, { once: true });
    window.addEventListener('pagehide', leave, { once: true });
    document.addEventListener('visibilitychange', leave, { once: true });
    setTimeout(() => {
      window.removeEventListener('blur', leave);
      window.removeEventListener('pagehide', leave);
      document.removeEventListener('visibilitychange', leave);
      if (!left && document.visibilityState === 'visible') showMailDialog(a.href);
    }, 1500);
  });
}
