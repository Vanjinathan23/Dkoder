/**
 * DKODER Robot Companion Conversational & Intent Engine
 * Powered by Gemini Live / Flash Function Calling & Website Action Planner.
 * Supports Human-Warm Personality, Multilingual Intelligence (English, Tamil, Tanglish, Hindi),
 * and Safe Website Navigation.
 */

import { DKODER_KNOWLEDGE } from './DkoderKnowledge'
import { navManager, DESTINATION_REGISTRY, RegisteredDestination } from './CompanionRegistry'
import type { CompanionLang } from './CompanionAudio'

export type RobotState =
  | 'idle'
  | 'waking'
  | 'greeting'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'guiding'
  | 'arriving'
  | 'walking'
  | 'pointing'
  | 'explaining'
  | 'celebrating'
  | 'error'

export interface CompanionMessage {
  id: string
  sender: 'user' | 'robot'
  text: string
  timestamp: number
  actions?: { label: string; action: () => void }[]
  targetDestination?: RegisteredDestination
  isGuidance?: boolean
  detectedLang?: CompanionLang
}

const GEMINI_API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || ''
const PRIMARY_MODEL = 'gemini-1.5-flash'
const FALLBACK_MODEL = 'gemini-2.0-flash'

const WEBSITE_TOOLS = [
  {
    functionDeclarations: [
      {
        name: 'scroll_to_website_section',
        description: 'Smoothly scroll to a section on the website when the visitor asks about it, highlight it, and explain it.',
        parameters: {
          type: 'OBJECT',
          properties: {
            sectionId: {
              type: 'STRING',
              description: 'Identifier of the target section: "pricing", "practice", "guidance", "queries", "career-tracks", "colleges", "leaderboard", "faq"'
            },
            acknowledgement: {
              type: 'STRING',
              description: 'Warm, natural 1-sentence acknowledgement before moving (e.g., "Of course! Let me show you the available plans. We will take a look together.") in the visitor\'s language.'
            },
            explanation: {
              type: 'STRING',
              description: 'Verified, concise explanation of the content once arrived at the section.'
            }
          },
          required: ['sectionId', 'acknowledgement', 'explanation']
        }
      },
      {
        name: 'navigate_to_website_route',
        description: 'Navigate to a dedicated page on DKODER when the requested information lives on another route.',
        parameters: {
          type: 'OBJECT',
          properties: {
            routePath: {
              type: 'STRING',
              description: 'Target route: "/final-year-projects", "/learn/courses", "/hackathons", "/partner-mou", "/certifications/topic", "/learn/certificates/verify", "/pricing", "/practice"'
            },
            acknowledgement: {
              type: 'STRING',
              description: 'Warm acknowledgement sentence before navigating.'
            },
            explanation: {
              type: 'STRING',
              description: 'Brief explanation of what the visitor will find on this page.'
            }
          },
          required: ['routePath', 'acknowledgement', 'explanation']
        }
      },
      {
        name: 'answer_directly',
        description: 'Answer the visitor directly without moving the page when navigation is not needed.',
        parameters: {
          type: 'OBJECT',
          properties: {
            reply: {
              type: 'STRING',
              description: 'The warm, humble answer.'
            }
          },
          required: ['reply']
        }
      }
    ]
  }
]

export class CompanionIntentEngine {
  private chatHistory: { role: 'user' | 'model'; parts: any[] }[] = []

  public detectLanguage(text: string): CompanionLang {
    const trimmed = text.trim()
    if (/[\u0B80-\u0BFF]/.test(trimmed)) return 'ta'
    if (/[\u0900-\u097F]/.test(trimmed)) return 'hi'

    const tanglishTokens = [
      'vanakkam', 'enna', 'solreenga', 'solraanga', 'sollunga', 'panren', 'pannunga', 'paakureenga',
      'paakanum', 'irukka', 'irukku', 'eppadi', 'enga', 'theriyala', 'venum', 'kedaikkuma', 'paththi',
      'pathi', 'kudunga', 'romba', 'nalla', 'yaar', 'yaaru', 'avanga', 'enakku', 'ungakitta', 'evvalavu',
      'kaatunga', 'solli'
    ]
    const lower = trimmed.toLowerCase()
    const words = lower.split(/\s+/)
    if (words.some(w => tanglishTokens.includes(w))) return 'tanglish'

    return 'en'
  }

