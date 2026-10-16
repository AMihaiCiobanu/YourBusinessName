# Cercetare — site-uri de saloane, barber, nails, spa/masaj, car detailing, fitness

Data: 2026-10-16. Scop: ce secțiuni și efecte folosesc site-urile reale din nișele clienților noștri, ce merge prost pe telefon
și ce putem face mai bine în configuratorul de pagină (`/designs/builder/`).

## Metodă

- Fiecare site a fost deschis în browser (desktop ~1280px, apoi viewport mobil 375×812).
- Pe fiecare pagină a rulat același script de inspecție, care citește: librăriile prezente (GSAP / ScrollTrigger, Three.js,
  Swiper, Flickity, Slick, Splide, Lenis, AOS, Webflow, Framer, Shopify, WordPress/Elementor), numărul de `<video>` și
  `<canvas>`, imagini și câte au `loading="lazy"`, titlurile H1–H3 (structura secțiunilor), linkurile de programare
  (Zenoti, Boulevard, Fresha, Booksy…) și, pe mobil: overflow orizontal, câte butoane/linkuri vizibile au sub 32 px,
  KB transferați, numărul de request-uri, bare fixe jos, înălțimea paginii.
- Detecția librăriilor se face după variabile globale și clase CSS. Un bundle care ascunde GSAP/Three în propriul cod
  nu apare, deci „fără GSAP” înseamnă „fără GSAP vizibil”.
- Site-urile premiate: Awwwards nu are niciun „Site of the Day” în aceste nișe (căutat 2025–2026); am folosit nominalizările
  și mențiunile existente plus un scan de concepte de pe Dribbble. Godly nu a returnat nimic pe aceste nișe.
- Nu am copiat cod, texte sau imagini. Din site-uri am reținut doar idei de UX; implementarea e scrisă de la zero și folosește
  doar poze Unsplash cu licență liberă (vezi `credits.md`).

## Site-urile analizate

