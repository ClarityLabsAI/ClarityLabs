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

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4">
          <div className="text-center w-full">
            <h1 className="text-6xl md:text-9xl font-bold text-white font-sans drop-shadow-2xl shadow-black" style={{ textShadow: "0 4px 12px rgba(0,0,0,0.8)" }}>
              Clarity Labs
            </h1>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 w-full flex flex-col items-center gap-6 pointer-events-auto z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="max-w-4xl mx-auto text-center px-4"
          >
            <h2 className="text-3xl md:text-4xl text-gray-200 font-light tracking-wide mb-2 drop-shadow-2xl" style={{ textShadow: "0 4px 12px rgba(0,0,0,0.8)" }}>
              Harness your enterprise knowledge
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="animate-bounce text-brand-gold"
          >
            <ChevronDown size={32} />
          </motion.div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="relative z-10 bg-gradient-to-b from-transparent via-black/80 to-black">
        {children}
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-12 text-center text-gray-500 text-sm border-t border-white/10 bg-black">
        <p>&copy; {new Date().getFullYear()} Clarity Labs. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingLayout;
