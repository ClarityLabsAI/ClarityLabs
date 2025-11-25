import { motion } from 'framer-motion';
import React from 'react';

const UseCasePanel = ({ title, children, visual, align = 'left' }) => {
    return (
        <div className="py-24 border-b border-white/10 bg-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Text Content */}
                <div className={`order-2 ${align === 'right' ? 'lg:order-1' : 'lg:order-2'}`}>
                    <h3 className="text-3xl font-sans font-bold text-white mb-6 tracking-tight">
                        {title}
                    </h3>
                    <div className="space-y-4 text-gray-400 leading-relaxed text-lg">
                        {children}
                    </div>
                </div>

                {/* Visual Demo - Light Mode App Container */}
                <div className={`order-1 ${align === 'right' ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative rounded-xl border border-gray-700 bg-gray-200 aspect-video overflow-hidden shadow-2xl">
                        {/* Window Controls (Light Mode) */}
                        <div className="absolute top-0 left-0 w-full h-8 bg-gray-100 border-b border-gray-300 flex items-center px-3 gap-2 z-10">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>

                        {/* The Visual Content - White Background */}
                        <div className="w-full h-full pt-8 flex items-center justify-center p-6 bg-white">
                            {visual}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

// Visual 1: Regulatory Filings (Top-Down Flow, Light Mode)
const VisualFilings = () => {
    // Input types configuration
    const inputs = [
        { label: "PDF", color: "bg-red-100 border-red-200 text-red-700" },
        { label: "MAIL", color: "bg-blue-100 border-blue-200 text-blue-700" }, // Email
        { label: "XLS", color: "bg-green-100 border-green-200 text-green-700" },
        { label: "DOC", color: "bg-indigo-100 border-indigo-200 text-indigo-700" },
        { label: "DB", color: "bg-gray-100 border-gray-200 text-gray-700" },
    ];

    return (
        <div className="w-full h-full flex flex-col items-center justify-between py-2 relative">
            {/* Top: Raw Data Docs (Single Row) */}
            <div className="flex gap-3 z-10">
                {inputs.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`w-8 h-10 border ${item.color} rounded flex flex-col items-center justify-center shadow-sm`}
                    >
                        <span className="text-[8px] font-bold">{item.label}</span>
                    </motion.div>
                ))}
            </div>

                    {/* Middle: Connections & Master Data */}

                    <div className="flex-1 w-full flex flex-col items-center justify-center relative">

                         {/* Convergence Lines (Top -> Master) */}

                                      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 300 150" preserveAspectRatio="xMidYMid meet">

                                          {/* Inputs to Master - Intermediate spread */}

                                          {[

                                              "M 75 10 C 75 40, 150 20, 150 60",

                                              "M 112 10 C 112 40, 150 20, 150 60",

                                              "M 150 10 L 150 60",

                                              "M 187 10 C 187 40, 150 20, 150 60",

                                              "M 225 10 C 225 40, 150 20, 150 60"

                                          ].map((d, i) => (

                                              <motion.path 

                                                 key={i} d={d} fill="none" stroke="#E5E7EB" strokeWidth="1.5"

                                                 initial={{ pathLength: 0 }}

                                                 whileInView={{ pathLength: 1 }}

                                                 transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}

                                              />

                                          ))}

                                          

                                          {/* Master to Outputs (Fan out) - Intermediate spread */}

                                          {[

                                              "M 150 100 C 150 120, 50 120, 50 150",

                                              "M 150 100 C 150 120, 90 120, 90 150",

                                              "M 150 100 C 150 120, 130 120, 130 150",

                                              "M 150 100 C 150 120, 170 120, 170 150",

                                              "M 150 100 C 150 120, 210 120, 210 150",

                                              "M 150 100 C 150 120, 250 120, 250 150"

                                          ].map((d, i) => (

                                 <motion.path 

                                    key={i} d={d} fill="none" stroke="#FACC15" strokeWidth="1.5"

                                    initial={{ pathLength: 0 }}

                                    whileInView={{ pathLength: 1 }}

                                    transition={{ duration: 0.8, delay: 1.7 + i * 0.1 }}

                                 />

                             ))}

                         </svg>

            

                         {/* Master Data Node */}

                         <motion.div

                            initial={{ scale: 0.8, opacity: 0 }}

                            whileInView={{ scale: 1, opacity: 1 }}

                            transition={{ delay: 1.2, duration: 0.5 }}

                            className="w-28 h-10 border border-brand-gold bg-yellow-50 rounded flex flex-col items-center justify-center z-10 shadow-sm mt-2"

                         >

                            <span className="text-[8px] font-mono text-yellow-700 tracking-wider font-bold">MASTER DATA</span>

                         </motion.div>

                    </div>

            

                    {/* Bottom: Outputs Grid */}

                    <div className="grid grid-cols-6 gap-3 z-10 mt-1">

                        {[...Array(6)].map((_, i) => (

                            <motion.div

                                key={i}

                                initial={{ opacity: 0, scale: 0.8 }}

                                whileInView={{ opacity: 1, scale: 1, borderColor: "#FACC15", backgroundColor: "#FEFCE8" }}

                                transition={{ delay: 2.2 + i * 0.1 }}

                                className="w-8 h-10 border border-gray-200 bg-white rounded flex flex-col p-1 shadow-sm"

                            >

                                <div className="w-full h-0.5 bg-gray-200 mb-1"></div>

                                <div className="w-2/3 h-0.5 bg-gray-200"></div>

                                <div className="mt-auto self-end w-1.5 h-1.5 rounded-full bg-brand-gold"></div>

                            </motion.div>

                        ))}

                    </div>
        </div>
    );
};

// Visual 2: Customer Disputes (Light Mode)
const VisualDisputes = () => (
    <div className="w-full max-w-sm border border-gray-200 bg-gray-50 rounded-lg p-4 font-mono text-xs shadow-lg">
        {/* Header */}
        <div className="flex justify-between text-gray-500 mb-4 border-b border-gray-200 pb-2">
            <span className="font-bold text-gray-700">CASE #8291</span>
            <span className="text-green-700 bg-green-100 px-2 py-0.5 rounded-full text-[10px] font-bold border border-green-200">AUTO-RESOLVED</span>
        </div>

        {/* Logic Steps */}
        <div className="space-y-4 relative">
            {/* Connecting Line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-300"></div>

            <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3 relative z-10"
            >
                <div className="w-4 h-4 rounded-full bg-white border border-green-500 flex items-center justify-center text-[8px] text-green-600 font-bold">✓</div>
                <div className="bg-white p-2 rounded w-full border border-gray-200 shadow-sm">
                    <span className="text-gray-400 block text-[10px] font-bold">STEP 1: POLICY CHECK</span>
                    <span className="text-gray-800">Plan covers accidental damage</span>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 relative z-10"
            >
                <div className="w-4 h-4 rounded-full bg-white border border-green-500 flex items-center justify-center text-[8px] text-green-600 font-bold">✓</div>
                <div className="bg-white p-2 rounded w-full border border-gray-200 shadow-sm">
                    <span className="text-gray-400 block text-[10px] font-bold">STEP 2: USAGE LOGS</span>
                    <span className="text-gray-800">Customer active since 2021</span>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-3 relative z-10"
            >
                <div className="w-4 h-4 rounded-full bg-brand-gold text-white flex items-center justify-center font-bold text-[10px] shadow-md">$</div>
                <div className="bg-yellow-50 p-2 rounded w-full border border-brand-gold/30 shadow-sm">
                    <span className="text-yellow-700 block text-[10px] font-bold">DECISION</span>
                    <span className="text-gray-900 font-bold">Approve Refund: $45.00</span>
                </div>
            </motion.div>
        </div>
    </div>
);

// Visual 3: Supplier Qualification (Light Mode + 5 Popups)
const VisualSupplier = () => {
    const checkmarks = [
        "Tax ID Verified",
        "ISO 9001 Valid",
        "Insurance Active",
        "Bank Verified",
        "Sanctions Clear"
    ];

    return (
        <div className="w-full h-full flex gap-4 p-2">
            {/* Document List */}
            <div className="w-1/4 space-y-2 opacity-70">
                <div className="h-10 bg-gray-100 border border-gray-200 rounded"></div>
                <div className="h-10 bg-white border-l-4 border-l-brand-gold border-y border-r border-gray-200 rounded shadow-md flex items-center px-2">
                    <span className="text-[8px] font-bold text-gray-700 truncate">Acme Corp Ltd.</span>
                </div>
                <div className="h-10 bg-gray-100 border border-gray-200 rounded"></div>
            </div>

            {/* Main Scanner View */}
            <div className="flex-1 bg-white rounded border border-gray-200 relative overflow-hidden flex flex-col p-4 gap-3 shadow-inner">
                {/* Fake Document Text */}
                <div className="space-y-3 opacity-30">
                    <div className="w-1/2 h-2 bg-gray-400 rounded"></div>
                    <div className="w-full h-2 bg-gray-300 rounded"></div>
                    <div className="w-3/4 h-2 bg-gray-300 rounded"></div>
                    <div className="w-full h-2 bg-gray-300 rounded"></div>
                    <div className="w-5/6 h-2 bg-gray-300 rounded"></div>
                    <div className="w-full h-2 bg-gray-300 rounded"></div>
                </div>

                {/* Scan Line */}
                <motion.div
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-[2px] bg-brand-gold shadow-[0_0_8px_rgba(250,204,21,0.6)] z-10"
                />

                {/* Extracted Fields Popups - 5 items distributed vertically */}
                <div className="absolute right-2 top-0 bottom-0 flex flex-col justify-evenly py-2 z-20">
                    {checkmarks.map((text, i) => (
                        <motion.div
                            key={i}
                            // We want them to appear as the line passes down (approx 0-2s)
                            // Line speed is constant. 
                            // Delay = (Index / Count) * 2s (half cycle)
                            initial={{ opacity: 0, x: 10, scale: 0.9 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ delay: 0.3 + (i * 0.35), duration: 0.4 }}
                            className="bg-white border border-green-200 px-2 py-1.5 rounded text-[9px] text-green-700 shadow-lg flex items-center gap-1.5"
                        >
                            <span className="text-green-500 font-bold bg-green-100 rounded-full w-3 h-3 flex items-center justify-center text-[7px]">✓</span>
                            <span className="font-semibold">{text}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};


const UseCases = () => {
    return (
        <section className="bg-black">
            <div className="pt-20 pb-12 text-center">
                <h2 className="text-4xl md:text-5xl font-sans font-bold text-white mb-4">Proven Results</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">Real-world impact across industries.</p>
            </div>

            <UseCasePanel
                title="Regulatory Filings"
                align="left"
                visual={<VisualFilings />}
            >
                <p>
                    We worked with a regional health insurer filing quarterly reports to twelve state regulators and reduced their reporting cycle from <strong>three weeks to four days</strong>. We built a structured map of all relevant information and connected it to an AI system that generates a draft report in the exact format each state requires.
                </p>
                <p>
                    The team responsible shrank from six people to two. Error rates dropped from an average of three corrections per quarter to zero corrections in the first year after implementation. The company estimates annual savings of four hundred thousand dollars in labor costs, plus avoided penalties and reduced audit preparation time.
                </p>
            </UseCasePanel>

            <UseCasePanel
                title="Customer Disputes"
                align="right"
                visual={<VisualDisputes />}
            >
                <p>
                    We automated <strong>71% of dispute resolutions</strong> for a telecommunications provider handling 35,000 customer cases per month. Average resolution time dropped from six days to eight hours.
                </p>
                <p>
                    Goodwill payments decreased 14% because the system applied policy consistently instead of over-granting to end difficult conversations. Escalations to supervisors dropped by half.
                </p>
            </UseCasePanel>

            <UseCasePanel
                title="Supplier Qualification"
                align="left"
                visual={<VisualSupplier />}
            >
                <p>
                    We helped a manufacturing company qualifying five hundred suppliers annually to reduce average onboarding time from <strong>41 days to 9 days</strong>.
                </p>
                <p>
                    Procurement staff reallocated 30% of their time from administrative processing to strategic activities. Document completeness reached 100%, up from an estimated 70% under the manual process.
                </p>
            </UseCasePanel>
        </section>
    );
};

export default UseCases;