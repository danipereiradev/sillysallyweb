import Nav from './components/Nav'
import Hero from './components/Hero'
import SpotifySection from './components/SpotifySection'
import BioSection from './components/BioSection'
import InstagramSection from './components/InstagramSection'
import MerchSection from './components/MerchSection'
import ConcertList from './components/ConcertList'
import BookingsCTA from './components/BookingsCTA'
import { useLanguage } from './i18n/LanguageContext'
import './App.css'

function App() {
  const { t } = useLanguage()

  return (
    <div className="app">
      <div className="app__bg" aria-hidden="true" />
      <Nav />
      <Hero />
      <main className="app__boxed">
        <BioSection />
        <SpotifySection />
        <ConcertList />
        <MerchSection />
        <BookingsCTA />
        <InstagramSection />
      </main>
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Silly Sally · {t('footer.tagline')}
        </p>
      </footer>
    </div>
  )
}

export default App
