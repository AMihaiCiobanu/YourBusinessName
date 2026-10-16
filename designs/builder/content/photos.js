// Placeholder photos, all from Unsplash under the Unsplash License (free to use, no permission
// needed). Credited in docs/credits.md. A client page swaps these for the client's own photos.
// id: images.unsplash.com path · by: photographer's Unsplash username · ref: photo page id ·
// alt: [English, Romanian].

const p = (id, by, ref, en, ro) => ({ id, by, ref, alt: { en, ro } });

export const PHOTOS = {
  barber: [
    p('photo-1503951914875-452162b0f3f1', 'seteph', 'IvQeAVeJULw', 'Client in a leather barber chair', 'Client într-un scaun de frizerie din piele'),
    p('photo-1585747860715-2ba37e788b70', 'onatecan', 'EW_rqoSdDes', 'Black leather barber chair by a brick wall', 'Scaun negru de frizerie lângă un perete de cărămidă'),
    p('photo-1599351431202-1e0f0137899a', 'agustinfernandez', '1Pmp9uxK8X8', 'Barber trimming with a straight razor', 'Frizer care conturează cu briciul'),
    p('photo-1621605815971-fbc98d665033', 'andreadonato', 'MNu0n-3BIKs', 'Clippers, scissors and a comb on a counter', 'Mașini de tuns, foarfece și pieptene pe blat'),
    p('photo-1593702275687-f8b402bf1fb5', 'demoya', 'Q82AM6BWBPM', 'Barber cutting a client’s hair', 'Frizer care tunde un client'),
    p('photo-1647140655214-e4a2d914971f', 'natejohnston', 'tgPrIYnW3g4', 'Haircut with scissors and comb', 'Tuns cu foarfeca și pieptenele'),
    p('photo-1517832606299-7ae9b720a186', 'onatecan', 'fE42nRlBcG8', 'Beard being shaped with scissors, black and white', 'Barbă aranjată cu foarfeca, alb-negru'),
    p('photo-1657105052497-f996284ffff8', 'modelyano', 'DrG4V5skbMY', 'Barber using thinning shears', 'Frizer care folosește foarfeca de filat'),
    p('photo-1773904215697-e6c21fc27ac2', 'tanyabarrow', 'fa0DqQ91dWU', 'Barber chairs and sinks in a dim shop', 'Scaune și chiuvete într-o frizerie cu lumină caldă'),
    p('photo-1605497788044-5a32c7078486', 'delfipan', 'wJoB8D3hnzc', 'Barber blow-drying a client’s hair', 'Frizer care usucă părul unui client')
  ],
  beauty: [
    p('photo-1633681926022-84c23e8cb2d6', 'benyamin_bohlouli', 'LGXN4OSQSa4', 'Modern salon with round mirrors', 'Salon modern cu oglinzi rotunde'),
    p('photo-1634449571010-02389ed0f9b0', 'lindsayrc81', 'Md_DhaFsnCQ', 'Stylist cutting a client’s hair', 'Stilistă care tunde o clientă'),
    p('photo-1580618672591-eb180b1a973f', 'awcreativeut', 'FkAZqQJTbXM', 'Blow-dry with a round brush', 'Coafat cu peria rotundă'),
    p('photo-1600948836101-f9ffda59d250', 'gregtrow', 'jsuWg7IXx1k', 'Salon chairs facing round mirrors', 'Scaune de salon în fața oglinzilor rotunde'),
    p('photo-1560869713-7d0a29430803', 'bayleejadegramling', 'MMz03PyCOZg', 'Curling iron in a stylist’s hand', 'Ondulator în mâna stilistei'),
    p('photo-1562322140-8baeececf3df', 'awcreativeut', 'WXmHwPcFamo', 'Stylist holding a hair dryer', 'Stilistă cu uscătorul de păr'),
    p('photo-1522337360788-8b13dee7a37e', 'element5digital', 'WCPg9ROZbM0', 'Stylist at work in front of a mirror', 'Stilistă la lucru în fața oglinzii'),
    p('photo-1521590832167-7bcbfaa6381f', 'guipetri', 'PtOfbGkU3uI', 'Salon chairs along a white counter', 'Scaune de salon de-a lungul unui blat alb'),
    p('photo-1570172619644-dfd03ed5d881', 'rosarafael', 'Pe9IXUuC6QU', 'Facial mask treatment', 'Tratament facial cu mască'),
    p('photo-1761839256791-6a93f89fb8b0', 'landolakesinc', 'UnSFmJCCrW0', 'Stylist placing a cape on a client', 'Stilistă care pune pelerina unei cliente')
  ],
  nails: [
    p('photo-1632345031435-8727f6897d53', 'giorgiotrovato', 'gb6gtiTZKB8', 'Manicure in progress at a nail salon', 'Manichiură în lucru la salon'),
    p('photo-1610992015762-45dca7fa3a85', 'jd_chon', 'vtQHwU4F13s', 'Light pink manicured nails', 'Unghii roz pal, manichiură proaspătă'),
    p('photo-1604654894611-6973b376cbde', 'b_elena', 'KZKbGgQPCtU', 'Black manicure with a silver ring', 'Manichiură neagră cu inel de argint'),
    p('photo-1604654894610-df63bc536371', 'b_elena', 'tXwBDZS2JxQ', 'Black and tortoiseshell nail art', 'Nail art negru și „tortoiseshell”'),
    p('photo-1754799670312-8e7da8e40ad7', 'arikurniawan', 'v9agFscJCIE', 'Ornate navy, gold and white nails', 'Unghii bleumarin, auriu și alb, decorate'),
    p('photo-1619607146034-5a05296c8f9a', 'hngstrm', 'OpjlRo-31SI', 'Nail polish bottles on gold shelves', 'Sticluțe de ojă pe rafturi aurii'),
    p('photo-1770210257340-dc2b0f44642a', '___atmos', 'xIpKfkVR334', 'Almond-shaped golden nails', 'Unghii migdală, aurii'),
    p('photo-1612887390768-fb02affea7a6', 'jojobean24', 'hvqHtZqNMeI', 'Pink manicure on white fabric', 'Manichiură roz pe material alb'),
    p('photo-1571290274554-6a2eaa771e5f', 'buudkaanaa', 'jRXxNpA6d_k', 'Close-up of a fresh manicure', 'Prim-plan cu o manichiură proaspătă'),
    p('photo-1769687209448-025548dfca8b', 'julia_2501', 'mciNDxIq4J0', 'Decorated nails holding a plant', 'Unghii decorate care țin o plantă')
  ],
  spa: [
    p('photo-1600334129128-685c5582fd35', 'enginakyurt', 'SMwCQZWayj0', 'Hot stone massage with white flowers', 'Masaj cu pietre calde și flori albe'),
    p('photo-1519824145371-296894a0daa9', 'heftiba', 'hBLf2nvp-Yc', 'Back massage', 'Masaj de spate'),
    p('photo-1540555700478-4be289fbecef', 'kmile_ch', 'VxAwTeiqDao', 'Pump bottle, tulips and a folded towel', 'Flacon, lalele și un prosop împăturit'),
    p('photo-1696841212541-449ca29397cc', 'taylorheeryphoto', '_TyrA1RUaiI', 'Hot stones along the back', 'Pietre calde de-a lungul spatelui'),
    p('photo-1773924093206-9a433a14bb44', 'virginiaphotostories', 'FkB2CUuqU_c', 'Lounge chairs in a sunlit spa room', 'Șezlonguri într-o cameră spa luminoasă'),
    p('photo-1761470575018-135c213340eb', 'moalach', '9qYFu1NzpS8', 'Steam room with a candle', 'Baie de aburi cu o lumânare'),
    p('photo-1620733723572-11c53f73a416', 'mediamodifier', 'W7AyAs7azHc', 'Reed diffuser, candles and a towel', 'Difuzor cu bețișoare, lumânări și prosop'),
    p('photo-1515377905703-c4788e51af15', 'christinhumephoto', '0MoF-Fe0w0A', 'Amber glass oil bottle', 'Sticluță de ulei din sticlă brună'),
    p('photo-1675159364615-38e1f6b62282', 'ozzzyphotos', 'nhEIkQVj0iI', 'Foot massage with oil', 'Masaj la picioare cu ulei'),
    p('photo-1591343395082-e120087004b4', 'aleromophotography', 'CLiwQXx7kT8', 'Therapist giving a back massage', 'Terapeut care face un masaj de spate')
  ],
  detailing: [
    p('photo-1607860108855-64acf2078ed9', 'bradstarkey', 'eP8h7YVhFHk', 'Detailer rinsing a car, water splashing', 'Detailer care clătește mașina, cu stropi de apă'),
    p('photo-1632823469850-2f77dd9c7f93', 'ddography', 'dlJelFmdpOc', 'Waxing the hood of a car', 'Ceruire pe capota unei mașini'),
    p('photo-1633014041037-f5446fb4ce99', 'mintosko', 'V4b2j7f1dfc', 'Grey car covered in snow foam', 'Mașină gri acoperită cu spumă activă'),
    p('photo-1605437241278-c1806d14a4d9', 'flowixxcom', 'U4IaoKF5aj4', 'Clean black car interior', 'Interior negru curat'),
    p('photo-1608506375591-b90e1f955e4b', 'andredantan19', 'pRppMPh4Zho', 'Foam sprayed on a black sports car', 'Spumă pulverizată pe o mașină sport neagră'),
    p('photo-1520340356584-f9917d1eea6f', 'cmreflections', 'Ng3xrviPrhk', 'Glossy black car, black and white', 'Mașină neagră lucioasă, alb-negru'),
    p('photo-1771491237218-cbd4a707497e', 'luaybarani', '5SmPnmCjwcU', 'Cleaning the dashboard of a classic car', 'Curățarea bordului unei mașini clasice'),
    p('photo-1694678505383-676d78ea3b96', 'helloimnik', 'phP5Qa0CauQ', 'Hand washing a car with a sponge', 'Spălare manuală cu buretele'),
    p('photo-1549064233-945d7063292f', 'viktortheo', 'wWN4AiGPscM', 'Black and red leather interior', 'Interior din piele neagră și roșie'),
    p('photo-1567808291548-fc3ee04dbcf0', 'villekaisla', 'HNCSCpWrVJA', 'Parked black car', 'Mașină neagră parcată')
  ],
  trainer: [
    p('photo-1758875569256-f37c438cac65', 'silverkblack', 'rD0poLlu57M', 'Trainer watching a client lift weights', 'Antrenor care urmărește o clientă la greutăți'),
    p('photo-1571019614242-c5c5dee9f50b', 'jonathanborba', 'R0y_bEUjiOM', 'Coach helping a client with a stretch', 'Antrenoare care ajută la o întindere'),
    p('photo-1534258936925-c58bed479fcb', 'yellowteapot', 'buWcS7G1_28', 'Two people training in a gym', 'Două persoane la antrenament în sală'),
    p('photo-1517838277536-f5f99be501cd', 'victorfreitas', 'hOuJYX2K5DA', 'Man holding a barbell', 'Bărbat care ține o haltera'),
    p('photo-1758875569414-120ebc62ada3', 'silverkblack', 'qX5QzpDQJPk', 'Trainer and client planning a workout', 'Antrenor și client care plănuiesc antrenamentul'),
    p('photo-1526506118085-60ce8714f8c5', 'echaparro', 'sHfo3WOgGTU', 'Workout in black and white', 'Antrenament, alb-negru'),
    p('photo-1554284126-aa88f22d8b74', 'sxoxm', 'Lx_GDv7VA9M', 'Group lifting barbells', 'Grup care ridică haltere'),
    p('photo-1758875569334-27579a49ed0b', 'silverkblack', 'chXrzX3WjEw', 'Push-ups with a trainer spotting', 'Flotări cu antrenorul alături'),
    p('photo-1648542036561-e1d66a5ae2b1', 'maxhomefitness_9252382_sink', 'wSUlQl8HPYc', 'Couple exercising together', 'Cuplu care face exerciții împreună'),
    p('photo-1539794830467-1f1755804d13', 'morganpetroskiphoto', 'rx6wXNsXUOE', 'Athlete in sportswear', 'Sportivă în echipament de sport')
  ],
  clinic: [
    p('photo-1645005512968-0c1fe99f0093', 'sincerelymedia', 'wGFibXDQlBI', 'Therapist treating a shoulder', 'Terapeut care tratează un umăr'),
    p('photo-1649751361457-01d3a696c7e6', 'relievemassage', 'pbUWW-CBoqY', 'Leg examination on a treatment table', 'Examinarea piciorului pe masa de tratament'),
    p('photo-1540205895360-4ad4cffb3aa8', 'anniespratt', 'Nt5eeIKH-1s', 'Back treatment on a blue towel', 'Tratament pentru spate pe un prosop albastru'),
    p('photo-1699523229208-be1e1dd9252d', 'edwardmuntinga', '8qwYA4INVCk', 'Hands working on a patient’s back', 'Mâini care lucrează pe spatele pacientului'),
    p('photo-1522898467493-49726bf28798', 'mrleecanburn', 'f4RBYsY2hxA', 'Exercise on a stability ball', 'Exercițiu pe minge de stabilitate'),
    p('photo-1616394584738-fc6e612e71b9', 'enginakyurt', 'g-m8EDc4X6Q', 'Face cream treatment', 'Tratament facial cu cremă'),
    p('photo-1761718209835-c8586b7dcac0', 'kimick', 'Xxs9WvkUPLo', 'Applying a facial treatment with a brush', 'Aplicarea unui tratament facial cu pensula'),
    p('photo-1645005513751-e22717a66ae6', 'sincerelymedia', 'CexT3n-04iw', 'Therapist and patient talking', 'Terapeut și pacient în discuție'),
    p('photo-1611073615830-9f76902c10fe', 'thlt_lcx', 'ubeslMfS1lk', 'Hand treatment on a brown towel', 'Tratament pentru mână pe prosop maro'),
    p('photo-1544717304-a2db4a7b16ee', 'icons8', 'y2T5hT7pWx4', 'Client relaxing in a white towel', 'Clientă relaxată, în prosop alb')
  ],
  tattoo: [
    p('photo-1565058379802-bbe93b2f703a', 'lucaslenzi', 'zeT_i6av9rU', 'Artist tattooing an arm', 'Artist care tatuează un braț'),
    p('photo-1552627019-947c3789ffb5', 'kgadia87', 'xyJZvUL4_TY', 'Tattooing, black and white', 'Tatuare, alb-negru'),
    p('photo-1769605767701-6e5a680ef685', 'bradleyandroos', 'gwTkGGWW2bM', 'Tattoo artist working on a client’s arm', 'Tatuator care lucrează pe brațul unui client'),
    p('photo-1568515045052-f9a854d70bfd', 'seteph', 'hxNiXP498UI', 'Tattoo machine at work', 'Aparat de tatuat la lucru'),
    p('photo-1564426622559-5af68da63b96', 'clesulie', 'PWK6CeCJtJw', 'Close-up of a tattoo in progress', 'Prim-plan cu un tatuaj în lucru'),
    p('photo-1513078094721-e7b6e0394a6a', 'jdgiacomini', 'B_VLJouyKR4', 'Artist tattooing a forearm', 'Artist care tatuează un antebraț'),
    p('photo-1597852075234-fd721ac361d3', 'abject', '5t4qCgtaLGU', 'Arm with a finished tattoo', 'Braț cu un tatuaj terminat'),
    p('photo-1516008684536-605574d804ce', 'emp_creative', 'zOyOWsANHXo', 'Neon tattoo sign', 'Firmă de neon „tattoo”')
  ],
  team: [
    p('photo-1573497019940-1c28c88b4f3e', 'wocintechchat', 'SJvDxw0azqw', 'Portrait of a smiling woman', 'Portretul unei femei zâmbitoare'),
    p('photo-1500648767791-00dcc994a43e', 'juricakoletic', '7YVZYZeITc8', 'Portrait of a man', 'Portretul unui bărbat'),
    p('photo-1580489944761-15a19d654956', 'jakenackos', 'IF9TK5Uy-KI', 'Portrait of a woman in a white top', 'Portretul unei femei în bluză albă'),
    p('photo-1507003211169-0a1dd7228f2d', 'miracletwentyone', 'iFgRcqHznqg', 'Portrait of a smiling man', 'Portretul unui bărbat zâmbitor'),
    p('photo-1494790108377-be9c29b29330', 'michaeldam', 'mEZ3PoFGs_k', 'Close portrait of a smiling woman', 'Portret de aproape al unei femei zâmbitoare'),
    p('photo-1568602471122-7832951cc4c5', 'christianbuehner', 'DItYlc26zVI', 'Man with glasses and a beard', 'Bărbat cu ochelari și barbă')
  ],
  products: [
    p('photo-1633793566189-8e9fe6f817fc', 'pmvch', 'inMtJzduxIg', 'Black and gold product bottles', 'Flacoane negru cu auriu'),
    p('photo-1622866027662-14e3c5ee67e7', 'kierinsightarchives', 'OHQcMO-8i2I', 'Black and white glass bottles', 'Sticle negre și albe'),
    p('photo-1636740599648-ae84f705fc2e', 'benjamin_ngo', 'eT_X8q80_3g', 'Bottles on a wooden table', 'Flacoane pe o masă de lemn'),
    p('photo-1633793566102-ee7793834059', 'pmvch', 'Pif68m6TMM8', 'Cosmetic bottle and a jar with a gold lid', 'Flacon cosmetic și borcan cu capac auriu'),
    p('photo-1623143445418-40c192fa3d11', 'msbirgith', 'gUZv1Fdkfgw', 'Lotion bottle on an orange background', 'Flacon de loțiune pe fundal portocaliu'),
    p('photo-1758788390320-16e1f280cf49', 'eladepure', '4n9woN7BDqQ', 'Dark skincare bottles and jars', 'Flacoane și borcane închise la culoare'),
    p('photo-1667266543254-505cf5b16ec4', 'mariiaberezovsky', 'EHOYpsqFBTk', 'Bottles next to a mirror', 'Flacoane lângă o oglindă'),
    p('photo-1631730359585-38a4935cbec4', 'pmvch', 'ILhf4VsPn_w', 'Table with cosmetic products', 'Masă cu produse cosmetice')
  ]
};

export const photosFor = niche => PHOTOS[niche] || PHOTOS.beauty;
export const altOf = (p, lang) => (p ? p.alt[lang] || p.alt.en : '');
