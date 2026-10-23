import { useState } from 'react'
import './DailyPracticeSection.css'

interface TaskItem {
  id: string
  title: string
  category: string
  xp: number
  done: boolean
}

const INITIAL_TASKS: TaskItem[] = [
  { id: '1', title: 'Problem of the Day: Trapping Rainwater (Two-Pointer O(N))', category: 'DSA HARD', xp: 50, done: true },
  { id: '2', title: '15 Speed MCQs: Permutations, Probability & Number Theory', category: 'APTITUDE', xp: 30, done: true },
  { id: '3', title: 'System Design Flashcard: Consistent Hashing & Replicas', category: 'SYSTEM ARCH', xp: 25, done: false },
  { id: '4', title: 'Debug Session: Memory Leak in React useEffect Hook', category: 'FRONTEND LAB', xp: 20, done: false },
]

const DAYS = [
  { day: 'Mon', date: '19', active: true },
  { day: 'Tue', date: '20', active: true },
  { day: 'Wed', date: '21', active: true },
  { day: 'Thu', date: '22', active: true },
  { day: 'Fri', date: '23', active: true, today: true },
  { day: 'Sat', date: '24', active: false },
  { day: 'Sun', date: '25', active: false },
]

export default function DailyPracticeSection() {
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS)

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  const completedCount = tasks.filter(t => t.done).length
  const totalXP = tasks.filter(t => t.done).reduce((acc, t) => acc + t.xp, 0)
  const progressPercent = Math.round((completedCount / tasks.length) * 100)

  return (
    <section className="daily" id="daily" aria-labelledby="daily-heading">
      <div className="container">
        <div className="daily__grid">
          {/* Left Column: Interactive Daily Quest Checklist */}
          <div className="daily__left">
            <div className="tag tag--lime">DAILY CONSISTENCY ENGINE</div>
            <h2 id="daily-heading" className="daily__heading">
              1% Better Every Single Day
            </h2>
            <p className="daily__sub">
              Placement success isn't built in a weekend cram session. DKoder assigns daily
              micro-quests tailored to your target company profile.
            </p>

            {/* Daily Quests Card */}
            <div className="daily__quest-card">
              <div className="quest-header">
                <div className="quest-title-wrap">
                  <span className="quest-title">Today's Placement Quests</span>
                  <span className="quest-status">
                    {completedCount} of {tasks.length} Completed
                  </span>
                </div>
                <div className="quest-xp-badge">
                  +{totalXP} XP Earned
                </div>
              </div>

              {/* Progress bar */}
              <div className="quest-progress-bar">
                <div className="fill" style={{ width: `${progressPercent}%` }} />
              </div>

              {/* Task list */}
              <div className="quest-list">
                {tasks.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    className={`quest-item ${t.done ? 'done' : ''}`}
                    onClick={() => toggleTask(t.id)}
                  >
                    <div className="quest-check">
                      {t.done ? (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6l2.5 2.5 4.5-5" stroke="#11121A" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      ) : null}
                    </div>
                    <div className="quest-content">
                      <span className="quest-item-title">{t.title}</span>
                      <span className="quest-item-cat">{t.category}</span>
                    </div>
                    <span className="quest-item-xp">+{t.xp} XP</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Streak & Problem of the Day Hub */}
          <div className="daily__right">
            {/* Streak Tracker Card */}
            <div className="daily__streak-card">
              <div className="streak-header">
                <div className="streak-fire">
                  <span className="flame-emoji">🔥</span>
                  <div className="streak-info">
                    <span className="streak-count">14 Days</span>
                    <span className="streak-lbl">CURRENT ACTIVE STREAK</span>
                  </div>
                </div>
                <span className="streak-multiplier tag tag--lime">1.5x XP MULTIPLIER</span>
              </div>

              {/* 7-Day calendar */}
              <div className="streak-days">
                {DAYS.map(d => (
                  <div key={d.day} className={`day-pill ${d.active ? 'active' : ''} ${d.today ? 'today' : ''}`}>
                    <span className="d-name">{d.day}</span>
                    <span className="d-date">{d.date}</span>
                    {d.active && <span className="d-check">✓</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Problem of the Day Spotlight Box */}
            <div className="daily__potd-card">
              <div className="potd-badge tag tag--violet">PROBLEM OF THE DAY</div>
              <h3 className="potd-title">Trapping Rainwater</h3>
              <p className="potd-desc">
                Compute how much water can be trapped between elevation map bars after raining.
                Asked frequently in Google, Amazon and Goldman Sachs technical rounds.
              </p>

              <div className="potd-meta">
                <span className="meta-diff hard">HARD</span>
                <span className="meta-topic">Two Pointers · Dynamic Programming</span>
                <span className="meta-accept">58.4% Pass Rate</span>
              </div>

              <a href="https://dkoder.co.in/practice" className="potd-btn">
                <span>Solve Today's Challenge</span>
                <span>➔</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
