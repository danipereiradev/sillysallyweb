import Hero from './components/Hero'
import ConcertList from './components/ConcertList'
import './App.css'

function App() {
  return (
    <div className="app">
      <Hero />
      <main>
        <ConcertList />
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Silly Sally · Punk Rock Madrid</p>
      </footer>
    </div>
  )
}

export default App
