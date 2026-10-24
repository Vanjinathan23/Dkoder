# DKODER — The Career Engine 🚀

> High-performance, modern 3D placement engine and comprehensive career intelligence platform for engineering students, universities, and technical recruiters.

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?logo=three.js&logoColor=white)](https://threejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🌟 Executive Summary

**DKODER** is an advanced placement LMS and career readiness platform designed to bridge the gap between engineering education and top-tier tech employment. Built with an electric high-energy aesthetic, real-time 3D orbital telemetry, an interactive AI 3D guide companion, and full-featured institutional management tools.

---

## ✨ Key Highlights & Architecture

### 1. 🤖 Interactive 3D AI Guide Companion & Website Tour
- **3D Living Character**: Fluid, 100% transparent animated robot character with continuous idle breathing, eye glow, and natural 3D turning-to-speak transitions.
- **Multilingual Speech Synthesis**: Web Speech API audio pipeline supporting English, Tamil, Tanglish, and Hindi with automatic speech unlocking and voice fallback.
- **Guided Website Tour**: 8-stop interactive walkthrough with synchronized spatial waypoints, spotlight highlights, HUD controller, and keyboard shortcuts (`Escape`, `Space`, `Arrow Keys`).
- **Contextual Intent Engine**: Natural language understanding for navigating directly to practice labs, pricing tiers, college partnerships, and placement roadmaps.

### 2. 🌌 3D Visual Experience (Three.js & WebGL)
- **Company Constellation 3D**: Real-time orbital network connecting students to Google, Microsoft, Meta, Amazon, and Tier-1 recruiters.
- **Career Studio & Quantum Core**: Procedural particle meshes, dynamic lighting, metallic/ceramic PBR shaders, and fluid mouse/scroll parallax telemetry.

### 3. 💻 Interactive Question Lab & Browser IDE
- **12,500+ Verified Coding Challenges**: Company-tagged questions spanning Google, Amazon, Zoho, TCS, and Infosys.
- **In-Browser Code Runner**: Multi-language support (TypeScript, Python, C++, Java) with live test case evaluation, complexity telemetry, and execution feedback.

### 4. 🧭 Complete Platform Route Architecture
- **Home (`/`)**: Placement Hero Studio, Student Query Resolver, 3D Constellations, Interview Dilemma Solver, Question Discovery Lab, Salary Bands, and College Hub.
- **Learn Hub (`/learn/*`)**: Skill-based Courses (`/learn/courses`), Live Workshops & Events (`/learn/events`), Placement Resource Vault (`/learn/resources`), and Final Year Project Mentorship (`/final-year-projects`).
- **Certifications**: Topic-based (`/certifications/topic`), Technology-track prep (`/certifications/technology`), and Certificate Verification (`/learn/certificates/verify`).
- **Colleges & Institutional MOU**: Campus Placement Assistant overview (`/colleges`) and Official Partnership Application portal (`/partner-mou`).
- **Student Arena & Dashboard**: Role dashboard (`/student`), National Leaderboard (`/leaderboard`), and Coding Arena (`/platform/arena`).

### 5. ♿ Accessibility & Kinetic Motion System
- **Accessibility Control Panel**: Light/Dark theme toggle, 8 language options, text scaling (Normal, Large, Extra Large), and screen reader optimization.
- **Lenis Smooth Scroll**: Inertial smooth scrolling calibrated with isolated scroll containers (`data-lenis-prevent`) for modals and drawers.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript, Vite 5 |
| **Routing** | React Router v6 (SPA client routing) |
| **3D Graphics & Shaders** | Three.js (`@types/three`), WebGL |
| **Motion & Dynamics** | Motion for React (`framer-motion`), Lenis Scroll |
| **Audio & Speech** | Web Speech Synthesis API, Web AudioContext, SpeechRecognition |
| **Styling & Design System** | Vanilla CSS Design Tokens, BEM-modular CSS, CSS Glassmorphism |
| **Iconography** | Lucide React |

---

## 📁 Project Directory Structure

```text
dkoder/
├── public/
│   ├── assets/               # 3D robot animations, character WebPs, hero posters
│   └── favicon.svg           # DKODER brand favicon
├── src/
│   ├── companion/            # AI Guide Companion (Robot visual, Audio, Tour HUD, Intent engine)
│   ├── components/
│   │   ├── 3d/               # Three.js canvases (Constellation, Orbit, Studio, Quantum)
│   │   ├── home/             # Homepage section modules (Hero, Queries, Lab, Tracks, FAQ)
│   │   └── layout/           # Shared layout (Navbar, Footer, AccessibilityMenu, SmoothScroll)
│   ├── pages/                # 17 authentic route views (Home, Courses, MOU, Pricing, etc.)
│   ├── styles/               # Design tokens, smooth scrolling, and cinematic animations
│   ├── App.tsx               # Client router and route definitions
│   └── main.tsx              # Application entry point
├── .env.example              # Environment variables template
├── .gitignore                # Clean production ignore rules
├── index.html                # Entry HTML with asset preloads & SEO metadata
├── package.json              # Project scripts and dependencies
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite build and dev server config
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher) or **yarn** / **pnpm**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Vanjinathan23/Dkoder.git

# 2. Navigate into the repository directory
cd Dkoder

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Visit [http://localhost:5173/](http://localhost:5173/) to explore the application locally.

---

## 📦 Production Build & Testing

```bash
# Run TypeScript typecheck & production build
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) © [DKODER](https://dkoder.co.in/).
