import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronDown, ChevronUp, Check, Clock, Zap, Heart, Dumbbell, PersonStanding, Shuffle, Trophy, Moon } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { useResponsive } from '../hooks/useResponsive'
import { useDailyStore, generatePlan } from '../stores/dailyStore'
import BottomNav from '../components/BottomNav'
import MealReminder from '../components/MealReminder'

const FOCI = [
  { id: 'Speed',       label: 'Speed Training',     icon: Zap,            color: '#FF4D00', sub: '100m · 200m · Sprints' },
  { id: 'Endurance',   label: 'Endurance',          icon: Heart,          color: '#4FC3F7', sub: 'Long run · Cycling' },
  { id: 'Strength',    label: 'Strength',           icon: Dumbbell,       color: '#E63946', sub: 'Weights · Resistance' },
  { id: 'Flexibility', label: 'Flexibility',        icon: PersonStanding, color: '#00E676', sub: 'Yoga · Stretching' },
  { id: 'Agility',     label: 'Agility',            icon: Shuffle,        color: '#CE93D8', sub: 'Drills · Reaction' },
  { id: 'Competition', label: 'Competition Day',    icon: Trophy,         color: '#FFB347', sub: 'Race day prep' },
  { id: 'Rest',        label: 'Rest & Recovery',    icon: Moon,           color: '#666',    sub: 'Active rest · Sleep' },
]

const EVENT_SUGGESTIONS = {
  Speed:       ['100m Sprint', '200m Sprint', '400m Sprint', 'Hill Sprints', 'Track Intervals', '60m Indoor'],
  Endurance:   ['5km Run', '10km Run', 'Half Marathon', 'Marathon', 'Long Cycle', 'Swim 1500m'],
  Strength:    ['Upper Body Push', 'Upper Body Pull', 'Lower Body', 'Full Body', 'Olympic Lifts', 'Core'],
  Flexibility: ['Yoga Flow', 'Static Stretching', 'Mobility Work', 'Foam Rolling', 'Hip Flexibility'],
  Agility:     ['Ladder Drills', 'Cone Drills', 'Reaction Training', 'Plyometrics', 'SAQ Session'],
  Competition: ['Track Meet', 'Swimming Competition', 'Football Match', 'Basketball Game', 'Tennis Match'],
  Rest:        ['Active Recovery Walk', 'Light Swimming', 'Full Rest', 'Massage & Stretch'],
}

function FocusCard({ item, onSelect }) {
  const { bg2, border, text, text2 } = useTheme()
  const Icon = item.icon
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => onSelect(item)}
      style={{
        background: bg2, border: `1px solid ${item.color}33`,
        borderRadius: 16, padding: '16px', cursor: 'pointer',
        textAlign: 'left', position: 'relative', overflow: 'hidden',
        transition: 'all 0.2s', width: '100%'
      }}
    >
      <div style={{ position: 'absolute', top: -15, right: -15, width: 60, height: 60, borderRadius: '50%', background: `radial-gradient(circle, ${item.color}18 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ width: 40, height: 40, borderRadius: 10, background: `${item.color}20`, border: `1px solid ${item.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
        <Icon size={20} color={item.color} />
      </div>
      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, color: text, marginBottom: 2 }}>{item.label}</div>
      <div style={{ fontSize: 11, color: text2 }}>{item.sub}</div>
    </motion.button>
  )
}

