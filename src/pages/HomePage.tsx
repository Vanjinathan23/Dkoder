import React, { useRef } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroEngine from '../components/home/HeroEngine'
import StudentQueries from '../components/home/StudentQueries'
import CompanyConstellationSection from '../components/home/CompanyConstellationSection'
import InterviewWorrySolver from '../components/home/InterviewWorrySolver'
import QuestionLab from '../components/home/QuestionLab'
import CareerTracks from '../components/home/CareerTracks'
import CollegeSection from '../components/home/CollegeSection'
import PricingSection from '../components/home/PricingSection'
import LeaderboardSection from '../components/home/LeaderboardSection'
import FAQSection from '../components/home/FAQSection'
import FinalCTASection from '../components/home/FinalCTASection'
import { useScrollReveal } from '../hooks/useScrollReveal'
import '../styles/cinematic-scroll.css'

export default function HomePage() {
  const mainRef = useRef<HTMLElement>(null)
  useScrollReveal({ scopeRef: mainRef })

  return (
    <>
      <Navbar />
      <main id="main-content" ref={mainRef} className="cinematic-page-content">
        <HeroEngine />
        <div data-scroll-reveal>
          <StudentQueries />
        </div>
        <div data-scroll-reveal>
          <CompanyConstellationSection />
        </div>
        <div data-scroll-reveal>
          <InterviewWorrySolver />
        </div>
        <div data-scroll-reveal>
          <QuestionLab />
        </div>
        <div data-scroll-reveal>
          <CareerTracks />
        </div>
        <div data-scroll-reveal>
          <CollegeSection />
        </div>
        <div data-scroll-reveal>
          <PricingSection />
        </div>
        <div data-scroll-reveal>
          <LeaderboardSection />
        </div>
        <div data-scroll-reveal>
          <FAQSection />
        </div>
        <div data-scroll-reveal>
          <FinalCTASection />
        </div>
      </main>
      <Footer />
    </>
  )
}
