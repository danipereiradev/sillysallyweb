import './Nav.css'

const LINKS = [
  { label: 'Música', href: '#spotify' },
  { label: 'Fechas', href: '#concerts' },
]

export default function Nav() {
  return (
    <nav className="nav" aria-label="Navegación principal">
      <ul className="nav__list">
        {LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="nav__link">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
