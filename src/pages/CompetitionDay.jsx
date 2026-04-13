import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronRight, Calculator, Clock, Scale, Search } from 'lucide-react'
import { sportsData } from '../data/sportsData'
import { useTheme } from '../hooks/useTheme'
import { useUserStore } from '../stores/userStore'
import BottomNav from '../components/BottomNav'

// ─── Pre-Event Precision Calculator ────────────────────────────
function getPrecisionMeal(hoursLeft, bodyWeight) {
  const w = parseFloat(bodyWeight) || 70
  const carbsPerKg = hoursLeft >= 3.5 ? 2.5 : hoursLeft >= 2.5 ? 2.0 : hoursLeft >= 1.5 ? 1.2 : hoursLeft >= 0.75 ? 0.7 : 0.3
  const proteinPerKg = hoursLeft >= 3 ? 0.4 : hoursLeft >= 1.5 ? 0.2 : 0.1
  const totalCarbs = Math.round(carbsPerKg * w)
  const totalProtein = Math.round(proteinPerKg * w)
  const totalCals = Math.round(totalCarbs * 4 + totalProtein * 4 + (hoursLeft >= 3 ? w * 0.3 * 9 : 0))
  return {
    totalCarbs, totalProtein, totalCals, carbsPerKg, proteinPerKg,
    mealPlan: buildMealPlan(hoursLeft, totalCarbs, totalProtein, w),
    hydration: buildHydration(hoursLeft, w),
    timing: getTimingAdvice(hoursLeft),
    avoid: getAvoidList(hoursLeft),
  }
}

function buildMealPlan(hours, targetCarbs, targetProtein, w) {
  if (hours >= 3.5) {
    const rice = Math.round((targetCarbs * 0.5) / 0.28)
    const chicken = Math.round((targetProtein * 0.8) / 0.31)
    const banana = Math.round((targetCarbs * 0.15) / 0.23)
    const bread = Math.round((targetCarbs * 0.2) / 0.49)
    return [
      { food: 'White Rice (cooked)',     amount: rice,    unit: 'g',    carbs: Math.round(rice * 0.28),    protein: Math.round(rice * 0.026), note: 'Main carb source' },
      { food: 'Chicken Breast (cooked)', amount: chicken, unit: 'g',    carbs: 0,                           protein: Math.round(chicken * 0.31), note: 'Lean protein' },
      { food: 'Banana',                  amount: banana,  unit: 'g',    carbs: Math.round(banana * 0.23),   protein: 1,                          note: 'Quick energy + potassium' },
      { food: 'Whole Grain Bread',       amount: bread,   unit: 'g',    carbs: Math.round(bread * 0.49),    protein: Math.round(bread * 0.09),   note: 'Slow release carbs' },
      { food: 'Sweet Potato (cooked)',   amount: Math.round(w * 1.2), unit: 'g', carbs: Math.round(w * 1.2 * 0.20), protein: 2, note: 'Complex carbs + vitamins' },
      { food: 'Boiled Eggs',             amount: 2,       unit: 'eggs', carbs: 0,                           protein: 12,                         note: 'Complete protein' },
      { food: 'Sports Drink',            amount: 300,     unit: 'ml',   carbs: 18,                          protein: 0,                          note: 'Electrolytes + carbs' },
    ]
  }
  if (hours >= 2) {
    const rice = Math.round((targetCarbs * 0.55) / 0.28)
    const chicken = Math.round((targetProtein * 0.7) / 0.31)
    const banana = Math.round((targetCarbs * 0.2) / 0.23)
    return [
      { food: 'White Rice (cooked)',    amount: rice,    unit: 'g',   carbs: Math.round(rice * 0.28),    protein: Math.round(rice * 0.026), note: 'Primary energy source' },
      { food: 'Chicken Breast',         amount: chicken, unit: 'g',   carbs: 0,                           protein: Math.round(chicken * 0.31), note: 'Moderate protein' },
      { food: 'Banana',                 amount: banana,  unit: 'g',   carbs: Math.round(banana * 0.23),   protein: 1,                          note: 'Quick energy' },
      { food: 'Greek Yogurt (low fat)', amount: 100,     unit: 'g',   carbs: 5,                           protein: 10,                         note: 'Protein + probiotics' },
      { food: 'White Toast',            amount: Math.round(targetCarbs * 0.1 / 0.49 * 100), unit: 'g', carbs: Math.round(targetCarbs * 0.1), protein: 3, note: 'Light carb top-up' },
      { food: 'Orange Juice',           amount: 200,     unit: 'ml',  carbs: 20,                          protein: 1,                          note: 'Vitamin C + quick carbs' },
    ]
  }
  if (hours >= 1) {
    const banana = Math.round((targetCarbs * 0.5) / 0.23)
    const gel = Math.max(1, Math.round(targetCarbs * 0.3 / 25))
    return [
      { food: 'Banana',              amount: banana, unit: 'g',    carbs: Math.round(banana * 0.23), protein: 1, note: 'Easy to digest, quick energy' },
      { food: 'Energy Gel',          amount: gel,    unit: 'gels', carbs: gel * 25,                  protein: 0, note: 'Fast carbs — take with water' },
      { food: 'White Toast + Honey', amount: Math.round(targetCarbs * 0.2 / 0.49 * 100), unit: 'g', carbs: Math.round(targetCarbs * 0.2), protein: 2, note: 'Simple carbs only' },
      { food: 'Sports Drink',        amount: 250,    unit: 'ml',   carbs: 15,                        protein: 0, note: 'Pre-load electrolytes' },
      { food: 'Dates',               amount: Math.round(targetCarbs * 0.15 / 0.75), unit: 'dates', carbs: Math.round(targetCarbs * 0.15), protein: 0, note: 'Natural fast sugar' },
    ]
  }
  const gel = Math.max(1, Math.round(targetCarbs / 25))
  return [
    { food: 'Energy Gel',          amount: gel,  unit: 'gels', carbs: gel * 25, protein: 0, note: 'Take 15-20 min before start' },
    { food: 'Sports Drink',        amount: 150,  unit: 'ml',   carbs: 9,        protein: 0, note: 'Small sips only' },
    { food: 'Glucose Tablet',      amount: 3,    unit: 'tabs', carbs: 15,       protein: 0, note: 'Instant glucose if needed' },
    { food: 'Electrolyte Tabs',    amount: 1,    unit: 'tab',  carbs: 2,        protein: 0, note: 'Sodium + potassium balance' },
  ]
}

