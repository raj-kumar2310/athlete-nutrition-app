import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useUserStore } from './stores/userStore'
import InjuryAssistant from './pages/Injuryassistant'


// Pages
import FirstAid from './pages/FirstAid'

import Welcome from './pages/Welcome'
import PersonalInfo from './pages/PersonalInfo'
import Home from './pages/Home'
import TrainingDay from './pages/TrainingDay'
import CompetitionDay from './pages/CompetitionDay'
import NutritionCalculator from './pages/NutritionCalculator'
import Profile from './pages/Profile'
import { Performance } from './pages/PerformanceRecoveryWeight'
import { Recovery } from './pages/PerformanceRecoveryWeight'
import { WeightManagement } from './pages/PerformanceRecoveryWeight'

function App() {
  const { theme } = useUserStore()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/setup" element={<PersonalInfo />} />
        <Route path="/home" element={<Home />} />
        <Route path="/training" element={<TrainingDay />} />
        <Route path="/competition" element={<CompetitionDay />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/weight" element={<WeightManagement />} />
        <Route path="/firstaid" element={<FirstAid />} />
        <Route path="/injury" element={<InjuryAssistant />} />

        <Route path="/calculator" element={<NutritionCalculator />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App