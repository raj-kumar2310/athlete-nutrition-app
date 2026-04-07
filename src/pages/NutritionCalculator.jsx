import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Flame, Zap, Dumbbell, Wind, Timer, ChevronDown, RotateCcw, TrendingUp, ArrowLeft } from 'lucide-react'
import { useUserStore } from '../stores/userStore'
import { calculateCaloriesBurned, calculateMacros, calculateRecommendedIntake, calculateHydration } from '../utils/calorieCalculator'
import { useTheme } from '../hooks/useTheme'
import BottomNav from '../components/BottomNav'

const activities = [
  { id: 'sprint_100m', label: '100M Sprint',      icon: Zap,        met: 23, color: '#FF4D00' },
  { id: 'sprint_400m', label: '400M Sprint',      icon: Wind,       met: 19, color: '#FF6B00' },
  { id: 'sprint_800m', label: '800M Run',         icon: Wind,       met: 15, color: '#FF8000' },
  { id: 'running_5k',  label: '5K Run',           icon: TrendingUp, met: 11, color: '#FF8C00' },
  { id: 'marathon',    label: 'Marathon',         icon: Timer,      met: 13, color: '#FFA500' },
  { id: 'cycling',     label: 'Cycling',          icon: Wind,       met: 10, color: '#FFB347' },
  { id: 'strength',    label: 'Strength Training',icon: Dumbbell,   met: 6,  color: '#E63946' },
  { id: 'swimming',    label: 'Swimming',         icon: Wind,       met: 9,  color: '#FF4D6D' },
  { id: 'hiit',        label: 'HIIT',             icon: Flame,      met: 14, color: '#FF3057' },
  { id: 'basketball',  label: 'Basketball',       icon: Zap,        met: 8,  color: '#FF7A00' },
  { id: 'football',    label: 'Football',         icon: Wind,       met: 9,  color: '#FF5722' },
  { id: 'badminton',   label: 'Badminton',        icon: Zap,        met: 7,  color: '#FF4081' },
]

function MacroBar({ label, grams, color, percent, delay, bg3, text3 }) {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay, duration: 0.5 }} style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ color: text3, fontSize: 12, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1 }}>{label}</span>
        <span style={{ color: color, fontSize: 13, fontWeight: 700 }}>{grams}g</span>
      </div>
      <div style={{ background: bg3, borderRadius: 6, height: 8, overflow: 'hidden' }}>
        <motion.div initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ delay: delay + 0.2, duration: 0.8, ease: 'easeOut' }}
          style={{ height: '100%', background: color, borderRadius: 6 }} />
      </div>
    </motion.div>
  )
}

