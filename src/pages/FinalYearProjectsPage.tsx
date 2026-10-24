import React, { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import PageHeader from '../components/layout/PageHeader'
import { FolderGit2, Users, CheckCircle2, ArrowRight, Award, ShieldCheck, Sparkles, BookOpen } from 'lucide-react'

interface ProjectDomain {
  id: string
  title: string
  description: string
  techStack: string[]
  sampleTitles: string[]
  mentorshipIncluded: string[]
}

const DOMAINS: ProjectDomain[] = [
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning Systems',
    description: 'Deep Learning models, Computer Vision, Natural Language Processing, and LLM fine-tuning architectures for real-world automation.',
    techStack: ['PyTorch', 'TensorFlow', 'FastAPI', 'LangChain', 'OpenCV'],
    sampleTitles: [
      'Automated Early Detection of Retinal Pathology via ViT (Vision Transformers)',
      'Multi-Modal Legal Document Summarization with RAG Architecture',
      'Real-Time Autonomous Drone Navigation using Reinforcement Learning'
    ],
    mentorshipIncluded: ['Dataset acquisition & cleansing', 'Model architecture validation', 'Research paper formatting for IEEE/Scopus']
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Defensive Operations',
    description: 'Vulnerability scanners, Zero-Trust networking, Intrusion Detection Systems (IDS), and blockchain verifiable audit logs.',
    techStack: ['Python', 'Snort/Suricata', 'Solidity', 'Go', 'Docker'],
    sampleTitles: [
      'Decentralized Healthcare Record Ledger with Zero-Knowledge Proofs',
      'AI-Powered Network Anomaly Detection for Industrial IoT Environments',
      'Automated Web Application Vulnerability Scanner & Exploit Mitigation'
    ],
    mentorshipIncluded: ['Threat modeling methodology', 'Codebase security audit', 'Defense presentation slide deck review']
  },
  {
    id: 'web-mobile',
    title: 'Full-Stack Distributed Systems & Mobile',
    description: 'High-throughput microservices, progressive web apps, real-time collaboration engines, and cross-platform mobile apps.',
    techStack: ['React 19', 'Next.js', 'React Native', 'Node.js', 'PostgreSQL', 'Redis'],
    sampleTitles: [
      'Real-Time Collaborative Code Editor with Conflict-Free Replicated Data Types (CRDT)',
      'Campus Logistics & Resource Allocation Optimization Engine',
      'Offline-First Telemedicine Mobile Platform for Rural Health Centers'
    ],
    mentorshipIncluded: ['System architecture design (HLD/LLD)', 'Database normalization & performance', 'Live cloud hosting & domain deployment']
  },
  {
    id: 'iot-embedded',
    title: 'Internet of Things (IoT) & Embedded Robotics',
    description: 'Sensor telemetry, microcontrollers, edge computing, smart agriculture, and environmental monitoring networks.',
    techStack: ['ESP32', 'Raspberry Pi', 'MQTT', 'C/C++', 'Node-RED', 'InfluxDB'],
    sampleTitles: [
      'Edge-Computing Smart Irrigation System with Soil Hydration ML Prediction',
      'Wearable Worker Safety Helmet with Gas Detection & Biometric Telemetry',
      'Automated Inventory Drone for Warehouse Package Tracking'
    ],
    mentorshipIncluded: ['Circuit schematics & sensor selection', 'Firmware debugging', 'Hardware prototype testing protocols']
  }
]

