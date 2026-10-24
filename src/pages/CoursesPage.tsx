import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import PageHeader from '../components/layout/PageHeader'
import { BookOpen, Clock, Star, Users, CheckCircle, ArrowRight, Filter, Search } from 'lucide-react'

interface Course {
  id: string
  title: string
  category: string
  instructor: string
  role: string
  rating: number
  reviewsCount: number
  duration: string
  studentsCount: number
  price: number
  level: string
  tagline: string
  skills: string[]
  syllabus: { title: string; lectures: number }[]
}

const COURSES: Course[] = [
  {
    id: 'dsa-placement-mastery',
    title: 'Data Structures & Algorithms Placement Engine',
    category: 'DSA & Algorithms',
    instructor: 'Karthik Raja',
    role: 'Ex-Amazon Senior SDE',
    rating: 4.9,
    reviewsCount: 1420,
    duration: '14 Weeks (120+ Hrs)',
    studentsCount: 3840,
    price: 3499,
    level: 'Intermediate to Advanced',
    tagline: 'Master 450+ high-frequency company interview problems with optimal time & space complexity.',
    skills: ['Arrays & 2-Pointers', 'Dynamic Programming', 'Graph BFS/DFS', 'Binary Trees & Tries', 'Sliding Window'],
    syllabus: [
      { title: 'Foundations of Algorithm Analysis & Math', lectures: 12 },
      { title: 'Array Optimization, Hashing & String Tricks', lectures: 18 },
      { title: 'Trees, Heaps, and Priority Queues', lectures: 22 },
      { title: 'Dynamic Programming Patterns (1D & 2D)', lectures: 28 },
      { title: 'Graph Algorithms & Shortest Path', lectures: 24 },
      { title: 'Mock Interviews & Company Shortlists', lectures: 16 }
    ]
  },
  {
    id: 'fullstack-production-engineering',
    title: 'Production Full-Stack Software Engineering',
    category: 'Web Development',
    instructor: 'Priya Sundaram',
    role: 'Staff Architect, TechLead',
    rating: 4.85,
    reviewsCount: 980,
    duration: '16 Weeks (140+ Hrs)',
    studentsCount: 2950,
    price: 3999,
    level: 'Beginner to Professional',
    tagline: 'Build real-world distributed web applications with React, Node.js, PostgreSQL, Docker and AWS.',
    skills: ['React 19 & TypeScript', 'Node.js & Express', 'PostgreSQL & Prisma', 'Docker & CI/CD', 'Redis & Caching'],
    syllabus: [
      { title: 'Modern TypeScript & Frontend Architecture', lectures: 20 },
      { title: 'Backend REST & GraphQL APIs with Node', lectures: 24 },
      { title: 'Database Design, Indexing & Transactions', lectures: 18 },
      { title: 'Authentication, JWT & Security Best Practices', lectures: 14 },
      { title: 'Deployment, Dockerization & AWS Cloud', lectures: 22 }
    ]
  },
  {
    id: 'ai-machine-learning-engineering',
    title: 'Applied AI & Machine Learning Systems',
    category: 'AI & Data Science',
    instructor: 'Dr. Anand Raman',
    role: 'AI Research Scientist',
    rating: 4.92,
    reviewsCount: 750,
    duration: '12 Weeks (100+ Hrs)',
    studentsCount: 1820,
    price: 4499,
    level: 'Intermediate',
    tagline: 'End-to-end ML pipelines from data engineering to LLM fine-tuning and production deployment.',
    skills: ['Python & PyTorch', 'Scikit-Learn', 'Vector Databases', 'LangChain & RAG', 'MLOps & FastAPI'],
    syllabus: [
      { title: 'Linear Algebra & Statistics for Machine Learning', lectures: 15 },
      { title: 'Supervised & Unsupervised Learning in Scikit', lectures: 20 },
      { title: 'Deep Learning & Neural Networks with PyTorch', lectures: 25 },
      { title: 'Retrieval Augmented Generation (RAG) & Vector DBs', lectures: 18 },
      { title: 'Production ML Deployment with FastAPI & Docker', lectures: 14 }
    ]
  },
  {
    id: 'cloud-devops-mastery',
    title: 'Cloud Infrastructure & DevOps Engineering',
    category: 'Cloud & DevOps',
    instructor: 'Vipin Chandran',
    role: 'Cloud Solutions Architect',
    rating: 4.88,
    reviewsCount: 620,
    duration: '10 Weeks (80+ Hrs)',
    studentsCount: 1450,
    price: 2999,
    level: 'Intermediate',
    tagline: 'Become certified and job-ready on AWS, Kubernetes, Terraform, and automated GitOps pipelines.',
    skills: ['AWS Core Services', 'Kubernetes Orchestration', 'Terraform (IaC)', 'GitHub Actions CI/CD', 'Prometheus & Grafana'],
    syllabus: [
      { title: 'Linux Administration & Shell Scripting', lectures: 12 },
      { title: 'AWS Cloud Architecture & Security Groups', lectures: 22 },
      { title: 'Containers with Docker & Microservices', lectures: 16 },
      { title: 'Kubernetes Cluster Architecture & Pods', lectures: 20 },
      { title: 'Infrastructure as Code with Terraform', lectures: 14 }
    ]
  },
  {
    id: 'cybersecurity-offensive-defense',
    title: 'Cybersecurity: Ethical Hacking & Defensive Ops',
    category: 'Cybersecurity',
    instructor: 'Rohan Deshmukh',
    role: 'Lead Penetration Tester',
    rating: 4.94,
    reviewsCount: 840,
    duration: '12 Weeks (95+ Hrs)',
    studentsCount: 2100,
    price: 3799,
    level: 'Beginner to Intermediate',
    tagline: 'Hands-on ethical hacking, network analysis, vulnerability assessment, and CEH certification prep.',
    skills: ['Network Penetration Testing', 'OWASP Top 10', 'Burp Suite & Wireshark', 'Metasploit & Linux Security', 'Cryptography'],
    syllabus: [
      { title: 'Networking Fundamentals & Packet Inspection', lectures: 16 },
      { title: 'Footprinting, Reconnaissance & Port Scanning', lectures: 18 },
      { title: 'Web Application Vulnerabilities & Exploits', lectures: 24 },
      { title: 'System Hacking & Privilege Escalation', lectures: 20 },
      { title: 'Defensive Controls, SIEM & Incident Response', lectures: 15 }
    ]
  }
]

