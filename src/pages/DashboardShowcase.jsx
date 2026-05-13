import React from 'react';
import DashboardPreview from '../components/DashboardPreview';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone, BarChart3, Zap } from 'lucide-react';

const DashboardShowcase = () => {
  const features = [
    {
      icon: Smartphone,
      title: 'Mobile App Mockup',
      description: 'See your nutrition data on-the-go with our intuitive mobile interface.',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Track macros, calories, and hydration with detailed visualizations.',
    },
    {
      icon: Zap,
      title: 'AI Recommendations',
      description: 'Get personalized meal suggestions based on your performance goals.',
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
            className="text-center mb-8"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">
                Dashboard Preview
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Experience the power of professional nutrition tracking and AI-driven performance insights.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="p-4 rounded-lg backdrop-blur-md bg-white/5 border border-white/10"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-orange-500/20 w-fit mb-3">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <DashboardPreview />

      {/* Footer */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Our comprehensive dashboard provides all the tools elite athletes need to optimize their nutrition and dominate their performance.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  title: 'Real-Time Tracking',
                  items: ['Calorie Counter', 'Macro Breakdown', 'Hydration Monitor'],
                },
                {
                  title: 'AI Intelligence',
                  items: ['Smart Recommendations', 'Performance Insights', 'Personalization'],
                },
                {
                  title: 'Advanced Analytics',
                  items: ['Weekly Reports', 'Progress Graphs', 'Trend Analysis'],
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
                  <h3 className="font-semibold text-emerald-400 mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                        <ArrowRight className="w-4 h-4 text-emerald-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardShowcase;
