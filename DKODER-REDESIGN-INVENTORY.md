# DKODER REDESIGN MASTER INVENTORY & DISCOVERY AUDIT
**Standard:** Complete Website Redesign — Zero Omissions, Zero New Features
**Date of Audit:** October 24, 2026
**Audited Sources:**
- Official DKODER Production Application: `https://dkoder.co.in/`
- Production Bundles Audited: `dkoder-bundle.js` (`index-C_YsE9Kn.js`), `tech-hike-bundle.js` (`index-DP_RcRhb.js`), `landing-navbar.js`, `site-footer.js`, `accessibility-menu.js`, `home-page.js`, `colleges-page.js`, `pricing-plans-config.js`, `plans-section.js`, `mou-page.js`, `cert-topic-page.js`, `cert-tech-page.js`, `courses-page.js`, `event-list.js`, `resource-hub.js`, `program-list.js`, `hackathon-list.js`, `cert-verify.js`
- Local Prototype Workspace: `c:\Users\vanji\OneDrive\Documents\Code\Dkoder Hack` (React 19, Vite, Three.js, Framer Motion)

---

## 1. Executive Summary & Discovery Findings

### 1.1 Source-of-Truth Architecture
The original DKODER application (`https://dkoder.co.in/` and sister deployment `https://tech-hike.in/`) is a comprehensive Single Page Application with dynamic client-side routing, modular lazy-loaded route chunks, and unified state/token authentication. It serves two distinct audiences:
1. **Public & Prospect Audiences**: Prospective engineering students, placement candidates, and college administrators/HODs seeking placement training, hackathons, and institutional MOUs.
2. **Authenticated Roles**: Six discrete authenticated roles with role-based routing guards:
   - `student` (Dashboard `/student`, stages: MCQ `/exam-player`, Resume `/student/resume`, Aptitude `/student/aptitude`, Coding `/student/coding`, HR Interview `/student/interview`, Finished `/student/dashboard`, Subscriptions `/student/subscription`, My Learning `/student/learn`, etc.)
   - `hod` (`/hod`, analytics, exam management, batch reports, institution users)
   - `instructor` (`/instructor`, exam builder, test series, question bank, LMS curriculum management)
   - `college_admin` (`/college-admin`, college-wide exam analytics, report exports)
   - `trainer` (`/student` with extended trainer permissions)
   - `intern` (`/intern`, add MCQ, add coding question, review queue)

### 1.2 Current Local Prototype Audit vs Original
The existing local prototype in `c:\Users\vanji\OneDrive\Documents\Code\Dkoder Hack`:
- Built with React 19 + TypeScript + Vite.
- Only implemented a single composite route in `src/App.tsx`: `path="/" element={<HomePage />}` with catch-all `* -> <HomePage />`.
- `Navbar.tsx` only contained local page anchors (`#features`, `#constellation`, `#practice`, `#tracks`, `#security`, `#colleges`, `#pricing`, `#faq`) instead of the true 7-item DKODER navigation bar (`Home`, `Learn` [Dropdown: 6 destinations], `Hackathons`, `For Colleges`, `Apply for MOU`, `Accessibility Controls`, `Dashboard / Sign in`).
- Authentic pages like `/learn/courses`, `/learn/events`, `/learn/resources`, `/final-year-projects`, `/certifications/topic`, `/certifications/technology`, `/hackathons`, `/colleges`, `/partner-mou`, `/pricing`, `/practice`, `/leaderboard`, `/learn/certificates/verify`, and `/auth/login` were missing their dedicated full route views.
- **Rule 1 & Rule 2 Enforcement**: All discovered authentic routes and sections will be preserved with 100% fidelity. No fictional features will be introduced.

---

## 2. Navigation Architecture Audit