function buildHydration(hours, w) {
  if (hours >= 3.5) return [
    { timing: '3-4 hrs before',   amount: Math.round(w * 6), unit: 'ml', tip: 'Base hydration — pale yellow urine' },
    { timing: '2 hrs before',     amount: Math.round(w * 4), unit: 'ml', tip: 'Top up fluids' },
    { timing: '15-30 min before', amount: 300,               unit: 'ml', tip: 'Final pre-event drink' },
  ]
  if (hours >= 2) return [
    { timing: 'Now',             amount: Math.round(w * 5), unit: 'ml', tip: 'Start hydrating immediately' },
    { timing: '30 min before',   amount: 400,               unit: 'ml', tip: 'Sports drink for electrolytes' },
    { timing: '15 min before',   amount: 200,               unit: 'ml', tip: 'Small sip only' },
  ]
  if (hours >= 1) return [
    { timing: 'Now',           amount: 500, unit: 'ml', tip: 'Drink steadily, not all at once' },
    { timing: '20 min before', amount: 200, unit: 'ml', tip: 'Sports drink' },
  ]
  return [
    { timing: 'Now',          amount: 150, unit: 'ml', tip: 'Small sips only — avoid bloating' },
    { timing: 'At start line',amount: 100, unit: 'ml', tip: 'Mouth rinse + small sip' },
  ]
}

function getTimingAdvice(hours) {
  if (hours >= 3.5) return { label: '3.5+ Hours Out', color: '#00E676', advice: 'Perfect time for a full balanced meal. Include complex carbs, lean protein and healthy fats.' }
  if (hours >= 2)   return { label: '2–3.5 Hours Out', color: '#FFB347', advice: 'Moderate meal. Focus on carbs + light protein. Avoid high fat and high fiber foods.' }
  if (hours >= 1)   return { label: '1–2 Hours Out', color: '#FF7A00', advice: 'Light snack only. Fast-digesting carbs. No heavy protein or fats.' }
  return { label: 'Under 1 Hour', color: '#FF3057', advice: 'Gels and drinks only. No solid food. Focus on staying hydrated and calm.' }
}

