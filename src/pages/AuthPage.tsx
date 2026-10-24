import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { Building2, User, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react'

interface AuthPageProps {
  initialMode?: 'login' | 'signup' | 'institution'
}

export default function AuthPage({ initialMode = 'login' }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'institution'>(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [college, setCollege] = useState('')
  const [role, setRole] = useState<'student' | 'college_admin' | 'hod'>('student')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Extract returnTo if present
  const params = new URLSearchParams(location.search)
  const returnTo = params.get('returnTo') || '/student'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      const userPayload = {
        name: name || (mode === 'institution' ? 'College Placement Officer' : 'Student Candidate'),
        email,
        role: mode === 'institution' ? role : 'student',
        college: college || 'PSG College of Technology',
        token: 'dkoder_jwt_session_' + Math.random().toString(36).substring(2)
      }

      try {
        localStorage.setItem('user', JSON.stringify(userPayload))
        localStorage.setItem('token', userPayload.token)
      } catch (err) {
        console.error(err)
      }

      navigate(returnTo)
    }, 500)
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '85vh', background: '#FAF8F5', paddingTop: '100px', paddingBottom: '4rem', display: 'grid', placeItems: 'center' }}>
        <div style={{ maxWidth: '480px', width: '90%', margin: '0 auto' }}>
          {/* Header Card */}
          <div
            style={{
              background: '#FFFFFF',
              border: '2px solid #17191C',
              borderRadius: '1.5rem',
              boxShadow: '8px 8px 0px #17191C',
              padding: '2.5rem 2rem'
            }}
          >
            {/* Mode Switcher Tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem', background: '#F1F5F9', padding: '0.35rem', borderRadius: '0.75rem', marginBottom: '2rem' }}>
              <button
                type="button"
                onClick={() => setMode('login')}
                style={{
                  padding: '0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  border: 'none',
                  borderRadius: '0.5rem',
                  background: mode === 'login' ? '#FFFFFF' : 'transparent',
                  color: '#17191C',
                  cursor: 'pointer',
                  boxShadow: mode === 'login' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                style={{
                  padding: '0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  border: 'none',
                  borderRadius: '0.5rem',
                  background: mode === 'signup' ? '#FFFFFF' : 'transparent',
                  color: '#17191C',
                  cursor: 'pointer',
                  boxShadow: mode === 'signup' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => setMode('institution')}
                style={{
                  padding: '0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  border: 'none',
                  borderRadius: '0.5rem',
                  background: mode === 'institution' ? '#F5FF38' : 'transparent',
                  color: '#17191C',
                  cursor: 'pointer',
                  boxShadow: mode === 'institution' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                College
              </button>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#17191C', margin: '0 0 0.35rem' }}>
                {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Student Account' : 'Institution Sign-In'}
              </h2>
              <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: 0 }}>
                {mode === 'institution'
                  ? 'Authorized portal for Principals, HODs, and Placement Cells'
                  : 'Access company question banks, live coding lab & leaderboard'}
              </p>
            </div>

            {/* Google OAuth Simulation */}
            {mode !== 'institution' && (
              <button
                type="button"
                onClick={() => {
                  setEmail('student@gmail.com')
                  setName('Rahul Sharma')
                  handleSubmit(new Event('submit') as unknown as React.FormEvent)
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  background: '#FFFFFF',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '0.625rem',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: '#17191C',
                  cursor: 'pointer',
                  marginBottom: '1.5rem',
                  transition: 'background 0.15s ease'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
            )}

            {mode !== 'institution' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
                <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#94A3B8' }}>OR WITH EMAIL</span>
                <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {mode === 'signup' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Sharma"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none' }}
                  />
                </div>
              )}

              {mode === 'institution' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                    Institutional Role
                  </label>
                  <select
                    value={role}
                    onChange={e => setRole(e.target.value as 'student' | 'college_admin' | 'hod')}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none', background: '#FFFFFF' }}
                  >
                    <option value="college_admin">College Principal / Director</option>
                    <option value="hod">Department HOD (Head of Department)</option>
                    <option value="student">Placement Officer / Faculty Lead</option>
                  </select>
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem', color: '#17191C' }}>
                  {mode === 'institution' ? 'Official College Email' : 'Email Address'}
                </label>
                <input
                  type="email"
                  required
                  placeholder={mode === 'institution' ? 'placement@college.edu.in' : 'student@gmail.com'}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#17191C' }}>
                    Password
                  </label>
                  {mode === 'login' && (
                    <span style={{ fontSize: '0.75rem', color: '#8875FF', fontWeight: 700, cursor: 'pointer' }}>
                      Forgot password?
                    </span>
                  )}
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', border: '1.5px solid #CBD5E1', outline: 'none' }}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  marginTop: '0.5rem',
                  padding: '0.85rem',
                  fontSize: '0.9375rem',
                  fontWeight: 800,
                  background: '#F5FF38',
                  color: '#17191C',
                  border: '1.5px solid #17191C',
                  borderRadius: '0.625rem',
                  boxShadow: '3px 3px 0px #17191C',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <span>{isLoading ? 'Authenticating...' : mode === 'login' ? 'Sign In to DKoder' : mode === 'signup' ? 'Create Student Account' : 'Institution Access'}</span>
                <ArrowRight size={15} />
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
