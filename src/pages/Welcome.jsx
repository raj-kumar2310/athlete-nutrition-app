import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Zap } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'


export default function Welcome() {
  const navigate = useNavigate()
  const { bg } = useTheme()

  return (
    <div style={{
      minHeight: '100vh', background: bg,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '0 24px', position: 'relative', overflow: 'hidden'
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,77,0,0.15) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', top: '10%', left: '-20%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,77,0,0.05) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
        style={{
          width: 80, height: 80, borderRadius: 24,
          background: 'linear-gradient(135deg, #FF4D00, #FF7A00)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 32, boxShadow: '0 0 60px rgba(255,77,0,0.4)'
        }}
      >
        <Zap size={40} color="#fff" fill="#fff" />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 16 }}
      >
        <h1 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 64, fontWeight: 900, color: '#9b9191',
          letterSpacing: -2, lineHeight: 0.95, margin: 0
        }}>
          ATHLETE<br />
          <span style={{ color: '#FF4D00' }}>EATS</span>
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        style={{
          color: '#555', fontSize: 16, textAlign: 'center',
          marginBottom: 64, letterSpacing: 2, textTransform: 'uppercase',
          fontFamily: "'Barlow Condensed', sans-serif"
        }}
      >
        Fuel Your Performance
      </motion.p>

      {/* Feature Pills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        style={{ display: 'flex', gap: 8, marginBottom: 48, flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {['Training-specific nutrition', 'Competition day plans', 'Calorie calculator'].map((f) => (
          <span key={f} style={{
            background: 'rgba(255,77,0,0.1)', border: '1px solid rgba(255,77,0,0.2)',
            borderRadius: 100, padding: '6px 14px', color: '#FF7A00',
            fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, letterSpacing: 1
          }}>{f}</span>
        ))}
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 12 }}
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/setup')}
          style={{
            width: '100%', padding: '18px',
            background: 'linear-gradient(135deg, #FF4D00, #FF7A00)',
            border: 'none', borderRadius: 16, cursor: 'pointer',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 20, fontWeight: 800, letterSpacing: 2,
            color: '#fff', textTransform: 'uppercase',
            boxShadow: '0 8px 32px rgba(255,77,0,0.3)'
          }}
        >
          Get Started
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/home')}
          style={{
            width: '100%', padding: '16px',
            background: 'transparent', border: '1px solid #222',
            borderRadius: 16, cursor: 'pointer',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 18, fontWeight: 700, letterSpacing: 2,
            color: '#555', textTransform: 'uppercase'
          }}
        >
          Explore App
        </motion.button>
      </motion.div>
    </div>
  )
}