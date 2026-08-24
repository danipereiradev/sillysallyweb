const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID?.trim() || ''

let metaReady = false

function ensureDataLayer() {
  window.dataLayer = window.dataLayer || []
}

export function initAnalytics() {
  ensureDataLayer()
  initMetaPixel()
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

/**
 * SPA / landing pageview for GTM → GA4.
 * GTM trigger: Custom Event = "page_view"
 */
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
}

/**
 * Primary conversion: Instagram ad → Spotify listen CTA.
 * GTM trigger: Custom Event = "spotify_listen_click"
 * Recommended GA4 event name in the GTM tag: spotify_listen_click
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
    window.fbq('track', 'Lead', {
      content_name: trackName,
      content_category: 'spotify_listen',
    })
  }

  sendTrackBeacon(payload)
}

/**
 * Conversion: ad landing → ticket purchase CTA.
 * GTM trigger: Custom Event = "ticket_click"
 */
export function trackTicketClick({
  landingPath,
  city,
  venue,
  ticketUrl,
  slug,
} = {}) {
  const payload = {
    event: 'ticket_click',
    landing_path: landingPath,
    city,
    venue,
    ticket_url: ticketUrl,
    slug,
    ts: Date.now(),
  }

  ensureDataLayer()
  window.dataLayer.push(payload)

  if (META_PIXEL_ID && window.fbq) {
    window.fbq('trackCustom', 'TicketClick', {
      content_name: city,
      content_category: 'ticket',
    })
    window.fbq('track', 'Lead', {
      content_name: city,
      content_category: 'ticket',
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
