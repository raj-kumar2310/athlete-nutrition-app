import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Trash2, Flame, TrendingUp, Clock3, Sparkles, RotateCcw } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

function formatDate(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Recent'
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

function MacroRow({ label, grams, color, pct, text3, bg3 }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ color: text3, fontSize: 11, letterSpacing: 1, fontFamily: "'Barlow Condensed', sans-serif" }}>{label}</span>
        <span style={{ color, fontSize: 12, fontWeight: 700 }}>{grams}g</span>
      </div>
      <div style={{ background: bg3, borderRadius: 999, height: 7, overflow: 'hidden' }}>
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.45 }} style={{ height: '100%', background: color, borderRadius: 999 }} />
      </div>
    </div>
  )
}

export default function CalculatorHistory({ history, onDelete, onClear }) {
  const { bg2, bg3, border, text, text3 } = useTheme()
  const [openId, setOpenId] = useState(null)

  const hasItems = history.length > 0

  return (
    <div style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 20, padding: 18, transition: 'all 0.3s' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
        <div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 900, color: '#CE93D8', letterSpacing: 0.4 }}>Calculator History</div>
          <div style={{ color: text3, fontSize: 12 }}>Last 5 saved calculations</div>
        </div>
        {hasItems && (
          <button onClick={onClear} style={{ border: '1px solid #CE93D844', background: 'rgba(206,147,216,0.10)', color: '#CE93D8', borderRadius: 999, padding: '8px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
            <RotateCcw size={13} /> Clear All
          </button>
        )}
      </div>

      {!hasItems ? (
        <div style={{ border: '1px dashed #CE93D844', borderRadius: 16, padding: 24, textAlign: 'center', background: 'rgba(206,147,216,0.05)' }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>🪄</div>
          <div style={{ color: text, fontSize: 15, fontWeight: 700, marginBottom: 4 }}>No saved calculations yet</div>
          <div style={{ color: text3, fontSize: 13, lineHeight: 1.6 }}>Run a calculation to build your personal nutrition history and compare past sessions here.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {history.map((item, index) => {
            const expanded = openId === item.id
            return (
              <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} style={{ border: `1px solid ${expanded ? '#CE93D866' : border}`, borderRadius: 16, overflow: 'hidden', background: bg3 }}>
                <div style={{ padding: '14px 14px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                    <button onClick={() => setOpenId(expanded ? null : item.id)} style={{ flex: 1, minWidth: 0, border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, textAlign: 'left' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <Sparkles size={14} color="#CE93D8" />
                        <div style={{ color: '#CE93D8', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 17, fontWeight: 800, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.activity}</div>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, color: text3, fontSize: 12 }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Clock3 size={12} />{formatDate(item.date)}</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Flame size={12} />{item.burned.toLocaleString()} burned</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><TrendingUp size={12} />{item.intake.toLocaleString()} intake</span>
                      </div>
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <button
                        onClick={() => onDelete(item.id)}
                        style={{ width: 32, height: 32, borderRadius: 10, border: `1px solid ${border}`, background: bg2, color: text3, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        aria-label={`Delete ${item.activity}`}
                      >
                        <Trash2 size={14} />
                      </button>
                      <button
                        onClick={() => setOpenId(expanded ? null : item.id)}
                        style={{ width: 32, height: 32, borderRadius: 10, border: `1px solid ${border}`, background: bg2, color: text3, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        aria-label={expanded ? 'Collapse history item' : 'Expand history item'}
                      >
                        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {expanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} style={{ overflow: 'hidden' }}>
                      <div style={{ padding: '0 14px 14px', borderTop: `1px solid ${border}` }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14, marginBottom: 12 }}>
                          <div style={{ background: bg2, border: `1px solid #CE93D822`, borderRadius: 14, padding: 12 }}>
                            <div style={{ color: text3, fontSize: 10, letterSpacing: 1, textTransform: 'uppercase' }}>Duration</div>
                            <div style={{ color: text, fontSize: 18, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900 }}>{item.duration} min</div>
                          </div>
                          <div style={{ background: bg2, border: `1px solid #CE93D822`, borderRadius: 14, padding: 12 }}>
                            <div style={{ color: text3, fontSize: 10, letterSpacing: 1, textTransform: 'uppercase' }}>Weight</div>
                            <div style={{ color: text, fontSize: 18, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900 }}>{item.weight} kg</div>
                          </div>
                        </div>

                        <div style={{ background: 'rgba(206,147,216,0.08)', border: '1px solid rgba(206,147,216,0.22)', borderRadius: 14, padding: 14 }}>
                          <div style={{ color: '#CE93D8', fontSize: 12, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, fontWeight: 800, marginBottom: 10 }}>Macro Breakdown</div>
                          <MacroRow label="CARBOHYDRATES" grams={item.macros.carbs} color="#FF8C00" pct={item.macros.carbsPct} text3={text3} bg3={bg3} />
                          <MacroRow label="PROTEIN" grams={item.macros.protein} color="#CE93D8" pct={item.macros.proteinPct} text3={text3} bg3={bg3} />
                          <MacroRow label="FATS" grams={item.macros.fat} color="#E63946" pct={item.macros.fatPct} text3={text3} bg3={bg3} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}