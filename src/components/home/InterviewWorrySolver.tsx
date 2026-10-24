import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Compass,
  Moon,
  Code2,
  Target,
  Shuffle,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react'
import './InterviewWorrySolver.css'

interface WorryItem {
  id: string
  category: 'night-before' | 'coding-tech' | 'confidence'
  categoryLabel: string
  thought: string
  solution: string
  tactics: string[]
}

const CATEGORIES = [
  { id: 'all', label: 'All Doubts', icon: Compass },
  { id: 'night-before', label: 'Night-Before Panic', icon: Moon },
  { id: 'coding-tech', label: 'Coding & Technical', icon: Code2 },
  { id: 'confidence', label: 'Confidence & CTC', icon: Target },
]

const WORRIES_DATA: WorryItem[] = [
  {
    id: 'where-begin',
    category: 'night-before',
    categoryLabel: 'Night-Before Panic',
    thought: 'Where do I even begin?',
    solution: 'Start with today’s curated 3-question diagnostic. Do not try to solve 100 questions in one night. Solve 1 Easy warmup to build rhythm, 1 Medium company problem, and review 1 core concept.',
    tactics: ['Pick 1 topic (e.g. Arrays/Strings)', 'Time-box practice to 45 mins', 'Review solution patterns before sleeping']
  },
  {
    id: 'what-revise',
    category: 'night-before',
    categoryLabel: 'Night-Before Panic',
    thought: 'What should I revise tonight?',
    solution: 'Revise your project architecture, your top 5 favorite solved problems, and standard CS fundamentals (Indexing in DBMS, Virtual Memory in OS, Polymorphism in OOP).',
    tactics: ['15 mins: Project architecture diagram', '20 mins: OOP 4 pillars with code examples', '15 mins: SQL joins and indexing']
  },
  {
    id: 'forget-everything',
    category: 'night-before',
    categoryLabel: 'Night-Before Panic',
    thought: 'What if I forget everything?',
    solution: 'Interviewers expect nervousness. If you freeze, take a sip of water, state your assumption aloud, and start with a brute-force approach first.',
    tactics: ['Say: "Let me start with a baseline approach"', 'Write input/output examples to jog memory', 'Iteratively optimize once brute force is written']
  },
  {
    id: 'will-they-code',
    category: 'coding-tech',
    categoryLabel: 'Coding & Technical',
    thought: 'Will they ask me to code live?',
    solution: 'Yes. Prepare to write clean code without an IDE autocomplete. Practice explaining your time and space complexity out loud as you type each line.',
    tactics: ['State assumptions upfront', 'Name variables descriptively', 'Write dry-run test cases before submitting']
  },
  {
    id: 'right-questions',
    category: 'coding-tech',
    categoryLabel: 'Coding & Technical',
    thought: 'Did I practise the right questions?',
    solution: 'Filter questions by your exact recruiter on the Practice page. If you are interviewing at TCS, focus on NQT patterns; for Amazon, focus on Trees, HashMaps, and BFS/DFS.',
    tactics: ['Review company-specific tag frequency', 'Prioritize questions asked in the last 2 quarters', 'Inspect recruiter test patterns']
  },
  {
    id: 'fail-aptitude',
    category: 'coding-tech',
    categoryLabel: 'Coding & Technical',
    thought: 'What if I fail the aptitude round?',
    solution: 'Aptitude tests speed and elimination. Never spend more than 90 seconds on a single question. Flag hard ones and secure all easy marks first.',
    tactics: ['Use option elimination strategies', 'Secure high accuracy on percentage & ratio questions', 'Leave difficult permutations for round 2']
  },
  {
    id: 'have-improved',
    category: 'confidence',
    categoryLabel: 'Confidence & CTC',
    thought: 'Have I really improved?',
    solution: 'Check your visual skill radar on the dashboard. Look at your accuracy on 2-pointer and string questions over the last 14 days, not just total question count.',
    tactics: ['Compare current solve speed vs Day 1', 'Notice how quickly you spot edge cases', 'Trust your compiled repository of solved tests']
  },
  {
    id: 'explain-projects',
    category: 'confidence',
    categoryLabel: 'Confidence & CTC',
    thought: 'Can I explain my projects clearly?',
    solution: 'Use the STAR method: Situation, Task, Action, Result. Focus on the hardest bug you personally fixed and why you chose your specific tech stack.',
    tactics: ['Describe the business problem', 'Explain architectural trade-offs', 'Highlight measurable impact or user metrics']
  },
  {
    id: 'reach-10lpa',
    category: 'confidence',
    categoryLabel: 'Confidence & CTC',
    thought: 'Can I reach that ₹10 LPA goal?',
    solution: '₹10 LPA interviews evaluate algorithmic problem-solving adaptability. If you can decompose an unseen problem into subproblems calmly, you are ready.',
    tactics: ['Break problem into smaller helper functions', 'Communicate trade-offs between O(N) space and O(1)', 'Stay coachable when the interviewer gives a hint']
  },
  {
    id: 'sound-confident',
    category: 'confidence',
    categoryLabel: 'Confidence & CTC',
    thought: 'Will I sound confident in the room?',
    solution: 'Confidence comes from structured thinking. Practice stating: "Here are two ways to solve this. The brute force takes O(N²), but we can optimize with a HashMap to O(N)."',
    tactics: ['Speak slowly and breathe evenly', 'Ask clarifying questions on constraints', 'Treat it like collaborating with a future teammate']
  },
  {
    id: 'right-role',
    category: 'confidence',
    categoryLabel: 'Confidence & CTC',
    thought: 'Is this the right role for me?',
    solution: 'Read the role expectations in your track. Whether it is Backend, Full-stack, or Cloud, focus on demonstrating genuine curiosity and willingness to learn.',
    tactics: ['Align your top skills with the JD', 'Prepare 2 questions about the engineering culture', 'Demonstrate eagerness for fast onboarding']
  },
  {
    id: 'everyone-better',
    category: 'confidence',
    categoryLabel: 'Confidence & CTC',
    thought: 'Is everyone else better prepared?',
    solution: 'Placement is not about competing against everyone else; it is about meeting the company’s hiring benchmark. Focus only on your problem.',
    tactics: ['Ignore rumor mills and campus gossip', 'Focus 100% on the single problem before you', 'Every candidate gets different question permutations']
  }
]

