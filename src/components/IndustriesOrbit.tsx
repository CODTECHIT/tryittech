'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Monitor,
    Factory,
    HeartPulse,
    Building2,
    Pill,
    Settings,
    Wifi,
    ShoppingCart,
    ChevronRight,
    Globe,
    Zap,
    Shield,
    Target,
    BarChart3,
    Cpu
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
    'Monitor': Monitor,
    'HeartPulse': HeartPulse,
    'Building2': Building2,
    'Pill': Pill,
    'Settings': Settings,
    'Wifi': Wifi,
    'ShoppingCart': ShoppingCart,
    'Factory': Factory,
    'IT': Monitor,
    'Healthcare': HeartPulse,
    'Finance': Building2,
    'Banking & Finance': Building2,
    'Pharmaceutical': Pill,
    'Pharma': Pill,
    'Engineering': Settings,
    'Telecom': Wifi,
    'Retail': ShoppingCart,
    'Manufacturing': Factory,
    'Automotive': Factory,
    'Logistics': Globe,
    'BPO Services': Monitor,
    'BFSI': Building2,
    'Zap': Zap,
    'Shield': Shield,
    'Target': Target,
    'Global': Globe,
    'Globe': Globe,
    'BarChart3': BarChart3,
    'Growth': BarChart3,
    'Cpu': Cpu,
    'Tech': Cpu
};

const podGradients = [
    'from-blue-500 to-cyan-500',
    'from-cyan-500 to-teal-500',
    'from-teal-500 to-green-600',
    'from-yellow-500 to-orange-500',
    'from-orange-500 to-red-500',
    'from-pink-500 to-purple-500',
    'from-purple-500 to-fuchsia-500',
    'from-violet-500 to-purple-600'
];

interface IndustryData {
    id: string;
    slug: string;
    name: string;
    category: string;
    icon: string;
    color: string;
}

interface RawIndustry {
    _id?: string;
    id?: string;
    slug?: string;
    name: string;
    category?: string;
    icon: string;
}

