// Teksty po polsku. Te same klucze co w en.js; brakujący klucz jest brany z en.js.

export default {
  meta: {
    title: '{name} — Kreator strony',
    desc: 'Zbuduj własną stronę rezerwacji: wybierz sekcje, ich kolejność, motyw i kolor.'
  },
  brandDefault: 'Nazwa Twojej firmy',

  ui: {
    title: 'Zbuduj swoją stronę',
    lead: 'Każda zmiana od razu pojawia się na stronie.',
    open: 'Dostosuj',
    openAria: 'Otwórz kreator strony',
    close: 'Zamknij kreator strony',
    collapse: 'Ukryj panel',
    tabSections: 'Sekcje',
    tabStyle: 'Styl',
    business: 'Rodzaj działalności',
    name: 'Nazwa firmy',
    namePh: 'Nazwa Twojej firmy',
    theme: 'Motyw',
    season: 'Motyw sezonowy',
    seasonHint: 'Świąteczne kolory i dekoracje na stronie, z maskotką, która wydaje dźwięk po dotknięciu. Automatyczny zmienia się według dzisiejszej daty.',
    seasonAuto: 'Automatycznie wg daty (teraz: {name})',
    accent: 'Kolor akcentu',
    customColor: 'Wybierz dowolny kolor',
    accentReset: 'Kolor motywu',
    lang: 'Język strony',
    motion: 'Ogranicz ruch',
    motionHint: 'Wyłącza 3D i animacje.',
    phone: 'Podgląd na telefonie',
    presets: 'Zacznij od gotowej strony',
    presetsHint: 'Jedno kliknięcie i masz kompletną stronę dla swojej branży. Potem możesz zmienić wszystko.',
    presetDone: 'Zastosowano gotową stronę: {name}.',
    ownMix: 'Albo wybierz sekcje sam',
    sectionsHint: 'Zaznacz sekcję, aby ją pokazać, i wybierz jej typ. Przeciągnij uchwyt lub użyj strzałek, aby zmienić kolejność.',
    floating: 'Pływające',
    moveUp: 'Przesuń {name} w górę',
    moveDown: 'Przesuń {name} w dół',
    drag: 'Przeciągnij, aby przenieść {name}. Z klawiatury: Alt + strzałka w górę lub w dół.',
    show: 'Pokaż {name}',
    moved: '{name} przeniesiono na pozycję {pos} z {total}.',
    added: 'Dodano {name} do strony.',
    removed: 'Usunięto {name} ze strony.',
    type: 'Typ',
    typeChanged: '{name}: {type}.',
    removeCopy: 'Usuń {name}',
    addCopy: 'Dodaj kolejną',
    count: '{on} z {total} sekcji na stronie',
    copy: 'Kopiuj link',
    copied: 'Link skopiowany. Każdy, kto go otworzy, zobaczy tę stronę.',
    copyFailed: 'Nie udało się skopiować. Zaznacz pasek adresu i skopiuj link stamtąd.',
    reset: 'Resetuj',
    resetDone: 'Przywrócono stronę domyślną.',
    send: 'Wyślijcie mi tę stronę',
    sendHint: 'Otwiera pocztę z już wpisaną konfiguracją.',
    badge: { '3d': '3D', live: 'Na żywo', original: 'Oryginalne', new: 'Nowe' },
    themeChanged: 'Motyw: {name}.',
    jump: 'Przejdź do sekcji {name} na stronie',
    newTitle: 'Coś zupełnie nowego?',
    newText: 'Te sekcje to punkt wyjścia, a nie zamknięte menu. Opowiedz nam o swojej firmie, a zaprojektujemy układ tylko dla Ciebie.',
    newLink: 'Powiedz nam, co masz na myśli',
    included: 'Zawsze w cenie: usługi i godziny na żywo z aplikacji, rezerwacje online, wygodna na telefonie, Twój własny adres www.'
  },

  skins: {
    luxe: { name: 'Ciemny luksus', desc: 'Głęboka czerń, szeryfowe tytuły, złote detale.' },
    clean: { name: 'Jasny i czysty', desc: 'Przestronna biel, miękkie cienie, spokój.' },
    bold: { name: 'Odważny i kolorowy', desc: 'Żywe kolory, mocne obramowania, zabawa.' }
  },

  // Seasonal themes (core/season.js, season/decor.js). bubbles: what the mascot says, | between lines.
  season: {
    sound: 'Dźwięk maskotki',
    none: { name: 'Brak' },
    halloween: { name: 'Halloween', greet: 'Wesołego Halloween! Zarezerwuj wizytę na straszny sezon.', mascot: 'Strach na wróble — dotknij, by usłyszeć', bubbles: 'Buu!|Hi hi hi!|Uważaj!' },
    blackfriday: { name: 'Black Friday', greet: 'Nadszedł Black Friday: zarezerwuj teraz i złap oferty tygodnia.', mascot: 'Torba zakupowa Black Friday — dotknij, by usłyszeć', bubbles: 'Dzyń-dzyń!|Promocje!|Nie przegap!' },
    christmas: { name: 'Boże Narodzenie', greet: 'Wesołych Świąt! Zrób przyjemność sobie albo komuś bliskiemu.', mascot: 'Bałwanek — dotknij, by usłyszeć', bubbles: 'Ho ho ho!|Dzwoneczki!|Wesołych Świąt!' },
    newyear: { name: 'Nowy Rok', greet: 'Szczęśliwego Nowego Roku {year}! Zacznij rok w najlepszej formie.', mascot: 'Szampan noworoczny — dotknij, by usłyszeć', bubbles: 'Na zdrowie!|Szczęśliwego {year}!|Pyk!' },
    valentine: { name: 'Walentynki', greet: 'Szczęśliwych Walentynek! Rozpieść ukochaną osobę albo siebie.', mascot: 'Walentynkowe serce — dotknij, by usłyszeć', bubbles: 'Kocham cię!|Cmok!|Bądź moja!' },
    spring: { name: 'Wiosna', greet: 'Przyszła wiosna! Świeże kwiaty, świeży wygląd.', mascot: 'Wiosenne tulipany — dotknij, by usłyszeć', bubbles: 'Ćwir ćwir!|Witaj, wiosno!|Kwitniemy!' },
    easter: { name: 'Wielkanoc', greet: 'Wesołych Świąt Wielkanocnych! Zarezerwuj przed świętami.', mascot: 'Zajączek wielkanocny — dotknij, by usłyszeć', bubbles: 'Wesołych Świąt!|Hop, hop!|Mam jajko!' },
    summer: { name: 'Lato', greet: 'Witaj, lato! Przygotuj się na słoneczne dni.', mascot: 'Letnie słońce — dotknij, by usłyszeć', bubbles: 'Witaj, lato!|Plusk!|Ale słońce!' }
  },

  niches: {
    beauty: 'Salon kosmetyczny i fryzjerski',
    nails: 'Studio paznokci',
    barber: 'Barber shop',
    spa: 'Masaż i spa',
    detailing: 'Detailing samochodowy',
    trainer: 'Trener personalny',
    dental: 'Gabinet stomatologiczny',
    derma: 'Dermatolog',
    clinic: 'Fizjoterapia / gabinet prywatny',
    tattoo: 'Studio tatuażu'
  },

  sec: {
    hero: { name: 'Nagłówek 3D', desc: 'Cząsteczki podążające za myszką lub przechyleniem telefonu.' },
    slider: { name: 'Pokaz pełnoekranowy', desc: 'Duże zdjęcia z autoodtwarzaniem, przesuwaniem i paralaksą.' },
    services: { name: 'Karty usług', desc: 'Karty przechylające się w 3D, ceny z aplikacji.' },
    book: { name: 'Księga cen', desc: 'Twój cennik w książce z przewracanymi stronami.' },
    prices: { name: 'Cennik', desc: 'Prosty cennik pogrupowany według rodzaju.' },
    basket: { name: 'Planer wizyty', desc: 'Zaznacz usługi i zobacz łączny czas i cenę.' },
    compare: { name: 'Suwak', desc: 'Przeciągnij uchwyt, aby porównać dwa zdjęcia.' },
    stats: { name: 'Animowane liczniki', desc: 'Klienci, lata i ocena, które rosną na oczach.' },
    coverflow: { name: 'Galeria 3D', desc: 'Zdjęcia w karuzeli coverflow.' },
    filmstrip: { name: 'Taśma filmowa', desc: 'Duże zdjęcie z paskiem miniatur.' },
    insta: { name: 'Siatka Instagram', desc: 'Siatka kwadratowych zdjęć z widokiem pełnoekranowym.' },
    team: { name: 'Odwracane karty', desc: 'Karty odwracane ze specjalizacjami i rezerwacją.' },
    products: { name: 'Karty produktów', desc: 'Produkty, które sprzedajesz, dodane ręcznie.' },
    gift: { name: 'Karta podarunkowa 3D', desc: 'Karta w 3D; klienci dzwonią po szczegóły.' },
    loyalty: { name: 'Karta z pieczątkami', desc: 'Pieczątki, które wypełniają się podczas przewijania.' },
    reviews: { name: 'Karuzela opinii', desc: 'Karuzela opinii klientów.' },
    reviewbook: { name: 'Księga gości', desc: 'Opinie klientów w książce z przewracanymi stronami.' },
    faq: { name: 'Akordeon', desc: 'Odpowiedzi na częste pytania.' },
    hours: { name: 'Godziny na żywo', desc: '„Teraz otwarte” na żywo i dzisiejsza oś czasu.' },
    map: { name: 'Mapa ze szczegółami', desc: 'Stylizowana mapa; Mapy Google ładują się po dotknięciu.' },
    booking: { name: 'Formularz rezerwacji', desc: 'Usługa, data i godzina według Twoich godzin otwarcia.' },
    contactbar: { name: 'Dolny pasek', desc: 'Zadzwoń, WhatsApp i Rezerwuj, zawsze pod ręką.' },
    herosplit: { name: 'Tekst i duże zdjęcie', desc: 'Nagłówek obok jednego dużego zdjęcia. Najlżejszy pierwszy ekran.' },
    heroring: { name: 'Pierścień zdjęć', desc: 'Zdjęcia na pierścieniu 3D, który obraca się przy przewijaniu lub przeciąganiu.' },
    herocube: { name: 'Kostka zdjęć', desc: 'Cztery zdjęcia na kostce 3D; strzałki lub przesunięcie ją obracają.' },
    herofloat: { name: 'Pływające karty', desc: 'Duże zdjęcie z oceną i klientami unoszącymi się w 3D.' },
    compareduo: { name: 'Obok siebie', desc: 'Zdjęcia przed i po obok siebie.' },
    statsband: { name: 'Pasek z liczbami', desc: 'Kolorowy pasek z Twoimi liczbami.' },
    statsticker: { name: 'Ruchomy pasek', desc: 'Twoje liczby przesuwają się od prawej do lewej bez przerwy.' },
    teamgrid: { name: 'Karty profilowe', desc: 'Okrągłe zdjęcia, specjalizacje i przycisk rezerwacji.' },
    productlist: { name: 'Lista produktów', desc: 'Zwięzła lista ze zdjęciami i cenami.' },
    giftbanner: { name: 'Baner prezentowy', desc: 'Szeroki baner z najczęściej wybieranymi kwotami.' },
    loyaltyline: { name: 'Linia postępu', desc: 'Wizyty na linii; ostatnia jest gratis.' },
    faqgrid: { name: 'Karty pytań', desc: 'Wszystkie odpowiedzi widoczne, w siatce.' },
    hourscard: { name: 'Karta godzin', desc: 'Teraz otwarte i cały tydzień na jednej karcie.' },
    mapwide: { name: 'Szeroka mapa', desc: 'Mapa na całą szerokość z adresem na wierzchu.' },
    contactfab: { name: 'Okrągłe przyciski', desc: 'Dymki WhatsApp i połączenia w rogu.' },
    contactdock: { name: 'Pasek dock', desc: 'Zadzwoń, WhatsApp i Zarezerwuj w jednej pigułce; Zadzwoń pokazuje otwarte lub zamknięte.' },
    contactbookfirst: { name: 'Rezerwacja na pierwszym planie', desc: 'Duży przycisk rezerwacji, a obok okrągłe Zadzwoń i WhatsApp.' },
    contactstatus: { name: 'Pasek stanu', desc: 'Pasek przy dolnej krawędzi: Zadzwoń z dzisiejszymi godzinami, WhatsApp i Zarezerwuj.' },
    masonry: { name: 'Siatka mozaikowa', desc: 'Zdjęcia o różnych kształtach w kolumnach, w stylu Pinterest.' },
    carousel: { name: 'Karuzela do przesuwania', desc: 'Rząd kart ze zdjęciami przesuwanych na boki.' }
  },

  grp: {
    hero: { name: 'Nagłówek' },
    compare: { name: 'Przed i po' },
    stats: { name: 'Liczby' },
    team: { name: 'Zespół' },
    products: { name: 'Produkty' },
    gift: { name: 'Karta podarunkowa' },
    loyalty: { name: 'Karta lojalnościowa' },
    faq: { name: 'FAQ' },
    hours: { name: 'Godziny otwarcia' },
    map: { name: 'Mapa' },
    contactbar: { name: 'Przyciski kontaktu' },
    gallery: { name: 'Galeria zdjęć', add: 'Dodaj kolejną galerię' },
    prices: { name: 'Ceny', add: 'Dodaj kolejny' },
    reviews: { name: 'Opinie' }
  },

  nav: {
    services: 'Usługi',
    prices: 'Ceny',
    gallery: 'Galeria',
    team: 'Zespół',
    shop: 'Sklep',
    reviews: 'Opinie',
    contact: 'Kontakt',
    book: 'Rezerwuj',
    label: 'Sekcje'
  },

  common: {
    book: 'Rezerwuj online',
    bookNow: 'Rezerwuj teraz',
    bookThis: 'Rezerwuj: {name}',
    bookWith: 'Rezerwuj u: {name}',
    onRequest: 'Cena na zapytanie',
    sample: 'Przykład',
    prev: 'Poprzednie',
    next: 'Następne',
    pause: 'Pauza',
    play: 'Odtwórz',
    close: 'Zamknij',
    loading: 'Ładowanie usług…',
    failed: 'Nie udało się teraz wczytać cennika.',
    failedLink: 'Zobacz ceny na stronie rezerwacji',
    seeAll: 'Zobacz wszystkie usługi ({n})',
    showLess: 'Pokaż mniej',
    sampleNote: 'Przykładowa treść. Na Twojej stronie będzie Twoja.',
    photoOf: 'Zdjęcie {n} z {total}',
    demoCall: 'Strona demo: na Twojej stronie ten przycisk dzwoni do Ciebie.',
    demoWhatsapp: 'Strona demo: na Twojej stronie ten przycisk otwiera czat WhatsApp z Tobą.',
    demoReserve: 'Strona demo: na Twojej stronie ten przycisk wysyła Ci wiadomość, by zarezerwować „{name}”.',
    demoForm: 'Strona demo: na Twojej stronie ta prośba trafia do Ciebie w aplikacji Appointments.',
    demoSocial: 'Strona demo: na Twojej stronie ten przycisk otwiera Twój profil.'
  },

  hero: {
    primary: 'Rezerwuj online',
    secondary: 'Zobacz ceny',
    scroll: 'Przewiń w dół',
    tilt: 'Włącz przechylanie 3D',
    tiltOn: 'Przechylanie 3D jest włączone'
  },

  slider: {
    eyebrow: 'W studiu',
    label: 'Pokaz zdjęć',
    slide: 'Slajd {n} z {total}'
  },

  services: {
    eyebrow: 'Usługi',
    title: 'W czym jesteśmy najlepsi',
    lead: 'Ceny i czasy przychodzą na żywo z aplikacji rezerwacji, więc zawsze są aktualne.',
    more: 'Zobacz wszystkie ceny'
  },

  book: {
    eyebrow: 'Menu cen',
    title: 'Przejrzyj nasze menu',
    lead: 'Przeciągnij róg strony, dotknij krawędzi lub użyj strzałek.',
    coverTitle: 'Menu cen',
    coverSub: 'Usługi i ceny',
    introTitle: 'Witamy',
    introText: 'Każda usługa, ile trwa i ile kosztuje. Dotknij wiersza, aby ją zarezerwować.',
    contents: 'Spis treści',
    closingTitle: 'Do zobaczenia',
    closingText: 'Rezerwuj online o każdej porze. Potwierdzenie dostajesz od razu.',
    hours: 'Godziny otwarcia',
    page: 'Strona {n} z {total}',
    prevPage: 'Poprzednia strona',
    nextPage: 'Następna strona',
    soundOn: 'Włącz dźwięk stron',
    soundOff: 'Wyłącz dźwięk stron',
    label: 'Księga cen. Użyj strzałek, aby przewracać strony.',
    fallback: 'Nie udało się otworzyć książki, więc oto prosta lista.',
    continued: '{group} (ciąg dalszy)'
  },

  prices: {
    eyebrow: 'Cennik',
    title: 'Ceny',
    lead: 'Jasne ceny i czasy, prosto z aplikacji rezerwacji.'
  },

  basket: {
    eyebrow: 'Zaplanuj wizytę',
    title: 'Skomponuj swoją wizytę',
    lead: 'Zaznacz, na co masz ochotę. My zsumujemy czas i cenę.',
    total: 'Razem',
    time: 'Czas',
    empty: 'Jeszcze nic nie wybrano.',
    picked: 'Wybrano: {n}',
    bookMany: 'Rezerwuj usługi ({n})',
    bookOne: 'Rezerwuj tę usługę',
    partial: 'Niektóre ceny są na zapytanie; suma pokazuje znaną część.',
    clear: 'Wyczyść'
  },

  compare: {
    eyebrow: 'Przed i po',
    title: 'Zobacz różnicę',
    before: 'Przed',
    after: 'Po',
    handle: 'Porównaj przed i po',
    note: 'Przykładowe zdjęcie, edytowane, by pokazać efekt. Na Twojej stronie: Twoje własne zdjęcia przed i po.'
  },

  stats: {
    eyebrow: 'W liczbach',
    title: 'Zaufali nam klienci',
    clients: 'zadowolonych klientów',
    years: 'lat doświadczenia',
    rating: 'średnia ocena'
  },

  coverflow: {
    eyebrow: 'Nasze prace',
    title: 'Rzut oka na nasze prace',
    label: 'Galeria zdjęć 3D'
  },

  filmstrip: {
    eyebrow: 'Galeria',
    title: 'Zajrzyj do nas',
    thumbs: 'Wybierz zdjęcie'
  },

  masonry: {
    eyebrow: 'Galeria',
    title: 'Chwile ze studia',
    lead: 'Różne kształty, jak w prawdziwym feedzie. Dotknij zdjęcia, aby je powiększyć.'
  },

  carousel: {
    eyebrow: 'Nasze prace',
    title: 'Przesuń przez nasze prace',
    label: 'Karuzela zdjęć. Przewiń na boki lub użyj przycisków.'
  },

  insta: {
    eyebrow: 'Instagram',
    title: '@twojafirma',
    lead: 'Świeżo z naszego profilu.',
    follow: 'Obserwuj nas',
    open: 'Otwórz zdjęcie: {alt}'
  },

  team: {
    eyebrow: 'Zespół',
    title: 'Poznaj specjalistów',
    flip: 'Pokaż specjalizacje: {name}',
    flipBack: 'Pokaż zdjęcie: {name}',
    specialties: 'Specjalizacje'
  },

  products: {
    eyebrow: 'Sklep',
    title: 'Zabierz pielęgnację do domu',
    lead: 'Produkty, których używamy i które sprzedajemy w studiu. Zarezerwuj i odbierz przy następnej wizycie.',
    reserve: 'Zarezerwuj',
    reserveAria: 'Zarezerwuj {name}',
    note: 'Produkty dodaje się na stronę ręcznie; nie pochodzą z aplikacji.'
  },

  gift: {
    eyebrow: 'Karta podarunkowa',
    title: 'Podaruj godzinę relaksu',
    lead: 'Zadzwoń, a powiemy Ci o kwotach i wyglądzie karty. Płacisz za nią i odbierasz ją u nas.',
    msg: 'Wszystkiego najlepszego!',
    flip: 'Odwróć kartę',
    cta: 'Zadzwoń po szczegóły',
    card: 'Karta podarunkowa',
    valid: 'Ważna 12 miesięcy'
  },

  giftbanner: {
    amounts: 'Najczęściej wybierane kwoty'
  },

  loyalty: {
    eyebrow: 'Karta lojalnościowa',
    title: 'Co 6. wizyta na nasz koszt',
    lead: 'Każda wizyta to jedna pieczątka. Gdy karta się zapełni, kolejna usługa jest gratis.',
    free: 'Gratis',
    progress: '{n} z {total} pieczątek',
    sample: 'Przykładowa karta z czterema pieczątkami.'
  },

  reviews: {
    eyebrow: 'Opinie',
    title: 'Co mówią klienci',
    summary: 'Średnia {rating} z {count} opinii',
    sample: 'Przykładowa opinia',
    goto: 'Pokaż opinię {n}',
    label: 'Opinie klientów'
  },

  reviewbook: {
    eyebrow: 'Opinie',
    title: 'Nasza księga gości',
    lead: 'Przewracaj strony, aby przeczytać, co napisali o nas klienci.',
    label: 'Księga opinii klientów. Użyj strzałek, aby przewracać strony.',
    coverTitle: 'Księga gości',
    coverSub: 'Opinie klientów',
    introTitle: 'Dziękujemy za każde słowo',
    closingTitle: 'Twoja kolej',
    closingText: 'Przyjdź i przekonaj się sam, a potem powiedz nam, jak było.'
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Warto wiedzieć',
    common: [
      ['Jak się zapisać?', 'Dotknij „Rezerwuj online”, wybierz usługę i wolny termin. Potwierdzenie dostajesz od razu.'],
      ['Czy mogę odwołać lub przełożyć wizytę?', 'Tak, przez link w potwierdzeniu, do 24 godzin wcześniej.'],
      ['Jak mogę zapłacić?', 'Gotówką lub kartą w studiu. Przyjmujemy też karty podarunkowe.'],
      ['Gdzie mogę zaparkować?', 'Tuż przed wejściem jest parkowanie przy ulicy, a dwie minuty dalej parking publiczny.']
    ]
  },

  hours: {
    eyebrow: 'Godziny',
    title: 'Kiedy jesteśmy otwarci',
    openNow: 'Teraz otwarte',
    closedNow: 'Teraz zamknięte',
    until: 'do {time}',
    closesIn: 'Zamykamy za {time}',
    opensToday: 'Otwieramy dziś o {time}',
    opensOn: 'Otwieramy: {day}, {time}',
    today: 'Dziś',
    now: 'Teraz',
    timeline: 'Dzisiejsze godziny otwarcia z zaznaczoną bieżącą godziną',
    closedToday: 'Dziś zamknięte',
    note: 'Na Twojej stronie godziny przychodzą na żywo z aplikacji Appointments.',
    noHours: 'Zobacz dostępne terminy na stronie rezerwacji.',
    badgeOpen: 'Teraz otwarte · do {time}',
    badgeClosed: 'Teraz zamknięte · rezerwuj online'
  },

  map: {
    eyebrow: 'Znajdź nas',
    title: 'Odwiedź nas',
    address: 'Strada Memorandumului 28, Cluj-Napoca',
    phone: '+40 700 000 000',
    email: 'czesc@twojafirma.pl',
    load: 'Pokaż interaktywną mapę',
    loadNote: 'Mapy Google ładują się dopiero po dotknięciu.',
    directions: 'Wskazówki dojazdu',
    frame: 'Mapa dojazdu: {name}',
    sample: 'Przykładowy adres.'
  },

  booking: {
    eyebrow: 'Rezerwacja',
    title: 'Poproś o termin',
    lead: 'Wybierz usługę i godzinę. Pokazujemy tylko godziny, w których jesteśmy otwarci.',
    service: 'Usługa',
    date: 'Data',
    time: 'Godzina',
    name: 'Imię i nazwisko',
    phone: 'Telefon',
    note: 'Uwagi (opcjonalnie)',
    submit: 'Wyślij prośbę',
    closedDay: 'W tym dniu jesteśmy zamknięci. Wybierz inną datę.',
    pickDate: 'Najpierw wybierz datę',
    noSlots: 'W tym dniu nie ma już wolnych terminów.',
    missing: 'Uzupełnij: {fields}.',
    choose: 'Wybierz…'
  },

  contactbar: {
    label: 'Szybki kontakt',
    call: 'Zadzwoń',
    whatsapp: 'WhatsApp',
    book: 'Rezerwuj',
    online: 'Online'
  },

  footer: {
    rights: '© {year} {name}',
    powered: 'Rezerwacje online:',
    sample: 'Przykładowe dane. Na Twojej stronie będą Twój prawdziwy adres, telefon i linki.',
    social: 'Media społecznościowe'
  }
};
