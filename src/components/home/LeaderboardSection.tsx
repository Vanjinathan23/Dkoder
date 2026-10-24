import React, { useState, useEffect, useRef } from 'react'
import {
  Trophy,
  Crown,
  Medal,
  Award,
  Flame,
  Zap,
  Target,
  Rocket,
  Sparkles,
  Shield,
  Star,
  Search,
  CheckCircle2,
  Building2,
  X,
  Code2
} from 'lucide-react'
import './LeaderboardSection.css'

interface Student {
  rank: number
  name: string
  college: string
  avatarInitials: string
  avatarBg: string
  icon: React.ElementType
  iconColor: string
  xp: number
  solved: number
  streak: number
  target: string
  badge: string
}

const NATIONAL_LEADERS: Student[] = [
  {
    rank: 1,
    name: 'Aarav Sharma',
    college: 'Chennai Institute of Tech (CIT)',
    avatarInitials: 'AS',
    avatarBg: 'linear-gradient(135deg, #F5FF38, #EAB308)',
    icon: Crown,
    iconColor: '#17191C',
    xp: 14250,
    solved: 642,
    streak: 84,
    target: 'Google SDE',
    badge: 'Grandmaster'
  },
  {
    rank: 2,
    name: 'Priya Iyer',
    college: 'Sri Eshwar College of Engineering',
    avatarInitials: 'PI',
    avatarBg: 'linear-gradient(135deg, #E2E8F0, #94A3B8)',
    icon: Trophy,
    iconColor: '#17191C',
    xp: 13890,
    solved: 618,
    streak: 92,
    target: 'Microsoft',
    badge: 'Grandmaster'
  },
  {
    rank: 3,
    name: 'Rohan Verma',
    college: 'Velammal Engineering College',
    avatarInitials: 'RV',
    avatarBg: 'linear-gradient(135deg, #FDBA74, #EA580C)',
    icon: Zap,
    iconColor: '#FFFFFF',
    xp: 13420,
    solved: 595,
    streak: 67,
    target: 'Amazon',
    badge: 'Master'
  },
  {
    rank: 4,
    name: 'Ananya Deshmukh',
    college: 'Dhaanish Ahmed College of Eng',
    avatarInitials: 'AD',
    avatarBg: 'linear-gradient(135deg, #C4B5FD, #8B5CF6)',
    icon: Target,
    iconColor: '#FFFFFF',
    xp: 12100,
    solved: 540,
    streak: 45,
    target: 'ServiceNow',
    badge: 'Master'
  },
  {
    rank: 5,
    name: 'Karthik Raja',
    college: 'PSNA College of Engineering',
    avatarInitials: 'KR',
    avatarBg: 'linear-gradient(135deg, #93C5FD, #3B82F6)',
    icon: Rocket,
    iconColor: '#FFFFFF',
    xp: 11850,
    solved: 522,
    streak: 51,
    target: 'TCS Prime',
    badge: 'Expert'
  },
  {
    rank: 6,
    name: 'Sneha Patel',
    college: 'Kongu Engineering College',
    avatarInitials: 'SP',
    avatarBg: 'linear-gradient(135deg, #F9A8D4, #EC4899)',
    icon: Sparkles,
    iconColor: '#FFFFFF',
    xp: 11400,
    solved: 498,
    streak: 38,
    target: 'Infosys SP',
    badge: 'Expert'
  },
  {
    rank: 7,
    name: 'Aditya Nair',
    college: 'Anna University CEG',
    avatarInitials: 'AN',
    avatarBg: 'linear-gradient(135deg, #FCA5A5, #EF4444)',
    icon: Flame,
    iconColor: '#FFFFFF',
    xp: 10950,
    solved: 476,
    streak: 29,
    target: 'Flipkart',
    badge: 'Expert'
  }
]

const STREAK_LEADERS: Student[] = [
  {
    rank: 1,
    name: 'Priya Iyer',
    college: 'Sri Eshwar College of Engineering',
    avatarInitials: 'PI',
    avatarBg: 'linear-gradient(135deg, #F5FF38, #EAB308)',
    icon: Crown,
    iconColor: '#17191C',
    xp: 13890,
    solved: 618,
    streak: 92,
    target: 'Microsoft',
    badge: 'Streak Legend'
  },
  {
    rank: 2,
    name: 'Aarav Sharma',
    college: 'Chennai Institute of Tech (CIT)',
    avatarInitials: 'AS',
    avatarBg: 'linear-gradient(135deg, #E2E8F0, #94A3B8)',
    icon: Trophy,
    iconColor: '#17191C',
    xp: 14250,
    solved: 642,
    streak: 84,
    target: 'Google SDE',
    badge: 'Centurion'
  },
  {
    rank: 3,
    name: 'Tanmay Kulkarni',
    college: 'Kongu Engineering College',
    avatarInitials: 'TK',
    avatarBg: 'linear-gradient(135deg, #FDBA74, #EA580C)',
    icon: Shield,
    iconColor: '#FFFFFF',
    xp: 9800,
    solved: 410,
    streak: 76,
    target: 'Infosys SP',
    badge: 'Consistent'
  },
  {
    rank: 4,
    name: 'Rohan Verma',
    college: 'Velammal Engineering College',
    avatarInitials: 'RV',
    avatarBg: 'linear-gradient(135deg, #C4B5FD, #8B5CF6)',
    icon: Zap,
    iconColor: '#FFFFFF',
    xp: 13420,
    solved: 595,
    streak: 67,
    target: 'Amazon',
    badge: 'Master'
  },
  {
    rank: 5,
    name: 'Deepika S.',
    college: 'PSNA College of Engineering',
    avatarInitials: 'DS',
    avatarBg: 'linear-gradient(135deg, #93C5FD, #3B82F6)',
    icon: Star,
    iconColor: '#FFFFFF',
    xp: 10200,
    solved: 445,
    streak: 62,
    target: 'TCS Digital',
    badge: 'Consistent'
  }
]

