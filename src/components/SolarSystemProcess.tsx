'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

interface SolarSystemProcessProps {
    title: string;
    steps: string[];
}

export default function SolarSystemProcess({ title, steps }: SolarSystemProcessProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const orbitRadius = 220;

    useEffect(() => {
        if (!steps || steps.length === 0) return;
        const interval = setInterval(() => {
            setCurrentStepIndex((prev) => (prev + 1) % steps.length);
        }, 3000); // Next step every 3 seconds

        return () => clearInterval(interval);
    }, [steps]);

    const colors = useMemo(() => [
        '#3b82f6', // Blue
        '#8b5cf6', // Purple
        '#ec4899', // Pink
        '#f59e0b', // Orange
        '#10b981', // Teal
        '#008C78', // Branch Brand Teal
    ], []);

    if (!steps || steps.length === 0) {
        return (
            <div className="py-12 text-center text-slate-400 font-bold uppercase tracking-widest bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                Methodology framework coming soon for {title}
            </div>
        );
    }

    // Convert angle to position (0deg = 3 o'clock, 90deg = 6 o'clock/bottom)
    const getPosition = (angle: number) => {
        const radians = (angle * Math.PI) / 180;
        return {
            x: Math.cos(radians) * orbitRadius,
            y: Math.sin(radians) * orbitRadius,
        };
    };

    // Anti-clockwise: 90deg (bottom) and increase for anti-clockwise movement
    const getStepAngle = (index: number) => 90 + (index * (360 / steps.length));

    return (
        <div className="relative h-[650px] w-full flex items-center justify-center overflow-hidden bg-white">
            <div className="relative flex items-center justify-center" style={{ width: orbitRadius * 2 + 100, height: orbitRadius * 2 + 100 }}>

                {/* Orbit path ring */}
                <div
                    className="absolute rounded-full border border-slate-100"
                    style={{
                        width: orbitRadius * 2,
                        height: orbitRadius * 2,
                    }}
                />

                {/* Step Positions (Fixed Gray Markers) */}
                {steps.map((step, idx) => {
                    const angle = getStepAngle(idx);
                    const pos = getPosition(angle);
                    const isActive = idx === currentStepIndex;

                    return (
                        <div
                            key={idx}
                            className="absolute z-0"
                            style={{
                                transform: `translate(${pos.x}px, ${pos.y}px)`,
                            }}
                        >
                            <div
                                className={`w-14 h-14 rounded-full border-2 flex flex-col items-center justify-center text-[10px] font-bold transition-all duration-500 ${isActive ? "opacity-30 scale-110" : "opacity-10"
                                    }`}
                                style={{
                                    borderColor: colors[idx % colors.length],
                                    color: colors[idx % colors.length],
                                }}
                            >
                                <span className="opacity-60 uppercase tracking-tighter">Step</span>
                                <span className="text-lg font-black">{idx + 1}</span>
                            </div>
                        </div>
                    );
                })}

                {/* Central Hub - Service Name */}
                <div className="absolute z-10">
                    <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-[#008C78] blur-3xl opacity-10 animate-pulse" />
                        <div className="relative w-40 h-40 rounded-full bg-[#020617] border-4 border-[#008C78] shadow-2xl flex items-center justify-center text-center p-6 group transition-transform duration-500 hover:scale-105">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#008C78]/20 to-transparent rounded-full" />
                            <h5 className="text-white font-black text-lg leading-tight uppercase tracking-tight relative z-10">
                                {title}
                            </h5>
                        </div>
                    </div>
                </div>

                {/* Active Moving Step (Planet) */}
                <motion.div
                    key={currentStepIndex}
                    className="absolute z-20"
                    initial={{
                        x: getPosition(getStepAngle((currentStepIndex - 1 + steps.length) % steps.length)).x,
                        y: getStepAngle((currentStepIndex - 1 + steps.length) % steps.length) === 90 ? getPosition(90).y : getPosition(getStepAngle((currentStepIndex - 1 + steps.length) % steps.length)).y,
                        scale: 0.8,
                        opacity: 0,
                    }}
                    animate={{
                        x: getPosition(getStepAngle(currentStepIndex)).x,
                        y: getPosition(getStepAngle(currentStepIndex)).y,
                        scale: 1.1,
                        opacity: 1,
                    }}
                    transition={{
                        duration: 1,
                        ease: [0.34, 1.56, 0.64, 1], // Gentle bounce effect
                    }}
                >
                    <div className="relative flex flex-col items-center">
                        {/* Planet Glow */}
                        <div
                            className="absolute inset-0 rounded-full blur-2xl opacity-40"
                            style={{ backgroundColor: colors[currentStepIndex % colors.length] }}
                        />

                        {/* Planet Body */}
                        <div
                            className="relative w-24 h-24 rounded-full shadow-2xl flex flex-col items-center justify-center text-white p-4 border-2 border-white/20"
                            style={{
                                backgroundColor: colors[currentStepIndex % colors.length],
                                boxShadow: `0 0 40px ${colors[currentStepIndex % colors.length]}60`,
                            }}
                        >
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Step {currentStepIndex + 1}</span>
                            <p className="text-[11px] font-bold text-center leading-tight uppercase">
                                {steps[currentStepIndex]}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
