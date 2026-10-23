import { useState } from 'react'
import './FAQSection.css'

interface FAQItem {
  q: string
  a: string
}

const FAQS: FAQItem[] = [
  {
    q: 'How are DKoder questions tagged to specific companies?',
    a: 'Every problem in our 1,200+ question bank is verified from actual recruitment drive memory papers, placed alumni submission reports, and campus drive patterns across 2023–2026. We track recurrence frequency so you never waste time practicing irrelevant patterns.'
  },
  {
    q: 'What is the core difference between Bronze, Silver, Gold, and Super Dream tiers?',
    a: 'Bronze provides 300 foundational questions. Silver unlocks company-filtered problem banks and our live multi-language IDE. Gold gives you the complete 1,200+ question vault with career track roadmaps and resume reviews. Super Dream includes 1-on-1 personalized mock interviews and direct recruiter referrals.'
  },
  {
    q: 'Can engineering colleges and universities integrate DKoder directly?',
    a: 'Yes. Over 120 autonomous engineering institutes and university placement cells use the DKoder College LMS. Faculty and TPOs can schedule proctored coding screens, monitor batch readiness metrics, and prevent tab-switching during exams.'
  },
  {
    q: 'How does the Synapse AI complexity analyzer provide feedback?',
    a: 'When you submit or preview code in our IDE, Synapse analyzes your Abstract Syntax Tree (AST) to compute empirical time and space complexity, flags potential runtime corner cases, and suggests optimal O(N) or dual-pointer refactors.'
  },
  {
    q: 'Can I practice in multiple programming languages?',
    a: 'DKoder supports real-time execution in TypeScript, JavaScript (Node 20), Python 3.11, C++ 20, and Java 17. Every problem comes with calibrated boilerplate and test suite harnesses for each language.'
  },
  {
    q: 'What is the 7-day risk-free guarantee?',
    a: 'If you feel DKoder has not materially accelerated your interview readiness within 7 days of subscribing to any tier, email support@dkoder.co.in for an unconditional 100% refund.'
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
          <div className="tag tag--lime">FREQUENTLY ASKED QUESTIONS</div>
          <h2 id="faq-heading" className="faq__heading">
            Everything You Need to Know
          </h2>
          <p className="faq__sub">
            Clear answers on company tagging, subscriptions, university deployments, and interview readiness.
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
