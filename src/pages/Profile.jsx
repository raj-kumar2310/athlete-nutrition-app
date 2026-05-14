import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { User, Edit3, LogOut } from 'lucide-react'
import { useUserStore } from '../stores/userStore'
import BottomNav from '../components/BottomNav'
import { useTheme } from '../hooks/useTheme'
import { useResponsive } from '../hooks/useResponsive'


export default function Profile() {
  const navigate = useNavigate()
  const { name, age, height, weight, gender, sport, goal, getBMI, getTDEE, resetUser } = useUserStore()
    const { logout } = useUserStore()
  const { bg, bg2, border, text, text2, text3 } = useTheme()
  const { isMobile, padding } = useResponsive()
  const bmi = getBMI()
  const tdee = getTDEE()

  const bmiCategory = () => {
    if (!bmi) return ''
    const b = parseFloat(bmi)
    if (b < 18.5) return { label: 'Underweight', color: '#4FC3F7' }
    if (b < 25) return { label: 'Normal', color: '#00E676' }
    if (b < 30) return { label: 'Overweight', color: '#FFB347' }
    return { label: 'Obese', color: '#FF3057' }
  }
  const bmiCat = bmiCategory()

  return (
    <div style={{ minHeight: '100vh', background: bg, paddingBottom: 80 }}>
      <div style={{ padding: '56px 24px 24px', maxWidth: 480, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, fontWeight: 900, color: text, margin: 0 }}>Profile</h1>
          <button onClick={() => navigate('/setup')} style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 10, padding: '8px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: text2 }}>
            <Edit3 size={14} /> <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, letterSpacing: 1 }}>EDIT</span>
          </button>
        </div>
        
        {/* Logout button */}
        <button onClick={() => { logout(); navigate('/login') }}
          style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #FF3057 0%, #E91E63 100%)', border: 'none', borderRadius: 14, cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: 1, color: '#fff', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 24, boxShadow: '0 4px 16px rgba(255, 48, 87, 0.3)' }}>
          <LogOut size={16} /> Logout
        </button>

        {/* Avatar + Name */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
          <div style={{ width: 72, height: 72, borderRadius: 20, background: 'linear-gradient(135deg, #FF4D00, #FF7A00)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(255,77,0,0.3)' }}>
            <User size={32} color="#fff" />
          </div>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 900, color: text, letterSpacing: -0.5 }}>{name || 'Athlete'}</div>
            <div style={{ color: text2, fontSize: 13 }}>{sport || 'No sport set'} • {gender || ''}</div>
          </div>
        </motion.div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          {[
            { label: 'Weight', value: weight ? `${weight}kg` : '--' },
            { label: 'Height', value: height ? `${height}cm` : '--' },
            { label: 'Age', value: age ? `${age} yrs` : '--' },
            { label: 'Daily Calories', value: tdee ? `${tdee.toLocaleString()} kcal` : '--' },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 14, padding: '16px' }}>
              <div style={{ color: text3, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 4 }}>{stat.label}</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 800, color: text }}>{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* BMI */}
        {bmi && (
          <div style={{ background: bg2, border: `1px solid ${bmiCat.color}33`, borderRadius: 16, padding: 20, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ color: text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 4 }}>BMI</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, fontWeight: 900, color: bmiCat.color }}>{bmi}</div>
            </div>
            <div style={{ background: `${bmiCat.color}15`, border: `1px solid ${bmiCat.color}33`, borderRadius: 10, padding: '8px 16px' }}>
              <span style={{ color: bmiCat.color, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 700 }}>{bmiCat.label}</span>
            </div>
          </div>
        )}

        {/* Goal */}
        {goal && (
          <div style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 16, padding: 20, marginBottom: 24 }}>
            <div style={{ color: text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 8 }}>Current Goal</div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 800, color: '#FF4D00', textTransform: 'capitalize' }}>{goal}</div>
          </div>
        )}

        {/* Reset button */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button onClick={() => { resetUser(); navigate('/') }}
            style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid #FF305733', borderRadius: 12, cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: 1, color: '#FF3057', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <LogOut size={14} /> Reset
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}