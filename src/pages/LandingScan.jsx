import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Section from '../components/Section';
import { VisualBurden, VisualInsights, VisualScanTimeline } from '../components/SectionVisuals';
import LandingLayout from '../layouts/LandingLayout';

const TextBlock = ({ title, children, onVisible, visual }) => (
  <motion.div
    className="min-h-screen flex flex-col justify-center py-24 pr-0 lg:pr-12"
    onViewportEnter={onVisible}
    viewport={{ margin: "-40% 0px -40% 0px" }}
  >
    <motion.h3
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-sans font-bold text-brand-gold-light mb-8 tracking-tight"
    >
      {title}
    </motion.h3>

    {/* Mobile Visual */}
    {visual && (
      <div className="block lg:hidden w-full h-[320px] mb-8">
        {visual}
      </div>
    )}

    <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
      {children}
    </div>
  </motion.div>
);

const LandingScan = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <LandingLayout title="Scan Your Enterprise in 48 Hours" subtitle="AI diagnosis for unstructured data">

      {/* Sticky Scroll Container */}
      <div className="relative bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Text Column */}
          <div className="relative z-10">
            <TextBlock
              title="Enterprise Data is a Mess"
              visual={<VisualBurden step={1} transparent />}
              onVisible={() => setActiveStep(1)}
            >
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

            <TextBlock
              title="Our AI diagnosis tools understand your business inside out"
              visual={<VisualBurden step={2} transparent />}
              onVisible={() => setActiveStep(2)}
            >
              <p>
                We scan every unstructured surface—emails, attachments, PDFs, ERP exports, and ticket trails—to rebuild how work really happens.
              </p>
              <p>
                In hours, we assemble an atlas of your workflows, owners, and dependencies so the 48-hour diagnosis starts from reality, not interviews.
              </p>
            </TextBlock>

          </div>

          {/* Right Column: Sticky Visual */}
          <div className="relative hidden lg:block">
            <div className="sticky top-0 h-screen flex items-center justify-center py-24">
              <div className="w-full h-[430px] relative">
                <VisualBurden step={activeStep} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Selling Points */}
      <div className="px-6 pt-16 text-center bg-black">
        <h2 className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">
          The 48-hour scan
        </h2>
      </div>

      <Section
        align="right"
        visual={<VisualScanTimeline />}
      >
        <div className="space-y-4">
          <div className="border-l-2 border-brand-gold/50 pl-4">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-1">A complete diagnostic scanner of your company</h4>
            <p className="text-sm text-gray-400">We surface how work truly moves across teams, tools, and geographies—no surveys or workshops.</p>
          </div>
          <div className="border-l-2 border-brand-gold/50 pl-4">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-1">Direct plugs into every data source</h4>
            <p className="text-sm text-gray-400">Mailboxes, document drives, ERPs, ticketing, and chat are ingested for unmatched granularity of insight.</p>
          </div>
          <div className="border-l-2 border-brand-gold/50 pl-4">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-1">One hour with IT, 48 hours to delivery</h4>
            <p className="text-sm text-gray-400">Connect once, then receive the full diagnostic report and dashboard two days later—no heavy lift from your teams.</p>
          </div>
        </div>
      </Section>

      <Section
        title="Unique insights on your operations"
        visual={<VisualInsights />}
      >
        <p>
          Structured knowledge becomes a living dashboard: a traceable map of what actually slows decisions, burns margin, or introduces risk.
        </p>
        <ul className="space-y-3 mt-2">
          <li className="flex items-start gap-3">
            <span className="w-2.5 h-2.5 bg-brand-gold rounded-full mt-2"></span>
            <span>See where cycle times stall, which handoffs break, and why.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2.5 h-2.5 bg-brand-gold rounded-full mt-2"></span>
            <span>Quantify manual touchpoints vs. automation-ready steps with evidence from real artifacts.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2.5 h-2.5 bg-brand-gold rounded-full mt-2"></span>
            <span>Drill down to the emails, PDFs, and chats behind any anomaly or opportunity.</span>
          </li>
        </ul>
      </Section>

    </LandingLayout>
  );
};

export default LandingScan;
