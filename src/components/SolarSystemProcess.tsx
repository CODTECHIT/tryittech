'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SolarSystemProcessProps {
    title: string;
    steps: string[];
}

const colors = [
    '#3b82f6', // Blue
    '#8b5cf6', // Purple
    '#ec4899', // Pink
    '#F0960A', // Orange
    '#10b981', // Teal
    '#008CC8', // Branch Brand Teal
];

export default function SolarSystemProcess({ title, steps }: SolarSystemProcessProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const orbitRadius = 240;

    useEffect(() => {
        if (!steps || steps.length === 0) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % steps.length);
        }, 3500);

        return () => clearInterval(interval);
    }, [steps]);

    if (!steps || steps.length === 0) {
        return (
            <div className="py-12 text-center text-slate-400 font-bold uppercase tracking-widest bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                Methodology framework coming soon for {title}
            </div>
        );
    }

    return (
        <div className="relative h-[650px] w-full flex items-center justify-center overflow-hidden bg-white">
            <div className="relative flex items-center justify-center w-full h-full">

                {/* Visual Orbit Rings */}
                <div
                    className="absolute rounded-full border-2 border-slate-200 opacity-60"
                    style={{ width: orbitRadius * 2, height: orbitRadius * 2 }}
                />
                <div
                    className="absolute rounded-full border-2 border-slate-100 opacity-40"
                    style={{ width: (orbitRadius - 40) * 2, height: (orbitRadius - 40) * 2 }}
                />

                {/* Central Focus Area */}
                <div
                    className="absolute z-10 w-[240px] h-[240px] rounded-full bg-white/70 backdrop-blur-xl border-4 flex flex-col items-center justify-center text-center p-8 group overflow-hidden transition-all duration-1000 ease-in-out shadow-2xl"
                    style={{
                        borderColor: colors[activeIndex % colors.length],
                        boxShadow: `0 0 40px ${colors[activeIndex % colors.length]}30`
                    }}
                >
                    <motion.div
                        className="absolute inset-0 opacity-20 blur-3xl transition-colors duration-1000"
                        animate={{ backgroundColor: colors[activeIndex % colors.length] }}
                    />
                    <div className="relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-widest mb-2 block transition-colors duration-1000" style={{ color: colors[activeIndex % colors.length] }}>Focusing On</span>
                        <AnimatePresence mode="wait">
                            <motion.h5
                                key={activeIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-[#020617] font-black text-xl leading-tight uppercase tracking-tight"
                            >
                                {steps[activeIndex]}
                            </motion.h5>
                        </AnimatePresence>
                        <div
                            className="w-12 h-1 mx-auto mt-4 rounded-full transition-colors duration-1000 opacity-30"
                            style={{ backgroundColor: colors[activeIndex % colors.length] }}
                        />
                    </div>
                </div>

                {/* The Rotating Steps (Balls) */}
                {steps.map((step, index) => {
                    const stepCount = steps.length;
                    const angleIncrement = 360 / stepCount;

                    // We want activeIndex to be at 90 deg (6:00 position).
                    // So currentAngle = 90 + (index - activeIndex) * angleIncrement
                    const currentAngle = 90 + (index - activeIndex) * angleIncrement;
                    const radians = (currentAngle * Math.PI) / 180;

                    const x = Math.cos(radians) * orbitRadius;
                    const y = Math.sin(radians) * orbitRadius;

                    const isActive = index === activeIndex;

                    return (
                        <motion.div
                            key={index}
                            className="absolute"
                            animate={{
                                x,
                                y,
                                scale: isActive ? 1.4 : 0.8,
                                zIndex: isActive ? 50 : 10,
                                opacity: 1
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 50,
                                damping: 15,
                                mass: 0.8
                            }}
                        >
                            <div className="relative">
                                {/* Glow beneath active ball */}
                                {isActive && (
                                    <div
                                        className="absolute inset-0 rounded-full blur-2xl opacity-40 animate-pulse"
                                        style={{ backgroundColor: colors[index % colors.length] }}
                                    />
                                )}

                                <div
                                    className={`relative w-24 h-24 rounded-full flex flex-col items-center justify-center text-white p-4 transition-all duration-700 shadow-xl border-4 ${isActive ? 'border-white' : 'border-slate-300'}`}
                                    style={{
                                        backgroundColor: colors[index % colors.length],
                                        boxShadow: isActive ? `0 0 30px ${colors[index % colors.length]}50` : 'none'
                                    }}
                                >
                                    <span className="text-[8px] font-black uppercase tracking-widest opacity-70 mb-1">Step {index + 1}</span>
                                    <p className="text-[10px] font-black text-center leading-tight uppercase line-clamp-2">
                                        {step}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

