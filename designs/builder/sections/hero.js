// Hero with a 3D particle field (hand-written WebGL, no library) that leans towards the mouse or
// the phone's tilt, a word-by-word headline and a stack of photos in CSS 3D.
// WebGL starts after the page is idle, renders only while the hero is on screen and is torn down
// when the section is removed, so there is never more than one canvas. Reduced motion or no WebGL:
// the static gradient behind it stays, nothing moves.

import { h, photo, icon } from '../core/dom.js';
import { motion, finePointer, onVisible, deviceTilt, askTiltPermission } from '../core/motion.js';
import { glColor } from '../core/theme.js';
import { altOf } from '../content/photos.js';
import { bookButton, openState } from '../../shared/live.js';

const VERT = `
attribute vec2 a;
uniform float t;
uniform vec2 m;
uniform float aspect;
uniform float size;
varying float v;
void main() {
  float x = a.x * 1.9;
  float z = a.y * 1.2;
  float y = sin(x * 2.6 + t * 0.55) * 0.09 + cos(z * 3.4 + t * 0.42) * 0.08 + sin((x + z) * 6.0 + t * 0.9) * 0.025;
  float ry = m.x * 0.42;
  float rx = 0.62 + m.y * 0.22;
  vec3 p = vec3(x * cos(ry) + z * sin(ry), y, -x * sin(ry) + z * cos(ry));
  p = vec3(p.x, p.y * cos(rx) - p.z * sin(rx), p.y * sin(rx) + p.z * cos(rx));
  p.z += 2.3;
  v = clamp(1.0 - (p.z - 1.3) / 2.0, 0.0, 1.0);
  gl_Position = vec4(p.x * 1.7 / aspect, p.y * 1.7 - 0.18, 0.0, p.z);
  gl_PointSize = size / p.z;
}`;

const FRAG = `
precision mediump float;
uniform vec3 c1;
uniform vec3 c2;
uniform float alpha;
varying float v;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r = dot(d, d);
  if (r > 0.25) discard;
  float soft = smoothstep(0.25, 0.0, r);
  gl_FragColor = vec4(mix(c2, c1, v), soft * alpha * (0.25 + v * 0.75));
}`;

function startGL(section) {
  const canvas = h('canvas', { class: 'hero-gl', 'aria-hidden': 'true' });
  const gl = canvas.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: false, powerPreference: 'low-power' });
  if (!gl) return null;

  const shader = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader');
    return s;
  };
  const prog = gl.createProgram();
  gl.attachShader(prog, shader(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);

  const small = window.innerWidth < 700;
  const cols = small ? 90 : 150;
  const rows = small ? 46 : 70;
  const pts = new Float32Array(cols * rows * 2);
  let k = 0;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      pts[k++] = (i / (cols - 1)) * 2 - 1 + (Math.random() - 0.5) * 0.01;
      pts[k++] = (j / (rows - 1)) * 2 - 1;
    }
  }
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, pts, gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'a');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const u = name => gl.getUniformLocation(prog, name);
  const U = { t: u('t'), m: u('m'), aspect: u('aspect'), size: u('size'), c1: u('c1'), c2: u('c2'), alpha: u('alpha') };
  gl.enable(gl.BLEND);

  function colors() {
    const dark = document.documentElement.dataset.skin === 'luxe';
    const css = getComputedStyle(document.documentElement);
    gl.uniform3fv(U.c1, glColor(css.getPropertyValue('--accent').trim() || '#c9a961'));
    gl.uniform3fv(U.c2, glColor(css.getPropertyValue('--text').trim() || '#ffffff'));
    gl.uniform1f(U.alpha, dark ? 0.9 : 0.75);
    gl.blendFunc(gl.SRC_ALPHA, dark ? gl.ONE : gl.ONE_MINUS_SRC_ALPHA);
  }
  colors();

  let width = 0;
  let height = 0;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = section.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width * dpr));
    height = Math.max(1, Math.round(rect.height * dpr));
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
    gl.uniform1f(U.aspect, width / height);
    gl.uniform1f(U.size, (small ? 5.2 : 4.4) * dpr);
  }

  const target = { x: 0, y: 0 };
  const cur = { x: 0, y: 0 };
  let raf = 0;
  let running = false;
  const t0 = performance.now();
  function frame(now) {
    raf = 0;
    if (!running) return;
    cur.x += (target.x - cur.x) * 0.05;
    cur.y += (target.y - cur.y) * 0.05;
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(U.t, (now - t0) / 1000);
    gl.uniform2f(U.m, cur.x, cur.y);
    gl.drawArrays(gl.POINTS, 0, cols * rows);
    raf = requestAnimationFrame(frame);
  }
  const play = on => {
    running = on && !document.hidden;
    if (running && !raf) raf = requestAnimationFrame(frame);
  };

  const onPointer = e => {
    target.x = (e.clientX / window.innerWidth) * 2 - 1;
    target.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  const onVis = () => play(visibleNow);
  let visibleNow = true;
  section.prepend(canvas);
  resize();
  requestAnimationFrame(() => canvas.classList.add('is-on'));
  const ro = new ResizeObserver(resize);
  ro.observe(section);
  window.addEventListener('pointermove', onPointer, { passive: true });
  document.addEventListener('visibilitychange', onVis);
  const stopTilt = deviceTilt((x, y) => { target.x = x; target.y = y; });
  const stopWatch = onVisible(section, on => { visibleNow = on; play(on); }, { once: false, rootMargin: '0px' });
  play(true);

  return {
    colors,
    tilt: (x, y) => { target.x = x; target.y = y; },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      stopWatch();
      stopTilt();
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVis);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      canvas.remove();
    }
  };
}

