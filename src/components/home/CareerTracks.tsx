import { useState } from 'react'
import './CareerTracks.css'

interface Track {
  id: string
  label: string
  sub: string
  tag: string
  color: string
  accentColor: string
  image: string
  companies: string[]
  questionCount: number
  curriculum: { phase: string; title: string; desc: string; questions: number }[]
  keySkills: string[]
  expectedPkg: string
  description: string
}

const TRACKS: Track[] = [
  {
    id: 'sde',
    label: 'Software Engineering',
    sub: 'SDE-1 / SDE-2 / Product Unicorns',
    tag: 'PRODUCT FIRMS',
    color: 'lime',
    accentColor: '#D8FF48',
    image: '/assets/track-sde.jpg',
    expectedPkg: '₹14 — ₹48 LPA',
    description: 'Deep algorithmic mastery, high-performance distributed systems, and real-time coding interviews for top product companies and global unicorns.',
    companies: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Flipkart', 'Uber', 'Atlassian'],
    questionCount: 480,
    keySkills: ['Binary Trees & BSTs', 'Dynamic Programming', 'Graph Algorithms', 'System Architecture', 'Concurrency & OS'],
    curriculum: [
      { phase: '01', title: 'Data Structures Foundations', desc: 'Arrays, Two Pointers, Sliding Window, Linked Lists', questions: 120 },
      { phase: '02', title: 'Advanced Graph & DP Patterns', desc: 'Topological Sort, Dijkstra, 2D State Transitions', questions: 180 },
      { phase: '03', title: 'Low-Level & System Design', desc: 'Design Patterns, Concurrency, Caching & Sharding', questions: 100 },
      { phase: '04', title: 'Proctored Mock Technicals', desc: 'Time-boxed 60min live coding screens with AI feedback', questions: 80 },
    ]
  },
  {
    id: 'data',
    label: 'Data Science & AI',
    sub: 'ML Engineers / Data Scientists',
    tag: 'AI & INTELLIGENCE',
    color: 'violet',
    accentColor: '#8C7CFF',
    image: '/assets/track-data.jpg',
    expectedPkg: '₹12 — ₹38 LPA',
    description: 'Statistical modeling, tensor mathematics, end-to-end ML pipelines, and production data infrastructure calibrated for leading analytics and AI labs.',
    companies: ['Google DeepMind', 'Amazon AWS', 'Fractal', 'Tiger Analytics', 'Mu Sigma'],
    questionCount: 290,
    keySkills: ['Probability & Statistics', 'Deep Neural Networks', 'PyTorch & Transformers', 'SQL & Vector DBs', 'MLOps & Deployment'],
    curriculum: [
      { phase: '01', title: 'Mathematical Core', desc: 'Linear Algebra, Probability Distributions, Vector Math', questions: 70 },
      { phase: '02', title: 'Machine Learning Pipelines', desc: 'Gradient Boosting, Feature Engineering, Regularization', questions: 95 },
      { phase: '03', title: 'Deep Learning & LLM Systems', desc: 'Attention Mechanisms, Embedding Stores, Retrieval-Augmented Gen', questions: 75 },
      { phase: '04', title: 'Live Case Study Rounds', desc: 'Real-world business case simulations under recruiter evaluation', questions: 50 },
    ]
  },
  {
    id: 'service',
    label: 'Service & IT Leaders',
    sub: 'TCS Digital / Infosys SP / Wipro Turbo',
    tag: 'MASS RECRUITERS',
    color: 'orange',
    accentColor: '#FF9B3E',
    image: '/assets/track-service.jpg',
    expectedPkg: '₹7 — ₹11 LPA (Differential)',
    description: 'Systematic prep for Tier-1 differential packages (Prime/Digital/Turbo). Covers aptitude screening, verbal speed, and competitive CodeVita patterns.',
    companies: ['TCS Digital', 'Infosys SP', 'Wipro Turbo', 'Cognizant GenC', 'Capgemini'],
    questionCount: 620,
    keySkills: ['Quantitative Aptitude', 'Logical Reasoning', 'Core Coding Rounds', 'Technical MCQs', 'Managerial & HR Prep'],
    curriculum: [
      { phase: '01', title: 'Speed Aptitude & Reasoning', desc: 'Time & Work, Permutations, Syllogisms, Data Interpretation', questions: 220 },
      { phase: '02', title: 'Differential Coding Test', desc: 'Strings, Matrix Traversal, Modular Math for Digital drives', questions: 190 },
      { phase: '03', title: 'CS Fundamentals & SQL', desc: 'DBMS, Normalization, SQL Joins, OOP Concepts', questions: 120 },
      { phase: '04', title: 'Full Proctored NQT Mock', desc: 'Simulated 180min continuous national placement exams', questions: 90 },
    ]
  },
  {
    id: 'core',
    label: 'Core Engineering',
    sub: 'ECE / VLSI / Embedded Systems / PSUs',
    tag: 'HARDWARE & PSU',
    color: 'lime',
    accentColor: '#D8FF48',
    image: '/assets/track-core.jpg',
    expectedPkg: '₹8 — ₹24 LPA',
    description: 'Silicon verification, embedded C, digital electronics, and PSU exam readiness for students entering semiconductor and aerospace leaders.',
    companies: ['ISRO', 'DRDO', 'Siemens', 'L&T Technology', 'Texas Instruments', 'Qualcomm'],
    questionCount: 185,
    keySkills: ['Digital Electronics', 'Embedded C & RTOS', 'Microcontrollers (ARM)', 'VLSI / Verilog', 'Signals & Systems'],
    curriculum: [
      { phase: '01', title: 'Circuit & Logic Analysis', desc: 'Boolean Algebra, State Machines, Timing Diagrams', questions: 50 },
      { phase: '02', title: 'Embedded Firmware Engineering', desc: 'Pointers, Bit Manipulation, UART/SPI/I2C Protocols', questions: 65 },
      { phase: '03', title: 'Hardware Verification', desc: 'Verilog testbenches, CMOS logic, Clock Domain Crossing', questions: 40 },
      { phase: '04', title: 'Technical Interview Panels', desc: 'Whiteboard circuit diagnostics and PSU technical rounds', questions: 30 },
    ]
  }
]

