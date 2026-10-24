/**
 * DKODER Website Section & Destination Registry
 * Maps real DOM elements and routes for the AI Companion Living Guide.
 * 100% verified against the authentic DKODER application.
 */

export interface RegisteredDestination {
  id: string
  label: string
  type: 'section' | 'route'
  domSelector?: string
  routePath: string
  description: string
  verifiedExplanation: string
  suggestedActionLabel: string
  keywords: string[]
}

export const DESTINATION_REGISTRY: RegisteredDestination[] = [
  {
    id: 'pricing',
    label: 'Transparent 5-Tier Pricing Plans',
    type: 'section',
    domSelector: '#pricing',
    routePath: '/pricing',
    description: 'Bronze ₹699, Silver ₹999, Gold ₹1,599, Platinum ₹1,999, Super Dream ₹2,999 with 1-4 year locked degree passes.',
    verifiedExplanation: 'Here are our 5 official transparent pricing tiers! Bronze (₹699/yr) covers service-based patterns, Silver (₹999/yr) adds analytics, Gold (₹1,599/yr) unlocks product drills, Platinum (₹1,999/yr) is our most popular 0-15 LPA pack, and Super Dream (₹2,999/yr) includes 1-on-1 mentorship. You can choose 1 to 4 years to lock in your degree rate with zero mid-term price hikes.',
    suggestedActionLabel: 'Compare All 5 Tiers',
    keywords: ['price', 'pricing', 'plans', 'cost', 'fees', 'subscription', 'platinum', 'gold', 'super dream', 'bronze', 'silver', 'how much', 'evvalavu', 'kitna']
  },
  {
    id: 'practice',
    label: 'Interactive Question Discovery Lab',
    type: 'section',
    domSelector: '#practice',
    routePath: '/practice',
    description: '12,500+ verified coding questions from 500+ top recruiters with in-browser compiler.',
    verifiedExplanation: 'Welcome to our Question Lab! You can practice real questions from TCS NQT, Infosys, Zoho, Google, and Amazon. Run testcases live in Python, C++, Java, or TypeScript with zero local setup.',
    suggestedActionLabel: 'Open Practice Arena',
    keywords: ['practice', 'coding', 'questions', 'compiler', 'ide', 'problems', 'dsa', 'zoho coding', 'tcs nqt', 'run code']
  },
  {
    id: 'guidance',
    label: 'Interview Tomorrow Worry Solver',
    type: 'section',
    domSelector: '#guidance',
    routePath: '/#guidance',
    description: '12 interactive psychological reassurance formulas for pre-interview anxiety.',
    verifiedExplanation: 'Here is our Interview Worry Solver! If you have an interview tomorrow, tap any dilemma below—like "Where do I even begin?" or "Will they ask me to code?"—to see the exact tactical formula to stay calm and prepared.',
    suggestedActionLabel: 'Explore Worry Solutions',
    keywords: ['worry', 'interview tomorrow', 'anxious', 'guidance', 'where to begin', 'fear', 'nervous', 'scared', 'tips']
  },
  {
    id: 'queries',
    label: 'Interactive Placement Guidance',
    type: 'section',
    domSelector: '#queries',
    routePath: '/#queries',
    description: 'Real student roadmaps for ₹10 LPA offers, Zoho, game dev, and ethical hacking.',
    verifiedExplanation: 'This is the Placement Guidance dialogue! It breaks down step-by-step roadmaps for specific student goals, whether your dream is a ₹10 LPA package, cracking Zoho rounds, game engineering, or ethical hacking.',
    suggestedActionLabel: 'View Guidance Roadmaps',
    keywords: ['queries', '10 lpa', 'dream package', 'zoho roadmap', 'game dev', 'ethical hacking', 'no target', 'roadmap']
  },
  {
    id: 'career-tracks',
    label: 'Career Pathways & Salary Bands',
    type: 'section',
    domSelector: '#career-tracks',
    routePath: '/#career-tracks',
    description: 'Structured engineering tracks categorized from 0-3 LPA up to 15+ LPA.',
    verifiedExplanation: 'These are our 5 Career Tracks! They organize core CS and algorithmic milestones into salary tiers from Service MNCs (0–3 LPA) up to Super-Dream Global Tech (15+ LPA).',
    suggestedActionLabel: 'Inspect Career Tracks',
    keywords: ['tracks', 'career tracks', 'pathways', 'salary', 'lpa', 'levels', 'service', 'product', 'milestones']
  },
  {
    id: 'colleges',
    label: 'Institutional Placement Assistant for Colleges',
    type: 'section',
    domSelector: '#colleges',
    routePath: '/colleges',
    description: 'Virtual placement assistant for Principals, HODs, and TPOs with NBA/NIRF compliance.',
    verifiedExplanation: 'Here is our institutional hub for engineering colleges! Over 150 campuses use DKODER as their Virtual Placement Assistant for student risk detection, cohort analytics, and NBA/NIRF placement compliance.',
    suggestedActionLabel: 'For Colleges Overview',
    keywords: ['college', 'colleges', 'campus', 'institution', 'university', 'tpo', 'hod', 'principal', 'virtual placement assistant']
  },
  {
    id: 'partner_mou',
    label: 'Institutional MOU Application Form',
    type: 'route',
    routePath: '/partner-mou',
    description: 'Multi-step college partnership application across all 36 Indian states & UTs.',
    verifiedExplanation: 'This is our Institutional MOU portal. Engineering colleges and universities can submit their institutional accreditation details here to partner with DKODER across all 36 Indian states and union territories.',
    suggestedActionLabel: 'Apply for College MOU',
    keywords: ['mou', 'partner mou', 'college mou', 'sign mou', 'institutional partnership', 'apply mou']
  },
  {
    id: 'courses',
    label: 'Skill-Based Engineering Courses',
    type: 'route',
    routePath: '/learn/courses',
    description: 'Structured curricula in Full Stack, AI/ML, Cloud Infrastructure, and DSA.',
    verifiedExplanation: 'Welcome to our Course Catalog! We offer skill-based programs with live syllabi, capstone development projects, mentor reviews, and digital verifiable credentials.',
    suggestedActionLabel: 'Browse All Courses',
    keywords: ['courses', 'learn courses', 'classes', 'syllabus', 'full stack course', 'ai course', 'cloud course']
  },
  {
    id: 'final_year_projects',
    label: 'Final Year Projects Guidance',
    type: 'route',
    routePath: '/final-year-projects',
    description: 'Mentorship, code review, research publication, and team code joining.',
    verifiedExplanation: 'Here is our Final Year Projects guidance hub! You can join an existing student group using a 6-character team invite code or apply for technical domain mentorship in Web, Mobile, AI, Cloud, or IoT.',
    suggestedActionLabel: 'Explore FYP Guidance',
    keywords: ['final year projects', 'fyp', 'project ideas', 'team code', 'join team', 'mentorship', 'ieee']
  },
  {
    id: 'hackathons',
    label: 'Hackathons & 100 Days of Sustainability',
    type: 'route',
    routePath: '/hackathons',
    description: 'National competitions and our flagship on-campus traveling hackathon series.',
    verifiedExplanation: 'Here are our national hackathon listings! You can explore upcoming events or request our flagship "100 Days of Sustainability" series to be hosted directly on your college campus.',
    suggestedActionLabel: 'Explore Hackathons',
    keywords: ['hackathons', 'hackathon', '100 days of sustainability', 'campus hackathon', 'contests', 'prizes']
  },
  {
    id: 'leaderboard',
    label: 'National Campus XP Leaderboard',
    type: 'section',
    domSelector: '#leaderboard',
    routePath: '/leaderboard',
    description: 'Top student rankings, college university standings, and daily streak tracking.',
    verifiedExplanation: 'Here is the National Leaderboard! You can see where engineering students across India rank by verified problem solves, XP badges, and practice streaks.',
    suggestedActionLabel: 'View Leaderboard',
    keywords: ['leaderboard', 'rank', 'streak', 'top coders', 'xp', 'college rank', 'standings']
  },
  {
    id: 'certifications',
    label: 'Topic & Vendor Certifications',
    type: 'route',
    routePath: '/certifications/topic',
    description: 'EC-Council credentials and Oracle, AWS, and Azure certification prep.',
    verifiedExplanation: 'Here is our Certification Hub! We prepare engineering students for official EC-Council credentials (CEH, CND, CHFI) and vendor tracks like Oracle Java SE, Microsoft Azure AZ-305, and AWS SAA-C03.',
    suggestedActionLabel: 'View Certifications',
    keywords: ['certifications', 'certificate', 'ceh', 'oracle', 'aws', 'azure', 'ec-council']
  },
  {
    id: 'certificate_verify',
    label: 'Digital Certificate Verification Portal',
    type: 'route',
    routePath: '/learn/certificates/verify',
    description: 'Public cryptographic verification portal with QR scanner and instant lookup.',
    verifiedExplanation: 'This is our official Certificate Verification portal. Employers and colleges can enter a credential ID or scan a QR code to verify student certificates cryptographically.',
    suggestedActionLabel: 'Verify Certificate',
    keywords: ['verify certificate', 'verify', 'qr code', 'certificate lookup', 'authenticity']
  },
  {
    id: 'faq',
    label: 'Frequently Asked Questions',
    type: 'section',
    domSelector: '#faq',
    routePath: '/#faq',
    description: 'Answers about college eligibility, degree duration multipliers, and test security.',
    verifiedExplanation: 'Here are our Frequently Asked Questions! Tap any question to learn about multi-year degree locking, college batch eligibility, and certificate authenticity.',
    suggestedActionLabel: 'Read FAQs',
    keywords: ['faq', 'questions', 'doubt', 'eligibility', 'multi-year', 'validity']
  }
]

