import { useEffect, useState } from 'react'
import './Nav.css'

const LOGO = encodeURI('/Silly Sally Logo solo.png')

const LINKS = [
  { label: 'Música', href: '#spotify' },
  { label: 'Merch', href: '#merch' },
  { label: 'Fechas', href: '#concerts' },
]

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/sillysallyband',
    icon: 'facebook',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/sillysallycrew',
    icon: 'instagram',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@sillysallyband7834',
    icon: 'youtube',
  },
  {
    label: 'Contacto',
    href: 'mailto:sillysallycrew@yahoo.es',
    icon: 'mail',
  },
]

function NavIcon({ name }) {
  switch (name) {
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
          />
        </svg>
      )
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
          />
        </svg>
      )
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
          />
        </svg>
      )
    case 'mail':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
          />
        </svg>
      )
    default:
      return null
  }
}

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.matchMedia('(min-width: 640px)').matches) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', closeOnDesktop)
    return () => window.removeEventListener('resize', closeOnDesktop)
  }, [])

  const closeMenu = () => setIsOpen(false)

  return (
    <nav
      className={`nav${isOpen ? ' nav--open' : ''}`}
      aria-label="Navegación principal"
    >
      <div className="nav__inner">
        <a
          href="#"
          className="nav__logo-link"
          aria-label="Silly Sally — inicio"
          onClick={closeMenu}
        >
          <img src={LOGO} alt="" className="nav__logo" />
        </a>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={isOpen}
          aria-controls="nav-menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="nav__toggle-icon" aria-hidden="true" />
          <span className="sr-only">{isOpen ? 'Cerrar menú' : 'Abrir menú'}</span>
        </button>

        <div className="nav__panel" id="nav-menu">
          <div className="nav__panel-inner">
            <ul className="nav__list">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="nav__link" onClick={closeMenu}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <ul className="nav__social">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="nav__icon-link"
                    target={
                      link.href.startsWith('mailto:') ? undefined : '_blank'
                    }
                    rel={
                      link.href.startsWith('mailto:')
                        ? undefined
                        : 'noopener noreferrer'
                    }
                    aria-label={link.label}
                    onClick={closeMenu}
                  >
                    <NavIcon name={link.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
