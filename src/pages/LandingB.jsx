import React from 'react';
import Section from '../components/Section';
import { VisualAtlas, VisualAutomation, VisualBurden } from '../components/SectionVisuals';
import UseCases from '../components/UseCases';
import LandingLayout from '../layouts/LandingLayout';

const LandingB = () => {
  return (
    <LandingLayout title="Get a Clear Vision to Automate Work" subtitle="Software 2.0 Revolution">

      {/* Point 1: Pain Points */}
      <Section
        title="The Heavy Burden of Software 1.0"
        align="left"
        visual={<VisualBurden />}
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
      </Section>

      {/* Point 2: Software 2.0 */}
      <Section
        title="AI is Software 2.0"
        align="right"
        visual={<VisualAtlas />}
      >
        <p>
          Unlock your company's knowledge. AI enables us to finally tap into that 95% of unstructured data.
        </p>
        <p>
          We build an <strong>Atlas</strong> of your company's entire knowledge base. By mapping every document, email, and workflow to a central intelligence core, we turn chaos into clarity.
        </p>
      </Section>

      {/* Point 3: Bedrock for Automation */}
      <Section
        title="We provide the data Bedrock for AI"
        align="left"
        visual={<VisualAutomation />}
      >
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
      </Section>

      {/* Use Cases Section */}
      <UseCases />

    </LandingLayout>
  );
};

export default LandingB;
