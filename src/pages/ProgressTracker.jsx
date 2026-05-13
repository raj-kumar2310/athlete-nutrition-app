import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, TrendingDown, Zap, AlertCircle, CheckCircle, Plus, Trash2, Flame, Clock, Target } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import BottomNav from '../components/BottomNav'

const WEIGHT_LOG_KEY = 'weight-log'
const TRAINING_LOG_KEY = 'training-log'
const INJURY_LOG_KEY = 'injury-log'
const PREPARATION_LOG_KEY = 'preparation-log'
const PERFORMANCE_LOG_KEY = 'performance-log'

// Helper: load from localStorage
function loadFromStorage(key, defaultValue = []) {
  if (typeof window === 'undefined') return defaultValue
  try {
    const data = window.localStorage.getItem(key)
    return data ? JSON.parse(data) : defaultValue
  } catch {
    return defaultValue
  }
}

// Helper: save to localStorage
function saveToStorage(key, data) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(data))
}

// ─── Tab 5: Performance Tracker ────────────────────────────────────
function PerformanceTrackerTab({ theme }) {
  const [performances, setPerformances] = useState(() => loadFromStorage(PERFORMANCE_LOG_KEY))
  const [event, setEvent] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [notes, setNotes] = useState('')
  const [segmentTimes, setSegmentTimes] = useState({})

  // Event configurations with segments and benchmark times
  const eventConfigs = {
    '100m': { segments: [{ label: '60m', distance: 60, goodTime: 6.5, badTime: 7.2 }, { label: '40m', distance: 40, goodTime: 4.0, badTime: 4.8 }], totalDistance: 100 },
    '200m': { segments: [{ label: '100m', distance: 100, goodTime: 13.0, badTime: 14.5 }, { label: '100m', distance: 100, goodTime: 13.0, badTime: 14.5 }], totalDistance: 200 },
    '400m': { segments: [{ label: '100m', distance: 100, goodTime: 13.0, badTime: 14.5 }, { label: '100m', distance: 100, goodTime: 13.0, badTime: 14.5 }, { label: '100m', distance: 100, goodTime: 13.5, badTime: 15.0 }, { label: '100m', distance: 100, goodTime: 13.5, badTime: 15.0 }], totalDistance: 400 },
    '800m': { segments: [{ label: '400m', distance: 400, goodTime: 52.0, badTime: 60.0 }, { label: '400m', distance: 400, goodTime: 53.0, badTime: 62.0 }], totalDistance: 800 },
  }

  const addPerformance = () => {
    if (!event || Object.keys(segmentTimes).length === 0) return
    const entry = {
      date,
      event,
      segmentTimes: { ...segmentTimes },
      notes,
      timestamp: Date.now(),
    }
    const updated = [...performances, entry]
    setPerformances(updated)
    saveToStorage(PERFORMANCE_LOG_KEY, updated)
    setEvent('')
    setSegmentTimes({})
    setNotes('')
  }

  // Calculate performance analysis
  const analyzePerformance = (eventName, times) => {
    const config = eventConfigs[eventName]
    if (!config) return null
    
    let totalGoodTime = 0
    let totalBadTime = 0
    let overallGood = 0
    let analysis = []

    config.segments.forEach((segment, idx) => {
      const segmentTime = times[`segment_${idx}`]
      if (segmentTime) {
        const time = parseFloat(segmentTime)
        totalGoodTime += segment.goodTime
        totalBadTime += segment.badTime
        const isGood = time <= segment.goodTime
        overallGood += isGood ? 1 : 0
        analysis.push({
          label: segment.label,
          time,
          status: isGood ? 'good' : 'bad',
          benchmark: segment.goodTime,
          diff: (time - segment.goodTime).toFixed(2)
        })
      }
    })

    return {
      analysis,
      overallPercentage: ((overallGood / config.segments.length) * 100).toFixed(0),
      overallStatus: overallGood >= config.segments.length / 2 ? 'good' : 'bad'
    }
  }

  const currentConfig = event ? eventConfigs[event] : null
  const currentAnalysis = event && Object.keys(segmentTimes).length > 0 ? analyzePerformance(event, segmentTimes) : null

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Events Logged', value: performances.length, color: '#2196F3' },
          { label: 'Avg Performance', value: performances.length > 0 ? '75%' : '-', color: '#4CAF50' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
            style={{ background: theme.bg2, border: `1px solid ${stat.color}22`, borderRadius: 14, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 900, color: stat.color }}>{stat.value}</div>
            <div style={{ color: theme.text3, fontSize: 11, marginTop: 6 }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Input form */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        style={{ background: theme.bg2, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 16, marginBottom: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ color: theme.text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>Event</label>
          <select value={event} onChange={e => { setEvent(e.target.value); setSegmentTimes({}); }}
            style={{ width: '100%', background: theme.input, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '12px 14px', color: theme.text, fontSize: 14, fontFamily: "'Barlow', sans-serif", outline: 'none', boxSizing: 'border-box', cursor: 'pointer', transition: 'all 0.2s' }}
            onFocus={e => e.target.style.borderColor = '#2196F366'}
            onBlur={e => e.target.style.borderColor = theme.border}>
            <option value="">Select event...</option>
            {Object.keys(eventConfigs).map(e => <option key={e} value={e}>{e.toUpperCase()}</option>)}
          </select>
        </div>

        {event && (
          <>
            <div style={{ marginBottom: 12 }}>
              <label style={{ color: theme.text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)}
                style={{ width: '100%', background: theme.input, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '12px 14px', color: theme.text, fontSize: 14, fontFamily: "'Barlow', sans-serif", outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s' }}
                onFocus={e => e.target.style.borderColor = '#2196F366'}
                onBlur={e => e.target.style.borderColor = theme.border} />
            </div>

            {/* Segment times */}
            <div style={{ marginBottom: 12, padding: '12px', background: theme.bg3, borderRadius: 12 }}>
              <h4 style={{ color: theme.text, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Segment Times (seconds)</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {currentConfig?.segments.map((segment, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <label style={{ color: theme.text3, fontSize: 12, minWidth: 60, fontWeight: 600 }}>{segment.label}:</label>
                    <input type="number" step="0.1" placeholder="0.00" value={segmentTimes[`segment_${idx}`] || ''} 
                      onChange={e => setSegmentTimes({...segmentTimes, [`segment_${idx}`]: e.target.value})}
                      style={{ flex: 1, background: theme.input, border: `1px solid ${theme.border}`, borderRadius: 8, padding: '8px 10px', color: theme.text, fontSize: 13, fontFamily: "'Barlow', sans-serif", outline: 'none', transition: 'all 0.2s' }}
                      onFocus={e => e.target.style.borderColor = '#2196F366'}
                      onBlur={e => e.target.style.borderColor = theme.border} />
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Analysis Preview */}
            {currentAnalysis && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                style={{ marginBottom: 12, padding: '12px', background: currentAnalysis.overallStatus === 'good' ? '#4CAF5022' : '#FF980022', borderRadius: 12, border: `1px solid ${currentAnalysis.overallStatus === 'good' ? '#4CAF5044' : '#FF980044'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 700, color: theme.text }}>Performance</span>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 900, color: currentAnalysis.overallStatus === 'good' ? '#4CAF50' : '#FF9800' }}>{currentAnalysis.overallPercentage}%</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {currentAnalysis.analysis.map((seg, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: seg.status === 'good' ? '#4CAF50' : '#FF9800' }}>
                      <span>{seg.label}: {seg.time}s</span>
                      <span style={{ fontWeight: 700 }}>{seg.status === 'good' ? '✓' : '✗'}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <div style={{ marginBottom: 12 }}>
              <label style={{ color: theme.text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>Notes (optional)</label>
              <textarea placeholder="Event details, conditions, feelings..." value={notes} onChange={e => setNotes(e.target.value)} rows="2"
                style={{ width: '100%', background: theme.input, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '12px 14px', color: theme.text, fontSize: 14, fontFamily: "'Barlow', sans-serif", outline: 'none', boxSizing: 'border-box', resize: 'none', transition: 'all 0.2s' }}
                onFocus={e => e.target.style.borderColor = '#2196F366'}
                onBlur={e => e.target.style.borderColor = theme.border} />
            </div>
          </>
        )}

        <motion.button whileTap={{ scale: 0.97 }} onClick={addPerformance} disabled={!event || Object.keys(segmentTimes).length === 0}
          style={{ width: '100%', padding: '12px', background: event && Object.keys(segmentTimes).length > 0 ? 'linear-gradient(135deg, #2196F3, #1976D2)' : theme.bg3, border: 'none', borderRadius: 12, cursor: event && Object.keys(segmentTimes).length > 0 ? 'pointer' : 'not-allowed', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: 2, color: event && Object.keys(segmentTimes).length > 0 ? '#fff' : theme.text3, textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.3s' }}>
          <Target size={14} /> Log Performance
        </motion.button>
      </motion.div>

      {/* Recent performances */}
      {performances.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ background: theme.bg2, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 16 }}>
          <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, color: theme.text, marginBottom: 12 }}>Recent Performances</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[...performances].reverse().slice(0, 8).map((perf, i) => {
              const analysis = analyzePerformance(perf.event, perf.segmentTimes)
              return (
                <motion.div key={perf.timestamp} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  style={{ padding: '14px', background: theme.bg3, borderRadius: 12, border: `1px solid ${analysis?.overallStatus === 'good' ? '#4CAF5044' : '#FF980044'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
                    <div>
                      <div style={{ color: theme.text, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 700 }}>{perf.event.toUpperCase()}</div>
                      <div style={{ color: theme.text3, fontSize: 11, marginTop: 2 }}>{new Date(perf.date).toLocaleDateString()}</div>
                    </div>
                    <div style={{ background: analysis?.overallStatus === 'good' ? '#4CAF5022' : '#FF980022', color: analysis?.overallStatus === 'good' ? '#4CAF50' : '#FF9800', padding: '6px 12px', borderRadius: 20, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 900 }}>
                      {analysis?.overallPercentage}%
                    </div>
                  </div>
                  {analysis && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: theme.text3 }}>
                      {analysis.analysis.map((seg, j) => (
                        <div key={j} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span>{seg.label}: {seg.time}s ({seg.status === 'good' ? '✓ Good' : '✗ Needs Work'})</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {perf.notes && <div style={{ color: theme.text2, fontSize: 11, marginTop: 8, fontStyle: 'italic' }}>"{perf.notes}"</div>}
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => setPerformances(performances.filter(x => x.timestamp !== perf.timestamp))} 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FF3057', padding: 4, marginTop: 8, fontSize: 12 }}>
                    Delete
                  </motion.button>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

// ─── Tab 1: Weight Log ────────────────────────────────────────────
function WeightLogTab({ theme }) {
  const [weights, setWeights] = useState(() => loadFromStorage(WEIGHT_LOG_KEY))
  const [input, setInput] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  const addWeight = () => {
    if (!input) return
    const entry = {
      date: selectedDate,
      weight: parseFloat(input),
      timestamp: Date.now(),
    }
    const updated = [...weights, entry].sort((a, b) => new Date(a.date) - new Date(b.date))
    setWeights(updated)
    saveToStorage(WEIGHT_LOG_KEY, updated)
    setInput('')
  }

  const deleteWeight = (timestamp) => {
    const updated = weights.filter(w => w.timestamp !== timestamp)
    setWeights(updated)
    saveToStorage(WEIGHT_LOG_KEY, updated)
  }

  const current = weights.length > 0 ? weights[weights.length - 1].weight : null
  const start = weights.length > 0 ? weights[0].weight : null
  const change = current && start ? (current - start).toFixed(1) : 0

  // Chart data (last 30 days)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const chartData = weights.filter(w => new Date(w.date) >= thirtyDaysAgo)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
        {[
          { label: 'Current', value: current ? `${current}kg` : '-', color: '#FF4D00' },
          { label: 'Start', value: start ? `${start}kg` : '-', color: '#FFB347' },
          { label: 'Change', value: change > 0 ? `+${change}kg` : `${change}kg`, color: change < 0 ? '#00E676' : '#FF3057' },
        ].map(stat => (
          <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
            style={{ background: theme.bg2, border: `1px solid ${stat.color}22`, borderRadius: 14, padding: '14px 10px', textAlign: 'center', transition: 'all 0.3s' }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 900, color: stat.color }}>{stat.value}</div>
            <div style={{ color: theme.text3, fontSize: 11, marginTop: 4 }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      {chartData.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ background: theme.bg2, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 16, marginBottom: 20 }}>
          <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, color: theme.text, marginBottom: 12 }}>Last 30 Days</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
              <XAxis dataKey="date" stroke={theme.text3} tick={{ fontSize: 12 }} />
              <YAxis stroke={theme.text3} tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 8, color: theme.text }} />
              <Line type="monotone" dataKey="weight" stroke="#FF4D00" strokeWidth={2} dot={{ fill: '#FF4D00', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Input */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        style={{ background: theme.bg2, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 16, marginBottom: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ color: theme.text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>Date</label>
          <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)}
            style={{ width: '100%', background: theme.input, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '12px 14px', color: theme.text, fontSize: 14, fontFamily: "'Barlow', sans-serif", outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s' }}
            onFocus={e => e.target.style.borderColor = '#FF4D0066'}
            onBlur={e => e.target.style.borderColor = theme.border} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ color: theme.text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>Weight (kg)</label>
          <input type="number" step="0.1" placeholder="75" value={input} onChange={e => setInput(e.target.value)}
            style={{ width: '100%', background: theme.input, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '12px 14px', color: theme.text, fontSize: 14, fontFamily: "'Barlow', sans-serif", outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s' }}
            onFocus={e => e.target.style.borderColor = '#FF4D0066'}
            onBlur={e => e.target.style.borderColor = theme.border} />
        </div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={addWeight} disabled={!input}
          style={{ width: '100%', padding: '12px', background: input ? 'linear-gradient(135deg, #FF4D00, #FF7A00)' : theme.bg3, border: 'none', borderRadius: 12, cursor: input ? 'pointer' : 'not-allowed', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: 2, color: input ? '#fff' : theme.text3, textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.3s' }}>
          <Plus size={14} /> Log Weight
        </motion.button>
      </motion.div>

      {/* History */}
      {weights.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          style={{ background: theme.bg2, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 16 }}>
          <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, color: theme.text, marginBottom: 12 }}>History</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[...weights].reverse().map((w, i) => (
              <motion.div key={w.timestamp} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: theme.bg3, borderRadius: 10 }}>
                <div>
                  <div style={{ color: theme.text, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700 }}>{w.weight}kg</div>
                  <div style={{ color: theme.text3, fontSize: 11 }}>{new Date(w.date).toLocaleDateString()}</div>
                </div>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => deleteWeight(w.timestamp)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FF3057', padding: 4 }}>
                  <Trash2 size={14} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

// ─── Tab 2: Training Log ──────────────────────────────────────────
function TrainingLogTab({ theme }) {
  const [trainings, setTrainings] = useState(() => loadFromStorage(TRAINING_LOG_KEY))
  const [type, setType] = useState('')
  const [duration, setDuration] = useState('')
  const [notes, setNotes] = useState('')

  const trainingTypes = ['Run', 'Strength', 'HIIT', 'Cycling', 'Swimming', 'Yoga', 'Football', 'Basketball']

  const addTraining = () => {
    if (!type || !duration) return
    const entry = {
      date: new Date().toISOString().split('T')[0],
      type,
      duration: parseInt(duration),
      notes,
      timestamp: Date.now(),
    }
    const updated = [...trainings, entry]
    setTrainings(updated)
    saveToStorage(TRAINING_LOG_KEY, updated)
    setType('')
    setDuration('')
    setNotes('')
  }

  // Last 7 days calendar
  const today = new Date()
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    const hasTraining = trainings.some(t => t.date === dateStr)
    days.push({ date: dateStr, hasTraining, dayLabel: d.toLocaleDateString('en-US', { weekday: 'short' }) })
  }

  // Weekly summary
  const totalSessions = trainings.filter(t => {
    const tDate = new Date(t.date)
    const weekAgo = new Date(today)
    weekAgo.setDate(weekAgo.getDate() - 7)
    return tDate >= weekAgo
  }).length
  const totalMinutes = trainings.filter(t => {
    const tDate = new Date(t.date)
    const weekAgo = new Date(today)
    weekAgo.setDate(weekAgo.getDate() - 7)
    return tDate >= weekAgo
  }).reduce((sum, t) => sum + t.duration, 0)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Weekly Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'This Week', value: totalSessions, color: '#FF4D00' },
          { label: 'Total Time', value: `${totalMinutes}m`, color: '#4FC3F7' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
            style={{ background: theme.bg2, border: `1px solid ${stat.color}22`, borderRadius: 14, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 900, color: stat.color }}>{stat.value}</div>
            <div style={{ color: theme.text3, fontSize: 11, marginTop: 6 }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Calendar dots */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        style={{ background: theme.bg2, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 16, marginBottom: 20 }}>
        <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 14 }}>Last 7 Days</h3>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
          {days.map(d => (
            <motion.div key={d.date} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: d.hasTraining ? '#FF4D0022' : theme.bg3, border: `2px solid ${d.hasTraining ? '#FF4D00' : theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px', transition: 'all 0.2s' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: d.hasTraining ? '#FF4D00' : '#999', transition: 'all 0.2s' }} />
              </div>
              <div style={{ color: theme.text3, fontSize: 10 }}>{d.dayLabel}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Input form */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        style={{ background: theme.bg2, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 16, marginBottom: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ color: theme.text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>Training Type</label>
          <select value={type} onChange={e => setType(e.target.value)}
            style={{ width: '100%', background: theme.input, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '12px 14px', color: theme.text, fontSize: 14, fontFamily: "'Barlow', sans-serif", outline: 'none', boxSizing: 'border-box', cursor: 'pointer', transition: 'all 0.2s' }}
            onFocus={e => e.target.style.borderColor = '#4FC3F766'}
            onBlur={e => e.target.style.borderColor = theme.border}>
            <option value="">Select type...</option>
            {trainingTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ color: theme.text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>Duration (minutes)</label>
          <input type="number" placeholder="45" value={duration} onChange={e => setDuration(e.target.value)}
            style={{ width: '100%', background: theme.input, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '12px 14px', color: theme.text, fontSize: 14, fontFamily: "'Barlow', sans-serif", outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s' }}
            onFocus={e => e.target.style.borderColor = '#4FC3F766'}
            onBlur={e => e.target.style.borderColor = theme.border} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ color: theme.text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>Notes (optional)</label>
          <textarea placeholder="How did it go?" value={notes} onChange={e => setNotes(e.target.value)} rows="2"
            style={{ width: '100%', background: theme.input, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '12px 14px', color: theme.text, fontSize: 14, fontFamily: "'Barlow', sans-serif", outline: 'none', boxSizing: 'border-box', resize: 'none', transition: 'all 0.2s' }}
            onFocus={e => e.target.style.borderColor = '#4FC3F766'}
            onBlur={e => e.target.style.borderColor = theme.border} />
        </div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={addTraining} disabled={!type || !duration}
          style={{ width: '100%', padding: '12px', background: type && duration ? 'linear-gradient(135deg, #4FC3F7, #0288D1)' : theme.bg3, border: 'none', borderRadius: 12, cursor: type && duration ? 'pointer' : 'not-allowed', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: 2, color: type && duration ? '#fff' : theme.text3, textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.3s' }}>
          <Plus size={14} /> Log Training
        </motion.button>
      </motion.div>

      {/* Recent trainings */}
      {trainings.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          style={{ background: theme.bg2, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 16 }}>
          <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, color: theme.text, marginBottom: 12 }}>Recent</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[...trainings].reverse().slice(0, 10).map((t, i) => (
              <motion.div key={t.timestamp} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                style={{ padding: '12px', background: theme.bg3, borderRadius: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div style={{ color: theme.text, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700 }}>{t.type} · {t.duration}m</div>
                    <div style={{ color: theme.text3, fontSize: 11, marginTop: 2 }}>{new Date(t.date).toLocaleDateString()}</div>
                    {t.notes && <div style={{ color: theme.text2, fontSize: 12, marginTop: 4 }}>{t.notes}</div>}
                  </div>
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => setTrainings(trainings.filter(x => x.timestamp !== t.timestamp))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FF3057', padding: 4 }}>
                    <Trash2 size={14} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

// ─── Tab 3: Injury Log ────────────────────────────────────────────
function InjuryLogTab({ theme }) {
  const [injuries, setInjuries] = useState(() => loadFromStorage(INJURY_LOG_KEY))
  const [bodyPart, setBodyPart] = useState('')
  const [severity, setSeverity] = useState('mild')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [status, setStatus] = useState('active')

  const bodyParts = ['Head', 'Neck', 'Shoulder', 'Arm', 'Elbow', 'Wrist', 'Hand', 'Chest', 'Back', 'Abdomen', 'Hip', 'Thigh', 'Knee', 'Calf', 'Ankle', 'Foot']

  const addInjury = () => {
    if (!bodyPart) return
    const entry = {
      bodyPart,
      severity,
      date,
      status,
      timestamp: Date.now(),
    }
    const updated = [...injuries, entry]
    setInjuries(updated)
    saveToStorage(INJURY_LOG_KEY, updated)
    setBodyPart('')
    setSeverity('mild')
    setDate(new Date().toISOString().split('T')[0])
    setStatus('active')
  }

  const updateInjuryStatus = (timestamp, newStatus) => {
    const updated = injuries.map(inj => inj.timestamp === timestamp ? { ...inj, status: newStatus } : inj)
    setInjuries(updated)
    saveToStorage(INJURY_LOG_KEY, updated)
  }

  const deleteInjury = (timestamp) => {
    const updated = injuries.filter(inj => inj.timestamp !== timestamp)
    setInjuries(updated)
    saveToStorage(INJURY_LOG_KEY, updated)
  }

  const activeInjuries = injuries.filter(inj => inj.status === 'active')
  const recoveredInjuries = injuries.filter(inj => inj.status === 'recovered')

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Active', value: activeInjuries.length, color: '#FF3057' },
          { label: 'Recovered', value: recoveredInjuries.length, color: '#00E676' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
            style={{ background: theme.bg2, border: `1px solid ${stat.color}22`, borderRadius: 14, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 900, color: stat.color }}>{stat.value}</div>
            <div style={{ color: theme.text3, fontSize: 11, marginTop: 6 }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Input form */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        style={{ background: theme.bg2, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 16, marginBottom: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ color: theme.text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>Body Part</label>
          <select value={bodyPart} onChange={e => setBodyPart(e.target.value)}
            style={{ width: '100%', background: theme.input, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '12px 14px', color: theme.text, fontSize: 14, fontFamily: "'Barlow', sans-serif", outline: 'none', boxSizing: 'border-box', cursor: 'pointer', transition: 'all 0.2s' }}
            onFocus={e => e.target.style.borderColor = '#FF305766'}
            onBlur={e => e.target.style.borderColor = theme.border}>
            <option value="">Select body part...</option>
            {bodyParts.map(bp => <option key={bp} value={bp}>{bp}</option>)}
          </select>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          {[
            { label: 'Severity', value: severity, onChange: setSeverity, options: ['mild', 'moderate', 'severe'], type: 'select' },
            { label: 'Date', value: date, onChange: setDate, type: 'date' },
          ].map(f => (
            <div key={f.label}>
              <label style={{ color: theme.text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>
                {f.label}
              </label>
              {f.type === 'date' ? (
                <input type="date" value={f.value} onChange={e => f.onChange(e.target.value)}
                  style={{ width: '100%', background: theme.input, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '12px 14px', color: theme.text, fontSize: 14, outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s' }}
                  onFocus={e => e.target.style.borderColor = '#FF305766'}
                  onBlur={e => e.target.style.borderColor = theme.border} />
              ) : (
                <select value={f.value} onChange={e => f.onChange(e.target.value)}
                  style={{ width: '100%', background: theme.input, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '12px 14px', color: theme.text, fontSize: 14, outline: 'none', boxSizing: 'border-box', cursor: 'pointer', transition: 'all 0.2s' }}
                  onFocus={e => e.target.style.borderColor = '#FF305766'}
                  onBlur={e => e.target.style.borderColor = theme.border}>
                  {f.options.map(opt => <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}
                </select>
              )}
            </div>
          ))}
        </div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={addInjury} disabled={!bodyPart}
          style={{ width: '100%', padding: '12px', background: bodyPart ? 'linear-gradient(135deg, #FF3057, #FF1744)' : theme.bg3, border: 'none', borderRadius: 12, cursor: bodyPart ? 'pointer' : 'not-allowed', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: 2, color: bodyPart ? '#fff' : theme.text3, textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.3s' }}>
          <AlertCircle size={14} /> Log Injury
        </motion.button>
      </motion.div>

      {/* Active Injuries */}
      {activeInjuries.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, color: '#FF3057', marginBottom: 12 }}>🚨 Active Injuries</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
            {activeInjuries.map((inj, i) => (
              <motion.div key={inj.timestamp} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                style={{ background: '#FF305722', border: '1px solid #FF305744', borderRadius: 12, padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 700, color: theme.text }}>{inj.bodyPart}</div>
                  <div style={{ color: theme.text3, fontSize: 12, marginTop: 2 }}>Severity: <span style={{ color: '#FF3057', fontWeight: 700 }}>{inj.severity}</span></div>
                  <div style={{ color: theme.text3, fontSize: 11, marginTop: 2 }}>{new Date(inj.date).toLocaleDateString()}</div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => updateInjuryStatus(inj.timestamp, 'recovered')} title="Mark as recovered"
                    style={{ background: '#00E67622', border: '1px solid #00E67644', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', color: '#00E676', fontSize: 12, fontWeight: 700, fontFamily: "'Barlow Condensed', sans-serif" }}>
                    ✓
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => deleteInjury(inj.timestamp)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FF3057' }}>
                    <Trash2 size={14} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recovered Injuries */}
      {recoveredInjuries.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, color: '#00E676', marginBottom: 12 }}>✅ Recovered</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {recoveredInjuries.map((inj, i) => (
              <motion.div key={inj.timestamp} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                style={{ background: '#00E67622', border: '1px solid #00E67644', borderRadius: 12, padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 700, color: theme.text }}>{inj.bodyPart}</div>
                  <div style={{ color: theme.text3, fontSize: 12, marginTop: 2 }}>Recovered on <span style={{ color: '#00E676', fontWeight: 700 }}>{new Date(inj.date).toLocaleDateString()}</span></div>
                </div>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => deleteInjury(inj.timestamp)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FF3057' }}>
                  <Trash2 size={14} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

// ─── Tab 4: Preparation ───────────────────────────────────────────
function PreparationTab({ theme }) {
  const [preps, setPreps] = useState(() => loadFromStorage(PREPARATION_LOG_KEY))
  const [prepType, setPrepType] = useState('')
  const [duration, setDuration] = useState('')
  const [notes, setNotes] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  const prepTypes = ['Warm-up', 'Stretching', 'Drills', 'Mental Prep', 'Nutrition', 'Hydration', 'Recovery']

  const addPrep = () => {
    if (!prepType || !duration) return
    const entry = {
      date: selectedDate,
      prepType,
      duration: parseInt(duration),
      notes,
      timestamp: Date.now(),
    }
    const updated = [...preps, entry]
    setPreps(updated)
    saveToStorage(PREPARATION_LOG_KEY, updated)
    setPrepType('')
    setDuration('')
    setNotes('')
  }

  // Count preparations by type
  const prepStats = {}
  preps.forEach(p => {
    prepStats[p.prepType] = (prepStats[p.prepType] || 0) + 1
  })

  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]
  const todayPreps = preps.filter(p => p.date === todayStr)
  const totalTodayTime = todayPreps.reduce((sum, p) => sum + p.duration, 0)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Today', value: `${totalTodayTime}m`, color: '#FF9800' },
          { label: 'Total Logs', value: preps.length, color: '#9C27B0' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
            style={{ background: theme.bg2, border: `1px solid ${stat.color}22`, borderRadius: 14, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 900, color: stat.color }}>{stat.value}</div>
            <div style={{ color: theme.text3, fontSize: 11, marginTop: 6 }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Prep Types Distribution */}
      {Object.keys(prepStats).length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ background: theme.bg2, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 16, marginBottom: 20 }}>
          <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 14 }}>Preparation Types</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {Object.entries(prepStats).map(([type, count]) => (
              <div key={type} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: theme.bg3, borderRadius: 10 }}>
                <div style={{ color: theme.text, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>{type}</div>
                <div style={{ background: '#9C27B022', color: '#9C27B0', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{count}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input form */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        style={{ background: theme.bg2, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 16, marginBottom: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ color: theme.text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>Date</label>
          <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)}
            style={{ width: '100%', background: theme.input, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '12px 14px', color: theme.text, fontSize: 14, fontFamily: "'Barlow', sans-serif", outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s' }}
            onFocus={e => e.target.style.borderColor = '#FF980066'}
            onBlur={e => e.target.style.borderColor = theme.border} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ color: theme.text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>Preparation Type</label>
          <select value={prepType} onChange={e => setPrepType(e.target.value)}
            style={{ width: '100%', background: theme.input, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '12px 14px', color: theme.text, fontSize: 14, fontFamily: "'Barlow', sans-serif", outline: 'none', boxSizing: 'border-box', cursor: 'pointer', transition: 'all 0.2s' }}
            onFocus={e => e.target.style.borderColor = '#FF980066'}
            onBlur={e => e.target.style.borderColor = theme.border}>
            <option value="">Choose preparation type...</option>
            {prepTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ color: theme.text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>Duration (minutes)</label>
          <input type="number" placeholder="15" value={duration} onChange={e => setDuration(e.target.value)}
            style={{ width: '100%', background: theme.input, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '12px 14px', color: theme.text, fontSize: 14, fontFamily: "'Barlow', sans-serif", outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s' }}
            onFocus={e => e.target.style.borderColor = '#FF980066'}
            onBlur={e => e.target.style.borderColor = theme.border} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ color: theme.text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", display: 'block', marginBottom: 8 }}>Notes (optional)</label>
          <textarea placeholder="How did it feel?" value={notes} onChange={e => setNotes(e.target.value)} rows="2"
            style={{ width: '100%', background: theme.input, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '12px 14px', color: theme.text, fontSize: 14, fontFamily: "'Barlow', sans-serif", outline: 'none', boxSizing: 'border-box', resize: 'none', transition: 'all 0.2s' }}
            onFocus={e => e.target.style.borderColor = '#FF980066'}
            onBlur={e => e.target.style.borderColor = theme.border} />
        </div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={addPrep} disabled={!prepType || !duration}
          style={{ width: '100%', padding: '12px', background: prepType && duration ? 'linear-gradient(135deg, #FF9800, #F57C00)' : theme.bg3, border: 'none', borderRadius: 12, cursor: prepType && duration ? 'pointer' : 'not-allowed', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: 2, color: prepType && duration ? '#fff' : theme.text3, textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.3s' }}>
          <Flame size={14} /> Log Preparation
        </motion.button>
      </motion.div>

      {/* Recent preps */}
      {preps.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          style={{ background: theme.bg2, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 16 }}>
          <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, color: theme.text, marginBottom: 12 }}>Recent</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[...preps].reverse().slice(0, 10).map((p, i) => (
              <motion.div key={p.timestamp} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                style={{ padding: '12px', background: theme.bg3, borderRadius: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div style={{ color: theme.text, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700 }}>{p.prepType} · {p.duration}m</div>
                    <div style={{ color: theme.text3, fontSize: 11, marginTop: 2 }}>{new Date(p.date).toLocaleDateString()}</div>
                    {p.notes && <div style={{ color: theme.text2, fontSize: 12, marginTop: 4 }}>{p.notes}</div>}
                  </div>
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => setPreps(preps.filter(x => x.timestamp !== p.timestamp))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FF3057', padding: 4 }}>
                    <Trash2 size={14} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}



// ─── Main Component ────────────────────────────────────────────────
export default function ProgressTracker() {
  const navigate = useNavigate()
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState('performance')

  const tabs = [
    { id: 'performance', label: '🎯 Performance', color: '#2196F3' },
    { id: 'weight', label: '⚖️ Weight Log', color: '#FF4D00' },
    { id: 'training', label: '🏋️ Training Log', color: '#4FC3F7' },
    { id: 'injury', label: '🩹 Injury Log', color: '#FF3057' },
    { id: 'preparation', label: '🔥 Preparation', color: '#FF9800' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, paddingBottom: 80, transition: 'background 0.3s' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '56px 24px 24px' }}>
        <button onClick={() => navigate('/home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: theme.text3, marginBottom: 24, padding: 0 }}>
          <ArrowLeft size={16} /> <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, fontSize: 14 }}>HOME</span>
        </button>
        <p style={{ color: theme.text3, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 8 }}>My Performance</p>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 44, fontWeight: 900, color: theme.text, letterSpacing: -1, margin: '0 0 28px' }}>Progress<br /><span style={{ color: '#4FC3F7' }}>Tracker</span></h1>

        {/* Tab buttons */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, borderBottom: `1px solid ${theme.border}`, paddingBottom: 16, overflowX: 'auto' }}>
          {tabs.map(tab => (
            <motion.button key={tab.id} onClick={() => setActiveTab(tab.id)} whileTap={{ scale: 0.95 }}
              style={{ padding: '8px 12px', background: activeTab === tab.id ? `${tab.color}15` : 'transparent', border: activeTab === tab.id ? `2px solid ${tab.color}` : `1px solid transparent`, borderRadius: 10, cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, color: activeTab === tab.id ? tab.color : theme.text3, transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === 'weight' && <WeightLogTab key="weight" theme={theme} />}
          {activeTab === 'training' && <TrainingLogTab key="training" theme={theme} />}
          {activeTab === 'injury' && <InjuryLogTab key="injury" theme={theme} />}
          {activeTab === 'preparation' && <PreparationTab key="preparation" theme={theme} />}
          {activeTab === 'performance' && <PerformanceTrackerTab key="performance" theme={theme} />}
        </AnimatePresence>
      </div>
      <BottomNav />
    </div>
  )
}