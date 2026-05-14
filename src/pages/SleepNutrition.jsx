import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Moon, Star, Zap, AlertCircle, CheckCircle2, Clock, Droplet, Activity, TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useMobileOptimization } from '../hooks/useMobileOptimization'
import { useResponsive } from '../hooks/useResponsive'
import BottomNav from '../components/BottomNav'

const recommendedFoods = [
  { name: 'Banana', protein: '1.3g', magnesium: '27mg', benefits: 'Tryptophan & Potassium', sleepScore: 95, emoji: '🍌' },
  { name: 'Warm Milk', protein: '8g', magnesium: '24mg', benefits: 'Calcium & Casein', sleepScore: 98, emoji: '🥛' },
  { name: 'Oats', protein: '10g', magnesium: '44mg', benefits: 'Complex Carbs', sleepScore: 90, emoji: '🥣' },
  { name: 'Almonds', protein: '6g', magnesium: '76mg', benefits: 'Magnesium Rich', sleepScore: 96, emoji: '🌰' },
  { name: 'Greek Yogurt', protein: '10g', magnesium: '14mg', benefits: 'Probiotics', sleepScore: 92, emoji: '🥛' },
  { name: 'Peanut Butter Toast', protein: '8g', magnesium: '49mg', benefits: 'B Vitamins', sleepScore: 88, emoji: '🍞' },
  { name: 'Paneer', protein: '25g', magnesium: '19mg', benefits: 'Casein Protein', sleepScore: 94, emoji: '🧀' },
  { name: 'Chamomile Tea', protein: '0g', magnesium: '36mg', benefits: 'Apigenin', sleepScore: 97, emoji: '🍵' },
]

const foodsToAvoid = [
  { name: 'Energy Drinks', reason: 'High caffeine & sugar', icon: '⚡', severity: 'critical' },
  { name: 'Excess Caffeine', reason: 'Disrupts sleep cycle', icon: '☕', severity: 'critical' },
  { name: 'Heavy Fried Foods', reason: 'Digestion disruption', icon: '🍟', severity: 'high' },
  { name: 'Sugary Snacks', reason: 'Blood sugar spike', icon: '🍫', severity: 'high' },
]

const checklist = [
  { item: 'Consumed protein-rich food', completed: false },
  { item: 'Drank water (not excessive)', completed: false },
  { item: 'Avoided caffeine after 6 PM', completed: false },
  { item: 'Ate 2-3 hours before bed', completed: false },
  { item: 'Added magnesium-rich foods', completed: false },
]

