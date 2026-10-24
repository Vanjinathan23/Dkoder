import { motion } from 'framer-motion'
import PlacementOfferPass from './PlacementOfferPass'
import './FinalCTASection.css'

export default function FinalCTASection() {
  return (
    <section className="final-cta" aria-labelledby="final-cta-heading">
      <div className="container">
        <div className="final-cta__card">
          {/* Subtle grid pattern background */}
          <div className="final-cta__grid-pattern" aria-hidden="true" />

          <div className="final-cta__layout">
            {/* Left Content */}
            <div className="final-cta__content">
              <div className="section-badge">
                <span className="section-badge__dot" />
                <span>Placement Preparation</span>
              </div>

              <h2 id="final-cta-heading" className="final-cta__heading">
                Ready to Land Your Dream Placement?
              </h2>

              <p className="final-cta__sub">
                Join students from 150+ engineering campuses preparing with verified company question banks and real-time coding practice.
              </p>

              <div className="final-cta__actions">
                <motion.a
                  href="https://dkoder.co.in/register"
                  className="final-cta__btn-primary"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Get Started Free</span>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.a>

                <motion.a
                  href="#colleges"
                  className="final-cta__btn-secondary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Schedule College Demo</span>
                </motion.a>
              </div>

              {/* Trust Badges */}
              <div className="final-cta__trust-row">
                <div className="trust-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13.333 4L6 11.333 2.667 8" stroke="#17191C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>₹1,000 Flat for 4 Years</span>
                </div>
                <div className="trust-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13.333 4L6 11.333 2.667 8" stroke="#17191C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Zero Video Upload Privacy</span>
                </div>
                <div className="trust-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13.333 4L6 11.333 2.667 8" stroke="#17191C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Zero Recurring Renewals</span>
                </div>
              </div>
            </div>

            {/* Right: Interactive Placement Offer Pass Showcase */}
            <div className="final-cta__canvas-box">
              <PlacementOfferPass />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
