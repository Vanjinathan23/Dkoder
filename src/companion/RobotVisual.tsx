import { AlertTriangle } from 'lucide-react'
import type { RobotState } from './CompanionIntentEngine'
import './RobotVisual.css'

interface RobotVisualProps {
  state: RobotState
  isSpeaking: boolean
  isListening: boolean
  onClick?: () => void
}

export default function RobotVisual({
  state,
  isSpeaking,
  isListening,
  onClick,
}: RobotVisualProps) {
  const isArrived = state === 'arriving' || state === 'pointing'

  return (
    <div
      className={`dkoder-robot-wrapper ${state} ${isSpeaking ? 'is-speaking' : ''} ${isListening ? 'is-listening' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="DKODER AI Robot Companion"
      title="Click to talk with your DKODER Companion"
    >
      {/* Listening Audio Halo */}
      {isListening && (
        <div className="robot-listening-halo" aria-hidden="true">
          <span className="halo-ring ring-1" />
          <span className="halo-ring ring-2" />
          <span className="halo-ring ring-3" />
        </div>
      )}

      {/* Floating Articulated 3D Character Presentation */}
      <div className="robot-3d-stage">
        {/* Contact Ground Shadow */}
        <div className="robot-ground-shadow" />

        {/* 100% Transparent Character Presentation (Single Instance to prevent duplicate ghosting) */}
        <div className="robot-render-wrap">
          <img
            key={isSpeaking ? 'speaking' : 'idle'}
            src={isSpeaking ? '/assets/dkoder-robot-speaking.webp' : '/assets/dkoder-robot-idle.webp'}
            alt={isSpeaking ? 'DKODER AI Robot Speaking' : 'DKODER AI Robot Idle'}
            className="robot-render-character"
            draggable={false}
          />

          {/* Speech Waveform indicator when actively talking */}
          {isSpeaking && (
            <div className="robot-speech-wave" aria-hidden="true">
              <span className="wave-bar bar-1" />
              <span className="wave-bar bar-2" />
              <span className="wave-bar bar-3" />
              <span className="wave-bar bar-4" />
            </div>
          )}

          {/* Thought bubble when thinking */}
          {state === 'thinking' && (
            <div className="robot-thought-bubble" aria-hidden="true">
              <span className="thought-dot dot-1" />
              <span className="thought-dot dot-2" />
              <span className="thought-dot dot-3" />
            </div>
          )}

          {/* Error Notice Indicator */}
          {state === 'error' && (
            <div className="robot-error-bubble" aria-hidden="true">
              <AlertTriangle size={13} color="#EF4444" />
            </div>
          )}
        </div>
      </div>

      {/* Spatial Pointer Callout when in arrived/pointing state */}
      {isArrived && (
        <div className="robot-spatial-callout" aria-hidden="true">
          <span className="callout-beam" />
          <span className="callout-badge">
            <span className="badge-arrow">←</span>
            <span>LOOK HERE</span>
          </span>
        </div>
      )}
    </div>
  )
}
