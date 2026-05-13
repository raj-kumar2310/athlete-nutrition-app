import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import { ChevronDown, Code, Eye, Copy } from 'lucide-react';

/**
 * Hero Showcase Component
 * 
 * This page demonstrates the Hero Section component and provides:
 * - Live preview of the hero section
 * - Code examples for integration
 * - Customization options
 * - Copy-paste ready code snippets
 */

const HeroShowcase = () => {
  const [activeTab, setActiveTab] = useState('preview');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const integrationCode = `import HeroSection from '../components/HeroSection';

function App() {
  return (
    <div>
      <HeroSection />
      {/* Rest of your app */}
    </div>
  );
}

export default App;`;

  const customizationCode = `// To customize the hero section:

// 1. Update headline text in HeroSection.jsx
h1 className="...">
  <span>Your Custom Headline</span>
  <br />
  <span>Second Line</span>
</h1>

// 2. Change colors by updating Tailwind classes
from-emerald-400  // Primary color
to-orange-400     // Secondary color

// 3. Modify animation duration
animate={{
  y: [0, -20, 0],
  transition: {
    duration: 3,  // Change this value
  },
}}

// 4. Update statistics
const stats = [
  { number: '10K+', label: 'Your Label', icon: Icon },
];`;

  const advancedCode = `// Advanced: Add onClick handlers to buttons

const handleStartFree = () => {
  // Navigate to signup
  navigate('/signup');
  // Or show modal
  showSignupModal();
};

const handleGenerateMealPlan = () => {
  // Generate plan
  generateMealPlan();
  // Track event
  trackEvent('meal_plan_generated');
};

// Then update buttons:
<motion.button
  onClick={handleStartFree}
  onHoverStart={() => setHoveredButton('start')}
  // ... rest of props
>
  Start Free
</motion.button>`;

  const sections = [
    {
      id: 'preview',
      label: 'Live Preview',
      icon: Eye,
    },
    {
      id: 'integration',
      label: 'Integration',
      icon: Code,
    },
    {
      id: 'customization',
      label: 'Customization',
      icon: Code,
    },
    {
      id: 'advanced',
      label: 'Advanced',
      icon: Code,
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-50 px-4 sm:px-6 lg:px-8 py-4 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl lg:text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">
            Hero Section Showcase
          </h1>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    activeTab === section.id
                      ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400'
                      : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Preview Tab */}
        {activeTab === 'preview' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Live Hero Section</h2>
              <p className="text-slate-400 mb-6">
                Below is the fully interactive hero section. Try hovering over buttons and cards to see the animations in action.
              </p>
              <div className="rounded-xl overflow-hidden border border-white/10">
                <HeroSection />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: 'Responsive',
                  desc: 'Works perfectly on all screen sizes',
                },
                {
                  title: 'Animated',
                  desc: 'Smooth 60fps animations',
                },
                {
                  title: 'Interactive',
                  desc: 'Rich hover and click interactions',
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10"
                >
                  <h3 className="font-semibold text-emerald-400 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Integration Tab */}
        {activeTab === 'integration' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Integration Guide</h2>

              <div className="space-y-6">
                {/* Step 1 */}
                <div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold">
                      1
                    </span>
                    Import the Component
                  </h3>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-white/10 overflow-x-auto">
                    <pre className="text-sm text-slate-300 font-mono">
                      {`import HeroSection from '../components/HeroSection';\n\n// For full landing page:\nimport LandingPage from '../pages/LandingPage';`}
                    </pre>
                  </div>
                </div>

                {/* Step 2 */}
                <div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold">
                      2
                    </span>
                    Update Your Routes (App.jsx)
                  </h3>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-white/10 overflow-x-auto">
                    <pre className="text-sm text-slate-300 font-mono">
                      {`// Option A: Replace Welcome page\n<Route path="/" element={<LandingPage />} />\n\n// Option B: Keep separate route\n<Route path="/hero" element={<HeroSection />} />\n\n// Option C: Add to existing home\n<Route path="/home" element={\n  <>\n    <HeroSection />\n    <Home />\n  </>\n} />`}
                    </pre>
                  </div>
                </div>

                {/* Step 3 */}
                <div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold">
                      3
                    </span>
                    Done! No Additional Setup Required
                  </h3>
                  <p className="text-slate-300">
                    All dependencies (React, Framer Motion, Tailwind, Lucide) are already installed in your project.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Copy Box */}
            <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Quick Integration Code</h3>
                <button
                  onClick={() => copyToClipboard(integrationCode)}
                  className="flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-white/10 overflow-x-auto">
                <pre className="text-sm text-slate-300 font-mono">{integrationCode}</pre>
              </div>
            </div>
          </div>
        )}

        {/* Customization Tab */}
        {activeTab === 'customization' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Customization Options</h2>

              <div className="space-y-6">
                {/* Colors */}
                <div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3">1. Change Colors</h3>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-white/10 overflow-x-auto">
                    <pre className="text-sm text-slate-300 font-mono">
                      {`// Primary Green (currently: emerald-400)\n<span className="from-emerald-400">\n  → Change to: cyan-400, lime-400, teal-400\n\n// Secondary Orange (currently: orange-400)\n<span className="to-orange-400">\n  → Change to: pink-400, amber-400, red-400`}
                    </pre>
                  </div>
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3">2. Update Text Content</h3>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-white/10 overflow-x-auto">
                    <pre className="text-sm text-slate-300 font-mono">
                      {`// Find these strings in HeroSection.jsx and replace:\n\n// Main headline\n"Fuel Your Performance With AI-Powered Nutrition"\n\n// Subheadline\n"Get personalized meal plans..."\n\n// Button text\n"Start Free"\n"Generate Meal Plan"\n\n// Statistics\nconst stats = [\n  { number: '10K+', label: 'Meals Tracked', ... },\n  { number: '5K+', label: 'Athletes', ... },\n  { number: '95%', label: 'Satisfaction', ... },\n];`}
                    </pre>
                  </div>
                </div>

                {/* Icons */}
                <div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3">3. Change Icons</h3>
                  <p className="text-slate-300 mb-3">
                    The component uses Lucide React icons. Browse all available icons at{' '}
                    <a href="https://lucide.dev" className="text-emerald-400 hover:underline" target="_blank" rel="noreferrer">
                      lucide.dev
                    </a>
                  </p>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-white/10 overflow-x-auto">
                    <pre className="text-sm text-slate-300 font-mono">
                      {`import { 
  Zap, TrendingUp, Award, Apple, 
  Flame, Droplets, ChevronRight, Play,
  // Add more icons here
  Heart, Smile, Shield, Star
} from 'lucide-react';`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Copy Box */}
            <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Customization Code Template</h3>
                <button
                  onClick={() => copyToClipboard(customizationCode)}
                  className="flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-white/10 overflow-x-auto">
                <pre className="text-sm text-slate-300 font-mono">{customizationCode}</pre>
              </div>
            </div>
          </div>
        )}

        {/* Advanced Tab */}
        {activeTab === 'advanced' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Advanced Customizations</h2>

              <div className="space-y-6">
                {/* onClick Handlers */}
                <div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3">1. Add Click Handlers</h3>
                  <p className="text-slate-300 mb-3">Add functionality to the CTA buttons:</p>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-white/10 overflow-x-auto">
                    <pre className="text-sm text-slate-300 font-mono">
                      {`// In HeroSection.jsx, update the button onClick:\n\nconst handleStartFree = () => {\n  // Navigate to signup\n  navigate('/signup');\n  // Or open modal\n  setShowModal(true);\n  // Track analytics\n  trackEvent('hero_cta_clicked');\n};\n\n<motion.button onClick={handleStartFree}>\n  Start Free\n</motion.button>`}
                    </pre>
                  </div>
                </div>

                {/* Dynamic Data */}
                <div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3">2. Use Dynamic Data</h3>
                  <p className="text-slate-300 mb-3">Connect to your API or state management:</p>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-white/10 overflow-x-auto">
                    <pre className="text-sm text-slate-300 font-mono">
                      {`import { useQuery } from '@tanstack/react-query';\n\nfunction HeroSection() {\n  const { data: stats } = useQuery({\n    queryKey: ['hero-stats'],\n    queryFn: () => fetch('/api/stats').then(r => r.json())\n  });\n\n  if (!stats) return <Skeleton />;\n\n  return (\n    // Use stats.mealsTracked, stats.athletes, etc.\n  );\n}`}
                    </pre>
                  </div>
                </div>

                {/* Add Features */}
                <div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3">3. Add More Features</h3>
                  <p className="text-slate-300 mb-3">Extend the component with additional sections:</p>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-white/10 overflow-x-auto">
                    <pre className="text-sm text-slate-300 font-mono">
                      {`// Add email signup form\n<form onSubmit={handleNewsletterSignup}>\n  <input type="email" placeholder="..." />\n  <button>Subscribe</button>\n</form>\n\n// Add video background\n<video autoPlay muted loop>\n  <source src="background.mp4" type="video/mp4" />\n</video>\n\n// Add social proof badges\n<div className="flex gap-2">\n  <img src="techcrunch.svg" />\n  <img src="producthunt.svg" />\n</div>`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Copy Box */}
            <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Advanced Handler Template</h3>
                <button
                  onClick={() => copyToClipboard(advancedCode)}
                  className="flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                >
                  <Copy className="w-4 h4" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-white/10 overflow-x-auto">
                <pre className="text-sm text-slate-300 font-mono">{advancedCode}</pre>
              </div>
            </div>

            {/* Tips */}
            <div className="p-6 rounded-2xl backdrop-blur-md bg-emerald-500/10 border border-emerald-500/20">
              <h3 className="font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                <ChevronDown className="w-4 h-4" />
                Pro Tips
              </h3>
              <ul className="text-slate-300 space-y-2 text-sm">
                <li>• Use React Router for navigation: `navigate('/signup')`</li>
                <li>• Implement Zustand stores for state: `useUserStore()`</li>
                <li>• Add analytics: Track button clicks and conversions</li>
                <li>• Test animations: Reduce motion for accessibility</li>
                <li>• Performance: Use `React.lazy()` for code splitting</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 mt-12 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-slate-400 text-sm">
          <p>
            Need help? Check the{' '}
            <a href="#" className="text-emerald-400 hover:underline">
              full documentation
            </a>
            {' '}or visit the{' '}
            <a href="https://framer.com/motion" className="text-emerald-400 hover:underline" target="_blank" rel="noreferrer">
              Framer Motion docs
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroShowcase;
