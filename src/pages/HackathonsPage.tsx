import React, { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import PageHeader from '../components/layout/PageHeader'
import { Trophy, Calendar, MapPin, Users, CheckCircle2, ArrowRight, Sparkles, Building2, Flame } from 'lucide-react'

interface HackathonEvent {
  id: string
  title: string
  edition: string
  prizePool: string
  startDate: string
  endDate: string
  mode: string
  teamSize: string
  teamsRegistered: number
  description: string
  tracks: string[]
  isFlagship?: boolean
}

const HACKATHONS_LIST: HackathonEvent[] = [
  {
    id: '100-days-sustainability',
    title: '100 Days of Sustainability: On-Campus Hackathon Series',
    edition: '2026 National Tour',
    prizePool: '₹5,00,000 + Incubation Grants',
    startDate: 'November 1, 2026',
    endDate: 'February 10, 2027',
    mode: 'On-Campus (Our Team Comes to Your College)',
    teamSize: '2–4 Students',
    teamsRegistered: 340,
    isFlagship: true,
    description: 'The flagship nationwide sustainability hackathon where the DKoder team travels directly to your campus, setting up the 24-hour hack floor, jury evaluation, and live project demos.',
    tracks: ['Green Mobility & EV Systems', 'Smart Campus Energy Optimization', 'AI for Waste Segregation', 'Carbon Footprint Tracking']
  },
  {
    id: 'algo-rush-national-sprint',
    title: 'AlgoRush 2026: 48-Hour High-Speed Algorithmic Challenge',
    edition: 'Season 4',
    prizePool: '₹2,50,000',
    startDate: 'November 16, 2026',
    endDate: 'November 18, 2026',
    mode: 'Online (DKoder Virtual Arena)',
    teamSize: 'Solo or Pair (1–2)',
    teamsRegistered: 1120,
    description: 'Fast-paced algorithmic marathon testing competitive programming speed, mathematical modeling, and concurrent data structure optimization.',
    tracks: ['Dynamic Programming Sprint', 'Graph & Network Flow Challenges', 'Concurrent Thread Architecture']
  },
  {
    id: 'ai-agents-buildathon',
    title: 'Autonomous Agents & Vector Search Buildathon',
    edition: 'National Fall Edition',
    prizePool: '₹3,00,000 + Cloud Credits',
    startDate: 'December 5, 2026',
    endDate: 'December 8, 2026',
    mode: 'Hybrid (Virtual + Demo Day)',
    teamSize: '2–4 Students',
    teamsRegistered: 650,
    description: 'Build production-grade autonomous agent systems using LLMs, multi-agent frameworks (LangGraph/CrewAI), and vector databases to solve real enterprise bottlenecks.',
    tracks: ['Agentic Workflows for Healthcare', 'Autonomous Financial Analysis', 'Self-Healing Developer Pipelines']
  }
]

export default function HackathonsPage() {
  const [activeTab, setActiveTab] = useState<'all' | '100-days'>('all')
  const [campusForm, setCampusForm] = useState({
    college: '',
    city: '',
    state: 'Tamil Nadu',
    contactPerson: '',
    role: 'Faculty Coordinator / HOD',
    phone: '',
    preferredDate: '',
    approxStudents: '150–250 Students'
  })
  const [campusSubmitted, setCampusSubmitted] = useState(false)

  const handleCampusSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCampusSubmitted(true)
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', background: '#FFFFFF' }}>
        <PageHeader
          badge="DKODER HACKATHONS"
          title="National Hackathons & 100 Days of Sustainability"
          description="Compete with top coders across India, win national prize pools, and bring the flagship 100 Days of Sustainability hackathon directly to your campus."
        >
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              style={{
                padding: '0.55rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: 700,
                borderRadius: '9999px',
                border: activeTab === 'all' ? '1.5px solid #17191C' : '1px solid #E2E8F0',
                background: activeTab === 'all' ? '#F5FF38' : '#FAF8F5',
                color: '#17191C',
                cursor: 'pointer'
              }}
            >
              All National Hackathons
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('100-days')}
              style={{
                padding: '0.55rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: 700,
                borderRadius: '9999px',
                border: activeTab === '100-days' ? '1.5px solid #17191C' : '1px solid #E2E8F0',
                background: activeTab === '100-days' ? '#F5FF38' : '#FAF8F5',
                color: '#17191C',
                cursor: 'pointer'
              }}
            >
              100 Days on Campus
            </button>
          </div>
        </PageHeader>

        <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '3rem 1.5rem' }}>
          {/* Flagship Banner */}
          <div
            style={{
              background: '#FFFDF0',
              border: '2px solid #17191C',
              borderRadius: '1.5rem',
              padding: '2.5rem',
              boxShadow: '6px 6px 0px #17191C',
              marginBottom: '3.5rem',
              display: 'grid',
              gridTemplateColumns: '1.5fr 1fr',
              gap: '2.5rem',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', background: '#F5FF38', padding: '0.2rem 0.6rem', borderRadius: '9999px', border: '1px solid #17191C' }}>
                  CAMPUS TOUR IN PROGRESS
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16A34A', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Flame size={14} />
                  38 Colleges Confirmed So Far
                </span>
              </div>

              <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#17191C', margin: '0 0 0.75rem', lineHeight: 1.25 }}>
                100 Days of Sustainability on Your Campus
              </h2>
              <p style={{ fontSize: '0.9375rem', color: '#475569', lineHeight: 1.6, margin: '0 0 1.25rem' }}>
                Apply for your campus, pick your date, and our expert team runs the entire 24-hour hackathon —
                from problem statements, mentoring, platform judging, to trophies and certificate distribution.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('campus-booking-section')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 800,
                    background: '#17191C',
                    color: '#FFFFFF',
                    borderRadius: '0.625rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Book Date for Your College
                </button>
              </div>
            </div>

            {/* Quick Stats Box */}
            <div style={{ background: '#FFFFFF', border: '1.5px solid #17191C', borderRadius: '1rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Trophy size={24} style={{ color: '#F5FF38' }} />
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#17191C' }}>₹5,00,000</div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>National Prize Pool</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Building2 size={24} style={{ color: '#8875FF' }} />
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#17191C' }}>On-Premise</div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>DKoder Team Visits Your Campus</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hackathons Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '4rem' }}>
            {HACKATHONS_LIST.map(hack => (
              <div
                key={hack.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '1.25rem',
                  border: '1.5px solid #17191C',
                  boxShadow: '4px 4px 0px #17191C',
                  padding: '2rem',
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr',
                  gap: '2.5rem',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', background: '#FAF8F5', border: '1px solid #CBD5E1', padding: '0.2rem 0.5rem', borderRadius: '0.35rem', color: '#17191C' }}>
                      {hack.edition}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
                      Team Size: {hack.teamSize}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#17191C', margin: '0 0 0.5rem' }}>
                    {hack.title}
                  </h3>

                  <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 1rem' }}>
                    {hack.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8125rem', color: '#475569', marginBottom: '1.25rem' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={14} style={{ color: '#8875FF' }} />
                      {hack.startDate} – {hack.endDate}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <MapPin size={14} style={{ color: '#8875FF' }} />
                      {hack.mode}
                    </span>
                  </div>

                  {/* Tracks */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {hack.tracks.map((track, i) => (
                      <span key={i} style={{ fontSize: '0.6875rem', fontWeight: 700, background: '#FFFDF0', border: '1px solid #F5FF38', padding: '0.2rem 0.5rem', borderRadius: '0.35rem', color: '#17191C' }}>
                        {track}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Action Box */}
                <div style={{ background: '#FAF8F5', border: '1px solid #E2E8F0', borderRadius: '1rem', padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', marginBottom: '0.25rem' }}>
                    Total Cash Prize Pool
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#17191C', marginBottom: '0.75rem' }}>
                    {hack.prizePool}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '1.25rem' }}>
                    {hack.teamsRegistered} Teams Registered
                  </div>

                  <a
                    href="https://dkoder.co.in/hackathons"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      width: '100%',
                      padding: '0.75rem',
                      fontSize: '0.875rem',
                      fontWeight: 800,
                      background: '#F5FF38',
                      color: '#17191C',
                      border: '1.5px solid #17191C',
                      borderRadius: '0.625rem',
                      boxShadow: '2px 2px 0px #17191C',
                      textDecoration: 'none'
                    }}
                  >
                    <span>Register Team</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Campus Booking Request Form */}
          <div
            id="campus-booking-section"
            style={{
              background: '#FFFDF5',
              border: '2px solid #17191C',
              borderRadius: '1.5rem',
              padding: '3rem 2rem',
              maxWidth: '800px',
              margin: '0 auto',
              boxShadow: '8px 8px 0px #17191C'
            }}
          >
            {!campusSubmitted ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', background: '#F5FF38', padding: '0.25rem 0.65rem', borderRadius: '9999px', border: '1px solid #17191C' }}>
                    INSTITUTIONAL BOOKING
                  </span>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#17191C', margin: '0.75rem 0 0.35rem' }}>
                    Host 100 Days of Sustainability at Your College
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#64748B', margin: 0 }}>
                    Students or faculty can submit a campus request. Our team handles logistics, kits, judge panels, and certificates.
                  </p>
                </div>

                <form onSubmit={handleCampusSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                        College Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kongu Engineering College"
                        value={campusForm.college}
                        onChange={e => setCampusForm({ ...campusForm, college: e.target.value })}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                        City & State
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Erode, Tamil Nadu"
                        value={campusForm.city}
                        onChange={e => setCampusForm({ ...campusForm, city: e.target.value })}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                        Faculty / Lead Coordinator Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Prof. S. Ramachandran"
                        value={campusForm.contactPerson}
                        onChange={e => setCampusForm({ ...campusForm, contactPerson: e.target.value })}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                        WhatsApp Contact Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 99440 12345"
                        value={campusForm.phone}
                        onChange={e => setCampusForm({ ...campusForm, phone: e.target.value })}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                        Preferred Month / Date
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. December 2026 / January 2027"
                        value={campusForm.preferredDate}
                        onChange={e => setCampusForm({ ...campusForm, preferredDate: e.target.value })}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                        Expected Student Participants
                      </label>
                      <select
                        value={campusForm.approxStudents}
                        onChange={e => setCampusForm({ ...campusForm, approxStudents: e.target.value })}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none', background: '#FFFFFF' }}
                      >
                        <option>100–200 Students</option>
                        <option>200–400 Students</option>
                        <option>500+ Students (Campus-wide)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{
                      marginTop: '1rem',
                      padding: '0.85rem',
                      fontSize: '1rem',
                      fontWeight: 800,
                      background: '#F5FF38',
                      color: '#17191C',
                      border: '1.5px solid #17191C',
                      borderRadius: '0.625rem',
                      boxShadow: '3px 3px 0px #17191C',
                      cursor: 'pointer'
                    }}
                  >
                    Submit Campus Hosting Request
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: '#F5FF38', display: 'grid', placeItems: 'center', margin: '0 auto 1rem', border: '1.5px solid #17191C' }}>
                  <CheckCircle2 size={28} style={{ color: '#17191C' }} />
                </div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#17191C', margin: '0 0 0.5rem' }}>
                  Campus Tour Request Received!
                </h3>
                <p style={{ fontSize: '0.9375rem', color: '#64748B', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto 1.5rem' }}>
                  Our national tour coordinator will contact <strong>{campusForm.phone}</strong> within 24 hours to review
                  dates, lab requirements, and send the official MOU brochure.
                </p>
                <button
                  type="button"
                  onClick={() => setCampusSubmitted(false)}
                  style={{
                    padding: '0.6rem 1.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 800,
                    background: '#17191C',
                    color: '#FFFFFF',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Submit Another Campus
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
