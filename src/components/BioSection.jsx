import { T, useLanguage } from '../i18n/LanguageContext'
import './BioSection.css'

const BIO_PHOTO = '/conciertos/silly-sally-fotomaton-granada.jpg'

const MEMBERS = [
  { name: 'Sam', roleKey: 'bio.members.sam' },
  { name: 'Jose', roleKey: 'bio.members.jose' },
  { name: 'Sergio', roleKey: 'bio.members.sergio' },
  { name: 'Dani Pereira', roleKey: 'bio.members.dani' },
]

export default function BioSection() {
  const { t } = useLanguage()

  return (
    <section className="bio" id="bio">
      <div className="bio__inner">
        <h2 className="bio__title">{t('bio.title')}</h2>

        <div className="bio__top">
          <div className="bio__photo-wrap">
            <img
              src={BIO_PHOTO}
              alt={t('bio.photoAlt')}
              className="bio__photo"
              loading="lazy"
            />
          </div>

          <ul className="bio__members">
            {MEMBERS.map((member) => (
              <li key={member.name} className="bio__member">
                <span className="bio__member-name">{member.name}</span>
                <span className="bio__member-role">{t(member.roleKey)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bio__text">
          <T k="bio.p1" as="p" />
          <T k="bio.p2" as="p" />
          <T k="bio.p3" as="p" />
          <T k="bio.p4" as="p" />
          <T k="bio.p5" as="p" />
        </div>
      </div>
    </section>
  )
}
