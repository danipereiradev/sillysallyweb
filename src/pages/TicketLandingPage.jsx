import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import LanguageSwitch from '../components/LanguageSwitch'
import { useLanguage } from '../i18n/LanguageContext'
import {
  getTicketLanding,
  youtubeBackgroundEmbed,
  youtubePoster,
  youtubeWatchEmbed,
} from '../data/ticketLandings'
import {
  initAnalytics,
  trackPageView,
  trackTicketClick,
} from '../lib/analytics'
import './TicketLandingPage.css'

const LOGO = '/Silly Sally Logo solo.png'
const INSTAGRAM_URL = 'https://www.instagram.com/sillysallyband/'

function BandVideo({ band, placeholderLabel }) {
  if (!band.youtubeId) {
    return (
      <article className="tlp__band">
        <h3 className="tlp__band-name">{band.name}</h3>
        <div className="tlp__video-slot tlp__video-slot--empty">
          <p>{placeholderLabel}</p>
        </div>
      </article>
    )
  }

  return (
    <article className="tlp__band">
      <h3 className="tlp__band-name">{band.name}</h3>
      <div className="tlp__video-slot">
        <iframe
          title={`${band.name} video`}
          src={youtubeWatchEmbed(band.youtubeId)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </article>
  )
}

export default function TicketLandingPage() {
  const { slug } = useParams()
  const { t } = useLanguage()
  const show = getTicketLanding(slug)

  useEffect(() => {
    if (!show) return undefined
    const title = t('ticketLanding.docTitle', {
      city: show.city,
      bands: show.bands.map((b) => b.name).join(' + '),
    })
    document.title = title
    return undefined
  }, [show, t])

  useEffect(() => {
    if (!show) return undefined
    initAnalytics()
    trackPageView(
      `/entradas/${show.slug}`,
      `${show.city} · ${show.bands.map((b) => b.name).join(' + ')}`,
    )
    return undefined
  }, [show])

  if (!show) {
    return <Navigate to="/" replace />
  }

  const landingPath = `/entradas/${show.slug}`
  const bandLine = show.bands.map((b) => b.name).join(' + ')

  function handleTicketClick() {
    trackTicketClick({
      landingPath,
      city: show.city,
      venue: show.venue,
      ticketUrl: show.ticketUrl,
      slug: show.slug,
    })
  }

  return (
    <div className="tlp">
      <div
        className="tlp__bg"
        aria-hidden="true"
        style={{ backgroundImage: `url(${youtubePoster(show.heroVideoId)})` }}
      >
        <iframe
          src={youtubeBackgroundEmbed(show.heroVideoId)}
          title=""
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          tabIndex={-1}
        />
      </div>
      <div className="tlp__veil" aria-hidden="true" />

      <header className="tlp__top">
        <LanguageSwitch />
      </header>

      <main className="tlp__hero">
        <img
          src={LOGO}
          alt="Silly Sally"
          className="tlp__logo"
          width={360}
          height={120}
        />
        <p className="tlp__city">{show.city}</p>
        <h1 className="tlp__bands">{bandLine}</h1>
        <p className="tlp__meta">
          {show.day} {show.month} {show.year} · {show.venue} · {show.time}
        </p>
        <p className="tlp__lead">{t('ticketLanding.lead')}</p>

        <a
          href={show.ticketUrl}
          className="tlp__cta"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleTicketClick}
          data-track="ticket_click"
        >
          {t('ticketLanding.cta')}
        </a>
      </main>

      <section
        className="tlp__videos"
        aria-label={t('ticketLanding.videosLabel')}
      >
        <div className="tlp__videos-inner">
          {show.bands.map((band) => (
            <BandVideo
              key={band.name}
              band={band}
              placeholderLabel={t('ticketLanding.videoSoon')}
            />
          ))}
        </div>
      </section>

      <footer className="tlp__footer">
        <a
          href={INSTAGRAM_URL}
          className="tlp__secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('ticketLanding.instagram')}
        </a>
        <Link to="/" className="tlp__secondary tlp__secondary--ghost">
          {t('ticketLanding.website')}
        </Link>
      </footer>
    </div>
  )
}
