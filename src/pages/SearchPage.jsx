import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Trophy, Dumbbell, ShieldAlert, Leaf, Clock, X } from 'lucide-react'
import { sportsData } from '../data/sportsData'
import { categories } from './FirstAid'
import { useTheme } from '../hooks/useTheme'
import { useSearchStore } from '../stores/searchStore'
import BottomNav from '../components/BottomNav'

const QUICK_CHIPS = ['100m Sprint', 'Marathon', 'Hamstring', 'Weightlifting']
const POPULAR = ['Football Match', '100 Metres', 'Hamstring Pain', 'Hydration Strategy', 'Strength Training']

const TRAINING_TYPES = [
  { id: 'speed', label: 'Speed Training' },
  { id: 'endurance', label: 'Endurance Training' },
  { id: 'strength', label: 'Strength Training' },
  { id: 'agility', label: 'Agility Training' },
  { id: 'flexibility', label: 'Flexibility & Recovery' },
]

const NUTRITION_TOPICS = [
  'Pre-Workout Fuel',
  'Post-Workout Recovery',
  'Hydration Strategy',
  'Electrolytes',
  'Carb Loading',
  'Protein Timing',
  'Anti-Inflammatory Foods',
  'Competition Day Meal Timing',
  'Supplements for Performance',
  'Weight Management Nutrition',
]

