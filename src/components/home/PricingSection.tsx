import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Sparkles, ArrowRight, GraduationCap } from 'lucide-react'
import './PricingSection.css'

interface PricingTier {
  id: string
  name: string
  basePrice: number
  perDay: string
  targetLpa: string
  market: string
  badge?: string
  companies: string[]
  features: string[]
}

const TIERS: PricingTier[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    basePrice: 699,
    perDay: '₹2 a day',
    targetLpa: '0–3 LPA',
    market: 'Service Based Recruiter Questions',
    companies: ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant', 'IBM', 'Hexaware'],
    features: [
      'Daily coding challenges & streaks',
      'MCQ Aptitude Practice arena',
      'Fundamental coding questions',
      'Basic test reports',
      'Community leaderboard'
    ]
  },
  {
    id: 'silver',
    name: 'Silver',
    basePrice: 999,
    perDay: '₹3 a day',
    targetLpa: '0–5 LPA',
    market: 'Service Based Recruiter Questions',
    companies: ['TCS', 'Infosys', 'Hexaware', 'IBM', 'Microsoft', 'Amazon', 'Wipro'],
    features: [
      'Everything in Bronze',
      'Product company beginner challenges',
      'Speed drill practice mode',
      'Detailed test analytics & accuracy radar',
      'Bookmark & question history'
    ]
  },
  {
    id: 'gold',
    name: 'Gold',
    basePrice: 1599,
    perDay: '₹5 a day',
    targetLpa: '0–7 LPA',
    market: 'Service & Product Interview Questions',
    companies: ['Microsoft', 'Amazon', 'Adobe', 'TCS', 'Infosys', 'Intuit', 'Flipkart'],
    features: [
      'Everything in Silver',
      'Advanced AI performance report card',
      'Topic-wise & platform-wise filters enabled',
      'Company mock assessment simulations',
      'Placement readiness certificate'
    ]
  },
  {
    id: 'platinum',
    name: 'Platinum',
    basePrice: 1999,
    perDay: '₹6 a day',
    targetLpa: '0–15 LPA',
    market: 'Service & Product Interview Questions',
    badge: 'MOST POPULAR',
    companies: ['Microsoft', 'Amazon', 'Adobe', 'Atlassian', 'Oracle', 'Salesforce', 'Stripe'],
    features: [
      'Everything in Gold',
      'Company-wise recruitment filters',
      'Package-wise question filtering',
      'Full-length proctored placement tests',
      'Priority code execution queue'
    ]
  },
  {
    id: 'super_dream',
    name: 'Super Dream Pack',
    basePrice: 2999,
    perDay: '₹9 a day',
    targetLpa: '15+ LPA',
    market: 'Top Tier Product Interview Questions',
    badge: 'BEST VALUE',
    companies: ['Google', 'Amazon', 'Microsoft', 'Adobe', 'Netflix', 'LinkedIn', 'Uber', 'Oracle'],
    features: [
      'Everything in Platinum',
      'All Bundles & Tracks unlocked',
      'Frequency-wise & Quarter-wise test filters',
      'Early access to all exam series & mock alerts',
      'Direct recruiter interview pattern archives'
    ]
  }
]

export default function PricingSection() {
  const [durationYears, setDurationYears] = useState<number>(1)

  return (
    <section className="pricing" id="pricing" aria-labelledby="pricing-heading">
      <div className="container">
        {/* Header */}
        <div className="pricing__header">
          <div className="section-badge">
            <span className="section-badge__dot" />
            <span>Membership & Campus Licensing</span>
          </div>
          <h2 id="pricing-heading" className="pricing__heading">
            Pick Your Target Price. Zero Hidden Surprises.
          </h2>
          <p className="pricing__sub">
            Every plan covers one full year. Want it to last your entire engineering degree?
            Select 1 to 4 years and the per-year price stays locked with zero mid-term price hikes.
          </p>

          {/* Duration Multiplier Controls */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#FFFFFF', padding: '0.4rem', borderRadius: '9999px', border: '1.5px solid #17191C', margin: '1.5rem auto 0' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, padding: '0 0.75rem', color: '#64748B' }}>
              COVERAGE DURATION:
            </span>
            {[1, 2, 3, 4].map(years => (
              <button
                key={years}
                type="button"
                onClick={() => setDurationYears(years)}
                style={{
                  padding: '0.45rem 1rem',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  background: durationYears === years ? '#F5FF38' : 'transparent',
                  color: '#17191C',
                  boxShadow: durationYears === years ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {years} {years === 1 ? 'Year' : 'Years'}
              </button>
            ))}
          </div>
        </div>

        {/* 5-Tier Pricing Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
          {TIERS.map(tier => {
            const totalPrice = tier.basePrice * durationYears
            const isFeatured = tier.id === 'platinum' || tier.id === 'super_dream'
            return (
              <div
                key={tier.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '1.25rem',
                  padding: '1.75rem',
                  border: isFeatured ? '2px solid #17191C' : '1px solid #E2E8F0',
                  boxShadow: isFeatured ? '6px 6px 0px #17191C' : '0 4px 12px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}
              >
                {tier.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      right: '16px',
                      background: tier.id === 'super_dream' ? '#F5FF38' : '#8875FF',
                      color: tier.id === 'super_dream' ? '#17191C' : '#FFFFFF',
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '9999px',
                      border: '1px solid #17191C',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {tier.badge}
                  </span>
                )}

                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.5rem', color: '#17191C' }}>
                    {tier.name}
                  </h3>

                  {/* Target Box */}
                  <div style={{ background: '#FAF8F5', padding: '0.6rem 0.85rem', borderRadius: '0.625rem', marginBottom: '1.25rem', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#17191C' }}>{tier.targetLpa}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{tier.market}</div>
                  </div>

                  {/* Price Row */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
                      <span style={{ fontSize: '2rem', fontWeight: 900, color: '#17191C', letterSpacing: '-0.03em' }}>
                        ₹{totalPrice.toLocaleString()}
                      </span>
                      <span style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 600 }}>
                        / {durationYears === 1 ? 'year' : `${durationYears} yrs`}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#8875FF', fontWeight: 700 }}>
                      {tier.perDay}
                    </span>
                  </div>

                  {/* Features */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {tier.features.map((feat, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8125rem', color: '#475569', lineHeight: 1.4 }}>
                        <Check size={14} style={{ color: '#17191C', flexShrink: 0, marginTop: '2px' }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTAs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <Link
                    to={`/auth/signup?plan=${tier.id}&duration=${durationYears}`}
                    className="pricing__cta"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                      padding: '0.75rem',
                      fontSize: '0.875rem',
                      fontWeight: 800,
                      background: isFeatured ? '#F5FF38' : '#17191C',
                      color: isFeatured ? '#17191C' : '#FFFFFF',
                      border: '1.5px solid #17191C',
                      borderRadius: '0.625rem',
                      textDecoration: 'none',
                      transition: 'transform 0.15s ease'
                    }}
                  >
                    <span>Purchase Plan</span>
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    to="/partner-mou"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                      padding: '0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#64748B',
                      textDecoration: 'none'
                    }}
                  >
                    <GraduationCap size={13} />
                    <span>Get Scholarship via College MOU</span>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer comparison link */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link
            to="/pricing"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 800,
              fontSize: '0.9375rem',
              color: '#17191C',
              textDecoration: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '9999px',
              background: '#FAF8F5',
              border: '1.5px solid #17191C'
            }}
          >
            <span>See the full feature-by-feature matrix & comparison table ↗</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
