import { useLanguage } from '../i18n/LanguageContext'
import './LanguageSwitch.css'

const OPTIONS = [
  { code: 'es', label: 'ES', flag: '🇪🇸', name: 'Español' },
  { code: 'en', label: 'EN', flag: '🇬🇧', name: 'English' },
]

export default function LanguageSwitch() {
  const { lang, setLang, t } = useLanguage()

  return (
    <div
      className="lang-switch"
      role="group"
      aria-label={t('nav.language')}
    >
      {OPTIONS.map((option) => (
        <button
          key={option.code}
          type="button"
          className={`lang-switch__btn${
            lang === option.code ? ' lang-switch__btn--active' : ''
          }`}
          aria-pressed={lang === option.code}
          aria-label={option.name}
          onClick={() => setLang(option.code)}
        >
          <span className="lang-switch__flag" aria-hidden="true">
            {option.flag}
          </span>
          <span className="lang-switch__code">{option.label}</span>
        </button>
      ))}
    </div>
  )
}
