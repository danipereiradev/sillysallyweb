import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import HomePage from './pages/HomePage'
import NewsArticlePage from './pages/NewsArticlePage'
import { useLanguage } from './i18n/LanguageContext'
import './App.css'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 0)
      return () => window.clearTimeout(timer)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

function App() {
  const { t } = useLanguage()

  return (
    <div className="app">
      <div className="app__bg" aria-hidden="true" />
      <Nav />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/noticias/:slug"
          element={
            <main className="app__news">
              <NewsArticlePage />
            </main>
          }
        />
      </Routes>
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Silly Sally · {t('footer.tagline')}
        </p>
      </footer>
    </div>
  )
}

export default App
