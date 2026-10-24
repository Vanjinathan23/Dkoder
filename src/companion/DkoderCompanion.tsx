import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles,
  Volume2,
  VolumeX,
  Square,
  X,
  Globe,
  Compass,
  Mic,
  Send,
  CreditCard,
  Terminal,
  Rocket,
  Building2,
  BookOpen,
  ArrowUpRight,
  ChevronRight,
} from 'lucide-react'
import RobotVisual from './RobotVisual'
import { companionAudio, type CompanionLang } from './CompanionAudio'
import { companionEngine, type CompanionMessage, type RobotState } from './CompanionIntentEngine'
import { navManager, type RegisteredDestination } from './CompanionRegistry'
import { TOUR_STEPS, getTourScript } from './CompanionTour'
import CompanionTourHUD from './CompanionTourHUD'
import './DkoderCompanion.css'

export default function DkoderCompanion() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [robotState, setRobotState] = useState<RobotState>('idle')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [activeGuidance, setActiveGuidance] = useState<RegisteredDestination | null>(null)
  const [inputText, setInputText] = useState('')
  const [speechTranscript, setSpeechTranscript] = useState('')
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null)
  const [currentLang, setCurrentLang] = useState<CompanionLang>(() => {
    return (localStorage.getItem('dkoder-companion-lang') as CompanionLang) || 'auto'
  })

  // ── Guided Website Tour State ──────────────────────────────────────────
  const [isTourActive, setIsTourActive] = useState(false)
  const [tourStepIndex, setTourStepIndex] = useState(0)
  const [isTourPaused, setIsTourPaused] = useState(false)
  const tourAdvanceTimerRef = useRef<any>(null)
  const activeSpotlightRef = useRef<HTMLElement | null>(null)

  const [messages, setMessages] = useState<CompanionMessage[]>([
    {
      id: 'init_welcome',
      sender: 'robot',
      text: "Welcome to DKODER. I'm your interactive AI guide. Tell me what you need, and I'll navigate you directly to the right place.",
      timestamp: Date.now(),
      actions: [
        {
          label: 'Show Pricing Plans',
          action: () => handleSendMessage('Show me the pricing plans'),
        },
        {
          label: 'Take me to Practice Lab',
          action: () => handleSendMessage('Where can I practice coding?'),
        },
        {
          label: 'Final Year Projects',
          action: () => handleSendMessage('Where is final year project guidance?'),
        },
      ],
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesScrollRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  // Bind React Router navigate to navManager for smooth SPA page routing
  useEffect(() => {
    navManager.setNavigate(navigate)
  }, [navigate])

  // Scroll messages to bottom on new message
  useEffect(() => {
    if (messagesScrollRef.current) {
      messagesScrollRef.current.scrollTop = messagesScrollRef.current.scrollHeight
    }
  }, [messages])

  // Setup diagnostic listener for voice pipeline
  useEffect(() => {
    companionAudio.setDiagnosticsListener(evt => {
      if (evt.type === 'speech_error') {
        setVoiceNotice('Voice playback encountered an issue. You can continue in text mode or tap replay.')
        setTimeout(() => setVoiceNotice(null), 5000)
      }
    })
  }, [])

  // Setup speech recognition calibrated to the active language
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = true

        if (currentLang === 'ta') {
          recognition.lang = 'ta-IN'
        } else if (currentLang === 'hi') {
          recognition.lang = 'hi-IN'
        } else {
          recognition.lang = 'en-IN'
        }

        recognition.onstart = () => {
          setIsListening(true)
          setRobotState('listening')
          companionAudio.playChirp()
          companionAudio.stopSpeaking()
          setIsSpeaking(false)
        }

        recognition.onresult = (event: any) => {
          const currentTranscript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join('')
          setSpeechTranscript(currentTranscript)

          if (event.results[0].isFinal) {
            setInputText(currentTranscript)
            handleSendMessage(currentTranscript)
            setSpeechTranscript('')
          }
        }

        recognition.onerror = () => {
          setIsListening(false)
          setRobotState('idle')
        }

        recognition.onend = () => {
          setIsListening(false)
          setRobotState('idle')
        }

        recognitionRef.current = recognition
      }
    }
  }, [currentLang])

  // User gesture unlock for audio and speech pipeline
  const ensureAudioUnlocked = () => {
    companionAudio.unlockAudio()
  }

  // ── Interactive Website Tour Engine ────────────────────────────────────
  const clearTourSpotlight = () => {
    if (activeSpotlightRef.current) {
      activeSpotlightRef.current.classList.remove('dkoder-tour-spotlight-active')
      activeSpotlightRef.current = null
    }
    // Also clear query selector fallback
    document.querySelectorAll('.dkoder-tour-spotlight-active').forEach(el => {
      el.classList.remove('dkoder-tour-spotlight-active')
    })
  }

  const exitWebsiteTour = () => {
    clearTimeout(tourAdvanceTimerRef.current)
    companionAudio.stopSpeaking()
    clearTourSpotlight()
    navManager.clearHighlight()
    setIsTourActive(false)
    setIsSpeaking(false)
    setRobotState('idle')
    setActiveGuidance(null)
  }

  const executeTourStep = (stepIndex: number) => {
    clearTimeout(tourAdvanceTimerRef.current)
    clearTourSpotlight()
    companionAudio.stopSpeaking()
    setIsSpeaking(false)

    if (stepIndex < 0 || stepIndex >= TOUR_STEPS.length) {
      exitWebsiteTour()
      return
    }

    setTourStepIndex(stepIndex)
    const step = TOUR_STEPS[stepIndex]
    setRobotState('guiding')

    // If currently on another page, navigate to home first
    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      navigate('/')
      setTimeout(() => executeTourStep(stepIndex), 400)
      return
    }

    navManager.smoothScrollTo(
      step.domSelector,
      () => {
        // Arrived at section!
        setRobotState(step.robotState)
        const targetEl = document.querySelector(step.domSelector) as HTMLElement
        if (targetEl) {
          targetEl.classList.add('dkoder-tour-spotlight-active')
          activeSpotlightRef.current = targetEl
        }

        // Sound effect
        if (step.robotState === 'celebrating') {
          companionAudio.playCelebrate()
        } else {
          companionAudio.playWakeChime()
        }

        // Speak the tailored script
        const script = getTourScript(step, currentLang)
        if (!isMuted) {
          companionAudio.speak(
            script,
            currentLang,
            () => {
              setIsSpeaking(true)
            },
            () => {
              setIsSpeaking(false)
              // If not paused and not last step, auto-advance after 1.8s
              if (stepIndex < TOUR_STEPS.length - 1) {
                tourAdvanceTimerRef.current = setTimeout(() => {
                  executeTourStep(stepIndex + 1)
                }, 1800)
              } else {
                // Tour celebration at end
                setRobotState('celebrating')
                setTimeout(() => {
                  exitWebsiteTour()
                }, 4000)
              }
            },
            () => {
              setIsSpeaking(false)
            }
          )
        }
      },
      () => {
        // User manually scrolled - pause tour
        setIsTourPaused(true)
      }
    )
  }

  const startWebsiteTour = () => {
    ensureAudioUnlocked()
    setIsOpen(false) // Close the chatbox for full-page viewing
    setIsTourActive(true)
    setIsTourPaused(false)
    executeTourStep(0)
  }

  const handleTourNext = () => {
    if (tourStepIndex < TOUR_STEPS.length - 1) {
      executeTourStep(tourStepIndex + 1)
    } else {
      // Completed final step
      setRobotState('celebrating')
      companionAudio.playCelebrate()
      setTimeout(() => exitWebsiteTour(), 3000)
    }
  }

  const handleTourPrev = () => {
    if (tourStepIndex > 0) {
      executeTourStep(tourStepIndex - 1)
    }
  }

  const handleToggleTourPause = () => {
    const nextPaused = !isTourPaused
    setIsTourPaused(nextPaused)
    if (nextPaused) {
      clearTimeout(tourAdvanceTimerRef.current)
      companionAudio.stopSpeaking()
      setIsSpeaking(false)
    } else {
      // Resume speaking current step
      const step = TOUR_STEPS[tourStepIndex]
      const script = getTourScript(step, currentLang)
      if (!isMuted) {
        companionAudio.speak(
          script,
          currentLang,
          () => setIsSpeaking(true),
          () => {
            setIsSpeaking(false)
            if (tourStepIndex < TOUR_STEPS.length - 1) {
              tourAdvanceTimerRef.current = setTimeout(() => {
                executeTourStep(tourStepIndex + 1)
              }, 1800)
            }
          }
        )
      }
    }
  }

  // ── Language Selector ──────────────────────────────────────────────────
  const handleLanguageChange = (newLang: CompanionLang) => {
    ensureAudioUnlocked()
    setCurrentLang(newLang)
    localStorage.setItem('dkoder-companion-lang', newLang)
    companionAudio.playChirp()
    companionAudio.stopSpeaking()
    setIsSpeaking(false)

    let langNotice = ''
    if (newLang === 'ta') {
      langNotice =
        'வணக்கம்! இனி நான் உங்களுடன் தமிழில் உரையாடுவேன். எங்கு செல்ல விரும்புகிறீர்கள் என்று சொல்லுங்கள், நான் அழைத்துச் செல்கிறேன்.'
    } else if (newLang === 'tanglish') {
      langNotice =
        'Vanakkam! Ini Tanglish-la pesalaam. Enna paakanum sollunga, direct-ah guide panren.'
    } else if (newLang === 'hi') {
      langNotice = 'नमस्ते! अब हम हिंदी में बात करेंगे. बताइए आपको किस सेक्शन में जाना है?'
    } else if (newLang === 'en') {
      langNotice =
        'Language set to English. Let me know what you would like to explore, and I will guide you.'
    } else {
      langNotice = 'Auto-detect active. Speak or type in any language you prefer.'
    }

    setMessages(prev => [
      ...prev,
      {
        id: `lang_change_${Date.now()}`,
        sender: 'robot',
        text: langNotice,
        timestamp: Date.now(),
      },
    ])
  }

  const handleToggleOpen = () => {
    ensureAudioUnlocked()
    if (isTourActive) {
      exitWebsiteTour()
    }
    const nextState = !isOpen
    setIsOpen(nextState)
    if (nextState) {
      companionAudio.playWakeChime()
      setRobotState('greeting')
      setTimeout(() => setRobotState('idle'), 1200)
    } else {
      companionAudio.stopSpeaking()
      navManager.clearHighlight()
      setActiveGuidance(null)
      setIsSpeaking(false)
      setRobotState('idle')
    }
  }

  const handleStopSpeaking = () => {
    companionAudio.stopSpeaking()
    setIsSpeaking(false)
    if (robotState === 'speaking' || robotState === 'explaining') {
      setRobotState('idle')
    }
  }

  const handleCancelGuidance = () => {
    navManager.clearHighlight()
    setActiveGuidance(null)
    setRobotState('idle')
    companionAudio.stopSpeaking()
    setIsSpeaking(false)
  }

  const handleReplayVoice = (text: string, lang?: CompanionLang) => {
    ensureAudioUnlocked()
    if (isMuted) {
      setIsMuted(false)
      companionAudio.setMuted(false)
    }
    companionAudio.speak(
      text,
      lang || currentLang,
      () => {
        setIsSpeaking(true)
        setRobotState('speaking')
      },
      () => {
        setIsSpeaking(false)
        setRobotState('idle')
      },
      () => {
        setIsSpeaking(false)
        setRobotState('idle')
      }
    )
  }

  const handleSendMessage = async (textToSend?: string) => {
    ensureAudioUnlocked()
    const query = textToSend || inputText
    if (!query.trim()) return

    // Stop ongoing speech & clear previous highlight
    companionAudio.stopSpeaking()
    setIsSpeaking(false)
    navManager.clearHighlight()
    setActiveGuidance(null)

    const userMsg: CompanionMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: Date.now(),
    }

    setMessages(prev => [...prev, userMsg])
    setInputText('')
    setSpeechTranscript('')
    setRobotState('thinking')

    let guidanceTriggered = false

    try {
      const robotReply = await companionEngine.processInput(
        query,
        state => setRobotState(state),
        currentLang,
        (dest, ack, exp, detectedLang) => {
          guidanceTriggered = true
          setActiveGuidance(dest)
          setRobotState('guiding')

          // Close the chatbox while scrolling the website for an unobstructed view
          setIsOpen(false)

          // Speak acknowledgement first if unmuted
          if (!isMuted) {
            companionAudio.speak(
              ack,
              detectedLang,
              () => setIsSpeaking(true),
              () => setIsSpeaking(false)
            )
          }

          // Execute smooth natural navigation
          navManager.guideTo(
            dest.id,
            arrivedDest => {
              // Arrived at destination
              setRobotState('arriving')
              companionAudio.playWakeChime()

              // Speak the verified explanation once arrived
              if (!isMuted) {
                companionAudio.speak(
                  exp,
                  detectedLang,
                  () => {
                    setIsSpeaking(true)
                    setRobotState('speaking')
                  },
                  () => {
                    setIsSpeaking(false)
                    setRobotState('idle')
                    setActiveGuidance(null)
                  },
                  () => {
                    setIsSpeaking(false)
                    setRobotState('idle')
                    setActiveGuidance(null)
                  }
                )
              } else {
                setTimeout(() => {
                  setRobotState('idle')
                  setActiveGuidance(null)
                }, 2500)
              }
            },
            () => {
              // User manually scrolled - cancel guidance gracefully
              handleCancelGuidance()
            }
          )
        }
      )

      setMessages(prev => [...prev, robotReply])

      // If no navigation was needed, deliver standard voice response
      if (!guidanceTriggered) {
        if (!isMuted) {
          const speakLang = robotReply.detectedLang || currentLang
          companionAudio.speak(
            robotReply.text,
            speakLang,
            () => {
              setIsSpeaking(true)
              setRobotState('speaking')
            },
            () => {
              setIsSpeaking(false)
              setRobotState('idle')
            },
            () => {
              setIsSpeaking(false)
              setRobotState('idle')
            }
          )
        } else {
          setRobotState('idle')
        }
      }
    } catch (err) {
      console.error('Companion processing error:', err)
      setRobotState('error')
      setTimeout(() => setRobotState('idle'), 2000)
      setMessages(prev => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: 'robot',
          text: 'I ran into a brief hiccup, but I am ready. Feel free to ask again or choose one of the suggestions below.',
          timestamp: Date.now(),
        },
      ])
    }
  }

  const handleTriggerQuickAction = (actionText: string) => {
    handleSendMessage(actionText)
  }

  const handleToggleVoiceInput = () => {
    ensureAudioUnlocked()
    if (!recognitionRef.current) {
      alert(
        'Speech Recognition is not supported in this browser. You can type your message in the chat box!'
      )
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      try {
        recognitionRef.current.start()
      } catch (err) {
        console.warn('SpeechRecognition start error:', err)
      }
    }
  }

  const handleToggleMute = () => {
    ensureAudioUnlocked()
    const nextMute = !isMuted
    setIsMuted(nextMute)
    companionAudio.setMuted(nextMute)
    if (nextMute) {
      setIsSpeaking(false)
      if (robotState === 'speaking' || robotState === 'explaining') {
        setRobotState('idle')
      }
    }
  }

  // Helper to render appropriate Lucide icon for action chips
  const renderActionIcon = (label: string) => {
    const l = label.toLowerCase()
    if (l.includes('price') || l.includes('tier') || l.includes('கட்டண')) {
      return <CreditCard size={13} className="chip-icon" />
    }
    if (l.includes('practice') || l.includes('coding') || l.includes('பயிற்சி')) {
      return <Terminal size={13} className="chip-icon" />
    }
    if (l.includes('project') || l.includes('fyp') || l.includes('ப்ராஜெக்ட்')) {
      return <Rocket size={13} className="chip-icon" />
    }
    if (l.includes('mou') || l.includes('college')) {
      return <Building2 size={13} className="chip-icon" />
    }
    if (l.includes('course')) {
      return <BookOpen size={13} className="chip-icon" />
    }
    return <ArrowUpRight size={13} className="chip-icon" />
  }

  return (
    <div
      className={`dkoder-companion-root ${isOpen ? 'drawer-open' : 'drawer-closed'}`}
      onClick={ensureAudioUnlocked}
    >
      {/* ── Active Website Tour Controller HUD (Floating Center) ──── */}
      {isTourActive && (
        <CompanionTourHUD
          currentStepIndex={tourStepIndex}
          isPaused={isTourPaused}
          onNext={handleTourNext}
          onPrev={handleTourPrev}
          onTogglePause={handleToggleTourPause}
          onExit={exitWebsiteTour}
        />
      )}

      {/* ── Persistent Floating Robot Character (Bottom-Right) ── */}
      <div className="companion-character-anchor">
        {/* Floating Callout Popups when closed */}
        {!isOpen && !isTourActive && (
          <div className="companion-bubble-dock">
            {/* Interactive Tour Launch Pill */}
            <button
              type="button"
              className="companion-bubble-hint tour-trigger-bubble"
              onClick={startWebsiteTour}
              title="Start Interactive Guided Tour of DKODER"
              aria-label="Start interactive website tour"
            >
              <Compass size={14} className="bubble-icon spin-slow text-amber-400" />
              <span className="bubble-text">Take Website Tour</span>
            </button>

            {/* Chat Companion Launch Pill */}
            <button
              type="button"
              className="companion-bubble-hint chat-trigger-bubble"
              onClick={handleToggleOpen}
              role="button"
              tabIndex={0}
              aria-label="Open DKODER chat assistant"
            >
              <Sparkles size={13} className="bubble-icon" />
              <span className="bubble-text">Ask Guide</span>
              <span className="bubble-arrow" />
            </button>
          </div>
        )}

        {/* Floating Tour Indicator during active tour */}
        {!isOpen && isTourActive && (
          <div className="companion-bubble-hint tour-active-bubble">
            <Compass size={14} className="bubble-icon spin-slow text-amber-400" />
            <span className="bubble-text">
              Touring: {TOUR_STEPS[tourStepIndex]?.title}
            </span>
            <span className="bubble-arrow" />
          </div>
        )}

        {/* The Animated Robot Visual with living states */}
        <RobotVisual
          state={robotState}
          isSpeaking={isSpeaking}
          isListening={isListening}
          onClick={handleToggleOpen}
        />
      </div>

      {/* ── Interactive Chat Panel Drawer ─────────────────────── */}
      {isOpen && (
        <div
          className="companion-drawer"
          role="dialog"
          aria-label="DKODER AI Companion Chat"
          data-lenis-prevent="true"
        >
          {/* Drawer Header */}
          <div className="drawer-header">
            <div className="drawer-robot-info">
              <div className="drawer-avatar-glow">
                <img
                  src="/assets/dkoder-robot-transparent.png"
                  alt="DKODER Robot"
                  className="drawer-avatar-img"
                  onError={e => {
                    ;(e.target as HTMLElement).style.display = 'none'
                  }}
                />
              </div>
              <div className="drawer-text-info">
                <span className="drawer-title">DKODER AI GUIDE</span>
                <span className="drawer-status">
                  <span className="status-live-dot" />
                  {isListening
                    ? 'LISTENING...'
                    : robotState === 'guiding' || robotState === 'walking'
                    ? 'GUIDING TO SECTION...'
                    : robotState === 'arriving' || robotState === 'pointing'
                    ? 'ARRIVED · EXPLAINING...'
                    : isSpeaking
                    ? 'TALKING...'
                    : robotState === 'thinking'
                    ? 'THINKING...'
                    : isMuted
                    ? 'TEXT MODE'
                    : 'ONLINE · READY'}
                </span>
              </div>
            </div>

            <div className="drawer-controls">
              {/* Stop Speaking Button (active during playback) */}
              {isSpeaking && (
                <button
                  type="button"
                  className="drawer-ctrl-btn stop-speaking-btn"
                  onClick={handleStopSpeaking}
                  title="Stop speaking"
                  aria-label="Stop audio playback"
                >
                  <Square size={12} fill="currentColor" />
                </button>
              )}

              {/* Voice Mute Toggle */}
              <button
                type="button"
                className={`drawer-ctrl-btn ${isMuted ? 'muted' : ''}`}
                onClick={handleToggleMute}
                title={isMuted ? 'Enable Voice' : 'Mute Voice'}
                aria-label="Toggle voice sound"
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>

              {/* Close Drawer Button */}
              <button
                type="button"
                className="drawer-ctrl-btn close-btn"
                onClick={handleToggleOpen}
                title="Minimize Companion"
                aria-label="Close Companion chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Quick Tour Launcher Banner Inside Drawer */}
          <div className="drawer-tour-launcher">
            <button
              type="button"
              className="drawer-tour-cta-btn"
              onClick={startWebsiteTour}
            >
              <Compass size={14} className="cta-icon spin-slow text-amber-400" />
              <span>Take Interactive Website Tour</span>
              <ChevronRight size={14} className="cta-arrow" />
            </button>
          </div>

          {/* ── Multilingual Language Selector Bar ── */}
          <div className="drawer-lang-bar" role="group" aria-label="Language selection">
            <button
              type="button"
              className={`lang-pill ${currentLang === 'auto' ? 'active' : ''}`}
              onClick={() => handleLanguageChange('auto')}
              title="Auto-detect visitor language"
            >
              <Globe size={11} className="lang-icon" />
              <span>Auto</span>
            </button>
            <button
              type="button"
              className={`lang-pill ${currentLang === 'en' ? 'active' : ''}`}
              onClick={() => handleLanguageChange('en')}
            >
              English
            </button>
            <button
              type="button"
              className={`lang-pill ${currentLang === 'ta' ? 'active' : ''}`}
              onClick={() => handleLanguageChange('ta')}
            >
              தமிழ்
            </button>
            <button
              type="button"
              className={`lang-pill ${currentLang === 'tanglish' ? 'active' : ''}`}
              onClick={() => handleLanguageChange('tanglish')}
              title="Tamil in Latin characters"
            >
              Tanglish
            </button>
            <button
              type="button"
              className={`lang-pill ${currentLang === 'hi' ? 'active' : ''}`}
              onClick={() => handleLanguageChange('hi')}
            >
              हिंदी
            </button>
          </div>

          {/* Active Guidance Notification Banner */}
          {activeGuidance && (
            <div className="guidance-banner">
              <Compass size={14} className="guidance-icon spin-slow" />
              <span className="guidance-text">
                Guiding to: <strong>{activeGuidance.label}</strong>
              </span>
              <button type="button" className="guidance-stop-btn" onClick={handleCancelGuidance}>
                <X size={11} />
                <span>Stop</span>
              </button>
            </div>
          )}

          {/* Voice Notice Toast */}
          {voiceNotice && (
            <div className="voice-notice-toast">
              <span>{voiceNotice}</span>
            </div>
          )}

          {/* Messages Scroll Area with data-lenis-prevent and native wheel propagation stop */}
          <div
            ref={messagesScrollRef}
            className="drawer-messages"
            role="log"
            aria-live="polite"
            data-lenis-prevent="true"
            onWheel={e => e.stopPropagation()}
            onTouchMove={e => e.stopPropagation()}
          >
            {messages.map(msg => (
              <div key={msg.id} className={`message-item message-${msg.sender}`}>
                <div className="message-bubble">
                  <p className="message-text">{msg.text}</p>

                  {/* Contextual Quick Actions */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="message-actions">
                      {msg.actions.map((act, i) => (
                        <button
                          key={i}
                          type="button"
                          className="msg-action-chip"
                          onClick={() => {
                            setIsOpen(false)
                            act.action()
                          }}
                        >
                          {renderActionIcon(act.label)}
                          <span>{act.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Replay voice button for robot messages */}
                  {msg.sender === 'robot' && (
                    <div className="msg-meta-row">
                      <button
                        type="button"
                        className="msg-replay-btn"
                        onClick={() => handleReplayVoice(msg.text, msg.detectedLang)}
                        title="Replay this response with voice"
                        aria-label="Replay voice audio"
                      >
                        <Volume2 size={12} />
                        <span>Listen</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Live speech transcription preview */}
          {isListening && speechTranscript && (
            <div className="speech-preview-pill">
              <span className="speech-pulse" />
              <span>"{speechTranscript}"</span>
            </div>
          )}

          {/* Quick Prompt Pill Recommendations in Active Language */}
          <div className="drawer-quick-pills" data-lenis-prevent="true">
            {currentLang === 'ta' ? (
              <>
                <button
                  type="button"
                  className="quick-pill"
                  onClick={() => handleTriggerQuickAction('கட்டண விவரங்களை காட்டுங்கள்')}
                >
                  <CreditCard size={12} className="pill-icon" />
                  <span>கட்டண திட்டம்</span>
                </button>
                <button
                  type="button"
                  className="quick-pill"
                  onClick={() => handleTriggerQuickAction('கோடிங் பயிற்சி எங்கு தொடங்குவது?')}
                >
                  <Terminal size={12} className="pill-icon" />
                  <span>பயிற்சி தளம்</span>
                </button>
                <button
                  type="button"
                  className="quick-pill"
                  onClick={() => handleTriggerQuickAction('ஃபைனல் இயர் ப்ராஜெக்ட் உதவி எங்கே?')}
                >
                  <Rocket size={12} className="pill-icon" />
                  <span>ப்ராஜெக்ட்ஸ்</span>
                </button>
              </>
            ) : currentLang === 'tanglish' ? (
              <>
                <button
                  type="button"
                  className="quick-pill"
                  onClick={() => handleTriggerQuickAction('Pricing plans kaatunga')}
                >
                  <CreditCard size={12} className="pill-icon" />
                  <span>Pricing plans</span>
                </button>
                <button
                  type="button"
                  className="quick-pill"
                  onClick={() => handleTriggerQuickAction('Practice lab enga irukku?')}
                >
                  <Terminal size={12} className="pill-icon" />
                  <span>Practice lab</span>
                </button>
                <button
                  type="button"
                  className="quick-pill"
                  onClick={() => handleTriggerQuickAction('Final year projects enga irukku?')}
                >
                  <Rocket size={12} className="pill-icon" />
                  <span>Final year projects</span>
                </button>
              </>
            ) : currentLang === 'hi' ? (
              <>
                <button
                  type="button"
                  className="quick-pill"
                  onClick={() => handleTriggerQuickAction('फीस और प्लान्स दिखाएँ')}
                >
                  <CreditCard size={12} className="pill-icon" />
                  <span>फीस प्लान्स</span>
                </button>
                <button
                  type="button"
                  className="quick-pill"
                  onClick={() => handleTriggerQuickAction('कोडिंग प्रैक्टिस कहाँ करें?')}
                >
                  <Terminal size={12} className="pill-icon" />
                  <span>कोडिंग लैब</span>
                </button>
                <button
                  type="button"
                  className="quick-pill"
                  onClick={() => handleTriggerQuickAction('फाइनल ईयर प्रोजेक्ट कहाँ है?')}
                >
                  <Rocket size={12} className="pill-icon" />
                  <span>फाइनल ईयर प्रोजेक्ट्स</span>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="quick-pill"
                  onClick={() => handleTriggerQuickAction('What is the price?')}
                >
                  <CreditCard size={12} className="pill-icon" />
                  <span>Pricing Plans</span>
                </button>
                <button
                  type="button"
                  className="quick-pill"
                  onClick={() => handleTriggerQuickAction('Where can I practice coding?')}
                >
                  <Terminal size={12} className="pill-icon" />
                  <span>Practice Lab</span>
                </button>
                <button
                  type="button"
                  className="quick-pill"
                  onClick={() => handleTriggerQuickAction('Where is final year project guidance?')}
                >
                  <Rocket size={12} className="pill-icon" />
                  <span>FYP Guidance</span>
                </button>
                <button
                  type="button"
                  className="quick-pill"
                  onClick={() => handleTriggerQuickAction('Tell me about college MOUs')}
                >
                  <Building2 size={12} className="pill-icon" />
                  <span>College MOU</span>
                </button>
              </>
            )}
          </div>

          {/* Input Bar */}
          <form
            className="drawer-input-bar"
            onSubmit={e => {
              e.preventDefault()
              handleSendMessage()
            }}
          >
            {/* Microphone Voice Input */}
            <button
              type="button"
              className={`mic-btn ${isListening ? 'listening' : ''}`}
              onClick={handleToggleVoiceInput}
              title={isListening ? 'Listening... click to stop' : 'Click to speak'}
              aria-label="Microphone input"
            >
              {isListening ? (
                <Square size={13} fill="#EF4444" color="#EF4444" />
              ) : (
                <Mic size={15} />
              )}
            </button>

            <input
              type="text"
              className="drawer-text-input"
              placeholder={
                currentLang === 'ta'
                  ? 'எங்கு செல்ல வேண்டும் என்று சொல்லுங்கள்...'
                  : currentLang === 'tanglish'
                  ? 'Enga poga venum sollunga...'
                  : currentLang === 'hi'
                  ? 'कहाँ जाना चाहते हैं, बताएं...'
                  : 'Ask or type "take me to pricing"...'
              }
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onFocus={ensureAudioUnlocked}
            />

            <button
              type="submit"
              className="send-btn"
              disabled={!inputText.trim()}
              title="Send Message"
              aria-label="Send message"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
