import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Zap, Heart, Dumbbell, PersonStanding, ChevronRight, ArrowLeft, Calculator, RotateCcw, Timer, Shuffle } from 'lucide-react'
import { useUserStore } from '../stores/userStore'
import { useTheme } from '../hooks/useTheme'
import BottomNav from '../components/BottomNav'

export const trainingTypes = [
  { id: 'speed',       icon: Zap,            label: 'Speed Training',        desc: 'Explosive sprints & high-intensity', color: '#FF4D00' },
  { id: 'endurance',   icon: Heart,          label: 'Endurance Training',    desc: 'Long-distance, sustained cardio',    color: '#4FC3F7' },
  { id: 'strength',    icon: Dumbbell,       label: 'Strength Training',     desc: 'Weights, resistance & power',        color: '#E63946' },
  { id: 'agility',     icon: Shuffle,        label: 'Agility Training',      desc: 'Quickness, reaction & coordination', color: '#CE93D8' },
  { id: 'flexibility', icon: PersonStanding, label: 'Flexibility & Recovery',desc: 'Yoga, stretching & mobility',        color: '#00E676' },
]

// ─── Nutrition DB ──────────────────────────────────────────────
const nutritionDB = {
  speed: {
    pre: ['White rice (100g)', 'Banana (large)', 'Honey (1 tbsp)', 'White bread toast', 'Sports drink (250ml)', 'Energy gel', 'Dates (3-4)', 'Rice cakes', 'Watermelon (1 cup)', 'Orange juice (200ml)', 'Boiled potato (small)', 'Corn flakes + milk', 'Soft white roll', 'Pineapple chunks', 'Glucose biscuits', 'Fig bars', 'Mango (half)', 'Grapes (1 cup)', 'Bagel + jam', 'White pasta (small)'],
    during: ['Sports drink (every 20 min)', 'Energy gel (every 30 min)', 'Water (150ml)', 'Glucose tablet', 'Electrolyte drink', 'Coconut water (small)', 'Banana (half)', 'Salt tablet', 'Carb chews', 'Isotonic drink'],
    post: ['Whey protein shake (30g)', 'Chocolate milk (400ml)', 'Banana (2)', 'White rice (150g)', 'Grilled chicken (150g)', 'Scrambled eggs (3)', 'Greek yogurt (200g)', 'Protein bar', 'Tuna sandwich', 'Sweet potato', 'Quinoa bowl', 'Salmon (150g)', 'Cottage cheese (200g)', 'Peanut butter toast', 'Recovery shake', 'Milk (500ml)', 'Oats + honey', 'Fruit salad', 'Turkey wrap', 'Lentil soup'],
    supplements: ['Creatine (5g)', 'Caffeine (100-200mg)', 'Beta-alanine (3g)', 'BCAAs (10g)', 'Electrolyte tabs'],
    tips: { pre: 'Eat 1-2 hrs before. High GI carbs for quick energy. Avoid heavy fats.', during: 'Hydrate between sprint sets. Replace electrolytes.', post: '3:1 carb-to-protein ratio within 30 min of finishing.' }
  },
  endurance: {
    pre: ['Oatmeal (150g) + banana', 'Whole grain pasta (200g)', 'Brown rice (150g)', 'Banana (2)', 'Whole grain toast (2)', 'Boiled eggs (2)', 'Orange juice', 'Sweet potato mash', 'Granola bar', 'Multigrain bread', 'Baked beans on toast', 'Porridge + berries', 'Bagel + jam', 'Banana smoothie', 'Quinoa porridge', 'Rice pudding', 'Muesli + milk', 'Fruit toast', 'Energy balls (oat+honey)', 'Corn pasta'],
    during: ['Energy gels (every 45 min)', 'Banana at aid stations', 'Sports drink (continuous)', 'Rice balls', 'Dates', 'Boiled potato + salt', 'Homemade energy bars', 'Coconut water', 'Dried mango strips', 'Electrolyte tabs', 'Water (500ml/hr)'],
    post: ['Pasta + tomato sauce', 'Salmon + rice', 'Chicken + sweet potato', 'Recovery shake', 'Greek yogurt + granola', 'Tuna pasta bake', 'Bean stew + rice', 'Chicken noodle stir-fry', 'Lentil dhal + rice', 'Protein pancakes', 'Cottage cheese + fruit', 'Egg fried rice', 'Smoothie bowl', 'Hummus + pitta', 'Beef stir-fry + rice', 'Fish pie', 'Tofu scramble', 'Whole grain cereal + milk', 'Vegetable curry + rice', 'Pesto pasta + chicken'],
    supplements: ['Electrolyte tabs', 'Beetroot juice (nitrates)', 'Iron supplement', 'Vitamin D', 'Omega-3 (2g)', 'Magnesium (300mg)'],
    tips: { pre: '3 hrs before. Carb-load. Focus on slow-release energy.', during: '30-60g carbs/hr. Hydrate 500-750ml/hr.', post: 'Replenish glycogen within 30 min. High carb + moderate protein.' }
  },
  strength: {
    pre: ['White rice + chicken (100g)', 'Oatmeal + eggs (2)', 'Whole grain bread + peanut butter', 'Banana + whey shake', 'Sweet potato + tuna', 'Boiled eggs (3)', 'Greek yogurt + honey', 'Cottage cheese + fruit', 'Beef + rice bowl', 'Protein bar + banana', 'Milk (500ml)', 'Quinoa + chicken', 'Turkey sandwich', 'Salmon + potato', 'Lentil soup + bread', 'Tofu stir-fry + rice', 'Egg white omelette', 'Casein pudding', 'Chickpea curry + rice', 'Pork + sweet potato'],
    during: ['BCAAs in water (10g)', 'Glucose tabs if needed', 'Water (200ml every 30 min)', 'Electrolyte drink', 'Small banana between sets', 'Coconut water'],
    post: ['Whey protein shake (40g)', 'White rice (200g)', 'Chicken breast (200g)', 'Whole eggs (4)', 'Milk (500ml)', 'Beef steak', 'Tuna + pasta', 'Salmon + rice', 'Greek yogurt + banana', 'Cottage cheese (300g)', 'Casein protein', 'Turkey breast + potato', 'Egg + avocado toast', 'Tofu + quinoa', 'Legumes + brown rice', 'Pork tenderloin + sweet potato', 'Lamb chops + mash', 'Cheese omelette', 'Protein ice cream', 'Edamame + rice'],
    supplements: ['Creatine (5g/day)', 'Whey protein (30-40g)', 'ZMA (zinc+magnesium)', 'Vitamin D3 + K2', 'Collagen peptides', 'Caffeine pre-workout'],
    tips: { pre: '1.5-2 hrs before. High protein + moderate carbs.', during: 'Sip BCAAs. Stay hydrated 200ml/30 min.', post: 'Anabolic window! 40g protein within 30 min.' }
  },
  agility: {
    pre: ['Banana (1 large)', 'White rice (100g)', 'Energy bar', 'Sports drink (200ml)', 'Toast + honey', 'Dates (4-5)', 'Rice cakes + jam', 'Watermelon (1 cup)', 'Orange slices', 'Small bowl cereal + milk', 'Fruit smoothie', 'Soft pretzel', 'Glucose biscuits', 'Light pasta (small)', 'Boiled potato (small)', 'Grapes (1 cup)', 'Pineapple juice', 'Small muffin', 'Oat bar', 'Fig rolls'],
    during: ['Water (150ml every 20 min)', 'Electrolyte drink', 'Sports drink (sips)', 'Energy gel (if over 60 min)', 'Banana (half)', 'Glucose tablet', 'Coconut water', 'Salt tabs (if hot)', 'Carb chews', 'Isotonic drink'],
    post: ['Chicken + rice', 'Protein shake (25g)', 'Banana + milk', 'Greek yogurt + granola', 'Tuna wrap', 'Eggs on toast', 'Sweet potato + chicken', 'Smoothie bowl', 'Salmon + noodles', 'Cottage cheese + berries', 'Peanut butter + banana wrap', 'Chocolate milk', 'Rice bowl + veggies + chicken', 'Protein bar + fruit', 'Pasta + lean mince', 'Stir-fry chicken + rice', 'Boiled eggs + rice cakes', 'Avocado toast + eggs', 'Recovery shake', 'Oat pancakes + honey'],
    supplements: ['Creatine (3-5g)', 'Caffeine (pre-session)', 'BCAAs (8-10g)', 'Electrolyte tabs', 'Vitamin C (500mg)', 'Magnesium (before bed)'],
    tips: { pre: '1-2 hrs before. Fast-digesting carbs. Light meal — avoid heavy foods.', during: 'Hydrate frequently. Short sessions: water only. Long: electrolytes.', post: 'Protein + carbs within 30 min. Focus on muscle repair and glycogen refill.' }
  },
  flexibility: {
    pre: ['Banana smoothie', 'Almonds (30g)', 'Green tea', 'Mixed berries (1 cup)', 'Avocado toast', 'Light oatmeal', 'Fruit salad', 'Chia seed pudding', 'Kiwi + OJ', 'Herbal tea + honey', 'Rice cakes + almond butter', 'Small yogurt', 'Walnuts (handful)', 'Mango slices', 'Coconut water', 'Light miso soup', 'Melon cubes', 'Pear + cheese', 'Pumpkin seeds', 'Celery + hummus'],
    during: ['Water + lemon (200ml)', 'Coconut water (200ml)', 'Warm herbal tea', 'Electrolyte water', 'Plain water (small sips)'],
    post: ['Tart cherry juice', 'Turmeric golden milk', 'Salmon (150g)', 'Walnuts + berries', 'Spinach salad + olive oil', 'Anti-inflammatory smoothie', 'Ginger tea', 'Avocado + seeds', 'Dark chocolate (20g)', 'Bone broth', 'Blueberry yogurt', 'Pineapple chunks', 'Sardines (omega-3)', 'Sweet potato soup', 'Beetroot salad', 'Kale chips', 'Matcha latte', 'Hemp seeds + fruit', 'Chia pudding + mango', 'Lemon ginger water'],
    supplements: ['Omega-3 fish oil (2g)', 'Magnesium glycinate', 'Tart cherry extract', 'Collagen peptides (10g)', 'Vitamin C (500mg)', 'Curcumin (turmeric)'],
    tips: { pre: '1-2 hrs before. Light, anti-inflammatory foods.', during: 'Hydration key for fascia health.', post: 'Anti-inflammatory focus. Omega-3 + antioxidants for recovery.' }
  }
}

