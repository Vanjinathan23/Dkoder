import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import PageHeader from '../components/layout/PageHeader'
import { Cpu, CheckCircle2, ArrowRight, Search } from 'lucide-react'

interface VendorCert {
  id: string
  title: string
  code: string
  vendor: 'Oracle' | 'Microsoft Azure' | 'AWS' | 'Cisco'
  version: string
  questionsCount: number
  passingScore: string
  focus: string
  keyTopics: string[]
}

const TECH_CERTS: VendorCert[] = [
  {
    id: 'oracle-java-21',
    title: 'Oracle Certified Professional: Java SE 21 Developer',
    code: '1Z0-830',
    vendor: 'Oracle',
    version: 'Java 21 LTS',
    questionsCount: 50,
    passingScore: '68%',
    focus: 'Modern Java 21 features, Virtual Threads, Pattern Matching, Record Patterns, Sequenced Collections.',
    keyTopics: ['Virtual Threads & Project Loom', 'Pattern Matching for Switch', 'Record Patterns & Sealed Classes', 'Concurrency API & ForkJoinPool']
  },
  {
    id: 'oracle-java-17',
    title: 'Oracle Certified Professional: Java SE 17 Developer',
    code: '1Z0-829',
    vendor: 'Oracle',
    version: 'Java 17 LTS',
    questionsCount: 50,
    passingScore: '68%',
    focus: 'Sealed classes, text blocks, switch expressions, lambdas, streams, and module system.',
    keyTopics: ['Java Streams & Collectors', 'Records & Local Variable Type Inference', 'Exception Handling & Assertions', 'Java Module System (JPMS)']
  },
  {
    id: 'oracle-oci-genai-2025',
    title: 'Oracle Cloud Infrastructure 2025 Generative AI Professional',
    code: '1Z0-1127-25',
    vendor: 'Oracle',
    version: '2025 Edition',
    questionsCount: 55,
    passingScore: '65%',
    focus: 'OCI Generative AI service, dedicated AI clusters, LLM fine-tuning, RAG with Vector Search in Oracle 23ai.',
    keyTopics: ['OCI Generative AI Agents', 'Cohere & Llama Model Deployment', 'Vector Search & Embeddings in DB 23ai', 'Prompt Engineering & Fine-Tuning']
  },
  {
    id: 'oracle-java-8',
    title: 'Oracle Certified Associate, Java SE 8 Programmer',
    code: '1Z0-808',
    vendor: 'Oracle',
    version: 'Java 8',
    questionsCount: 56,
    passingScore: '65%',
    focus: 'Core Java syntax, primitive and reference types, arrays, ArrayList, methods, and encapsulation.',
    keyTopics: ['Java Basics & Flow Control', 'OOP Inheritance & Interfaces', 'Exception Handling', 'Java 8 Lambda Basics']
  },
  {
    id: 'azure-solutions-architect',
    title: 'Microsoft Certified: Azure Solutions Architect Expert',
    code: 'AZ-305',
    vendor: 'Microsoft Azure',
    version: '2026 Updated',
    questionsCount: 60,
    passingScore: '700/1000',
    focus: 'Design identity, governance, monitoring, data storage, business continuity, and infrastructure solutions.',
    keyTopics: ['Azure Entra ID & Governance', 'Cosmos DB & SQL Architecture', 'App Services & AKS', 'BCDR & Azure Site Recovery']
  },
  {
    id: 'aws-solutions-architect-assoc',
    title: 'AWS Certified Solutions Architect – Associate',
    code: 'SAA-C03',
    vendor: 'AWS',
    version: 'SAA-C03',
    questionsCount: 65,
    passingScore: '720/1000',
    focus: 'High availability, cost-optimized architectures, VPC networking, security groups, and microservices.',
    keyTopics: ['VPC, Subnets & Transit Gateway', 'S3 Storage Classes & Lifecycle', 'Lambda, ECS & SQS Architecture', 'Auto Scaling & Application Load Balancers']
  }
]

export default function TechCertificationsPage() {
  const [vendorFilter, setVendorFilter] = useState('All')
  const [search, setSearch] = useState('')

  const vendors = ['All', 'Oracle', 'Microsoft Azure', 'AWS']

  const filtered = TECH_CERTS.filter(c => {
    const matchVendor = vendorFilter === 'All' || c.vendor === vendorFilter
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase())
    return matchVendor && matchSearch
  })

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', background: '#FFFFFF' }}>
        <PageHeader
          badge="TECHNOLOGY CERTIFICATIONS"
          title="Vendor Official Certification Prep"
          description="Prepare for official developer and cloud certifications from Oracle, Microsoft Azure, and Amazon Web Services. Curated question banks verified against recent exam updates."
        >
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <Link
              to="/certifications/topic"
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
              ← Switch to Topic-Wise (Cybersecurity, Cloud, Full Stack)
            </Link>
          </div>
        </PageHeader>

        <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '3rem 1.5rem' }}>
          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {vendors.map(v => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVendorFilter(v)}
                  style={{
                    padding: '0.5rem 1.15rem',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    borderRadius: '9999px',
                    border: vendorFilter === v ? '1.5px solid #17191C' : '1px solid #E2E8F0',
                    background: vendorFilter === v ? '#F5FF38' : '#FAF8F5',
                    color: '#17191C',
                    cursor: 'pointer'
                  }}
                >
                  {v}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', width: '300px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
              <input
                type="text"
                placeholder="Search vendor cert or code..."
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
                      {cert.vendor}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, fontFamily: 'monospace', color: '#8875FF' }}>
                      Exam: {cert.code}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#17191C', lineHeight: 1.35, margin: '0 0 0.5rem' }}>
                    {cert.title}
                  </h3>

                  <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 1.25rem' }}>
                    {cert.focus}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', background: '#FAF8F5', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0', marginBottom: '1.25rem' }}>
                    <div>
                      <span style={{ fontSize: '0.6875rem', color: '#64748B', display: 'block' }}>Exam Format:</span>
                      <strong style={{ fontSize: '0.8125rem', color: '#17191C' }}>{cert.questionsCount} Questions</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.6875rem', color: '#64748B', display: 'block' }}>Passing Score:</span>
                      <strong style={{ fontSize: '0.8125rem', color: '#17191C' }}>{cert.passingScore}</strong>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#17191C', display: 'block', marginBottom: '0.4rem' }}>
                      Key Exam Topics Tested:
                    </span>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {cert.keyTopics.map((topic, idx) => (
                        <li key={idx} style={{ fontSize: '0.75rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <CheckCircle2 size={13} style={{ color: '#8875FF', flexShrink: 0 }} />
                          <span>{topic}</span>
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
