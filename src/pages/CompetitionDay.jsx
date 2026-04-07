import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { sportsData } from '../data/sportsData'
import { useTheme } from '../hooks/useTheme'
import BottomNav from '../components/BottomNav'

function EventNutrition({ sport, event, onBack }) {
  const { bg2, border, text, text3, foodTag, foodTagBorder, foodTagText } = useTheme()
  const { preEvent, during, postEvent } = event
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: text3, marginBottom: 24, padding: 0 }}>
        <ArrowLeft size={16} /> <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, fontSize: 14 }}>BACK</span>
      </button>
      <div style={{ marginBottom: 28 }}>
        <p style={{ color: '#FFB347', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 6 }}>{sport.name}</p>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, fontWeight: 900, color: text, letterSpacing: -0.5, margin: 0 }}>{event.name}</h2>
      </div>
      {[
        { label: '3 Hours Before', sub: 'MAIN PRE-EVENT MEAL', emoji: '⏰', color: '#FF4D00', foods: preEvent.threeHour.foods, cal: preEvent.threeHour.calories, hydration: preEvent.threeHour.hydration },
        { label: '1 Hour Before',  sub: 'TOP-UP FUEL',         emoji: '⚡', color: '#FF7A00', foods: preEvent.oneHour.foods,   cal: preEvent.oneHour.calories },
        { label: 'During Event',   sub: 'RACE FUEL',           emoji: '🏁', color: '#FF3057', foods: during.foods,             hydration: during.hydration },
        { label: 'Post Event Recovery', sub: postEvent.timing, emoji: '🔄', color: '#00E676', foods: postEvent.foods,          cal: postEvent.calories },
      ].map((s) => (
        <div key={s.label} style={{ background: bg2, border: `1px solid ${s.color}33`, borderRadius: 16, padding: 20, marginBottom: 12, transition: 'all 0.3s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <span style={{ fontSize: 20 }}>{s.emoji}</span>
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, color: text }}>{s.label}</div>
              <div style={{ color: s.color, fontSize: 11, letterSpacing: 1 }}>{s.sub}</div>
            </div>
            {s.cal && (
              <div style={{ marginLeft: 'auto', background: `${s.color}15`, border: `1px solid ${s.color}33`, borderRadius: 8, padding: '4px 10px' }}>
                <span style={{ color: s.color, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700 }}>{s.cal} kcal</span>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: s.hydration ? 10 : 0 }}>
            {s.foods.map(f => <span key={f} style={{ background: foodTag, border: `1px solid ${foodTagBorder}`, borderRadius: 8, padding: '5px 10px', color: foodTagText, fontSize: 12 }}>{f}</span>)}
          </div>
          {s.hydration && <p style={{ color: '#4FC3F7', fontSize: 12, margin: 0 }}>💧 {s.hydration}</p>}
        </div>
      ))}
    </motion.div>
  )
}

function SportEvents({ sport, onBack, onSelectEvent }) {
  const { bg2, border, text, text2, text3 } = useTheme()
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: text3, marginBottom: 24, padding: 0 }}>
        <ArrowLeft size={16} /> <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, fontSize: 14 }}>BACK</span>
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <span style={{ fontSize: 36 }}>{sport.icon}</span>
        <div>
          <p style={{ color: text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", margin: '0 0 4px' }}>Select Event</p>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 32, fontWeight: 900, color: text, margin: 0 }}>{sport.name}</h2>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {sport.events.map(event => (
          <motion.button key={event.id} whileTap={{ scale: 0.98 }} onClick={() => onSelectEvent(event)}
            style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 14, padding: '18px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left', transition: 'all 0.3s' }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 700, color: text }}>{event.name}</span>
            <ChevronRight size={16} color={text3} />
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

export default function CompetitionDay() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('aerobic')
  const [selectedSport, setSelectedSport] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const { bg, bg2, border, text, text2, text3 } = useTheme()

  const goBack = () => {
    if (selectedEvent) { setSelectedEvent(null); return }
    if (selectedSport) { setSelectedSport(null); return }
  }

  return (
    <div style={{ minHeight: '100vh', background: bg, paddingBottom: 80, transition: 'background 0.3s' }}>
      <div style={{ padding: '56px 24px 24px', maxWidth: 480, margin: '0 auto' }}>
        <AnimatePresence mode="wait">
          {selectedEvent ? (
            <EventNutrition key="event" sport={selectedSport} event={selectedEvent} onBack={goBack} />
          ) : selectedSport ? (
            <SportEvents key="sport" sport={selectedSport} onBack={goBack} onSelectEvent={setSelectedEvent} />
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <button onClick={() => navigate('/home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: text3, marginBottom: 24, padding: 0 }}>
                <ArrowLeft size={16} /> <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, fontSize: 14 }}>HOME</span>
              </button>
              <p style={{ color: text3, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 8 }}>Race Day</p>
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 44, fontWeight: 900, color: text, letterSpacing: -1, margin: '0 0 24px' }}>Competition<br /><span style={{ color: '#FFB347' }}>Nutrition</span></h1>
              <div style={{ display: 'flex', background: bg2, border: `1px solid ${border}`, borderRadius: 14, padding: 4, marginBottom: 24, transition: 'all 0.3s' }}>
                {[['aerobic', 'Aerobic Sports'], ['anaerobic', 'Anaerobic Sports']].map(([id, label]) => (
                  <button key={id} onClick={() => setTab(id)} style={{
                    flex: 1, padding: '12px', background: tab === id ? 'linear-gradient(135deg, #FF4D00, #FF7A00)' : 'transparent',
                    border: 'none', borderRadius: 10, cursor: 'pointer',
                    fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 700,
                    color: tab === id ? '#fff' : text3, transition: 'all 0.2s'
                  }}>{label}</button>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {sportsData[tab].map((sport, i) => (
                  <motion.button key={sport.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedSport(sport)}
                    style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 16, padding: '18px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', transition: 'all 0.3s' }}>
                    <span style={{ fontSize: 28 }}>{sport.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 700, color: text }}>{sport.name}</div>
                      <div style={{ color: text3, fontSize: 12, marginTop: 2 }}>{sport.events.length} event{sport.events.length > 1 ? 's' : ''} • {sport.distance || sport.type}</div>
                    </div>
                    <ChevronRight size={16} color={text3} />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <BottomNav />
    </div>
  )
}