function getAvoidList(hours) {
  if (hours >= 3) return ['High fat foods', 'Spicy foods', 'Alcohol', 'Carbonated drinks', 'New/untested foods', 'Large portions']
  if (hours >= 1.5) return ['High fiber foods', 'Fatty meats', 'Dairy (if sensitive)', 'Beans/legumes', 'Raw vegetables']
  return ['All solid foods (if under 45 min)', 'Protein shakes', 'Fatty foods', 'High fiber', 'Caffeine overdose']
}

// ─── Pre-Event Calculator UI ────────────────────────────────────
function PreEventCalculator() {
  const { weight: uw } = useUserStore()
  const th = useTheme()
  const [bodyWeight, setBodyWeight] = useState(uw || '')
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [result, setResult] = useState(null)

  const totalHours = (parseFloat(hours || 0)) + (parseFloat(minutes || 0) / 60)
  const canCalc = bodyWeight && (hours || minutes)

  const calculate = () => {
    if (!canCalc) return
    setResult(getPrecisionMeal(totalHours, bodyWeight))
  }

  const windows = [
    { label: '3.5+ hrs', color: '#00E676', active: totalHours >= 3.5 },
    { label: '2-3.5 hrs', color: '#FFB347', active: totalHours >= 2 && totalHours < 3.5 },
    { label: '1-2 hrs', color: '#FF7A00', active: totalHours >= 1 && totalHours < 2 },
    { label: '<1 hr', color: '#FF3057', active: totalHours > 0 && totalHours < 1 },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ background: th.bg2, border: `1px solid ${th.border}`, borderRadius: 20, padding: 20, marginBottom: 16, transition: 'all 0.3s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,179,71,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Calculator size={18} color="#FFB347" />
          </div>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, color: th.text }}>Pre-Event Meal Calculator</div>
            <div style={{ color: th.text3, fontSize: 12 }}>Get exact food portions based on your body weight & time</div>
          </div>
        </div>

        {/* Body Weight */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ color: th.text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>Body Weight</label>
          <div style={{ position: 'relative' }}>
            <input type="number" placeholder="70" value={bodyWeight} onChange={e => setBodyWeight(e.target.value)}
              style={{ width: '100%', background: th.input, border: `1px solid ${th.border}`, borderRadius: 12, padding: '13px 40px 13px 14px', color: th.text, fontSize: 15, fontFamily: "'Barlow', sans-serif", outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s' }}
              onFocus={e => e.target.style.borderColor = '#FFB34766'}
              onBlur={e => e.target.style.borderColor = th.border} />
            <span style={{ position: 'absolute', right: 12, top: 14, color: th.text3, fontSize: 11 }}>kg</span>
          </div>
        </div>

        {/* Time to competition */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ color: th.text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>Time Left Before Competition</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 10 }}>
            {[
              { label: 'Hours', value: hours, onChange: setHours, placeholder: 'e.g. 3', suffix: 'hrs' },
              { label: 'Minutes', value: minutes, onChange: setMinutes, placeholder: 'e.g. 30', suffix: 'min' },
            ].map(f => (
              <div key={f.label}>
                <label style={{ color: th.text3, fontSize: 10, letterSpacing: 1, fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 6 }}>{f.label}</label>
                <div style={{ position: 'relative' }}>
                  <input type="number" placeholder={f.placeholder} value={f.value} onChange={e => f.onChange(e.target.value)}
                    style={{ width: '100%', background: th.input, border: `1px solid ${th.border}`, borderRadius: 12, padding: '13px 40px 13px 14px', color: th.text, fontSize: 15, fontFamily: "'Barlow', sans-serif", outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s' }}
                    onFocus={e => e.target.style.borderColor = '#FFB34766'}
                    onBlur={e => e.target.style.borderColor = th.border} />
                  <span style={{ position: 'absolute', right: 12, top: 14, color: th.text3, fontSize: 11 }}>{f.suffix}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Time window indicator */}
          {(hours || minutes) && (
            <div style={{ display: 'flex', gap: 6 }}>
              {windows.map(w => (
                <div key={w.label} style={{ flex: 1, padding: '6px 4px', background: w.active ? `${w.color}20` : th.bg3, border: `1px solid ${w.active ? w.color : 'transparent'}`, borderRadius: 8, textAlign: 'center', transition: 'all 0.2s' }}>
                  <span style={{ color: w.active ? w.color : th.text3, fontSize: 10, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: w.active ? 800 : 400 }}>{w.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <motion.button whileTap={{ scale: 0.97 }} onClick={calculate} disabled={!canCalc}
          style={{ width: '100%', padding: '16px', background: canCalc ? 'linear-gradient(135deg, #FFB347, #FF7A00)' : th.bg3, border: 'none', borderRadius: 12, cursor: canCalc ? 'pointer' : 'not-allowed', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: 2, color: canCalc ? '#000' : th.text3, textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.3s' }}>
          <Calculator size={18} /> Calculate My Meal Plan
        </motion.button>
      </div>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

            {/* Timing badge */}
            <div style={{ background: `${result.timing.color}15`, border: `1px solid ${result.timing.color}44`, borderRadius: 16, padding: '14px 18px', marginBottom: 12 }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 900, color: result.timing.color, marginBottom: 4 }}>{result.timing.label}</div>
              <p style={{ color: th.text2, fontSize: 13, margin: 0, lineHeight: 1.5 }}>{result.timing.advice}</p>
            </div>

            {/* Macro targets */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 12 }}>
              {[
                { label: 'Total Carbs', value: `${result.totalCarbs}g`, sub: `${result.carbsPerKg}g/kg`, color: '#FF8C00' },
                { label: 'Protein',    value: `${result.totalProtein}g`, sub: `${result.proteinPerKg}g/kg`, color: '#FF4D00' },
                { label: 'Calories',  value: result.totalCals, sub: 'kcal target', color: '#FFB347' },
              ].map(s => (
                <div key={s.label} style={{ background: th.bg2, border: `1px solid ${s.color}22`, borderRadius: 14, padding: '14px 10px', textAlign: 'center', transition: 'all 0.3s' }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 900, color: s.color }}>{s.value}</div>
                  <div style={{ color: th.text3, fontSize: 10, marginTop: 2 }}>{s.sub}</div>
                  <div style={{ color: th.text2, fontSize: 11, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Exact Meal Plan */}
            <div style={{ background: th.bg2, border: `1px solid ${th.border}`, borderRadius: 16, padding: 20, marginBottom: 12, transition: 'all 0.3s' }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 900, color: th.text, marginBottom: 4 }}>📋 Exact Meal Plan</div>
              <p style={{ color: th.text3, fontSize: 12, marginBottom: 16 }}>Precise portions for your {bodyWeight}kg body weight</p>
              {result.mealPlan.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < result.mealPlan.length - 1 ? `1px solid ${th.border}` : 'none' }}>
                  <div style={{ background: 'rgba(255,179,71,0.15)', border: '1px solid rgba(255,179,71,0.3)', borderRadius: 10, padding: '6px 10px', textAlign: 'center', flexShrink: 0, minWidth: 70 }}>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 900, color: '#FFB347', lineHeight: 1 }}>{item.amount}</div>
                    <div style={{ color: '#FFB347', fontSize: 10, opacity: 0.8 }}>{item.unit}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 700, color: th.text, marginBottom: 2 }}>{item.food}</div>
                    <div style={{ color: th.text3, fontSize: 11 }}>{item.note}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                    {item.carbs > 0 && <span style={{ background: '#FF8C0020', borderRadius: 6, padding: '2px 6px', color: '#FF8C00', fontSize: 10 }}>C:{item.carbs}g</span>}
                    {item.protein > 0 && <span style={{ background: '#FF4D0020', borderRadius: 6, padding: '2px 6px', color: '#FF4D00', fontSize: 10 }}>P:{item.protein}g</span>}
                  </div>
                </motion.div>
              ))}
              <div style={{ marginTop: 14, padding: '12px 14px', background: th.bg3, borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 800, color: th.text }}>TOTAL TARGET</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ background: '#FF8C0020', border: '1px solid #FF8C0033', borderRadius: 8, padding: '4px 10px', color: '#FF8C00', fontSize: 12 }}>Carbs: {result.totalCarbs}g</span>
                  <span style={{ background: '#FF4D0020', border: '1px solid #FF4D0033', borderRadius: 8, padding: '4px 10px', color: '#FF4D00', fontSize: 12 }}>Protein: {result.totalProtein}g</span>
                </div>
              </div>
            </div>

            {/* Hydration */}
            <div style={{ background: th.bg2, border: '1px solid rgba(79,195,247,0.3)', borderRadius: 16, padding: 20, marginBottom: 12, transition: 'all 0.3s' }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 900, color: th.text, marginBottom: 14 }}>💧 Hydration Schedule</div>
              {result.hydration.map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: i < result.hydration.length - 1 ? 14 : 0 }}>
                  <div style={{ background: 'rgba(79,195,247,0.15)', border: '1px solid rgba(79,195,247,0.3)', borderRadius: 10, padding: '8px 12px', textAlign: 'center', flexShrink: 0, minWidth: 80 }}>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 900, color: '#4FC3F7' }}>{h.amount}</div>
                    <div style={{ color: '#4FC3F7', fontSize: 10 }}>{h.unit}</div>
                  </div>
                  <div>
                    <div style={{ color: '#4FC3F7', fontSize: 11, letterSpacing: 1, fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 2 }}>{h.timing}</div>
                    <div style={{ color: th.text2, fontSize: 12 }}>{h.tip}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Avoid */}
            <div style={{ background: 'rgba(255,48,87,0.06)', border: '1px solid rgba(255,48,87,0.25)', borderRadius: 16, padding: 20, marginBottom: 12 }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 900, color: '#FF3057', marginBottom: 12 }}>❌ Avoid Before Competition</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {result.avoid.map(a => <span key={a} style={{ background: 'rgba(255,48,87,0.1)', border: '1px solid rgba(255,48,87,0.25)', borderRadius: 8, padding: '5px 10px', color: '#FF3057', fontSize: 12 }}>{a}</span>)}
              </div>
            </div>

            <motion.button whileTap={{ scale: 0.97 }} onClick={() => { setResult(null); setHours(''); setMinutes(''); }}
              style={{ width: '100%', padding: '13px', background: 'transparent', border: `1px solid ${th.border}`, borderRadius: 12, cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: 2, color: th.text3, textTransform: 'uppercase' }}>
              Recalculate
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Event Detail Page ──────────────────────────────────────────
function EventPage({ sport, event, onBack }) {
  const [view, setView] = useState('overview')
  const { bg2, border, text, text2, text3, foodTag, foodTagBorder, foodTagText } = useTheme()
  const { preEvent, during, postEvent } = event

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: text3, marginBottom: 20, padding: 0 }}>
        <ArrowLeft size={16} /> <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, fontSize: 14 }}>BACK</span>
      </button>
      <p style={{ color: '#FFB347', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 4 }}>{sport.name}</p>
      <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 900, color: text, margin: '0 0 16px' }}>{event.name}</h2>

      {/* Tab toggle */}
      <div style={{ display: 'flex', background: bg2, border: `1px solid ${border}`, borderRadius: 14, padding: 4, marginBottom: 20, transition: 'all 0.3s' }}>
        {[{ id: 'overview', label: '📋 Nutrition Guide' }, { id: 'calculator', label: '🧮 Meal Calculator' }].map(t => (
          <button key={t.id} onClick={() => setView(t.id)} style={{
            flex: 1, padding: '11px', background: view === t.id ? 'linear-gradient(135deg, #FFB347, #FF7A00)' : 'transparent',
            border: 'none', borderRadius: 10, cursor: 'pointer',
            fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 700,
            color: view === t.id ? '#000' : text3, transition: 'all 0.2s'
          }}>{t.label}</button>
        ))}
      </div>

      {view === 'overview' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {[
            { label: '3 Hours Before', sub: 'MAIN PRE-EVENT MEAL', emoji: '⏰', color: '#FF4D00', foods: preEvent.threeHour.foods, cal: preEvent.threeHour.calories, hydration: preEvent.threeHour.hydration },
            { label: '1 Hour Before',  sub: 'TOP-UP FUEL',         emoji: '⚡', color: '#FF7A00', foods: preEvent.oneHour.foods,   cal: preEvent.oneHour.calories },
            { label: 'During Event',   sub: 'RACE FUEL',           emoji: '🏁', color: '#FF3057', foods: during.foods,             hydration: during.hydration },
            { label: 'Post Event Recovery', sub: postEvent.timing, emoji: '🔄', color: '#00E676', foods: postEvent.foods,          cal: postEvent.calories },
          ].map(s => (
            <div key={s.label} style={{ background: bg2, border: `1px solid ${s.color}33`, borderRadius: 16, padding: 18, marginBottom: 10, transition: 'all 0.3s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 18 }}>{s.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 17, fontWeight: 800, color: text }}>{s.label}</div>
                  <div style={{ color: s.color, fontSize: 11, letterSpacing: 1 }}>{s.sub}</div>
                </div>
                {s.cal && <div style={{ background: `${s.color}15`, border: `1px solid ${s.color}33`, borderRadius: 8, padding: '4px 10px' }}>
                  <span style={{ color: s.color, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 700 }}>{s.cal} kcal</span>
                </div>}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: s.hydration ? 8 : 0 }}>
                {s.foods.map(f => <span key={f} style={{ background: foodTag, border: `1px solid ${foodTagBorder}`, borderRadius: 8, padding: '5px 10px', color: foodTagText, fontSize: 12 }}>{f}</span>)}
              </div>
              {s.hydration && <p style={{ color: '#4FC3F7', fontSize: 12, margin: 0 }}>💧 {s.hydration}</p>}
            </div>
          ))}
        </motion.div>
      )}
      {view === 'calculator' && <PreEventCalculator />}
    </motion.div>
  )
}

