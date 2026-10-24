import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  ArrowRight,
  Lock,
  CheckCircle2,
  XCircle,
  Layers,
  Code2,
  FileText,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react'
import './QuestionLab.css'

interface TargetPreset {
  id: string
  company: string
  logoInitial: string
  color: string
  packageRange: string
  irrelevantCut: string
  sampleQuestions: {
    title: string
    type: 'Coding' | 'MCQ' | 'Platform'
    difficulty: 'Easy' | 'Medium' | 'Hard'
    insight: string
  }[]
}

const TARGET_PRESETS: TargetPreset[] = [
  {
    id: 'tcs',
    company: 'TCS (NQT & Prime)',
    logoInitial: 'TCS',
    color: '#0052CC',
    packageRange: '₹3.6 – ₹11.5 LPA',
    irrelevantCut: '12,240',
    sampleQuestions: [
      {
        title: 'Array Rotation & Subarray Optimization',
        type: 'Coding',
        difficulty: 'Easy',
        insight: 'Mandatory in 88% of TCS NQT Qualifier rounds'
      },
      {
        title: 'Automata Fix & Pseudocode Tracing',
        type: 'MCQ',
        difficulty: 'Medium',
        insight: 'Tested heavily in TCS Prime Foundation round'
      },
      {
        title: 'Dynamic Pathfinding with Obstacles',
        type: 'Coding',
        difficulty: 'Hard',
        insight: 'Key differential coding problem for ₹9–11.5L roles'
      }
    ]
  },
  {
    id: 'zoho',
    company: 'Zoho Corporation',
    logoInitial: 'ZOHO',
    color: '#E02020',
    packageRange: '₹8.5 – ₹12.0 LPA',
    irrelevantCut: '12,380',
    sampleQuestions: [
      {
        title: 'Matrix Spiral Traversal without Built-in Helpers',
        type: 'Coding',
        difficulty: 'Medium',
        insight: 'Zoho Round 2 signature problem pattern'
      },
      {
        title: 'Stack-based Parenthesis & HTML Tag Validation',
        type: 'Platform',
        difficulty: 'Easy',
        insight: 'Standard Round 1 screening challenge'
      },
      {
        title: 'Custom String Formatter & Word Break Automaton',
        type: 'Coding',
        difficulty: 'Hard',
        insight: 'Zoho Advanced Round 3 deep technical test'
      }
    ]
  },
  {
    id: 'microsoft',
    company: 'Microsoft IDC',
    logoInitial: 'MSFT',
    color: '#00A4EF',
    packageRange: '₹14 – ₹24 LPA',
    irrelevantCut: '12,390',
    sampleQuestions: [
      {
        title: 'Type Casting Truncation & Pointer Arithmetic',
        type: 'MCQ',
        difficulty: 'Easy',
        insight: 'Campus technical assessment core diagnostic'
      },
      {
        title: 'Subarray Sum Equals K (Prefix Sum Optimization)',
        type: 'Coding',
        difficulty: 'Medium',
        insight: 'High-frequency Microsoft On-site interview problem'
      },
      {
        title: 'Serialize & Deserialize Binary Trees with Constraints',
        type: 'Coding',
        difficulty: 'Hard',
        insight: 'SWE Fresher Final Technical round favorite'
      }
    ]
  },
  {
    id: 'amazon',
    company: 'Amazon AWS',
    logoInitial: 'AMZN',
    color: '#FF9900',
    packageRange: '₹28 – ₹36 LPA',
    irrelevantCut: '12,385',
    sampleQuestions: [
      {
        title: 'LRU Cache Eviction with Double-Linked Hash Index',
        type: 'Coding',
        difficulty: 'Hard',
        insight: 'Featured in 76% of Amazon SDE-1 Online Assessments'
      },
      {
        title: 'Rotated Sorted Array Search with Boundary Cases',
        type: 'Coding',
        difficulty: 'Medium',
        insight: 'High-priority core data structure diagnostic'
      },
      {
        title: 'Sliding Window Maximum & Frequency Bucket',
        type: 'Coding',
        difficulty: 'Medium',
        insight: 'Standard Amazon Round 1 technical problem'
      }
    ]
  },
  {
    id: 'infosys',
    company: 'Infosys (SP & DSE)',
    logoInitial: 'INFY',
    color: '#0070AD',
    packageRange: '₹3.6 – ₹9.5 LPA',
    irrelevantCut: '12,320',
    sampleQuestions: [
      {
        title: 'Specialist Programmer Dynamic Programming Subset',
        type: 'Coding',
        difficulty: 'Hard',
        insight: 'Tested in InfyTQ & HackWithInfy grand rounds'
      },
      {
        title: 'Greedy Coin Formulation & Array Compaction',
        type: 'Coding',
        difficulty: 'Medium',
        insight: 'Core problem for DSE (₹6.5 LPA) tier selection'
      },
      {
        title: 'Thread Safety & Concurrency Primitives',
        type: 'MCQ',
        difficulty: 'Medium',
        insight: 'Technical multiple-choice screening benchmark'
      }
    ]
  }
]

