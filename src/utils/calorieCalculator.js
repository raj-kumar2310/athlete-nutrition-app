// MET values for different activities
export const MET_VALUES = {
  sprint_100m: 23,
  sprint_200m: 20,
  sprint_400m: 19,
  running_5k: 11,
  running_10k: 12,
  marathon: 13,
  cycling: 10,
  swimming: 9,
  strength: 6,
  hiit: 14,
  flexibility: 3,
  basketball: 8,
  football: 9,
  cricket: 5,
  volleyball: 6,
  tennis: 8,
  badminton: 7,
  weightlifting: 6,
}

export function calculateCaloriesBurned(met, weightKg, durationMinutes) {
  return Math.round(met * weightKg * (durationMinutes / 60))
}

export function calculateMacros(calories, goal = 'performance') {
  const ratios = {
    performance: { carbs: 0.55, protein: 0.25, fat: 0.20 },
    strength:    { carbs: 0.40, protein: 0.40, fat: 0.20 },
    endurance:   { carbs: 0.65, protein: 0.20, fat: 0.15 },
    cut:         { carbs: 0.40, protein: 0.40, fat: 0.20 },
    bulk:        { carbs: 0.50, protein: 0.30, fat: 0.20 },
  }
  const r = ratios[goal] || ratios.performance
  return {
    carbs:   Math.round((calories * r.carbs) / 4),
    protein: Math.round((calories * r.protein) / 4),
    fat:     Math.round((calories * r.fat) / 9),
    carbsPct:   Math.round(r.carbs * 100),
    proteinPct: Math.round(r.protein * 100),
    fatPct:     Math.round(r.fat * 100),
  }
}

export function calculateRecommendedIntake(burned, goal = 'performance') {
  const multipliers = {
    performance: 1.3,
    strength: 1.4,
    endurance: 1.35,
    cut: 1.1,
    bulk: 1.5,
  }
  return Math.round(burned * (multipliers[goal] || 1.3))
}

export function calculateHydration(weightKg, durationMinutes, intensity = 'moderate') {
  const base = weightKg * 35
  const sweatRate = {
    low: 400,
    moderate: 700,
    high: 1000,
  }
  const extra = (sweatRate[intensity] || 700) * (durationMinutes / 60)
  return {
    daily: Math.round(base),
    duringExercise: Math.round(extra),
    total: Math.round(base + extra),
  }
}