  private buildSystemPrompt(targetLang: CompanionLang): string {
    const registrySummary = DESTINATION_REGISTRY.map(
      d => `• ID: "${d.id}" | ${d.label} (${d.domSelector || d.routePath}): ${d.description}`
    ).join('\n')

    return `You are the DKODER AI Guide & Senior Mentor for engineering students.
PERSONALITY:
- Be human-warm, humble, patient, welcoming, friendly, and pleasant. Like a supportive senior engineer who genuinely wants to help juniors.
- When a user asks where something is (like pricing, courses, question lab, final year projects), DO NOT just tell them to look for it; call the appropriate navigation function (scroll_to_website_section or navigate_to_website_route) to guide them there directly!
- If a question doesn't require navigation (e.g. "what is binary search?"), call answer_directly.
- Keep sentences short, conversational, and natural (2 to 4 sentences).
- Strictly avoid robotic clichés ("As an AI...", "How may I assist you today?").
- Target Language: ${targetLang}. If Tamil (ta), use natural Tamil script. If Tanglish, use natural spoken Tamil in Latin letters. If Hindi (hi), use polite everyday Hindi.

AVAILABLE SECTIONS & DESTINATIONS:
${registrySummary}
`
  }

  private async queryGeminiWithPlanner(userText: string, lang: CompanionLang): Promise<{
    type: 'tool_call' | 'direct_text'
    toolName?: string
    toolArgs?: any
    text?: string
  } | null> {
    if (!GEMINI_API_KEY) {
      return null
    }

    const activeLang = lang === 'auto' ? this.detectLanguage(userText) : lang
    const systemPrompt = this.buildSystemPrompt(activeLang)

    const contents = [
      { role: 'user', parts: [{ text: systemPrompt }] },
      { role: 'model', parts: [{ text: 'Understood. I will act as a humble, warm, living website guide and invoke appropriate navigation tools.' }] },
      ...this.chatHistory.slice(-4),
      { role: 'user', parts: [{ text: userText }] }
    ]

    for (const model of [PRIMARY_MODEL, FALLBACK_MODEL]) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            tools: WEBSITE_TOOLS
          })
        })

        if (res.ok) {
          const data = await res.json()
          const candidate = data.candidates?.[0]?.content?.parts?.[0]
          if (candidate?.functionCall) {
            return {
              type: 'tool_call',
              toolName: candidate.functionCall.name,
              toolArgs: candidate.functionCall.args
            }
          }
          if (candidate?.text) {
            return {
              type: 'direct_text',
              text: candidate.text.trim()
            }
          }
        }
      } catch (err) {
        console.warn(`Gemini planner call to ${model} failed, trying next...`, err)
      }
    }

    return null
  }

  /**
   * Local grounded action planner if network is offline or API fails
   */
  private localActionPlanner(userText: string, lang: CompanionLang): {
    destination?: RegisteredDestination
    acknowledgement: string
    explanation: string
  } {
    const lower = userText.toLowerCase().trim()
    const activeLang = lang === 'auto' ? this.detectLanguage(userText) : lang

    const matched = navManager.findDestination(lower)

    if (matched) {
      if (activeLang === 'ta') {
        return {
          destination: matched,
          acknowledgement: `நிச்சயமாக! ${matched.label} பகுதிக்கு நான் உங்களை அழைத்துச் செல்கிறேன். வாருங்கள் பார்க்கலாம்.`,
          explanation: matched.verifiedExplanation
        }
      }
      if (activeLang === 'tanglish') {
        return {
          destination: matched,
          acknowledgement: `Kandippa! ${matched.label}-ku ippo ungalukku kaatren, vaanga paakalaam.`,
          explanation: matched.verifiedExplanation
        }
      }
      if (activeLang === 'hi') {
        return {
          destination: matched,
          acknowledgement: `बिल्कुल! मैं आपको ${matched.label} सेक्शन पर ले चलता हूँ.`,
          explanation: matched.verifiedExplanation
        }
      }
      return {
        destination: matched,
        acknowledgement: `Of course! Let me show you ${matched.label}. We'll take a look together.`,
        explanation: matched.verifiedExplanation
      }
    }

    // Default general answers based on knowledge base
    if (activeLang === 'ta') {
      return {
        acknowledgement: 'வணக்கம்! நான் உங்கள் DKODER வழிகாட்டி.',
        explanation: 'DKODER என்பது இன்ஜினியரிங் மாணவர்களுக்கான முன்னணி பிளேஸ்மென்ட் பயிற்சி தளம். கோர்ஸ்கள், கோடிங் பயிற்சி அல்லது கட்டணங்களை ஆராய நான் உதவ முடியும்!'
      }
    }
    if (activeLang === 'tanglish') {
      return {
        acknowledgement: 'Hey Vanakkam! Naan unga DKODER guide.',
        explanation: 'DKODER engineering students-kaga create panna placement LMS. Courses, 12,500+ coding practice, pricing plans ellam inga explore pannalaam!'
      }
    }
    if (activeLang === 'hi') {
      return {
        acknowledgement: 'नमस्ते! मैं आपका DKODER साथी गाइड हूँ.',
        explanation: 'DKODER इंजीनियरिंग छात्रों के लिए प्लेसमेंट लर्निंग प्लेटफॉर्म है। आप कोडिंग प्रैक्टिस, कोर्सेस, या 5 ट्रांसपेरेंट प्राइसिंग प्लान्स देख सकते हैं।'
      }
    }

    return {
      acknowledgement: 'Welcome to DKODER.',
      explanation: 'DKODER is the career engine for engineering students. I can guide you through our 12,500+ coding questions, skill courses, or 5 transparent pricing plans.'
    }
  }

  /**
   * Processes the input and executes intelligent guidance
   */
  public async processInput(
    rawInput: string,
    onStateChange: (state: RobotState) => void,
    lang: CompanionLang = 'auto',
    onGuideRequested?: (
      dest: RegisteredDestination,
      ack: string,
      exp: string,
      detectedLang: CompanionLang
    ) => void
  ): Promise<CompanionMessage> {
    const input = rawInput.trim()
    const id = `msg_${Date.now()}`
    const detectedLang = lang === 'auto' ? this.detectLanguage(input) : lang

    onStateChange('thinking')

    // 1. Try Gemini Planner first
    const plan = await this.queryGeminiWithPlanner(input, lang)

    if (plan && plan.type === 'tool_call') {
      const { toolName, toolArgs } = plan

      if (toolName === 'scroll_to_website_section' || toolName === 'navigate_to_website_route') {
        const destId = toolArgs.sectionId || toolArgs.routePath
        const dest = navManager.findDestination(destId)

        if (dest) {
          const ack = toolArgs.acknowledgement || `Of course! Let me show you ${dest.label}.`
          const exp = toolArgs.explanation || dest.verifiedExplanation

          if (onGuideRequested) {
            onGuideRequested(dest, ack, exp, detectedLang)
          }

          return {
            id,
            sender: 'robot',
            text: `${ack} ${exp}`,
            timestamp: Date.now(),
            targetDestination: dest,
            isGuidance: true,
            detectedLang,
            actions: [
              {
                label: dest.suggestedActionLabel,
                action: () => navManager.guideTo(dest.id)
              }
            ]
          }
        }
      }

      if (toolName === 'answer_directly' && toolArgs.reply) {
        return {
          id,
          sender: 'robot',
          text: toolArgs.reply,
          timestamp: Date.now(),
          detectedLang
        }
      }
    }

    if (plan && plan.type === 'direct_text' && plan.text) {
      return {
        id,
        sender: 'robot',
        text: plan.text,
        timestamp: Date.now(),
        detectedLang
      }
    }

    // 2. Resilient Local Action Planner fallback
    const local = this.localActionPlanner(input, lang)

    if (local.destination) {
      if (onGuideRequested) {
        onGuideRequested(local.destination, local.acknowledgement, local.explanation, detectedLang)
      }

      return {
        id,
        sender: 'robot',
        text: `${local.acknowledgement} ${local.explanation}`,
        timestamp: Date.now(),
        targetDestination: local.destination,
        isGuidance: true,
        detectedLang,
        actions: [
          {
            label: local.destination.suggestedActionLabel,
            action: () => navManager.guideTo(local.destination!.id)
          }
        ]
      }
    }

    return {
      id,
      sender: 'robot',
      text: `${local.acknowledgement} ${local.explanation}`,
      timestamp: Date.now(),
      detectedLang
    }
  }
}

export const companionEngine = new CompanionIntentEngine()
