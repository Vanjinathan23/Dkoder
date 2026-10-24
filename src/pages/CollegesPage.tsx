import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import PageHeader from '../components/layout/PageHeader'
import { Building2, FileSpreadsheet, ShieldCheck, Users, BarChart3, CheckCircle2, ArrowRight, Download, Eye } from 'lucide-react'

export default function CollegesPage() {
  const [activeTab, setActiveTab] = useState<'principal' | 'hod' | 'placement'>('principal')
  const [showSampleReport, setShowSampleReport] = useState(false)

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', background: '#FFFFFF' }}>
        <PageHeader
          badge="DKODER FOR INSTITUTIONS"
          title="Hire a Virtual Placement Assistant"
          description="Transform your engineering college into a placement powerhouse. Automated student diagnostics, HOD batch monitoring, automated exam builders, and audit-ready NBA/NIRF data logs."
        >
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <Link
              to="/partner-mou"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.65rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: 800,
                background: '#F5FF38',
                color: '#17191C',
                border: '1.5px solid #17191C',
                borderRadius: '9999px',
                boxShadow: '2px 2px 0px #17191C',
                textDecoration: 'none'
              }}
            >
              <span>Apply for Campus MOU</span>
              <ArrowRight size={14} />
            </Link>
            <button
              type="button"
              onClick={() => setShowSampleReport(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.65rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: 700,
                background: '#FAF8F5',
                color: '#17191C',
                border: '1.5px solid #17191C',
                borderRadius: '9999px',
                cursor: 'pointer'
              }}
            >
              <Eye size={15} />
              <span>Inspect Sample Placement Report</span>
            </button>
          </div>
        </PageHeader>

        <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '3.5rem 1.5rem' }}>
          {/* Virtual Placement Assistant Feature Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            <div style={{ background: '#FFFDF5', border: '1.5px solid #17191C', borderRadius: '1.25rem', padding: '2rem', boxShadow: '4px 4px 0px #17191C' }}>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', background: '#F5FF38', display: 'grid', placeItems: 'center', border: '1.5px solid #17191C', marginBottom: '1.25rem' }}>
                <Building2 size={24} style={{ color: '#17191C' }} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#17191C', margin: '0 0 0.5rem' }}>
                Principal & Director Overview
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                High-level department comparison. Know exactly what percentage of 3rd and 4th-year students are placement-ready
                across CSE, IT, ECE, EEE, and Mechanical branches.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', border: '1.5px solid #17191C', borderRadius: '1.25rem', padding: '2rem', boxShadow: '4px 4px 0px #17191C' }}>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', background: '#FAF8F5', display: 'grid', placeItems: 'center', border: '1.5px solid #17191C', marginBottom: '1.25rem' }}>
                <BarChart3 size={24} style={{ color: '#8875FF' }} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#17191C', margin: '0 0 0.5rem' }}>
                HOD Risk Alerts & Cohorts
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                Identify students at risk of missing campus cutoffs 6 months before recruitment season begins.
                Automated alerts highlight low aptitude speed and coding bottlenecks.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', border: '1.5px solid #17191C', borderRadius: '1.25rem', padding: '2rem', boxShadow: '4px 4px 0px #17191C' }}>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', background: '#FAF8F5', display: 'grid', placeItems: 'center', border: '1.5px solid #17191C', marginBottom: '1.25rem' }}>
                <FileSpreadsheet size={24} style={{ color: '#16A34A' }} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#17191C', margin: '0 0 0.5rem' }}>
                NBA & NIRF Audit Ready Logs
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                Export cryptographically verified student assessment logs, attendance sheets, and skill progression
                records formatted directly for NBA Criterion 4 & 5 compliance visits.
              </p>
            </div>
          </div>

          {/* Interactive Role Preview Tabs */}
          <div style={{ background: '#FAF8F5', border: '2px solid #17191C', borderRadius: '1.5rem', padding: '2.5rem', marginBottom: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#8875FF', letterSpacing: '0.05em' }}>
                  ROLE-SPECIFIC SUITES
                </span>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#17191C', margin: '0.25rem 0 0' }}>
                  Tailored Portals for Every Campus Stakeholder
                </h3>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', background: '#FFFFFF', padding: '0.35rem', borderRadius: '9999px', border: '1.5px solid #17191C' }}>
                {(['principal', 'hod', 'placement'] as const).map(role => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setActiveTab(role)}
                    style={{
                      padding: '0.5rem 1rem',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      borderRadius: '9999px',
                      border: 'none',
                      background: activeTab === role ? '#F5FF38' : 'transparent',
                      color: '#17191C',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {role === 'principal' ? 'Principal / Dean' : role === 'hod' ? 'Department HOD' : 'Placement Cell'}
                  </button>
                ))}
              </div>
            </div>

            {/* Role Content Preview */}
            <div style={{ background: '#FFFFFF', borderRadius: '1rem', border: '1.5px solid #17191C', padding: '2rem' }}>
              {activeTab === 'principal' && (
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#17191C', marginBottom: '0.75rem' }}>
                    Institutional Placement Command Center
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    View college-wide health at a glance. Understand placement conversion likelihood per salary band
                    (Service-based 3.5 LPA vs Dream 7+ LPA vs Super Dream 15+ LPA).
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div style={{ background: '#FAF8F5', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Average Readiness Score</span>
                      <strong style={{ fontSize: '1.5rem', color: '#17191C' }}>78.4%</strong>
                    </div>
                    <div style={{ background: '#FAF8F5', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Students Assessed</span>
                      <strong style={{ fontSize: '1.5rem', color: '#17191C' }}>1,480</strong>
                    </div>
                    <div style={{ background: '#FAF8F5', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Estimated Placement Rate</span>
                      <strong style={{ fontSize: '1.5rem', color: '#16A34A' }}>89.2%</strong>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'hod' && (
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#17191C', marginBottom: '0.75rem' }}>
                    Department Cohort Analytics & Automated Question Builder
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    Create custom department diagnostic tests in 60 seconds. Pull verified questions from TCS NQT, Infosys,
                    or standard DSA topics, and receive instant auto-graded submission sheets.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div style={{ background: '#FAF8F5', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Batch Solved Rate</span>
                      <strong style={{ fontSize: '1.5rem', color: '#17191C' }}>14,200 Tests</strong>
                    </div>
                    <div style={{ background: '#FAF8F5', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>High Risk Flagged</span>
                      <strong style={{ fontSize: '1.5rem', color: '#EF4444' }}>24 Students</strong>
                    </div>
                    <div style={{ background: '#FAF8F5', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Exam Series Active</span>
                      <strong style={{ fontSize: '1.5rem', color: '#8875FF' }}>6 Batches</strong>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'placement' && (
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#17191C', marginBottom: '0.75rem' }}>
                    Placement Cell Drive Mock Simulations
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    Run pre-drive simulation tests mirroring exact recruiter criteria (Aptitude + Technical MCQ + Live Coding).
                    Filter candidate rosters by CGPA, test scores, and problem solve velocity.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div style={{ background: '#FAF8F5', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Recruiters Tagged</span>
                      <strong style={{ fontSize: '1.5rem', color: '#17191C' }}>500+ Companies</strong>
                    </div>
                    <div style={{ background: '#FAF8F5', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Mock Drives Run</span>
                      <strong style={{ fontSize: '1.5rem', color: '#17191C' }}>48 Drives</strong>
                    </div>
                    <div style={{ background: '#FAF8F5', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Offer Conversions</span>
                      <strong style={{ fontSize: '1.5rem', color: '#16A34A' }}>+34% vs 2025</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Campus Action Callout */}
          <div
            style={{
              background: '#17191C',
              color: '#FFFFFF',
              borderRadius: '1.5rem',
              padding: '3rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem'
            }}
          >
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
              Ready to Upgrade Your Campus Placement Infrastructure?
            </h2>
            <p style={{ fontSize: '1rem', color: '#94A3B8', maxWidth: '650px', margin: 0, lineHeight: 1.6 }}>
              Join 50+ premier engineering colleges across Tamil Nadu, Karnataka, Andhra Pradesh, and Maharashtra.
              Schedule a walkthrough or initiate your institutional MOU.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <Link
                to="/partner-mou"
                style={{
                  padding: '0.85rem 2rem',
                  fontSize: '0.9375rem',
                  fontWeight: 800,
                  background: '#F5FF38',
                  color: '#17191C',
                  border: '1.5px solid #F5FF38',
                  borderRadius: '9999px',
                  textDecoration: 'none'
                }}
              >
                Apply for Campus MOU
              </Link>
              <Link
                to="/auth/institution"
                style={{
                  padding: '0.85rem 1.75rem',
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  background: 'transparent',
                  color: '#FFFFFF',
                  border: '1.5px solid #FFFFFF',
                  borderRadius: '9999px',
                  textDecoration: 'none'
                }}
              >
                Institution Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Sample Report Modal */}
        {showSampleReport && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(17, 19, 24, 0.7)',
              backdropFilter: 'blur(6px)',
              zIndex: 1000,
              display: 'grid',
              placeItems: 'center',
              padding: '1.5rem'
            }}
            onClick={() => setShowSampleReport(false)}
          >
            <div
              style={{
                background: '#FFFFFF',
                maxWidth: '700px',
                width: '100%',
                borderRadius: '1.5rem',
                border: '2px solid #17191C',
                boxShadow: '8px 8px 0px #17191C',
                padding: '2.5rem',
                maxHeight: '85vh',
                overflowY: 'auto'
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', background: '#F5FF38', padding: '0.2rem 0.5rem', borderRadius: '9999px', border: '1px solid #17191C' }}>
                    SAMPLE AUDIT EXPORT
                  </span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#17191C', margin: '0.35rem 0 0' }}>
                    Department Placement Readiness Diagnostic
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSampleReport(false)}
                  style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ background: '#FAF8F5', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8125rem', color: '#64748B' }}>Institution:</span>
                  <strong style={{ fontSize: '0.8125rem', color: '#17191C' }}>Kongu Engineering College (Autonomous)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8125rem', color: '#64748B' }}>Department:</span>
                  <strong style={{ fontSize: '0.8125rem', color: '#17191C' }}>Computer Science & Engineering (Batch 2026)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8125rem', color: '#64748B' }}>NBA Compliance Tag:</span>
                  <strong style={{ fontSize: '0.8125rem', color: '#16A34A' }}>Criterion 5.1 — Verified Student Assessment Record</strong>
                </div>
              </div>

              <h4 style={{ fontSize: '0.9375rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Skill Radar Metrics
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {[
                  { label: 'Quantitative Aptitude & Speed', value: '88%' },
                  { label: 'Data Structures (Arrays, Trees, DP)', value: '74%' },
                  { label: 'System Design & Object-Oriented Principles', value: '82%' },
                  { label: 'Database Normalization & SQL Queries', value: '91%' }
                ].map((row, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      <span>{row.label}</span>
                      <span>{row.value}</span>
                    </div>
                    <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: row.value, background: '#17191C' }} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setShowSampleReport(false)}
                  style={{
                    padding: '0.6rem 1.25rem',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    background: '#FAF8F5',
                    border: '1px solid #17191C',
                    borderRadius: '0.5rem',
                    cursor: 'pointer'
                  }}
                >
                  Close Preview
                </button>
                <Link
                  to="/partner-mou"
                  style={{
                    padding: '0.6rem 1.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 800,
                    background: '#F5FF38',
                    color: '#17191C',
                    border: '1.5px solid #17191C',
                    borderRadius: '0.5rem',
                    boxShadow: '2px 2px 0px #17191C',
                    textDecoration: 'none'
                  }}
                >
                  Schedule Campus Walkthrough
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