export default function NutritionCalculator() {
  const navigate = useNavigate()
  const { weight: userWeight, goal } = useUserStore()
  const { bg, bg2, bg3, border, text, text2, text3, input } = useTheme()
  const [weight, setWeight] = useState(userWeight || '')
  const [duration, setDuration] = useState('')
  const [selected, setSelected] = useState(null)
  const [result, setResult] = useState(null)
  const [dropOpen, setDropOpen] = useState(false)

  const calculate = () => {
    if (!selected || !weight || !duration) return
    const act = activities.find(a => a.id === selected)
    const burned   = calculateCaloriesBurned(act.met, parseFloat(weight), parseFloat(duration))
    const intake   = calculateRecommendedIntake(burned, goal || 'performance')
    const macros   = calculateMacros(intake, goal || 'performance')
    const hydration = calculateHydration(parseFloat(weight), parseFloat(duration))
    setResult({ burned, intake, macros, hydration, actColor: act.color })
  }

  const selectedAct = activities.find(a => a.id === selected)
  const disabled = !selected || !weight || !duration

  return (
    <div style={{ minHeight: '100vh', background: bg, paddingBottom: 80, transition: 'background 0.3s' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '56px 24px 24px' }}>
        <button onClick={() => navigate('/home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: text3, marginBottom: 24, padding: 0 }}>
          <ArrowLeft size={16} /> <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, fontSize: 14 }}>HOME</span>
        </button>
        <p style={{ color: text3, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 8 }}>Fuel Calculator</p>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 44, fontWeight: 900, color: text, letterSpacing: -1, margin: '0 0 28px' }}>Nutrition<br /><span style={{ color: '#FF4D00' }}>Calculator</span></h1>

        {/* Form */}
        <div style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 20, padding: 20, marginBottom: 16, transition: 'all 0.3s' }}>
          {/* Dropdown */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>Activity</label>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setDropOpen(!dropOpen)} style={{ width: '100%', background: input, border: `1px solid ${selectedAct ? selectedAct.color + '44' : border}`, borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.3s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {selectedAct
                    ? <><div style={{ width: 8, height: 8, borderRadius: '50%', background: selectedAct.color }} /><span style={{ color: text, fontSize: 15, fontFamily: "'Barlow Condensed', sans-serif" }}>{selectedAct.label}</span></>
                    : <span style={{ color: text3, fontSize: 15 }}>Select activity...</span>}
                </div>
                <motion.div animate={{ rotate: dropOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={16} color={text3} />
                </motion.div>
              </button>
              <AnimatePresence>
                {dropOpen && (
                  <motion.div initial={{ opacity: 0, y: -8, scaleY: 0.9 }} animate={{ opacity: 1, y: 0, scaleY: 1 }} exit={{ opacity: 0, y: -8, scaleY: 0.9 }} transition={{ duration: 0.15 }}
                    style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, background: bg2, border: `1px solid ${border}`, borderRadius: 12, overflow: 'hidden', zIndex: 100, maxHeight: 280, overflowY: 'auto', transformOrigin: 'top' }}>
                    {activities.map(act => {
                      const Icon = act.icon
                      return (
                        <button key={act.id} onClick={() => { setSelected(act.id); setDropOpen(false) }}
                          style={{ width: '100%', background: selected === act.id ? bg3 : 'transparent', border: 'none', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', borderBottom: `1px solid ${border}` }}>
                          <Icon size={14} color={act.color} />
                          <span style={{ color: text, fontSize: 14, fontFamily: "'Barlow Condensed', sans-serif" }}>{act.label}</span>
                        </button>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Inputs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            {[
              { label: 'Body Weight', placeholder: 'kg',      value: weight,   onChange: setWeight,   suffix: 'kg'  },
              { label: 'Duration',    placeholder: 'minutes', value: duration, onChange: setDuration, suffix: 'min' },
            ].map(field => (
              <div key={field.label}>
                <label style={{ color: text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>{field.label}</label>
                <div style={{ position: 'relative' }}>
                  <input type="number" placeholder={field.placeholder} value={field.value} onChange={e => field.onChange(e.target.value)}
                    style={{ width: '100%', background: input, border: `1px solid ${border}`, borderRadius: 12, padding: '13px 40px 13px 14px', color: text, fontSize: 15, fontFamily: "'Barlow', sans-serif", outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s' }}
                    onFocus={e => e.target.style.borderColor = '#FF4D0066'}
                    onBlur={e => e.target.style.borderColor = border} />
                  <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: text3, fontSize: 11 }}>{field.suffix}</span>
                </div>
              </div>
            ))}
          </div>

          <motion.button whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.01 }} onClick={calculate} disabled={disabled}
            style={{ width: '100%', padding: '16px', background: disabled ? bg3 : 'linear-gradient(135deg, #FF4D00, #FF7A00)', border: 'none', borderRadius: 12, cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: 2, color: disabled ? text3 : '#fff', textTransform: 'uppercase', transition: 'all 0.3s' }}>
            Calculate
          </motion.button>
        </div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                {[
                  { label: 'Burned',        value: result.burned, icon: Flame,      color: '#FF4D00' },
                  { label: 'Intake Target', value: result.intake, icon: TrendingUp, color: '#FF7A00' },
                ].map((stat, i) => {
                  const Icon = stat.icon
                  return (
                    <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                      style={{ background: bg2, border: `1px solid ${stat.color}22`, borderRadius: 16, padding: 20, textAlign: 'center', transition: 'all 0.3s' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                        <Icon size={16} color={stat.color} />
                      </div>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 32, fontWeight: 900, color: stat.color, lineHeight: 1 }}>{stat.value.toLocaleString()}</div>
                      <div style={{ color: text3, fontSize: 10, marginTop: 4, letterSpacing: 1 }}>KCAL</div>
                      <div style={{ color: text2, fontSize: 11, marginTop: 6, letterSpacing: 1, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif" }}>{stat.label}</div>
                    </motion.div>
                  )
                })}
              </div>

              <div style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 16, padding: 20, marginBottom: 12, transition: 'all 0.3s' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 800, color: text, marginBottom: 16 }}>Macro Breakdown</div>
                <MacroBar label="CARBOHYDRATES" grams={result.macros.carbs}   color="#FF8C00" percent={result.macros.carbsPct}   delay={0.2} bg3={bg3} text3={text3} />
                <MacroBar label="PROTEIN"       grams={result.macros.protein} color="#FF4D00" percent={result.macros.proteinPct} delay={0.3} bg3={bg3} text3={text3} />
                <MacroBar label="FATS"          grams={result.macros.fat}     color="#E63946" percent={result.macros.fatPct}     delay={0.4} bg3={bg3} text3={text3} />
              </div>

              <div style={{ background: bg2, border: '1px solid #4FC3F722', borderRadius: 16, padding: 20, marginBottom: 12, transition: 'all 0.3s' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 800, color: text, marginBottom: 14 }}>💧 Hydration</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { label: 'During Exercise', value: result.hydration.duringExercise },
                    { label: 'Daily Total',     value: result.hydration.total },
                  ].map(h => (
                    <div key={h.label} style={{ background: bg3, border: '1px solid #4FC3F722', borderRadius: 12, padding: 14, textAlign: 'center', transition: 'all 0.3s' }}>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 900, color: '#4FC3F7' }}>{(h.value / 1000).toFixed(1)}L</div>
                      <div style={{ color: text3, fontSize: 11, marginTop: 4 }}>{h.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <motion.button whileTap={{ scale: 0.97 }} onClick={() => setResult(null)}
                style={{ width: '100%', padding: '14px', background: 'transparent', border: `1px solid ${border}`, borderRadius: 12, cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: 2, color: text3, textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <RotateCcw size={14} /> Reset
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <BottomNav />
    </div>
  )
}