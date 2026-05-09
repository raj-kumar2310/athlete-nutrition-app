import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, Lock, ChevronRight, User, Trash2, Check, Crown, BarChart2, FileText, X } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { useUserStore } from '../stores/userStore'
import BottomNav from '../components/BottomNav'

function calcTDEE({ weight, height, age, gender, goal } = {}) {
  if (!weight || !height || !age) return null
  const w = parseFloat(weight), h = parseFloat(height), a = parseFloat(age)
  let bmr = gender === 'female'
    ? 447.6 + (9.2 * w) + (3.1 * h) - (4.3 * a)
    : 88.4 + (13.4 * w) + (4.8 * h) - (5.7 * a)
  let tdee = bmr * 1.55
  if (goal === 'cut') tdee -= 400
  if (goal === 'bulk') tdee += 400
  return Math.round(tdee)
}

function calcBMI({ weight, height } = {}) {
  if (!weight || !height) return null
  const h = parseFloat(height) / 100
  return (parseFloat(weight) / (h * h)).toFixed(1)
}

const SPORTS = ['Athletics', 'Swimming', 'Cycling', 'Football', 'Basketball', 'Tennis', 'Badminton', 'Wrestling', 'Boxing', 'Gymnastics', 'Weightlifting', 'Rowing', 'Other']
const GOALS  = [
  { id: 'performance', label: 'Performance' },
  { id: 'bulk',        label: 'Build Muscle' },
  { id: 'cut',         label: 'Lose Fat' },
  { id: 'maintain',    label: 'Maintain' },
]

const inputStyle = (border, bg, text) => ({
  width: '100%', background: bg, border: `1px solid ${border}`,
  borderRadius: 12, padding: '12px 14px', color: text,
  fontSize: 14, fontFamily: "'Barlow', sans-serif",
  outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
})

