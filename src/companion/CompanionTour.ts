/**
 * DKODER Interactive Website Tour Engine
 * Orchestrates a step-by-step guided journey across the website with
 * synchronized speech, character animations, spotlights, and escape controls.
 */

import type { CompanionLang } from './CompanionAudio'

export interface TourStep {
  id: string
  domSelector: string
  title: string
  badge: string
  robotState: 'waking' | 'speaking' | 'guiding' | 'arriving' | 'celebrating'
  scripts: {
    en: string
    ta: string
    tanglish: string
    hi: string
  }
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: 'hero',
    domSelector: '#hero',
    title: 'The Career Engine',
    badge: 'Step 1 of 8 · Welcome',
    robotState: 'waking',
    scripts: {
      en: 'Welcome to DKODER, the dedicated career engine for engineering students. Let us take a quick guided tour together!',
      ta: 'DKODER-க்கு அன்புடன் வரவேற்கிறோம்! இது இன்ஜினியரிங் மாணவர்களுக்கான முன்னணி பயிற்சி தளம். வாருங்கள், தளத்தை ஒன்றாக சுற்றிப் பார்க்கலாம்!',
      tanglish: 'Welcome to DKODER! Engineering students-kaga create panna placement engine. Vaanga oru quick tour paakalaam!',
      hi: 'DKODER में आपका स्वागत है! इंजीनियरिंग छात्रों के लिए यह सबसे बेहतरीन प्लेसमेंट इंजन है. आइए मिलकर पूरे प्लेटफॉर्म को एक्सप्लोर करते हैं!',
    },
  },
  {
    id: 'queries',
    domSelector: '#queries',
    title: 'Placement Guidance & Roadmaps',
    badge: 'Step 2 of 8 · Roadmaps',
    robotState: 'speaking',
    scripts: {
      en: 'Here you can explore verified roadmaps for specific student goals, from 10 LPA offers to Zoho, Game Development, and Ethical Hacking.',
      ta: 'உங்கள் இலக்குகளுக்கு ஏற்ப, ₹10 LPA பேக்கேஜ் முதல் Zoho வரை தெளிவான வழிமுறைகள் இங்கே உள்ளன.',
      tanglish: 'Unga dream goals-ku matching roadmaps inga irukku, 10 LPA package, Zoho, ethical hacking ellame!',
      hi: 'यहाँ आपको 10 LPA ड्रीम पैकेज, ज़ोहो, और एथिकल हैकिंग के लिए स्पष्ट रोडमैप्स मिलेंगे.',
    },
  },
  {
    id: 'constellation',
    domSelector: '#constellation',
    title: 'Top Recruiter Network',
    badge: 'Step 3 of 8 · Recruiters',
    robotState: 'speaking',
    scripts: {
      en: 'Interact with our 3D hiring network connecting you to Google, Microsoft, Meta, Amazon, and top Tier-1 recruiters.',
      ta: 'Google, Microsoft, Amazon போன்ற முன்னணி நிறுவனங்களின் வேலைவாய்ப்புகளை இந்த 3D நெட்வொர்க்கில் காணலாம்.',
      tanglish: 'Top tech recruiters like Google, Amazon, Flipkart ellam connect aana hiring network idhu.',
      hi: 'गूगल, अमेज़ॅन और मेटा जैसे टॉप रिक्रूटर्स के साथ 3D नेटवर्क में एक्सप्लोर करें.',
    },
  },
  {
    id: 'guidance',
    domSelector: '#guidance',
    title: 'Interview Tomorrow Worry Solver',
    badge: 'Step 4 of 8 · Pre-Interview Tips',
    robotState: 'speaking',
    scripts: {
      en: 'Have an interview tomorrow? Clear every dilemma with tactical psychological formulas designed to keep you calm and confident.',
      ta: 'நாளை இன்டர்வியூவா? பயப்பட வேண்டாம்! 12 நடைமுறை வழிகாட்டல்கள் மூலம் உங்கள் தயக்கத்தை எளிதாக வெல்லலாம்.',
      tanglish: 'Naalaiku interview na bayapada venaam! Tactile guidance formulas ungalukku help pannum.',
      hi: 'कल इंटरव्यू है? किसी भी संकोच को दूर करने के लिए यहाँ 12 प्रैक्टिकल फॉर्मूले उपलब्ध हैं.',
    },
  },
  {
    id: 'practice',
    domSelector: '#practice',
    title: 'Interactive Question Discovery Lab',
    badge: 'Step 5 of 8 · Practice Lab',
    robotState: 'arriving',
    scripts: {
      en: 'Practice 12,500+ verified coding questions from 500+ top recruiters directly in our browser IDE with live testcase evaluation.',
      ta: '12,500-க்கும் மேற்பட்ட நிஜமான கோடிங் கேள்விகளை உங்கள் பிரவுசரிலேயே எந்த மென்பொருளும் இன்றி உடனே பயிற்சி செய்யலாம்.',
      tanglish: 'Browser-laye TCS, Infosys, Zoho coding questions 12,500+ solve panni testcases run pannalaam.',
      hi: 'बिना किसी लोकल सेटअप के ब्राउज़र में ही 12,500+ कोडिंग प्रॉब्लम्स सॉल्व करें.',
    },
  },
  {
    id: 'career-tracks',
    domSelector: '#career-tracks',
    title: 'Career Pathways & Salary Bands',
    badge: 'Step 6 of 8 · Career Pathways',
    robotState: 'speaking',
    scripts: {
      en: 'Organize your learning by verified salary tiers, ranging from Service MNCs at 0-3 LPA up to Super Dream roles at 15+ LPA.',
      ta: '0-3 LPA சர்வீஸ் நிறுவனங்கள் முதல் 15+ LPA சூப்பர் ட்ரீம் வரையிலான 5 தெளிவான கரியர் பாதைகள் இங்கே உள்ளன.',
      tanglish: 'Salary bands base panni 0-3 LPA la irundhu 15+ LPA varaikkum structured learning tracks irukku.',
      hi: '0-3 LPA से लेकर 15+ LPA तक सैलरी टियर्स के अनुसार स्ट्रक्चर्ड करियर ट्रैक्स.',
    },
  },
  {
    id: 'colleges',
    domSelector: '#colleges',
    title: 'Institutional Hub for Colleges',
    badge: 'Step 7 of 8 · For Colleges',
    robotState: 'speaking',
    scripts: {
      en: 'Over 150 engineering campuses use DKODER as their institutional assistant for risk detection and NBA NIRF compliance.',
      ta: '150-க்கும் மேற்பட்ட கல்லூரிகள் மாணவர்களின் வேலைவாய்ப்பு பயிற்சிக்கும் என்.பி.ஏ தர மதிப்பீட்டிற்கும் DKODER-ஐ பயன்படுத்துகின்றன.',
      tanglish: '150+ engineering colleges student placement analytics and NBA compliance-kaga DKODER use panraanga.',
      hi: '150 से अधिक इंजीनियरिंग कॉलेज स्टूडेंट रिस्क डिटेक्शन और प्लेसमेंट एनालिटिक्स के लिए DKODER का उपयोग करते हैं.',
    },
  },
  {
    id: 'pricing',
    domSelector: '#pricing',
    title: 'Transparent 5-Tier Pricing Plans',
    badge: 'Step 8 of 8 · Locked Passes',
    robotState: 'celebrating',
    scripts: {
      en: 'Choose from 5 transparent tiers starting at ₹699 per year, with locked degree passes to ensure zero price hikes during your studies. That concludes our tour!',
      ta: 'ஆண்டுக்கு ₹699 முதல் தொடங்கும் 5 எளிய கட்டண திட்டங்கள். படிப்பு முடியும் வரை கட்டண உயர்வு இல்லாத பாதுகாப்பு உத்தரவாதம். டூர் நிறைவடைந்தது!',
      tanglish: 'Yearly ₹699-la start aagura 5 plans. College complete aagura varaikkum rate lock pannalaam. Tour complete aayiduchu!',
      hi: '₹699 प्रति वर्ष से शुरू होने वाले 5 पारदर्शी प्लान्स. डिग्री पूरी होने तक कोई प्राइस हाइक नहीं. हमारा टूर पूरा हुआ!',
    },
  },
]

export function getTourScript(step: TourStep, lang: CompanionLang): string {
  if (lang === 'ta') return step.scripts.ta
  if (lang === 'tanglish') return step.scripts.tanglish
  if (lang === 'hi') return step.scripts.hi
  return step.scripts.en
}
