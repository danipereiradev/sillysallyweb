import { Link } from 'react-router-dom'
import { newsArticles } from '../data/news'
import { useLanguage } from '../i18n/LanguageContext'
import './NewsSection.css'

function formatDate(dateIso, lang) {
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${dateIso}T12:00:00`))
}

export default function NewsSection() {
  const { t, lang } = useLanguage()

  return (
    <section className="news" id="noticias">
      <div className="news__inner">
        <h2 className="news__title">{t('news.title')}</h2>

        <ul className="news__list">
          {newsArticles.map((article) => (
            <li key={article.slug}>
              <Link
                to={`/noticias/${article.slug}`}
                className="news-card"
              >
                <div className="news-card__image-wrap">
                  <img
                    src={article.image}
                    alt=""
                    className="news-card__image"
                    loading="lazy"
                  />
                </div>
                <div className="news-card__body">
                  <time
                    className="news-card__date"
                    dateTime={article.date}
                  >
                    {formatDate(article.date, lang)}
                  </time>
                  <h3 className="news-card__title">
                    {article.title[lang] || article.title.en}
                  </h3>
                  <p className="news-card__excerpt">
                    {article.excerpt[lang] || article.excerpt.en}
                  </p>
                  <span className="news-card__more">{t('news.readMore')}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
