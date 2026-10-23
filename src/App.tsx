import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Catch-all: redirect unmatched routes to homepage for this prototype */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}
