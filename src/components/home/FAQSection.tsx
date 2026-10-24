import { useState } from 'react'
import './FAQSection.css'

interface FAQItem {
  q: string
  a: string
}

const FAQS: FAQItem[] = [
  {
    q: 'What does it cost, and how does the 4-year flat licensing work?',
    a: 'DKoder offers flat degree licensing: Essential at ₹1,000 or Pro at ₹2,000 for the full 4 years of engineering (₹250–₹500/yr equivalent). One payment covers the student from first-year fundamentals through final placement drives with zero annual renewals, hidden per-seat costs, or surprise invoices.'
  },
  {
    q: 'How does the anti-cheat system prevent malpractice during high-stakes exams?',
    a: 'DKoder deploys a 4-pillar integrity stack: (1) OS Focus Container intercepting tab-switching, window blurring, and DevTools; (2) 30 FPS Local WASM Neural Engine tracking posture and secondary individuals locally with zero video streams uploaded; (3) Keystroke Cadence Spectrum detecting ChatGPT copy-paste bursts; and (4) SHA-256 Cryptographic HOD Report for board-defensible audit trails.'
  },
  {
    q: 'Where do the 12,500+ questions come from, and how are they tagged?',
    a: 'Every problem in our question bank is extracted from verified hiring assessment memory papers, placed alumni submission reports, and real drive patterns across 500+ companies. Questions are categorized by salary band (3–5 LPA, 6–10 LPA, 10–20 LPA, 20–40+ LPA), company type, and recency.'
  },
  {
    q: 'How is DKoder different from LeetCode or SkillRack?',
    a: 'LeetCode costs ₹54,000+ ($159/yr × 4 yrs) and lacks Indian campus entrance exam tracks (TCS NQT, InfyTQ), anti-cheat proctoring, or HOD dashboards. Legacy tools like SkillRack lack modern salary band filters, on-device WASM proctoring, and modern Monaco code runners. DKoder provides full institutional LMS workflows at a fraction of the cost.'
  },
  {
    q: 'Do students or colleges need to install any heavy software or browser extensions?',
    a: 'No. DKoder operates entirely inside any modern web browser using WebAssembly and WebGL. Students write and execute code in our Monaco-powered IDE without installing compilers or extensions, ensuring zero setup friction across lab computers and personal laptops.'
  },
  {
    q: 'How do HODs and Placement Officers use the platform for NIRF/NBA accreditation?',
    a: 'DKoder automatically compiles department-wise placement clearance rates, problem solve distributions, and proctored assessment logs into board-defensible audit summaries formatted for NBA, NAAC, and NIRF institutional accreditation reviews.'
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx))
  }

  return (
    <section className="faq" id="faq" aria-labelledby="faq-heading">
      <div className="container">
        <div className="faq__header">
          <div className="section-badge">
            <span className="section-badge__dot" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 id="faq-heading" className="faq__heading">
            Everything You Need to Know
          </h2>
          <p className="faq__sub">
            Clear answers on 4-year institutional licensing, question provenance, anti-cheat proctoring, and campus onboarding.
          </p>
        </div>

        <div className="faq__list">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={item.q}
                className={`faq__item ${isOpen ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className="faq__question-btn"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq__q-text">{item.q}</span>
                  <span className="faq__q-icon">{isOpen ? '−' : '+'}</span>
                </button>

                {isOpen && (
                  <div className="faq__answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
