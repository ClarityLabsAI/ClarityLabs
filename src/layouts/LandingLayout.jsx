import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import React from 'react';
import ParticleCanvas from '../components/ParticleCanvas';

const LandingLayout = ({ title, subtitle, children }) => {
  return (
    <div className="relative bg-brand-black min-h-screen text-white selection:bg-brand-gold selection:text-black">
      {/* Hero Section */}
      <div className="relative z-10 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ParticleCanvas />
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-8 md:px-12 lg:px-16">
          <div className="text-left max-w-3xl w-full mx-auto space-y-3 md:space-y-4 flex flex-col items-start">
            <h1 className="text-4xl md:text-6xl font-bold text-white font-sans leading-[0.95] drop-shadow-2xl shadow-black" style={{ textShadow: "0 4px 12px rgba(0,0,0,0.8)" }}>
              <span className="block">Harness Your Entreprise</span>
              <span className="block">Knowledge</span>
            </h1>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-200 font-light tracking-wide drop-shadow-2xl"
              style={{ textShadow: "0 4px 12px rgba(0,0,0,0.8)" }}
            >
              Clarity Labs
            </motion.h2>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 w-full flex flex-col items-center pointer-events-auto z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="animate-bounce text-brand-gold"
          >
            <ChevronDown size={32} />
          </motion.div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="relative z-10 bg-gradient-to-b from-transparent via-black/80 to-black">
        {children}

        {/* CTA */}
        <div className="border-t border-white/10 bg-black">
          <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2 text-left">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
                Ready to unlock your enterprise data?
              </h2>
              <p className="text-lg text-gray-300">
                Schedule your 48-hour diagnostic scan today.
              </p>
            </div>
            <button
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-gold text-black font-semibold shadow-[0_10px_30px_rgba(233,163,25,0.35)] hover:scale-[1.02] transition-transform duration-200"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-12 text-center text-gray-500 text-sm border-t border-white/10 bg-black">
        <p>&copy; {new Date().getFullYear()} Clarity Labs. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingLayout;
