import { useLanguage } from '../i18n/LanguageContext'
import './Hero.css'

const YT_VIDEO_ID = 'nkngZTnxqAU'
const YT_POSTER = `https://i.ytimg.com/vi/${YT_VIDEO_ID}/maxresdefault.jpg`
const YT_EMBED = `https://www.youtube-nocookie.com/embed/${YT_VIDEO_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${YT_VIDEO_ID}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1`

export default function Hero() {
  const { t } = useLanguage()

  return (
    <header className="hero">
      <div
        className="hero__background"
        style={{ backgroundImage: `url(${YT_POSTER})` }}
        aria-hidden="true"
      >
        <iframe
          className="hero__video"
          src={YT_EMBED}
          title=""
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          tabIndex={-1}
        />
      </div>
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__content">
        <div className="hero__copy">
          <h1 className="hero__title">{t('hero.title')}</h1>
          <p className="hero__description">{t('hero.description')}</p>
        </div>
      </div>
    </header>
  )
}