function normalize(v) {
  return (v || '').toLowerCase().trim()
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function Highlight({ text, query }) {
  if (!query) return text
  const pattern = new RegExp(`(${escapeRegExp(query)})`, 'ig')
  const parts = String(text).split(pattern)
  return parts.map((part, i) => {
    const match = part.toLowerCase() === query.toLowerCase()
    return match
      ? <mark key={i} style={{ background: 'transparent', color: '#FF4D00', fontWeight: 800 }}>{part}</mark>
      : <span key={i}>{part}</span>
  })
}

export default function SearchPage() {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const { bg, bg2, bg3, border, text, text2, text3, input } = useTheme()
  const recent = useSearchStore(s => s.recent)
  const addRecent = useSearchStore(s => s.addRecent)
  const clearRecent = useSearchStore(s => s.clearRecent)
  const [query, setQuery] = useState('')

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const competitionEvents = useMemo(() => {
    const rows = []
    for (const bucket of ['aerobic', 'anaerobic']) {
      for (const sport of sportsData[bucket]) {
        for (const event of sport.events) {
          rows.push({
            id: `comp_${sport.id}_${event.id}`,
            label: event.name,
            sub: `${sport.name} · ${bucket}`,
            sportId: sport.id,
            eventId: event.id,
          })
        }
      }
    }
    return rows
  }, [])

  const injuries = useMemo(() => {
    const rows = []
    for (const cat of categories) {
      for (const injury of cat.injuries) {
        rows.push({
          id: `inj_${cat.id}_${injury.id}`,
          label: injury.name,
          sub: cat.label,
          injuryId: injury.id,
        })
      }
    }
    return rows
  }, [])

  const q = normalize(query)
  const results = useMemo(() => {
    if (!q) {
      return { competition: [], training: [], injuries: [], nutrition: [] }
    }

    const inText = (value) => normalize(value).includes(q)

    return {
      competition: competitionEvents.filter(r => inText(r.label) || inText(r.sub)).slice(0, 12),
      training: TRAINING_TYPES.filter(r => inText(r.label)).slice(0, 8),
      injuries: injuries.filter(r => inText(r.label) || inText(r.sub)).slice(0, 12),
      nutrition: NUTRITION_TOPICS.filter(r => inText(r)).slice(0, 10),
    }
  }, [q, competitionEvents, injuries])

  const totalResults = results.competition.length + results.training.length + results.injuries.length + results.nutrition.length

  function handlePick(term) {
    setQuery(term)
    addRecent(term)
  }

  function goCompetition(item) {
    addRecent(item.label)
    navigate(`/competition?sportId=${item.sportId}&eventId=${item.eventId}`)
  }

  function goTraining(item) {
    addRecent(item.label)
    navigate(`/training?type=${item.id}`)
  }

  function goInjury(item) {
    addRecent(item.label)
    navigate(`/firstaid?injury=${item.injuryId}`)
  }

  function goNutrition(topic) {
    addRecent(topic)
    navigate('/calculator')
  }

  return (
    <div style={{ minHeight: '100vh', background: bg, paddingBottom: 80, transition: 'background 0.3s' }}>
      <div style={{ maxWidth: 520, margin: '0 auto', padding: '56px 20px 24px' }}>
        <button onClick={() => navigate('/home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: text3, marginBottom: 16, padding: 0 }}>
          <ArrowLeft size={16} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, fontSize: 14 }}>HOME</span>
        </button>

        <div style={{ marginBottom: 12 }}>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 38, fontWeight: 900, color: text, margin: '0 0 6px', letterSpacing: -0.8 }}>Search</h1>
          <p style={{ margin: 0, color: text3, fontSize: 13 }}>Find events, training, injuries, and nutrition topics</p>
        </div>

        <div style={{ position: 'relative', marginBottom: 10 }}>
          <Search size={16} color={text3} style={{ position: 'absolute', left: 12, top: 13 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anything..."
            style={{ width: '100%', background: input, border: `1px solid ${border}`, borderRadius: 12, padding: '11px 38px 11px 36px', color: text, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ position: 'absolute', right: 8, top: 8, width: 28, height: 28, borderRadius: 8, border: `1px solid ${border}`, background: bg2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={14} color={text3} />
            </button>
          )}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
          {QUICK_CHIPS.map(chip => (
            <button key={chip} onClick={() => handlePick(chip)} style={{ border: '1px solid rgba(255,77,0,0.35)', background: 'rgba(255,77,0,0.12)', color: '#FF4D00', borderRadius: 999, padding: '6px 12px', fontSize: 12, cursor: 'pointer' }}>
              {chip}
            </button>
          ))}
        </div>

        {!q && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {recent.length > 0 && (
              <div style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 14, padding: 14, marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ color: text2, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' }}>Recent searches</div>
                  <button onClick={clearRecent} style={{ border: 'none', background: 'transparent', color: text3, fontSize: 12, cursor: 'pointer' }}>Clear</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {recent.map(term => (
                    <button key={term} onClick={() => handlePick(term)} style={{ border: `1px solid ${border}`, background: bg3, color: text2, borderRadius: 999, padding: '6px 12px', fontSize: 12, cursor: 'pointer' }}>
                      <Clock size={11} style={{ marginRight: 6, verticalAlign: 'middle' }} />{term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 14, padding: 14 }}>
              <div style={{ color: text2, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Popular searches</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {POPULAR.map(term => (
                  <button key={term} onClick={() => handlePick(term)} style={{ border: `1px solid ${border}`, background: bg3, color: text2, borderRadius: 999, padding: '6px 12px', fontSize: 12, cursor: 'pointer' }}>
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {q && totalResults === 0 && (
          <div style={{ marginTop: 16, background: bg2, border: `1px solid ${border}`, borderRadius: 14, padding: 16 }}>
            <div style={{ color: text, fontWeight: 700, marginBottom: 6 }}>No results found</div>
            <div style={{ color: text3, fontSize: 13, marginBottom: 8 }}>Try one of these suggestions:</div>
            <ul style={{ margin: 0, paddingLeft: 18, color: text2, fontSize: 13, lineHeight: 1.7 }}>
              <li>Check spelling (e.g. "hamstring", "marathon")</li>
              <li>Use shorter keyword (e.g. "sprint", "judo")</li>
              <li>Search by category (event, injury, nutrition)</li>
            </ul>
          </div>
        )}

        {q && totalResults > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
            <ResultGroup title="Competition Events" icon={Trophy} color="#FFB347" items={results.competition} onPick={goCompetition} query={query} />
            <ResultGroup title="Training Types" icon={Dumbbell} color="#FF4D00" items={results.training} onPick={goTraining} query={query} />
            <ResultGroup title="Injuries" icon={ShieldAlert} color="#FF3057" items={results.injuries} onPick={goInjury} query={query} />
            <ResultGroup
              title="Nutrition Topics"
              icon={Leaf}
              color="#00E676"
              items={results.nutrition.map(topic => ({ id: topic, label: topic, sub: 'Open calculator' }))}
              onPick={(item) => goNutrition(item.label)}
              query={query}
            />
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}

function ResultGroup({ title, icon: Icon, color, items, onPick, query }) {
  if (!items.length) return null
  return (
    <div style={{ border: `1px solid ${color}33`, borderRadius: 14, overflow: 'hidden', background: 'rgba(0,0,0,0.03)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: `${color}12`, borderBottom: `1px solid ${color}33` }}>
        <Icon size={14} color={color} />
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", color, fontWeight: 800, letterSpacing: 1 }}>{title}</span>
      </div>
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => onPick(item)}
          style={{ width: '100%', textAlign: 'left', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'transparent', cursor: 'pointer', padding: '12px 12px' }}
        >
          <div style={{ fontSize: 14, fontWeight: 700 }}><Highlight text={item.label} query={query} /></div>
          {item.sub && <div style={{ opacity: 0.7, fontSize: 12, marginTop: 2 }}><Highlight text={item.sub} query={query} /></div>}
        </button>
      ))}
    </div>
  )
}
