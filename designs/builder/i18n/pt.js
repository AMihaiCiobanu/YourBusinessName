// Textos em português. As mesmas chaves que en.js; uma chave que falte aqui é lida de en.js.

export default {
  meta: {
    title: '{name} — Criador de páginas',
    desc: 'Crie a sua própria página de marcações: escolha as secções, a ordem, o tema e a cor.'
  },
  brandDefault: 'Nome do seu negócio',

  ui: {
    title: 'Crie a sua página',
    lead: 'Tudo o que muda aparece logo na página.',
    open: 'Personalizar',
    openAria: 'Abrir o criador de páginas',
    close: 'Fechar o criador de páginas',
    collapse: 'Ocultar painel',
    tabSections: 'Secções',
    tabStyle: 'Estilo',
    business: 'Tipo de negócio',
    name: 'Nome do negócio',
    namePh: 'Nome do seu negócio',
    theme: 'Tema',
    season: 'Tema da estação',
    seasonHint: 'Cores e decorações de festa na página, com uma mascote que faz um som ao tocar. Automático muda conforme a data de hoje.',
    seasonAuto: 'Automático pela data (agora: {name})',
    accent: 'Cor de destaque',
    customColor: 'Escolha qualquer cor',
    accentReset: 'Cor do tema',
    lang: 'Idioma da página',
    motion: 'Reduzir movimento',
    motionHint: 'Desliga o 3D e as animações.',
    phone: 'Pré-visualização no telemóvel',
    presets: 'Comece com uma página pronta',
    presetsHint: 'Um toque dá-lhe uma página completa para o seu tipo de negócio. Depois pode mudar tudo.',
    presetDone: 'Página pronta aplicada: {name}.',
    ownMix: 'Ou escolha as secções você mesmo',
    sectionsHint: 'Marque uma secção para a mostrar e escolha o tipo. Arraste a pega ou use as setas para mudar a ordem.',
    floating: 'Flutuantes',
    moveUp: 'Subir {name}',
    moveDown: 'Descer {name}',
    drag: 'Arraste para mover {name}. Com o teclado, use Alt + seta para cima ou para baixo.',
    show: 'Mostrar {name}',
    moved: '{name} movido para a posição {pos} de {total}.',
    added: '{name} adicionado à página.',
    removed: '{name} removido da página.',
    type: 'Tipo',
    typeChanged: '{name}: {type}.',
    removeCopy: 'Remover {name}',
    addCopy: 'Adicionar outra',
    count: '{on} de {total} secções na página',
    copy: 'Copiar link',
    copied: 'Link copiado. Quem o abrir vê esta página.',
    copyFailed: 'Não foi possível copiar. Selecione a barra de endereço e copie o link daí.',
    reset: 'Repor',
    resetDone: 'De volta à página predefinida.',
    send: 'Enviem-me esta página',
    sendHint: 'Abre o seu email com esta configuração já escrita.',
    badge: { '3d': '3D', live: 'Ao vivo', original: 'Original', new: 'Novo' },
    themeChanged: 'Tema: {name}.',
    jump: 'Ir para {name} na página',
    newTitle: 'Algo totalmente novo?',
    newText: 'Estas secções são um ponto de partida, não um menu fechado. Fale-nos do seu negócio e criamos um layout só para si.',
    newLink: 'Diga-nos o que tem em mente',
    included: 'Sempre incluído: serviços e horários ao vivo a partir da app, marcações online, feito para telemóvel, o seu próprio endereço web.'
  },

  skins: {
    luxe: { name: 'Luxo escuro', desc: 'Preto profundo, títulos serifados, detalhes dourados.' },
    clean: { name: 'Claro e limpo', desc: 'Branco arejado, sombras suaves, calmo.' },
    bold: { name: 'Ousado e colorido', desc: 'Cores vivas, contornos fortes, divertido.' }
  },

  // Seasonal themes (core/season.js, season/decor.js). bubbles: what the mascot says, | between lines.
  season: {
    sound: 'Som da mascote',
    none: { name: 'Nenhum' },
    halloween: { name: 'Halloween', greet: 'Feliz Halloween! Marque a sua visita para a época mais assustadora.', mascot: 'Espantalho de Halloween — toque para o ouvir', bubbles: 'Buu!|Hi hi hi!|Cuidado!' },
    blackfriday: { name: 'Black Friday', greet: 'Chegou a Black Friday: marque já e aproveite as ofertas da semana.', mascot: 'Saco de compras Black Friday — toque para o ouvir', bubbles: 'Tchim-tchim!|Ofertas!|Não perca!' },
    christmas: { name: 'Natal', greet: 'Feliz Natal! Mime-se, ou mime alguém especial.', mascot: 'Boneco de neve — toque para o ouvir', bubbles: 'Ho ho ho!|Sinos de Natal!|Feliz Natal!' },
    newyear: { name: 'Ano Novo', greet: 'Feliz Ano Novo {year}! Comece o ano no seu melhor.', mascot: 'Champanhe de Ano Novo — toque para o ouvir', bubbles: 'Saúde!|Feliz {year}!|Pop!' },
    valentine: { name: 'Dia dos Namorados', greet: 'Feliz Dia dos Namorados! Mime quem ama, ou mime-se a si.', mascot: 'Coração dos Namorados — toque para o ouvir', bubbles: 'Amo-te!|Beijinho!|Sê meu!' },
    spring: { name: 'Primavera', greet: 'Chegou a primavera! Flores frescas, visual fresco.', mascot: 'Túlipas da primavera — toque para as ouvir', bubbles: 'Piu piu!|Olá, primavera!|A florir!' },
    easter: { name: 'Páscoa', greet: 'Feliz Páscoa! Marque antes dos feriados.', mascot: 'Coelho da Páscoa — toque para o ouvir', bubbles: 'Feliz Páscoa!|Hop, hop!|Um ovo!' },
    summer: { name: 'Verão', greet: 'Olá, verão! Prepare-se para os dias de sol.', mascot: 'Sol de verão — toque para o ouvir', bubbles: 'Olá, verão!|Chape!|Que sol!' }
  },

  niches: {
    beauty: 'Salão de beleza e cabeleireiro',
    nails: 'Estúdio de unhas',
    barber: 'Barbearia',
    spa: 'Massagem e spa',
    detailing: 'Detalhe automóvel',
    trainer: 'Personal trainer',
    dental: 'Clínica dentária',
    derma: 'Dermatologista',
    clinic: 'Fisioterapia / consultório privado',
    tattoo: 'Estúdio de tatuagens'
  },

  sec: {
    hero: { name: 'Destaque 3D', desc: 'Partículas que seguem o rato ou a inclinação do telemóvel.' },
    slider: { name: 'Apresentação em ecrã inteiro', desc: 'Fotos grandes com reprodução automática, deslizar e paralaxe.' },
    services: { name: 'Cartões de serviços', desc: 'Cartões que inclinam em 3D, preços a partir da app.' },
    book: { name: 'Livro de preços', desc: 'A sua tabela de preços num livro com páginas que viram.' },
    prices: { name: 'Tabela de preços', desc: 'Uma tabela de preços simples, por grupos.' },
    basket: { name: 'Planeador de visita', desc: 'Marque serviços e veja o tempo e o preço total.' },
    compare: { name: 'Controlo deslizante', desc: 'Arraste a pega para comparar duas fotos.' },
    stats: { name: 'Contadores animados', desc: 'Clientes, anos e avaliação que vão subindo.' },
    coverflow: { name: 'Galeria 3D', desc: 'Fotos num carrossel coverflow.' },
    filmstrip: { name: 'Película', desc: 'Uma foto grande com uma faixa de miniaturas.' },
    insta: { name: 'Grelha do Instagram', desc: 'Grelha de fotos quadradas com vista em ecrã inteiro.' },
    team: { name: 'Cartões que viram', desc: 'Cartões que viram com especialidades e marcação.' },
    products: { name: 'Cartões de produtos', desc: 'Produtos que vende, adicionados à mão.' },
    gift: { name: 'Cartão-presente 3D', desc: 'Um cartão em 3D; os clientes ligam para saber mais.' },
    loyalty: { name: 'Cartão de carimbos', desc: 'Carimbos que se enchem ao deslizar a página.' },
    reviews: { name: 'Carrossel de opiniões', desc: 'Um carrossel de opiniões de clientes.' },
    reviewbook: { name: 'Livro de visitas', desc: 'Opiniões de clientes num livro com páginas que viram.' },
    faq: { name: 'Acordeão', desc: 'Respostas às perguntas frequentes.' },
    hours: { name: 'Horário ao vivo', desc: '«Aberto agora» ao vivo e o horário de hoje.' },
    map: { name: 'Mapa com detalhes', desc: 'Um mapa estilizado; o Google Maps carrega ao tocar.' },
    booking: { name: 'Formulário de marcação', desc: 'Serviço, data e hora conforme o seu horário.' },
    contactbar: { name: 'Barra inferior', desc: 'Ligar, WhatsApp e Marcar, sempre à mão.' },
    herosplit: { name: 'Texto e foto grande', desc: 'O título ao lado de uma foto grande. O primeiro ecrã mais leve.' },
    heroring: { name: 'Anel de fotos', desc: 'Fotos num anel 3D que roda ao deslocar ou ao arrastar.' },
    herocube: { name: 'Cubo de fotos', desc: 'Quatro fotos num cubo 3D; as setas ou um deslize fazem-no rodar.' },
    herofloat: { name: 'Cartões flutuantes', desc: 'Uma foto grande, com a nota e os clientes a flutuar em 3D.' },
    compareduo: { name: 'Lado a lado', desc: 'Fotos de antes e depois uma ao lado da outra.' },
    statsband: { name: 'Faixa de números', desc: 'Uma faixa colorida com os seus números.' },
    statsticker: { name: 'Faixa em movimento', desc: 'Os seus números deslizam da direita para a esquerda, sem parar.' },
    teamgrid: { name: 'Cartões de perfil', desc: 'Fotos redondas, especialidades e um botão de marcação.' },
    productlist: { name: 'Lista de produtos', desc: 'Uma lista compacta com fotos e preços.' },
    giftbanner: { name: 'Faixa de oferta', desc: 'Uma faixa larga com os valores mais escolhidos.' },
    loyaltyline: { name: 'Linha de progresso', desc: 'Visitas numa linha; a última é grátis.' },
    faqgrid: { name: 'Cartões de perguntas', desc: 'Todas as respostas visíveis, em grelha.' },
    hourscard: { name: 'Cartão de horário', desc: 'Aberto agora e a semana inteira num cartão.' },
    mapwide: { name: 'Mapa largo', desc: 'Um mapa em toda a largura com a morada por cima.' },
    contactfab: { name: 'Botões redondos', desc: 'Bolhas de WhatsApp e chamada no canto.' },
    masonry: { name: 'Grelha mosaico', desc: 'Fotos de formatos variados em colunas, estilo Pinterest.' },
    carousel: { name: 'Carrossel deslizante', desc: 'Uma fila de cartões de fotos que desliza para o lado.' }
  },

  grp: {
    hero: { name: 'Destaque' },
    compare: { name: 'Antes e depois' },
    stats: { name: 'Números' },
    team: { name: 'Equipa' },
    products: { name: 'Produtos' },
    gift: { name: 'Cartão-presente' },
    loyalty: { name: 'Cartão de fidelidade' },
    faq: { name: 'Perguntas frequentes' },
    hours: { name: 'Horário' },
    map: { name: 'Mapa' },
    contactbar: { name: 'Botões de contacto' },
    gallery: { name: 'Galeria de fotos', add: 'Adicionar outra galeria' },
    prices: { name: 'Preços', add: 'Adicionar outra' },
    reviews: { name: 'Opiniões' }
  },

  nav: {
    services: 'Serviços',
    prices: 'Preços',
    gallery: 'Galeria',
    team: 'Equipa',
    shop: 'Loja',
    reviews: 'Opiniões',
    contact: 'Contacto',
    book: 'Marcar',
    label: 'Secções'
  },

  common: {
    book: 'Marcar online',
    bookNow: 'Marcar agora',
    bookThis: 'Marcar {name}',
    bookWith: 'Marcar com {name}',
    onRequest: 'Preço sob consulta',
    sample: 'Exemplo',
    prev: 'Anterior',
    next: 'Seguinte',
    pause: 'Pausa',
    play: 'Reproduzir',
    close: 'Fechar',
    loading: 'A carregar os serviços…',
    failed: 'Neste momento não foi possível carregar a tabela de preços.',
    failedLink: 'Ver os preços na página de marcações',
    seeAll: 'Ver os {n} serviços',
    showLess: 'Mostrar menos',
    sampleNote: 'Conteúdo de exemplo. Na sua página, é o seu.',
    photoOf: 'Foto {n} de {total}',
    demoCall: 'Página de demonstração: na sua página, este botão liga-lhe.',
    demoWhatsapp: 'Página de demonstração: na sua página, este botão abre uma conversa de WhatsApp consigo.',
    demoReserve: 'Página de demonstração: na sua página, este botão envia-lhe uma mensagem para reservar «{name}».',
    demoForm: 'Página de demonstração: na sua página, este pedido chega-lhe na app Appointments.',
    demoSocial: 'Página de demonstração: na sua página, este botão abre o seu perfil.'
  },

  hero: {
    primary: 'Marcar online',
    secondary: 'Ver preços',
    scroll: 'Deslizar para baixo',
    tilt: 'Ligar inclinação 3D',
    tiltOn: 'A inclinação 3D está ligada'
  },

  slider: {
    eyebrow: 'No estúdio',
    label: 'Apresentação de fotos',
    slide: 'Diapositivo {n} de {total}'
  },

  services: {
    eyebrow: 'Serviços',
    title: 'O que fazemos melhor',
    lead: 'Preços e tempos chegam ao vivo da app de marcações, por isso estão sempre atualizados.',
    more: 'Ver todos os preços'
  },

  book: {
    eyebrow: 'Menu de preços',
    title: 'Folheie o nosso menu',
    lead: 'Arraste um canto da página, toque nas margens ou use as setas.',
    coverTitle: 'Menu de preços',
    coverSub: 'Serviços e preços',
    introTitle: 'Bem-vindo',
    introText: 'Cada serviço, quanto tempo demora e quanto custa. Toque numa linha para marcar.',
    contents: 'Índice',
    closingTitle: 'Até breve',
    closingText: 'Marque online a qualquer hora. Recebe a confirmação de imediato.',
    hours: 'Horário de funcionamento',
    page: 'Página {n} de {total}',
    prevPage: 'Página anterior',
    nextPage: 'Página seguinte',
    soundOn: 'Ligar o som das páginas',
    soundOff: 'Desligar o som das páginas',
    label: 'Livro de preços. Use as setas para virar as páginas.',
    fallback: 'Não foi possível abrir o livro, por isso aqui está a lista simples.',
    continued: '{group} (continuação)'
  },

  prices: {
    eyebrow: 'Tabela de preços',
    title: 'Preços',
    lead: 'Preços e tempos claros, diretamente da app de marcações.'
  },

  basket: {
    eyebrow: 'Planeie a sua visita',
    title: 'Monte a sua visita',
    lead: 'Marque o que gostaria. Nós somamos o tempo e o preço.',
    total: 'Total',
    time: 'Tempo',
    empty: 'Ainda nada escolhido.',
    picked: '{n} escolhidos',
    bookMany: 'Marcar {n} serviços',
    bookOne: 'Marcar este serviço',
    partial: 'Alguns preços são sob consulta; o total mostra a parte conhecida.',
    clear: 'Limpar'
  },

  compare: {
    eyebrow: 'Antes e depois',
    title: 'Veja a diferença',
    before: 'Antes',
    after: 'Depois',
    handle: 'Comparar antes e depois',
    note: 'Foto de exemplo, editada para mostrar o efeito. Na sua página: as suas próprias fotos de antes e depois.'
  },

  stats: {
    eyebrow: 'Em números',
    title: 'A confiança dos nossos clientes',
    clients: 'clientes satisfeitos',
    years: 'anos de experiência',
    rating: 'avaliação média'
  },

  coverflow: {
    eyebrow: 'O nosso trabalho',
    title: 'Um olhar sobre o nosso trabalho',
    label: 'Galeria de fotos 3D'
  },

  filmstrip: {
    eyebrow: 'Galeria',
    title: 'Faça a visita',
    thumbs: 'Escolha uma foto'
  },

  masonry: {
    eyebrow: 'Galeria',
    title: 'Momentos do estúdio',
    lead: 'Formatos variados, como um feed real. Toque numa foto para a ver em grande.'
  },

  carousel: {
    eyebrow: 'O nosso trabalho',
    title: 'Deslize pelo nosso trabalho',
    label: 'Carrossel de fotos. Deslize para o lado ou use os botões.'
  },

  insta: {
    eyebrow: 'Instagram',
    title: '@oseunegocio',
    lead: 'Acabado de sair do nosso feed.',
    follow: 'Siga-nos',
    open: 'Abrir foto: {alt}'
  },

  team: {
    eyebrow: 'A equipa',
    title: 'Conheça os especialistas',
    flip: 'Ver especialidades de {name}',
    flipBack: 'Ver foto de {name}',
    specialties: 'Especialidades'
  },

  products: {
    eyebrow: 'Loja',
    title: 'Leve o cuidado para casa',
    lead: 'Produtos que usamos e vendemos no estúdio. Reserve um e levante-o na próxima visita.',
    reserve: 'Reservar',
    reserveAria: 'Reservar {name}',
    note: 'Os produtos são adicionados à mão na sua página; não vêm da app.'
  },

  gift: {
    eyebrow: 'Cartão-presente',
    title: 'Ofereça uma hora de cuidado',
    lead: 'Ligue-nos e dizemos-lhe os valores e como é o cartão. Paga-o e levanta-o aqui.',
    msg: 'Feliz aniversário!',
    flip: 'Virar o cartão',
    cta: 'Ligue para mais detalhes',
    card: 'Cartão-presente',
    valid: 'Válido durante 12 meses'
  },

  giftbanner: {
    amounts: 'Valores mais escolhidos'
  },

  loyalty: {
    eyebrow: 'Cartão de fidelidade',
    title: 'Cada 6.ª visita é por nossa conta',
    lead: 'Cada visita junta um carimbo. Quando o cartão estiver cheio, o próximo serviço é grátis.',
    free: 'Grátis',
    progress: '{n} de {total} carimbos',
    sample: 'Cartão de exemplo com quatro carimbos.'
  },

  reviews: {
    eyebrow: 'Opiniões',
    title: 'O que dizem os clientes',
    summary: '{rating} de média em {count} opiniões',
    sample: 'Opinião de exemplo',
    goto: 'Mostrar a opinião {n}',
    label: 'Opiniões de clientes'
  },

  reviewbook: {
    eyebrow: 'Opiniões',
    title: 'O nosso livro de visitas',
    lead: 'Vire as páginas para ler o que os clientes escreveram sobre nós.',
    label: 'Livro de opiniões de clientes. Use as setas para virar as páginas.',
    coverTitle: 'Livro de visitas',
    coverSub: 'Opiniões de clientes',
    introTitle: 'Obrigado por cada palavra',
    closingTitle: 'A sua vez',
    closingText: 'Venha ver com os seus olhos e depois conte-nos como correu.'
  },

  faq: {
    eyebrow: 'Perguntas frequentes',
    title: 'É bom saber',
    common: [
      ['Como faço uma marcação?', 'Toque em «Marcar online», escolha um serviço e uma hora livre. Recebe a confirmação de imediato.'],
      ['Posso cancelar ou mudar a marcação?', 'Sim, a partir do link na confirmação, até 24 horas antes.'],
      ['Como posso pagar?', 'Em dinheiro ou com cartão no estúdio. Também aceitamos cartões-presente.'],
      ['Onde posso estacionar?', 'Há estacionamento na rua mesmo à porta e um parque público a dois minutos.']
    ]
  },

  hours: {
    eyebrow: 'Horário',
    title: 'Quando estamos abertos',
    openNow: 'Aberto agora',
    closedNow: 'Fechado agora',
    until: 'até às {time}',
    closesIn: 'Fecha dentro de {time}',
    opensToday: 'Abre hoje às {time}',
    opensOn: 'Abre na {day} às {time}',
    today: 'Hoje',
    now: 'Agora',
    timeline: 'Horário de hoje, com a hora atual marcada',
    closedToday: 'Fechado hoje',
    note: 'Na sua página, o horário chega ao vivo da app Appointments.',
    noHours: 'Veja as horas disponíveis na página de marcações.',
    badgeOpen: 'Aberto agora · até às {time}',
    badgeClosed: 'Fechado agora · marque online'
  },

  map: {
    eyebrow: 'Onde estamos',
    title: 'Venha visitar-nos',
    address: 'Strada Memorandumului 28, Cluj-Napoca',
    phone: '+40 700 000 000',
    email: 'ola@oseunegocio.pt',
    load: 'Mostrar o mapa interativo',
    loadNote: 'O Google Maps só carrega quando toca.',
    directions: 'Direções',
    frame: 'Mapa até {name}',
    sample: 'Morada de exemplo.'
  },

  booking: {
    eyebrow: 'Marcar',
    title: 'Peça uma marcação',
    lead: 'Escolha um serviço e uma hora. Só aparecem as horas em que estamos abertos.',
    service: 'Serviço',
    date: 'Data',
    time: 'Hora',
    name: 'O seu nome',
    phone: 'Telefone',
    note: 'Nota (opcional)',
    submit: 'Enviar o pedido',
    closedDay: 'Estamos fechados neste dia. Escolha outra data.',
    pickDate: 'Escolha primeiro uma data',
    noSlots: 'Já não há horas livres neste dia.',
    missing: 'Preencha: {fields}.',
    choose: 'Escolher…'
  },

  contactbar: {
    label: 'Contacto rápido',
    call: 'Ligar',
    whatsapp: 'WhatsApp',
    book: 'Marcar',
    online: 'Online'
  },

  footer: {
    rights: '© {year} {name}',
    powered: 'Marcações online por',
    sample: 'Dados de exemplo. Na sua página são a sua morada, telefone e links reais.',
    social: 'Redes sociais'
  }
};
