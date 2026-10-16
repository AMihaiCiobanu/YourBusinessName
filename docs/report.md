# Raport — configurator de pagină, design-uri dental și derma

Branch: `feature/page-builder` (repo `YourBusinessName`). Nimic nu e împins (push) și nimic nu e publicat.
Branch-uri locale și în celelalte două site-uri: `demo-pages-links` (AppointmentsWEB) și `demo-pages-cards` (SoftsappsWEB).

## Ce am implementat

### 1. Configuratorul — `/designs/builder/`

O pagină nouă de demo, în picker sub „More page designs” → „✦ Build your own: mix sections, theme, colour”.

- **Panou builder**: lateral pe ecrane ≥ 1100 px (împinge pagina, nu o acoperă), bottom sheet pe telefon (buton „Customize”).
  - **Pornește de la o pagină gata făcută**: 10 modele (barber, salon, nails, spa, detailing, trainer, dentist,
    dermatolog, kineto, tattoo) — un tap setează nișa, tema, culoarea și secțiunile. Pentru cine nu vrea să configureze.
  - **Secțiuni**: bifă, drag & drop pe mâner (mouse și touch), săgeți sus/jos, Alt + ↑/↓ din tastatură, anunțuri pentru
    cititoare de ecran.
  - **Stil**: tipul afacerii (10), numele afacerii (apare live pe pagină și în email), tema (Lux întunecat / Luminos /
    Îndrăzneț), culoare de accent (10 presetări + orice culoare, corectată automat pentru contrast AA), limba RO/EN,
    „Reduce animațiile”, previzualizare pe telefon (desktop).
  - **Copiază linkul**, **Resetează**, **Trimite-mi pagina asta** (emailul „Get my page” existent + configurația).
  - Nota „Vrei ceva complet nou?” și „Mereu incluse”, preluate din pagina `yours`.
- **Starea**: JSON `{niche, skin, accent, lang, name, order, on}` în URL (`#n=…&k=…&s=hero.book…`) și în `localStorage`
  (cu try/catch). Linkul reproduce pagina exact.
- **Emailul „Get my page”** primește, înainte de rândul cu întâlnirea, un bloc în engleză:
  ```
  My page setup from the page builder:
  - Type of business: Barbershop
  - Theme: Dark luxury, accent colour #b87333
  - Page language: Romanian
  - Sections, in order: 3D hero, Price menu as a 3D book, …
  - Link to this setup: https://yourbusinessname.appointmentsapps.com/designs/builder/#…
  ```
  Skill-ul `/client-nou` știe acum de acest bloc.

**21 de secțiuni**, fiecare în `sections/<id>.js` + `sections/<id>.css`:

| Secțiune | Ce face |
|---|---|
| Hero 3D | Particule WebGL scrise de mână (fără Three.js) care urmăresc mouse-ul / giroscopul, titlu animat cuvânt cu cuvânt, stivă de poze în CSS 3D. Pornește la prima interacțiune; fallback static fără WebGL / cu reduced motion |
| Carte de prețuri | StPageFlip 2.0.7: page curl cu umbră, drag pe colț (mouse și touch), tap pe margini, săgeți, butoane, Home/End, sunet opțional (oprit implicit, generat cu WebAudio). Două pagini pe desktop, una pe telefon. Paginare **prin măsurare** (orice număr de servicii, nume lungi), cuprins, program, buton de programare |
| Slider fullscreen | Swiper: autoplay cu buton de pauză, swipe, parallax pe text |
| Galerie 3D coverflow · Filmstrip | Swiper coverflow / thumbs, lightbox |
| Before / after | Mâner tras cu mouse/touch, `input range` real (tastatură, cititoare de ecran) |
| Carduri servicii | Tilt 3D cu reflex de lumină, din datele live |
| Listă de prețuri | Pe grupe (Servicii / Abonamente / Cursuri), „Vezi toate” |
| Planificator de vizită (original) | Bifezi servicii → durată și preț total → programare |
| Program (original) | „Deschis acum” live + banda zilei cu indicator „acum” care se mișcă |
| Hartă (original) | Hartă SVG în culorile temei; Google Maps se încarcă doar la tap |
| Echipa | Flip cards cu specialități și „Programează-te la …” |
| Produse | Produse adăugate **manual** (nu vin din aplicație), „Rezervă” |
| Card cadou 3D (original) | Se înclină și se întoarce; sumă, nume, mesaj live |
| Card de fidelitate (original) | Ștampile care se „bat” la scroll |
| Recenzii · FAQ · Cifre animate · Grilă Instagram | Carusel scroll-snap, `<details>` animat, counter, lightbox |
| Formular de programare | Serviciu din lista live, dată, orele din programul acelei zile; nu trimite date nicăieri |
| Bară contact | Sună / WhatsApp / Programează, cu starea „deschis” |

