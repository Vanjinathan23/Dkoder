import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import PageHeader from '../components/layout/PageHeader'
import PricingSection from '../components/home/PricingSection'
import { Check, X, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react'

interface FeatureRow {
  name: string
  bronze: boolean | string
  silver: boolean | string
  gold: boolean | string
  platinum: boolean | string
  superDream: boolean | string
}

const COMPARISON_MATRIX: FeatureRow[] = [
  { name: 'Target Salary Band', bronze: '0–3 LPA', silver: '0–5 LPA', gold: '0–7 LPA', platinum: '0–15 LPA', superDream: '15+ LPA' },
  { name: 'Annual Price (1 Year)', bronze: '₹699', silver: '₹999', gold: '₹1,599', platinum: '₹1,999', superDream: '₹2,999' },
  { name: 'Cost Per Day', bronze: '₹2/day', silver: '₹3/day', gold: '₹5/day', platinum: '₹6/day', superDream: '₹9/day' },
  { name: 'Daily Coding Challenges & Streaks', bronze: true, silver: true, gold: true, platinum: true, superDream: true },
  { name: 'MCQ Practice & Speed Drill Arena', bronze: true, silver: true, gold: true, platinum: true, superDream: true },
  { name: 'In-Browser Multi-Language Compiler', bronze: true, silver: true, gold: true, platinum: true, superDream: true },
  { name: 'Service-Based Recruiter Questions (TCS, Infy)', bronze: true, silver: true, gold: true, platinum: true, superDream: true },
  { name: 'Advanced AI Performance Report Card', bronze: false, silver: false, gold: true, platinum: true, superDream: true },
  { name: 'Topic-Wise & Platform-Wise Filters', bronze: false, silver: false, gold: true, platinum: true, superDream: true },
  { name: 'Company-Specific Question Filters', bronze: false, silver: false, gold: false, platinum: true, superDream: true },
  { name: 'Package-Wise (LPA) Question Filtering', bronze: false, silver: false, gold: false, platinum: true, superDream: true },
  { name: 'Recruiter Hiring Frequency & Quarter Filters', bronze: false, silver: false, gold: false, platinum: false, superDream: true },
  { name: 'All Specialized Bundles & Tracks Unlocked', bronze: false, silver: false, gold: false, platinum: false, superDream: true },
  { name: 'Early Access to Exam Series & Mock Drives', bronze: false, silver: false, gold: false, platinum: false, superDream: true }
]

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', background: '#FFFFFF' }}>
        <PageHeader
          badge="DKODER PLANS & LICENSING"
          title="Transparent Pricing for Every Degree Stage"
          description="Bronze ₹699/yr to Super Dream Pack ₹2,999/yr. Real placement questions, live coding lab, salary filters, entrance exam prep. One year, no forced renewals mid-term."
        />

        <PricingSection />

        {/* Complete Feature Comparison Table */}
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', background: '#F5FF38', padding: '0.25rem 0.65rem', borderRadius: '9999px', border: '1px solid #17191C' }}>
              EXHAUSTIVE FEATURE MATRIX
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#17191C', margin: '0.5rem 0 0' }}>
              Compare All 5 Plans Side-by-Side
            </h2>
          </div>

          <div style={{ overflowX: 'auto', border: '2px solid #17191C', borderRadius: '1.25rem', boxShadow: '6px 6px 0px #17191C' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#FFFFFF' }}>
              <thead>
                <tr style={{ background: '#FAF8F5', borderBottom: '2px solid #17191C' }}>
                  <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.875rem', fontWeight: 800, color: '#17191C', width: '30%' }}>Feature / Capability</th>
                  <th style={{ padding: '1.25rem 1rem', fontSize: '0.875rem', fontWeight: 800, color: '#17191C', textAlign: 'center' }}>Bronze</th>
                  <th style={{ padding: '1.25rem 1rem', fontSize: '0.875rem', fontWeight: 800, color: '#17191C', textAlign: 'center' }}>Silver</th>
                  <th style={{ padding: '1.25rem 1rem', fontSize: '0.875rem', fontWeight: 800, color: '#17191C', textAlign: 'center' }}>Gold</th>
                  <th style={{ padding: '1.25rem 1rem', fontSize: '0.875rem', fontWeight: 800, color: '#8875FF', textAlign: 'center', background: 'rgba(136, 117, 255, 0.08)' }}>Platinum</th>
                  <th style={{ padding: '1.25rem 1rem', fontSize: '0.875rem', fontWeight: 800, color: '#17191C', textAlign: 'center', background: '#FFFDF0' }}>Super Dream</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_MATRIX.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #E2E8F0', background: idx % 2 === 0 ? '#FFFFFF' : '#FAF8F5' }}>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: 600, color: '#17191C' }}>{row.name}</td>
                    {(['bronze', 'silver', 'gold', 'platinum', 'superDream'] as const).map(tier => {
                      const val = row[tier]
                      return (
                        <td
                          key={tier}
                          style={{
                            padding: '1rem',
                            textAlign: 'center',
                            fontSize: '0.875rem',
                            fontWeight: 700,
                            background: tier === 'platinum' ? 'rgba(136, 117, 255, 0.04)' : tier === 'superDream' ? '#FFFDF0' : 'transparent'
                          }}
                        >
                          {typeof val === 'boolean' ? (
                            val ? (
                              <Check size={18} style={{ color: '#16A34A', display: 'inline' }} />
                            ) : (
                              <X size={18} style={{ color: '#CBD5E1', display: 'inline' }} />
                            )
                          ) : (
                            <span style={{ color: '#17191C' }}>{val}</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Institutional Note */}
          <div style={{ marginTop: '3rem', background: '#FFFDF5', border: '1.5px solid #17191C', borderRadius: '1rem', padding: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#17191C', margin: '0 0 0.25rem' }}>
                Are you an Engineering College, Department HOD, or Placement Cell?
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#64748B', margin: 0 }}>
                Colleges signing an institutional MOU receive subsidized per-student passes (down to ₹250/yr) and faculty exam suites.
              </p>
            </div>
            <Link
              to="/partner-mou"
              style={{
                padding: '0.65rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: 800,
                background: '#F5FF38',
                color: '#17191C',
                border: '1.5px solid #17191C',
                borderRadius: '0.5rem',
                textDecoration: 'none'
              }}
            >
              Get Campus Scholarship
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
