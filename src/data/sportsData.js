export const sportsData = {
  aerobic: [
    {
      id: 'marathon', name: 'Marathon', icon: '🏃', distance: '42.2km',
      events: [{
        id: 'full_marathon', name: 'Full Marathon (42.2km)',
        preEvent: {
          threeHour: { foods: ['Oatmeal with banana', 'Whole grain toast', 'Boiled eggs (2)', 'Orange juice'], calories: 600, hydration: '500ml water' },
          oneHour: { foods: ['Energy banana', 'Energy gel', 'Sports drink'], calories: 200, hydration: '300ml sports drink' }
        },
        during: { foods: ['Energy gels every 45min', 'Sports drink every 20min', 'Banana at aid stations'], hydration: '150-200ml every 20min' },
        postEvent: { foods: ['Chocolate milk', 'Rice with chicken', 'Sweet potato', 'Protein shake'], calories: 800, timing: 'Within 30 min' }
      }]
    },
    {
      id: 'running_5k', name: '5K / 10K Run', icon: '🏃‍♂️', distance: '5-10km',
      events: [
        {
          id: '5k', name: '5K Run',
          preEvent: {
            threeHour: { foods: ['Banana', 'Toast with peanut butter', 'Greek yogurt'], calories: 400, hydration: '400ml water' },
            oneHour: { foods: ['Half banana', 'Small energy bar'], calories: 150, hydration: '200ml water' }
          },
          during: { foods: ['Water only for 5K', 'Sports drink if hot weather'], hydration: '100ml every 2km' },
          postEvent: { foods: ['Protein shake', 'Fruit salad', 'Whole grain sandwich'], calories: 500, timing: 'Within 45 min' }
        },
        {
          id: '10k', name: '10K Run',
          preEvent: {
            threeHour: { foods: ['Oatmeal', 'Banana', 'Toast', 'Eggs'], calories: 500, hydration: '500ml water' },
            oneHour: { foods: ['Energy bar', 'Sports drink'], calories: 200, hydration: '250ml sports drink' }
          },
          during: { foods: ['Energy gel at 5km mark', 'Sports drink'], hydration: '150ml every 3km' },
          postEvent: { foods: ['Rice + chicken', 'Protein shake', 'Coconut water'], calories: 650, timing: 'Within 30 min' }
        }
      ]
    },
    {
      id: 'cycling', name: 'Road Cycling', icon: '🚴', distance: 'Various',
      events: [{
        id: 'road_race', name: 'Road Race (80-120km)',
        preEvent: {
          threeHour: { foods: ['Pasta with tomato sauce', 'Bread', 'Banana', 'Coffee'], calories: 700, hydration: '600ml water' },
          oneHour: { foods: ['Rice cakes', 'Energy bar', 'Sports drink'], calories: 250, hydration: '300ml sports drink' }
        },
        during: { foods: ['Energy gels every 30min', 'Bananas', 'Rice balls', 'Sports drink'], hydration: '500-750ml per hour' },
        postEvent: { foods: ['Pasta', 'Protein shake', 'Recovery drink', 'Salmon'], calories: 900, timing: 'Within 30 min' }
      }]
    },
    {
      id: 'swimming', name: 'Swimming', icon: '🏊', distance: 'Various',
      events: [
        {
          id: 'swim_400m', name: '400M Freestyle',
          preEvent: {
            threeHour: { foods: ['Rice with vegetables', 'Chicken breast', 'Banana'], calories: 500, hydration: '400ml water' },
            oneHour: { foods: ['Energy gel', 'Sports drink', 'Small banana'], calories: 180, hydration: '200ml water' }
          },
          during: { foods: ['N/A - too short'], hydration: 'Hydrate before' },
          postEvent: { foods: ['Chocolate milk', 'Tuna sandwich', 'Fruit'], calories: 600, timing: 'Immediately after' }
        }
      ]
    },
    {
      id: 'triathlon', name: 'Triathlon', icon: '🏅', distance: 'Various',
      events: [{
        id: 'olympic', name: 'Olympic Triathlon',
        preEvent: {
          threeHour: { foods: ['Large oatmeal', 'Eggs', 'Toast', 'Banana', 'Coffee'], calories: 750, hydration: '600ml water' },
          oneHour: { foods: ['Energy gels (2)', 'Sports drink', 'Electrolyte tablet'], calories: 300, hydration: '400ml sports drink' }
        },
        during: { foods: ['Gels on bike every 20min', 'Sports drink throughout', 'Salt tabs if hot'], hydration: '600ml per hour' },
        postEvent: { foods: ['Recovery shake', 'Pasta', 'Lean protein', 'Vegetables'], calories: 1000, timing: 'Within 20 min' }
      }]
    },
    {
      id: 'rowing', name: 'Rowing', icon: '🚣', distance: '2000m',
      events: [{
        id: 'row_2k', name: '2000M Race',
        preEvent: {
          threeHour: { foods: ['Rice', 'Chicken', 'Sweet potato', 'Green vegetables'], calories: 600, hydration: '500ml water' },
          oneHour: { foods: ['Banana', 'Energy bar'], calories: 200, hydration: '300ml water' }
        },
        during: { foods: ['Too short for food'], hydration: 'Pre-hydrate well' },
        postEvent: { foods: ['Protein shake', 'Bagel with peanut butter', 'Fruit juice'], calories: 700, timing: 'Within 30 min' }
      }]
    }
  ],
  anaerobic: [
    {
      id: 'sprint_100m', name: '100M Sprint', icon: '⚡', type: 'Track',
      events: [{
        id: '100m', name: '100 Metres',
        preEvent: {
          threeHour: { foods: ['White rice', 'Grilled chicken', 'Banana', 'Sports drink'], calories: 550, hydration: '400ml water' },
          oneHour: { foods: ['Banana', 'Energy gel', 'Creatine (if used)'], calories: 180, hydration: '250ml water' }
        },
        during: { foods: ['Nothing — race is 10 seconds'], hydration: 'Stay hydrated between heats' },
        postEvent: { foods: ['Protein shake', 'Banana', 'Recovery bar', 'Electrolyte drink'], calories: 450, timing: 'Within 30 min' }
      }]
    },
    {
      id: 'sprint_200m', name: '200M Sprint', icon: '💨', type: 'Track',
      events: [{
        id: '200m', name: '200 Metres',
        preEvent: {
          threeHour: { foods: ['Rice with chicken', 'Vegetables', 'Banana'], calories: 600, hydration: '450ml water' },
          oneHour: { foods: ['Energy gel', 'Sports drink', 'Banana'], calories: 200, hydration: '300ml sports drink' }
        },
        during: { foods: ['Nothing for race', 'Sports drink between rounds'], hydration: '200ml between heats' },
        postEvent: { foods: ['Protein shake', 'Rice', 'Chicken', 'Coconut water'], calories: 500, timing: 'Within 30 min' }
      }]
    },
    {
      id: 'sprint_400m', name: '400M Sprint', icon: '🔥', type: 'Track',
      events: [{
        id: '400m', name: '400 Metres',
        preEvent: {
          threeHour: { foods: ['Pasta', 'Chicken', 'Banana', 'Toast'], calories: 650, hydration: '500ml water' },
          oneHour: { foods: ['Energy gel', 'Banana', 'Sports drink'], calories: 220, hydration: '300ml sports drink' }
        },
        during: { foods: ['Sports drink between rounds'], hydration: '300ml between races' },
        postEvent: { foods: ['Protein shake', 'Pasta', 'Egg', 'Fruit'], calories: 600, timing: 'Within 30 min' }
      }]
    },
    {
      id: 'weightlifting', name: 'Weightlifting', icon: '🏋️', type: 'Strength',
      events: [
        {
          id: 'snatch_cj', name: 'Snatch & Clean & Jerk',
          preEvent: {
            threeHour: { foods: ['Rice', 'Beef/Chicken', 'Vegetables', 'Banana'], calories: 700, hydration: '500ml water' },
            oneHour: { foods: ['Creatine', 'Caffeine', 'Small banana'], calories: 150, hydration: '200ml water' }
          },
          during: { foods: ['Glucose tablets between lifts', 'Sports drink'], hydration: '200ml between attempts' },
          postEvent: { foods: ['Protein shake (40g)', 'Rice', 'Eggs', 'Milk'], calories: 800, timing: 'Immediately after' }
        }
      ]
    },
    {
      id: 'shot_put', name: 'Shot Put', icon: '⭕', type: 'Field',
      events: [{
        id: 'shot', name: 'Shot Put',
        preEvent: {
          threeHour: { foods: ['Rice', 'Protein-rich meal', 'Banana', 'Juice'], calories: 700, hydration: '500ml water' },
          oneHour: { foods: ['Energy bar', 'Banana', 'Sports drink'], calories: 200, hydration: '250ml water' }
        },
        during: { foods: ['Water between throws', 'Glucose tabs if needed'], hydration: '150ml between rounds' },
        postEvent: { foods: ['Protein shake', 'Meat', 'Rice', 'Vegetables'], calories: 850, timing: 'Within 30 min' }
      }]
    },
    {
      id: 'long_jump', name: 'Long Jump', icon: '📏', type: 'Field',
      events: [{
        id: 'lj', name: 'Long Jump',
        preEvent: {
          threeHour: { foods: ['Light pasta', 'Chicken', 'Banana'], calories: 500, hydration: '400ml water' },
          oneHour: { foods: ['Energy gel', 'Sports drink'], calories: 180, hydration: '250ml water' }
        },
        during: { foods: ['Water between jumps'], hydration: 'Sip water between rounds' },
        postEvent: { foods: ['Protein shake', 'Banana', 'Recovery meal'], calories: 500, timing: 'Within 45 min' }
      }]
    },
    {
      id: 'high_jump', name: 'High Jump', icon: '🆙', type: 'Field',
      events: [{
        id: 'hj', name: 'High Jump',
        preEvent: {
          threeHour: { foods: ['Rice', 'Chicken', 'Salad', 'Banana'], calories: 500, hydration: '400ml water' },
          oneHour: { foods: ['Banana', 'Energy bar'], calories: 180, hydration: '200ml water' }
        },
        during: { foods: ['Water only between attempts'], hydration: '150ml between rounds' },
        postEvent: { foods: ['Protein shake', 'Light meal', 'Fruit'], calories: 500, timing: 'Within 45 min' }
      }]
    },
    {
      id: 'gymnastics', name: 'Gymnastics', icon: '🤸', type: 'Gymnastics',
      events: [{
        id: 'artistic', name: 'Artistic Gymnastics',
        preEvent: {
          threeHour: { foods: ['Light rice', 'Chicken', 'Banana', 'Water'], calories: 450, hydration: '350ml water' },
          oneHour: { foods: ['Banana', 'Honey', 'Sports drink'], calories: 150, hydration: '200ml water' }
        },
        during: { foods: ['Banana between rotations', 'Energy gels', 'Sports drink'], hydration: '200ml between events' },
        postEvent: { foods: ['Protein shake', 'Fruit', 'Yogurt', 'Recovery meal'], calories: 600, timing: 'Within 30 min' }
      }]
    }
  ]
}

