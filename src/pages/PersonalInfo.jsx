import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useUserStore } from '../stores/userStore'
import { useTheme } from '../hooks/useTheme'


const sports = ['Athletics', 'Swimming', 'Cycling', 'Weightlifting', 'Gymnastics', 'Football', 'Basketball', 'Cricket', 'Tennis', 'Badminton', 'Volleyball', 'Boxing', 'Wrestling', 'Rowing', 'Triathlon', 'Other']
const goals = [
  { id: 'performance', label: 'Peak Performance', desc: 'Maximize athletic output' },
  { id: 'bulk', label: 'Build Muscle', desc: 'Gain mass & strength' },
  { id: 'cut', label: 'Lose Fat', desc: 'Cut weight, keep muscle' },
  { id: 'maintain', label: 'Maintain Weight', desc: 'Stay at current weight' },
]

const Input = ({ label, value, onChange, placeholder, type = 'text', suffix, text2, bg2, border, text }) => (
  <div style={{ marginBottom: 20 }}>
    <label style={{ color: text2, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>{label}</label>
    <div style={{ position: 'relative' }}>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', background: bg2, border: `1px solid ${border}`,
          borderRadius: 12, padding: suffix ? '14px 48px 14px 16px' : '14px 16px',
          color: text, fontSize: 16, fontFamily: "'Barlow', sans-serif",
          outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s'
        }}
        onFocus={e => e.target.style.borderColor = '#FF4D0066'}
        onBlur={e => e.target.style.borderColor = border}
      />
      {suffix && <span style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: text2, fontSize: 13 }}>{suffix}</span>}
    </div>
  </div>
)

export default function PersonalInfo() {
  const navigate = useNavigate()
  const setUserInfo = useUserStore(s => s.setUserInfo)
  const { theme, bg, bg2, bg3, border, text, text2 } = useTheme()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ name: '', age: '', height: '', weight: '', gender: '', sport: '', goal: '' })

  const update = (field) => (val) => setForm(f => ({ ...f, [field]: val }))

  const canNext = [
    form.name && form.age,
    form.height && form.weight && form.gender,
    form.sport && form.goal
  ][step]

  const handleFinish = () => {
    setUserInfo(form)
    navigate('/home')
  }

  const steps = ['About You', 'Body Stats', 'Sport & Goal']

  return (
    <div style={{ minHeight: '100vh', background: bg, padding: '0 24px 40px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,77,0,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ paddingTop: 60, marginBottom: 40 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            {steps.map((s, i) => (
              <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? '#FF4D00' : bg3, transition: 'background 0.3s' }} />
            ))}
          </div>
          <p style={{ color: text2, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 8 }}>Step {step + 1} of 3</p>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 40, fontWeight: 900, color: text, letterSpacing: -1, margin: 0 }}>{steps[step]}</h1>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && (
              <>
                <Input label="Full Name" value={form.name} onChange={update('name')} placeholder="Your name" text2={text2} bg2={bg2} border={border} text={text} />
                <Input label="Age" value={form.age} onChange={update('age')} placeholder="25" type="number" suffix="yrs" text2={text2} bg2={bg2} border={border} text={text} />
              </>
            )}

            {step === 1 && (
              <>
                <Input label="Height" value={form.height} onChange={update('height')} placeholder="175" type="number" suffix="cm" text2={text2} bg2={bg2} border={border} text={text} />
                <Input label="Weight" value={form.weight} onChange={update('weight')} placeholder="70" type="number" suffix="kg" text2={text2} bg2={bg2} border={border} text={text} />
                <div style={{ marginBottom: 20 }}>
                  <label style={{ color: text2, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 12 }}>Gender</label>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {['male', 'female', 'other'].map(g => (
                      <button key={g} onClick={() => update('gender')(g)} style={{
                        flex: 1, padding: '14px', background: form.gender === g ? 'rgba(255,77,0,0.15)' : bg2,
                        border: `1px solid ${form.gender === g ? '#FF4D00' : border}`,
                        borderRadius: 12, cursor: 'pointer', color: form.gender === g ? '#FF4D00' : text2,
                        fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, letterSpacing: 1, textTransform: 'capitalize',
                        transition: 'all 0.2s'
                      }}>{g}</button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ color: text2, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 12 }}>Your Sport</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {sports.map(s => (
                      <button key={s} onClick={() => update('sport')(s)} style={{
                        padding: '8px 16px', background: form.sport === s ? 'rgba(255,77,0,0.15)' : bg2,
                        border: `1px solid ${form.sport === s ? '#FF4D00' : border}`,
                        borderRadius: 100, cursor: 'pointer', color: form.sport === s ? '#FF4D00' : text2,
                        fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, letterSpacing: 0.5,
                        transition: 'all 0.2s'
                      }}>{s}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ color: text2, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 12 }}>Your Goal</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {goals.map(g => (
                      <button key={g.id} onClick={() => update('goal')(g.id)} style={{
                        padding: '16px', background: form.goal === g.id ? 'rgba(255,77,0,0.1)' : bg2,
                        border: `1px solid ${form.goal === g.id ? '#FF4D00' : border}`,
                        borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                        transition: 'all 0.2s'
                      }}>
                        <div style={{ color: form.goal === g.id ? '#FF4D00' : text, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 700, letterSpacing: 0.5 }}>{g.label}</div>
                        <div style={{ color: text2, fontSize: 13, marginTop: 2 }}>{g.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: 12, marginTop: 40 }}>
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} style={{
              padding: '16px 20px', background: bg2, border: `1px solid ${border}`,
              borderRadius: 12, cursor: 'pointer', color: text2, display: 'flex', alignItems: 'center'
            }}>
              <ChevronLeft size={20} />
            </button>
          )}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={step < 2 ? () => setStep(s => s + 1) : handleFinish}
            disabled={!canNext}
            style={{
              flex: 1, padding: '18px',
              background: canNext ? 'linear-gradient(135deg, #FF4D00, #FF7A00)' : '#1a1a1a',
              border: 'none', borderRadius: 12, cursor: canNext ? 'pointer' : 'not-allowed',
              fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800,
              letterSpacing: 2, color: canNext ? '#fff' : '#333', textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
            }}
          >
            {step < 2 ? 'Continue' : "Let's Go!"} <ChevronRight size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  )
}