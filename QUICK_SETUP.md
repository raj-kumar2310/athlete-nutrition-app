# Quick Setup Guide - Premium Hero Section

## What Was Created

### 1. **HeroSection Component** (`src/components/HeroSection.jsx`)
The main hero component with all premium features:
- Animated dark theme with neon green/orange accents
- Glassmorphism cards
- Floating animations
- Statistics section
- Macro tracking visualization
- CTA buttons
- ~600 lines of production-ready code

### 2. **LandingPage** (`src/pages/LandingPage.jsx`)
Complete landing page featuring:
- HeroSection component
- 6-feature section
- 3 testimonials
- CTA section
- Footer
- Fully responsive

### 3. **HeroShowcase** (`src/pages/HeroShowcase.jsx`)
Interactive demo page with:
- Live preview of hero section
- Integration code examples
- Customization guides
- Copy-paste ready code snippets
- Advanced tips

### 4. **Documentation** (`HERO_DOCUMENTATION.md`)
Complete reference guide with:
- Component details
- Customization instructions
- Color scheme reference
- Animation breakdown
- SEO tips
- Troubleshooting

---

## 🚀 Quick Start (3 Steps)

### Step 1: View the Demo
Add this route to your `App.jsx`:

```jsx
import HeroShowcase from './pages/HeroShowcase';

<Route path="/hero-demo" element={<HeroShowcase />} />
```

Then visit `http://localhost:5173/hero-demo` to see everything in action.

### Step 2: Choose Your Setup

**Option A: Replace Home Page (Recommended)**
```jsx
// src/App.jsx
import LandingPage from './pages/LandingPage';

<Route path="/" element={<LandingPage />} />
```

**Option B: Add to Existing Home**
```jsx
import HeroSection from './components/HeroSection';

function Home() {
  return (
    <>
      <HeroSection />
      {/* Your existing home content */}
    </>
  );
}
```

**Option C: Keep as Separate Page**
```jsx
<Route path="/hero" element={<HeroSection />} />
```

### Step 3: Customize (Optional)

Update colors, text, and data in `HeroSection.jsx`:

```jsx
// Change headline
"Fuel Your Performance" → "Your Headline"

// Change colors
emerald-400 → cyan-400 (or your color)
orange-400 → pink-400 (or your color)

// Update stats
const stats = [
  { number: 'YOUR_NUMBER', label: 'Your Label', icon: Icon },
];
```

---

## 📋 File Structure

```
src/
├── components/
│   └── HeroSection.jsx          ← Main hero component
├── pages/
│   ├── HeroShowcase.jsx         ← Demo page with examples
│   └── LandingPage.jsx          ← Full landing page
├── App.jsx                       ← Update routes here
└── ...
HERO_DOCUMENTATION.md            ← Full docs
QUICK_SETUP.md                   ← This file
```

---

## 🎨 Key Features

### ✅ Premium Design
- Dark theme with neon accents
- Glassmorphism effects
- Professional gradient overlays
- High-end visual hierarchy

### ✅ Smooth Animations
- Fade-in entrance animations
- Floating element animations
- Hover effects on all interactive elements
- Glow animations on key elements
- Scroll-reveal animations

### ✅ Fully Responsive
- Mobile optimized (< 640px)
- Tablet optimized (640px - 1024px)
- Desktop optimized (1024px+)
- Touch-friendly buttons
- Flexible layout

### ✅ Production Ready
- No external dependencies beyond what's already installed
- Optimized for performance (GPU-accelerated animations)
- Accessible (semantic HTML, high contrast)
- SEO friendly
- Browser compatible (Chrome, Firefox, Safari, Edge)

---

## 🎯 Customization Examples

### Example 1: Change Primary Color
```jsx
// Replace all instances of:
emerald-400  →  cyan-400
emerald-500  →  cyan-500
emerald-600  →  cyan-600

// In classes like:
className="from-emerald-400 to-orange-400"
// Becomes:
className="from-cyan-400 to-orange-400"
```

### Example 2: Update Statistics
```jsx
// In HeroSection.jsx, find:
const stats = [
  { number: '10K+', label: 'Meals Tracked', icon: Apple },
  { number: '5K+', label: 'Athletes', icon: TrendingUp },
  { number: '95%', label: 'Satisfaction', icon: Award },
];

// Change to your data:
const stats = [
  { number: '50K+', label: 'Active Users', icon: Users },
  { number: '1M+', label: 'Plans Generated', icon: Zap },
  { number: '98%', label: 'Retention', icon: Heart },
];
```

