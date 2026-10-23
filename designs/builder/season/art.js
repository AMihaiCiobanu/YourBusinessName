// Drawings for the seasonal themes (inline SVG, no files): one mascot per season (a button bottom
// left that reacts and makes a sound when tapped), small shapes that fall or float over the page,
// and the corner pieces. Mascot parts with class `eye` / `mouth` react when it is tapped.
// The Halloween pieces are the ones from NailsByClemi (halloween.js there).

export const BAT = '<path class="wing" d="M20 14c-3-6-9-9-18-8 4 2 5 5 5 8-2 0-4 1-5 3 4-1 7 0 9 3 1-3 4-4 9-4z"/>'
  + '<path class="wing" d="M20 14c3-6 9-9 18-8-4 2-5 5-5 8 2 0 4 1 5 3-4-1-7 0-9 3-1-3-4-4-9-4z"/>'
  + '<ellipse cx="20" cy="16" rx="3.2" ry="5"/><path d="M17.5 11.5l1-4 1.5 2 1.5-2 1 4z"/>';

export const WEB = '<svg class="sz-web" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">'
  + '<path d="M0 0L120 0M0 0L105 60M0 0L60 105M0 0L0 120M0 0L100 100"/>'
  + '<path d="M30 0Q26 26 0 30M60 0Q52 52 0 60M90 0Q78 78 0 90M118 0Q104 104 0 118"/></svg>';

const PUMPKIN = '<svg class="sz-corner" viewBox="0 0 80 70" aria-hidden="true">'
  + '<path d="M38 12c0-5 2-8 6-9" stroke="#6bbf59" stroke-width="4" stroke-linecap="round" fill="none"/>'
  + '<ellipse cx="22" cy="40" rx="18" ry="24" fill="#e8620c"/><ellipse cx="58" cy="40" rx="18" ry="24" fill="#e8620c"/>'
  + '<ellipse cx="40" cy="40" rx="20" ry="26" fill="#ff7a1a"/>'
  + '<path d="M26 34l7 10-14 0zM54 34l7 10-14 0z" fill="#2a0f4d"/>'
  + '<path d="M24 52q16 14 32 0l-4-2-4 4-4-4-4 4-4-4-4 4-4-4z" fill="#2a0f4d"/></svg>';

const TREE = '<svg class="sz-corner" viewBox="0 0 80 100" aria-hidden="true">'
  + '<rect x="34" y="82" width="12" height="14" rx="2" fill="#6b4529"/>'
  + '<path d="M40 10L64 44H16z" fill="#2f9a5f"/><path d="M40 28L70 66H10z" fill="#278350"/><path d="M40 48L76 88H4z" fill="#1f6d42"/>'
  + '<path d="M40 2l2.6 5.4 5.9.8-4.3 4.1 1 5.9L40 15.4l-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z" fill="#f5c542"/>'
  + '<g class="sz-blink"><circle cx="34" cy="38" r="3" fill="#e23b3b"/><circle cx="50" cy="56" r="3" fill="#f5c542"/><circle cx="26" cy="72" r="3" fill="#4cc9f0"/><circle cx="56" cy="80" r="3" fill="#e23b3b"/></g>'
  + '<g class="sz-blink b"><circle cx="46" cy="36" r="3" fill="#4cc9f0"/><circle cx="30" cy="56" r="3" fill="#e23b3b"/><circle cx="44" cy="74" r="3" fill="#f5c542"/></g></svg>';

const BASKET = '<svg class="sz-corner" viewBox="0 0 90 72" aria-hidden="true">'
  + '<path d="M14 36q31-42 62 0" stroke="#a8742a" stroke-width="4" fill="none"/>'
  + '<ellipse cx="28" cy="32" rx="11" ry="14" fill="#ffd166"/><path d="M18 30l5-4 5 4 5-4 5 4" stroke="#8ac926" stroke-width="2.5" fill="none"/>'
  + '<ellipse cx="62" cy="32" rx="11" ry="14" fill="#ffafcc"/><path d="M52 34h20" stroke="#fff" stroke-width="3"/>'
  + '<ellipse cx="45" cy="28" rx="11" ry="14" fill="#8ecae6"/><circle cx="41" cy="24" r="2" fill="#fff"/><circle cx="49" cy="30" r="2" fill="#fff"/><circle cx="43" cy="34" r="2" fill="#fff"/>'
  + '<path d="M6 38h78l-9 30H15z" fill="#c8913b"/><path d="M10 48h70M13 58h64" stroke="#a8742a" stroke-width="2"/>'
  + '<path d="M26 38l-3 30M45 38v30M64 38l3 30" stroke="#a8742a" stroke-width="2"/></svg>';

