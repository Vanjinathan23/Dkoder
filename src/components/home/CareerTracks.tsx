import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Building2,
  Rocket,
  Cpu,
  Gem,
  Crown,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  MapPin,
  Layers,
  Compass,
  Milestone,
  type LucideIcon
} from 'lucide-react'
import './CareerTracks.css'

interface PathwayPhase {
  phaseNum: string
  title: string
  detail: string
}

interface CareerPathway {
  id: string
  tierRank: string
  title: string
  levelTag: string
  icon: LucideIcon
  package: string
  salaryMin: number
  salaryMax: number
  hiringCompanies: { name: string; ctc: string; questions: number }[]
  roadmap: PathwayPhase[]
  nextMoveAdvice: string
  bundleName: string
  bundleSlug: string
  bundlePrice: string
  bundleQuestions: number
}

const CAREER_PATHWAYS: CareerPathway[] = [
  {
    id: 'service',
    tierRank: 'TIER 01',
    title: 'Service & IT Developer',
    levelTag: 'National Campus Drives',
    icon: Building2,
    package: '₹3.6 – ₹7.0 LPA',
    salaryMin: 3.6,
    salaryMax: 7.0,
    hiringCompanies: [
      { name: 'TCS', ctc: '₹3.6–7L', questions: 240 },
      { name: 'Infosys', ctc: '₹3.6–9.5L', questions: 210 },
      { name: 'Wipro', ctc: '₹3.5–6.5L', questions: 180 },
      { name: 'Cognizant', ctc: '₹4–6.75L', questions: 210 }
    ],
    roadmap: [
      {
        phaseNum: '01',
        title: 'Speed-Coding Strings & Arrays',
        detail: 'Build automatic muscle memory for two-pointer, frequency hashing, and palindrome operations under 25-minute timers.'
      },
      {
        phaseNum: '02',
        title: 'Quantitative & Analytical Reasoning',
        detail: 'Master option-elimination tactics for percentages, ratios, permutations, and blood relation puzzles.'
      },
      {
        phaseNum: '03',
        title: 'SQL & Pseudocode Qualifier',
        detail: 'Practice predicting variable scoping, bitwise logic, and join conditions to clear national screening thresholds.'
      }
    ],
    nextMoveAdvice: 'Prioritize string and array speed-coding to guarantee clearing the national recruiter qualifier cutoff.',
    bundleName: 'National Qualifier MNC Prep Pack',
    bundleSlug: 'mass-mnc-accelerator',
    bundlePrice: '₹399',
    bundleQuestions: 320
  },
  {
    id: 'digital',
    tierRank: 'TIER 02',
    title: 'Digital & Specialist Roles',
    levelTag: 'Differential Placement Offers',
    icon: Rocket,
    package: '₹7.0 – ₹12.5 LPA',
    salaryMin: 7.0,
    salaryMax: 12.5,
    hiringCompanies: [
      { name: 'TCS Prime', ctc: '₹9–11.5L', questions: 160 },
      { name: 'Infosys SP', ctc: '₹9.5L', questions: 140 },
      { name: 'Cognizant GenC Next', ctc: '₹8.5–9.2L', questions: 150 },
      { name: 'Barclays', ctc: '₹11–12.5L', questions: 160 }
    ],
    roadmap: [
      {
        phaseNum: '01',
        title: 'Non-Linear Data Structures (Trees & BST)',
        detail: 'Solve tree traversals (inorder, boundary, zig-zag) and lowest common ancestor logic with tight recursive limits.'
      },
      {
        phaseNum: '02',
        title: 'Dynamic Programming & Greedy Strategy',
        detail: 'Formulate 1D/2D memoization tables for knapsack, coin change, and longest increasing subsequence patterns.'
      },
      {
        phaseNum: '03',
        title: 'Strict Time & Space Bounds',
        detail: 'Optimize brute-force solutions from O(N²) down to O(N log N) to satisfy differential test cases.'
      }
    ],
    nextMoveAdvice: 'Practice Medium DP and Tree patterns to unlock the ₹9–11.5L compensation band at campus drives.',
    bundleName: 'TCS Prime & Infosys SP Differential Bundle',
    bundleSlug: 'differential-roles-prep',
    bundlePrice: '₹599',
    bundleQuestions: 240
  },
  {
    id: 'embedded',
    tierRank: 'TIER 03',
    title: 'Chip & Systems Engineer',
    levelTag: 'Core Hardware & Low-Level Code',
    icon: Cpu,
    package: '₹12.0 – ₹26.0 LPA',
    salaryMin: 12.0,
    salaryMax: 26.0,
    hiringCompanies: [
      { name: 'Intel', ctc: '₹15L', questions: 68 },
      { name: 'Cisco', ctc: '₹16L', questions: 72 },
      { name: 'Qualcomm', ctc: '₹16–22L', questions: 84 },
      { name: 'NVIDIA', ctc: '₹26L', questions: 62 }
    ],
    roadmap: [
      {
        phaseNum: '01',
        title: 'C Fundamentals & Preprocessor Phases',
        detail: 'Master macro expansions, compilation stages, storage classes (static, extern, volatile), and header guard rules.'
      },
      {
        phaseNum: '02',
        title: 'Pointer Arithmetic & Memory Layout',
        detail: 'Navigate stack vs heap boundaries, double pointers, function pointers, and struct padding/alignment logic.'
      },
      {
        phaseNum: '03',
        title: 'Bitwise Manipulation & Hardware Logic',
        detail: 'Execute bitmasking, bit-flipping, endianness conversion, and circular shift registers tested in semiconductor OAs.'
      }
    ],
    nextMoveAdvice: 'Focus on C memory layout and pointer arithmetic reported across Intel, Cisco, and Qualcomm drives.',
    bundleName: 'Embedded C & Systems Hardware Pack',
    bundleSlug: 'embedded-systems-c',
    bundlePrice: '₹499',
    bundleQuestions: 180
  },
  {
    id: 'product',
    tierRank: 'TIER 04',
    title: 'Product-Company SDE',
    levelTag: 'Software Architecture & Logic',
    icon: Gem,
    package: '₹10.0 – ₹22.0 LPA',
    salaryMin: 10.0,
    salaryMax: 22.0,
    hiringCompanies: [
      { name: 'Zoho', ctc: '₹8.5–12L', questions: 184 },
      { name: 'ServiceNow', ctc: '₹14–20L', questions: 110 },
      { name: 'Salesforce', ctc: '₹16–22L', questions: 116 },
      { name: 'Oracle', ctc: '₹12–18L', questions: 110 }
    ],
    roadmap: [
      {
        phaseNum: '01',
        title: 'Recursion & Matrix Backtracking',
        detail: 'Solve N-Queens, Sudoku solvers, and maze pathing without external packages or pre-built library shortcuts.'
      },
      {
        phaseNum: '02',
        title: 'Custom Hash Tables & Primitive DS',
        detail: 'Implement collision resolution (chaining, linear probing) and dynamic array re-allocations from scratch.'
      },
      {
        phaseNum: '03',
        title: 'Object-Oriented Architecture & Clean Code',
        detail: 'Design clean modular classes, separation of concerns, and testable design patterns tested in Round 3.'
      }
    ],
    nextMoveAdvice: 'Practice solving Zoho Round 2 & 3 recursion challenges from scratch without built-in library helpers.',
    bundleName: 'Zoho & Product SDE Master Bundle',
    bundleSlug: 'zoho-product-pack',
    bundlePrice: '₹699',
    bundleQuestions: 184
  },
  {
    id: 'bigtech',
    tierRank: 'TIER 05',
    title: 'Big Tech & FAANG SDE',
    levelTag: 'Super-Dream Distributed Scale',
    icon: Crown,
    package: '₹24.0 – ₹44.0+ LPA',
    salaryMin: 24.0,
    salaryMax: 44.0,
    hiringCompanies: [
      { name: 'Google', ctc: '₹32–44L', questions: 260 },
      { name: 'Amazon', ctc: '₹28–36L', questions: 310 },
      { name: 'Microsoft', ctc: '₹24–42L', questions: 280 },
      { name: 'Uber', ctc: '₹34–48L', questions: 148 }
    ],
    roadmap: [
      {
        phaseNum: '01',
        title: 'Hard Dynamic Programming & Graph Flows',
        detail: 'Dominate multi-state DP, Dijkstra, Topological Sort, and Segment Trees with optimal time/space complexity.'
      },
      {
        phaseNum: '02',
        title: 'Concurrent Pipelines & Distributed Caches',
        detail: 'Reason through race conditions, locks, LRU eviction policies, and rate limiters tested in system design interviews.'
      },
      {
        phaseNum: '03',
        title: 'Timed 45-Min Algorithmic Interviews',
        detail: 'Practice live whiteboarding, communicating trade-offs aloud, and writing production-grade test cases under pressure.'
      }
    ],
    nextMoveAdvice: 'Train on timed 45-minute technical interviews and Online Assessment Hard rounds reported at Google and Amazon.',
    bundleName: 'FAANG & Super-Dream OA Master Bundle',
    bundleSlug: 'super-dream-fellowship',
    bundlePrice: '₹999',
    bundleQuestions: 420
  }
]