export default function IndustriesOrbit({ initialData = [] }: { initialData?: RawIndustry[] }) {
    const [industries, setIndustries] = useState<IndustryData[]>([]);
    const [isMobile, setIsMobile] = useState(false);
    const [isSmallMobile, setIsSmallMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setIsSmallMobile(window.innerWidth < 480);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const processIndustries = (data: RawIndustry[]) => {
            if (Array.isArray(data) && data.length > 0) {
                setIndustries(data.map((item: RawIndustry, index: number) => ({
                    id: item._id || item.id || `industry-${index}`,
                    slug: item.slug || item.name.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-'),
                    name: item.name,
                    category: item.category === 'Non-IT' ? 'Non-IT' : 'IT',
                    icon: item.icon,
                    color: podGradients[index % podGradients.length]
                })));
            }
        };

        if (initialData.length > 0) {
            processIndustries(initialData);
        } else {
            const fetchIndustries = async () => {
                try {
                    const res = await fetch('/api/industries', { cache: 'no-store' });
                    const data = await res.json();
                    processIndustries(data);
                } catch (err) {
                    console.error('Failed to fetch industries:', err);
                }
            };
            fetchIndustries();
        }
    }, [initialData]);

    return (
        <SectionWrapper id="industries">
            <div className="max-w-7xl mx-auto px-4 relative flex flex-col items-center">
                {/* Header */}
                <header className="text-center mb-16 z-10">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[#008CC8] font-black uppercase tracking-[0.4em] text-xs block mb-2"
                    >
                        Global Reach
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-7xl font-black text-[#020617] tracking-tighter leading-none"
                    >
                        Industries <span className="text-[#008CC8]">We Excel In</span>
                    </motion.h2>
                </header>

                {/* Main Orbit Element */}
                <div className="relative w-full max-w-[320px] xs:max-w-[400px] sm:max-w-[500px] md:max-w-[650px] aspect-square flex items-center justify-center my-10 md:my-0">
                    {/* Center circle - Static text with Purple Theme */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] xs:w-[180px] xs:h-[180px] md:w-[260px] md:h-[260px] z-30">
                        {/* Outer glow ring */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-[#A855F7] to-purple-400 animate-spin-slow blur-md opacity-20" style={{ animationDuration: '8s' }} />

                        {/* Inner circle - Now with purple interior */}
                        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] backdrop-blur-md border border-purple-400/30 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.2)] overflow-hidden">
                            {/* Texture overlay to match the user's image feel */}
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#A855F7 0.5px, transparent 0.5px)', backgroundSize: '15px 15px' }} />

                            <div className="relative z-10 text-center px-4">
                                <h2 className="text-xs xs:text-sm md:text-2xl font-black text-[#020617] mb-0.5 md:mb-1 uppercase tracking-wide">Industries</h2>
                                <p className="text-sm xs:text-base md:text-4xl font-black text-[#A855F7]">
                                    We Serve
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Orbital ring - Static background */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] xs:w-[350px] xs:h-[350px] md:w-[500px] md:h-[500px]">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 500 500">
                            <circle
                                cx="250"
                                cy="250"
                                r="245"
                                fill="none"
                                stroke="#A855F7"
                                strokeWidth="1.5"
                                strokeDasharray="6 6"
                                className="opacity-20 translate-z-0"
                            />
                        </svg>
                    </div>

                    {/* Rotating Wrapper for Bubbles and Lines */}
                    <motion.div
                        className="absolute inset-0 w-full h-full"
                        animate={{ rotate: industries.length > 0 ? 360 : 0 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    >
                        {industries.map((industry, index) => {
                            const angle = (index * 360) / industries.length;
                            const radian = (angle - 90) * (Math.PI / 180);

                            // Use state-based responsive radii
                            const radius = isSmallMobile ? 140 : (isMobile ? 175 : 250);
                            const dotRadius = isSmallMobile ? 70 : (isMobile ? 90 : 115);

                            const x = Math.cos(radian) * radius;
                            const y = Math.sin(radian) * radius;

                            // Radians and coordinates for center dots
                            const dotX = Math.cos(radian) * dotRadius;
                            const dotY = Math.sin(radian) * dotRadius;

                            const Icon = iconMap[industry.icon] || Globe;
                            const staggerDelay = index * 0.5;

                            return (
                                <div key={industry.id} className="absolute inset-0 w-full h-full pointer-events-none">
                                    {/* Connection line with drawing animation */}
                                    <svg
                                        className="absolute left-1/2 top-1/2 w-full h-full overflow-visible"
                                        style={{ transform: 'translate(-50%, -50%)' }}
                                    >
                                        <motion.line
                                            x1={dotX}
                                            y1={dotY}
                                            x2={x}
                                            y2={y}
                                            stroke="#A855F7"
                                            strokeWidth="1.5"
                                            strokeDasharray="4 4"
                                            initial={{ opacity: 0.1 }}
                                            animate={{
                                                opacity: [0.1, 0.4, 0.1],
                                                strokeWidth: [1.5, 2.5, 1.5]
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                delay: staggerDelay,
                                                ease: "easeInOut"
                                            }}
                                            style={{ transform: 'translate(50%, 50%)' }}
                                        />
                                    </svg>

                                    {/* Connecting dots on center circle */}
                                    <motion.div
                                        className="absolute w-2.5 h-2.5 bg-[#A855F7] rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
                                        style={{
                                            x: dotX,
                                            y: dotY,
                                            boxShadow: '0 0 15px rgba(168, 85, 247, 0.8)',
                                        }}
                                        initial={{ scale: 0.8, opacity: 0.5 }}
                                        animate={{
                                            scale: [0.8, 1.5, 0.8],
                                            opacity: [0.5, 1, 0.5],
                                            backgroundColor: ['#A855F7', '#D8B4FE', '#A855F7']
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            delay: staggerDelay,
                                            ease: "easeInOut"
                                        }}
                                    />

                                    {/* Industry bubble */}
                                    <Link href={`/industries/${industry.slug}`} className="pointer-events-auto">
                                        <motion.div
                                            className="absolute left-1/2 top-1/2 w-[75px] h-[75px] xs:w-[95px] xs:h-[95px] md:w-[130px] md:h-[130px] group cursor-pointer"
                                            style={{
                                                x: x,
                                                y: y,
                                                left: '50%',
                                                top: '50%',
                                                translateX: '-50%',
                                                translateY: '-50%',
                                            }}
                                        >
                                            <motion.div
                                                className="w-full h-full relative"
                                                animate={{ rotate: -360 }}
                                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                            >
                                                {/* Glowing background */}
                                                <motion.div
                                                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${industry.color} blur-md`}
                                                    animate={{
                                                        opacity: [0.3, 0.6, 0.3],
                                                        scale: [1, 1.1, 1]
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        repeat: Infinity,
                                                        delay: staggerDelay,
                                                        ease: "easeInOut"
                                                    }}
                                                />
                                                <div className={`absolute inset-1 rounded-full bg-gradient-to-br ${industry.color} border border-white/30 flex flex-col items-center justify-center gap-1.5 transition-transform duration-300 group-hover:scale-110 shadow-lg`}>
                                                    <div className="text-white">
                                                        <Icon className="w-5 h-5 md:w-7 md:h-7" strokeWidth={2} />
                                                    </div>
                                                    <p className="text-white font-bold text-center px-2 text-[9px] md:text-xs leading-tight uppercase tracking-tight">
                                                        {industry.name}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    </Link>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* CTA Button */}
                <div className="mt-12 z-10">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a
                            href="#contact"
                            className="px-8 py-4 bg-[#008CC8] rounded-full text-white font-black uppercase tracking-widest text-sm flex items-center gap-3 shadow-xl hover:bg-[#007AB0] transition-colors"
                        >
                            Partner With Us
                            <ChevronRight className="w-5 h-5" />
                        </a>
                    </motion.div>
                </div>

                {/* Industries Grid List Categorized */}
                <div className="mt-32 w-full max-w-6xl z-10 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                        {['IT', 'Non-IT'].map((category) => {
                            const items = industries.filter(ind => (ind.category || 'IT') === category);
                            if (items.length === 0) return null;

                            return (
                                <div key={category}>
                                    <div className="flex items-center gap-3 mb-10">
                                        <span className={`w-12 h-1 bg-gradient-to-r ${category === 'IT' ? 'from-[#008CC8]' : 'from-[#e11d48]'} to-transparent rounded-full`} />
                                        <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] ${category === 'IT' ? 'text-[#008CC8]' : 'text-[#e11d48]'}`}>
                                            {category} Market Verticals
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                                        {items.map((industry) => (
                                            <Link key={`list-${category}-${industry.id}`} href={`/industries/${industry.slug}`}>
                                                <motion.div
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    className="flex items-center gap-4 group cursor-pointer"
                                                >
                                                    <div className={`w-1.5 h-6 bg-gradient-to-b ${industry.color} rounded-full group-hover:scale-y-150 transition-transform origin-bottom`} />
                                                    <span className={`text-[#020617] font-bold text-base md:text-lg tracking-tight leading-tight transition-colors ${category === 'IT' ? 'group-hover:text-[#008CC8]' : 'group-hover:text-[#e11d48]'}`}>
                                                        {industry.name}
                                                    </span>
                                                </motion.div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}

const SectionWrapper = styled.section`
  background: linear-gradient(to bottom, #ffffff, #f0f7ff, #ffffff);
  padding: 140px 0;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(#008CC8 0.5px, transparent 0.5px);
    background-size: 30px 30px;
    opacity: 0.05;
    pointer-events: none;
  }

  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .animate-spin-slow {
    animation: spin-slow 12s linear infinite;
  }
`;