const CATEGORIES = ['All Categories', 'DSA & Algorithms', 'Web Development', 'AI & Data Science', 'Cloud & DevOps', 'Cybersecurity']

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null)

  const filteredCourses = COURSES.filter(course => {
    const matchesCategory = selectedCategory === 'All Categories' || course.category === selectedCategory
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const selectedCourse = COURSES.find(c => c.id === activeCourseId)

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', background: '#FFFFFF' }}>
        <PageHeader
          badge="DKODER LEARN"
          title="Skill-Based Engineering Programs"
          description="Industry-verified curriculum designed by senior software engineers. Built for engineering students who want job-ready skills, production portfolios, and accredited certifications."
        />

        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '3rem 1.5rem' }}>
          {/* Controls: Search & Category Filter */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            {/* Category Pills */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    borderRadius: '9999px',
                    border: selectedCategory === cat ? '1.5px solid #17191C' : '1px solid #E2E8F0',
                    background: selectedCategory === cat ? '#F5FF38' : '#FAF8F5',
                    color: '#17191C',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', width: '300px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
              <input
                type="text"
                placeholder="Search courses or skills..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 1rem 0.55rem 2.25rem',
                  fontSize: '0.875rem',
                  borderRadius: '9999px',
                  border: '1.5px solid #E2E8F0',
                  outline: 'none',
                  background: '#FAF8F5',
                  color: '#17191C'
                }}
              />
            </div>
          </div>

          {/* Courses Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2rem' }}>
            {filteredCourses.map(course => (
              <div
                key={course.id}
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid #17191C',
                  borderRadius: '1.25rem',
                  boxShadow: '4px 4px 0px #17191C',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', background: '#FFFDF0', padding: '0.2rem 0.55rem', borderRadius: '9999px', border: '1px solid #F5FF38', color: '#17191C' }}>
                      {course.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={13} />
                      {course.duration}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#17191C', lineHeight: 1.3, margin: '0 0 0.5rem' }}>
                    {course.title}
                  </h3>

                  <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 1rem' }}>
                    {course.tagline}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: '#F5FF38', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '0.8125rem', border: '1px solid #17191C' }}>
                      {course.instructor.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#17191C' }}>{course.instructor}</div>
                      <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>{course.role}</div>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.5rem' }}>
                    {course.skills.map((skill, i) => (
                      <span key={i} style={{ fontSize: '0.6875rem', fontWeight: 600, background: '#FAF8F5', border: '1px solid #E2E8F0', padding: '0.2rem 0.5rem', borderRadius: '0.35rem', color: '#475569' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #E2E8F0', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#17191C' }}>₹{course.price.toLocaleString()}</span>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>One-time payment</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8125rem', fontWeight: 700, color: '#17191C' }}>
                      <Star size={14} fill="#F5FF38" stroke="#17191C" />
                      <span>{course.rating}</span>
                      <span style={{ fontSize: '0.75rem', color: '#64748B' }}>({course.reviewsCount})</span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setActiveCourseId(course.id)}
                      style={{
                        padding: '0.6rem',
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        background: '#FAF8F5',
                        border: '1px solid #17191C',
                        borderRadius: '0.5rem',
                        cursor: 'pointer'
                      }}
                    >
                      View Syllabus
                    </button>
                    <Link
                      to={`/auth/signup?course=${course.id}`}
                      style={{
                        padding: '0.6rem',
                        fontSize: '0.8125rem',
                        fontWeight: 800,
                        background: '#F5FF38',
                        color: '#17191C',
                        border: '1.5px solid #17191C',
                        borderRadius: '0.5rem',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      <span>Enroll Now</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Syllabus Modal */}
        {selectedCourse && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(17, 19, 24, 0.65)',
              backdropFilter: 'blur(6px)',
              zIndex: 1000,
              display: 'grid',
              placeItems: 'center',
              padding: '1.5rem'
            }}
            onClick={() => setActiveCourseId(null)}
          >
            <div
              style={{
                background: '#FFFFFF',
                maxWidth: '600px',
                width: '100%',
                borderRadius: '1.5rem',
                border: '2px solid #17191C',
                boxShadow: '8px 8px 0px #17191C',
                padding: '2rem',
                maxHeight: '85vh',
                overflowY: 'auto'
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', background: '#F5FF38', padding: '0.2rem 0.5rem', borderRadius: '9999px', border: '1px solid #17191C' }}>
                    {selectedCourse.category}
                  </span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#17191C', margin: '0.5rem 0 0.25rem' }}>
                    {selectedCourse.title}
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: 0 }}>
                    Instructor: {selectedCourse.instructor} · {selectedCourse.role}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveCourseId(null)}
                  style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', padding: '0.25rem 0.5rem' }}
                >
                  ✕
                </button>
              </div>

              <h4 style={{ fontSize: '0.9375rem', fontWeight: 800, textTransform: 'uppercase', color: '#17191C', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                Comprehensive Syllabus Modules
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {selectedCourse.syllabus.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#FAF8F5',
                      padding: '0.85rem 1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', background: '#F5FF38', display: 'grid', placeItems: 'center', fontSize: '0.6875rem', fontWeight: 800, border: '1px solid #17191C' }}>
                        {idx + 1}
                      </span>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#17191C' }}>{item.title}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>{item.lectures} Lectures</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#17191C' }}>₹{selectedCourse.price.toLocaleString()}</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Includes full lifetime access</span>
                </div>
                <Link
                  to={`/auth/signup?course=${selectedCourse.id}`}
                  style={{
                    padding: '0.75rem 1.75rem',
                    fontSize: '0.9375rem',
                    fontWeight: 800,
                    background: '#F5FF38',
                    color: '#17191C',
                    border: '1.5px solid #17191C',
                    borderRadius: '0.75rem',
                    boxShadow: '3px 3px 0px #17191C',
                    textDecoration: 'none'
                  }}
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
