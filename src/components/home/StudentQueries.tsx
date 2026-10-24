import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bot, MessageSquare, Filter, Compass, CheckCircle2, ArrowRight } from 'lucide-react'
import './StudentQueries.css'

interface QueryScenario {
  id: string
  studentText: string
  botAnswer: string
  roadmap: string[]
  recommendedRoute: string
}

const QUERY_SCENARIOS: QueryScenario[] = [
  {
    id: '10lpa',
    studentText: 'I have a dream to get placed with a ₹10 LPA package. Can you help me?',
    botAnswer: 'Of course! We reverse-engineer ₹10+ LPA company interview patterns. You need advanced DSA (Trees, DP, Graphs), solid System Design fundamentals, and high-frequency problem shortlists from companies like Amazon, Adobe, and Flipkart.',
    roadmap: ['Solve 80+ Medium/Hard DSA problems', 'Master core CS fundamentals (OS, DBMS, CN)', 'Build 2 full-stack resume projects with live URLs'],
    recommendedRoute: '/practice?package=10-lpa'
  },
  {
    id: 'game-dev',
    studentText: 'I want to become a game developer. Can you guide me?',
    botAnswer: 'I will frame a roadmap for you! Game engineering requires strong C++ memory management, linear algebra, computer graphics fundamentals, and practical engine experience with Unreal / Unity.',
    roadmap: ['C++ Modern Standards (C++17/20)', 'Data structures & Spatial Partitioning (Quadtrees, BVH)', 'Graphics APIs (OpenGL / Vulkan / DirectX)'],
    recommendedRoute: '/learn/courses'
  },
  {
    id: 'zoho',
    studentText: 'I want to get placed at Zoho. Please help me.',
    botAnswer: 'Zoho interview rounds focus intensely on pure programming without standard libraries, basic mathematics/puzzles, and Round 3 advanced OOP application design (e.g., Railway Reservation, Snake Game).',
    roadmap: ['Practice Zoho Round 2 C/Java coding problems', 'Design real-world OOP CLI applications', 'Sharpen logical deduction puzzles'],
    recommendedRoute: '/practice?company=Zoho'
  },
  {
    id: 'ethical-hacking',
    studentText: 'I want to be an ethical hacker. Can you guide me?',
    botAnswer: 'Start by building deep computer networking and OS internals knowledge, followed by CEH (Certified Ethical Hacker) and CompTIA Security+ aligned problem tracks.',
    roadmap: ['TCP/IP, Wireshark, Subnetting & Network security', 'Linux command line & Bash scripting', 'OWASP Top 10 vulnerabilities & CTF walkthroughs'],
    recommendedRoute: '/certifications/topic'
  },
  {
    id: 'no-target',
    studentText: 'I practise coding every day, but I don’t have a target.',
    botAnswer: 'I will help you practise toward a clear target. Random problem solving causes burnout. Choose your target salary tier and company type first, and DKoder will calibrate your daily question mix automatically.',
    roadmap: ['Diagnose current aptitude and coding speed', 'Lock in target tier (Bronze, Silver, Gold, Platinum)', 'Maintain daily 3-problem curated streak'],
    recommendedRoute: '/practice'
  }
]

