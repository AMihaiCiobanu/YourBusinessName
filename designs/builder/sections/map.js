// A stylised map drawn in SVG in the theme's colours (streets, a river, a park and a pin), with the
// address, contact and a Directions link. Google Maps itself loads only when the visitor taps
// "Show the interactive map": faster first load and no Google requests before they ask.

import { h, icon, svgEl } from '../core/dom.js';

function mapArt() {
  const svg = svgEl('svg', { viewBox: '0 0 800 500', class: 'mp-art', 'aria-hidden': 'true', preserveAspectRatio: 'xMidYMid slice' });
  // Seeded so the map is the same on every visit.
  let seed = 7;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  svg.appendChild(svgEl('rect', { width: 800, height: 500, class: 'mp-land' }));
  svg.appendChild(svgEl('path', { d: 'M560 0 C520 120 640 220 600 320 S520 460 560 500 L620 500 C590 440 660 360 670 300 S590 120 640 0Z', class: 'mp-water' }));
  svg.appendChild(svgEl('rect', { x: 120, y: 300, width: 150, height: 110, rx: 18, class: 'mp-park' }));
  svg.appendChild(svgEl('rect', { x: 430, y: 70, width: 90, height: 70, rx: 14, class: 'mp-park' }));
  for (let x = 40; x < 800; x += 70 + Math.floor(rnd() * 40)) {
    svg.appendChild(svgEl('path', { d: `M${x} 0 L${x + (rnd() - 0.5) * 60} 500`, class: rnd() > 0.75 ? 'mp-road mp-main' : 'mp-road' }));
  }
  for (let y = 30; y < 500; y += 60 + Math.floor(rnd() * 40)) {
    svg.appendChild(svgEl('path', { d: `M0 ${y} L800 ${y + (rnd() - 0.5) * 50}`, class: rnd() > 0.7 ? 'mp-road mp-main' : 'mp-road' }));
  }
  svg.appendChild(svgEl('path', { d: 'M0 420 C200 380 300 300 400 250 S640 180 800 140', class: 'mp-road mp-avenue' }));
  svg.appendChild(svgEl('path', { d: 'M150 470 C230 400 300 320 400 250', class: 'mp-route' }));
  const pin = svgEl('g', { class: 'mp-pin', transform: 'translate(400 250)' });
  pin.appendChild(svgEl('circle', { r: 46, class: 'mp-pulse' }));
  pin.appendChild(svgEl('path', { d: 'M0 0 C-22 -26 -26 -40 -26 -50 a26 26 0 0 1 52 0 C26 -40 22 -26 0 0Z', class: 'mp-drop' }));
  pin.appendChild(svgEl('circle', { cy: -50, r: 9, class: 'mp-hole' }));
  svg.appendChild(pin);
  return svg;
}

export default {
  render(ctx) {
    const { t, name } = ctx;
    const address = t('map.address');
    const frameHost = h('div', { class: 'mp-frame' }, mapArt());
    const load = h('button', { type: 'button', class: 'btn btn-sm mp-load' }, icon('map', 18), t('map.load'));
    load.addEventListener('click', () => {
      const iframe = h('iframe', {
        src: `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`,
        title: t('map.frame', { name }),
        loading: 'lazy',
        referrerpolicy: 'no-referrer-when-downgrade',
        allowfullscreen: true
      });
      frameHost.replaceChildren(iframe);
      iframe.focus();
    });
    frameHost.appendChild(h('div', { class: 'mp-overlay' }, load, h('p', { class: 'small', text: t('map.loadNote') })));

    return h('section', { class: 'sec mp-sec' },
      h('div', { class: 'wrap mp-grid' },
        h('div', { class: 'mp-info' },
          h('header', { class: 'sec-head' },
            h('p', { class: 'eyebrow', text: t('map.eyebrow') }),
            h('h2', { 'data-split': '', text: t('map.title') })),
          h('ul', { class: 'mp-list' },
            h('li', null, icon('pin', 20), h('span', null, address, h('br'), h('span', { class: 'sample-tag', text: t('map.sample') }))),
            h('li', null, icon('phone', 20), h('button', { type: 'button', class: 'mp-link', 'data-demo': 'call', text: t('map.phone') })),
            h('li', null, icon('send', 20), h('span', { text: t('map.email') }))),
          h('div', { class: 'actions' },
            h('a', { class: 'btn', href: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`, target: '_blank', rel: 'noopener' }, icon('directions', 18), t('map.directions')))),
        h('div', { class: 'mp-card', 'data-reveal': '' }, frameHost)));
  }
};
