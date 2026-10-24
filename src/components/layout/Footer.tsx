import React from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, Mail, ShieldCheck, CheckCircle2 } from 'lucide-react'
import './Footer.css'

const FOOTER_GROUPS = [
  {
    title: 'For Students',
    links: [
      { label: 'MCQ & Coding Practice', to: '/practice' },
      { label: 'Live Coding Lab', to: '/practice/coding' },
      { label: 'Platform Arena (TCS / Infy)', to: '/practice/platforms' },
      { label: 'Sprint Challenges', to: '/challenges' },
      { label: 'National XP Leaderboard', to: '/leaderboard' },
      { label: 'Engineering Courses', to: '/learn/courses' },
      { label: 'Live Events & Workshops', to: '/learn/events' },
      { label: 'Resource Hub & Videos', to: '/learn/resources' },
      { label: 'Verify a Certificate', to: '/learn/certificates/verify' },
      { label: 'Pricing & Plans', to: '/pricing' }
    ]
  },
  {
    title: 'For Institutions',
    links: [
      { label: 'Dkoder for Colleges', to: '/colleges' },
      { label: 'Apply for Campus MOU', to: '/partner-mou' },
      { label: 'Host a Hackathon on Campus', to: '/hackathons/100-days' },
      { label: 'Benefits for Institutions', to: '/hackathons/100-days/benefits' },
      { label: 'Institutional Sign-In', to: '/auth/institution' }
    ]
  },
  {
    title: 'Programmes',
    links: [
      { label: 'All Hackathons', to: '/hackathons' },
      { label: '100 Days of Sustainability', to: '/hackathons/100-days' },
      { label: 'Final Year Projects Mentorship', to: '/final-year-projects' },
      { label: 'Topic-Wise Certifications', to: '/certifications/topic' },
      { label: 'Technology Certifications', to: '/certifications/technology' }
    ]
  },
  {
    title: 'Help & Support',
    links: [
      { label: 'Sign In to Account', to: '/auth/login' },
      { label: 'Create Student Account', to: '/auth/signup' },
      { label: 'WhatsApp Live Support', href: 'https://wa.me/919944648710?text=Hi%20Dkoder%20team%2C%20I%20have%20a%20question.' },
      { label: 'Contact Support via Email', href: 'mailto:support@dkoder.co.in' }
    ]
  }
]

const ACCREDITATIONS = [
  { name: 'MSME', sub: 'Govt. of India', code: 'Registered' },
  { name: 'DPIIT Startup India', sub: 'Department for Promotion', code: 'Recognized' },
  { name: 'ISO 9001:2015', sub: 'Quality Management', code: 'Certified' },
  { name: 'MCA', sub: 'Ministry of Corporate Affairs', code: 'CIN Active' },
  { name: 'AICTE', sub: 'Internship Portal', code: 'Empaneled' },
  { name: 'NCS', sub: 'National Career Service', code: 'Authorized' },
  { name: 'NAPS', sub: 'Apprenticeship Scheme', code: 'Partner' },
  { name: 'Skill India', sub: 'Skill Mission', code: 'Aligned' },
]

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        {/* Top Link Columns */}
        <div className="footer__top">
          {/* Brand Col */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-dk">DK</span>
              <span className="footer__logo-oder">oder</span>
            </Link>
            <p className="footer__tagline">
              The Placement LMS for Engineering Colleges Across India. 12,500+ verified company questions,
              in-browser code execution, salary band filters, and board-defensible examination integrity.
            </p>
            <div className="footer__direct-contact">
              <a
                href="https://wa.me/919944648710?text=Hi%20Dkoder%20team%2C%20I%20have%20a%20question."
                target="_blank"
                rel="noopener noreferrer"
                className="footer__contact-link"
              >
                <MessageCircle size={15} style={{ color: '#25D366' }} />
                <span>Chat on WhatsApp: +91 99446 48710</span>
              </a>
              <a href="mailto:support@dkoder.co.in" className="footer__contact-link">
                <Mail size={15} style={{ color: '#F5FF38' }} />
                <span>support@dkoder.co.in</span>
              </a>
            </div>
          </div>

          {/* 4 Link Groups */}
          {FOOTER_GROUPS.map(group => (
            <div key={group.title} className="footer__col">
              <h4 className="footer__col-heading">{group.title}</h4>
              <ul className="footer__col-list">
                {group.links.map(link => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link to={link.to} className="footer__col-link">{link.label}</Link>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer__col-link"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Accreditations & Recognitions */}
        <div className="footer__accreditations">
          <div className="footer__acc-title">Government & Industry Recognitions</div>
          <div className="footer__acc-grid">
            {ACCREDITATIONS.map(acc => (
              <div key={acc.name} className="footer__acc-badge">
                <CheckCircle2 size={16} style={{ color: '#F5FF38' }} />
                <span className="footer__acc-name">{acc.name}</span>
                <span className="footer__acc-sub">{acc.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__copy">© 2026 DKoder (CIN Registered). All rights reserved.</p>
          <p className="footer__made">
            Built with <span style={{ color: '#F5FF38' }}>⚡</span> for ambitious engineering students across India.
          </p>
        </div>
      </div>
    </footer>
  )
}
