import React from 'react';
import Section from '../components/Section';
import { VisualNetwork, VisualWave, VisualWeapon } from '../components/SectionVisuals';
import UseCases from '../components/UseCases';
import LandingLayout from '../layouts/LandingLayout';

const LandingA = () => {
  return (
    <LandingLayout title="Start Building Your Defense to AI">

      {/* Point 1: The Wave is Coming */}
      <Section
        title="Artificial Intelligence is Taking Off"
        align="left"
        visual={<VisualWave />}
      >
        <p>
          Enterprises are facing a seismic shift. Artificial intelligence isn't just a tool; it's an effectiveness multiplier that will redefine industries.
        </p>
        <p className="font-bold text-white">
          The pressure is already rising.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-400">
          <li>Competitors are adopting faster than ever.</li>
          <li>Legacy workflows are becoming obsolete liabilities.</li>
          <li>Adapt quickly or risk being left behind in the pre-AI era.</li>
        </ul>
      </Section>

      {/* Point 2: Knowledge is a Weapon */}
      <Section
        title="Your Knowledge is Your Weapon"
        align="right"
        visual={<VisualWeapon />}
      >
        <p>
          Your company's historical data and proprietary knowledge are a treasure trove—if you can access it.
        </p>
        <p>
          Whatever you structure right now starts creating a permanent record that no competitor can catch up to. This is the fuel for the future.
        </p>
        <div className="p-4 bg-brand-gold/10 border border-brand-gold/30 rounded-lg mt-4">
          <span className="text-brand-gold block mb-2 font-mono text-sm">THE MOAT STRATEGY</span>
          <p className="text-sm">
            In an age where AI models are commodities, your unique, structured enterprise data is the only defensible moat.
          </p>
        </div>
      </Section>

      {/* Point 3: Enable AI */}
      <Section
        title="Play With AI, Not Against It"
        align="left"
        visual={<VisualNetwork />}
      >
        <p>
          Enable AI on your integrated company knowledge. Don't just automate tasks; enable a systemic evolution of how your business operates.
        </p>
        <p>
          When your data is structured, AI becomes a partner that understands your context, history, and goals.
        </p>
      </Section>

      {/* Use Cases Section */}
      <UseCases />

    </LandingLayout>
  );
};

export default LandingA;