export default function FinalYearProjectsPage() {
  const [teamCode, setTeamCode] = useState('')
  const [teamJoinedMessage, setTeamJoinedMessage] = useState<string | null>(null)
  const [enquiryDomain, setEnquiryDomain] = useState('AI & Machine Learning Systems')
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: 'Final Year',
    currentStage: 'Need Domain & Topic Guidance'
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleJoinTeam = (e: React.FormEvent) => {
    e.preventDefault()
    if (teamCode.trim().length === 6) {
      setTeamJoinedMessage(`Successfully matched team code “${teamCode.toUpperCase()}”. Redirecting to workspace...`)
    } else {
      setTeamJoinedMessage('Please enter a valid 6-character team invite code.')
    }
  }

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', background: '#FFFFFF' }}>
        <PageHeader
          badge="FINAL YEAR PROJECTS CELL"
          title="Engineering Projects Mentorship & IEEE Publication"
          description="Transform your final year engineering capstone into a production-grade software project and accredited conference paper. Expert guidance from topic selection to code defense."
        />

        <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '3rem 1.5rem' }}>
          {/* Join by Team Code Banner */}
          <div
            style={{
              background: '#FFFDF0',
              border: '2px solid #17191C',
              borderRadius: '1.25rem',
              padding: '2rem',
              boxShadow: '6px 6px 0px #17191C',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.5rem',
              marginBottom: '3.5rem'
            }}
          >
            <div>
              <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', background: '#F5FF38', padding: '0.2rem 0.5rem', borderRadius: '9999px', border: '1px solid #17191C', color: '#17191C' }}>
                EXISTING TEAMS
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#17191C', margin: '0.5rem 0 0.25rem' }}>
                Have a Project Team Invitation Code?
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748B', margin: 0 }}>
                If your project team lead already initiated your group, enter your 6-digit code to join your workspace.
              </p>
            </div>

            <form onSubmit={handleJoinTeam} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="e.g. DK9821"
                maxLength={6}
                value={teamCode}
                onChange={e => setTeamCode(e.target.value)}
                style={{
                  padding: '0.65rem 1rem',
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: '1.5px solid #17191C',
                  borderRadius: '0.625rem',
                  outline: 'none',
                  width: '140px'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '0.65rem 1.25rem',
                  fontSize: '0.875rem',
                  fontWeight: 800,
                  background: '#F5FF38',
                  color: '#17191C',
                  border: '1.5px solid #17191C',
                  borderRadius: '0.625rem',
                  cursor: 'pointer',
                  boxShadow: '2px 2px 0px #17191C'
                }}
              >
                Join Team
              </button>
            </form>

            {teamJoinedMessage && (
              <div style={{ width: '100%', fontSize: '0.8125rem', fontWeight: 700, color: teamJoinedMessage.includes('Success') ? '#16A34A' : '#EF4444' }}>
                {teamJoinedMessage}
              </div>
            )}
          </div>

          {/* Project Domains Grid */}
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#17191C', marginBottom: '0.5rem' }}>
              Select Your Project Domain
            </h2>
            <p style={{ fontSize: '1rem', color: '#64748B', marginBottom: '2.5rem' }}>
              Our senior research mentors provide verified dataset sources, architecture templates, and weekly review meetings.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
              {DOMAINS.map(domain => (
                <div
                  key={domain.id}
                  style={{
                    background: '#FFFFFF',
                    border: '1.5px solid #17191C',
                    borderRadius: '1.25rem',
                    boxShadow: '4px 4px 0px #17191C',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#17191C', margin: '0 0 0.5rem' }}>
                      {domain.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 1.25rem' }}>
                      {domain.description}
                    </p>

                    {/* Tech stack */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                      {domain.techStack.map((tech, i) => (
                        <span key={i} style={{ fontSize: '0.6875rem', fontWeight: 700, background: '#FAF8F5', border: '1px solid #E2E8F0', padding: '0.2rem 0.5rem', borderRadius: '0.35rem', color: '#17191C' }}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Sample Project Titles */}
                    <div style={{ background: '#FAF8F5', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0', marginBottom: '1.25rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#17191C', display: 'block', marginBottom: '0.5rem' }}>
                        Sample Approved Titles:
                      </span>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                        {domain.sampleTitles.map((title, idx) => (
                          <li key={idx} style={{ fontSize: '0.75rem', color: '#475569', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                            <span style={{ color: '#8875FF', fontWeight: 700 }}>•</span>
                            <span>{title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setEnquiryDomain(domain.title)
                      const formEl = document.getElementById('enquiry-form-section')
                      if (formEl) formEl.scrollIntoView({ behavior: 'smooth' })
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      fontSize: '0.875rem',
                      fontWeight: 800,
                      background: '#17191C',
                      color: '#FFFFFF',
                      borderRadius: '0.625rem',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <span>Request Mentorship for this Domain</span>
                    <ArrowRight size={14} style={{ color: '#F5FF38' }} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Mentorship Application Form */}
          <div
            id="enquiry-form-section"
            style={{
              background: '#FFFDF5',
              border: '2px solid #17191C',
              borderRadius: '1.5rem',
              padding: '3rem 2rem',
              maxWidth: '800px',
              margin: '0 auto',
              boxShadow: '8px 8px 0px #17191C'
            }}
          >
            {!formSubmitted ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', background: '#F5FF38', padding: '0.25rem 0.65rem', borderRadius: '9999px', border: '1px solid #17191C' }}>
                    STUDENT & TEAM ENQUIRY
                  </span>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#17191C', margin: '0.75rem 0 0.35rem' }}>
                    Get Dedicated Project Guidance
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#64748B', margin: 0 }}>
                    Tell us where you stand today. “No idea yet” is a perfectly good answer — we will help you choose.
                  </p>
                </div>

                <form onSubmit={handleEnquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vignesh R."
                        value={enquiryForm.name}
                        onChange={e => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="vignesh@gmail.com"
                        value={enquiryForm.email}
                        onChange={e => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                        WhatsApp Contact Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={enquiryForm.phone}
                        onChange={e => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                        College Name & City
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. PSG Tech, Coimbatore"
                        value={enquiryForm.college}
                        onChange={e => setEnquiryForm({ ...enquiryForm, college: e.target.value })}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                      Selected Project Domain
                    </label>
                    <select
                      value={enquiryDomain}
                      onChange={e => setEnquiryDomain(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none', background: '#FFFFFF' }}
                    >
                      {DOMAINS.map(d => (
                        <option key={d.id} value={d.title}>{d.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                      Current Project Stage
                    </label>
                    <select
                      value={enquiryForm.currentStage}
                      onChange={e => setEnquiryForm({ ...enquiryForm, currentStage: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none', background: '#FFFFFF' }}
                    >
                      <option>Need Domain & Topic Guidance (Starting from Zero)</option>
                      <option>Have a Topic Idea, Need Architecture Review</option>
                      <option>Prototype Built, Need IEEE Paper Publication Help</option>
                      <option>Full Team Formed (3–4 Members), Ready to Register</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    style={{
                      marginTop: '1rem',
                      padding: '0.85rem',
                      fontSize: '1rem',
                      fontWeight: 800,
                      background: '#F5FF38',
                      color: '#17191C',
                      border: '1.5px solid #17191C',
                      borderRadius: '0.625rem',
                      boxShadow: '3px 3px 0px #17191C',
                      cursor: 'pointer'
                    }}
                  >
                    Submit Mentorship Request
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: '#F5FF38', display: 'grid', placeItems: 'center', margin: '0 auto 1rem', border: '1.5px solid #17191C' }}>
                  <CheckCircle2 size={28} style={{ color: '#17191C' }} />
                </div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#17191C', margin: '0 0 0.5rem' }}>
                  Mentorship Request Received!
                </h3>
                <p style={{ fontSize: '0.9375rem', color: '#64748B', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto 1.5rem' }}>
                  A DKoder Research Mentor will reach out to <strong>{enquiryForm.phone}</strong> on WhatsApp within 24 hours
                  with initial project abstracts and scheduling your 1-on-1 topic consultation.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  style={{
                    padding: '0.6rem 1.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 800,
                    background: '#17191C',
                    color: '#FFFFFF',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Submit Another Project
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