export default function InterviewWorrySolver() {
  const [selectedId, setSelectedId] = useState('where-begin')
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredWorries = useMemo(() => {
    if (activeCategory === 'all') return WORRIES_DATA
    return WORRIES_DATA.filter(w => w.category === activeCategory)
  }, [activeCategory])

  const activeWorry = WORRIES_DATA.find(w => w.id === selectedId) || WORRIES_DATA[0]

  const handleShuffle = () => {
    const remaining = filteredWorries.filter(w => w.id !== selectedId)
    const random = remaining[Math.floor(Math.random() * remaining.length)] || filteredWorries[0]
    if (random) setSelectedId(random.id)
  }

  return (
    <section className="worry-boom-section" id="guidance" aria-labelledby="worry-heading">
      <div className="container">

        {/* Head */}
        <div className="worry-head">
          <div className="section-badge">
            <span className="section-badge__dot" />
            <span>Pre-Interview Preparation</span>
          </div>
          <h2 id="worry-heading" className="worry-title">Interview Tomorrow? Clear Every Doubt.</h2>
          <p className="worry-subtitle">
            Every engineering student experiences pre-interview anxieties.
            Select a thought below to deploy the exact tactical formula to resolve it.
          </p>
        </div>

        {/* Dynamic Category Navigation Bar */}
        <div className="worry-category-bar" role="tablist" aria-label="Anxiety Categories">
          <div className="worry-category-tabs">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon
              const isCatActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isCatActive}
                  className={`worry-cat-btn ${isCatActive ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <Icon size={14} className="cat-icon" />
                  <span>{cat.label}</span>
                </button>
              )
            })}
          </div>

          <button
            type="button"
            className="worry-shuffle-btn"
            onClick={handleShuffle}
            title="Pick a random student question"
          >
            <Shuffle size={14} />
            <span>Random Question</span>
          </button>
        </div>

        {/* The Interactive Question Grid with Snappy Animations */}
        <div className="worry-interactive-matrix" role="tablist" aria-label="Student Interview Thoughts">
          <AnimatePresence mode="popLayout">
            {filteredWorries.map((worry) => {
              const isSelected = selectedId === worry.id
              return (
                <motion.button
                  key={worry.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -3, scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`worry-card-pill ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => setSelectedId(worry.id)}
                >
                  <div className="pill-dot-status">
                    {isSelected ? (
                      <span className="dot-active-pulse" />
                    ) : (
                      <HelpCircle size={15} className="pill-help-icon" />
                    )}
                  </div>
                  <span className="pill-thought-text">{worry.thought}</span>
                  {isSelected && (
                    <span className="pill-active-badge">RESOLVED ✓</span>
                  )}
                </motion.button>
              )
            })}
          </AnimatePresence>
        </div>

        {/* The Tactical Masterplan Box (The part the user praised!) */}
        <div className="worry-masterplan-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeWorry.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="worry-solution-card"
              role="tabpanel"
            >
              <div className="solution-card-header">
                <span className="worry-solution-badge">
                  <Zap size={13} className="solution-badge-icon" />
                  <span>TACTICAL GAME PLAN</span>
                </span>
                <span className="solution-category-tag">{activeWorry.categoryLabel.toUpperCase()}</span>
              </div>

              <h3 className="worry-solution-question">“{activeWorry.thought}”</h3>
              <p className="worry-solution-answer">{activeWorry.solution}</p>

              <div className="worry-solution-steps">
                {activeWorry.tactics.map((tactic, idx) => (
                  <div key={idx} className="worry-step-item">
                    <div className="step-number-bubble">0{idx + 1}</div>
                    <span className="step-tactic-text">{tactic}</span>
                  </div>
                ))}
              </div>

              <div className="solution-card-footer">
                <div className="footer-reassurance">
                  <ShieldCheck size={15} className="reassurance-icon" />
                  <span>Proven formula tested across 10,000+ campus placement rounds</span>
                </div>
                <a href="/practice" className="solution-practice-link">
                  <span>Start Curated Practice Session →</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
