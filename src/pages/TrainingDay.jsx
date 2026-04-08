import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Zap, Heart, Dumbbell, PersonStanding, ChevronRight, ArrowLeft, Calculator, RotateCcw } from 'lucide-react'
import { useUserStore } from '../stores/userStore'
import { useTheme } from '../hooks/useTheme'
import BottomNav from '../components/BottomNav'

const trainingTypes = [
  { id: 'speed',       icon: Zap,            label: 'Speed Training',        desc: 'Explosive sprints & high-intensity', color: '#FF4D00', unit: 'distance', unitLabel: 'Total Distance (m)', placeholder: 'e.g. 400' },
  { id: 'endurance',   icon: Heart,          label: 'Endurance Training',    desc: 'Long-distance, sustained cardio',    color: '#4FC3F7', unit: 'distance', unitLabel: 'Total Distance (km)', placeholder: 'e.g. 10' },
  { id: 'strength',    icon: Dumbbell,       label: 'Strength Training',     desc: 'Weights, resistance & power',        color: '#E63946', unit: 'time',     unitLabel: 'Total Time (min)',    placeholder: 'e.g. 60' },
  { id: 'flexibility', icon: PersonStanding, label: 'Flexibility & Recovery',desc: 'Yoga, stretching & mobility',        color: '#00E676', unit: 'time',     unitLabel: 'Total Time (min)',    placeholder: 'e.g. 45' },
]

