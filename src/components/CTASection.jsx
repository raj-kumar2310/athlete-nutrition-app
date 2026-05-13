import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Users, Award, ArrowRight, Shield } from 'lucide-react';

const CTASection = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 3000);
  };

  const trustIndicators = [
    { icon: Users, label: '5K+ Athletes', color: 'emerald' },
    { icon: Award, label: '95% Satisfaction', color: 'orange' },
    { icon: Shield, label: '100% Secure', color: 'blue' },
  ];

  const features = [
    'Personalized nutrition plans',
    'AI meal analysis',
    'Performance insights',
    'Real-time macro tracking',
    'Hydration monitoring',
    'Weekly progress reports',
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
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="relative w-full overflow-hidden bg-black text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 100, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/3 w-96 h-96 bg-orange-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            x: [100, 0, 100],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Main Card */}
          <motion.div
            variants={itemVariants}
            className="relative group"
          >
            {/* Glow Background */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-emerald-500/40 via-orange-500/40 to-blue-500/40 rounded-3xl blur-2xl opacity-75"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Main Content Card */}
            <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl p-12 border border-white/10 overflow-hidden">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-orange-500/5 pointer-events-none" />

              {/* Content */}
              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - Text */}
                <motion.div variants={itemVariants}>
                  {/* Badge */}
                  <motion.div
                    className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Zap className="w-4 h-4 text-emerald-400 mr-2" />
                    <span className="text-sm font-semibold text-emerald-400">Limited Time Offer</span>
                  </motion.div>

                  {/* Headline */}
                  <h2 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                    <span className="bg-gradient-to-r from-emerald-400 via-white to-orange-400 bg-clip-text text-transparent">
                      Start Tracking Like A Professional Athlete
                    </span>
                  </h2>

                  {/* Subheadline */}
                  <p className="text-lg text-slate-300 mb-8">
                    Get personalized nutrition plans, AI meal analysis, and performance insights to dominate your sport.
                  </p>

                  {/* Features List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {features.slice(0, 4).map((feature, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="p-1 rounded-full bg-emerald-500/20">
                          <Check className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="text-sm text-slate-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex flex-wrap gap-6">
                    {trustIndicators.map((indicator, i) => {
                      const Icon = indicator.icon;
                      return (
                        <motion.div
                          key={i}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className={`p-2 rounded-lg bg-${indicator.color}-500/20`}>
                            <Icon className={`w-4 h-4 text-${indicator.color}-400`} />
                          </div>
                          <span className="text-sm font-semibold text-slate-300">{indicator.label}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Right Side - CTA Form */}
                <motion.div
                  variants={itemVariants}
                  className="relative"
                >
                  {/* Card Container */}
                  <motion.div
                    className="p-8 rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/10"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-2xl font-bold mb-2">Get Started Free</h3>
                    <p className="text-sm text-slate-400 mb-6">No credit card required. Start in seconds.</p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                      <div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                          required
                        />
                      </div>

                      {/* Primary CTA Button */}
                      <motion.button
                        type="submit"
                        onHoverStart={() => setHoveredButton('start')}
                        onHoverEnd={() => setHoveredButton(null)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full relative group overflow-hidden py-3 rounded-lg font-semibold"
                      >
                        {/* Glow Background */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600"
                          animate={{
                            boxShadow: [
                              '0 0 20px rgba(16, 185, 129, 0.5)',
                              '0 0 40px rgba(16, 185, 129, 0.8)',
                              '0 0 20px rgba(16, 185, 129, 0.5)',
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="relative flex items-center justify-center text-white gap-2">
                          {submitted ? (
                            <>
                              <Check className="w-5 h-5" />
                              <span>Check your email!</span>
                            </>
                          ) : (
                            <>
                              <span>Start Free</span>
                              <motion.div
                                animate={{ x: hoveredButton === 'start' ? 5 : 0 }}
                              >
                                <ArrowRight className="w-5 h-5" />
                              </motion.div>
                            </>
                          )}
                        </span>
                      </motion.button>
                    </form>

                    {/* Secondary Button */}
                    <motion.button
                      onHoverStart={() => setHoveredButton('plan')}
                      onHoverEnd={() => setHoveredButton(null)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-4 py-3 rounded-lg font-semibold border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 transition-all flex items-center justify-center gap-2"
                    >
                      <span>Get Athlete Plan</span>
                      <motion.div
                        animate={{ x: hoveredButton === 'plan' ? 5 : 0 }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </motion.button>

                    {/* Trust Statement */}
                    <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-300">
                          <p className="font-semibold mb-1">100% Secure & Private</p>
                          <p className="text-xs text-blue-400/80">Your data is encrypted and never shared</p>
                        </div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <p className="text-xs text-slate-400 mb-3 font-semibold">FREE INCLUDES:</p>
                      <div className="space-y-2">
                        {['Daily meal suggestions', 'Macro tracking', 'Performance insights'].map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating Badge */}
                  <motion.div
                    className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-orange-500 text-white text-sm font-bold shadow-lg"
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    14-Day Trial
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Trust Section */}
          <motion.div
            className="mt-12 p-8 rounded-2xl backdrop-blur-md bg-gradient-to-r from-white/5 to-white/5 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Trusted by Elite Athletes & Fitness Enthusiasts</h3>
              <div className="flex flex-wrap justify-center items-center gap-8">
                {['⭐ 4.9 Stars', '📱 iOS & Android', '🌍 50+ Countries', '🏆 Award Winning'].map((item, i) => (
                  <motion.div
                    key={i}
                    className="text-sm text-slate-400"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA Text */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-slate-400">
              <span className="text-emerald-400 font-semibold">No credit card required</span> • Cancel anytime • Full access to all features
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
};

export default CTASection;
