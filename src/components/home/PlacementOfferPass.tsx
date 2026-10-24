import React, { useState, useEffect, useRef } from 'react'
import { CheckCircle2, ShieldCheck, Sparkles, Building2 } from 'lucide-react'
import './PlacementOfferPass.css'

interface OfferPreset {
  id: string
  company: string
  role: string
  packageStr: string
  lpa: number
  oaPercentile: string
  questionsCleared: number
  benchmarkTime: string
  color: string
  badgeText: string
}

const OFFER_PRESETS: OfferPreset[] = [
  {
    id: 'google',
    company: 'Google',
    role: 'Software Development Engineer I (SDE-1)',
    packageStr: '₹45,00,000 / yr',
    lpa: 45,
    oaPercentile: '98.8%',
    questionsCleared: 380,
    benchmarkTime: '24m',
    color: '#FACC15',
    badgeText: 'Mountain View · Silicon Valley',
  },
  {
    id: 'meta',
    company: 'Meta',
    role: 'Software Engineer — AI Infrastructure',
    packageStr: '₹50,00,000 / yr',
    lpa: 50,
    oaPercentile: '99.2%',
    questionsCleared: 290,
    benchmarkTime: '21m',
    color: '#8B5CF6',
    badgeText: 'Menlo Park · London',
  },
  {
    id: 'microsoft',
    company: 'Microsoft',
    role: 'Software Engineer — Cloud & AI',
    packageStr: '₹42,00,000 / yr',
    lpa: 42,
    oaPercentile: '98.4%',
    questionsCleared: 320,
    benchmarkTime: '26m',
    color: '#0284C7',
    badgeText: 'Redmond · Bengaluru',
  },
  {
    id: 'nvidia',
    company: 'NVIDIA',
    role: 'Systems Software Engineer — CUDA Core',
    packageStr: '₹42,00,000 / yr',
    lpa: 42,
    oaPercentile: '98.6%',
    questionsCleared: 175,
    benchmarkTime: '28m',
    color: '#22C55E',
    badgeText: 'Santa Clara · Pune',
  },
  {
    id: 'amazon',
    company: 'Amazon',
    role: 'SDE-1 — High-Throughput Services',
    packageStr: '₹38,00,000 / yr',
    lpa: 38,
    oaPercentile: '97.9%',
    questionsCleared: 420,
    benchmarkTime: '25m',
    color: '#F97316',
    badgeText: 'Seattle · Hyderabad',
  },
]

const LIVE_SUCCESS_FEED = [
  { student: 'Ananya S. (Campus 2026)', company: 'Google', pkg: '₹45 LPA' },
  { student: 'Rohan M. (Tier-2 College)', company: 'Meta', pkg: '₹50 LPA' },
  { student: 'Karthik V. (Fresh Graduate)', company: 'Microsoft', pkg: '₹42 LPA' },
  { student: 'Sneha P. (Engineering Lead)', company: 'NVIDIA', pkg: '₹42 LPA' },
  { student: 'Aditya K. (Self-Taught Dev)', company: 'Amazon', pkg: '₹38 LPA' },
]

export default function PlacementOfferPass() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [feedIdx, setFeedIdx] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const activeOffer = OFFER_PRESETS[activeIdx]

  // Auto-cycle through the live placement success stories ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setFeedIdx(prev => (prev + 1) % LIVE_SUCCESS_FEED.length)
    }, 3800)
    return () => clearInterval(timer)
  }, [])

  // Interactive 3D perspective tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rotX = -(y / (rect.height / 2)) * 8
    const rotY = (x / (rect.width / 2)) * 8
    setTilt({ x: rotX, y: rotY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div className="placement-pass-wrap">
      {/* Ambient background glow */}
      <div
        className="placement-pass__glow"
        style={{
          background: `radial-gradient(circle at 60% 40%, ${activeOffer.color}33 0%, rgba(136, 117, 255, 0.18) 50%, transparent 70%)`
        }}
      />

      {/* Main Holographic Offer Pass Card */}
      <div
        ref={cardRef}
        className="placement-pass__card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        <div className="placement-pass__glare" />

        {/* Top Header: Verified Offer Status */}
        <div className="placement-pass__header">
          <div className="placement-pass__status">
            <span className="placement-pass__pulse-dot" />
            <span>Campus Offer Secured</span>
          </div>
          <span className="placement-pass__batch">Fresh 2026 Drive</span>
        </div>

        {/* Company & Role Details */}
        <div className="placement-pass__body">
          <div className="placement-pass__company-row">
            <div>
              <h3 className="placement-pass__company-name">{activeOffer.company}</h3>
              <div className="placement-pass__role">{activeOffer.role}</div>
            </div>
            <div className="placement-pass__ctc-badge">
              ₹{activeOffer.lpa} LPA
            </div>
          </div>
        </div>

        {/* Candidate Assessment Metrics */}
        <div className="placement-pass__metrics">
          <div className="pass-metric">
            <span className="pass-metric__val highlight">{activeOffer.oaPercentile}</span>
            <span className="pass-metric__label">OA Percentile</span>
          </div>
          <div className="pass-metric">
            <span className="pass-metric__val">{activeOffer.questionsCleared}+</span>
            <span className="pass-metric__label">Patterns Solved</span>
          </div>
          <div className="pass-metric">
            <span className="pass-metric__val">&lt; {activeOffer.benchmarkTime}</span>
            <span className="pass-metric__label">Speed Benchmark</span>
          </div>
        </div>

        {/* Cryptographic Verification Seal */}
        <div className="placement-pass__footer">
          <div className="placement-pass__seal">
            <ShieldCheck size={14} className="placement-pass__seal-icon" />
            <span className="placement-pass__seal-text">DKoder Certified Offer</span>
          </div>
          <span className="placement-pass__id">CREDENTIAL #DK-2026-{8800 + activeOffer.lpa * 12}</span>
        </div>
      </div>

      {/* Quick Interactive Offer Switcher */}
      <div className="placement-pass__switcher" role="tablist" aria-label="Preview Dream Company Offers">
        {OFFER_PRESETS.map((preset, idx) => {
          const isActive = idx === activeIdx
          return (
            <button
              key={preset.id}
              type="button"
              className={`pass-switch-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveIdx(idx)}
            >
              {preset.company} ({preset.lpa}L)
            </button>
          )
        })}
      </div>

      {/* Live Placed Students Ticker */}
      <div className="placement-ticker" aria-live="polite">
        <span className="placement-ticker__live">
          <span className="placement-ticker__dot" />
          Live
        </span>
        <span className="placement-ticker__text">
          {LIVE_SUCCESS_FEED[feedIdx].student} secured <strong>{LIVE_SUCCESS_FEED[feedIdx].company}</strong>
          <span className="placement-ticker__pkg">{LIVE_SUCCESS_FEED[feedIdx].pkg}</span>
        </span>
      </div>
    </div>
  )
}
