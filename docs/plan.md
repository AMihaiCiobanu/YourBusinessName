# Plan — configuratorul de pagină (`/designs/builder/`)

O pagină nouă de demo, lângă celelalte design-uri. Clientul alege tipul de business, bifează secțiunile, le schimbă ordinea,
alege tema și culoarea și vede pagina lui live. „Get my page” trimite configurația în emailul existent.

Pagina clasică (`/`) și celelalte design-uri rămân neschimbate. Builder-ul apare în picker sub „More page designs”.

## Decizii de arhitectură

| Subiect | Decizie | De ce |
|---|---|---|
| Stack | HTML + CSS + ES modules, fără build, ca restul repo-ului | Site static pe GitHub Pages |
| Componente | O secțiune = `sections/<id>.js` + `sections/<id>.css`, înregistrată în `core/registry.js` | Se adaugă / scoate o secțiune fără să atingi restul |
| Teme | 3 teme prin variabile CSS (`data-skin`): `luxe` (dark-luxury), `clean` (light-clean), `bold` (bold-colorful) + culoare de accent | O singură bază de CSS; tema nu re-randează conținutul |
| Contrast | Accentul ales de client e corectat automat (`--accent-text`, `--accent-ink`) până la contrast AA | Clientul poate alege orice culoare |
| Stare | JSON `{niche, skin, accent, lang, name, sections}` în URL (`#…`) și `localStorage` (cu try/catch) | Linkul se poate trimite; vizita următoare își amintește |
| Texte | `i18n/en.js`, `i18n/ro.js` (UI) + `content/<nișă>.js` (conținut demo, EN/RO) | Nimic hardcodat în logică |
| Prețuri și program | Prin `designs/shared/live.js` (aceeași logică ca NailsByClemi: `bookingLinks` → `users/{uid}/servicii` + `setari/bookingPublic`, cache 5 min) | Pagina reală citește din Firestore; demo-ul folosește sample-ul în același format |
| Librării | Încărcate la cerere, doar când o secțiune activă se apropie de ecran: Swiper 11 (slidere), StPageFlip 2.0.7 (cartea). Hero-ul 3D e WebGL scris de mână (~3 KB), fără Three.js | Lighthouse mobil ≥ 85 |
| WebGL | Un singur canvas (hero); se oprește când iese din ecran și se distruge la dezactivare | Cerința „un singur canvas” |
| Responsive | Secțiunile folosesc container queries pe `main`, deci arată corect și când panoul builder-ului ocupă o parte din ecran | Previzualizare corectă pe desktop cu panoul deschis |
| Imagini | Unsplash (licență liberă), servite prin CDN-ul lor cu `auto=format` (AVIF/WebP), `srcset`, `loading="lazy"` | Fără descărcări în repo; atribuire în `credits.md` |

### Prețurile vin din Firestore: ce trebuie să suporte fiecare componentă de preț

Răspunsul are forma `{ currency, services: [{ id, name, durationMinutes, price, showPrice, description, isClass, isSubscription }], hours, hasHours, live, failed }`.
Componentele (cartea, lista de prețuri, cardurile, coșul, formularul) trebuie să trateze:

- **orice număr de servicii** (3 sau 60): cartea se paginează măsurând conținutul, nu cu un număr fix pe pagină;
- **nume lungi și descrieri lipsă**;
- `showPrice: false` → „Preț la cerere”, `price: 0` → „Gratuit”;
- grupuri (Servicii / Abonamente / Cursuri) cu titluri doar dacă există mai mult de un grup;
- **stare de încărcare** (skeleton), **eroare** (mesaj + link de programare), **re-randare** când vine răspunsul proaspăt după cache;
- monedă din cont (`RON` → „lei”, `EUR` → „€” etc., prin `formatPrice`).

În demo, `?link=<id>` încarcă prețurile reale ale unui cont (util înainte de o întâlnire cu un client),
iar `?sample=many` generează 30 de servicii ca să vezi paginarea cărții.

## Secțiuni propuse

Efort: S < ½ zi, M ½–1 zi, L > 1 zi. Cost de performanță: ce adaugă la încărcare și pe telefon.

