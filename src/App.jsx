import Nav from './components/Nav'
import Hero from './components/Hero'
import SpotifySection from './components/SpotifySection'
import BioSection from './components/BioSection'
import MerchSection from './components/MerchSection'
import ConcertList from './components/ConcertList'
import PastConcerts from './components/PastConcerts'
import BookingsCTA from './components/BookingsCTA'
import './App.css'

function App() {
  return (
    <div className="app">
      <div className="app__bg" aria-hidden="true" />
      <Nav />
      <Hero />
      <main className="app__boxed">
        <SpotifySection />
        <BioSection />
        <BookingsCTA />
        <MerchSection />
        <ConcertList />
        <PastConcerts />
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Silly Sally · Punk Rock Madrid</p>
      </footer>
    </div>
  )
}

export default App
