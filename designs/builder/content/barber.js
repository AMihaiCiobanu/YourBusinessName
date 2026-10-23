// Sample content for a barbershop. Prices in EUR; the Romanian page shows them in lei (see content/index.js).
// services: [name, minutes, price, description, kind] · kind: '' service, 'p' package, 'c' class.

export default {
  hours: [null, [540, 1140], [540, 1140], [540, 1140], [540, 1200], [540, 1020], null],
  stats: [3400, 9, 4.9, 21000],
  products: [[16, 0], [14, 1], [12, 2], [42, 3]],
  en: {
    tagline: 'Cuts · Fades · Beards',
    h1: ['Sharp cuts,', 'right on time.'],
    lead: 'Classic technique, a clean finish and a chair that is waiting for you. Pick your time online and walk straight in.',
    stat4: 'cuts this year',
    services: [
      ['Classic haircut', 30, 25, 'Scissor or clipper cut, neck shave and style.'],
      ['Skin fade', 45, 30, 'Tight blend from skin to length, finished with a razor.'],
      ['Beard trim & shape', 20, 15, 'Line-up, shaping and a hot towel.'],
      ['Haircut + beard', 50, 38, 'The full treatment in one booking.'],
      ['Hot towel shave', 30, 28, 'Straight-razor shave with hot towels and balm.'],
      ['Kids cut (under 12)', 25, 18, 'Patient hands, quick and tidy.'],
      ['Grey blending', 20, 20, 'Natural-looking colour to soften the grey.'],
      ['Monthly grooming club', 30, 60, 'Two cuts and two beard trims a month.', 'p']
    ],
    team: [
      ['Luca', 'Master barber', ['Skin fades', 'Razor work', 'Beards']],
      ['Sam', 'Barber', ['Classic cuts', 'Kids', 'Long hair']],
      ['Alex', 'Junior barber', ['Line-ups', 'Hot towel shaves']]
    ],
    products: [['Beard oil', '30 ml', 'Bestseller'], ['Matte clay', '75 g', ''], ['Sea salt spray', '150 ml', ''], ['Gift set', 'Oil, clay, comb', 'Gift']],
    reviews: [
      ['In and out on time and the fade was spot on. No more waiting on the bench.', 'Andrei M.', 'Skin fade'],
      ['Best beard shape-up I have had. Rebooking takes two taps.', 'Victor P.', 'Beard trim'],
      ['Proper hot towel shave and a good chat. Worth every minute.', 'Mark D.', 'Hot towel shave'],
      ['Took my son for his first real haircut. Patient and fun, he wants to come back.', 'Elena S.', 'Kids cut']
    ],
    faq: [['Do you take walk-ins?', 'Yes, when a chair is free. Booking online guarantees your time.']],
    slides: [['The chair is ready', 'Book a time and skip the queue.'], ['Fades with a razor finish', 'Clean lines that grow out well.'], ['Beards, shaped properly', 'Hot towel, oil and a sharp edge.']],
    compare: 'Grown-out to a sharp skin fade in 45 minutes.'
  },
  ro: {
    tagline: 'Tuns · Fade · Barbă',
    h1: ['Tunsori precise,', 'fix la ora ta.'],
    lead: 'Tehnică clasică, finisaj curat și un scaun care te așteaptă. Alegi ora online și intri direct.',
    stat4: 'tunsori anul acesta',
    services: [
      ['Tuns clasic', 30, 25, 'Cu foarfeca sau mașina, contur la ceafă și styling.'],
      ['Skin fade', 45, 30, 'Degradeu fin de la piele la lungime, finisat cu briciul.'],
      ['Aranjat barbă', 20, 15, 'Contur, formă și prosop cald.'],
      ['Tuns + barbă', 50, 38, 'Pachetul complet, într-o singură programare.'],
      ['Ras cu prosop cald', 30, 28, 'Ras cu briciul, prosoape calde și balsam.'],
      ['Tuns copii (sub 12 ani)', 25, 18, 'Răbdare, rapid și ordonat.'],
      ['Acoperire fire albe', 20, 20, 'Culoare naturală care estompează firele albe.'],
      ['Abonament lunar', 30, 60, 'Două tunsori și două aranjări de barbă pe lună.', 'p']
    ],
    team: [
      ['Luca', 'Master barber', ['Skin fade', 'Brici', 'Barbă']],
      ['Sam', 'Frizer', ['Tunsori clasice', 'Copii', 'Păr lung']],
      ['Alex', 'Frizer junior', ['Contur', 'Ras cu prosop cald']]
    ],
    products: [['Ulei de barbă', '30 ml', 'Cel mai vândut'], ['Ceară mată', '75 g', ''], ['Spray cu sare de mare', '150 ml', ''], ['Set cadou', 'Ulei, ceară, pieptene', 'Cadou']],
    reviews: [
      ['Am intrat și am ieșit la timp, iar fade-ul a ieșit perfect. Gata cu așteptatul pe bancă.', 'Andrei M.', 'Skin fade'],
      ['Cel mai bun contur de barbă de până acum. Reprogramarea durează două atingeri.', 'Victor P.', 'Aranjat barbă'],
      ['Ras ca la carte, cu prosop cald, și o discuție bună. Merită fiecare minut.', 'Mihai D.', 'Ras cu prosop cald'],
      ['L-am adus pe băiat la prima tunsoare adevărată. Răbdători și haioși, vrea să revină.', 'Elena S.', 'Tuns copii']
    ],
    faq: [['Primiți și fără programare?', 'Da, dacă e un scaun liber. Programarea online îți garantează ora.']],
    slides: [['Scaunul te așteaptă', 'Programează-te și sari peste coadă.'], ['Fade cu finisaj de brici', 'Linii curate care cresc frumos.'], ['Barbă aranjată ca lumea', 'Prosop cald, ulei și contur precis.']],
    compare: 'De la crescut la un skin fade curat, în 45 de minute.'
  },
  fr: {
    tagline: 'Coupes · Dégradés · Barbes',
    h1: ['Des coupes nettes,', 'pile à l’heure.'],
    lead: 'Technique classique, finition soignée et un fauteuil qui vous attend. Choisissez votre horaire en ligne et entrez directement.',
    stat4: 'coupes cette année',
    services: [
      ['Coupe classique', 30, 25, 'Ciseaux ou tondeuse, contour de nuque et coiffage.'],
      ['Dégradé à blanc', 45, 30, 'Dégradé serré de la peau à la longueur, fini au rasoir.'],
      ['Taille et forme de barbe', 20, 15, 'Contours, mise en forme et serviette chaude.'],
      ['Coupe + barbe', 50, 38, 'Le soin complet en une seule réservation.'],
      ['Rasage à la serviette chaude', 30, 28, 'Rasage au coupe-chou, serviettes chaudes et baume.'],
      ['Coupe enfant (moins de 12 ans)', 25, 18, 'Des mains patientes, rapide et soigné.'],
      ['Camouflage des cheveux blancs', 20, 20, 'Une couleur naturelle pour adoucir le gris.'],
      ['Club mensuel', 30, 60, 'Deux coupes et deux tailles de barbe par mois.', 'p']
    ],
    team: [
      ['Luca', 'Maître barbier', ['Dégradés', 'Rasoir', 'Barbes']],
      ['Sam', 'Barbier', ['Coupes classiques', 'Enfants', 'Cheveux longs']],
      ['Alex', 'Barbier junior', ['Contours', 'Rasage serviette chaude']]
    ],
    products: [['Huile à barbe', '30 ml', 'Best-seller'], ['Argile mate', '75 g', ''], ['Spray au sel marin', '150 ml', ''], ['Coffret cadeau', 'Huile, argile, peigne', 'Cadeau']],
    reviews: [
      ['Entré et sorti à l’heure, et le dégradé était parfait. Fini l’attente sur le banc.', 'Andrei M.', 'Dégradé à blanc'],
      ['La meilleure mise en forme de barbe que j’aie eue. Reprendre rendez-vous prend deux gestes.', 'Victor P.', 'Taille de barbe'],
      ['Un vrai rasage à la serviette chaude et une bonne discussion. Chaque minute en vaut la peine.', 'Mark D.', 'Rasage serviette chaude'],
      ['J’ai emmené mon fils pour sa première vraie coupe. Patients et drôles, il veut revenir.', 'Elena S.', 'Coupe enfant']
    ],
    faq: [['Prenez-vous sans rendez-vous ?', 'Oui, quand un fauteuil est libre. Réserver en ligne vous garantit votre horaire.']],
    slides: [['Le fauteuil est prêt', 'Réservez un horaire et évitez la file.'], ['Des dégradés finis au rasoir', 'Des lignes nettes qui repoussent bien.'], ['Des barbes bien taillées', 'Serviette chaude, huile et contour net.']],
    compare: 'De cheveux trop longs à un dégradé net en 45 minutes.'
  },
  es: {
    tagline: 'Cortes · Degradados · Barbas',
    h1: ['Cortes precisos,', 'justo a tu hora.'],
    lead: 'Técnica clásica, acabado limpio y un sillón que te espera. Elige tu hora online y entra directo.',
    stat4: 'cortes este año',
    services: [
      ['Corte clásico', 30, 25, 'Tijera o máquina, perfilado de nuca y peinado.'],
      ['Skin fade', 45, 30, 'Degradado desde la piel, terminado con navaja.'],
      ['Arreglo de barba', 20, 15, 'Perfilado, forma y toalla caliente.'],
      ['Corte + barba', 50, 38, 'El servicio completo en una sola reserva.'],
      ['Afeitado con toalla caliente', 30, 28, 'Afeitado a navaja con toallas calientes y bálsamo.'],
      ['Corte infantil (menores de 12)', 25, 18, 'Manos pacientes, rápido y cuidado.'],
      ['Matizado de canas', 20, 20, 'Color natural para suavizar las canas.'],
      ['Club mensual', 30, 60, 'Dos cortes y dos arreglos de barba al mes.', 'p']
    ],
    team: [
      ['Luca', 'Maestro barbero', ['Degradados', 'Navaja', 'Barbas']],
      ['Sam', 'Barbero', ['Cortes clásicos', 'Niños', 'Pelo largo']],
      ['Alex', 'Barbero júnior', ['Perfilados', 'Afeitado con toalla caliente']]
    ],
    products: [['Aceite para barba', '30 ml', 'Más vendido'], ['Arcilla mate', '75 g', ''], ['Spray de sal marina', '150 ml', ''], ['Set regalo', 'Aceite, arcilla, peine', 'Regalo']],
    reviews: [
      ['Entré y salí a mi hora y el degradado quedó perfecto. Se acabó esperar en el banco.', 'Andrei M.', 'Skin fade'],
      ['El mejor arreglo de barba que me han hecho. Volver a reservar son dos toques.', 'Victor P.', 'Arreglo de barba'],
      ['Un afeitado con toalla caliente de verdad y buena charla. Vale cada minuto.', 'Mark D.', 'Afeitado con toalla caliente'],
      ['Llevé a mi hijo a su primer corte de verdad. Pacientes y divertidos, quiere volver.', 'Elena S.', 'Corte infantil']
    ],
    faq: [['¿Atendéis sin cita?', 'Sí, cuando hay un sillón libre. Reservar online te garantiza tu hora.']],
    slides: [['El sillón está listo', 'Reserva hora y sáltate la cola.'], ['Degradados con acabado a navaja', 'Líneas limpias que crecen bien.'], ['Barbas bien perfiladas', 'Toalla caliente, aceite y un borde preciso.']],
    compare: 'De pelo crecido a un skin fade preciso en 45 minutos.'
  },
  pt: {
    tagline: 'Cortes · Degradês · Barbas',
    h1: ['Cortes precisos,', 'mesmo à hora.'],
    lead: 'Técnica clássica, acabamento limpo e uma cadeira à sua espera. Escolha a hora online e entre direto.',
    stat4: 'cortes este ano',
    services: [
      ['Corte clássico', 30, 25, 'Tesoura ou máquina, acabamento na nuca e styling.'],
      ['Skin fade', 45, 30, 'Degradê desde a pele, finalizado à navalha.'],
      ['Aparar e desenhar a barba', 20, 15, 'Contorno, forma e toalha quente.'],
      ['Corte + barba', 50, 38, 'O tratamento completo numa só marcação.'],
      ['Barbear com toalha quente', 30, 28, 'Barba à navalha com toalhas quentes e bálsamo.'],
      ['Corte criança (até 12 anos)', 25, 18, 'Mãos pacientes, rápido e cuidado.'],
      ['Disfarce de brancos', 20, 20, 'Cor natural para suavizar os cabelos brancos.'],
      ['Clube mensal', 30, 60, 'Dois cortes e duas barbas por mês.', 'p']
    ],
    team: [
      ['Luca', 'Mestre barbeiro', ['Degradês', 'Navalha', 'Barbas']],
      ['Sam', 'Barbeiro', ['Cortes clássicos', 'Crianças', 'Cabelo comprido']],
      ['Alex', 'Barbeiro júnior', ['Contornos', 'Barbear com toalha quente']]
    ],
    products: [['Óleo para barba', '30 ml', 'Mais vendido'], ['Argila mate', '75 g', ''], ['Spray de sal marinho', '150 ml', ''], ['Conjunto presente', 'Óleo, argila, pente', 'Presente']],
    reviews: [
      ['Entrei e saí a horas e o degradê ficou perfeito. Acabou a espera no banco.', 'Andrei M.', 'Skin fade'],
      ['A melhor barba que já me fizeram. Remarcar são dois toques.', 'Victor P.', 'Barba'],
      ['Um barbear com toalha quente a sério e boa conversa. Vale cada minuto.', 'Mark D.', 'Barbear com toalha quente'],
      ['Levei o meu filho ao primeiro corte a sério. Pacientes e divertidos, ele quer voltar.', 'Elena S.', 'Corte criança']
    ],
    faq: [['Atendem sem marcação?', 'Sim, quando há uma cadeira livre. Marcar online garante a sua hora.']],
    slides: [['A cadeira está pronta', 'Marque a hora e evite a fila.'], ['Degradês com acabamento à navalha', 'Linhas limpas que crescem bem.'], ['Barbas bem desenhadas', 'Toalha quente, óleo e um contorno preciso.']],
    compare: 'De cabelo crescido a um skin fade preciso em 45 minutos.'
  },
  pl: {
    tagline: 'Strzyżenie · Fade · Broda',
    h1: ['Precyzyjne cięcia,', 'punktualnie co do minuty.'],
    lead: 'Klasyczna technika, czyste wykończenie i fotel, który na Ciebie czeka. Wybierz godzinę online i wejdź bez czekania.',
    stat4: 'strzyżeń w tym roku',
    services: [
      ['Strzyżenie klasyczne', 30, 25, 'Nożyczki lub maszynka, kontur karku i stylizacja.'],
      ['Skin fade', 45, 30, 'Cieniowanie od skóry do długości, wykończone brzytwą.'],
      ['Trymowanie brody', 20, 15, 'Kontur, kształt i gorący ręcznik.'],
      ['Strzyżenie + broda', 50, 38, 'Pełna usługa w jednej rezerwacji.'],
      ['Golenie z gorącym ręcznikiem', 30, 28, 'Golenie brzytwą, gorące ręczniki i balsam.'],
      ['Strzyżenie dziecięce (do 12 lat)', 25, 18, 'Cierpliwe ręce, szybko i schludnie.'],
      ['Tuszowanie siwizny', 20, 20, 'Naturalny kolor, który łagodzi siwe włosy.'],
      ['Klub miesięczny', 30, 60, 'Dwa strzyżenia i dwa trymowania brody w miesiącu.', 'p']
    ],
    team: [
      ['Luca', 'Mistrz barber', ['Skin fade', 'Brzytwa', 'Brody']],
      ['Sam', 'Barber', ['Klasyczne cięcia', 'Dzieci', 'Długie włosy']],
      ['Alex', 'Młodszy barber', ['Kontury', 'Golenie z gorącym ręcznikiem']]
    ],
    products: [['Olejek do brody', '30 ml', 'Bestseller'], ['Matowa glinka', '75 g', ''], ['Spray z solą morską', '150 ml', ''], ['Zestaw prezentowy', 'Olejek, glinka, grzebień', 'Prezent']],
    reviews: [
      ['Wszedłem i wyszedłem o czasie, a fade był idealny. Koniec czekania na ławce.', 'Andrei M.', 'Skin fade'],
      ['Najlepsze trymowanie brody, jakie miałem. Kolejna rezerwacja to dwa kliknięcia.', 'Victor P.', 'Trymowanie brody'],
      ['Porządne golenie z gorącym ręcznikiem i dobra rozmowa. Warte każdej minuty.', 'Mark D.', 'Golenie z ręcznikiem'],
      ['Zabrałam syna na pierwsze prawdziwe strzyżenie. Cierpliwie i wesoło, chce wrócić.', 'Elena S.', 'Strzyżenie dziecięce']
    ],
    faq: [['Czy przyjmujecie bez zapisów?', 'Tak, gdy fotel jest wolny. Rezerwacja online gwarantuje Twoją godzinę.']],
    slides: [['Fotel czeka', 'Zarezerwuj godzinę i omiń kolejkę.'], ['Fade wykończony brzytwą', 'Czyste linie, które ładnie odrastają.'], ['Brody we właściwym kształcie', 'Gorący ręcznik, olejek i ostry kontur.']],
    compare: 'Z zarośniętej głowy w ostry skin fade w 45 minut.'
  },
  it: {
    tagline: 'Tagli · Sfumature · Barba',
    h1: ['Tagli precisi,', 'puntuali al minuto.'],
    lead: 'Tecnica classica, finitura pulita e una poltrona che ti aspetta. Scegli l’orario online ed entra subito.',
    stat4: 'tagli quest’anno',
    services: [
      ['Taglio classico', 30, 25, 'Forbici o macchinetta, rifinitura del collo e styling.'],
      ['Sfumatura alta a zero', 45, 30, 'Sfumatura dalla pelle alla lunghezza, rifinita a rasoio.'],
      ['Regolazione barba', 20, 15, 'Contorno, forma e panno caldo.'],
      ['Taglio + barba', 50, 38, 'Il servizio completo in un’unica prenotazione.'],
      ['Rasatura con panno caldo', 30, 28, 'Rasatura a mano libera con panni caldi e balsamo.'],
      ['Taglio bambino (sotto i 12)', 25, 18, 'Mani pazienti, veloce e ordinato.'],
      ['Copertura dei bianchi', 20, 20, 'Colore naturale che attenua il grigio.'],
      ['Club mensile', 30, 60, 'Due tagli e due regolazioni della barba al mese.', 'p']
    ],
    team: [
      ['Luca', 'Mastro barbiere', ['Sfumature', 'Rasoio', 'Barbe']],
      ['Sam', 'Barbiere', ['Tagli classici', 'Bambini', 'Capelli lunghi']],
      ['Alex', 'Barbiere junior', ['Contorni', 'Rasatura con panno caldo']]
    ],
    products: [['Olio da barba', '30 ml', 'Il più venduto'], ['Argilla opaca', '75 g', ''], ['Spray al sale marino', '150 ml', ''], ['Set regalo', 'Olio, argilla, pettine', 'Regalo']],
    reviews: [
      ['Dentro e fuori in orario e la sfumatura era perfetta. Basta attese sulla panca.', 'Andrei M.', 'Sfumatura'],
      ['La migliore regolazione di barba mai fatta. Riprenotare richiede due tocchi.', 'Victor P.', 'Regolazione barba'],
      ['Una vera rasatura con panno caldo e una bella chiacchierata. Vale ogni minuto.', 'Mark D.', 'Rasatura con panno caldo'],
      ['Ho portato mio figlio al suo primo vero taglio. Pazienti e simpatici, vuole tornare.', 'Elena S.', 'Taglio bambino']
    ],
    faq: [['Accettate clienti senza appuntamento?', 'Sì, quando c’è una poltrona libera. Prenotare online ti garantisce l’orario.']],
    slides: [['La poltrona è pronta', 'Prenota un orario e salta la fila.'], ['Sfumature rifinite a rasoio', 'Linee pulite che ricrescono bene.'], ['Barbe curate come si deve', 'Panno caldo, olio e un contorno netto.']],
    compare: 'Da capelli cresciuti a una sfumatura netta in 45 minuti.'
  },
  el: {
    tagline: 'Κουρέματα · Fade · Γένια',
    h1: ['Καθαρά κουρέματα,', 'ακριβώς στην ώρα σας.'],
    lead: 'Κλασική τεχνική, καθαρό φινίρισμα και μια καρέκλα που σας περιμένει. Διαλέξτε ώρα online και μπείτε κατευθείαν.',
    stat4: 'κουρέματα φέτος',
    services: [
      ['Κλασικό κούρεμα', 30, 25, 'Ψαλίδι ή μηχανή, ξύρισμα στον σβέρκο και styling.'],
      ['Skin fade', 45, 30, 'Σβήσιμο από το δέρμα ως το μήκος, με φινίρισμα ξυραφιού.'],
      ['Περιποίηση γενιών', 20, 15, 'Περίγραμμα, σχήμα και ζεστή πετσέτα.'],
      ['Κούρεμα + γένια', 50, 38, 'Η πλήρης περιποίηση σε μία κράτηση.'],
      ['Ξύρισμα με ζεστή πετσέτα', 30, 28, 'Ξύρισμα με ξυράφι, ζεστές πετσέτες και βάλσαμο.'],
      ['Παιδικό κούρεμα (κάτω των 12)', 25, 18, 'Υπομονετικά χέρια, γρήγορα και προσεγμένα.'],
      ['Κάλυψη λευκών', 20, 20, 'Φυσικό χρώμα που απαλύνει τα γκρίζα.'],
      ['Μηνιαίο club', 30, 60, 'Δύο κουρέματα και δύο περιποιήσεις γενιών τον μήνα.', 'p']
    ],
    team: [
      ['Luca', 'Master barber', ['Skin fade', 'Ξυράφι', 'Γένια']],
      ['Sam', 'Κουρέας', ['Κλασικά κουρέματα', 'Παιδιά', 'Μακριά μαλλιά']],
      ['Alex', 'Junior κουρέας', ['Περιγράμματα', 'Ξύρισμα με ζεστή πετσέτα']]
    ],
    products: [['Λάδι γενιών', '30 ml', 'Best seller'], ['Ματ πηλός', '75 g', ''], ['Σπρέι θαλασσινού αλατιού', '150 ml', ''], ['Σετ δώρου', 'Λάδι, πηλός, χτένα', 'Δώρο']],
    reviews: [
      ['Μπήκα και βγήκα στην ώρα μου και το fade ήταν τέλειο. Τέλος η αναμονή στον πάγκο.', 'Andrei M.', 'Skin fade'],
      ['Η καλύτερη περιποίηση γενιών που έχω κάνει. Νέα κράτηση με δύο πατήματα.', 'Victor P.', 'Περιποίηση γενιών'],
      ['Σωστό ξύρισμα με ζεστή πετσέτα και ωραία κουβέντα. Αξίζει κάθε λεπτό.', 'Mark D.', 'Ξύρισμα με ζεστή πετσέτα'],
      ['Πήγα τον γιο μου στο πρώτο του κανονικό κούρεμα. Υπομονή και κέφι, θέλει να ξαναπάει.', 'Elena S.', 'Παιδικό κούρεμα']
    ],
    faq: [['Δέχεστε χωρίς ραντεβού;', 'Ναι, όταν υπάρχει ελεύθερη καρέκλα. Η κράτηση online σας εξασφαλίζει την ώρα σας.']],
    slides: [['Η καρέκλα είναι έτοιμη', 'Κλείστε ώρα και γλιτώστε την ουρά.'], ['Fade με φινίρισμα ξυραφιού', 'Καθαρές γραμμές που μεγαλώνουν όμορφα.'], ['Γένια με σωστό σχήμα', 'Ζεστή πετσέτα, λάδι και καθαρό περίγραμμα.']],
    compare: 'Από μεγαλωμένα μαλλιά σε καθαρό skin fade σε 45 λεπτά.'
  }
};