// ─── Calorie calculators ────────────────────────────────────────
function calcSpeed(distanceM, timeSec, weight) {
  const w = parseFloat(weight) || 70
  const d = parseFloat(distanceM) || 0
  const t = parseFloat(timeSec) || 0
  // If time given, use actual speed. Else estimate
  let speedKmh = 20 // default sprint speed
  if (t > 0 && d > 0) speedKmh = (d / 1000) / (t / 3600)
  const met = speedKmh > 18 ? 23 : speedKmh > 14 ? 19 : 14
  const hours = t > 0 ? t / 3600 : (d / 1000) / speedKmh
  const burned = Math.round(met * w * hours)
  const pace = t > 0 ? `${(t / (d / 100)).toFixed(1)}s / 100m` : `Est. at ${speedKmh.toFixed(0)} km/h`
  return { burned, pace, speed: speedKmh.toFixed(1) }
}

function calcEndurance(distanceKm, timeSec, weight) {
  const w = parseFloat(weight) || 70
  const d = parseFloat(distanceKm) || 0
  const t = parseFloat(timeSec) || 0
  let speedKmh = 10
  if (t > 0 && d > 0) speedKmh = d / (t / 3600)
  const met = speedKmh > 14 ? 14 : speedKmh > 10 ? 11 : 8
  const hours = t > 0 ? t / 3600 : d / speedKmh
  const burned = Math.round(met * w * hours)
  const pace = t > 0 ? `${Math.floor(t / 60 / d)}:${String(Math.round((t / 60 / d % 1) * 60)).padStart(2, '0')} min/km` : `Est. at ${speedKmh.toFixed(0)} km/h`
  return { burned, pace, speed: speedKmh.toFixed(1) }
}

