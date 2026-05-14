import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState, Suspense, lazy } from 'react'
import { useUserStore } from './stores/userStore'
import OnboardingTour from './components/OnboardingTour'
import InstallPrompt from './components/InstallPrompt'

// Lazy load pages for better performance
const InjuryAssistant = lazy(() => import('./pages/Injuryassistant'))
const DailyCompanion = lazy(() => import('./pages/DailyCompanion'))
const Login = lazy(() => import('./pages/Login'))
const FirstAid = lazy(() => import('./pages/FirstAid'))
const Welcome = lazy(() => import('./pages/Welcome'))
const PersonalInfo = lazy(() => import('./pages/PersonalInfo'))
const Home = lazy(() => import('./pages/Home'))
const TrainingDay = lazy(() => import('./pages/TrainingDay'))
const CompetitionDay = lazy(() => import('./pages/CompetitionDay'))
const NutritionCalculator = lazy(() => import('./pages/NutritionCalculator'))
const ProgressTracker = lazy(() => import('./pages/ProgressTracker'))
const Profile = lazy(() => import('./pages/Profile'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const SleepNutrition = lazy(() => import('./pages/SleepNutrition'))
// Loading fallback component
const LoadingFallback = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }}>
    <div style={{ textAlign: 'center', color: '#999' }}>
      <div style={{ fontSize: 12, animation: 'pulse 2s infinite' }}>Loading...</div>
    </div>
  </div>
)

// Lazy load named exports with dynamic imports
const Performance = lazy(() => import('./pages/PerformanceRecoveryWeight').then(mod => ({ default: mod.Performance })))
const Recovery = lazy(() => import('./pages/PerformanceRecoveryWeight').then(mod => ({ default: mod.Recovery })))
const WeightManagement = lazy(() => import('./pages/PerformanceRecoveryWeight').then(mod => ({ default: mod.WeightManagement })))

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
      <Suspense fallback={<LoadingFallback />}>
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
          <Route path="/sleep-nutrition" element={<SleepNutrition />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
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