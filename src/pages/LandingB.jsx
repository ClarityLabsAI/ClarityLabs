import React from 'react';
import LandingLayout from '../layouts/LandingLayout';
import Section from '../components/Section';
import UseCases from '../components/UseCases';

const LandingB = () => {
  return (
    <LandingLayout title="Get a Clear Vision to Automate Work" subtitle="Software 2.0 Revolution">
      
      {/* Point 1: Pain Points */}
      <Section 
        title="The Heavy Burden of Software 1.0" 
        align="left"
        visual={
          <svg viewBox="0 0 400 400" className="w-full h-full p-8">
            {/* Chaos / Heterogeneity */}
            <rect x="50" y="50" width="60" height="80" fill="#333" stroke="#555" />
            <text x="60" y="90" fill="#777" fontSize="10">PDF</text>
            
            <rect x="150" y="80" width="80" height="60" fill="#333" stroke="#555" />
            <text x="160" y="110" fill="#777" fontSize="10">EMAIL</text>

            <rect x="260" y="40" width="90" height="120" fill="#333" stroke="#555" />
            <text x="280" y="100" fill="#777" fontSize="10">ERP</text>

            {/* Red Crosses / Disconnects */}
            <line x1="110" y1="90" x2="150" y2="110" stroke="#800" strokeWidth="2" strokeDasharray="5 5" />
            <line x1="230" y1="110" x2="260" y2="100" stroke="#800" strokeWidth="2" strokeDasharray="5 5" />
            
            {/* Bottom 'Sinking' bar graph */}
            <rect x="50" y="250" width="50" height="100" fill="#D4AF37" opacity="0.2" />
            <rect x="120" y="280" width="50" height="70" fill="#D4AF37" opacity="0.2" />
            <rect x="190" y="300" width="50" height="50" fill="#D4AF37" opacity="0.2" />
            <path d="M 50 250 L 120 280 L 190 300 L 300 350" stroke="#D4AF37" strokeWidth="2" fill="none" />
            <text x="250" y="340" fill="#D4AF37" fontSize="12">MARGINS</text>
          </svg>
        }
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
        visual={
          <svg viewBox="0 0 400 400" className="w-full h-full p-8">
             {/* Central Atlas / Globe effect */}
             <defs>
                <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#000" stopOpacity="0" />
                </radialGradient>
             </defs>
             <circle cx="200" cy="200" r="150" fill="url(#glow)" opacity="0.2" />
             
             {/* Particulates converging */}
             <circle cx="200" cy="200" r="2" fill="#fff" />
             
             {[...Array(20)].map((_, i) => {
                 const angle = (i / 20) * Math.PI * 2;
                 const x = 200 + Math.cos(angle) * 80;
                 const y = 200 + Math.sin(angle) * 80;
                 return <line key={i} x1={x} y1={y} x2="200" y2="200" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
             })}
             
             <text x="140" y="380" fill="#D4AF37" fontFamily="monospace" fontSize="12">THE KNOWLEDGE ATLAS</text>
          </svg>
        }
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
        title="The Bedrock for Automation" 
        align="left"
        visual={
          <svg viewBox="0 0 400 400" className="w-full h-full p-8">
            {/* Workflow nodes */}
            <rect x="150" y="50" width="100" height="40" rx="5" fill="#D4AF37" />
            <text x="175" y="75" fill="#000" fontWeight="bold" fontSize="12">TRIGGER</text>
            
            <line x1="200" y1="90" x2="200" y2="150" stroke="#D4AF37" strokeWidth="2" />
            
            {/* Agent Logic */}
            <circle cx="200" cy="180" r="30" stroke="#D4AF37" strokeWidth="2" fill="#000" />
            <text x="182" y="185" fill="#D4AF37" fontSize="10">AGENT</text>
            
            {/* Split output */}
            <line x1="200" y1="210" x2="150" y2="280" stroke="#D4AF37" strokeWidth="2" />
            <line x1="200" y1="210" x2="250" y2="280" stroke="#D4AF37" strokeWidth="2" />
            
            <rect x="100" y="280" width="80" height="40" rx="5" stroke="#D4AF37" fill="none" />
            <text x="115" y="305" fill="#D4AF37" fontSize="10">ACTION A</text>
            
            <rect x="220" y="280" width="80" height="40" rx="5" stroke="#D4AF37" fill="none" />
             <text x="235" y="305" fill="#D4AF37" fontSize="10">ACTION B</text>
          </svg>
        }
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
