// ─── Complete Olympic Sports Data ─────────────────────────────
// Aerobic = endurance-dominant | Anaerobic = power/strength-dominant

const prePost = (preThreeHour, preOneHour, duringFoods, duringHydration, postFoods, postCal, postTiming = 'Within 30 min') => ({
  preEvent: {
    threeHour: { foods: preThreeHour.foods, calories: preThreeHour.cal, hydration: preThreeHour.hydration || '500ml water' },
    oneHour:   { foods: preOneHour.foods,   calories: preOneHour.cal,   hydration: preOneHour.hydration  || '250ml sports drink' },
  },
  during: { foods: duringFoods, hydration: duringHydration },
  postEvent: { foods: postFoods, calories: postCal, timing: postTiming },
})

// ─── AEROBIC SPORTS ────────────────────────────────────────────
export const sportsData = {
  aerobic: [

    // ── Athletics (Track) ───────────────────────────────────────
    {
      id: 'athletics_track', name: 'Athletics – Track', icon: '🏃', type: 'Athletics',
      events: [
        { id: '100m',  name: '100 Metres',   ...prePost({ foods: ['White rice (200g)', 'Grilled chicken (150g)', 'Banana', 'Sports drink'], cal: 550, hydration: '400ml water' }, { foods: ['Banana', 'Energy gel', 'Creatine if used'], cal: 150 }, ['Water between heats', 'Glucose tabs'], 'Stay hydrated between rounds', ['Protein shake (30g)', 'Banana', 'Chocolate milk', 'Rice cakes'], 450) },
        { id: '200m',  name: '200 Metres',   ...prePost({ foods: ['Rice (200g)', 'Chicken (150g)', 'Banana', 'OJ'], cal: 580 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 180 }, ['Sports drink between rounds'], '200ml between heats', ['Protein shake', 'Rice', 'Banana', 'Coconut water'], 500) },
        { id: '400m',  name: '400 Metres',   ...prePost({ foods: ['Pasta (200g)', 'Chicken (150g)', 'Banana', 'Toast'], cal: 650 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 220 }, ['Sports drink between rounds'], '300ml between races', ['Protein shake', 'Pasta', 'Egg', 'Fruit'], 600) },
        { id: '800m',  name: '800 Metres',   ...prePost({ foods: ['Rice (200g)', 'Salmon (150g)', 'Sweet potato', 'Banana'], cal: 620 }, { foods: ['Energy gel', 'Sports drink', 'Banana'], cal: 200 }, ['Sports drink between rounds'], '300ml between rounds', ['Recovery shake', 'Rice', 'Chicken', 'Fruit'], 600) },
        { id: '1500m', name: '1500 Metres',  ...prePost({ foods: ['Pasta (250g)', 'Chicken', 'Salad', 'Banana', 'OJ'], cal: 700 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 220 }, ['Energy gel if heats', 'Sports drink'], '400ml per hour', ['Recovery shake', 'Pasta', 'Tuna', 'Coconut water'], 650) },
        { id: '5000m', name: '5000 Metres',  ...prePost({ foods: ['Oatmeal (150g)', 'Banana (2)', 'Toast', 'Eggs (2)', 'OJ'], cal: 750 }, { foods: ['Energy gel', 'Sports drink', 'Dates'], cal: 250 }, ['Energy gels every 2km', 'Water at stations'], '400-500ml per hour', ['Pasta', 'Protein shake', 'Coconut water', 'Fruit'], 750) },
        { id: '10000m',name: '10000 Metres', ...prePost({ foods: ['Pasta (300g)', 'Chicken', 'Banana (2)', 'Toast', 'OJ'], cal: 850 }, { foods: ['Energy gel (2)', 'Sports drink', 'Banana'], cal: 300 }, ['Gels every 3km', 'Sports drink at stations'], '500ml per hour', ['Pasta', 'Salmon', 'Recovery shake', 'Electrolytes'], 850) },
        { id: 'marathon_track', name: 'Marathon (42.2km)', ...prePost({ foods: ['Oatmeal (200g)', 'Banana (2)', 'Toast', 'Eggs', 'Honey'], cal: 900 }, { foods: ['Energy gels (2)', 'Sports drink', 'Electrolyte tab'], cal: 350 }, ['Gel every 45min', 'Banana at stations', 'Sports drink 20min'], '600ml per hour', ['Recovery shake', 'Pasta', 'Salmon', 'Sweet potato'], 1000) },
        { id: '110m_hurdles', name: '110m Hurdles', ...prePost({ foods: ['Rice (200g)', 'Chicken', 'Banana', 'Sports drink'], cal: 560 }, { foods: ['Banana', 'Energy gel'], cal: 160 }, ['Water between heats'], 'Hydrate between rounds', ['Protein shake', 'Rice', 'Eggs'], 480) },
        { id: '400m_hurdles', name: '400m Hurdles', ...prePost({ foods: ['Pasta (200g)', 'Chicken (150g)', 'Banana', 'Toast'], cal: 660 }, { foods: ['Energy gel', 'Sports drink'], cal: 200 }, ['Sports drink between rounds'], '300ml between races', ['Protein shake', 'Pasta', 'Fruit'], 580) },
        { id: '3000m_steeple', name: '3000m Steeplechase', ...prePost({ foods: ['Pasta (250g)', 'Chicken', 'Banana (2)', 'OJ'], cal: 720 }, { foods: ['Energy gel', 'Sports drink', 'Banana'], cal: 240 }, ['Gels if multiple rounds', 'Sports drink'], '400ml per hour', ['Recovery shake', 'Pasta', 'Tuna', 'Coconut water'], 700) },
        { id: '4x100m', name: '4×100m Relay', ...prePost({ foods: ['Rice (200g)', 'Chicken (150g)', 'Banana', 'Sports drink'], cal: 550 }, { foods: ['Energy gel', 'Banana'], cal: 150 }, ['Water between rounds', 'Glucose tabs'], 'Hydrate well', ['Protein shake', 'Banana', 'Rice', 'Chocolate milk'], 450) },
        { id: '4x400m', name: '4×400m Relay', ...prePost({ foods: ['Pasta (200g)', 'Chicken', 'Banana (2)', 'Toast'], cal: 650 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 220 }, ['Sports drink between rounds'], '300ml per round', ['Protein shake', 'Rice', 'Eggs', 'Fruit'], 600) },
        { id: '20km_walk', name: '20km Race Walk', ...prePost({ foods: ['Oatmeal', 'Banana (2)', 'Toast', 'Eggs', 'OJ'], cal: 800 }, { foods: ['Energy gel', 'Sports drink', 'Banana'], cal: 280 }, ['Gels every 5km', 'Sports drink every 2km'], '500ml per hour', ['Pasta', 'Recovery shake', 'Coconut water', 'Fruit'], 900) },
        { id: '50km_walk', name: '50km Race Walk', ...prePost({ foods: ['Large pasta (350g)', 'Chicken', 'Banana (3)', 'Toast', 'OJ'], cal: 1100 }, { foods: ['Energy gels (3)', 'Sports drink', 'Banana'], cal: 400 }, ['Gel every 30min', 'Real food at stations', 'Sports drink continuously'], '700ml per hour', ['Large recovery meal', 'Pasta', 'Protein shake', 'Electrolytes'], 1200) },
      ]
    },

    // ── Athletics (Road) ────────────────────────────────────────
    {
      id: 'athletics_road', name: 'Athletics – Road', icon: '🛣️', type: 'Athletics',
      events: [
        { id: 'road_marathon', name: 'Road Marathon', ...prePost({ foods: ['Oatmeal (200g)', 'Banana (2)', 'Toast', 'Eggs', 'Coffee'], cal: 900 }, { foods: ['Energy gels (2)', 'Sports drink', 'Electrolyte tab'], cal: 350 }, ['Gel every 45min', 'Banana', 'Sports drink 20min'], '600ml per hour', ['Recovery shake', 'Pasta', 'Salmon', 'Sweet potato'], 1000) },
        { id: 'road_half', name: 'Half Marathon', ...prePost({ foods: ['Pasta (250g)', 'Banana (2)', 'Toast', 'Eggs', 'OJ'], cal: 750 }, { foods: ['Energy gel', 'Sports drink', 'Banana'], cal: 250 }, ['Gel every 45min', 'Sports drink stations'], '500ml per hour', ['Pasta', 'Protein shake', 'Banana', 'Coconut water'], 800) },
        { id: '10km_road', name: '10km Road Race', ...prePost({ foods: ['Oatmeal (150g)', 'Banana (2)', 'Toast', 'OJ'], cal: 650 }, { foods: ['Energy gel', 'Sports drink'], cal: 200 }, ['Water at aid stations'], '400ml per hour', ['Recovery shake', 'Pasta', 'Banana', 'Coconut water'], 700) },
      ]
    },

    // ── Swimming ────────────────────────────────────────────────
    {
      id: 'swimming', name: 'Swimming', icon: '🏊', type: 'Aquatics',
      events: [
        { id: 'swim_50m',     name: '50m Freestyle',    ...prePost({ foods: ['Rice (200g)', 'Chicken (150g)', 'Banana', 'Sports drink'], cal: 550 }, { foods: ['Banana', 'Energy gel'], cal: 150 }, ['Water between heats'], 'Hydrate between rounds', ['Protein shake', 'Chocolate milk', 'Banana'], 450) },
        { id: 'swim_100m',    name: '100m Freestyle',   ...prePost({ foods: ['Rice (200g)', 'Tuna (150g)', 'Banana', 'OJ'], cal: 580 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 180 }, ['Sports drink between heats'], '300ml between heats', ['Protein shake', 'Rice', 'Banana', 'Milk'], 500) },
        { id: 'swim_200m',    name: '200m Freestyle',   ...prePost({ foods: ['Rice (200g)', 'Salmon (150g)', 'Sweet potato', 'Banana'], cal: 620 }, { foods: ['Energy gel', 'Sports drink'], cal: 200 }, ['Sports drink between rounds'], '300ml between rounds', ['Recovery shake', 'Rice', 'Chicken', 'Fruit'], 580) },
        { id: 'swim_400m',    name: '400m Freestyle',   ...prePost({ foods: ['Pasta (250g)', 'Tuna (150g)', 'Banana', 'Toast'], cal: 680 }, { foods: ['Energy gel', 'Sports drink', 'Banana'], cal: 220 }, ['Sports drink between heats'], '400ml per hour', ['Recovery shake', 'Pasta', 'Tuna', 'Coconut water'], 650) },
        { id: 'swim_800m',    name: '800m Freestyle',   ...prePost({ foods: ['Oatmeal (150g)', 'Banana (2)', 'Eggs (2)', 'OJ'], cal: 720 }, { foods: ['Energy gel', 'Sports drink', 'Banana'], cal: 240 }, ['Gels if needed', 'Sports drink'], '500ml per hour', ['Pasta', 'Recovery shake', 'Coconut water'], 700) },
        { id: 'swim_1500m',   name: '1500m Freestyle',  ...prePost({ foods: ['Pasta (250g)', 'Chicken', 'Banana (2)', 'OJ'], cal: 780 }, { foods: ['Energy gel (2)', 'Sports drink', 'Banana'], cal: 280 }, ['Gels if needed', 'Sports drink'], '500ml per hour', ['Pasta', 'Salmon', 'Recovery shake', 'Electrolytes'], 800) },
        { id: 'swim_100m_back', name: '100m Backstroke', ...prePost({ foods: ['Rice (200g)', 'Chicken (150g)', 'Banana', 'Sports drink'], cal: 560 }, { foods: ['Energy gel', 'Banana'], cal: 160 }, ['Water between heats'], 'Hydrate between rounds', ['Protein shake', 'Rice', 'Eggs'], 480) },
        { id: 'swim_200m_back', name: '200m Backstroke', ...prePost({ foods: ['Rice (200g)', 'Salmon (150g)', 'Sweet potato', 'Banana'], cal: 620 }, { foods: ['Energy gel', 'Sports drink'], cal: 200 }, ['Sports drink between rounds'], '350ml between rounds', ['Recovery shake', 'Rice', 'Chicken', 'Fruit'], 580) },
        { id: 'swim_100m_breast', name: '100m Breaststroke', ...prePost({ foods: ['Rice (200g)', 'Chicken (150g)', 'Banana', 'Sports drink'], cal: 560 }, { foods: ['Banana', 'Energy gel'], cal: 160 }, ['Water between heats'], 'Hydrate', ['Protein shake', 'Banana', 'Milk'], 480) },
        { id: 'swim_200m_breast', name: '200m Breaststroke', ...prePost({ foods: ['Rice (200g)', 'Tuna (150g)', 'Sweet potato', 'Banana'], cal: 620 }, { foods: ['Energy gel', 'Sports drink'], cal: 200 }, ['Sports drink between rounds'], '350ml', ['Recovery shake', 'Pasta', 'Tuna'], 580) },
        { id: 'swim_100m_fly', name: '100m Butterfly', ...prePost({ foods: ['Rice (200g)', 'Chicken (150g)', 'Banana', 'Sports drink'], cal: 560 }, { foods: ['Banana', 'Energy gel'], cal: 160 }, ['Water between heats'], 'Hydrate', ['Protein shake', 'Banana', 'Chocolate milk'], 480) },
        { id: 'swim_200m_fly', name: '200m Butterfly', ...prePost({ foods: ['Pasta (200g)', 'Salmon (150g)', 'Sweet potato', 'Banana'], cal: 640 }, { foods: ['Energy gel', 'Sports drink'], cal: 210 }, ['Sports drink between rounds'], '400ml', ['Recovery shake', 'Pasta', 'Tuna', 'Coconut water'], 600) },
        { id: 'swim_200m_im', name: '200m Individual Medley', ...prePost({ foods: ['Pasta (200g)', 'Chicken (150g)', 'Banana', 'OJ'], cal: 640 }, { foods: ['Energy gel', 'Sports drink'], cal: 210 }, ['Sports drink between rounds'], '400ml', ['Recovery shake', 'Rice', 'Chicken', 'Fruit'], 600) },
        { id: 'swim_400m_im', name: '400m Individual Medley', ...prePost({ foods: ['Oatmeal (150g)', 'Banana (2)', 'Eggs (2)', 'OJ'], cal: 720 }, { foods: ['Energy gel (2)', 'Sports drink'], cal: 260 }, ['Gels if needed', 'Sports drink'], '500ml per hour', ['Pasta', 'Recovery shake', 'Coconut water', 'Fruit'], 720) },
        { id: 'swim_4x100m_relay', name: '4×100m Relay', ...prePost({ foods: ['Rice (200g)', 'Chicken (150g)', 'Banana', 'Sports drink'], cal: 560 }, { foods: ['Energy gel', 'Banana'], cal: 160 }, ['Water between rounds'], 'Hydrate well', ['Protein shake', 'Rice', 'Banana'], 480) },
        { id: 'swim_open_water', name: '10km Open Water', ...prePost({ foods: ['Oatmeal (200g)', 'Banana (2)', 'Toast', 'Eggs', 'OJ'], cal: 900 }, { foods: ['Energy gels (2)', 'Sports drink', 'Electrolyte tab'], cal: 350 }, ['Gel every 30min at feed stations', 'Sports drink', 'Electrolytes'], '600ml per hour', ['Recovery meal', 'Pasta', 'Protein shake', 'Electrolytes'], 1000) },
      ]
    },

    // ── Cycling ─────────────────────────────────────────────────
    {
      id: 'cycling', name: 'Cycling', icon: '🚴', type: 'Cycling',
      events: [
        { id: 'road_race', name: 'Road Race (Individual)', ...prePost({ foods: ['Pasta (300g)', 'Chicken', 'Banana (2)', 'Bread', 'Coffee'], cal: 900 }, { foods: ['Rice cakes', 'Energy bar', 'Sports drink'], cal: 300 }, ['Gel every 30min', 'Bananas', 'Rice balls', 'Sports drink continuously'], '600-750ml per hour', ['Pasta', 'Recovery shake', 'Salmon', 'Sweet potato'], 1000) },
        { id: 'road_itt', name: 'Individual Time Trial', ...prePost({ foods: ['Pasta (300g)', 'Chicken', 'Banana (2)', 'Coffee'], cal: 850 }, { foods: ['Energy gel (2)', 'Sports drink', 'Caffeine gel'], cal: 280 }, ['Gel at midpoint', 'Sports drink'], '500-600ml', ['Recovery shake', 'Pasta', 'Protein shake', 'Coconut water'], 900) },
        { id: 'road_tt_team', name: 'Team Time Trial', ...prePost({ foods: ['Pasta (300g)', 'Chicken', 'Banana (2)', 'OJ'], cal: 850 }, { foods: ['Energy gel (2)', 'Sports drink'], cal: 260 }, ['Gel at halfway', 'Sports drink sips'], '500ml', ['Pasta', 'Recovery shake', 'Protein shake'], 900) },
        { id: 'track_sprint', name: 'Track Sprint', ...prePost({ foods: ['Rice (200g)', 'Chicken (150g)', 'Banana', 'Sports drink'], cal: 600 }, { foods: ['Energy gel', 'Caffeine', 'Banana'], cal: 180 }, ['Water between rounds', 'Glucose tabs'], 'Hydrate between heats', ['Protein shake', 'Rice', 'Banana', 'Milk'], 500) },
        { id: 'track_keirin', name: 'Keirin', ...prePost({ foods: ['Rice (200g)', 'Chicken', 'Banana', 'Sports drink'], cal: 580 }, { foods: ['Energy gel', 'Caffeine tab', 'Banana'], cal: 170 }, ['Water + glucose between rounds'], 'Hydrate', ['Protein shake', 'Banana', 'Rice cakes'], 480) },
        { id: 'track_madison', name: 'Madison', ...prePost({ foods: ['Pasta (280g)', 'Chicken', 'Banana (2)', 'OJ'], cal: 820 }, { foods: ['Energy gel (2)', 'Sports drink'], cal: 260 }, ['Gels during race', 'Sports drink'], '500ml per hour', ['Recovery shake', 'Pasta', 'Chicken', 'Coconut water'], 850) },
        { id: 'track_omnium', name: 'Omnium', ...prePost({ foods: ['Pasta (280g)', 'Chicken', 'Banana (2)', 'OJ'], cal: 800 }, { foods: ['Energy gel (2)', 'Sports drink', 'Caffeine'], cal: 270 }, ['Gels between events', 'Sports drink'], '500ml per hour', ['Recovery shake', 'Pasta', 'Tuna', 'Fruit'], 850) },
        { id: 'track_4000m_pursuit', name: '4000m Team Pursuit', ...prePost({ foods: ['Rice (250g)', 'Chicken', 'Banana (2)', 'Coffee'], cal: 750 }, { foods: ['Energy gel (2)', 'Caffeine gel', 'Sports drink'], cal: 250 }, ['Gels if multiple rounds'], '400ml between rounds', ['Recovery shake', 'Rice', 'Protein shake', 'Banana'], 750) },
        { id: 'bmx_race', name: 'BMX Racing', ...prePost({ foods: ['Rice (200g)', 'Chicken', 'Banana', 'Sports drink'], cal: 580 }, { foods: ['Energy gel', 'Banana'], cal: 160 }, ['Water + glucose between runs'], 'Hydrate between runs', ['Protein shake', 'Banana', 'Rice cakes'], 480) },
        { id: 'mtb_xco', name: 'Mountain Bike Cross Country', ...prePost({ foods: ['Oatmeal (180g)', 'Banana (2)', 'Eggs', 'Toast', 'Coffee'], cal: 820 }, { foods: ['Energy gel (2)', 'Sports drink', 'Banana'], cal: 290 }, ['Gel every 30min', 'Sports drink at feed zones'], '600ml per hour', ['Pasta', 'Recovery shake', 'Chicken', 'Coconut water'], 900) },
      ]
    },

    // ── Rowing ──────────────────────────────────────────────────
    {
      id: 'rowing', name: 'Rowing', icon: '🚣', type: 'Aquatics',
      events: [
        { id: 'row_single_scull', name: 'Single Scull (M/W)', ...prePost({ foods: ['Rice (250g)', 'Chicken (150g)', 'Sweet potato', 'Banana', 'OJ'], cal: 750 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 220 }, ['Too short for food', 'Sports drink between rounds'], '300ml between races', ['Protein shake', 'Bagel + PB', 'Banana', 'Fruit juice'], 700) },
        { id: 'row_double_scull', name: 'Double Scull', ...prePost({ foods: ['Rice (250g)', 'Chicken', 'Sweet potato', 'Banana', 'OJ'], cal: 750 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 220 }, ['Sports drink between rounds'], '300ml', ['Protein shake', 'Pasta', 'Eggs', 'Banana'], 700) },
        { id: 'row_quad_scull', name: 'Quadruple Scull', ...prePost({ foods: ['Rice (250g)', 'Chicken', 'Sweet potato', 'OJ'], cal: 760 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 230 }, ['Sports drink between rounds'], '350ml', ['Recovery shake', 'Rice', 'Chicken', 'Coconut water'], 720) },
        { id: 'row_coxless_pair', name: 'Coxless Pair', ...prePost({ foods: ['Rice (250g)', 'Salmon', 'Banana (2)', 'Toast'], cal: 760 }, { foods: ['Energy gel', 'Sports drink'], cal: 220 }, ['Sports drink between rounds'], '300ml', ['Protein shake', 'Pasta', 'Eggs'], 720) },
        { id: 'row_coxless_four', name: 'Coxless Four', ...prePost({ foods: ['Pasta (280g)', 'Chicken', 'Banana (2)', 'OJ'], cal: 800 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 240 }, ['Sports drink between rounds'], '350ml', ['Recovery shake', 'Pasta', 'Tuna', 'Fruit'], 760) },
        { id: 'row_eight', name: 'Eight (with cox)', ...prePost({ foods: ['Pasta (300g)', 'Chicken', 'Banana (2)', 'Toast', 'OJ'], cal: 850 }, { foods: ['Energy gel (2)', 'Banana', 'Sports drink'], cal: 260 }, ['Sports drink between rounds'], '400ml', ['Recovery shake', 'Pasta', 'Chicken', 'Coconut water'], 800) },
        { id: 'row_lightweight', name: 'Lightweight Double Scull', ...prePost({ foods: ['Rice (200g)', 'Chicken (120g)', 'Banana', 'OJ'], cal: 650 }, { foods: ['Energy gel', 'Banana'], cal: 180 }, ['Sports drink between rounds'], '300ml', ['Protein shake', 'Rice', 'Eggs', 'Banana'], 650) },
      ]
    },

    // ── Canoe / Kayak ───────────────────────────────────────────
    {
      id: 'canoe_kayak', name: 'Canoe / Kayak', icon: '🛶', type: 'Aquatics',
      events: [
        { id: 'kayak_200m', name: 'Kayak Sprint 200m', ...prePost({ foods: ['Rice (200g)', 'Chicken', 'Banana', 'Sports drink'], cal: 560 }, { foods: ['Energy gel', 'Banana'], cal: 160 }, ['Water between heats', 'Glucose tabs'], 'Hydrate', ['Protein shake', 'Banana', 'Rice cakes'], 480) },
        { id: 'kayak_500m', name: 'Kayak Sprint 500m', ...prePost({ foods: ['Rice (200g)', 'Chicken', 'Banana (2)', 'OJ'], cal: 620 }, { foods: ['Energy gel', 'Sports drink'], cal: 200 }, ['Sports drink between rounds'], '300ml', ['Protein shake', 'Rice', 'Chicken', 'Banana'], 560) },
        { id: 'kayak_1000m', name: 'Kayak Sprint 1000m', ...prePost({ foods: ['Pasta (250g)', 'Chicken', 'Banana (2)', 'OJ'], cal: 720 }, { foods: ['Energy gel (2)', 'Sports drink'], cal: 240 }, ['Gel if needed', 'Sports drink'], '400ml', ['Recovery shake', 'Pasta', 'Chicken', 'Coconut water'], 680) },
        { id: 'canoe_slalom', name: 'Canoe Slalom', ...prePost({ foods: ['Rice (200g)', 'Chicken', 'Banana', 'Sports drink'], cal: 600 }, { foods: ['Energy gel', 'Banana', 'Caffeine'], cal: 190 }, ['Water between runs'], 'Hydrate between runs', ['Protein shake', 'Banana', 'Rice cakes', 'Milk'], 520) },
      ]
    },

    // ── Triathlon ───────────────────────────────────────────────
    {
      id: 'triathlon', name: 'Triathlon', icon: '🏅', type: 'Multi-Sport',
      events: [
        { id: 'olympic_tri', name: 'Olympic Triathlon', ...prePost({ foods: ['Oatmeal (200g)', 'Banana (2)', 'Toast', 'Eggs (2)', 'Coffee'], cal: 900 }, { foods: ['Energy gels (2)', 'Sports drink', 'Electrolyte tab'], cal: 320 }, ['Gel on bike every 20min', 'Sports drink throughout', 'Salt tabs if hot'], '600ml per hour', ['Recovery shake', 'Pasta', 'Protein', 'Vegetables'], 1000) },
        { id: 'sprint_tri', name: 'Sprint Triathlon', ...prePost({ foods: ['Oatmeal (150g)', 'Banana (2)', 'Toast', 'Eggs'], cal: 750 }, { foods: ['Energy gel', 'Sports drink'], cal: 250 }, ['Gel on bike', 'Sports drink'], '500ml per hour', ['Recovery shake', 'Pasta', 'Protein shake'], 850) },
        { id: 'paratri', name: 'Paralympic Triathlon', ...prePost({ foods: ['Oatmeal (180g)', 'Banana (2)', 'Toast', 'Eggs'], cal: 820 }, { foods: ['Energy gels (2)', 'Sports drink'], cal: 300 }, ['Gel on bike', 'Sports drink continuously'], '550ml per hour', ['Recovery shake', 'Pasta', 'Chicken', 'Fruit'], 900) },
      ]
    },

    // ── Cross Country ───────────────────────────────────────────
    {
      id: 'cross_country', name: 'Cross Country / Equestrian', icon: '🐎', type: 'Equestrian',
      events: [
        { id: 'equestrian_eventing', name: 'Eventing (Cross Country)', ...prePost({ foods: ['Oatmeal (180g)', 'Banana (2)', 'Eggs (2)', 'Toast', 'OJ'], cal: 800 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 260 }, ['Gels between phases', 'Sports drink'], '500ml per hour', ['Recovery meal', 'Pasta', 'Protein shake', 'Fruit'], 900) },
        { id: 'modern_pent_run', name: 'Modern Pentathlon (Run)', ...prePost({ foods: ['Pasta (250g)', 'Chicken', 'Banana (2)', 'OJ'], cal: 750 }, { foods: ['Energy gel', 'Sports drink'], cal: 230 }, ['Sports drink between disciplines'], '400ml per event', ['Recovery shake', 'Pasta', 'Chicken', 'Fruit'], 800) },
      ]
    },
  ],

  // ─── ANAEROBIC SPORTS ────────────────────────────────────────
  anaerobic: [

    // ── Athletics (Field) ───────────────────────────────────────
    {
      id: 'athletics_field', name: 'Athletics – Field Events', icon: '🏟️', type: 'Athletics',
      events: [
        { id: 'long_jump',   name: 'Long Jump',   ...prePost({ foods: ['Pasta (200g)', 'Chicken', 'Banana', 'Sports drink'], cal: 600 }, { foods: ['Banana', 'Energy bar', 'Sports drink'], cal: 180 }, ['Water between jumps'], 'Sip water between rounds', ['Protein shake', 'Banana', 'Recovery meal'], 550) },
        { id: 'triple_jump', name: 'Triple Jump', ...prePost({ foods: ['Pasta (200g)', 'Chicken', 'Banana', 'OJ'], cal: 620 }, { foods: ['Energy gel', 'Banana'], cal: 180 }, ['Water between rounds'], 'Sip water', ['Protein shake', 'Banana', 'Rice', 'Eggs'], 560) },
        { id: 'high_jump',   name: 'High Jump',   ...prePost({ foods: ['Rice (200g)', 'Chicken', 'Salad', 'Banana'], cal: 580 }, { foods: ['Banana', 'Energy bar'], cal: 170 }, ['Water only between attempts'], '150ml between rounds', ['Protein shake', 'Light meal', 'Fruit'], 520) },
        { id: 'pole_vault',  name: 'Pole Vault',  ...prePost({ foods: ['Rice (200g)', 'Chicken', 'Banana', 'Sports drink'], cal: 580 }, { foods: ['Banana', 'Energy bar', 'Caffeine'], cal: 175 }, ['Water between attempts'], 'Hydrate well', ['Protein shake', 'Rice', 'Eggs', 'Fruit'], 530) },
        { id: 'shot_put',    name: 'Shot Put',    ...prePost({ foods: ['Rice (250g)', 'Beef (150g)', 'Banana', 'Juice'], cal: 750 }, { foods: ['Energy bar', 'Banana', 'Sports drink'], cal: 200 }, ['Water between throws', 'Glucose tabs'], '150ml between rounds', ['Protein shake', 'Meat', 'Rice', 'Vegetables'], 850) },
        { id: 'discus',      name: 'Discus Throw',...prePost({ foods: ['Rice (250g)', 'Chicken (180g)', 'Sweet potato', 'Banana'], cal: 760 }, { foods: ['Energy bar', 'Banana', 'Sports drink'], cal: 210 }, ['Water between throws'], '150ml between rounds', ['Protein shake', 'Pasta', 'Beef', 'Vegetables'], 850) },
        { id: 'hammer',      name: 'Hammer Throw',...prePost({ foods: ['Rice (280g)', 'Beef (180g)', 'Banana (2)', 'OJ'], cal: 800 }, { foods: ['Energy bar', 'Banana', 'Sports drink'], cal: 220 }, ['Water between throws'], '150ml between rounds', ['Protein shake (40g)', 'Rice', 'Beef', 'Fruit'], 900) },
        { id: 'javelin',     name: 'Javelin Throw',...prePost({ foods: ['Pasta (200g)', 'Chicken (150g)', 'Banana', 'Juice'], cal: 700 }, { foods: ['Energy bar', 'Banana'], cal: 190 }, ['Water between throws'], 'Hydrate between rounds', ['Protein shake', 'Pasta', 'Eggs', 'Fruit'], 750) },
        { id: 'heptathlon',  name: 'Heptathlon (W)',...prePost({ foods: ['Oatmeal (200g)', 'Eggs (2)', 'Banana (2)', 'Toast', 'OJ'], cal: 900 }, { foods: ['Energy gel (2)', 'Banana', 'Sports drink'], cal: 300 }, ['Gels between events', 'Sports drink continuously'], '500ml per hour', ['Recovery shake', 'Pasta', 'Chicken', 'Fruit'], 950) },
        { id: 'decathlon',   name: 'Decathlon (M)',...prePost({ foods: ['Oatmeal (200g)', 'Eggs (3)', 'Banana (2)', 'Toast', 'Coffee'], cal: 950 }, { foods: ['Energy gel (2)', 'Banana (2)', 'Sports drink'], cal: 320 }, ['Gels between events', 'Sports drink continuously'], '600ml per hour', ['Recovery shake', 'Large meal', 'Pasta', 'Protein shake'], 1000) },
      ]
    },

    // ── Weightlifting ───────────────────────────────────────────
    {
      id: 'weightlifting', name: 'Weightlifting', icon: '🏋️', type: 'Strength',
      events: [
        { id: 'wl_snatch_cj_55', name: '55kg (Snatch + Clean & Jerk)', ...prePost({ foods: ['Rice (180g)', 'Chicken (130g)', 'Banana', 'Sports drink'], cal: 650 }, { foods: ['Creatine', 'Caffeine', 'Banana'], cal: 150 }, ['Glucose tabs between lifts', 'Sports drink'], '200ml between attempts', ['Protein shake (40g)', 'Rice', 'Eggs', 'Milk'], 780) },
        { id: 'wl_61', name: '61kg Class', ...prePost({ foods: ['Rice (200g)', 'Chicken (150g)', 'Banana', 'Sports drink'], cal: 700 }, { foods: ['Creatine', 'Caffeine', 'Banana', 'Energy gel'], cal: 170 }, ['Glucose tabs', 'Sports drink sips'], '200ml between attempts', ['Protein shake (40g)', 'Rice', 'Beef', 'Milk'], 820) },
        { id: 'wl_67', name: '67kg Class', ...prePost({ foods: ['Rice (220g)', 'Beef (150g)', 'Sweet potato', 'Banana'], cal: 750 }, { foods: ['Creatine', 'Caffeine', 'Banana'], cal: 180 }, ['Glucose tabs', 'Sports drink'], 'Hydrate between attempts', ['Protein shake (40g)', 'Large rice meal', 'Beef', 'Eggs'], 850) },
        { id: 'wl_73', name: '73kg Class', ...prePost({ foods: ['Rice (240g)', 'Beef (160g)', 'Sweet potato', 'Banana (2)'], cal: 800 }, { foods: ['Creatine', 'Caffeine', 'Energy gel', 'Banana'], cal: 190 }, ['Glucose tabs', 'Sports drink sips'], '200ml', ['Protein shake (40g)', 'Large meal', 'Beef', 'Eggs', 'Milk'], 900) },
        { id: 'wl_81', name: '81kg Class', ...prePost({ foods: ['Rice (260g)', 'Beef (180g)', 'Sweet potato', 'Banana (2)', 'Milk'], cal: 850 }, { foods: ['Creatine', 'Caffeine gel', 'Banana (2)'], cal: 210 }, ['Glucose tabs', 'Sports drink'], '250ml', ['Protein shake (50g)', 'Rice (300g)', 'Beef', 'Milk (500ml)'], 950) },
        { id: 'wl_89', name: '89kg Class', ...prePost({ foods: ['Rice (280g)', 'Beef (200g)', 'Sweet potato', 'Banana (2)'], cal: 900 }, { foods: ['Creatine', 'Caffeine', 'Energy gel (2)'], cal: 230 }, ['Glucose tabs', 'Sports drink'], '250ml', ['Protein shake (50g)', 'Large rice + beef meal', 'Milk'], 1000) },
        { id: 'wl_96', name: '96kg Class', ...prePost({ foods: ['Large rice (300g)', 'Beef (220g)', 'Sweet potato (2)', 'Banana (2)'], cal: 1000 }, { foods: ['Creatine', 'Caffeine gel', 'Energy gel (2)', 'Banana'], cal: 280 }, ['Glucose tabs', 'Sports drink', 'Salt tabs'], '300ml', ['Protein shake (60g)', 'Large meal', 'Beef', 'Rice', 'Milk'], 1100) },
        { id: 'wl_102', name: '102kg Class', ...prePost({ foods: ['Large rice (320g)', 'Beef (240g)', 'Sweet potato (2)', 'Banana (3)'], cal: 1100 }, { foods: ['Creatine', 'Caffeine gel', 'Energy gel (2)'], cal: 300 }, ['Glucose tabs', 'Sports drink'], '300ml', ['Protein shake (60g)', 'Large rice + beef', 'Eggs', 'Milk'], 1150) },
        { id: 'wl_109', name: '109kg Class', ...prePost({ foods: ['Large rice (350g)', 'Beef (260g)', 'Sweet potato (2)', 'Banana (3)', 'Juice'], cal: 1200 }, { foods: ['Creatine', 'Caffeine gel', 'Energy gel (3)'], cal: 330 }, ['Glucose tabs', 'Sports drink', 'Salt tabs'], '350ml', ['Protein shake (70g)', 'Very large meal', 'Beef', 'Rice', 'Milk'], 1250) },
        { id: 'wl_109plus', name: '+109kg Class', ...prePost({ foods: ['Very large rice (400g)', 'Beef (300g)', 'Sweet potato (3)', 'Banana (3)', 'Whole milk'], cal: 1400 }, { foods: ['Creatine', 'Caffeine gel (2)', 'Energy gel (3)', 'Banana'], cal: 380 }, ['Glucose tabs', 'Sports drink', 'Salt tabs if hot'], '400ml', ['Protein shake (80g)', 'Extremely large meal', 'Beef 350g', 'Rice 400g', 'Whole milk 600ml'], 1400) },
      ]
    },

    // ── Gymnastics ──────────────────────────────────────────────
    {
      id: 'gymnastics_artistic', name: 'Artistic Gymnastics', icon: '🤸', type: 'Gymnastics',
      events: [
        { id: 'gym_floor', name: 'Floor Exercise', ...prePost({ foods: ['Light rice (150g)', 'Chicken (120g)', 'Banana', 'Water'], cal: 480 }, { foods: ['Banana', 'Honey sachet', 'Sports drink'], cal: 150 }, ['Banana between rotations', 'Sports drink'], '200ml between events', ['Protein shake', 'Fruit', 'Yogurt', 'Recovery meal'], 580) },
        { id: 'gym_vault', name: 'Vault', ...prePost({ foods: ['Light rice (150g)', 'Chicken (120g)', 'Banana', 'OJ'], cal: 480 }, { foods: ['Banana', 'Honey'], cal: 140 }, ['Water between attempts'], '150ml between rotations', ['Protein shake', 'Banana', 'Yogurt'], 550) },
        { id: 'gym_ubar', name: 'Uneven Bars (W)', ...prePost({ foods: ['Light rice (150g)', 'Chicken (120g)', 'Banana', 'OJ'], cal: 470 }, { foods: ['Banana', 'Honey', 'Sports drink'], cal: 140 }, ['Water between events'], '150ml', ['Protein shake', 'Fruit', 'Milk'], 530) },
        { id: 'gym_hbar', name: 'Horizontal Bar (M)', ...prePost({ foods: ['Rice (160g)', 'Chicken (130g)', 'Banana', 'OJ'], cal: 500 }, { foods: ['Banana', 'Energy bar'], cal: 150 }, ['Water between events'], '200ml', ['Protein shake', 'Banana', 'Milk'], 540) },
        { id: 'gym_beam', name: 'Balance Beam (W)', ...prePost({ foods: ['Light rice (140g)', 'Chicken (120g)', 'Banana'], cal: 460 }, { foods: ['Banana', 'Honey'], cal: 130 }, ['Water sips only between events'], '150ml', ['Protein shake', 'Fruit', 'Light meal'], 520) },
        { id: 'gym_rings', name: 'Rings (M)', ...prePost({ foods: ['Rice (180g)', 'Chicken (140g)', 'Banana', 'Milk'], cal: 540 }, { foods: ['Banana', 'Energy bar'], cal: 160 }, ['Water between events'], '200ml', ['Protein shake', 'Banana', 'Eggs'], 560) },
        { id: 'gym_pbars', name: 'Parallel Bars (M)', ...prePost({ foods: ['Rice (180g)', 'Chicken (140g)', 'Banana', 'OJ'], cal: 540 }, { foods: ['Banana', 'Energy bar', 'Sports drink'], cal: 165 }, ['Water between events'], '200ml', ['Protein shake', 'Rice', 'Eggs'], 560) },
        { id: 'gym_team_all_around', name: 'Team All-Around', ...prePost({ foods: ['Rice (180g)', 'Chicken (150g)', 'Banana (2)', 'OJ'], cal: 580 }, { foods: ['Banana (2)', 'Energy gel', 'Sports drink'], cal: 200 }, ['Banana between rotations', 'Sports drink', 'Energy gels'], '300ml per rotation', ['Protein shake', 'Recovery meal', 'Fruit', 'Yogurt'], 650) },
        { id: 'gym_ind_all_around', name: 'Individual All-Around', ...prePost({ foods: ['Rice (180g)', 'Chicken (150g)', 'Banana (2)', 'OJ'], cal: 580 }, { foods: ['Banana (2)', 'Energy gel', 'Sports drink'], cal: 200 }, ['Banana between apparatus', 'Sports drink', 'Gels if needed'], '300ml', ['Protein shake', 'Recovery meal', 'Fruit', 'Yogurt'], 650) },
      ]
    },

    // ── Rhythmic Gymnastics ─────────────────────────────────────
    {
      id: 'gymnastics_rhythmic', name: 'Rhythmic Gymnastics', icon: '🎀', type: 'Gymnastics',
      events: [
        { id: 'rhythmic_ind', name: 'Individual All-Around', ...prePost({ foods: ['Light rice (130g)', 'Chicken (110g)', 'Banana', 'Water'], cal: 430 }, { foods: ['Banana', 'Honey', 'Water'], cal: 130 }, ['Water sips between routines'], '150ml between routines', ['Light protein meal', 'Fruit', 'Yogurt'], 480) },
        { id: 'rhythmic_group', name: 'Group (5 apparatus)', ...prePost({ foods: ['Light rice (130g)', 'Chicken (110g)', 'Banana'], cal: 430 }, { foods: ['Banana', 'Honey'], cal: 120 }, ['Water between routines'], '150ml', ['Protein shake', 'Banana', 'Light meal'], 470) },
      ]
    },

    // ── Trampoline ──────────────────────────────────────────────
    {
      id: 'trampoline', name: 'Trampoline Gymnastics', icon: '🔁', type: 'Gymnastics',
      events: [
        { id: 'trampoline_ind', name: 'Individual Trampoline', ...prePost({ foods: ['Rice (160g)', 'Chicken (130g)', 'Banana', 'OJ'], cal: 500 }, { foods: ['Banana', 'Energy bar'], cal: 150 }, ['Water between routines'], '200ml between rounds', ['Protein shake', 'Banana', 'Rice', 'Eggs'], 520) },
        { id: 'trampoline_synchro', name: 'Synchronized Trampoline', ...prePost({ foods: ['Rice (160g)', 'Chicken (130g)', 'Banana', 'OJ'], cal: 500 }, { foods: ['Banana', 'Energy bar'], cal: 150 }, ['Water between routines'], '200ml', ['Protein shake', 'Banana', 'Light meal'], 520) },
      ]
    },

    // ── Indoor Athletics ────────────────────────────────────────
    {
      id: 'indoor_athletics', name: 'Indoor Athletics', icon: '🏟️', type: 'Indoor',
      events: [
        { id: 'indoor_60m', name: '60m Sprint (Indoor)', ...prePost({ foods: ['Rice (200g)', 'Chicken (150g)', 'Banana', 'Sports drink'], cal: 550 }, { foods: ['Banana', 'Energy gel'], cal: 150 }, ['Water between heats', 'Glucose tabs'], 'Hydrate between rounds', ['Protein shake', 'Banana', 'Rice cakes'], 450) },
        { id: 'indoor_200m', name: '200m (Indoor)', ...prePost({ foods: ['Rice (200g)', 'Chicken', 'Banana', 'OJ'], cal: 580 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 180 }, ['Sports drink between rounds'], '250ml', ['Protein shake', 'Rice', 'Banana', 'Coconut water'], 500) },
        { id: 'indoor_400m', name: '400m (Indoor)', ...prePost({ foods: ['Pasta (200g)', 'Chicken', 'Banana', 'Toast'], cal: 640 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 210 }, ['Sports drink between rounds'], '300ml', ['Protein shake', 'Pasta', 'Egg', 'Fruit'], 580) },
        { id: 'indoor_800m', name: '800m (Indoor)', ...prePost({ foods: ['Rice (200g)', 'Salmon', 'Sweet potato', 'Banana'], cal: 620 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 200 }, ['Sports drink between rounds'], '300ml', ['Recovery shake', 'Rice', 'Chicken', 'Fruit'], 600) },
        { id: 'indoor_1500m', name: '1500m (Indoor)', ...prePost({ foods: ['Pasta (250g)', 'Chicken', 'Banana (2)', 'OJ'], cal: 700 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 220 }, ['Gel if needed', 'Sports drink'], '400ml', ['Recovery shake', 'Pasta', 'Tuna', 'Coconut water'], 650) },
        { id: 'indoor_3000m', name: '3000m (Indoor)', ...prePost({ foods: ['Oatmeal (150g)', 'Banana (2)', 'Eggs', 'OJ'], cal: 720 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 240 }, ['Gels if multiple rounds', 'Sports drink'], '400ml', ['Pasta', 'Recovery shake', 'Coconut water'], 700) },
        { id: 'indoor_60m_hurdles', name: '60m Hurdles (Indoor)', ...prePost({ foods: ['Rice (200g)', 'Chicken', 'Banana', 'Sports drink'], cal: 560 }, { foods: ['Banana', 'Energy gel'], cal: 160 }, ['Water between heats'], 'Hydrate', ['Protein shake', 'Rice', 'Eggs'], 480) },
        { id: 'indoor_hj', name: 'High Jump (Indoor)', ...prePost({ foods: ['Rice (200g)', 'Chicken', 'Salad', 'Banana'], cal: 580 }, { foods: ['Banana', 'Energy bar'], cal: 170 }, ['Water between attempts'], '150ml', ['Protein shake', 'Light meal', 'Fruit'], 520) },
        { id: 'indoor_pv', name: 'Pole Vault (Indoor)', ...prePost({ foods: ['Rice (200g)', 'Chicken', 'Banana', 'Sports drink'], cal: 580 }, { foods: ['Banana', 'Energy bar', 'Caffeine'], cal: 175 }, ['Water between attempts'], 'Hydrate', ['Protein shake', 'Rice', 'Eggs', 'Fruit'], 530) },
        { id: 'indoor_lj', name: 'Long Jump (Indoor)', ...prePost({ foods: ['Pasta (200g)', 'Chicken', 'Banana', 'Sports drink'], cal: 600 }, { foods: ['Banana', 'Energy bar'], cal: 180 }, ['Water between jumps'], 'Sip water', ['Protein shake', 'Banana', 'Recovery meal'], 550) },
        { id: 'indoor_tj', name: 'Triple Jump (Indoor)', ...prePost({ foods: ['Pasta (200g)', 'Chicken', 'Banana', 'OJ'], cal: 620 }, { foods: ['Energy gel', 'Banana'], cal: 180 }, ['Water between rounds'], 'Sip water', ['Protein shake', 'Banana', 'Rice', 'Eggs'], 560) },
        { id: 'indoor_shot', name: 'Shot Put (Indoor)', ...prePost({ foods: ['Rice (250g)', 'Beef (150g)', 'Banana', 'Juice'], cal: 750 }, { foods: ['Energy bar', 'Banana', 'Sports drink'], cal: 200 }, ['Water between throws'], '150ml', ['Protein shake', 'Meat', 'Rice', 'Vegetables'], 850) },
        { id: 'indoor_pent', name: 'Pentathlon (Indoor)', ...prePost({ foods: ['Oatmeal (200g)', 'Eggs (2)', 'Banana (2)', 'Toast', 'OJ'], cal: 880 }, { foods: ['Energy gel (2)', 'Banana', 'Sports drink'], cal: 290 }, ['Gels between events', 'Sports drink'], '500ml per hour', ['Recovery shake', 'Pasta', 'Chicken', 'Fruit'], 950) },
        { id: '4x400m_relay_indoor', name: '4×400m Relay (Indoor)', ...prePost({ foods: ['Pasta (200g)', 'Chicken', 'Banana (2)', 'Toast'], cal: 650 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 220 }, ['Sports drink between rounds'], '300ml', ['Protein shake', 'Rice', 'Eggs', 'Fruit'], 600) },
      ]
    },

    // ── Boxing ──────────────────────────────────────────────────
    {
      id: 'boxing', name: 'Boxing', icon: '🥊', type: 'Combat',
      events: [
        { id: 'boxing_flyweight', name: 'Flyweight (–52kg)', ...prePost({ foods: ['Rice (180g)', 'Chicken (130g)', 'Banana', 'Sports drink'], cal: 620 }, { foods: ['Banana', 'Energy gel', 'Caffeine'], cal: 170 }, ['Sports drink between rounds', 'Glucose tabs'], '200ml between rounds', ['Protein shake (35g)', 'Rice', 'Chicken', 'Fruit juice'], 700) },
        { id: 'boxing_bantam', name: 'Bantamweight (–56kg)', ...prePost({ foods: ['Rice (190g)', 'Chicken (140g)', 'Banana', 'OJ'], cal: 650 }, { foods: ['Banana', 'Energy gel', 'Caffeine'], cal: 180 }, ['Sports drink between rounds'], '200ml', ['Protein shake', 'Rice', 'Eggs', 'Fruit'], 720) },
        { id: 'boxing_feather', name: 'Featherweight (–57kg)', ...prePost({ foods: ['Rice (190g)', 'Chicken (140g)', 'Banana', 'OJ'], cal: 660 }, { foods: ['Energy gel', 'Banana'], cal: 185 }, ['Sports drink between rounds'], '200ml', ['Protein shake', 'Rice', 'Chicken'], 730) },
        { id: 'boxing_light', name: 'Lightweight (–63.5kg)', ...prePost({ foods: ['Rice (200g)', 'Chicken (150g)', 'Banana', 'Sports drink'], cal: 700 }, { foods: ['Energy gel', 'Banana', 'Caffeine'], cal: 195 }, ['Sports drink between rounds'], '250ml', ['Protein shake', 'Rice', 'Eggs', 'Fruit'], 760) },
        { id: 'boxing_welter', name: 'Welterweight (–69kg)', ...prePost({ foods: ['Rice (220g)', 'Chicken (160g)', 'Banana', 'OJ'], cal: 740 }, { foods: ['Energy gel', 'Banana', 'Caffeine'], cal: 210 }, ['Sports drink between rounds'], '250ml', ['Protein shake (40g)', 'Rice', 'Chicken', 'Juice'], 800) },
        { id: 'boxing_middle', name: 'Middleweight (–75kg)', ...prePost({ foods: ['Rice (240g)', 'Chicken (170g)', 'Banana', 'Sports drink'], cal: 790 }, { foods: ['Energy gel', 'Banana (2)'], cal: 220 }, ['Sports drink between rounds'], '300ml', ['Protein shake (40g)', 'Rice', 'Beef', 'Fruit'], 850) },
        { id: 'boxing_heavy', name: 'Heavyweight (–92kg)', ...prePost({ foods: ['Rice (280g)', 'Beef (180g)', 'Sweet potato', 'Banana (2)'], cal: 900 }, { foods: ['Energy gel (2)', 'Banana', 'Caffeine'], cal: 260 }, ['Sports drink between rounds', 'Salt tabs'], '300ml', ['Protein shake (50g)', 'Large meal', 'Beef', 'Rice'], 950) },
        { id: 'boxing_super_heavy', name: 'Super Heavyweight (+92kg)', ...prePost({ foods: ['Large rice (320g)', 'Beef (220g)', 'Sweet potato', 'Banana (2)', 'OJ'], cal: 1050 }, { foods: ['Energy gel (2)', 'Banana (2)', 'Caffeine gel'], cal: 300 }, ['Sports drink between rounds', 'Salt tabs'], '350ml', ['Protein shake (60g)', 'Very large meal', 'Beef', 'Rice', 'Milk'], 1050) },
      ]
    },

    // ── Wrestling ───────────────────────────────────────────────
    {
      id: 'wrestling', name: 'Wrestling', icon: '🤼', type: 'Combat',
      events: [
        { id: 'wrestling_57', name: 'Freestyle 57kg', ...prePost({ foods: ['Rice (200g)', 'Chicken (150g)', 'Banana', 'Sports drink'], cal: 680 }, { foods: ['Energy gel', 'Banana', 'Caffeine'], cal: 190 }, ['Sports drink between bouts', 'Salt tabs'], '250ml', ['Protein shake', 'Rice', 'Chicken', 'Fruit'], 750) },
        { id: 'wrestling_65', name: 'Freestyle 65kg', ...prePost({ foods: ['Rice (220g)', 'Chicken (160g)', 'Banana', 'OJ'], cal: 720 }, { foods: ['Energy gel', 'Banana'], cal: 200 }, ['Sports drink between bouts'], '250ml', ['Protein shake', 'Rice', 'Beef', 'Fruit'], 800) },
        { id: 'wrestling_74', name: 'Freestyle 74kg', ...prePost({ foods: ['Rice (240g)', 'Beef (160g)', 'Banana', 'Sports drink'], cal: 780 }, { foods: ['Energy gel', 'Banana (2)'], cal: 220 }, ['Sports drink between bouts', 'Salt tabs'], '300ml', ['Protein shake (40g)', 'Rice', 'Beef', 'Juice'], 860) },
        { id: 'wrestling_86', name: 'Freestyle 86kg', ...prePost({ foods: ['Rice (260g)', 'Beef (180g)', 'Sweet potato', 'Banana'], cal: 860 }, { foods: ['Energy gel', 'Banana (2)', 'Caffeine'], cal: 250 }, ['Sports drink', 'Salt tabs'], '300ml', ['Protein shake (50g)', 'Large meal', 'Beef', 'Rice'], 920) },
        { id: 'wrestling_125', name: 'Freestyle 125kg', ...prePost({ foods: ['Large rice (320g)', 'Beef (220g)', 'Sweet potato', 'Banana (2)'], cal: 1050 }, { foods: ['Energy gel (2)', 'Banana (2)'], cal: 300 }, ['Sports drink', 'Salt tabs if hot'], '350ml', ['Protein shake (60g)', 'Very large meal', 'Beef', 'Rice', 'Milk'], 1100) },
        { id: 'wrestling_ggr_60', name: 'Greco-Roman 60kg', ...prePost({ foods: ['Rice (200g)', 'Chicken (150g)', 'Banana', 'Sports drink'], cal: 680 }, { foods: ['Energy gel', 'Banana', 'Caffeine'], cal: 190 }, ['Sports drink between bouts'], '250ml', ['Protein shake', 'Rice', 'Chicken', 'Fruit'], 750) },
        { id: 'wrestling_ggr_130', name: 'Greco-Roman 130kg', ...prePost({ foods: ['Large rice (340g)', 'Beef (240g)', 'Sweet potato', 'Banana (2)', 'Milk'], cal: 1100 }, { foods: ['Energy gel (2)', 'Banana (2)', 'Caffeine'], cal: 320 }, ['Sports drink', 'Salt tabs'], '400ml', ['Protein shake (70g)', 'Very large meal', 'Beef', 'Rice', 'Full milk'], 1150) },
      ]
    },

    // ── Judo ────────────────────────────────────────────────────
    {
      id: 'judo', name: 'Judo', icon: '🥋', type: 'Combat',
      events: [
        { id: 'judo_60', name: 'Judo –60kg', ...prePost({ foods: ['Rice (180g)', 'Chicken (130g)', 'Banana', 'Sports drink'], cal: 640 }, { foods: ['Energy gel', 'Banana', 'Caffeine'], cal: 180 }, ['Sports drink between bouts', 'Salt tabs'], '250ml', ['Protein shake', 'Rice', 'Chicken', 'Fruit'], 720) },
        { id: 'judo_66', name: 'Judo –66kg', ...prePost({ foods: ['Rice (200g)', 'Chicken (140g)', 'Banana', 'OJ'], cal: 670 }, { foods: ['Energy gel', 'Banana'], cal: 190 }, ['Sports drink between bouts'], '250ml', ['Protein shake', 'Rice', 'Eggs', 'Banana'], 740) },
        { id: 'judo_73', name: 'Judo –73kg', ...prePost({ foods: ['Rice (220g)', 'Chicken (150g)', 'Banana', 'Sports drink'], cal: 720 }, { foods: ['Energy gel', 'Banana'], cal: 200 }, ['Sports drink between bouts'], '250ml', ['Protein shake', 'Rice', 'Chicken', 'Fruit'], 790) },
        { id: 'judo_81', name: 'Judo –81kg', ...prePost({ foods: ['Rice (240g)', 'Chicken (160g)', 'Banana', 'OJ'], cal: 760 }, { foods: ['Energy gel', 'Banana (2)'], cal: 220 }, ['Sports drink', 'Salt tabs'], '300ml', ['Protein shake (40g)', 'Rice', 'Beef', 'Juice'], 840) },
        { id: 'judo_90', name: 'Judo –90kg', ...prePost({ foods: ['Rice (260g)', 'Beef (160g)', 'Sweet potato', 'Banana'], cal: 840 }, { foods: ['Energy gel', 'Banana (2)', 'Caffeine'], cal: 250 }, ['Sports drink', 'Salt tabs'], '300ml', ['Protein shake (50g)', 'Rice', 'Beef', 'Milk'], 900) },
        { id: 'judo_100', name: 'Judo –100kg', ...prePost({ foods: ['Rice (280g)', 'Beef (180g)', 'Sweet potato', 'Banana (2)'], cal: 920 }, { foods: ['Energy gel (2)', 'Banana', 'Caffeine'], cal: 270 }, ['Sports drink', 'Salt tabs'], '350ml', ['Protein shake (50g)', 'Large meal', 'Beef', 'Rice'], 970) },
        { id: 'judo_100plus', name: 'Judo +100kg', ...prePost({ foods: ['Large rice (320g)', 'Beef (220g)', 'Sweet potato', 'Banana (2)', 'OJ'], cal: 1050 }, { foods: ['Energy gel (2)', 'Banana (2)', 'Caffeine'], cal: 310 }, ['Sports drink', 'Salt tabs if hot'], '400ml', ['Protein shake (60g)', 'Very large meal', 'Beef', 'Rice', 'Milk'], 1100) },
      ]
    },

    // ── Shooting ────────────────────────────────────────────────
    {
      id: 'shooting', name: 'Shooting', icon: '🎯', type: 'Precision',
      events: [
        { id: 'shoot_10m_air_rifle', name: '10m Air Rifle', ...prePost({ foods: ['Light rice (150g)', 'Chicken (120g)', 'Banana', 'Water'], cal: 480 }, { foods: ['Small banana', 'Water', 'Light snack'], cal: 120 }, ['Water sips only', 'Avoid caffeine if shaky'], 'Minimal fluid', ['Light protein meal', 'Banana', 'Yogurt'], 500) },
        { id: 'shoot_10m_air_pistol', name: '10m Air Pistol', ...prePost({ foods: ['Light rice (150g)', 'Chicken (120g)', 'Banana'], cal: 480 }, { foods: ['Small banana', 'Water'], cal: 110 }, ['Water sips only'], 'Minimal fluid — avoid bloating', ['Light protein meal', 'Fruit', 'Yogurt'], 480) },
        { id: 'shoot_25m_pistol', name: '25m Rapid Fire Pistol', ...prePost({ foods: ['Light rice (150g)', 'Chicken (120g)', 'Banana'], cal: 490 }, { foods: ['Banana', 'Water'], cal: 115 }, ['Water only'], '200ml max', ['Protein shake', 'Banana', 'Light meal'], 490) },
        { id: 'shoot_50m_rifle', name: '50m Rifle 3 Positions', ...prePost({ foods: ['Light rice (150g)', 'Chicken (130g)', 'Banana', 'Water'], cal: 500 }, { foods: ['Banana', 'Small snack', 'Water'], cal: 120 }, ['Water sips'], 'Minimal fluid', ['Light meal', 'Fruit', 'Yogurt'], 500) },
        { id: 'shoot_trap', name: 'Trap (Shotgun)', ...prePost({ foods: ['Rice (180g)', 'Chicken (140g)', 'Banana', 'OJ'], cal: 560 }, { foods: ['Banana', 'Energy bar', 'Water'], cal: 150 }, ['Water between stations'], '250ml', ['Protein shake', 'Rice', 'Eggs', 'Fruit'], 580) },
        { id: 'shoot_skeet', name: 'Skeet (Shotgun)', ...prePost({ foods: ['Rice (180g)', 'Chicken (140g)', 'Banana', 'OJ'], cal: 560 }, { foods: ['Banana', 'Energy bar', 'Water'], cal: 150 }, ['Water between stations'], '250ml', ['Protein shake', 'Rice', 'Eggs', 'Fruit'], 580) },
      ]
    },

    // ── Archery ─────────────────────────────────────────────────
    {
      id: 'archery', name: 'Archery', icon: '🏹', type: 'Precision',
      events: [
        { id: 'archery_recurve_ind', name: 'Recurve Individual', ...prePost({ foods: ['Rice (180g)', 'Chicken (130g)', 'Banana', 'Water'], cal: 520 }, { foods: ['Banana', 'Small snack', 'Water'], cal: 140 }, ['Water between ends', 'Small snack at break'], '300ml per session', ['Protein shake', 'Banana', 'Light meal', 'Yogurt'], 560) },
        { id: 'archery_compound_ind', name: 'Compound Individual', ...prePost({ foods: ['Rice (180g)', 'Chicken (130g)', 'Banana', 'Water'], cal: 520 }, { foods: ['Banana', 'Snack bar', 'Water'], cal: 140 }, ['Water between ends'], '300ml', ['Protein shake', 'Banana', 'Light meal'], 560) },
        { id: 'archery_team', name: 'Team Recurve/Compound', ...prePost({ foods: ['Rice (180g)', 'Chicken (140g)', 'Banana (2)', 'OJ'], cal: 560 }, { foods: ['Banana', 'Energy bar', 'Sports drink'], cal: 160 }, ['Water between ends', 'Snack at break'], '350ml', ['Protein shake', 'Rice', 'Eggs', 'Fruit'], 590) },
        { id: 'archery_mixed_team', name: 'Mixed Team', ...prePost({ foods: ['Rice (180g)', 'Chicken (140g)', 'Banana', 'OJ'], cal: 550 }, { foods: ['Banana', 'Energy bar', 'Water'], cal: 150 }, ['Water between ends'], '300ml', ['Protein shake', 'Banana', 'Light meal'], 570) },
      ]
    },

    // ── Fencing ─────────────────────────────────────────────────
    {
      id: 'fencing', name: 'Fencing', icon: '🤺', type: 'Combat',
      events: [
        { id: 'fencing_epee_ind', name: 'Épée Individual', ...prePost({ foods: ['Rice (200g)', 'Chicken (150g)', 'Banana', 'Sports drink'], cal: 650 }, { foods: ['Energy gel', 'Banana', 'Caffeine'], cal: 185 }, ['Sports drink between bouts', 'Snack bar'], '300ml', ['Protein shake', 'Rice', 'Chicken', 'Fruit'], 720) },
        { id: 'fencing_foil_ind', name: 'Foil Individual', ...prePost({ foods: ['Rice (200g)', 'Chicken (150g)', 'Banana', 'Sports drink'], cal: 650 }, { foods: ['Energy gel', 'Banana', 'Caffeine'], cal: 185 }, ['Sports drink between bouts'], '300ml', ['Protein shake', 'Rice', 'Chicken', 'Fruit'], 720) },
        { id: 'fencing_sabre_ind', name: 'Sabre Individual', ...prePost({ foods: ['Rice (200g)', 'Chicken (150g)', 'Banana', 'Sports drink'], cal: 660 }, { foods: ['Energy gel', 'Banana', 'Caffeine'], cal: 190 }, ['Sports drink between bouts', 'Glucose tabs'], '300ml', ['Protein shake', 'Rice', 'Eggs', 'Fruit'], 730) },
        { id: 'fencing_team', name: 'Team Events (all weapons)', ...prePost({ foods: ['Rice (220g)', 'Chicken (160g)', 'Banana (2)', 'OJ'], cal: 720 }, { foods: ['Energy gel (2)', 'Banana', 'Sports drink'], cal: 230 }, ['Sports drink between bouts', 'Snack bar'], '350ml', ['Protein shake (40g)', 'Rice', 'Chicken', 'Juice'], 800) },
      ]
    },

    // ── Taekwondo ───────────────────────────────────────────────
    {
      id: 'taekwondo', name: 'Taekwondo', icon: '🦵', type: 'Combat',
      events: [
        { id: 'tkd_49', name: '–49kg (W)', ...prePost({ foods: ['Light rice (160g)', 'Chicken (120g)', 'Banana', 'Sports drink'], cal: 580 }, { foods: ['Energy gel', 'Banana', 'Caffeine'], cal: 165 }, ['Sports drink between rounds'], '200ml', ['Protein shake', 'Rice', 'Chicken', 'Fruit'], 660) },
        { id: 'tkd_58', name: '–58kg (W)', ...prePost({ foods: ['Rice (180g)', 'Chicken (130g)', 'Banana', 'OJ'], cal: 620 }, { foods: ['Energy gel', 'Banana'], cal: 175 }, ['Sports drink between bouts'], '220ml', ['Protein shake', 'Rice', 'Eggs', 'Fruit'], 700) },
        { id: 'tkd_68', name: '–68kg (W)', ...prePost({ foods: ['Rice (200g)', 'Chicken (140g)', 'Banana', 'Sports drink'], cal: 670 }, { foods: ['Energy gel', 'Banana', 'Caffeine'], cal: 190 }, ['Sports drink between bouts'], '250ml', ['Protein shake', 'Rice', 'Chicken', 'Juice'], 750) },
        { id: 'tkd_80', name: '–80kg (M)', ...prePost({ foods: ['Rice (230g)', 'Chicken (160g)', 'Banana (2)', 'OJ'], cal: 740 }, { foods: ['Energy gel', 'Banana (2)', 'Caffeine'], cal: 220 }, ['Sports drink between bouts', 'Salt tabs'], '280ml', ['Protein shake (40g)', 'Rice', 'Beef', 'Fruit'], 830) },
        { id: 'tkd_80plus', name: '+80kg (M)', ...prePost({ foods: ['Rice (260g)', 'Beef (170g)', 'Sweet potato', 'Banana (2)'], cal: 850 }, { foods: ['Energy gel (2)', 'Banana', 'Caffeine'], cal: 260 }, ['Sports drink', 'Salt tabs'], '300ml', ['Protein shake (50g)', 'Large meal', 'Beef', 'Rice'], 920) },
      ]
    },

    // ── Volleyball (Beach) ──────────────────────────────────────
    {
      id: 'beach_volleyball', name: 'Beach Volleyball', icon: '🏐', type: 'Team',
      events: [
        { id: 'beach_vb_match', name: 'Beach Volleyball Match', ...prePost({ foods: ['Pasta (250g)', 'Chicken (160g)', 'Banana (2)', 'Sports drink'], cal: 780 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 230 }, ['Sports drink every changeover', 'Banana', 'Salt tabs in heat'], '600ml per hour', ['Recovery shake', 'Pasta', 'Chicken', 'Coconut water'], 850) },
      ]
    },

    // ── Football (Soccer) ───────────────────────────────────────
    {
      id: 'football', name: 'Football (Soccer)', icon: '⚽', type: 'Team',
      events: [
        { id: 'football_match', name: 'Football Match (90 min)', ...prePost({ foods: ['Pasta (300g)', 'Chicken (180g)', 'Banana (2)', 'Toast', 'OJ'], cal: 850, hydration: '600ml water' }, { foods: ['Energy gel', 'Banana', 'Sports drink', 'Dates'], cal: 280, hydration: '300ml sports drink' }, ['Sports drink at halftime', 'Energy gel if needed', 'Banana at break', 'Water every 15 min'], '500-700ml per hour', ['Pasta', 'Chicken', 'Recovery shake', 'Coconut water', 'Banana'], 950, 'Within 30 min') },
        { id: 'football_extra_time', name: 'Match + Extra Time (120 min)', ...prePost({ foods: ['Large pasta (350g)', 'Chicken (200g)', 'Banana (2)', 'Toast', 'OJ'], cal: 950 }, { foods: ['Energy gel (2)', 'Banana (2)', 'Sports drink', 'Electrolyte tab'], cal: 350 }, ['Energy gel every 30min', 'Sports drink halftime + 90min', 'Banana', 'Salt tabs'], '700ml per hour', ['Large recovery meal', 'Pasta', 'Protein shake', 'Coconut water', 'Electrolytes'], 1050) },
        { id: 'football_penalties', name: 'Penalty Shootout', ...prePost({ foods: ['Same as match prep'], cal: 850 }, { foods: ['Glucose tabs', 'Small banana', 'Sports drink (sips)'], cal: 100 }, ['Small glucose tabs', 'Water sips only'], 'Sip water — avoid bloating', ['Full recovery meal post match'], 950) },
      ]
    },

    // ── Handball ────────────────────────────────────────────────
    {
      id: 'handball', name: 'Handball', icon: '🤾', type: 'Team',
      events: [
        { id: 'handball_match', name: 'Handball Match (60 min)', ...prePost({ foods: ['Pasta (280g)', 'Chicken (170g)', 'Banana (2)', 'Toast', 'Sports drink'], cal: 800 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 250 }, ['Sports drink at halftime', 'Energy gel if needed', 'Banana', 'Water every timeout'], '500-600ml per hour', ['Pasta', 'Chicken', 'Recovery shake', 'Coconut water', 'Banana'], 900) },
        { id: 'handball_tournament', name: 'Tournament Day (2 matches)', ...prePost({ foods: ['Large pasta (350g)', 'Chicken (200g)', 'Banana (3)', 'Toast', 'OJ'], cal: 1000 }, { foods: ['Energy gel (2)', 'Banana (2)', 'Sports drink', 'Rice cakes'], cal: 350 }, ['Sports drink halftime', 'Energy gels', 'Banana between matches', 'Electrolyte tabs'], '700ml per hour', ['Quick recovery: shake + banana + rice', 'Full meal between matches', 'Coconut water'], 1000) },
      ]
    },

    // ── Rugby ───────────────────────────────────────────────────
    {
      id: 'rugby', name: 'Rugby', icon: '🏉', type: 'Team',
      events: [
        { id: 'rugby_7s', name: 'Rugby Sevens (14 min match)', ...prePost({ foods: ['Rice (200g)', 'Chicken (160g)', 'Banana', 'Sports drink'], cal: 650 }, { foods: ['Energy gel', 'Banana', 'Caffeine', 'Sports drink'], cal: 200 }, ['Sports drink between matches', 'Glucose tabs', 'Banana', 'Salt tabs'], '400ml between matches', ['Protein shake', 'Rice', 'Chicken', 'Coconut water', 'Banana'], 700) },
        { id: 'rugby_7s_tournament', name: 'Rugby 7s Tournament (3+ matches)', ...prePost({ foods: ['Large pasta (300g)', 'Chicken (180g)', 'Banana (2)', 'Toast', 'OJ'], cal: 900 }, { foods: ['Energy gel (2)', 'Banana (2)', 'Sports drink', 'Caffeine gel'], cal: 320 }, ['Sports drink between every match', 'Energy gels', 'Banana', 'Salt tabs', 'Glucose tabs'], '600ml per match', ['Rapid recovery shake', 'Rice + chicken between rounds', 'Electrolytes', 'Banana'], 900) },
        { id: 'rugby_union_15s', name: 'Rugby Union (80 min)', ...prePost({ foods: ['Large pasta (320g)', 'Beef/Chicken (200g)', 'Banana (2)', 'Toast', 'OJ'], cal: 950 }, { foods: ['Energy gel (2)', 'Banana', 'Sports drink', 'Caffeine'], cal: 300 }, ['Sports drink halftime', 'Energy gels every 30min', 'Banana', 'Salt tabs in heat'], '600-700ml per hour', ['Large recovery meal', 'Pasta', 'Protein shake (40g)', 'Coconut water', 'Banana'], 1050) },
      ]
    },

    // ── Water Polo ──────────────────────────────────────────────
    {
      id: 'water_polo', name: 'Water Polo', icon: '🤽', type: 'Team',
      events: [
        { id: 'water_polo_match', name: 'Water Polo Match (32 min)', ...prePost({ foods: ['Pasta (260g)', 'Chicken (160g)', 'Banana (2)', 'OJ'], cal: 780 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 230 }, ['Sports drink at quarter breaks', 'Banana', 'Energy gels', 'Water between periods'], '500ml per hour', ['Recovery shake', 'Pasta', 'Chicken', 'Coconut water', 'Fruit'], 850) },
        { id: 'water_polo_tournament', name: 'Tournament Day (2 matches)', ...prePost({ foods: ['Large pasta (320g)', 'Chicken (190g)', 'Banana (3)', 'Toast', 'OJ'], cal: 950 }, { foods: ['Energy gel (2)', 'Banana (2)', 'Sports drink', 'Electrolyte tab'], cal: 340 }, ['Sports drink every break', 'Energy gels', 'Banana between matches'], '700ml per hour', ['Quick recovery shake + banana', 'Rice + chicken between matches', 'Coconut water', 'Electrolytes'], 1000) },
      ]
    },

    // ── Hockey (Field) ──────────────────────────────────────────
    {
      id: 'field_hockey', name: 'Field Hockey', icon: '🏑', type: 'Team',
      events: [
        { id: 'hockey_match', name: 'Field Hockey Match (60 min)', ...prePost({ foods: ['Pasta (280g)', 'Chicken (170g)', 'Banana (2)', 'Toast', 'Sports drink'], cal: 800 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 250 }, ['Sports drink at halftime', 'Energy gel if needed', 'Banana', 'Water every quarter'], '500-600ml per hour', ['Pasta', 'Chicken', 'Recovery shake', 'Coconut water', 'Banana'], 900) },
        { id: 'hockey_tournament', name: 'Tournament Day (2 matches)', ...prePost({ foods: ['Large pasta (340g)', 'Chicken (200g)', 'Banana (2)', 'Toast', 'OJ'], cal: 1000 }, { foods: ['Energy gel (2)', 'Banana (2)', 'Sports drink', 'Electrolyte tab'], cal: 340 }, ['Sports drink every break', 'Energy gels', 'Banana between matches', 'Salt tabs in heat'], '700ml per hour', ['Quick recovery shake', 'Rice + chicken between matches', 'Coconut water'], 1000) },
      ]
    },

    // ── Badminton ───────────────────────────────────────────────
    {
      id: 'badminton', name: 'Badminton', icon: '🏸', type: 'Racket',
      events: [
        { id: 'badminton_singles', name: 'Singles Match (best of 3)', ...prePost({ foods: ['Rice (220g)', 'Chicken (160g)', 'Banana', 'Sports drink'], cal: 700 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 200 }, ['Sports drink every changeover', 'Banana between games', 'Glucose tabs'], '400ml per hour', ['Protein shake', 'Rice', 'Chicken', 'Banana', 'Coconut water'], 750) },
        { id: 'badminton_doubles', name: 'Doubles Match (best of 3)', ...prePost({ foods: ['Rice (220g)', 'Chicken (160g)', 'Banana', 'Sports drink'], cal: 700 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 200 }, ['Sports drink changeover', 'Banana between games'], '400ml per hour', ['Protein shake', 'Rice', 'Chicken', 'Banana'], 730) },
        { id: 'badminton_mixed_doubles', name: 'Mixed Doubles', ...prePost({ foods: ['Rice (220g)', 'Chicken (160g)', 'Banana', 'Sports drink'], cal: 700 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 200 }, ['Sports drink changeover', 'Glucose tabs'], '400ml per hour', ['Protein shake', 'Rice', 'Chicken', 'Fruit'], 730) },
        { id: 'badminton_tournament', name: 'Tournament Day (3+ matches)', ...prePost({ foods: ['Large pasta (300g)', 'Chicken (180g)', 'Banana (2)', 'Toast', 'OJ'], cal: 900 }, { foods: ['Energy gel (2)', 'Banana (2)', 'Sports drink', 'Dates'], cal: 320 }, ['Sports drink every changeover', 'Energy gels', 'Banana between matches', 'Electrolyte tabs'], '600ml per hour', ['Quick recovery shake + banana', 'Rice + chicken between matches', 'Coconut water'], 900) },
      ]
    },

    // ── Table Tennis ────────────────────────────────────────────
    {
      id: 'table_tennis', name: 'Table Tennis', icon: '🏓', type: 'Racket',
      events: [
        { id: 'tt_singles', name: 'Singles (best of 7 games)', ...prePost({ foods: ['Rice (200g)', 'Chicken (150g)', 'Banana', 'OJ'], cal: 650 }, { foods: ['Banana', 'Energy bar', 'Sports drink'], cal: 180 }, ['Sports drink between games', 'Banana if long match', 'Water sips'], '300ml per hour', ['Protein shake', 'Rice', 'Chicken', 'Banana', 'Fruit'], 700) },
        { id: 'tt_doubles', name: 'Doubles (best of 5 games)', ...prePost({ foods: ['Rice (200g)', 'Chicken (150g)', 'Banana', 'Sports drink'], cal: 640 }, { foods: ['Banana', 'Energy bar'], cal: 170 }, ['Sports drink between games', 'Water sips'], '300ml per hour', ['Protein shake', 'Rice', 'Chicken', 'Banana'], 680) },
        { id: 'tt_team', name: 'Team Event (multiple singles+doubles)', ...prePost({ foods: ['Pasta (250g)', 'Chicken (170g)', 'Banana (2)', 'OJ'], cal: 750 }, { foods: ['Energy gel', 'Banana', 'Sports drink', 'Dates'], cal: 230 }, ['Sports drink between matches', 'Banana', 'Energy gels for long day'], '400ml per hour', ['Recovery shake', 'Pasta', 'Chicken', 'Coconut water', 'Fruit'], 800) },
        { id: 'tt_tournament', name: 'Tournament Day (4+ matches)', ...prePost({ foods: ['Large pasta (300g)', 'Chicken (180g)', 'Banana (2)', 'Toast', 'OJ'], cal: 880 }, { foods: ['Energy gel (2)', 'Banana (2)', 'Sports drink', 'Dates'], cal: 300 }, ['Sports drink between every match', 'Banana', 'Energy gels', 'Snack bar between rounds'], '500ml per hour', ['Quick recovery shake + banana', 'Rice + chicken between rounds', 'Coconut water'], 880) },
      ]
    },

    // ── Volleyball (Indoor) ─────────────────────────────────────
    {
      id: 'indoor_volleyball', name: 'Volleyball (Indoor)', icon: '🏐', type: 'Team',
      events: [
        { id: 'volleyball_match', name: 'Volleyball Match (best of 5)', ...prePost({ foods: ['Pasta (270g)', 'Chicken (160g)', 'Banana (2)', 'Sports drink'], cal: 780 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 220 }, ['Sports drink every set break', 'Banana between sets', 'Energy gel if 5 sets'], '500ml per hour', ['Protein shake', 'Pasta', 'Chicken', 'Coconut water', 'Banana'], 850) },
        { id: 'volleyball_tournament', name: 'Tournament Day (2 matches)', ...prePost({ foods: ['Large pasta (330g)', 'Chicken (190g)', 'Banana (2)', 'Toast', 'OJ'], cal: 950 }, { foods: ['Energy gel (2)', 'Banana (2)', 'Sports drink', 'Rice cakes'], cal: 330 }, ['Sports drink every set break', 'Energy gels', 'Banana between matches'], '700ml per hour', ['Quick recovery shake', 'Rice + chicken between matches', 'Coconut water', 'Electrolytes'], 1000) },
      ]
    },

    // ── Basketball ──────────────────────────────────────────────
    {
      id: 'basketball', name: 'Basketball', icon: '🏀', type: 'Team',
      events: [
        { id: 'basketball_match', name: 'Basketball Game (40 min)', ...prePost({ foods: ['Pasta (280g)', 'Chicken (170g)', 'Banana (2)', 'Toast', 'OJ'], cal: 820 }, { foods: ['Energy gel', 'Banana', 'Sports drink', 'Dates'], cal: 260 }, ['Sports drink every timeout + halftime', 'Banana at quarter breaks', 'Energy gels', 'Salt tabs'], '600ml per hour', ['Protein shake', 'Pasta', 'Chicken', 'Coconut water', 'Banana'], 900) },
        { id: 'basketball_3x3', name: '3×3 Basketball (10 min game)', ...prePost({ foods: ['Rice (200g)', 'Chicken (150g)', 'Banana', 'Sports drink'], cal: 650 }, { foods: ['Energy gel', 'Banana', 'Caffeine', 'Sports drink'], cal: 200 }, ['Sports drink between matches', 'Glucose tabs', 'Banana', 'Salt tabs in heat'], '500ml between matches', ['Protein shake', 'Rice', 'Chicken', 'Coconut water', 'Banana'], 720) },
        { id: 'basketball_tournament', name: 'Tournament Day (2 games)', ...prePost({ foods: ['Large pasta (340g)', 'Chicken (200g)', 'Banana (2)', 'Toast', 'OJ'], cal: 1000 }, { foods: ['Energy gel (2)', 'Banana (2)', 'Sports drink', 'Electrolyte tab'], cal: 360 }, ['Sports drink every break', 'Energy gels throughout', 'Banana', 'Salt tabs'], '700ml per hour', ['Quick recovery shake + banana + rice', 'Full meal between games', 'Coconut water', 'Electrolytes'], 1050) },
      ]
    },

    // ── Tennis ──────────────────────────────────────────────────
    {
      id: 'tennis', name: 'Tennis', icon: '🎾', type: 'Racket',
      events: [
        { id: 'tennis_singles_short', name: 'Singles (best of 3 sets)', ...prePost({ foods: ['Pasta (250g)', 'Chicken (160g)', 'Banana (2)', 'Sports drink'], cal: 750 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 220 }, ['Sports drink every changeover', 'Banana at set breaks', 'Energy gel if long match'], '500ml per hour', ['Protein shake', 'Pasta', 'Chicken', 'Coconut water', 'Banana'], 800) },
        { id: 'tennis_singles_long', name: 'Singles (best of 5 sets)', ...prePost({ foods: ['Large pasta (320g)', 'Chicken (180g)', 'Banana (2)', 'Toast', 'OJ'], cal: 950 }, { foods: ['Energy gel (2)', 'Banana (2)', 'Sports drink', 'Dates'], cal: 320 }, ['Sports drink every changeover', 'Banana at set breaks', 'Energy gels every hour', 'Salt tabs if hot'], '700ml per hour', ['Large recovery meal', 'Pasta', 'Protein shake', 'Coconut water', 'Banana (2)'], 1000) },
        { id: 'tennis_doubles', name: 'Doubles Match', ...prePost({ foods: ['Pasta (250g)', 'Chicken (160g)', 'Banana', 'Sports drink'], cal: 730 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 210 }, ['Sports drink every changeover', 'Banana between sets'], '450ml per hour', ['Protein shake', 'Pasta', 'Chicken', 'Banana', 'Coconut water'], 780) },
        { id: 'tennis_mixed_doubles', name: 'Mixed Doubles', ...prePost({ foods: ['Pasta (250g)', 'Chicken (160g)', 'Banana', 'Sports drink'], cal: 730 }, { foods: ['Energy gel', 'Banana', 'Sports drink'], cal: 210 }, ['Sports drink every changeover', 'Banana between sets'], '450ml per hour', ['Protein shake', 'Pasta', 'Chicken', 'Banana'], 780) },
      ]
    },

    // ── Hockey (Ice) ────────────────────────────────────────────
    {
      id: 'ice_hockey', name: 'Ice Hockey', icon: '🏒', type: 'Team',
      events: [
        { id: 'ice_hockey_match', name: 'Ice Hockey Game (60 min)', ...prePost({ foods: ['Pasta (300g)', 'Chicken (180g)', 'Banana (2)', 'Toast', 'OJ'], cal: 880 }, { foods: ['Energy gel (2)', 'Banana', 'Sports drink', 'Caffeine'], cal: 290 }, ['Sports drink between periods', 'Energy gels', 'Banana', 'Glucose tabs', 'Water between shifts'], '600ml per period', ['Protein shake', 'Large pasta meal', 'Chicken', 'Coconut water', 'Banana'], 950) },
        { id: 'ice_hockey_overtime', name: 'Game + Overtime', ...prePost({ foods: ['Large pasta (350g)', 'Chicken (200g)', 'Banana (2)', 'Toast', 'OJ'], cal: 1000 }, { foods: ['Energy gel (2)', 'Banana (2)', 'Sports drink', 'Caffeine gel'], cal: 340 }, ['Sports drink between periods + OT', 'Energy gels every 20min', 'Banana', 'Salt tabs if needed'], '700ml per period', ['Large recovery meal', 'Pasta', 'Protein shake (50g)', 'Coconut water', 'Banana (2)'], 1050) },
      ]
    },

    // ── Rowing (Team) ───────────────────────────────────────────
    // Already included in aerobic section above

    // ── Sailing ─────────────────────────────────────────────────
    {
      id: 'sailing', name: 'Sailing', icon: '⛵', type: 'Water Sport',
      events: [
        { id: 'sailing_race', name: 'Sailing Race (1-3 hrs)', ...prePost({ foods: ['Pasta (250g)', 'Chicken (160g)', 'Banana (2)', 'OJ'], cal: 780 }, { foods: ['Energy bar', 'Banana', 'Sports drink', 'Trail mix'], cal: 250 }, ['Energy bars on board', 'Banana', 'Sports drink', 'Water (stay hydrated — wind dries you fast)'], '400-500ml per hour', ['Recovery meal', 'Pasta', 'Protein shake', 'Coconut water', 'Fruit'], 800) },
        { id: 'sailing_regatta', name: 'Regatta Day (multiple races)', ...prePost({ foods: ['Large pasta (300g)', 'Chicken (180g)', 'Banana (2)', 'Toast', 'OJ'], cal: 900 }, { foods: ['Energy gel (2)', 'Banana', 'Sports drink', 'Trail mix'], cal: 300 }, ['Energy bars during racing', 'Banana', 'Sports drink', 'Electrolyte tabs', 'Sandwich if long race'], '500ml per hour', ['Recovery meal', 'Pasta', 'Protein shake', 'Coconut water', 'Fruit'], 900) },
      ]
    },

    // ── Equestrian (Jumping/Dressage) ───────────────────────────
    {
      id: 'equestrian_other', name: 'Equestrian (Show Jumping & Dressage)', icon: '🐎', type: 'Equestrian',
      events: [
        { id: 'equestrian_dressage', name: 'Dressage', ...prePost({ foods: ['Light rice (180g)', 'Chicken (140g)', 'Banana', 'Water'], cal: 540 }, { foods: ['Small banana', 'Energy bar', 'Water'], cal: 140 }, ['Water between tests', 'Light snack bar'], '300ml', ['Protein shake', 'Light meal', 'Banana', 'Yogurt'], 600) },
        { id: 'equestrian_jumping', name: 'Show Jumping', ...prePost({ foods: ['Rice (200g)', 'Chicken (150g)', 'Banana', 'OJ'], cal: 600 }, { foods: ['Banana', 'Energy bar', 'Sports drink'], cal: 170 }, ['Water between rounds', 'Snack bar'], '350ml', ['Protein shake', 'Rice', 'Chicken', 'Fruit'], 650) },
      ]
    },

    // ── Golf ────────────────────────────────────────────────────
    {
      id: 'golf', name: 'Golf', icon: '⛳', type: 'Precision',
      events: [
        { id: 'golf_round_18', name: '18-Hole Round (4-5 hrs)', ...prePost({ foods: ['Oatmeal (150g)', 'Eggs (2)', 'Banana', 'Toast', 'Coffee'], cal: 650 }, { foods: ['Banana', 'Energy bar', 'Water'], cal: 180 }, ['Banana every 6 holes', 'Energy bar at turn (hole 9)', 'Water every hole', 'Sports drink if hot'], '400-500ml per hour', ['Light recovery meal', 'Protein shake', 'Banana', 'Yogurt', 'Fruit'], 700) },
        { id: 'golf_stroke_play', name: 'Stroke Play Round', ...prePost({ foods: ['Oatmeal (150g)', 'Eggs (2)', 'Banana', 'Toast', 'Coffee'], cal: 650 }, { foods: ['Banana', 'Energy bar', 'Sports drink', 'Nuts'], cal: 200 }, ['Banana every 6 holes', 'Energy bar at hole 9', 'Water + sports drink throughout', 'Avoid heavy food — affects focus'], '500ml per hour', ['Recovery meal', 'Protein shake', 'Banana', 'Fruit', 'Nuts'], 700) },
      ]
    },

    // ── Modern Pentathlon ───────────────────────────────────────
    {
      id: 'modern_pentathlon', name: 'Modern Pentathlon', icon: '🥇', type: 'Multi-Sport',
      events: [
        { id: 'pent_full', name: 'Modern Pentathlon (Full Day)', ...prePost({ foods: ['Oatmeal (200g)', 'Eggs (3)', 'Banana (2)', 'Toast', 'OJ', 'Coffee'], cal: 1000 }, { foods: ['Energy gel (2)', 'Banana (2)', 'Sports drink', 'Electrolyte tab', 'Caffeine gel'], cal: 380 }, ['Sports drink between all 5 disciplines', 'Energy gels', 'Banana', 'Salt tabs', 'Quick snack between events'], '600ml per discipline', ['Large recovery meal', 'Pasta', 'Protein shake (50g)', 'Coconut water', 'Banana (2)', 'Electrolytes'], 1100) },
      ]
    },

  ]
}

