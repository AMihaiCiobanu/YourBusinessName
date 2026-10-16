// English texts. Keep the same keys in ro.js; a key missing there falls back to this file.

export default {
  meta: {
    title: '{name} — Page builder',
    desc: 'Build your own booking page: pick the sections, their order, the theme and the colour.'
  },
  brandDefault: 'Your Business Name',

  ui: {
    title: 'Build your page',
    lead: 'Everything you change shows up on the page right away.',
    open: 'Customize',
    openAria: 'Open the page builder',
    close: 'Close the page builder',
    collapse: 'Hide panel',
    tabSections: 'Sections',
    tabStyle: 'Style',
    business: 'Type of business',
    name: 'Business name',
    namePh: 'Your Business Name',
    theme: 'Theme',
    accent: 'Accent colour',
    customColor: 'Pick any colour',
    accentReset: 'Theme colour',
    lang: 'Page language',
    motion: 'Reduce motion',
    motionHint: 'Turns off 3D and animations.',
    phone: 'Phone preview',
    presets: 'Start from a ready page',
    presetsHint: 'One tap gives you a complete page for your kind of business. You can still change anything after.',
    presetDone: 'Ready page applied: {name}.',
    ownMix: 'Or pick the sections yourself',
    sectionsHint: 'Tick a section to show it. Drag the handle or use the arrows to change the order.',
    floating: 'Floating',
    moveUp: 'Move {name} up',
    moveDown: 'Move {name} down',
    drag: 'Drag to reorder {name}. With the keyboard, use Alt + arrow up or down.',
    show: 'Show {name}',
    moved: '{name} moved to position {pos} of {total}.',
    added: '{name} added to the page.',
    removed: '{name} removed from the page.',
    count: '{on} of {total} sections on the page',
    copy: 'Copy link',
    copied: 'Link copied. Anyone who opens it sees this page.',
    copyFailed: 'Could not copy. Select the address bar and copy the link from there.',
    reset: 'Reset',
    resetDone: 'Back to the default page.',
    send: 'Send me this page',
    sendHint: 'Opens your email with this setup already written in.',
    badge: { '3d': '3D', live: 'Live', original: 'Original', new: 'New' },
    themeChanged: 'Theme: {name}.',
    jump: 'Go to {name} on the page',
    newTitle: 'Something brand new?',
    newText: 'These sections are a starting point, not a fixed menu. Tell us about your business and we design a layout just for you.',
    newLink: 'Tell us what you have in mind',
    included: 'Always included: services and hours live from the app, online booking, made for phones, your own web address.'
  },

  skins: {
    luxe: { name: 'Dark luxury', desc: 'Deep black, serif titles, gold details.' },
    clean: { name: 'Light & clean', desc: 'Airy white, soft shadows, calm.' },
    bold: { name: 'Bold & colourful', desc: 'Bright colours, strong borders, playful.' }
  },

  niches: {
    beauty: 'Beauty & hair salon',
    nails: 'Nail studio',
    barber: 'Barbershop',
    spa: 'Massage & spa',
    detailing: 'Car detailing',
    trainer: 'Personal trainer',
    dental: 'Dental clinic',
    derma: 'Dermatologist',
    clinic: 'Physio / private practice',
    tattoo: 'Tattoo studio'
  },

  sec: {
    hero: { name: '3D hero', desc: 'Particles that follow the mouse or the phone’s tilt.' },
    slider: { name: 'Fullscreen slider', desc: 'Big photos with autoplay, swipe and parallax.' },
    services: { name: 'Service cards', desc: 'Cards that tilt in 3D, prices from the app.' },
    book: { name: 'Price book', desc: 'Your price list as a book with turning pages.' },
    prices: { name: 'Price list', desc: 'A simple, grouped list of prices.' },
    basket: { name: 'Visit planner', desc: 'Tick services, see total time and price.' },
    compare: { name: 'Before & after', desc: 'Drag the handle to compare two photos.' },
    stats: { name: 'Counters', desc: 'Clients, years and rating that count up.' },
    coverflow: { name: '3D gallery', desc: 'Photos in a coverflow carousel.' },
    filmstrip: { name: 'Filmstrip', desc: 'Big photo with a strip of thumbnails.' },
    insta: { name: 'Instagram grid', desc: 'Square photo grid with a full-screen view.' },
    team: { name: 'Team', desc: 'Flip cards with specialties and booking.' },
    products: { name: 'Products', desc: 'Products you sell, added by hand.' },
    gift: { name: 'Gift card', desc: 'A 3D card clients can design.' },
    loyalty: { name: 'Loyalty card', desc: 'Stamps that fill up as you scroll.' },
    reviews: { name: 'Reviews', desc: 'A carousel of client reviews.' },
    faq: { name: 'FAQ', desc: 'Answers to common questions.' },
    hours: { name: 'Hours', desc: 'Live “open now” and today’s timeline.' },
    map: { name: 'Map', desc: 'A styled map; Google Maps loads on tap.' },
    booking: { name: 'Booking form', desc: 'Service, date and time from your hours.' },
    contactbar: { name: 'Contact bar', desc: 'Call, WhatsApp and Book, always at hand.' }
  },

  nav: {
    services: 'Services',
    prices: 'Prices',
    gallery: 'Gallery',
    team: 'Team',
    shop: 'Shop',
    reviews: 'Reviews',
    contact: 'Contact',
    book: 'Book',
    label: 'Sections'
  },

  common: {
    book: 'Book online',
    bookNow: 'Book now',
    bookThis: 'Book {name}',
    bookWith: 'Book with {name}',
    onRequest: 'Price on request',
    sample: 'Sample',
    prev: 'Previous',
    next: 'Next',
    pause: 'Pause',
    play: 'Play',
    close: 'Close',
    loading: 'Loading the services…',
    failed: 'The price list could not be loaded right now.',
    failedLink: 'See the prices on the booking page',
    seeAll: 'See all {n} services',
    showLess: 'Show fewer',
    sampleNote: 'Sample content. On your page this is your own.',
    photoOf: 'Photo {n} of {total}',
    demoCall: 'Demo page: on your page this button calls you.',
    demoWhatsapp: 'Demo page: on your page this opens a WhatsApp chat with you.',
    demoReserve: 'Demo page: on your page this sends you a message to reserve “{name}”.',
    demoGift: 'Demo page: on your page this sends you the gift card request.',
    demoForm: 'Demo page: on your page this request reaches you in the Appointments app.',
    demoSocial: 'Demo page: on your page this opens your profile.'
  },

  hero: {
    primary: 'Book online',
    secondary: 'See prices',
    scroll: 'Scroll down',
    tilt: 'Turn on 3D tilt',
    tiltOn: '3D tilt is on'
  },

  slider: {
    eyebrow: 'In the studio',
    label: 'Photo slideshow',
    slide: 'Slide {n} of {total}'
  },

  services: {
    eyebrow: 'Services',
    title: 'What we do best',
    lead: 'Prices and times come live from the booking app, so they are always up to date.',
    more: 'See all prices'
  },

  book: {
    eyebrow: 'Price menu',
    title: 'Leaf through our menu',
    lead: 'Drag a page corner, tap the page edges or use the arrow keys.',
    coverTitle: 'Price menu',
    coverSub: 'Services & prices',
    introTitle: 'Welcome',
    introText: 'Every service, how long it takes and what it costs. Tap a line to book it.',
    contents: 'Contents',
    closingTitle: 'See you soon',
    closingText: 'Book online any time. You get a confirmation straight away.',
    hours: 'Opening hours',
    page: 'Page {n} of {total}',
    prevPage: 'Previous page',
    nextPage: 'Next page',
    soundOn: 'Turn page sound on',
    soundOff: 'Turn page sound off',
    label: 'Price menu book. Use the arrow keys to turn the pages.',
    fallback: 'The book could not open, so here is the simple list.',
    continued: '{group} (continued)'
  },

  prices: {
    eyebrow: 'Price list',
    title: 'Prices',
    lead: 'Clear prices and times, straight from the booking app.'
  },

  basket: {
    eyebrow: 'Plan your visit',
    title: 'Build your visit',
    lead: 'Tick what you would like. We add up the time and the price.',
    total: 'Total',
    time: 'Time',
    empty: 'Nothing picked yet.',
    picked: '{n} picked',
    bookMany: 'Book {n} services',
    bookOne: 'Book this service',
    partial: 'Some prices are on request; the total shows the known part.',
    clear: 'Clear'
  },

  compare: {
    eyebrow: 'Before & after',
    title: 'See the difference',
    before: 'Before',
    after: 'After',
    handle: 'Compare before and after',
    note: 'Sample photo, edited to show the effect. On your page: your own before and after photos.'
  },

  stats: {
    eyebrow: 'In numbers',
    title: 'Trusted by our clients',
    clients: 'happy clients',
    years: 'years of experience',
    rating: 'average rating'
  },

  coverflow: {
    eyebrow: 'Our work',
    title: 'A look at our work',
    label: '3D photo gallery'
  },

  filmstrip: {
    eyebrow: 'Gallery',
    title: 'Take the tour',
    thumbs: 'Choose a photo'
  },

  insta: {
    eyebrow: 'Instagram',
    title: '@yourbusiness',
    lead: 'Fresh from our feed.',
    follow: 'Follow us',
    open: 'Open photo: {alt}'
  },

  team: {
    eyebrow: 'The team',
    title: 'Meet the specialists',
    flip: 'Show specialties of {name}',
    flipBack: 'Show photo of {name}',
    specialties: 'Specialties'
  },

  products: {
    eyebrow: 'Shop',
    title: 'Take the care home',
    lead: 'Products we use and sell at the studio. Reserve one and pick it up at your next visit.',
    reserve: 'Reserve',
    reserveAria: 'Reserve {name}',
    note: 'Products are added to your page by hand; they do not come from the app.'
  },

  gift: {
    eyebrow: 'Gift card',
    title: 'Give an hour of care',
    lead: 'Pick an amount, write a name and a short message. We prepare the card for you.',
    amount: 'Amount',
    other: 'Other',
    otherAria: 'Other amount',
    to: 'For',
    from: 'From',
    message: 'Message',
    toPh: 'Their name',
    fromPh: 'Your name',
    msgPh: 'Happy birthday!',
    flip: 'Flip the card',
    cta: 'Ask for this gift card',
    card: 'Gift card',
    valid: 'Valid for 12 months'
  },

  loyalty: {
    eyebrow: 'Loyalty card',
    title: 'Every 6th visit is on us',
    lead: 'Each visit adds a stamp. When the card is full, your next service is free.',
    free: 'Free',
    progress: '{n} of {total} stamps',
    sample: 'Sample card with four stamps.'
  },

  reviews: {
    eyebrow: 'Reviews',
    title: 'What clients say',
    summary: '{rating} average from {count} reviews',
    sample: 'Sample review',
    goto: 'Show review {n}',
    label: 'Client reviews'
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Good to know',
    common: [
      ['How do I book?', 'Tap “Book online”, pick a service and a free time. You get a confirmation straight away.'],
      ['Can I cancel or move my appointment?', 'Yes, from the link in your confirmation, up to 24 hours before.'],
      ['How can I pay?', 'Cash or card at the studio. Gift cards are accepted too.'],
      ['Where can I park?', 'There is street parking right outside and a public car park two minutes away.']
    ]
  },

  hours: {
    eyebrow: 'Hours',
    title: 'When we are open',
    openNow: 'Open now',
    closedNow: 'Closed now',
    until: 'until {time}',
    closesIn: 'Closes in {time}',
    opensToday: 'Opens today at {time}',
    opensOn: 'Opens {day} at {time}',
    today: 'Today',
    now: 'Now',
    timeline: 'Today’s opening hours, with the current time marked',
    closedToday: 'Closed today',
    note: 'On your page, hours come live from the Appointments app.',
    noHours: 'See the available times on the booking page.',
    badgeOpen: 'Open now · until {time}',
    badgeClosed: 'Closed now · book online'
  },

  map: {
    eyebrow: 'Find us',
    title: 'Come see us',
    address: 'Strada Memorandumului 28, Cluj-Napoca',
    phone: '+40 700 000 000',
    email: 'hello@yourbusiness.com',
    load: 'Show the interactive map',
    loadNote: 'Google Maps loads only when you tap.',
    directions: 'Directions',
    frame: 'Map to {name}',
    sample: 'Sample address.'
  },

  booking: {
    eyebrow: 'Book',
    title: 'Request an appointment',
    lead: 'Pick a service and a time. Only the hours we are open are shown.',
    service: 'Service',
    date: 'Date',
    time: 'Time',
    name: 'Your name',
    phone: 'Phone',
    note: 'Note (optional)',
    submit: 'Send the request',
    closedDay: 'We are closed on this day. Please choose another date.',
    pickDate: 'Choose a date first',
    noSlots: 'No free times left on this day.',
    missing: 'Please fill in: {fields}.',
    choose: 'Choose…'
  },

  contactbar: {
    label: 'Quick contact',
    call: 'Call',
    whatsapp: 'WhatsApp',
    book: 'Book'
  },

  footer: {
    rights: '© {year} {name}',
    powered: 'Online booking by',
    sample: 'Sample details. On your page these are your real address, phone and links.',
    social: 'Social media'
  }
};
