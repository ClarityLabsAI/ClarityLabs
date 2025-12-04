import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ title, children, visual, align = 'left', titleClassName = '' }) => {
  return (
    <div className="flex items-center justify-center px-6 py-16 relative z-10 border-b border-white/10 bg-black">
      <div className="max-w-6xl w-full">
        
        {/* Mobile Layout: Title -> Visual -> Text */}
        <div className="flex flex-col lg:hidden gap-8">
            {title && (
                <h3 className={`text-3xl font-sans font-bold text-brand-gold-light tracking-tight ${titleClassName}`}>
                    {title}
                </h3>
            )}
            
            <div className="w-full">
                {visual ? visual : <div className="text-brand-gold/30 font-mono text-sm">[VISUAL]</div>}
            </div>

            <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
                {children}
            </div>
        </div>

        {/* Desktop Layout: Side-by-Side */}
        <div className={`hidden lg:grid grid-cols-2 gap-12 items-center ${align === 'right' ? 'grid-flow-dense' : ''}`}>
            
            {/* Text Content */}
            <div className={align === 'right' ? 'col-start-2' : ''}>
            {title && (
                <motion.h3 
                initial={{ opacity: 0, x: align === 'left' ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-20%" }}
                className={`text-3xl md:text-4xl font-sans font-bold text-brand-gold-light mb-6 tracking-tight ${titleClassName}`}
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
            className={`relative h-[400px] flex items-center justify-center ${align === 'right' ? 'col-start-1' : ''}`}
            >
                {visual ? visual : <div className="text-brand-gold/30 font-mono text-sm">[DATA VISUALIZATION PLACEHOLDER]</div>}
            </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Section;