Animații la scroll (reveal, split text, parallax) cu IntersectionObserver, fără GSAP.

**Prețuri din Firestore**: toate secțiunile de preț folosesc `designs/shared/live.js` (aceeași citire ca NailsByClemi:
`bookingLinks/{id}` → `users/{uid}/servicii` + `setari/bookingPublic`, cache 5 min). Tratează: încărcare (skeleton),
eroare (mesaj + link spre programare), `showPrice: false` („Preț la cerere”), preț 0 („Gratuit”), grupe, monedă din cont,
re-randare la datele proaspete. Pentru test: `?link=<id link programare>` arată prețurile reale ale unui cont,
`?sample=many` generează 32 de servicii (cartea are atunci 10 pagini).

### 2. Design-uri noi pentru clinici

- `/designs/dental/` — **Bright**: alb + mentă, poza din spate se schimbă pe secțiuni (ca `fullframe`), „Ce te aduce la noi?”
  (durere, control, albire, aparat, implant, copii) care filtrează tratamentele live, „Prima vizită” în 3 pași
  (pentru pacienții anxioși), before/after, echipa cu specialități, recenzii, program mare, hartă la tap,
  buton de urgență, bară Sună / Programează.
- `/designs/derma/` — **Skin**: cremă + teracotă, serif editorial, medical vs. estetic, căutare după problemă (acnee,
  alunițe, pete, rozacee, păr, riduri), „Control alunițe în 3 pași”, profilul medicului, before/after.
- Ambele apar în picker ca modele gata (ca cele de barber) și ca nișe în builder. Cod comun în `designs/shared/clinic.js` +
  `clinic.css`.

### 3. Alte schimbări

- `/designs/yours/` (mixer-ul) eliminat: builder-ul îi preia rolul; URL-ul vechi face redirect spre builder.
- `demo.js`: intrări noi în picker, `getPageMailto(extra)` (folosit de builder), `MADE_BY` exportat; încărcat ca `v=5` peste tot.
- `_config.yml`: exclude `docs/` din build-ul GitHub Pages (documentele astea nu ajung pe site).
- **appointmentsapps.com** (branch `demo-pages-links`): sub „Vezi un exemplu live”, o listă cu 9 pagini demo, în toate
  cele 10 limbi (`i18n.js` + `build.py`).
- **softsapps.com** (branch `demo-pages-cards`): un card în portofoliu, „Pagini de programare demo” (modele + configurator).
- `PROJECT_ALIASES.md` și skill-ul `/client-nou` actualizate.

## Verificare

**Playwright** (Chromium, 1440 px și 390 px, toate cele 21 de secțiuni, cele 3 teme, RO și EN):
vezi „Rezultate test” mai jos. Screenshot-uri: `docs/screenshots/` (local, în `.gitignore`; rapoartele Lighthouse HTML în `docs/lighthouse/`):
`<temă>-<desktop|mobile>/NN-<secțiune>.jpg`, plus `book-*.jpg` (cartea în mijlocul întoarcerii) și `clinics/`.

**Lighthouse 13.5** (server local cu gzip și `max-age=600`, ca GitHub Pages; mobil = Moto G Power simulat, 4G lent):

