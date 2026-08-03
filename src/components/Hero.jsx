import { useLanguage } from '../i18n/LanguageContext'
import './Hero.css'

const HERO_BG = '/IMG_9700.JPG'
const NEXT_SHOW_POSTER = '/img/carteles/silly-sally-concierto-logrono.jpeg'
const NEXT_SHOW_URL =
  'https://woutick.com/es/entradas/silly-sally-kontrol-mental-en-el-stereo-de-logrono'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <header className="hero">
      <div
        className="hero__background"
        style={{ backgroundImage: `url(${HERO_BG})` }}
        aria-hidden="true"
      />
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__content">
        <div className="hero__copy">
          <h1 className="hero__title">{t('hero.title')}</h1>
          <p className="hero__description">{t('hero.description')}</p>
        </div>

        <aside className="hero__next-show">
          <p className="hero__next-label">{t('hero.nextShow')}</p>
          <a
            href={NEXT_SHOW_URL}
            className="hero__poster-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={NEXT_SHOW_POSTER}
              alt={t('hero.posterAlt')}
              className="hero__poster"
            />
          </a>
        </aside>
      </div>
    </header>
  )
}
