
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/hero'
import RidesList from './components/RidesList'
import CreateRideModal from './components/CreateRideModal'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  const [showCreate, setShowCreate] = useState(false)

  return (
    <>
      <Header onCreateRide={() => setShowCreate(true)} />
      <Routes>
        <Route path="/" element={<Hero onCreateRide={() => setShowCreate(true)} />} />
        <Route path="/rides" element={<RidesList />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Footer />
      {showCreate && <CreateRideModal onClose={() => setShowCreate(false)} />}
    </>
  )
}