const glBySection = new WeakMap();

export default {
  render(ctx) {
    const { t, content, lang } = ctx;
    const [l1, l2] = content.h1;
    const prices = ctx.anchor('book', 'prices', 'services', 'basket');
    const shots = content.photos;
    const status = h('p', { class: 'hero-status', hidden: true });

    const stack = h('div', { class: 'hero-stack', 'data-reveal': '' },
      h('figure', { class: 'hero-card hero-card-1' }, photo(shots[0], { w: 640, h: 800, sizes: '(max-width: 700px) 60vw, 420px', alt: altOf(shots[0], lang), eager: true, priority: true })),
      h('figure', { class: 'hero-card hero-card-2' }, photo(shots[1], { w: 420, h: 520, sizes: '(max-width: 700px) 40vw, 260px', alt: altOf(shots[1], lang) })),
      h('figure', { class: 'hero-card hero-card-3' }, photo(shots[2], { w: 420, h: 420, sizes: '(max-width: 700px) 36vw, 220px', alt: altOf(shots[2], lang) })));

    const section = h('section', { class: 'sec hero' },
      h('div', { class: 'hero-bg', 'aria-hidden': 'true' }),
      h('div', { class: 'wrap hero-grid' },
        h('div', { class: 'hero-copy' },
          h('p', { class: 'eyebrow', text: content.tagline }),
          h('h1', null, h('span', { class: 'hero-l1', 'data-split': '', text: l1 }), ' ', h('span', { class: 'hero-l2', 'data-split': '', text: l2 })),
          h('p', { class: 'hero-lead', text: content.lead }),
          h('div', { class: 'actions' },
            bookButton(t('hero.primary'), { linkId: ctx.linkId, className: 'btn' }),
            h('a', { class: 'btn btn-ghost', href: prices, text: t('hero.secondary') })),
          status),
        h('div', { class: 'hero-visual' }, stack)),
      h('a', { class: 'hero-scroll', href: '#sections', 'aria-label': t('hero.scroll') }, icon('arrowDown', 18)));
    return section;
  },

  update(el, ctx) {
    const node = el.querySelector('.hero-status');
    const state = ctx.data && openState(ctx.data, { open: ctx.t('hours.badgeOpen', { time: '' }).replace(/\s*$/, ''), closed: ctx.t('hours.badgeClosed') });
    if (!state) { node.hidden = true; return; }
    node.textContent = state.label;
    node.classList.toggle('is-open', state.isOpen);
    node.hidden = false;
  },

  activate(el, ctx) {
    if (motion.reduced) return null;
    const stack = el.querySelector('.hero-stack');
    // Photo stack leans with the pointer (CSS 3D).
    const onMove = e => {
      const r = el.getBoundingClientRect();
      stack.style.setProperty('--sx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      stack.style.setProperty('--sy', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    };
    if (finePointer()) el.addEventListener('pointermove', onMove);

    let gl = null;
    let tiltBtn = null;
    let handle = 0;
    const idle = window.requestIdleCallback || (cb => setTimeout(cb, 300));
    const start = () => {
      if (!el.isConnected || gl) return;
      try { gl = startGL(el); } catch (err) { console.warn('Hero 3D off:', err.message); gl = null; }
      if (gl) glBySection.set(el, gl);
      // iOS needs a tap to allow the gyroscope.
      if (gl && !finePointer() && typeof window.DeviceOrientationEvent?.requestPermission === 'function') {
        tiltBtn = h('button', { type: 'button', class: 'hero-tilt chip' }, icon('sparkle', 14), ctx.t('hero.tilt'));
        tiltBtn.addEventListener('click', async () => {
          if (await askTiltPermission()) {
            gl.stop();
            gl = startGL(el);
            if (gl) glBySection.set(el, gl);
            tiltBtn.textContent = ctx.t('hero.tiltOn');
            tiltBtn.disabled = true;
          }
        });
        el.querySelector('.hero-copy').appendChild(tiltBtn);
      }
    };
    // The particles are an enhancement: they start on the visitor's first move, tap, scroll or key,
    // so the first load (and a phone's battery) only pays for them when someone is there.
    const EVENTS = ['pointermove', 'pointerdown', 'touchstart', 'scroll', 'keydown', 'wheel'];
    const kick = () => {
      EVENTS.forEach(ev => window.removeEventListener(ev, kick));
      handle = idle(start, { timeout: 800 });
    };
    EVENTS.forEach(ev => window.addEventListener(ev, kick, { passive: true }));

    return () => {
      EVENTS.forEach(ev => window.removeEventListener(ev, kick));
      (window.cancelIdleCallback || clearTimeout)(handle);
      el.removeEventListener('pointermove', onMove);
      gl?.stop();
      tiltBtn?.remove();
    };
  },

  onTheme(el) {
    glBySection.get(el)?.colors();
  }
};
