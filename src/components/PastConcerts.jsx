import { useCallback, useEffect, useState } from 'react'
import { lastConcertGallery } from '../data/pastConcerts'
import './PastConcerts.css'

export default function PastConcerts() {
  const { city, day, month, year, venue, images } = lastConcertGallery
  const [activeImage, setActiveImage] = useState(null)

  const closeLightbox = useCallback(() => setActiveImage(null), [])

  useEffect(() => {
    if (!activeImage) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeLightbox()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeImage, closeLightbox])

  return (
    <section className="past-concerts" id="galeria">
      <div className="past-concerts__inner">
        <h2 className="past-concerts__title">Galería</h2>

        <div className="past-concerts__show">
          <ul className="past-concerts__gallery">
            {images.map((image, index) => (
              <li key={`${lastConcertGallery.id}-${index}`}>
                <button
                  type="button"
                  className="gallery-item"
                  onClick={() => setActiveImage(image)}
                  aria-label={`Ver foto ${index + 1} de ${city} a tamaño completo`}
                >
                  <img
                    src={image}
                    alt={`${city} — foto ${index + 1}`}
                    className="gallery-item__image"
                    loading="lazy"
                  />
                </button>
              </li>
            ))}
          </ul>

          <p className="past-concerts__info">
            <span className="past-concerts__city">{city}</span>
            <span className="past-concerts__meta">
              {day} {month} {year} · {venue}
            </span>
          </p>
        </div>
      </div>

      {activeImage && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Imagen ampliada"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="gallery-lightbox__close"
            onClick={closeLightbox}
            aria-label="Cerrar imagen"
          >
            ×
          </button>
          <img
            src={activeImage}
            alt={`${city} — vista ampliada`}
            className="gallery-lightbox__image"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
