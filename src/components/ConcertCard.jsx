import './ConcertCard.css'

export default function ConcertCard({ concert }) {
  const isPast = concert.status === 'Realizada'
  const isUpcoming = concert.status === 'Info próximamente'
  const isDisabled = isPast || concert.url === '#'

  const buttonLabel = isPast
    ? 'Finalizado'
    : concert.url === '#'
      ? 'Próximamente'
      : 'Entradas / Info'

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
        <p className="concert-card__venue">{concert.venue}</p>
        <div className="concert-card__meta">
          <span className="concert-card__time">{concert.time}</span>
          <span className="concert-card__separator" aria-hidden="true">
            ·
          </span>
          <span className="concert-card__info">{concert.info}</span>
        </div>
        {isPast && (
          <span className="concert-card__badge concert-card__badge--past">
            Realizada
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
