import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useUserStore } from './stores/userStore'
import OnboardingTour from './components/OnboardingTour'
import InstallPrompt from './components/InstallPrompt'
import InjuryAssistant from './pages/Injuryassistant'
import DailyCompanion from './pages/DailyCompanion'
import Login from './pages/Login'


// Pages
import FirstAid from './pages/FirstAid'

import Welcome from './pages/Welcome'
import PersonalInfo from './pages/PersonalInfo'
import Home from './pages/Home'
import TrainingDay from './pages/TrainingDay'
import CompetitionDay from './pages/CompetitionDay'
import NutritionCalculator from './pages/NutritionCalculator'
import ProgressTracker from './pages/ProgressTracker'
import Profile from './pages/Profile'
import SearchPage from './pages/SearchPage'
import { Performance } from './pages/PerformanceRecoveryWeight'
import { Recovery } from './pages/PerformanceRecoveryWeight'
import { WeightManagement } from './pages/PerformanceRecoveryWeight'

function App() {
  const { theme } = useUserStore()
  const { isLoggedIn } = useUserStore()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <BrowserRouter>
      <OnboardingTourWrapper />
      <InstallPrompt />
      <Routes>
        <Route path="/auth" element={isLoggedIn ? <Navigate to="/home" replace /> : <Login />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/setup" element={<PersonalInfo />} />
        <Route path="/home" element={<Home />} />
        <Route path="/training" element={<TrainingDay />} />
        <Route path="/competition" element={<CompetitionDay />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/weight" element={<WeightManagement />} />
        <Route path="/firstaid" element={<FirstAid />} />
        <Route path="/progress" element={<ProgressTracker />} />
        <Route path="/injury" element={<InjuryAssistant />} />
        <Route path="/daily" element={<DailyCompanion />} />

        <Route path="/calculator" element={<NutritionCalculator />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

function OnboardingTourWrapper() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    try {
      const seen = localStorage.getItem('tour-seen')
      if (!seen) setShow(true)
    } catch (e) {}
  }, [])
  if (!show) return null
  return <OnboardingTour onFinish={() => setShow(false)} />
}

export default App