export default function CareerTracks() {
  const [activeTrackId, setActiveTrackId] = useState('embedded')

  const activeIndex = CAREER_PATHWAYS.findIndex(t => t.id === activeTrackId)
  const activePathway = CAREER_PATHWAYS[activeIndex] || CAREER_PATHWAYS[0]
  const ActiveIcon = activePathway.icon

  const practiceUrl = `/practice?company=${encodeURIComponent(activePathway.hiringCompanies.map(c => c.name).join(','))}`

  return (
    <section className="pathway-section" id="career-tracks" aria-labelledby="pathway-heading">
      <div className="container">

        {/* Simple, Human Header */}
        <div className="pathway-head">
          <div className="section-badge">
            <span className="section-badge__dot" />
            <span>Career Specializations</span>
          </div>

          <h2 id="pathway-heading" className="pathway-title">
            Right filter.<br />
            <span className="pathway-title-accent">Right career roadmap.</span>
          </h2>

          <p className="pathway-lead">
            Every engineering role tests completely different skills.
            Choose your target career path to inspect compensation, hiring companies, and your exact 3-phase study roadmap.
          </p>
        </div>

        {/* 1. The Interactive Career Progression Ladder */}
        <div className="pathway-ladder-wrap">

          {/* Ladder Rail connecting the 5 steps */}
          <div className="ladder-rail-track" aria-hidden="true">
            <div
              className="ladder-rail-fill"
              style={{ width: `${(activeIndex / (CAREER_PATHWAYS.length - 1)) * 100}%` }}
            />
          </div>

          {/* 5 Progression Step Cards */}
          <div className="pathway-ladder-steps" role="tablist" aria-label="Career Progression Ladder">
            {CAREER_PATHWAYS.map((track, idx) => {
              const isSelected = track.id === activeTrackId
              const isPassed = idx <= activeIndex
              const Icon = track.icon
              return (
                <button
                  key={track.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`ladder-step-card ${isSelected ? 'is-selected' : ''} ${isPassed ? 'is-passed' : ''}`}
                  onClick={() => setActiveTrackId(track.id)}
                >
                  <div className="step-card-header">
                    <span className="step-tier-rank">{track.tierRank}</span>
                    <div className="step-node-bubble">
                      <Icon size={16} />
                    </div>
                  </div>

                  <div className="step-card-body">
                    <h3 className="step-role-title">{track.title}</h3>
                    <div className="step-salary-pill">
                      {track.package}
                    </div>
                  </div>

                  <div className="step-card-footer">
                    <span>{track.levelTag}</span>
                    {isSelected && <span className="step-active-indicator" />}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* 2. The Interactive Career Blueprint & Plan */}
        <div className="pathway-blueprint-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePathway.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="blueprint-grid"
            >

              {/* Column 1: Market Compensation & Hiring Network */}
              <div className="blueprint-col col--market">
                <div className="col-header-tag">
                  <span className="col-step-pill">01</span>
                  <span className="col-header-title">WHO HIRES & WHAT THEY PAY</span>
                </div>

                <div className="market-salary-hero">
                  <span className="salary-label-sub">VERIFIED CTC SPECTRUM</span>
                  <h4 className="salary-ctc-display">{activePathway.package}</h4>
                  <p className="salary-context-caption">Reported for freshers & 0–2 years early-career roles</p>

                  {/* Visual Salary Horizon Bar */}
                  <div className="salary-horizon-track">
                    <div
                      className="salary-horizon-fill"
                      style={{
                        left: `${Math.min(100, (activePathway.salaryMin / 50) * 100)}%`,
                        width: `${Math.max(14, ((activePathway.salaryMax - activePathway.salaryMin) / 50) * 100)}%`
                      }}
                    >
                      <span className="horizon-dot left" />
                      <span className="horizon-dot right" />
                    </div>
                  </div>
                  <div className="salary-horizon-labels">
                    <span>₹0 LPA</span>
                    <span>₹25 LPA</span>
                    <span>₹50+ LPA</span>
                  </div>
                </div>

                {/* Verified Hiring Recruiter Tags */}
                <div className="market-hiring-cluster">
                  <span className="hiring-cluster-title">Active Hiring Recruiter Network:</span>
                  <div className="hiring-chips-flow">
                    {activePathway.hiringCompanies.map(c => (
                      <div key={c.name} className="hiring-co-badge">
                        <span className="badge-co-name">{c.name}</span>
                        <span className="badge-co-ctc">{c.ctc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Column 2: 3-Phase Step-by-Step Curriculum Roadmap */}
              <div className="blueprint-col col--roadmap">
                <div className="col-header-tag">
                  <span className="col-step-pill">02</span>
                  <span className="col-header-title">YOUR 3-PHASE STUDY ROADMAP</span>
                </div>

                <p className="roadmap-intro-note">
                  Instead of drowning in 2,000 problems, master these exact 3 milestones in sequence:
                </p>

                <div className="roadmap-milestones-tree">
                  {activePathway.roadmap.map((phase, idx) => (
                    <div key={idx} className="milestone-node">
                      <div className="milestone-step-circle">
                        <span>{phase.phaseNum}</span>
                      </div>
                      <div className="milestone-content-card">
                        <h5 className="milestone-phase-title">{phase.title}</h5>
                        <p className="milestone-phase-desc">{phase.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: The Immediate Action Launchpad */}
              <div className="blueprint-col col--action">
                <div className="col-header-tag">
                  <span className="col-step-pill">03</span>
                  <span className="col-header-title">IMMEDIATE NEXT MOVE</span>
                </div>

                <div className="action-advice-card">
                  <div className="advice-headline-row">
                    <Sparkles size={16} className="advice-sparkle-icon" />
                    <span className="advice-lbl">TACTICAL RECOMMENDATION</span>
                  </div>
                  <p className="advice-body-text">{activePathway.nextMoveAdvice}</p>
                </div>

                {/* Recommended Prep Bundle */}
                <div className="action-bundle-spotlight">
                  <div className="bundle-spotlight-left">
                    <span className="bundle-spotlight-tag">CURATED BUNDLE</span>
                    <h5 className="bundle-spotlight-title">{activePathway.bundleName}</h5>
                    <span className="bundle-spotlight-meta">{activePathway.bundleQuestions} verified questions</span>
                  </div>
                  <div className="bundle-spotlight-right">
                    <span className="bundle-spotlight-price">{activePathway.bundlePrice}</span>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="action-buttons-group">
                  <a href={practiceUrl} className="pathway-primary-btn">
                    <span>Start Preparation for {activePathway.title}</span>
                    <ArrowRight size={16} />
                  </a>

                  <a href="/bundles" className="pathway-secondary-link">
                    Browse all 12 preparation bundles →
                  </a>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
