import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useUserStore } from '../stores/userStore'
import { useTheme } from '../hooks/useTheme'


const sports = [
  'Athletics', 'Swimming', 'Cycling', 'Weightlifting', 'Gymnastics',
  'Football', 'Basketball', 'Cricket', 'Tennis', 'Badminton',
  'Volleyball', 'Boxing', 'Wrestling', 'Rowing', 'Triathlon', 'Other'
]

const goals = [
  { id: 'performance', label: 'Peak Performance', desc: 'Maximize athletic output' },
  { id: 'bulk',        label: 'Build Muscle',      desc: 'Gain mass & strength' },
  { id: 'cut',         label: 'Lose Fat',           desc: 'Cut weight, keep muscle' },
  { id: 'maintain',    label: 'Maintain Weight',    desc: 'Stay at current weight' },
]

const Input = ({ label, value, onChange, placeholder, type = 'text', suffix, theme }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ color: theme.text2, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>{label}</label>
    <div style={{ position: 'relative' }}>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: '100%', background: theme.bg2, border: `1px solid ${theme.border}`, borderRadius: 12, padding: suffix ? '13px 48px 13px 16px' : '13px 16px', color: theme.text, fontSize: 15, fontFamily: "'Barlow', sans-serif", outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
        onFocus={e => e.target.style.borderColor = '#FF4D0066'}
        onBlur={e => e.target.style.borderColor = theme.border}
      />
      {suffix && <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: theme.text3, fontSize: 12 }}>{suffix}</span>}
    </div>
  </div>
)

export default function PersonalInfo() {
  const navigate = useNavigate()
  const setUserInfo = useUserStore(s => s.setUserInfo)
  const theme = useTheme()
  const [form, setForm] = useState({ name: '', age: '', email: '', height: '', weight: '', gender: '', sport: '', goal: '' })
  const update = (field) => (val) => setForm(f => ({ ...f, [field]: val }))
  const canSubmit = form.name && form.age && form.email && form.height && form.weight && form.gender && form.sport && form.goal

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, padding: '0 24px 60px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,77,0,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 480, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ paddingTop: 60, marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #FF4D00, #FF7A00)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>⚡</span>
            </div>
            <div>
              <p style={{ color: theme.text2, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", margin: 0 }}>Setup Profile</p>
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 32, fontWeight: 900, color: theme.text, margin: 0 }}>Tell us about you</h1>
            </div>
          </div>
          <p style={{ color: theme.text3, fontSize: 13, marginTop: 8 }}>Fill in your details to get personalized nutrition plans</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

          {/* Name + Age */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Input theme={theme} label="Full Name" value={form.name}   onChange={update('name')}   placeholder="Your name" />
            <Input theme={theme} label="Age"       value={form.age}    onChange={update('age')}    placeholder="25" type="number" suffix="yrs" />
          </div>

          {/* Email */}
          <Input theme={theme} label="Email ID" value={form.email} onChange={update('email')} placeholder="you@email.com" type="email" />

          {/* Height + Weight */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Input theme={theme} label="Height" value={form.height} onChange={update('height')} placeholder="175" type="number" suffix="cm" />
            <Input theme={theme} label="Weight" value={form.weight} onChange={update('weight')} placeholder="70"  type="number" suffix="kg" />
          </div>

          {/* Gender */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: theme.text2, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 10 }}>Gender</label>
            <div style={{ display: 'flex', gap: 10 }}>
              {['male', 'female', 'other'].map(g => (
                <button key={g} onClick={() => update('gender')(g)} style={{ flex: 1, padding: '12px', background: form.gender === g ? 'rgba(255,77,0,0.15)' : theme.bg2, border: `1px solid ${form.gender === g ? '#FF4D00' : theme.border}`, borderRadius: 12, cursor: 'pointer', color: form.gender === g ? '#FF4D00' : theme.text2, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, letterSpacing: 1, textTransform: 'capitalize', transition: 'all 0.2s' }}>{g}</button>
              ))}
            </div>
          </div>

          {/* Sport */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: theme.text2, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 10 }}>Your Sport</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {sports.map(s => (
                <button key={s} onClick={() => update('sport')(s)} style={{ padding: '7px 14px', background: form.sport === s ? 'rgba(255,77,0,0.15)' : theme.bg2, border: `1px solid ${form.sport === s ? '#FF4D00' : theme.border}`, borderRadius: 100, cursor: 'pointer', color: form.sport === s ? '#FF4D00' : theme.text2, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, transition: 'all 0.2s' }}>{s}</button>
              ))}
            </div>
          </div>

          {/* Goal */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ color: theme.text2, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 10 }}>Your Goal</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {goals.map(g => (
                <button key={g.id} onClick={() => update('goal')(g.id)} style={{ padding: '14px 16px', background: form.goal === g.id ? 'rgba(255,77,0,0.1)' : theme.bg2, border: `1px solid ${form.goal === g.id ? '#FF4D00' : theme.border}`, borderRadius: 12, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                  <div style={{ color: form.goal === g.id ? '#FF4D00' : theme.text, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 700 }}>{g.label}</div>
                  <div style={{ color: theme.text2, fontSize: 12, marginTop: 2 }}>{g.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => { setUserInfo(form); navigate('/home') }} disabled={!canSubmit}
            style={{ width: '100%', padding: '18px', background: canSubmit ? 'linear-gradient(135deg, #FF4D00, #FF7A00)' : theme.bg3, border: 'none', borderRadius: 12, cursor: canSubmit ? 'pointer' : 'not-allowed', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: 2, color: canSubmit ? '#fff' : theme.text3, textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: canSubmit ? '0 8px 32px rgba(255,77,0,0.3)' : 'none', transition: 'all 0.3s' }}>
            Let's Go! <ChevronRight size={18} />
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}