export default function LeaderboardSection() {
  const [tab, setTab] = useState<'national' | 'streak'>('national')
  const [search, setSearch] = useState('')
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Scroll entrance trigger: animate smoothly when user scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.12 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const list = tab === 'national' ? NATIONAL_LEADERS : STREAK_LEADERS
  const filtered = list.filter(
    s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.college.toLowerCase().includes(search.toLowerCase()) ||
      s.target.toLowerCase().includes(search.toLowerCase())
  )

  const top3 = list.slice(0, 3)

  return (
    <section
      className={`leaderboard ${inView ? 'leaderboard--animated' : ''}`}
      id="leaderboard"
      aria-labelledby="leaderboard-heading"
      ref={sectionRef}
    >
      <div className="container">
        {/* Header */}
        <div className="leaderboard__header">
          <div className="tag tag--violet">
            <Trophy size={13} className="header-tag-icon" />
            <span>STUDENT RANKINGS</span>
          </div>
          <h2 id="leaderboard-heading" className="leaderboard__heading">
            Campus Leaderboard
          </h2>
          <p className="leaderboard__sub">
            Benchmark your solved problems and daily streaks with students across 150+ colleges nationwide.
          </p>
        </div>

        {/* Podium Top 3 */}
        <div className="leaderboard__podium">
          {/* Rank 2 (Silver) */}
          <div className="podium-col rank-2">
            <div className="podium-crest silver-crest">
              <Medal size={22} className="crest-icon" />
            </div>
            <div className="podium-avatar">
              <div
                className="avatar-initials"
                style={{ background: top3[1].avatarBg }}
              >
                <span>{top3[1].avatarInitials}</span>
              </div>
              <span className="podium-badge silver">2</span>
            </div>
            <div className="podium-name">{top3[1].name}</div>
            <div className="podium-college">
              <Building2 size={12} className="college-icon" />
              <span>{top3[1].college}</span>
            </div>
            <div className="podium-xp">
              <Zap size={13} className="xp-icon" />
              <span>{top3[1].xp.toLocaleString()} XP</span>
            </div>
            <div className="podium-target tag">{top3[1].target}</div>

            {/* Quick Metrics */}
            <div className="podium-meta">
              <span className="meta-item">
                <CheckCircle2 size={12} className="meta-icon meta-green" />
                {top3[1].solved} Qs
              </span>
              <span className="meta-item">
                <Flame size={12} className="meta-icon meta-orange" />
                {top3[1].streak}d streak
              </span>
            </div>

            <div className="podium-pedestal silver">
              <span className="pedestal-num">#2</span>
              <span className="pedestal-label">RUNNER-UP</span>
            </div>
          </div>

          {/* Rank 1 (Gold Champion) */}
          <div className="podium-col rank-1">
            <div className="podium-crown-wrap">
              <Crown size={32} className="crown-icon-svg" />
              <div className="crown-glow" />
            </div>

            <div className="podium-avatar">
              <div
                className="avatar-initials gold-avatar"
                style={{ background: top3[0].avatarBg }}
              >
                <span>{top3[0].avatarInitials}</span>
              </div>
              <span className="podium-badge gold">
                <Crown size={11} style={{ marginRight: '1px' }} />
                1
              </span>
            </div>
            <div className="podium-name">{top3[0].name}</div>
            <div className="podium-college">
              <Building2 size={12} className="college-icon" />
              <span>{top3[0].college}</span>
            </div>
            <div className="podium-xp lime">
              <Zap size={14} className="xp-icon" />
              <span>{top3[0].xp.toLocaleString()} XP</span>
            </div>
            <div className="podium-target tag tag--lime">{top3[0].target}</div>

            {/* Quick Metrics */}
            <div className="podium-meta">
              <span className="meta-item">
                <CheckCircle2 size={12} className="meta-icon meta-green" />
                {top3[0].solved} Qs
              </span>
              <span className="meta-item">
                <Flame size={12} className="meta-icon meta-orange" />
                {top3[0].streak}d streak
              </span>
            </div>

            <div className="podium-pedestal gold">
              <span className="pedestal-num">#1</span>
              <span className="pedestal-label">CHAMPION</span>
            </div>
          </div>

          {/* Rank 3 (Bronze) */}
          <div className="podium-col rank-3">
            <div className="podium-crest bronze-crest">
              <Award size={22} className="crest-icon" />
            </div>
            <div className="podium-avatar">
              <div
                className="avatar-initials"
                style={{ background: top3[2].avatarBg }}
              >
                <span>{top3[2].avatarInitials}</span>
              </div>
              <span className="podium-badge bronze">3</span>
            </div>
            <div className="podium-name">{top3[2].name}</div>
            <div className="podium-college">
              <Building2 size={12} className="college-icon" />
              <span>{top3[2].college}</span>
            </div>
            <div className="podium-xp">
              <Zap size={13} className="xp-icon" />
              <span>{top3[2].xp.toLocaleString()} XP</span>
            </div>
            <div className="podium-target tag">{top3[2].target}</div>

            {/* Quick Metrics */}
            <div className="podium-meta">
              <span className="meta-item">
                <CheckCircle2 size={12} className="meta-icon meta-green" />
                {top3[2].solved} Qs
              </span>
              <span className="meta-item">
                <Flame size={12} className="meta-icon meta-orange" />
                {top3[2].streak}d streak
              </span>
            </div>

            <div className="podium-pedestal bronze">
              <span className="pedestal-num">#3</span>
              <span className="pedestal-label">3RD PLACE</span>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="leaderboard__controls">
          <div className="controls-tabs">
            <button
              type="button"
              className={`ctrl-tab ${tab === 'national' ? 'active' : ''}`}
              onClick={() => setTab('national')}
            >
              <Trophy size={14} className="tab-icon" />
              <span>Overall National XP</span>
              <span className="tab-badge">{NATIONAL_LEADERS.length}</span>
            </button>
            <button
              type="button"
              className={`ctrl-tab ${tab === 'streak' ? 'active' : ''}`}
              onClick={() => setTab('streak')}
            >
              <Flame size={14} className="tab-icon flame-color" />
              <span>Active Streak Champions</span>
              <span className="tab-badge">{STREAK_LEADERS.length}</span>
            </button>
          </div>

          <div className="controls-search">
            <Search size={15} className="search-icon-inside" />
            <input
              type="text"
              placeholder="Search candidate, college or target..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-input"
            />
            {search && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Table / List */}
        <div className="leaderboard__table-wrap">
          <table className="leaderboard__table">
            <thead>
              <tr>
                <th className="th-rank">Rank</th>
                <th className="th-student">Candidate</th>
                <th className="th-college">Institution</th>
                <th className="th-solved">Solved</th>
                <th className="th-streak">Streak</th>
                <th className="th-xp">Placement XP</th>
                <th className="th-target">Target Role</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, index) => {
                const IconComponent = s.icon
                return (
                  <tr
                    key={s.name}
                    className={`tb-row ${s.rank <= 3 ? 'top' : ''}`}
                    style={{ '--row-idx': index } as React.CSSProperties}
                  >
                    <td className="td-rank">
                      <div className={`rank-pill r-${s.rank}`}>
                        {s.rank === 1 && <Crown size={12} className="rank-crown-icon" />}
                        {s.rank === 2 && <Medal size={12} className="rank-medal-icon" />}
                        {s.rank === 3 && <Award size={12} className="rank-award-icon" />}
                        <span>#{s.rank}</span>
                      </div>
                    </td>
                    <td className="td-student">
                      <div className="student-cell">
                        <div
                          className="s-avatar-pill"
                          style={{ background: s.avatarBg }}
                        >
                          <span className="s-avatar-letters">{s.avatarInitials}</span>
                          <span
                            className="s-avatar-chip"
                            style={{ backgroundColor: s.iconColor }}
                          >
                            <IconComponent size={10} color="#FFFFFF" />
                          </span>
                        </div>
                        <div className="s-info">
                          <span className="s-name">{s.name}</span>
                          <span className="s-badge">
                            <Code2 size={11} className="s-badge-icon" />
                            {s.badge}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="td-college">
                      <div className="college-cell">
                        <Building2 size={13} className="college-table-icon" />
                        <span>{s.college}</span>
                      </div>
                    </td>
                    <td className="td-solved">
                      <div className="solved-cell">
                        <CheckCircle2 size={13} className="solved-icon" />
                        <span>{s.solved} Qs</span>
                      </div>
                    </td>
                    <td className="td-streak">
                      <span className="flame-pill">
                        <Flame size={13} className="streak-flame-icon" />
                        <span>{s.streak} Days</span>
                      </span>
                    </td>
                    <td className="td-xp">
                      <span className="xp-val">
                        <Zap size={13} className="xp-flash-icon" />
                        {s.xp.toLocaleString()}
                      </span>
                    </td>
                    <td className="td-target">
                      <span className={`tag target-tag target--${s.target.toLowerCase().replace(/\s+/g, '-')}`}>
                        {s.target}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
