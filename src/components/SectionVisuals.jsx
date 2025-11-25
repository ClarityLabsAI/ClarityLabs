import { motion } from 'framer-motion';
import React from 'react';

// --- Shared Container (No Window Chrome) ---
const SimpleContainer = ({ children }) => (
  <div className="relative w-full h-full rounded-xl border border-white/10 bg-black/40 bg-gradient-to-br from-white/5 to-transparent aspect-video overflow-hidden shadow-2xl backdrop-blur-sm">
    {/* Content */}
    <div className="w-full h-full relative">
        {children}
    </div>
  </div>
);


// --- Landing A Visuals ---

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

            {/* Competitors Line (Linear/Low) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none p-8 overflow-visible">
                <motion.path
                    d="M 0 300 L 300 250" // Slight rise
                    fill="none" stroke="#666" strokeWidth="2" strokeDasharray="4 4"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2 }}
                />
                {/* "You" Line (Exponential) */}
                <motion.path
                    d="M 0 300 Q 200 300 350 50" // Exponential Curve
                    fill="none" stroke="#FACC15" strokeWidth="4"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5 }}
                />
            </svg>

            {/* Labels */}
            <motion.div
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 2 }}
                className="absolute top-1/4 right-12 bg-brand-gold/20 border border-brand-gold px-3 py-1 rounded text-brand-gold text-xs font-bold"
            >
                AI ADOPTION
            </motion.div>
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
                {/* Top: Raw Inputs - High Z-Index to cover lines */}
                <div className="flex gap-4 z-20 mb-8 bg-black/20 p-2 rounded-lg backdrop-blur-sm">
                    {inputs.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="w-10 h-12 border border-white/20 bg-white/5 rounded flex flex-col items-center justify-center text-gray-400 text-[10px] font-mono shadow-lg"
                        >
                            {item.label}
                        </motion.div>
                    ))}
                </div>

                {/* Connections - Lowered start points and behind inputs */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0" viewBox="0 0 400 300">
                    {[
                        "M 120 100 C 120 140, 200 120, 200 180",
                        "M 160 100 C 160 140, 200 120, 200 180",
                        "M 200 100 L 200 180",
                        "M 240 100 C 240 140, 200 120, 200 180",
                        "M 280 100 C 280 140, 200 120, 200 180"
                    ].map((d, i) => (
                        <motion.path
                            key={i} d={d} fill="none" stroke="#FACC15" strokeWidth="1.5" strokeOpacity="0.5"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                        />
                    ))}
                </svg>

                {/* Master Data Core */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    animate={{ boxShadow: ["0 0 0px #FACC15", "0 0 20px #FACC15", "0 0 0px #FACC15"] }}
                    className="w-40 h-16 border-2 border-brand-gold bg-brand-gold/20 rounded-lg flex flex-col items-center justify-center z-20 backdrop-blur-md mt-16"
                >
                    <div className="text-brand-gold font-bold tracking-widest text-xs">MASTER DATA</div>
                    <div className="text-[8px] text-brand-gold/70">Structured Knowledge</div>
                </motion.div>

            </div>
        </SimpleContainer>
    );
};

export const VisualNetwork = () => (
    <SimpleContainer>
        <div className="w-full h-full flex items-center justify-center relative">
            {/* Network Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.g stroke="#FACC15" strokeWidth="1" strokeOpacity="0.3">
                    <line x1="200" y1="150" x2="100" y2="100" />
                    <line x1="200" y1="150" x2="300" y2="100" />
                    <line x1="200" y1="150" x2="100" y2="200" />
                    <line x1="200" y1="150" x2="300" y2="200" />
                    <line x1="100" y1="100" x2="300" y2="100" />
                </motion.g>
            </svg>

            {/* Central Brain Node */}
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-brand-gold bg-brand-gold/10 flex items-center justify-center z-20 shadow-[0_0_15px_#FACC15]"
            >
                <div className="w-8 h-8 bg-brand-gold rounded-full opacity-80"></div>
            </motion.div>

            {/* Satellite Nodes */}
            {[
                { t: 100, l: 100 }, { t: 100, r: 100 },
                { b: 100, l: 100 }, { b: 100, r: 100 }
            ].map((pos, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.2 }}
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


// --- Landing B Visuals ---

export const VisualBurden = () => (
    <SimpleContainer>
        <div className="w-full h-full flex items-center justify-center gap-6 p-8">
            {/* Silos */}
            {['ERP', 'PDF', 'MAIL'].map((label, i) => (
                <motion.div
                    key={i}
                    initial={{ y: 0 }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2 + i, repeat: Infinity, ease: "easeInOut" }}
                    className="w-20 h-32 border border-white/20 bg-white/5 rounded flex flex-col items-center justify-center relative"
                >
                    <span className="text-gray-500 font-mono text-sm mb-2">{label}</span>
                    {/* Warning Icon */}
                    <div className="w-4 h-4 rounded-full bg-red-500/50 animate-pulse"></div>
                    {/* Disconnect Icons */}
                    <div className="absolute -right-4 top-1/2 text-red-500 text-xs">x</div>
                </motion.div>
            ))}
        </div>
    </SimpleContainer>
);

export const VisualAtlas = () => (
    <SimpleContainer>
        <div className="w-full h-full flex items-center justify-center">
            {/* Orbiting Particles */}
            <div className="relative w-40 h-40">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-brand-gold/20 border-dashed"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 rounded-full border border-brand-gold/40 border-dashed"
                />

                {/* Core */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-brand-gold rounded-full shadow-[0_0_20px_#FACC15]"></div>
                </div>

                {/* Floating Data Points */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
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

                <div className="w-12 h-0.5 bg-white/20 relative">
                    <motion.div
                        animate={{ left: ["0%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-1 bg-brand-gold rounded-full shadow-[0_0_8px_#FACC15]"
                    />
                </div>

                {/* Agent */}
                <div className="w-12 h-12 rounded-full border border-brand-gold bg-brand-gold/10 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-brand-gold rounded-full"></div>
                </div>

                <div className="w-12 h-0.5 bg-white/20 relative">
                    <motion.div
                        animate={{ left: ["0%", "100%"] }}
                        transition={{ duration: 1.5, delay: 0.75, repeat: Infinity }}
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-1 bg-brand-gold rounded-full shadow-[0_0_8px_#FACC15]"
                    />
                </div>

                {/* Result */}
                <div className="w-20 h-10 border border-white/20 bg-green-500/10 text-green-500 rounded flex items-center justify-center text-xs">ACTION</div>
            </div>
        </div>
    </SimpleContainer>
);