// 50+ foods per category per training type
const nutritionDB = {
  speed: {
    pre: [
      'White rice (100g)', 'Banana (1 large)', 'Honey (1 tbsp)', 'White bread toast',
      'Sports drink (250ml)', 'Energy gel', 'Dates (3-4)', 'Rice cakes',
      'Watermelon (1 cup)', 'Orange juice (200ml)', 'Boiled potato (small)',
      'Corn flakes with milk', 'Soft white roll', 'Pineapple chunks',
      'Glucose biscuits', 'Fig bars', 'Mango (half)', 'Grapes (1 cup)',
    ],
    during: [
      'Sports drink every 20 min', 'Energy gel every 30 min', 'Water (150ml)',
      'Glucose tablet', 'Electrolyte drink', 'Coconut water (small)',
      'Banana (half)', 'Salt tablet', 'Carb chews', 'Isotonic drink',
    ],
    post: [
      'Whey protein shake (30g)', 'Chocolate milk (400ml)', 'Banana (2)',
      'White rice (150g)', 'Grilled chicken breast (150g)', 'Eggs scrambled (3)',
      'Greek yogurt (200g)', 'Protein bar', 'Tuna sandwich', 'Sweet potato (medium)',
      'Quinoa bowl', 'Salmon fillet (150g)', 'Cottage cheese (200g)',
      'Peanut butter toast', 'Recovery shake', 'Milk (500ml)', 'Oats with honey',
      'Fruit salad', 'Turkey wrap', 'Lentil soup',
    ],
    supplements: ['Creatine monohydrate (5g)', 'Caffeine (100-200mg)', 'Beta-alanine (3g)', 'BCAAs (10g)', 'Electrolyte tabs'],
    tips: { pre: 'Eat 1-2 hours before. High GI carbs for quick energy.', during: 'Hydrate between sprint sets. Replace electrolytes.', post: '3:1 carb-to-protein ratio within 30 min.' }
  },
  endurance: {
    pre: [
      'Oatmeal (150g) with banana', 'Whole grain pasta (200g)', 'Brown rice (150g)',
      'Banana (2)', 'Whole grain toast (2 slices)', 'Eggs (2 boiled)', 'Orange juice',
      'Sweet potato mash', 'Granola bar', 'Multigrain bread', 'Baked beans on toast',
      'Porridge with berries', 'Bagel with jam', 'Smoothie (banana + oats)',
      'Quinoa porridge', 'Rice pudding', 'Muesli with milk', 'Fruit toast',
      'Energy balls (oat+honey)', 'Corn pasta',
    ],
    during: [
      'Energy gels every 45 min', 'Banana at aid stations', 'Sports drink continuously',
      'Rice balls', 'Dates', 'Boiled potato chunks with salt', 'Homemade energy bars',
      'Coconut water', 'Dried mango strips', 'Electrolyte tabs', 'Water (500ml/hr)',
    ],
    post: [
      'Pasta with tomato sauce', 'Salmon with rice', 'Chicken + sweet potato',
      'Recovery shake (protein+carb)', 'Greek yogurt + granola', 'Tuna pasta bake',
      'Bean stew with rice', 'Stir-fry chicken + noodles', 'Lentil dhal + rice',
      'Protein pancakes', 'Cottage cheese + fruit', 'Egg fried rice', 'Smoothie bowl',
      'Hummus + pitta bread', 'Beef stir-fry + rice', 'Fish pie', 'Tofu scramble',
      'Whole grain cereal + milk', 'Vegetable curry + rice', 'Pesto pasta + chicken',
    ],
    supplements: ['Electrolyte tabs', 'Beetroot juice (nitrates)', 'Iron supplement', 'Vitamin D', 'Omega-3 (fish oil)', 'Magnesium'],
    tips: { pre: '3 hrs before: carb-load. Focus on slow-release energy.', during: '30-60g carbs per hour. Hydrate 500-750ml/hr.', post: 'Replenish glycogen within 30 min. High carb + moderate protein.' }
  },
  strength: {
    pre: [
      'White rice (150g) + chicken (100g)', 'Oatmeal + eggs (2)', 'Whole grain bread + peanut butter',
      'Banana + whey shake', 'Sweet potato + tuna', 'Boiled eggs (3)', 'Greek yogurt + honey',
      'Cottage cheese + fruit', 'Beef + rice bowl', 'Protein bar + banana',
      'Milk (500ml)', 'Quinoa + chicken', 'Turkey sandwich', 'Salmon + potato',
      'Lentil soup + bread', 'Tofu stir-fry + rice', 'Egg white omelette',
      'Casein pudding', 'Meat pie', 'Chickpea curry + rice',
    ],
    during: [
      'BCAAs in water (10g)', 'Glucose tabs if needed', 'Water (200ml every 30 min)',
      'Electrolyte drink', 'Small banana between heavy sets', 'Coconut water',
    ],
    post: [
      'Whey protein shake (40g)', 'White rice (200g)', 'Chicken breast (200g)',
      'Whole eggs (4)', 'Milk (500ml)', 'Beef steak', 'Tuna + pasta',
      'Salmon fillet + rice', 'Greek yogurt + banana', 'Cottage cheese (300g)',
      'Casein protein before bed', 'Turkey breast + potato', 'Egg + avocado toast',
      'Tofu + quinoa', 'Legumes + brown rice', 'Pork tenderloin + sweet potato',
      'Lamb chops + mash', 'Cheese omelette', 'Protein ice cream', 'Edamame + rice',
    ],
    supplements: ['Creatine monohydrate (5g/day)', 'Whey protein (30-40g)', 'ZMA (zinc+magnesium)', 'Vitamin D3 + K2', 'Collagen peptides', 'Caffeine pre-workout'],
    tips: { pre: '1.5-2 hrs before. High protein + moderate carbs.', during: 'Sip BCAAs. Stay hydrated — 200ml every 30 min.', post: 'Anabolic window! 40g protein within 30 min. High protein critical.' }
  },
  flexibility: {
    pre: [
      'Banana smoothie', 'Almonds (30g)', 'Green tea', 'Mixed berries (1 cup)',
      'Avocado toast', 'Light oatmeal', 'Fruit salad', 'Chia seed pudding',
      'Kiwi + orange juice', 'Herbal tea + honey', 'Rice cakes + almond butter',
      'Small yogurt', 'Handful of walnuts', 'Fresh mango slices', 'Coconut water',
      'Light miso soup', 'Melon cubes', 'Pear + cheese', 'Pumpkin seeds',
      'Celery + hummus',
    ],
    during: [
      'Water with lemon (200ml)', 'Coconut water (200ml)', 'Herbal tea (warm)',
      'Electrolyte water', 'Small sips of plain water',
    ],
    post: [
      'Tart cherry juice (200ml)', 'Turmeric golden milk', 'Salmon (150g)',
      'Walnuts + berries', 'Spinach salad + olive oil', 'Anti-inflammatory smoothie',
      'Ginger tea', 'Avocado + seeds', 'Dark chocolate (20g)', 'Bone broth',
      'Blueberry yogurt', 'Pineapple chunks (bromelain)', 'Omega-3 rich sardines',
      'Sweet potato soup', 'Beetroot salad', 'Kale chips', 'Matcha latte',
      'Hemp seeds + fruit', 'Chia pudding + mango', 'Lemon + ginger water',
    ],
    supplements: ['Omega-3 fish oil (2g)', 'Magnesium glycinate', 'Tart cherry extract', 'Collagen peptides (10g)', 'Vitamin C (500mg)', 'Curcumin (turmeric)'],
    tips: { pre: '1-2 hrs before. Light, anti-inflammatory foods.', during: 'Hydration key for fascia health. Sip water continuously.', post: 'Anti-inflammatory focus. Omega-3 + antioxidants.' }
  }
}

