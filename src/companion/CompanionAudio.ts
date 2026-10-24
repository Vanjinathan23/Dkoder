/**
 * DKODER Robot Audio System — Multilingual & Natural Voice Engine
 * Robust audio pipeline with Chromium GC bug protection, AudioContext unlock,
 * asynchronous voice discovery, and smooth playback synchronization.
 */

export type CompanionLang = 'auto' | 'en' | 'ta' | 'tanglish' | 'hi'

export interface AudioDiagnosticEvent {
  type: 'speech_start' | 'speech_end' | 'speech_error' | 'speech_cancel' | 'unlocked' | 'context_resumed'
  timestamp: number
  details?: Record<string, unknown>
}

class CompanionAudioService {
  private ctx: AudioContext | null = null
  private isMuted: boolean = false
  private isSpeakingActive: boolean = false
  private isUnlocked: boolean = false
  private availableVoices: SpeechSynthesisVoice[] = []
  private keepAliveTimer: any = null
  private diagnosticsListener?: (event: AudioDiagnosticEvent) => void

  constructor() {
    if (typeof window !== 'undefined') {
      // Ensure global retention pool exists to avoid Chrome GC bug (Chromium Issue 339445)
      if (!(window as any).__dkoderUtterances) {
        ;(window as any).__dkoderUtterances = []
      }

      // Initialize voice loading
      this.initVoices()
    }
  }

  public setDiagnosticsListener(listener: (event: AudioDiagnosticEvent) => void) {
    this.diagnosticsListener = listener
  }