### Example 3: Change Button Text
```jsx
// Find the CTA buttons section and change:
<span className="...">Start Free</span>
// To:
<span className="...">Sign Up Free</span>

// And:
<span className="...">Generate Meal Plan</span>
// To:
<span className="...">Get My Plan</span>
```

### Example 4: Add Click Handlers
```jsx
// Import useNavigate
import { useNavigate } from 'react-router-dom';

// In HeroSection component:
const navigate = useNavigate();

// Add handler:
const handleStartFree = () => {
  navigate('/signup');
  // Or open modal, send analytics, etc.
};

// Update button:
<motion.button
  onClick={handleStartFree}
  // ... other props
>
  Start Free
</motion.button>
```

---

## 📊 Data Structure Reference

### Statistics Format
```jsx
const stats = [
  { 
    number: string,        // e.g., '10K+'
    label: string,         // e.g., 'Meals Tracked'
    icon: IconComponent    // e.g., Apple
  }
];
```

### Macros Format
```jsx
const macros = [
  {
    label: string,         // e.g., 'Protein'
    value: number,         // e.g., 156
    max: number,           // e.g., 200
    color: string,         // e.g., 'from-orange-400 to-orange-600'
    icon: IconComponent    // e.g., Flame
  }
];
```

### Features Format
```jsx
{
  title: string,             // Feature title
  description: string,       // Feature description
  icon: IconComponent,       // Lucide icon
  delay: number              // Animation delay (0, 0.1, 0.2, etc.)
}
```

---

## 🔧 Advanced Setup

### With React Router Navigation
```jsx
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const navigate = useNavigate();

  const handleStartFree = () => navigate('/signup');
  const handleGeneratePlan = () => navigate('/generate-plan');

  // Add onClick to buttons
}
```

### With State Management (Zustand)
```jsx
import { useUserStore } from '../stores/userStore';

function HeroSection() {
  const { user, setUser } = useUserStore();

  const handleStartFree = () => {
    // Use Zustand store
    setUser({ onboardingComplete: false });
  };
}
```

### With Analytics
```jsx
const handleStartFree = () => {
  // Track event
  gtag.event('hero_button_clicked', {
    button_name: 'start_free',
    timestamp: new Date(),
  });

  navigate('/signup');
};
```

---

## 📱 Responsive Behavior

### Mobile (< 640px)
- Single column layout
- Stacked buttons
- Smaller font sizes
- Touch-optimized spacing
- Full-width cards

### Tablet (640px - 1024px)
- 2-column layouts
- Side-by-side buttons
- Medium font sizes
- Balanced spacing

### Desktop (1024px+)
- 3-column layouts
- Full animations
- Large font sizes
- Premium spacing
- Complex layouts

---

## 🚨 Troubleshooting

### Animations not smooth?
- Ensure Framer Motion is installed
- Check browser DevTools Performance tab
- Try reducing animation duration for testing

### Colors look different?
- Clear browser cache (Ctrl+Shift+Delete)
- Ensure Tailwind is processing the file
- Check that className strings are complete

### Responsive issues?
- Test with browser DevTools device emulation
- Check viewport meta tag in HTML head
- Verify Tailwind breakpoints match media queries

### Component not loading?
- Verify import path is correct
- Check that file exists in specified location
- Ensure no typos in route path

---

## 📚 Resources

- **Framer Motion Docs:** https://www.framer.com/motion/
- **Tailwind CSS Docs:** https://tailwindcss.com/
- **Lucide Icons:** https://lucide.dev/
- **React Router:** https://reactrouter.com/

---

## ✨ Next Steps

1. **View Demo:** Add HeroShowcase route and explore
2. **Pick Setup:** Choose Option A, B, or C above
3. **Customize:** Update colors and text
4. **Add Handlers:** Connect buttons to your routes
5. **Deploy:** Push to production

---

## 📞 Support

All components use only standard React, Tailwind CSS, and Framer Motion.
No custom hooks or utilities required.

For questions:
- Check `HERO_DOCUMENTATION.md` for detailed reference
- Visit `HeroShowcase.jsx` page for code examples
- Reference original component in `HeroSection.jsx`

---

**Version:** 1.0  
**Last Updated:** May 2026  
**Status:** ✅ Production Ready
