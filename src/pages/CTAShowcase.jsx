import React from 'react';
import CTASection from '../components/CTASection';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Target, Users } from 'lucide-react';

const CTAShowcase = () => {
  const conversionFeatures = [
    {
      icon: Users,
      title: 'High Engagement',
      description: 'Eye-catching design and smooth animations keep users focused on conversion',
    },
    {
      icon: TrendingUp,
      title: 'Trust Building',
      description: 'Social proof, security badges, and clear value proposition build confidence',
    },
    {
      icon: Zap,
      title: 'Fast Action',
      description: 'One-click signup with minimal friction and immediate value delivery',
    },
    {
      icon: Target,
      title: 'Optimized Layout',
      description: 'Two-column design with clear hierarchy and strategic button placement',
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">
                High-Converting CTA Section
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Professional conversion-focused design with animated elements and trust indicators to maximize signups.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main CTA Section */}
      <CTASection />

      {/* Features Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why This Design Converts
            </h2>
            <p className="text-slate-400">
              Built with conversion psychology and modern design principles
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {conversionFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-colors"
                >
                  <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500/20 to-orange-500/20 w-fit mb-4">
                    <Icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Design Elements Showcase */}
      <div className="px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Key Design Elements
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: '🎨 Premium Gradient Background',
                items: [
                  'Animated emerald, orange, and blue orbs',
                  'Smooth pulsing glow effect',
                  'Creates depth without distraction',
                  'High-end SaaS aesthetic',
                ],
              },
              {
                title: '✨ Animated CTA Button',
                items: [
                  'Pulsing glow effect (2s animation)',
                  'Hover scale and arrow animation',
                  'Tap feedback for mobile users',
                  'Gradient background (emerald)',
                ],
              },
              {
                title: '🛡️ Trust Indicators',
                items: [
                  'Social proof: "5K+ Athletes"',
                  'Satisfaction rating: "95%"',
                  'Security badge: "100% Secure"',
                  'Security information card',
                ],
              },
              {
                title: '📱 Conversion Optimized',
                items: [
                  'Two-column layout (desktop)',
                  'Email input field',
                  'Two action buttons',
                  'Free trial badge',
                  '"No credit card" messaging',
                ],
              },
            ].map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl backdrop-blur-md bg-white/5 border border-white/10"
              >
                <h3 className="text-lg font-semibold text-emerald-400 mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <span className="text-emerald-400 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Animation Details */}
      <div className="px-4 sm:px-6 lg:px-8 py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Animation & Interactions
            </h2>
            <p className="text-slate-400">Smooth 60fps animations that engage without overwhelming</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Main Card Glow', timing: '3s infinite', effect: 'Pulsing opacity' },
              { name: 'Background Orbs', timing: '6-8s infinite', effect: 'Scale + position + opacity' },
              { name: 'Button Pulse', timing: '2s infinite', effect: 'Box shadow glow' },
              { name: 'Entrance Animation', timing: '0.8s', effect: 'Staggered fade-in' },
              { name: 'Hover Effects', timing: 'Instant', effect: 'Scale + shadow + color' },
              { name: 'Trial Badge', timing: '3s infinite', effect: 'Floating motion' },
            ].map((anim, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-4 rounded-lg backdrop-blur-md bg-white/5 border border-white/10"
              >
                <h4 className="font-semibold text-emerald-400 mb-2">{anim.name}</h4>
                <div className="space-y-1 text-sm text-slate-400">
                  <p><span className="text-slate-300">Timing:</span> {anim.timing}</p>
                  <p><span className="text-slate-300">Effect:</span> {anim.effect}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Integration Guide */}
      <div className="px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-b from-transparent to-emerald-500/5 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              How to Use
            </h2>
            <p className="text-slate-400">Quick integration guide for your website</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: '1',
                title: 'Import Component',
                code: 'import CTASection from "./components/CTASection"',
              },
              {
                step: '2',
                title: 'Add to Page',
                code: '<CTASection />',
              },
              {
                step: '3',
                title: 'Customize Content',
                code: 'Update headline, buttons, colors',
              },
              {
                step: '4',
                title: 'Connect Backend',
                code: 'Add email signup endpoint',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl backdrop-blur-md bg-white/5 border border-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-orange-500 flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <code className="text-xs bg-slate-900/50 p-2 rounded text-emerald-400 block overflow-x-auto">
                      {item.code}
                    </code>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10 text-center text-slate-400">
        <p>
          Component is fully responsive, accessible, and production-ready.
          <br />
          Built with React, Framer Motion, and Tailwind CSS.
        </p>
      </div>
    </div>
  );
};

export default CTAShowcase;