// ─── Events List for a Sport Group ─────────────────────────────
function SportEvents({ sport, onBack, onSelectEvent }) {
  const { bg2, border, text, text3 } = useTheme()
  const [search, setSearch] = useState('')
  const filtered = sport.events.filter(e => e.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: text3, marginBottom: 20, padding: 0 }}>
        <ArrowLeft size={16} /> <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, fontSize: 14 }}>BACK</span>
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <span style={{ fontSize: 32 }}>{sport.icon}</span>
        <div>
          <div style={{ color: text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif" }}>{sport.type}</div>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 900, color: text, margin: '2px 0 0' }}>{sport.name}</h2>
        </div>
        <div style={{ marginLeft: 'auto', background: 'rgba(255,179,71,0.15)', border: '1px solid rgba(255,179,71,0.3)', borderRadius: 10, padding: '6px 12px' }}>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 900, color: '#FFB347' }}>{sport.events.length}</span>
          <span style={{ color: '#FFB347', fontSize: 11, display: 'block', lineHeight: 1 }}>events</span>
        </div>
      </div>

      {/* Search */}
      {sport.events.length > 6 && (
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <Search size={14} color={text3} style={{ position: 'absolute', left: 14, top: 14 }} />
          <input placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', background: bg2, border: `1px solid ${border}`, borderRadius: 12, padding: '12px 14px 12px 36px', color: text, fontSize: 14, fontFamily: "'Barlow', sans-serif", outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s' }}
            onFocus={e => e.target.style.borderColor = '#FFB34766'}
            onBlur={e => e.target.style.borderColor = border} />
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map((event, i) => (
          <motion.button key={event.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} whileTap={{ scale: 0.98 }}
            onClick={() => onSelectEvent(event)}
            style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 12, padding: '14px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left', transition: 'all 0.2s' }}>
            <div>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 700, color: text, display: 'block' }}>{event.name}</span>
              <span style={{ color: '#FFB347', fontSize: 10, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1 }}>Nutrition Guide + Meal Calculator</span>
            </div>
            <ChevronRight size={15} color={text3} />
          </motion.button>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '30px', color: text3, fontSize: 14 }}>No events found</div>
        )}
      </div>
    </motion.div>
  )
}