// ─── Training nutrition (kept for TrainingDay page) ─────────────
export const trainingNutrition = {
  speed: {
    name: 'Speed Training', color: '#FF4D00', focus: 'Fast Energy + Explosive Power',
    preWorkout:    { timing: '1-2 hours before', foods: ['White rice (100g)', 'Chicken breast (100g)', 'Banana', 'Sports drink'], macros: { carbs: 65, protein: 20, fat: 15 }, tips: 'High glycemic carbs for quick energy. Avoid heavy fats.' },
    duringWorkout: { foods: ['Sports drink (every 20 min)', 'Energy gel (if over 60 min)'], hydration: '150-200ml every 20 min', tips: 'Keep blood sugar stable. Electrolytes key for explosive work.' },
    postWorkout:   { timing: 'Within 30 min', foods: ['Protein shake (30g)', 'Banana', 'Chocolate milk', 'Rice cakes'], macros: { carbs: 60, protein: 30, fat: 10 }, tips: '3:1 carb-to-protein ratio for speed recovery.' },
    supplements: ['Creatine monohydrate (5g)', 'Caffeine (100-200mg)', 'Beta-alanine (3g)', 'BCAAs (10g)']
  },
  endurance: {
    name: 'Endurance Training', color: '#4FC3F7', focus: 'Sustained Energy + Glycogen Loading',
    preWorkout:    { timing: '3 hours before', foods: ['Oatmeal (150g)', 'Banana (2)', 'Whole grain toast', 'Eggs (2)', 'OJ'], macros: { carbs: 70, protein: 15, fat: 15 }, tips: 'Carb-load for long sessions. Slow-release carbs are key.' },
    duringWorkout: { foods: ['Energy gels every 45 min', 'Banana', 'Sports drink'], hydration: '500-750ml per hour', tips: '30-60g carbs per hour during long efforts.' },
    postWorkout:   { timing: 'Within 30-45 min', foods: ['Recovery shake', 'Pasta', 'Salmon', 'Sweet potato', 'Coconut water'], macros: { carbs: 60, protein: 25, fat: 15 }, tips: 'Replenish glycogen + repair muscle. Omega-3s help inflammation.' },
    supplements: ['Electrolyte tabs', 'Beetroot juice', 'Iron (if deficient)', 'Vitamin D']
  },
  strength: {
    name: 'Strength Training', color: '#E63946', focus: 'Muscle Protein Synthesis + Power',
    preWorkout:    { timing: '1.5-2 hours before', foods: ['Rice (150g)', 'Beef/Chicken (150g)', 'Sweet potato', 'Green vegetables'], macros: { carbs: 45, protein: 35, fat: 20 }, tips: 'High protein pre-workout. Moderate carbs for sustained energy.' },
    duringWorkout: { foods: ['BCAAs in water', 'Glucose tabs if needed'], hydration: '200-300ml every 30 min', tips: 'Sip BCAAs throughout. Stay hydrated for strength output.' },
    postWorkout:   { timing: 'Immediately — within 30 min', foods: ['Whey protein shake (40g)', 'Rice (200g)', 'Eggs (3)', 'Milk (500ml)'], macros: { carbs: 40, protein: 40, fat: 20 }, tips: 'Anabolic window is real for strength. High protein critical.' },
    supplements: ['Creatine (5g/day)', 'Whey protein', 'ZMA (sleep recovery)', 'Vitamin D3 + K2']
  },
  flexibility: {
    name: 'Flexibility & Recovery', color: '#00E676', focus: 'Anti-Inflammation + Tissue Repair',
    preWorkout:    { timing: '1-2 hours before', foods: ['Smoothie (banana + berries + spinach)', 'Almonds (30g)', 'Green tea'], macros: { carbs: 50, protein: 25, fat: 25 }, tips: 'Light, anti-inflammatory foods. No heavy meals.' },
    duringWorkout: { foods: ['Water with lemon', 'Coconut water'], hydration: '200ml per 30 min', tips: 'Hydration key for fascia health and joint mobility.' },
    postWorkout:   { timing: 'Within 1 hour', foods: ['Tart cherry juice', 'Turmeric milk', 'Salmon', 'Leafy greens', 'Walnuts'], macros: { carbs: 40, protein: 30, fat: 30 }, tips: 'Anti-inflammatory focus. Omega-3 + antioxidants for recovery.' },
    supplements: ['Omega-3 fish oil', 'Magnesium', 'Tart cherry extract', 'Collagen peptides']
  },
  agility: {
    name: 'Agility Training', color: '#CE93D8', focus: 'Quickness, Reaction & Coordination',
    preWorkout:    { timing: '1-2 hours before', foods: ['Banana', 'White rice (100g)', 'Energy bar', 'Sports drink'], macros: { carbs: 65, protein: 20, fat: 15 }, tips: 'Fast-digesting carbs. Light meal — avoid heavy foods.' },
    duringWorkout: { foods: ['Water', 'Electrolyte drink', 'Energy gel if over 60 min'], hydration: '150ml every 20 min', tips: 'Short sessions: water only. Long sessions: electrolytes.' },
    postWorkout:   { timing: 'Within 30 min', foods: ['Protein shake (25g)', 'Banana', 'Greek yogurt', 'Rice'], macros: { carbs: 55, protein: 30, fat: 15 }, tips: 'Protein + carbs for muscle repair and glycogen refill.' },
    supplements: ['Creatine (3-5g)', 'Caffeine (pre-session)', 'BCAAs (8-10g)', 'Electrolyte tabs']
  }
}