| Pagină | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| Builder, implicit, mobil | **96** | 100 | 100 | 66* | 2.7 s | 0 ms | 0 |
| Builder, implicit, desktop | **100** | 100 | 100 | 66* | 0.8 s | 0 ms | 0.002 |
| Builder, toate 21 secțiunile, mobil | **92** | 100 | 100 | 66* | 3.3 s | 10 ms | 0.017 |
| Dental, mobil | **100** | 100 | 100 | 66* | 1.2 s | 0 ms | 0.015 |
| Derma, mobil | **100** | 100 | 100 | 66* | 1.2 s | 0 ms | 0.016 |

\* SEO 66 doar din cauza `noindex` — intenționat, ca la toate design-urile din `/designs/` (vezi PROJECT_ALIASES).

Ce a contat pentru scor: hero-ul se montează primul și restul secțiunilor după ce s-a încărcat poza lui; preload pentru poza
din hero din scriptul din `<head>` (știe nișa din URL); WebGL pornește la prima interacțiune (în Lighthouse ar fi fost un
task de 1,5 s pe randare software); spațiul barei demo rezervat (fără CLS); fonturi și CSS-ul panoului fără blocare.

### Rezultate test

Rulare finală (`docs/screenshots/report.json`):

| Verificare | Rezultat |
|---|---|
| 6 rulări (3 teme × 1440/390 px, EN și RO), toate cele 21 de secțiuni | 21/21 montate, **0 erori în consolă**, 0 px scroll orizontal |
| Carte, desktop (32 de servicii, 10 pagini) | buton Next → „2–3”, săgeată → „4–5”, **drag cu mouse-ul de pe colț** → „6–7”, săgeată stânga → „4–5” |
| Carte, mobil 390 px | **o singură pagină** (358 px), swipe rapid → p. 2, drag lent al colțului → p. 3, buton → p. 4, scroll vertical peste carte → pagina rămâne aceeași |
| Slider | drag cu mouse-ul și swipe touch → slide-ul următor; buton de pauză prezent |
| Coverflow | click pe bulină → slide-ul 4 |
| Before / after | 10 × săgeată dreapta → 60 %, drag → 20 % |
| Formular | validare („Please fill in: service, date, time, your name, phone.”), 15 ore libere pentru ziua de mâine |
| Panou pe mobil | săgeată „sus” mută Recenzii înaintea Slider-ului, debifare ascunde secțiunea, temă și limbă schimbate, hash + localStorage + emailul conțin configurația |
| Reduced motion | fără canvas, carte în varianta plată, cifrele direct la valoarea finală |
| Fără WebGL | fără canvas, fundal static, fără erori |
| Dental / derma (1440 și 390) | 0 erori, filtrul „Ce te aduce” (3 / 4 tratamente), before/after din tastatură, Get my page = mailto |
| Builder cu nișele noi, `/designs/yours/` | dental/derma se încarcă; `/designs/yours/#…` redirecționează la builder păstrând hash-ul |

Ținte tactile: tot ce e pe pagină are ≥ 44 px; în panou, căsuța de bifat are 24 px vizibili cu zonă de atingere de 44 px,
iar săgețile au 44×32 px la mouse (44×44 la touch).

## Ce a rămas în backlog

Din `plan.md`: quiz „ce ți se potrivește”, selector de mărime vehicul (detailing), paletă de culori (nails),
„următorul loc liber” (necesită sloturile din aplicație), hero video, abonamente, mai multe locații, blog.
Plus: textele barei demo comune (`demo.js`) sunt doar în engleză; nișe propuse în `research.md` (veterinar, optică,
psiholog, gene și sprâncene, pilates, pet grooming…); design-urile dental/derma sunt doar în engleză, ca restul
design-urilor (builder-ul are RO/EN).

## Cum adaug o secțiune nouă în builder