// ─── Sport Groups List ──────────────────────────────────────────
function SportGroupsList({ tab, onSelectSport }) {
  const { bg2, border, text, text2, text3 } = useTheme()
  const sports = sportsData[tab]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {sports.map((sport, i) => (
        <motion.button key={sport.id}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectSport(sport)}
          style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 16, padding: '16px 18px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', transition: 'all 0.3s' }}>
          <span style={{ fontSize: 28, flexShrink: 0 }}>{sport.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, color: text }}>{sport.name}</div>
            <div style={{ color: text3, fontSize: 12, marginTop: 2 }}>{sport.type} • {sport.events.length} Olympic events</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
              <Calculator size={10} color="#FFB347" />
              <span style={{ color: '#FFB347', fontSize: 10, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1 }}>PRECISION MEAL CALCULATOR</span>
            </div>
          </div>
          <div style={{ background: 'rgba(255,179,71,0.12)', border: '1px solid rgba(255,179,71,0.25)', borderRadius: 10, padding: '6px 12px', textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 900, color: '#FFB347' }}>{sport.events.length}</div>
            <div style={{ color: '#FFB347', fontSize: 9, letterSpacing: 1 }}>EVENTS</div>
          </div>
          <ChevronRight size={16} color={text3} />
        </motion.button>
      ))}
    </div>
  )
}

