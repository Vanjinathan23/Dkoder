import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const NAV_LINKS = [
  { href: '/#features',     label: 'Intelligence' },
  { href: '/#practice',     label: 'Question Lab' },
  { href: '/#tracks',       label: 'Tracks'       },
  { href: '/#daily',        label: 'Daily Streak' },
  { href: '/#leaderboard',  label: 'Leaderboard'  },
  { href: '/#colleges',     label: 'For Colleges' },
  { href: '/#pricing',      label: 'Pricing'      },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      <div className="navbar__inner container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" aria-label="DKoder Home">
          <span className="navbar__logo-dk">DK</span>
          <span className="navbar__logo-oder">oder</span>
          <span className="navbar__logo-badge">3D</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__links" aria-label="Main navigation">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className="navbar__link">{l.label}</a>
          ))}
        </nav>

        {/* CTA */}
        <div className="navbar__actions">
          <a href="https://dkoder.co.in/login" className="navbar__cta-ghost">Sign in</a>
          <a href="https://dkoder.co.in/register" className="navbar__cta-primary">
            <span>Get Started</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className={`navbar__burger ${open ? 'open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`navbar__drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        {NAV_LINKS.map(l => (
          <a key={l.href} href={l.href} className="navbar__drawer-link" onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <div className="navbar__drawer-ctas">
          <a href="https://dkoder.co.in/login" className="navbar__cta-ghost">Sign in</a>
          <a href="https://dkoder.co.in/register" className="navbar__cta-primary">Get Started</a>
        </div>
      </div>
    </header>
  )
}
