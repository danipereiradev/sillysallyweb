/**
 * Ticket ad landings keyed by URL slug: /entradas/:slug
 *
 * To add another show, copy an entry and fill the fields.
 * youtubeId: YouTube video id only (e.g. "nkngZTnxqAU"), or null for empty slot.
 */
export const ticketLandings = {
  logrono: {
    slug: 'logrono',
    city: 'Logroño',
    venue: 'Sala Stereo',
    day: '05',
    month: 'SEP',
    year: '2026',
    time: '21:30',
    ticketUrl:
      'https://woutick.com/es/entradas/silly-sally-kontrol-mental-en-el-stereo-de-logrono',
    heroVideoId: 'r2Lg1nlqh1Q',
    bands: [
      {
        name: 'Silly Sally',
        youtubeId: 'r2Lg1nlqh1Q',
      },
      {
        name: 'Kontrol Mental',
        youtubeId: 'mjyP-RZqX4A',
      },
    ],
  },
}

export function getTicketLanding(slug) {
  if (!slug) return null
  return ticketLandings[slug] ?? null
}

export function youtubePoster(videoId) {
  return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
}

export function youtubeBackgroundEmbed(videoId) {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1`
}

export function youtubeWatchEmbed(videoId) {
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`
}