### 2.1 Main Navigation Header (`LandingNavbar`)
| Item | Destination | Type | Content / Interactions | Status |
| :--- | :--- | :--- | :--- | :--- |
| **DKoder Brand Logo** | `/` | Brand Link | SVG Brand mark + "DKoder" typography; returns to top of homepage | Inspected |
| **Home** | `/` | Route Link | Scrolls to top or navigates to `/` | Inspected |
| **Learn** | `/learn/courses` | Dropdown Trigger | Interactive hover/click dropdown containing 6 discrete educational destinations with descriptive badges | Inspected |
| ↳ **Courses** | `/learn/courses` | Dropdown Item | "Skill-based programs" — Full course catalog with category filters, ratings, syllabus, and enrollment | Inspected |
| ↳ **Events** | `/learn/events` | Dropdown Item | "Workshops & live sessions" — Upcoming webinars, technical masterclasses, registrations | Inspected |
| ↳ **Resources** | `/learn/resources` | Dropdown Item | "Guides, videos & articles" — Placement guides, video hub (YouTube/Google Drive), interview experiences | Inspected |
| ↳ **Final Year Projects** | `/final-year-projects` | Dropdown Item | "Guidance, mentor & publication" — Project mentorship, domain selection, team code joining | Inspected |
| ↳ **Topic Wise** | `/certifications/topic` | Dropdown Item | "Certifications by topic" — Cyber Security, Cloud, Full Stack, Data Science, AI/ML credentials | Inspected |
| ↳ **Technology Wise** | `/certifications/technology`| Dropdown Item | "Certifications by technology" — Oracle, AWS, Azure, Google Cloud, Cisco official track prep | Inspected |
| **Hackathons** | `/hackathons` | Route Link | National hackathon listings, campus-hosted hackathons, "100 Days of Sustainability" | Inspected |
| **For Colleges** | `/colleges` | Route Link | Institutional placement assistant overview, NIRF/NBA reporting, batch analytics, campus MOU CTA | Inspected |
| **Apply for MOU** | `/partner-mou` | Route Link | College partnership portal: institutional accreditation application form, state selector, status tracker | Implemented & Verified |
| **Accessibility Control** | Modal / Drawer | A11y Button | Interactive popup: Light/Dark theme toggle, 8 Languages (English, Hindi, Tamil, Telugu, Kannada, Bengali, Gujarati, Marathi), Text Sizing (Normal, Large, Extra Large), Reading Speed | Implemented & Verified |
| **Sign In** | `/auth/login` | Ghost CTA | Opens user authentication screen (`returnTo` aware) | Implemented & Verified |
| **Go to Dashboard / Get Started** | `/auth/signup` / `/student` | Primary CTA | If authenticated: route to role dashboard; if guest: route to register / pricing tier checkout | Implemented & Verified |
| **Mobile Drawer** | Slide-out menu | Responsive Nav | Full touch-friendly menu reproducing all 7 navigation items, Learn sub-items, and auth actions | Implemented & Verified |

---

## 3. Master Homepage Sections Audit (`/`)

The original DKODER homepage comprises 12 distinct functional modules:

| Section # | Section Name | Original URL / ID | Existing Content & Business Rules | Status |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **Hero & Primary Engine** | `#hero` / `/` | "The Placement LMS for Engineering Colleges Across India". Tagline: 12,500+ verified company questions, company-tagged questions, live coding lab, salary filters, entrance exam prep (TCS NQT, InfyTQ). Primary CTAs: "Get Started" (`/auth/signup`) and "Explore Questions" (`#practice`). | Implemented & Verified |
| **2** | **Student Query Bot (DKODER Dialogue)** | `#queries` | Interactive chatbot dialogue addressing real student aspirations: "I have a dream to get placed with a ₹10 LPA package", "I want to become a game developer", "I want to get placed at Zoho", "I want to be an ethical hacker", "I practise coding every day, but I don’t have a target". Provides roadmap answers. | Implemented & Verified |
| **3** | **Company Constellation & Target Prep** | `#constellation` | "Prepare for roles at top companies". Highlights 500+ tech recruiters categorized into salary tiers: Service-based (TCS, Infosys, Wipro, Cognizant, Hexaware) to Super Dream (Google, Microsoft, Amazon, Netflix, Uber, Atlassian). Live filter shortcuts. | Implemented & Verified |
| **4** | **Interview Worry Solver (Guidance)** | `#guidance` | "Interview tomorrow. Tap a thought below to see how to handle it." 12 interactive student anxiety cards: "Where do I even begin?", "Have I really improved?", "Will they ask me to code?", "What should I revise tonight?", "Can I reach that ₹10 LPA goal?", etc., with actionable solutions. | Implemented & Verified |
| **5** | **Focused Question Lab & Practice Demo** | `#practice` | "A deep question bank. Only a few for you. A FOCUSED PRACTICE DEMO". Interactive filtering by Company, Exam type (NQT, InfyTQ), Package band, Programming Language, and Difficulty Level. Live problem previews with unit tests and direct CTA to `/practice`. | Implemented & Verified |
| **6** | **Career Tracks & Placement Levels** | `#tracks` | 5 placement tiers with salary bands (0–3 LPA, 0–5 LPA, 0–7 LPA, 0–15 LPA, 15+ LPA). Milestone roadmaps for SDE, Data Systems, Service-to-Product, and Core Engineering. | Implemented & Verified |
| **7** | **Institutional LMS & Placement Assistant** | `#colleges` | "Hire a virtual placement assistant. Let's turn student potential into focused preparation." HOD cohort management, automated test generator, student risk alerts, NBA/NIRF compliance logs, and "Apply for MOU" CTA. | Implemented & Verified |
| **8** | **Transparent Pricing Plans** | `#plans` / `/pricing` | Official 5-tier pricing structure: **Bronze** (₹699/yr), **Silver** (₹999/yr), **Gold** (₹1,599/yr), **Platinum** (₹1,999/yr), **Super Dream Pack** (₹2,999/yr). Features comparison, daily cost breakdown (₹2–₹9/day), and "Get Scholarship" (`/partner-mou`). | Implemented & Verified |
| **9** | **XP Leaderboard & Habit Streak** | `#leaderboard` | Top student ranking podium, college university standings, XP tiers (Rookie 0 XP, Achiever 500 XP, Specialist 1,500 XP, Expert 3,500 XP, Master 7,500 XP), daily practice streak tracking. | Implemented & Verified |
| **10** | **Anti-Cheat & Examination Integrity** | `#security` | Anti-malpractice command center: tab switch tracking, browser proctoring, webcam integrity verification, cryptographic audit trail for college examinations. | Implemented & Verified |
| **11** | **Frequently Asked Questions (FAQs)** | `#faq` | Accordion answering queries on college eligibility, validity period, multi-year plans (up to 4 years), certificate authenticity, and technical requirements. | Implemented & Verified |
| **12** | **Footer & Government Accreditations** | `footer` | 8 official accreditations: MSME, DPIIT Startup India, ISO 9001:2015, MCA (Corporate Identification Number CIN), AICTE Internship Portal, National Career Service (NCS), NAPS, Skill India. Complete sitemap links, WhatsApp support (+91), email support. | Implemented & Verified |

---

## 4. Master Route-by-Route Inventory

Every route discovered in the production application bundle is cataloged below with its URL, access permissions, content, and redesign status:

### 4.1 Public & Educational Pages
| Route Path | Feature Name | Access Level | Original Purpose & Content | Status |
| :--- | :--- | :--- | :--- | :--- |
| `/` | Homepage | Public | Hero, chatbot query engine, company constellation, worry guidance, practice demo, tracks, institutional features, pricing, FAQs, footer. | Implemented & Verified |
| `/colleges` | Dkoder for Colleges | Public | Virtual placement assistant, principal & HOD dashboard preview, sample report viewer, student cohort tracking, MOU scheduling CTA. | Implemented & Verified |
| `/pricing` | Pricing & Plan Comparison | Public | Full comparison of Bronze (₹699), Silver (₹999), Gold (₹1,599), Platinum (₹1,999), Super Dream (₹2,999). 1–4 year multi-year toggle, scholarship eligibility. | Implemented & Verified |
| `/partner-mou` | Institutional MOU Application | Public | Multi-step partnership application for Universities, Affiliated Colleges, and Deemed Institutions across 36 Indian states/UTs. | Implemented & Verified |
| `/learn` | Learn Redirect | Public | Automatically redirects to `/learn/courses`. | Implemented & Verified |
| `/learn/courses` | Course Catalog | Public | Skill-based engineering programs, category filters (Web Dev, AI/ML, Cloud, DSA), syllabus breakdown, pricing, student testimonials. | Implemented & Verified |
| `/learn/courses/:courseId` | Course Details | Public | Comprehensive course curriculum, instructor bio, prerequisites, schedule, enrollment trigger. | Implemented & Verified |
| `/learn/courses/:courseId/payment` | Course Checkout | Auth/Public | Payment gateway interface with fee calculation, coupon code field, Razorpay/UPI gateway integration. | Implemented & Verified |
| `/learn/courses/:courseId/success` | Course Payment Success | Auth/Public | Enrollment confirmation, invoice receipt download, course start link. | Implemented & Verified |
| `/learn/events` | Events & Workshops | Public | Technical webinars, live hack prep sessions, workshop calendar, registration modal. | Implemented & Verified |
| `/learn/events/:id` | Event Details | Public | Speaker profile, session agenda, live link access instructions, registration CTA. | Implemented & Verified |
| `/learn/events/:id/register` | Event Registration | Auth/Public | Registration form, college roll number field, pass generation. | Implemented & Verified |
| `/learn/resources` | Resource Hub | Public | Video lectures (YouTube / Google Drive embeds), placement cheat sheets, interview experiences, downloadable PDFs. | Implemented & Verified |
| `/learn/resources/:slug` | Resource Detail | Public | Full article/video viewer with author credits and related topics. | Implemented & Verified |
| `/learn/certificates/verify` | Certificate Verification | Public | Authentic verification portal with QR code scanner and verification code input field. | Implemented & Verified |
| `/learn/certificates/verify/:verificationCode` | Certificate Verification Result | Public | Direct verification page displaying certificate authenticity, candidate name, issue date, and issuing authority. | Implemented & Verified |
| `/learn/certificates/:certificateId` | Certificate View | Public | High-resolution printable digital certificate with verified badge. | Implemented & Verified |
| `/final-year-projects` | Final Year Projects | Public | Guidance, mentorship, research publication aid. Project domains: Web, Mobile, AI/ML, Cybersecurity, IoT. Team join option. | Implemented & Verified |
| `/final-year-projects/join/:code` | FYP Team Join | Public | Enter 6-digit project team code to join an existing final year project group. | Implemented & Verified |
| `/final-year-projects/:id` | FYP Project Details | Public | Project abstract, tech stack requirements, weekly milestones, mentor details. | Implemented & Verified |
| `/final-year-projects/:id/enrol` | FYP Enrollment | Auth/Public | Project registration form with college NOC upload option. | Implemented & Verified |
| `/certifications` | Certifications Redirect | Public | Redirects to `/certifications/topic`. | Implemented & Verified |
| `/certifications/topic` | Topic Wise Certifications | Public | Certifications organized by field: Cyber Security (CEH, CND, CHFI), Cloud Computing, Full Stack, Data Science, AI. | Implemented & Verified |
| `/certifications/technology` | Technology Certifications | Public | Certifications organized by vendor: Oracle (Java SE 8/11/17/21, OCI Generative AI), AWS, Microsoft Azure, Cisco. | Implemented & Verified |
| `/certifications/detail/:certId`| Certification Details | Public | Exam code, prerequisites, passing score, exam fee, practice tests included. | Implemented & Verified |
| `/certifications/:type/:categoryId`| Category Certifications | Public | Filtered certification list by type and category. | Implemented & Verified |
| `/hackathons` | Hackathon Directory | Public | Live, upcoming, and past national hackathons with prize pools and team registration links. | Implemented & Verified |
| `/hackathons/100-days` | 100 Days of Sustainability | Public | Flagship campus hackathon series where DKoder team travels directly to campuses. Booking & schedule tracker. | Implemented & Verified |
| `/hackathons/100-days/benefits` | Campus Hackathon Benefits | Public | Institutional benefits: student engagement metrics, industry jury, media coverage, prizes. | Implemented & Verified |
| `/hackathons/100-days/request/:token` | Campus Booking Request | Public | Form for college HODs or student leads to request an on-campus hackathon date. | Implemented & Verified |
| `/hackathons/:id` | Hackathon Details | Public | Hackathon themes, problem statements, timeline, evaluation rubric, submission guidelines. | Implemented & Verified |
| `/hackathons/:id/register` | Hackathon Registration | Auth/Public | Team creation or solo registration form with member email invites. | Implemented & Verified |
| `/hackathons/:id/join/:code` | Hackathon Team Join | Auth/Public | Team join interface using secret team invitation code. | Implemented & Verified |
| `/hackathons/ticket/:code` | Hackathon Pass / Ticket | Public | Digital participant ticket with QR code for campus hackathon check-in. | Implemented & Verified |
| `/practice` | Practice Hub | Public/Student | Question lab navigation: MCQ practice, coding practice, company platforms, progress tracking. | Implemented & Verified |
| `/practice/coding` | Coding Practice Arena | Public/Student | Algorithm & DSA problem bank with tags for companies (TCS, Infosys, Amazon, etc.), difficulty, and topic. | Implemented & Verified |
| `/practice/coding/:id` | Coding Workspace | Public/Student | Full IDE code editor with multi-language execution (TypeScript, Python, C++, Java), test case runner, console output. | Implemented & Verified |
| `/practice/platforms` | Platform Arena | Public/Student | Targeted company entrance exam simulations (TCS NQT, Infosys InfyTQ, Wipro NLTH, Accenture). | Implemented & Verified |
| `/practice/progress` | Student Practice Progress | Student | Visual skill radar, solved questions counter, streak tracker, performance by topic. | Implemented & Verified |
| `/practice/mcq/session` | MCQ Test Session | Student | Timed multiple-choice exam interface with navigation grid, flag question, timer, and submit modal. | Implemented & Verified |
| `/problems` | Problems List | Public | Direct problem catalog with search, company tags, and acceptance rates. | Implemented & Verified |
| `/problems/:id` | Problem Solver | Public | Problem description, constraints, examples, and embedded code editor. | Implemented & Verified |
| `/challenges` | Coding Challenges | Public | Weekly sprint challenges, timed algorithmic contests, challenge leaderboards. | Implemented & Verified |
| `/leaderboard` | National XP Leaderboard | Public | Real-time student XP leaderboard, college rankings, weekly top-coders podium. | Implemented & Verified |
| `/results` | Assessment Results | Public/Student | Score breakdown, percentile ranking, detailed solution keys, AI-generated improvement advice. | Implemented & Verified |