| # | ID | Secțiune | Descriere | Efort | Impact vizual | Cost perf. | Prioritate | MVP |
|---|---|---|---|---|---|---|---|---|
| 1 | `hero` | Hero 3D | Particule WebGL care reacționează la mouse / giroscop, titlu cu split text, stiva de poze în CSS 3D; fallback static | L | Foarte mare | Mediu (WebGL pornește după încărcare) | P0 | ✅ |
| 2 | `book` | Carte de prețuri | Meniul de servicii ca o carte 3D cu page curl (StPageFlip): drag pe colț, click, săgeți, butoane, sunet opțional | L | Foarte mare | Mediu (~12 KB gz, la cerere) | P0 | ✅ |
| 3 | `slider` | Slider fullscreen | Autoplay, swipe, parallax pe text, buton de pauză | M | Mare | Mediu (Swiper la cerere) | P0 | ✅ |
| 4 | `coverflow` | Galerie coverflow 3D | Swiper effect-coverflow | S | Mare | Mediu (Swiper partajat) | P1 | ✅ |
| 5 | `compare` | Before / after | Mâner tras cu mouse/touch/tastatură | S | Mare | Mic | P0 | ✅ |
| 6 | `filmstrip` | Filmstrip | Poza mare + bandă de thumbnails (Swiper thumbs) | S | Mediu | Mediu (Swiper partajat) | P1 | ✅ |
| 7 | `services` | Carduri servicii 3D | Tilt 3D cu reflex de lumină la hover/touch | S | Mediu | Mic | P0 | ✅ |
| 8 | `team` | Echipa | Flip cards: poză / specialități + „Programează-te la …” | M | Mediu | Mic | P1 | ✅ |
| 9 | `prices` | Listă de prețuri | Listă clasică, grupată, cu „vezi tot” | S | Mic | Mic | P0 | ✅ |
| 10 | `hours` | Program + „Deschis acum” | Tabel, badge live și banda zilei de azi cu indicator „acum” (original) | M | Mare | Mic | P0 | ✅ |
| 11 | `map` | Hartă | Hartă SVG stilizată în culorile temei; Google Maps se încarcă doar la tap (original) | M | Mediu | Mic | P0 | ✅ |
| 12 | `reviews` | Recenzii | Carusel cu scroll-snap, autoplay oprit la hover/focus | S | Mediu | Mic | P0 | ✅ |
| 13 | `faq` | Întrebări frecvente | Acordeon `<details>` animat | S | Mic | Mic | P1 | ✅ |
| 14 | `stats` | Cifre animate | Counter la scroll (clienți, ani, rating) | S | Mediu | Mic | P1 | ✅ |
| 15 | `insta` | Galerie Instagram | Grilă pătrată cu overlay și lightbox | S | Mediu | Mic (lazy) | P1 | ✅ |
| 16 | `products` | Produse | Produse de vânzare adăugate manual (nu vin din aplicație), „Rezervă la salon” | M | Mare | Mic | P0 | ✅ |
| 17 | `basket` | Coș de servicii | Bifezi servicii → durată și preț total → programare (original) | M | Mare | Mic | P1 | ✅ |
| 18 | `gift` | Gift card 3D | Card care se înclină și se întoarce; alegi suma și numele (original) | M | Mare | Mic | P1 | ✅ |
| 19 | `loyalty` | Card de fidelitate | Ștampile care se bat la scroll (original) | S | Mediu | Mic | P2 | ✅ |
| 20 | `booking` | Formular de programare | Serviciu din lista live, dată, oră din program, nume, telefon | M | Mare | Mic | P0 | ✅ |
| 21 | `contactbar` | Bară WhatsApp / telefon | Lipită jos, cu programare și starea „deschis” | S | Mare | Mic | P0 | ✅ |
| 22 | — | Animații la scroll | Reveal, parallax, split text (IntersectionObserver, fără GSAP) | M | Mare | Mic | P0 | ✅ (sistem comun) |
| 23 | `quiz` | Quiz „ce ți se potrivește” | 3 întrebări → serviciu recomandat | M | Mediu | Mic | P2 | backlog |
| 24 | `vehicle` | Mărime vehicul (detailing) | S / M / SUV schimbă prețurile | S | Mediu | Mic | P2 | backlog |
| 25 | `palette` | Paletă de culori (nails) | Alegi oja, mâna ilustrată se recolorează | M | Mediu | Mic | P3 | backlog |
| 26 | `nextslot` | Următorul loc liber | Necesită sloturile din aplicație (API nou) | L | Mare | Mic | P2 | backlog |
| 27 | `video` | Hero video | Video scurt, fără sunet, cu poster | S | Mare | Mare | P3 | backlog |
| 28 | `membership` | Abonamente | Pachete lunare (există `isSubscription` în date) | M | Mediu | Mic | P2 | backlog |
| 29 | `locations` | Mai multe locații | Carduri pe locație, fiecare cu link de programare | M | Mediu | Mic | P3 | backlog |
| 30 | `journal` | Blog / sfaturi | Articole scurte | M | Mic | Mic | P3 | backlog |

## MVP ales

Secțiunile 1–22. Elementele originale din MVP: cartea alimentată live, coșul de servicii, banda zilei de azi, gift card-ul 3D,
cardul de fidelitate și harta stilizată cu încărcare la tap (cerința era minimum 3).

Builder-ul (panou lateral pe desktop, bottom sheet pe mobil):

- tipul de business: salon de înfrumusețare, nails, barber, masaj & spa, car detailing, personal trainer, cabinet / clinică, tattoo;
- numele business-ului (apare live în pagină și în email);
- secțiuni: bifă, drag & drop pe mâner, săgeți sus/jos (44 px) și Alt+↑/↓ din tastatură;
- tema (3) și culoarea de accent (presetări + culoare liberă);
- limba RO / EN;
- „Copiază linkul”, „Resetează”, „Trimite-mi pagina asta” (emailul existent + configurația).

Pagina implicită are activ un set echilibrat (hero, servicii, carte, before/after, cifre, coverflow, echipă, recenzii, program,
hartă, FAQ, formular, bară de contact), ca să fie rapidă la prima vizită. Restul se pornesc din panou.

## Criterii de acceptare

- Lighthouse mobil ≥ 85 pe configurația implicită; fără erori în consolă.
- `prefers-reduced-motion`: fără WebGL, fără tilt, fără autoplay; cartea întoarce pagina fără animație lungă.
- Fără WebGL: hero static; fără JS pentru o librărie (CDN căzut): secțiunea afișează varianta simplă.
- 360 px fără scroll orizontal; ținte ≥ 44 px; contrast AA în toate temele; navigare din tastatură; `aria-label` pe controale.
- Cartea: drag (mouse + touch), click pe colț, săgeți, butoane, o singură pagină pe mobil.
