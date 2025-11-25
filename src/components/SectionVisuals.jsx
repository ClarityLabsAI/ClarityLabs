import React from 'react';
// motion imported but unused for animations now, kept if needed for basic fade-ins later
import { motion } from 'framer-motion';
import { FileText, Mail, Database, Mic, FileSpreadsheet, AlertCircle } from 'lucide-react';

// --- Shared Container (No Window Chrome) ---
const SimpleContainer = ({ children }) => (
  <div className="relative w-full h-full rounded-xl border border-white/10 bg-black/40 bg-gradient-to-br from-white/5 to-transparent aspect-video overflow-hidden shadow-2xl backdrop-blur-sm">
    {/* Content */}
    <div className="w-full h-full relative">
        {children}
    </div>
  </div>
);

// --- Landing A Visuals (Static) ---

export const VisualWave = () => (
    <SimpleContainer>
        <div className="w-full h-full p-8 flex items-end relative">
            {/* Grid Lines */}
            <div className="absolute inset-0 p-8 opacity-20">
                <div className="border-b border-l border-white/30 w-full h-full relative">
                     {[...Array(5)].map((_, i) => (
                         <div key={i} className="absolute w-full h-px bg-white/10" style={{ bottom: `${i * 25}%` }}></div>
                     ))}
                </div>
            </div>

            {/* Graph Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none p-8 overflow-visible">
                {/* Competitors Line (Linear/Low) */}
                <path 
                    d="M 0 300 L 300 250" 
                    fill="none" stroke="#666" strokeWidth="2" strokeDasharray="4 4"
                />
                {/* "You" Line (Exponential) */}
                <path 
                    d="M 0 300 Q 200 300 350 50" 
                    fill="none" stroke="#FACC15" strokeWidth="4"
                />
            </svg>

            {/* Labels */}
            <div className="absolute top-1/4 right-12 bg-brand-gold/20 border border-brand-gold px-3 py-1 rounded text-brand-gold text-xs font-bold">
                AI ADOPTION
            </div>
        </div>
    </SimpleContainer>
);

