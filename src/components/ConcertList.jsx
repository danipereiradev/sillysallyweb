import { concerts } from '../data/concerts'
import ConcertCard from './ConcertCard'
import './ConcertList.css'

export default function ConcertList() {
  return (
    <section className="concerts" id="concerts">
      <div className="concerts__inner">
        <h2 className="concerts__title">Próximos conciertos</h2>
        <ul className="concerts__list">
          {concerts.map((concert) => (
            <li key={`${concert.day}-${concert.month}-${concert.city}`}>
              <ConcertCard concert={concert} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