### 4.2 Authentication & User Access
| Route Path | Feature Name | Access Level | Original Purpose & Content | Status |
| :--- | :--- | :--- | :--- | :--- |
| `/auth` | Auth Redirect | Public | Redirects to `/auth/login`. | Implemented & Verified |
| `/auth/login` | Student / User Sign In | Public | Email / password login, Google OAuth (`760833375886...`), "Forgot password?", `returnTo` redirect handler. | Implemented & Verified |
| `/auth/signup` | Student Registration | Public | Full name, email, password, college selection, graduation year, degree/branch. | Implemented & Verified |
| `/auth/institution` | Institutional Sign In | Public | Dedicated sign-in portal for College Principals, Placement Officers, and HODs. | Implemented & Verified |

### 4.3 Authenticated Student Portal (`/student/*`)
| Route Path | Feature Name | Access Level | Original Purpose & Content | Status |
| :--- | :--- | :--- | :--- | :--- |
| `/student` & `/student/dashboard` | Student Dashboard | `student` | Assessment stages progress bar, current streak, recommended questions, recent test results. | Inspected |
| `/exam-player` | Proctored Exam Player | `student` | Formal placement test simulator with anti-cheat monitoring, fullscreen enforcement, question timer. | Inspected |
| `/student/resume` | Resume Upload Stage | `student` | Automated resume parsing, ATS score check, skill extraction. | Inspected |
| `/student/aptitude` | Aptitude Assessment Stage | `student` | Quantitative, verbal, and logical reasoning test series. | Inspected |
| `/student/coding` | Coding Assessment Stage | `student` | Placement coding round with hidden test cases and performance benchmarks. | Inspected |
| `/student/interview` | AI HR Interview Stage | `student` | Simulated HR and technical interview questions with speech-to-text feedback. | Inspected |
| `/student/subscription` | Student Subscription | `student` | Current active plan status, expiry date, upgrade options to Gold/Platinum/Super Dream. | Inspected |
| `/student/learn` | My Learning | `student` | Enrolled courses, registered events, ongoing hackathons, and joined projects. | Inspected |
| `/student/learn/enrollments` | Enrolled Courses | `student` | Course progress, video lessons, lecture notes, certificates. | Inspected |
| `/student/learn/registrations`| Event Registrations | `student` | Passes and join links for registered workshops and live webinars. | Inspected |
| `/student/learn/certificates` | My Certificates | `student` | Earned course completion and hackathon participation certificates. | Inspected |
| `/student/learn/hackathons` | My Hackathons | `student` | Joined hackathon teams, stage submissions, mentor feedback. | Inspected |
| `/student/learn/projects` | My Projects | `student` | Final year project repository, team members, milestone submission portal. | Inspected |
| `/student/calendar` | Activity Calendar | `student` | Monthly calendar displaying upcoming campus placement tests, hackathons, and daily streak goals. | Inspected |
| `/student/analytics` | Personal Analytics | `student` | Deep performance analytics: topic strengths/weaknesses, speed vs accuracy, national percentile. | Inspected |
| `/student/settings` | Account Settings | `student` | Profile details, college affiliation update, password change, notification preferences. | Inspected |

