// Seasonal decorations over the page, in the spirit of NailsByClemi's Halloween: a greeting ribbon
// under the header, a garland / corner piece / bats / fireworks over the first screen, shapes falling
// or floating over the page (Halloween: spiders crawling, one on a silk thread), and a mascot bottom
// left that jumps, says something and plays a sound when tapped, with a sound on/off button.
// Nothing here takes clicks except the mascot and its sound button. With reduced motion only the
// still pieces stay. Loaded on demand by app.js; mountDecor() returns the function that removes it all.

import { ART, GARLAND, BURST, BAT } from './art.js';
import { playSeason } from './sounds.js';

const SOUND_KEY = 'builder:season-sound';

function el(tag, cls, html) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (html) node.innerHTML = html; // static markup from art.js only, never text from the page
  return node;
}

const rand = (a, b) => a + Math.random() * (b - a);

export function mountDecor({ season, main, t, reduced }) {
  const art = ART[season];
  if (!art) return () => {};
  const cleanups = [];
  const add = node => { cleanups.push(() => node.remove()); return node; };

  // ---------- greeting ribbon + first-screen decorations ----------

  const year = new Date().getFullYear() + (new Date().getMonth() >= 6 ? 1 : 0);
  const ribbon = add(el('p', `sz-ribbon sz-${season}`));
  ribbon.append(el('span', 'sz-emoji'), document.createTextNode(t(`season.${season}.greet`, { year })));
  ribbon.firstChild.textContent = art.emoji;
  ribbon.firstChild.setAttribute('aria-hidden', 'true');
  const header = main.querySelector('.top');
  if (header) header.after(ribbon); else main.prepend(ribbon);

  // A zero-height anchor right under the ribbon: the decorations hang from it over the first screen
  // without moving anything on the page.
  const top = add(el('div', `sz-top sz-${season}`));
  top.setAttribute('aria-hidden', 'true');
  const area = el('div', 'sz-area');
  top.appendChild(area);
  // Hung only once the page and its fonts are in: the web font can rewrap the ribbon, and the large
  // decoration area moving with it would count as a layout shift.
  const hang = () => { if (ribbon.isConnected) ribbon.after(top); };
  if (document.readyState === 'complete') document.fonts.ready.then(hang);
  else window.addEventListener('load', () => document.fonts.ready.then(hang), { once: true });

  if (art.garland) area.appendChild(garland(art.garland));
  if (art.extra) area.insertAdjacentHTML('beforeend', art.extra);
  if (art.corner) area.insertAdjacentHTML('beforeend', art.corner);
  if (art.bats && !reduced) {
    for (let i = 0; i < 3; i++) area.insertAdjacentHTML('beforeend', `<svg class="sz-bat" viewBox="0 0 40 28">${BAT}</svg>`);
  }
  if (art.fireworks && !reduced) {
    const colors = ['#f5c542', '#ff4d6d', '#4cc9f0', '#b8f2e6'];
    [[18, 22], [72, 14], [46, 40], [86, 46]].forEach(([x, y], i) => {
      const fw = el('div', 'sz-fw');
      fw.style.cssText = `left:${x}%;top:${y}%;--c:${colors[i]};animation-delay:${i * 0.9}s`;
      for (let k = 0; k < 12; k++) {
        const spark = el('i');
        spark.style.cssText = `--a:${k * 30}deg;animation-delay:${i * 0.9}s`;
        fw.appendChild(spark);
      }
      area.appendChild(fw);
    });
  }

  // ---------- falling / floating shapes ----------

  if (art.fall && !reduced) {
    const { items, count, size, up, spin } = art.fall;
    const layer = add(el('div', `sz-fall${up ? ' sz-up' : ''}`));
    layer.setAttribute('aria-hidden', 'true');
    const n = window.innerWidth < 768 ? Math.ceil(count * 0.6) : count;
    for (let i = 0; i < n; i++) {
      const p = el('span', 'sz-p', items[i % items.length]);
      const d = rand(9, 17);
      p.style.cssText = `--x:${rand(0, 100).toFixed(1)}%;--s:${rand(size[0], size[1]).toFixed(0)}px;--d:${d.toFixed(1)}s;`
        + `--delay:${(-rand(0, d)).toFixed(1)}s;--drift:${rand(-80, 80).toFixed(0)}px;--r:${spin ? rand(-540, 540).toFixed(0) : 0}deg;--o:${rand(0.55, 0.95).toFixed(2)}`;
      layer.appendChild(p);
    }
    document.body.appendChild(layer);
  }

  if (art.spiders && !reduced) cleanups.push(spiders());

  // ---------- mascot ----------

  let soundOn = true;
  try { soundOn = localStorage.getItem(SOUND_KEY) !== 'off'; } catch { /* ignore */ }

  const wrap = add(el('div', `sz-mascot-wrap sz-${season}`));
  const mascot = el('button', 'sz-mascot');
  mascot.type = 'button';
  mascot.setAttribute('aria-label', t(`season.${season}.mascot`));
  const bubble = el('span', 'sz-bubble');
  bubble.setAttribute('aria-hidden', 'true');
  mascot.append(bubble);
  mascot.insertAdjacentHTML('beforeend', art.mascot);

  const sound = el('button', 'sz-sound', '<svg class="on" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5L6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/></svg>'
    + '<svg class="off" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5L6 9H2v6h4l5 4zM23 9l-6 6M17 9l6 6"/></svg>');
  sound.type = 'button';
  sound.setAttribute('aria-label', t('season.sound'));
  const syncSound = () => sound.setAttribute('aria-pressed', String(soundOn));
  syncSound();
  sound.addEventListener('click', () => {
    soundOn = !soundOn;
    try { localStorage.setItem(SOUND_KEY, soundOn ? 'on' : 'off'); } catch { /* ignore */ }
    syncSound();
    if (soundOn) playSeason(season);
  });

  const lines = String(t(`season.${season}.bubbles`, { year })).split('|');
  let timer = 0;
  mascot.addEventListener('click', () => {
    bubble.textContent = lines[Math.floor(Math.random() * lines.length)];
    mascot.classList.remove('is-scared');
    void mascot.offsetWidth; // restart the animation on rapid taps
    mascot.classList.add('is-scared');
    clearTimeout(timer);
    timer = setTimeout(() => mascot.classList.remove('is-scared'), 1600);
    if (soundOn) {
      if (navigator.vibrate) navigator.vibrate(60);
      playSeason(season);
    }
    if (!reduced) burst(mascot, BURST[season]);
  });
  cleanups.push(() => clearTimeout(timer));

  wrap.append(mascot, sound);
  document.body.appendChild(wrap);

  return () => { while (cleanups.length) cleanups.pop()(); };
}