function calcStrength(sets, reps, loadKg, weight) {
  const w = parseFloat(weight) || 70
  const s = parseFloat(sets) || 0
  const r = parseFloat(reps) || 0
  const l = parseFloat(loadKg) || 0
  // Volume load method: sets × reps × load
  const volumeLoad = s * r * l
  // Approx calories: MET 6 + extra for load
  const timeMin = s * r * 0.05 + s * 2 // ~3 sec/rep + 2 min rest/set
  const burned = Math.round((6 + (l / w) * 2) * w * (timeMin / 60))
  return { burned, volumeLoad: Math.round(volumeLoad), timeMin: Math.round(timeMin) }
}

function calcAgility(durationMin, weight) {
  const w = parseFloat(weight) || 70
  const t = parseFloat(durationMin) || 0
  const burned = Math.round(10 * w * (t / 60))
  return { burned }
}

function calcFlexibility(durationMin, weight) {
  const w = parseFloat(weight) || 70
  const t = parseFloat(durationMin) || 0
  const burned = Math.round(3 * w * (t / 60))
  return { burned }
}

function getIntakeAndMacros(burned) {
  const intake = Math.round(burned * 1.3)
  return {
    intake,
    carbs:   Math.round((intake * 0.55) / 4),
    protein: Math.round((intake * 0.25) / 4),
    fat:     Math.round((intake * 0.20) / 9),
  }
}

