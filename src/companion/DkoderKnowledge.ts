/**
 * DKODER Verified Product Knowledge Base
 * Sourced directly from verified specifications (dkoder.co.in, tech-hike.in, and the live platform).
 * Grounded truth for the DKODER AI Robot Companion across English, Tamil, Tanglish, and Hindi.
 */

export interface KnowledgeItem {
  id: string
  title: string
  summary: string
  details: string
  sectionId?: string
  routePath?: string
  keywords: string[]
  suggestedActions?: { label: string; action: string; target?: string }[]
}

export const DKODER_KNOWLEDGE: KnowledgeItem[] = [
  {
    id: 'platform_overview',
    title: 'What is DKODER?',
    summary: 'DKODER is India\'s premier placement readiness platform and career LMS for engineering colleges.',
    details: 'DKODER helps engineering students prepare for and crack campus recruitment drives. It features 12,500+ company-tagged coding problems, in-browser compilation for Python, C++, Java, and JavaScript, curated salary-tier tracks (3.5 to 42+ LPA), and full-length campus mock test series.',
    sectionId: 'hero',
    routePath: '/',
    keywords: [
      'what is dkoder', 'about', 'overview', 'dkoder', 'platform', 'what do you do', 'introduction',
      'dkoder na enna', 'enna platform', 'paththi sollunga', 'dkoder pathi',
      'dkoder kya hai', 'ye kya karta hai'
    ],
    suggestedActions: [
      { label: 'Explore Questions', action: 'navigate', target: 'practice' },
      { label: 'View Pricing', action: 'navigate', target: 'pricing' },
    ],
  },
  {
    id: 'question_bank',
    title: '12,500+ Company-Tagged Coding Questions',
    summary: 'Practice real problems verified from 500+ top hiring recruiters and drives.',
    details: 'Questions are tagged by target company (Google, Amazon, Microsoft, TCS, Infosys, ServiceNow, Wipro, Cognizant, Zoho, etc.), difficulty (Easy, Medium, Hard), topic (Arrays, Dynamic Programming, Graphs, Trees), and salary band. Includes in-browser IDE with instant test-case execution.',
    sectionId: 'practice',
    routePath: '/practice',
    keywords: [
      'questions', 'practice', 'coding', 'problems', 'dsa', 'leetcode', 'company questions', 'test cases', 'compiler', 'ide',
      'coding practice enga pannanum', 'questions irukka', 'zoho coding', 'tcs nqt coding',
      'coding kahan karein', 'questions bank'
    ],
    suggestedActions: [
      { label: 'Practice Hub', action: 'navigate', target: 'practice' },
      { label: 'TCS & Zoho Prep', action: 'navigate', target: 'practice?company=Zoho' },
    ],
  },
  {
    id: 'pricing_plans',
    title: '5 Official Transparent Pricing Plans',
    summary: 'Bronze (₹699/yr), Silver (₹999/yr), Gold (₹1,599/yr), Platinum (₹1,999/yr), and Super Dream Pack (₹2,999/yr).',
    details: 'DKODER offers 5 official transparent student tiers: Bronze (₹699/year, 0–3 LPA), Silver (₹999/year, 0–5 LPA), Gold (₹1,599/year, 0–7 LPA), Platinum (₹1,999/year, 0–15 LPA, Most Popular), and Super Dream Pack (₹2,999/year, 15+ LPA, Best Value with 1-on-1 mentorship). Multi-year discounts (up to 4 years) are available. Institutional MOU licenses are provided for colleges.',
    sectionId: 'pricing',
    routePath: '/pricing',
    keywords: [
      'pricing', 'price', 'cost', 'fee', 'how much', 'plans', 'subscription', 'bronze', 'silver', 'gold', 'platinum', 'super dream', 'buy', 'annual',
      'evvalavu price', 'fees evvalavu', 'pricing sollunga', 'plan enna', 'platinum plan', 'super dream pack',
      'fees kitna hai', 'plan ki keemat', 'subscription kitne ka hai'
    ],
    suggestedActions: [
      { label: 'View 5 Plans', action: 'navigate', target: 'pricing' },
      { label: 'Institutional MOU', action: 'navigate', target: 'partner-mou' },
    ],
  },
  {
    id: 'courses_catalog',
    title: 'Skill-Based Engineering Courses',
    summary: 'Curated technical curriculum covering Full Stack, AI/ML, Cloud Architecture, and DSA.',
    details: 'DKODER offers structured skill-based courses with verified syllabi, live capstone projects, mentor guidance, and verifiable digital certificates upon completion.',
    sectionId: 'courses',
    routePath: '/learn/courses',
    keywords: [
      'courses', 'learn', 'curriculum', 'classes', 'syllabus', 'full stack course', 'ai course', 'cloud course',
      'course enga irukku', 'courses paakanum', 'ennalaam padikkalaam', 'syllabus irukka',
      'course kahan hai', 'kya padh sakte hain'
    ],
    suggestedActions: [
      { label: 'Browse Courses', action: 'navigate', target: 'learn/courses' },
    ],
  },
  {
    id: 'hackathons_directory',
    title: 'Campus Hackathons & 100 Days of Sustainability',
    summary: 'National hackathon listings and our flagship traveling campus hackathon series.',
    details: 'Compete in national hackathons with exciting prize pools. Through our "100 Days of Sustainability" series, the DKODER technical team travels directly to college campuses to host physical hackathons.',
    sectionId: 'hackathons',
    routePath: '/hackathons',
    keywords: [
      'hackathons', 'hackathon', '100 days of sustainability', 'contests', 'coding competition', 'campus hackathon',
      'hackathon eppo', 'competition irukka', 'hackathon pathi sollunga',
      'hackathon kab hai', 'contest kahan hai'
    ],
    suggestedActions: [
      { label: 'Explore Hackathons', action: 'navigate', target: 'hackathons' },
      { label: '100 Days Series', action: 'navigate', target: 'hackathons/100-days' },
    ],
  },
  {
    id: 'college_mou',
    title: 'Institutional Partnerships & MOU Application',
    summary: 'Hire a Virtual Placement Assistant for your college with NBA/NIRF analytics compliance.',
    details: 'Engineering colleges can partner with DKODER via our Institutional MOU program. Features include automated test generation, cohort performance tracking, early risk detection for unplaced students, and accredited training programs across all 36 Indian states & UTs.',
    sectionId: 'colleges',
    routePath: '/partner-mou',
    keywords: [
      'mou', 'college', 'colleges', 'institution', 'university', 'tpo', 'hod', 'principal', 'partnership', 'campus partner',
      'college ku mou', 'partnership eppadi', 'college mou application',
      'college partnership kaise karein', 'mou form'
    ],
    suggestedActions: [
      { label: 'Apply for MOU', action: 'navigate', target: 'partner-mou' },
      { label: 'For Colleges Hub', action: 'navigate', target: 'colleges' },
    ],
  },
  {
    id: 'certifications',
    title: 'Topic & Technology Vendor Certifications',
    summary: 'Industry certifications including EC-Council (CEH, CND, CHFI) and Oracle, AWS, and Azure.',
    details: 'Prepare for official topic-wise certifications (Cybersecurity, Cloud, AI/ML) and technology vendor tracks (Oracle Java SE 8/17/21, OCI Generative AI, Microsoft Azure AZ-305, AWS SAA-C03). Includes our public cryptographic certificate verification portal.',
    sectionId: 'certifications',
    routePath: '/certifications/topic',
    keywords: [
      'certifications', 'certificate', 'verify certificate', 'ceh', 'oracle', 'aws', 'azure', 'ec-council',
      'certificate kedaikkuma', 'verify panradhu eppadi',
      'certificate kaise verify karein', 'certification kaunse hain'
    ],
    suggestedActions: [
      { label: 'Topic Certifications', action: 'navigate', target: 'certifications/topic' },
      { label: 'Verify Certificate', action: 'navigate', target: 'learn/certificates/verify' },
    ],
  },
  {
    id: 'final_year_projects',
    title: 'Final Year Projects Guidance',
    summary: 'Mentorship, code review, and publication guidance for engineering final year projects.',
    details: 'Project tracks available in Web Development, AI/ML, Cloud Infrastructure, and IoT/Embedded Systems. Students can join existing teams using a 6-character team invite code or apply for 1-on-1 industry mentorship.',
    sectionId: 'projects',
    routePath: '/final-year-projects',
    keywords: [
      'projects', 'final year projects', 'fyp', 'project ideas', 'team code', 'mentorship', 'ieee paper',
      'final year project help', 'project team la join pannanum',
      'project ideas chahiye', 'final year project'
    ],
    suggestedActions: [
      { label: 'Final Year Projects', action: 'navigate', target: 'final-year-projects' },
    ],
  },
  {
    id: 'national_leaderboard',
    title: 'National XP Leaderboard & Habit Streaks',
    summary: 'Compete with engineering peers across 150+ colleges nationwide.',
    details: 'Earn skill XP by solving daily problems, maintain unbroken practice streaks, and climb from Rookie to Master tier on the national leaderboard.',
    sectionId: 'leaderboard',
    routePath: '/leaderboard',
    keywords: [
      'leaderboard', 'rank', 'streak', 'xp', 'top coders', 'college ranking',
      'leaderboard enga', 'rank eppadi paakaradhu', 'top coders yaaru',
      'rank kaise dekhein', 'leaderboard'
    ],
    suggestedActions: [
      { label: 'View Leaderboard', action: 'navigate', target: 'leaderboard' },
    ],
  },
]