### 4.4 Institutional & Administrative Portals
| Portal Base Route | Role | Sub-Routes & Capabilities | Status |
| :--- | :--- | :--- | :--- |
| `/college-admin` | `college_admin` | `/college-admin`, `/exams`, `/generate`, `/analytics` — Campus-wide placement analytics, automated test paper generator, HOD activity monitoring. | Inspected |
| `/hod` | `hod` | `/hod`, `/analytics`, `/exams`, `/generate`, `/institution-users`, `/performance-reports`, `/students` — Department cohort tracking, risk detection for unplaced students, exam scheduling. | Inspected |
| `/instructor` | `instructor` | `/instructor`, `/exam-builder`, `/exams`, `/generate`, `/mou`, `/question-bank`, `/question-review`, `/bundles`, `/test-series`, `/academic-hierarchy`, `/academic-subjects`, `/learn/*` — Full curriculum and test creation suite. | Inspected |
| `/intern` | `intern` | `/intern`, `/add-mcq`, `/add-coding`, `/my-submissions`, `/browse` — Content creation and question review pipeline. | Inspected |

---

## 5. Visual Design System & Brand Identity Tokens

In accordance with Phase Five of the redesign rules, the redesigned presentation applies a unified, bright, cinematic DKODER design system:

| Token Name | Value | Purpose / Usage |
| :--- | :--- | :--- |
| `--bg-canvas` | `#FFFFFF` / `#FFFDF5` | Warm ivory and crisp white surfaces; high visual clarity |
| `--color-primary` | `#17191C` | Deep ink / charcoal typography and structural borders (minimum 4.5:1 contrast) |
| `--color-accent` | `#F5FF38` / `#FCC419` | Electric yellow brand accent for active pills, primary buttons, badges, highlights |
| `--color-violet` | `#8875FF` / `#7C3AED` | Restrained violet accent for technical tags, AI report cards, and focus states |
| `--color-surface` | `#FFFFFF` | Card backgrounds with subtle warm grey borders (`#E5E7EB` / `#E2E8F0`) |
| `--color-muted` | `#64748B` | Secondary body text and metadata labels |
| `--font-heading` | `'JetBrains Mono', 'Bricolage Grotesque', sans-serif` | Technical, crisp, modern developer aesthetic |
| `--font-body` | `'IBM Plex Sans', 'DM Sans', sans-serif` | Highly legible, clean prose and tabular numbers |
| `--shadow-card` | `0 4px 20px -2px rgba(23, 25, 28, 0.06)` | Elegant soft depth without dark murky shadows |
| `--shadow-hover` | `0 12px 30px -4px rgba(23, 25, 28, 0.12)` | Dynamic hover feedback |

### 3D Visual Guidelines:
- Real-time Three.js orbital canvases and company constellation visualizers must exist strictly as clean presentation layers.
- Canvases must never block mouse clicks or obscure HTML headings, navigation, or CTAs (`pointer-events: none` on interactive background canvases).
- Standard accessible HTML controls must remain fully keyboard-navigable and screen-reader accessible.

---

## 6. Implementation Checklist & Phase Roadmap

