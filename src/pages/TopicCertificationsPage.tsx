import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import PageHeader from '../components/layout/PageHeader'
import { ShieldCheck, Award, CheckCircle2, ArrowRight, Search, ExternalLink } from 'lucide-react'

interface CertificationTrack {
  id: string
  title: string
  code: string
  category: 'Cybersecurity' | 'Cloud Architecture' | 'Full Stack' | 'AI & Data Science'
  issuingBody: string
  examQuestions: number
  passingScore: string
  difficulty: 'Foundation' | 'Intermediate' | 'Professional'
  description: string
  skillsMeasured: string[]
}

const TOPIC_CERTS: CertificationTrack[] = [
  {
    id: 'ceh',
    title: 'Certified Ethical Hacker (CEH v12)',
    code: '312-50',
    category: 'Cybersecurity',
    issuingBody: 'EC-Council',
    examQuestions: 125,
    passingScore: '70%',
    difficulty: 'Professional',
    description: 'The global standard for ethical hacking. Covers threat vectors, footprinting, network scanning, system hacking, malware, and cryptography.',
    skillsMeasured: ['Footprinting & Reconnaissance', 'Sniffing & Social Engineering', 'Denial-of-Service & Session Hijacking', 'Web Server & SQL Injection']
  },
  {
    id: 'cnd',
    title: 'Certified Network Defender (CND)',
    code: '312-38',
    category: 'Cybersecurity',
    issuingBody: 'EC-Council',
    examQuestions: 100,
    passingScore: '70%',
    difficulty: 'Intermediate',
    description: 'Defense-in-depth networking, firewall hardening, VPN architectures, and real-time network traffic packet inspection.',
    skillsMeasured: ['Network Defense Fundamentals', 'Firewalls & IDS/IPS Configuration', 'Vulnerability Assessment', 'Incident Response Plans']
  },
  {
    id: 'chfi',
    title: 'Computer Hacking Forensic Investigator (CHFI)',
    code: '312-49',
    category: 'Cybersecurity',
    issuingBody: 'EC-Council',
    examQuestions: 150,
    passingScore: '70%',
    difficulty: 'Professional',
    description: 'Digital forensics investigations, memory dumps, anti-forensics detection, and chain of custody evidence preservation.',
    skillsMeasured: ['Digital Evidence Seizure', 'File System Forensics', 'Log Analysis & Cloud Forensics', 'Steganography Investigation']
  },
  {
    id: 'ccse',
    title: 'Certified Cloud Security Engineer (CCSE)',
    code: '312-40',
    category: 'Cloud Architecture',
    issuingBody: 'EC-Council / Cloud Alliance',
    examQuestions: 125,
    passingScore: '70%',
    difficulty: 'Professional',
    description: 'Securing multi-cloud environments, IAM permissions, container isolation, and regulatory compliance standards.',
    skillsMeasured: ['Cloud Platform Security', 'Container & Kubernetes Hardening', 'Zero Trust Architecture', 'Cloud Governance & Audit']
  },
  {
    id: 'ctia',
    title: 'Certified Threat Intelligence Analyst (CTIA)',
    code: '312-85',
    category: 'Cybersecurity',
    issuingBody: 'EC-Council',
    examQuestions: 100,
    passingScore: '70%',
    difficulty: 'Professional',
    description: 'Tactical, operational, and strategic cyber threat intelligence gathering to preempt adversary intrusions.',
    skillsMeasured: ['Threat Intelligence Life Cycle', 'Dark Web & OSINT Collection', 'Data Analysis & Structuring', 'Threat Dissemination']
  },
  {
    id: 'fullstack-dev-cert',
    title: 'Certified Full-Stack Web Architect',
    code: 'DK-FS-901',
    category: 'Full Stack',
    issuingBody: 'DKoder Engineering Board',
    examQuestions: 80,
    passingScore: '75%',
    difficulty: 'Professional',
    description: 'Production frontend and backend system evaluation with in-browser coding test and architecture review.',
    skillsMeasured: ['React Architecture & State', 'REST/GraphQL API Performance', 'Database Indexing & Sharding', 'Microservices Deployment']
  },
  {
    id: 'ai-ml-cert',
    title: 'Applied Machine Learning & GenAI Practitioner',
    code: 'DK-AI-802',
    category: 'AI & Data Science',
    issuingBody: 'DKoder Research Board',
    examQuestions: 90,
    passingScore: '72%',
    difficulty: 'Intermediate',
    description: 'Mathematical foundation of deep neural networks, model fine-tuning, vector similarity search, and RAG pipelines.',
    skillsMeasured: ['PyTorch Model Training', 'Feature Engineering & Cleansing', 'Vector Databases & Embeddings', 'RAG Deployment with FastAPI']
  }
]