export class NavigationManager {
  private activeHighlight: HTMLElement | null = null
  private scrollTimeout: any = null
  private spaNavigate: ((path: string) => void) | null = null

  /**
   * Set SPA navigate function from React Router
   */
  public setNavigate(navigateFn: (path: string) => void) {
    this.spaNavigate = navigateFn
  }

  public findDestination(target: string): RegisteredDestination | undefined {
    const clean = target.toLowerCase().trim()
    return DESTINATION_REGISTRY.find(
      d =>
        d.id === clean ||
        d.label.toLowerCase().includes(clean) ||
        (d.domSelector && d.domSelector.includes(clean)) ||
        d.keywords.some(kw => clean.includes(kw) || kw.includes(clean))
    )
  }

  /**
   * Smoothly navigates to a destination (scrolls if in-page, SPA routes if separate page).
   * Does NOT trigger hard browser reloads, preserving ongoing speech and animation!
   */
  public guideTo(
    destId: string,
    onArrived?: (dest: RegisteredDestination) => void,
    onManualCancel?: () => void
  ): boolean {
    const dest = this.findDestination(destId)
    if (!dest) return false

    const isHomePage = window.location.pathname === '/' || window.location.pathname === ''

    if (dest.type === 'section' && isHomePage && dest.domSelector) {
      return this.smoothScrollTo(dest.domSelector, () => onArrived?.(dest), onManualCancel)
    } else {
      // Route navigation needed
      if (window.location.pathname === dest.routePath) {
        // Already on the route, scroll to top or target selector
        if (dest.domSelector) {
          return this.smoothScrollTo(dest.domSelector, () => onArrived?.(dest), onManualCancel)
        } else {
          this.smoothScrollToTop(() => onArrived?.(dest))
          return true
        }
      }

      // Perform SPA navigation without page reload
      if (this.spaNavigate) {
        this.spaNavigate(dest.routePath)
      } else {
        window.history.pushState({}, '', dest.routePath)
        window.dispatchEvent(new PopStateEvent('popstate'))
      }

      // If destination has a domSelector, wait for new page content to render
      if (dest.domSelector) {
        let attempts = 0
        const checkMounted = setInterval(() => {
          attempts++
          const el = document.querySelector(dest.domSelector!) as HTMLElement
          if (el || attempts > 20) {
            clearInterval(checkMounted)
            if (el) {
              this.smoothScrollTo(dest.domSelector!, () => onArrived?.(dest), onManualCancel)
            } else {
              onArrived?.(dest)
            }
          }
        }, 100)
      } else {
        this.smoothScrollToTop(() => onArrived?.(dest))
      }

      return true
    }
  }

