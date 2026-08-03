import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import './InstagramSection.css'

const INSTAGRAM_PROFILE = 'https://www.instagram.com/sillysallyband'
const FALLBACK_USERNAME = 'sillysallyband'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="instagram__brand-icon">
      <path
        fill="currentColor"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
      />
    </svg>
  )
}

function PostThumb({ post, viewLabel }) {
  const isVideo = post.mediaType === 'VIDEO'
  const src = isVideo ? post.thumbnailUrl || post.mediaUrl : post.mediaUrl

  return (
    <a
      href={post.permalink}
      className="instagram__post"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={post.caption ? post.caption.slice(0, 80) : viewLabel}
    >
      {src ? (
        <img src={src} alt="" className="instagram__post-image" loading="lazy" />
      ) : (
        <div className="instagram__post-placeholder" />
      )}
      {isVideo && (
        <span className="instagram__post-badge" aria-hidden="true">
          ▶
        </span>
      )}
      {post.mediaType === 'CAROUSEL_ALBUM' && (
        <span className="instagram__post-badge" aria-hidden="true">
          ▦
        </span>
      )}
    </a>
  )
}

export default function InstagramSection() {
  const { t } = useLanguage()
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false

    async function loadFeed() {
      try {
        const response = await fetch('/api/instagram')
        if (!response.ok) {
          if (!cancelled) setStatus('error')
          return
        }
        const json = await response.json()
        if (!cancelled) {
          setData(json)
          setStatus('ready')
        }
      } catch {
        if (!cancelled) setStatus('error')
      }
    }

    loadFeed()
    return () => {
      cancelled = true
    }
  }, [])

  const username = data?.username || FALLBACK_USERNAME
  const avatar = data?.avatar
  const posts = data?.posts || []

  return (
    <section className="instagram" id="instagram">
      <div className="instagram__inner">
        <h2 className="instagram__title">{t('instagram.title')}</h2>

        <div className="instagram__profile">
          <div className="instagram__identity">
            {avatar ? (
              <img
                src={avatar}
                alt=""
                className="instagram__avatar"
                width={72}
                height={72}
              />
            ) : (
              <div className="instagram__avatar instagram__avatar--fallback">
                <InstagramIcon />
              </div>
            )}
            <div className="instagram__meta">
              <p className="instagram__username">@{username}</p>
              <p className="instagram__handle">Silly Sally · Punk Rock Madrid</p>
            </div>
          </div>

          <a
            href={INSTAGRAM_PROFILE}
            className="instagram__follow"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('instagram.follow')}
          </a>
        </div>

        {status === 'loading' && (
          <ul className="instagram__grid" aria-busy="true">
            {Array.from({ length: 6 }).map((_, index) => (
              <li key={index} className="instagram__skeleton" />
            ))}
          </ul>
        )}

        {status === 'ready' && posts.length > 0 && (
          <ul className="instagram__grid">
            {posts.map((post) => (
              <li key={post.id}>
                <PostThumb post={post} viewLabel={t('instagram.viewPost')} />
              </li>
            ))}
          </ul>
        )}

        {(status === 'error' || (status === 'ready' && posts.length === 0)) && (
          <div className="instagram__empty">
            <InstagramIcon />
            <p>{t('instagram.empty')}</p>
            <a
              href={INSTAGRAM_PROFILE}
              className="instagram__follow instagram__follow--inline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('instagram.goTo', { username: FALLBACK_USERNAME })}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