// ─── Reusable components ────────────────────────────────────────
const Label = ({ children, text3 }) => (
  <label style={{ color: text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>{children}</label>
)

const NumInput = ({ label, value, onChange, placeholder, suffix, color, border, text, text3, input }) => (
  <div>
    <Label text3={text3}>{label}</Label>
    <div style={{ position: 'relative' }}>
      <input type="number" placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
        style={{ width: '100%', background: input, border: `1px solid ${border}`, borderRadius: 12, padding: suffix ? '13px 40px 13px 14px' : '13px 14px', color: text, fontSize: 15, fontFamily: "'Barlow', sans-serif", outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s' }}
        onFocus={e => e.target.style.borderColor = `${color}66`}
        onBlur={e => e.target.style.borderColor = border} />
      {suffix && <span style={{ position: 'absolute', right: 12, top: 14, color: text3, fontSize: 11 }}>{suffix}</span>}
    </div>
  </div>
)

function FoodList({ title, color, foods }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 800, color, letterSpacing: 1 }}>{title}</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {foods.map(f => <span key={f} style={{ background: `${color}12`, border: `1px solid ${color}30`, borderRadius: 8, padding: '5px 10px', color, fontSize: 12 }}>{f}</span>)}
      </div>
    </div>
  )
}

function ResultStats({ burned, intake, carbs, protein, fat, color, bg2, bg3, border, text, text2, text3 }) {
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
        {[{ label: 'Calories Burned', value: burned, color }, { label: 'Intake Target', value: intake, color: '#FF7A00' }].map(s => (
          <div key={s.label} style={{ background: bg2, border: `1px solid ${s.color}22`, borderRadius: 14, padding: 16, textAlign: 'center', transition: 'all 0.3s' }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 30, fontWeight: 900, color: s.color }}>{s.value.toLocaleString()}</div>
            <div style={{ color: text3, fontSize: 10, letterSpacing: 1, marginTop: 2 }}>KCAL</div>
            <div style={{ color: text2, fontSize: 11, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 14, padding: 16, marginBottom: 12, transition: 'all 0.3s' }}>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, color: text, marginBottom: 12 }}>Macro Targets</div>
        {[{ label: 'Carbohydrates', g: carbs, pct: 55, c: '#FF8C00' }, { label: 'Protein', g: protein, pct: 25, c: color }, { label: 'Fats', g: fat, pct: 20, c: '#E63946' }].map(m => (
          <div key={m.label} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ color: text2, fontSize: 12 }}>{m.label}</span>
              <span style={{ color: m.c, fontSize: 12, fontWeight: 700 }}>{m.g}g ({m.pct}%)</span>
            </div>
            <div style={{ background: bg3, borderRadius: 4, height: 6 }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${m.pct}%` }} transition={{ duration: 0.8 }}
                style={{ height: '100%', background: m.c, borderRadius: 4 }} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

// ─── Speed Calculator ───────────────────────────────────────────
function SpeedCalc({ training }) {
  const { weight: uw } = useUserStore()
  const th = useTheme()
  const [distance, setDistance] = useState('')
  const [time, setTime] = useState('')
  const [weight, setWeight] = useState(uw || '')
  const [result, setResult] = useState(null)

  const calc = () => {
    if (!distance || !weight) return
    const r = calcSpeed(distance, time, weight)
    setResult({ ...r, ...getIntakeAndMacros(r.burned) })
  }

  const db = nutritionDB.speed

  return (
    <div style={{ background: th.bg2, border: `1px solid ${th.border}`, borderRadius: 20, padding: 20, marginBottom: 12 }}>
      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, color: th.text, marginBottom: 16 }}>Workout Volume</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <NumInput label="Distance *" value={distance} onChange={setDistance} placeholder="e.g. 400" suffix="m" color={training.color} {...th} />
        <NumInput label="Time (optional)" value={time} onChange={setTime} placeholder="e.g. 52" suffix="sec" color={training.color} {...th} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <NumInput label="Body Weight" value={weight} onChange={setWeight} placeholder="70" suffix="kg" color={training.color} {...th} />
      </div>

      <div style={{ background: `${training.color}10`, border: `1px solid ${training.color}22`, borderRadius: 10, padding: '10px 14px', marginBottom: 16 }}>
        <span style={{ color: training.color, fontSize: 12 }}>💡 Time is optional — if you add it, we calculate your actual pace & speed</span>
      </div>

      <motion.button whileTap={{ scale: 0.97 }} onClick={calc} disabled={!distance || !weight}
        style={{ width: '100%', padding: '14px', background: (!distance || !weight) ? th.bg3 : `linear-gradient(135deg, ${training.color}, ${training.color}cc)`, border: 'none', borderRadius: 12, cursor: (!distance || !weight) ? 'not-allowed' : 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 17, fontWeight: 800, letterSpacing: 2, color: (!distance || !weight) ? th.text3 : '#fff', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.3s' }}>
        <Calculator size={16} /> Calculate
      </motion.button>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ marginTop: 20 }}>
            {time && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                {[{ label: 'Pace', value: result.pace }, { label: 'Avg Speed', value: `${result.speed} km/h` }].map(s => (
                  <div key={s.label} style={{ background: `${training.color}10`, border: `1px solid ${training.color}22`, borderRadius: 12, padding: '12px 14px', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, color: training.color }}>{s.value}</div>
                    <div style={{ color: th.text3, fontSize: 11, marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            )}
            <ResultStats {...result} color={training.color} {...th} />
            <FoodSuggestions db={db} color={training.color} {...th} />
            <ResetBtn onClick={() => { setResult(null); setDistance(''); setTime(''); }} {...th} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Endurance Calculator ───────────────────────────────────────
function EnduranceCalc({ training }) {
  const { weight: uw } = useUserStore()
  const th = useTheme()
  const [distance, setDistance] = useState('')
  const [timeMin, setTimeMin] = useState('')
  const [timeSec, setTimeSec] = useState('')
  const [weight, setWeight] = useState(uw || '')
  const [result, setResult] = useState(null)

  const calc = () => {
    if (!distance || !weight) return
    const totalSec = (parseFloat(timeMin || 0) * 60) + parseFloat(timeSec || 0)
    const r = calcEndurance(distance, totalSec, weight)
    setResult({ ...r, ...getIntakeAndMacros(r.burned) })
  }

  const db = nutritionDB.endurance

  return (
    <div style={{ background: th.bg2, border: `1px solid ${th.border}`, borderRadius: 20, padding: 20, marginBottom: 12 }}>
      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, color: th.text, marginBottom: 16 }}>Workout Volume</div>

      <div style={{ marginBottom: 12 }}>
        <NumInput label="Distance *" value={distance} onChange={setDistance} placeholder="e.g. 10" suffix="km" color={training.color} {...th} />
      </div>

      <Label text3={th.text3}>Time (optional)</Label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <NumInput label="Minutes" value={timeMin} onChange={setTimeMin} placeholder="e.g. 55" suffix="min" color={training.color} {...th} />
        <NumInput label="Seconds" value={timeSec} onChange={setTimeSec} placeholder="e.g. 30" suffix="sec" color={training.color} {...th} />
      </div>

      <div style={{ marginBottom: 16 }}>
        <NumInput label="Body Weight" value={weight} onChange={setWeight} placeholder="70" suffix="kg" color={training.color} {...th} />
      </div>

      <div style={{ background: `${training.color}10`, border: `1px solid ${training.color}22`, borderRadius: 10, padding: '10px 14px', marginBottom: 16 }}>
        <span style={{ color: training.color, fontSize: 12 }}>💡 Add time to get your exact pace. Without time, we estimate based on typical pace.</span>
      </div>

      <motion.button whileTap={{ scale: 0.97 }} onClick={calc} disabled={!distance || !weight}
        style={{ width: '100%', padding: '14px', background: (!distance || !weight) ? th.bg3 : `linear-gradient(135deg, ${training.color}, ${training.color}cc)`, border: 'none', borderRadius: 12, cursor: (!distance || !weight) ? 'not-allowed' : 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 17, fontWeight: 800, letterSpacing: 2, color: (!distance || !weight) ? th.text3 : '#fff', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.3s' }}>
        <Calculator size={16} /> Calculate
      </motion.button>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ marginTop: 20 }}>
            {(timeMin || timeSec) && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                {[{ label: 'Pace', value: result.pace }, { label: 'Avg Speed', value: `${result.speed} km/h` }].map(s => (
                  <div key={s.label} style={{ background: `${training.color}10`, border: `1px solid ${training.color}22`, borderRadius: 12, padding: '12px 14px', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, color: training.color }}>{s.value}</div>
                    <div style={{ color: th.text3, fontSize: 11, marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            )}
            <ResultStats {...result} color={training.color} {...th} />
            <FoodSuggestions db={db} color={training.color} {...th} />
            <ResetBtn onClick={() => { setResult(null); setDistance(''); setTimeMin(''); setTimeSec(''); }} {...th} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Strength Calculator ────────────────────────────────────────
function StrengthCalc({ training }) {
  const { weight: uw } = useUserStore()
  const th = useTheme()
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [load, setLoad] = useState('')
  const [weight, setWeight] = useState(uw || '')
  const [result, setResult] = useState(null)

  const calc = () => {
    if (!sets || !reps || !weight) return
    const r = calcStrength(sets, reps, load, weight)
    setResult({ ...r, ...getIntakeAndMacros(r.burned) })
  }

  const db = nutritionDB.strength

  return (
    <div style={{ background: th.bg2, border: `1px solid ${th.border}`, borderRadius: 20, padding: 20, marginBottom: 12 }}>
      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, color: th.text, marginBottom: 16 }}>Workout Volume</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <NumInput label="Sets *" value={sets} onChange={setSets} placeholder="e.g. 4" suffix="sets" color={training.color} {...th} />
        <NumInput label="Reps *" value={reps} onChange={setReps} placeholder="e.g. 10" suffix="reps" color={training.color} {...th} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <NumInput label="Load (optional)" value={load} onChange={setLoad} placeholder="e.g. 80" suffix="kg" color={training.color} {...th} />
        <NumInput label="Body Weight *" value={weight} onChange={setWeight} placeholder="70" suffix="kg" color={training.color} {...th} />
      </div>

      {sets && reps && load && (
        <div style={{ background: `${training.color}10`, border: `1px solid ${training.color}22`, borderRadius: 10, padding: '12px 14px', marginBottom: 16 }}>
          <div style={{ color: training.color, fontSize: 11, letterSpacing: 1, fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 4 }}>VOLUME LOAD</div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 900, color: training.color }}>
            {(parseFloat(sets) * parseFloat(reps) * parseFloat(load)).toLocaleString()} kg
          </div>
          <div style={{ color: th.text3, fontSize: 11 }}>Total volume (sets × reps × load)</div>
        </div>
      )}

      <motion.button whileTap={{ scale: 0.97 }} onClick={calc} disabled={!sets || !reps || !weight}
        style={{ width: '100%', padding: '14px', background: (!sets || !reps || !weight) ? th.bg3 : `linear-gradient(135deg, ${training.color}, ${training.color}cc)`, border: 'none', borderRadius: 12, cursor: (!sets || !reps || !weight) ? 'not-allowed' : 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 17, fontWeight: 800, letterSpacing: 2, color: (!sets || !reps || !weight) ? th.text3 : '#fff', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.3s' }}>
        <Calculator size={16} /> Calculate
      </motion.button>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ marginTop: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
              {[
                { label: 'Volume Load', value: `${result.volumeLoad.toLocaleString()} kg` },
                { label: 'Est. Time',   value: `~${result.timeMin} min` },
              ].map(s => (
                <div key={s.label} style={{ background: `${training.color}10`, border: `1px solid ${training.color}22`, borderRadius: 12, padding: '12px 14px', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, color: training.color }}>{s.value}</div>
                  <div style={{ color: th.text3, fontSize: 11, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <ResultStats {...result} color={training.color} {...th} />
            <FoodSuggestions db={db} color={training.color} {...th} />
            <ResetBtn onClick={() => { setResult(null); setSets(''); setReps(''); setLoad(''); }} {...th} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Agility Calculator ─────────────────────────────────────────
function AgilityCalc({ training }) {
  const { weight: uw } = useUserStore()
  const th = useTheme()
  const [duration, setDuration] = useState('')
  const [weight, setWeight] = useState(uw || '')
  const [result, setResult] = useState(null)

  const calc = () => {
    if (!duration || !weight) return
    const r = calcAgility(duration, weight)
    setResult({ ...r, ...getIntakeAndMacros(r.burned) })
  }

  const db = nutritionDB.agility

  return (
    <div style={{ background: th.bg2, border: `1px solid ${th.border}`, borderRadius: 20, padding: 20, marginBottom: 12 }}>
      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, color: th.text, marginBottom: 16 }}>Workout Volume</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <NumInput label="Duration *" value={duration} onChange={setDuration} placeholder="e.g. 45" suffix="min" color={training.color} {...th} />
        <NumInput label="Body Weight *" value={weight} onChange={setWeight} placeholder="70" suffix="kg" color={training.color} {...th} />
      </div>

      <motion.button whileTap={{ scale: 0.97 }} onClick={calc} disabled={!duration || !weight}
        style={{ width: '100%', padding: '14px', background: (!duration || !weight) ? th.bg3 : `linear-gradient(135deg, ${training.color}, ${training.color}cc)`, border: 'none', borderRadius: 12, cursor: (!duration || !weight) ? 'not-allowed' : 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 17, fontWeight: 800, letterSpacing: 2, color: (!duration || !weight) ? th.text3 : '#fff', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.3s' }}>
        <Calculator size={16} /> Calculate
      </motion.button>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ marginTop: 20 }}>
            <ResultStats {...result} color={training.color} {...th} />
            <FoodSuggestions db={db} color={training.color} {...th} />
            <ResetBtn onClick={() => { setResult(null); setDuration(''); }} {...th} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Flexibility Calculator ─────────────────────────────────────
function FlexibilityCalc({ training }) {
  const { weight: uw } = useUserStore()
  const th = useTheme()
  const [duration, setDuration] = useState('')
  const [weight, setWeight] = useState(uw || '')
  const [result, setResult] = useState(null)

  const calc = () => {
    if (!duration || !weight) return
    const r = calcFlexibility(duration, weight)
    setResult({ ...r, ...getIntakeAndMacros(r.burned) })
  }

  const db = nutritionDB.flexibility

  return (
    <div style={{ background: th.bg2, border: `1px solid ${th.border}`, borderRadius: 20, padding: 20, marginBottom: 12 }}>
      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, color: th.text, marginBottom: 16 }}>Workout Volume</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <NumInput label="Duration *" value={duration} onChange={setDuration} placeholder="e.g. 45" suffix="min" color={training.color} {...th} />
        <NumInput label="Body Weight *" value={weight} onChange={setWeight} placeholder="70" suffix="kg" color={training.color} {...th} />
      </div>

      <motion.button whileTap={{ scale: 0.97 }} onClick={calc} disabled={!duration || !weight}
        style={{ width: '100%', padding: '14px', background: (!duration || !weight) ? th.bg3 : `linear-gradient(135deg, ${training.color}, ${training.color}cc)`, border: 'none', borderRadius: 12, cursor: (!duration || !weight) ? 'not-allowed' : 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 17, fontWeight: 800, letterSpacing: 2, color: (!duration || !weight) ? th.text3 : '#fff', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.3s' }}>
        <Calculator size={16} /> Calculate
      </motion.button>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ marginTop: 20 }}>
            <ResultStats {...result} color={training.color} {...th} />
            <FoodSuggestions db={db} color={training.color} {...th} />
            <ResetBtn onClick={() => { setResult(null); setDuration(''); }} {...th} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Food Suggestions ───────────────────────────────────────────
function FoodSuggestions({ db, color, bg2, border, text, text2, text3 }) {
  return (
    <div style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 16, padding: 20, marginBottom: 12, transition: 'all 0.3s' }}>
      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 900, color: text, marginBottom: 4 }}>Food Suggestions</div>
      <p style={{ color: text3, fontSize: 12, marginBottom: 20 }}>{db.pre.length + db.during.length + db.post.length}+ foods recommended</p>

      <div style={{ background: `${color}10`, border: `1px solid ${color}22`, borderRadius: 10, padding: '10px 14px', marginBottom: 16 }}>
        <div style={{ color, fontSize: 11, letterSpacing: 1, fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 2 }}>⏰ PRE WORKOUT</div>
        <div style={{ color: text2, fontSize: 12 }}>{db.tips.pre}</div>
      </div>
      <FoodList title="⏰ Pre Workout" color={color} foods={db.pre} />

      <div style={{ background: '#FF305710', border: '1px solid #FF305722', borderRadius: 10, padding: '10px 14px', marginBottom: 16 }}>
        <div style={{ color: '#FF3057', fontSize: 11, letterSpacing: 1, fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 2 }}>🔥 DURING WORKOUT</div>
        <div style={{ color: text2, fontSize: 12 }}>{db.tips.during}</div>
      </div>
      <FoodList title="🔥 During Workout" color="#FF3057" foods={db.during} />

      <div style={{ background: '#00E67610', border: '1px solid #00E67622', borderRadius: 10, padding: '10px 14px', marginBottom: 16 }}>
        <div style={{ color: '#00E676', fontSize: 11, letterSpacing: 1, fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 2 }}>🏁 POST WORKOUT</div>
        <div style={{ color: text2, fontSize: 12 }}>{db.tips.post}</div>
      </div>
      <FoodList title="🏁 Post Workout" color="#00E676" foods={db.post} />

      <div style={{ borderTop: `1px solid ${border}`, paddingTop: 16 }}>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 800, color: text3, letterSpacing: 1, marginBottom: 10 }}>💊 SUPPLEMENTS</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {db.supplements.map(s => <span key={s} style={{ background: `${color}15`, border: `1px solid ${color}33`, borderRadius: 8, padding: '5px 10px', color, fontSize: 12 }}>{s}</span>)}
        </div>
      </div>
    </div>
  )
}

function ResetBtn({ onClick, border, text3 }) {
  return (
    <motion.button whileTap={{ scale: 0.97 }} onClick={onClick}
      style={{ width: '100%', padding: '13px', background: 'transparent', border: `1px solid ${border}`, borderRadius: 12, cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: 2, color: text3, textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
      <RotateCcw size={13} /> Reset
    </motion.button>
  )
}

// ─── Training Detail Page ───────────────────────────────────────
function TrainingDetail({ training, onBack }) {
  const { bg, text, text3 } = useTheme()
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: text3, marginBottom: 24, padding: 0 }}>
        <ArrowLeft size={16} /> <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, fontSize: 14 }}>BACK</span>
      </button>

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${training.color}15`, border: `1px solid ${training.color}33`, borderRadius: 100, padding: '6px 14px', marginBottom: 16 }}>
        <Calculator size={12} color={training.color} />
        <span style={{ color: training.color, fontSize: 12, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1 }}>NUTRITION CALCULATOR</span>
      </div>
      <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, fontWeight: 900, color: text, letterSpacing: -0.5, margin: '0 0 6px' }}>{training.label}</h2>
      <p style={{ color: text3, fontSize: 13, marginBottom: 24 }}>Enter your workout details to get personalized nutrition</p>

      {training.id === 'speed'       && <SpeedCalc       training={training} />}
      {training.id === 'endurance'   && <EnduranceCalc   training={training} />}
      {training.id === 'strength'    && <StrengthCalc    training={training} />}
      {training.id === 'agility'     && <AgilityCalc     training={training} />}
      {training.id === 'flexibility' && <FlexibilityCalc training={training} />}
    </motion.div>
  )
}

