export const newsArticles = [
  {
    slug: 'gira-15-aniversario',
    date: '2026-02-14',
    image: '/img/carteles/promo/silly-sally-sky.jpg',
    title: {
      es: 'Comenzamos nuestra gira 15 aniversario',
      en: 'Our 15th anniversary tour begins',
    },
    excerpt: {
      es: 'De mayo a noviembre de 2026 recorremos el país celebrando quince años de Silly Sally.',
      en: 'From May to November 2026 we tour the country celebrating fifteen years of Silly Sally.',
    },
    body: {
      es: [
        'Arranca la gira del 15.º aniversario (2011–2026). Estas son las fechas confirmadas del cartel:',
        '16/05 — A Coruña, con Harry May y Morgen.',
        '06/06 — Terrassa, con Global Discontent e Incendi.',
        '27/06 — Granada, con My Left Foot.',
        '05/09 — Logroño, con Kontrol Mental.',
        '19/09 — Madrid, con My Left Foot.',
        '17/10 — Gijón, con Noite Atari.',
        '06/11 — Jerez, con Mexican Sugar Skulls y Liv Wallace.',
        'Más info y entradas en la sección de conciertos. ¡Nos vemos en la carretera!',
      ],
      en: [
        'The 15th anniversary tour (2011–2026) is under way. These are the confirmed dates from the poster:',
        '16/05 — A Coruña, with Harry May and Morgen.',
        '06/06 — Terrassa, with Global Discontent and Incendi.',
        '27/06 — Granada, with My Left Foot.',
        '05/09 — Logroño, with Kontrol Mental.',
        '19/09 — Madrid, with My Left Foot.',
        '17/10 — Gijón, with Noite Atari.',
        '06/11 — Jerez, with Mexican Sugar Skulls and Liv Wallace.',
        'More info and tickets in the shows section. See you on the road!',
      ],
    },
  },
]

export function getNewsBySlug(slug) {
  return newsArticles.find((article) => article.slug === slug) || null
}