export default function SleepNutrition() {
  const navigate = useNavigate()
  const { theme, bg, bg2, bg3, border, border2, text, text2, text3 } = useTheme()
  const { isMobile, animationConfig } = useMobileOptimization()
  const { padding, gapMedium, textHeading, blurIntensity, blurIntensityStrong } = useResponsive()
  const [checkedItems, setCheckedItems] = useState({})
  const [sleepScore, setSleepScore] = useState(72)
  const [recoveryScore, setRecoveryScore] = useState(68)

  const toggleCheckItem = (index) => {
    setCheckedItems(prev => ({ ...prev, [index]: !prev[index] }))
    if (checkedItems[index] === false) {
      setSleepScore(prev => Math.min(100, prev + 5))
      setRecoveryScore(prev => Math.min(100, prev + 4))
    }
  }

  const completedCount = Object.values(checkedItems).filter(Boolean).length
  const completionPercentage = (completedCount / checklist.length) * 100

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  const floatingVariants = {
    animate: {
      y: [0, -8, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
    },
  }

  return (
    <div style={{ minHeight: '100vh', background: bg, paddingBottom: 120, transition: 'background 0.3s', width: '100%', overflow: 'hidden' }}>

      {/* Header with Back Button */}
      <div style={{
        padding: `16px ${padding} 24px`,
        background: theme === 'dark'
          ? 'linear-gradient(180deg, rgba(79, 195, 247, 0.05) 0%, transparent 100%)'
          : 'linear-gradient(180deg, rgba(79, 195, 247, 0.08) 0%, transparent 100%)',
        borderBottom: `1px solid ${border}`,
        backdropFilter: `blur(${blurIntensity})`,
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ maxWidth: 480, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'transparent',
              border: 'none',
              color: text,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: isMobile ? 12 : 14,
              marginBottom: 16,
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => !isMobile && (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={e => !isMobile && (e.currentTarget.style.opacity = '1')}
          >
            <ArrowLeft size={isMobile ? 18 : 20} />
            Back
          </button>

          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: isMobile ? 28 : 36,
              fontWeight: 900,
              color: text,
              margin: 0,
              letterSpacing: -0.5,
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? 8 : 12,
            }}>
              <span style={{ fontSize: isMobile ? 32 : 40 }}>🌙</span> Sleep Nutrition
            </h1>
            <p style={{ color: text2, fontSize: isMobile ? 12 : 13, marginTop: 8, lineHeight: 1.5 }}>
              Optimize your nighttime nutrition for better recovery & sleep quality
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        style={{ padding: `24px ${padding}`, maxWidth: 480, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* AI Sleep Recommendation Box */}
        <motion.div
          variants={itemVariants}
          style={{
            background: theme === 'dark'
              ? 'linear-gradient(135deg, rgba(79, 195, 247, 0.1) 0%, rgba(206, 147, 216, 0.05) 100%)'
              : 'linear-gradient(135deg, rgba(79, 195, 247, 0.08) 0%, rgba(206, 147, 216, 0.04) 100%)',
            border: `1.5px solid ${theme === 'dark' ? 'rgba(79, 195, 247, 0.3)' : 'rgba(79, 195, 247, 0.2)'}`,
            borderRadius: 18,
            padding: isMobile ? '16px' : '20px',
            marginBottom: 24,
            backdropFilter: `blur(${blurIntensityStrong})`,
            boxShadow: theme === 'dark'
              ? `0 8px 32px rgba(79, 195, 247, 0.06)`
              : `0 4px 16px rgba(79, 195, 247, 0.04)`,
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0, right: 0,
            width: 120, height: 120,
            background: 'radial-gradient(circle, rgba(79, 195, 247, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'translate(40px, -40px)',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 12, marginBottom: 12 }}>
              <div style={{
                width: isMobile ? 36 : 44, height: isMobile ? 36 : 44,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #4FC3F7, #81D4FA)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(79, 195, 247, 0.3)',
              }}>
                <Zap size={isMobile ? 18 : 22} color="#fff" />
              </div>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: isMobile ? 16 : 18, fontWeight: 800, color: text, margin: 0 }}>
                AI Sleep Recommendation
              </h3>
            </div>
            <p style={{
              color: text,
              fontSize: isMobile ? 13 : 14,
              lineHeight: 1.6,
              margin: 0,
              fontWeight: 500,
            }}>
              "Based on your high-intensity training today, consume high-protein slow-digesting foods like paneer or Greek yogurt 2-3 hours before sleep. Add magnesium-rich almonds and warm chamomile tea for optimal overnight muscle recovery and deep sleep."
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
              <span style={{
                fontSize: isMobile ? 10 : 11,
                background: theme === 'dark' ? 'rgba(79, 195, 247, 0.2)' : 'rgba(79, 195, 247, 0.15)',
                color: '#4FC3F7',
                padding: '4px 10px',
                borderRadius: 6,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                letterSpacing: 1,
              }}>
                PERSONALIZED
              </span>
              <span style={{
                fontSize: isMobile ? 10 : 11,
                background: theme === 'dark' ? 'rgba(206, 147, 216, 0.2)' : 'rgba(206, 147, 216, 0.15)',
                color: '#CE93D8',
                padding: '4px 10px',
                borderRadius: 6,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                letterSpacing: 1,
              }}>
                AI-POWERED
              </span>
            </div>
          </div>
        </motion.div>

        {/* Sleep & Recovery Scores */}
        <motion.div
          variants={itemVariants}
          style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: gapMedium, marginBottom: 24 }}
        >
          {/* Sleep Quality Score */}
          <motion.div
            whileHover={isMobile ? {} : { y: -4 }}
            style={{
              background: theme === 'dark' ? 'rgba(79, 195, 247, 0.08)' : 'rgba(79, 195, 247, 0.06)',
              border: `1.5px solid ${theme === 'dark' ? 'rgba(79, 195, 247, 0.3)' : 'rgba(79, 195, 247, 0.2)'}`,
              borderRadius: 16,
              padding: 20,
              backdropFilter: 'blur(15px)',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 800, color: text3, margin: 0, textTransform: 'uppercase', letterSpacing: 1 }}>
                Sleep Score
              </h3>
              <Moon size={18} color="#4FC3F7" />
            </div>

            <motion.div animate={floatingVariants.animate}>
              <div style={{
                fontSize: 48,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                background: 'linear-gradient(135deg, #4FC3F7, #81D4FA)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: '0 0 8px',
              }}>
                {sleepScore}
              </div>
            </motion.div>

            <div style={{
              width: '100%',
              height: 6,
              background: theme === 'dark' ? 'rgba(79, 195, 247, 0.1)' : 'rgba(79, 195, 247, 0.08)',
              borderRadius: 3,
              overflow: 'hidden',
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${sleepScore}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #4FC3F7, #81D4FA)',
                  borderRadius: 3,
                }}
              />
            </div>
          </motion.div>

          {/* Recovery Meter */}
          <motion.div
            whileHover={isMobile ? {} : { y: -4 }}
            style={{
              background: theme === 'dark' ? 'rgba(206, 147, 216, 0.08)' : 'rgba(206, 147, 216, 0.06)',
              border: `1.5px solid ${theme === 'dark' ? 'rgba(206, 147, 216, 0.3)' : 'rgba(206, 147, 216, 0.2)'}`,
              borderRadius: 16,
              padding: 20,
              backdropFilter: 'blur(15px)',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 800, color: text3, margin: 0, textTransform: 'uppercase', letterSpacing: 1 }}>
                Recovery
              </h3>
              <Activity size={18} color="#CE93D8" />
            </div>

            <motion.div animate={floatingVariants.animate} style={{ transitionDelay: '0.2s' }}>
              <div style={{
                fontSize: 48,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                background: 'linear-gradient(135deg, #CE93D8, #E1BEE7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: '0 0 8px',
              }}>
                {recoveryScore}
              </div>
            </motion.div>

            <div style={{
              width: '100%',
              height: 6,
              background: theme === 'dark' ? 'rgba(206, 147, 216, 0.1)' : 'rgba(206, 147, 216, 0.08)',
              borderRadius: 3,
              overflow: 'hidden',
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${recoveryScore}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #CE93D8, #E1BEE7)',
                  borderRadius: 3,
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Bedtime Nutrition Checklist */}
        <motion.div variants={itemVariants} style={{ marginBottom: 28 }}>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 18,
            fontWeight: 800,
            color: text,
            marginBottom: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}>
            <div style={{
              width: 36, height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #4FC3F7, #81D4FA)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(79, 195, 247, 0.3)',
            }}>
              <CheckCircle2 size={20} color="#fff" />
            </div>
            Tonight's Checklist
          </h2>

          {/* Progress Ring */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ position: 'relative', width: 80, height: 80, flexShrink: 0 }}>
              <svg
                style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}
                width="80"
                height="80"
                viewBox="0 0 80 80"
              >
                <circle cx="40" cy="40" r="36" fill="none" stroke={border} strokeWidth="3" />
                <motion.circle
                  cx="40"
                  cy="40"
                  r="36"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="3"
                  strokeDasharray={226.2}
                  initial={{ strokeDashoffset: 226.2 }}
                  animate={{ strokeDashoffset: 226.2 - (completionPercentage / 100) * 226.2 }}
                  transition={{ duration: 0.6 }}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4FC3F7" />
                    <stop offset="100%" stopColor="#CE93D8" />
                  </linearGradient>
                </defs>
              </svg>
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{
                  fontSize: 24,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #4FC3F7, #CE93D8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {completedCount}/{checklist.length}
                </div>
              </div>
            </div>

            <div>
              <p style={{ color: text, fontSize: 14, fontWeight: 600, margin: '0 0 4px', fontFamily: "'Barlow Condensed', sans-serif" }}>
                {completionPercentage === 100 ? '🎉 Perfect Night!' : 'Complete Tonight'}
              </p>
              <p style={{ color: text2, fontSize: 12, margin: 0 }}>
                {completedCount} of {checklist.length} tasks completed
              </p>
            </div>
          </div>

          {/* Checklist Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {checklist.map((item, idx) => (
              <motion.button
                key={idx}
                onClick={() => toggleCheckItem(idx)}
                whileHover={isMobile ? {} : { scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 16px',
                  borderRadius: 12,
                  background: checkedItems[idx]
                    ? theme === 'dark' ? 'rgba(79, 195, 247, 0.1)' : 'rgba(79, 195, 247, 0.08)'
                    : theme === 'dark' ? '#0f0f0f' : '#ffffff',
                  border: `1.5px solid ${checkedItems[idx]
                    ? 'rgba(79, 195, 247, 0.4)'
                    : border}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  width: 24, height: 24,
                  borderRadius: 8,
                  background: checkedItems[idx]
                    ? 'linear-gradient(135deg, #4FC3F7, #81D4FA)'
                    : border,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s',
                }}>
                  {checkedItems[idx] && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
                      <CheckCircle2 size={18} color="#fff" />
                    </motion.div>
                  )}
                </div>
                <span style={{
                  color: checkedItems[idx] ? '#4FC3F7' : text,
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: checkedItems[idx] ? 'line-through' : 'none',
                  opacity: checkedItems[idx] ? 0.7 : 1,
                }}>
                  {item.item}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Recommended Night Foods */}
        <motion.div variants={itemVariants} style={{ marginBottom: 28 }}>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 18,
            fontWeight: 800,
            color: text,
            marginBottom: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}>
            <div style={{
              width: 36, height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #FFB347, #FF8C00)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(255, 140, 0, 0.3)',
            }}>
              <Star size={20} color="#fff" />
            </div>
            Recommended Night Foods
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: gapMedium }}>
            {recommendedFoods.map((food, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={isMobile ? {} : { y: -6, scale: 1.02 }}
                style={{
                  background: theme === 'dark'
                    ? 'linear-gradient(135deg, rgba(79, 195, 247, 0.08) 0%, rgba(206, 147, 216, 0.04) 100%)'
                    : 'linear-gradient(135deg, rgba(79, 195, 247, 0.06) 0%, rgba(206, 147, 216, 0.03) 100%)',
                  border: `1.5px solid ${theme === 'dark' ? 'rgba(79, 195, 247, 0.25)' : 'rgba(79, 195, 247, 0.15)'}`,
                  borderRadius: 16,
                  padding: 16,
                  backdropFilter: 'blur(15px)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: -20, right: -20,
                  width: 80, height: 80,
                  background: 'radial-gradient(circle, rgba(79, 195, 247, 0.1) 0%, transparent 70%)',
                  borderRadius: '50%',
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{food.emoji}</div>
                  <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 800, color: text, margin: '0 0 8px', letterSpacing: 0.5 }}>
                    {food.name}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
                    <div style={{ fontSize: 11, color: text2, display: 'flex', justifyContent: 'space-between' }}>
                      <span>Protein</span>
                      <span style={{ color: '#FF8C00', fontWeight: 700 }}>{food.protein}</span>
                    </div>
                    <div style={{ fontSize: 11, color: text2, display: 'flex', justifyContent: 'space-between' }}>
                      <span>Magnesium</span>
                      <span style={{ color: '#4FC3F7', fontWeight: 700 }}>{food.magnesium}</span>
                    </div>
                    <div style={{ fontSize: 11, color: text2 }}>
                      <span style={{ color: text3 }}>{food.benefits}</span>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    paddingTop: 10,
                    borderTop: `1px solid ${theme === 'dark' ? 'rgba(79, 195, 247, 0.15)' : 'rgba(79, 195, 247, 0.1)'}`,
                  }}>
                    <span style={{ fontSize: 11, color: text3, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>
                      Sleep Score
                    </span>
                    <span style={{
                      fontSize: 13,
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 900,
                      background: 'linear-gradient(135deg, #4FC3F7, #81D4FA)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                      {food.sleepScore}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Foods to Avoid */}
        <motion.div variants={itemVariants} style={{ marginBottom: 28 }}>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 18,
            fontWeight: 800,
            color: text,
            marginBottom: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}>
            <div style={{
              width: 36, height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #FF6B6B, #FF3057)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(255, 48, 87, 0.3)',
            }}>
              <AlertCircle size={20} color="#fff" />
            </div>
            Avoid at Night
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: gapMedium }}>
            {foodsToAvoid.map((food, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                style={{
                  background: theme === 'dark'
                    ? 'linear-gradient(135deg, rgba(255, 107, 107, 0.08) 0%, rgba(255, 48, 87, 0.04) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 107, 107, 0.06) 0%, rgba(255, 48, 87, 0.03) 100%)',
                  border: `1.5px solid ${theme === 'dark' ? 'rgba(255, 107, 107, 0.25)' : 'rgba(255, 107, 107, 0.15)'}`,
                  borderRadius: 16,
                  padding: 16,
                  backdropFilter: 'blur(15px)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: -20, right: -20,
                  width: 80, height: 80,
                  background: 'radial-gradient(circle, rgba(255, 107, 107, 0.1) 0%, transparent 70%)',
                  borderRadius: '50%',
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{food.icon}</div>
                  <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 800, color: text, margin: 0, letterSpacing: 0.5 }}>
                    {food.name}
                  </h3>
                  <p style={{ fontSize: 12, color: text2, margin: '6px 0 0 0' }}>
                    {food.reason}
                  </p>
                  <div style={{
                    marginTop: 10,
                    display: 'inline-block',
                    padding: '4px 8px',
                    borderRadius: 6,
                    fontSize: 10,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    background: food.severity === 'critical'
                      ? 'rgba(255, 48, 87, 0.2)'
                      : 'rgba(255, 152, 0, 0.2)',
                    color: food.severity === 'critical' ? '#FF3057' : '#FF9800',
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                  }}>
                    {food.severity}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sleep Timing Section */}
        <motion.div variants={itemVariants} style={{ marginBottom: 24 }}>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 18,
            fontWeight: 800,
            color: text,
            marginBottom: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}>
            <div style={{
              width: 36, height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #00E676, #00BFA5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0, 230, 118, 0.3)',
            }}>
              <Clock size={20} color="#fff" />
            </div>
            Sleep Timing Guide
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Last Meal Timing', value: '2-3 hours before sleep', icon: '⏰', color: '#00E676' },
              { label: 'Light Snack Timing', value: '30-60 mins before bed', icon: '🍌', color: '#4FC3F7' },
              { label: 'Ideal Sleep Duration', value: '7-9 hours for athletes', icon: '😴', color: '#CE93D8' },
              { label: 'Hydration Cutoff', value: '1-2 hours before bed', icon: '💧', color: '#81D4FA' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={isMobile ? {} : { x: 4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '16px',
                  borderRadius: 14,
                  background: theme === 'dark' ? '#0f0f0f' : '#ffffff',
                  border: `1.5px solid ${border}`,
                  transition: 'all 0.2s',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: text3, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 14, color: item.color, fontWeight: 600 }}>
                    {item.value}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Tips */}
        <motion.div variants={itemVariants} style={{
          background: theme === 'dark'
            ? 'linear-gradient(135deg, rgba(0, 230, 118, 0.08) 0%, rgba(0, 191, 165, 0.04) 100%)'
            : 'linear-gradient(135deg, rgba(0, 230, 118, 0.06) 0%, rgba(0, 191, 165, 0.03) 100%)',
          border: `1.5px solid ${theme === 'dark' ? 'rgba(0, 230, 118, 0.25)' : 'rgba(0, 230, 118, 0.15)'}`,
          borderRadius: 16,
          padding: 20,
          backdropFilter: 'blur(15px)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: 24,
        }}>
          <div style={{
            position: 'absolute',
            top: -30, left: -30,
            width: 120, height: 120,
            background: 'radial-gradient(circle, rgba(0, 230, 118, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 16,
              fontWeight: 800,
              color: text,
              margin: '0 0 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              letterSpacing: 0.5,
            }}>
              💡 Pro Tips for Better Sleep
            </h3>

            <ul style={{
              margin: 0,
              padding: '0 0 0 20px',
              color: text2,
              fontSize: 13,
              lineHeight: 1.7,
            }}>
              <li>Eat mainly carbs + protein, avoid heavy fats before bed</li>
              <li>Magnesium-rich foods improve muscle relaxation</li>
              <li>Warm milk and tea help activate sleep hormones</li>
              <li>Stay hydrated but avoid excessive liquid before sleep</li>
              <li>Create a consistent pre-sleep eating routine</li>
            </ul>
          </div>
        </motion.div>

      </motion.div>

      <BottomNav />
    </div>
  )
}
