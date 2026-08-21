import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import HomePage from './pages/HomePage'
import NewsArticlePage from './pages/NewsArticlePage'
import LandingHayAllergy from './pages/LandingHayAllergy'
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
  const { pathname } = useLocation()
  const isAdLanding = pathname.startsWith('/hay-allergy')

  return (
    <div className={`app${isAdLanding ? ' app--landing' : ''}`}>
      {!isAdLanding && <div className="app__bg" aria-hidden="true" />}
      {!isAdLanding && <Nav />}
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hay-allergy" element={<LandingHayAllergy />} />
        <Route
          path="/noticias/:slug"
          element={
            <main className="app__news">
              <NewsArticlePage />
            </main>
          }
        />
      </Routes>
      {!isAdLanding && (
        <footer className="footer">
          <p>
            © {new Date().getFullYear()} Silly Sally · {t('footer.tagline')}
          </p>
        </footer>
      )}
    </div>
  )
}

export default App
