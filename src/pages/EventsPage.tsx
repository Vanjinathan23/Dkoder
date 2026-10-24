import React, { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import PageHeader from '../components/layout/PageHeader'
import { Calendar, Clock, MapPin, Users, Ticket, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'

interface EventItem {
  id: string
  title: string
  category: 'Workshops' | 'Masterclass' | 'Hackathon Prep'
  date: string
  time: string
  speaker: string
  speakerRole: string
  company: string
  mode: string
  attendeesCount: number
  description: string
  keyTakeaways: string[]
  isLive?: boolean
}

const EVENTS: EventItem[] = [
  {
    id: 'amazon-sde-round-masterclass',
    title: 'Cracking the Amazon SDE 1 Online Assessment & Bar Raiser',
    category: 'Masterclass',
    date: 'Saturday, November 2, 2026',
    time: '6:00 PM – 8:00 PM IST',
    speaker: 'Aravind Swaminathan',
    speakerRole: 'Software Development Engineer II',
    company: 'Amazon Web Services',
    mode: 'Interactive Online Live Lab',
    attendeesCount: 1240,
    isLive: true,
    description: 'Deep dive into Amazon Leadership Principles applied to coding rounds, high-frequency Tree & DP questions asked in 2026 campus drives.',
    keyTakeaways: [
      'Dissecting 3 real OA question patterns from recent campus drives',
      'How to frame answers using Amazon Leadership Principles',
      'Live code walkthrough of optimal O(N) tree serialization'
    ]
  },
  {
    id: 'tcs-nqt-speed-strategy',
    title: 'TCS NQT 2026: Speed Coding & Elimination Round Strategy',
    category: 'Workshops',
    date: 'Wednesday, November 6, 2026',
    time: '7:00 PM – 8:30 PM IST',
    speaker: 'Meenakshi Sundaram',
    speakerRole: 'Head of Placement Assessment',
    company: 'DKoder Research Cell',
    mode: 'Live Stream & Coding Arena',
    attendeesCount: 3420,
    description: 'Learn the exact time-management formula to clear both Foundation and Advanced sections of the national TCS NQT with top percentile.',
    keyTakeaways: [
      'Section-wise cutoff estimation based on 2025/2026 benchmarks',
      'Avoiding the 4 most common traps in Advanced Coding',
      'Interactive speed drills with live timer in DKoder question lab'
    ]
  },
  {
    id: 'fullstack-system-design-zero-to-one',
    title: 'System Design for College Students: WhatsApp & TinyURL from Scratch',
    category: 'Workshops',
    date: 'Sunday, November 10, 2026',
    time: '11:00 AM – 1:30 PM IST',
    speaker: 'Devadathan N.',
    speakerRole: 'Principal Architect',
    company: 'Ex-Flipkart, Fintech Lead',
    mode: 'Interactive Virtual Workshop',
    attendeesCount: 2150,
    description: 'Demystifying High-Level Architecture (HLD) for campus placements. Scalability, caching, load balancing, and database sharding explained simply.',
    keyTakeaways: [
      'Single point of failure analysis and horizontal vs vertical scaling',
      'Redis caching strategies and database indexing',
      'How to ace system design questions in Product Company interviews'
    ]
  },
  {
    id: 'sustainability-hackathon-prep',
    title: '100 Days of Sustainability: Idea Pitching & Prototype Sprint',
    category: 'Hackathon Prep',
    date: 'Thursday, November 14, 2026',
    time: '5:30 PM – 7:00 PM IST',
    speaker: 'Sanjana Patel',
    speakerRole: 'Hackathon Jury Lead',
    company: 'DKoder Innovation Lab',
    mode: 'Hands-on Ideation Jam',
    attendeesCount: 1890,
    description: 'Official preparation workshop for the upcoming national campus hackathon series. Learn how winning teams structure their 24-hour build and jury pitch.',
    keyTakeaways: [
      'Selecting real-world green tech & sustainability problem statements',
      'Building an MVP with full-stack stack in 12 hours',
      'Pitch deck templates that impress corporate judges'
    ]
  }
]

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [registeredEventId, setRegisteredEventId] = useState<string | null>(null)
  const [registeredSuccess, setRegisteredSuccess] = useState(false)
  const [regForm, setRegForm] = useState({ name: '', email: '', college: '', year: '3rd Year' })

  const filteredEvents = EVENTS.filter(e => selectedCategory === 'All' || e.category === selectedCategory)
  const activeEvent = EVENTS.find(e => e.id === registeredEventId)

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setRegisteredSuccess(true)
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', background: '#FFFFFF' }}>
        <PageHeader
          badge="DKODER EVENTS & WORKSHOPS"
          title="Live Sessions, Masterclasses & Bootcamps"
          description="Join technical sessions hosted by senior engineers from top recruiters. Interactive coding labs, mock placement drives, and real-time Q&A."
        />

        <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '3rem 1.5rem' }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            {['All', 'Masterclass', 'Workshops', 'Hackathon Prep'].map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  borderRadius: '9999px',
                  border: selectedCategory === cat ? '1.5px solid #17191C' : '1px solid #E2E8F0',
                  background: selectedCategory === cat ? '#F5FF38' : '#FAF8F5',
                  color: '#17191C',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Events List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {filteredEvents.map(event => (
              <div
                key={event.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '1.25rem',
                  border: event.isLive ? '2px solid #17191C' : '1px solid #E2E8F0',
                  boxShadow: event.isLive ? '6px 6px 0px #17191C' : '0 4px 16px rgba(0,0,0,0.03)',
                  padding: '2rem',
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr',
                  gap: '2.5rem',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', background: '#F5FF38', padding: '0.2rem 0.6rem', borderRadius: '9999px', border: '1px solid #17191C', color: '#17191C' }}>
                      {event.category}
                    </span>
                    {event.isLive && (
                      <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', background: '#EF4444', color: '#FFFFFF', padding: '0.2rem 0.6rem', borderRadius: '9999px', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFFFFF', animation: 'pulse 1s infinite' }} />
                        UPCOMING FLAGSHIP
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#17191C', lineHeight: 1.3, margin: '0 0 0.75rem' }}>
                    {event.title}
                  </h3>

                  <p style={{ fontSize: '0.9375rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 1.25rem' }}>
                    {event.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.8125rem', color: '#475569', marginBottom: '1.5rem' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                      <Calendar size={14} style={{ color: '#8875FF' }} />
                      {event.date}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                      <Clock size={14} style={{ color: '#8875FF' }} />
                      {event.time}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                      <MapPin size={14} style={{ color: '#8875FF' }} />
                      {event.mode}
                    </span>
                  </div>

                  {/* Key Takeaways */}
                  <div style={{ background: '#FAF8F5', padding: '1rem 1.25rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#17191C', marginBottom: '0.5rem' }}>
                      Key Agenda & Takeaways:
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {event.keyTakeaways.map((point, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8125rem', color: '#475569' }}>
                          <CheckCircle2 size={13} style={{ color: '#8875FF', flexShrink: 0 }} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Speaker & Action Box */}
                <div style={{ background: '#FFFDF5', border: '1.5px solid #17191C', borderRadius: '1rem', padding: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: '#F5FF38', display: 'grid', placeItems: 'center', fontSize: '1.5rem', fontWeight: 900, border: '1.5px solid #17191C', color: '#17191C' }}>
                    {event.speaker.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#17191C' }}>{event.speaker}</div>
                    <div style={{ fontSize: '0.8125rem', color: '#64748B' }}>{event.speakerRole}</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#8875FF', marginTop: '0.2rem' }}>{event.company}</div>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.3rem', margin: '0.5rem 0' }}>
                    <Users size={14} />
                    <span>{event.attendeesCount.toLocaleString()} Students Registered</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setRegisteredEventId(event.id)
                      setRegisteredSuccess(false)
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      fontSize: '0.875rem',
                      fontWeight: 800,
                      background: '#F5FF38',
                      color: '#17191C',
                      border: '1.5px solid #17191C',
                      borderRadius: '0.625rem',
                      boxShadow: '2px 2px 0px #17191C',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Ticket size={15} />
                    <span>Reserve Free Seat</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Registration Modal */}
        {registeredEventId && activeEvent && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(17, 19, 24, 0.65)',
              backdropFilter: 'blur(6px)',
              zIndex: 1000,
              display: 'grid',
              placeItems: 'center',
              padding: '1.5rem'
            }}
            onClick={() => setRegisteredEventId(null)}
          >
            <div
              style={{
                background: '#FFFFFF',
                maxWidth: '520px',
                width: '100%',
                borderRadius: '1.5rem',
                border: '2px solid #17191C',
                boxShadow: '8px 8px 0px #17191C',
                padding: '2rem'
              }}
              onClick={e => e.stopPropagation()}
            >
              {!registeredSuccess ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                    <div>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', background: '#F5FF38', padding: '0.2rem 0.5rem', borderRadius: '9999px', border: '1px solid #17191C' }}>
                        Free Registration
                      </span>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#17191C', margin: '0.5rem 0 0.25rem' }}>
                        {activeEvent.title}
                      </h3>
                      <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: 0 }}>
                        {activeEvent.date} · {activeEvent.time}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setRegisteredEventId(null)}
                      style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer' }}
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={regForm.name}
                        onChange={e => setRegForm({ ...regForm, name: e.target.value })}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none', fontSize: '0.875rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                        College Email ID
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="student@college.edu.in"
                        value={regForm.email}
                        onChange={e => setRegForm({ ...regForm, email: e.target.value })}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none', fontSize: '0.875rem' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                          College Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="College name"
                          value={regForm.college}
                          onChange={e => setRegForm({ ...regForm, college: e.target.value })}
                          style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none', fontSize: '0.875rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                          Current Year
                        </label>
                        <select
                          value={regForm.year}
                          onChange={e => setRegForm({ ...regForm, year: e.target.value })}
                          style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none', fontSize: '0.875rem', background: '#FFFFFF' }}
                        >
                          <option>1st Year</option>
                          <option>2nd Year</option>
                          <option>3rd Year</option>
                          <option>Final Year</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      style={{
                        marginTop: '0.5rem',
                        padding: '0.75rem',
                        fontSize: '0.9375rem',
                        fontWeight: 800,
                        background: '#F5FF38',
                        color: '#17191C',
                        border: '1.5px solid #17191C',
                        borderRadius: '0.625rem',
                        boxShadow: '2px 2px 0px #17191C',
                        cursor: 'pointer'
                      }}
                    >
                      Confirm Free Pass & Join Link
                    </button>
                  </form>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', background: '#F5FF38', display: 'grid', placeItems: 'center', margin: '0 auto 1rem', border: '1.5px solid #17191C' }}>
                    <CheckCircle2 size={24} style={{ color: '#17191C' }} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#17191C', margin: '0 0 0.5rem' }}>
                    You're Registered!
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 1.5rem' }}>
                    A calendar invite and interactive joining link has been sent to <strong>{regForm.email || 'your email'}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setRegisteredEventId(null)}
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
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