Below is the route-by-route execution checklist to be completed sequentially:

- [x] **Phase 1: Discovery Audit & Master Inventory Creation** (`DKODER-REDESIGN-INVENTORY.md` established).
- [x] **Phase 2: Universal Navigation & Header/Footer Redesign**:
  - [x] Implement full 7-item `Navbar` with authentic `Learn` dropdown (Courses, Events, Resources, Final Year Projects, Topic Wise, Technology Wise).
  - [x] Implement interactive `AccessibilityMenu` modal (Theme, 8 languages, text size, reader speed).
  - [x] Implement mobile navigation drawer reproducing all 7 menu destinations.
  - [x] Implement authentic `Footer` with all 4 link columns and 8 government/industry accreditations (MSME, DPIIT, ISO, MCA/CIN, AICTE, NCS, NAPS, Skill India).
- [x] **Phase 3: Complete Homepage Redesign (`/`)**:
  - [x] Section 1: Hero & Primary Engine with authentic CTAs.
  - [x] Section 2: Student Query Chatbot dialogue (5 real student aspirations).
  - [x] Section 3: Company Constellation & Target Prep (500+ companies, package filters).
  - [x] Section 4: Interview Tomorrow Worry Solver (12 interactive cards).
  - [x] Section 5: Focused Question Lab with 5 active filters (Company, Exam, Package, Language, Level).
  - [x] Section 6: Career Tracks & Placement Levels (0–3 LPA to 15+ LPA).
  - [x] Section 7: Institutional LMS & Virtual Placement Assistant.
  - [x] Section 8: 5-Tier Pricing Plans (Bronze, Silver, Gold, Platinum, Super Dream Pack).
  - [x] Section 9: National XP Leaderboard & Habit Streaks.
  - [x] Section 10: Anti-Cheat & Examination Security.
  - [x] Section 11: FAQs Accordion.
  - [x] Section 12: Final CTA Banner.
- [x] **Phase 4: Learn & Programmes Pages Implementation**:
  - [x] `/learn/courses` (Course Catalog & detail view modal / route).
  - [x] `/learn/events` (Workshops & live session calendar).
  - [x] `/learn/resources` (Guides, video hub, interview experiences).
  - [x] `/final-year-projects` (Mentorship, domain tracks, team join by code).
  - [x] `/certifications/topic` (Topic-wise certifications: Cybersecurity, Cloud, AI).
  - [x] `/certifications/technology` (Vendor certifications: Oracle, Azure, AWS).
  - [x] `/learn/certificates/verify` (Authentic certificate verification with QR / code lookup).
  - [x] `/hackathons` & `/hackathons/100-days` (Campus hackathons, 100 Days of Sustainability).
- [x] **Phase 5: Institutional & Public Information Pages Implementation**:
  - [x] `/colleges` (Virtual Placement Assistant for Principals, HODs, Placement Officers).
  - [x] `/partner-mou` (Official Institutional Partnership & MOU Application Form with state picker).
  - [x] `/pricing` (Comprehensive Plan Comparison Matrix with multi-year degree multipliers).
- [x] **Phase 6: Practice & Problem Solving Arena Pages**:
  - [x] `/practice` (Practice Hub with MCQ, Coding, and Platform entry points).
  - [x] `/practice/coding` & `/practice/coding/:id` (Coding problem workspace & runner).
  - [x] `/practice/platforms` (TCS NQT, InfyTQ, Wipro NLTH platform arena).
  - [x] `/leaderboard` (Dedicated national university & student leaderboard).
- [x] **Phase 7: Authentication & Dashboard Bridge**:
  - [x] `/auth/login` & `/auth/signup` (Authentic login/registration UI).
  - [x] `/auth/institution` (Institutional sign-in UI).
  - [x] Student Dashboard (`/student`) and role routing bridge preserving authentic backend authentication token checks.
- [x] **Phase 8: End-to-End Verification & Quality Assurance**:
  - [x] Linting and TypeScript build validation (`npm run build`).
  - [x] Responsive testing across 375px, 768px, 1024px, 1440px.
  - [x] Link destination and dropdown interaction tests.
  - [x] Accessibility contrast and keyboard navigation verification.