const BALL = '<svg class="sz-corner sz-bounce" viewBox="0 0 60 60" aria-hidden="true">'
  + '<circle cx="30" cy="30" r="28" fill="#fff"/>'
  + '<path d="M30 2a28 28 0 0 1 24 14L30 30z" fill="#ef476f"/><path d="M58 30a28 28 0 0 1-14 24L30 30z" fill="#ffd166"/>'
  + '<path d="M30 58a28 28 0 0 1-24-14L30 30z" fill="#06d6a0"/><path d="M2 30A28 28 0 0 1 16 6l14 24z" fill="#118ab2"/>'
  + '<circle cx="30" cy="30" r="5" fill="#fff"/><circle cx="30" cy="30" r="28" fill="none" stroke="#0f2a33" stroke-opacity=".2" stroke-width="2"/></svg>';

const BRANCH = '<svg class="sz-branch" viewBox="0 0 220 120" aria-hidden="true">'
  + '<path d="M0 12C50 20 90 30 130 54s70 30 90 32M70 26c10 16 12 30 8 46M140 58c-4-18 0-32 10-42" stroke="#6b4a33" stroke-width="4" fill="none" stroke-linecap="round"/>'
  + [[60, 22], [100, 36], [78, 64], [134, 56], [150, 18], [180, 72], [30, 14]].map(([x, y], i) =>
    `<g transform="translate(${x} ${y}) rotate(${i * 23})">${[0, 72, 144, 216, 288].map(a => `<ellipse cx="0" cy="-6" rx="4.6" ry="6.5" fill="${i % 2 ? '#ffc4d6' : '#ffd9e4'}" transform="rotate(${a})"/>`).join('')}<circle r="2.6" fill="#ff7096"/></g>`).join('')
  + '</svg>';

// The Black Friday sash across the top right corner (decorative; the ribbon says it in words).
const SASH = '<div class="sz-sash" aria-hidden="true"><span>BLACK FRIDAY</span></div>';

// ---------- small falling / floating shapes ----------

const SNOW = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"><path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M12 5l-2-2M12 5l2-2M12 19l-2 2M12 19l2 2"/></svg>';
const heart = c => `<svg viewBox="0 0 24 22"><path d="M12 21C5 16 1 12 1 7a5.5 5.5 0 0 1 11-1 5.5 5.5 0 0 1 11 1c0 5-4 9-11 14z" fill="${c}"/></svg>`;
const petal = c => `<svg viewBox="0 0 20 24"><path d="M10 1C4 7 2 13 5 19c2 4 8 4 10 0 3-6 1-12-5-18z" fill="${c}"/></svg>`;
const confetti = c => `<svg viewBox="0 0 10 16"><rect width="10" height="16" rx="2" fill="${c}"/></svg>`;
const star = c => `<svg viewBox="0 0 24 24"><path d="M12 1l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="${c}"/></svg>`;
const egg = (c, s) => `<svg viewBox="0 0 20 26"><ellipse cx="10" cy="14" rx="9" ry="11.5" fill="${c}"/><path d="M2 14l4-3 4 3 4-3 4 3" stroke="${s}" stroke-width="2" fill="none"/></svg>`;
const bubble = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10.5" fill="#bdeef5" fill-opacity=".35" stroke="#4cc0d0" stroke-width="1.2"/><circle cx="8" cy="8" r="2.5" fill="#fff" fill-opacity=".8"/></svg>';
const coin = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffd60a"/><circle cx="12" cy="12" r="8" fill="none" stroke="#c9a400" stroke-width="1.6"/><path d="M9 15l6-6M9.5 9.5h.01M14.5 14.5h.01" stroke="#7a6200" stroke-width="2.2" stroke-linecap="round"/></svg>';
const leaf = c => `<svg viewBox="0 0 24 24"><path d="M12 2l2 5 5-2-2 5 5 2-5 3 1 5-5-2-1 6-1-6-5 2 1-5-5-3 5-2-2-5 5 2z" fill="${c}"/></svg>`;

// ---------- mascots ----------

