import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useSearchStore = create(
  persist(
    (set) => ({
      recent: [],
      addRecent: (term) => set((state) => {
        const t = (term || '').trim()
        if (!t) return state
        const deduped = [t, ...state.recent.filter(r => r.toLowerCase() !== t.toLowerCase())]
        return { recent: deduped.slice(0, 5) }
      }),
      clearRecent: () => set({ recent: [] }),
    }),
    { name: 'athleteeats-search' }
  )
)