1. `designs/builder/core/registry.js` — o linie în `SECTIONS`: `{ id: 'video', label: 'Video hero', badges: ['new'], nav: 'gallery', data: false }`.
2. `designs/builder/sections/video.js` — un modul care exportă:
   ```js
   export default {
     render(ctx) { return h('section', { class: 'sec vd-sec' }, …); }, // obligatoriu
     activate(el, ctx) { …; return () => { /* cleanup */ }; },        // opțional: când e aproape de ecran
     update(el, ctx) { /* ctx.data = servicii + program */ },          // opțional, pentru data: true
     onTheme(el, ctx) {}                                               // opțional
   };
   ```
   `ctx` are `t()` (texte), `content` (conținutul nișei), `data`, `linkId`, `priceText()`, `toast()`, `reduced`.
   Librării: `libs.swiper()` / `libs.pageFlip()` din `core/loader.js` (se încarcă o singură dată, doar la nevoie).
3. `designs/builder/sections/video.css` — stilurile secțiunii; folosește variabilele temei (`--bg`, `--text`, `--accent`,
   `--accent-text` …) și `@container page (…)` în loc de `@media`.
4. `i18n/en.js` și `i18n/ro.js` — `sec.video.name`, `sec.video.desc` și textele secțiunii.
5. Opțional: în `DEFAULT_ON` sau într-un model din `builder/presets.js`.

O nișă nouă: `content/<nișă>.js` (după modelul `barber.js`), pozele în `content/photos.js`, numele în `NICHES`
(`core/state.js`) și în `niches` din i18n, poza hero în harta `HERO` din `index.html`.

## Cum rulez demo-ul local

```bash
cd /Users/mihai/Sites/clientsAppointmentsPage/YourBusinessName
```

```bash
python3 -m http.server 8765
```

Apoi `http://localhost:8765/designs/builder/`. (`python3 -m http.server` nu trimite Cache-Control: după modificări fă
hard reload.) Exemple: `…/designs/builder/#n=dental&k=clean&l=ro`, `…/designs/builder/?sample=many`,
`…/designs/dental/`, `…/designs/derma/`.

## De verificat manual înainte de deploy

1. **Pe un iPhone real** (Safari): cartea — swipe, tras de colț până la marginea ecranului, scroll vertical peste carte
   (nu trebuie să întoarcă pagina); hero 3D — butonul „Pornește înclinarea 3D” cere permisiunea giroscopului; bottom sheet-ul.
   Testele au folosit evenimente touch sintetice în Chromium, nu un telefon.
2. **Cu un link real**: `…/designs/builder/?link=<id>` pe un cont cu multe servicii și grupe (abonamente, cursuri),
   inclusiv `showPrice` oprit. Pe localhost App Check poate bloca citirea; verifică după deploy.
3. **Emailul „Get my page”** din Gmail web, Apple Mail și Outlook: linkul cu configurația e lung (~2 000 de caractere în
   total); verifică că ajunge întreg.
4. **Pozele Unsplash**: aspect pe fiecare nișă; poza cu sala de așteptare (dental) conține un text pe perete („Smile like
   you mean it”). Credits în `docs/credits.md`.
5. **Texte**: recitește RO (diacritice, ton) și EN; numele de echipă și recenziile sunt de exemplu și marcate ca atare.
6. **Before/after**: e aceeași poză cu filtru, marcată „Poză de exemplu, editată” — confirmă că e acceptabil pentru demo.
7. **GitHub Pages + `_config.yml`**: după deploy, `https://yourbusinessname.appointmentsapps.com/docs/report.html` trebuie
   să dea 404, iar restul site-ului să meargă normal (Jekyll procesează acum cu config).
8. **appointmentsapps.com**: lista de demo-uri în 2–3 limbi și pe mobil; **softsapps.com**: cardul nou (RO și EN).
9. Ordinea de push: întâi `YourBusinessName` (paginile trebuie să existe), apoi AppointmentsWEB și SoftsappsWEB.
10. Decizie de preț: o pagină „gata făcută” din builder contează ca „design de demo ca atare” pentru promoția din
    `pricing.md`? (Am lăsat-o nedecisă în skill.)
