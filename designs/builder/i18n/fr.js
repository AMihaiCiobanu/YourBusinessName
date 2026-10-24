// Textes en français. Mêmes clés que en.js ; une clé absente ici est prise dans en.js.

export default {
  meta: {
    title: '{name} — Créateur de page',
    desc: 'Créez votre page de réservation : choisissez les sections, leur ordre, le thème et la couleur.'
  },
  brandDefault: 'Nom de votre entreprise',

  ui: {
    title: 'Créez votre page',
    lead: 'Tout ce que vous changez apparaît aussitôt sur la page.',
    open: 'Personnaliser',
    openAria: 'Ouvrir le créateur de page',
    close: 'Fermer le créateur de page',
    collapse: 'Masquer le panneau',
    tabSections: 'Sections',
    tabStyle: 'Style',
    business: 'Type d’activité',
    name: 'Nom de l’entreprise',
    namePh: 'Nom de votre entreprise',
    theme: 'Thème',
    season: 'Thème de saison',
    seasonHint: 'Couleurs et décorations de fête sur la page, avec une mascotte qui fait un son quand on la touche. Automatique change selon la date du jour.',
    seasonAuto: 'Automatique selon la date (maintenant : {name})',
    accent: 'Couleur d’accent',
    customColor: 'Choisir une couleur',
    accentReset: 'Couleur du thème',
    lang: 'Langue de la page',
    motion: 'Réduire les animations',
    motionHint: 'Désactive la 3D et les animations.',
    phone: 'Aperçu sur téléphone',
    presets: 'Partir d’une page prête',
    presetsHint: 'Un geste suffit pour une page complète adaptée à votre activité. Vous pouvez tout modifier ensuite.',
    presetDone: 'Page prête appliquée : {name}.',
    ownMix: 'Ou choisissez vous-même les sections',
    sectionsHint: 'Cochez une section pour l’afficher et choisissez son type. Faites glisser la poignée ou utilisez les flèches pour changer l’ordre.',
    floating: 'Flottants',
    moveUp: 'Monter {name}',
    moveDown: 'Descendre {name}',
    drag: 'Faites glisser pour déplacer {name}. Au clavier, utilisez Alt + flèche haut ou bas.',
    show: 'Afficher {name}',
    moved: '{name} déplacé en position {pos} sur {total}.',
    added: '{name} ajouté à la page.',
    removed: '{name} retiré de la page.',
    type: 'Type',
    typeChanged: '{name} : {type}.',
    removeCopy: 'Retirer {name}',
    addCopy: 'Ajouter une autre',
    count: '{on} sections sur {total} affichées',
    copy: 'Copier le lien',
    copied: 'Lien copié. Toute personne qui l’ouvre voit cette page.',
    copyFailed: 'Copie impossible. Sélectionnez la barre d’adresse et copiez le lien depuis là.',
    reset: 'Réinitialiser',
    resetDone: 'Retour à la page par défaut.',
    send: 'Envoyez-moi cette page',
    sendHint: 'Ouvre votre messagerie avec cette configuration déjà rédigée.',
    badge: { '3d': '3D', live: 'En direct', original: 'Original', new: 'Nouveau' },
    themeChanged: 'Thème : {name}.',
    jump: 'Aller à {name} sur la page',
    newTitle: 'Quelque chose de tout nouveau ?',
    newText: 'Ces sections sont un point de départ, pas un menu figé. Parlez-nous de votre activité et nous concevons une mise en page rien que pour vous.',
    newLink: 'Dites-nous ce que vous avez en tête',
    included: 'Toujours inclus : prestations et horaires en direct depuis l’application, réservation en ligne, pensé pour le téléphone, votre propre adresse web.'
  },

  skins: {
    luxe: { name: 'Luxe sombre', desc: 'Noir profond, titres à empattements, détails dorés.' },
    clean: { name: 'Clair et épuré', desc: 'Blanc aéré, ombres douces, calme.' },
    bold: { name: 'Audacieux et coloré', desc: 'Couleurs vives, bordures marquées, ludique.' }
  },

  // Seasonal themes (core/season.js, season/decor.js). bubbles: what the mascot says, | between lines.
  season: {
    sound: 'Son de la mascotte',
    none: { name: 'Aucun' },
    halloween: { name: 'Halloween', greet: 'Joyeux Halloween ! Réservez votre rendez-vous pour la saison qui fait peur.', mascot: 'Épouvantail d\'Halloween — touchez pour l\'entendre', bubbles: 'Bouh !|Hi hi hi !|Attention !' },
    blackfriday: { name: 'Black Friday', greet: 'C\'est le Black Friday : réservez maintenant et profitez des offres de la semaine.', mascot: 'Sac de shopping Black Friday — touchez pour l\'entendre', bubbles: 'Ka-tching !|Des offres !|À ne pas manquer !' },
    christmas: { name: 'Noël', greet: 'Joyeux Noël ! Faites-vous plaisir, ou faites plaisir à un proche.', mascot: 'Bonhomme de neige — touchez pour l\'entendre', bubbles: 'Ho ho ho !|Vive le vent !|Joyeux Noël !' },
    newyear: { name: 'Nouvel An', greet: 'Bonne année {year} ! Commencez l\'année au meilleur de vous-même.', mascot: 'Champagne du Nouvel An — touchez pour l\'entendre', bubbles: 'Santé !|Bonne année {year} !|Pop !' },
    valentine: { name: 'Saint-Valentin', greet: 'Joyeuse Saint-Valentin ! Gâtez l\'être aimé, ou gâtez-vous.', mascot: 'Cœur de la Saint-Valentin — touchez pour l\'entendre', bubbles: 'Je t\'aime !|Bisou !|Sois à moi !' },
    spring: { name: 'Printemps', greet: 'Le printemps est là ! Des fleurs fraîches, un look frais.', mascot: 'Tulipes de printemps — touchez pour les entendre', bubbles: 'Cui-cui !|Bonjour, printemps !|Ça fleurit !' },
    easter: { name: 'Pâques', greet: 'Joyeuses Pâques ! Réservez avant les fêtes.', mascot: 'Lapin de Pâques — touchez pour l\'entendre', bubbles: 'Joyeuses Pâques !|Hop hop !|Un œuf !' },
    summer: { name: 'Été', greet: 'Bonjour l\'été ! Préparez-vous pour les beaux jours.', mascot: 'Soleil d\'été — touchez pour l\'entendre', bubbles: 'Bonjour l\'été !|Plouf !|Quel soleil !' }
  },

  niches: {
    beauty: 'Salon de beauté et coiffure',
    nails: 'Onglerie',
    barber: 'Barbier',
    spa: 'Massage et spa',
    detailing: 'Esthétique automobile',
    trainer: 'Coach sportif',
    dental: 'Cabinet dentaire',
    derma: 'Dermatologue',
    clinic: 'Kiné / cabinet privé',
    tattoo: 'Salon de tatouage'
  },

  sec: {
    hero: { name: 'En-tête 3D', desc: 'Des particules qui suivent la souris ou l’inclinaison du téléphone.' },
    slider: { name: 'Diaporama plein écran', desc: 'Grandes photos en lecture auto, balayage et parallaxe.' },
    services: { name: 'Cartes de prestations', desc: 'Cartes qui pivotent en 3D, prix depuis l’application.' },
    book: { name: 'Livre des tarifs', desc: 'Vos tarifs dans un livre aux pages qui tournent.' },
    prices: { name: 'Liste des tarifs', desc: 'Une liste de prix simple, par groupes.' },
    basket: { name: 'Planificateur de visite', desc: 'Cochez des prestations, voyez la durée et le prix total.' },
    compare: { name: 'Curseur à glisser', desc: 'Faites glisser la poignée pour comparer deux photos.' },
    stats: { name: 'Compteurs animés', desc: 'Clients, années et note qui défilent.' },
    coverflow: { name: 'Galerie 3D', desc: 'Des photos dans un carrousel coverflow.' },
    filmstrip: { name: 'Pellicule', desc: 'Une grande photo avec une bande de vignettes.' },
    insta: { name: 'Grille Instagram', desc: 'Grille de photos carrées avec vue plein écran.' },
    team: { name: 'Cartes retournables', desc: 'Cartes qui se retournent avec spécialités et réservation.' },
    products: { name: 'Cartes produits', desc: 'Les produits que vous vendez, ajoutés à la main.' },
    gift: { name: 'Carte cadeau 3D', desc: 'Une carte en 3D ; les clients appellent pour les détails.' },
    loyalty: { name: 'Carte à tampons', desc: 'Des tampons qui se remplissent au défilement.' },
    reviews: { name: 'Carrousel d’avis', desc: 'Un carrousel d’avis clients.' },
    reviewbook: { name: 'Livre d’or', desc: 'Les avis clients dans un livre aux pages qui tournent.' },
    faq: { name: 'Accordéon', desc: 'Les réponses aux questions fréquentes.' },
    hours: { name: 'Horaires en direct', desc: '« Ouvert maintenant » en direct et la journée en cours.' },
    map: { name: 'Carte avec détails', desc: 'Une carte stylisée ; Google Maps se charge au toucher.' },
    booking: { name: 'Formulaire de réservation', desc: 'Prestation, date et heure selon vos horaires.' },
    contactbar: { name: 'Barre du bas', desc: 'Appel, WhatsApp et Réserver, toujours à portée.' },
    herosplit: { name: 'Texte et grande photo', desc: 'Le titre à côté d’une grande photo. Le premier écran le plus léger.' },
    heroring: { name: 'Anneau de photos', desc: 'Des photos sur un anneau 3D qui tourne au défilement ou au glisser.' },
    herocube: { name: 'Cube de photos', desc: 'Quatre photos sur un cube 3D ; les flèches ou un glissement le tournent.' },
    herofloat: { name: 'Cartes flottantes', desc: 'Une grande photo, avec la note et les clients qui flottent en 3D.' },
    compareduo: { name: 'Côte à côte', desc: 'Photos avant et après l’une à côté de l’autre.' },
    statsband: { name: 'Bandeau de chiffres', desc: 'Une bande colorée avec vos chiffres.' },
    statsticker: { name: 'Bandeau défilant', desc: 'Vos chiffres défilent de droite à gauche, sans arrêt.' },
    teamgrid: { name: 'Cartes de profil', desc: 'Photos rondes, spécialités et bouton de réservation.' },
    productlist: { name: 'Liste de produits', desc: 'Une liste compacte avec photos et prix.' },
    giftbanner: { name: 'Bannière cadeau', desc: 'Une large bannière avec les montants les plus choisis.' },
    loyaltyline: { name: 'Ligne de progression', desc: 'Les visites sur une ligne ; la dernière est offerte.' },
    faqgrid: { name: 'Cartes de questions', desc: 'Toutes les réponses visibles, en grille.' },
    hourscard: { name: 'Carte des horaires', desc: 'Ouvert maintenant et toute la semaine dans une carte.' },
    mapwide: { name: 'Carte large', desc: 'Une carte pleine largeur avec l’adresse par-dessus.' },
    contactfab: { name: 'Boutons ronds', desc: 'Bulles WhatsApp et appel dans le coin.' },
    contactdock: { name: 'Barre dock', desc: 'Appel, WhatsApp et Réserver dans une pilule ; Appel indique ouvert ou fermé.' },
    contactbookfirst: { name: 'Réserver d’abord', desc: 'Un grand bouton Réserver, avec Appel et WhatsApp ronds à côté.' },
    contactstatus: { name: 'Barre d’état', desc: 'Une barre collée en bas : Appel avec les horaires du jour, WhatsApp et Réserver.' },
    masonry: { name: 'Grille mosaïque', desc: 'Des photos de formats variés en colonnes, style Pinterest.' },
    carousel: { name: 'Carrousel à balayer', desc: 'Une rangée de cartes photo à faire défiler de côté.' }
  },

  grp: {
    hero: { name: 'En-tête' },
    compare: { name: 'Avant / après' },
    stats: { name: 'Chiffres' },
    team: { name: 'Équipe' },
    products: { name: 'Produits' },
    gift: { name: 'Carte cadeau' },
    loyalty: { name: 'Carte de fidélité' },
    faq: { name: 'FAQ' },
    hours: { name: 'Horaires' },
    map: { name: 'Carte' },
    contactbar: { name: 'Boutons de contact' },
    gallery: { name: 'Galerie photo', add: 'Ajouter une autre galerie' },
    prices: { name: 'Tarifs', add: 'Ajouter une autre' },
    reviews: { name: 'Avis' }
  },

  nav: {
    services: 'Prestations',
    prices: 'Tarifs',
    gallery: 'Galerie',
    team: 'Équipe',
    shop: 'Boutique',
    reviews: 'Avis',
    contact: 'Contact',
    book: 'Réserver',
    label: 'Sections'
  },

  common: {
    book: 'Réserver en ligne',
    bookNow: 'Réserver',
    bookThis: 'Réserver {name}',
    bookWith: 'Réserver avec {name}',
    onRequest: 'Prix sur demande',
    sample: 'Exemple',
    prev: 'Précédent',
    next: 'Suivant',
    pause: 'Pause',
    play: 'Lecture',
    close: 'Fermer',
    loading: 'Chargement des prestations…',
    failed: 'La liste des tarifs ne peut pas être chargée pour le moment.',
    failedLink: 'Voir les tarifs sur la page de réservation',
    seeAll: 'Voir les {n} prestations',
    showLess: 'Afficher moins',
    sampleNote: 'Contenu d’exemple. Sur votre page, c’est le vôtre.',
    photoOf: 'Photo {n} sur {total}',
    demoCall: 'Page de démo : sur votre page, ce bouton vous appelle.',
    demoWhatsapp: 'Page de démo : sur votre page, ce bouton ouvre une conversation WhatsApp avec vous.',
    demoReserve: 'Page de démo : sur votre page, ce bouton vous envoie un message pour réserver « {name} ».',
    demoForm: 'Page de démo : sur votre page, cette demande vous arrive dans l’application Appointments.',
    demoSocial: 'Page de démo : sur votre page, ce bouton ouvre votre profil.'
  },

  hero: {
    primary: 'Réserver en ligne',
    secondary: 'Voir les tarifs',
    scroll: 'Faire défiler',
    tilt: 'Activer l’inclinaison 3D',
    tiltOn: 'L’inclinaison 3D est activée'
  },

  slider: {
    eyebrow: 'Au studio',
    label: 'Diaporama photo',
    slide: 'Diapositive {n} sur {total}'
  },

  services: {
    eyebrow: 'Prestations',
    title: 'Ce que nous faisons de mieux',
    lead: 'Prix et durées arrivent en direct de l’application de réservation, toujours à jour.',
    more: 'Voir tous les tarifs'
  },

  book: {
    eyebrow: 'Carte des tarifs',
    title: 'Feuilletez notre carte',
    lead: 'Faites glisser un coin de page, touchez les bords ou utilisez les flèches.',
    coverTitle: 'Carte des tarifs',
    coverSub: 'Prestations et prix',
    introTitle: 'Bienvenue',
    introText: 'Chaque prestation, sa durée et son prix. Touchez une ligne pour la réserver.',
    contents: 'Sommaire',
    closingTitle: 'À bientôt',
    closingText: 'Réservez en ligne à tout moment. Vous recevez une confirmation immédiate.',
    hours: 'Horaires d’ouverture',
    page: 'Page {n} sur {total}',
    prevPage: 'Page précédente',
    nextPage: 'Page suivante',
    soundOn: 'Activer le son des pages',
    soundOff: 'Couper le son des pages',
    label: 'Livre des tarifs. Utilisez les flèches pour tourner les pages.',
    fallback: 'Le livre n’a pas pu s’ouvrir, voici la liste simple.',
    continued: '{group} (suite)'
  },

  prices: {
    eyebrow: 'Tarifs',
    title: 'Tarifs',
    lead: 'Des prix et des durées clairs, tout droit de l’application de réservation.'
  },

  basket: {
    eyebrow: 'Préparez votre visite',
    title: 'Composez votre visite',
    lead: 'Cochez ce qui vous fait envie. Nous additionnons la durée et le prix.',
    total: 'Total',
    time: 'Durée',
    empty: 'Rien de choisi pour l’instant.',
    picked: '{n} choisi(s)',
    bookMany: 'Réserver {n} prestations',
    bookOne: 'Réserver cette prestation',
    partial: 'Certains prix sont sur demande ; le total montre la partie connue.',
    clear: 'Effacer'
  },

  compare: {
    eyebrow: 'Avant / après',
    title: 'Voyez la différence',
    before: 'Avant',
    after: 'Après',
    handle: 'Comparer avant et après',
    note: 'Photo d’exemple, retouchée pour montrer l’effet. Sur votre page : vos propres photos avant et après.'
  },

  stats: {
    eyebrow: 'En chiffres',
    title: 'La confiance de nos clients',
    clients: 'clients satisfaits',
    years: 'ans d’expérience',
    rating: 'note moyenne'
  },

  coverflow: {
    eyebrow: 'Nos réalisations',
    title: 'Un aperçu de notre travail',
    label: 'Galerie photo 3D'
  },

  filmstrip: {
    eyebrow: 'Galerie',
    title: 'Faites le tour',
    thumbs: 'Choisir une photo'
  },

  masonry: {
    eyebrow: 'Galerie',
    title: 'Moments au studio',
    lead: 'Des formats variés, comme un vrai fil. Touchez une photo pour l’agrandir.'
  },

  carousel: {
    eyebrow: 'Nos réalisations',
    title: 'Faites défiler nos réalisations',
    label: 'Carrousel photo. Faites défiler de côté ou utilisez les boutons.'
  },

  insta: {
    eyebrow: 'Instagram',
    title: '@votreentreprise',
    lead: 'Tout frais de notre fil.',
    follow: 'Suivez-nous',
    open: 'Ouvrir la photo : {alt}'
  },

  team: {
    eyebrow: 'L’équipe',
    title: 'Rencontrez nos spécialistes',
    flip: 'Voir les spécialités de {name}',
    flipBack: 'Voir la photo de {name}',
    specialties: 'Spécialités'
  },

  products: {
    eyebrow: 'Boutique',
    title: 'Prolongez le soin chez vous',
    lead: 'Les produits que nous utilisons et vendons au studio. Réservez-en un et récupérez-le lors de votre prochaine visite.',
    reserve: 'Réserver',
    reserveAria: 'Réserver {name}',
    note: 'Les produits sont ajoutés à la main sur votre page ; ils ne viennent pas de l’application.'
  },

  gift: {
    eyebrow: 'Carte cadeau',
    title: 'Offrez une heure de soin',
    lead: 'Appelez-nous et nous vous indiquons les montants et l’aspect de la carte. Vous la payez et la récupérez ici.',
    msg: 'Joyeux anniversaire !',
    flip: 'Retourner la carte',
    cta: 'Appeler pour plus de détails',
    card: 'Carte cadeau',
    valid: 'Valable 12 mois'
  },

  giftbanner: {
    amounts: 'Montants les plus choisis'
  },

  loyalty: {
    eyebrow: 'Carte de fidélité',
    title: 'Chaque 6e visite est offerte',
    lead: 'Chaque visite ajoute un tampon. Quand la carte est pleine, votre prochaine prestation est gratuite.',
    free: 'Offert',
    progress: '{n} tampons sur {total}',
    sample: 'Carte d’exemple avec quatre tampons.'
  },

  reviews: {
    eyebrow: 'Avis',
    title: 'Ce que disent nos clients',
    summary: '{rating} de moyenne sur {count} avis',
    sample: 'Avis d’exemple',
    goto: 'Afficher l’avis {n}',
    label: 'Avis clients'
  },

  reviewbook: {
    eyebrow: 'Avis',
    title: 'Notre livre d’or',
    lead: 'Tournez les pages pour lire ce que nos clients ont écrit sur nous.',
    label: 'Livre d’avis clients. Utilisez les flèches pour tourner les pages.',
    coverTitle: 'Livre d’or',
    coverSub: 'Avis clients',
    introTitle: 'Merci pour chaque mot',
    closingTitle: 'À vous',
    closingText: 'Venez voir par vous-même, puis dites-nous comment ça s’est passé.'
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Bon à savoir',
    common: [
      ['Comment réserver ?', 'Touchez « Réserver en ligne », choisissez une prestation et un créneau libre. Vous recevez une confirmation immédiate.'],
      ['Puis-je annuler ou déplacer mon rendez-vous ?', 'Oui, depuis le lien de votre confirmation, jusqu’à 24 heures avant.'],
      ['Comment puis-je payer ?', 'En espèces ou par carte au studio. Les cartes cadeaux sont aussi acceptées.'],
      ['Où me garer ?', 'Il y a du stationnement dans la rue juste devant et un parking public à deux minutes.']
    ]
  },

  hours: {
    eyebrow: 'Horaires',
    title: 'Quand nous sommes ouverts',
    openNow: 'Ouvert maintenant',
    closedNow: 'Fermé maintenant',
    until: 'jusqu’à {time}',
    closesIn: 'Ferme dans {time}',
    opensToday: 'Ouvre aujourd’hui à {time}',
    opensOn: 'Ouvre {day} à {time}',
    today: 'Aujourd’hui',
    now: 'Maintenant',
    timeline: 'Horaires d’aujourd’hui, avec l’heure actuelle indiquée',
    closedToday: 'Fermé aujourd’hui',
    note: 'Sur votre page, les horaires arrivent en direct de l’application Appointments.',
    noHours: 'Voir les créneaux disponibles sur la page de réservation.',
    badgeOpen: 'Ouvert maintenant · jusqu’à {time}',
    badgeClosed: 'Fermé maintenant · réservez en ligne'
  },

  map: {
    eyebrow: 'Nous trouver',
    title: 'Venez nous voir',
    address: 'Strada Memorandumului 28, Cluj-Napoca',
    phone: '+40 700 000 000',
    email: 'bonjour@votreentreprise.fr',
    load: 'Afficher la carte interactive',
    loadNote: 'Google Maps ne se charge que lorsque vous touchez.',
    directions: 'Itinéraire',
    frame: 'Carte vers {name}',
    sample: 'Adresse d’exemple.'
  },

  booking: {
    eyebrow: 'Réserver',
    title: 'Demander un rendez-vous',
    lead: 'Choisissez une prestation et un horaire. Seules nos heures d’ouverture sont proposées.',
    service: 'Prestation',
    date: 'Date',
    time: 'Heure',
    name: 'Votre nom',
    phone: 'Téléphone',
    note: 'Remarque (facultatif)',
    submit: 'Envoyer la demande',
    closedDay: 'Nous sommes fermés ce jour-là. Choisissez une autre date.',
    pickDate: 'Choisissez d’abord une date',
    noSlots: 'Plus de créneau libre ce jour-là.',
    missing: 'Veuillez remplir : {fields}.',
    choose: 'Choisir…'
  },

  contactbar: {
    label: 'Contact rapide',
    call: 'Appeler',
    whatsapp: 'WhatsApp',
    book: 'Réserver',
    online: 'En ligne'
  },

  footer: {
    rights: '© {year} {name}',
    powered: 'Réservation en ligne par',
    sample: 'Coordonnées d’exemple. Sur votre page, ce sont votre vraie adresse, votre téléphone et vos liens.',
    social: 'Réseaux sociaux'
  }
};