// A string across the top of the page in three sags: bulbs, hearts or bunting flags.
function garland(kind) {
  const items = GARLAND[kind];
  const wrap = el('div', `sz-garland sz-g-${kind}`,
    '<svg class="sz-wire" viewBox="0 0 300 40" preserveAspectRatio="none"><path d="M0 4Q50 40 100 4T200 4T300 4" fill="none" stroke="currentColor" stroke-width="1.5" vector-effect="non-scaling-stroke"/></svg>');
  items.forEach((item, i) => {
    const f = (i + 0.5) / items.length;
    const s = (f * 3) % 1;
    const node = el('span', 'sz-gi', kind === 'heart' ? item : '');
    node.style.cssText = `left:${(f * 100).toFixed(2)}%;top:${(4 + 72 * s * (1 - s)).toFixed(1)}px;--c:${kind === 'heart' ? '' : item};--i:${i % 3}`;
    wrap.appendChild(node);
  });
  return wrap;
}

// Shapes flying out of the mascot when it is tapped.
function burst(from, shapes) {
  if (!shapes || !from.animate) return;
  const box = from.getBoundingClientRect();
  const x = box.left + box.width / 2;
  const y = box.top + box.height * 0.35;
  const layer = el('div', 'sz-burst');
  layer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(layer);
  let left = 12;
  for (let i = 0; i < 12; i++) {
    const p = el('span', 'sz-bp', shapes[i % shapes.length]);
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    layer.appendChild(p);
    const a = rand(-Math.PI * 0.95, -Math.PI * 0.05);
    const dist = rand(70, 170);
    const anim = p.animate([
      { transform: 'translate(-50%,-50%) scale(.4)', opacity: 1 },
      { transform: `translate(calc(-50% + ${Math.cos(a) * dist}px), calc(-50% + ${Math.sin(a) * dist}px)) rotate(${rand(-200, 200)}deg) scale(1)`, opacity: 1, offset: 0.7 },
      { transform: `translate(calc(-50% + ${Math.cos(a) * dist * 1.1}px), calc(-50% + ${Math.sin(a) * dist + 40}px)) scale(.8)`, opacity: 0 }
    ], { duration: rand(900, 1300), easing: 'cubic-bezier(.2,.7,.3,1)' });
    anim.onfinish = () => { if (--left === 0) layer.remove(); };
  }
}

