import { useState } from 'react'
import './CollegeSection.css'

interface RoleWorkflow {
  id: string
  roleTitle: string
  badge: string
  description: string
  deliverables: string[]
  telemetryMetrics: { label: string; value: string; sub: string }[]
}

const ROLES: RoleWorkflow[] = [
  {
    id: 'admin',
    roleTitle: 'College Admin & TPO',
    badge: 'LEADERSHIP',
    description: 'Track campus-wide placement metrics across all engineering departments in real time.',
    deliverables: [
      'Batch placement readiness analytics across CSE, IT, and ECE',
      'Automated placement reporting for accreditation records',
      'One flat fee covering all 4 years with no recurring renewals',
    ],
    telemetryMetrics: [
      { label: 'Campus Readiness', value: '88.4%', sub: 'Batch 2026' },
      { label: 'Enrolled Cohort', value: '1,840', sub: 'Students' },
      { label: 'Verified Pass Rate', value: '94.2%', sub: 'First Attempt' },
    ],
  },
  {
    id: 'hod',
    roleTitle: 'Department HOD',
    badge: 'DEPARTMENTS',
    description: 'Monitor student coding consistency and identify skill gaps before placement season starts.',
    deliverables: [
      'Early skill gap alerts for students falling below target cutoffs',
      'Department-level performance across Data Structures & Algorithms',
      'Faculty assignment and custom remedial test scheduling',
    ],
    telemetryMetrics: [
      { label: 'Super-Dream Tier', value: '42%', sub: '> 18 LPA Ready' },
      { label: 'Dream Tier', value: '38%', sub: '8-18 LPA Ready' },
      { label: 'Active Streak', value: '84%', sub: 'Weekly Solves' },
    ],
  },
  {
    id: 'instructor',
    roleTitle: 'Faculty & Trainers',
    badge: 'ACADEMICS',
    description: 'Create custom practice tests, assign company problems, and grade student submissions automatically.',
    deliverables: [
      'Instant test generator powered by 12,500+ verified company questions',
      'Automated code execution grading across C++, Java, and Python',
      'Real-time student progress tracking during lab sessions',
    ],
    telemetryMetrics: [
      { label: 'Tests Conducted', value: '140+', sub: 'Lab Sessions' },
      { label: 'Avg Solve Time', value: '38m', sub: 'Per Session' },
      { label: 'Auto-Evaluated', value: '100%', sub: 'Instant Grading' },
    ],
  },
  {
    id: 'student',
    roleTitle: 'Engineering Students',
    badge: 'STUDENTS',
    description: 'Practice company-specific interview problems, test code in-browser, and track personal streaks.',
    deliverables: [
      '12,500+ coding problems categorized by target company and salary tier',
      'In-browser code editor with instant testcase validation',
      'National leaderboard ranking by solved questions and consistency',
    ],
    telemetryMetrics: [
      { label: 'Problems Solved', value: '412', sub: 'Average / Student' },
      { label: 'Active Streak', value: '48 Days', sub: 'Top 5% Cohort' },
      { label: 'Accuracy Rate', value: '91.8%', sub: 'All Solves' },
    ],
  },
]

const CAMPUS_QUOTES = [
  {
    quote: 'Managing multi-branch student coding assessments used to take weeks of manual collation. DKoder gives our placement cell instant department-level readiness telemetry.',
    author: 'Placement Officer',
    college: 'Dhaanish Ahmed College of Engineering',
  },
  {
    quote: 'Before DKoder, I was tracking practice hours on a spreadsheet across four departments. Now I open one dashboard and know exactly who is drive-ready.',
    author: 'TPO',
    college: 'Sri Eshwar College of Engineering',
  },
  {
    quote: 'What sold me to my Principal was the question quality. These are verified company questions matching actual campus tests, not generic puzzles.',
    author: 'HOD, Computer Science & Eng.',
    college: 'Velammal Engineering College',
  },
]

