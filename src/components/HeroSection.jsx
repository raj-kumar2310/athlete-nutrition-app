import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  TrendingUp, 
  Award, 
  Apple, 
  Flame, 
  Droplets,
  ChevronRight,
  Play
} from 'lucide-react';

const HeroSection = () => {
  const [hoveredButton, setHoveredButton] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        '0 0 20px rgba(34, 197, 94, 0.3)',
        '0 0 40px rgba(34, 197, 94, 0.5)',
        '0 0 20px rgba(34, 197, 94, 0.3)',
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
      },
    },
  };

  const stats = [
    { number: '10K+', label: 'Meals Tracked', icon: Apple },
    { number: '5K+', label: 'Athletes', icon: TrendingUp },
    { number: '95%', label: 'Satisfaction', icon: Award },
  ];

  const macros = [
    { label: 'Protein', value: 156, max: 200, color: 'from-orange-400 to-orange-600', icon: Flame },
    { label: 'Carbs', value: 285, max: 350, color: 'from-emerald-400 to-emerald-600', icon: Droplets },
    { label: 'Fats', value: 78, max: 100, color: 'from-blue-400 to-blue-600', icon: Zap },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-black">
      {/* Animated Background Grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900" />
        
        {/* Animated Glow Orbs */}
        <motion.div
          className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            x: [50, 0, 50],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-orange-500/10 border border-emerald-500/30 backdrop-blur-md"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2" />
              <span className="text-sm font-medium text-emerald-400">Trusted by Elite Athletes</span>
            </motion.div>
          </motion.div>

          {/* Main Headline */}
          <motion.div variants={itemVariants} className="text-center mb-6">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-orange-400 bg-clip-text text-transparent">
                Fuel Your Performance
              </span>
              <br />
              <span className="text-white">
                With AI-Powered Nutrition
              </span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-lg sm:text-xl text-slate-300">
              Get personalized meal plans, real-time macro tracking, and AI-powered nutrition insights tailored to your athletic goals. Optimize every calorie for peak performance.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            {/* Start Free Button */}
            <motion.button
              onHoverStart={() => setHoveredButton('start')}
              onHoverEnd={() => setHoveredButton(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-4 rounded-xl font-semibold text-lg group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-500" />
              <span className="relative flex items-center justify-center text-white">
                Start Free
                <ChevronRight className={`ml-2 w-5 h-5 transition-transform ${hoveredButton === 'start' ? 'translate-x-1' : ''}`} />
              </span>
            </motion.button>

            {/* Generate Plan Button */}
            <motion.button
              onHoverStart={() => setHoveredButton('plan')}
              onHoverEnd={() => setHoveredButton(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl font-semibold text-lg group overflow-hidden border border-emerald-500/30 backdrop-blur-md"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center text-emerald-400 group-hover:text-emerald-300 transition-colors">
                Generate Meal Plan
                <Play className={`ml-2 w-4 h-4 transition-transform ${hoveredButton === 'plan' ? 'translate-x-1' : ''}`} />
              </span>
            </motion.button>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 sm:gap-6 mb-20 max-w-md mx-auto sm:max-w-full"
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="text-center p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-colors"
                >
                  <div className="flex justify-center mb-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-orange-500/20">
                      <IconComponent className="w-5 h-5 text-emerald-400" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1">{stat.number}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Main Dashboard Preview */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Macro Cards */}
              <div className="lg:col-span-1 space-y-4">
                {macros.map((macro, index) => {
                  const MacroIcon = macro.icon;
                  const percentage = (macro.value / macro.max) * 100;
                  return (
                    <motion.div
                      key={index}
                      variants={floatingVariants}
                      animate="animate"
                      style={{ animationDelay: `${index * 0.2}s` }}
                      whileHover={{ scale: 1.05, y: -10 }}
                      className="p-5 rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-emerald-500/30 transition-colors shadow-xl"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${macro.color}`}>
                            <MacroIcon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm font-semibold text-white">{macro.label}</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-400">{percentage.toFixed(0)}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className={`h-full bg-gradient-to-r ${macro.color}`}
                        />
                      </div>
                      <div className="mt-2 text-xs text-slate-400">
                        {macro.value}g / {macro.max}g
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Center Column - Main Dashboard */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="lg:col-span-1 relative group"
              >
                <motion.div
                  variants={glowVariants}
                  animate="animate"
                  className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 to-orange-500/30 rounded-3xl blur-2xl"
                />
                <div className="relative p-8 rounded-3xl backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-2xl">
                  {/* Calorie Circle */}
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="relative w-40 h-40">
                      <motion.svg
                        className="absolute inset-0 -rotate-90"
                        viewBox="0 0 160 160"
                      >
                        <circle
                          cx="80"
                          cy="80"
                          r="75"
                          fill="none"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="8"
                        />
                        <motion.circle
                          cx="80"
                          cy="80"
                          r="75"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="8"
                          strokeLinecap="round"
                          initial={{ strokeDasharray: '0 471' }}
                          animate={{ strokeDasharray: '353 471' }}
                          transition={{ duration: 2, delay: 0.5 }}
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#f97316" />
                          </linearGradient>
                        </defs>
                      </motion.svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-4xl font-bold text-emerald-400">1,850</div>
                        <div className="text-xs text-slate-400 mt-1">Calories</div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    {[
                      { label: 'Carbs', value: '285g', color: 'emerald' },
                      { label: 'Protein', value: '156g', color: 'orange' },
                      { label: 'Fats', value: '78g', color: 'blue' },
                      { label: 'Water', value: '2.5L', color: 'cyan' },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className={`p-3 rounded-lg bg-${stat.color}-500/10 border border-${stat.color}-500/20 text-center`}
                      >
                        <div className={`text-xs text-${stat.color}-400 mb-1`}>{stat.label}</div>
                        <div className="text-sm font-bold text-white">{stat.value}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Feature Cards */}
              <div className="lg:col-span-1 space-y-4">
                {[
                  {
                    title: 'AI Meal Plans',
                    description: 'Personalized nutrition for your goals',
                    icon: Zap,
                    delay: 0,
                  },
                  {
                    title: 'Real-Time Tracking',
                    description: 'Monitor macros instantly',
                    icon: TrendingUp,
                    delay: 0.1,
                  },
                  {
                    title: 'Performance Analytics',
                    description: 'Data-driven insights',
                    icon: Award,
                    delay: 0.2,
                  },
                ].map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={floatingVariants}
                      animate="animate"
                      style={{ animationDelay: `${feature.delay}s` }}
                      whileHover={{ scale: 1.05, x: 10 }}
                      className="p-5 rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-orange-500/30 transition-colors shadow-xl group cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/20 group-hover:from-orange-500/30 group-hover:to-orange-600/30 transition-colors">
                          <FeatureIcon className="w-5 h-5 text-orange-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                          <p className="text-xs text-slate-400">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Floating Particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-emerald-400 rounded-full"
                animate={{
                  x: Math.cos((i / 6) * Math.PI * 2) * 200,
                  y: Math.sin((i / 6) * Math.PI * 2) * 200,
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                style={{
                  left: '50%',
                  top: '50%',
                  marginLeft: '-2px',
                  marginTop: '-2px',
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
};

export default HeroSection;
