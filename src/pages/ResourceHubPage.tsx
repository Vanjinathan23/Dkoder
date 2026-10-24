import React, { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import PageHeader from '../components/layout/PageHeader'
import { FileText, Video, Download, Play, Search, Eye, ExternalLink, Bookmark } from 'lucide-react'

interface ResourceItem {
  id: string
  title: string
  category: 'Interview Experiences' | 'Video Hub' | 'Core CS Guides' | 'DSA Cheat Sheets'
  author: string
  collegeOrCompany: string
  readTime: string
  type: 'video' | 'pdf' | 'article'
  videoEmbedUrl?: string
  description: string
  downloadsCount: number
  tags: string[]
}

const RESOURCES_DATA: ResourceItem[] = [
  {
    id: 'zoho-round3-experience',
    title: 'Zoho Advanced Application Development Round (Round 3) Decoded',
    category: 'Interview Experiences',
    author: 'Vigneshwaran K.',
    collegeOrCompany: 'Placed at Zoho (₹8.4 LPA)',
    readTime: '8 min read',
    type: 'article',
    description: 'Complete breakdown of Zoho Round 3: Building a modular Train Ticket Booking system in pure Java without third-party collections. Includes full code and edge cases.',
    downloadsCount: 4520,
    tags: ['Zoho', 'OOP Design', 'Java CLI', 'Round 3']
  },
  {
    id: 'amazon-oa-trees-graphs-walkthrough',
    title: 'Amazon SDE Online Assessment: 10 Essential Tree & Graph Patterns',
    category: 'Video Hub',
    author: 'Karthik Raja',
    collegeOrCompany: 'Ex-Amazon Senior SDE',
    readTime: '42 min video',
    type: 'video',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    description: 'Detailed video lecture explaining the exact tree serialization and cycle detection variants commonly tested in Amazon campus recruitment rounds.',
    downloadsCount: 8940,
    tags: ['Amazon', 'Trees', 'BFS/DFS', 'Video Lecture']
  },
  {
    id: 'dbms-os-placement-handbook',
    title: 'Core CS Placement Handbook: Top 100 OS & DBMS Questions',
    category: 'Core CS Guides',
    author: 'DKoder Academic Team',
    collegeOrCompany: 'Faculty Board Verified',
    readTime: 'PDF Guide (48 Pages)',
    type: 'pdf',
    description: 'High-yield revision notes covering B+ Trees, Transactions, ACID properties, Virtual Memory, Inverted Page Tables, and Deadlock avoidance.',
    downloadsCount: 15320,
    tags: ['DBMS', 'OS', 'Normalization', 'Indexing', 'PDF']
  },
  {
    id: 'dsa-450-pattern-cheatsheet',
    title: 'The Algorithmic Pattern Map: 14 Patterns to Solve 400+ Problems',
    category: 'DSA Cheat Sheets',
    author: 'DKoder Engineering Cell',
    collegeOrCompany: 'Placement LMS Team',
    readTime: 'Quick Reference Sheet',
    type: 'pdf',
    description: 'Visual map connecting Two Pointers, Sliding Window, Fast & Slow Pointers, Monotonic Stack, Top K Elements, and Cyclic Sort to real interview questions.',
    downloadsCount: 22400,
    tags: ['DSA', 'Two Pointers', 'Sliding Window', 'Pattern Sheet']
  },
  {
    id: 'tcs-digital-prime-interview-experience',
    title: 'How I Cracked TCS Digital (₹7.5 LPA) & TCS Prime (₹9 LPA)',
    category: 'Interview Experiences',
    author: 'Sneha Mukherjee',
    collegeOrCompany: 'Placed at TCS Prime',
    readTime: '10 min read',
    type: 'article',
    description: 'My complete interview trajectory: Clearing the Advanced Coding section in NQT, handling the technical panel questions on Docker, and HR discussion.',
    downloadsCount: 6810,
    tags: ['TCS Digital', 'TCS Prime', 'NQT', 'Interview Experience']
  },
  {
    id: 'mock-hr-interview-behavioral-simulation',
    title: 'Mock Behavioral & HR Interview: Handling Tough Situational Questions',
    category: 'Video Hub',
    author: 'Devadathan N.',
    collegeOrCompany: 'HR Hiring Panel',
    readTime: '35 min video',
    type: 'video',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    description: 'Unrehearsed mock HR interview simulation showing how to answer "Why should we hire you?", "Describe a conflict in your team", and compensation expectations.',
    downloadsCount: 5200,
    tags: ['HR Interview', 'Behavioral', 'STAR Method', 'Video Hub']
  }
]

const RESOURCE_CATEGORIES = ['All', 'Interview Experiences', 'Video Hub', 'Core CS Guides', 'DSA Cheat Sheets']

export default function ResourceHubPage() {
  const [selectedCat, setSelectedCat] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeVideo, setActiveVideo] = useState<ResourceItem | null>(null)
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null)

  const filtered = RESOURCES_DATA.filter(res => {
    const matchCat = selectedCat === 'All' || res.category === selectedCat
    const matchSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchCat && matchSearch
  })

  const handleDownload = (id: string, title: string) => {
    setDownloadSuccess(title)
    setTimeout(() => setDownloadSuccess(null), 3000)
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', background: '#FFFFFF' }}>
        <PageHeader
          badge="DKODER RESOURCE HUB"
          title="Placement Guides, Videos & Cheat Sheets"
          description="Curated by top placed students and tech recruiters. Video walkthroughs, authentic interview round archives, and quick revision sheets."
        />

        <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '3rem 1.5rem' }}>
          {/* Search and Filters */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {RESOURCE_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCat(cat)}
                  style={{
                    padding: '0.5rem 1.15rem',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    borderRadius: '9999px',
                    border: selectedCat === cat ? '1.5px solid #17191C' : '1px solid #E2E8F0',
                    background: selectedCat === cat ? '#F5FF38' : '#FAF8F5',
                    color: '#17191C',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', width: '320px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
              <input
                type="text"
                placeholder="Search resources, topics, companies..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 1rem 0.55rem 2.25rem',
                  fontSize: '0.875rem',
                  borderRadius: '9999px',
                  border: '1.5px solid #E2E8F0',
                  outline: 'none',
                  background: '#FAF8F5'
                }}
              />
            </div>
          </div>

          {downloadSuccess && (
            <div style={{ background: '#F5FF38', color: '#17191C', border: '1.5px solid #17191C', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', marginBottom: '1.5rem', fontWeight: 700, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>✓ Downloading: “{downloadSuccess}” — check your downloads folder.</span>
            </div>
          )}

          {/* Resources Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.75rem' }}>
            {filtered.map(res => (
              <div
                key={res.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '1.25rem',
                  border: '1.5px solid #17191C',
                  boxShadow: '4px 4px 0px #17191C',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.15s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', background: res.type === 'video' ? '#8875FF' : '#FFFDF0', color: res.type === 'video' ? '#FFFFFF' : '#17191C', padding: '0.2rem 0.55rem', borderRadius: '9999px', border: res.type === 'video' ? 'none' : '1px solid #F5FF38' }}>
                      {res.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
                      {res.readTime}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#17191C', lineHeight: 1.35, margin: '0 0 0.5rem' }}>
                    {res.title}
                  </h3>

                  <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 1rem' }}>
                    {res.description}
                  </p>

                  <div style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 600, marginBottom: '1rem' }}>
                    By <strong>{res.author}</strong> · <span style={{ color: '#8875FF' }}>{res.collegeOrCompany}</span>
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.5rem' }}>
                    {res.tags.map((t, i) => (
                      <span key={i} style={{ fontSize: '0.6875rem', fontWeight: 600, background: '#FAF8F5', border: '1px solid #E2E8F0', padding: '0.15rem 0.45rem', borderRadius: '0.35rem', color: '#64748B' }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
                    {res.downloadsCount.toLocaleString()} Reads / Accesses
                  </span>

                  {res.type === 'video' ? (
                    <button
                      type="button"
                      onClick={() => setActiveVideo(res)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.55rem 1rem',
                        fontSize: '0.8125rem',
                        fontWeight: 800,
                        background: '#17191C',
                        color: '#FFFFFF',
                        borderRadius: '0.5rem',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <Play size={13} fill="#F5FF38" stroke="#F5FF38" />
                      <span>Watch Video</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleDownload(res.id, res.title)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.55rem 1rem',
                        fontSize: '0.8125rem',
                        fontWeight: 800,
                        background: '#F5FF38',
                        color: '#17191C',
                        border: '1.5px solid #17191C',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        boxShadow: '2px 2px 0px #17191C'
                      }}
                    >
                      <Download size={13} />
                      <span>Download PDF</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Player Modal */}
        {activeVideo && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(17, 19, 24, 0.75)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
              display: 'grid',
              placeItems: 'center',
              padding: '1.5rem'
            }}
            onClick={() => setActiveVideo(null)}
          >
            <div
              style={{
                background: '#17191C',
                color: '#FFFFFF',
                maxWidth: '800px',
                width: '100%',
                borderRadius: '1.5rem',
                border: '2px solid #F5FF38',
                padding: '1.5rem',
                overflow: 'hidden'
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
                  {activeVideo.title}
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  style={{ background: 'none', border: 'none', color: '#FFFFFF', fontSize: '1.5rem', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', background: '#000000', borderRadius: '0.75rem', overflow: 'hidden' }}>
                <iframe
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  src={activeVideo.videoEmbedUrl}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>
                  Speaker: {activeVideo.author} ({activeVideo.collegeOrCompany})
                </span>
                <span style={{ fontSize: '0.75rem', color: '#F5FF38', fontWeight: 700 }}>
                  DKoder Video Lecture Stream
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
