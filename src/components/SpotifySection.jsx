import { useEffect, useRef } from 'react'
import './SpotifySection.css'

const SPOTIFY_ARTIST_ID = '3RcUOmzJSWXwc4ahxSbp9G'
const SPOTIFY_URL = `https://open.spotify.com/artist/${SPOTIFY_ARTIST_ID}`
const FEATURED_TRACK_URI = 'spotify:track:17BR2DgjTJZKlk7O5ZErA7'
const PLAY_EVENT = 'play-spotify-featured'

function SpotifyLogo() {
  return (
    <svg
      className="spotify__logo"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
      />
    </svg>
  )
}

export default function SpotifySection() {
  const embedRef = useRef(null)
  const controllerRef = useRef(null)
  const pendingPlayRef = useRef(false)

  useEffect(() => {
    const playFeaturedTrack = () => {
      const controller = controllerRef.current
      if (!controller) {
        pendingPlayRef.current = true
        return
      }

      controller.loadUri(FEATURED_TRACK_URI)
      controller.play()
    }

    window.addEventListener(PLAY_EVENT, playFeaturedTrack)

    const existing = document.querySelector(
      'script[src="https://open.spotify.com/embed/iframe-api/v1"]',
    )

    const initController = (IFrameAPI) => {
      if (!embedRef.current || controllerRef.current) return

      IFrameAPI.createController(
        embedRef.current,
        {
          uri: `spotify:artist:${SPOTIFY_ARTIST_ID}`,
          width: '100%',
          height: 352,
          theme: '0',
        },
        (EmbedController) => {
          controllerRef.current = EmbedController
          if (pendingPlayRef.current) {
            pendingPlayRef.current = false
            playFeaturedTrack()
          }
        },
      )
    }

    if (window.SpotifyIframeApi) {
      initController(window.SpotifyIframeApi)
    } else {
      const previousReady = window.onSpotifyIframeApiReady
      window.onSpotifyIframeApiReady = (IFrameAPI) => {
        window.SpotifyIframeApi = IFrameAPI
        previousReady?.(IFrameAPI)
        initController(IFrameAPI)
      }

      if (!existing) {
        const script = document.createElement('script')
        script.src = 'https://open.spotify.com/embed/iframe-api/v1'
        script.async = true
        document.body.appendChild(script)
      }
    }

    return () => {
      window.removeEventListener(PLAY_EVENT, playFeaturedTrack)
    }
  }, [])

  return (
    <section className="spotify" id="spotify">
      <div className="spotify__inner">
        <header className="spotify__header">
          <SpotifyLogo />
          <h2 className="spotify__title">Escúchanos en Spotify</h2>
          <p className="spotify__artist">Silly Sally | Madrid Punk Rock</p>
        </header>

        <div className="spotify__widget">
          <div ref={embedRef} className="spotify__embed" />
        </div>

        <a
          href={SPOTIFY_URL}
          className="spotify__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Abrir en Spotify
        </a>
      </div>
    </section>
  )
}

export { PLAY_EVENT }
