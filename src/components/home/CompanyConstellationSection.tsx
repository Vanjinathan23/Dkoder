import React, { useState, useMemo, useCallback } from 'react'
import CompanyConstellation3D, { CONSTELLATION_COMPANIES, ConstellationCompany } from '../3d/CompanyConstellation3D'
import { Target, CheckCircle2, ArrowRight, TrendingUp, Layers, Sparkles, Building2 } from 'lucide-react'
import './CompanyConstellationSection.css'

export default function CompanyConstellationSection() {
  const [selectedTier, setSelectedTier] = useState<'all' | 'super-dream' | 'cloud' | 'service'>('all')
  const [activeCompany, setActiveCompany] = useState<ConstellationCompany>(CONSTELLATION_COMPANIES[0])

  // Filtered companies based on active tier
  const filteredCompanies = useMemo(() => {
    if (selectedTier === 'all') return CONSTELLATION_COMPANIES
    return CONSTELLATION_COMPANIES.filter(c => c.tier === selectedTier)
  }, [selectedTier])

  // Guard activeCompany with guaranteed fallback
  const currentCompany = useMemo(() => {
    if (activeCompany && activeCompany.id) return activeCompany
    return CONSTELLATION_COMPANIES.find(c => c.id === 'google') || CONSTELLATION_COMPANIES[0]
  }, [activeCompany])

  // Handle tier button click
  const handleTierSelect = useCallback((tier: 'all' | 'super-dream' | 'cloud' | 'service') => {
    setSelectedTier(tier)
    // Automatically select the first company in that tier
    const firstInTier = tier === 'all'
      ? CONSTELLATION_COMPANIES[0]
      : CONSTELLATION_COMPANIES.find(c => c.tier === tier) || CONSTELLATION_COMPANIES[0]
    setActiveCompany(firstInTier)
  }, [])

  // Handle company selection with validation
  const handleSelectCompany = useCallback((company: ConstellationCompany) => {
    if (company && company.id) {
      setActiveCompany(company)
    }
  }, [])

  // Calculate multiplier against national campus average (₹4.2 LPA)
  const salaryMultiplier = ((currentCompany.packageLPA || 45) / 4.2).toFixed(1)
  const salaryPercent = Math.min(100, Math.round(((currentCompany.packageLPA || 45) / 50) * 100))

  return (
    <section className="constellation" id="constellation" aria-labelledby="constellation-heading">
      <div className="container">

        {/* Section Header */}
        <div className="constellation__header">
          <div className="section-badge">
            <span className="section-badge__dot" />
            <span>3D Placement Metropolis</span>
          </div>

          <h2 id="constellation-heading" className="constellation__heading">
            3D Recruiter Tech City
          </h2>

          <p className="constellation__sub">
            Explore a realistic 3D corporate campus where each skyscraper represents a verified recruiter scaled to its salary elevation.
            Orbit the city 360°, inspect individual corporate headquarters, and unlock their recruitment blueprints.
          </p>

          {/* Tier Filter Buttons */}
          <div className="constellation__filters" role="tablist" aria-label="Salary Tier Filter">
            <button
              type="button"
              role="tab"
              aria-selected={selectedTier === 'all'}
              className={`constellation__filter-btn ${selectedTier === 'all' ? 'active' : ''}`}
              onClick={() => handleTierSelect('all')}
            >
              <span>All Recruiters ({CONSTELLATION_COMPANIES.length})</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={selectedTier === 'super-dream'}
              className={`constellation__filter-btn ${selectedTier === 'super-dream' ? 'active' : ''}`}
              onClick={() => handleTierSelect('super-dream')}
            >
              <span>Super-Dream · 20–50 LPA</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={selectedTier === 'cloud'}
              className={`constellation__filter-btn ${selectedTier === 'cloud' ? 'active' : ''}`}
              onClick={() => handleTierSelect('cloud')}
            >
              <span>Enterprise Cloud · 10–20 LPA</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={selectedTier === 'service'}
              className={`constellation__filter-btn ${selectedTier === 'service' ? 'active' : ''}`}
              onClick={() => handleTierSelect('service')}
            >
              <span>Service MNCs · 3–11 LPA</span>
            </button>
          </div>
        </div>

        {/* Stage Layout */}
        <div className="constellation__stage">

          {/* Left: 3D Recruiter Tech City */}
          <div className="constellation__canvas-wrap">
            <CompanyConstellation3D
              selectedTier={selectedTier}
              activeCompanyId={currentCompany.id}
              onSelectCompany={handleSelectCompany}
            />

            {/* Quick-Click Company Selector Strip at bottom */}
            <div className="radar-company-strip">
              <span className="strip-label">Select HQ:</span>
              <div className="strip-pills-list">
                {filteredCompanies.map(c => {
                  const isCurrent = c.id === currentCompany.id
                  return (
                    <button
                      key={c.id}
                      type="button"
                      className={`radar-strip-btn ${isCurrent ? 'is-active' : ''}`}
                      onClick={() => handleSelectCompany(c)}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: c.color,
                          display: 'inline-block',
                          marginRight: 6,
                          flexShrink: 0,
                        }}
                      />
                      <span>{c.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right: Active Company Dossier Panel */}
          <aside className="constellation__dossier" aria-label="Company Assessment Dossier">
            <div>
              <div className="dossier__header">
                <div className="dossier__title-wrap">
                  <span className="dossier__badge">{currentCompany.hiringType}</span>
                  <h3 className="dossier__company-name">{currentCompany.name}</h3>
                </div>
                <div className="dossier__pkg-tag">
                  {currentCompany.packageRange}
                </div>
              </div>

              {/* Salary Elevation Meter vs National Average */}
              <div className="dossier__elevation-bar-wrap">
                <div className="dossier__elevation-head">
                  <span className="dossier__elevation-label">
                    <TrendingUp size={12} />
                    <span>Salary Elevation Index</span>
                  </span>
                  <span className="dossier__elevation-multiplier">
                    {salaryMultiplier}x National Avg
                  </span>
                </div>
                <div className="dossier__elevation-track">
                  <div
                    className="dossier__elevation-fill"
                    style={{
                      width: `${salaryPercent}%`,
                      background: currentCompany.tier === 'super-dream' ? '#F5FF38' : currentCompany.tier === 'cloud' ? '#8875FF' : '#22C55E'
                    }}
                  />
                </div>
              </div>

              {/* Real-World HQ Architectural Landmark */}
              <div className="dossier__landmark-box">
                <div className="dossier__landmark-head">
                  <Building2 size={12} className="dossier__landmark-icon" />
                  <span className="dossier__landmark-title">Real-World HQ Architecture</span>
                </div>
                <div className="dossier__landmark-name">{currentCompany.landmarkHQ}</div>
                <p className="dossier__landmark-desc">{currentCompany.architectureStory}</p>
              </div>

              {/* Assessment Track */}
              <div className="dossier__field">
                <span className="dossier__label">Primary Assessment Track</span>
                <span className="dossier__val highlight">{currentCompany.examTrack}</span>
              </div>

              {/* Core Weightage Topics */}
              <div className="dossier__field">
                <span className="dossier__label">High-Yield Topic Weightage</span>
                <span className="dossier__val">{currentCompany.primaryTopic}</span>
              </div>

              {/* Metrics Grid */}
              <div className="dossier__metrics">
                <div className="dossier__metric-box">
                  <span className="metric-num">{currentCompany.questionsCount}+</span>
                  <span className="metric-label">Curated Questions</span>
                </div>
                <div className="dossier__metric-box">
                  <span className="metric-num">98.4%</span>
                  <span className="metric-label">OA Pattern Match</span>
                </div>
                <div className="dossier__metric-box">
                  <span className="metric-num">&lt; 25m</span>
                  <span className="metric-label">Target Benchmark</span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="dossier__cta-wrap">
              <a
                href={`https://dkoder.co.in/practice?company=${encodeURIComponent(currentCompany.name)}`}
                className="dossier__btn-primary"
              >
                <span>Launch {currentCompany.name} Practice Track</span>
                <ArrowRight size={16} />
              </a>
              <span className="dossier__help-text">
                Includes verified test cases, memory limits & Big-O analyzer.
              </span>
            </div>
          </aside>

        </div>

      </div>
    </section>
  )
}
