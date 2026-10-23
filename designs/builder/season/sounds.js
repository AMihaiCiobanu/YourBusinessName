// Mascot sounds, synthesized with Web Audio (no files). They only ever play after a tap on the mascot
// or on the sound button, never on their own. The Halloween ones are NailsByClemi's.

let ctx = null;
export function audio() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(c, type, t0, dur, freqPoints, vol, filterHz) {
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  freqPoints.forEach((p, i) => {
    if (i === 0) osc.frequency.setValueAtTime(p[1], t0 + p[0]);
    else osc.frequency.linearRampToValueAtTime(p[1], t0 + p[0]);
  });
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(vol, t0 + Math.min(0.05, dur / 4));
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  let node = osc;
  if (filterHz) {
    const f = c.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = filterHz;
    osc.connect(f);
    node = f;
  }
  node.connect(gain);
  gain.connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
  return osc;
}

// A short burst of filtered noise: pops, rattles, splashes.
function noise(c, t0, dur, vol, type = 'bandpass', from = 2000, to = from) {
  const buffer = c.createBuffer(1, Math.ceil(c.sampleRate * dur), c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buffer;
  const f = c.createBiquadFilter();
  f.type = type;
  f.frequency.setValueAtTime(from, t0);
  f.frequency.exponentialRampToValueAtTime(to, t0 + dur);
  const gain = c.createGain();
  gain.gain.setValueAtTime(vol, t0);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(f);
  f.connect(gain);
  gain.connect(c.destination);
  src.start(t0);
}

// A bell: the note plus an inharmonic overtone, fading out.
function bell(c, t0, freq, vol = 0.18, dur = 0.7) {
  tone(c, 'sine', t0, dur, [[0, freq]], vol);
  tone(c, 'sine', t0, dur * 0.6, [[0, freq * 2.76]], vol * 0.35);
}

const chord = (c, t, notes, step = 0.09, type = 'triangle', vol = 0.12) =>
  notes.forEach((f, i) => tone(c, type, t + i * step, 0.5, [[0, f]], vol));

const SOUNDS = {
  halloween: [
    // "Bhuuu": ghostly wail with tremolo
    (c, t) => {
      const lfo = c.createOscillator();
      const lfoGain = c.createGain();
      lfo.frequency.value = 7;
      lfoGain.gain.value = 18;
      const o = tone(c, 'sine', t, 1.3, [[0, 420], [0.25, 520], [1.3, 150]], 0.3);
      lfo.connect(lfoGain);
      lfoGain.connect(o.frequency);
      lfo.start(t);
      lfo.stop(t + 1.4);
      tone(c, 'sine', t, 0.5, [[0, 110], [0.5, 45]], 0.4);
    },
    // witch cackle: quick falling pulses
    (c, t) => {
      for (let i = 0; i < 7; i++) {
        const base = 760 - i * 35;
        tone(c, 'sawtooth', t + i * 0.12, 0.1, [[0, base], [0.1, base - 220]], 0.16, 1800);
      }
    },
    // creaking door
    (c, t) => {
      const pts = [[0, 140]];
      for (let i = 1; i <= 20; i++) pts.push([i * 0.045, 110 + Math.random() * 170]);
      tone(c, 'sawtooth', t, 0.95, pts, 0.18, 900);
    },
    // scream: fast rise then shaky hold
    (c, t) => {
      const pts = [[0, 500], [0.18, 1500]];
      for (let i = 1; i <= 10; i++) pts.push([0.18 + i * 0.07, 1350 + (i % 2 ? 140 : -140)]);
      pts.push([1.1, 700]);
      tone(c, 'sawtooth', t, 1.1, pts, 0.14, 3200);
      tone(c, 'square', t, 0.9, pts.map(p => [p[0], p[1] * 1.5]), 0.04, 3000);
    }
  ],
  christmas: [
    // "Jingle bells, jingle bells": E E E, E E E, E G C D E, with sleigh bells
    (c, t) => {
      const E = 659, G = 784, C = 523, D = 587;
      [[0, E], [0.18, E], [0.36, E, 0.5], [0.8, E], [0.98, E], [1.16, E, 0.5], [1.6, E], [1.78, G], [1.96, C], [2.2, D], [2.4, E, 0.9]]
        .forEach(([at, f, d]) => bell(c, t + at, f, 0.16, d || 0.35));
      for (let i = 0; i < 12; i++) noise(c, t + i * 0.22, 0.08, 0.05, 'highpass', 7000);
    },
    // "Ho ho ho": three low falling voices
    (c, t) => {
      [0, 0.32, 0.64].forEach(at => tone(c, 'sawtooth', t + at, 0.26, [[0, 150], [0.26, 110]], 0.2, 700));
      bell(c, t + 1.0, 1318, 0.1, 0.8);
    }
  ],
  newyear: [
    // cork pop, fizz, then fireworks crackling
    (c, t) => {
      noise(c, t, 0.06, 0.5, 'bandpass', 900, 400);
      tone(c, 'sine', t, 0.12, [[0, 600], [0.12, 180]], 0.3);
      noise(c, t + 0.1, 0.9, 0.06, 'highpass', 6000);
      for (let i = 0; i < 9; i++) noise(c, t + 1.1 + Math.random() * 0.7, 0.03, 0.18, 'bandpass', 3000);
    },
    // a firework whistle and bang
    (c, t) => {
      tone(c, 'sine', t, 0.8, [[0, 700], [0.8, 2200]], 0.08);
      noise(c, t + 0.8, 0.6, 0.4, 'lowpass', 1800, 200);
      chord(c, t + 1.0, [523, 659, 784, 1046], 0.06);
    }
  ],
  valentine: [
    // a kiss and a sweet chime
    (c, t) => {
      tone(c, 'sine', t, 0.12, [[0, 900], [0.12, 1700]], 0.18);
      chord(c, t + 0.2, [523, 659, 784, 988], 0.11, 'sine', 0.12);
    },
    (c, t) => chord(c, t, [587, 740, 880, 1175], 0.13, 'sine', 0.12)
  ],
  spring: [
    // bird chirps
    (c, t) => {
      for (let i = 0; i < 3; i++) tone(c, 'sine', t + i * 0.16, 0.1, [[0, 2600], [0.05, 4200], [0.1, 3000]], 0.1);
      for (let i = 0; i < 2; i++) tone(c, 'sine', t + 0.7 + i * 0.12, 0.09, [[0, 3800], [0.09, 2400]], 0.09);
    }
  ],
  easter: [
    // a hop and a happy arpeggio
    (c, t) => {
      tone(c, 'sine', t, 0.25, [[0, 220], [0.25, 660]], 0.2);
      chord(c, t + 0.25, [523, 659, 784, 1046]);
    }
  ],
  summer: [
    // a wave and a bright chord
    (c, t) => {
      noise(c, t, 1.1, 0.15, 'bandpass', 400, 2400);
      chord(c, t + 0.5, [587, 740, 880], 0.08, 'triangle', 0.1);
    }
  ],
  blackfriday: [
    // cash register: rattle, then "cha-ching"
    (c, t) => {
      for (let i = 0; i < 4; i++) noise(c, t + i * 0.04, 0.03, 0.15, 'bandpass', 2500);
      bell(c, t + 0.22, 2093, 0.14, 0.4);
      bell(c, t + 0.36, 2637, 0.16, 0.9);
    }
  ]
};

const last = {};
export function playSeason(season) {
  const list = SOUNDS[season];
  const c = list && audio();
  if (!c) return;
  let i = 0;
  if (list.length > 1) { do { i = Math.floor(Math.random() * list.length); } while (i === last[season]); }
  last[season] = i;
  list[i](c, c.currentTime + 0.01);
}
