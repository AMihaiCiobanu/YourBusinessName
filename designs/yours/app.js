// "Your page, your way": the closing page of the demo. The mixer lets a prospect tap the sections
// they liked from the different designs; the choice is added to the "Get my page" email.

import { mountDemo, DESIGNS, designUrl, GET_PAGE_MAILTO } from '../shared/demo.js';

const COLORS = { storybook: '#c9a961', orbit: '#8b5cf6', depth: '#ff3d2e', fullframe: '#b98a45', duo: '#e8553d' };

// Sections a prospect can pick, with the design they come from. `h` is the block height in the
// phone preview, roughly how much room the section takes.
const SECTIONS = [
  { id: 'hero-photo', name: 'Full-screen photo hero', from: 'fullframe', h: 120 },
  { id: 'hero-3d', name: '3D hero with floating photos', from: 'depth', h: 120 },
  { id: 'menu-book', name: 'Menu like a table of contents', from: 'storybook', h: 90 },
  { id: 'planets', name: 'Services as planets', from: 'orbit', h: 100 },
  { id: 'flip', name: 'Price flip cards', from: 'depth', h: 90 },
  { id: 'board', name: 'Barbershop price board', from: 'fullframe', h: 90 },
  { id: 'team', name: 'One tab per team member', from: 'duo', h: 100 },
  { id: 'ring', name: '3D spinning gallery', from: 'depth', h: 80 },
  { id: 'guestbook', name: 'Reviews in a flip book', from: 'storybook', h: 80 },
  { id: 'deck', name: 'Reviews as a card deck', from: 'depth', h: 70 },
  { id: 'console', name: 'Hours as mission control', from: 'orbit', h: 70 },
  { id: 'big-hours', name: 'Today’s hours in huge type', from: 'fullframe', h: 60 }
];

const designName = slug => (DESIGNS.find(d => d.slug === slug)?.label.split(' · ').pop() || slug).replace(/ \(.*\)$/, '');

mountDemo('yours');

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

// Path 1: a link to every design.
const links = document.getElementById('design-links');
for (const d of DESIGNS.filter(d => d.slug !== 'yours')) {
  const li = el('li');
  const a = el('a', null, d.label);
  a.href = designUrl(d.slug);
  a.style.setProperty('--dot', COLORS[d.slug] || '#999');
  li.appendChild(a);
  links.appendChild(li);
}

// Path 2: the mixer.
const chips = document.getElementById('chips');
const stack = document.getElementById('stack');
const empty = document.getElementById('empty');
const send = document.getElementById('send-mix');
const picked = [];

for (const s of SECTIONS) {
  const chip = el('button', 'chip', s.name);
  chip.type = 'button';
  chip.setAttribute('aria-pressed', 'false');
  chip.style.setProperty('--c', COLORS[s.from]);
  chip.appendChild(el('small', null, `from ${designName(s.from)}`));
  chip.addEventListener('click', () => {
    const i = picked.indexOf(s);
    if (i >= 0) picked.splice(i, 1);
    else picked.push(s);
    chip.setAttribute('aria-pressed', String(i < 0));
    render();
  });
  chips.appendChild(chip);
}

// The email is the usual "Get my page" template with the chosen sections added after the
// questions, just before the meeting line (or at the end if the template changes).
function mailto() {
  if (!picked.length) return GET_PAGE_MAILTO;
  const url = new URL(GET_PAGE_MAILTO);
  const subject = url.searchParams.get('subject') || '';
  const body = url.searchParams.get('body') || '';
  const mix = `For my page, I like this mix of sections from your demo:\n${picked.map(s => `- ${s.name} (from ${designName(s.from)})`).join('\n')}\n\n`;
  const at = body.indexOf('I agree to have a meeting');
  const full = at >= 0 ? body.slice(0, at) + mix + body.slice(at) : `${body}\n\n${mix}`;
  return `mailto:${url.pathname}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(full)}`;
}

function render() {
  stack.replaceChildren();
  for (const s of picked) {
    const block = el('li', 'block', s.name);
    block.style.setProperty('--c', COLORS[s.from]);
    block.style.setProperty('--h', `${s.h}px`);
    block.appendChild(el('small', null, designName(s.from)));
    stack.appendChild(block);
  }
  empty.hidden = picked.length > 0;
  send.textContent = picked.length ? `Send me this mix (${picked.length})` : 'Send me this mix';
  send.href = mailto();
}

document.getElementById('reset').addEventListener('click', () => {
  picked.length = 0;
  for (const chip of chips.children) chip.setAttribute('aria-pressed', 'false');
  render();
});

render();
