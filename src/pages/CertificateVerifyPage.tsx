import React, { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import PageHeader from '../components/layout/PageHeader'
import { ShieldCheck, QrCode, Search, CheckCircle2, AlertCircle, FileCheck, ArrowRight } from 'lucide-react'

interface CertificateRecord {
  code: string
  studentName: string
  courseTitle: string
  issueDate: string
  gradeOrScore: string
  institution: string
  verificationStatus: 'GENUINE' | 'REVOKED'
  skills: string[]
}

const SAMPLE_DATABASE: Record<string, CertificateRecord> = {
  'DK-2026-8819': {
    code: 'DK-2026-8819',
    studentName: 'Vigneshwaran K.',
    courseTitle: 'Data Structures & Algorithms Placement Mastery',
    issueDate: 'October 15, 2026',
    gradeOrScore: '94% (Grade A+)',
    institution: 'PSG College of Technology',
    verificationStatus: 'GENUINE',
    skills: ['Binary Trees', 'Dynamic Programming', 'Graph BFS/DFS', 'Algorithm Optimization']
  },
  'DK-2026-4421': {
    code: 'DK-2026-4421',
    studentName: 'Sneha Mukherjee',
    courseTitle: 'TCS NQT Advanced Speed Coding Bootcamp',
    issueDate: 'September 28, 2026',
    gradeOrScore: '98th National Percentile',
    institution: 'Heritage Institute of Technology',
    verificationStatus: 'GENUINE',
    skills: ['TCS NQT Advanced Coding', 'Quantitative Speed Drill', 'Java Memory Management']
  },
  'DK-2026-9002': {
    code: 'DK-2026-9002',
    studentName: 'Rohan Sharma',
    courseTitle: 'Certified Full-Stack Software Engineer',
    issueDate: 'August 10, 2026',
    gradeOrScore: '91% (Grade A)',
    institution: 'Vellore Institute of Technology',
    verificationStatus: 'GENUINE',
    skills: ['React 19', 'Node.js Microservices', 'PostgreSQL', 'Docker CI/CD']
  }
}

export default function CertificateVerifyPage() {
  const [inputCode, setInputCode] = useState('')
  const [searched, setSearched] = useState(false)
  const [result, setResult] = useState<CertificateRecord | null>(null)

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    setSearched(true)
    const cleaned = inputCode.trim().toUpperCase()
    if (SAMPLE_DATABASE[cleaned]) {
      setResult(SAMPLE_DATABASE[cleaned])
    } else {
      setResult(null)
    }
  }

  const handleSampleFill = (code: string) => {
    setInputCode(code)
    setSearched(true)
    setResult(SAMPLE_DATABASE[code])
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', background: '#FFFFFF' }}>
        <PageHeader
          badge="OFFICIAL DKODER REGISTRY"
          title="Verify an Accredited Certificate"
          description="Instant cryptographic verification for employers, universities, and placement officers. Verify certificates issued for DKoder learning programs, hackathons, and certifications."
        />

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3.5rem 1.5rem' }}>
          {/* Verification Input Box */}
          <div
            style={{
              background: '#FFFDF5',
              border: '2px solid #17191C',
              borderRadius: '1.5rem',
              padding: '2.5rem',
              boxShadow: '6px 6px 0px #17191C',
              marginBottom: '3rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.625rem', background: '#F5FF38', display: 'grid', placeItems: 'center', border: '1.5px solid #17191C' }}>
                <QrCode size={20} style={{ color: '#17191C' }} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#17191C', margin: 0 }}>
                  Enter Verification Code or Certificate ID
                </h2>
                <span style={{ fontSize: '0.8125rem', color: '#64748B' }}>
                  Check the code printed directly beneath the QR code on the certificate document.
                </span>
              </div>
            </div>

            <form onSubmit={handleVerify} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                required
                placeholder="e.g. DK-2026-8819"
                value={inputCode}
                onChange={e => setInputCode(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: '240px',
                  padding: '0.85rem 1.25rem',
                  fontSize: '1rem',
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em',
                  borderRadius: '0.75rem',
                  border: '2px solid #17191C',
                  outline: 'none',
                  background: '#FFFFFF'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '0.85rem 2rem',
                  fontSize: '0.9375rem',
                  fontWeight: 800,
                  background: '#F5FF38',
                  color: '#17191C',
                  border: '2px solid #17191C',
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  boxShadow: '2px 2px 0px #17191C',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Search size={16} />
                <span>Verify Credential</span>
              </button>
            </form>

            {/* Quick Sample Links */}
            <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.75rem', color: '#64748B' }}>
              <span>Try sample issued IDs:</span>
              {Object.keys(SAMPLE_DATABASE).map(code => (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleSampleFill(code)}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: '0.35rem',
                    padding: '0.2rem 0.5rem',
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    color: '#17191C',
                    fontWeight: 600
                  }}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          {/* Verification Results Panel */}
          {searched && (
            <div>
              {result ? (
                <div
                  style={{
                    background: '#FFFFFF',
                    border: '2px solid #16A34A',
                    borderRadius: '1.5rem',
                    padding: '2.5rem',
                    boxShadow: '6px 6px 0px #16A34A',
                    animation: 'fadeIn 0.2s ease-out'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: '#DCFCE7', display: 'grid', placeItems: 'center', border: '1.5px solid #16A34A' }}>
                        <CheckCircle2 size={24} style={{ color: '#16A34A' }} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#16A34A' }}>
                          Verified Genuine Credential
                        </span>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#17191C', margin: '0.2rem 0 0' }}>
                          {result.studentName}
                        </h3>
                      </div>
                    </div>

                    <div style={{ background: '#FAF8F5', padding: '0.5rem 1rem', borderRadius: '0.625rem', border: '1px solid #E2E8F0', textAlign: 'right' }}>
                      <span style={{ fontSize: '0.6875rem', color: '#64748B', display: 'block' }}>CERTIFICATE ID</span>
                      <strong style={{ fontSize: '0.9375rem', fontFamily: 'monospace', color: '#17191C' }}>{result.code}</strong>
                    </div>
                  </div>

                  {/* Certificate Details Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', background: '#F8FAFC', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #E2E8F0', marginBottom: '1.5rem' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Program / Course</span>
                      <strong style={{ fontSize: '0.9375rem', color: '#17191C' }}>{result.courseTitle}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Date of Issuance</span>
                      <strong style={{ fontSize: '0.9375rem', color: '#17191C' }}>{result.issueDate}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Institution / College</span>
                      <strong style={{ fontSize: '0.9375rem', color: '#17191C' }}>{result.institution}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Benchmark Performance</span>
                      <strong style={{ fontSize: '0.9375rem', color: '#16A34A' }}>{result.gradeOrScore}</strong>
                    </div>
                  </div>

                  {/* Verified Skills */}
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#17191C', display: 'block', marginBottom: '0.5rem' }}>
                      Verified Competencies Evaluated:
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {result.skills.map((skill, i) => (
                        <span key={i} style={{ background: '#FAF8F5', border: '1px solid #CBD5E1', padding: '0.25rem 0.65rem', borderRadius: '9999px', fontSize: '0.8125rem', fontWeight: 600, color: '#334155' }}>
                          ✓ {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    background: '#FFFFFF',
                    border: '2px solid #EF4444',
                    borderRadius: '1.5rem',
                    padding: '2.5rem',
                    boxShadow: '6px 6px 0px #EF4444',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', background: '#FEE2E2', display: 'grid', placeItems: 'center', margin: '0 auto 1rem', border: '1.5px solid #EF4444' }}>
                    <AlertCircle size={28} style={{ color: '#EF4444' }} />
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#17191C', margin: '0 0 0.5rem' }}>
                    No Certificate Found Matching “{inputCode}”
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#64748B', maxWidth: '520px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
                    Please double-check the code for typos. If the certificate code is not found in the official DKoder registry,
                    the credential was not issued by DKoder or may have been revoked.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setInputCode('')
                      setSearched(false)
                    }}
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
                    Try Another Code
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
