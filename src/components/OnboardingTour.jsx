import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function OnboardingTour({ onFinish }) {
  const [step, setStep] = useState(1)
  const total = 4

  useEffect(() => {
    // prevent background scroll while tour active
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const next = () => {
    if (step >= total) {
      localStorage.setItem('tour-seen', 'true')
      onFinish && onFinish()
    } else setStep(s => s + 1)
  }

  const skip = () => {
    localStorage.setItem('tour-seen', 'true')
    onFinish && onFinish()
  }

  // Simple anchor positions for spotlight; these target common page elements by data-tour attribute
  const targets = {
    1: { selector: '[data-tour="home-overview"]' },
    2: { selector: '[data-tour="training-card"]' },
    3: { selector: '[data-tour="competition-card"]' },
    4: { selector: '[data-tour="firstaid-card"]' },
  }

  const getSpot = () => {
    try {
      const sel = targets[step].selector
      const el = document.querySelector(sel)
      if (!el) return null
      const rect = el.getBoundingClientRect()
      return rect
    } catch (e) { return null }
  }

  const spot = getSpot()

  return (
    <AnimatePresence>
      <motion.div key="tour" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 2000 }}>
        {/* dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.72)' }} />

        {/* spotlight cutout using clip-path if spot available */}
        {spot && (
          <div style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
            <svg width="100%" height="100%" style={{ display: 'block' }}>
              <defs>
                <mask id="m">
                  <rect x="0" y="0" width="100%" height="100%" fill="white" />
                  <rect x={spot.x} y={spot.y} width={Math.max(spot.width, 120)} height={Math.max(spot.height, 48)} rx="12" fill="black" />
                </mask>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="rgba(0,0,0,0.72)" mask="url(#m)" />
            </svg>
          </div>
        )}

        {/* Skip button */}
        <div style={{ position: 'fixed', top: 18, right: 18, zIndex: 2010 }}>
          <button onClick={skip} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', padding: 8, borderRadius: 8, cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>

        {/* Bottom sheet */}
        <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.3 }} style={{ position: 'fixed', left: 16, right: 16, bottom: 16, zIndex: 2010 }}>
          <div style={{ background: '#121212', borderRadius: 12, padding: 16, border: `2px solid #FF4D00`, boxShadow: '0 8px 30px rgba(0,0,0,0.6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ color: '#FF4D00', fontWeight: 800 }}>{`Step ${step} of ${total}`}</div>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: 16 }}>
                {step === 1 && 'Welcome to AthleteEats ⚡'}
                {step === 2 && 'Pick your training type'}
                {step === 3 && 'Get competition nutrition'}
                {step === 4 && "Injury? We've got you"}
              </div>
              <div style={{ width: 40 }} />
            </div>
            <div style={{ color: 'rgba(255,255,255,0.9)', marginBottom: 12 }}>
              {step === 1 && 'Overview of the Home page and quick access to tools.'}
              {step === 2 && 'Tap Training Day to plan sessions and nutrition.'}
              {step === 3 && 'Competition Day gives targeted pre-race meal plans.'}
              {step === 4 && 'Quick first-aid guidance and injury logging.'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {Array.from({ length: total }).map((_, i) => (
                  <div key={i} style={{ width: 8, height: 8, borderRadius: 99, background: i + 1 === step ? '#FF4D00' : 'rgba(255,255,255,0.12)' }} />
                ))}
              </div>
              <button onClick={next} style={{ padding: '10px 14px', background: '#FF4D00', border: 'none', color: '#fff', borderRadius: 10, cursor: 'pointer' }}>{step === total ? 'Finish' : 'Next'}</button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
