import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroEngine from '../components/home/HeroEngine'
import FeaturesGrid from '../components/home/FeaturesGrid'
import QuestionLab from '../components/home/QuestionLab'
import CareerTracks from '../components/home/CareerTracks'
import DailyPracticeSection from '../components/home/DailyPracticeSection'
import LeaderboardSection from '../components/home/LeaderboardSection'
import CollegeSection from '../components/home/CollegeSection'
import PricingSection from '../components/home/PricingSection'
import FAQSection from '../components/home/FAQSection'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroEngine />
        <FeaturesGrid />
        <QuestionLab />
        <CareerTracks />
        <DailyPracticeSection />
        <LeaderboardSection />
        <CollegeSection />
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}