const SCARECROW = '<svg viewBox="0 0 120 200" aria-hidden="true">'
  + '<rect x="55" y="100" width="10" height="100" rx="3" fill="#5a3a22"/>'
  + '<rect x="6" y="86" width="108" height="9" rx="4.5" fill="#6b4529"/>'
  + '<g stroke="#d6213f" stroke-width="3" stroke-linecap="round"><path d="M8 88l-8-5M8 91l-9 1M8 94l-8 5M112 88l8-5M112 91l9 1M112 94l8 5"/></g>'
  + '<g stroke="#e0a43a" stroke-width="2.5" stroke-linecap="round"><path d="M44 150l-6 12M52 152l-2 14M60 153v14M68 152l2 14M76 150l6 12"/></g>'
  + '<path d="M32 88h56l-6 64H38z" fill="#7a3b9f"/><path d="M32 88h56v8H32z" fill="#5d2b7c"/>'
  + '<rect x="42" y="110" width="16" height="16" rx="2" fill="#ff7a1a" transform="rotate(-6 50 118)"/>'
  + '<rect x="66" y="124" width="14" height="14" rx="2" fill="#3c2a1a" transform="rotate(8 73 131)"/>'
  + '<path d="M44 114l12 0M44 119l12 0" stroke="#2a0f4d" stroke-width="1.2" stroke-dasharray="2 2" transform="rotate(-6 50 118)"/>'
  + '<circle cx="60" cy="60" r="25" fill="#e8c277"/>'
  + '<path class="eye" d="M44 52l11 4-11 4z M76 52l-11 4 11 4z"/>'
  + '<path d="M58 62l2 6 2-6z" fill="#b78a3c"/>'
  + '<path class="mouth" d="M46 74l4-4 5 4 5-4 5 4 5-4 4 4" fill="none" stroke="#2a0f4d" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'
  + '<path d="M50 70v8M60 70v8M70 70v8" stroke="#2a0f4d" stroke-width="1.4" stroke-linecap="round" opacity=".7"/>'
  + '<g stroke="#e0a43a" stroke-width="2.5" stroke-linecap="round"><path d="M36 46l-9 3M35 54l-10 4M85 46l9 3M85 54l10 4"/></g>'
  + '<ellipse cx="60" cy="40" rx="40" ry="8" fill="#2b1d3d"/>'
  + '<path d="M40 38c0-18 6-30 20-30s20 12 20 30z" fill="#352350"/>'
  + '<rect x="40" y="30" width="40" height="8" fill="#ff7a1a"/>'
  + '<circle cx="76" cy="30" r="5" fill="#f4ecff"/><circle cx="76" cy="30" r="2" fill="#e8620c"/></svg>';

const SNOWMAN = '<svg viewBox="0 0 120 172" aria-hidden="true">'
  + '<ellipse cx="60" cy="164" rx="44" ry="7" fill="#000" opacity=".2"/>'
  + '<path d="M38 112L12 94M20 99l-7-9M82 112l26-18M100 99l6-10" stroke="#6b4529" stroke-width="4" stroke-linecap="round"/>'
  + '<circle cx="60" cy="126" r="38" fill="#f7fbff" stroke="#c9dcec" stroke-width="2"/>'
  + '<circle cx="60" cy="72" r="27" fill="#f7fbff" stroke="#c9dcec" stroke-width="2"/>'
  + '<circle cx="60" cy="112" r="3.6" fill="#2b2b2b"/><circle cx="60" cy="128" r="3.6" fill="#2b2b2b"/><circle cx="60" cy="144" r="3.6" fill="#2b2b2b"/>'
  + '<path d="M35 92q25 12 50 0v9q-25 12-50 0z" fill="#d6213f"/><path d="M66 100l12 2-2 24-10-2z" fill="#b81b35"/>'
  + '<circle class="eye" cx="51" cy="66" r="3.2"/><circle class="eye" cx="69" cy="66" r="3.2"/>'
  + '<path d="M60 72l18 4-18 4z" fill="#ff7a1a"/>'
  + '<path class="mouth" d="M49 84q11 8 22 0" stroke="#2b2b2b" stroke-width="2.6" stroke-linecap="round" fill="none"/>'
  + '<ellipse cx="60" cy="47" rx="30" ry="5" fill="#1d1d1d"/><rect x="44" y="16" width="32" height="31" rx="2" fill="#2b2b2b"/>'
  + '<rect x="44" y="37" width="32" height="6" fill="#d6213f"/><circle cx="71" cy="37" r="3" fill="#2f9a5f"/><circle cx="74" cy="40" r="2.4" fill="#e23b3b"/></svg>';