// ─── Main Page ──────────────────────────────────────────────────
export default function TrainingDay() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [selected, setSelected] = useState(null)
  const { bg, bg2, border, text, text2, text3 } = useTheme()

  useEffect(() => {
    const typeParam = (searchParams.get('type') || '').toLowerCase().trim()
    if (!typeParam) return
    const match = trainingTypes.find(t => t.id === typeParam || t.label.toLowerCase() === typeParam)
    if (match) setSelected(match)
  }, [searchParams])

  return (
    <div style={{ minHeight: '100vh', background: bg, paddingBottom: 80, transition: 'background 0.3s' }}>
      <div style={{ padding: '56px 24px 24px', maxWidth: 480, margin: '0 auto' }}>
        {!selected ? (
          <>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <button onClick={() => navigate('/home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: text3, marginBottom: 24, padding: 0 }}>
                <ArrowLeft size={16} /> <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, fontSize: 14 }}>HOME</span>
              </button>
              <p style={{ color: text3, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 8 }}>Today's Session</p>
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 44, fontWeight: 900, color: text, letterSpacing: -1, margin: '0 0 8px' }}>Training Day<br /><span style={{ color: '#FF4D00' }}>Nutrition</span></h1>
              <p style={{ color: text3, fontSize: 13, marginBottom: 28 }}>Select training type → personalized nutrition calculator</p>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {trainingTypes.map((t, i) => {
                const Icon = t.icon
                return (
                  <motion.button key={t.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08, duration: 0.4 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setSelected(t)}
                    style={{ background: bg2, border: `1px solid ${t.color}22`, borderRadius: 18, padding: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left', transition: 'all 0.3s' }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: `${t.color}20`, border: `1px solid ${t.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={24} color={t.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 800, color: text }}>{t.label}</div>
                      <div style={{ color: text2, fontSize: 12, marginTop: 2 }}>{t.desc}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                        <Calculator size={11} color={t.color} />
                        <span style={{ color: t.color, fontSize: 11, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1 }}>
                          {t.id === 'strength' ? 'SETS × REPS × LOAD' : t.id === 'speed' ? 'DISTANCE + TIME' : t.id === 'endurance' ? 'DISTANCE + PACE' : 'DURATION BASED'}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={18} color={text3} />
                  </motion.button>
                )
              })}
            </div>
          </>
        ) : (
          <TrainingDetail training={selected} onBack={() => setSelected(null)} />
        )}
      </div>
      <BottomNav />
    </div>
  )
}