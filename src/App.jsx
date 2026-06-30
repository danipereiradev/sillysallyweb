import Nav from './components/Nav'
import Hero from './components/Hero'
import SpotifySection from './components/SpotifySection'
import ConcertList from './components/ConcertList'
import './App.css'

function App() {
  return (
    <div className="app">
      <Nav />
      <Hero />
      <main>
        <SpotifySection />
        <ConcertList />
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Silly Sally · Punk Rock Madrid</p>
      </footer>
    </div>
  )
}

export default App
