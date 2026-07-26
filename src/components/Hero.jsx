import './Hero.css'

const HERO_BG = '/IMG_9700.JPG'

export default function Hero() {
  return (
    <header className="hero">
      <div
        className="hero__background"
        style={{ backgroundImage: `url(${HERO_BG})` }}
        aria-hidden="true"
      />
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__content">
        <h1 className="hero__title">Punk Rock desde Madrid</h1>
        <p className="hero__description">
          Escucha nuestra música, consulta las próximas fechas y cómprate algo de
          merch.
        </p>
      </div>
    </header>
  )
}
