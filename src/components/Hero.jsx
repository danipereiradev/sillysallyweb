import './Hero.css'

const HERO_BG = '/IMG_9700.JPG'
const LOGO = encodeURI('/Silly Sally Logo solo.png')

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
        <img src={LOGO} alt="Silly Sally" className="hero__logo" />
        <p className="hero__tagline">Punk Rock · Madrid</p>
      </div>
    </header>
  )
}
