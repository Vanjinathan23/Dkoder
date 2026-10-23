import { useState } from 'react'
import './FeaturesGrid.css'

export default function FeaturesGrid() {
  const [activeCompanyFilter, setActiveCompanyFilter] = useState('Google')
  const [codeRunState, setCodeRunState] = useState<'idle' | 'running' | 'success'>('idle')

  const companyStats: Record<string, { count: number; dsa: string; freq: string }> = {
    Google: { count: 380, dsa: 'Dynamic Programming & Graphs', freq: 'Very High (14 drives in 2024)' },
    Amazon: { count: 420, dsa: 'Trees, Arrays & Leadership Ops', freq: 'Peak Season Active' },
    Microsoft: { count: 320, dsa: 'Strings, Linked Lists & System', freq: 'Intern & FTE Active' },
    TCS: { count: 510, dsa: 'Aptitude, Numerical & CodeVita', freq: 'National Qualifier Test' },
  }

  const handleSimulateRun = () => {
    setCodeRunState('running')
    setTimeout(() => {
      setCodeRunState('success')
      setTimeout(() => setCodeRunState('idle'), 3500)
    }, 1200)
  }

  return (
    <section className="bento" id="features" aria-labelledby="bento-heading">
      <div className="container">
        {/* Section Header */}
        <div className="bento__header">
          <div className="tag tag--violet">ARCHITECTED FOR RECRUITMENT</div>
          <h2 id="bento-heading" className="bento__heading">
            The Placement Intelligence Suite
          </h2>
          <p className="bento__sub">
            Traditional platforms give you generic questions. DKoder gives you the company-calibrated
            telemetry, live execution runtime, and AI analysis required to clear day-1 rounds.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="bento__grid">
          {/* Card 1: Company-Tagged Intelligence (Large span 2 cols) */}
          <div className="bento__card bento__card--hero">
            <div className="bento__card-top">
              <span className="bento__tag tag tag--lime">RECRUITER TELEMETRY</span>
              <span className="bento__badge-mono">1,200+ TAGGED DATA POINTS</span>
            </div>

            <div className="bento__card-body">
              <h3 className="bento__title">Company-Tagged Problem Matrix</h3>
              <p className="bento__desc">
                Know the exact frequency, topic distribution, and difficulty curve tested by target companies.
                Toggle recruiters below to see real verified drive parameters:
              </p>

              {/* Interactive Company Filter Selector */}
              <div className="bento__filter-row">
                {Object.keys(companyStats).map(c => (
                  <button
                    key={c}
                    type="button"
                    className={`bento__filter-btn ${activeCompanyFilter === c ? 'active' : ''}`}
                    onClick={() => setActiveCompanyFilter(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Interactive Telemetry Box */}
              <div className="bento__telemetry-box">
                <div className="bento__telemetry-stat">
                  <span className="lbl">Verified Questions</span>
                  <span className="val lime">{companyStats[activeCompanyFilter].count}+ Qs</span>
                </div>
                <div className="bento__telemetry-stat">
                  <span className="lbl">Highest Weighted Topic</span>
                  <span className="val violet">{companyStats[activeCompanyFilter].dsa}</span>
                </div>
                <div className="bento__telemetry-stat">
                  <span className="lbl">Campus Drive Pattern</span>
                  <span className="val">{companyStats[activeCompanyFilter].freq}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: AI Complexity & Approach Diagnostics */}
          <div className="bento__card">
            <div className="bento__card-top">
              <span className="bento__tag tag tag--violet">SYNAPSE AI</span>
              <span className="bento__dot live" />
            </div>
            <h3 className="bento__title">AI Approach Optimization</h3>
            <p className="bento__desc">
              Instant AST breakdown detects redundant traversal and suggests optimal Big-O bounds.
            </p>

            {/* Micro AI Diagnostic Widget */}
            <div className="bento__ai-widget">
              <div className="bento__ai-row">
                <span className="bento__ai-tag old">CURRENT: O(N²) BRUTE</span>
                <span className="bento__ai-arrow">➔</span>
                <span className="bento__ai-tag optimal">OPTIMAL: O(N) HASHMAP</span>
              </div>
              <div className="bento__ai-diff">
                <span className="diff-minus">- nested loop scan (820ms)</span>
                <span className="diff-plus">+ single pass lookup map (12ms)</span>
              </div>
              <div className="bento__ai-status">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5" stroke="#D8FF48" strokeWidth="1.5"/>
                  <path d="M4 6l1.5 1.5L8 4.5" stroke="#D8FF48" strokeWidth="1.5"/>
                </svg>
                <span>Memory usage within 24MB sandbox</span>
              </div>
            </div>
          </div>

          {/* Card 3: Interactive Live Sandboxed Editor */}
          <div className="bento__card">
            <div className="bento__card-top">
              <span className="bento__tag tag tag--lime">V8 / LLVM RUNTIME</span>
              <button
                type="button"
                className={`bento__run-btn ${codeRunState}`}
                onClick={handleSimulateRun}
              >
                {codeRunState === 'running' ? 'Compiling...' : codeRunState === 'success' ? '✓ Passed (14ms)' : '▶ Run Sandbox'}
              </button>
            </div>
            <h3 className="bento__title">Zero-Lag Code Execution</h3>
            <p className="bento__desc">
              Execute test cases inside micro-virtualized runtimes with isolated memory limits.
            </p>

            {/* Mini Code Simulator Preview */}
            <div className="bento__mini-ide">
              <div className="bento__ide-header">
                <span className="bento__file-tab">solution.ts</span>
                <span className="bento__runtime-pill">Node 20.x</span>
              </div>
              <pre className="bento__code-preview">
                <code>{`const findLongestSequence = (arr: number[]) => {
  const set = new Set(arr);
  let maxLen = 0;
  for (const num of set) {
    if (!set.has(num - 1)) {
      let curr = num, len = 1;
      while (set.has(curr + 1)) { curr++; len++; }
      maxLen = Math.max(maxLen, len);
    }
  }
  return maxLen;
};`}</code>
              </pre>
            </div>
          </div>

          {/* Card 4: Placement Readiness Score */}
          <div className="bento__card">
            <div className="bento__card-top">
              <span className="bento__tag tag">TELEMETRY GAUGE</span>
              <span className="bento__badge-mono">TIER-1 VERIFIED</span>
            </div>
            <h3 className="bento__title">Readiness Index</h3>
            <p className="bento__desc">
              Probabilistic calculation of passing initial assessment cutoff scores.
            </p>

            {/* Animated Meter */}
            <div className="bento__gauge-wrap">
              <div className="bento__gauge-circle">
                <svg viewBox="0 0 100 100" className="bento__gauge-svg">
                  <circle cx="50" cy="50" r="42" className="bento__gauge-bg" />
                  <circle cx="50" cy="50" r="42" className="bento__gauge-fill" />
                </svg>
                <div className="bento__gauge-text">
                  <span className="score">87%</span>
                  <span className="rank">SUPER-DREAM</span>
                </div>
              </div>
              <div className="bento__gauge-breakdown">
                <div className="metric">
                  <span className="lbl">Speed</span>
                  <div className="bar"><div className="fill" style={{ width: '92%' }} /></div>
                </div>
                <div className="metric">
                  <span className="lbl">Accuracy</span>
                  <div className="bar"><div className="fill" style={{ width: '85%' }} /></div>
                </div>
                <div className="metric">
                  <span className="lbl">Edge Cases</span>
                  <div className="bar"><div className="fill" style={{ width: '89%' }} /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Proctored Drive Simulation (Large span) */}
          <div className="bento__card bento__card--wide">
            <div className="bento__card-top">
              <span className="bento__tag tag tag--orange">PROCTORED DRIVES</span>
              <span className="bento__badge-mono">TIME-CONSTRAINED MOCK</span>
            </div>
            <h3 className="bento__title">Full-Funnel Placement Simulation</h3>
            <p className="bento__desc">
              Mirrors real campus recruitment drives end-to-end: aptitude screen, technical DSA, and core CS questions under strict proctoring.
            </p>

            {/* Pipeline progress simulation */}
            <div className="bento__pipeline">
              <div className="bento__step complete">
                <div className="bento__step-num">01</div>
                <div className="bento__step-title">Round 1: Cognitive & Aptitude</div>
                <div className="bento__step-meta">30 Mins · 45 Questions · Cleared</div>
              </div>
              <div className="bento__step active">
                <div className="bento__step-num">02</div>
                <div className="bento__step-title">Round 2: Hard Technical DSA</div>
                <div className="bento__step-meta">60 Mins · 3 Hard Qs · In Progress</div>
              </div>
              <div className="bento__step locked">
                <div className="bento__step-num">03</div>
                <div className="bento__step-title">Round 3: System Architecture</div>
                <div className="bento__step-meta">45 Mins · Interactive Board</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