export const weightManagementData = {
  cut:      { name: 'Cutting Phase',      goal: 'Lose fat, preserve muscle',  color: '#FF3057', deficit: 400,  macroRatio: { carbs: 40, protein: 40, fat: 20 }, tips: ['Eat in 400 cal deficit', 'High protein to preserve muscle', 'Time carbs around workouts', 'Increase cardio gradually'], foods: ['Chicken breast', 'Egg whites', 'Broccoli', 'Sweet potato (small)', 'Greek yogurt', 'Berries', 'Green tea'] },
  bulk:     { name: 'Bulking Phase',       goal: 'Gain muscle mass',           color: '#FF4D00', surplus: 400, macroRatio: { carbs: 50, protein: 30, fat: 20 }, tips: ['Eat in 400 cal surplus', 'Progressive overload in gym', 'Prioritize sleep', 'Lean protein with every meal'], foods: ['Whole eggs', 'Beef', 'Rice', 'Oats', 'Whole milk', 'Peanut butter', 'Avocado', 'Banana'] },
  maintain: { name: 'Maintenance Phase',   goal: 'Maintain weight, improve',   color: '#00E676', surplus: 0,  macroRatio: { carbs: 50, protein: 25, fat: 25 }, tips: ['Eat at TDEE', 'Cycle carbs with training intensity', 'Focus on food quality', 'Track weekly averages'], foods: ['Mixed whole foods', 'Lean proteins', 'Complex carbs', 'Healthy fats', 'Plenty of vegetables'] }
}