// Halloween: glossy spiders wandering over the screen and one lowering itself on a thread now and
// then (NailsByClemi's halloween.js, unchanged in behaviour). Returns its cleanup.
function spiders() {
  const LEGS = [
    [[45, 38], [28, 22], [12, 12]],
    [[44, 43], [24, 34], [6, 34]],
    [[44, 49], [24, 54], [8, 62]],
    [[45, 55], [28, 68], [16, 90]]
  ];
  let legs = '';
  [1, -1].forEach(side => {
    LEGS.forEach((l, i) => {
      const p = l.map(pt => [side === 1 ? pt[0] : 100 - pt[0], pt[1]]);
      const d = `M${p[0]} Q${p[1]} ${p[2]}`;
      const phase = (i + (side === 1 ? 0 : 1)) % 2 ? 'b' : 'a';
      legs += `<g class="sz-leg ${phase}" style="transform-origin:${p[0][0]}px ${p[0][1]}px">`
        + `<path d="${d}" stroke="#2a1a40" stroke-width="3.8" fill="none" stroke-linecap="round"/>`
        + `<path d="${d}" stroke="#a98ee0" stroke-width="1.1" fill="none" stroke-linecap="round" opacity=".55" transform="translate(-.7 -.7)"/></g>`;
    });
  });
  const SPIDER = `<svg viewBox="0 0 100 100" aria-hidden="true">${legs}`
    + '<ellipse cx="50" cy="62" rx="14" ry="18" fill="url(#sz-body)"/>'
    + '<ellipse cx="50" cy="40" rx="9" ry="9.5" fill="url(#sz-body)"/>'
    + '<path d="M50 54l4 8-4 8-4-8z" fill="#ff7a1a" opacity=".9"/>'
    + '<ellipse cx="44" cy="55" rx="4" ry="7" fill="#fff" opacity=".16" transform="rotate(-12 44 55)"/>'
    + '<circle cx="46.5" cy="34" r="2" fill="#ff3d3d"/><circle cx="53.5" cy="34" r="2" fill="#ff3d3d"/>'
    + '<circle cx="46" cy="33.4" r=".7" fill="#fff"/><circle cx="53" cy="33.4" r=".7" fill="#fff"/></svg>';

  const layer = el('div', 'sz-spiders', '<svg width="0" height="0" style="position:absolute"><defs>'
    + '<radialGradient id="sz-body" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#b79cf0"/>'
    + '<stop offset=".45" stop-color="#3d2a5e"/><stop offset="1" stop-color="#120a20"/></radialGradient></defs></svg>');
  layer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(layer);

  const pick = s => {
    const m = 40;
    s.tx = m + Math.random() * (window.innerWidth - 2 * m);
    s.ty = m + Math.random() * (window.innerHeight - 2 * m);
    s.top = 55 + Math.random() * 55;
  };
  const list = [];
  const count = window.innerWidth < 768 ? 2 : 3;
  for (let i = 0; i < count; i++) {
    const node = el('div', 'sz-spider', SPIDER);
    layer.appendChild(node);
    const s = { el: node, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, a: Math.random() * Math.PI * 2, speed: 0, top: 80, pause: Math.random() * 2, tx: 0, ty: 0 };
    pick(s);
    list.push(s);
  }

  let prev = performance.now();
  let raf = 0;
  function frame(now) {
    const dt = Math.min(0.05, (now - prev) / 1000);
    prev = now;
    for (const s of list) {
      if (s.pause > 0) {
        s.pause -= dt;
        s.speed = 0;
        s.el.classList.remove('walking');
      } else {
        const dx = s.tx - s.x, dy = s.ty - s.y;
        if (Math.hypot(dx, dy) < 12) { s.pause = 0.6 + Math.random() * 2.4; pick(s); } else {
          let diff = Math.atan2(dx, -dy) - s.a;
          diff = Math.atan2(Math.sin(diff), Math.cos(diff));
          s.a += Math.max(-4 * dt, Math.min(4 * dt, diff));
          // slow down while turning sharply, so it pivots like a real one
          s.speed += ((Math.abs(diff) > 0.9 ? 12 : s.top) - s.speed) * Math.min(1, dt * 5);
          s.x += Math.sin(s.a) * s.speed * dt;
          s.y -= Math.cos(s.a) * s.speed * dt;
          s.el.classList.add('walking');
        }
      }
      s.el.style.transform = `translate(${s.x.toFixed(1)}px,${s.y.toFixed(1)}px) rotate(${s.a.toFixed(3)}rad)`;
    }
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);
  const onVis = () => {
    cancelAnimationFrame(raf);
    if (!document.hidden) { prev = performance.now(); raf = requestAnimationFrame(frame); }
  };
  document.addEventListener('visibilitychange', onVis);

  const dangler = el('div', 'sz-dangler', `<span class="sz-thread"></span><div class="sz-spider walking">${SPIDER}</div>`);
  layer.appendChild(dangler);
  let dropTimer = 0;
  let anim = null;
  function drop() {
    const depth = 110 + Math.random() * Math.min(240, window.innerHeight * 0.4);
    dangler.style.left = `${30 + Math.random() * (window.innerWidth - 90)}px`;
    const down = `translateY(${depth}px)`;
    anim = dangler.animate([
      { transform: 'translateY(0)', offset: 0 },
      { transform: down, offset: 0.3 },
      { transform: `translateY(${depth - 22}px)`, offset: 0.45 },
      { transform: down, offset: 0.6 },
      { transform: `translateY(${depth - 14}px)`, offset: 0.75 },
      { transform: down, offset: 0.85 },
      { transform: 'translateY(0)', offset: 1 }
    ], { duration: 9000, easing: 'ease-in-out' });
    anim.onfinish = () => { dropTimer = setTimeout(drop, 15000 + Math.random() * 20000); };
  }
  dropTimer = setTimeout(drop, 4000);

  return () => {
    cancelAnimationFrame(raf);
    clearTimeout(dropTimer);
    if (anim) { anim.onfinish = null; anim.cancel(); }
    document.removeEventListener('visibilitychange', onVis);
    layer.remove();
  };
}