export default function StudentQueries() {
  const [activeId, setActiveId] = useState('10lpa')
  const currentScenario = QUERY_SCENARIOS.find(s => s.id === activeId) || QUERY_SCENARIOS[0]

  return (
    <section className="queries-section" id="queries">
      <div className="container">
        {/* Head */}
        <div className="queries-head">
          <span className="queries-eyebrow">
            <span className="eyebrow-accent-dot" />
            <span>Target-Based Placement Guidance</span>
          </span>
          <h2 className="queries-title">Every Student Starts with a Real Question</h2>
          <p className="queries-subtitle">
            Whether your dream is a ₹10 LPA offer, a specific tech recruiter, or a clear target roadmap,
            DKoder guides your daily practice from confusion to offer letter.
          </p>
        </div>

        {/* Interactive Chat Dialogue Simulation */}
        <div className="queries-dialogue-wrap">
          {/* Chat Container */}
          <div className="queries-chat-card">
            {/* Question Selector Tabs */}
            <div className="queries-chat-tabs" role="tablist" aria-label="Student queries">
              {QUERY_SCENARIOS.map(sc => (
                <button
                  key={sc.id}
                  type="button"
                  role="tab"
                  aria-selected={activeId === sc.id}
                  className={`queries-tab-btn ${activeId === sc.id ? 'active' : ''}`}
                  onClick={() => setActiveId(sc.id)}
                >
                  {sc.id === '10lpa' ? '₹10 LPA Dream' :
                   sc.id === 'game-dev' ? 'Game Developer' :
                   sc.id === 'zoho' ? 'Zoho Placement' :
                   sc.id === 'ethical-hacking' ? 'Ethical Hacker' : 'Daily Practice Target'}
                </button>
              ))}
            </div>

            {/* Student Message */}
            <div className="queries-bubble queries-bubble--student">
              <span className="queries-bubble-label">Student Question</span>
              <p style={{ margin: 0, fontWeight: 600 }}>“{currentScenario.studentText}”</p>
            </div>

            {/* Bot Response */}
            <div className="queries-bubble queries-bubble--bot">
              <span className="queries-bubble-label">DKoder Career Engine</span>
              <p style={{ margin: '0 0 0.85rem' }}>{currentScenario.botAnswer}</p>

              {/* Actionable Roadmap */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.5rem' }}>
                {currentScenario.roadmap.map((step, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8125rem' }}>
                    <CheckCircle2 size={13} style={{ color: '#8875FF', flexShrink: 0 }} />
                    <span style={{ fontWeight: 500 }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div style={{ alignSelf: 'flex-start', paddingTop: '0.5rem' }}>
              <Link to={currentScenario.recommendedRoute} className="queries-action-link">
                <span>Practise this roadmap now</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Right Info Box */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '1.25rem', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.5rem', color: '#17191C' }}>
                Target-First Preparation
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                DKoder is not an infinite unstructured list of 2,000 algorithmic puzzles. Every question is company-tagged,
                salary-banded, and weighted by actual recruitment frequency in Indian engineering colleges.
              </p>
            </div>

            <div style={{ background: '#FFFDF0', padding: '1.75rem', borderRadius: '1.25rem', border: '1.5px solid #F5FF38' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 0.35rem', color: '#17191C' }}>
                12,500+ Verified Company Questions
              </h4>
              <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                Includes questions from TCS NQT, Infosys InfyTQ, Wipro Elite, Accenture, Cognizant, Zoho, Amazon, Microsoft, and Google.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Entry Point Goal Cards */}
        <div className="queries-actions-grid">
          <div className="queries-action-card">
            <div>
              <div className="queries-action-icon">
                <Filter size={20} />
              </div>
              <h3 className="queries-action-title">One Goal Narrows the Next Question</h3>
              <p className="queries-action-desc">
                Start with a target, then filter by company, package, mode and level. A smaller shortlist makes the next action easier to choose.
              </p>
            </div>
            <Link to="/practice" className="queries-action-link">
              <span>Try the filters ↗</span>
            </Link>
          </div>

          <div className="queries-action-card">
            <div>
              <div className="queries-action-icon">
                <Compass size={20} />
              </div>
              <h3 className="queries-action-title">Start with a Short Skills Check</h3>
              <p className="queries-action-desc">
                A quick diagnostic gives you a first view of aptitude, programming, problem solving and technical basics so you can focus your next practice session.
              </p>
            </div>
            <Link to="/practice/coding" className="queries-action-link">
              <span>Check my skills ↗</span>
            </Link>
          </div>

          <div className="queries-action-card">
            <div>
              <div className="queries-action-icon">
                <MessageSquare size={20} />
              </div>
              <h3 className="queries-action-title">Let a Target Decide Today’s Practice</h3>
              <p className="queries-action-desc">
                Choose the role or company you want. Then use the relevant track, mock exam or bundle as a practical next step.
              </p>
            </div>
            <Link to="/pricing" className="queries-action-link">
              <span>Choose a career focus ↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