export default function TopicCertificationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [search, setSearch] = useState('')

  const categories = ['All', 'Cybersecurity', 'Cloud Architecture', 'Full Stack', 'AI & Data Science']

  const filtered = TOPIC_CERTS.filter(c => {
    const matchCat = selectedCategory === 'All' || c.category === selectedCategory
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', background: '#FFFFFF' }}>
        <PageHeader
          badge="TOPIC CERTIFICATIONS"
          title="Industry & Topic-Wise Credentials"
          description="Prepare for globally recognized certifications in Cybersecurity, Cloud, Full-Stack, and AI. Verified question banks with simulation exam mode."
        >
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <Link
              to="/certifications/technology"
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#17191C',
                textDecoration: 'none',
                background: '#FAF8F5',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                border: '1.5px solid #17191C'
              }}
            >
              Switch to Technology-Wise (Oracle, Azure, AWS) →
            </Link>
          </div>
        </PageHeader>

        <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '3rem 1.5rem' }}>
          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.5rem 1.15rem',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    borderRadius: '9999px',
                    border: selectedCategory === cat ? '1.5px solid #17191C' : '1px solid #E2E8F0',
                    background: selectedCategory === cat ? '#F5FF38' : '#FAF8F5',
                    color: '#17191C',
                    cursor: 'pointer'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', width: '300px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
              <input
                type="text"
                placeholder="Search certification or exam code..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', padding: '0.55rem 1rem 0.55rem 2.25rem', fontSize: '0.875rem', borderRadius: '9999px', border: '1.5px solid #E2E8F0', outline: 'none', background: '#FAF8F5' }}
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
            {filtered.map(cert => (
              <div
                key={cert.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '1.25rem',
                  border: '1.5px solid #17191C',
                  boxShadow: '4px 4px 0px #17191C',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', background: '#F5FF38', padding: '0.2rem 0.55rem', borderRadius: '9999px', border: '1px solid #17191C', color: '#17191C' }}>
                      {cert.issuingBody}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, fontFamily: 'monospace', color: '#8875FF' }}>
                      Code: {cert.code}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#17191C', lineHeight: 1.35, margin: '0 0 0.5rem' }}>
                    {cert.title}
                  </h3>

                  <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 1.25rem' }}>
                    {cert.description}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', background: '#FAF8F5', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0', marginBottom: '1.25rem' }}>
                    <div>
                      <span style={{ fontSize: '0.6875rem', color: '#64748B', display: 'block' }}>Exam Format:</span>
                      <strong style={{ fontSize: '0.8125rem', color: '#17191C' }}>{cert.examQuestions} Questions</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.6875rem', color: '#64748B', display: 'block' }}>Passing Score:</span>
                      <strong style={{ fontSize: '0.8125rem', color: '#17191C' }}>{cert.passingScore}</strong>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#17191C', display: 'block', marginBottom: '0.4rem' }}>
                      Core Competencies Tested:
                    </span>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {cert.skillsMeasured.map((skill, idx) => (
                        <li key={idx} style={{ fontSize: '0.75rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <CheckCircle2 size={13} style={{ color: '#8875FF', flexShrink: 0 }} />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  to={`/practice?cert=${cert.code}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    padding: '0.75rem',
                    fontSize: '0.875rem',
                    fontWeight: 800,
                    background: '#F5FF38',
                    color: '#17191C',
                    border: '1.5px solid #17191C',
                    borderRadius: '0.625rem',
                    boxShadow: '2px 2px 0px #17191C',
                    textDecoration: 'none'
                  }}
                >
                  <span>Practice Exam Questions</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
