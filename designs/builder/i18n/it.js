// Testi in italiano. Le stesse chiavi di en.js; una chiave che manca qui viene presa da en.js.

export default {
  meta: {
    title: '{name} — Crea la tua pagina',
    desc: 'Crea la tua pagina di prenotazione: scegli le sezioni, il loro ordine, il tema e il colore.'
  },
  brandDefault: 'Nome della tua attività',

  ui: {
    title: 'Crea la tua pagina',
    lead: 'Tutto ciò che cambi compare subito sulla pagina.',
    open: 'Personalizza',
    openAria: 'Apri l’editor della pagina',
    close: 'Chiudi l’editor della pagina',
    collapse: 'Nascondi pannello',
    tabSections: 'Sezioni',
    tabStyle: 'Stile',
    business: 'Tipo di attività',
    name: 'Nome dell’attività',
    namePh: 'Nome della tua attività',
    theme: 'Tema',
    season: 'Tema di stagione',
    seasonHint: 'Colori e decorazioni di festa sulla pagina, con una mascotte che fa un suono quando la tocchi. Automatico cambia in base alla data di oggi.',
    seasonAuto: 'Automatico per data (ora: {name})',
    accent: 'Colore di accento',
    customColor: 'Scegli un colore',
    accentReset: 'Colore del tema',
    lang: 'Lingua della pagina',
    motion: 'Riduci le animazioni',
    motionHint: 'Disattiva il 3D e le animazioni.',
    phone: 'Anteprima su telefono',
    presets: 'Parti da una pagina pronta',
    presetsHint: 'Un tocco e hai una pagina completa per la tua attività. Dopo puoi cambiare tutto.',
    presetDone: 'Pagina pronta applicata: {name}.',
    ownMix: 'Oppure scegli tu le sezioni',
    sectionsHint: 'Spunta una sezione per mostrarla e scegline il tipo. Trascina la maniglia o usa le frecce per cambiare l’ordine.',
    floating: 'Fluttuanti',
    moveUp: 'Sposta su {name}',
    moveDown: 'Sposta giù {name}',
    drag: 'Trascina per spostare {name}. Da tastiera, usa Alt + freccia su o giù.',
    show: 'Mostra {name}',
    moved: '{name} spostato in posizione {pos} di {total}.',
    added: '{name} aggiunto alla pagina.',
    removed: '{name} rimosso dalla pagina.',
    type: 'Tipo',
    typeChanged: '{name}: {type}.',
    removeCopy: 'Rimuovi {name}',
    addCopy: 'Aggiungi un’altra',
    count: '{on} di {total} sezioni sulla pagina',
    copy: 'Copia link',
    copied: 'Link copiato. Chi lo apre vede questa pagina.',
    copyFailed: 'Impossibile copiare. Seleziona la barra degli indirizzi e copia il link da lì.',
    reset: 'Ripristina',
    resetDone: 'Tornato alla pagina predefinita.',
    send: 'Mandatemi questa pagina',
    sendHint: 'Apre la tua email con questa configurazione già scritta.',
    badge: { '3d': '3D', live: 'Live', original: 'Originale', new: 'Nuovo' },
    themeChanged: 'Tema: {name}.',
    jump: 'Vai a {name} nella pagina',
    newTitle: 'Qualcosa di completamente nuovo?',
    newText: 'Queste sezioni sono un punto di partenza, non un menu fisso. Raccontaci della tua attività e progettiamo un layout solo per te.',
    newLink: 'Dicci cosa hai in mente',
    included: 'Sempre incluso: servizi e orari in diretta dall’app, prenotazione online, pensata per il telefono, il tuo indirizzo web.'
  },

  skins: {
    luxe: { name: 'Lusso scuro', desc: 'Nero profondo, titoli con grazie, dettagli dorati.' },
    clean: { name: 'Chiaro e pulito', desc: 'Bianco arioso, ombre morbide, calma.' },
    bold: { name: 'Audace e colorato', desc: 'Colori vivaci, bordi decisi, giocoso.' }
  },

  // Seasonal themes (core/season.js, season/decor.js). bubbles: what the mascot says, | between lines.
  season: {
    sound: 'Suono della mascotte',
    none: { name: 'Nessuno' },
    halloween: { name: 'Halloween', greet: 'Buon Halloween! Prenota il tuo appuntamento per la stagione da brivido.', mascot: 'Spaventapasseri di Halloween — toccalo per sentirlo', bubbles: 'Buu!|Ih ih ih!|Attento!' },
    blackfriday: { name: 'Black Friday', greet: 'È arrivato il Black Friday: prenota ora e cogli le offerte della settimana.', mascot: 'Borsa Black Friday — toccala per sentirla', bubbles: 'Cha-ching!|Offerte!|Non perderle!' },
    christmas: { name: 'Natale', greet: 'Buon Natale! Concediti una coccola, o regalala a qualcuno di caro.', mascot: 'Pupazzo di neve — toccalo per sentirlo', bubbles: 'Oh oh oh!|Jingle bells!|Buon Natale!' },
    newyear: { name: 'Capodanno', greet: 'Buon anno {year}! Inizia l\'anno al meglio.', mascot: 'Spumante di Capodanno — toccalo per sentirlo', bubbles: 'Cin cin!|Buon {year}!|Pop!' },
    valentine: { name: 'San Valentino', greet: 'Buon San Valentino! Coccola chi ami, o coccola te.', mascot: 'Cuore di San Valentino — toccalo per sentirlo', bubbles: 'Ti amo!|Smack!|Sii mia!' },
    spring: { name: 'Primavera', greet: 'È arrivata la primavera! Fiori freschi, look fresco.', mascot: 'Tulipani di primavera — toccali per sentirli', bubbles: 'Cip cip!|Ciao, primavera!|Si fiorisce!' },
    easter: { name: 'Pasqua', greet: 'Buona Pasqua! Prenota prima delle feste.', mascot: 'Coniglietto di Pasqua — toccalo per sentirlo', bubbles: 'Buona Pasqua!|Hop hop!|Un uovo!' },
    summer: { name: 'Estate', greet: 'Ciao, estate! Preparati per le giornate di sole.', mascot: 'Sole d\'estate — toccalo per sentirlo', bubbles: 'Ciao, estate!|Splash!|Che sole!' }
  },

  niches: {
    beauty: 'Salone di bellezza e parrucchiere',
    nails: 'Studio unghie',
    barber: 'Barbiere',
    spa: 'Massaggi e spa',
    detailing: 'Car detailing',
    trainer: 'Personal trainer',
    dental: 'Studio dentistico',
    derma: 'Dermatologo',
    clinic: 'Fisioterapia / studio privato',
    tattoo: 'Studio di tatuaggi'
  },

  sec: {
    hero: { name: 'Apertura 3D', desc: 'Particelle che seguono il mouse o l’inclinazione del telefono.' },
    slider: { name: 'Slideshow a schermo intero', desc: 'Foto grandi con riproduzione automatica, swipe e parallasse.' },
    services: { name: 'Schede servizi', desc: 'Schede che si inclinano in 3D, prezzi dall’app.' },
    book: { name: 'Libro dei prezzi', desc: 'Il tuo listino in un libro con le pagine che si girano.' },
    prices: { name: 'Listino prezzi', desc: 'Un listino semplice, raggruppato.' },
    basket: { name: 'Pianifica la visita', desc: 'Spunta i servizi, vedi durata e prezzo totale.' },
    compare: { name: 'Cursore', desc: 'Trascina la maniglia per confrontare due foto.' },
    stats: { name: 'Contatori animati', desc: 'Clienti, anni e valutazione che salgono.' },
    coverflow: { name: 'Galleria 3D', desc: 'Foto in un carosello coverflow.' },
    filmstrip: { name: 'Pellicola', desc: 'Una foto grande con una striscia di miniature.' },
    insta: { name: 'Griglia Instagram', desc: 'Griglia di foto quadrate con vista a schermo intero.' },
    team: { name: 'Schede girevoli', desc: 'Schede che si girano con specialità e prenotazione.' },
    products: { name: 'Schede prodotto', desc: 'Prodotti che vendi, aggiunti a mano.' },
    gift: { name: 'Gift card 3D', desc: 'Una carta in 3D; i clienti chiamano per i dettagli.' },
    loyalty: { name: 'Tessera a timbri', desc: 'Timbri che si riempiono mentre scorri.' },
    reviews: { name: 'Carosello recensioni', desc: 'Un carosello di recensioni dei clienti.' },
    reviewbook: { name: 'Libro degli ospiti', desc: 'Recensioni dei clienti in un libro con le pagine che si girano.' },
    faq: { name: 'Fisarmonica', desc: 'Risposte alle domande frequenti.' },
    hours: { name: 'Orari in diretta', desc: '«Aperto ora» in diretta e la giornata di oggi.' },
    map: { name: 'Mappa con dettagli', desc: 'Una mappa stilizzata; Google Maps si carica al tocco.' },
    booking: { name: 'Modulo di prenotazione', desc: 'Servizio, data e ora in base ai tuoi orari.' },
    contactbar: { name: 'Barra in basso', desc: 'Chiama, WhatsApp e Prenota, sempre a portata di mano.' },
    herosplit: { name: 'Testo e foto grande', desc: 'Il titolo accanto a una foto grande. La prima schermata più leggera.' },
    heroring: { name: 'Anello di foto', desc: 'Foto su un anello 3D che gira mentre scorri o lo trascini.' },
    herocube: { name: 'Cubo di foto', desc: 'Quattro foto su un cubo 3D; le frecce o uno swipe lo girano.' },
    herofloat: { name: 'Schede fluttuanti', desc: 'Una foto grande, con il voto e i clienti che fluttuano in 3D.' },
    compareduo: { name: 'Affiancate', desc: 'Foto prima e dopo una accanto all’altra.' },
    statsband: { name: 'Fascia numeri', desc: 'Una fascia colorata con i tuoi numeri.' },
    statsticker: { name: 'Fascia scorrevole', desc: 'I tuoi numeri scorrono da destra a sinistra, senza sosta.' },
    teamgrid: { name: 'Schede profilo', desc: 'Foto rotonde, specialità e un pulsante per prenotare.' },
    productlist: { name: 'Elenco prodotti', desc: 'Un elenco compatto con foto e prezzi.' },
    giftbanner: { name: 'Banner regalo', desc: 'Un banner largo con gli importi più scelti.' },
    loyaltyline: { name: 'Linea di avanzamento', desc: 'Le visite su una linea; l’ultima è gratis.' },
    faqgrid: { name: 'Schede domande', desc: 'Tutte le risposte visibili, in griglia.' },
    hourscard: { name: 'Scheda orari', desc: 'Aperto ora e tutta la settimana in una scheda.' },
    mapwide: { name: 'Mappa larga', desc: 'Una mappa a tutta larghezza con l’indirizzo sopra.' },
    contactfab: { name: 'Pulsanti rotondi', desc: 'Bolle di WhatsApp e chiamata nell’angolo.' },
    contactdock: { name: 'Barra dock', desc: 'Chiama, WhatsApp e Prenota in una pillola; Chiama mostra aperto o chiuso.' },
    contactbookfirst: { name: 'Prenota in primo piano', desc: 'Un grande pulsante Prenota, con Chiama e WhatsApp rotondi accanto.' },
    contactstatus: { name: 'Barra di stato', desc: 'Una barra sul bordo inferiore: Chiama con gli orari di oggi, WhatsApp e Prenota.' },
    masonry: { name: 'Griglia a mosaico', desc: 'Foto di forme diverse in colonne, stile Pinterest.' },
    carousel: { name: 'Carosello a scorrimento', desc: 'Una fila di schede foto da scorrere di lato.' }
  },

  grp: {
    hero: { name: 'Apertura' },
    compare: { name: 'Prima e dopo' },
    stats: { name: 'Numeri' },
    team: { name: 'Team' },
    products: { name: 'Prodotti' },
    gift: { name: 'Gift card' },
    loyalty: { name: 'Tessera fedeltà' },
    faq: { name: 'FAQ' },
    hours: { name: 'Orari' },
    map: { name: 'Mappa' },
    contactbar: { name: 'Pulsanti di contatto' },
    gallery: { name: 'Galleria foto', add: 'Aggiungi un’altra galleria' },
    prices: { name: 'Prezzi', add: 'Aggiungi un altro' },
    reviews: { name: 'Recensioni' }
  },

  nav: {
    services: 'Servizi',
    prices: 'Prezzi',
    gallery: 'Galleria',
    team: 'Team',
    shop: 'Negozio',
    reviews: 'Recensioni',
    contact: 'Contatti',
    book: 'Prenota',
    label: 'Sezioni'
  },

  common: {
    book: 'Prenota online',
    bookNow: 'Prenota ora',
    bookThis: 'Prenota {name}',
    bookWith: 'Prenota con {name}',
    onRequest: 'Prezzo su richiesta',
    sample: 'Esempio',
    prev: 'Precedente',
    next: 'Successivo',
    pause: 'Pausa',
    play: 'Riproduci',
    close: 'Chiudi',
    loading: 'Caricamento dei servizi…',
    failed: 'Al momento non è stato possibile caricare il listino.',
    failedLink: 'Vedi i prezzi sulla pagina di prenotazione',
    seeAll: 'Vedi tutti i {n} servizi',
    showLess: 'Mostra meno',
    sampleNote: 'Contenuto di esempio. Sulla tua pagina è il tuo.',
    photoOf: 'Foto {n} di {total}',
    demoCall: 'Pagina demo: sulla tua pagina questo pulsante ti chiama.',
    demoWhatsapp: 'Pagina demo: sulla tua pagina questo pulsante apre una chat WhatsApp con te.',
    demoReserve: 'Pagina demo: sulla tua pagina questo pulsante ti manda un messaggio per prenotare «{name}».',
    demoForm: 'Pagina demo: sulla tua pagina questa richiesta ti arriva nell’app Appointments.',
    demoSocial: 'Pagina demo: sulla tua pagina questo pulsante apre il tuo profilo.'
  },

  hero: {
    primary: 'Prenota online',
    secondary: 'Vedi i prezzi',
    scroll: 'Scorri in basso',
    tilt: 'Attiva l’inclinazione 3D',
    tiltOn: 'L’inclinazione 3D è attiva'
  },

  slider: {
    eyebrow: 'In studio',
    label: 'Slideshow di foto',
    slide: 'Slide {n} di {total}'
  },

  services: {
    eyebrow: 'Servizi',
    title: 'Quello che facciamo meglio',
    lead: 'Prezzi e durate arrivano in diretta dall’app di prenotazione, sempre aggiornati.',
    more: 'Vedi tutti i prezzi'
  },

  book: {
    eyebrow: 'Menu dei prezzi',
    title: 'Sfoglia il nostro menu',
    lead: 'Trascina un angolo della pagina, tocca i bordi o usa le frecce.',
    coverTitle: 'Menu dei prezzi',
    coverSub: 'Servizi e prezzi',
    introTitle: 'Benvenuti',
    introText: 'Ogni servizio, quanto dura e quanto costa. Tocca una riga per prenotarlo.',
    contents: 'Indice',
    closingTitle: 'A presto',
    closingText: 'Prenota online quando vuoi. Ricevi subito la conferma.',
    hours: 'Orari di apertura',
    page: 'Pagina {n} di {total}',
    prevPage: 'Pagina precedente',
    nextPage: 'Pagina successiva',
    soundOn: 'Attiva il suono delle pagine',
    soundOff: 'Disattiva il suono delle pagine',
    label: 'Libro dei prezzi. Usa le frecce per girare le pagine.',
    fallback: 'Non è stato possibile aprire il libro, ecco l’elenco semplice.',
    continued: '{group} (continua)'
  },

  prices: {
    eyebrow: 'Listino',
    title: 'Prezzi',
    lead: 'Prezzi e durate chiari, direttamente dall’app di prenotazione.'
  },

  basket: {
    eyebrow: 'Pianifica la visita',
    title: 'Componi la tua visita',
    lead: 'Spunta quello che ti piacerebbe. Sommiamo noi durata e prezzo.',
    total: 'Totale',
    time: 'Durata',
    empty: 'Ancora niente di scelto.',
    picked: '{n} scelti',
    bookMany: 'Prenota {n} servizi',
    bookOne: 'Prenota questo servizio',
    partial: 'Alcuni prezzi sono su richiesta; il totale mostra la parte nota.',
    clear: 'Cancella'
  },

  compare: {
    eyebrow: 'Prima e dopo',
    title: 'Guarda la differenza',
    before: 'Prima',
    after: 'Dopo',
    handle: 'Confronta prima e dopo',
    note: 'Foto di esempio, ritoccata per mostrare l’effetto. Sulla tua pagina: le tue foto prima e dopo.'
  },

  stats: {
    eyebrow: 'In numeri',
    title: 'La fiducia dei nostri clienti',
    clients: 'clienti soddisfatti',
    years: 'anni di esperienza',
    rating: 'valutazione media'
  },

  coverflow: {
    eyebrow: 'I nostri lavori',
    title: 'Uno sguardo al nostro lavoro',
    label: 'Galleria foto 3D'
  },

  filmstrip: {
    eyebrow: 'Galleria',
    title: 'Fai il giro',
    thumbs: 'Scegli una foto'
  },

  masonry: {
    eyebrow: 'Galleria',
    title: 'Momenti dallo studio',
    lead: 'Forme diverse, come un vero feed. Tocca una foto per vederla in grande.'
  },

  carousel: {
    eyebrow: 'I nostri lavori',
    title: 'Scorri i nostri lavori',
    label: 'Carosello di foto. Scorri di lato o usa i pulsanti.'
  },

  insta: {
    eyebrow: 'Instagram',
    title: '@latuaattivita',
    lead: 'Fresco dal nostro feed.',
    follow: 'Seguici',
    open: 'Apri la foto: {alt}'
  },

  team: {
    eyebrow: 'Il team',
    title: 'Conosci gli specialisti',
    flip: 'Mostra le specialità di {name}',
    flipBack: 'Mostra la foto di {name}',
    specialties: 'Specialità'
  },

  products: {
    eyebrow: 'Negozio',
    title: 'Porta la cura a casa',
    lead: 'Prodotti che usiamo e vendiamo in studio. Prenotane uno e ritiralo alla prossima visita.',
    reserve: 'Prenota',
    reserveAria: 'Prenota {name}',
    note: 'I prodotti si aggiungono a mano sulla tua pagina; non arrivano dall’app.'
  },

  gift: {
    eyebrow: 'Gift card',
    title: 'Regala un’ora di benessere',
    lead: 'Chiamaci e ti diciamo gli importi e com’è la carta. La paghi e la ritiri qui.',
    msg: 'Buon compleanno!',
    flip: 'Gira la carta',
    cta: 'Chiama per i dettagli',
    card: 'Gift card',
    valid: 'Valida 12 mesi'
  },

  giftbanner: {
    amounts: 'Importi più scelti'
  },

  loyalty: {
    eyebrow: 'Tessera fedeltà',
    title: 'Ogni 6ª visita la offriamo noi',
    lead: 'Ogni visita aggiunge un timbro. Quando la tessera è piena, il prossimo servizio è gratis.',
    free: 'Gratis',
    progress: '{n} timbri su {total}',
    sample: 'Tessera di esempio con quattro timbri.'
  },

  reviews: {
    eyebrow: 'Recensioni',
    title: 'Cosa dicono i clienti',
    summary: '{rating} di media su {count} recensioni',
    sample: 'Recensione di esempio',
    goto: 'Mostra la recensione {n}',
    label: 'Recensioni dei clienti'
  },

  reviewbook: {
    eyebrow: 'Recensioni',
    title: 'Il nostro libro degli ospiti',
    lead: 'Sfoglia le pagine per leggere cosa hanno scritto di noi i clienti.',
    label: 'Libro delle recensioni. Usa le frecce per girare le pagine.',
    coverTitle: 'Libro degli ospiti',
    coverSub: 'Recensioni dei clienti',
    introTitle: 'Grazie per ogni parola',
    closingTitle: 'Tocca a te',
    closingText: 'Vieni a vedere di persona, poi raccontaci com’è andata.'
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Buono a sapersi',
    common: [
      ['Come prenoto?', 'Tocca «Prenota online», scegli un servizio e un orario libero. Ricevi subito la conferma.'],
      ['Posso annullare o spostare l’appuntamento?', 'Sì, dal link nella conferma, fino a 24 ore prima.'],
      ['Come posso pagare?', 'In contanti o con carta in studio. Accettiamo anche le gift card.'],
      ['Dove posso parcheggiare?', 'C’è parcheggio in strada proprio davanti e un parcheggio pubblico a due minuti.']
    ]
  },

  hours: {
    eyebrow: 'Orari',
    title: 'Quando siamo aperti',
    openNow: 'Aperto ora',
    closedNow: 'Chiuso ora',
    until: 'fino alle {time}',
    closesIn: 'Chiude tra {time}',
    opensToday: 'Apre oggi alle {time}',
    opensOn: 'Apre {day} alle {time}',
    today: 'Oggi',
    now: 'Ora',
    timeline: 'Orari di oggi, con l’ora attuale indicata',
    closedToday: 'Chiuso oggi',
    note: 'Sulla tua pagina, gli orari arrivano in diretta dall’app Appointments.',
    noHours: 'Vedi gli orari disponibili sulla pagina di prenotazione.',
    badgeOpen: 'Aperto ora · fino alle {time}',
    badgeClosed: 'Chiuso ora · prenota online'
  },

  map: {
    eyebrow: 'Dove siamo',
    title: 'Vieni a trovarci',
    address: 'Strada Memorandumului 28, Cluj-Napoca',
    phone: '+40 700 000 000',
    email: 'ciao@latuaattivita.it',
    load: 'Mostra la mappa interattiva',
    loadNote: 'Google Maps si carica solo quando tocchi.',
    directions: 'Indicazioni',
    frame: 'Mappa per {name}',
    sample: 'Indirizzo di esempio.'
  },

  booking: {
    eyebrow: 'Prenota',
    title: 'Richiedi un appuntamento',
    lead: 'Scegli un servizio e un orario. Mostriamo solo gli orari in cui siamo aperti.',
    service: 'Servizio',
    date: 'Data',
    time: 'Ora',
    name: 'Il tuo nome',
    phone: 'Telefono',
    note: 'Nota (facoltativa)',
    submit: 'Invia la richiesta',
    closedDay: 'Quel giorno siamo chiusi. Scegli un’altra data.',
    pickDate: 'Scegli prima una data',
    noSlots: 'Non ci sono più orari liberi quel giorno.',
    missing: 'Compila: {fields}.',
    choose: 'Scegli…'
  },

  contactbar: {
    label: 'Contatto rapido',
    call: 'Chiama',
    whatsapp: 'WhatsApp',
    book: 'Prenota',
    online: 'Online'
  },

  footer: {
    rights: '© {year} {name}',
    powered: 'Prenotazioni online con',
    sample: 'Dati di esempio. Sulla tua pagina ci sono il tuo indirizzo, telefono e link reali.',
    social: 'Social media'
  }
};
