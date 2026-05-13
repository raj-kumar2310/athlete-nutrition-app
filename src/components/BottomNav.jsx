import { useNavigate, useLocation } from 'react-router-dom'
import { Home, User, CalendarDays, TrendingUp, Search } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

const tabs = [
  { path: '/home',    icon: Home,        label: 'Home'    },
  { path: '/daily',   icon: CalendarDays, label: "Today's Plan" },
  { path: '/progress',icon: TrendingUp,   label: 'Progress' },
  { path: '/search',  icon: Search,       label: 'Search'  },
  { path: '/profile', icon: User,         label: 'Profile' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { navBg, navBorder, text3 } = useTheme()

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: navBg, backdropFilter: 'blur(20px)',
      borderTop: `1px solid ${navBorder}`,
      display: 'flex', zIndex: 100,
      paddingBottom: 'env(safe-area-inset-bottom)',
      transition: 'all 0.3s',
    }}>
      {tabs.map(({ path, icon: Icon, label }) => {
        const active = location.pathname === path
        return (
          <button key={path} onClick={() => navigate(path)} style={{
            flex: 1, padding: '12px 0', background: 'transparent',
            border: 'none', cursor: 'pointer', display: 'flex',
            flexDirection: 'column', alignItems: 'center', gap: 4,
            position: 'relative', transition: 'all 0.2s',
          }}>
            {active && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 20, height: 2, background: '#FF4D00', borderRadius: 2 }} />}
            <Icon size={20} color={active ? '#FF4D00' : text3} strokeWidth={active ? 2.5 : 1.5} />
            <span style={{ fontSize: 10, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, textTransform: 'uppercase', color: active ? '#FF4D00' : text3, fontWeight: active ? 700 : 400 }}>
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}