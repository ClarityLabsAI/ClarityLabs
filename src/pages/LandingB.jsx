import React, { useState } from 'react';
import LandingLayout from '../layouts/LandingLayout';
import UseCases from '../components/UseCases';
import { VisualBurden } from '../components/SectionVisuals';
import { motion } from 'framer-motion';

const TextBlock = ({ title, children, onVisible }) => (
    <motion.div 
        className="min-h-screen flex flex-col justify-center py-24 pr-12"
        onViewportEnter={onVisible}
        viewport={{ margin: "-40% 0px -40% 0px" }} // Trigger when central
    >
        <motion.h3 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-sans font-bold text-brand-gold-light mb-6 tracking-tight"
        >
            {title}
        </motion.h3>
        <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
            {children}
        </div>
    </motion.div>
);

const LandingB = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <LandingLayout title="Get a Clear Vision to Automate Work" subtitle="Software 2.0 Revolution">
      
      {/* Sticky Scroll Container */}
      <div className="relative bg-black border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Left Column: Scrolling Text */}
              <div className="relative z-10">
                  {/* Point 1 */}
                  <TextBlock title="The Heavy Burden of Software 1.0" onVisible={() => setActiveStep(1)}>
                    <p>
                      Companies are struggling with heavy data-related pain points inherent to legacy software.
                    </p>
                    <div className="space-y-4 mt-4">
                        <div className="border-l-2 border-brand-gold/50 pl-4">
                            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-1">Data Inaccessibility</h4>
                            <p className="text-sm text-gray-400">95% of quality data is trapped in unstructured formats (PDFs, Emails) or legacy ERPs.</p>
                        </div>
                        <div className="border-l-2 border-brand-gold/50 pl-4">
                            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-1">Expensive Manual Entry</h4>
                            <p className="text-sm text-gray-400">Human expertise is wasted on manual data entry, elevating expense ratios and diluting margins.</p>
                        </div>
                         <div className="border-l-2 border-brand-gold/50 pl-4">
                            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-1">No Standards</h4>
                            <p className="text-sm text-gray-400">Extreme data heterogeneity makes traditional integration impossible.</p>
                        </div>
                    </div>
                  </TextBlock>

                  {/* Point 2 */}
                  <TextBlock title="AI is Software 2.0" onVisible={() => setActiveStep(2)}>
                    <p>
                      Unlock your company's knowledge. AI enables us to finally tap into that 95% of unstructured data.
                    </p>
                    <p>
                      We build an <strong>Atlas</strong> of your company's entire knowledge base. By mapping every document, email, and workflow to a central intelligence core, we turn chaos into clarity.
                    </p>
                  </TextBlock>

                  {/* Point 3 */}
                  <TextBlock title="The Bedrock for Automation" onVisible={() => setActiveStep(3)}>
                    <p>
                      This is the bedrock to unlocking AI on your data. Once structured, the possibilities are endless.
                    </p>
                    <ul className="space-y-3 mt-2">
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-brand-gold rounded-full"></span>
                            <span>Visualize workflows at a glance</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-brand-gold rounded-full"></span>
                            <span>Create your own automatic workflows</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-brand-gold rounded-full"></span>
                            <span>Trigger agents to work autonomously</span>
                        </li>
                    </ul>
                  </TextBlock>
              </div>

              {/* Right Column: Sticky Visual */}
              <div className="relative hidden lg:block">
                  <div className="sticky top-0 h-screen flex items-center justify-center py-24">
                      <div className="w-full h-[500px]">
                          <VisualBurden step={activeStep} />
                      </div>
                  </div>
              </div>

          </div>
      </div>

      {/* Use Cases Section */}
      <UseCases />

    </LandingLayout>
  );
};

export default LandingB;

