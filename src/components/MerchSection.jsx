import { merchItems, MERCH_STORE_URL } from '../data/merch'
import { useLanguage } from '../i18n/LanguageContext'
import './MerchSection.css'

export default function MerchSection() {
  const { t } = useLanguage()

  return (
    <section className="merch" id="merch">
      <div className="merch__inner">
        <h2 className="merch__title">{t('merch.title')}</h2>

        <ul className="merch__grid">
          {merchItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.url}
                className="merch-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="merch-card__image-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="merch-card__image"
                    loading="lazy"
                  />
                </div>
                <div className="merch-card__body">
                  <h3 className="merch-card__title">{item.title}</h3>
                  <p className="merch-card__type">
                    {t(`merch.types.${item.type}`)}
                  </p>
                  <p className="merch-card__price">€{item.price} EUR</p>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <a
          href={MERCH_STORE_URL}
          className="merch__store-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('merch.storeLink')}
        </a>
      </div>
    </section>
  )
}
