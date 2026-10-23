import { useState, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import './HeroEngine.css'

const CareerOrbitCanvas = lazy(() => import('../3d/CareerOrbitCanvas'))

const STATS = [
  { value: '1,200+', label: 'Company-Tagged Questions', sub: 'Verified across 2023-2026' },
  { value: '94%',    label: 'Placement Clearance Rate', sub: 'Tier-1 & Tier-2 Colleges' },
  { value: '50+',    label: 'Active Recruiters',        sub: 'FAANG, Unicorns & PSUs' },
]

const TICKER_ITEMS = [
  { company: 'Google', role: 'SDE-2', ctc: '₹38 LPA', badge: 'Offer Released' },
  { company: 'Microsoft', role: 'SWE Intern', ctc: '₹1.25L/mo', badge: 'Interview Cleared' },
  { company: 'Amazon', role: 'SDE-1', ctc: '₹32 LPA', badge: 'Offer Released' },
  { company: 'Meta', role: 'Frontend Engineer', ctc: '₹44 LPA', badge: 'Offer Released' },
  { company: 'Infosys', role: 'Specialist Programmer', ctc: '₹9.5 LPA', badge: 'Drive Cleared' },
  { company: 'TCS', role: 'Prime Developer', ctc: '₹9.0 LPA', badge: 'Drive Cleared' },
  { company: 'Flipkart', role: 'SDE-1', ctc: '₹26 LPA', badge: 'Offer Released' },
  { company: 'NVIDIA', role: 'AI Systems', ctc: '₹42 LPA', badge: 'Offer Released' },
]

const HERO_COMPANIES = [
  { name: 'Google', color: '#17191C' },
  { name: 'Microsoft', color: '#8875FF' },
  { name: 'Amazon', color: '#FF7A29' },
  { name: 'Meta', color: '#17191C' },
  { name: 'NVIDIA', color: '#68B000' },
  { name: 'Flipkart', color: '#8875FF' },
]

export default function HeroEngine() {
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null)

  return (
    <section className="hero" aria-labelledby="hero-heading">
      {/* Background bright studio atmosphere */}
      <div className="hero__backdrop" aria-hidden="true">
        <img
          src="/assets/hero-orbit.jpg"
          alt=""
          className="hero__backdrop-img"
          loading="eager"
        />
        <div className="hero__backdrop-overlay" />
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
              <span>THE BRIGHT CAREER ENGINE · 2026 EDITION</span>
            </span>
          </div>

          {/* Bold High-Energy Headline */}
          <h1 id="hero-heading" className="hero__heading">
            <span className="hero__heading-row">
              <span className="hero__word">Launch</span>{' '}
              <span className="hero__word">Your</span>
            </span>
            <span className="hero__heading-row">
              <span className="hero__heading-accent">Career Orbit</span>
            </span>
            <span className="hero__heading-row">
              <span className="hero__word">At</span>{' '}
              <span className="hero__word-dim">Super-Dream</span>{' '}
              <span className="hero__word">Speed.</span>
            </span>
          </h1>

          {/* Subtext */}
          <p className="hero__sub">
            The high-energy placement intelligence platform for ambitious engineers.
            Solve 1,200+ company-specific DSA challenges, battle-test code in real time,
            and accelerate your readiness curve before campus drives start.
          </p>

          {/* CTAs */}
          <div className="hero__ctas">
            <motion.a
              href="https://dkoder.co.in/register"
              className="hero__btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Initialize Career Engine</span>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>

            <motion.a
              href="#practice"
              className="hero__btn-ghost"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <polygon points="5,3 13,8 5,13" />
              </svg>
              <span>Explore Question Lab</span>
            </motion.a>
          </div>

          {/* Quick interactive company targets */}
          <div className="hero__target-bar">
            <span className="hero__target-label">Target Recruiter:</span>
            <div className="hero__target-tags">
              {HERO_COMPANIES.map(c => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedBadge(prev => prev === c.name ? null : c.name)}
                  className={`hero__target-chip ${selectedBadge === c.name ? 'active' : ''}`}
                >
                  <span className="hero__chip-dot" style={{ background: c.color }} />
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="hero__stats" role="list">
            {STATS.map(s => (
              <div key={s.label} className="hero__stat" role="listitem">
                <div className="hero__stat-value">{s.value}</div>
                <div className="hero__stat-label">{s.label}</div>
                <div className="hero__stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right column — Bright 3D Studio Frame */}
        <div className="hero__right">
          <div className="hero__canvas-frame">
            {/* Top white glass toolbar */}
            <div className="hero__hud-header" aria-hidden="true">
              <div className="hero__hud-lights">
                <span className="hero__hud-light red" />
                <span className="hero__hud-light yellow" />
                <span className="hero__hud-light green" />
              </div>
              <div className="hero__hud-title">
                DKODER // CAREER_ORBIT_ENGINE :: STUDIO_CORE
              </div>
              <div className="hero__hud-mode">LIVE 3D</div>
            </div>

            {/* 3D Canvas */}
            <div className="hero__canvas-wrap">
              <Suspense fallback={<div className="hero__canvas-fallback"><div className="hero__spinner" /></div>}>
                <CareerOrbitCanvas />
              </Suspense>
            </div>

            {/* Bottom HUD info bar */}
            <div className="hero__hud-footer" aria-hidden="true">
              <div className="hero__hud-metric">
                <span className="lbl">NODES</span>
                <span className="val">8 RECRUITERS</span>
              </div>
              <div className="hero__hud-metric">
                <span className="lbl">TOPOLOGY</span>
                <span className="val">ASYMMETRIC DUAL-RING</span>
              </div>
              <div className="hero__hud-metric">
                <span className="lbl">INTERACTION</span>
                <span className="val">HOVER / RAYCAST</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Verified Placements Ticker */}
      <div className="hero__ticker" aria-label="Recent student verified offers">
        <div className="hero__ticker-badge">
          <span className="hero__ticker-pulse" />
          <span>VERIFIED OFFERS</span>
        </div>
        <div className="hero__ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div key={i} className="hero__ticker-card">
              <span className="hero__ticker-company">{item.company}</span>
              <span className="hero__ticker-role">{item.role}</span>
              <span className="hero__ticker-ctc">{item.ctc}</span>
              <span className="hero__ticker-status">{item.badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