export const trainingNutrition = {
  speed: {
    name: 'Speed Training',
    color: '#FF4D00',
    focus: 'Fast Energy + Explosive Power',
    preWorkout: {
      timing: '2-3 hours before',
      foods: ['White rice (100g)', 'Chicken breast (100g)', 'Banana', 'Sports drink'],
      macros: { carbs: 65, protein: 20, fat: 15 },
      tips: 'High glycemic carbs for quick energy. Avoid heavy fats.'
    },
    duringWorkout: {
      foods: ['Sports drink (every 20 min)', 'Energy gel (if over 60 min)'],
      hydration: '150-200ml every 20 min',
      tips: 'Keep blood sugar stable. Electrolytes key for explosive work.'
    },
    postWorkout: {
      timing: 'Within 30 min',
      foods: ['Protein shake (30g)', 'Banana', 'Chocolate milk', 'Rice cakes'],
      macros: { carbs: 60, protein: 30, fat: 10 },
      tips: '3:1 carb-to-protein ratio for speed recovery.'
    },
    supplements: ['Creatine monohydrate (5g/day)', 'Caffeine (pre-workout)', 'Beta-alanine', 'BCAAs']
  },
  endurance: {
    name: 'Endurance Training',
    color: '#4FC3F7',
    focus: 'Sustained Energy + Glycogen Loading',
    preWorkout: {
      timing: '3 hours before',
      foods: ['Oatmeal (150g)', 'Banana (2)', 'Whole grain toast', 'Eggs (2)', 'OJ'],
      macros: { carbs: 70, protein: 15, fat: 15 },
      tips: 'Carb-load for long sessions. Slow-release carbs are key.'
    },
    duringWorkout: {
      foods: ['Energy gels every 45 min', 'Banana at aid stations', 'Sports drink continuously'],
      hydration: '500-750ml per hour',
      tips: '30-60g carbs per hour during long efforts.'
    },
    postWorkout: {
      timing: 'Within 30-45 min',
      foods: ['Recovery shake', 'Pasta', 'Salmon', 'Sweet potato', 'Coconut water'],
      macros: { carbs: 60, protein: 25, fat: 15 },
      tips: 'Replenish glycogen + repair muscle. Omega-3s help inflammation.'
    },
    supplements: ['Electrolyte tabs', 'Beetroot juice (nitrates)', 'Iron (if deficient)', 'Vitamin D']
  },
  strength: {
    name: 'Strength Training',
    color: '#E63946',
    focus: 'Muscle Protein Synthesis + Power',
    preWorkout: {
      timing: '1.5-2 hours before',
      foods: ['Rice (150g)', 'Beef/Chicken (150g)', 'Sweet potato', 'Green vegetables'],
      macros: { carbs: 45, protein: 35, fat: 20 },
      tips: 'High protein pre-workout. Moderate carbs for sustained energy.'
    },
    duringWorkout: {
      foods: ['BCAAs in water', 'Glucose tabs if needed'],
      hydration: '200-300ml every 30 min',
      tips: 'Sip BCAAs throughout. Stay hydrated for strength output.'
    },
    postWorkout: {
      timing: 'Immediately — within 30 min',
      foods: ['Whey protein shake (40g)', 'Rice (200g)', 'Eggs (3)', 'Milk (500ml)'],
      macros: { carbs: 40, protein: 40, fat: 20 },
      tips: 'Anabolic window is real for strength. High protein critical.'
    },
    supplements: ['Creatine (5g/day)', 'Whey protein', 'ZMA (sleep recovery)', 'Vitamin D3 + K2']
  },
  flexibility: {
    name: 'Flexibility & Recovery',
    color: '#00E676',
    focus: 'Anti-Inflammation + Tissue Repair',
    preWorkout: {
      timing: '1-2 hours before',
      foods: ['Smoothie (banana + berries + spinach)', 'Almonds (30g)', 'Green tea'],
      macros: { carbs: 50, protein: 25, fat: 25 },
      tips: 'Light, anti-inflammatory foods. No heavy meals for flexibility work.'
    },
    duringWorkout: {
      foods: ['Water with lemon', 'Coconut water'],
      hydration: '200ml per 30 min',
      tips: 'Hydration key for fascia health and joint mobility.'
    },
    postWorkout: {
      timing: 'Within 1 hour',
      foods: ['Tart cherry juice', 'Turmeric milk', 'Salmon', 'Leafy greens', 'Walnuts'],
      macros: { carbs: 40, protein: 30, fat: 30 },
      tips: 'Anti-inflammatory focus. Omega-3 + antioxidants for recovery.'
    },
    supplements: ['Omega-3 fish oil', 'Magnesium', 'Tart cherry extract', 'Collagen peptides']
  }
}

