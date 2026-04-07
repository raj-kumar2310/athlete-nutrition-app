import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { performanceData, recoveryData, weightManagementData } from '../data/sportsData'
import { useTheme } from '../hooks/useTheme'
import { useUserStore } from '../stores/userStore'
import BottomNav from '../components/BottomNav'
import { useState } from 'react'

// ─── Performance ───────────────────────────────────────────────
export function Performance() {
  const navigate = useNavigate()
  const { bg, bg2, border, text, text3, foodTag, foodTagBorder, foodTagText } = useTheme()
  return (
    <div style={{ minHeight: '100vh', background: bg, paddingBottom: 80, transition: 'background 0.3s' }}>
      <div style={{ padding: '56px 24px 24px', maxWidth: 480, margin: '0 auto' }}>
        <button onClick={() => navigate('/home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: text3, marginBottom: 24, padding: 0 }}>
          <ArrowLeft size={16} /> <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, fontSize: 14 }}>HOME</span>
        </button>
        <p style={{ color: text3, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 8 }}>Optimize</p>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 44, fontWeight: 900, color: text, letterSpacing: -1, margin: '0 0 28px' }}>Performance<br /><span style={{ color: '#FF3057' }}>Nutrition</span></h1>
        {Object.entries(performanceData).map(([key, data], i) => (
          <motion.div key={key} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            style={{ background: bg2, border: `1px solid ${data.color}22`, borderRadius: 16, padding: 20, marginBottom: 12, transition: 'all 0.3s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: data.color, flexShrink: 0 }} />
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 800, color: text }}>{data.label}</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
              {data.foods.map(f => <span key={f} style={{ background: foodTag, border: `1px solid ${foodTagBorder}`, borderRadius: 8, padding: '5px 10px', color: foodTagText, fontSize: 12 }}>{f}</span>)}
            </div>
            <p style={{ color: text3, fontSize: 12, margin: 0, borderTop: `1px solid ${border}`, paddingTop: 10 }}>{data.tips}</p>
          </motion.div>
        ))}
      </div>
      <BottomNav />
    </div>
  )
}

// ─── Recovery ──────────────────────────────────────────────────
export function Recovery() {
  const navigate = useNavigate()
  const { bg, bg2, border, text, text3, foodTag, foodTagBorder, foodTagText } = useTheme()
  return (
    <div style={{ minHeight: '100vh', background: bg, paddingBottom: 80, transition: 'background 0.3s' }}>
      <div style={{ padding: '56px 24px 24px', maxWidth: 480, margin: '0 auto' }}>
        <button onClick={() => navigate('/home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: text3, marginBottom: 24, padding: 0 }}>
          <ArrowLeft size={16} /> <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, fontSize: 14 }}>HOME</span>
        </button>
        <p style={{ color: text3, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 8 }}>Repair & Restore</p>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 44, fontWeight: 900, color: text, letterSpacing: -1, margin: '0 0 28px' }}>Recovery<br /><span style={{ color: '#4FC3F7' }}>Nutrition</span></h1>
        {Object.entries(recoveryData).map(([key, data], i) => (
          <motion.div key={key} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
            style={{ background: bg2, border: `1px solid ${data.color}22`, borderRadius: 16, padding: 20, marginBottom: 12, transition: 'all 0.3s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div style={{ width: 3, height: 40, background: data.color, borderRadius: 2, flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, color: text }}>{data.label}</div>
                <div style={{ color: data.color, fontSize: 11, letterSpacing: 0.5 }}>{data.focus}</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
              {data.foods.map(f => <span key={f} style={{ background: foodTag, border: `1px solid ${foodTagBorder}`, borderRadius: 8, padding: '5px 10px', color: foodTagText, fontSize: 12 }}>{f}</span>)}
            </div>
          </motion.div>
        ))}
      </div>
      <BottomNav />
    </div>
  )
}

// ─── Weight Management ─────────────────────────────────────────
export function WeightManagement() {
  const navigate = useNavigate()
  const { getTDEE } = useUserStore()
  const { bg, bg2, bg3, border, text, text2, text3 } = useTheme()
  const [activeTab, setActiveTab] = useState('cut')
  const data = weightManagementData[activeTab]
  const tdee = getTDEE()
  const targetCals = activeTab === 'cut' ? tdee - 400 : activeTab === 'bulk' ? tdee + 400 : tdee

  return (
    <div style={{ minHeight: '100vh', background: bg, paddingBottom: 80, transition: 'background 0.3s' }}>
      <div style={{ padding: '56px 24px 24px', maxWidth: 480, margin: '0 auto' }}>
        <button onClick={() => navigate('/home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: text3, marginBottom: 24, padding: 0 }}>
          <ArrowLeft size={16} /> <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, fontSize: 14 }}>HOME</span>
        </button>
        <p style={{ color: text3, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 8 }}>Body Composition</p>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 44, fontWeight: 900, color: text, letterSpacing: -1, margin: '0 0 24px' }}>Weight<br /><span style={{ color: '#00E676' }}>Management</span></h1>

        {/* Tab Toggle */}
        <div style={{ display: 'flex', background: bg2, border: `1px solid ${border}`, borderRadius: 14, padding: 4, marginBottom: 24, transition: 'all 0.3s' }}>
          {Object.entries(weightManagementData).map(([id, d]) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{
              flex: 1, padding: '10px 4px',
              background: activeTab === id ? d.color : 'transparent',
              border: 'none', borderRadius: 10, cursor: 'pointer',
              fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 700,
              color: activeTab === id ? '#000' : text3, transition: 'all 0.2s'
            }}>{id.charAt(0).toUpperCase() + id.slice(1)}</button>
          ))}
        </div>

        {/* Calorie Card */}
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          style={{ background: bg2, border: `1px solid ${data.color}33`, borderRadius: 16, padding: 20, marginBottom: 16, transition: 'all 0.3s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 900, color: text }}>{data.name}</div>
              <div style={{ color: text2, fontSize: 13 }}>{data.goal}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 32, fontWeight: 900, color: data.color }}>{targetCals.toLocaleString()}</div>
              <div style={{ color: text3, fontSize: 11 }}>kcal / day</div>
            </div>
          </div>
          {Object.entries(data.macroRatio).map(([macro, pct]) => {
            const colors = { carbs: '#FF7A00', protein: '#FF4D00', fat: '#E63946' }
            return (
              <div key={macro} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: text3, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, fontFamily: "'Barlow Condensed', sans-serif" }}>{macro}</span>
                  <span style={{ color: text, fontSize: 11, fontWeight: 700 }}>{pct}%</span>
                </div>
                <div style={{ background: bg3, borderRadius: 4, height: 6 }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ height: '100%', background: colors[macro], borderRadius: 4 }} />
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* Tips */}
        <div style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 16, padding: 20, marginBottom: 16, transition: 'all 0.3s' }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, color: text, marginBottom: 12 }}>Tips</div>
          {data.tips.map(tip => (
            <div key={tip} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: data.color, marginTop: 5, flexShrink: 0 }} />
              <span style={{ color: text2, fontSize: 13, lineHeight: 1.5 }}>{tip}</span>
            </div>
          ))}
        </div>

        {/* Foods */}
        <div style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 16, padding: 20, transition: 'all 0.3s' }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, color: text, marginBottom: 12 }}>Best Foods</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {data.foods.map(f => (
              <span key={f} style={{ background: `${data.color}15`, border: `1px solid ${data.color}33`, borderRadius: 8, padding: '6px 12px', color: data.color, fontSize: 12 }}>{f}</span>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}