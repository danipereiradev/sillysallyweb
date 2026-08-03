import { useLanguage } from '../i18n/LanguageContext'
import './ConcertCard.css'

function formatSupport(support, t) {
  if (!support?.length) return ''
  const names = support.map((item) =>
    item === 'bandTbd' ? t('concerts.bandTbd') : item,
  )
  return `${t('concerts.with')} ${names.join(' + ')}`
}

export default function ConcertCard({ concert }) {
  const { t } = useLanguage()
  const isPast = concert.status === 'past'
  const isUpcoming = concert.status === 'upcoming'
  const isDisabled = isPast || concert.url === '#'

  const venue = concert.venueKey
    ? t(`concerts.${concert.venueKey}`)
    : concert.venue
  const time = concert.timeKey
    ? t(`concerts.${concert.timeKey}`)
    : concert.time
  const info = formatSupport(concert.support, t)

  const buttonLabel = isPast
    ? t('concerts.finished')
    : concert.url === '#'
      ? t('concerts.comingSoon')
      : t('concerts.tickets')

  return (
    <article
      className={[
        'concert-card',
        isPast && 'concert-card--past',
        isUpcoming && 'concert-card--upcoming',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="concert-card__date">
        <span className="concert-card__day">{concert.day}</span>
        <span className="concert-card__month">{concert.month}</span>
      </div>

      <div className="concert-card__body">
        <h3 className="concert-card__city">{concert.city}</h3>
        <p className="concert-card__venue">{venue}</p>
        <div className="concert-card__meta">
          <span className="concert-card__time">{time}</span>
          <span className="concert-card__separator" aria-hidden="true">
            ·
          </span>
          <span className="concert-card__info">{info}</span>
        </div>
        {isPast && (
          <span className="concert-card__badge concert-card__badge--past">
            {t('concerts.past')}
          </span>
        )}
      </div>

      <div className="concert-card__action">
        {isDisabled ? (
          <span className="concert-card__btn concert-card__btn--disabled">
            {buttonLabel}
          </span>
        ) : (
          <a
            href={concert.url}
            className="concert-card__btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            {buttonLabel}
          </a>
        )}
      </div>
    </article>
  )
}
