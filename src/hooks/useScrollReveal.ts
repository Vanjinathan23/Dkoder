import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealOptions {
  scopeRef?: React.RefObject<HTMLElement | null>
  selector?: string
}

/**
 * Custom hook to apply luxury GSAP ScrollTrigger animations across a page or section
 */
export function useScrollReveal({ scopeRef, selector = '[data-scroll-reveal]' }: ScrollRevealOptions = {}) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const container = scopeRef?.current || document

    // 1. Single Element Scroll Reveals
    const revealElements = container.querySelectorAll(selector)
    const triggers: ScrollTrigger[] = []

    revealElements.forEach(el => {
      const isStagger = el.getAttribute('data-scroll-reveal') === 'stagger'
      if (isStagger) {
        // Staggered children reveal
        const children = el.children
        if (children.length > 0) {
          const anim = gsap.fromTo(
            children,
            {
              y: 40,
              opacity: 0,
              filter: 'blur(4px)',
            },
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.85,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          )
          if (anim.scrollTrigger) triggers.push(anim.scrollTrigger)
        }
      } else {
        // Single element reveal
        const anim = gsap.fromTo(
          el,
          {
            y: 35,
            opacity: 0,
            filter: 'blur(4px)',
          },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        )
        if (anim.scrollTrigger) triggers.push(anim.scrollTrigger)
      }
    })

    // 2. Automated Section Headings & Cards Enhancements
    const sectionHeaders = container.querySelectorAll('.section-heading, .section-header, .constellation__header, .lab__header')
    sectionHeaders.forEach(sh => {
      const anim = gsap.fromTo(
        sh,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sh,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger)
    })

    return () => {
      triggers.forEach(t => t.kill())
    }
  }, [scopeRef, selector])
}
