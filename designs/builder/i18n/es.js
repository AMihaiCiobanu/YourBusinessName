// Textos en español. Las mismas claves que en.js; una clave que falte aquí se toma de en.js.

export default {
  meta: {
    title: '{name} — Creador de páginas',
    desc: 'Crea tu propia página de reservas: elige las secciones, su orden, el tema y el color.'
  },
  brandDefault: 'Nombre de tu negocio',

  ui: {
    title: 'Crea tu página',
    lead: 'Todo lo que cambias aparece en la página al instante.',
    open: 'Personalizar',
    openAria: 'Abrir el creador de páginas',
    close: 'Cerrar el creador de páginas',
    collapse: 'Ocultar panel',
    tabSections: 'Secciones',
    tabStyle: 'Estilo',
    business: 'Tipo de negocio',
    name: 'Nombre del negocio',
    namePh: 'Nombre de tu negocio',
    theme: 'Tema',
    accent: 'Color de acento',
    customColor: 'Elige cualquier color',
    accentReset: 'Color del tema',
    lang: 'Idioma de la página',
    motion: 'Reducir movimiento',
    motionHint: 'Desactiva el 3D y las animaciones.',
    phone: 'Vista de móvil',
    presets: 'Empieza con una página lista',
    presetsHint: 'Con un toque tienes una página completa para tu tipo de negocio. Después puedes cambiar lo que quieras.',
    presetDone: 'Página lista aplicada: {name}.',
    ownMix: 'O elige tú las secciones',
    sectionsHint: 'Marca una sección para mostrarla y elige su tipo. Arrastra el asa o usa las flechas para cambiar el orden.',
    floating: 'Flotantes',
    moveUp: 'Subir {name}',
    moveDown: 'Bajar {name}',
    drag: 'Arrastra para mover {name}. Con el teclado, usa Alt + flecha arriba o abajo.',
    show: 'Mostrar {name}',
    moved: '{name} movido a la posición {pos} de {total}.',
    added: '{name} añadido a la página.',
    removed: '{name} quitado de la página.',
    type: 'Tipo',
    typeChanged: '{name}: {type}.',
    removeCopy: 'Quitar {name}',
    addCopy: 'Añadir otra',
    count: '{on} de {total} secciones en la página',
    copy: 'Copiar enlace',
    copied: 'Enlace copiado. Quien lo abra verá esta página.',
    copyFailed: 'No se pudo copiar. Selecciona la barra de direcciones y copia el enlace desde ahí.',
    reset: 'Restablecer',
    resetDone: 'De vuelta a la página por defecto.',
    send: 'Envíame esta página',
    sendHint: 'Abre tu correo con esta configuración ya escrita.',
    badge: { '3d': '3D', live: 'En vivo', original: 'Original', new: 'Nuevo' },
    themeChanged: 'Tema: {name}.',
    jump: 'Ir a {name} en la página',
    newTitle: '¿Algo totalmente nuevo?',
    newText: 'Estas secciones son un punto de partida, no un menú cerrado. Cuéntanos sobre tu negocio y diseñamos un diseño solo para ti.',
    newLink: 'Cuéntanos qué tienes en mente',
    included: 'Siempre incluido: servicios y horarios en vivo desde la app, reservas online, pensado para móviles, tu propia dirección web.'
  },

  skins: {
    luxe: { name: 'Lujo oscuro', desc: 'Negro profundo, títulos con serifa, detalles dorados.' },
    clean: { name: 'Claro y limpio', desc: 'Blanco luminoso, sombras suaves, calma.' },
    bold: { name: 'Atrevido y colorido', desc: 'Colores vivos, bordes marcados, divertido.' }
  },

  niches: {
    beauty: 'Salón de belleza y peluquería',
    nails: 'Estudio de uñas',
    barber: 'Barbería',
    spa: 'Masajes y spa',
    detailing: 'Detailing de coches',
    trainer: 'Entrenador personal',
    dental: 'Clínica dental',
    derma: 'Dermatólogo',
    clinic: 'Fisioterapia / consulta privada',
    tattoo: 'Estudio de tatuajes'
  },

  sec: {
    hero: { name: 'Portada 3D', desc: 'Partículas que siguen el ratón o la inclinación del móvil.' },
    slider: { name: 'Presentación a pantalla completa', desc: 'Fotos grandes con reproducción automática, deslizamiento y paralaje.' },
    services: { name: 'Tarjetas de servicios', desc: 'Tarjetas que giran en 3D, precios desde la app.' },
    book: { name: 'Libro de precios', desc: 'Tu lista de precios en un libro con páginas que pasan.' },
    prices: { name: 'Lista de precios', desc: 'Una lista de precios sencilla y agrupada.' },
    basket: { name: 'Planificador de visita', desc: 'Marca servicios y ve el tiempo y el precio total.' },
    compare: { name: 'Control deslizante', desc: 'Arrastra el asa para comparar dos fotos.' },
    stats: { name: 'Contadores animados', desc: 'Clientes, años y valoración que suben.' },
    coverflow: { name: 'Galería 3D', desc: 'Fotos en un carrusel coverflow.' },
    filmstrip: { name: 'Tira de fotos', desc: 'Una foto grande con una tira de miniaturas.' },
    insta: { name: 'Cuadrícula de Instagram', desc: 'Cuadrícula de fotos cuadradas con vista a pantalla completa.' },
    team: { name: 'Tarjetas giratorias', desc: 'Tarjetas que se voltean con especialidades y reserva.' },
    products: { name: 'Tarjetas de productos', desc: 'Productos que vendes, añadidos a mano.' },
    gift: { name: 'Tarjeta regalo 3D', desc: 'Una tarjeta en 3D; los clientes llaman para más detalles.' },
    loyalty: { name: 'Tarjeta de sellos', desc: 'Sellos que se llenan al desplazarte.' },
    reviews: { name: 'Carrusel de opiniones', desc: 'Un carrusel de opiniones de clientes.' },
    reviewbook: { name: 'Libro de visitas', desc: 'Opiniones de clientes en un libro con páginas que pasan.' },
    faq: { name: 'Acordeón', desc: 'Respuestas a las preguntas frecuentes.' },
    hours: { name: 'Horario en vivo', desc: '«Abierto ahora» en vivo y el horario de hoy.' },
    map: { name: 'Mapa con detalles', desc: 'Un mapa con estilo; Google Maps se carga al tocar.' },
    booking: { name: 'Formulario de reserva', desc: 'Servicio, fecha y hora según tu horario.' },
    contactbar: { name: 'Barra inferior', desc: 'Llamar, WhatsApp y Reservar, siempre a mano.' },
    herosplit: { name: 'Texto y foto grande', desc: 'El titular junto a una foto grande. La primera pantalla más ligera.' },
    heroring: { name: 'Anillo de fotos', desc: 'Fotos en un anillo 3D que gira al desplazarte o al arrastrarlo.' },
    herocube: { name: 'Cubo de fotos', desc: 'Cuatro fotos en un cubo 3D; las flechas o un deslizamiento lo giran.' },
    herofloat: { name: 'Tarjetas flotantes', desc: 'Una foto grande, con la nota y los clientes flotando en 3D.' },
    compareduo: { name: 'Lado a lado', desc: 'Fotos de antes y después una junto a otra.' },
    statsband: { name: 'Franja de cifras', desc: 'Una franja de color con tus cifras.' },
    statsticker: { name: 'Franja en movimiento', desc: 'Tus cifras se deslizan de derecha a izquierda sin parar.' },
    teamgrid: { name: 'Tarjetas de perfil', desc: 'Fotos redondas, especialidades y un botón de reserva.' },
    productlist: { name: 'Lista de productos', desc: 'Una lista compacta con fotos y precios.' },
    giftbanner: { name: 'Banner de regalo', desc: 'Un banner ancho con los importes más elegidos.' },
    loyaltyline: { name: 'Línea de progreso', desc: 'Visitas en una línea; la última es gratis.' },
    faqgrid: { name: 'Tarjetas de preguntas', desc: 'Todas las respuestas visibles, en cuadrícula.' },
    hourscard: { name: 'Tarjeta de horario', desc: 'Abierto ahora y toda la semana en una tarjeta.' },
    mapwide: { name: 'Mapa ancho', desc: 'Un mapa a todo el ancho con la dirección encima.' },
    contactfab: { name: 'Botones redondos', desc: 'Burbujas de WhatsApp y llamada en la esquina.' },
    masonry: { name: 'Cuadrícula mosaico', desc: 'Fotos de formas variadas en columnas, estilo Pinterest.' },
    carousel: { name: 'Carrusel deslizable', desc: 'Una fila de tarjetas de fotos que se deslizan de lado.' }
  },

  grp: {
    hero: { name: 'Portada' },
    compare: { name: 'Antes y después' },
    stats: { name: 'Cifras' },
    team: { name: 'Equipo' },
    products: { name: 'Productos' },
    gift: { name: 'Tarjeta regalo' },
    loyalty: { name: 'Tarjeta de fidelidad' },
    faq: { name: 'Preguntas frecuentes' },
    hours: { name: 'Horario' },
    map: { name: 'Mapa' },
    contactbar: { name: 'Botones de contacto' },
    gallery: { name: 'Galería de fotos', add: 'Añadir otra galería' },
    prices: { name: 'Precios', add: 'Añadir otra' },
    reviews: { name: 'Opiniones' }
  },

  nav: {
    services: 'Servicios',
    prices: 'Precios',
    gallery: 'Galería',
    team: 'Equipo',
    shop: 'Tienda',
    reviews: 'Opiniones',
    contact: 'Contacto',
    book: 'Reservar',
    label: 'Secciones'
  },

  common: {
    book: 'Reservar online',
    bookNow: 'Reservar ahora',
    bookThis: 'Reservar {name}',
    bookWith: 'Reservar con {name}',
    onRequest: 'Precio a consultar',
    sample: 'Ejemplo',
    prev: 'Anterior',
    next: 'Siguiente',
    pause: 'Pausa',
    play: 'Reproducir',
    close: 'Cerrar',
    loading: 'Cargando los servicios…',
    failed: 'Ahora mismo no se pudo cargar la lista de precios.',
    failedLink: 'Ver los precios en la página de reservas',
    seeAll: 'Ver los {n} servicios',
    showLess: 'Mostrar menos',
    sampleNote: 'Contenido de ejemplo. En tu página, es el tuyo.',
    photoOf: 'Foto {n} de {total}',
    demoCall: 'Página de demostración: en tu página, este botón te llama.',
    demoWhatsapp: 'Página de demostración: en tu página, este botón abre un chat de WhatsApp contigo.',
    demoReserve: 'Página de demostración: en tu página, este botón te envía un mensaje para reservar «{name}».',
    demoForm: 'Página de demostración: en tu página, esta solicitud te llega en la app Appointments.',
    demoSocial: 'Página de demostración: en tu página, este botón abre tu perfil.'
  },

  hero: {
    primary: 'Reservar online',
    secondary: 'Ver precios',
    scroll: 'Desplázate hacia abajo',
    tilt: 'Activar inclinación 3D',
    tiltOn: 'La inclinación 3D está activada'
  },

  slider: {
    eyebrow: 'En el estudio',
    label: 'Presentación de fotos',
    slide: 'Diapositiva {n} de {total}'
  },

  services: {
    eyebrow: 'Servicios',
    title: 'Lo que mejor hacemos',
    lead: 'Precios y tiempos llegan en vivo desde la app de reservas, siempre al día.',
    more: 'Ver todos los precios'
  },

  book: {
    eyebrow: 'Carta de precios',
    title: 'Hojea nuestra carta',
    lead: 'Arrastra una esquina, toca los bordes de la página o usa las flechas.',
    coverTitle: 'Carta de precios',
    coverSub: 'Servicios y precios',
    introTitle: 'Bienvenido',
    introText: 'Cada servicio, cuánto dura y cuánto cuesta. Toca una línea para reservarlo.',
    contents: 'Índice',
    closingTitle: 'Hasta pronto',
    closingText: 'Reserva online cuando quieras. Recibes la confirmación al momento.',
    hours: 'Horario de apertura',
    page: 'Página {n} de {total}',
    prevPage: 'Página anterior',
    nextPage: 'Página siguiente',
    soundOn: 'Activar el sonido de las páginas',
    soundOff: 'Desactivar el sonido de las páginas',
    label: 'Libro de precios. Usa las flechas para pasar las páginas.',
    fallback: 'El libro no se pudo abrir, así que aquí tienes la lista simple.',
    continued: '{group} (continuación)'
  },

  prices: {
    eyebrow: 'Lista de precios',
    title: 'Precios',
    lead: 'Precios y tiempos claros, directamente desde la app de reservas.'
  },

  basket: {
    eyebrow: 'Planifica tu visita',
    title: 'Arma tu visita',
    lead: 'Marca lo que te apetezca. Sumamos el tiempo y el precio.',
    total: 'Total',
    time: 'Tiempo',
    empty: 'Aún no has elegido nada.',
    picked: '{n} elegidos',
    bookMany: 'Reservar {n} servicios',
    bookOne: 'Reservar este servicio',
    partial: 'Algunos precios son a consultar; el total muestra la parte conocida.',
    clear: 'Borrar'
  },

  compare: {
    eyebrow: 'Antes y después',
    title: 'Mira la diferencia',
    before: 'Antes',
    after: 'Después',
    handle: 'Comparar antes y después',
    note: 'Foto de ejemplo, editada para mostrar el efecto. En tu página: tus propias fotos de antes y después.'
  },

  stats: {
    eyebrow: 'En cifras',
    title: 'La confianza de nuestros clientes',
    clients: 'clientes satisfechos',
    years: 'años de experiencia',
    rating: 'valoración media'
  },

  coverflow: {
    eyebrow: 'Nuestro trabajo',
    title: 'Un vistazo a nuestro trabajo',
    label: 'Galería de fotos 3D'
  },

  filmstrip: {
    eyebrow: 'Galería',
    title: 'Haz el recorrido',
    thumbs: 'Elige una foto'
  },

  masonry: {
    eyebrow: 'Galería',
    title: 'Momentos del estudio',
    lead: 'Formas variadas, como un feed real. Toca una foto para verla en grande.'
  },

  carousel: {
    eyebrow: 'Nuestro trabajo',
    title: 'Desliza por nuestro trabajo',
    label: 'Carrusel de fotos. Desplázate de lado o usa los botones.'
  },

  insta: {
    eyebrow: 'Instagram',
    title: '@tunegocio',
    lead: 'Recién salido de nuestro feed.',
    follow: 'Síguenos',
    open: 'Abrir foto: {alt}'
  },

  team: {
    eyebrow: 'El equipo',
    title: 'Conoce a los especialistas',
    flip: 'Ver especialidades de {name}',
    flipBack: 'Ver foto de {name}',
    specialties: 'Especialidades'
  },

  products: {
    eyebrow: 'Tienda',
    title: 'Llévate el cuidado a casa',
    lead: 'Productos que usamos y vendemos en el estudio. Resérvalo y recógelo en tu próxima visita.',
    reserve: 'Reservar',
    reserveAria: 'Reservar {name}',
    note: 'Los productos se añaden a mano en tu página; no vienen de la app.'
  },

  gift: {
    eyebrow: 'Tarjeta regalo',
    title: 'Regala una hora de cuidado',
    lead: 'Llámanos y te contamos los importes y cómo es la tarjeta. La pagas y la recoges aquí.',
    msg: '¡Feliz cumpleaños!',
    flip: 'Girar la tarjeta',
    cta: 'Llama para más detalles',
    card: 'Tarjeta regalo',
    valid: 'Válida 12 meses'
  },

  giftbanner: {
    amounts: 'Importes más elegidos'
  },

  loyalty: {
    eyebrow: 'Tarjeta de fidelidad',
    title: 'Cada 6.ª visita va por nuestra cuenta',
    lead: 'Cada visita suma un sello. Cuando la tarjeta está llena, tu próximo servicio es gratis.',
    free: 'Gratis',
    progress: '{n} de {total} sellos',
    sample: 'Tarjeta de ejemplo con cuatro sellos.'
  },

  reviews: {
    eyebrow: 'Opiniones',
    title: 'Lo que dicen los clientes',
    summary: '{rating} de media en {count} opiniones',
    sample: 'Opinión de ejemplo',
    goto: 'Mostrar la opinión {n}',
    label: 'Opiniones de clientes'
  },

  reviewbook: {
    eyebrow: 'Opiniones',
    title: 'Nuestro libro de visitas',
    lead: 'Pasa las páginas para leer lo que los clientes escribieron sobre nosotros.',
    label: 'Libro de opiniones de clientes. Usa las flechas para pasar las páginas.',
    coverTitle: 'Libro de visitas',
    coverSub: 'Opiniones de clientes',
    introTitle: 'Gracias por cada palabra',
    closingTitle: 'Te toca',
    closingText: 'Ven a verlo por ti mismo y luego cuéntanos qué tal.'
  },

  faq: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Bueno saberlo',
    common: [
      ['¿Cómo reservo?', 'Toca «Reservar online», elige un servicio y una hora libre. Recibes la confirmación al momento.'],
      ['¿Puedo cancelar o cambiar mi cita?', 'Sí, desde el enlace de tu confirmación, hasta 24 horas antes.'],
      ['¿Cómo puedo pagar?', 'En efectivo o con tarjeta en el estudio. También aceptamos tarjetas regalo.'],
      ['¿Dónde puedo aparcar?', 'Hay aparcamiento en la calle justo delante y un parking público a dos minutos.']
    ]
  },

  hours: {
    eyebrow: 'Horario',
    title: 'Cuándo abrimos',
    openNow: 'Abierto ahora',
    closedNow: 'Cerrado ahora',
    until: 'hasta las {time}',
    closesIn: 'Cierra en {time}',
    opensToday: 'Abre hoy a las {time}',
    opensOn: 'Abre el {day} a las {time}',
    today: 'Hoy',
    now: 'Ahora',
    timeline: 'Horario de hoy, con la hora actual marcada',
    closedToday: 'Cerrado hoy',
    note: 'En tu página, el horario llega en vivo desde la app Appointments.',
    noHours: 'Consulta las horas disponibles en la página de reservas.',
    badgeOpen: 'Abierto ahora · hasta las {time}',
    badgeClosed: 'Cerrado ahora · reserva online'
  },

  map: {
    eyebrow: 'Encuéntranos',
    title: 'Ven a vernos',
    address: 'Strada Memorandumului 28, Cluj-Napoca',
    phone: '+40 700 000 000',
    email: 'hola@tunegocio.es',
    load: 'Mostrar el mapa interactivo',
    loadNote: 'Google Maps solo se carga al tocar.',
    directions: 'Cómo llegar',
    frame: 'Mapa hasta {name}',
    sample: 'Dirección de ejemplo.'
  },

  booking: {
    eyebrow: 'Reservar',
    title: 'Solicita una cita',
    lead: 'Elige un servicio y una hora. Solo se muestran las horas en que abrimos.',
    service: 'Servicio',
    date: 'Fecha',
    time: 'Hora',
    name: 'Tu nombre',
    phone: 'Teléfono',
    note: 'Nota (opcional)',
    submit: 'Enviar la solicitud',
    closedDay: 'Ese día estamos cerrados. Elige otra fecha.',
    pickDate: 'Elige primero una fecha',
    noSlots: 'No quedan horas libres ese día.',
    missing: 'Rellena: {fields}.',
    choose: 'Elegir…'
  },

  contactbar: {
    label: 'Contacto rápido',
    call: 'Llamar',
    whatsapp: 'WhatsApp',
    book: 'Reservar',
    online: 'Online'
  },

  footer: {
    rights: '© {year} {name}',
    powered: 'Reservas online con',
    sample: 'Datos de ejemplo. En tu página son tu dirección, teléfono y enlaces reales.',
    social: 'Redes sociales'
  }
};