  private logDiagnostic(type: AudioDiagnosticEvent['type'], details?: Record<string, unknown>) {
    const event: AudioDiagnosticEvent = { type, timestamp: Date.now(), details }
    if (this.diagnosticsListener) {
      this.diagnosticsListener(event)
    }
    // Also structured dev log
    if ((import.meta as any)?.env?.DEV && type === 'speech_error') {
      console.warn(`[CompanionAudio Diagnostic: ${type}]`, details)
    }
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    const loadVoices = () => {
      try {
        const voices = window.speechSynthesis.getVoices()
        if (voices && voices.length > 0) {
          this.availableVoices = voices
        }
      } catch (err) {
        console.warn('Failed loading voices:', err)
      }
    }

    loadVoices()
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }
  }

  /**
   * Unlock AudioContext and SpeechSynthesis on first user gesture.
   */
  public async unlockAudio(): Promise<boolean> {
    if (typeof window === 'undefined') return false

    let success = false
    try {
      const ctx = this.getContext()
      if (ctx && ctx.state === 'suspended') {
        await ctx.resume()
        this.logDiagnostic('context_resumed', { state: ctx.state })
      }

      if ('speechSynthesis' in window) {
        // Resume synthesis if browser paused it
        window.speechSynthesis.resume()
      }

      this.isUnlocked = true
      this.logDiagnostic('unlocked')
      success = true
    } catch (err) {
      console.warn('Audio unlock warning:', err)
    }
    return success
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {})
    }
    return this.ctx
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted
    if (muted) {
      this.stopSpeaking()
    }
  }

  public getMuted(): boolean {
    return this.isMuted
  }

  public isCurrentlySpeaking(): boolean {
    return this.isSpeakingActive
  }

  /**
   * Play a cute friendly robot wake-up chime (ascending arpeggio)
   */
  public playWakeChime() {
    if (this.isMuted) return
    const ctx = this.getContext()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const freqs = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6

      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(f, now + idx * 0.06)

        gain.gain.setValueAtTime(0.001, now + idx * 0.06)
        gain.gain.exponentialRampToValueAtTime(0.1, now + idx * 0.06 + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.16)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now + idx * 0.06)
        osc.stop(now + idx * 0.06 + 0.18)
      })
    } catch {
      // AudioContext may be suspended or blocked
    }
  }

  /**
   * Play a curious friendly robotic chirp
   */
  public playChirp() {
    if (this.isMuted) return
    const ctx = this.getContext()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(587.33, now) // D5
      osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.09) // D6

      gain.gain.setValueAtTime(0.07, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.13)
    } catch {
      // Ignore audio context error
    }
  }

  /**
   * Play a celebration happy sound
   */
  public playCelebrate() {
    if (this.isMuted) return
    const ctx = this.getContext()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const freqs = [659.25, 783.99, 987.77, 1318.51] // E5, G5, B5, E6
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(f, now + i * 0.05)
        gain.gain.setValueAtTime(0.09, now + i * 0.05)
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.22)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now + i * 0.05)
        osc.stop(now + i * 0.05 + 0.25)
      })
    } catch {
      // Ignore audio context error
    }
  }

  /**
   * Clean text of markdown, URLs, emojis, and special symbols for natural vocalization
   */
  private cleanTextForSpeech(text: string): string {
    return text
      .replace(/[*_#`~[\]()]/g, ' ')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/[\u{1F300}-\u{1FAFF}]|[\u{2600}-\u{27BF}]/gu, '') // Remove emojis that crash or confuse speech engines
      .replace(/₹\s*(\d+)/g, '$1 rupees')
      .replace(/\s+/g, ' ')
      .trim()
  }

  /**
   * Best voice selection with fallback cascade
   */
  private pickVoice(lang: CompanionLang): { voice?: SpeechSynthesisVoice; bcp47: string } {
    let voices = this.availableVoices
    if (!voices || voices.length === 0) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        voices = window.speechSynthesis.getVoices()
        this.availableVoices = voices
      }
    }

    if (lang === 'ta') {
      const voice = voices.find(
        v => v.lang.toLowerCase().startsWith('ta') || v.name.toLowerCase().includes('tamil')
      )
      return { voice, bcp47: 'ta-IN' }
    }

    if (lang === 'hi') {
      const voice = voices.find(
        v => v.lang.toLowerCase().startsWith('hi') || v.name.toLowerCase().includes('hindi')
      )
      return { voice, bcp47: 'hi-IN' }
    }

    if (lang === 'tanglish') {
      // Tanglish is best rendered with Indian English voice for natural pronunciation
      const voice =
        voices.find(v => v.lang.toLowerCase() === 'en-in' || v.name.includes('India')) ||
        voices.find(v => v.lang.toLowerCase().startsWith('en'))
      return { voice, bcp47: 'en-IN' }
    }

    // English / Auto
    const voice =
      voices.find(v => v.lang.toLowerCase() === 'en-in' || v.name.includes('India')) ||
      voices.find(
        v =>
          (v.name.includes('Natural') ||
            v.name.includes('Google') ||
            v.name.includes('Samantha') ||
            v.name.includes('Jenny')) &&
          v.lang.toLowerCase().startsWith('en')
      ) ||
      voices.find(v => v.lang.toLowerCase().startsWith('en'))

    return { voice, bcp47: 'en-IN' }
  }

  /**
   * Speak text using browser SpeechSynthesis with calibrated language-aware voice.
   * Completely immune to Chromium GC bugs, paused synthesizer queues, and overlapping speech.
   */
  public speak(
    text: string,
    lang: CompanionLang = 'auto',
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (error: unknown) => void
  ) {
    if (this.isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onStart) onStart()
      if (onEnd) onEnd()
      return
    }

    // Cancel any previous speech
    this.stopSpeaking()

    const cleanText = this.cleanTextForSpeech(text)
    if (!cleanText) {
      if (onEnd) onEnd()
      return
    }

    try {
      const utterance = new SpeechSynthesisUtterance(cleanText)
      const { voice, bcp47 } = this.pickVoice(lang)

      utterance.lang = bcp47
      if (voice) {
        utterance.voice = voice
      }

      // Warm, natural, pleasant cadence
      utterance.pitch = 1.05
      utterance.rate = 1.0

      // Retain utterance in global pool to prevent Chromium GC bug
      const pool = (window as any).__dkoderUtterances as SpeechSynthesisUtterance[]
      if (pool) {
        pool.push(utterance)
      }

      const cleanup = () => {
        clearInterval(this.keepAliveTimer)
        this.keepAliveTimer = null
        this.isSpeakingActive = false
        if (pool) {
          const idx = pool.indexOf(utterance)
          if (idx !== -1) {
            pool.splice(idx, 1)
          }
        }
      }

      utterance.onstart = () => {
        this.isSpeakingActive = true
        this.logDiagnostic('speech_start', { lang: bcp47, voice: voice?.name, textLength: cleanText.length })
        if (onStart) onStart()

        // Chromium KeepAlive fix: Chrome pauses SpeechSynthesis on long text (~15s)
        clearInterval(this.keepAliveTimer)
        this.keepAliveTimer = setInterval(() => {
          if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
            window.speechSynthesis.pause()
            window.speechSynthesis.resume()
          }
        }, 10000)
      }

      utterance.onend = () => {
        this.logDiagnostic('speech_end')
        cleanup()
        if (onEnd) onEnd()
      }

      utterance.onerror = (e: SpeechSynthesisErrorEvent) => {
        cleanup()
        // 'interrupted' or 'canceled' are normal user-initiated stops
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          this.logDiagnostic('speech_error', { error: e.error })
          if (onError) onError(e.error)
        } else {
          this.logDiagnostic('speech_cancel')
        }
        if (onEnd) onEnd()
      }

      // Chromium fix: ensure speech synthesizer is resumed before speaking
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume()
      }

      window.speechSynthesis.speak(utterance)
    } catch (err) {
      this.isSpeakingActive = false
      this.logDiagnostic('speech_error', { exception: String(err) })
      if (onError) onError(err)
      if (onEnd) onEnd()
    }
  }

  /**
   * Stop any current speech playback immediately (for interruption)
   */
  public stopSpeaking() {
    clearInterval(this.keepAliveTimer)
    this.keepAliveTimer = null
    this.isSpeakingActive = false

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel()
      } catch {
        // Ignore cancellation errors
      }
    }

    if (typeof window !== 'undefined' && (window as any).__dkoderUtterances) {
      ;(window as any).__dkoderUtterances = []
    }
  }
}

export const companionAudio = new CompanionAudioService()
