import { Link, Navigate, useParams } from 'react-router-dom'
import { getNewsBySlug } from '../data/news'
import { useLanguage } from '../i18n/LanguageContext'
import './NewsArticlePage.css'

function formatDate(dateIso, lang) {
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${dateIso}T12:00:00`))
}

export default function NewsArticlePage() {
  const { slug } = useParams()
  const { t, lang } = useLanguage()
  const article = getNewsBySlug(slug)

  if (!article) {
    return <Navigate to="/#noticias" replace />
  }

  const title = article.title[lang] || article.title.en
  const paragraphs = article.body[lang] || article.body.en

  return (
    <article className="news-article">
      <div className="news-article__hero">
        <img
          src={article.image}
          alt=""
          className="news-article__hero-image"
        />
      </div>

      <div className="news-article__inner">
        <Link to="/#noticias" className="news-article__back">
          ← {t('news.back')}
        </Link>

        <time className="news-article__date" dateTime={article.date}>
          {formatDate(article.date, lang)}
        </time>

        <h1 className="news-article__title">{title}</h1>

        <div className="news-article__body">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  )
}
