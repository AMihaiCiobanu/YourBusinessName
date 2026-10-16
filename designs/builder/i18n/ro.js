// Texte în română. Aceleași chei ca în en.js; o cheie lipsă de aici se ia din en.js.

export default {
  meta: {
    title: '{name} — Configurator de pagină',
    desc: 'Construiește-ți pagina de programări: alegi secțiunile, ordinea, tema și culoarea.'
  },
  brandDefault: 'Numele Afacerii Tale',

  ui: {
    title: 'Construiește-ți pagina',
    lead: 'Tot ce schimbi apare imediat pe pagină.',
    open: 'Personalizează',
    openAria: 'Deschide configuratorul paginii',
    close: 'Închide configuratorul',
    collapse: 'Ascunde panoul',
    tabSections: 'Secțiuni',
    tabStyle: 'Stil',
    business: 'Tipul afacerii',
    name: 'Numele afacerii',
    namePh: 'Numele Afacerii Tale',
    theme: 'Temă',
    accent: 'Culoare de accent',
    customColor: 'Alege orice culoare',
    accentReset: 'Culoarea temei',
    lang: 'Limba paginii',
    motion: 'Reduce animațiile',
    motionHint: 'Oprește efectele 3D și animațiile.',
    phone: 'Previzualizare pe telefon',
    presets: 'Pornește de la o pagină gata făcută',
    presetsHint: 'O atingere și ai o pagină completă pentru tipul tău de afacere. Poți schimba orice după.',
    presetDone: 'Pagina gata a fost aplicată: {name}.',
    ownMix: 'Sau alege tu secțiunile',
    sectionsHint: 'Bifează o secțiune ca să apară. Trage de mâner sau folosește săgețile ca să schimbi ordinea.',
    floating: 'Plutitoare',
    moveUp: 'Mută {name} mai sus',
    moveDown: 'Mută {name} mai jos',
    drag: 'Trage ca să muți {name}. Din tastatură: Alt + săgeată sus sau jos.',
    show: 'Arată {name}',
    moved: '{name} e acum pe poziția {pos} din {total}.',
    added: '{name} a fost adăugată pe pagină.',
    removed: '{name} a fost scoasă de pe pagină.',
    count: '{on} din {total} secțiuni pe pagină',
    copy: 'Copiază linkul',
    copied: 'Link copiat. Oricine îl deschide vede pagina asta.',
    copyFailed: 'Nu am putut copia. Copiază linkul din bara de adrese.',
    reset: 'Resetează',
    resetDone: 'Am revenit la pagina implicită.',
    send: 'Trimite-mi pagina asta',
    sendHint: 'Se deschide emailul, cu configurația deja scrisă.',
    badge: { '3d': '3D', live: 'Live', original: 'Original', new: 'Nou' },
    themeChanged: 'Temă: {name}.',
    jump: 'Mergi la {name} pe pagină',
    newTitle: 'Vrei ceva complet nou?',
    newText: 'Secțiunile de aici sunt un punct de plecare, nu un meniu fix. Spune-ne despre afacerea ta și îți desenăm un layout doar pentru tine.',
    newLink: 'Spune-ne ce ai în minte',
    included: 'Mereu incluse: servicii și program live din aplicație, programare online, gândită pentru telefon, adresa ta pe internet.'
  },

  skins: {
    luxe: { name: 'Lux întunecat', desc: 'Negru profund, titluri serif, detalii aurii.' },
    clean: { name: 'Luminos și curat', desc: 'Alb aerisit, umbre fine, calm.' },
    bold: { name: 'Îndrăzneț și colorat', desc: 'Culori vii, contururi puternice, jucăuș.' }
  },

  niches: {
    beauty: 'Salon de înfrumusețare',
    nails: 'Studio de unghii',
    barber: 'Frizerie / barber shop',
    spa: 'Masaj și spa',
    detailing: 'Car detailing',
    trainer: 'Antrenor personal',
    dental: 'Cabinet stomatologic',
    derma: 'Dermatolog',
    clinic: 'Kineto / cabinet privat',
    tattoo: 'Studio de tatuaje'
  },

  sec: {
    hero: { name: 'Hero 3D', desc: 'Particule care urmăresc mouse-ul sau înclinarea telefonului.' },
    slider: { name: 'Slider pe tot ecranul', desc: 'Poze mari cu autoplay, swipe și parallax.' },
    services: { name: 'Carduri de servicii', desc: 'Carduri care se înclină 3D, prețuri din aplicație.' },
    book: { name: 'Carte de prețuri', desc: 'Lista de prețuri ca o carte cu pagini care se întorc.' },
    prices: { name: 'Listă de prețuri', desc: 'O listă simplă, pe grupe.' },
    basket: { name: 'Planificator de vizită', desc: 'Bifezi servicii, vezi timpul și prețul total.' },
    compare: { name: 'Înainte și după', desc: 'Tragi de mâner ca să compari două poze.' },
    stats: { name: 'Cifre', desc: 'Clienți, ani și rating care cresc animat.' },
    coverflow: { name: 'Galerie 3D', desc: 'Poze într-un carusel coverflow.' },
    filmstrip: { name: 'Filmstrip', desc: 'Poză mare cu o bandă de miniaturi.' },
    insta: { name: 'Grilă Instagram', desc: 'Poze pătrate, cu vizualizare pe tot ecranul.' },
    team: { name: 'Echipa', desc: 'Carduri care se întorc, cu specialități și programare.' },
    products: { name: 'Produse', desc: 'Produsele pe care le vinzi, adăugate manual.' },
    gift: { name: 'Card cadou', desc: 'Un card 3D; clientul sună pentru detalii.' },
    loyalty: { name: 'Card de fidelitate', desc: 'Ștampile care se umplu la scroll.' },
    reviews: { name: 'Recenzii', desc: 'Un carusel cu păreri de la clienți.' },
    faq: { name: 'Întrebări frecvente', desc: 'Răspunsuri la întrebările des întâlnite.' },
    hours: { name: 'Program', desc: '„Deschis acum” live și banda zilei de azi.' },
    map: { name: 'Hartă', desc: 'Hartă stilizată; Google Maps se încarcă la atingere.' },
    booking: { name: 'Formular de programare', desc: 'Serviciu, dată și oră din programul tău.' },
    contactbar: { name: 'Bară de contact', desc: 'Sună, WhatsApp și Programare, mereu la îndemână.' }
  },

  nav: {
    services: 'Servicii',
    prices: 'Prețuri',
    gallery: 'Galerie',
    team: 'Echipa',
    shop: 'Produse',
    reviews: 'Recenzii',
    contact: 'Contact',
    book: 'Programare',
    label: 'Secțiuni'
  },

  common: {
    book: 'Programează-te',
    bookNow: 'Programează-te',
    bookThis: 'Programează {name}',
    bookWith: 'Programează-te la {name}',
    onRequest: 'Preț la cerere',
    sample: 'Exemplu',
    prev: 'Înapoi',
    next: 'Înainte',
    pause: 'Pauză',
    play: 'Pornește',
    close: 'Închide',
    loading: 'Se încarcă serviciile…',
    failed: 'Lista de prețuri nu s-a putut încărca acum.',
    failedLink: 'Vezi prețurile pe pagina de programare',
    seeAll: 'Vezi toate cele {n} servicii',
    showLess: 'Arată mai puține',
    sampleNote: 'Conținut de exemplu. Pe pagina ta, aici e conținutul tău.',
    photoOf: 'Poza {n} din {total}',
    demoCall: 'Pagină demo: pe pagina ta, butonul acesta te sună.',
    demoWhatsapp: 'Pagină demo: pe pagina ta, aici se deschide o conversație pe WhatsApp cu tine.',
    demoReserve: 'Pagină demo: pe pagina ta, aici primești un mesaj de rezervare pentru „{name}”.',
    demoForm: 'Pagină demo: pe pagina ta, cererea ajunge la tine în aplicația Appointments.',
    demoSocial: 'Pagină demo: pe pagina ta, aici se deschide profilul tău.'
  },

  hero: {
    primary: 'Programează-te',
    secondary: 'Vezi prețurile',
    scroll: 'Derulează',
    tilt: 'Pornește înclinarea 3D',
    tiltOn: 'Înclinarea 3D e pornită'
  },

  slider: {
    eyebrow: 'În studio',
    label: 'Prezentare de poze',
    slide: 'Slide-ul {n} din {total}'
  },

  services: {
    eyebrow: 'Servicii',
    title: 'Ce facem cel mai bine',
    lead: 'Prețurile și duratele vin live din aplicația de programări, deci sunt mereu la zi.',
    more: 'Vezi toate prețurile'
  },

  book: {
    eyebrow: 'Meniu de prețuri',
    title: 'Răsfoiește meniul nostru',
    lead: 'Trage de colțul paginii, atinge marginile sau folosește săgețile.',
    coverTitle: 'Meniu de prețuri',
    coverSub: 'Servicii și prețuri',
    introTitle: 'Bine ai venit',
    introText: 'Fiecare serviciu, cât durează și cât costă. Atinge un rând ca să te programezi.',
    contents: 'Cuprins',
    closingTitle: 'Te așteptăm',
    closingText: 'Te programezi online oricând. Confirmarea vine imediat.',
    hours: 'Program',
    page: 'Pagina {n} din {total}',
    prevPage: 'Pagina anterioară',
    nextPage: 'Pagina următoare',
    soundOn: 'Pornește sunetul paginilor',
    soundOff: 'Oprește sunetul paginilor',
    label: 'Cartea cu meniul de prețuri. Folosește săgețile ca să întorci paginile.',
    fallback: 'Cartea nu s-a putut deschide, așa că iată lista simplă.',
    continued: '{group} (continuare)'
  },

  prices: {
    eyebrow: 'Listă de prețuri',
    title: 'Prețuri',
    lead: 'Prețuri și durate clare, direct din aplicația de programări.'
  },

  basket: {
    eyebrow: 'Plănuiește vizita',
    title: 'Alcătuiește-ți vizita',
    lead: 'Bifează ce ți-ar plăcea. Noi adunăm timpul și prețul.',
    total: 'Total',
    time: 'Durată',
    empty: 'Nimic ales încă.',
    picked: '{n} alese',
    bookMany: 'Programează {n} servicii',
    bookOne: 'Programează serviciul',
    partial: 'Unele prețuri sunt la cerere; totalul arată doar partea cunoscută.',
    clear: 'Golește'
  },

  compare: {
    eyebrow: 'Înainte și după',
    title: 'Vezi diferența',
    before: 'Înainte',
    after: 'După',
    handle: 'Compară înainte și după',
    note: 'Poză de exemplu, editată ca să arate efectul. Pe pagina ta: pozele tale înainte și după.'
  },

  stats: {
    eyebrow: 'În cifre',
    title: 'Clienții ne aleg din nou',
    clients: 'clienți mulțumiți',
    years: 'ani de experiență',
    rating: 'nota medie'
  },

  coverflow: {
    eyebrow: 'Lucrările noastre',
    title: 'O privire asupra lucrărilor',
    label: 'Galerie foto 3D'
  },

  filmstrip: {
    eyebrow: 'Galerie',
    title: 'Fă turul',
    thumbs: 'Alege o poză'
  },

  insta: {
    eyebrow: 'Instagram',
    title: '@afacereata',
    lead: 'Proaspăt din feed-ul nostru.',
    follow: 'Urmărește-ne',
    open: 'Deschide poza: {alt}'
  },

  team: {
    eyebrow: 'Echipa',
    title: 'Cunoaște specialiștii',
    flip: 'Arată specialitățile lui {name}',
    flipBack: 'Arată poza lui {name}',
    specialties: 'Specialități'
  },

  products: {
    eyebrow: 'Produse',
    title: 'Ia îngrijirea acasă',
    lead: 'Produse pe care le folosim și le vindem în studio. Rezervă unul și îl iei la vizita următoare.',
    reserve: 'Rezervă',
    reserveAria: 'Rezervă {name}',
    note: 'Produsele se adaugă manual pe pagina ta; nu vin din aplicație.'
  },

  gift: {
    eyebrow: 'Card cadou',
    title: 'Dăruiește o oră de răsfăț',
    lead: 'Sună-ne și îți spunem sumele și cum arată cardul. Îl plătești și îl ridici de la noi.',
    msg: 'La mulți ani!',
    flip: 'Întoarce cardul',
    cta: 'Sună pentru detalii',
    card: 'Card cadou',
    valid: 'Valabil 12 luni'
  },

  loyalty: {
    eyebrow: 'Card de fidelitate',
    title: 'A 6-a vizită e din partea casei',
    lead: 'Fiecare vizită adaugă o ștampilă. Când cardul e plin, următorul serviciu e gratuit.',
    free: 'Gratuit',
    progress: '{n} din {total} ștampile',
    sample: 'Card de exemplu, cu patru ștampile.'
  },

  reviews: {
    eyebrow: 'Recenzii',
    title: 'Ce spun clienții',
    summary: 'Media {rating} din {count} recenzii',
    sample: 'Recenzie de exemplu',
    goto: 'Arată recenzia {n}',
    label: 'Recenziile clienților'
  },

  faq: {
    eyebrow: 'Întrebări frecvente',
    title: 'Bine de știut',
    common: [
      ['Cum mă programez?', 'Apeși „Programează-te”, alegi serviciul și o oră liberă. Confirmarea vine imediat.'],
      ['Pot anula sau muta programarea?', 'Da, din linkul din confirmare, cu cel puțin 24 de ore înainte.'],
      ['Cum pot plăti?', 'Cash sau card, la studio. Acceptăm și carduri cadou.'],
      ['Unde pot parca?', 'Există locuri pe stradă chiar în față și o parcare publică la două minute.']
    ]
  },

  hours: {
    eyebrow: 'Program',
    title: 'Când suntem deschiși',
    openNow: 'Deschis acum',
    closedNow: 'Închis acum',
    until: 'până la {time}',
    closesIn: 'Se închide în {time}',
    opensToday: 'Deschidem azi la {time}',
    opensOn: 'Deschidem {day} la {time}',
    today: 'Azi',
    now: 'Acum',
    timeline: 'Programul de azi, cu ora curentă marcată',
    closedToday: 'Azi e închis',
    note: 'Pe pagina ta, programul vine live din aplicația Appointments.',
    noHours: 'Vezi orele libere pe pagina de programare.',
    badgeOpen: 'Deschis acum · până la {time}',
    badgeClosed: 'Închis acum · programează-te online'
  },

  map: {
    eyebrow: 'Unde ne găsești',
    title: 'Treci pe la noi',
    address: 'Strada Memorandumului 28, Cluj-Napoca',
    phone: '+40 700 000 000',
    email: 'salut@afacereata.ro',
    load: 'Arată harta interactivă',
    loadNote: 'Google Maps se încarcă doar când atingi.',
    directions: 'Indicații',
    frame: 'Harta până la {name}',
    sample: 'Adresă de exemplu.'
  },

  booking: {
    eyebrow: 'Programare',
    title: 'Cere o programare',
    lead: 'Alegi serviciul și ora. Apar doar orele în care suntem deschiși.',
    service: 'Serviciu',
    date: 'Data',
    time: 'Ora',
    name: 'Numele tău',
    phone: 'Telefon',
    note: 'Mențiuni (opțional)',
    submit: 'Trimite cererea',
    closedDay: 'În ziua aceasta e închis. Alege altă dată.',
    pickDate: 'Alege întâi data',
    noSlots: 'Nu mai sunt ore libere în ziua aceasta.',
    missing: 'Completează: {fields}.',
    choose: 'Alege…'
  },

  contactbar: {
    label: 'Contact rapid',
    call: 'Sună',
    whatsapp: 'WhatsApp',
    book: 'Programare',
    online: 'Online'
  },

  footer: {
    rights: '© {year} {name}',
    powered: 'Programări online prin',
    sample: 'Date de exemplu. Pe pagina ta, aici sunt adresa, telefonul și linkurile tale reale.',
    social: 'Rețele sociale'
  }
};
