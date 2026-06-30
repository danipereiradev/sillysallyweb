import Nav from './components/Nav'
import Hero from './components/Hero'
import SpotifySection from './components/SpotifySection'
import MerchSection from './components/MerchSection'
import ConcertList from './components/ConcertList'
import BookingsCTA from './components/BookingsCTA'
import './App.css'

function App() {
  return (
    <div className="app">
      <Nav />
      <Hero />
      <main>
        <SpotifySection />
        <BookingsCTA />
        <MerchSection />
        <ConcertList />
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Silly Sally · Punk Rock Madrid</p>
      </footer>
    </div>
  )
}

export default App
