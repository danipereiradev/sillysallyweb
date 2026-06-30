import './BookingsCTA.css'

const CTA_BG = '/IMG_9693.JPG'
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
        <a href={`mailto:${BOOKING_EMAIL}`} className="bookings-cta__btn">
          Contactar para contratar
        </a>
      </div>
    </section>
  )
}
