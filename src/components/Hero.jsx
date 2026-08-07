import { useLanguage } from '../i18n/LanguageContext'
import './Hero.css'

const HERO_BG = '/IMG_9700.JPG'

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
      </div>
    </header>
  )
}