export const weightManagementData = {
  cut: {
    name: 'Cutting Phase',
    goal: 'Lose fat, preserve muscle',
    color: '#FF3057',
    deficit: 400,
    macroRatio: { carbs: 40, protein: 40, fat: 20 },
    tips: ['Eat in 400 cal deficit', 'High protein to preserve muscle', 'Time carbs around workouts', 'Increase cardio gradually'],
    foods: ['Chicken breast', 'Egg whites', 'Broccoli', 'Sweet potato (small)', 'Greek yogurt', 'Berries', 'Green tea']
  },
  bulk: {
    name: 'Bulking Phase',
    goal: 'Gain muscle mass',
    color: '#FF4D00',
    surplus: 400,
    macroRatio: { carbs: 50, protein: 30, fat: 20 },
    tips: ['Eat in 400 cal surplus', 'Progressive overload in gym', 'Prioritize sleep', 'Lean protein with every meal'],
    foods: ['Whole eggs', 'Beef', 'Rice', 'Oats', 'Whole milk', 'Peanut butter', 'Avocado', 'Banana']
  },
  maintain: {
    name: 'Maintenance Phase',
    goal: 'Maintain weight, improve performance',
    color: '#00E676',
    surplus: 0,
    macroRatio: { carbs: 50, protein: 25, fat: 25 },
    tips: ['Eat at TDEE', 'Cycle carbs with training intensity', 'Focus on food quality', 'Track weekly averages'],
    foods: ['Mixed whole foods', 'Lean proteins', 'Complex carbs', 'Healthy fats', 'Plenty of vegetables']
  }
}

