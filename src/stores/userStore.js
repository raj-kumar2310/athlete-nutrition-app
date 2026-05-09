import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUserStore = create(
  persist(
    (set, get) => ({
      // Personal Info
      name: '',
      age: '',
      height: '',
      weight: '',
      gender: '',
      sport: '',
      goal: '',
      isOnboarded: false,

      // Actions
      setUserInfo: (info) => set({ ...info, isOnboarded: true }),
      updateField: (field, value) => set({ [field]: value }),
      resetUser: () => set({
        name: '', age: '', height: '', weight: '',
        gender: '', sport: '', goal: '', isOnboarded: false
      }),

      // Coach / multiple athletes
      isPremium: false,
      athletes: [], // { id, name, sport, weight, age, goal, lastActivity, notes }
      activeAthleteId: null,
      addAthlete: (athlete) => {
        const { isPremium, athletes } = get()
        const limit = isPremium ? 50 : 10
        if (athletes.length >= limit) return false
        const id = Date.now().toString()
        const entry = { id, ...athlete, lastActivity: null, notes: '' }
        set({ athletes: [...athletes, entry] })
        return id
      },
      updateAthlete: (id, patch) => set(state => ({ athletes: state.athletes.map(a => a.id === id ? { ...a, ...patch } : a) })),
      removeAthlete: (id) => set(state => ({ athletes: state.athletes.filter(a => a.id !== id), activeAthleteId: state.activeAthleteId === id ? null : state.activeAthleteId })),
      setActiveAthlete: (id) => set({ activeAthleteId: id }),
      addCoachNote: (id, note) => set(state => ({ athletes: state.athletes.map(a => a.id === id ? { ...a, notes: (a.notes || '') + '\n' + note } : a) })),

      // Computed
      getBMI: () => {
        const { height, weight } = get()
        if (!height || !weight) return null
        const h = parseFloat(height) / 100
        return (parseFloat(weight) / (h * h)).toFixed(1)
      },
        theme: 'dark', // default dark
      toggleTheme: () => set(s => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),

      getTDEE: () => {
        const { weight, height, age, gender, goal } = get()
        if (!weight || !height || !age) return 2000
        const w = parseFloat(weight), h = parseFloat(height), a = parseFloat(age)
        let bmr = gender === 'female'
          ? 447.6 + (9.2 * w) + (3.1 * h) - (4.3 * a)
          : 88.4 + (13.4 * w) + (4.8 * h) - (5.7 * a)
        let tdee = bmr * 1.55
        if (goal === 'cut') tdee -= 400
        if (goal === 'bulk') tdee += 400
        return Math.round(tdee)
      }
    }),
    { name: 'athleteeats-user' }
  )
)