export const recoveryData = {
  immediate: { label: '0-30 min Post Training',  color: '#FF4D00', foods: ['Whey protein shake', 'Banana', 'Chocolate milk', 'White rice'], focus: 'Glycogen replenishment + muscle protein synthesis kickstart' },
  shortTerm: { label: '1-3 Hours Post Training',  color: '#FF7A00', foods: ['Grilled chicken + rice', 'Salmon + sweet potato', 'Eggs + toast', 'Greek yogurt + fruit'], focus: 'Full recovery meal with balanced macros' },
  overnight: { label: 'Before Sleep',             color: '#4FC3F7', foods: ['Casein protein shake', 'Cottage cheese', 'Warm milk + honey', 'Almonds'], focus: 'Slow-release protein for overnight muscle repair' },
  hydration: { label: 'Hydration Protocol',       color: '#00E676', foods: ['Water (500ml immediately)', 'Coconut water', 'Electrolyte drink', 'Tart cherry juice'], focus: 'Replace 150% of fluid lost during exercise' }
}

export const performanceData = {
  speed:     { label: 'Speed & Power',      color: '#FF4D00', foods: ['Red meat (creatine)', 'Fast carbs pre-workout', 'Caffeine', 'Beta-alanine foods'], tips: 'Focus on phosphocreatine system — short burst energy' },
  endurance: { label: 'Endurance & Stamina',color: '#4FC3F7', foods: ['Beetroot juice (nitrates)', 'Oats', 'Banana', 'Quinoa', 'Iron-rich foods'], tips: 'VO2 max improvement — oxygen delivery optimization' },
  strength:  { label: 'Strength & Power',   color: '#E63946', foods: ['High protein (2g/kg)', 'Creatine', 'ZMA foods', 'Vitamin D sources'], tips: 'Muscle protein synthesis — progressive overload + nutrition' },
  recovery:  { label: 'Recovery Speed',     color: '#00E676', foods: ['Omega-3 (salmon, walnuts)', 'Tart cherries', 'Turmeric', 'Vitamin C foods', 'Magnesium'], tips: 'Reduce inflammation + oxidative stress for faster recovery' }
}