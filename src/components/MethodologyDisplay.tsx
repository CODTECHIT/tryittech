'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Target,
    Users,
    Cpu,
    ShieldCheck,
    CheckCircle2,
    Rocket,
    TrendingUp
} from 'lucide-react';

const methodologySteps = [
    {
        title: "Discovery & Analysis",
        description: "In-depth research into organizational needs and project scope.",
        icon: Search,
        color: "#008CC8" // Blue
    },
    {
        title: "Strategy Mapping",
        description: "Developing a customized talent acquisition roadmap.",
        icon: Target,
        color: "#008CC8" // Teal
    },
    {
        title: "Talent Sourcing",
        description: "Activating our global network of elite professionals.",
        icon: Users,
        color: "#63B545" // Growth Green
    },
    {
        title: "Technical Vetting",
        description: "Rigorous evaluation of skillsets and cultural alignment.",
        icon: Cpu,
        color: "#5B2D8D" // Royal Purple
    },
    {
        title: "Security & Compliance",
        description: "Ensuring all candidates meet international standards.",
        icon: ShieldCheck,
        color: "#F0960A" // Energy Orange
    },
    {
        title: "Interview Synergy",
        description: "Coordinating seamless client-candidate interactions.",
        icon: CheckCircle2,
        color: "#008CC8"
    },
    {
        title: "Rapid Deployment",
        description: "Fast onboarding to maintain project momentum.",
        icon: Rocket,
        color: "#008CC8"
    },
    {
        title: "Success Optimizing",
        description: "Continuous performance monitoring and support.",
        icon: TrendingUp,
        color: "#63B545"
    }
];

export default function MethodologyDisplay() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % methodologySteps.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="pt-32 pb-0 md:pb-0 bg-[#020617] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#008CC8_1px,transparent_1px)] [background-size:40px_40px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#008CC8]/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-24">
                    <motion.h4
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[#008CC8] font-black uppercase tracking-[0.4em] text-xs mb-4"
                    >
                        Execution Excellence
                    </motion.h4>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none"
                    >
                        Our <span className="text-[#008CC8]">Methodology</span> <br className="hidden md:block" />
                        <span className="text-[#008CC8]">Delivery Framework</span>
                    </motion.h2>
                </div>

                <div className="relative flex items-center justify-center h-[500px] md:h-[700px] mt-10 md:mt-0">
                    {/* Main Container - The "Orbit" */}
                    <div className="relative w-full h-full flex items-center justify-center scale-[0.6] sm:scale-[0.8] md:scale-100 transition-transform duration-500">

                        {/* Background Rings */}
                        <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] border border-slate-200 rounded-full opacity-50" />
                        <div className="absolute w-[240px] h-[240px] md:w-[400px] md:h-[400px] border border-slate-100 rounded-full opacity-30" />
                        <div className="absolute w-[360px] h-[360px] md:w-[600px] md:h-[600px] border border-slate-200/50 rounded-full opacity-20" />

                        {/* Central Glow & Text */}
                        <div className="absolute z-10 text-center flex flex-col items-center justify-center p-4 md:p-8 bg-white/40 backdrop-blur-xl rounded-full border border-white/50 shadow-2xl w-[180px] h-[180px] md:w-[280px] md:h-[280px]">
                            <div
                                className="absolute inset-0 rounded-full opacity-20 blur-2xl md:blur-3xl transition-colors duration-1000"
                                style={{ backgroundColor: methodologySteps[activeIndex].color }}
                            />
                            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 md:mb-2">Current Phase</span>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <h3 className="text-lg md:text-2xl font-black text-[#020617] mb-1 md:mb-4 leading-tight px-3 md:px-4">
                                        {methodologySteps[activeIndex].title}
                                    </h3>
                                    <p className="text-[9px] md:text-xs text-slate-500 font-medium leading-relaxed max-w-[120px] md:max-w-[180px] mx-auto">
                                        {methodologySteps[activeIndex].description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* The Balls (Steps) */}
                        {methodologySteps.map((step, index) => {
                            // Calculate relative index for rotation
                            // Index 0 should be at 90 deg (6:00) when activeIndex is 0
                            // But normally we'd say "container rotates"
                            // Here, we'll calculate position based on (index - activeIndex)

                            const stepCount = methodologySteps.length;
                            const angleIncrement = 360 / stepCount;

                            // Base angle: 90 is bottom.
                            // We want activeIndex to be at 90.
                            // So for index I, the angle is 90 + (I - activeIndex) * 45
                            const currentAngle = 90 + (index - activeIndex) * angleIncrement;
                            const radians = (currentAngle * Math.PI) / 180;
                            const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 140 : 260;

                            const x = Math.cos(radians) * radius;
                            const y = Math.sin(radians) * radius;

                            const isActive = index === activeIndex;

                            return (
                                <motion.div
                                    key={index}
                                    className="absolute"
                                    animate={{
                                        x,
                                        y,
                                        scale: isActive ? 1.5 : 0.8,
                                        zIndex: isActive ? 50 : 10,
                                        opacity: 1
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 60,
                                        damping: 15,
                                        mass: 0.8
                                    }}
                                >
                                    <div className="relative group">
                                        {/* Shadow & Glow */}
                                        <div
                                            className={`absolute inset-0 rounded-full blur-xl transition-all duration-700 ${isActive ? 'opacity-60 scale-150' : 'opacity-0 scale-100'}`}
                                            style={{ backgroundColor: step.color }}
                                        />

                                        {/* The Ball */}
                                        <div
                                            className={`relative w-14 h-14 md:w-20 md:h-20 rounded-full flex flex-col items-center justify-center text-white border-4 p-2 transition-all duration-500 ${isActive ? 'shadow-2xl' : 'shadow-lg border-white/50'}`}
                                            style={{
                                                backgroundColor: step.color,
                                                borderColor: isActive ? 'white' : 'rgba(255,255,255,0.3)'
                                            }}
                                        >
                                            <step.icon className={`w-6 h-6 md:w-8 md:h-8 ${isActive ? 'opacity-100 scale-110' : 'opacity-60'} transition-all`} />
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 md:w-7 md:h-7 bg-white rounded-full flex items-center justify-center text-[8px] md:text-[10px] font-black border-2 border-slate-50" style={{ color: step.color }}>
                                                {index + 1}
                                            </div>
                                        </div>

                                        {/* Hover Label (only for non-active) */}
                                        {!isActive && (
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#020617] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                {step.title}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
