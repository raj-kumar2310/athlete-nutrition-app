import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ChevronRight, AlertTriangle, Heart, Activity, Zap, Shield, ChevronDown, ChevronUp } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import BottomNav from '../components/BottomNav'

// ─── All injury & first aid data ───────────────────────────────
export const categories = [
  {
    id: 'overload',
    label: 'Overload Injuries',
    icon: '🦴',
    color: '#FF4D00',
    desc: 'Pain from training stress & overuse',
    injuries: [
      {
        id: 'shin_bone',
        name: 'Shin Bone Pain',
        subtitle: 'Shin Splints / Stress Fracture',
        severity: 'Moderate',
        icon: '🦵',
        immediate: [
          'STOP running immediately — do not push through pain',
          'Apply ICE pack wrapped in cloth for 15-20 min',
          'Elevate the leg above heart level',
          'Take rest — no weight bearing if severe',
          'Compression bandage if swollen',
        ],
        recovery: [
          { phase: 'Day 1-3 (Acute)', steps: ['Complete rest from impact', 'Ice 3-4x per day 15 min', 'Anti-inflammatory foods: turmeric, ginger', 'Gentle ankle circles only'] },
          { phase: 'Day 4-7 (Sub-Acute)', steps: ['Swimming or cycling if pain-free', 'Calf raises (seated only)', 'Massage lower leg gently', 'Calcium + Vitamin D supplement'] },
          { phase: 'Week 2-4 (Rehab)', steps: ['Walk before running', 'Single leg calf raises', 'Foam roll calves', 'Gradual return to running (30% less volume)'] },
        ],
        nutrition: ['Calcium-rich foods: milk, yogurt, cheese', 'Vitamin D: salmon, eggs, sunlight', 'Anti-inflammatory: turmeric milk, ginger tea', 'Protein (1.8g/kg) for bone repair', 'Vitamin C: oranges, berries'],
        avoid: ['High impact activity', 'Hill running', 'Worn-out shoes', 'Ignoring the pain'],
        doctorWhen: 'If pain is sharp and localized (possible stress fracture) — get X-ray or MRI',
        recoverDays: '14-42 days',
      },
      {
        id: 'calf_pain',
        name: 'Calf Pain',
        subtitle: 'Lower / Middle / Upper & Side Calf',
        severity: 'Moderate',
        icon: '🦵',
        immediate: [
          'Stop activity immediately',
          'RICE: Rest, Ice (15-20 min), Compression, Elevation',
          'No stretching in first 24-48 hours if tear suspected',
          'For grade 2-3 tear: use crutches to offload',
          'Compress with bandage from foot upward',
        ],
        recovery: [
          { phase: 'Day 1-3', steps: ['RICE protocol strictly', 'Ice every 2-3 hours', 'Gentle range of motion after 48 hrs', 'Avoid heat, alcohol, massage initially'] },
          { phase: 'Day 4-10', steps: ['Heel raises in pool or seated', 'Eccentric calf lowering (slow lowering)', 'Massage with arnica gel', 'Light walking on flat ground'] },
          { phase: 'Week 2-4', steps: ['Progressive loading: 2-leg → 1-leg', 'Foam rolling', 'Gradual jogging', 'Strength: single leg calf raises 3×15'] },
        ],
        nutrition: ['Protein shake post-session', 'Collagen peptides (15g/day)', 'Vitamin C with collagen', 'Magnesium: dark chocolate, nuts', 'Omega-3 fish oil for inflammation'],
        avoid: ['Sudden explosive movements', 'Running uphill too soon', 'Tight shoes', 'Skipping warm-up'],
        doctorWhen: 'Severe bruising or inability to walk — rule out deep vein thrombosis or grade 3 tear',
        recoverDays: '7-28 days (Grade 1: 7d, Grade 2: 14-21d, Grade 3: 6-8 weeks)',
      },
      {
        id: 'lower_knee',
        name: 'Lower Knee Pain',
        subtitle: 'Patellar Tendinitis / Jumper\'s Knee',
        severity: 'Moderate',
        icon: '🦵',
        immediate: [
          'Reduce training load immediately',
          'Ice below kneecap for 15 min after activity',
          'Patellar tendon strap/brace if available',
          'No deep squats or kneeling',
          'Elevate leg when resting',
        ],
        recovery: [
          { phase: 'Week 1', steps: ['Isometric quad holds: 5×45 sec', 'Ice after every session', 'Reduce jumping/running by 70%', 'Straight leg raises'] },
          { phase: 'Week 2-3', steps: ['Eccentric squats: slow 6-count lower', 'Leg press with controlled lowering', 'Cycling (low resistance)', 'Hip strengthening: clams, bridges'] },
          { phase: 'Week 4-6', steps: ['Progressive loading squats', 'Single leg squats', 'Gradual return to jumping', 'Full sports training at 80%'] },
        ],
        nutrition: ['Collagen (15g) + Vitamin C 30 min before exercise', 'Anti-inflammatory: turmeric, ginger', 'Omega-3 (2-3g/day)', 'Protein for tendon repair', 'Bromelain (pineapple) — reduces inflammation'],
        avoid: ['Full squats below 90°', 'Running on hard surfaces', 'Sudden load increases', 'Ignoring early warning signs'],
        doctorWhen: 'Pain during rest or night pain — may need ultrasound/MRI and physiotherapy',
        recoverDays: '6-12 weeks',
      },
      {
        id: 'hamstring',
        name: 'Hamstring Pain',
        subtitle: 'Lower / Middle / Upper',
        severity: 'Moderate-Severe',
        icon: '🦵',
        immediate: [
          'STOP immediately — do NOT stretch a strained hamstring',
          'Ice the area for 15-20 min every 2 hours',
          'Lie face down — ice on the back of thigh',
          'Compression shorts or bandage',
          'Crutches if unable to bear weight',
        ],
        recovery: [
          { phase: 'Day 1-3', steps: ['RICE strictly', 'Prone lying (face down) for comfort', 'Gentle quad stretches only', 'NO hamstring stretch for 72 hrs'] },
          { phase: 'Day 4-10', steps: ['Gentle hamstring loading: isometrics', 'Nordic curl negatives (very slow)', 'Dead bugs core exercise', 'Pool walking/jogging'] },
          { phase: 'Week 2-6', steps: ['Progressive running program', 'Nordic hamstring curls', 'Romanian deadlifts (light)', 'Sprinting at 50% → 70% → 90%'] },
        ],
        nutrition: ['High protein (2g/kg)', 'Collagen + Vitamin C', 'Creatine (5g/day) to maintain muscle', 'Anti-inflammatory: omega-3, turmeric', 'Iron-rich foods if anemic'],
        avoid: ['Sprinting too early', 'Aggressive stretching in acute phase', 'Sitting for long periods', 'Returning at 100% too quickly'],
        doctorWhen: 'If bruising extends down the thigh or "pop" was heard — MRI to rule out grade 3 tear or avulsion',
        recoverDays: 'Grade 1: 1-2 weeks | Grade 2: 4-8 weeks | Grade 3: 3-6 months',
      },
      {
        id: 'quadriceps',
        name: 'Quadriceps Pain',
        subtitle: 'Lower / Middle / Upper',
        severity: 'Moderate',
        icon: '🦵',
        immediate: [
          'Stop activity — rest the leg',
          'Ice the front of the thigh 15-20 min',
          'Compression bandage',
          'Elevate leg',
          'Do NOT massage in first 48 hours (increases bleeding)',
        ],
        recovery: [
          { phase: 'Day 1-3', steps: ['RICE protocol', 'Gentle knee bending (to 90° max)', 'Isometric quad contractions', 'No massage — risk of myositis ossificans'] },
          { phase: 'Day 4-14', steps: ['Stationary cycling (low resistance)', 'Straight leg raises', 'Hamstring curls for balance', 'Massage after 5 days if no bruising'] },
          { phase: 'Week 3-6', steps: ['Progressive squats', 'Leg press', 'Lunges', 'Return to sport testing: single leg squat'] },
        ],
        nutrition: ['Protein (2g/kg) for muscle repair', 'Tart cherry juice — reduces soreness', 'Omega-3 anti-inflammatory', 'Creatine to maintain strength', 'Zinc-rich foods: meat, seeds'],
        avoid: ['Deep tissue massage in first 48 hrs', 'Heat in first 72 hrs', 'Aggressive stretching early', 'Contact sport before full strength returns'],
        doctorWhen: 'Large bruise, significant swelling, or loss of full knee bend — ultrasound needed',
        recoverDays: '2-6 weeks depending on grade',
      },
      {
        id: 'adductor_abductor',
        name: 'Adductor & Abductor Pain',
        subtitle: 'Groin / Hip Flexor Strain',
        severity: 'Moderate',
        icon: '🦵',
        immediate: [
          'Stop all lateral movement activities',
          'Ice the groin/outer hip area 15-20 min',
          'Compression shorts',
          'Rest in position of comfort (slightly bent hip)',
          'Walk with small steps — no wide stride',
        ],
        recovery: [
          { phase: 'Day 1-5', steps: ['Rest from all side-cutting movements', 'Ice 3-4x per day', 'Isometric adductor squeeze with pillow', 'Clam shells for hip stability'] },
          { phase: 'Week 1-3', steps: ['Side-lying leg raises', 'Band walks (small range)', 'Pool exercises', 'Strengthening hip abductors + adductors progressively'] },
          { phase: 'Week 3-8', steps: ['Lateral shuffle drills slowly', 'Skating movements', 'Return to cutting drills at 50%', 'Full sports training'] },
        ],
        nutrition: ['Collagen + Vitamin C for connective tissue', 'Omega-3 fish oil', 'Magnesium for muscle recovery', 'Protein for repair', 'Hydration — dehydration worsens groin strains'],
        avoid: ['Side steps and cutting movements', 'Kicking with power too early', 'Stretching into pain', 'Swimming breaststroke (groin stress)'],
        doctorWhen: 'Radiating pain into testicle/groin — rule out hernia or hip stress fracture',
        recoverDays: '1-6 weeks depending on severity',
      },
      {
        id: 'ankle',
        name: 'Ankle Strain & Sprain',
        subtitle: 'Lateral / Medial Ankle Sprain',
        severity: 'Moderate',
        icon: '🦶',
        immediate: [
          'POLICE: Protection, Optimal Loading, Ice, Compression, Elevation',
          'Ice immediately for 15-20 min — do NOT delay',
          'Compression bandage from toes upward in figure-8',
          'Elevate above heart level',
          'Assess if able to bear weight — if not, rule out fracture (Ottawa Rules)',
        ],
        recovery: [
          { phase: 'Day 1-3', steps: ['Ice every 2 hours', 'Compression bandage always', 'Alphabet ankle circles (pain-free only)', 'Pool walking if available'] },
          { phase: 'Day 4-10', steps: ['Balance board wobble board', 'Calf raises (seated → standing)', 'Resistance band plantarflexion/dorsiflexion', 'Single leg balance 30 sec'] },
          { phase: 'Week 2-6', steps: ['Hopping drills', 'Agility ladder', 'Sport-specific cutting drills', 'Ankle bracing for return to sport'] },
        ],
        nutrition: ['Collagen (15g) + Vitamin C pre-exercise', 'Anti-inflammatory: turmeric, omega-3', 'Bromelain supplement', 'Calcium + Vitamin D for ligament strength', 'Protein for healing'],
        avoid: ['Walking on uneven surfaces without support', 'High heels or worn-out shoes', 'Returning to sport before full balance restored', 'Ignoring chronic instability'],
        doctorWhen: 'Cannot bear weight at all, bony tenderness, significant swelling — X-ray to rule out fracture',
        recoverDays: 'Grade 1: 1-2 weeks | Grade 2: 3-6 weeks | Grade 3: 3-6 months',
      },
      {
        id: 'glute',
        name: 'Glute Pain',
        subtitle: 'Gluteal Strain / Piriformis Syndrome',
        severity: 'Mild-Moderate',
        icon: '🍑',
        immediate: [
          'Reduce or stop running immediately',
          'Ice the buttock area 15-20 min',
          'Avoid sitting on hard surfaces',
          'Use a cushion when sitting',
          'Gentle piriformis stretch if no sharp pain',
        ],
        recovery: [
          { phase: 'Day 1-5', steps: ['Rest from sprinting and hill running', 'Ice after activity', 'Seated piriformis stretch (figure-4)', 'Standing hip flexor stretch'] },
          { phase: 'Week 1-3', steps: ['Glute bridges 3×15', 'Single leg deadlifts', 'Hip thrusts (bodyweight → weighted)', 'Clam shells with resistance band'] },
          { phase: 'Week 3-6', steps: ['Single leg squat', 'Step-ups', 'Bulgarian split squats', 'Return to running progressively'] },
        ],
        nutrition: ['Protein for muscle repair', 'Omega-3 anti-inflammatory', 'Magnesium (cramp prevention)', 'Anti-inflammatory diet overall', 'Hydration for muscle function'],
        avoid: ['Long periods of sitting', 'Running with tight hips', 'Unilateral training imbalance', 'Ignoring hip mobility work'],
        doctorWhen: 'Pain radiates down leg (sciatica symptoms) — needs physiotherapy assessment',
        recoverDays: '1-4 weeks',
      },
      {
        id: 'lower_back',
        name: 'Lower Back Pain',
        subtitle: 'Lumbar Strain / Disc Issue',
        severity: 'Moderate-Severe',
        icon: '🔙',
        immediate: [
          'Stop the activity that caused it',
          'Lie on back with knees bent (hook lying position)',
          'Ice first 48 hrs — then switch to HEAT',
          'Gentle knee-to-chest stretch',
          'Avoid bending forward with straight legs',
        ],
        recovery: [
          { phase: 'Day 1-3', steps: ['Rest in hook-lying position', 'Ice 15 min every 2-3 hrs', 'Gentle pelvic tilts', 'Cat-cow stretch gently'] },
          { phase: 'Day 4-14', steps: ['Bird dog exercise', 'Dead bug', 'Glute bridges', 'Walking (reduces disc pressure)'] },
          { phase: 'Week 2-6', steps: ['Plank progression', 'Side plank', 'Swimming or cycling', 'Progressive return to sport with core brace'] },
        ],
        nutrition: ['Anti-inflammatory: turmeric, ginger, omega-3', 'Magnesium glycinate for muscle relaxation', 'Vitamin D for spinal health', 'Calcium for vertebral strength', 'Collagen for disc health'],
        avoid: ['Heavy lifting with rounded back', 'Sitting for long periods', 'High-impact sport too early', 'Twisting movements in acute phase'],
        doctorWhen: 'Leg pain/numbness below knee, bladder/bowel changes, or pain lasting more than 2 weeks — urgent medical attention',
        recoverDays: 'Muscle strain: 1-4 weeks | Disc issue: 6-12 weeks+',
      },
      {
        id: 'shoulder',
        name: 'Shoulder Pain',
        subtitle: 'Rotator Cuff / Impingement / Strain',
        severity: 'Moderate',
        icon: '💪',
        immediate: [
          'Rest arm in sling or supported position',
          'Ice the shoulder 15-20 min',
          'No overhead reaching',
          'Avoid throwing or pressing movements',
          'Gentle pendulum swings for pain relief',
        ],
        recovery: [
          { phase: 'Day 1-5', steps: ['Sling for rest only (not all day)', 'Pendulum circles', 'Ice after any activity', 'Scapular squeezes'] },
          { phase: 'Week 1-3', steps: ['Rotator cuff: internal/external rotation with band', 'Side-lying external rotation', 'Prone Y-T-W raises', 'Avoid overhead initially'] },
          { phase: 'Week 3-8', steps: ['Progressive overhead pressing', 'Push-up progression', 'Throwing program (50% → 75% → full)', 'Return to sport with scapular control'] },
        ],
        nutrition: ['Collagen + Vitamin C (30g collagen pre-rehab)', 'Omega-3 (3g/day)', 'Vitamin E: nuts, seeds', 'Protein for tendon repair', 'Anti-inflammatory: turmeric, ginger'],
        avoid: ['Overhead press in acute phase', 'Sleeping on painful shoulder', 'Throwing without warmup', 'Ignoring impingement signs'],
        doctorWhen: 'Inability to lift arm, "dead arm" sensation, or dislocation — immediate medical assessment needed',
        recoverDays: '2-12 weeks depending on diagnosis',
      },
      {
        id: 'wrist',
        name: 'Wrist Pain',
        subtitle: 'Sprain / Tendinitis / TFCC',
        severity: 'Mild-Moderate',
        icon: '✋',
        immediate: [
          'Rest wrist — avoid gripping or loading',
          'Ice the wrist 15 min every 2 hours',
          'Compression bandage or wrist splint',
          'Elevate hand above heart',
          'Remove rings/watches if swollen',
        ],
        recovery: [
          { phase: 'Day 1-5', steps: ['Wrist splint during activity', 'Ice 3-4x daily', 'Finger movements to prevent stiffness', 'Wrist circles (pain-free range only)'] },
          { phase: 'Week 1-3', steps: ['Grip strengthening: putty or stress ball', 'Wrist curls (light resistance)', 'Pronation/supination with light dumbbell', 'Wrist flexor/extensor stretches'] },
          { phase: 'Week 3-6', steps: ['Progressive loading', 'Push-up progression (fists → palms)', 'Sport-specific movements', 'Taping for return to sport'] },
        ],
        nutrition: ['Collagen for ligament healing', 'Vitamin C', 'Calcium + Vitamin D', 'Anti-inflammatory foods', 'Omega-3 fish oil'],
        avoid: ['Weight bearing through wrist too early', 'Ignoring clicking/catching sensation', 'Excessive grip training', 'Falling on outstretched hand'],
        doctorWhen: 'Snuffbox tenderness (scaphoid fracture risk), FOOSH injury, or persistent pain > 2 weeks — X-ray needed',
        recoverDays: '1-8 weeks depending on severity',
      },
      {
        id: 'elbow',
        name: 'Elbow Pain',
        subtitle: 'Tennis Elbow / Golfer\'s Elbow / Strain',
        severity: 'Mild-Moderate',
        icon: '💪',
        immediate: [
          'Stop the aggravating activity',
          'Ice the elbow 15 min',
          'Counter-force brace (tennis elbow strap)',
          'Avoid gripping, twisting, and lifting',
          'Rest in neutral position',
        ],
        recovery: [
          { phase: 'Day 1-7', steps: ['Ice after any activity', 'Wrist extensor stretch (lateral epicondyle)', 'Wrist flexor stretch (medial epicondyle)', 'Counter-force brace during activity'] },
          { phase: 'Week 2-4', steps: ['Eccentric wrist extensions (Tyler twist)', 'Forearm strengthening', 'Grip training with fatigue management', 'Massage forearm extensors'] },
          { phase: 'Week 4-8', steps: ['Progressive loading', 'Sport-specific movements', 'Return to throwing/racket sport gradually', 'Technique correction with coach'] },
        ],
        nutrition: ['Collagen (15g) + Vitamin C', 'Omega-3 fish oil (3g)', 'Turmeric curcumin supplement', 'Vitamin E', 'Protein for tendon healing'],
        avoid: ['Tight grip on racket/bar', 'Overuse without rest', 'Poor technique in throwing sports', 'Ignoring early warnings'],
        doctorWhen: 'Elbow locking, instability, or pain lasting more than 3 months — may need injection or surgery assessment',
        recoverDays: '4-12 weeks (chronic cases: 6-12 months)',
      },
      {
        id: 'muscle_cramp',
        name: 'Muscle Cramp',
        subtitle: 'Acute Cramping During / After Exercise',
        severity: 'Mild',
        icon: '⚡',
        immediate: [
          'STOP the activity immediately',
          'Gently STRETCH the cramping muscle (opposite direction)',
          'Massage the muscle firmly',
          'Drink sports drink or water with electrolytes',
          'Apply gentle heat (warm pack) if cramp persists',
        ],
        recovery: [
          { phase: 'Immediate (0-15 min)', steps: ['Passive stretch: hold 30-45 sec', 'Firm massage along muscle belly', 'Sports drink 400ml', 'Walk slowly — do not sit suddenly'] },
          { phase: 'Same Day', steps: ['Rest from intense training', 'Rehydrate: 500-750ml electrolyte drink', 'Eat potassium-rich food: banana, OJ', 'Light stretching session'] },
          { phase: 'Next 1-3 Days', steps: ['Address root cause: dehydration? fatigue? overtraining?', 'Increase daily water intake', 'Add electrolytes to training drinks', 'Reduce training load by 20-30%'] },
        ],
        nutrition: ['Banana (potassium)', 'Sports drink (sodium + potassium)', 'Pickle juice — rapid cramp relief (60-90ml)', 'Magnesium supplement (before bed)', 'Coconut water for electrolytes', 'Salt in food/drink during long sessions'],
        avoid: ['Dehydration — drink before thirsty', 'Training without electrolytes in heat', 'Sudden training load increase', 'Low carbohydrate training sessions'],
        doctorWhen: 'Frequent cramping despite good hydration/nutrition — rule out mineral deficiency, circulation issues, or nerve compression',
        recoverDays: 'Resolves in minutes-hours. Address cause to prevent recurrence',
      },
      {
        id: 'head_pain',
        name: 'Head Pain + Vomiting Sensation',
        subtitle: 'Exercise-Induced Headache / Heat Exhaustion / Concussion',
        severity: 'Severe ⚠️',
        icon: '🤕',
        immediate: [
          '🚨 STOP ALL ACTIVITY IMMEDIATELY',
          'Move athlete to COOL, SHADED area',
          'Lie down with feet slightly elevated (unless vomiting)',
          'If vomiting: recovery position (on side)',
          'Remove helmet/tight clothing',
          'Apply cool wet cloth to forehead and neck',
          'Small sips of COOL water — do NOT force fluids if vomiting',
          '🚨 If symptoms persist > 5 min or worsen — CALL EMERGENCY SERVICES',
        ],
        recovery: [
          { phase: 'Immediate (0-30 min)', steps: ['Cool environment + rest', 'Check: confusion? unequal pupils? weakness? → 999/112 immediately', 'Monitor every 5 minutes', 'Do not leave athlete alone'] },
          { phase: 'If Heat Exhaustion', steps: ['Cool fluids 500ml slowly', 'Cool wet towels on neck, armpits, groin', 'Fan the athlete', 'Hospital if temperature > 40°C or confusion'] },
          { phase: 'Return to Activity', steps: ['Minimum 24 hrs rest after ANY head pain episode', 'If concussion suspected: follow graduated return-to-play protocol (6 steps, 24 hrs each)', 'Medical clearance required before return to contact sport'] },
        ],
        nutrition: ['Cool water first — 150ml every 15 min', 'Oral rehydration salts (ORS)', 'Light food only after nausea resolves: crackers, banana', 'AVOID: caffeine, alcohol, heavy food', 'Sports drink when tolerating fluid'],
        avoid: ['Returning to training same day', 'Hot environment after episode', 'Caffeine or stimulants', 'Training alone without supervision'],
        doctorWhen: '🚨 ALWAYS seek medical help for head pain with vomiting. Could be: concussion, heat stroke, hyponatremia, or exertional headache — all need medical assessment',
        recoverDays: 'Medical clearance required. Concussion protocol: minimum 6 days',
      },
    ]
  },
  {
    id: 'open_injury',
    label: 'Open Injuries',
    icon: '🩹',
    color: '#FF3057',
    desc: 'Cuts, abrasions & bleeding wounds',
    injuries: [
      {
        id: 'open_wound',
        name: 'Open Wound First Aid',
        subtitle: 'Cuts / Lacerations / Abrasions',
        severity: 'Varies',
        icon: '🩹',
        immediate: [
          '1. STOP THE BLEEDING: Apply direct pressure with clean cloth',
          '2. CLEAN YOUR HANDS first if possible',
          '3. CLEAN the wound: flush with clean running water 5-10 min',
          '4. REMOVE visible dirt/debris gently — do NOT probe deep wounds',
          '5. APPLY antiseptic: iodine solution or antiseptic cream',
          '6. COVER with sterile dressing or clean cloth',
          '7. ELEVATE the injured part above heart level',
          '8. DO NOT remove embedded objects — stabilize and go to hospital',
        ],
        recovery: [
          { phase: 'First 24 Hours', steps: ['Keep wound covered and clean', 'Change dressing every 6-8 hours', 'Watch for signs of infection: redness, warmth, swelling, pus', 'Tetanus shot if not vaccinated in 5 years'] },
          { phase: 'Day 2-7', steps: ['Keep wound moist with antibiotic ointment', 'Protect from sun', 'Check daily for infection signs', 'Gentle range of motion if near joint'] },
          { phase: 'Healing Phase', steps: ['Vitamin E oil for scar management', 'Silicone scar gel after wound closes', 'Sun protection on healed skin', 'Gradual return to sport with waterproof dressing'] },
        ],
        nutrition: ['Vitamin C (500mg) — essential for wound healing', 'Zinc: meat, pumpkin seeds, legumes', 'Protein (2g/kg) for tissue repair', 'Vitamin A: sweet potato, carrots', 'Hydration for optimal healing'],
        avoid: ['Removing the clot once formed', 'Using cotton wool directly on wound', 'Hydrogen peroxide on fresh wounds (damages tissue)', 'Picking at scab', 'Returning to contact sport before healed'],
        doctorWhen: 'Deep wounds (can see fat/muscle), won\'t stop bleeding after 10 min pressure, animal bites, dirty wounds, puncture wounds, or wound gaping > 5mm → needs stitches',
        recoverDays: 'Minor: 3-7 days | Deep: 2-4 weeks',
      },
    ]
  },
  {
    id: 'emergency',
    label: 'Emergency Protocols',
    icon: '🚨',
    color: '#FF3057',
    desc: 'Life-threatening & urgent situations',
    injuries: [
      {
        id: 'hyperventilation',
        name: 'Overbreathing / Hyperventilation',
        subtitle: 'Exercise-Induced or Anxiety-Related',
        severity: 'Urgent',
        icon: '💨',
        immediate: [
          '1. STAY CALM — reassure the athlete: "You are safe, I am here"',
          '2. Remove from hot, crowded, or stressful environment',
          '3. Sit or lie the athlete down comfortably',
          '4. Ask them to BREATHE IN through nose for 4 counts',
          '5. HOLD for 2 counts',
          '6. BREATHE OUT slowly through mouth for 6 counts',
          '7. DO NOT use paper bag method (now outdated — can be dangerous)',
          '8. Calm, slow, guided breathing for 5-10 minutes',
        ],
        recovery: [
          { phase: 'Immediate (0-10 min)', steps: ['4-2-6 breathing pattern (in 4, hold 2, out 6)', 'Sit upright — do not lie flat', 'Loosen tight clothing/kit', 'Talk calmly and reassuringly'] },
          { phase: 'After Episode', steps: ['15 min rest minimum before any activity', 'Cool water to sip slowly', 'Identify trigger: anxiety? heat? overexertion?', 'Do not return to intense training same day'] },
          { phase: 'Prevention', steps: ['Breathing training during cool-down', 'Meditation/breathing app: 5 min daily', 'Progressive training load', 'Manage competition anxiety with sports psychologist'] },
        ],
        nutrition: ['Cool water — small sips', 'Avoid caffeine immediately after episode', 'Magnesium supplement — reduces anxiety-driven hyperventilation', 'Light snack: banana, crackers'],
        avoid: ['Paper bag breathing', 'Forcing fast breathing', 'Returning to intense activity immediately', 'Caffeine/stimulants before competition'],
        doctorWhen: 'First episode of hyperventilation, chest pain, tingling in face/hands, fainting, or irregular heartbeat — needs immediate medical assessment',
        recoverDays: 'Resolves in minutes. Underlying anxiety or breathing pattern disorder needs treatment',
      },
      {
        id: 'heat_exhaustion',
        name: 'Heat Exhaustion',
        subtitle: 'Overheating During Training/Competition',
        severity: 'Severe ⚠️',
        icon: '🌡️',
        immediate: [
          '🚨 STOP all activity immediately',
          'Move to COOL, SHADED area urgently',
          'Lay athlete down, legs elevated 30 cm',
          'Remove excess clothing',
          'Apply COLD wet towels: forehead, neck, armpits, groin',
          'Fan the athlete',
          'Cool fluids if conscious and not vomiting',
          'Call 999/112 if: confusion, high temperature, unconsciousness',
        ],
        recovery: [
          { phase: 'On-Site', steps: ['Cool aggressively for 30 min', 'Monitor temperature every 5 min', 'Oral rehydration: 150ml every 15 min', 'Do NOT leave alone'] },
          { phase: 'Hospital/Recovery', steps: ['IV fluids may be needed', 'Core temperature monitoring', 'Minimum 24-48 hrs rest', 'Return to exercise only when fully recovered'] },
          { phase: 'Return to Training', steps: ['Minimum 1 week before return to heat training', 'Gradual heat acclimatization', 'Start at 50% load in cool conditions', 'Medical clearance required'] },
        ],
        nutrition: ['Oral rehydration salts (ORS) first', 'Cool sports drink: 150ml every 15 min', 'Avoid: alcohol, caffeine, hot foods', 'Light food after full recovery: banana, rice, toast'],
        avoid: ['Training in peak heat (12pm-4pm)', 'Dark/heavy clothing', 'Inadequate pre-hydration', 'Training through dizziness or nausea'],
        doctorWhen: '🚨 ALWAYS — heat exhaustion can progress to life-threatening heat stroke. Any confusion, loss of consciousness, or temperature above 40°C = EMERGENCY',
        recoverDays: '24-48 hours minimum with medical clearance',
      },
    ]
  }
]

