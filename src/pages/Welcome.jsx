import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Zap, Flame, TrendingUp, Calendar, Apple, Heart, Activity, BarChart3 } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export default function Welcome() {
  const navigate = useNavigate()
  const { bg, bg2, border, text, text2, text3 } = useTheme()

  const features = [
    {
      icon: Apple,
      title: 'Nutrition Plans',
      description: 'Sport-specific meal plans optimized for your training and competition goals',
      color: '#FF4D00'
    },
    {
      icon: Flame,
      title: 'Calorie Tracking',
      description: 'Smart calorie calculator with macro breakdown for perfect nutrition balance',
      color: '#FF7A00'
    },
    {
      icon: Calendar,
      title: 'Training Day Plans',
      description: 'Customized nutrition for speed, endurance, and strength training days',
      color: '#FFB347'
    },
    {
      icon: Activity,
      title: 'Competition Mode',
      description: 'Pre-competition meal timing and recovery nutrition guidance',
      color: '#FF4D00'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor performance improvements with detailed analytics and trends',
      color: '#FF7A00'
    },
    {
      icon: Heart,
      title: 'Recovery Tips',
      description: 'Hydration, sleep, and recovery nutrition recommendations',
      color: '#FFB347'
    }
  ]

  const steps = [
    {
      number: '01',
      title: 'Set Your Profile',
      description: 'Tell us your sport, goals, and body metrics. Takes 2 minutes.'
    },
    {
      number: '02',
      title: 'Get Personalized Plan',
      description: 'Receive nutrition recommendations tailored to your sport and schedule.'
    },
    {
      number: '03',
      title: 'Track & Improve',
      description: 'Log meals, track progress, and see performance improvements.'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div style={{ background: bg, minHeight: '100vh', overflow: 'hidden' }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          minHeight: '100vh', background: bg,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '0 24px', position: 'relative', overflow: 'hidden'
        }}
      >
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
            marginBottom: 32, boxShadow: '0 0 60px rgba(255,77,0,0.4)',
            zIndex: 10
          }}
        >
          <Zap size={40} color="#fff" fill="#fff" />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 16, zIndex: 10 }}
        >
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 64, fontWeight: 900, color: text,
            letterSpacing: -2, lineHeight: 0.95, margin: 0
          }}>
            ATHLETE<br />
            <span style={{ color: '#FF4D00' }}>EATS</span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            color: text2, fontSize: 16, textAlign: 'center',
            marginBottom: 16, letterSpacing: 2, textTransform: 'uppercase',
            fontFamily: "'Barlow Condensed', sans-serif", zIndex: 10
          }}
        >
          Fuel Your Performance
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            color: text3, fontSize: 14, textAlign: 'center',
            marginBottom: 48, maxWidth: 500, lineHeight: 1.6, zIndex: 10
          }}
        >
          Science-backed nutrition plans tailored for your sport, training intensity, and competition goals. Track macros, optimize recovery, and elevate your athletic performance.
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{ display: 'flex', gap: 8, marginBottom: 48, flexWrap: 'wrap', justifyContent: 'center', zIndex: 10 }}
        >
          {['Sport-specific plans', 'Macro tracking', 'Recovery tips', 'Progress analytics'].map((f) => (
            <span key={f} style={{
              background: 'rgba(255,77,0,0.1)', border: '1px solid rgba(255,77,0,0.2)',
              borderRadius: 100, padding: '6px 14px', color: '#FF7A00',
              fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, letterSpacing: 1
            }}>{f}</span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 12, zIndex: 10 }}
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
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              width: '100%', padding: '16px',
              background: 'transparent', border: `1px solid ${border}`,
              borderRadius: 16, cursor: 'pointer',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 18, fontWeight: 700, letterSpacing: 2,
              color: text, textTransform: 'uppercase'
            }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <div id="features" style={{
        padding: '80px 24px', background: bg2, borderTop: `1px solid ${border}`
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 60 }}
          >
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 48, fontWeight: 900, color: text,
              letterSpacing: -1, margin: '0 0 12px 0'
            }}>
              Six Pillars of Athletic Nutrition
            </h2>
            <p style={{ color: text3, fontSize: 16, margin: 0 }}>
              Everything you need to optimize performance and recovery
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 24
            }}
          >
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  style={{
                    background: bg,
                    border: `1px solid ${border}`,
                    borderRadius: 20,
                    padding: 32,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  <div style={{
                    width: 60, height: 60,
                    borderRadius: 12,
                    background: `${feature.color}22`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}>
                    <Icon size={32} color={feature.color} />
                  </div>
                  <h3 style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 20, fontWeight: 800, color: text,
                    margin: '0 0 8px 0', letterSpacing: 0.5
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    color: text3, fontSize: 14, lineHeight: 1.6, margin: 0
                  }}>
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* How It Works */}
      <div style={{
        padding: '80px 24px', background: bg, borderTop: `1px solid ${border}`
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 60 }}
          >
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 48, fontWeight: 900, color: text,
              letterSpacing: -1, margin: '0 0 12px 0'
            }}>
              How It Works
            </h2>
            <p style={{ color: text3, fontSize: 16, margin: 0 }}>
              Three simple steps to transform your nutrition
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 32
            }}
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                style={{
                  position: 'relative',
                  padding: '40px 24px',
                  background: bg2,
                  border: `1px solid ${border}`,
                  borderRadius: 20,
                  textAlign: 'center'
                }}
              >
                <div style={{
                  position: 'absolute', top: -20, left: '50%',
                  transform: 'translateX(-50%)',
                  width: 60, height: 60,
                  background: 'linear-gradient(135deg, #FF4D00, #FF7A00)',
                  borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 28, fontWeight: 900,
                  color: '#fff', boxShadow: '0 8px 16px rgba(255,77,0,0.3)'
                }}>
                  {step.number}
                </div>
                <h3 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 24, fontWeight: 800, color: text,
                  margin: '24px 0 12px 0', letterSpacing: 0.5
                }}>
                  {step.title}
                </h3>
                <p style={{
                  color: text3, fontSize: 14, lineHeight: 1.6, margin: 0
                }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Example Dashboard Preview */}
      <div style={{
        padding: '80px 24px', background: bg2, borderTop: `1px solid ${border}`
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 60 }}
          >
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 48, fontWeight: 900, color: text,
              letterSpacing: -1, margin: '0 0 12px 0'
            }}>
              Live Dashboard
            </h2>
            <p style={{ color: text3, fontSize: 16, margin: 0 }}>
              See all your nutrition data at a glance
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              background: bg,
              border: `1px solid ${border}`,
              borderRadius: 24,
              padding: 40,
              boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ marginBottom: 32 }}>
              <h3 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 28, fontWeight: 900, color: text,
                margin: '0 0 20px 0'
              }}>
                Good Morning, Athlete ⚡
              </h3>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 16,
              marginBottom: 40
            }}>
              {[
                { label: 'Daily Target', value: '2,500', unit: 'kcal', icon: Flame },
                { label: 'Protein Goal', value: '150', unit: 'g', icon: Apple },
                { label: 'Logged Today', value: '0', unit: 'kcal', icon: BarChart3 },
                { label: 'BMI', value: '--', unit: '', icon: TrendingUp }
              ].map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div key={i} style={{
                    background: bg2,
                    border: `1px solid ${border}`,
                    borderRadius: 12,
                    padding: 16,
                    textAlign: 'center'
                  }}>
                    <div style={{
                      display: 'flex', justifyContent: 'center', marginBottom: 8
                    }}>
                      <Icon size={20} color="#FF4D00" />
                    </div>
                    <p style={{
                      color: text3, fontSize: 12, margin: '0 0 4px 0',
                      textTransform: 'uppercase', letterSpacing: 1,
                      fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600
                    }}>
                      {stat.label}
                    </p>
                    <p style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 24, fontWeight: 900, color: '#FF4D00',
                      margin: 0
                    }}>
                      {stat.value}
                    </p>
                    {stat.unit && (
                      <p style={{ color: text3, fontSize: 12, margin: 0 }}>
                        {stat.unit}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>

            <div style={{
              background: bg2,
              border: `1px solid ${border}`,
              borderRadius: 12,
              padding: 20,
              marginBottom: 24
            }}>
              <h4 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 16, fontWeight: 800, color: text,
                margin: '0 0 16px 0', letterSpacing: 0.5
              }}>
                Today's Macro Breakdown
              </h4>
              {[
                { name: 'Protein', current: 0, target: 150, color: '#FF4D00' },
                { name: 'Carbs', current: 0, target: 300, color: '#FF7A00' },
                { name: 'Fat', current: 0, target: 70, color: '#FFB347' }
              ].map((macro, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    marginBottom: 6
                  }}>
                    <span style={{ fontSize: 13, color: text, fontWeight: 600 }}>
                      {macro.name}
                    </span>
                    <span style={{ fontSize: 13, color: text3 }}>
                      {macro.current}/{macro.target}g
                    </span>
                  </div>
                  <div style={{
                    width: '100%', height: 8,
                    background: `${macro.color}22`,
                    borderRadius: 4,
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${(macro.current / macro.target) * 100}%`,
                      height: '100%',
                      background: macro.color,
                      transition: 'width 0.3s'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        padding: '80px 24px',
        background: 'linear-gradient(135deg, rgba(255,77,0,0.05) 0%, transparent 100%)',
        borderTop: `1px solid ${border}`,
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 40, fontWeight: 900, color: text,
              letterSpacing: -1, margin: '0 0 16px 0'
            }}>
              Ready to Optimize Your Performance?
            </h2>
            <p style={{
              color: text3, fontSize: 16, margin: '0 0 32px 0', lineHeight: 1.6
            }}>
              Join athletes who are transforming their nutrition and reaching peak performance with personalized, science-backed plans.
            </p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate('/setup')}
              style={{
                padding: '16px 40px',
                background: 'linear-gradient(135deg, #FF4D00, #FF7A00)',
                border: 'none', borderRadius: 16, cursor: 'pointer',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 18, fontWeight: 800, letterSpacing: 2,
                color: '#fff', textTransform: 'uppercase',
                boxShadow: '0 8px 32px rgba(255,77,0,0.3)'
              }}
            >
              Get Started Free
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: '40px 24px',
        borderTop: `1px solid ${border}`,
        textAlign: 'center',
        background: bg2
      }}>
        <p style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 14, color: text3, margin: 0,
          letterSpacing: 1, textTransform: 'uppercase'
        }}>
          ATHLETE EATS • Fuel Your Performance
        </p>
      </div>
    </div>
  )
}
