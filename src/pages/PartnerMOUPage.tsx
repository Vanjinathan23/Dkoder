import React, { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import PageHeader from '../components/layout/PageHeader'
import { Building2, CheckCircle2, ShieldCheck, FileCheck, ArrowRight, Clock, Award } from 'lucide-react'

const INDIAN_STATES = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
  'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi (NCT)',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand',
  'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra',
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal'
]

const INSTITUTION_TYPES = [
  'Affiliated College (Autonomous / Non-Autonomous)',
  'State Public University',
  'State Private University',
  'Central University',
  'Deemed University - Govt / Govt Aided',
  'Deemed University - Private',
  'Polytechnic / Diploma Institution'
]

export default function PartnerMOUPage() {
  const [activeTab, setActiveTab] = useState<'apply' | 'track'>('apply')
  const [form, setForm] = useState({
    collegeName: '',
    aicteCode: '',
    institutionType: INSTITUTION_TYPES[0],
    state: 'Tamil Nadu',
    city: '',
    principalName: '',
    officialEmail: '',
    phone: '',
    annualIntake: '500–1,000 Students',
    primaryGoal: 'Comprehensive Placement Readiness & NQT Training',
    preferredVisitDate: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [mouId, setMouId] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const generatedId = 'MOU-' + Math.floor(100000 + Math.random() * 900000)
    setMouId(generatedId)
    setSubmitted(true)
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', background: '#FFFFFF' }}>
        <PageHeader
          badge="INSTITUTIONAL PARTNERSHIP"
          title="Apply for Campus Placement MOU"
          description="Formal institutional partnership offering engineering colleges subsidized student pricing, automated faculty question banks, campus hackathons, and NBA audit exports."
        >
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setActiveTab('apply')}
              style={{
                padding: '0.55rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: 700,
                borderRadius: '9999px',
                border: activeTab === 'apply' ? '1.5px solid #17191C' : '1px solid #E2E8F0',
                background: activeTab === 'apply' ? '#F5FF38' : '#FAF8F5',
                color: '#17191C',
                cursor: 'pointer'
              }}
            >
              New MOU Application
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('track')}
              style={{
                padding: '0.55rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: 700,
                borderRadius: '9999px',
                border: activeTab === 'track' ? '1.5px solid #17191C' : '1px solid #E2E8F0',
                background: activeTab === 'track' ? '#F5FF38' : '#FAF8F5',
                color: '#17191C',
                cursor: 'pointer'
              }}
            >
              Track Application Status
            </button>
          </div>
        </PageHeader>

        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3.5rem 1.5rem' }}>
          {activeTab === 'apply' ? (
            !submitted ? (
              <div
                style={{
                  background: '#FFFDF5',
                  border: '2px solid #17191C',
                  borderRadius: '1.5rem',
                  padding: '3rem 2.5rem',
                  boxShadow: '8px 8px 0px #17191C'
                }}
              >
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', background: '#F5FF38', padding: '0.25rem 0.65rem', borderRadius: '9999px', border: '1px solid #17191C' }}>
                    ACADEMIC YEAR 2026–2027
                  </span>
                  <h2 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#17191C', margin: '0.75rem 0 0.35rem' }}>
                    Institutional Partnership Application
                  </h2>
                  <p style={{ fontSize: '0.9375rem', color: '#64748B', margin: 0 }}>
                    Please provide verified college credentials. Our institutional partnership director will verify AICTE/NIRF records and arrange the MOU draft.
                  </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Section 1: Institution Details */}
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#17191C', marginBottom: '1rem', paddingBottom: '0.4rem', borderBottom: '1px solid #E2E8F0' }}>
                      1. College Identity & Category
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                          Official College / University Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Coimbatore Institute of Technology"
                          value={form.collegeName}
                          onChange={e => setForm({ ...form, collegeName: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none', fontSize: '0.875rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                          AICTE / NIRF Code
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 1-10928371"
                          value={form.aicteCode}
                          onChange={e => setForm({ ...form, aicteCode: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none', fontSize: '0.875rem' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                          Institution Category
                        </label>
                        <select
                          value={form.institutionType}
                          onChange={e => setForm({ ...form, institutionType: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none', fontSize: '0.8125rem', background: '#FFFFFF' }}
                        >
                          {INSTITUTION_TYPES.map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                          State / Union Territory
                        </label>
                        <select
                          value={form.state}
                          onChange={e => setForm({ ...form, state: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none', fontSize: '0.8125rem', background: '#FFFFFF' }}
                        >
                          {INDIAN_STATES.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                          City / Campus Location
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Coimbatore"
                          value={form.city}
                          onChange={e => setForm({ ...form, city: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none', fontSize: '0.875rem' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Contact Coordinator */}
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#17191C', marginBottom: '1rem', paddingBottom: '0.4rem', borderBottom: '1px solid #E2E8F0' }}>
                      2. Principal / Placement Officer Contact
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                          Principal / Dean Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Dr. K. Senthil Kumar"
                          value={form.principalName}
                          onChange={e => setForm({ ...form, principalName: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none', fontSize: '0.875rem' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                          Official Institutional Email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="principal@cit.edu.in"
                          value={form.officialEmail}
                          onChange={e => setForm({ ...form, officialEmail: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none', fontSize: '0.875rem' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                          Direct Phone / Mobile
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 94432 09876"
                          value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none', fontSize: '0.875rem' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Training Scope */}
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#17191C', marginBottom: '1rem', paddingBottom: '0.4rem', borderBottom: '1px solid #E2E8F0' }}>
                      3. Batch Strength & Objectives
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                          Eligible Student Batch Strength
                        </label>
                        <select
                          value={form.annualIntake}
                          onChange={e => setForm({ ...form, annualIntake: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none', fontSize: '0.875rem', background: '#FFFFFF' }}
                        >
                          <option>200–500 Students</option>
                          <option>500–1,000 Students</option>
                          <option>1,000–2,500 Students</option>
                          <option>2,500+ Students (Campus-wide)</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                          Preferred Campus Visit / Demo Window
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Next Week / Mid November 2026"
                          value={form.preferredVisitDate}
                          onChange={e => setForm({ ...form, preferredVisitDate: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none', fontSize: '0.875rem' }}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{
                      marginTop: '1rem',
                      padding: '1rem',
                      fontSize: '1.0625rem',
                      fontWeight: 900,
                      background: '#F5FF38',
                      color: '#17191C',
                      border: '2px solid #17191C',
                      borderRadius: '0.75rem',
                      boxShadow: '4px 4px 0px #17191C',
                      cursor: 'pointer'
                    }}
                  >
                    Submit Official Campus MOU Application
                  </button>
                </form>
              </div>
            ) : (
              <div
                style={{
                  background: '#FFFFFF',
                  border: '2px solid #16A34A',
                  borderRadius: '1.5rem',
                  padding: '3.5rem 2rem',
                  textAlign: 'center',
                  boxShadow: '6px 6px 0px #16A34A'
                }}
              >
                <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: '#DCFCE7', display: 'grid', placeItems: 'center', margin: '0 auto 1.25rem', border: '1.5px solid #16A34A' }}>
                  <CheckCircle2 size={28} style={{ color: '#16A34A' }} />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#16A34A' }}>
                  APPLICATION DRAFT GENERATED
                </span>
                <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#17191C', margin: '0.5rem 0 0.5rem' }}>
                  MOU Reference ID: {mouId}
                </h2>
                <p style={{ fontSize: '1rem', color: '#64748B', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
                  Thank you, <strong>{form.principalName}</strong>. Your institutional application for <strong>{form.collegeName}</strong> has been logged in the DKoder National Placement registry.
                  Our partnership director will dispatch the formal MOU paperwork to <strong>{form.officialEmail}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('track')}
                  style={{
                    padding: '0.75rem 2rem',
                    fontSize: '0.9375rem',
                    fontWeight: 800,
                    background: '#17191C',
                    color: '#FFFFFF',
                    borderRadius: '0.625rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  View Status in Tracker
                </button>
              </div>
            )
          ) : (
            /* Application Tracker Tab */
            <div
              style={{
                background: '#FFFFFF',
                border: '2px solid #17191C',
                borderRadius: '1.5rem',
                padding: '2.5rem',
                boxShadow: '6px 6px 0px #17191C'
              }}
            >
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#17191C', margin: '0 0 1rem' }}>
                Your Institutional MOU Applications
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '2rem' }}>
                Track real-time legal vetting, inspection dates, and campus signing status.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ background: '#FAF8F5', border: '1.5px solid #17191C', borderRadius: '1rem', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, fontFamily: 'monospace', color: '#17191C' }}>
                        {mouId || 'MOU-891042'}
                      </span>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 800, background: '#FEF08A', color: '#854D0E', padding: '0.15rem 0.5rem', borderRadius: '9999px', border: '1px solid #CA8A04' }}>
                        Pending Document Review
                      </span>
                    </div>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#17191C', margin: '0 0 0.25rem' }}>
                      {form.collegeName || 'PSG College of Technology (Autonomous)'}
                    </h4>
                    <span style={{ fontSize: '0.8125rem', color: '#64748B' }}>
                      Coimbatore, Tamil Nadu · AICTE Verified
                    </span>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Assigned Officer</span>
                    <strong style={{ fontSize: '0.875rem', color: '#17191C' }}>Dr. Anand Raman (Director Academics)</strong>
                  </div>
                </div>

                <div style={{ background: '#FAF8F5', border: '1px solid #E2E8F0', borderRadius: '1rem', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, fontFamily: 'monospace', color: '#17191C' }}>
                        MOU-718291
                      </span>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 800, background: '#DCFCE7', color: '#166534', padding: '0.15rem 0.5rem', borderRadius: '9999px', border: '1px solid #16A34A' }}>
                        Active Campus Partner
                      </span>
                    </div>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#17191C', margin: '0 0 0.25rem' }}>
                      Kongu Engineering College
                    </h4>
                    <span style={{ fontSize: '0.8125rem', color: '#64748B' }}>
                      Erode, Tamil Nadu · 1,480 Active Student Licenses
                    </span>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', color: '#16A34A', fontWeight: 700, display: 'block' }}>✓ MOU Executed (4-Year Term)</span>
                    <strong style={{ fontSize: '0.8125rem', color: '#64748B' }}>Valid till June 2028</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
