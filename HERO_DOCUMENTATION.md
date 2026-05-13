# Premium Hero Section & Landing Page Documentation

## Overview
A complete, production-ready hero section and landing page for an AI-powered athlete nutrition application. Built with React, Tailwind CSS, and Framer Motion with a premium dark theme and neon green/orange accents.

## Components

### 1. HeroSection Component
**Location:** `src/components/HeroSection.jsx`

The main hero component featuring:
- Animated gradient background with glowing orbs
- Headline and subheadline
- Dual CTA buttons (Start Free, Generate Meal Plan)
- Statistics section (10K+ Meals, 5K+ Athletes, 95% Satisfaction)
- Interactive macro tracking cards (Protein, Carbs, Fats)
- Animated calorie dashboard preview
- Feature cards (AI Meal Plans, Real-Time Tracking, Performance Analytics)
- Floating particles and glassmorphism effects

#### Usage
```jsx
import HeroSection from '../components/HeroSection';

function App() {
  return <HeroSection />;
}
```

#### Features
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Smooth entrance animations
- ✅ Floating/floating animations on elements
- ✅ Hover effects on all interactive elements
- ✅ Glassmorphism cards with backdrop blur
- ✅ Animated progress bars and circular progress
- ✅ Glow effects on key elements
- ✅ Touch-friendly buttons

### 2. LandingPage Component
**Location:** `src/pages/LandingPage.jsx`

A complete landing page that includes:
- Hero section
- Features grid (6 key features)
- Testimonials section with 3 athlete testimonials
- Call-to-action section
- Footer with navigation

#### Usage
```jsx
import LandingPage from '../pages/LandingPage';

function App() {
  return <LandingPage />;
}
```

## Color Scheme

### Primary Colors
- **Neon Green:** `#10b981` (emerald-400/500)
- **Neon Orange:** `#f97316` (orange-400/500)

### Neutral Colors
- **Dark Background:** `#000000` (black)
- **Text Primary:** `#ffffff` (white)
- **Text Secondary:** `#cbd5e1` (slate-300)
- **Text Tertiary:** `#64748b` (slate-400)
- **Borders:** `rgba(255, 255, 255, 0.1)`
- **Glass:** `rgba(255, 255, 255, 0.05)`

### Accent Colors
- Blue: `#0ea5e9` (cyan-400/500)
- Purple: `#a855f7` (purple-500)

## Animation Details

### Entrance Animations
- Staggered fade-in with vertical translation
- Delay: 0.1s between items
- Total delay: 0.2s before animation starts

### Floating Animations
- Vertical Y-axis motion: ±20px
- Duration: 3 seconds
- Repeat: Infinite
- Easing: EaseInOut

### Glow Animations
- Box shadow pulsing
- Color shift: emerald to emerald (intensity variation)
- Duration: 3 seconds
- Repeat: Infinite

### Hover Effects
- Scale: 1.05x
- Transition: Smooth
- Used on buttons, cards, and interactive elements

### Scroll Reveal
- Elements animate in when they come into view
- `whileInView` variants used
- `once: true` for single animation

## Customization Guide

### 1. Change Color Scheme
Update the color references in tailwind class names:

```jsx
// Change neon green to different color
from-emerald-400  → from-cyan-400
to-emerald-600    → to-cyan-600

// Change neon orange
to-orange-400     → to-pink-400
to-orange-500     → to-pink-500
```

### 2. Modify Text Content

**Headline:**
```jsx
// In HeroSection.jsx
Fuel Your Performance → Your Custom Headline
```

**Subheadline:**
```jsx
// Find this line and update
Get personalized meal plans... → Your custom description
```

**Button Text:**
```jsx
// CTA Buttons
"Start Free" → "Your Button Text"
"Generate Meal Plan" → "Your Button Text"
```

### 3. Adjust Spacing and Sizing

**Padding adjustments:**
```jsx
// Hero section padding
pt-20 pb-24  // Change these values

// Card padding
p-5, p-8, p-12  // Modify as needed
```

**Font sizes:**
```jsx
// Headline sizes
text-4xl sm:text-5xl lg:text-7xl  // Adjust breakpoints

// Subheadline
text-lg sm:text-xl  // Modify sizes
```

### 4. Modify Animation Duration
```jsx
// Change animation speed
duration: 3  → duration: 2  // Faster
duration: 3  → duration: 5  // Slower
```

### 5. Adjust Statistics
```jsx
// In HeroSection.jsx, update the stats array
const stats = [
  { number: '10K+', label: 'Meals Tracked', icon: Apple },
  { number: '5K+', label: 'Athletes', icon: TrendingUp },
  { number: '95%', label: 'Satisfaction', icon: Award },
];
```

### 6. Modify Macro Tracking Data
```jsx
// In HeroSection.jsx, update the macros array
const macros = [
  { label: 'Protein', value: 156, max: 200, ... },
  { label: 'Carbs', value: 285, max: 350, ... },
  { label: 'Fats', value: 78, max: 100, ... },
];
```

### 7. Change Feature Cards Content
```jsx
// In HeroSection.jsx, update the features array
{
  title: 'AI Meal Plans',
  description: 'Your custom description',
  icon: YourIcon,
  delay: 0,
}
```

## Integration with Existing App

### Option 1: Set as Landing Page (Recommended)
Update your routing in `App.jsx`:

