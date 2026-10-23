import './CollegeSection.css'

const CAMPUS_METRICS = [
  { value: '88.4%', label: 'Average Placement Clearance Rate', sub: 'vs 54% National Average' },
  { value: '120+', label: 'Engineering Colleges Deployed', sub: 'Autonomous & State Universities' },
  { value: '4.8x', label: 'Offer Acceleration Ratio', sub: 'Students with >60 Day Streaks' },
]

export default function CollegeSection() {
  return (
    <section className="college" id="colleges" aria-labelledby="college-heading">
      <div className="container">
        <div className="college__card">
          <div className="college__grid">
            {/* Left Content */}
            <div className="college__left">
              <span className="tag tag--violet">INSTITUTIONAL LMS SUITE</span>
              <h2 id="college-heading" className="college__heading">
                Empower Your Entire Placement Cell with Real-Time Telemetry
              </h2>
              <p className="college__sub">
                DKoder isn't just an individual student platform. We provide engineering colleges
                and university placement cells with proctored assessment suites, branch-wise readiness
                dashboards, and recruiter drive calibration.
              </p>

              {/* Feature bullets */}
              <div className="college__features">
                <div className="college__feat">
                  <div className="feat-icon">📊</div>
                  <div className="feat-text">
                    <span className="feat-title">Branch-Wise Readiness Index</span>
                    <span className="feat-desc">Track CSE, IT, ECE and Core branch cohorts against actual company cutoffs.</span>
                  </div>
                </div>

                <div className="college__feat">
                  <div className="feat-icon">🛡️</div>
                  <div className="feat-text">
                    <span className="feat-title">AI-Proctored Internal Mock Exams</span>
                    <span className="feat-desc">Deploy custom coding and aptitude drives with automated tab-switch and plagiarism detection.</span>
                  </div>
                </div>

                <div className="college__feat">
                  <div className="feat-icon">🤝</div>
                  <div className="feat-text">
                    <span className="feat-title">Direct Recruiter Drive Alignment</span>
                    <span className="feat-desc">Generate verified talent shortlists to present directly to visiting Tier-1 company panels.</span>
                  </div>
                </div>
              </div>

              {/* CTA Row */}
              <div className="college__cta-row">
                <a href="https://dkoder.co.in" className="college__primary-btn">
                  <span>Schedule University Demo</span>
                  <span>➔</span>
                </a>
                <span className="college__demo-note">✓ Live sandbox setup for faculty within 48 hours</span>
              </div>
            </div>

            {/* Right Telemetry Snapshot Visual */}
            <div className="college__right">
              <div className="college__dashboard-mockup">
                <div className="dash-header">
                  <span className="dash-title">CAMPUS ADMIN :: BATCH 2025 TELEMETRY</span>
                  <span className="dash-status">LIVE SYNC</span>
                </div>

                {/* Metrics row */}
                <div className="dash-stats">
                  {CAMPUS_METRICS.map(m => (
                    <div key={m.label} className="dash-stat">
                      <span className="val">{m.value}</span>
                      <span className="lbl">{m.label}</span>
                      <span className="sub">{m.sub}</span>
                    </div>
                  ))}
                </div>

                {/* Cohort breakdown bar */}
                <div className="dash-cohorts">
                  <span className="cohorts-title">STUDENT COHORT DISTRIBUTION (N=1,420)</span>
                  <div className="cohort-bars">
                    <div className="cohort-row">
                      <span className="c-name">Super-Dream Tier (&gt;18 LPA)</span>
                      <div className="bar-track"><div className="bar-fill lime" style={{ width: '42%' }} /></div>
                      <span className="c-pct">42%</span>
                    </div>
                    <div className="cohort-row">
                      <span className="c-name">Dream Tier (8–18 LPA)</span>
                      <div className="bar-track"><div className="bar-fill violet" style={{ width: '38%' }} /></div>
                      <span className="c-pct">38%</span>
                    </div>
                    <div className="cohort-row">
                      <span className="c-name">Foundation Placement</span>
                      <div className="bar-track"><div className="bar-fill orange" style={{ width: '20%' }} /></div>
                      <span className="c-pct">20%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
