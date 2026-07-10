import dossier from '../assets/Silly Sally Dossier 2026.pdf'
import './BookingsCTA.css'

const CTA_BG = '/contrataciones.jpeg'
const BOOKING_EMAIL = 'sillysallycrew@yahoo.es'

export default function BookingsCTA() {
  return (
    <section className="bookings-cta" id="contrataciones">
      <div
        className="bookings-cta__parallax"
        style={{ backgroundImage: `url(${CTA_BG})` }}
        aria-hidden="true"
      />
      <div className="bookings-cta__overlay" aria-hidden="true" />
      <div className="bookings-cta__content">
        <h2 className="bookings-cta__title">Contrataciones</h2>
        <p className="bookings-cta__text">
          ¿Quieres traer Silly Sally a tu sala o festival? Escríbenos y hablamos.
        </p>
        <div className="bookings-cta__actions">
          <a href={`mailto:${BOOKING_EMAIL}`} className="bookings-cta__btn">
            Contactar para contratar
          </a>
          <a
            href={dossier}
            className="bookings-cta__btn bookings-cta__btn--secondary"
            download="Silly-Sally-Dossier-2026.pdf"
          >
            Descargar dossier
          </a>
        </div>
      </div>
    </section>
  )
}
