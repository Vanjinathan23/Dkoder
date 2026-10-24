import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import PageHeader from '../components/layout/PageHeader'
import { Layers, Clock, Award, CheckCircle2, ArrowRight, Play, AlertCircle } from 'lucide-react'

interface ExamPlatform {
  id: string
  name: string
  company: string
  packageRange: string
  durationMinutes: number
  totalQuestions: number
  sections: { name: string; questions: number; timeLimit: string }[]
  testedBatch: string
  description: string
}

const PLATFORMS: ExamPlatform[] = [
  {
    id: 'tcs-nqt-2026',
    name: 'TCS National Qualifier Test (NQT) Simulator',
    company: 'Tata Consultancy Services',
    packageRange: '3.36 LPA (Ninja) to 9.0 LPA (Prime)',
    durationMinutes: 165,
    totalQuestions: 82,
    testedBatch: '2026 Batch Campus Recruitment',
    description: 'Exact replica of the TCS iON test environment with timed sectional switches across Numerical Ability, Verbal, Reasoning, and Advanced Hands-On Coding.',
    sections: [
      { name: 'Numerical & Quantitative Ability', questions: 26, timeLimit: '40 mins' },
      { name: 'Reasoning & Logical Ability', questions: 24, timeLimit: '35 mins' },
      { name: 'Verbal Ability (English)', questions: 24, timeLimit: '30 mins' },
      { name: 'Advanced Hands-on Coding', questions: 2, timeLimit: '60 mins' }
    ]
  },
  {
    id: 'infosys-infytq-pro',
    name: 'Infosys InfyTQ & Specialist Programmer Challenge',
    company: 'Infosys Limited',
    packageRange: '3.6 LPA (SE) to 9.5 LPA (Specialist Programmer)',
    durationMinutes: 180,
    totalQuestions: 23,
    testedBatch: '2026 National Drive',
    description: 'Simulates the Infosys certification assessment: 20 technical MCQs on Python/Java, Database queries, OOP, plus 3 algorithmic coding challenges with strict testcases.',
    sections: [
      { name: 'Programming Fundamentals (Java/Python)', questions: 10, timeLimit: '35 mins' },
      { name: 'Database Management & SQL', questions: 10, timeLimit: '35 mins' },
      { name: 'Hands-on Algorithmic Problems', questions: 3, timeLimit: '110 mins' }
    ]
  },
  {
    id: 'wipro-elite-nlth',
    name: 'Wipro Elite National Talent Hunt (NLTH)',
    company: 'Wipro Limited',
    packageRange: '3.5 LPA (Elite) to 6.5 LPA (Turbo)',
    durationMinutes: 140,
    totalQuestions: 67,
    testedBatch: '2026 University Placement',
    description: 'Timed sectional evaluation covering Aptitude, Logical Reasoning, Written Communication (Essay writing simulator), and 2 online coding questions in Java/C++.',
    sections: [
      { name: 'Quantitative & Analytical Aptitude', questions: 16, timeLimit: '25 mins' },
      { name: 'Logical Reasoning & Deduction', questions: 14, timeLimit: '20 mins' },
      { name: 'English Verbal & Grammar', questions: 22, timeLimit: '25 mins' },
      { name: 'Coding Assessment Round', questions: 2, timeLimit: '60 mins' }
    ]
  },
  {
    id: 'accenture-cognitive-tech',
    name: 'Accenture Cognitive & Technical Assessment',
    company: 'Accenture',
    packageRange: '4.5 LPA (ASE) to 6.5 LPA (FSE)',
    durationMinutes: 135,
    totalQuestions: 90,
    testedBatch: '2026 Pan-India Hiring',
    description: 'Rigorous cognitive and technical assessment including Critical Thinking, Pseudocode debugging, Cloud fundamentals, and Network security questions.',
    sections: [
      { name: 'Critical Reasoning & Problem Solving', questions: 30, timeLimit: '35 mins' },
      { name: 'Abstract Reasoning & Verbal', questions: 30, timeLimit: '35 mins' },
      { name: 'Pseudocode & Common Tech Concepts', questions: 30, timeLimit: '45 mins' }
    ]
  }
]

export default function PlatformArenaPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<ExamPlatform | null>(null)

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', background: '#FFFFFF' }}>
        <PageHeader
          badge="COMPANY PLATFORM ARENAS"
          title="TCS NQT, Infosys InfyTQ & Recruiter Test Simulators"
          description="Prepare inside genuine entrance exam test environments with sectional timers, section locks, and authentic cutoff benchmarks."
        />

        <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '3.5rem 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
            {PLATFORMS.map(platform => (
              <div
                key={platform.id}
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
                      {platform.company}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
                      {platform.testedBatch}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#17191C', lineHeight: 1.3, margin: '0 0 0.5rem' }}>
                    {platform.name}
                  </h3>

                  <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 1.25rem' }}>
                    {platform.description}
                  </p>

                  <div style={{ background: '#FAF8F5', padding: '0.85rem 1rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.35rem' }}>
                      <span style={{ color: '#64748B' }}>Salary Package:</span>
                      <strong style={{ color: '#17191C' }}>{platform.packageRange}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                      <span style={{ color: '#64748B' }}>Format:</span>
                      <strong style={{ color: '#17191C' }}>{platform.totalQuestions} Questions · {platform.durationMinutes} Mins</strong>
                    </div>
                  </div>

                  {/* Section Breakdown */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#17191C', display: 'block', marginBottom: '0.5rem' }}>
                      Sectional Breakdown:
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {platform.sections.map((sec, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#475569', background: '#FFFFFF', padding: '0.35rem 0.6rem', borderRadius: '0.35rem', border: '1px solid #E2E8F0' }}>
                          <span>{sec.name} ({sec.questions} Qs)</span>
                          <span style={{ fontWeight: 700, color: '#8875FF' }}>{sec.timeLimit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  to={`/practice/coding?mock=${platform.id}`}
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
                  <Play size={14} fill="#17191C" />
                  <span>Launch Mock Assessment</span>
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
