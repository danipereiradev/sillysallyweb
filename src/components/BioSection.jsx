import './BioSection.css'

const BIO_PHOTO = '/conciertos/silly-sally-fotomaton-granada.jpg'

const MEMBERS = [
  { name: 'Sam', role: 'Voz' },
  { name: 'Jose', role: 'Guitarra y coros' },
  { name: 'Sergio', role: 'Bajo y coros' },
  { name: 'Dani Pereira', role: 'Batería' },
]

export default function BioSection() {
  return (
    <section className="bio" id="bio">
      <div className="bio__inner">
        <h2 className="bio__title">Bio</h2>

        <div className="bio__top">
          <div className="bio__photo-wrap">
            <img
              src={BIO_PHOTO}
              alt="Silly Sally en Granada"
              className="bio__photo"
              loading="lazy"
            />
          </div>

          <ul className="bio__members">
            {MEMBERS.map((member) => (
              <li key={member.name} className="bio__member">
                <span className="bio__member-name">{member.name}</span>
                <span className="bio__member-role">{member.role}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bio__text">
          <p>
            Silly Sally es una banda de punk-rock melódico de Madrid formada en
            marzo de 2011.
          </p>
          <p>
            En 2012 publicaron su primer EP, <em>Cranfield Before Fall</em>,
            grabado en Estudios Red Led. Ese mismo año,{' '}
            <em>Irish Summer Before Fall</em> fue elegida canción del videojuego
            oficial de la película <em>REC 3 Génesis</em> (Filmax).
          </p>
          <p>
            En 2013 llegó su primer LP, <em>Minor Fights and Major Fears</em>,
            editado por Wild Punk Records, con gira por España y actuación en el
            Festival Sick of Bean junto a Atlas Losing Grip, Burning Heads o No
            Children.
          </p>
          <p>
            Tras cambios de formación, en 2015 publicaron el single{' '}
            <em>Your Innate Ego</em> y en 2016 el EP <em>No Tales to Be Told</em>
            . En 2018 sacaron <em>Just a Call</em> y en 2020 el EP{' '}
            <em>Out of Range</em>, grabado en Anhell Studios y masterizado en
            Ultramarinos (Barcelona).
          </p>
          <p>
            En los últimos años han publicado singles grabados en La Caverna
            Estudios: <em>Be My Baby</em> (2022), <em>Hay Allergy</em> (2022),{' '}
            <em>Mírate</em> (2024) y <em>Sepsiembre</em> (2025), estos dos
            últimos en castellano.
          </p>
        </div>
      </div>
    </section>
  )
}
