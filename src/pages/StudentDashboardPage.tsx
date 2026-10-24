import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { CheckCircle2, Clock, Code2, FileText, Brain, Bot, Flame, Trophy, Award, ArrowRight, Play } from 'lucide-react'

interface StageStep {
  id: string
  name: string
  label: string
  status: 'COMPLETED' | 'IN_PROGRESS' | 'LOCKED'
  route: string
  description: string
  icon: React.ElementType
}

const STAGES: StageStep[] = [
  {
    id: 'stage-1',
    name: 'Foundation MCQ Assessment',
    label: 'Stage 1',
    status: 'COMPLETED',
    route: '/practice',
    description: 'Quantitative aptitude, verbal logic, and programming fundamentals.',
    icon: Brain
  },
  {
    id: 'stage-2',
    name: 'Automated Resume Parsing & ATS Audit',
    label: 'Stage 2',
    status: 'COMPLETED',
    route: '/practice',
    description: 'ATS formatting score: 88/100. Keywords matched for SDE 1 profile.',
    icon: FileText
  },
  {
    id: 'stage-3',
    name: 'Advanced Speed Aptitude Drill',
    label: 'Stage 3',
    status: 'COMPLETED',
    route: '/practice',
    description: 'Speed elimination drill: 24 questions in 25 mins completed.',
    icon: Clock
  },
  {
    id: 'stage-4',
    name: 'High-Frequency Coding Challenge Round',
    label: 'Stage 4',
    status: 'IN_PROGRESS',
    route: '/practice/coding',
    description: '2 company problems: Two-Pointer Subarrays and Tree Level Traversal.',
    icon: Code2
  },
  {
    id: 'stage-5',
    name: 'AI-Powered Virtual HR Interview',
    label: 'Stage 5',
    status: 'LOCKED',
    route: '/practice',
    description: 'Voice & situational behavioral assessment simulation.',
    icon: Bot
  }
]

