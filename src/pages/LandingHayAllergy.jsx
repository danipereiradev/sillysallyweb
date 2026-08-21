import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import LanguageSwitch from '../components/LanguageSwitch'
import { useLanguage } from '../i18n/LanguageContext'
import {
  initAnalytics,
  trackPageView,
  trackSpotifyListenClick,
} from '../lib/analytics'
import './LandingHayAllergy.css'

const TRACK_ID = '42PLZ719p2jlaw4B6BPrUw'
const TRACK_NAME = 'Hay Allergy'
const SPOTIFY_URL = `https://open.spotify.com/track/${TRACK_ID}?si=9d2ea08126ef4c92`
const SPOTIFY_EMBED = `https://open.spotify.com/embed/track/${TRACK_ID}?utm_source=generator&theme=0`
const YT_VIDEO_ID = 'nkngZTnxqAU'
const YT_POSTER = `https://i.ytimg.com/vi/${YT_VIDEO_ID}/maxresdefault.jpg`
const YT_EMBED = `https://www.youtube-nocookie.com/embed/${YT_VIDEO_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${YT_VIDEO_ID}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1`
const LANDING_PATH = '/hay-allergy'
const LOGO = '/Silly Sally Logo solo.png'
const INSTAGRAM_URL = 'https://www.instagram.com/sillysallyband/'

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
      />
    </svg>
  )
}

export default function LandingHayAllergy() {
  const { t } = useLanguage()

  useEffect(() => {
    document.title = t('landingHayAllergy.docTitle')
  }, [t])

  useEffect(() => {
    initAnalytics()
    trackPageView(LANDING_PATH, 'Hay Allergy · Silly Sally')
  }, [])

  function handleSpotifyClick() {
    trackSpotifyListenClick({
      trackId: TRACK_ID,
      trackName: TRACK_NAME,
      landingPath: LANDING_PATH,
      spotifyUrl: SPOTIFY_URL,
    })
  }

  return (
    <div className="lp">
      <div
        className="lp__video"
        aria-hidden="true"
        style={{ backgroundImage: `url(${YT_POSTER})` }}
      >
        <iframe
          src={YT_EMBED}
          title=""
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          tabIndex={-1}
        />
      </div>
      <div className="lp__veil" aria-hidden="true" />

      <header className="lp__top">
        <LanguageSwitch />
      </header>

      <main className="lp__hero">
        <img
          src={LOGO}
          alt="Silly Sally"
          className="lp__logo"
          width={360}
          height={120}
        />
        <p className="lp__eyebrow">{t('landingHayAllergy.eyebrow')}</p>
        <h1 className="lp__title">{t('landingHayAllergy.title')}</h1>
        <p className="lp__lead">{t('landingHayAllergy.lead')}</p>

        <div className="lp__cta-group">
          <a
            href={SPOTIFY_URL}
            className="lp__cta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleSpotifyClick}
            data-track="spotify_listen_click"
          >
            <SpotifyIcon />
            <span>{t('landingHayAllergy.cta')}</span>
          </a>
          <p className="lp__cta-hint">{t('landingHayAllergy.ctaHint')}</p>
        </div>
      </main>

      <section className="lp__below" aria-label={t('landingHayAllergy.moreLabel')}>
        <div className="lp__below-inner">
          <div className="lp__embed">
            <iframe
              title={t('landingHayAllergy.embedTitle')}
              src={SPOTIFY_EMBED}
              width="100%"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>

          <div className="lp__links">
            <a
              href={INSTAGRAM_URL}
              className="lp__secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('landingHayAllergy.instagram')}
            </a>
            <Link to="/" className="lp__secondary lp__secondary--ghost">
              {t('landingHayAllergy.website')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