export default function QuestionLab() {
  const [selectedTargetId, setSelectedTargetId] = useState('tcs')

  const activeTarget = TARGET_PRESETS.find(t => t.id === selectedTargetId) || TARGET_PRESETS[0]

  return (
    <section className="ql-clean-section" id="practice" aria-labelledby="ql-heading">
      <div className="container">

        {/* Simple, Human Header */}
        <div className="ql-clean-head">
          <div className="section-badge">
            <span className="section-badge__dot" />
            <span>Targeted Practice</span>
          </div>

          <h2 id="ql-heading" className="ql-clean-title">
            A deep question bank.<br />
            <span className="ql-clean-title-accent">Only the few you actually need.</span>
          </h2>

          <p className="ql-clean-lead">
            Other platforms dump 2,000 generic problems on you.
            On DKODER, you pick where you want to work—and we cut away the 98% of questions you'll never be asked.
          </p>
        </div>

        {/* Interactive Experience Showcase */}
        <div className="ql-showcase-card">

          {/* Step 1: Target Recruiter Selector */}
          <div className="ql-picker-row">
            <span className="ql-picker-label">
              <Sparkles size={16} className="ql-picker-icon" />
              <span>Step 1: Pick your dream target:</span>
            </span>

            <div className="ql-company-pill-group" role="tablist">
              {TARGET_PRESETS.map(preset => {
                const isActive = preset.id === selectedTargetId
                return (
                  <button
                    key={preset.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`ql-company-pill ${isActive ? 'is-active' : ''}`}
                    onClick={() => setSelectedTargetId(preset.id)}
                  >
                    <span className="pill-initial" style={{ color: isActive ? '#17191C' : preset.color }}>
                      {preset.logoInitial}
                    </span>
                    <span className="pill-name">{preset.company}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step 2: Clear Visual Transformation (Noise vs Focus) */}
          <div className="ql-transformation-deck">

            {/* Left Card: The Problem (Without DKODER) */}
            <div className="ql-before-card">
              <div className="ql-card-header">
                <span className="ql-card-badge badge--faded">WITHOUT TARGETING</span>
                <span className="ql-card-stat">12,500+ questions</span>
              </div>

              <div className="ql-noise-list">
                <div className="noise-item">
                  <XCircle size={16} className="noise-x-icon" />
                  <div className="noise-text-col">
                    <span className="noise-item-title">LeetCode #412 Random Problems</span>
                    <span className="noise-item-tag">Never asked by your target</span>
                  </div>
                </div>

                <div className="noise-item">
                  <XCircle size={16} className="noise-x-icon" />
                  <div className="noise-text-col">
                    <span className="noise-item-title">Obscure Graph Algorithmic Tricks</span>
                    <span className="noise-item-tag">Irrelevant for campus drives</span>
                  </div>
                </div>

                <div className="noise-item">
                  <XCircle size={16} className="noise-x-icon" />
                  <div className="noise-text-col">
                    <span className="noise-item-title">500+ Generic Math Questions</span>
                    <span className="noise-item-tag">Wasting hours of prep time</span>
                  </div>
                </div>

                <div className="noise-item">
                  <XCircle size={16} className="noise-x-icon" />
                  <div className="noise-text-col">
                    <span className="noise-item-title">Outdated 2017 Aptitude Papers</span>
                    <span className="noise-item-tag">Patterns retired years ago</span>
                  </div>
                </div>
              </div>

              <div className="ql-noise-footer">
                <span className="noise-warn-dot" />
                <p className="ql-noise-explanation">
                  Wasting 3–4 hours daily solving random questions that recruiters will never test you on.
                </p>
              </div>
            </div>

            {/* Middle Divider: The Filter Action */}
            <div className="ql-filter-bridge">
              <div className="bridge-pill">
                <span className="bridge-num">-{activeTarget.irrelevantCut}</span>
                <span className="bridge-txt">noise eliminated</span>
              </div>
              <div className="bridge-arrow">→</div>
            </div>

            {/* Right Card: The Solution (With DKODER Target) */}
            <div className="ql-after-card">
              <div className="ql-card-header">
                <span className="ql-card-badge badge--active">
                  <span className="live-dot" />
                  DKODER TARGET: {activeTarget.company.toUpperCase()}
                </span>
                <span className="ql-package-tag">{activeTarget.packageRange}</span>
              </div>

              {/* Verified Questions Preview */}
              <div className="ql-curated-list">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTarget.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="curated-stack"
                  >
                    {activeTarget.sampleQuestions.map((q, idx) => (
                      <div key={idx} className="curated-item">
                        <div className="curated-item-top">
                          <span className={`type-tag type--${q.type.toLowerCase()}`}>{q.type}</span>
                          <span className={`diff-tag diff--${q.difficulty.toLowerCase()}`}>{q.difficulty}</span>
                          <div className="pro-lock" title="Included in Target Pass">
                            <Lock size={12} />
                          </div>
                        </div>

                        <h4 className="curated-item-title">{q.title}</h4>
                        <p className="curated-item-insight">
                          <CheckCircle2 size={13} className="insight-check" />
                          <span>{q.insight}</span>
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Target Action */}
              <div className="ql-after-foot">
                <a href={`/pricing`} className="ql-action-primary-btn">
                  <span>Unlock {activeTarget.company} Practice Bank</span>
                  <ArrowRight size={16} />
                </a>
              </div>

            </div>

          </div>

          {/* Simple Footnote */}
          <div className="ql-footer-note">
            <span>Want to test your coding skills for free first?</span>
            <a href="/practice/coding" className="ql-free-link">
              Practice coding questions free, without company filters →
            </a>
          </div>

        </div>

      </div>
    </section>
  )
}
