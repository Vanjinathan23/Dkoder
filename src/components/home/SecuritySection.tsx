import { useState } from 'react'
import './SecuritySection.css'

interface SecurityPillar {
  id: string
  title: string
  subtitle: string
  tag: string
  icon: string
  stat: string
  statLabel: string
  description: string
  features: string[]
  diagnosticCode: string
}

const PILLARS: SecurityPillar[] = [
  {
    id: 'os-focus',
    title: 'OS Focus Container',
    subtitle: 'Zero Window Deviation Protocol',
    tag: 'HARDWARE LOCKDOWN',
    icon: '🛡️',
    stat: '< 120ms',
    statLabel: 'Tab-Switch Flag Latency',
    description: 'Intercepts tab switching, window blurring, clipboard hijacking, external monitors, and DevTools inspection before an assessment begins.',
    features: [
      'Full-screen lock with instant window-blur penalty dock',
      'Clipboard write/paste interception with syntax hash verification',
      'Multi-monitor detachment detection and virtual display blocking',
      'Browser DevTools, debugger hooks, and iframe inspector blockers',
    ],
    diagnosticCode: `// OS Focus Diagnostic Log
[CONTAINER_EVENT]: Window blur intercepted at T+04:12.89s
[CLIPBOARD_GUARD]: External text paste rejected (Hash: 0x9f4a...2c)
[MONITOR_DETECT]: Primary display (1920x1080@60Hz) locked. Secondary displays: 0
[STATUS]: 100% Proctored Sandbox Active`,
  },
  {
    id: 'wasm-neural',
    title: '30 FPS Local WASM Neural Engine',
    subtitle: 'Zero-Upload On-Device Vision Mesh',
    tag: 'PRIVACY-FIRST AI',
    icon: '👁️',
    stat: '0 Bytes',
    statLabel: 'Video Uploaded to Server',
    description: 'Runs an optimized 30 FPS lightweight neural mesh directly in client WebAssembly. Flags unauthorized secondary persons, mobile devices, or absent candidates locally.',
    features: [
      '100% on-device inference using WebAssembly & WebGL acceleration',
      'Zero candidate video or audio streams ever transmitted or stored on cloud',
      'Instant detection of handheld mobile screens & secondary individuals',
      'Candidate head pose and eye gaze tracking within calibrated screen zone',
    ],
    diagnosticCode: `// Client-Side WASM Vision Stream
[NEURAL_ENGINE]: WebAssembly SIMD pipeline loaded (4.2MB binary)
[FRAME_RATE]: 30.2 FPS (Latency: 14.8ms/frame)
[PERSONS_DETECTED]: 1 (Confidence: 99.4%)
[MOBILE_FLAG]: None
[CLOUD_TRANSFER]: 0 bytes transmitted (100% on-device)`,
  },
  {
    id: 'keystroke-ai',
    title: 'Keystroke Cadence Spectrum',
    subtitle: 'Generative AI & ChatGPT Paste Detection',
    tag: 'HEURISTIC TIMING',
    icon: '⚡',
    stat: '99.8%',
    statLabel: 'AI Generation Catch Rate',
    description: 'Evaluates inter-key dwell time, burst typing cadence, and syntax token progression to differentiate authentic human coding from ChatGPT copy-pasting.',
    features: [
      'Burst-frequency analysis catches instantaneous multi-line token dumps',
      'Syntactic typing rhythm compared against candidate baseline cadence',
      'AST-level insertion tracing identifies pre-composed solution chunks',
      'Real-time suspicion score docking without interrupting candidate flow',
    ],
    diagnosticCode: `// Keystroke Cadence Analysis
[CADENCE_METRIC]: Mean flight time 112ms, dwell time 48ms
[BURST_DETECTION]: 420 chars inserted in 18ms -> FLAGGED
[AST_TRACE]: Complete Dijkstra implementation appeared in 1 keystroke
[SUSPICION_SCORE]: 94/100 -> Docked to HOD review queue`,
  },
  {
    id: 'hod-ledger',
    title: 'Board-Defensible Cryptographic HOD Report',
    subtitle: 'SHA-256 Tamper-Proof Audit Trail',
    tag: 'ACCREDITATION READY',
    icon: '📜',
    stat: 'SHA-256',
    statLabel: 'Cryptographic Ledger Signature',
    description: 'Every attempt, penalty timestamp, and proctor event is cryptographically hashed and formatted into formal audit reports ready for Principal and NBA/NIRF review.',
    features: [
      'Tamper-evident SHA-256 chronological event ledger for every exam',
      'Board-defensible PDF reports with timeline breakdown for disputed cases',
      'One-click export for NBA, NAAC, and NIRF institutional accreditation metrics',
      'Automated candidate disqualification rules configured by HODs',
    ],
    diagnosticCode: `// Cryptographic Audit Ledger
[BLOCK_HASH]: 0x7f8a32e8b9104c9d5e21...9c2d
[TIMESTAMP]: 2026-10-23T14:32:01.412Z
[STUDENT_ID]: CIT-CSE-2026-0842
[INTEGRITY_SCORE]: 98.6% (Passed proctor criteria)
[CERTIFIED_BY]: DKoder Enterprise Campus Ledger`,
  },
]

