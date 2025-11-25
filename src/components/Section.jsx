import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ title, children, visual, align = 'left' }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 relative z-10 border-b border-white/10 bg-black">
      <div className={`max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${align === 'right' ? 'md:grid-flow-dense' : ''}`}>
        
        {/* Text Content */}
        <div className={align === 'right' ? 'md:col-start-2' : ''}>
          {title && (
             <motion.h3 
               initial={{ opacity: 0, x: align === 'left' ? -50 : 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               viewport={{ once: true, margin: "-20%" }}
               className="text-3xl md:text-4xl font-mono font-bold text-brand-gold-light mb-6 tracking-tight"
             >
              {title}
            </motion.h3>
          )}
          <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
            {children}
          </div>
        </div>

        {/* Visual/Graph Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className={`relative h-[400px] rounded-2xl border border-brand-gold/20 bg-gradient-to-br from-white/5 to-transparent p-1 flex items-center justify-center overflow-hidden ${align === 'right' ? 'md:col-start-1' : ''}`}
        >
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-brand-gold"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-brand-gold"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-brand-gold"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-brand-gold"></div>
            
            {visual ? visual : <div className="text-brand-gold/30 font-mono text-sm">[DATA VISUALIZATION PLACEHOLDER]</div>}
        </motion.div>

      </div>
    </div>
  );
};

export default Section;
