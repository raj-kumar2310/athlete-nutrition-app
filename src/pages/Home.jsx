import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Dumbbell, Trophy, Zap, Heart, Scale, Calculator, Sun, Moon, Activity, Shield } from 'lucide-react'
import { useUserStore } from '../stores/userStore'
import BottomNav from '../components/BottomNav'

const tabs = [
  { id: 'training',    label: 'Training Day',        sublabel: 'Speed · Endurance · Strength · Flex', icon: Dumbbell,   color: '#FF4D00', path: '/training',    gradient: 'linear-gradient(135deg, #FF4D00, #FF7A00)' },
  { id: 'competition', label: 'Competition Day',      sublabel: 'Aerobic & Anaerobic sports',          icon: Trophy,     color: '#FFB347', path: '/competition', gradient: 'linear-gradient(135deg, #FF7A00, #FFB347)' },
  { id: 'performance', label: 'Performance',          sublabel: 'Boost speed, power & endurance',      icon: Zap,        color: '#FF3057', path: '/performance', gradient: 'linear-gradient(135deg, #FF3057, #FF6B6B)' },
  { id: 'recovery',    label: 'Recovery Day',         sublabel: 'Repair, hydrate & restore',           icon: Heart,      color: '#4FC3F7', path: '/recovery',    gradient: 'linear-gradient(135deg, #4FC3F7, #0288D1)' },
  { id: 'injury',      label: 'Injury Assistant',     sublabel: 'AI Physio • Rehab • Nutrition',       icon: Activity,   color: '#CE93D8', path: '/injury',      gradient: 'linear-gradient(135deg, #CE93D8, #AB47BC)' },
  { id: 'firstaid',    label: 'First Aid',            sublabel: 'Injuries • Recovery • Emergency',     icon: Shield,     color: '#FF3057', path: '/firstaid',    gradient: 'linear-gradient(135deg, #FF3057, #FF6B6B)' },
  { id: 'weight',      label: 'Weight Management',    sublabel: 'Cut · Bulk · Maintain',               icon: Scale,      color: '#00E676', path: '/weight',      gradient: 'linear-gradient(135deg, #00E676, #00BFA5)' },
  { id: 'calculator',  label: 'Nutrition Calculator', sublabel: 'Calories burned & intake',            icon: Calculator, color: '#FF8C00', path: '/calculator',  gradient: 'linear-gradient(135deg, #FF8C00, #FFB347)' },
]

export default function Home() {
  const navigate = useNavigate()
  const { name, sport, getTDEE, getBMI, theme, toggleTheme } = useUserStore()
  const tdee = getTDEE()
  const bmi  = getBMI()

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'

  const bg     = theme === 'dark' ? '#080808' : '#f5f5f5'
  const bg2    = theme === 'dark' ? '#0f0f0f' : '#ffffff'
  const border = theme === 'dark' ? '#1e1e1e' : '#e0e0e0'
  const text   = theme === 'dark' ? '#ffffff'  : '#111111'
  const text2  = theme === 'dark' ? '#555555'  : '#888888'
  const text3  = theme === 'dark' ? '#444444'  : '#aaaaaa'
  const cardBorder = (color) => theme === 'dark' ? `${color}22` : `${color}44`

  return (
    <div style={{ minHeight: '100vh', background: bg, paddingBottom: 80, transition: 'background 0.3s' }}>

      {/* Header */}
      <div style={{
        padding: '56px 24px 24px',
        background: theme === 'dark'
          ? 'linear-gradient(180deg, #0f0f0f 0%, #080808 100%)'
          : 'linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%)',
        borderBottom: `1px solid ${border}`,
        transition: 'all 0.3s'
      }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>

          {/* Top row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p style={{ color: text3, fontSize: 13, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>
                {greeting}
              </p>
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, fontWeight: 900, color: text, letterSpacing: -0.5, margin: '0 0 4px' }}>
                {name ? name.split(' ')[0] : 'Athlete'} <span style={{ color: '#FF4D00' }}>⚡</span>
              </h1>
              {sport && <p style={{ color: text2, fontSize: 13 }}>{sport} • Ready to perform</p>}
            </motion.div>

            {/* Theme Toggle */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.08 }}
              onClick={toggleTheme}
              style={{
                width: 44, height: 44, borderRadius: 12,
                background: bg2, border: `1px solid ${border}`,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'all 0.3s',
                boxShadow: theme === 'light' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none'
              }}
            >
              {theme === 'dark' ? <Sun size={18} color="#FFB347" /> : <Moon size={18} color="#555" />}
            </motion.button>
          </div>

          {/* Stats Row */}
          {tdee && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
              style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              {[
                { label: 'Daily Calories', value: tdee.toLocaleString(), unit: 'kcal', color: '#FF4D00' },
                { label: 'BMI',            value: bmi || '--',           unit: '',     color: '#4FC3F7' },
              ].map(stat => (
                <div key={stat.label} style={{ flex: 1, background: bg2, border: `1px solid ${border}`, borderRadius: 14, padding: '14px 16px', transition: 'all 0.3s' }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 26, fontWeight: 900, color: stat.color }}>
                    {stat.value}<span style={{ fontSize: 14, color: text3 }}> {stat.unit}</span>
                  </div>
                  <div style={{ color: text3, fontSize: 11, marginTop: 2, letterSpacing: 1, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Tabs Grid */}
      <div style={{ padding: '24px', maxWidth: 480, margin: '0 auto' }}>
        <p style={{ color: text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 16 }}>
          What's your focus today?
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {tabs.map((tab, i) => {
            const Icon = tab.icon
            return (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate(tab.path)}
                style={{
                  background: bg2, border: `1px solid ${cardBorder(tab.color)}`,
                  borderRadius: 18, padding: 20, cursor: 'pointer',
                  textAlign: 'left', position: 'relative', overflow: 'hidden',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: `radial-gradient(circle, ${tab.color}18 0%, transparent 70%)`, pointerEvents: 'none' }} />
                <div style={{ width: 44, height: 44, borderRadius: 12, background: tab.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, boxShadow: `0 4px 16px ${tab.color}33` }}>
                  <Icon size={20} color="#fff" strokeWidth={2} />
                </div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, color: text, letterSpacing: 0.3, marginBottom: 4 }}>
                  {tab.label}
                </div>
                <div style={{ color: text2, fontSize: 11, lineHeight: 1.4 }}>
                  {tab.sublabel}
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}