export default function CollegeSection() {
  const [activeRole, setActiveRole] = useState<RoleWorkflow>(ROLES[0])

  return (
    <section className="college" id="colleges" aria-labelledby="college-heading">
      <div className="container">
        {/* Section Header */}
        <div className="college__header">
          <div className="tag tag--violet">
            <span>COLLEGE PARTNERSHIPS</span>
          </div>
          <h2 id="college-heading" className="college__heading">
            Trusted by Engineering Colleges Across India
          </h2>
          <p className="college__sub">
            Placement cells, HODs, and trainers use DKoder to prepare student cohorts and conduct campus mock recruitment drives.
          </p>

          {/* Role Switcher Tabs */}
          <div className="college__role-tabs" role="tablist" aria-label="Institutional Roles">
            {ROLES.map(r => (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={activeRole.id === r.id}
                className={`college__role-btn ${activeRole.id === r.id ? 'active' : ''}`}
                onClick={() => setActiveRole(r)}
              >
                <span>{r.roleTitle}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Role Stage */}
        <div className="college__stage">
          {/* Left: Role Responsibilities & Deliverables */}
          <div className="college__left">
            <span className="college__badge">{activeRole.badge}</span>
            <h3 className="college__title">{activeRole.roleTitle}</h3>
            <p className="college__desc">{activeRole.description}</p>

            <div className="college__deliverables">
              <span className="deliv-header">CORE CAPABILITIES & WORKFLOWS:</span>
              <ul className="deliv-list">
                {activeRole.deliverables.map(d => (
                  <li key={d} className="deliv-item">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13.333 4L6 11.333 2.667 8" stroke="#17191C" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="college__cta-wrap">
              <a href="https://dkoder.co.in/contact" className="college__btn-primary">
                <span>Schedule Campus Walkthrough</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <span className="college__cta-note">✓ Setup sandbox roster deployed within 48 hours</span>
            </div>
          </div>

          {/* Right: Telemetry Dashboard Mockup */}
          <div className="college__right">
            <div className="college__dashboard">
              <div className="dash-top">
                <span className="dash-title">
                  TELEMETRY :: {activeRole.id.toUpperCase()}_VIEW
                </span>
                <span className="dash-live">CAMPUS LIVE</span>
              </div>

              {/* Metrics */}
              <div className="dash-metrics-grid">
                {activeRole.telemetryMetrics.map(m => (
                  <div key={m.label} className="dash-metric-card">
                    <span className="m-val">{m.value}</span>
                    <span className="m-lbl">{m.label}</span>
                    <span className="m-sub">{m.sub}</span>
                  </div>
                ))}
              </div>

              {/* Department Readiness Visual */}
              <div className="dash-cohorts">
                <span className="cohorts-lbl">DEPARTMENT READINESS BREAKDOWN (N=1,840)</span>
                <div className="cohort-bars">
                  <div className="cohort-row">
                    <span className="c-name">Computer Science & Eng (CSE)</span>
                    <div className="bar-track"><div className="bar-fill yellow" style={{ width: '92%' }} /></div>
                    <span className="c-pct">92%</span>
                  </div>
                  <div className="cohort-row">
                    <span className="c-name">Information Technology (IT)</span>
                    <div className="bar-track"><div className="bar-fill violet" style={{ width: '88%' }} /></div>
                    <span className="c-pct">88%</span>
                  </div>
                  <div className="cohort-row">
                    <span className="c-name">Electronics & Comm (ECE)</span>
                    <div className="bar-track"><div className="bar-fill orange" style={{ width: '79%' }} /></div>
                    <span className="c-pct">79%</span>
                  </div>
                  <div className="cohort-row">
                    <span className="c-name">Core Engineering Branches</span>
                    <div className="bar-track"><div className="bar-fill graphite" style={{ width: '71%' }} /></div>
                    <span className="c-pct">71%</span>
                  </div>
                </div>
              </div>

              {/* Alert strip */}
              <div className="dash-alert">
                <span className="alert-icon">⚠️</span>
                <span className="alert-text">
                  6-Week Pre-Drive Alert: 14 students in ECE flagged below TCS NQT speed coding cutoff. Remedial track assigned.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Campus Testimonial Quotes */}
        <div className="college__quotes">
          <span className="quotes-heading">VERIFIED CAMPUS PARTNER FEEDBACK</span>
          <div className="quotes-grid">
            {CAMPUS_QUOTES.map(q => (
              <div key={q.college} className="quote-card">
                <p className="quote-text">“{q.quote}”</p>
                <div className="quote-author-wrap">
                  <span className="quote-author">{q.author}</span>
                  <span className="quote-college">{q.college}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