// ─── Athlete Card ───────────────────────────────────────────────
function AthleteCard({ athlete, isActive, onSelect, onRemove, onViewNotes }) {
  const { bg2, bg3, border, text, text2, text3 } = useTheme()
  const tdee = calcTDEE(athlete)
  const bmi  = calcBMI(athlete)
  const [confirmDelete, setConfirmDelete] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{
        background: bg2,
        border: `1.5px solid ${isActive ? '#FFB347' : border}`,
        borderRadius: 16, overflow: 'hidden',
        transition: 'all 0.2s',
        boxShadow: isActive ? '0 0 20px rgba(255,179,71,0.15)' : 'none',
      }}
    >
      {/* Top bar */}
      {isActive && (
        <div style={{ height: 3, background: 'linear-gradient(135deg, #FFB347, #FF9A00)' }} />
      )}

      <div style={{ padding: '14px 16px' }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: isActive ? 'linear-gradient(135deg, #FFB347, #FF9A00)' : bg3,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <User size={18} color={isActive ? '#000' : text3} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 900, color: text, marginBottom: 1 }}>{athlete.name}</div>
            <div style={{ fontSize: 12, color: text3 }}>{athlete.sport || 'No sport'} {athlete.age ? `· ${athlete.age}yrs` : ''}</div>
          </div>
          {isActive && (
            <div style={{ background: 'rgba(255,179,71,0.15)', border: '1px solid rgba(255,179,71,0.4)', borderRadius: 8, padding: '3px 8px' }}>
              <span style={{ color: '#FFB347', fontSize: 10, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, fontWeight: 700 }}>ACTIVE</span>
            </div>
          )}
        </div>

        {/* Stats row */}
        {(tdee || bmi || athlete.weight) && (
          <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
            {tdee && (
              <div style={{ flex: 1, background: bg3, borderRadius: 8, padding: '7px 8px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, color: '#FFB347' }}>{tdee.toLocaleString()}</div>
                <div style={{ fontSize: 9, color: text3, letterSpacing: 1 }}>KCAL</div>
              </div>
            )}
            {bmi && (
              <div style={{ flex: 1, background: bg3, borderRadius: 8, padding: '7px 8px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, color: parseFloat(bmi) < 25 ? '#00E676' : '#FFB347' }}>{bmi}</div>
                <div style={{ fontSize: 9, color: text3, letterSpacing: 1 }}>BMI</div>
              </div>
            )}
            {athlete.weight && (
              <div style={{ flex: 1, background: bg3, borderRadius: 8, padding: '7px 8px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, color: text }}>{athlete.weight}</div>
                <div style={{ fontSize: 9, color: text3, letterSpacing: 1 }}>KG</div>
              </div>
            )}
            {athlete.goal && (
              <div style={{ flex: 1, background: bg3, borderRadius: 8, padding: '7px 8px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 800, color: '#FF4D00', textTransform: 'capitalize' }}>{athlete.goal}</div>
                <div style={{ fontSize: 9, color: text3, letterSpacing: 1 }}>GOAL</div>
              </div>
            )}
          </div>
        )}

        {/* Notes preview */}
        {athlete.notes && (
          <div style={{ background: bg3, borderRadius: 8, padding: '7px 10px', marginBottom: 10, fontSize: 11, color: text3, lineHeight: 1.4 }}>
            📝 {athlete.notes.slice(0, 60)}{athlete.notes.length > 60 ? '...' : ''}
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 6 }}>
          <motion.button whileTap={{ scale: 0.96 }} onClick={() => onSelect(athlete.id)}
            style={{
              flex: 1, padding: '9px', borderRadius: 10, border: 'none', cursor: 'pointer',
              background: isActive ? 'linear-gradient(135deg, #FFB347, #FF9A00)' : 'rgba(255,179,71,0.12)',
              border: `1px solid ${isActive ? '#FFB347' : 'rgba(255,179,71,0.3)'}`,
              color: isActive ? '#000' : '#FFB347',
              fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 700,
              letterSpacing: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
            }}>
            {isActive ? <><Check size={12} /> Active</> : 'Set Active'}
          </motion.button>

          <motion.button whileTap={{ scale: 0.96 }} onClick={() => onViewNotes(athlete)}
            style={{ padding: '9px 12px', borderRadius: 10, border: `1px solid ${border}`, background: 'transparent', cursor: 'pointer', color: text3 }}>
            <FileText size={14} />
          </motion.button>

          {!confirmDelete ? (
            <motion.button whileTap={{ scale: 0.96 }} onClick={() => setConfirmDelete(true)}
              style={{ padding: '9px 12px', borderRadius: 10, border: '1px solid rgba(255,48,87,0.3)', background: 'transparent', cursor: 'pointer', color: '#FF3057' }}>
              <Trash2 size={14} />
            </motion.button>
          ) : (
            <div style={{ display: 'flex', gap: 4 }}>
              <button onClick={() => onRemove(athlete.id)} style={{ padding: '9px 10px', borderRadius: 10, border: 'none', background: '#FF3057', cursor: 'pointer', color: '#fff', fontSize: 11, fontWeight: 700 }}>Delete</button>
              <button onClick={() => setConfirmDelete(false)} style={{ padding: '9px 10px', borderRadius: 10, border: `1px solid ${border}`, background: 'transparent', cursor: 'pointer', color: text3, fontSize: 11 }}>Cancel</button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Notes Modal ────────────────────────────────────────────────
function NotesModal({ athlete, onClose, onSave, bg2, border, text, text2, text3, bg3 }) {
  const [notes, setNotes] = useState(athlete?.notes || '')
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
      onClick={onClose}>
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} transition={{ type: 'spring', damping: 25 }}
        style={{ background: bg2, borderRadius: '20px 20px 0 0', padding: '24px 20px', width: '100%', maxWidth: 480 }}
        onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 900, color: text }}>Coach Notes</div>
            <div style={{ fontSize: 12, color: text3 }}>{athlete?.name}</div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: text3 }}><X size={20} /></button>
        </div>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={5} placeholder="Add training notes, observations, goals..."
          style={{ width: '100%', background: bg3, border: `1px solid ${border}`, borderRadius: 12, padding: '12px 14px', color: text, fontSize: 14, fontFamily: "'Barlow', sans-serif", outline: 'none', resize: 'none', boxSizing: 'border-box', lineHeight: 1.6 }} />
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => { onSave(athlete.id, notes); onClose() }}
          style={{ width: '100%', padding: '14px', marginTop: 12, background: 'linear-gradient(135deg, #FFB347, #FF9A00)', border: 'none', borderRadius: 12, cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 17, fontWeight: 800, letterSpacing: 2, color: '#000', textTransform: 'uppercase' }}>
          Save Notes
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

// ─── Main ───────────────────────────────────────────────────────
export default function CoachMode() {
  const navigate = useNavigate()
  const { bg, bg2, bg3, border, text, text2, text3, input, dark } = useTheme()
  const {
    athletes = [], addAthlete, updateAthlete, removeAthlete,
    setActiveAthlete, activeAthleteId, isPremium = false
  } = useUserStore()

  const FREE_LIMIT = 3
  const PREMIUM_LIMIT = 50
  const canAdd = athletes.length < (isPremium ? PREMIUM_LIMIT : FREE_LIMIT)
  const atLimit = athletes.length >= FREE_LIMIT && !isPremium

  const [tab, setTab]             = useState('athletes') // 'athletes' | 'add' | 'compare'
  const [upgradeModal, setUpgradeModal] = useState(false)
  const [notesAthlete, setNotesAthlete] = useState(null)
  const [compareA, setCompareA]   = useState('')
  const [compareB, setCompareB]   = useState('')

  const [form, setForm] = useState({ name: '', sport: '', weight: '', height: '', age: '', gender: 'male', goal: 'performance' })
  const upd = f => v => setForm(prev => ({ ...prev, [f]: v }))

  const canSubmit = form.name && form.sport

  function handleAdd() {
    if (atLimit) { setUpgradeModal(true); return }
    if (!canSubmit) return
    addAthlete?.({ ...form, id: Date.now().toString() })
    setForm({ name: '', sport: '', weight: '', height: '', age: '', gender: 'male', goal: 'performance' })
    setTab('athletes')
  }

  const athleteA = athletes.find(a => a.id === compareA)
  const athleteB = athletes.find(a => a.id === compareB)

  const TABS = [
    { id: 'athletes', label: `Athletes (${athletes.length})` },
    { id: 'add',      label: '+ Add' },
    { id: 'compare',  label: '⚡ Compare' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: bg, paddingBottom: 80, transition: 'background 0.3s' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '56px 24px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <button onClick={() => navigate('/profile')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: text3, display: 'flex', alignItems: 'center', gap: 6 }}>
            <ArrowLeft size={16} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, fontSize: 14 }}>PROFILE</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,179,71,0.12)', border: '1px solid rgba(255,179,71,0.3)', borderRadius: 100, padding: '4px 12px', marginBottom: 8 }}>
              <Crown size={11} color="#FFB347" />
              <span style={{ color: '#FFB347', fontSize: 11, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1 }}>COACH MODE</span>
            </div>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, fontWeight: 900, color: text, letterSpacing: -0.5, margin: 0 }}>
              Manage<br /><span style={{ color: '#FFB347' }}>Athletes</span>
            </h1>
          </div>
          <div style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 12, padding: '10px 14px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 900, color: '#FFB347' }}>{athletes.length}</div>
            <div style={{ fontSize: 10, color: text3, letterSpacing: 1 }}>ATHLETES</div>
            <div style={{ fontSize: 9, color: atLimit ? '#FF3057' : text3, marginTop: 2 }}>
              {isPremium ? 'Pro' : `${athletes.length}/${FREE_LIMIT} free`}
            </div>
          </div>
        </div>

        {/* Upgrade banner */}
        {atLimit && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: 'rgba(255,179,71,0.1)', border: '1px solid rgba(255,179,71,0.3)', borderRadius: 14, padding: '14px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Lock size={18} color="#FFB347" style={{ flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 800, color: '#FFB347', marginBottom: 2 }}>Free tier: 3 athletes</div>
              <div style={{ fontSize: 12, color: text2 }}>Upgrade Coach Pro for up to 50 athletes</div>
            </div>
            <button onClick={() => setUpgradeModal(true)}
              style={{ padding: '8px 14px', background: 'linear-gradient(135deg, #FFB347, #FF9A00)', border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, fontWeight: 700, color: '#000' }}>
              Upgrade
            </button>
          </motion.div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', background: bg2, border: `1px solid ${border}`, borderRadius: 12, padding: 4, marginBottom: 20, transition: 'all 0.3s' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{
                flex: 1, padding: '10px 6px',
                background: tab === t.id ? 'linear-gradient(135deg, #FFB347, #FF9A00)' : 'transparent',
                border: 'none', borderRadius: 8, cursor: 'pointer',
                fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 700,
                color: tab === t.id ? '#000' : text3, transition: 'all 0.2s',
              }}>
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* ── Athletes list ── */}
          {tab === 'athletes' && (
            <motion.div key="athletes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {athletes.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>👥</div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 800, color: text, marginBottom: 6 }}>No athletes yet</div>
                  <div style={{ color: text2, fontSize: 14, marginBottom: 20 }}>Add your first athlete to get started</div>
                  <button onClick={() => setTab('add')}
                    style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #FFB347, #FF9A00)', border: 'none', borderRadius: 12, cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, color: '#000' }}>
                    Add First Athlete
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <AnimatePresence>
                    {athletes.map(a => (
                      <AthleteCard
                        key={a.id}
                        athlete={a}
                        isActive={a.id === activeAthleteId}
                        onSelect={id => setActiveAthlete?.(id)}
                        onRemove={id => removeAthlete?.(id)}
                        onViewNotes={a => setNotesAthlete(a)}
                      />
                    ))}
                  </AnimatePresence>
                  {!atLimit && (
                    <motion.button whileTap={{ scale: 0.97 }} onClick={() => setTab('add')}
                      style={{ padding: '14px', background: 'transparent', border: `1.5px dashed rgba(255,179,71,0.4)`, borderRadius: 14, cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 700, color: '#FFB347', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, letterSpacing: 1 }}>
                      <Plus size={16} /> ADD ATHLETE
                    </motion.button>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* ── Add athlete form ── */}
          {tab === 'add' && (
            <motion.div key="add" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              {atLimit ? (
                <div style={{ textAlign: 'center', padding: '40px 24px' }}>
                  <Lock size={36} color="#FFB347" style={{ margin: '0 auto 12px' }} />
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 800, color: text, marginBottom: 8 }}>Free limit reached</div>
                  <div style={{ color: text2, marginBottom: 20 }}>Upgrade Coach Pro to add up to 50 athletes</div>
                  <button onClick={() => setUpgradeModal(true)}
                    style={{ padding: '14px 28px', background: 'linear-gradient(135deg, #FFB347, #FF9A00)', border: 'none', borderRadius: 12, cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, color: '#000' }}>
                    Upgrade to Coach Pro
                  </button>
                </div>
              ) : (
                <div>
                  <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 900, color: text, marginBottom: 20 }}>New Athlete</h2>

                  {/* Name + Age */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                    <div>
                      <label style={{ color: text3, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 6 }}>Full Name *</label>
                      <input value={form.name} onChange={e => upd('name')(e.target.value)} placeholder="Athlete name"
                        style={inputStyle(border, input, text)}
                        onFocus={e => e.target.style.borderColor = '#FFB34766'}
                        onBlur={e => e.target.style.borderColor = border} />
                    </div>
                    <div>
                      <label style={{ color: text3, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 6 }}>Age</label>
                      <input type="number" value={form.age} onChange={e => upd('age')(e.target.value)} placeholder="25"
                        style={inputStyle(border, input, text)}
                        onFocus={e => e.target.style.borderColor = '#FFB34766'}
                        onBlur={e => e.target.style.borderColor = border} />
                    </div>
                  </div>

                  {/* Height + Weight */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                    <div>
                      <label style={{ color: text3, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 6 }}>Height (cm)</label>
                      <input type="number" value={form.height} onChange={e => upd('height')(e.target.value)} placeholder="175"
                        style={inputStyle(border, input, text)}
                        onFocus={e => e.target.style.borderColor = '#FFB34766'}
                        onBlur={e => e.target.style.borderColor = border} />
                    </div>
                    <div>
                      <label style={{ color: text3, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 6 }}>Weight (kg)</label>
                      <input type="number" value={form.weight} onChange={e => upd('weight')(e.target.value)} placeholder="70"
                        style={inputStyle(border, input, text)}
                        onFocus={e => e.target.style.borderColor = '#FFB34766'}
                        onBlur={e => e.target.style.borderColor = border} />
                    </div>
                  </div>

                  {/* Gender */}
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ color: text3, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>Gender</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {['male', 'female', 'other'].map(g => (
                        <button key={g} onClick={() => upd('gender')(g)}
                          style={{ flex: 1, padding: '10px', background: form.gender === g ? 'rgba(255,179,71,0.15)' : bg2, border: `1.5px solid ${form.gender === g ? '#FFB347' : border}`, borderRadius: 10, cursor: 'pointer', color: form.gender === g ? '#FFB347' : text2, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: form.gender === g ? 700 : 400, textTransform: 'capitalize', transition: 'all 0.2s' }}>
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sport */}
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ color: text3, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>Sport *</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {SPORTS.map(s => (
                        <button key={s} onClick={() => upd('sport')(s)}
                          style={{ padding: '7px 13px', background: form.sport === s ? 'rgba(255,179,71,0.15)' : bg2, border: `1px solid ${form.sport === s ? '#FFB347' : border}`, borderRadius: 100, cursor: 'pointer', color: form.sport === s ? '#FFB347' : text2, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, fontWeight: form.sport === s ? 700 : 400, transition: 'all 0.2s' }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Goal */}
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ color: text3, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>Goal</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {GOALS.map(g => (
                        <button key={g.id} onClick={() => upd('goal')(g.id)}
                          style={{ flex: 1, padding: '10px 6px', background: form.goal === g.id ? 'rgba(255,179,71,0.15)' : bg2, border: `1.5px solid ${form.goal === g.id ? '#FFB347' : border}`, borderRadius: 10, cursor: 'pointer', color: form.goal === g.id ? '#FFB347' : text2, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: form.goal === g.id ? 700 : 400, transition: 'all 0.2s', textAlign: 'center' }}>
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <motion.button whileTap={{ scale: 0.97 }} onClick={handleAdd} disabled={!canSubmit}
                    style={{ width: '100%', padding: '16px', background: canSubmit ? 'linear-gradient(135deg, #FFB347, #FF9A00)' : bg3, border: 'none', borderRadius: 12, cursor: canSubmit ? 'pointer' : 'not-allowed', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: 2, color: canSubmit ? '#000' : text3, textTransform: 'uppercase', transition: 'all 0.3s' }}>
                    Add Athlete
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}

          {/* ── Compare tab ── */}
          {tab === 'compare' && (
            <motion.div key="compare" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 900, color: text, marginBottom: 4 }}>Compare Athletes</h2>
              <p style={{ color: text2, fontSize: 13, marginBottom: 20 }}>Side-by-side TDEE & stats comparison</p>

              {athletes.length < 2 ? (
                <div style={{ textAlign: 'center', padding: '32px', background: bg2, border: `1px solid ${border}`, borderRadius: 16 }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>⚡</div>
                  <div style={{ color: text2, fontSize: 14 }}>Add at least 2 athletes to compare</div>
                </div>
              ) : (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                    {[
                      { label: 'Athlete A', value: compareA, onChange: setCompareA, color: '#FFB347' },
                      { label: 'Athlete B', value: compareB, onChange: setCompareB, color: '#4FC3F7' },
                    ].map(sel => (
                      <div key={sel.label}>
                        <label style={{ color: sel.color, fontSize: 10, letterSpacing: 2, fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 6, fontWeight: 700 }}>{sel.label}</label>
                        <select value={sel.value} onChange={e => sel.onChange(e.target.value)}
                          style={{ width: '100%', padding: '12px 14px', background: input, border: `1.5px solid ${sel.value ? sel.color : border}`, borderRadius: 12, color: text, fontSize: 14, fontFamily: "'Barlow', sans-serif", outline: 'none', cursor: 'pointer' }}>
                          <option value="">Select...</option>
                          {athletes.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                        </select>
                      </div>
                    ))}
                  </div>

                  {athleteA && athleteB && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      {[
                        { label: 'Daily TDEE', a: calcTDEE(athleteA), b: calcTDEE(athleteB), unit: 'kcal', colorA: '#FFB347', colorB: '#4FC3F7' },
                        { label: 'BMI', a: calcBMI(athleteA), b: calcBMI(athleteB), unit: '', colorA: '#FFB347', colorB: '#4FC3F7' },
                        { label: 'Body Weight', a: athleteA.weight ? `${athleteA.weight}kg` : '--', b: athleteB.weight ? `${athleteB.weight}kg` : '--', unit: '', colorA: '#FFB347', colorB: '#4FC3F7', noBar: true },
                        { label: 'Sport', a: athleteA.sport || '--', b: athleteB.sport || '--', unit: '', colorA: '#FFB347', colorB: '#4FC3F7', noBar: true },
                      ].map((row, i) => {
                        const numA = parseFloat(row.a) || 0
                        const numB = parseFloat(row.b) || 0
                        const maxVal = Math.max(numA, numB, 1)
                        return (
                          <div key={row.label} style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 14, padding: '14px 16px', marginBottom: 10, transition: 'all 0.3s' }}>
                            <div style={{ color: text3, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 10 }}>{row.label}</div>
                            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                              <div style={{ flex: 1, textAlign: 'center' }}>
                                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 900, color: row.colorA }}>{row.a || '--'}<span style={{ fontSize: 12 }}>{row.unit}</span></div>
                                <div style={{ fontSize: 11, color: text3, marginTop: 2 }}>{athleteA.name}</div>
                                {!row.noBar && numA > 0 && (
                                  <div style={{ background: bg3, borderRadius: 3, height: 4, marginTop: 6 }}>
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${(numA / maxVal) * 100}%` }} transition={{ duration: 0.8 }}
                                      style={{ height: '100%', background: row.colorA, borderRadius: 3 }} />
                                  </div>
                                )}
                              </div>
                              <div style={{ color: text3, fontSize: 12, fontWeight: 700 }}>vs</div>
                              <div style={{ flex: 1, textAlign: 'center' }}>
                                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 900, color: row.colorB }}>{row.b || '--'}<span style={{ fontSize: 12 }}>{row.unit}</span></div>
                                <div style={{ fontSize: 11, color: text3, marginTop: 2 }}>{athleteB.name}</div>
                                {!row.noBar && numB > 0 && (
                                  <div style={{ background: bg3, borderRadius: 3, height: 4, marginTop: 6 }}>
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${(numB / maxVal) * 100}%` }} transition={{ duration: 0.8, delay: 0.1 }}
                                      style={{ height: '100%', background: row.colorB, borderRadius: 3 }} />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Notes Modal */}
      <AnimatePresence>
        {notesAthlete && (
          <NotesModal
            athlete={notesAthlete}
            onClose={() => setNotesAthlete(null)}
            onSave={(id, notes) => updateAthlete?.(id, { notes })}
            bg2={bg2} bg3={bg3} border={border} text={text} text2={text2} text3={text3}
          />
        )}
      </AnimatePresence>

      {/* Upgrade Modal */}
      <AnimatePresence>
        {upgradeModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
            onClick={() => setUpgradeModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              style={{ background: bg2, borderRadius: 20, padding: 24, maxWidth: 360, width: '100%', border: '1px solid rgba(255,179,71,0.4)' }}
              onClick={e => e.stopPropagation()}>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <Crown size={36} color="#FFB347" style={{ margin: '0 auto 12px' }} />
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 900, color: text, marginBottom: 6 }}>Coach Pro</div>
                <div style={{ color: text2, fontSize: 14, lineHeight: 1.5 }}>Manage up to 50 athletes, unlock full comparison tools and coach notes</div>
              </div>
              {[
                '✅ Up to 50 athlete profiles',
                '✅ Full comparison analytics',
                '✅ Detailed coach notes per athlete',
                '✅ All nutrition plans per athlete',
              ].map(f => <div key={f} style={{ color: text2, fontSize: 13, marginBottom: 8 }}>{f}</div>)}
              <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
                <button onClick={() => setUpgradeModal(false)}
                  style={{ flex: 1, padding: '14px', background: 'transparent', border: `1px solid ${border}`, borderRadius: 12, cursor: 'pointer', color: text3, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700 }}>
                  Later
                </button>
                <button onClick={() => setUpgradeModal(false)}
                  style={{ flex: 2, padding: '14px', background: 'linear-gradient(135deg, #FFB347, #FF9A00)', border: 'none', borderRadius: 12, cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, color: '#000', letterSpacing: 1 }}>
                  Upgrade ›
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  )
}