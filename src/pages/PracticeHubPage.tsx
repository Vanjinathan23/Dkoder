import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import PageHeader from '../components/layout/PageHeader'
import { Code2, CheckCircle2, Filter, Search, Terminal, Flame, BookOpen, ArrowRight, Layers } from 'lucide-react'

interface QuestionItem {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  company: string
  packageBand: string
  topic: string
  acceptance: string
  testedInDrive: string
}

const QUESTIONS_BANK: QuestionItem[] = [
  {
    id: 'two-sum-target',
    title: 'Two Sum & Pair Sum with Target Window',
    difficulty: 'Easy',
    company: 'TCS / Infosys',
    packageBand: '3.5–5 LPA',
    topic: 'Arrays & Hashing',
    acceptance: '84%',
    testedInDrive: 'TCS NQT 2026 Batch'
  },
  {
    id: 'trapping-rain-water',
    title: 'Trapping Rain Water (2-Pointer Optimal)',
    difficulty: 'Hard',
    company: 'Amazon / Microsoft',
    packageBand: '15+ LPA',
    topic: '2-Pointers & Stack',
    acceptance: '48%',
    testedInDrive: 'Amazon SDE 1 Campus Drive'
  },
  {
    id: 'zoho-railway-reservation',
    title: 'Railway Reservation System CLI Design',
    difficulty: 'Medium',
    company: 'Zoho',
    packageBand: '6–8.4 LPA',
    topic: 'OOP Application Design',
    acceptance: '52%',
    testedInDrive: 'Zoho Round 3 Campus Final'
  },
  {
    id: 'longest-substring-k-distinct',
    title: 'Longest Substring with At Most K Distinct Characters',
    difficulty: 'Medium',
    company: 'Flipkart / Intuit',
    packageBand: '10–14 LPA',
    topic: 'Sliding Window',
    acceptance: '61%',
    testedInDrive: 'Flipkart Runway Sprint'
  },
  {
    id: 'course-schedule-cycle',
    title: 'Course Schedule & Dependency Graph (Cycle Detection)',
    difficulty: 'Medium',
    company: 'Google / Uber',
    packageBand: '15+ LPA',
    topic: 'Graph BFS/DFS Topological',
    acceptance: '55%',
    testedInDrive: 'Google STEP / SWE Intern'
  },
  {
    id: 'reverse-nodes-k-group',
    title: 'Reverse Nodes in k-Group in Linked List',
    difficulty: 'Hard',
    company: 'Adobe / Atlassian',
    packageBand: '15+ LPA',
    topic: 'Linked Lists',
    acceptance: '44%',
    testedInDrive: 'Atlassian Campus Hire'
  }
]

const COMPANIES = ['All Recruiters', 'TCS / Infosys', 'Zoho', 'Amazon / Microsoft', 'Flipkart / Intuit', 'Google / Uber']
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard']

