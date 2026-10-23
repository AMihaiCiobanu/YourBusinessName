# Audit pagini (Lighthouse, Playwright, accesibilitate, SEO)

Fiecare pagină publicată sau trimisă unui client trece prin auditul de mai jos înainte de push / „gata”.
Se aplică la: pagina principală a demo-ului, fiecare design din `/designs/`, paginile de client făcute din acest template
(`clientsAppointmentsPage/<client>/`). Regula e în `/Users/mihai/Sites/clientsAppointmentsPage/CLAUDE.md`.

Reauditează o pagină când îi schimbi HTML-ul, CSS-ul, JS-ul sau pozele, și când schimbi ceva din `designs/shared/`
(atunci toate paginile care îl încarcă). După audit, actualizează tabelul „Stare” de jos.

## Praguri

| Ce | Mobil (Moto G Power, 4G lent) | Desktop |
|---|---|---|
| Lighthouse Performance | ≥ 90 | ≥ 95 |
| Lighthouse Accessibility | 100 | 100 |
| Lighthouse Best practices | 100 | 100 |
| Lighthouse SEO | 100; pe paginile `noindex` singurul audit picat permis e `is-crawlable` (scor 66) | la fel |
| LCP / TBT / CLS | ≤ 2.5 s (max 3.3 s cu toate secțiunile) / ≤ 200 ms / ≤ 0.1 | ≤ 1.2 s / ≤ 100 ms / ≤ 0.1 |

Dacă o pagină nu atinge pragul, se repară înainte de push; dacă nu se poate, motivul se scrie în tabel.

## 1. Server local

Ca GitHub Pages (gzip, `max-age=600`), altfel scorul de performanță iese mai mic decât pe site:

```bash
python3 docs/devserver.py 8767 . prod
```

(din `YourBusinessName/`; e și în `.claude/launch.json` ca `site-prod`). După push se poate rula și pe URL-ul live.

## 2. Lighthouse

Mobil și desktop, pentru fiecare pagină. Rapoartele merg în `docs/lighthouse/` (în `.gitignore`):

```bash
npx -y lighthouse@13.5.0 http://127.0.0.1:8767/designs/<nume>/ --output html --output json --output-path docs/lighthouse/<nume>-mobile --chrome-flags="--headless=new" --quiet
```

```bash
npx -y lighthouse@13.5.0 http://127.0.0.1:8767/designs/<nume>/ --preset desktop --output html --output json --output-path docs/lighthouse/<nume>-desktop --chrome-flags="--headless=new" --quiet
```

Builder-ul se rulează de două ori: configurația implicită și cu toate cele 21 de secțiuni (hash `#…&s=…` complet).

## 3. Playwright

Chromium, 1440 px și 390 px (plus 360 px pentru scroll orizontal), pentru fiecare pagină; screenshot-uri în
`docs/screenshots/<pagină>-<desktop|mobile>/` (în `.gitignore`). Verifică:

- 0 erori în consolă, 0 request-uri eșuate (în afară de cele externe blocate intenționat);
- 0 px scroll orizontal la 360 și 390 px;
- toate secțiunile se montează (builder: toate cele 36 de tipuri din cele 14 grupuri, în toate temele, RO și EN);
- interacțiunile paginii merg cu mouse, touch și tastatură (slider, carte, before/after, filtre, tab-uri, lightbox,
  formular cu validare, Get my page = mailto);
- `prefers-reduced-motion: reduce`: fără autoplay, fără WebGL, animații scurte;
- fără WebGL / librărie CDN căzută: varianta simplă, fără erori;
- hartă și date live (servicii, program) se încarcă dacă pagina are booking link.

## 4. Accesibilitate (în plus față de Lighthouse)

- axe-core (`@axe-core/playwright`) pe fiecare pagină, desktop și mobil, în fiecare temă: 0 încălcări `serious` / `critical`;
- ținte tactile ≥ 44 px; contrast AA în toate temele; ordine logică la Tab, focus vizibil, `Esc` închide dialogurile;
- `alt` la fiecare imagine, `aria-label` pe controale fără text, un singur `h1`, `lang` corect pe `<html>`;
- text ≥ 16 px pe mobil pentru conținut.

## 5. SEO

- `title` și `meta description` unice, `canonical`, Open Graph (titlu, descriere, imagine), `favicon`;
- JSON-LD (`LocalBusiness` sau tipul potrivit) valid, fără `aggregateRating` inventat;
- pagini indexate: în `sitemap.xml`, permise în `robots.txt`; design-uri din `/designs/` și ciorne de client: `noindex`;
- link-uri cu text descriptiv, fără link-uri moarte.

## Stare

Data = ultimul audit complet. „—” = neauditat.

