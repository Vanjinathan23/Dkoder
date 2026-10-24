import React, { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import PageHeader from '../components/layout/PageHeader'
import { Trophy, Flame, Search, Medal, Award, Building2 } from 'lucide-react'

interface StudentRank {
  rank: number
  name: string
  college: string
  avatar: string
  tier: 'Master' | 'Expert' | 'Specialist' | 'Achiever' | 'Rookie'
  questionsSolved: number
  streakDays: number
  totalXP: number
}

const LEADERBOARD_STUDENTS: StudentRank[] = [
  {
    rank: 1,
    name: 'Aravind Swaminathan',
    college: 'PSG College of Technology',
    avatar: 'A',
    tier: 'Master',
    questionsSolved: 482,
    streakDays: 45,
    totalXP: 9850
  },
  {
    rank: 2,
    name: 'Sneha Mukherjee',
    college: 'Heritage Institute of Technology',
    avatar: 'S',
    tier: 'Master',
    questionsSolved: 450,
    streakDays: 38,
    totalXP: 9120
  },
  {
    rank: 3,
    name: 'Gowtham V.',
    college: 'Coimbatore Institute of Technology',
    avatar: 'G',
    tier: 'Master',
    questionsSolved: 418,
    streakDays: 32,
    totalXP: 8640
  },
  {
    rank: 4,
    name: 'Pooja Narayanan',
    college: 'Vellore Institute of Technology',
    avatar: 'P',
    tier: 'Expert',
    questionsSolved: 385,
    streakDays: 28,
    totalXP: 7200
  },
  {
    rank: 5,
    name: 'Deepak Raj',
    college: 'Kongu Engineering College',
    avatar: 'D',
    tier: 'Expert',
    questionsSolved: 340,
    streakDays: 24,
    totalXP: 6850
  },
  {
    rank: 6,
    name: 'Kavitha R.',
    college: 'Bannari Amman Institute of Technology',
    avatar: 'K',
    tier: 'Expert',
    questionsSolved: 310,
    streakDays: 21,
    totalXP: 6100
  },
  {
    rank: 7,
    name: 'Rohan Deshmukh',
    college: 'Pune Institute of Computer Technology',
    avatar: 'R',
    tier: 'Specialist',
    questionsSolved: 280,
    streakDays: 19,
    totalXP: 5400
  },
  {
    rank: 8,
    name: 'Ananya Sen',
    college: 'Jadavpur University',
    avatar: 'A',
    tier: 'Specialist',
    questionsSolved: 260,
    streakDays: 16,
    totalXP: 4950
  }
]

export default function LeaderboardPage() {
  const [selectedTier, setSelectedTier] = useState<string>('All')
  const [search, setSearch] = useState('')

  const tiers = ['All', 'Master', 'Expert', 'Specialist']

  const filtered = LEADERBOARD_STUDENTS.filter(s => {
    const matchTier = selectedTier === 'All' || s.tier === selectedTier
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.college.toLowerCase().includes(search.toLowerCase())
    return matchTier && matchSearch
  })

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', background: '#FFFFFF' }}>
        <PageHeader
          badge="NATIONAL XP LEADERBOARD"
          title="Top Coders & College Rankings Across India"
          description="Real-time XP standings, problem solve speed, and daily coding streaks updated dynamically from over 50,000 active engineering students."
        />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3.5rem 1.5rem' }}>
          {/* Top 3 Podium */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', alignItems: 'flex-end', marginBottom: '4rem', maxWidth: '850px', margin: '0 auto 4rem' }}>
            {/* Rank 2 - Silver */}
            <div style={{ background: '#FAF8F5', border: '1.5px solid #CBD5E1', borderRadius: '1.25rem', padding: '1.5rem', textAlign: 'center', boxShadow: '4px 4px 0px #CBD5E1' }}>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: '#E2E8F0', border: '1.5px solid #94A3B8', display: 'grid', placeItems: 'center', margin: '0 auto 0.5rem', fontSize: '1.25rem', fontWeight: 900, color: '#17191C' }}>
                🥈
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#17191C', margin: '0 0 0.25rem' }}>
                {LEADERBOARD_STUDENTS[1].name}
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#64748B', margin: '0 0 0.75rem' }}>
                {LEADERBOARD_STUDENTS[1].college}
              </p>
              <div style={{ background: '#FFFFFF', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0' }}>
                <strong style={{ fontSize: '1rem', color: '#17191C' }}>{LEADERBOARD_STUDENTS[1].totalXP.toLocaleString()} XP</strong>
                <span style={{ fontSize: '0.6875rem', color: '#64748B', display: 'block' }}>{LEADERBOARD_STUDENTS[1].streakDays} Day Streak</span>
              </div>
            </div>

            {/* Rank 1 - Gold (Elevated) */}
            <div style={{ background: '#FFFDF0', border: '2px solid #17191C', borderRadius: '1.25rem', padding: '2rem 1.5rem', textAlign: 'center', boxShadow: '6px 6px 0px #17191C', transform: 'translateY(-16px)' }}>
              <div style={{ width: '3.75rem', height: '3.75rem', borderRadius: '50%', background: '#F5FF38', border: '2px solid #17191C', display: 'grid', placeItems: 'center', margin: '0 auto 0.75rem', fontSize: '1.5rem', fontWeight: 900 }}>
                👑
              </div>
              <span style={{ fontSize: '0.6875rem', fontWeight: 800, background: '#F5FF38', padding: '0.15rem 0.5rem', borderRadius: '9999px', border: '1px solid #17191C' }}>
                #1 NATIONAL
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#17191C', margin: '0.4rem 0 0.25rem' }}>
                {LEADERBOARD_STUDENTS[0].name}
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#64748B', margin: '0 0 1rem' }}>
                {LEADERBOARD_STUDENTS[0].college}
              </p>
              <div style={{ background: '#FFFFFF', padding: '0.65rem', borderRadius: '0.625rem', border: '1.5px solid #17191C' }}>
                <strong style={{ fontSize: '1.25rem', color: '#17191C' }}>{LEADERBOARD_STUDENTS[0].totalXP.toLocaleString()} XP</strong>
                <span style={{ fontSize: '0.75rem', color: '#EA580C', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', marginTop: '0.2rem' }}>
                  <Flame size={13} />
                  <span>{LEADERBOARD_STUDENTS[0].streakDays} Days Continuous Streak</span>
                </span>
              </div>
            </div>

            {/* Rank 3 - Bronze */}
            <div style={{ background: '#FAF8F5', border: '1.5px solid #E2E8F0', borderRadius: '1.25rem', padding: '1.5rem', textAlign: 'center', boxShadow: '4px 4px 0px #E2E8F0' }}>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: '#FED7AA', border: '1.5px solid #C2410C', display: 'grid', placeItems: 'center', margin: '0 auto 0.5rem', fontSize: '1.25rem', fontWeight: 900 }}>
                🥉
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#17191C', margin: '0 0 0.25rem' }}>
                {LEADERBOARD_STUDENTS[2].name}
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#64748B', margin: '0 0 0.75rem' }}>
                {LEADERBOARD_STUDENTS[2].college}
              </p>
              <div style={{ background: '#FFFFFF', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0' }}>
                <strong style={{ fontSize: '1rem', color: '#17191C' }}>{LEADERBOARD_STUDENTS[2].totalXP.toLocaleString()} XP</strong>
                <span style={{ fontSize: '0.6875rem', color: '#64748B', display: 'block' }}>{LEADERBOARD_STUDENTS[2].streakDays} Day Streak</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {tiers.map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTier(t)}
                  style={{
                    padding: '0.45rem 1rem',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    borderRadius: '9999px',
                    border: selectedTier === t ? '1.5px solid #17191C' : '1px solid #E2E8F0',
                    background: selectedTier === t ? '#F5FF38' : '#FAF8F5',
                    color: '#17191C',
                    cursor: 'pointer'
                  }}
                >
                  {t} {t !== 'All' ? 'Tier' : ''}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', width: '300px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
              <input
                type="text"
                placeholder="Search student or university..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.25rem', fontSize: '0.875rem', borderRadius: '9999px', border: '1.5px solid #E2E8F0', outline: 'none' }}
              />
            </div>
          </div>

          {/* Full Standings Table */}
          <div style={{ border: '2px solid #17191C', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '6px 6px 0px #17191C' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#FFFFFF' }}>
              <thead>
                <tr style={{ background: '#FAF8F5', borderBottom: '2px solid #17191C' }}>
                  <th style={{ padding: '1rem 1.5rem', fontSize: '0.8125rem', fontWeight: 800, color: '#17191C', width: '80px' }}>Rank</th>
                  <th style={{ padding: '1rem', fontSize: '0.8125rem', fontWeight: 800, color: '#17191C' }}>Student Candidate</th>
                  <th style={{ padding: '1rem', fontSize: '0.8125rem', fontWeight: 800, color: '#17191C' }}>Engineering College</th>
                  <th style={{ padding: '1rem', fontSize: '0.8125rem', fontWeight: 800, color: '#17191C' }}>XP Level</th>
                  <th style={{ padding: '1rem', fontSize: '0.8125rem', fontWeight: 800, color: '#17191C' }}>Questions Solved</th>
                  <th style={{ padding: '1rem', fontSize: '0.8125rem', fontWeight: 800, color: '#17191C' }}>Daily Streak</th>
                  <th style={{ padding: '1rem 1.5rem', fontSize: '0.8125rem', fontWeight: 800, color: '#17191C', textAlign: 'right' }}>Total XP</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((student, idx) => (
                  <tr key={student.rank} style={{ borderBottom: '1px solid #E2E8F0', background: idx % 2 === 0 ? '#FFFFFF' : '#FAF8F5' }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 900, fontSize: '1rem', color: '#17191C' }}>
                      #{student.rank}
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 700, fontSize: '0.9375rem', color: '#17191C' }}>
                      {student.name}
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.8125rem', color: '#475569' }}>
                      {student.college}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 800,
                          padding: '0.2rem 0.55rem',
                          borderRadius: '9999px',
                          background: student.tier === 'Master' ? '#FEF08A' : student.tier === 'Expert' ? '#EDE9FE' : '#E0F2FE',
                          color: student.tier === 'Master' ? '#854D0E' : student.tier === 'Expert' ? '#6B21A8' : '#0369A1'
                        }}
                      >
                        {student.tier}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.8125rem', fontWeight: 700, color: '#17191C' }}>
                      {student.questionsSolved} Problems
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.8125rem', fontWeight: 700, color: '#EA580C' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Flame size={14} />
                        {student.streakDays} Days
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right', fontWeight: 900, fontSize: '1.0625rem', color: '#17191C' }}>
                      {student.totalXP.toLocaleString()} XP
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
