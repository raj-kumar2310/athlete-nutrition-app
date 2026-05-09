import { create } from 'zustand'
import { persist } from 'zustand/middleware'

function defaultMealForActivity(activity) {
  // Simple meal suggestions with macros (g)
  const meals = {
    Speed: [
      { name: 'Oat Porridge + Banana', carbs: 60, protein: 12, fat: 8 },
      { name: 'Recovery Smoothie (milk+banana+protein)', carbs: 40, protein: 25, fat: 6 }
    ],
    Endurance: [
      { name: 'Bagel + Peanut Butter', carbs: 80, protein: 18, fat: 12 },
      { name: 'Chicken Rice Bowl', carbs: 60, protein: 35, fat: 10 }
    ],
    Strength: [
      { name: 'Greek Yogurt + Fruit', carbs: 45, protein: 25, fat: 6 },
      { name: 'Protein + Rice + Veg', carbs: 55, protein: 40, fat: 12 }
    ],
    Flexibility: [
      { name: 'Toast + Eggs', carbs: 40, protein: 18, fat: 12 },
      { name: 'Cottage Cheese + Fruit', carbs: 30, protein: 20, fat: 6 }
    ],
    Agility: [
      { name: 'Wheat Porridge + Berries', carbs: 50, protein: 12, fat: 6 },
      { name: 'Tuna Sandwich', carbs: 40, protein: 30, fat: 10 }
    ],
    Rest: [
      { name: 'Balanced Lunch (salad+protein)', carbs: 45, protein: 25, fat: 15 },
      { name: 'Light Snack', carbs: 30, protein: 10, fat: 8 }
    ],
    Competition: [
      { name: 'Pasta + Chicken', carbs: 100, protein: 35, fat: 12 },
      { name: 'Recovery Meal (protein+carbs)', carbs: 60, protein: 30, fat: 8 }
    ]
  }
  return meals[activity] || meals['Rest']
}

export const useDailyStore = create(
  persist(
    (set, get) => ({
      plan: null,
      savePlan: (plan) => set({ plan }),
      clearPlan: () => set({ plan: null }),
      toggleMealDone: (mealId) => set(state => {
        if (!state.plan) return state
        const timeline = state.plan.timeline.map(item => item.id === mealId ? { ...item, done: !item.done } : item)
        const plan = { ...state.plan, timeline }
        return { plan }
      })
    }),
    { name: 'athleteeats-daily' }
  )
)

export function generatePlan({ focus, eventName, sessionDate }) {
  // sessionDate is a JS Date
  // pre-workout: 90 minutes before; recovery: 45 minutes after
  const session = new Date(sessionDate)
  const pre = new Date(session.getTime() - 90 * 60000)
  const recovery = new Date(session.getTime() + 45 * 60000)

  const meals = defaultMealForActivity(focus)

  const timeline = [
    {
      id: 'pre',
      label: `Eat by ${pre.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      type: 'pre',
      time: pre.toISOString(),
      meal: meals[0],
      done: false
    },
    {
      id: 'session',
      label: `Train at ${session.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      type: 'session',
      time: session.toISOString(),
      eventName,
      done: false
    },
    {
      id: 'recovery',
      label: `Recovery meal by ${recovery.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      type: 'recovery',
      time: recovery.toISOString(),
      meal: meals[1] || meals[0],
      done: false
    }
  ]

  return {
    id: `plan_${Date.now()}`,
    focus,
    eventName,
    createdAt: new Date().toISOString(),
    timeline
  }
}