| Pagină | Lighthouse mobil (P / A / BP / SEO) | Lighthouse desktop | Playwright | axe | Data | Note |
|---|---|---|---|---|---|---|
| `/` (demo principal, indexat) | 99 / 100 / 100 / 100 | 94 / 100 / 100 / 100 | da (375/1280) | 0 | 2026-10-23 | Reparat: harta (aspect-ratio + min-height) dădea 174 px scroll orizontal pe mobil și nu umplea rândul pe desktop. Live: mobil 84 (FCP 3.3 s din rețea), desktop 90. JSON-LD `WebPage` (demo, nu firmă reală) |
| `/designs/builder/` implicit | 95 / 100 / 100 / 69* | 77 / 100 / 100 / 69* (local) | da (375/1280; 10 nișe × 3 teme × RO/EN) | 0 | 2026-10-23 | Desktop local: și versiunea dinainte iese 76 pe aceeași mașină, deci nu e regresie; de confirmat pe live |
| `/designs/builder/` toate tipurile vechi (22 secțiuni, 6 galerii) | 91 / 100 / 100 / 69* | 73 / 100 / 100 / 69* (local) | da (10 nișe × 3 teme × RO/EN, 375 + 1280) | 0 | 2026-10-23 | Reparat: 35–69 px scroll orizontal pe mobil (ștampila Loyalty, „14.000+” din Cifre, eticheta „Acum” din Program spre ora închiderii); coverflow fără Swiper accesibil cu tastatura |
| `/designs/builder/` fiecare secțiune repetabilă de 2 ori (27 secțiuni) | 91 / 100 / 100 / 69* | — | da (10 nișe × 3 teme × RO/EN, 375 + 1280) | 0 | 2026-10-23 | Formularul și planificatorul de două ori: id-uri unice per copie, fără duplicate |
| `/designs/builder/` bandă de cifre care se mișcă | 97 / 100 / 100 / 69* | — | da (375 + 1280, pauză, mișcare redusă) | 0 | 2026-10-23 | Pauză la hover, focus și buton (WCAG 2.2.2); cu mișcare redusă stă pe loc |
| `/designs/builder/` toate tipurile noi (15 secțiuni) | 98 / 100 / 100 / 69* | 82 / 100 / 100 / 69* (local) | da (10 nișe × 3 teme × RO/EN, 375 + 1280) | 0 | 2026-10-23 | Hero „text + poză”, masonry, carusel, carte de oaspeți, bandă cifre, carduri echipă/FAQ, listă produse, banner cadou, linie fidelitate, card program, hartă lată, butoane rotunde |
| `/designs/builder/` hero-uri 3D noi (inel, cub, carduri plutitoare) | 95 / 100 / 100 / 69* · 96 · 98 | 77 · 78 · 80 / 100 / 100 / 69* (local) | da (375 + 1280, drag, săgeți, fără scroll orizontal) | 0 | 2026-10-23 | Desktop local: hero-ul 3D vechi iese 81 pe aceeași mașină, FCP identic (1.7 s). Inelul și cubul nu au preload pentru poză (poze mai mici decât cea din preload), LCP 2.6–2.7 s desktop local |
| `/designs/builder/` limbi noi (FR, ES, PT, PL, IT, EL) + selector de limbă primul în „Secțiuni” | 94 / 100 / 100 / 69* | 77 / 100 / 100 / 69* (local) | da (375/1280; 8 limbi, 10 nișe în PL și EL, fără erori în consolă) | 0 | 2026-10-23 | Desktop 77 = aceeași valoare ca înainte pe mașina asta. Preț în zł pe PL (×4.3), € pe celelalte noi. Textul alternativ al pozelor (`content/photos.js`) e încă doar EN/RO, cade pe EN în limbile noi. Live (2a06309, a doua rulare): mobil 81 (FCP 2.1 s, LCP 4.8 s), desktop 65, restul 100; prima rulare imediat după deploy 60 (cache rece). Sub prag doar performanța, aceeași problemă cunoscută (LCP builder, vezi „Ce nu e reparat”) |
| `/designs/builder/` teme de sezon (8 + automat; `f=` în hash) | 85–98 / 100 / 100 / 69* (9 combinații nișă × temă × sezon × limbă) | 72–75 / 100 / 100 / 69* (local; fără sezon tot 75) | da (375/1280, fără erori în consolă, fără scroll orizontal, mișcare redusă, schimbare de sezon/limbă) | 0 | 2026-10-23 | Reparat: contrast accent pe `--bg-2` (Paște), roșul de Crăciun (#e23b3b → #ef4444, sub 4.5:1 pe butoane), galbenul skin-ului bold pe sezoanele întunecate; decorul se agață după fonturi (CLS 0.073 → 0). Sub 90 pe mobil: Halloween nails+clean 85 și Crăciun barber+bold 89, aceleași combinații fără sezon dau 87 / LCP barber, CLS-ul vine din `hero-card` (problemă veche, vezi „Ce nu e reparat”) |
| Toate paginile care încarcă `designs/shared/` (re-audit după `live.js` cu zilele pe 8 limbi) | vezi rândurile de mai jos | — | da (375/1280) | 0 | 2026-10-23 | Găsite picate (și înainte de schimbare) și reparate în aceeași zi: dental, derma, fullframe, listing, vezi rândurile lor |
| `/designs/dental/` | 100 / 100 / 100 / 69* | 95 / 100 / 100 / 69* (web-checks) | da (375/1280) | 0 | 2026-10-23 | Reparat: cele 6 poze din fundal (`.backdrop`) fără width/height; acum cu dimensiunile reale |
| `/designs/derma/` | 100 / 100 / 100 / 69* | 93 / 100 / 100 / 69* (web-checks) | da (375/1280) | 0 | 2026-10-23 | Reparat: 6 poze din fundal fără width/height. CLS desktop era 0.13–0.25 la încărcarea fontului Fraunces; acum 0.02 (fallback Georgia scalat) |
| `/designs/storybook/` | 99 / 100 / 100 / 69* | 100 / 100 / 100 / 69* | da (1440/390/360) | 0 reale† | 2026-10-17 | |
| `/designs/orbit/` | 99 / 100 / 100 / 69* | 99 / 100 / 100 / 69* | da (1440/390/360) | 0 | 2026-10-17 | Click cu mouse-ul pe planete nu mergea (inelele le acopereau), reparat |
| `/designs/depth/` | 100 / 100 / 100 / 69* | 100 / 100 / 100 / 69* | da (1440/390/360) | 0 | 2026-10-17 | |
| `/designs/fullframe/` | 100 / 100 / 100 / 66* | 93 / 100 / 100 / 66* (web-checks) | da (375/1280) | 0 | 2026-10-23 | Reparat: 5 poze din fundal fără width/height |
| `/designs/duo/` | 100 / 100 / 100 / 69* | 100 / 100 / 100 / 69* | da (1440/390/360) | 0 | 2026-10-17 | CLS era 0.92, acum 0 |
| `/designs/marketplace/` | 98 / 100 / 100 / 69* | 100 / 100 / 100 / 69* | da (1440/390/360) | 0 | 2026-10-17 | CLS era 1.0, acum 0; LCP mobil 2.5 s |
| `/designs/listing/` | 99 / 100 / 100 / 69* | 100 / 100 / 100 / 69* (Lighthouse 13.5); 87 în web-checks | da (375/1280) | 0 | 2026-10-23 | Reparat: 169 px scroll orizontal pe mobil. Textul ascuns „Book with” (`.sr-only`, absolut) din cardurile echipei nu avea părinte poziționat, ieșea din rândul care se derulează; `.member` are acum `position: relative`. Desktop 87 doar în web-checks (throttling mai greu), Lighthouse desktop: LCP 0.7 s. Live (aa39d2b): Lighthouse 13.5 mobil 91 (LCP 3.5 s), web-checks mobil 82 / desktop 73 (LCP 4.3–4.6 s); poza LCP are deja preconnect, fetchpriority, srcset (~100 KB pe mobil), variația vine de la CDN-ul Unsplash. Dental, derma, fullframe live: mobil 100, desktop 91–92, toate verificările trec. CLS desktop era 0.56, acum 0 |

\* 66–69 doar din `noindex` (`is-crawlable`, scorul depinde de câte audituri SEO se aplică paginii), intenționat. `/designs/yours/` e doar redirect, nu se auditează.
axe = încălcări `serious` / `critical` (wcag2a/aa, 2.1, 2.2 AA, best-practice), desktop și mobil, în fiecare temă. Rămâne peste tot `region`
(moderate): bara demo e în afara landmark-urilor, e doar pentru prospect. † Storybook: axe raportează uneori numele de secțiune de pe
marginea dreaptă (text alb cu halou închis, în mișcare la scroll) ca contrast 1.2; haloul din `text-shadow` nu e luat în calcul de axe.

Ce nu e reparat (2026-10-17), de decis:
- text sub 16 px pe mobil la etichete, meta și descrieri scurte (eyebrow 11–13 px, descrieri de servicii 14–15 px) pe toate paginile;
  textul principal (paragrafe, prețuri, butoane) e ≥ 16 px. Mărirea lor schimbă aspectul design-urilor.
- builder: LCP mobil peste 2.5 s (hero-ul se montează din modulele JS); performanța rămâne ≥ 90.

Rulare 2026-10-17: Lighthouse 13.5 (server `devserver.py … prod`), Playwright (Chrome, 1440/390/360, scroll prin toată pagina, consolă,
request-uri, scroll orizontal, reduced motion, fără WebGL, Tab cu focus vizibil, interacțiuni: carte, slider, before/after, filtre,
tab-uri, lightbox + Esc, formular gol, mailto), axe-core, SEO (title, description, canonical, Open Graph, favicon, `lang`, un `h1`,
`alt`, JSON-LD, link-uri moarte). Rapoarte: `docs/lighthouse/*-final.report.html`; screenshot-uri și `audit-report.json`: `docs/screenshots/`.

Detalii pentru builder, dental și derma: `report.md`, „Verificare”.