// Calorie calculation
function calcCalories(type, volume, weight) {
  const w = parseFloat(weight) || 70
  const v = parseFloat(volume) || 0
  const met = { speed: 20, endurance: 11, strength: 6, flexibility: 3 }
  const m = met[type] || 8
  let burned = 0
  if (type === 'speed') {
    // volume = total meters
    const time = (v / 1000) / 12 // assume 12 km/h avg speed
    burned = Math.round(m * w * time)
  } else if (type === 'endurance') {
    // volume = km
    const time = v / 10 // assume 10 km/h
    burned = Math.round(m * w * time)
  } else {
    // volume = minutes
    burned = Math.round(m * w * (v / 60))
  }
  const intake = Math.round(burned * 1.3)
  const carbs   = Math.round((intake * 0.55) / 4)
  const protein = Math.round((intake * 0.25) / 4)
  const fat     = Math.round((intake * 0.20) / 9)
  return { burned, intake, carbs, protein, fat }
}

function FoodList({ title, color, foods, bg2, border, text, text3 }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, color, letterSpacing: 1, textTransform: 'uppercase' }}>{title}</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {foods.map(f => (
          <span key={f} style={{ background: `${color}12`, border: `1px solid ${color}30`, borderRadius: 8, padding: '5px 10px', color, fontSize: 12 }}>{f}</span>
        ))}
      </div>
    </div>
  )
}