function TimelineItem({ item, expanded, onToggle, onToggleDone, now }) {
  const { bg2, bg3, border, text, text2, text3 } = useTheme()
  const isPast = new Date(item.time).getTime() < now
  const isNext = !isPast && item === item  // always true, handled by parent
  const timeStr = new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const mealFoods = Array.isArray(item.meal?.foods) ? item.meal.foods : []

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: bg2,
        border: `1px solid ${item.isNext ? item.color + '66' : border}`,
        borderRadius: 14,
        overflow: 'hidden',
        transition: 'all 0.3s',
        opacity: isPast ? 0.6 : 1,
      }}
    >
      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Time dot */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: item.done ? '#00E67620' : `${item.color}20`, border: `1px solid ${item.done ? '#00E676' : item.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {item.done
                ? <Check size={16} color="#00E676" />
                : <span style={{ fontSize: 14 }}>{item.emoji}</span>
              }
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, color: text }}>{item.label}</span>
              {item.isNext && (
                <span style={{ background: `${item.color}20`, border: `1px solid ${item.color}44`, borderRadius: 6, padding: '1px 6px', fontSize: 9, color: item.color, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1 }}>NEXT</span>
              )}
              {item.done && (
                <span style={{ background: '#00E67615', border: '1px solid #00E67633', borderRadius: 6, padding: '1px 6px', fontSize: 9, color: '#00E676', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1 }}>DONE</span>
              )}
            </div>
            {item.meal && <div style={{ fontSize: 12, color: text3 }}>{item.meal.name}</div>}
            {item.type === 'session' && <div style={{ fontSize: 12, color: item.color }}>{item.eventName}</div>}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, color: item.color }}>{timeStr}</div>
            </div>
            {item.meal && (
              <button onClick={() => onToggle(item.id)} style={{ background: bg3, border: `1px solid ${border}`, borderRadius: 8, padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                {expanded ? <ChevronUp size={14} color={text3} /> : <ChevronDown size={14} color={text3} />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Expanded meal details */}
      <AnimatePresence>
        {expanded && item.meal && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} style={{ overflow: 'hidden' }}>
            <div style={{ padding: '0 16px 16px', borderTop: `1px solid ${item.color}22` }}>
              <div style={{ paddingTop: 12, marginBottom: 12 }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 800, color: item.color, letterSpacing: 1, marginBottom: 8 }}>FOODS</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                  {mealFoods.map(f => (
                    <span key={f} style={{ background: `${item.color}12`, border: `1px solid ${item.color}30`, borderRadius: 8, padding: '4px 10px', color: item.color, fontSize: 12 }}>{f}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[
                    { label: 'Carbs', value: item.meal.carbs, color: '#FF8C00' },
                    { label: 'Protein', value: item.meal.protein, color: '#FF4D00' },
                    { label: 'Fat', value: item.meal.fat, color: '#E63946' },
                    { label: 'Calories', value: item.meal.calories, color: '#FFB347', unit: 'kcal' },
                  ].map(m => (
                    <div key={m.label} style={{ flex: 1, background: bg3, borderRadius: 8, padding: '8px 6px', textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 900, color: m.color }}>{m.value}{m.unit || 'g'}</div>
                      <div style={{ fontSize: 9, color: text3, letterSpacing: 1 }}>{m.label.toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => onToggleDone(item.id)}
                style={{
                  width: '100%', padding: '10px',
                  background: item.done ? '#00E67615' : `${item.color}15`,
                  border: `1px solid ${item.done ? '#00E676' : item.color}44`,
                  borderRadius: 10, cursor: 'pointer',
                  fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700,
                  letterSpacing: 1, color: item.done ? '#00E676' : item.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}
              >
                {item.done ? <><Check size={14} /> MARKED AS DONE</> : '✓ MARK AS DONE'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function DailyCompanion() {
  const navigate = useNavigate()
  const { bg, bg2, bg3, border, text, text2, text3, input } = useTheme()
  const { isMobile, padding } = useResponsive()
  const { plan, savePlan, clearPlan, toggleMealDone } = useDailyStore()

  const [step, setStep] = useState(plan ? 4 : 1)
  const [focus, setFocus] = useState(null)
  const [eventName, setEventName] = useState('')
  const [sessionDate, setSessionDate] = useState(() => {
    const d = new Date(); d.setHours(d.getHours() + 2); d.setMinutes(0); d.setSeconds(0)
    return d.toISOString().slice(0, 16)
  })
  const [expandedId, setExpandedId] = useState(null)
  const [now, setNow] = useState(Date.now())

  useEffect(() => { if (plan) setStep(4) }, [plan])
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  const nextItem = useMemo(() => {
    if (!plan) return null
    return plan.timeline.find(item => new Date(item.time).getTime() > now)
      || plan.timeline[plan.timeline.length - 1]
  }, [plan, now])

  function timeDiffLabel(target) {
    const diff = new Date(target).getTime() - now
    if (diff <= 0) return 'Now'
    const mins = Math.floor(diff / 60000)
    const hrs = Math.floor(mins / 60)
    const remM = mins % 60
    return hrs > 0 ? `${hrs}h ${remM}m` : `${remM}m`
  }

  function handleCreatePlan() {
    const p = generatePlan({ focus: focus.id, eventName: eventName || focus.label, sessionDate: new Date(sessionDate) })
    savePlan(p)
    setStep(4)
  }

  const focusItem = FOCI.find(f => f.id === focus?.id) || FOCI[0]

  return (
    <div style={{ minHeight: '100vh', background: bg, paddingBottom: 80, transition: 'background 0.3s' }}>
      <MealReminder sessionTime={sessionDate} mealPlan={plan && {
        preWorkout: plan.timeline.find(t => t.type === 'meal' && t.label.includes('Pre-Workout'))?.meal?.name,
        snack: plan.timeline.find(t => t.type === 'meal' && t.label.includes('1 Hour Before'))?.meal?.name,
        postWorkout: plan.timeline.find(t => t.type === 'meal' && t.label.includes('Post-Workout'))?.meal?.name,
      }} />
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '56px 24px 24px' }}>

        {/* Header */}
        <button onClick={() => navigate('/home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: text3, marginBottom: 24, padding: 0 }}>
          <ArrowLeft size={16} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, fontSize: 14 }}>HOME</span>
        </button>

        {/* Step indicator */}
        {step < 4 && (
          <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: s <= step ? '#FF4D00' : border, transition: 'background 0.3s' }} />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">

          {/* ── STEP 1: Focus selection ── */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <p style={{ color: text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 8 }}>Step 1 of 3</p>
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, fontWeight: 900, color: text, letterSpacing: -0.5, margin: '0 0 6px' }}>
                What are you<br /><span style={{ color: '#FF4D00' }}>doing today?</span>
              </h1>
              <p style={{ color: text2, fontSize: 13, marginBottom: 24, lineHeight: 1.5 }}>Select your training focus to get a personalized meal timeline</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {FOCI.map(f => <FocusCard key={f.id} item={f} onSelect={item => { setFocus(item); setStep(2) }} />)}
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: Event ── */}
          {step === 2 && focus && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <p style={{ color: text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 8 }}>Step 2 of 3</p>
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, fontWeight: 900, color: text, letterSpacing: -0.5, margin: '0 0 24px' }}>
                What event<br /><span style={{ color: focus.color }}>/exercise?</span>
              </h1>

              {/* Selected focus badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${focus.color}15`, border: `1px solid ${focus.color}33`, borderRadius: 10, padding: '8px 14px', marginBottom: 16 }}>
                <span style={{ color: focus.color, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700 }}>{focus.label}</span>
              </div>

              {/* Input */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ color: text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>Event / Exercise Name</label>
                <input
                  type="text"
                  placeholder={`e.g. ${EVENT_SUGGESTIONS[focus.id]?.[0] || focus.label}`}
                  value={eventName}
                  onChange={e => setEventName(e.target.value)}
                  style={{ width: '100%', background: input, border: `1px solid ${border}`, borderRadius: 12, padding: '14px 16px', color: text, fontSize: 15, fontFamily: "'Barlow', sans-serif", outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = focus.color + '66'}
                  onBlur={e => e.target.style.borderColor = border}
                />
              </div>

              {/* Quick suggestions */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ color: text3, fontSize: 11, letterSpacing: 1, marginBottom: 8 }}>QUICK SELECT</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {(EVENT_SUGGESTIONS[focus.id] || []).map(s => (
                    <button key={s} onClick={() => setEventName(s)}
                      style={{ padding: '6px 12px', background: eventName === s ? `${focus.color}20` : bg2, border: `1px solid ${eventName === s ? focus.color : border}`, borderRadius: 100, cursor: 'pointer', color: eventName === s ? focus.color : text2, fontSize: 12, fontFamily: "'Barlow Condensed', sans-serif", transition: 'all 0.2s' }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => setStep(1)} style={{ padding: '14px 20px', background: 'transparent', border: `1px solid ${border}`, borderRadius: 12, cursor: 'pointer', color: text3, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 700 }}>
                  <ArrowLeft size={14} />
                </button>
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => setStep(3)}
                  style={{ flex: 1, padding: '14px', background: `linear-gradient(135deg, ${focus.color}, ${focus.color}cc)`, border: 'none', borderRadius: 12, cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 17, fontWeight: 800, letterSpacing: 2, color: '#fff', textTransform: 'uppercase' }}>
                  Continue ›
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Session time ── */}
          {step === 3 && focus && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <p style={{ color: text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 8 }}>Step 3 of 3</p>
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, fontWeight: 900, color: text, letterSpacing: -0.5, margin: '0 0 24px' }}>
                When is your<br /><span style={{ color: focus.color }}>session?</span>
              </h1>

              {/* Quick time picks */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: text3, fontSize: 11, letterSpacing: 1, marginBottom: 10 }}>QUICK SELECT</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[
                    { label: 'Morning', hour: 7, min: 30 },
                    { label: 'Midday', hour: 12, min: 0 },
                    { label: 'Afternoon', hour: 15, min: 0 },
                    { label: 'Evening', hour: 18, min: 30 },
                  ].map(t => {
                    const d = new Date(sessionDate)
                    const active = d.getHours() === t.hour && d.getMinutes() === t.min
                    return (
                      <button key={t.label} onClick={() => { const nd = new Date(sessionDate); nd.setHours(t.hour, t.min, 0); setSessionDate(nd.toISOString().slice(0, 16)) }}
                        style={{ flex: 1, padding: '10px 6px', background: active ? `${focus.color}20` : bg2, border: `1px solid ${active ? focus.color : border}`, borderRadius: 10, cursor: 'pointer', color: active ? focus.color : text2, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, fontWeight: active ? 700 : 400, transition: 'all 0.2s' }}>
                        {t.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Exact time */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ color: text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>Exact Time</label>
                <input type="datetime-local" value={sessionDate} onChange={e => setSessionDate(e.target.value)}
                  style={{ width: '100%', background: input, border: `1px solid ${border}`, borderRadius: 12, padding: '14px 16px', color: text, fontSize: 15, fontFamily: "'Barlow', sans-serif", outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = focus.color + '66'}
                  onBlur={e => e.target.style.borderColor = border}
                />
              </div>

              {/* Summary preview */}
              <div style={{ background: bg2, border: `1px solid ${focus.color}33`, borderRadius: 14, padding: '14px 16px', marginBottom: 24 }}>
                <div style={{ color: text3, fontSize: 11, letterSpacing: 1, marginBottom: 8 }}>PLAN SUMMARY</div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: focus.color, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: 1 }}>FOCUS</div>
                    <div style={{ color: text, fontSize: 14, fontWeight: 600 }}>{eventName || focus.label}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: focus.color, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: 1 }}>SESSION TIME</div>
                    <div style={{ color: text, fontSize: 14, fontWeight: 600 }}>{new Date(sessionDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => setStep(2)} style={{ padding: '14px 20px', background: 'transparent', border: `1px solid ${border}`, borderRadius: 12, cursor: 'pointer', color: text3, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 700 }}>
                  <ArrowLeft size={14} />
                </button>
                <motion.button whileTap={{ scale: 0.97 }} onClick={handleCreatePlan}
                  style={{ flex: 1, padding: '14px', background: `linear-gradient(135deg, ${focus.color}, ${focus.color}cc)`, border: 'none', borderRadius: 12, cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 17, fontWeight: 800, letterSpacing: 2, color: '#fff', textTransform: 'uppercase' }}>
                  Create My Plan ›
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 4: Plan view ── */}
          {step === 4 && plan && (
            <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

              {/* Next up countdown */}
              {nextItem && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ background: bg2, border: `1px solid ${nextItem.color}44`, borderRadius: 18, padding: 20, marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <Clock size={14} color={nextItem.color} />
                    <span style={{ color: nextItem.color, fontSize: 11, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, fontWeight: 700 }}>NEXT UP</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 900, color: text, marginBottom: 2 }}>{nextItem.label}</div>
                      {nextItem.meal && <div style={{ fontSize: 13, color: text2 }}>{nextItem.meal.name}</div>}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 32, fontWeight: 900, color: nextItem.color, lineHeight: 1 }}>{timeDiffLabel(nextItem.time)}</div>
                      <div style={{ fontSize: 11, color: text3 }}>{new Date(nextItem.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Today's header */}
              <div style={{ marginBottom: 16 }}>
                <p style={{ color: text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 4 }}>Today's Plan</p>
                <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 900, color: text, margin: 0 }}>
                  {plan.focus} <span style={{ color: focusItem.color }}>Nutrition Timeline</span>
                </h2>
              </div>

              {/* Progress */}
              {(() => {
                const meals = plan.timeline.filter(t => t.meal)
                const done = meals.filter(t => t.done).length
                const pct = meals.length > 0 ? Math.round(done / meals.length * 100) : 0
                return meals.length > 0 ? (
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ color: text3, fontSize: 12 }}>{done}/{meals.length} meals completed</span>
                      <span style={{ color: '#00E676', fontSize: 12, fontWeight: 600 }}>{pct}%</span>
                    </div>
                    <div style={{ background: bg3, borderRadius: 4, height: 4 }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.6 }}
                        style={{ height: '100%', background: '#00E676', borderRadius: 4 }} />
                    </div>
                  </div>
                ) : null
              })()}

              {/* Timeline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {plan.timeline.map((item, i) => (
                  <TimelineItem
                    key={item.id}
                    item={{ ...item, isNext: nextItem?.id === item.id }}
                    expanded={expandedId === item.id}
                    onToggle={id => setExpandedId(expandedId === id ? null : id)}
                    onToggleDone={toggleMealDone}
                    now={now}
                  />
                ))}
              </div>

              {/* Reset */}
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => { clearPlan(); setStep(1); setFocus(null); setEventName('') }}
                style={{ width: '100%', padding: '14px', background: 'transparent', border: `1px solid ${border}`, borderRadius: 12, cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: 2, color: text3, textTransform: 'uppercase', marginTop: 16 }}>
                Plan a New Day
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
      <BottomNav />
    </div>
  )
}