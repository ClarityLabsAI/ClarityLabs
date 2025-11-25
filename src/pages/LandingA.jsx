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
        <ul className="space-y-3 mt-2">
            <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-brand-gold rounded-full shrink-0"></span>
                <span className="text-gray-400">Competitors are adopting faster than ever.</span>
            </li>
            <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-brand-gold rounded-full shrink-0"></span>
                <span className="text-gray-400">Legacy workflows are becoming obsolete liabilities.</span>
            </li>
            <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-brand-gold rounded-full shrink-0"></span>
                <span className="text-gray-400">Adapt quickly or risk being left behind in the pre-AI era.</span>
            </li>
        </ul>
      </Section>

            {/* Point 2: Knowledge is a Weapon (Merged) */}
            <Section 
              title="Your Knowledge is Your Weapon" 
              align="right"
              visual={<VisualWeapon />}
            >
              <p>
                Your company's historical data and proprietary knowledge are a treasure trove—if you can access it. Whatever you structure right now starts creating a permanent record that no competitor can catch up to.
              </p>
              
              <div className="pt-6">
                  <h4 className="text-xl text-brand-gold-light font-bold font-sans mb-2">Play With AI, Not Against It</h4>
                  <p>
                    Enable AI on your integrated company knowledge. Don't just automate tasks; enable a systemic evolution of how your business operates. When your data is structured, AI becomes a partner that understands your context, history, and goals.
                  </p>
              </div>
            </Section>
      
            {/* Use Cases Section */}      <UseCases />

    </LandingLayout>
  );
};

export default LandingA;