// ─── Main Page ──────────────────────────────────────────────────
export default function CompetitionDay() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('aerobic')
  const [selectedSport, setSelectedSport] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const { bg, bg2, border, text, text3 } = useTheme()

  const goBack = () => {
    if (selectedEvent) { setSelectedEvent(null); return }
    if (selectedSport) { setSelectedSport(null); return }
  }

  // Total event counts
  const aeroCount   = sportsData.aerobic.reduce((s, sp) => s + sp.events.length, 0)
  const anaeroCount = sportsData.anaerobic.reduce((s, sp) => s + sp.events.length, 0)

  return (
    <div style={{ minHeight: '100vh', background: bg, paddingBottom: 80, transition: 'background 0.3s' }}>
      <div style={{ padding: '56px 24px 24px', maxWidth: 480, margin: '0 auto' }}>
        <AnimatePresence mode="wait">

          {/* Event detail */}
          {selectedEvent ? (
            <EventPage key="event" sport={selectedSport} event={selectedEvent} onBack={goBack} />
          )

          /* Events list for a sport */
          : selectedSport ? (
            <SportEvents key="sport" sport={selectedSport} onBack={goBack} onSelectEvent={setSelectedEvent} />
          )

          /* Main sports list */
          : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <button onClick={() => navigate('/home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: text3, marginBottom: 24, padding: 0 }}>
                <ArrowLeft size={16} /> <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, fontSize: 14 }}>HOME</span>
              </button>

              <p style={{ color: text3, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 8 }}>Olympic Events</p>
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 40, fontWeight: 900, color: text, letterSpacing: -1, margin: '0 0 6px' }}>Competition<br /><span style={{ color: '#FFB347' }}>Nutrition</span></h1>
              <p style={{ color: text3, fontSize: 13, marginBottom: 20 }}>Select sport group → event → get precise meal plan</p>

              {/* Tab Toggle */}
              <div style={{ display: 'flex', background: bg2, border: `1px solid ${border}`, borderRadius: 14, padding: 4, marginBottom: 24, transition: 'all 0.3s' }}>
                {[
                  { id: 'aerobic',   label: `Aerobic Sports`,   count: aeroCount },
                  { id: 'anaerobic', label: `Anaerobic Sports`,  count: anaeroCount },
                ].map(t => (
                  <button key={t.id} onClick={() => setTab(t.id)} style={{
                    flex: 1, padding: '12px 8px',
                    background: tab === t.id ? 'linear-gradient(135deg, #FF4D00, #FF7A00)' : 'transparent',
                    border: 'none', borderRadius: 10, cursor: 'pointer',
                    fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700,
                    color: tab === t.id ? '#fff' : text3, transition: 'all 0.2s'
                  }}>
                    {t.label}
                    <span style={{ display: 'block', fontSize: 11, opacity: 0.8, fontWeight: 400 }}>{t.count} events</span>
                  </button>
                ))}
              </div>

              <SportGroupsList tab={tab} onSelectSport={setSelectedSport} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <BottomNav />
    </div>
  )
}