```jsx
import LandingPage from './pages/LandingPage';

<Routes>
  <Route path="/" element={<LandingPage />} />
  {/* Other routes */}
</Routes>
```

### Option 2: Add Hero to Home Page
```jsx
import HeroSection from '../components/HeroSection';

function Home() {
  return (
    <div>
      <HeroSection />
      {/* Other home page content */}
    </div>
  );
}
```

### Option 3: Create Separate Marketing Route
```jsx
import HeroSection from '../components/HeroSection';

<Routes>
  <Route path="/marketing" element={<HeroSection />} />
  {/* Other routes */}
</Routes>
```

## Performance Optimizations

### 1. Image Optimization
The component uses CSS gradients instead of images for better performance.

### 2. Animation Performance
- Uses `transform` and `opacity` for GPU-accelerated animations
- Avoids animating layout properties
- Uses `will-change` CSS internally via Framer Motion

### 3. Lazy Loading
Use with `React.lazy()` for code splitting:

```jsx
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
```

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari 14+, Chrome Android 90+)

## Responsive Breakpoints

- **Mobile:** < 640px (sm)
- **Tablet:** 640px - 1024px (md)
- **Desktop:** 1024px+ (lg)

All components are optimized for these breakpoints.

## Dependencies

Required packages (already in your project):
- `react`: ^19.2.4
- `framer-motion`: ^12.38.0
- `tailwindcss`: ^4.2.2
- `lucide-react`: ^1.7.0

## Accessibility Features

- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy
- ✅ Alt text concepts for icons
- ✅ High color contrast (WCAG AA compliant)
- ✅ Keyboard navigation support
- ✅ Focus states on interactive elements

## SEO Optimization

To enhance SEO, add Meta tags to your HTML head:

```html
<meta name="description" content="AI-powered nutrition tracking for elite athletes. Personalized meal plans, real-time macro tracking, and performance optimization.">
<meta name="keywords" content="athlete nutrition, meal planning, macro tracking, fitness app">
<meta property="og:title" content="Athlete AI - Fuel Your Performance">
<meta property="og:description" content="AI-powered nutrition for elite athletes">
<meta property="og:image" content="path-to-preview-image">
```

## Common Customizations

### 1. Add Navigation Bar
```jsx
import Navigation from '../components/Navigation';

function LandingPage() {
  return (
    <div>
      <Navigation />
      <HeroSection />
      {/* rest of content */}
    </div>
  );
}
```

### 2. Add Form to CTA Button
```jsx
const handleStartFree = () => {
  // Navigate to signup
  navigate('/signup');
  // or open modal
  setShowSignupModal(true);
};
```

### 3. Add Analytics Tracking
```jsx
import { trackEvent } from '../utils/analytics';

const handleStartFree = () => {
  trackEvent('hero_cta_clicked', { button: 'start_free' });
  navigate('/signup');
};
```

### 4. Dark/Light Mode Support
The component already uses Tailwind's dark mode classes. Toggle with:

```jsx
// In your root component
<div className={darkMode ? 'dark' : ''}>
  <LandingPage />
</div>
```

## Troubleshooting

### Animations not working?
- Ensure Framer Motion is installed: `npm install framer-motion`
- Check that component has unique keys in `.map()` loops
- Verify Tailwind CSS is properly configured

### Colors not applying?
- Clear Tailwind cache: Delete `.next` or build folder
- Ensure Tailwind config includes the component files
- Check that Tailwind CSS is imported in your main CSS file

### Responsive issues?
- Test in different viewport sizes using browser DevTools
- Ensure no fixed widths override responsive classes
- Check that max-width container is working: `max-w-7xl`

## Advanced Customizations

### 1. Add Custom Background Effect
```jsx
// Add this inside the background container div
<motion.div
  className="absolute inset-0 pointer-events-none"
  style={{
    backgroundImage: 'radial-gradient(...)',
    opacity: 0.5,
  }}
  animate={{ rotate: 360 }}
  transition={{ duration: 20, repeat: Infinity }}
/>
```

### 2. Add Video Background
```jsx
// Replace CSS gradient background with video
<video
  className="absolute inset-0 w-full h-full object-cover"
  autoPlay
  loop
  muted
>
  <source src="path/to/video.mp4" type="video/mp4" />
</video>
```

### 3. Add Newsletter Signup
```jsx
// Add to CTA section
<form onSubmit={handleNewsletterSignup}>
  <input 
    type="email" 
    placeholder="Enter your email"
    className="px-4 py-2 rounded-lg bg-white/10 border border-white/20"
  />
  <button type="submit">Subscribe</button>
</form>
```

## Files Created

1. **HeroSection.jsx** - Main hero component
2. **LandingPage.jsx** - Complete landing page with hero
3. **HERO_DOCUMENTATION.md** - This documentation file

## Next Steps

1. Update color scheme to match your brand
2. Modify copy to match your messaging
3. Replace placeholder icons/stats with real data
4. Integrate with your backend for dynamic content
5. Add analytics tracking
6. Test on multiple devices
7. Deploy and monitor performance

## Support

For questions about Framer Motion:
- [Framer Motion Docs](https://www.framer.com/motion/)

For Tailwind CSS:
- [Tailwind CSS Docs](https://tailwindcss.com/)

For Lucide Icons:
- [Lucide Icon Library](https://lucide.dev/)

---

Last Updated: May 2026
Version: 1.0
