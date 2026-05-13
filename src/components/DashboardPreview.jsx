import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell
} from 'recharts';
import {
  Droplets, Flame, Activity, Apple, Zap, TrendingUp, Heart, Clock,
  Utensils, Target, Award, AlertCircle, ChevronRight, Download
} from 'lucide-react';

const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [hoveredCard, setHoveredCard] = useState(null);

  // Progress data
  const progressData = [
    { time: '6AM', calories: 200 },
    { time: '9AM', calories: 550 },
    { time: '12PM', calories: 1150 },
    { time: '3PM', calories: 1450 },
    { time: '6PM', calories: 1850 },
    { time: '9PM', calories: 2150 },
  ];

  // Macronutrient data
  const macroData = [
    { name: 'Protein', value: 156, color: '#f97316' },
    { name: 'Carbs', value: 285, color: '#10b981' },
    { name: 'Fats', value: 78, color: '#3b82f6' },
  ];

  // Hydration data
  const hydrationData = [
    { time: 'Morning', amount: 500 },
    { time: 'Mid-day', amount: 750 },
    { time: 'Afternoon', amount: 600 },
    { time: 'Evening', amount: 400 },
  ];

  // Weekly performance data
  const weeklyData = [
    { day: 'Mon', score: 78 },
    { day: 'Tue', score: 82 },
    { day: 'Wed', score: 75 },
    { day: 'Thu', score: 88 },
    { day: 'Fri', score: 90 },
    { day: 'Sat', score: 85 },
    { day: 'Sun', score: 92 },
  ];

  // Meal suggestions
  const mealSuggestions = [
    { name: 'Grilled Chicken', protein: 35, carbs: 0, fats: 8, time: 'Lunch', icon: '🍗', score: 95 },
    { name: 'Sweet Potato Bowl', protein: 8, carbs: 45, fats: 2, time: 'Dinner', icon: '🥗', score: 88 },
    { name: 'Protein Shake', protein: 30, carbs: 5, fats: 1, time: 'Post-Workout', icon: '🥛', score: 92 },
  ];

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
      transition: { duration: 0.8 },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="relative w-full bg-black text-white overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">
                Your Personal Nutrition Dashboard
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Real-time nutrition tracking, AI-powered recommendations, and performance insights all in one place.
            </p>
          </motion.div>

          {/* Dashboard Grid */}
          <motion.div
            className="grid lg:grid-cols-3 gap-6 mb-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Left Column - Mobile Mockup */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <motion.div
                className="relative group"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                {/* Phone Frame */}
                <div className="relative mx-auto w-full max-w-sm">
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute -inset-3 bg-gradient-to-r from-emerald-500/30 to-orange-500/30 rounded-3xl blur-2xl"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  {/* Phone Body */}
                  <div className="relative bg-black rounded-3xl p-3 border border-white/20 overflow-hidden shadow-2xl">
                    {/* Screen */}
                    <div className="bg-gradient-to-br from-slate-900 to-black rounded-2xl overflow-hidden">
                      {/* Notch */}
                      <div className="h-6 bg-black flex items-center justify-center">
                        <div className="h-3 w-32 bg-black rounded-full" />
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-4">
                        {/* Time */}
                        <div className="text-center">
                          <div className="text-3xl font-bold text-white">9:41</div>
                        </div>

                        {/* Calories Card */}
                        <div className="p-3 rounded-lg backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-slate-400">Today</span>
                            <Flame className="w-4 h-4 text-orange-400" />
                          </div>
                          <div className="text-2xl font-bold text-emerald-400">1,850</div>
                          <div className="text-xs text-slate-500">of 2,200 cal</div>
                          <div className="h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-emerald-400 to-orange-400 w-5/6" />
                          </div>
                        </div>

                        {/* Macros */}
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { label: 'P', value: '156g', color: 'orange' },
                            { label: 'C', value: '285g', color: 'emerald' },
                            { label: 'F', value: '78g', color: 'blue' },
                          ].map((macro, i) => (
                            <div key={i} className={`p-2 rounded-lg bg-${macro.color}-500/10 border border-${macro.color}-500/20 text-center`}>
                              <div className={`text-xs text-${macro.color}-400 font-semibold`}>{macro.label}</div>
                              <div className="text-sm font-bold text-white">{macro.value}</div>
                            </div>
                          ))}
                        </div>

                        {/* Hydration */}
                        <div className="p-3 rounded-lg backdrop-blur-md bg-blue-500/10 border border-blue-500/20">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Droplets className="w-4 h-4 text-blue-400" />
                              <span className="text-xs text-blue-400">Hydration</span>
                            </div>
                            <span className="text-sm font-bold text-white">2.5L</span>
                          </div>
                        </div>

                        {/* Score */}
                        <div className="p-3 rounded-lg backdrop-blur-md bg-gradient-to-r from-emerald-500/10 to-orange-500/10 border border-emerald-500/20">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400">Nutrition Score</span>
                            <span className="text-lg font-bold text-emerald-400">87/100</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Middle Column - Main Dashboard */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
              {/* Tabs */}
              <div className="flex gap-2">
                {['today', 'weekly', 'monthly'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                      activeTab === tab
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                        : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Calories Progress Chart */}
              <motion.div
                className="p-6 rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-emerald-500/30 transition-colors"
                onHoverStart={() => setHoveredCard('calories')}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Calories Consumed</h3>
                    <p className="text-sm text-slate-400">Track your daily intake</p>
                  </div>
                  <div className="p-3 rounded-lg bg-orange-500/20">
                    <Flame className="w-6 h-6 text-orange-400" />
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={progressData}>
                    <defs>
                      <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(15, 15, 15, 0.9)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="calories"
                      stroke="#10b981"
                      fillOpacity={1}
                      fill="url(#colorCalories)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Macronutrient Analytics */}
              <motion.div
                className="p-6 rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-orange-500/30 transition-colors"
                onHoverStart={() => setHoveredCard('macro')}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Macronutrient Analytics</h3>
                    <p className="text-sm text-slate-400">Daily breakdown</p>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-500/20">
                    <Target className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <ResponsiveContainer width="100%" height={150}>
                      <PieChart>
                        <Pie
                          data={macroData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {macroData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(15, 15, 15, 0.9)',
                            border: '1px solid rgba(255,255,255,0.1)',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col justify-center space-y-3">
                    {macroData.map((macro, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: macro.color }}
                          />
                          <span className="text-sm text-slate-400">{macro.name}</span>
                        </div>
                        <span className="font-semibold text-white">{macro.value}g</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Bottom Section - Features Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Hydration Tracker */}
            <motion.div
              variants={itemVariants}
              className="group"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity }}
            >
              <motion.div
                className="p-5 rounded-2xl backdrop-blur-md bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 hover:border-blue-500/50 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">Hydration Tracker</h4>
                  <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                    <Droplets className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-400">2.5L</span>
                    <span className="text-xs text-slate-400">of 3L</span>
                  </div>
                  <div className="h-2 bg-blue-500/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 to-cyan-400"
                      initial={{ width: 0 }}
                      animate={{ width: '83%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Workout Nutrition */}
            <motion.div
              variants={itemVariants}
              className="group"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, delay: 0.2 }}
            >
              <motion.div
                className="p-5 rounded-2xl backdrop-blur-md bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 hover:border-purple-500/50 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">Recovery Tracking</h4>
                  <div className="p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                    <Heart className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-purple-400">92%</span>
                    <span className="text-xs text-slate-400">Recovered</span>
                  </div>
                  <p className="text-xs text-slate-500">Optimal recovery nutrients</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Performance Insights */}
            <motion.div
              variants={itemVariants}
              className="group"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.3, repeat: Infinity, delay: 0.4 }}
            >
              <motion.div
                className="p-5 rounded-2xl backdrop-blur-md bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20 hover:border-emerald-500/50 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">Performance Score</h4>
                  <div className="p-2 rounded-lg bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors">
                    <Zap className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-emerald-400">90</span>
                    <span className="text-xs text-slate-400">/100</span>
                  </div>
                  <p className="text-xs text-slate-500">Peak performance nutrition</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Daily Nutrition Score */}
            <motion.div
              variants={itemVariants}
              className="group"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, delay: 0.6 }}
            >
              <motion.div
                className="p-5 rounded-2xl backdrop-blur-md bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/20 hover:border-orange-500/50 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">Nutrition Score</h4>
                  <div className="p-2 rounded-lg bg-orange-500/20 group-hover:bg-orange-500/30 transition-colors">
                    <Award className="w-5 h-5 text-orange-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-400">87</span>
                    <span className="text-xs text-slate-400">/100</span>
                  </div>
                  <p className="text-xs text-slate-500">Excellent nutrition balance</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* AI Meal Suggestions Section */}
          <motion.div
            className="p-8 rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">AI Meal Suggestions</h3>
                <p className="text-slate-400">Personalized recommendations based on your goals</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors flex items-center gap-2"
              >
                <span>See All</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {mealSuggestions.map((meal, index) => (
                <motion.div
                  key={index}
                  className="group p-5 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all cursor-pointer"
                  whileHover={{ y: -5, scale: 1.02 }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3 + index * 0.3, repeat: Infinity }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-3xl mb-2">{meal.icon}</div>
                      <h4 className="font-semibold text-white">{meal.name}</h4>
                      <p className="text-xs text-slate-400">{meal.time}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors">
                      <span className="text-sm font-bold text-emerald-400">{meal.score}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10">
                    {[
                      { label: 'P', value: meal.protein },
                      { label: 'C', value: meal.carbs },
                      { label: 'F', value: meal.fats },
                    ].map((macro, i) => (
                      <div key={i} className="text-center">
                        <div className="text-xs text-slate-400">{macro.label}</div>
                        <div className="text-sm font-semibold text-white">{macro.value}g</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Weekly Performance Chart */}
          <motion.div
            className="mt-12 p-8 rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Weekly Performance</h3>
              <p className="text-slate-400">Your nutrition score throughout the week</p>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 15, 15, 0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="score" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="mt-12 p-8 rounded-2xl backdrop-blur-md bg-gradient-to-r from-emerald-500/20 to-orange-500/20 border border-emerald-500/30"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Ready to Optimize Your Performance?</h3>
                <p className="text-slate-300">Start tracking your nutrition like a pro athlete today.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-emerald-500/50 transition-all flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Get Started
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
};

export default DashboardPreview;
