import { useState } from 'react'
import './PricingSection.css'

interface Plan {
  id: string
  name: string
  monthlyPrice: number
  annualPrice: number
  tag: string
  color: 'default' | 'lime' | 'violet' | 'orange'
  popular?: boolean
  features: string[]
  cta: string
  href: string
}

const PLANS: Plan[] = [
  {
    id: 'bronze',
    name: 'Bronze Starter',
    monthlyPrice: 699,
    annualPrice: 499,
    tag: 'FOUNDATIONAL',
    color: 'default',
    features: [
      'Access to 300+ Core Questions',
      'Basic Code Runner Sandbox',
      'Topic-wise Progress Analytics',
      '2 Timed Mock Tests / month',
      'Community Discussion Forum',
    ],
    cta: 'Initialize Bronze',
    href: 'https://dkoder.co.in/register',
  },
  {
    id: 'silver',
    name: 'Silver Pro',
    monthlyPrice: 1299,
    annualPrice: 949,
    tag: 'MOST POPULAR',
    color: 'lime',
    popular: true,
    features: [
      'Access to 800+ Verified Questions',
      'Full Company-Tagged Filters (FAANG +)',
      'Multi-Language IDE (TS, Python, C++, Java)',
      '10 Timed Placement Mocks / month',
      'Synapse AI Approach & Big-O Feedback',
      'Priority Doubt Resolution',
    ],
    cta: 'Unlock Silver Pro',
    href: 'https://dkoder.co.in/register',
  },
  {
    id: 'gold',
    name: 'Gold Career',
    monthlyPrice: 1999,
    annualPrice: 1499,
    tag: 'SUPER-DREAM ASPIRANTS',
    color: 'violet',
    features: [
      'Full 1,200+ Question Vault Access',
      'Unlimited Full-Funnel Placement Mocks',
      '4 Domain Career Track Roadmaps',
      'Monthly Resume Review by Placed Alumni',
      'Real-Time Proctored Coding Screens',
      'Direct Mentor AMA Sessions',
    ],
    cta: 'Elevate to Gold',
    href: 'https://dkoder.co.in/register',
  },
  {
    id: 'super-dream',
    name: 'Super Dream All-In',
    monthlyPrice: 2999,
    annualPrice: 2249,
    tag: 'OFFER GUARANTEE ACCELERATOR',
    color: 'orange',
    features: [
      'Everything in Gold Career Tier',
      '1-on-1 Personalized Mock Technicals',
      'Recruiter Profile Dispatch Network',
      'Interview Pass Guarantee Program',
      'Lifetime Access to Future Curriculum',
      '24/7 Dedicated Placement Concierge',
    ],
    cta: 'Join Super Dream',
    href: 'https://dkoder.co.in/register',
  },
]

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual')

  return (
    <section className="pricing" id="pricing" aria-labelledby="pricing-heading">
      <div className="container">
        {/* Header */}
        <div className="pricing__header">
          <div className="tag tag--lime">INVESTMENT IN YOUR CAREER</div>
          <h2 id="pricing-heading" className="pricing__heading">
            Transparent, High-ROI Plans
          </h2>
          <p className="pricing__sub">
            All plans include a 7-day risk-free guarantee. Start building your verified placement profile today.
          </p>

          {/* Billing Switcher */}
          <div className="pricing__toggle-wrap">
            <button
              type="button"
              className={`pricing__toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              className={`pricing__toggle-btn ${billingCycle === 'annual' ? 'active' : ''}`}
              onClick={() => setBillingCycle('annual')}
            >
              Annual Billing
              <span className="save-badge">SAVE 25%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing__grid">
          {PLANS.map(plan => {
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice
            return (
              <div
                key={plan.id}
                className={`pricing__card pricing__card--${plan.color} ${plan.popular ? 'popular' : ''}`}
              >
                {plan.popular && (
                  <div className="pricing__popular-ribbon">
                    <span>★ RECOMMENDED BY ALUMNI</span>
                  </div>
                )}

                <div className="pricing__card-top">
                  <span className="pricing__tag">{plan.tag}</span>
                  <h3 className="pricing__name">{plan.name}</h3>
                  <div className="pricing__price-row">
                    <span className="pricing__currency">₹</span>
                    <span className="pricing__amount">{price.toLocaleString()}</span>
                    <span className="pricing__period">/month</span>
                  </div>
                  <span className="pricing__billing-note">
                    {billingCycle === 'annual' ? 'Billed annually (₹' + (price * 12).toLocaleString() + '/yr)' : 'Billed monthly, cancel anytime'}
                  </span>
                </div>

                <div className="pricing__divider" />

                <ul className="pricing__feature-list" aria-label={`${plan.name} features`}>
                  {plan.features.map(f => (
                    <li key={f} className="pricing__feature-item">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="check-icon">
                        <path d="M3 8.5l3.5 3.5L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a href={plan.href} className={`pricing__btn pricing__btn--${plan.color}`}>
                  <span>{plan.cta}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                </a>
              </div>
            )
          })}
        </div>

        {/* Institutional / College LMS Callout */}
        <div className="pricing__institutional-card">
          <div className="inst-left">
            <span className="tag tag--violet">FOR UNIVERSITIES & COLLEGES</span>
            <h4 className="inst-title">Are you a Training & Placement Officer (TPO)?</h4>
            <p className="inst-desc">
              Deploy DKoder campus-wide. Track entire batch performance, conduct proctored internal coding tests,
              benchmark branch readiness scores, and streamline recruiter drives with enterprise reporting.
            </p>
          </div>
          <div className="inst-right">
            <a href="https://dkoder.co.in" className="inst-btn">
              <span>Request College LMS Demo</span>
              <span>➔</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