export default function CareerTracks() {
  const [activeTrack, setActiveTrack] = useState<Track>(TRACKS[0])

  return (
    <section className="tracks" id="tracks" aria-labelledby="tracks-heading">
      <div className="container">
        {/* Header */}
        <div className="tracks__header">
          <div className="tag tag--violet">PATHWAY ENGINEERING</div>
          <h2 id="tracks-heading" className="tracks__heading">
            Dedicated Trajectories for Every Dream Role
          </h2>
          <p className="tracks__sub">
            Recruiters test completely different skill profiles. Select your target domain
            to unlock an end-to-end roadmap calibrated to actual campus evaluation rubrics.
          </p>
        </div>

        {/* Track Pill Selectors */}
        <div className="tracks__nav" role="tablist">
          {TRACKS.map(t => {
            const isActive = t.id === activeTrack.id
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                className={`tracks__nav-pill ${isActive ? 'active' : ''}`}
                style={{ '--accent-color': t.accentColor } as React.CSSProperties}
                onClick={() => setActiveTrack(t)}
              >
                <div className="pill-top">
                  <span className="pill-tag">{t.tag}</span>
                  <span className="pill-count">{t.questionCount} Qs</span>
                </div>
                <div className="pill-title">{t.label}</div>
                <div className="pill-sub">{t.sub}</div>
              </button>
            )
          })}
        </div>

        {/* Detailed Pathway Showcase Card */}
        <div className="tracks__showcase">
          {/* Left: Generated Bespoke Artwork with Overlay HUD */}
          <div className="tracks__visual-col">
            <div className="tracks__image-frame">
              <img
                src={activeTrack.image}
                alt={`${activeTrack.label} pathway visualization`}
                className="tracks__img"
              />
              <div className="tracks__img-overlay" />

              {/* Floating Spatial Badge */}
              <div className="tracks__floating-badge">
                <span className="badge-tag">{activeTrack.tag}</span>
                <span className="badge-pkg">Band: {activeTrack.expectedPkg}</span>
              </div>

              {/* Verified Placement Recruiters bar */}
              <div className="tracks__img-recruiters">
                <span className="lbl">Verified Recruiters:</span>
                <div className="list">
                  {activeTrack.companies.map(c => (
                    <span key={c} className="recruiter-chip">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Structured Curriculum & Milestone Roadmap */}
          <div className="tracks__info-col">
            <div className="tracks__info-head">
              <div className="tracks__info-title-wrap">
                <h3 className="tracks__info-title">{activeTrack.label} Track</h3>
                <span className="tracks__pkg-badge">{activeTrack.expectedPkg}</span>
              </div>
              <p className="tracks__info-desc">{activeTrack.description}</p>
            </div>

            {/* Core Competencies Chips */}
            <div className="tracks__skills-wrap">
              <span className="skills-lbl">EVALUATED SKILLS:</span>
              <div className="skills-chips">
                {activeTrack.keySkills.map(skill => (
                  <span key={skill} className="skill-chip">{skill}</span>
                ))}
              </div>
            </div>

            {/* Step-by-Step Curriculum Timeline */}
            <div className="tracks__curriculum">
              <span className="curriculum-lbl">STRUCTURED PREPARATION PHASES:</span>
              <div className="timeline">
                {activeTrack.curriculum.map(phase => (
                  <div key={phase.phase} className="timeline-step">
                    <div className="step-marker">
                      <span className="step-num">{phase.phase}</span>
                      <div className="step-line" />
                    </div>
                    <div className="step-content">
                      <div className="step-header">
                        <span className="step-title">{phase.title}</span>
                        <span className="step-q-count">{phase.questions} Questions</span>
                      </div>
                      <p className="step-desc">{phase.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA action */}
            <div className="tracks__cta-row">
              <a href="https://dkoder.co.in/practice" className="tracks__enroll-btn">
                <span>Start {activeTrack.label} Curriculum</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </a>

              <span className="tracks__guarantee-text">
                ✓ Includes curated mock tests & company-tagged solutions
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
