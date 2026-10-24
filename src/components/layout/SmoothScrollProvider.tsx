import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUp } from 'lucide-react'
import '../../styles/smooth-scroll.css'

gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollContextType {
  lenis: Lenis | null
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number; duration?: number; immediate?: boolean }) => void
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
})

export const useSmoothScroll = () => useContext(SmoothScrollContext)

interface Props {
  children: ReactNode
}

export default function SmoothScrollProvider({ children }: Props) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Initialize Lenis Momentum Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
    })

    setLenisInstance(lenis)

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', (e: { progress: number; scroll: number }) => {
      ScrollTrigger.update()

      // Update top progress bar
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${e.progress})`
      }

      // Show / hide floating back to top button
      if (e.scroll > 500) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    })

    // GSAP Ticker drives Lenis RAF for perfect 120Hz/60Hz frame pacing
    const updateRaf = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateRaf)
    gsap.ticker.lagSmoothing(0)

    // Expose lenis globally for debugging & console access
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

    return () => {
      gsap.ticker.remove(updateRaf)
      lenis.destroy()
      setLenisInstance(null)
    }
  }, [])

  // On route change, reset smooth scroll to top immediately
  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, lenisInstance])

  const scrollTo = (
    target: string | number | HTMLElement,
    options?: { offset?: number; duration?: number; immediate?: boolean }
  ) => {
    if (lenisInstance) {
      lenisInstance.scrollTo(target, options)
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: options?.immediate ? 'auto' : 'smooth' })
    } else if (typeof target === 'string') {
      const el = document.querySelector(target)
      if (el) {
        el.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth' })
      }
    }
  }

  const handleScrollToTop = () => {
    scrollTo(0, { duration: 1.4 })
  }

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance, scrollTo }}>
      {/* Top Precision Scroll Progress Bar */}
      <div ref={progressBarRef} className="scroll-progress-bar" role="progressbar" aria-label="Reading Progress" />

      {children}

      {/* Modern Floating Back to Top Pill */}
      <button
        type="button"
        className={`scroll-to-top-btn ${showScrollTop ? 'is-visible' : ''}`}
        onClick={handleScrollToTop}
        aria-label="Scroll back to top"
      >
        <ArrowUp size={14} />
        <span>Back to Top</span>
      </button>
    </SmoothScrollContext.Provider>
  )
}
