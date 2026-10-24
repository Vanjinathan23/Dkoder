import { motion } from 'framer-motion'
import HeroPlacementStudio from './HeroPlacementStudio'
import './HeroEngine.css'

const TICKER_ITEMS = [
  { company: 'TCS NQT', role: 'Advanced Coding', ctc: '₹11.5 LPA Prime', badge: 'Verified' },
  { company: 'Infosys', role: 'InfyTQ / HackWithInfy', ctc: '₹9.5 LPA SP', badge: 'Verified' },
  { company: 'Google', role: 'SDE-II / OA', ctc: '₹42 LPA', badge: 'Verified' },
  { company: 'Microsoft', role: 'SWE / Cloud Intern', ctc: '₹1.25L/mo', badge: 'Verified' },
  { company: 'Amazon', role: 'SDE-1 Assessment', ctc: '₹34 LPA', badge: 'Verified' },
  { company: 'Cognizant', role: 'GenC Next', ctc: '₹9.2 LPA', badge: 'Verified' },
  { company: 'ServiceNow', role: 'Cloud Diagnostics', ctc: '₹28 LPA', badge: 'Verified' },
  { company: 'Wipro', role: 'NLTH / Turbo', ctc: '₹8.5 LPA', badge: 'Verified' },
]

export default function HeroEngine() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-heading">
      {/* Background bright studio atmosphere */}
      <div className="hero__backdrop" aria-hidden="true">
        <div className="hero__backdrop-gradient" />
        <div className="hero__grid-mesh" />
      </div>

      {/* Main hero grid */}
      <div className="hero__content container">
        {/* Left column — Typography & Action */}
        <motion.div
          className="hero__left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow badge */}
          <div className="hero__eyebrow">
            <span className="tag tag--yellow hero__eyebrow-tag">
              <span className="hero__pulse-dot" />
              <span>THE CAREER ENGINE FOR ENGINEERS</span>
            </span>
          </div>

          {/* Bold High-Impact Headline */}
          <h1 id="hero-heading" className="hero__heading">
            <span className="hero__heading-row">
              <span className="hero__word">Master</span>{' '}
              <span className="hero__word">Coding.</span>
            </span>
            <span className="hero__heading-row">
              <span className="hero__heading-accent">Crack Placements.</span>
            </span>
          </h1>

          {/* Clean, Direct Subtext */}
          <p className="hero__sub">
            Prepare with 12,500+ company-tagged questions from 500+ top recruiters.
            Run code instantly in-browser, master topic tracks, and prepare for campus placement drives.
          </p>

          {/* CTAs */}
          <div className="hero__ctas">
            <motion.a
              href="https://dkoder.co.in/register"
              className="hero__btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Get Started Free</span>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>

            <a href="#practice" className="hero__btn-ghost">
              <span>Explore Questions</span>
              <span className="hero__btn-arrow" aria-hidden="true">↓</span>
            </a>
          </div>

          {/* Clean Metric Badges */}
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-value">12,500+</span>
              <span className="hero__stat-label">Coding Questions</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-value">500+</span>
              <span className="hero__stat-label">Recruiters Tagged</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-value">150+</span>
              <span className="hero__stat-label">Partner Colleges</span>
            </div>
          </div>
        </motion.div>

        {/* Right column — The Authentic DKODER Placement & Dialogue Studio */}
        <motion.div
          className="hero__right"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroPlacementStudio />
        </motion.div>
      </div>

      {/* Recruiter hiring ticker */}
      <div className="hero__ticker" aria-label="Verified recruitment drives">
        <div className="hero__ticker-badge">
          <span className="hero__pulse-dot" />
          <span>VERIFIED DRIVES</span>
        </div>
        <div className="hero__ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <div key={idx} className="hero__ticker-card">
              <span className="hero__ticker-company">{item.company}</span>
              <span className="hero__ticker-role">{item.role}</span>
              <span className="hero__ticker-ctc">{item.ctc}</span>
              <span className="hero__ticker-status">{item.badge}</span>
              <span className="hero__ticker-sep">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
