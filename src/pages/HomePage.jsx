import Hero from '../components/Hero'
import SpotifySection from '../components/SpotifySection'
import BioSection from '../components/BioSection'
import ConcertList from '../components/ConcertList'
import InstagramSection from '../components/InstagramSection'
import MerchSection from '../components/MerchSection'
import BookingsCTA from '../components/BookingsCTA'
import NewsSection from '../components/NewsSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <main className="app__boxed">
        <BioSection />
        <SpotifySection />
        <ConcertList />
        <NewsSection />
        <MerchSection />
        <BookingsCTA />
        <InstagramSection />
      </main>
    </>
  )
}