const CHAMPAGNE = '<svg viewBox="0 0 120 172" aria-hidden="true">'
  + '<ellipse cx="60" cy="164" rx="44" ry="7" fill="#000" opacity=".25"/>'
  + '<rect class="cork" x="40" y="8" width="12" height="13" rx="3" fill="#d9a35b"/>'
  + '<rect x="38" y="18" width="16" height="18" rx="3" fill="#f5c542"/><rect x="40" y="32" width="12" height="26" fill="#1f5132"/>'
  + '<path d="M32 72q0-14 8-16h12q8 2 8 16v84q0 6-6 6H38q-6 0-6-6z" fill="#1f5132"/>'
  + '<path d="M36 76q0-8 4-10" stroke="#fff" stroke-opacity=".35" stroke-width="3" stroke-linecap="round" fill="none"/>'
  + '<rect x="34" y="98" width="24" height="30" rx="4" fill="#f5e6b8"/>'
  + '<circle class="eye" cx="41" cy="108" r="2.4"/><circle class="eye" cx="51" cy="108" r="2.4"/>'
  + '<path class="mouth" d="M41 116q5 5 10 0" stroke="#3b2a0a" stroke-width="2" stroke-linecap="round" fill="none"/>'
  + '<path d="M74 96h28l-5 22q-9 7-18 0z" fill="#f5c542" fill-opacity=".85" stroke="#fff3c4" stroke-width="1.5"/>'
  + '<path d="M88 122v32M78 156h20" stroke="#fff3c4" stroke-width="3" stroke-linecap="round"/>'
  + '<circle class="fizz" cx="84" cy="106" r="1.8" fill="#fff"/><circle class="fizz" cx="92" cy="102" r="1.4" fill="#fff"/><circle class="fizz" cx="88" cy="110" r="1.2" fill="#fff"/></svg>';

const HEART = '<svg viewBox="0 0 120 172" aria-hidden="true">'
  + '<ellipse cx="60" cy="166" rx="34" ry="6" fill="#000" opacity=".15"/>'
  + '<path d="M50 146l-4 18M70 146l4 18M40 164h10M70 164h10" stroke="#8a1538" stroke-width="3.4" stroke-linecap="round"/>'
  + '<ellipse cx="12" cy="74" rx="12" ry="20" fill="#fff" opacity=".9" transform="rotate(-24 12 74)"/><ellipse cx="108" cy="74" rx="12" ry="20" fill="#fff" opacity=".9" transform="rotate(24 108 74)"/>'
  + '<path d="M60 150C20 120 6 94 14 66c8-26 40-30 46-6 6-24 38-20 46 6 8 28-6 54-46 84z" fill="#ff4d7a"/>'
  + '<ellipse cx="34" cy="66" rx="7" ry="12" fill="#fff" opacity=".35" transform="rotate(30 34 66)"/>'
  + '<circle class="eye" cx="47" cy="92" r="4.2"/><circle class="eye" cx="73" cy="92" r="4.2"/>'
  + '<circle cx="48.4" cy="90.6" r="1.4" fill="#fff"/><circle cx="74.4" cy="90.6" r="1.4" fill="#fff"/>'
  + '<circle cx="38" cy="104" r="6" fill="#ff9fb8"/><circle cx="82" cy="104" r="6" fill="#ff9fb8"/>'
  + '<path class="mouth" d="M52 104q8 8 16 0" stroke="#5a0b25" stroke-width="2.6" stroke-linecap="round" fill="none"/></svg>';

const TULIPS = '<svg viewBox="0 0 120 172" aria-hidden="true">'
  + '<ellipse cx="60" cy="166" rx="36" ry="6" fill="#000" opacity=".15"/>'
  + '<path d="M60 116V60M46 116q-4-28-10-44M74 116q4-28 10-42" stroke="#4c9a2a" stroke-width="4" stroke-linecap="round" fill="none"/>'
  + '<path d="M60 104q-18-6-22-26 16 6 22 26zM60 100q18-6 22-26-16 6-22 26z" fill="#5cb338"/>'
  + '<path d="M48 46q0 18 12 20 12-2 12-20l-6 6-6-10-6 10z" fill="#ff5c8a"/>'
  + '<path d="M24 58q0 18 12 20 12-2 12-20l-6 6-6-10-6 10z" fill="#ffd166"/>'
  + '<path d="M72 60q0 18 12 20 12-2 12-20l-6 6-6-10-6 10z" fill="#ff8fb1"/>'
  + '<path d="M34 128h52l-6 34H40z" fill="#c8643b"/><rect x="30" y="116" width="60" height="14" rx="4" fill="#d9774c"/>'
  + '<circle class="eye" cx="51" cy="140" r="2.8"/><circle class="eye" cx="69" cy="140" r="2.8"/>'
  + '<path class="mouth" d="M54 148q6 5 12 0" stroke="#5a2410" stroke-width="2.2" stroke-linecap="round" fill="none"/>'
  + '<path d="M86 30l2 5 5 1-4 3 1 5-4-3-4 3 1-5-4-3 5-1z" fill="#e5486b"/><path d="M84 18c4 4 4 8 2 12" stroke="#e5486b" stroke-width="1.4" fill="none"/></svg>';

