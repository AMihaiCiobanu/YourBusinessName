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
  }
};