export default function StudentDashboardPage() {
  const [user, setUser] = useState<{ name: string; email: string; college: string }>(() => {
    try {
      const saved = localStorage.getItem('user')
      return saved ? JSON.parse(saved) : { name: 'Rahul Sharma', email: 'rahul@gmail.com', college: 'PSG College of Technology' }
    } catch {
      return { name: 'Rahul Sharma', email: 'rahul@gmail.com', college: 'PSG College of Technology' }
    }
  })

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '85vh', background: '#FAF8F5', paddingTop: '90px', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '0 1.5rem' }}>
          {/* Welcome User Banner */}
          <div
            style={{
              background: '#FFFFFF',
              border: '2px solid #17191C',
              borderRadius: '1.5rem',
              padding: '2rem 2.5rem',
              boxShadow: '6px 6px 0px #17191C',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.5rem',
              marginBottom: '2.5rem'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', background: '#F5FF38', padding: '0.15rem 0.5rem', borderRadius: '9999px', border: '1px solid #17191C' }}>
                  STUDENT CANDIDATE
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{user.college}</span>
              </div>
              <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#17191C', margin: '0 0 0.35rem' }}>
                Welcome back, {user.name} 👋
              </h1>
              <p style={{ fontSize: '0.875rem', color: '#64748B', margin: 0 }}>
                Target Plan: <strong style={{ color: '#17191C' }}>Super Dream Pack (15+ LPA)</strong> · National Percentile: <strong style={{ color: '#16A34A' }}>Top 4%</strong>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ background: '#FAF8F5', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#64748B' }}>TOTAL XP</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#17191C' }}>3,840 XP</div>
              </div>
              <div style={{ background: '#FAF8F5', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#64748B' }}>ACTIVE STREAK</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#EA580C', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Flame size={18} />
                  <span>14 Days</span>
                </div>
              </div>
            </div>
          </div>

          {/* 5 Placement Progression Stages */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#17191C', marginBottom: '1.25rem' }}>
              Placement Readiness Pipeline Stages
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {STAGES.map((st, idx) => {
                const Icon = st.icon
                return (
                  <div
                    key={st.id}
                    style={{
                      background: '#FFFFFF',
                      border: st.status === 'IN_PROGRESS' ? '2px solid #17191C' : '1px solid #E2E8F0',
                      borderRadius: '1rem',
                      padding: '1.5rem',
                      boxShadow: st.status === 'IN_PROGRESS' ? '4px 4px 0px #17191C' : 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <div
                        style={{
                          width: '3rem',
                          height: '3rem',
                          borderRadius: '0.75rem',
                          background: st.status === 'COMPLETED' ? '#DCFCE7' : st.status === 'IN_PROGRESS' ? '#F5FF38' : '#F1F5F9',
                          border: '1.5px solid #17191C',
                          display: 'grid',
                          placeItems: 'center'
                        }}
                      >
                        {st.status === 'COMPLETED' ? (
                          <CheckCircle2 size={20} style={{ color: '#16A34A' }} />
                        ) : (
                          <Icon size={20} style={{ color: '#17191C' }} />
                        )}
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748B' }}>
                            {st.label}
                          </span>
                          <span
                            style={{
                              fontSize: '0.6875rem',
                              fontWeight: 800,
                              padding: '0.1rem 0.45rem',
                              borderRadius: '9999px',
                              background: st.status === 'COMPLETED' ? '#DCFCE7' : st.status === 'IN_PROGRESS' ? '#FEF08A' : '#F1F5F9',
                              color: st.status === 'COMPLETED' ? '#166534' : st.status === 'IN_PROGRESS' ? '#854D0E' : '#64748B'
                            }}
                          >
                            {st.status}
                          </span>
                        </div>

                        <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#17191C', margin: '0.2rem 0' }}>
                          {st.name}
                        </h3>
                        <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: 0 }}>
                          {st.description}
                        </p>
                      </div>
                    </div>

                    <div>
                      {st.status === 'IN_PROGRESS' ? (
                        <Link
                          to={st.route}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            padding: '0.65rem 1.25rem',
                            fontSize: '0.8125rem',
                            fontWeight: 800,
                            background: '#F5FF38',
                            color: '#17191C',
                            border: '1.5px solid #17191C',
                            borderRadius: '0.5rem',
                            boxShadow: '2px 2px 0px #17191C',
                            textDecoration: 'none'
                          }}
                        >
                          <Play size={13} fill="#17191C" />
                          <span>Resume Assessment</span>
                        </Link>
                      ) : st.status === 'COMPLETED' ? (
                        <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#16A34A', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <CheckCircle2 size={15} />
                          <span>Cleared</span>
                        </span>
                      ) : (
                        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#94A3B8' }}>
                          Unlock by completing Stage 4
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <Link
              to="/practice"
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #17191C',
                borderRadius: '1rem',
                padding: '1.5rem',
                textDecoration: 'none',
                boxShadow: '3px 3px 0px #17191C'
              }}
            >
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#17191C', margin: '0 0 0.35rem' }}>
                Question Lab & Speed Drills →
              </h4>
              <p style={{ fontSize: '0.75rem', color: '#64748B', margin: 0 }}>
                Filter 12,500+ questions by TCS, Zoho, Amazon, and Google.
              </p>
            </Link>

            <Link
              to="/learn/courses"
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #17191C',
                borderRadius: '1rem',
                padding: '1.5rem',
                textDecoration: 'none',
                boxShadow: '3px 3px 0px #17191C'
              }}
            >
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#17191C', margin: '0 0 0.35rem' }}>
                Enrolled Programs & Courses →
              </h4>
              <p style={{ fontSize: '0.75rem', color: '#64748B', margin: 0 }}>
                Continue your full-stack engineering and cloud curriculum.
              </p>
            </Link>

            <Link
              to="/leaderboard"
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #17191C',
                borderRadius: '1rem',
                padding: '1.5rem',
                textDecoration: 'none',
                boxShadow: '3px 3px 0px #17191C'
              }}
            >
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#17191C', margin: '0 0 0.35rem' }}>
                National Leaderboard Standing →
              </h4>
              <p style={{ fontSize: '0.75rem', color: '#64748B', margin: 0 }}>
                See your rank among 50,000+ candidates across India.
              </p>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
