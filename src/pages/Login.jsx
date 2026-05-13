import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../stores/userStore'
import { useTheme } from '../hooks/useTheme'
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react'

const sports = [
  'Athletics', 'Swimming', 'Cycling', 'Weightlifting', 'Gymnastics',
  'Football', 'Basketball', 'Cricket', 'Tennis', 'Badminton',
  'Volleyball', 'Boxing', 'Wrestling', 'Rowing', 'Triathlon', 'Other'
]

const goals = [
  { id: 'performance', label: 'Peak Performance' },
  { id: 'bulk', label: 'Build Muscle' },
  { id: 'cut', label: 'Lose Fat' },
  { id: 'maintain', label: 'Maintain Weight' },
]

export default function Login() {
  const navigate = useNavigate()
  const { login } = useUserStore()
  const theme = useTheme()
  
  const [mode, setMode] = useState('login') // 'login' or 'signup'
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    height: '',
    weight: '',
    gender: '',
    sport: '',
    goal: ''
  })
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleLogin = () => {
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }
    
    if (!validateEmail(formData.email)) {
      setError('Invalid email format')
      return
    }

    // Check localStorage for matching user
    const allUsers = localStorage.getItem('all-users')
    const users = allUsers ? JSON.parse(allUsers) : []
    const user = users.find(u => u.email === formData.email && u.password === formData.password)

    if (!user) {
      setError('Invalid email or password')
      return
    }

    // Login user with all profile data
    login(user.email, user.password, {
      name: user.name,
      age: user.age,
      height: user.height,
      weight: user.weight,
      gender: user.gender,
      sport: user.sport,
      goal: user.goal,
      isOnboarded: true
    })

    navigate('/home')
  }

  const handleSignup = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.age || !formData.height || !formData.weight || !formData.gender || !formData.sport || !formData.goal) {
      setError('Please fill in all fields')
      return
    }

    if (!validateEmail(formData.email)) {
      setError('Invalid email format')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    // Check if user already exists
    const allUsers = localStorage.getItem('all-users')
    const users = allUsers ? JSON.parse(allUsers) : []
    
    if (users.find(u => u.email === formData.email)) {
      setError('Email already registered. Please login.')
      return
    }

    // Create new user with all profile data
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      age: formData.age,
      height: formData.height,
      weight: formData.weight,
      gender: formData.gender,
      sport: formData.sport,
      goal: formData.goal
    }

    users.push(newUser)
    localStorage.setItem('all-users', JSON.stringify(users))

    // Login the new user with auto-profile update
    login(newUser.email, newUser.password, {
      name: newUser.name,
      age: newUser.age,
      height: newUser.height,
      weight: newUser.weight,
      gender: newUser.gender,
      sport: newUser.sport,
      goal: newUser.goal,
      isOnboarded: true
    })

    navigate('/home')
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: `linear-gradient(135deg, ${theme.bg} 0%, ${theme.bg} 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: mode === 'login' ? '400px' : '500px',
        background: theme.bg,
        borderRadius: '20px',
        padding: '32px 24px',
        boxShadow: `0 8px 32px rgba(0,0,0,0.1)`,
        border: `1px solid ${theme.border}`,
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 900,
            color: theme.text,
            margin: 0,
            fontFamily: "'Barlow Condensed', sans-serif",
            letterSpacing: -1
          }}>
            Athlete<span style={{ color: '#2196F3' }}>Eats</span>
          </h1>
          <p style={{
            color: theme.text3,
            fontSize: '12px',
            marginTop: '8px',
            letterSpacing: 1,
            textTransform: 'uppercase'
          }}>
            {mode === 'login' ? 'Welcome Back' : 'Complete Your Profile'}
          </p>
        </div>

        {/* Mode Tabs */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          background: theme.bg2,
          padding: '4px',
          borderRadius: '12px'
        }}>
          {['login', 'signup'].map(m => (
            <button
              key={m}
              onClick={() => {
                setMode(m)
                setError('')
              }}
              style={{
                flex: 1,
                padding: '10px 16px',
                border: 'none',
                borderRadius: '8px',
                background: mode === m ? '#2196F3' : 'transparent',
                color: mode === m ? '#fff' : theme.text3,
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                transition: 'all 0.3s',
                fontFamily: "'Barlow', sans-serif"
              }}
            >
              {m === 'login' ? <LogIn size={16} style={{ marginRight: '6px', display: 'inline' }} /> : <UserPlus size={16} style={{ marginRight: '6px', display: 'inline' }} />}
              {m === 'login' ? 'Login' : 'Sign Up'}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: '#FF3057',
            color: '#fff',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '14px',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Form Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {mode === 'signup' && (
            <>
              {/* Name + Age */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{display:'block',fontSize:'12px',color:theme.text3,marginBottom:'8px',fontWeight:600,letterSpacing:0.5,textTransform:'uppercase'}}>Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full name" style={{width:'100%',padding:'12px 14px',border:`1px solid ${theme.border}`,borderRadius:'8px',background:theme.bg,color:theme.text,fontSize:'14px',fontFamily:"'Barlow', sans-serif",boxSizing:'border-box'}} onFocus={(e) => e.target.style.borderColor = '#2196F3'} onBlur={(e) => e.target.style.borderColor = theme.border} />
                </div>
                <div>
                  <label style={{display:'block',fontSize:'12px',color:theme.text3,marginBottom:'8px',fontWeight:600,letterSpacing:0.5,textTransform:'uppercase'}}>Age</label>
                  <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="25" style={{width:'100%',padding:'12px 14px',border:`1px solid ${theme.border}`,borderRadius:'8px',background:theme.bg,color:theme.text,fontSize:'14px',fontFamily:"'Barlow', sans-serif",boxSizing:'border-box'}} onFocus={(e) => e.target.style.borderColor = '#2196F3'} onBlur={(e) => e.target.style.borderColor = theme.border} />
                </div>
              </div>
              {/* Height + Weight */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{display:'block',fontSize:'12px',color:theme.text3,marginBottom:'8px',fontWeight:600,letterSpacing:0.5,textTransform:'uppercase'}}>Height (cm)</label>
                  <input type="number" name="height" value={formData.height} onChange={handleInputChange} placeholder="180" style={{width:'100%',padding:'12px 14px',border:`1px solid ${theme.border}`,borderRadius:'8px',background:theme.bg,color:theme.text,fontSize:'14px',fontFamily:"'Barlow', sans-serif",boxSizing:'border-box'}} onFocus={(e) => e.target.style.borderColor = '#2196F3'} onBlur={(e) => e.target.style.borderColor = theme.border} />
                </div>
                <div>
                  <label style={{display:'block',fontSize:'12px',color:theme.text3,marginBottom:'8px',fontWeight:600,letterSpacing:0.5,textTransform:'uppercase'}}>Weight (kg)</label>
                  <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} placeholder="75" style={{width:'100%',padding:'12px 14px',border:`1px solid ${theme.border}`,borderRadius:'8px',background:theme.bg,color:theme.text,fontSize:'14px',fontFamily:"'Barlow', sans-serif",boxSizing:'border-box'}} onFocus={(e) => e.target.style.borderColor = '#2196F3'} onBlur={(e) => e.target.style.borderColor = theme.border} />
                </div>
              </div>
              {/* Gender */}
              <div>
                <label style={{display:'block',fontSize:'12px',color:theme.text3,marginBottom:'8px',fontWeight:600,letterSpacing:0.5,textTransform:'uppercase'}}>Gender</label>
                <select name="gender" value={formData.gender} onChange={e => handleSelectChange('gender', e.target.value)} style={{width:'100%',padding:'12px 14px',border:`1px solid ${theme.border}`,borderRadius:'8px',background:theme.bg,color:theme.text,fontSize:'14px',fontFamily:"'Barlow', sans-serif",boxSizing:'border-box',cursor:'pointer'}} onFocus={(e) => e.target.style.borderColor = '#2196F3'} onBlur={(e) => e.target.style.borderColor = theme.border}>
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {/* Sport */}
              <div>
                <label style={{display:'block',fontSize:'12px',color:theme.text3,marginBottom:'8px',fontWeight:600,letterSpacing:0.5,textTransform:'uppercase'}}>Sport/Activity</label>
                <select name="sport" value={formData.sport} onChange={e => handleSelectChange('sport', e.target.value)} style={{width:'100%',padding:'12px 14px',border:`1px solid ${theme.border}`,borderRadius:'8px',background:theme.bg,color:theme.text,fontSize:'14px',fontFamily:"'Barlow', sans-serif",boxSizing:'border-box',cursor:'pointer'}} onFocus={(e) => e.target.style.borderColor = '#2196F3'} onBlur={(e) => e.target.style.borderColor = theme.border}>
                  <option value="">Select sport</option>
                  {sports.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              {/* Goal */}
              <div>
                <label style={{display:'block',fontSize:'12px',color:theme.text3,marginBottom:'8px',fontWeight:600,letterSpacing:0.5,textTransform:'uppercase'}}>Training Goal</label>
                <select name="goal" value={formData.goal} onChange={e => handleSelectChange('goal', e.target.value)} style={{width:'100%',padding:'12px 14px',border:`1px solid ${theme.border}`,borderRadius:'8px',background:theme.bg,color:theme.text,fontSize:'14px',fontFamily:"'Barlow', sans-serif",boxSizing:'border-box',cursor:'pointer'}} onFocus={(e) => e.target.style.borderColor = '#2196F3'} onBlur={(e) => e.target.style.borderColor = theme.border}>
                  <option value="">Select goal</option>
                  {goals.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
                </select>
              </div>
            </>
          )}

          {/* Email - shown in both modes */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '12px',
              color: theme.text3,
              marginBottom: '8px',
              fontWeight: 600,
              letterSpacing: 0.5,
              textTransform: 'uppercase'
            }}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              style={{
                width: '100%',
                padding: '12px 14px',
                border: `1px solid ${theme.border}`,
                borderRadius: '8px',
                background: theme.bg,
                color: theme.text,
                fontSize: '14px',
                fontFamily: "'Barlow', sans-serif",
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2196F3'}
              onBlur={(e) => e.target.style.borderColor = theme.border}
            />
          </div>

          {/* Password */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '12px',
              color: theme.text3,
              marginBottom: '8px',
              fontWeight: 600,
              letterSpacing: 0.5,
              textTransform: 'uppercase'
            }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder={mode === 'login' ? 'Enter password' : 'Min 6 characters'}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 14px',
                  paddingRight: '44px',
                  border: `1px solid ${theme.border}`,
                  borderRadius: '8px',
                  background: theme.bg,
                  color: theme.text,
                  fontSize: '14px',
                  fontFamily: "'Barlow', sans-serif",
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2196F3'}
                onBlur={(e) => e.target.style.borderColor = theme.border}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: theme.text3,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={mode === 'login' ? handleLogin : handleSignup}
          style={{
            width: '100%',
            padding: '14px 16px',
            marginTop: '24px',
            background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: "'Barlow Condensed', sans-serif",
            letterSpacing: 0.5,
            transition: 'transform 0.2s, box-shadow 0.2s',
            textTransform: 'uppercase'
          }}
          onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
          onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
          onMouseEnter={(e) => e.target.style.boxShadow = '0 8px 20px rgba(33, 150, 243, 0.4)'}
          onMouseLeave={(e) => e.target.style.boxShadow = 'none'}
        >
          {mode === 'login' ? 'Login' : 'Create Account'}
        </button>

        {/* Info Text */}
        <p style={{
          textAlign: 'center',
          color: theme.text3,
          fontSize: '12px',
          marginTop: '16px',
          lineHeight: '1.6'
        }}>
          {mode === 'login' 
            ? "Don't have an account? Click 'Sign Up' to create one."
            : 'All data will be saved to your profile automatically.'
          }
        </p>
      </div>
    </div>
  )
}
