import './Hero.css'

const HERO_BG = '/IMG_9700.JPG'

export default function Hero () {
  return (
    <header className="hero">
      <div
        className="hero__background"
        style={ { backgroundImage: `url(${HERO_BG})` } }
        aria-hidden="true"
      />
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__content">
        <p className="hero__tagline">Punk Rock · Madrid</p>
      </div>
    </header>
  )
}
