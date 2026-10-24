import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, ArrowRight, BookOpen, Calendar, FolderGit2, Award, Cpu, FileText } from 'lucide-react'
import AccessibilityMenu from './AccessibilityMenu'
import './Navbar.css'

interface LearnItem {
  to: string
  title: string
  desc: string
  icon: React.ElementType
}

const LEARN_DROPDOWN_ITEMS: LearnItem[] = [
  {
    to: '/learn/courses',
    title: 'Courses',
    desc: 'Skill-based engineering programs with syllabus & certs',
    icon: BookOpen
  },
  {
    to: '/learn/events',
    title: 'Events',
    desc: 'Workshops, live webinars & interactive coding masterclasses',
    icon: Calendar
  },
  {
    to: '/learn/resources',
    title: 'Resources',
    desc: 'Interview guides, video hub & placement cheat sheets',
    icon: FileText
  },
  {
    to: '/final-year-projects',
    title: 'Final Year Projects',
    desc: 'Mentorship, code review & IEEE/Scopus publication assistance',
    icon: FolderGit2
  },
  {
    to: '/certifications/topic',
    title: 'Topic Wise',
    desc: 'Certifications by domain (Cybersecurity, Cloud, Full Stack, AI)',
    icon: Award
  },
  {
    to: '/certifications/technology',
    title: 'Technology Wise',
    desc: 'Certifications by vendor (Oracle Java, AWS, Azure, Cisco)',
    icon: Cpu
  }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  // Track scroll for sticky backdrop
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(false)
  }, [location.pathname])

  // ESC to close drawer or dropdown
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false)
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const isLearnActive = location.pathname.startsWith('/learn') ||
    location.pathname.startsWith('/final-year-projects') ||
    location.pathname.startsWith('/certifications')

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
        <div className="navbar__inner">
          {/* Logo */}
          <Link to="/" className="navbar__logo" aria-label="DKoder Home">
            <span className="navbar__logo-dk">DK</span>
            <span className="navbar__logo-oder">oder</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="navbar__links" aria-label="Main navigation">
            <Link
              to="/"
              className={`navbar__link ${location.pathname === '/' ? 'navbar__link--active' : ''}`}
            >
              Home
            </Link>

            {/* Learn Dropdown */}
            <div className="navbar__dropdown-wrap" ref={dropdownRef}>
              <button
                type="button"
                className={`navbar__dropdown-trigger ${dropdownOpen ? 'open' : ''} ${isLearnActive ? 'navbar__link--active' : ''}`}
                onClick={() => setDropdownOpen(v => !v)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <span>Learn</span>
                <ChevronDown size={14} className="navbar__chevron" />
              </button>

              {dropdownOpen && (
                <div className="navbar__dropdown-menu" role="menu">
                  {LEARN_DROPDOWN_ITEMS.map(item => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="navbar__dropdown-item"
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <div className="navbar__dropdown-title">
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Icon size={15} style={{ color: '#8875FF' }} />
                            {item.title}
                          </span>
                          <ArrowRight size={13} style={{ opacity: 0.5 }} />
                        </div>
                        <span className="navbar__dropdown-desc">{item.desc}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            <Link
              to="/hackathons"
              className={`navbar__link ${location.pathname.startsWith('/hackathons') ? 'navbar__link--active' : ''}`}
            >
              Hackathons
            </Link>

            <Link
              to="/colleges"
              className={`navbar__link ${location.pathname === '/colleges' ? 'navbar__link--active' : ''}`}
            >
              For Colleges
            </Link>

            <Link
              to="/partner-mou"
              className={`navbar__link ${location.pathname === '/partner-mou' ? 'navbar__link--active' : ''}`}
            >
              Apply for MOU
            </Link>

            <Link
              to="/practice"
              className={`navbar__link ${location.pathname.startsWith('/practice') ? 'navbar__link--active' : ''}`}
            >
              Practice
            </Link>

            <Link
              to="/pricing"
              className={`navbar__link ${location.pathname === '/pricing' ? 'navbar__link--active' : ''}`}
            >
              Pricing
            </Link>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="navbar__actions">
            <AccessibilityMenu />
            <Link to="/auth/login" className="navbar__cta-ghost">Sign In</Link>
            <Link to="/student" className="navbar__cta-primary">
              <span>Go to Dashboard</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className={`navbar__burger ${mobileOpen ? 'open' : ''}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(v => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`navbar__drawer ${mobileOpen ? 'open' : ''}`} aria-hidden={!mobileOpen}>
        <div className="navbar__drawer-content">
          <div className="navbar__drawer-header">
            <span className="drawer-title">DKODER NAVIGATION</span>
            <button
              type="button"
              className="drawer-close"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <AccessibilityMenu />
          </div>

          <nav className="navbar__drawer-nav">
            <Link to="/" className="navbar__drawer-link" onClick={() => setMobileOpen(false)}>
              <span>Home</span>
              <ArrowRight size={15} />
            </Link>

            <div style={{ padding: '0.4rem 0' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em' }}>
                LEARN & PROGRAMMES
              </span>
              <div className="navbar__drawer-sub">
                {LEARN_DROPDOWN_ITEMS.map(item => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="navbar__drawer-sub-link"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/hackathons" className="navbar__drawer-link" onClick={() => setMobileOpen(false)}>
              <span>Hackathons</span>
              <ArrowRight size={15} />
            </Link>

            <Link to="/colleges" className="navbar__drawer-link" onClick={() => setMobileOpen(false)}>
              <span>For Colleges</span>
              <ArrowRight size={15} />
            </Link>

            <Link to="/partner-mou" className="navbar__drawer-link" onClick={() => setMobileOpen(false)}>
              <span>Apply for MOU</span>
              <ArrowRight size={15} />
            </Link>

            <Link to="/practice" className="navbar__drawer-link" onClick={() => setMobileOpen(false)}>
              <span>Practice Arena</span>
              <ArrowRight size={15} />
            </Link>

            <Link to="/pricing" className="navbar__drawer-link" onClick={() => setMobileOpen(false)}>
              <span>Pricing Plans</span>
              <ArrowRight size={15} />
            </Link>
          </nav>

          <div className="navbar__drawer-ctas">
            <Link
              to="/auth/login"
              className="navbar__drawer-btn ghost"
              onClick={() => setMobileOpen(false)}
            >
              Student / College Sign In
            </Link>
            <Link
              to="/student"
              className="navbar__drawer-btn primary"
              onClick={() => setMobileOpen(false)}
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