const BUNNY = '<svg viewBox="0 0 120 172" aria-hidden="true">'
  + '<ellipse cx="60" cy="166" rx="40" ry="6" fill="#000" opacity=".15"/>'
  + '<ellipse cx="46" cy="34" rx="10" ry="28" fill="#fff" stroke="#e6d9ea" stroke-width="2" transform="rotate(-10 46 34)"/><ellipse cx="46" cy="36" rx="5" ry="20" fill="#ffc2d6" transform="rotate(-10 46 36)"/>'
  + '<ellipse cx="74" cy="34" rx="10" ry="28" fill="#fff" stroke="#e6d9ea" stroke-width="2" transform="rotate(10 74 34)"/><ellipse cx="74" cy="36" rx="5" ry="20" fill="#ffc2d6" transform="rotate(10 74 36)"/>'
  + '<ellipse cx="60" cy="128" rx="34" ry="32" fill="#fff" stroke="#e6d9ea" stroke-width="2"/>'
  + '<ellipse cx="44" cy="158" rx="12" ry="6" fill="#fff" stroke="#e6d9ea" stroke-width="2"/><ellipse cx="76" cy="158" rx="12" ry="6" fill="#fff" stroke="#e6d9ea" stroke-width="2"/>'
  + '<circle cx="60" cy="80" r="28" fill="#fff" stroke="#e6d9ea" stroke-width="2"/>'
  + '<circle class="eye" cx="50" cy="76" r="3.4"/><circle class="eye" cx="70" cy="76" r="3.4"/>'
  + '<circle cx="45" cy="88" r="5" fill="#ffc2d6" opacity=".8"/><circle cx="75" cy="88" r="5" fill="#ffc2d6" opacity=".8"/>'
  + '<path d="M57 84h6l-3 4z" fill="#ff8fb1"/>'
  + '<path class="mouth" d="M60 88q-4 5-8 2M60 88q4 5 8 2" stroke="#3a2a4a" stroke-width="2" stroke-linecap="round" fill="none"/>'
  + '<ellipse cx="60" cy="128" rx="14" ry="17" fill="#ffd166"/><path d="M47 126l4-4 4 4 4-4 4 4 4-4 4 4" stroke="#8ac926" stroke-width="2.6" fill="none"/>'
  + '<circle cx="55" cy="136" r="2" fill="#ef476f"/><circle cx="65" cy="138" r="2" fill="#118ab2"/></svg>';

const SUN = '<svg viewBox="0 0 120 150" aria-hidden="true">'
  + '<g class="rays" stroke="#ffb703" stroke-width="6" stroke-linecap="round">'
  + Array.from({ length: 12 }, (_, i) => { const a = (i * Math.PI) / 6; const p = r => [60 + Math.cos(a) * r, 66 + Math.sin(a) * r].map(v => v.toFixed(1)); const [x1, y1] = p(44); const [x2, y2] = p(56); return `<path d="M${x1} ${y1}L${x2} ${y2}"/>`; }).join('')
  + '</g><circle cx="60" cy="66" r="36" fill="#ffd23f"/>'
  + '<circle cx="40" cy="80" r="5" fill="#ff8a3d" opacity=".6"/><circle cx="80" cy="80" r="5" fill="#ff8a3d" opacity=".6"/>'
  + '<rect x="32" y="52" width="24" height="15" rx="7" fill="#1d1d2b"/><rect x="64" y="52" width="24" height="15" rx="7" fill="#1d1d2b"/><path d="M56 57h8M32 56l-6-3M88 56l6-3" stroke="#1d1d2b" stroke-width="3"/>'
  + '<path class="eye" d="M37 57l6-2" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path class="eye" d="M69 57l6-2" stroke="#fff" stroke-width="2" stroke-linecap="round"/>'
  + '<path class="mouth" d="M46 82q14 14 28 0" stroke="#8a4b00" stroke-width="3" stroke-linecap="round" fill="none"/>'
  + '<ellipse cx="60" cy="142" rx="30" ry="5" fill="#000" opacity=".12"/></svg>';

