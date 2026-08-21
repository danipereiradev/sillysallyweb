const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID?.trim() || ''
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || ''

let metaReady = false
let gaReady = false

function ensureDataLayer() {
  window.dataLayer = window.dataLayer || []
}

export function initAnalytics() {
  ensureDataLayer()
  initMetaPixel()
  initGa()
}

function initMetaPixel() {
  if (!META_PIXEL_ID || metaReady || typeof window === 'undefined') return

  if (!window.fbq) {
    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments)
      }
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = true
      n.version = '2.0'
      n.queue = []
      t = b.createElement(e)
      t.async = true
      t.src = v
      s = b.getElementsByTagName(e)[0]
      s.parentNode.insertBefore(t, s)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
    /* eslint-enable */
  }

  window.fbq('init', META_PIXEL_ID)
  metaReady = true
}

function initGa() {
  if (!GA_MEASUREMENT_ID || gaReady || typeof window === 'undefined') return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false })
  gaReady = true
}

export function trackPageView(path, title) {
  ensureDataLayer()
  window.dataLayer.push({
    event: 'page_view',
    page_path: path,
    page_title: title,
  })

  if (META_PIXEL_ID && window.fbq) {
    window.fbq('track', 'PageView')
  }

  if (GA_MEASUREMENT_ID && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
    })
  }
}

/**
 * Primary conversion for the Instagram → Spotify landing.
 * Fires Meta custom + Lead events, GA4, dataLayer, and a server beacon.
 */
export function trackSpotifyListenClick({
  trackId,
  trackName,
  landingPath,
  spotifyUrl,
} = {}) {
  const payload = {
    event: 'spotify_listen_click',
    track_id: trackId,
    track_name: trackName,
    landing_path: landingPath,
    spotify_url: spotifyUrl,
    ts: Date.now(),
  }

  ensureDataLayer()
  window.dataLayer.push(payload)

  if (META_PIXEL_ID && window.fbq) {
    window.fbq('trackCustom', 'SpotifyListen', {
      content_name: trackName,
      content_ids: trackId ? [trackId] : undefined,
      content_type: 'song',
    })
    // Easy to map as a conversion in Meta Ads Manager
    window.fbq('track', 'Lead', {
      content_name: trackName,
      content_category: 'spotify_listen',
    })
  }

  if (GA_MEASUREMENT_ID && window.gtag) {
    window.gtag('event', 'spotify_listen_click', {
      track_id: trackId,
      track_name: trackName,
      landing_path: landingPath,
    })
  }

  sendTrackBeacon(payload)
}

function sendTrackBeacon(payload) {
  try {
    const body = JSON.stringify(payload)
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: 'application/json' })
      navigator.sendBeacon('/api/track', blob)
      return
    }
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {})
  } catch {
    // Tracking must never block navigation
  }
}