| # | Site | Nișă | Platformă / librării detectate | Secțiuni principale | Animații / 3D | Ce impresionează | Ce nu merge pe mobil |
|---|---|---|---|---|---|---|---|
| 1 | [blindbarber.com](https://blindbarber.com) | Barber + produse | Shopify, Swiper, Flickity | Who we are, Shop, Visit, Watch/learn, colecții de parfum, colaborări, „What they are saying” | 1 video, carusele de produse, fără 3D | Imagine de brand puternică: barber shop + bar + produse proprii | Pop-up „Get 10% off” peste toată pagina la prima vizită; programarea nu e vizibilă pe prima pagină |
| 2 | [fellowbarber.com](https://fellowbarber.com) | Barber + produse | Shopify, Flickity | Hero cu poza unui barber pole, „We're hiring”, The Fellow Collection, gift cards | Carusel, fără 3D | Ton premium, multe spații albe, gift card pentru servicii | Programarea duce pe alt domeniu (Boulevard) |
| 3 | [murdocklondon.com](https://murdocklondon.com) | Barber + produse | Shopify, Slick | Best sellers, Barbering, New & trending, Journal, newsletter | Slider de bannere | Gift cards și servicii în același loc | Cookie banner + pop-up newsletter + age verification, unul peste altul |
| 4 | [ruffians.co.uk](https://ruffians.co.uk) | Barber (premiat UK) | Shopify, Swiper, Splide | Produse, Book now, „Voted UK's favourite barbershop… choose your location”, Our story | Două librării de carusel pe aceeași pagină | Dovada socială în titlu („votat de 3 ani…”) | 424 de request-uri pe mobil, ~1 MB; programare pe Zenoti (alt domeniu) |
| 5 | [hershesons.com](https://www.hershesons.com) | Salon păr | Shopify, Flickity, AOS | The Wavemaker, Bestsellers, Great Hair Stories, Our spaces, Experts / Find your expert, Look book | Reveal la scroll (AOS), 1 video | „Find your expert”: alegi specialistul înainte de serviciu | 173 de imagini pe homepage (bine că 167 sunt lazy) |
| 6 | [oliveandjune.com](https://oliveandjune.com) | Nails (DTC) | Shopify | „It starts with our mani system”, Skip the salon, The fall edit, colecții | 16 video-uri pe homepage | Fotografie de produs foarte curată, culori pastel consistente | Greu de folosit ca model de salon: e magazin, nu programare |
| 7 | [varnishlane.com](https://varnishlane.com) | Nails (waterless) | WordPress, Swiper | Welcome, Why waterless, The Varnish Lane standard, servicii pe niveluri (Luxe / Main / Fast Lane), ofertă | Slider simplu | Meniul de servicii pe trei „benzi” cu nume proprii, ușor de ales | Pe mobil a apărut un ecran „Checking your browser…” înainte de pagină |
| 8 | [chillhouse.com](https://chillhouse.com) | Nails + spa + produse | Shopify | Chill Tips, Forever Wear, Super Tint, Best sellers, New arrivals, Born & bred in NYC | 17 video-uri, 165 imagini | Brand jucăuș, video-uri scurte cu mâini/unghii | Pagină foarte lungă și grea; vizita în salon e îngropată |
| 9 | [beaire.com](https://beaire.com/en) | Spa / băi termale | Swiper (custom) | Where time does not exist, The AIRE experience, The baths, Massages & rituals, Gift box / Digital gift, Recommended experience | Slidere fullscreen, fade lent | Bară de rezervare rapidă lipită jos pe mobil („quick reserva”); ton foarte calm | 131 de imagini, niciuna lazy; 92 din 105 ținte tactile sub 32 px |
| 10 | [heydayskincare.com](https://www.heydayskincare.com) | Clinică facială / skincare | Shopify, Swiper, AOS | Facials, $40 off first facial, Why Heyday, Membership, Shop, „Skin renewal animation”, „Over 1 million facials” | Animație explicativă a pielii, reveal | Abonamentul lunar explicat simplu; cifră mare de încredere | 16,9 MB transferați și 313 request-uri pe mobil |
| 11 | [equinox.com](https://www.equinox.com) | Fitness luxury | custom | Hero video, Everything Equinox has to offer, Personal training, Pilates, Spa, Iconic spaces | Video fullscreen | Ierarhie foarte clară, puține cuvinte | Banner de cookies mare; puține informații practice (prețuri, program) |
| 12 | [barrys.com](https://www.barrys.com) | Fitness / clase | Webflow, Swiper | The Red Room, What to expect in your first workout, Run / Lift, Fuel bar, Locker rooms, Shop, „8+ million strong” | 3 video-uri, carusele | „Ce te așteaptă la primul antrenament” scade frica de început | 29 din 42 ținte tactile sub 32 px |
| 13 | [thirdspace.london](https://www.thirdspace.london) | Fitness / health club | WordPress, Flickity | Manifest, lista de 17 locații, clase, „all your needs under one roof”, Become a member | Carusel de locații | Fiecare locație are card cu poză | Lista lungă de locații înainte de orice acțiune |
| 14 | [serenityhairblaxland.com.au](https://serenityhairblaxland.com.au) — **Awwwards Nominee, sep. 2025** | Salon păr | WordPress + Elementor, Swiper | Hey & welcome, Step inside, servicii pe categorii (Colouring / Cutting / Styling / Treatments), extensii, Instagram feed, Google Map | Fade-in Elementor, slider | Servicii grupate pe categorii, feed Instagram, hartă | 20 din 31 ținte tactile sub 32 px; ~1,1 MB |
| 15 | [massageenvy.com](https://www.massageenvy.com) | Masaj + facial | Slick | Discover the power of the pause, eGift cards, Skin analysis tool, Massage services, Facials, Membership, Wellness tips | Carusele | „Skin analysis tool”: un mic quiz care recomandă un tratament | 3,7 MB, 46 din 85 ținte tactile sub 32 px, pagină de 10.000 px |
| 16 | [sydneydetailstudio.com.au](https://www.sydneydetailstudio.com.au) | Car detailing | WordPress + Elementor, Swiper | Packages cu preț afișat (PPF, ceramic, full detail, tint), Why us, proprietăți (hidrofob, rezistență chimică) | 2 video-uri, carusel de pachete | Pachete „ca produse”, cu preț și avans online | Pagina are ~11.000 px pe mobil |
| 17 | [hyerqualitydetail.com](https://hyerqualitydetail.com) | Car detailing premium | WordPress | Hero în trei piloni (Refine / Protect / Enhance), Award winning studio, Service catalog numerotat 01/02/03 | 4 video-uri | Catalog de servicii numerotat, ca un meniu de restaurant | ~3 MB și 18.500 px pe mobil |
| 18 | [Fitness by Alexandra](https://www.awwwards.com/sites/fitness-by-alexandra) — **Awwwards Nominee, 2022** | Personal trainer | Tilda | Prezentare antrenor, curs propriu, contact | Minimal, tipografie mare | Site personal, foarte focusat pe o singură persoană | Analizat doar din fișa Awwwards (site-ul nu s-a deschis) |
| 19 | [Rela — Spa Massage Salon](https://www.awwwards.com/sites/rela-spa-massage-salon) — **Awwwards Honorable Mention, 2019** | Spa / masaj (temă) | WordPress (Aheto), parallax | Hero, servicii, echipă, prețuri, programare, footer | Parallax (tag Awwwards) | Scor juriu ~8,1; prețuri + programare în aceeași pagină | Demo-ul nu s-a deschis; analizat din fișa Awwwards |
| 20 | [Dribbble — „barber website”](https://dribbble.com/search/barber-website) | Concepte | — | ~20 de concepte: hero cu programare, servicii cu preț, echipă, galerie | Ilustrații 3D, dark mode | Trend clar: negru + auriu/cupru, buton de programare în hero, șabloane Framer/Webflow | Concepte statice, nu sunt testate pe mobil |

Linkurile de programare găsite: **Zenoti** (Murdock, Ruffians, Hershesons, Varnish Lane), **Boulevard** (Fellow, Heyday),
sistem propriu (AIRE, Barry's). În toate cazurile clientul pleacă pe alt domeniu ca să programeze.

## Analiză comparativă

### Ce apare cel mai des (top 10)

| Loc | Secțiune / efect | Unde apare | Observație |
|---|---|---|---|
| 1 | Hero mare cu poză sau video + buton de programare | toate | Video pe 8 din 19; pe mobil e cel mai scump element |
| 2 | Carusele / slidere | 14 din 19 (Swiper, Flickity, Slick, Splide) | Ruffians încarcă două librării de carusel pe aceeași pagină |
| 3 | Magazin de produse | 9 din 19 (toți barberii mari, Hershesons, nails, Heyday) | Produsele proprii sunt o sursă de venit importantă pentru barber și nails |
| 4 | Servicii pe niveluri / pachete cu preț | Varnish Lane, Sydney Detail, Hyer, Serenity, Massage Envy | Prețul afișat direct scade numărul de întrebări |
| 5 | Gift cards | Fellow, Murdock, Ruffians, Varnish Lane, AIRE, Massage Envy | Aproape toți îl au; la noi lipsește complet |
| 6 | Dovadă socială în cifre | Barry's („8+ million”), Heyday („1 million facials”), Ruffians, Serenity | De obicei text static, fără animație |
| 7 | Echipă / „alege specialistul” | Hershesons, Serenity, Rela | Hershesons o face pas în programare |
| 8 | Abonament / loialitate | Heyday, Massage Envy, Equinox | Explicat cu beneficii lunare |
| 9 | Locații / vizită / hartă | Third Space, Ruffians, Chillhouse, Serenity | Doar Serenity are hartă încorporată |
| 10 | Reveal la scroll | Hershesons, Heyday (AOS), Serenity (Elementor) | Fade-in simplu; nimeni nu face split text sau parallax real |

Se remarcă (rar, dar bine făcut): bara de rezervare lipită jos pe mobil (AIRE), quiz-ul care recomandă un tratament (Massage Envy),
catalogul numerotat ca un meniu (Hyer), serviciile pe „benzi” cu nume (Varnish Lane), „ce te așteaptă la prima vizită” (Barry's).

### Ce NU face nimeni

- **Niciun site nu folosește WebGL / Three.js sau GSAP vizibil**, nici unul nu are before/after cu slider, carte de prețuri, galerie 3D.
  Nișa e dominată de Shopify/WordPress cu carusele. Un efect 3D bine făcut (și rapid) ne diferențiază imediat.
- Niciun site nu arată **„Deschis acum”** calculat live, deși toți au program.
- Programarea pleacă mereu pe alt domeniu. Pagina noastră o deschide într-un dialog, fără să plece clientul.
- Prețurile sunt text static în pagină. La noi vin live din aplicație (Firestore), deci nu se învechesc.

### Probleme pe mobil, comune

1. **Pop-up-uri la intrare** (Blind Barber, Murdock: cookie + newsletter + vârstă, unul peste altul).
2. **Greutate**: Heyday 16,9 MB / 313 request-uri, Massage Envy 3,7 MB, Hyer 3 MB, AIRE 131 imagini fără lazy-load.
3. **Ținte tactile mici**: AIRE 92/105, Massage Envy 46/85, Barry's 29/42, Serenity 20/31 sub 32 px.
4. **Pagini foarte lungi**: Hyer 18.500 px, Sydney Detail 11.000 px, Massage Envy 10.000 px.
5. **Programarea ascunsă** sau pe alt domeniu; doar AIRE are o bară de rezervare mereu la îndemână.
6. Ecran anti-bot înainte de pagină (Varnish Lane).

### Ce lipsește din demo-ul nostru (pagina clasică + design-urile din `/designs/`)

| Lipsește | Există la concurență | Notă |
|---|---|---|
| Produse de vânzare | 9 din 19 | Cerut și de Mihai; produsele se adaugă manual, nu vin din aplicație |
| Gift card | 6 din 19 | — |
| Abonament / card de fidelitate | 3 din 19 | — |
| Before / after | 0 (dar e standard la detailing, păr, unghii, clinici) | — |
| Echipă cu „programează-te la X” | 3 din 19 | Doar `duo` are ceva asemănător |
| FAQ | Sydney Detail (FAQ pe categorii) | — |
| Cifre animate | 4 din 19 (statice) | — |
| Feed Instagram | Serenity | — |
| Hartă reală | Serenity | La noi e doar un placeholder |
| Bară sticky WhatsApp / telefon | AIRE (rezervare) | Avem doar butonul „Book online” |
| Hero 3D / video | 8 din 19 cu video | `depth` are CSS 3D |
| Alegerea secțiunilor de către client | — | Doar mixer-ul din `yours`, fără previzualizare reală |

## Idei noi, pe care concurența nu le are (minimum 10)

1. **Lista de prețuri ca o carte 3D** cu pagini care se întorc (drag pe colț, click, săgeți), alimentată live din aplicație:
   numărul de pagini se calculează din câte servicii are clientul.
2. **Coș de servicii / calculator**: bifezi 2–3 servicii și vezi imediat durata totală și prețul total, apoi „Programează-le”.
3. **Ziua de azi ca o bandă**: programul de azi ca o bară de la deschidere la închidere, cu un indicator „acum” care se mișcă
   și textul „Deschis încă 3 h 20 min” sau „Deschidem mâine la 9:00”.
4. **Gift card designer**: un card 3D care se înclină la mouse/gyroscop; alegi suma și numele, cardul se întoarce și arată mesajul.
5. **Card de fidelitate digital**: ștampile care se „bat” una câte una la scroll („a 6-a vizită e gratuită”).
6. **Hartă stilizată cu facade**: o hartă SVG desenată în culorile temei, cu pin animat; Google Maps reală se încarcă doar la tap
   (rapid și fără cookie-uri Google până la acțiunea clientului).
7. **Before / after cu mâner** accesibil din tastatură (input range ascuns), cu etichete și imagine de rezervă.
8. **Specialiști cu flip card**: fața = poză și rol, spatele = specialități + „Programează-te la Ana”.
9. **Quiz „ce ți se potrivește”**: 3 întrebări rapide care recomandă un serviciu din lista live.
10. **Selector de mărime vehicul** (detailing): S / M / SUV schimbă prețurile afișate cu un multiplicator.
11. **Paletă de culori** (nails): alegi o culoare de ojă și o mână ilustrată se recolorează.
12. **„Următorul loc liber”** calculat din program (demo) / din calendar (pagina reală, când aplicația expune sloturile).
13. **Culoare de accent din logo**: clientul alege culoarea, iar pagina calculează automat varianta lizibilă (contrast AA).
14. **Bară inteligentă jos**: WhatsApp / Sună / Programează, cu starea „deschis acum” în ea.

Ideile 1–8 și 13–14 intră în MVP (vezi `plan.md`), restul rămân în backlog.

## Surse folosite pentru căutare

- [Awwwards — Serenity Hair Salon Blaxland (Nominee)](https://www.awwwards.com/sites/serenity-hair-salon-blaxland)
- [Awwwards — Rela Spa Massage Salon (Honorable Mention)](https://www.awwwards.com/sites/rela-spa-massage-salon)
- [Awwwards — Fitness by Alexandra (Nominee)](https://www.awwwards.com/sites/fitness-by-alexandra)
- [Awwwards — Marrufo Car Detailing (profil, fără premiu)](https://www.awwwards.com/marrufo-car-detailing-ceramic-coating/)
- [Zarla — car detailing inspiration](https://www.zarla.com/inspiration/car-detailing)
- [Dribbble — barber website](https://dribbble.com/search/barber-website)
