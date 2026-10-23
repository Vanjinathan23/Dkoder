import { useState } from 'react'
import './LeaderboardSection.css'

interface Student {
  rank: number
  name: string
  college: string
  avatar: string
  xp: number
  solved: number
  streak: number
  target: string
  badge: string
}

const NATIONAL_LEADERS: Student[] = [
  { rank: 1, name: 'Aarav Sharma', college: 'IIT Bombay', avatar: '👨‍💻', xp: 14250, solved: 642, streak: 84, target: 'Google SDE', badge: 'Grandmaster' },
  { rank: 2, name: 'Priya Iyer', college: 'NIT Trichy', avatar: '👩‍💻', xp: 13890, solved: 618, streak: 92, target: 'Microsoft', badge: 'Grandmaster' },
  { rank: 3, name: 'Rohan Verma', college: 'BITS Pilani', avatar: '⚡', xp: 13420, solved: 595, streak: 67, target: 'Amazon', badge: 'Master' },
  { rank: 4, name: 'Ananya Deshmukh', college: 'COEP Pune', avatar: '🎯', xp: 12100, solved: 540, streak: 45, target: 'Flipkart', badge: 'Master' },
  { rank: 5, name: 'Karthik Raja', college: 'Anna University', avatar: '🚀', xp: 11850, solved: 522, streak: 51, target: 'Meta E4', badge: 'Expert' },
  { rank: 6, name: 'Sneha Patel', college: 'DA-IICT', avatar: '✨', xp: 11400, solved: 498, streak: 38, target: 'NVIDIA', badge: 'Expert' },
  { rank: 7, name: 'Aditya Nair', college: 'VJTI Mumbai', avatar: '🔥', xp: 10950, solved: 476, streak: 29, target: 'Uber', badge: 'Expert' },
]

const STREAK_LEADERS: Student[] = [
  { rank: 1, name: 'Priya Iyer', college: 'NIT Trichy', avatar: '👩‍💻', xp: 13890, solved: 618, streak: 92, target: 'Microsoft', badge: 'Streak Legend' },
  { rank: 2, name: 'Aarav Sharma', college: 'IIT Bombay', avatar: '👨‍💻', xp: 14250, solved: 642, streak: 84, target: 'Google SDE', badge: 'Centurion' },
  { rank: 3, name: 'Tanmay Kulkarni', college: 'PES Univ', avatar: '🛡️', xp: 9800, solved: 410, streak: 76, target: 'Infosys SP', badge: 'Consistent' },
  { rank: 4, name: 'Rohan Verma', college: 'BITS Pilani', avatar: '⚡', xp: 13420, solved: 595, streak: 67, target: 'Amazon', badge: 'Master' },
  { rank: 5, name: 'Deepika S.', college: 'RVCE Bangalore', avatar: '🌟', xp: 10200, solved: 445, streak: 62, target: 'TCS Digital', badge: 'Consistent' },
]

export default function LeaderboardSection() {
  const [tab, setTab] = useState<'national' | 'streak'>('national')
  const [search, setSearch] = useState('')

  const list = tab === 'national' ? NATIONAL_LEADERS : STREAK_LEADERS
  const filtered = list.filter(
    s => s.name.toLowerCase().includes(search.toLowerCase()) ||
         s.college.toLowerCase().includes(search.toLowerCase()) ||
         s.target.toLowerCase().includes(search.toLowerCase())
  )

  const top3 = list.slice(0, 3)

  return (
    <section className="leaderboard" id="leaderboard" aria-labelledby="leaderboard-heading">
      <div className="container">
        {/* Header */}
        <div className="leaderboard__header">
          <div className="tag tag--violet">NATIONAL BENCHMARK</div>
          <h2 id="leaderboard-heading" className="leaderboard__heading">
            Campus Placement Leaderboard
          </h2>
          <p className="leaderboard__sub">
            Benchmark your problem-solving velocity against 45,000+ candidates across India.
            Top performers receive direct profile dispatches to recruitment partners.
          </p>
        </div>

        {/* Podium Top 3 */}
        <div className="leaderboard__podium">
          {/* Rank 2 */}
          <div className="podium-col rank-2">
            <div className="podium-avatar">
              <span className="avatar-icon">{top3[1].avatar}</span>
              <span className="podium-badge">2</span>
            </div>
            <div className="podium-name">{top3[1].name}</div>
            <div className="podium-college">{top3[1].college}</div>
            <div className="podium-xp">{top3[1].xp.toLocaleString()} XP</div>
            <div className="podium-target tag">{top3[1].target}</div>
            <div className="podium-pedestal silver">
              <span className="pedestal-num">#2</span>
            </div>
          </div>

          {/* Rank 1 */}
          <div className="podium-col rank-1">
            <div className="podium-avatar">
              <span className="crown">👑</span>
              <span className="avatar-icon">{top3[0].avatar}</span>
              <span className="podium-badge gold">1</span>
            </div>
            <div className="podium-name">{top3[0].name}</div>
            <div className="podium-college">{top3[0].college}</div>
            <div className="podium-xp lime">{top3[0].xp.toLocaleString()} XP</div>
            <div className="podium-target tag tag--lime">{top3[0].target}</div>
            <div className="podium-pedestal gold">
              <span className="pedestal-num">#1</span>
            </div>
          </div>

          {/* Rank 3 */}
          <div className="podium-col rank-3">
            <div className="podium-avatar">
              <span className="avatar-icon">{top3[2].avatar}</span>
              <span className="podium-badge">3</span>
            </div>
            <div className="podium-name">{top3[2].name}</div>
            <div className="podium-college">{top3[2].college}</div>
            <div className="podium-xp">{top3[2].xp.toLocaleString()} XP</div>
            <div className="podium-target tag">{top3[2].target}</div>
            <div className="podium-pedestal bronze">
              <span className="pedestal-num">#3</span>
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
              Overall National XP
            </button>
            <button
              type="button"
              className={`ctrl-tab ${tab === 'streak' ? 'active' : ''}`}
              onClick={() => setTab('streak')}
            >
              Active Streak Champions
            </button>
          </div>

          <div className="controls-search">
            <input
              type="text"
              placeholder="Search candidate, college or company..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-input"
            />
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
              {filtered.map(s => (
                <tr key={s.name} className={`tb-row ${s.rank <= 3 ? 'top' : ''}`}>
                  <td className="td-rank">
                    <span className={`rank-pill r-${s.rank}`}>#{s.rank}</span>
                  </td>
                  <td className="td-student">
                    <div className="student-cell">
                      <span className="s-avatar">{s.avatar}</span>
                      <div className="s-info">
                        <span className="s-name">{s.name}</span>
                        <span className="s-badge">{s.badge}</span>
                      </div>
                    </div>
                  </td>
                  <td className="td-college">{s.college}</td>
                  <td className="td-solved">{s.solved} Qs</td>
                  <td className="td-streak">
                    <span className="flame-pill">🔥 {s.streak}d</span>
                  </td>
                  <td className="td-xp">
                    <span className="xp-val">{s.xp.toLocaleString()}</span>
                  </td>
                  <td className="td-target">
                    <span className="tag tag--violet">{s.target}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
