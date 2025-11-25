import React from 'react';
import LandingLayout from '../layouts/LandingLayout';
import Section from '../components/Section';
import UseCases from '../components/UseCases';

const LandingA = () => {
  return (
    <LandingLayout title="Start Building Your Defense to AI">
      
      {/* Point 1: The Wave is Coming */}
      <Section 
        title="Artificial Intelligence is Coming" 
        align="left"
        visual={
          <svg viewBox="0 0 400 400" className="w-full h-full p-8">
             {/* Abstract 'Pressure' Graph */}
             <defs>
               <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.1" />
                 <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.8" />
               </linearGradient>
             </defs>
             {/* Rising exponential curve */}
             <path d="M 50 350 Q 200 350 350 50" stroke="#D4AF37" strokeWidth="4" fill="none" />
             <path d="M 50 350 L 350 350 L 350 50 L 50 350" fill="url(#grad1)" opacity="0.3" />
             {/* Competitor dots falling behind */}
             <circle cx="100" cy="320" r="4" fill="#555" />
             <circle cx="150" cy="300" r="4" fill="#555" />
             <circle cx="200" cy="250" r="4" fill="#555" />
             {/* You label */}
             <circle cx="350" cy="50" r="8" fill="#D4AF37" />
             <text x="300" y="40" fill="#D4AF37" fontSize="14" fontFamily="monospace">MARKET LEADER</text>
          </svg>
        }
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
        visual={
          <svg viewBox="0 0 400 400" className="w-full h-full p-8">
            {/* Central 'Core' representing data */}
            <circle cx="200" cy="200" r="60" stroke="#D4AF37" strokeWidth="2" fill="none" />
            <circle cx="200" cy="200" r="40" fill="#D4AF37" opacity="0.2" />
            <circle cx="200" cy="200" r="10" fill="#D4AF37" />
            
            {/* Shield rings */}
            <circle cx="200" cy="200" r="100" stroke="#8A7120" strokeWidth="1" strokeDasharray="4 4" fill="none" />
            <circle cx="200" cy="200" r="140" stroke="#8A7120" strokeWidth="1" strokeDasharray="10 10" fill="none" />
            
            {/* Orbiting data points */}
            <circle cx="200" cy="60" r="4" fill="#fff" />
            <circle cx="340" cy="200" r="4" fill="#fff" />
            <circle cx="200" cy="340" r="4" fill="#fff" />
            <circle cx="60" cy="200" r="4" fill="#fff" />
          </svg>
        }
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
        visual={
          <svg viewBox="0 0 400 400" className="w-full h-full p-8">
            {/* Nodes connecting */}
            <g stroke="#D4AF37" strokeWidth="2">
                <line x1="50" y1="200" x2="150" y2="200" />
                <line x1="150" y1="200" x2="250" y2="100" />
                <line x1="150" y1="200" x2="250" y2="300" />
                <line x1="250" y1="100" x2="350" y2="100" />
                <line x1="250" y1="300" x2="350" y2="300" />
            </g>
            {/* Nodes */}
            <circle cx="50" cy="200" r="10" fill="#fff" />
            <circle cx="150" cy="200" r="10" fill="#D4AF37" />
            <circle cx="250" cy="100" r="10" fill="#D4AF37" />
            <circle cx="250" cy="300" r="10" fill="#D4AF37" />
            <circle cx="350" cy="100" r="10" fill="#fff" />
            <circle cx="350" cy="300" r="10" fill="#fff" />
          </svg>
        }
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