export default function PracticeHubPage() {
  const [selectedCompany, setSelectedCompany] = useState('All Recruiters')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = QUESTIONS_BANK.filter(q => {
    const matchComp = selectedCompany === 'All Recruiters' || q.company === selectedCompany
    const matchDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty
    const matchSearch = q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.topic.toLowerCase().includes(search.toLowerCase())
    return matchComp && matchDiff && matchSearch
  })

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', background: '#FFFFFF' }}>
        <PageHeader
          badge="DKODER PRACTICE ENGINE"
          title="Placement Question Lab & Practice Hub"
          description="12,500+ verified interview questions tagged by recruiting company, salary tier, and tested placement batches. Sharpen your speed and run live tests."
        >
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <Link
              to="/practice/coding"
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
              <Terminal size={15} />
              <span>Launch Live Code Runner</span>
            </Link>
            <Link
              to="/practice/platforms"
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
                textDecoration: 'none'
              }}
            >
              <Layers size={15} />
              <span>Company Platform Arenas (TCS / Infy)</span>
            </Link>
          </div>
        </PageHeader>

        <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '3.5rem 1.5rem' }}>
          {/* 3 Main Practice Modes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem', marginBottom: '3.5rem' }}>
            <div style={{ background: '#FFFDF5', border: '1.5px solid #17191C', borderRadius: '1.25rem', padding: '1.75rem', boxShadow: '4px 4px 0px #17191C' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', background: '#F5FF38', display: 'grid', placeItems: 'center', border: '1.5px solid #17191C', marginBottom: '1rem' }}>
                <Code2 size={20} style={{ color: '#17191C' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#17191C', margin: '0 0 0.5rem' }}>
                Coding Practice Arena
              </h3>
              <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 1rem' }}>
                Write clean code in TypeScript, Python, C++, or Java. Instant testcase execution against hidden tests.
              </p>
              <Link to="/practice/coding" style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#17191C', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span>Open Coding Arena</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div style={{ background: '#FFFFFF', border: '1.5px solid #17191C', borderRadius: '1.25rem', padding: '1.75rem', boxShadow: '4px 4px 0px #17191C' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', background: '#FAF8F5', display: 'grid', placeItems: 'center', border: '1.5px solid #17191C', marginBottom: '1rem' }}>
                <Layers size={20} style={{ color: '#8875FF' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#17191C', margin: '0 0 0.5rem' }}>
                Company Entrance Platforms
              </h3>
              <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 1rem' }}>
                Simulate TCS NQT, Infosys InfyTQ, and Wipro Elite national recruitment tests with authentic timed sections.
              </p>
              <Link to="/practice/platforms" style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#17191C', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span>Open Platform Arena</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div style={{ background: '#FFFFFF', border: '1.5px solid #17191C', borderRadius: '1.25rem', padding: '1.75rem', boxShadow: '4px 4px 0px #17191C' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', background: '#FAF8F5', display: 'grid', placeItems: 'center', border: '1.5px solid #17191C', marginBottom: '1rem' }}>
                <Flame size={20} style={{ color: '#EA580C' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#17191C', margin: '0 0 0.5rem' }}>
                Daily Habit & Streak Engine
              </h3>
              <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 1rem' }}>
                Earn 50 XP every day by solving today's 3 curated challenges. Build a 14-day streak to unlock Gold badges.
              </p>
              <Link to="/leaderboard" style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#17191C', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span>View National Leaderboard</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Filtering Shortlists */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {COMPANIES.map(comp => (
                <button
                  key={comp}
                  type="button"
                  onClick={() => setSelectedCompany(comp)}
                  style={{
                    padding: '0.45rem 1rem',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    borderRadius: '9999px',
                    border: selectedCompany === comp ? '1.5px solid #17191C' : '1px solid #E2E8F0',
                    background: selectedCompany === comp ? '#F5FF38' : '#FAF8F5',
                    color: '#17191C',
                    cursor: 'pointer'
                  }}
                >
                  {comp}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', width: '280px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
              <input
                type="text"
                placeholder="Search problem title or topic..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.25rem', fontSize: '0.875rem', borderRadius: '9999px', border: '1.5px solid #E2E8F0', outline: 'none' }}
              />
            </div>
          </div>

          {/* Questions Table */}
          <div style={{ border: '2px solid #17191C', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '6px 6px 0px #17191C' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#FFFFFF' }}>
              <thead>
                <tr style={{ background: '#FAF8F5', borderBottom: '2px solid #17191C' }}>
                  <th style={{ padding: '1rem 1.5rem', fontSize: '0.8125rem', fontWeight: 800, color: '#17191C' }}>Question Title</th>
                  <th style={{ padding: '1rem', fontSize: '0.8125rem', fontWeight: 800, color: '#17191C' }}>Recruiter Tag</th>
                  <th style={{ padding: '1rem', fontSize: '0.8125rem', fontWeight: 800, color: '#17191C' }}>Package Band</th>
                  <th style={{ padding: '1rem', fontSize: '0.8125rem', fontWeight: 800, color: '#17191C' }}>Difficulty</th>
                  <th style={{ padding: '1rem', fontSize: '0.8125rem', fontWeight: 800, color: '#17191C' }}>Acceptance</th>
                  <th style={{ padding: '1rem 1.5rem', fontSize: '0.8125rem', fontWeight: 800, color: '#17191C', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((q, idx) => (
                  <tr key={q.id} style={{ borderBottom: '1px solid #E2E8F0', background: idx % 2 === 0 ? '#FFFFFF' : '#FAF8F5' }}>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#17191C' }}>{q.title}</div>
                      <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Topic: {q.topic}</span>
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.8125rem', fontWeight: 700, color: '#17191C' }}>
                      {q.company}
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.8125rem', fontWeight: 600, color: '#475569' }}>
                      {q.packageBand}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 800,
                          padding: '0.2rem 0.55rem',
                          borderRadius: '9999px',
                          background: q.difficulty === 'Easy' ? '#DCFCE7' : q.difficulty === 'Medium' ? '#FEF08A' : '#FEE2E2',
                          color: q.difficulty === 'Easy' ? '#166534' : q.difficulty === 'Medium' ? '#854D0E' : '#991B1B'
                        }}
                      >
                        {q.difficulty}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.8125rem', fontWeight: 600, color: '#64748B' }}>
                      {q.acceptance}
                    </td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                      <Link
                        to={`/practice/coding?id=${q.id}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          padding: '0.45rem 1rem',
                          fontSize: '0.8125rem',
                          fontWeight: 800,
                          background: '#F5FF38',
                          color: '#17191C',
                          border: '1.5px solid #17191C',
                          borderRadius: '0.5rem',
                          textDecoration: 'none',
                          boxShadow: '1px 1px 0px #17191C'
                        }}
                      >
                        <span>Solve</span>
                        <ArrowRight size={13} />
                      </Link>
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