export const VisualWeapon = () => {
    const inputs = [
        { label: "PDF" }, { label: "@" }, { label: "XLS" }, { label: "DOC" }, { label: "DB" }
    ];

    return (
    <SimpleContainer>
        <div className="w-full h-full flex flex-col items-center justify-center relative py-4">
            {/* Top: Raw Inputs */}
            <div className="flex gap-4 z-20 mb-8 bg-black/20 p-2 rounded-lg backdrop-blur-sm">
                {inputs.map((item, i) => (
                    <div 
                        key={i}
                        className="w-10 h-12 border border-white/20 bg-white/5 rounded flex flex-col items-center justify-center text-gray-400 text-[10px] font-mono shadow-lg"
                    >
                        {item.label}
                    </div>
                ))}
            </div>

            {/* Connections */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0" viewBox="0 0 400 300">
                 {[
                     "M 120 100 C 120 140, 200 120, 200 180",
                     "M 160 100 C 160 140, 200 120, 200 180",
                     "M 200 100 L 200 180",
                     "M 240 100 C 240 140, 200 120, 200 180",
                     "M 280 100 C 280 140, 200 120, 200 180"
                 ].map((d, i) => (
                     <path 
                        key={i} d={d} fill="none" stroke="#FACC15" strokeWidth="1.5" strokeOpacity="0.5"
                     />
                 ))}
             </svg>

            {/* Master Data Core */}
            <div className="w-40 h-16 border-2 border-brand-gold bg-brand-gold/20 rounded-lg flex flex-col items-center justify-center z-20 backdrop-blur-md mt-16 shadow-[0_0_15px_#FACC15]">
                <div className="text-brand-gold font-bold tracking-widest text-xs">MASTER DATA</div>
                <div className="text-[8px] text-brand-gold/70">Structured Knowledge</div>
            </div>

        </div>
    </SimpleContainer>
    );
};

export const VisualNetwork = () => (
    <SimpleContainer>
        <div className="w-full h-full flex items-center justify-center relative">
            {/* Network Lines */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <g stroke="#FACC15" strokeWidth="1" strokeOpacity="0.3">
                    <line x1="200" y1="150" x2="100" y2="100" />
                    <line x1="200" y1="150" x2="300" y2="100" />
                    <line x1="200" y1="150" x2="100" y2="200" />
                    <line x1="200" y1="150" x2="300" y2="200" />
                    <line x1="100" y1="100" x2="300" y2="100" />
                </g>
             </svg>
             
             {/* Central Brain Node */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-brand-gold bg-brand-gold/10 flex items-center justify-center z-20 shadow-[0_0_15px_#FACC15]">
                <div className="w-8 h-8 bg-brand-gold rounded-full opacity-80"></div>
             </div>

             {/* Satellite Nodes */}
             {[
                 { t: 100, l: 100 }, { t: 100, r: 100 }, 
                 { b: 100, l: 100 }, { b: 100, r: 100 }
             ].map((pos, i) => (
                 <div 
                    key={i}
                    className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_10px_white]"
                    style={{ 
                        top: pos.t ? pos.t : undefined, bottom: pos.b ? pos.b : undefined,
                        left: pos.l ? pos.l : undefined, right: pos.r ? pos.r : undefined
                    }}
                 />
             ))}
        </div>
    </SimpleContainer>
);


// --- Landing B Visuals (Static) ---

export const VisualBurden = ({ step = 1 }) => {
    // Configuration for the 7 windows
    const windows = [
        { 
            id: "pdf", color: "border-gray-600 bg-gray-800", 
            icon: <FileText size={28} />, 
            label: "PDF",
            content: (
                <>
                    <div className="h-6 bg-gray-700 border-b border-gray-600 flex items-center px-2"></div>
                    <div className="flex flex-col items-center justify-center h-full pb-6 text-gray-400">
                        <FileText size={28} />
                        <span className="text-[10px] mt-2">scan_001.pdf</span>
                    </div>
                </>
            )
        },
        { 
            id: "proc", color: "border-gray-600 bg-gray-800", 
            icon: <FileText size={28} />, 
            label: "DOC",
            content: (
                <>
                    <div className="h-6 bg-gray-700 border-b border-gray-600 flex items-center px-2 justify-between">
                        <span className="text-[9px] text-gray-500">SOP_v1.txt</span>
                    </div>
                    <div className="p-3 space-y-2 opacity-50">
                        {[...Array(6)].map((_,i) => <div key={i} className="w-full h-1 bg-gray-600 rounded"></div>)}
                    </div>
                </>
            )
        },
        { 
            id: "db", color: "border-gray-700 bg-gray-900", 
            icon: <Database size={24} />, 
            label: "DB",
            content: (
                <>
                    <div className="h-6 bg-gray-800 border-b border-gray-700 flex items-center px-2 gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                    </div>
                    <div className="flex flex-col items-center justify-center h-full pb-6 text-gray-500">
                        <Database size={24} />
                        <span className="text-[10px] mt-1 font-mono">LEGACY_DB</span>
                    </div>
                </>
            )
        },
        { 
            id: "mail", color: "border-gray-600 bg-gray-800", 
            icon: <Mail size={24} />, 
            label: "MAIL",
            content: (
                <>
                    <div className="h-6 bg-gray-700 border-b border-gray-600 flex items-center px-2 gap-1">
                        <div className="w-2 h-2 rounded-full bg-gray-500/50"></div>
                    </div>
                    <div className="p-3 space-y-2">
                        <div className="flex items-center gap-2 text-gray-400 border-b border-gray-700 pb-2">
                            <Mail size={16} />
                            <span className="text-[10px]">Re: Invoice #992</span>
                        </div>
                        <div className="space-y-1">
                             <div className="w-full h-1 bg-gray-600 rounded"></div>
                             <div className="w-2/3 h-1 bg-gray-600 rounded"></div>
                        </div>
                    </div>
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">!</div>
                </>
            )
        },
        { 
            id: "word", color: "border-gray-600 bg-gray-800", 
            icon: <FileText size={24} />, 
            label: "DOC",
            content: (
                <>
                     <div className="h-6 bg-gray-700 border-b border-gray-700 flex items-center px-2">
                        <span className="text-[9px] text-gray-400">spec_2019_final.doc</span>
                     </div>
                     <div className="p-4 flex items-center justify-center h-full text-gray-600">
                        <FileText size={32} />
                     </div>
                     <div className="absolute bottom-2 right-2 bg-yellow-500/20 text-yellow-500 text-[9px] px-1 rounded border border-yellow-500/30">DEPRECATED</div>
                </>
            )
        },
        { 
            id: "xls", color: "border-gray-700 bg-gray-900", 
            icon: <FileSpreadsheet size={24} />, 
            label: "XLS",
            content: (
                <>
                     <div className="h-6 bg-gray-800 border-b border-gray-700 flex items-center px-2 justify-between">
                        <span className="text-[9px] text-gray-400">financials_v2.xlsx</span>
                     </div>
                     <div className="flex-1 p-2 grid grid-cols-4 gap-1 content-start">
                        {[...Array(16)].map((_, i) => (
                            <div key={i} className="h-4 bg-gray-800 border border-gray-700 rounded"></div>
                        ))}
                     </div>
                     <div className="absolute bottom-2 right-2 text-red-400">
                        <AlertCircle size={16} />
                     </div>
                </>
            )
        },
        { 
            id: "audio", color: "border-gray-700 bg-gray-900", 
            icon: <Mic size={24} />, 
            label: "AUDIO",
            content: (
                <>
                    <div className="h-6 bg-gray-800 border-b border-gray-700 flex items-center px-2"></div>
                    <div className="flex items-center justify-center h-full pb-6 gap-2 text-gray-400">
                        <Mic size={16} />
                        <div className="w-12 h-4 flex items-center gap-0.5">
                            <div className="w-1 h-2 bg-gray-600"></div>
                            <div className="w-1 h-4 bg-gray-500"></div>
                            <div className="w-1 h-3 bg-gray-600"></div>
                            <div className="w-1 h-1 bg-gray-700"></div>
                        </div>
                    </div>
                </>
            )
        },
    ];

    // Step 1: Chaotic Positions (Absolute)
    const chaoticPos = [
        { top: "1rem", left: "1.5rem", width: "8rem", height: "10rem", zIndex: 10 }, // PDF
        { top: "1.5rem", right: "2rem", width: "10rem", height: "12rem", zIndex: 10 }, // Process
        { bottom: "2rem", left: "3rem", width: "9rem", height: "7rem", zIndex: 20 }, // DB
        { top: "3rem", right: "6rem", width: "11rem", height: "8rem", zIndex: 30 }, // Email
        { top: "5rem", left: "8rem", width: "10rem", height: "10rem", zIndex: 30 }, // Word
        { bottom: "1rem", left: "50%", x: "-50%", width: "14rem", height: "10rem", zIndex: 40 }, // Excel
        { bottom: "2.5rem", right: "2.5rem", width: "9rem", height: "6rem", zIndex: 50 }, // Audio
    ];

    // Step 2: Organized Grid Positions
    // Distribute 7 items across 100% width. 
    // Margin left/right: 5%. Spacing: 90% / 7 = ~12.8% per slot.
    const getOrganizedStyle = (i) => {
        const slotWidth = 12.8; 
        const leftPos = 5 + (i * slotWidth) + (slotWidth / 2); // Center of slot
        return {
            top: "auto",
            bottom: "10px",
            left: `${leftPos}%`,
            x: "-50%", // Center on the left position
            width: "3.5rem", // Fixed small size
            height: "4.5rem",
            zIndex: 10,
            right: "auto" // Clear any right props
        };
    };

    return (
    <SimpleContainer>
        <div className="w-full h-full relative overflow-hidden p-4 bg-gray-900/50 transition-all duration-1000">
            
            {/* --- CONNECTIONS (Step 2 & 3) --- */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Step 2: Yellow lines from Bottom Grid to Master Data */}
                {step >= 2 && windows.map((_, i) => {
                    const slotWidth = 12.8; 
                    const leftPos = 5 + (i * slotWidth) + (slotWidth / 2); 
                    
                    const startX = leftPos;
                    const startY = 88; // Just above the bottom row
                    const endX = 50;
                    const endY = 56; // Bottom of Master Data

                    return (
                        <motion.path 
                            key={`yellow-${i}`}
                            d={`M ${startX} ${startY} C ${startX} ${startY-15}, ${endX} ${endY+15}, ${endX} ${endY}`} 
                            fill="none" stroke="#FACC15" strokeWidth="0.5" strokeOpacity="0.6"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 + i * 0.05 }}
                        />
                    );
                })}

                {/* Step 3: Gray lines from Master Data to Top Use Cases */}
                {step >= 3 && [20, 40, 60, 80].map((x, i) => (
                    <motion.path 
                        key={`gray-${i}`}
                        d={`M 50 44 C 50 35, ${x} 35, ${x} 15`} // 44 is top of master data
                        fill="none" stroke="#E5E7EB" strokeWidth="0.5" strokeOpacity="0.4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                    />
                ))}
            </svg>


            {/* --- MASTER DATA NODE (Step 2+) --- */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                initial={{ opacity: 0, scale: 0 }}
                animate={step >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="w-40 h-12 border-2 border-brand-gold bg-brand-gold/20 rounded flex flex-col items-center justify-center backdrop-blur-md shadow-[0_0_15px_#FACC15]">
                    <span className="text-brand-gold font-bold text-[10px] tracking-widest">STRUCTURED KNOWLEDGE</span>
                </div>
            </motion.div>


            {/* --- USE CASES (Step 3+) --- */}
            <div className="absolute top-8 left-0 right-0 flex justify-center gap-4 z-20 w-full px-8 pointer-events-none">
                {/* Distribute these evenly to match the gray lines targets (20%, 40%, 60%, 80%) */}
                {["Compliance", "Support", "Verifier", "..."].map((label, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={step >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                        className="absolute top-0 bg-gray-800 border border-gray-600 px-3 py-2 rounded text-gray-300 text-[10px] font-mono shadow-lg -translate-x-1/2"
                        style={{ left: `${20 + i * 20}%` }}
                    >
                        {label}
                    </motion.div>
                ))}
            </div>


            {/* --- WINDOWS (Morphing) --- */}
            {windows.map((win, i) => {
                // Determine current style based on step
                const currentStyle = step >= 2 ? getOrganizedStyle(i) : chaoticPos[i];
                
                return (
                    <motion.div 
                        key={i}
                        className={`absolute bg-gray-800 border rounded shadow-xl z-30 flex flex-col overflow-hidden ${win.color}`}
                        initial={chaoticPos[i]}
                        animate={currentStyle}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        {/* Step 1: Rich Content */}
                        <div className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${step >= 2 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                            {win.content}
                        </div>

                        {/* Step 2: Simplified Icon + Label */}
                        <div className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center transition-opacity duration-500 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="scale-75 origin-center">
                                {win.icon}
                            </div>
                            <span className="text-[10px] mt-1 font-mono text-gray-400">
                                {win.label}
                            </span>
                        </div>
                    </motion.div>
                );
            })}

        </div>
    </SimpleContainer>
    );
};

export const VisualAtlas = () => (
    <SimpleContainer>
        <div className="w-full h-full flex items-center justify-center">
            {/* Orbiting Particles (Static) */}
            <div className="relative w-40 h-40">
                <div className="absolute inset-0 rounded-full border border-brand-gold/20 border-dashed rotate-45" />
                <div className="absolute inset-4 rounded-full border border-brand-gold/40 border-dashed -rotate-12" />
                
                {/* Core */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-brand-gold rounded-full shadow-[0_0_20px_#FACC15]"></div>
                </div>

                {/* Floating Data Points */}
                {[...Array(8)].map((_, i) => (
                     <div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-white rounded-full"
                        style={{ 
                            top: '50%', left: '50%',
                            transform: `rotate(${i * 45}deg) translate(70px)` 
                        }}
                     />
                ))}
            </div>
             <div className="absolute bottom-8 text-brand-gold font-mono text-xs tracking-widest">KNOWLEDGE ATLAS</div>
        </div>
    </SimpleContainer>
);

export const VisualAutomation = () => (
    <SimpleContainer>
        <div className="w-full h-full flex items-center justify-center">
            {/* Pipeline Path */}
            <div className="relative flex items-center gap-2">
                {/* Trigger */}
                <div className="w-20 h-10 border border-brand-gold/50 rounded flex items-center justify-center text-brand-gold text-xs">TRIGGER</div>
                
                <div className="w-12 h-0.5 bg-white/20 relative"></div>

                {/* Agent */}
                <div className="w-12 h-12 rounded-full border border-brand-gold bg-brand-gold/10 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-brand-gold rounded-full"></div>
                </div>

                <div className="w-12 h-0.5 bg-white/20 relative"></div>

                {/* Result */}
                <div className="w-20 h-10 border border-white/20 bg-green-500/10 text-green-500 rounded flex items-center justify-center text-xs">ACTION</div>
            </div>
        </div>
    </SimpleContainer>
);