function TrainingCalculator({ training, onBack }) {
  const { weight: userWeight } = useUserStore()
  const { bg, bg2, bg3, border, text, text2, text3, input } = useTheme()
  const [volume, setVolume] = useState('')
  const [weight, setWeight] = useState(userWeight || '')
  const [result, setResult] = useState(null)

  const db = nutritionDB[training.id]

  const calculate = () => {
    if (!volume || !weight) return
    const calc = calcCalories(training.id, volume, weight)
    setResult(calc)
  }

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: text3, marginBottom: 24, padding: 0 }}>
        <ArrowLeft size={16} /> <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, fontSize: 14 }}>BACK</span>
      </button>

      {/* Header */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${training.color}15`, border: `1px solid ${training.color}33`, borderRadius: 100, padding: '6px 14px', marginBottom: 16 }}>
        <Calculator size={12} color={training.color} />
        <span style={{ color: training.color, fontSize: 12, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1 }}>NUTRITION CALCULATOR</span>
      </div>
      <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, fontWeight: 900, color: text, letterSpacing: -0.5, margin: '0 0 6px' }}>{training.label}</h2>
      <p style={{ color: text3, fontSize: 13, marginBottom: 24 }}>Enter your workout volume to get personalized nutrition</p>

      {/* Calculator Card */}
      <div style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 20, padding: 20, marginBottom: 16, transition: 'all 0.3s' }}>

        {/* Volume + Weight inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ color: text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>
              Volume
            </label>
            <div style={{ position: 'relative' }}>
              <input type="number" placeholder={training.placeholder} value={volume} onChange={e => setVolume(e.target.value)}
                style={{ width: '100%', background: input, border: `1px solid ${border}`, borderRadius: 12, padding: '13px 14px', color: text, fontSize: 15, fontFamily: "'Barlow', sans-serif", outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s' }}
                onFocus={e => e.target.style.borderColor = `${training.color}66`}
                onBlur={e => e.target.style.borderColor = border} />
              <div style={{ color: text3, fontSize: 10, marginTop: 4, letterSpacing: 1 }}>{training.unitLabel}</div>
            </div>
          </div>
          <div>
            <label style={{ color: text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>
              Body Weight
            </label>
            <div style={{ position: 'relative' }}>
              <input type="number" placeholder="70" value={weight} onChange={e => setWeight(e.target.value)}
                style={{ width: '100%', background: input, border: `1px solid ${border}`, borderRadius: 12, padding: '13px 40px 13px 14px', color: text, fontSize: 15, fontFamily: "'Barlow', sans-serif", outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s' }}
                onFocus={e => e.target.style.borderColor = `${training.color}66`}
                onBlur={e => e.target.style.borderColor = border} />
              <span style={{ position: 'absolute', right: 12, top: 14, color: text3, fontSize: 11 }}>kg</span>
            </div>
            <div style={{ color: text3, fontSize: 10, marginTop: 4, letterSpacing: 1 }}>BODY WEIGHT</div>
          </div>
        </div>

        <motion.button whileTap={{ scale: 0.97 }} onClick={calculate} disabled={!volume || !weight}
          style={{
            width: '100%', padding: '15px', background: (!volume || !weight) ? bg3 : `linear-gradient(135deg, ${training.color}, ${training.color}cc)`,
            border: 'none', borderRadius: 12, cursor: (!volume || !weight) ? 'not-allowed' : 'pointer',
            fontFamily: "'Barlow Condensed', sans-serif", fontSize: 17, fontWeight: 800,
            letterSpacing: 2, color: (!volume || !weight) ? text3 : '#fff', textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.3s'
          }}>
          <Calculator size={16} /> Calculate Nutrition
        </motion.button>
      </div>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

            {/* Calorie Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
              {[
                { label: 'Calories Burned', value: result.burned, color: training.color },
                { label: 'Intake Target',   value: result.intake, color: '#FF7A00' },
              ].map(s => (
                <div key={s.label} style={{ background: bg2, border: `1px solid ${s.color}22`, borderRadius: 14, padding: 16, textAlign: 'center', transition: 'all 0.3s' }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 30, fontWeight: 900, color: s.color }}>{s.value.toLocaleString()}</div>
                  <div style={{ color: text3, fontSize: 10, letterSpacing: 1, marginTop: 2 }}>KCAL</div>
                  <div style={{ color: text2, fontSize: 11, marginTop: 4, fontFamily: "'Barlow Condensed', sans-serif" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Macro breakdown */}
            <div style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 14, padding: 16, marginBottom: 12, transition: 'all 0.3s' }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, color: text, marginBottom: 12 }}>Macro Targets</div>
              {[
                { label: 'Carbohydrates', g: result.carbs,   pct: 55, color: '#FF8C00' },
                { label: 'Protein',       g: result.protein, pct: 25, color: training.color },
                { label: 'Fats',          g: result.fat,     pct: 20, color: '#E63946' },
              ].map(m => (
                <div key={m.label} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ color: text2, fontSize: 12 }}>{m.label}</span>
                    <span style={{ color: m.color, fontSize: 12, fontWeight: 700 }}>{m.g}g ({m.pct}%)</span>
                  </div>
                  <div style={{ background: bg3, borderRadius: 4, height: 6 }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${m.pct}%` }} transition={{ duration: 0.8 }}
                      style={{ height: '100%', background: m.color, borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Food suggestions */}
            <div style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 16, padding: 20, marginBottom: 12, transition: 'all 0.3s' }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 900, color: text, marginBottom: 4 }}>Food Suggestions</div>
              <p style={{ color: text3, fontSize: 12, marginBottom: 20 }}>{db.foods?.length || (db.pre.length + db.during.length + db.post.length)}+ foods recommended</p>

              {/* Pre workout tip */}
              <div style={{ background: `${training.color}10`, border: `1px solid ${training.color}22`, borderRadius: 10, padding: '10px 14px', marginBottom: 16 }}>
                <div style={{ color: training.color, fontSize: 11, letterSpacing: 1, fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 2 }}>⏰ PRE WORKOUT TIP</div>
                <div style={{ color: text2, fontSize: 12 }}>{db.tips.pre}</div>
              </div>

              <FoodList title="⏰ Pre Workout" color={training.color} foods={db.pre} bg2={bg2} border={border} text={text} text3={text3} />

              {/* During tip */}
              <div style={{ background: '#FF305710', border: '1px solid #FF305722', borderRadius: 10, padding: '10px 14px', marginBottom: 16 }}>
                <div style={{ color: '#FF3057', fontSize: 11, letterSpacing: 1, fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 2 }}>🔥 DURING WORKOUT TIP</div>
                <div style={{ color: text2, fontSize: 12 }}>{db.tips.during}</div>
              </div>

              <FoodList title="🔥 During Workout" color="#FF3057" foods={db.during} bg2={bg2} border={border} text={text} text3={text3} />

              {/* Post tip */}
              <div style={{ background: '#00E67610', border: '1px solid #00E67622', borderRadius: 10, padding: '10px 14px', marginBottom: 16 }}>
                <div style={{ color: '#00E676', fontSize: 11, letterSpacing: 1, fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 2 }}>🏁 POST WORKOUT TIP</div>
                <div style={{ color: text2, fontSize: 12 }}>{db.tips.post}</div>
              </div>

              <FoodList title="🏁 Post Workout" color="#00E676" foods={db.post} bg2={bg2} border={border} text={text} text3={text3} />

              {/* Supplements */}
              <div style={{ borderTop: `1px solid ${border}`, paddingTop: 16, marginTop: 4 }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 800, color: text3, letterSpacing: 1, marginBottom: 10 }}>💊 SUPPLEMENTS</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {db.supplements.map(s => (
                    <span key={s} style={{ background: `${training.color}15`, border: `1px solid ${training.color}33`, borderRadius: 8, padding: '5px 10px', color: training.color, fontSize: 12 }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>

            <motion.button whileTap={{ scale: 0.97 }} onClick={() => { setResult(null); setVolume(''); }}
              style={{ width: '100%', padding: '13px', background: 'transparent', border: `1px solid ${border}`, borderRadius: 12, cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: 2, color: text3, textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <RotateCcw size={13} /> Reset
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function TrainingDay() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const { bg, bg2, border, text, text2, text3 } = useTheme()

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
              <p style={{ color: text3, fontSize: 13, marginBottom: 28 }}>Select your training type → get personalized nutrition calculator</p>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {trainingTypes.map((t, i) => {
                const Icon = t.icon
                return (
                  <motion.button key={t.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1, duration: 0.4 }} whileTap={{ scale: 0.98 }}
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
                        <span style={{ color: t.color, fontSize: 11, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1 }}>NUTRITION CALCULATOR</span>
                      </div>
                    </div>
                    <ChevronRight size={18} color={text3} />
                  </motion.button>
                )
              })}
            </div>
          </>
        ) : (
          <TrainingCalculator training={selected} onBack={() => setSelected(null)} />
        )}
      </div>
      <BottomNav />
    </div>
  )
}