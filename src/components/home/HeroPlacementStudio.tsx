import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, CheckCircle2, Building2, ShieldCheck } from 'lucide-react'
import './HeroPlacementStudio.css'

export default function HeroPlacementStudio() {
  return (
    <div className="hero-showcase">
      {/* Sleek Window Frame Bar */}
      <div className="hero-showcase__window-bar">
        <div className="hero-showcase__traffic-lights">
          <span className="window-dot red" />
          <span className="window-dot yellow" />
          <span className="window-dot green" />
        </div>
        <div className="hero-showcase__window-title">
          <span className="window-pulse-dot" />
          <span>DKODER CAREER ENGINE · CAMPUS PLACEMENTS</span>
        </div>
        <div className="hero-showcase__status-tag">
          <ShieldCheck size={12} className="shield-icon" />
          <span>RECRUITER VERIFIED</span>
        </div>
      </div>

      {/* Main Visual Stage */}
      <div className="hero-showcase__stage">
        {/* The Hero Motto Image */}
        <img
          src="/assets/dkoder-career-motto.jpg"
          alt="DKODER: Master Coding. Crack Placements. Engineering students achieving their dream tech career with the DKoder AI companion"
          className="hero-showcase__image"
          loading="eager"
        />

        {/* Subtle, Premium Floating Badges */}
        <motion.div
          className="hero-showcase__float-badge badge-top-right"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="badge-glow" />
          <Sparkles size={13} className="badge-icon gold-icon" />
          <div className="badge-content">
            <span className="badge-title">₹10 LPA – ₹42+ LPA</span>
            <span className="badge-sub">Dream Packages</span>
          </div>
        </motion.div>

        <motion.div
          className="hero-showcase__float-badge badge-bottom-left"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <CheckCircle2 size={14} className="badge-icon green-icon" />
          <div className="badge-content">
            <span className="badge-title">14/14 Tests Passed</span>
            <span className="badge-sub">Real Recruiter Testcases</span>
          </div>
        </motion.div>

        <motion.div
          className="hero-showcase__float-badge badge-bottom-right"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Building2 size={13} className="badge-icon orange-icon" />
          <div className="badge-content">
            <span className="badge-title">Google · Zoho · TCS</span>
            <span className="badge-sub">500+ Companies Tagged</span>
          </div>
        </motion.div>
      </div>

      {/* Clean Bottom Trust Strip */}
      <div className="hero-showcase__footer">
        <span className="footer-tagline">
          From college classrooms to top tech companies — calibrate your roadmap & master every round.
        </span>
      </div>
    </div>
  )
}
