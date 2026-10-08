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
  { slug: 'yours', label: '✦ Your own mix or a brand-new design' }
];

export const GET_PAGE_MAILTO = 'mailto:contact@appointmentsapps.com?subject=I%27d%20like%20my%20own%20website%20for%20my%20business&body=Hi%2C%0A%0AI%27d%20like%20more%20information%20about%20how%20I%20could%20get%20my%20own%20booking%20website.%0A%0AA%20few%20details%20about%20me%3A%0A-%20Business%20name%3A%0A-%20Type%20of%20business%20%28e.g.%20nails%2C%20hair%2C%20massage%29%3A%0A-%20City%3A%0A-%20Phone%20number%3A%0A-%20Facebook%20page%20link%3A%0A-%20Instagram%20profile%20link%3A%0A%0AI%27d%20like%20to%20know%3A%0A-%20How%20much%20it%20costs%20and%20what%20is%20included%0A-%20How%20long%20it%20takes%20to%20get%20ready%0A-%20Whether%20I%20can%20use%20my%20own%20domain%20%28e.g.%20my-business.com%29%0A-%20How%20services%20and%20opening%20hours%20stay%20in%20sync%20with%20the%20app%0A%0AI%20agree%20to%20have%20a%20meeting%20to%20discuss%20the%20project%20and%20what%20I%20want%20for%20my%20page.%0AI%27m%20available%20on%20this%20date%3A%20......%2C%20between%20these%20hours%3A%20......%0A%0AThank%20you%21';

export function designUrl(slug) { return `/designs/${slug}/`; }

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

const MADE_BY = `<a href="https://softsapps.com" target="_blank" rel="noopener" aria-label="Made by SoftApps">
  <span class="madeby-label">Made by</span>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 100" role="img" aria-label="SoftApps">
    <defs><linearGradient id="saLogo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset="0.5" stop-color="#7c3aed"/><stop offset="1" stop-color="#ec4899"/></linearGradient></defs>
    <rect x="6" y="14" width="72" height="72" rx="20" fill="#0a0e1a"/>
    <rect x="6" y="14" width="72" height="72" rx="20" fill="none" stroke="url(#saLogo)" stroke-width="2.5"/>
    <path d="M56 38 C56 31 49 29 42 29 C34 29 28 32 28 39 C28 47 37 49 42 51 C47 53 56 55 56 63 C56 70 48 72 42 72 C35 72 28 70 28 62" fill="none" stroke="url(#saLogo)" stroke-width="8" stroke-linecap="round"/>
    <text x="96" y="62" font-family="'Space Grotesk', system-ui, sans-serif" font-size="42" font-weight="700" fill="currentColor">Soft<tspan fill="url(#saLogo)">Apps</tspan></text>
  </svg>
</a>`;

// Demo bar at the top of a design page, plus the shared bits: "Get my page" links
// ([data-getpage]) and the Made by credit (.footer-madeby).
export function mountDemo(slug) {
  const bar = document.createElement('div');
  bar.className = 'dm-bar';
  bar.innerHTML = `<div class="dm-bar-inner">
    <label class="dm-pick"><span>Preview</span><select aria-label="Choose a page design to preview"></select></label>
    <p class="dm-note"><span>Demo · services, hours and booking come live from the app</span></p>
    <a class="dm-get" data-getpage>Get my page</a>
  </div>`; // static markup
  document.body.prepend(bar);
  wirePicker(bar.querySelector('select'), { current: `design:${slug}` });

  for (const a of document.querySelectorAll('[data-getpage]')) a.href = GET_PAGE_MAILTO;
  for (const p of document.querySelectorAll('.footer-madeby')) p.innerHTML = MADE_BY; // static markup
  for (const y of document.querySelectorAll('[data-year]')) y.textContent = String(new Date().getFullYear());
}
