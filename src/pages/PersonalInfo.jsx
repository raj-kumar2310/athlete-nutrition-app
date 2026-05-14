import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useUserStore } from '../stores/userStore'
import { useTheme } from '../hooks/useTheme'
import { useResponsive } from '../hooks/useResponsive'

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

export default function PersonalInfo() {
  const navigate = useNavigate()
  const setUserInfo = useUserStore(s => s.setUserInfo)
  const { bg, bg2, bg3, border, text, text2, text3, input, dark } = useTheme()
  const { isMobile, padding } = useResponsive()

  const [form, setForm] = useState({
    name: '', age: '', email: '', height: '',
    weight: '', gender: '', sport: '', goal: ''
  })

  const update = (field) => (val) => setForm(f => ({ ...f, [field]: val }))
  const canSubmit = form.name && form.age && form.email && form.height &&
    form.weight && form.gender && form.sport && form.goal

  const inputStyle = {
    width: '100%',
    background: input,
    border: `1px solid ${border}`,
    borderRadius: 12,
    padding: '14px 16px',
    color: text,
    fontSize: 15,
    fontFamily: "'Barlow', sans-serif",
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  }

  const inputWithSuffixStyle = {
    ...inputStyle,
    paddingRight: 48,
  }

  const labelStyle = {
    color: text2,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontFamily: "'Barlow Condensed', sans-serif",
    display: 'block',
    marginBottom: 8,
    fontWeight: 600,
  }

  const suffixStyle = {
    position: 'absolute',
    right: 14,
    top: '50%',
    transform: 'translateY(-50%)',
    color: text3,
    fontSize: 12,
    fontWeight: 600,
    pointerEvents: 'none',
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: bg,
      padding: '0 24px 60px',
      transition: 'background 0.3s',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'fixed', top: -100, right: -100,
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,77,0,0.08) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0
      }} />

      <div style={{ maxWidth: 480, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ paddingTop: 60, marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 14,
              background: 'linear-gradient(135deg, #FF4D00, #FF7A00)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(255,77,0,0.3)'
            }}>
              <span style={{ fontSize: 20 }}>⚡</span>
            </div>
            <div>
              <p style={{
                color: text3, fontSize: 11, letterSpacing: 2,
                textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif",
                margin: 0, fontWeight: 600
              }}>Setup Profile</p>
              <h1 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 32, fontWeight: 900, color: text,
                margin: 0, letterSpacing: -0.5
              }}>Tell us about you</h1>
            </div>
          </div>
          <p style={{ color: text2, fontSize: 13, marginTop: 8, lineHeight: 1.5 }}>
            Fill in your details to get personalized nutrition plans
          </p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

          {/* Name + Age */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => update('name')(e.target.value)}
                placeholder="Your name"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#FF4D0066'}
                onBlur={e => e.target.style.borderColor = border}
              />
            </div>
            <div>
              <label style={labelStyle}>Age</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="number"
                  value={form.age}
                  onChange={e => update('age')(e.target.value)}
                  placeholder="25"
                  style={inputWithSuffixStyle}
                  onFocus={e => e.target.style.borderColor = '#FF4D0066'}
                  onBlur={e => e.target.style.borderColor = border}
                />
                <span style={suffixStyle}>yrs</span>
              </div>
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Email ID</label>
            <input
              type="email"
              value={form.email}
              onChange={e => update('email')(e.target.value)}
              placeholder="you@email.com"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#FF4D0066'}
              onBlur={e => e.target.style.borderColor = border}
            />
          </div>

          {/* Height + Weight */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            {[
              { label: 'Height', field: 'height', placeholder: '175', suffix: 'cm' },
              { label: 'Weight', field: 'weight', placeholder: '70',  suffix: 'kg' },
            ].map(f => (
              <div key={f.field}>
                <label style={labelStyle}>{f.label}</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    value={form[f.field]}
                    onChange={e => update(f.field)(e.target.value)}
                    placeholder={f.placeholder}
                    style={inputWithSuffixStyle}
                    onFocus={e => e.target.style.borderColor = '#FF4D0066'}
                    onBlur={e => e.target.style.borderColor = border}
                  />
                  <span style={suffixStyle}>{f.suffix}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Gender */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Gender</label>
            <div style={{ display: 'flex', gap: 10 }}>
              {['male', 'female', 'other'].map(g => (
                <button
                  key={g}
                  onClick={() => update('gender')(g)}
                  style={{
                    flex: 1, padding: '13px',
                    background: form.gender === g
                      ? dark ? 'rgba(255,77,0,0.2)' : 'rgba(255,77,0,0.12)'
                      : bg2,
                    border: `1.5px solid ${form.gender === g ? '#FF4D00' : border}`,
                    borderRadius: 12, cursor: 'pointer',
                    color: form.gender === g ? '#FF4D00' : text2,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 14, letterSpacing: 1,
                    textTransform: 'capitalize',
                    fontWeight: form.gender === g ? 800 : 500,
                    transition: 'all 0.2s'
                  }}
                >{g}</button>
              ))}
            </div>
          </div>

          {/* Sport */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Your Sport</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {sports.map(s => (
                <button
                  key={s}
                  onClick={() => update('sport')(s)}
                  style={{
                    padding: '8px 16px',
                    background: form.sport === s
                      ? dark ? 'rgba(255,77,0,0.2)' : 'rgba(255,77,0,0.12)'
                      : bg2,
                    border: `1.5px solid ${form.sport === s ? '#FF4D00' : border}`,
                    borderRadius: 100, cursor: 'pointer',
                    color: form.sport === s ? '#FF4D00' : text2,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 13, letterSpacing: 0.5,
                    fontWeight: form.sport === s ? 700 : 500,
                    transition: 'all 0.2s'
                  }}
                >{s}</button>
              ))}
            </div>
          </div>

          {/* Goal */}
          <div style={{ marginBottom: 32 }}>
            <label style={labelStyle}>Your Goal</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {goals.map(g => (
                <button
                  key={g.id}
                  onClick={() => update('goal')(g.id)}
                  style={{
                    padding: '14px 18px',
                    background: form.goal === g.id
                      ? dark ? 'rgba(255,77,0,0.12)' : 'rgba(255,77,0,0.08)'
                      : bg2,
                    border: `1.5px solid ${form.goal === g.id ? '#FF4D00' : border}`,
                    borderRadius: 14, cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{
                    color: form.goal === g.id ? '#FF4D00' : text,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 17, fontWeight: 800, letterSpacing: 0.3
                  }}>{g.label}</div>
                  <div style={{
                    color: form.goal === g.id ? '#FF7A00' : text2,
                    fontSize: 12, marginTop: 2
                  }}>{g.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: canSubmit ? 1.01 : 1 }}
            onClick={() => { if (canSubmit) { setUserInfo(form); navigate('/home') } }}
            disabled={!canSubmit}
            style={{
              width: '100%', padding: '18px',
              background: canSubmit
                ? 'linear-gradient(135deg, #FF4D00, #FF7A00)'
                : dark ? '#1a1a1a' : '#e0e0e0',
              border: 'none', borderRadius: 14,
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 20, fontWeight: 900,
              letterSpacing: 2,
              color: canSubmit ? '#fff' : text3,
              textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: canSubmit ? '0 8px 32px rgba(255,77,0,0.3)' : 'none',
              transition: 'all 0.3s'
            }}
          >
            Let's Go! <ChevronRight size={20} />
          </motion.button>

        </motion.div>
      </div>
    </div>
  )
}