  /**
   * Smoothly scrolls to target DOM selector with sticky header compensation and Lenis sync
   */
  public smoothScrollTo(
    selector: string,
    onArrived?: () => void,
    onManualCancel?: () => void
  ): boolean {
    const el = document.querySelector(selector) as HTMLElement
    if (!el) return false

    clearTimeout(this.scrollTimeout)
    this.clearHighlight()

    // 80px sticky navbar offset
    const yOffset = -80
    const targetY = Math.max(0, el.getBoundingClientRect().top + window.pageYOffset + yOffset)

    // Setup manual user scroll cancel listener
    const cancelOnUserInteraction = () => {
      window.removeEventListener('wheel', cancelOnUserInteraction)
      window.removeEventListener('touchmove', cancelOnUserInteraction)
      if (onManualCancel) onManualCancel()
    }
    window.addEventListener('wheel', cancelOnUserInteraction, { passive: true, once: true })
    window.addEventListener('touchmove', cancelOnUserInteraction, { passive: true, once: true })

    // Check if Lenis is available globally
    const lenis = (window as any).__lenis
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(targetY, {
        duration: 1.2,
        onComplete: () => {
          window.removeEventListener('wheel', cancelOnUserInteraction)
          window.removeEventListener('touchmove', cancelOnUserInteraction)
          this.highlightElement(el)
          if (onArrived) onArrived()
        }
      })
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' })
      // Fallback arrival timer
      this.scrollTimeout = setTimeout(() => {
        window.removeEventListener('wheel', cancelOnUserInteraction)
        window.removeEventListener('touchmove', cancelOnUserInteraction)
        this.highlightElement(el)
        if (onArrived) onArrived()
      }, 800)
    }

    return true
  }

  public smoothScrollToTop(onArrived?: () => void) {
    const lenis = (window as any).__lenis
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(0, {
        duration: 0.8,
        onComplete: () => onArrived?.()
      })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => onArrived?.(), 500)
    }
  }

  public highlightElement(el: HTMLElement) {
    this.clearHighlight()
    el.classList.add('dkoder-robot-highlight-target')
    this.activeHighlight = el

    // Gracefully remove highlight after 6 seconds
    setTimeout(() => {
      this.clearHighlight()
    }, 6000)
  }

  public clearHighlight() {
    if (this.activeHighlight) {
      this.activeHighlight.classList.remove('dkoder-robot-highlight-target')
      this.activeHighlight = null
    }
  }
}

export const navManager = new NavigationManager()
