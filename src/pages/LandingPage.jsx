import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import { CheckCircle, Users, Zap, TrendingUp, Shield, Smartphone } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Recommendations',
      description: 'Get intelligent meal plans tailored to your athletic performance goals in seconds.',
    },
    {
      icon: TrendingUp,
      title: 'Real-Time Macro Tracking',
      description: 'Monitor your protein, carbs, and fats with instant feedback and progress insights.',
    },
    {
      icon: Shield,
      title: 'Science-Backed Nutrition',
      description: 'Based on latest sports nutrition research and proven athlete protocols.',
    },
    {
      icon: Users,
      title: 'Coach & Team Features',
      description: 'Manage multiple athletes and coordinate team nutrition strategies.',
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Track meals and metrics on the go with our fully responsive app.',
    },
    {
      icon: CheckCircle,
      title: 'Proven Results',
      description: 'Join 5,000+ athletes already improving their performance.',
    },
  ];

  const testimonials = [
    {
      name: 'Alex Johnson',
      role: 'Marathon Runner',
      content: 'The AI meal plans completely transformed my race day nutrition. I\'ve PR\'d twice since using this app.',
      avatar: '🏃',
    },
    {
      name: 'Maya Patel',
      role: 'CrossFit Athlete',
      content: 'Tracking macros has never been easier. The app does all the thinking for me.',
      avatar: '💪',
    },
    {
      name: 'James Wilson',
      role: 'Football Coach',
      content: 'Managing nutrition for my entire team is now streamlined and data-driven.',
      avatar: '🏈',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-24 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">
                Everything You Need
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Advanced tools designed specifically for athletes who take their nutrition seriously.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="group p-8 rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-emerald-500/30 transition-colors"
                >
                  <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500/20 to-orange-500/20 w-fit mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-b from-black via-slate-900/50 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">
                Trusted by Athletes Worldwide
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-emerald-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-300">"{testimonial.content}"</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-emerald-400">★</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-24 bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="p-12 rounded-3xl backdrop-blur-md bg-gradient-to-br from-emerald-500/20 via-transparent to-orange-500/20 border border-emerald-500/30">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Ready to Optimize Your Performance?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Start tracking your nutrition like a pro athlete today. Free for the first 14 days.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl font-semibold text-lg group overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
                >
                  Start Your Free Trial
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl font-semibold text-lg group overflow-hidden border border-emerald-500/30 backdrop-blur-md text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Learn More
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-t from-black to-transparent border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">
                Athlete AI
              </h3>
              <p className="text-slate-400 text-sm">
                AI-powered nutrition for elite athletes.
              </p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Security'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers'] },
              { title: 'Resources', links: ['Docs', 'Support', 'FAQ'] },
            ].map((section, i) => (
              <div key={i}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm">© 2026 Athlete AI. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              {['Twitter', 'Instagram', 'LinkedIn'].map((social, i) => (
                <a key={i} href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