export const recoveryData = {
  immediate: {
    label: '0-30 min Post Training',
    color: '#FF4D00',
    foods: ['Whey protein shake', 'Banana', 'Chocolate milk', 'White rice'],
    focus: 'Glycogen replenishment + muscle protein synthesis kickstart'
  },
  shortTerm: {
    label: '1-3 Hours Post Training',
    color: '#FF7A00',
    foods: ['Grilled chicken + rice', 'Salmon + sweet potato', 'Eggs + toast', 'Greek yogurt + fruit'],
    focus: 'Full recovery meal with balanced macros'
  },
  overnight: {
    label: 'Before Sleep',
    color: '#4FC3F7',
    foods: ['Casein protein shake', 'Cottage cheese', 'Warm milk + honey', 'Almonds'],
    focus: 'Slow-release protein for overnight muscle repair'
  },
  hydration: {
    label: 'Hydration Protocol',
    color: '#00E676',
    foods: ['Water (500ml immediately)', 'Coconut water', 'Electrolyte drink', 'Tart cherry juice'],
    focus: 'Replace 150% of fluid lost during exercise'
  }
}

export const performanceData = {
  speed: {
    label: 'Speed & Power',
    color: '#FF4D00',
    foods: ['Creatine-rich foods (red meat)', 'Fast carbs pre-workout', 'Caffeine', 'Beta-alanine foods'],
    tips: 'Focus on phosphocreatine system — short burst energy'
  },
  endurance: {
    label: 'Endurance & Stamina',
    color: '#4FC3F7',
    foods: ['Beetroot juice (nitrates)', 'Oats', 'Banana', 'Quinoa', 'Iron-rich foods'],
    tips: 'VO2 max improvement — oxygen delivery optimization'
  },
  strength: {
    label: 'Strength & Power',
    color: '#E63946',
    foods: ['High protein (2g/kg body weight)', 'Creatine', 'ZMA foods', 'Vitamin D sources'],
    tips: 'Muscle protein synthesis — progressive overload + nutrition'
  },
  recovery: {
    label: 'Recovery Speed',
    color: '#00E676',
    foods: ['Omega-3 (salmon, walnuts)', 'Tart cherries', 'Turmeric', 'Vitamin C foods', 'Magnesium'],
    tips: 'Reduce inflammation + oxidative stress for faster recovery'
  }
}