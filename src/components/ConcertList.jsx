import { concerts } from '../data/concerts'
import { useLanguage } from '../i18n/LanguageContext'
import ConcertCard from './ConcertCard'
import './ConcertList.css'

export default function ConcertList() {
  const { t } = useLanguage()

  return (
    <section className="concerts" id="concerts">
      <div className="concerts__inner">
        <h2 className="concerts__title">{t('concerts.title')}</h2>
        <ul className="concerts__list">
          {concerts.map((concert) => (
            <li key={`${concert.day}-${concert.month}-${concert.city}`}>
              <ConcertCard concert={concert} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