export default function SecuritySection() {
  const [activePillar, setActivePillar] = useState<SecurityPillar>(PILLARS[0])

  return (
    <section className="security" id="security" aria-labelledby="security-heading">
      <div className="container">
        {/* Section Header */}
        <div className="security__header">
          <div className="tag tag--violet">
            <span>ENTERPRISE EXAMINATION INTEGRITY</span>
          </div>
          <h2 id="security-heading" className="security__heading">
            Anti-Cheat Command Center
          </h2>
          <p className="security__sub">
            Campus placement drives carry life-changing stakes. DKoder provides India's engineering
            colleges with a 4-tier security defense architecture that guarantees board-defensible exam outcomes.
          </p>
        </div>

        {/* Pillars Navigation */}
        <div className="security__nav" role="tablist">
          {PILLARS.map(p => {
            const isActive = activePillar.id === p.id
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`security__nav-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActivePillar(p)}
              >
                <span className="security__nav-icon">{p.icon}</span>
                <span className="security__nav-text">
                  <span className="title">{p.title}</span>
                  <span className="tag-text">{p.tag}</span>
                </span>
              </button>
            )
          })}
        </div>

        {/* Active Pillar Stage */}
        <div className="security__stage">
          {/* Left: Pillar Details */}
          <div className="security__details">
            <div className="security__details-top">
              <span className="security__pillar-badge">{activePillar.tag}</span>
              <h3 className="security__pillar-title">{activePillar.title}</h3>
              <p className="security__pillar-subtitle">{activePillar.subtitle}</p>
            </div>

            <p className="security__pillar-desc">{activePillar.description}</p>

            {/* Metric Callout */}
            <div className="security__metric-callout">
              <span className="security__stat-val">{activePillar.stat}</span>
              <span className="security__stat-lbl">{activePillar.statLabel}</span>
            </div>

            {/* Feature Bullets */}
            <div className="security__feat-list">
              {activePillar.features.map(f => (
                <div key={f} className="security__feat-item">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M13.333 4L6 11.333 2.667 8" stroke="#17191C" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Live Telemetry Terminal */}
          <div className="security__terminal">
            <div className="security__terminal-header">
              <div className="terminal__dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <span className="terminal__title">
                PROCTOR_CORE_V4.2 :: {activePillar.id.toUpperCase()}_DIAGNOSTIC
              </span>
              <span className="terminal__live-badge">ARMED</span>
            </div>

            <div className="security__terminal-body">
              <pre className="terminal__code">
                <code>{activePillar.diagnosticCode}</code>
              </pre>

              <div className="terminal__hud-strip">
                <div className="hud-metric">
                  <span className="hud-lbl">MEMORY</span>
                  <span className="hud-val">18.4 MB</span>
                </div>
                <div className="hud-metric">
                  <span className="hud-lbl">LATENCY</span>
                  <span className="hud-val">&lt; 16ms</span>
                </div>
                <div className="hud-metric">
                  <span className="hud-lbl">ENCRYPTION</span>
                  <span className="hud-val">AES-256-GCM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
