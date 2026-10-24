import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import EventsPage from './pages/EventsPage'
import ResourceHubPage from './pages/ResourceHubPage'
import FinalYearProjectsPage from './pages/FinalYearProjectsPage'
import TopicCertificationsPage from './pages/TopicCertificationsPage'
import TechCertificationsPage from './pages/TechCertificationsPage'
import CertificateVerifyPage from './pages/CertificateVerifyPage'
import HackathonsPage from './pages/HackathonsPage'
import CollegesPage from './pages/CollegesPage'
import PartnerMOUPage from './pages/PartnerMOUPage'
import PricingPage from './pages/PricingPage'
import PracticeHubPage from './pages/PracticeHubPage'
import CodingPracticePage from './pages/CodingPracticePage'
import PlatformArenaPage from './pages/PlatformArenaPage'
import LeaderboardPage from './pages/LeaderboardPage'
import AuthPage from './pages/AuthPage'
import StudentDashboardPage from './pages/StudentDashboardPage'
import DkoderCompanion from './companion/DkoderCompanion'
import SmoothScrollProvider from './components/layout/SmoothScrollProvider'

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <Routes>
        {/* Core Public & Landing Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/colleges" element={<CollegesPage />} />
        <Route path="/partner-mou" element={<PartnerMOUPage />} />
        <Route path="/pricing" element={<PricingPage />} />

        {/* Learn & Educational Subtree */}
        <Route path="/learn" element={<Navigate to="/learn/courses" replace />} />
        <Route path="/learn/courses" element={<CoursesPage />} />
        <Route path="/learn/courses/:courseId" element={<CoursesPage />} />
        <Route path="/learn/events" element={<EventsPage />} />
        <Route path="/learn/events/:id" element={<EventsPage />} />
        <Route path="/learn/resources" element={<ResourceHubPage />} />
        <Route path="/learn/resources/:slug" element={<ResourceHubPage />} />
        <Route path="/final-year-projects" element={<FinalYearProjectsPage />} />
        <Route path="/final-year-projects/join/:code" element={<FinalYearProjectsPage />} />

        {/* Certifications Subtree */}
        <Route path="/certifications" element={<Navigate to="/certifications/topic" replace />} />
        <Route path="/certifications/topic" element={<TopicCertificationsPage />} />
        <Route path="/certifications/technology" element={<TechCertificationsPage />} />
        <Route path="/learn/certificates/verify" element={<CertificateVerifyPage />} />
        <Route path="/learn/certificates/verify/:verificationCode" element={<CertificateVerifyPage />} />

        {/* Hackathons Subtree */}
        <Route path="/hackathons" element={<HackathonsPage />} />
        <Route path="/hackathons/100-days" element={<HackathonsPage />} />
        <Route path="/hackathons/100-days/benefits" element={<HackathonsPage />} />

        {/* Practice & Problem Solving Arena */}
        <Route path="/practice" element={<PracticeHubPage />} />
        <Route path="/practice/coding" element={<CodingPracticePage />} />
        <Route path="/practice/coding/:id" element={<CodingPracticePage />} />
        <Route path="/practice/platforms" element={<PlatformArenaPage />} />
        <Route path="/problems" element={<PracticeHubPage />} />
        <Route path="/problems/:id" element={<CodingPracticePage />} />
        <Route path="/challenges" element={<PracticeHubPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />

        {/* Authentication Subtree */}
        <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
        <Route path="/auth/login" element={<AuthPage initialMode="login" />} />
        <Route path="/auth/signup" element={<AuthPage initialMode="signup" />} />
        <Route path="/auth/institution" element={<AuthPage initialMode="institution" />} />

        {/* Authenticated Candidate Dashboard */}
        <Route path="/student" element={<StudentDashboardPage />} />
        <Route path="/student/dashboard" element={<StudentDashboardPage />} />

        {/* Catch-all: Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <DkoderCompanion />
      </SmoothScrollProvider>
    </BrowserRouter>
  )
}
