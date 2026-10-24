import React, { useState, useEffect } from 'react'
import { Languages, Eye, Sun, Moon, Volume2, X } from 'lucide-react'
import './AccessibilityMenu.css'

interface AccessibilityState {
  theme: 'light' | 'dark'
  lang: string
  textSize: 'small' | 'normal' | 'large' | 'xlarge'
  readingSpeed: 'slow' | 'normal' | 'fast'
  highContrast: boolean
  dyslexicFont: boolean
}

const DEFAULT_STATE: AccessibilityState = {
  theme: 'light',
  lang: 'en',
  textSize: 'normal',
  readingSpeed: 'normal',
  highContrast: false,
  dyslexicFont: false,
}

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'ml', label: 'മലയാളം' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'mr', label: 'मराठी' },
]

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false)
  const [config, setConfig] = useState<AccessibilityState>(() => {
    try {
      const saved = localStorage.getItem('lms-accessibility-storage')
      return saved ? JSON.parse(saved) : DEFAULT_STATE
    } catch {
      return DEFAULT_STATE
    }
  })

  // Apply state to DOM
  useEffect(() => {
    try {
      localStorage.setItem('lms-accessibility-storage', JSON.stringify(config))
      localStorage.setItem('dkoder-theme', config.theme)
      document.documentElement.setAttribute('data-theme', config.theme)

      const root = document.documentElement
      if (config.textSize === 'small') root.style.fontSize = '14px'
      else if (config.textSize === 'normal') root.style.fontSize = '16px'
      else if (config.textSize === 'large') root.style.fontSize = '18px'
      else if (config.textSize === 'xlarge') root.style.fontSize = '20px'

      if (config.highContrast) {
        document.body.classList.add('high-contrast')
      } else {
        document.body.classList.remove('high-contrast')
      }
    } catch (e) {
      console.error(e)
    }
  }, [config])

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  const toggleTheme = () => {
    setConfig(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }))
  }

  return (
    <>
      <button
        type="button"
        className="a11y-trigger"
        onClick={() => setOpen(true)}
        aria-label="Open accessibility options"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <Eye size={15} />
        <span>Accessibility</span>
        <span className="a11y-badge">{config.lang.toUpperCase()}</span>
      </button>

      {open && (
        <div
          className="a11y-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Accessibility Settings"
          onClick={() => setOpen(false)}
        >
          <div className="a11y-panel" onClick={e => e.stopPropagation()}>
            <div className="a11y-head">
              <div className="a11y-head-info">
                <div className="a11y-head-icon" aria-hidden="true">
                  <Eye size={18} />
                </div>
                <div>
                  <h3 className="a11y-title">Accessibility Options</h3>
                  <p className="a11y-subtitle">Saved on this device across DKODER</p>
                </div>
              </div>
              <button
                type="button"
                className="a11y-close"
                onClick={() => setOpen(false)}
                aria-label="Close accessibility modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="a11y-body">
              {/* Theme Toggle */}
              <div className="a11y-group">
                <span className="a11y-label">Display Theme</span>
                <div className="a11y-row">
                  <div className="a11y-row-text">
                    <span className="a11y-row-title">
                      {config.theme === 'light' ? 'Bright / Light Mode' : 'Cinematic Dark Mode'}
                    </span>
                    <span className="a11y-row-desc">Optimized for high contrast and read balance</span>
                  </div>
                  <button
                    type="button"
                    className="a11y-switch"
                    role="switch"
                    aria-checked={config.theme === 'dark'}
                    aria-label="Toggle dark mode"
                    onClick={toggleTheme}
                  >
                    <span className="a11y-switch-thumb" />
                  </button>
                </div>
              </div>

              {/* Text Sizing */}
              <div className="a11y-group">
                <span className="a11y-label">Text Sizing</span>
                <div className="a11y-segmented" role="radiogroup" aria-label="Text size">
                  {(['small', 'normal', 'large', 'xlarge'] as const).map(size => (
                    <button
                      key={size}
                      type="button"
                      className={`a11y-seg-btn ${config.textSize === size ? 'active' : ''}`}
                      onClick={() => setConfig(prev => ({ ...prev, textSize: size }))}
                    >
                      {size === 'small' ? '80%' : size === 'normal' ? '100%' : size === 'large' ? '120%' : '140%'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Selection */}
              <div className="a11y-group">
                <span className="a11y-label">Interface & Audio Language</span>
                <div className="a11y-lang-grid" role="radiogroup" aria-label="Preferred language">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      type="button"
                      className={`a11y-lang-btn ${config.lang === lang.code ? 'active' : ''}`}
                      onClick={() => setConfig(prev => ({ ...prev, lang: lang.code }))}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Speech / Reader Speed */}
              <div className="a11y-group">
                <span className="a11y-label">Screen Reader & Audio Speed</span>
                <div className="a11y-segmented" role="radiogroup" aria-label="Audio speed">
                  {(['slow', 'normal', 'fast'] as const).map(spd => (
                    <button
                      key={spd}
                      type="button"
                      className={`a11y-seg-btn ${config.readingSpeed === spd ? 'active' : ''}`}
                      onClick={() => setConfig(prev => ({ ...prev, readingSpeed: spd }))}
                    >
                      {spd.charAt(0).toUpperCase() + spd.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="a11y-foot">
              <button
                type="button"
                className="a11y-reset"
                onClick={() => setConfig(DEFAULT_STATE)}
              >
                Reset Defaults
              </button>
              <button
                type="button"
                className="a11y-save-btn"
                onClick={() => setOpen(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
