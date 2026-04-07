import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Zap, Heart, Dumbbell, PersonStanding, ChevronRight, ArrowLeft } from 'lucide-react'
import { useUserStore } from '../stores/userStore'
import { trainingNutrition } from '../data/sportsData'
import { useTheme } from '../hooks/useTheme'
import BottomNav from '../components/BottomNav'

const trainingTypes = [
  { id: 'speed',       icon: Zap,            label: 'Speed Training',        desc: 'Explosive sprints & high-intensity', color: '#FF4D00' },
  { id: 'endurance',   icon: Heart,          label: 'Endurance Training',    desc: 'Long-distance, sustained cardio',    color: '#4FC3F7' },
  { id: 'strength',    icon: Dumbbell,       label: 'Strength Training',     desc: 'Weights, resistance & power',        color: '#E63946' },
  { id: 'flexibility', icon: PersonStanding, label: 'Flexibility & Recovery',desc: 'Yoga, stretching & mobility',        color: '#00E676' },
]

function NutritionDetail({ data, weight, onBack }) {
  const { bg2, border, text, text3, foodTag, foodTagBorder, foodTagText } = useTheme()
  const cals = Math.round(weight * 10)
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: text3, marginBottom: 24, padding: 0 }}>
        <ArrowLeft size={16} /> <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, fontSize: 14 }}>BACK</span>
      </button>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${data.color}15`, border: `1px solid ${data.color}33`, borderRadius: 100, padding: '6px 14px', marginBottom: 16 }}>
        <span style={{ color: data.color, fontSize: 12, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1 }}>{data.focus}</span>
      </div>
      <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, fontWeight: 900, color: text, letterSpacing: -0.5, margin: '0 0 8px' }}>{data.name}</h2>
      <p style={{ color: text3, fontSize: 13, marginBottom: 28 }}>~{cals} kcal target based on your weight</p>
      {[
        { key: 'preWorkout',    label: 'Pre Workout',    emoji: '⏰', timing: data.preWorkout.timing },
        { key: 'duringWorkout', label: 'During Workout', emoji: '🔥', timing: 'As needed' },
        { key: 'postWorkout',   label: 'Post Workout',   emoji: '🏁', timing: data.postWorkout.timing },
      ].map((section) => {
        const d = data[section.key]
        return (
          <div key={section.key} style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 16, padding: 20, marginBottom: 12, transition: 'all 0.3s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 18 }}>{section.emoji}</span>
              <div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, color: text }}>{section.label}</div>
                <div style={{ color: data.color, fontSize: 11, letterSpacing: 1 }}>{section.timing}</div>
              </div>
              {d.macros && (
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                  {Object.entries(d.macros).map(([k, v]) => (
                    <div key={k} style={{ textAlign: 'center' }}>
                      <div style={{ color: data.color, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800 }}>{v}%</div>
                      <div style={{ color: text3, fontSize: 9, textTransform: 'uppercase' }}>{k}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
              {d.foods.map(f => (
                <span key={f} style={{ background: foodTag, border: `1px solid ${foodTagBorder}`, borderRadius: 8, padding: '5px 10px', color: foodTagText, fontSize: 12 }}>{f}</span>
              ))}
            </div>
            {d.tips && <p style={{ color: text3, fontSize: 12, borderTop: `1px solid ${border}`, paddingTop: 10, margin: 0, lineHeight: 1.5 }}>{d.tips}</p>}
            {d.hydration && <p style={{ color: '#4FC3F7', fontSize: 12, marginTop: 8, margin: 0 }}>💧 {d.hydration}</p>}
          </div>
        )
      })}
      {data.supplements && (
        <div style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 16, padding: 20, marginBottom: 12, transition: 'all 0.3s' }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, color: text, marginBottom: 12 }}>💊 Supplements</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {data.supplements.map(s => (
              <span key={s} style={{ background: `${data.color}15`, border: `1px solid ${data.color}33`, borderRadius: 8, padding: '5px 10px', color: data.color, fontSize: 12 }}>{s}</span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default function TrainingDay() {
  const navigate = useNavigate()
  const { weight } = useUserStore()
  const [selected, setSelected] = useState(null)
  const { bg, bg2, border, text, text2, text3 } = useTheme()
  const w = parseFloat(weight) || 70

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
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 44, fontWeight: 900, color: text, letterSpacing: -1, margin: '0 0 32px' }}>Training Day<br /><span style={{ color: '#FF4D00' }}>Nutrition</span></h1>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {trainingTypes.map((t, i) => {
                const Icon = t.icon
                return (
                  <motion.button key={t.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1, duration: 0.4 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setSelected(t.id)}
                    style={{ background: bg2, border: `1px solid ${t.color}22`, borderRadius: 18, padding: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left', transition: 'all 0.3s' }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: `${t.color}20`, border: `1px solid ${t.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={24} color={t.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 800, color: text }}>{t.label}</div>
                      <div style={{ color: text2, fontSize: 12, marginTop: 2 }}>{t.desc}</div>
                      <div style={{ color: t.color, fontSize: 11, marginTop: 4, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1 }}>{Math.round(w * 8)}–{Math.round(w * 12)} kcal</div>
                    </div>
                    <ChevronRight size={18} color={text3} />
                  </motion.button>
                )
              })}
            </div>
          </>
        ) : (
          <NutritionDetail data={trainingNutrition[selected]} weight={w} onBack={() => setSelected(null)} />
        )}
      </div>
      <BottomNav />
    </div>
  )
}