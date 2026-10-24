import { useEffect } from 'react'
import {
  Compass,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  X,
  Sparkles,
  Check,
} from 'lucide-react'
import { TOUR_STEPS, type TourStep } from './CompanionTour'
import './CompanionTourHUD.css'

interface CompanionTourHUDProps {
  currentStepIndex: number
  isPaused: boolean
  onNext: () => void
  onPrev: () => void
  onTogglePause: () => void
  onExit: () => void
}

export default function CompanionTourHUD({
  currentStepIndex,
  isPaused,
  onNext,
  onPrev,
  onTogglePause,
  onExit,
}: CompanionTourHUDProps) {
  const currentStep: TourStep = TOUR_STEPS[currentStepIndex] || TOUR_STEPS[0]
  const isFirst = currentStepIndex === 0
  const isLast = currentStepIndex === TOUR_STEPS.length - 1
  const progressPercent = ((currentStepIndex + 1) / TOUR_STEPS.length) * 100

  // Keyboard navigation shortcuts: Escape, Space, ArrowRight, ArrowLeft
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return
      }

      if (e.key === 'Escape') {
        e.preventDefault()
        onExit()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        onNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        onPrev()
      } else if (e.code === 'Space') {
        e.preventDefault()
        onTogglePause()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onExit, onNext, onPrev, onTogglePause])

  return (
    <aside
      className="tour-hud-container"
      data-lenis-prevent="true"
      role="region"
      aria-label="Website Tour Controller"
    >
      {/* Top micro progress line */}
      <div className="tour-hud-progress-track">
        <div
          className="tour-hud-progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="tour-hud-content">
        {/* Step Info Badge */}
        <div className="tour-hud-badge-area">
          <div className="tour-hud-pill">
            <Compass size={13} className="tour-hud-icon spin-slow" />
            <span className="tour-hud-step-num">
              {currentStepIndex + 1}/{TOUR_STEPS.length}
            </span>
          </div>
          <div className="tour-hud-title-col">
            <span className="tour-hud-step-title">{currentStep.title}</span>
            <span className="tour-hud-hint">
              {isPaused ? 'Paused · Space to resume' : 'Playing voice explanation'}
            </span>
          </div>
        </div>

        {/* Step Dots Indicators */}
        <div className="tour-hud-dots" aria-hidden="true">
          {TOUR_STEPS.map((step, idx) => (
            <span
              key={step.id}
              className={`tour-dot ${
                idx === currentStepIndex
                  ? 'active'
                  : idx < currentStepIndex
                  ? 'completed'
                  : ''
              }`}
            />
          ))}
        </div>

        {/* Playback & Step Controls */}
        <div className="tour-hud-actions">
          {/* Previous Step */}
          <button
            type="button"
            className="tour-btn"
            onClick={onPrev}
            disabled={isFirst}
            title="Previous Section (Left Arrow)"
            aria-label="Previous tour step"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Pause / Resume */}
          <button
            type="button"
            className={`tour-btn play-pause-btn ${isPaused ? 'is-paused' : ''}`}
            onClick={onTogglePause}
            title={isPaused ? 'Resume Voice Tour (Space)' : 'Pause Tour (Space)'}
            aria-label={isPaused ? 'Resume tour' : 'Pause tour'}
          >
            {isPaused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
          </button>

          {/* Next Step / Complete */}
          <button
            type="button"
            className={`tour-btn next-step-btn ${isLast ? 'last-step' : ''}`}
            onClick={onNext}
            title={isLast ? 'Finish Tour' : 'Next Section (Right Arrow)'}
            aria-label={isLast ? 'Finish tour' : 'Next tour step'}
          >
            {isLast ? <Check size={16} /> : <ChevronRight size={16} />}
          </button>

          <span className="tour-hud-separator" />

          {/* Exit Tour with ESC hotkey indicator */}
          <button
            type="button"
            className="tour-btn exit-tour-btn"
            onClick={onExit}
            title="Exit Tour (Press Esc)"
            aria-label="Exit website tour"
          >
            <X size={15} />
            <kbd className="tour-esc-badge">ESC</kbd>
          </button>
        </div>
      </div>
    </aside>
  )
}