// ─── Severity badge ─────────────────────────────────────────────
function SeverityBadge({ severity }) {
  const color = severity.includes('Severe') || severity.includes('Urgent') ? '#FF3057'
    : severity.includes('Moderate') ? '#FFB347'
    : '#00E676'
  return (
    <span style={{ background: `${color}20`, border: `1px solid ${color}44`, borderRadius: 100, padding: '3px 10px', color, fontSize: 11, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, fontWeight: 700 }}>
      {severity}
    </span>
  )
}

// ─── Injury Detail ──────────────────────────────────────────────
function InjuryDetail({ injury, catColor, onBack }) {
  const [openSection, setOpenSection] = useState('first_aid')
  const { bg, bg2, bg3, border, text, text2, text3 } = useTheme()

  const sections = [
    { id: 'first_aid', label: '🚨 First Aid Steps', color: '#FF3057' },
    { id: 'recovery',  label: '🗓️ Recovery Plan',   color: '#FFB347' },
    { id: 'nutrition', label: '🥗 Nutrition',        color: '#00E676' },
    { id: 'avoid',     label: '❌ What to Avoid',    color: '#FF7A00' },
  ]

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: text3, marginBottom: 20, padding: 0 }}>
        <ArrowLeft size={16} /> <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, fontSize: 14 }}>BACK</span>
      </button>

      {/* Header */}
      <div style={{ background: bg2, border: `1px solid ${catColor}33`, borderRadius: 20, padding: 20, marginBottom: 16, transition: 'all 0.3s' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
          <span style={{ fontSize: 36 }}>{injury.icon}</span>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 26, fontWeight: 900, color: text, margin: '0 0 4px', letterSpacing: -0.3 }}>{injury.name}</h2>
            <p style={{ color: text3, fontSize: 13, margin: '0 0 8px' }}>{injury.subtitle}</p>
            <SeverityBadge severity={injury.severity} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: bg3, borderRadius: 12 }}>
          <span style={{ fontSize: 16 }}>⏱️</span>
          <div>
            <div style={{ color: catColor, fontSize: 11, letterSpacing: 1, fontFamily: "'Barlow Condensed', sans-serif" }}>RECOVERY TIME</div>
            <div style={{ color: text, fontSize: 13, fontWeight: 600 }}>{injury.recoverDays}</div>
          </div>
        </div>
      </div>

      {/* Sections */}
      {sections.map(sec => (
        <div key={sec.id} style={{ background: bg2, border: `1px solid ${sec.color}22`, borderRadius: 16, marginBottom: 10, overflow: 'hidden', transition: 'all 0.3s' }}>
          <button onClick={() => setOpenSection(openSection === sec.id ? null : sec.id)}
            style={{ width: '100%', padding: '16px 18px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left' }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 17, fontWeight: 800, color: sec.color }}>{sec.label}</span>
            {openSection === sec.id ? <ChevronUp size={16} color={text3} /> : <ChevronDown size={16} color={text3} />}
          </button>
          <AnimatePresence>
            {openSection === sec.id && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} style={{ overflow: 'hidden' }}>
                <div style={{ padding: '0 18px 18px' }}>
                  <div style={{ height: 1, background: `${sec.color}20`, marginBottom: 14 }} />

                  {sec.id === 'first_aid' && (
                    <div>
                      {injury.immediate.map((step, i) => (
                        <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                          <div style={{ width: 26, height: 26, borderRadius: '50%', background: `${sec.color}20`, border: `1px solid ${sec.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span style={{ color: sec.color, fontSize: 11, fontWeight: 800 }}>{i + 1}</span>
                          </div>
                          <span style={{ color: text2, fontSize: 13, lineHeight: 1.6, paddingTop: 4 }}>{step}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {sec.id === 'recovery' && (
                    <div>
                      {injury.recovery.map((phase, i) => (
                        <div key={i} style={{ marginBottom: 16 }}>
                          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 800, color: sec.color, letterSpacing: 0.5, marginBottom: 8 }}>{phase.phase}</div>
                          {phase.steps.map((s, j) => (
                            <div key={j} style={{ display: 'flex', gap: 10, marginBottom: 7 }}>
                              <div style={{ width: 6, height: 6, borderRadius: '50%', background: sec.color, marginTop: 6, flexShrink: 0 }} />
                              <span style={{ color: text2, fontSize: 13, lineHeight: 1.5 }}>{s}</span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}

                  {sec.id === 'nutrition' && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {injury.nutrition.map(n => (
                        <span key={n} style={{ background: `${sec.color}12`, border: `1px solid ${sec.color}30`, borderRadius: 8, padding: '6px 12px', color: sec.color, fontSize: 12 }}>{n}</span>
                      ))}
                    </div>
                  )}

                  {sec.id === 'avoid' && (
                    <div>
                      {injury.avoid.map((a, i) => (
                        <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                          <span style={{ color: '#FF3057', fontSize: 14 }}>✕</span>
                          <span style={{ color: text2, fontSize: 13, lineHeight: 1.5 }}>{a}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      {/* Doctor Warning */}
      <div style={{ background: 'rgba(255,48,87,0.08)', border: '1px solid rgba(255,48,87,0.35)', borderRadius: 16, padding: '16px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <AlertTriangle size={16} color="#FF3057" />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, color: '#FF3057' }}>See a Doctor If...</span>
        </div>
        <p style={{ color: text2, fontSize: 13, margin: 0, lineHeight: 1.6 }}>{injury.doctorWhen}</p>
      </div>
    </motion.div>
  )
}

// ─── Category Page ──────────────────────────────────────────────
function CategoryPage({ cat, onBack, onSelectInjury }) {
  const { bg2, border, text, text2, text3 } = useTheme()
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: text3, marginBottom: 20, padding: 0 }}>
        <ArrowLeft size={16} /> <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, fontSize: 14 }}>BACK</span>
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <span style={{ fontSize: 36 }}>{cat.icon}</span>
        <div>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 900, color: text, margin: '0 0 4px' }}>{cat.label}</h2>
          <p style={{ color: text3, fontSize: 13, margin: 0 }}>{cat.desc}</p>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {cat.injuries.map((injury, i) => (
          <motion.button key={injury.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileTap={{ scale: 0.98 }}
            onClick={() => onSelectInjury(injury)}
            style={{ background: bg2, border: `1px solid ${cat.color}22`, borderRadius: 14, padding: '16px 18px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', transition: 'all 0.2s' }}>
            <span style={{ fontSize: 28, flexShrink: 0 }}>{injury.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 17, fontWeight: 800, color: text, marginBottom: 2 }}>{injury.name}</div>
              <div style={{ color: text3, fontSize: 12, marginBottom: 6 }}>{injury.subtitle}</div>
              <SeverityBadge severity={injury.severity} />
            </div>
            <ChevronRight size={15} color={text3} />
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Main Page ──────────────────────────────────────────────────
export default function FirstAid() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { bg, bg2, bg3, border, text, text2, text3 } = useTheme()
  const [selectedCat, setSelectedCat] = useState(null)
  const [selectedInjury, setSelectedInjury] = useState(null)

  useEffect(() => {
    const injuryParam = (searchParams.get('injury') || '').toLowerCase().trim()
    if (!injuryParam) return

    for (const cat of categories) {
      const injury = cat.injuries.find(i => i.id.toLowerCase() === injuryParam || i.name.toLowerCase() === injuryParam)
      if (injury) {
        setSelectedCat(cat)
        setSelectedInjury(injury)
        return
      }
    }
  }, [searchParams])

  const goBack = () => {
    if (selectedInjury) { setSelectedInjury(null); return }
    if (selectedCat)    { setSelectedCat(null); return }
  }

  return (
    <div style={{ minHeight: '100vh', background: bg, paddingBottom: 80, transition: 'background 0.3s' }}>
      <div style={{ padding: '56px 24px 24px', maxWidth: 480, margin: '0 auto' }}>
        <AnimatePresence mode="wait">

          {selectedInjury ? (
            <InjuryDetail key="injury" injury={selectedInjury} catColor={selectedCat.color} onBack={goBack} />
          ) : selectedCat ? (
            <CategoryPage key="cat" cat={selectedCat} onBack={goBack} onSelectInjury={setSelectedInjury} />
          ) : (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <button onClick={() => navigate('/home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: text3, marginBottom: 24, padding: 0 }}>
                <ArrowLeft size={16} /> <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, fontSize: 14 }}>HOME</span>
              </button>

              {/* Header */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,48,87,0.1)', border: '1px solid rgba(255,48,87,0.3)', borderRadius: 100, padding: '6px 14px', marginBottom: 16 }}>
                <Shield size={12} color="#FF3057" />
                <span style={{ color: '#FF3057', fontSize: 12, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1 }}>ATHLETE FIRST AID</span>
              </div>
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 44, fontWeight: 900, color: text, letterSpacing: -1, margin: '0 0 8px' }}>
                First Aid &<br /><span style={{ color: '#FF3057' }}>Recovery</span>
              </h1>
              <p style={{ color: text3, fontSize: 13, marginBottom: 28, lineHeight: 1.6 }}>
                Immediate first aid, recovery plans & nutrition for common athlete injuries
              </p>

              {/* Emergency Banner */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                style={{ background: 'rgba(255,48,87,0.1)', border: '1px solid rgba(255,48,87,0.4)', borderRadius: 16, padding: '14px 18px', marginBottom: 20, display: 'flex', gap: 12, alignItems: 'center' }}>
                <AlertTriangle size={20} color="#FF3057" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, color: '#FF3057', marginBottom: 2 }}>Life-Threatening Emergency?</div>
                  <div style={{ color: text2, fontSize: 12 }}>Unconscious / Not breathing / Severe bleeding / Chest pain → Call 108 / 112 immediately</div>
                </div>
              </motion.div>

              {/* Quick Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 24 }}>
                {[
                  { label: 'Overload Injuries', count: categories[0].injuries.length, color: '#FF4D00', icon: '🦴' },
                  { label: 'Open Injury', count: categories[1].injuries.length, color: '#FF3057', icon: '🩹' },
                  { label: 'Emergency', count: categories[2].injuries.length, color: '#FF3057', icon: '🚨' },
                ].map(s => (
                  <div key={s.label} style={{ background: bg2, border: `1px solid ${s.color}22`, borderRadius: 14, padding: '14px 10px', textAlign: 'center', transition: 'all 0.3s' }}>
                    <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 900, color: s.color }}>{s.count}</div>
                    <div style={{ color: text3, fontSize: 10, lineHeight: 1.3, marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Category Cards */}
              <p style={{ color: text3, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 14 }}>Select Category</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {categories.map((cat, i) => (
                  <motion.button key={cat.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCat(cat)}
                    style={{ background: bg2, border: `1px solid ${cat.color}33`, borderRadius: 18, padding: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left', transition: 'all 0.3s', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: `radial-gradient(circle, ${cat.color}15 0%, transparent 70%)`, pointerEvents: 'none' }} />
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: `${cat.color}18`, border: `1px solid ${cat.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
                      {cat.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 900, color: text, marginBottom: 4 }}>{cat.label}</div>
                      <div style={{ color: text2, fontSize: 12, marginBottom: 6 }}>{cat.desc}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ background: `${cat.color}20`, border: `1px solid ${cat.color}33`, borderRadius: 6, padding: '2px 8px' }}>
                          <span style={{ color: cat.color, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 700 }}>{cat.injuries.length} conditions</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={18} color={text3} />
                  </motion.button>
                ))}
              </div>

              {/* Disclaimer */}
              <div style={{ marginTop: 24, padding: '14px 16px', background: bg3, borderRadius: 12, border: `1px solid ${border}` }}>
                <p style={{ color: text3, fontSize: 11, margin: 0, lineHeight: 1.6, textAlign: 'center' }}>
                  ⚕️ This guide is for first aid reference only. Always consult a qualified physiotherapist or doctor for diagnosis and treatment.
                </p>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <BottomNav />
    </div>
  )
}