const BAG = '<svg viewBox="0 0 120 172" aria-hidden="true">'
  + '<ellipse cx="60" cy="164" rx="44" ry="7" fill="#000" opacity=".35"/>'
  + '<path d="M42 58q0-30 18-30t18 30" stroke="#ffd60a" stroke-width="5" fill="none" stroke-linecap="round"/>'
  + '<path d="M24 58h72l7 100H17z" fill="#111" stroke="#ffd60a" stroke-width="3" stroke-linejoin="round"/>'
  + '<circle class="eye" cx="46" cy="98" r="4.4"/><circle class="eye" cx="74" cy="98" r="4.4"/>'
  + '<path class="mouth" d="M46 114q14 12 28 0" stroke="#ffd60a" stroke-width="3" stroke-linecap="round" fill="none"/>'
  + '<g class="tag" transform="rotate(14 92 70)"><path d="M78 60h30a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H78l-8-14z" fill="#ffd60a"/><circle cx="78" cy="74" r="2.6" fill="#111"/>'
  + '<text x="94" y="80" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="800" font-size="17" fill="#111">%</text></g></svg>';

// ---------- the seasons ----------
// fall: shapes over the page (`up` floats them upwards), garland: a string across the top of the
// page, corner: a piece at the bottom right of the first screen, extra: more markup in that area.

const pick = (list, n) => Array.from({ length: n }, (_, i) => list[i % list.length]);

export const ART = {
  halloween: { emoji: '🎃', mascot: SCARECROW, corner: PUMPKIN, extra: WEB, bats: true, spiders: true,
    fall: { items: [leaf('#ff7a1a'), leaf('#c1440e'), leaf('#8a5cc0')], count: 6, size: [16, 26] } },
  blackfriday: { emoji: '🛍️', mascot: BAG, extra: SASH,
    fall: { items: [coin, coin, star('#ffd60a')], count: 10, size: [14, 24] } },
  christmas: { emoji: '🎄', mascot: SNOWMAN, corner: TREE, garland: 'bulb',
    fall: { items: [SNOW], count: 18, size: [10, 22] } },
  newyear: { emoji: '🥂', mascot: CHAMPAGNE, fireworks: true,
    fall: { items: [confetti('#f5c542'), confetti('#ff4d6d'), confetti('#4cc9f0'), confetti('#b8f2e6'), star('#f5c542')], count: 18, size: [7, 14], spin: true } },
  valentine: { emoji: '💝', mascot: HEART, garland: 'heart',
    fall: { items: [heart('#ff4d7a'), heart('#ff8fab'), heart('#e0245e')], count: 12, size: [12, 24], up: true } },
  spring: { emoji: '🌷', mascot: TULIPS, extra: BRANCH,
    fall: { items: [petal('#ffc4d6'), petal('#ffd9e4'), petal('#fff')], count: 14, size: [10, 18], spin: true } },
  easter: { emoji: '🐣', mascot: BUNNY, corner: BASKET, garland: 'flag',
    fall: { items: [petal('#ffe08a'), petal('#c8e7a7'), egg('#d7c4f5', '#fff'), egg('#ffd6e0', '#8ac926')], count: 10, size: [10, 18], spin: true } },
  summer: { emoji: '☀️', mascot: SUN, corner: BALL,
    fall: { items: [bubble], count: 10, size: [14, 30], up: true } }
};

export const GARLAND = {
  bulb: pick(['#e23b3b', '#f5c542', '#2f9a5f', '#4cc9f0'], 24),
  heart: pick(['#ff4d7a', '#ffb3c6', '#e0245e'], 18).map(heart),
  flag: pick(['#ffd166', '#cdb4db', '#a8dadc', '#ffafcc', '#b5e48c'], 22)
};

export const BURST = {
  halloween: [leaf('#ff7a1a'), leaf('#8a5cc0')],
  blackfriday: [coin, star('#ffd60a')],
  christmas: [SNOW, star('#f5c542')],
  newyear: [star('#f5c542'), star('#ff4d6d'), star('#4cc9f0')],
  valentine: [heart('#ff4d7a'), heart('#e0245e')],
  spring: [petal('#ffc4d6'), petal('#ff7096')],
  easter: [egg('#ffd166', '#8ac926'), egg('#8ecae6', '#fff'), egg('#ffafcc', '#fff')],
  summer: [bubble, star('#ffb703')]
};
