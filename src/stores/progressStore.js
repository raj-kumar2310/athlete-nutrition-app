import { create } from 'zustand'

const KEYS = {
  weight: 'weight-log',
  training: 'training-log',
  injury: 'injury-log',
}

function loadArray(key) {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(key)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveArray(key, value) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(value))
}

function createItem(base) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: Date.now(),
    ...base,
  }
}

export const useProgressStore = create((set) => ({
  weightLogs: loadArray(KEYS.weight),
  trainingLogs: loadArray(KEYS.training),
  injuryLogs: loadArray(KEYS.injury),

  addWeightLog: ({ weight, date }) => set((state) => {
    const next = [createItem({ weight: Number(weight), date }), ...state.weightLogs].slice(0, 120)
    saveArray(KEYS.weight, next)
    return { weightLogs: next }
  }),
  deleteWeightLog: (id) => set((state) => {
    const next = state.weightLogs.filter((item) => item.id !== id)
    saveArray(KEYS.weight, next)
    return { weightLogs: next }
  }),
  clearWeightLogs: () => set(() => {
    saveArray(KEYS.weight, [])
    return { weightLogs: [] }
  }),

  addTrainingLog: ({ type, duration, notes, date }) => set((state) => {
    const next = [createItem({ type, duration: Number(duration), notes: notes || '', date }), ...state.trainingLogs].slice(0, 200)
    saveArray(KEYS.training, next)
    return { trainingLogs: next }
  }),
  deleteTrainingLog: (id) => set((state) => {
    const next = state.trainingLogs.filter((item) => item.id !== id)
    saveArray(KEYS.training, next)
    return { trainingLogs: next }
  }),
  clearTrainingLogs: () => set(() => {
    saveArray(KEYS.training, [])
    return { trainingLogs: [] }
  }),

  addInjuryLog: ({ bodyPart, severity, status, date }) => set((state) => {
    const next = [createItem({ bodyPart, severity, status, date }), ...state.injuryLogs].slice(0, 120)
    saveArray(KEYS.injury, next)
    return { injuryLogs: next }
  }),
  deleteInjuryLog: (id) => set((state) => {
    const next = state.injuryLogs.filter((item) => item.id !== id)
    saveArray(KEYS.injury, next)
    return { injuryLogs: next }
  }),
  clearInjuryLogs: () => set(() => {
    saveArray(KEYS.injury, [])
    return { injuryLogs: [] }
  }),
}))