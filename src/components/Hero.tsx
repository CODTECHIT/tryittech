'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface Slide {
    type: string;
    badge?: string;
    title: string;
    highlight: string;
    subtitle: string;
    image: string;
    items?: string[];
    color: string; // Dynamic accent color
}

const slides: Slide[] = [
    {
        type: "primary",
        title: "TRYITTECH LLP",
        highlight: "Staffing for What's Next",
        subtitle: "Building the foundation of organizational success through specialized full-time talent acquisition and strategic headhunting.",
        image: "https://innovasolutions.com/wp-content/uploads/2025/03/SOL_TAL_L2_B1_Desktop-2.jpg",
        color: "#008CC8" // Original Blue
    },
    {
        type: "list",
        badge: "TRYITTECH LLP",
        title: "Our Core",
        highlight: "Services",
        subtitle: "Comprehensive workforce solutions tailored for global scale.",
        items: [
            "Permanent Hiring",
            "Contract Staffing",
            "Offshore IT Hub",
            "Staff Augmentation",
            "RPO Frameworks",
            "Payroll Services"
        ],
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop",
        color: "#06B6D4" // Cyan
    },
    {
        type: "list",
        badge: "TRYITTECH LLP",
        title: "Excellence in",
        highlight: "Trainings",
        subtitle: "Empowering the next generation of professional talent.",
        items: [
            "IT Training",
            "General Trainings",
            "EHS Training",
            "Kids & Language"
        ],
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop",
        color: "#A855F7" // Purple
    },
    {
        type: "list",
        badge: "TRYITTECH LLP",
        title: "Specialized",
        highlight: "Industries",
        subtitle: "Deep domain expertise across various economic sectors.",
        items: [
            "Information Technology",
            "Finance & Banking",
            "Health & Pharma",
            "Retail & E-commerce"
        ],
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
        color: "#F97316" // Orange
    }
];

const ACCENT_COLORS = [
    "#F97316", // Orange
    "#10B981", // Emerald
    "#EC4899", // Pink
    "#F59E0B", // Amber
    "#6366F1"  // Indigo
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [dynamicSlides, setDynamicSlides] = useState(slides);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesRes, trainingsRes, industriesRes] = await Promise.all([
                    fetch('/api/services').then(res => res.json()),
                    fetch('/api/trainings').then(res => res.json()),
                    fetch('/api/industries').then(res => res.json())
                ]);

                const services = servicesRes as { title: string }[];
                const trainings = trainingsRes as { title: string }[];
                const industries = industriesRes as { name: string, category: string, image?: string }[];

                // 1. Start with the constant primary slide
                const newDynamicSlides: Slide[] = [slides[0]];

                // 2. Add Services Slide if data exists
                if (Array.isArray(services) && services.length > 0) {
                    newDynamicSlides.push({
                        type: "list",
                        badge: "TRYITTECH LLP",
                        title: "Our Core",
                        highlight: "Services",
                        subtitle: "Comprehensive workforce solutions tailored for global scale.",
                        items: services.slice(0, 6).map(s => s.title),
                        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop",
                        color: "#06B6D4" // Cyan
                    });
                }

                // 3. Add Trainings Slide if data exists
                if (Array.isArray(trainings) && trainings.length > 0) {
                    newDynamicSlides.push({
                        type: "list",
                        badge: "TRYITTECH LLP",
                        title: "Excellence in",
                        highlight: "Trainings",
                        subtitle: "Empowering the next generation of professional talent.",
                        items: trainings.slice(0, 6).map(t => t.title),
                        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop",
                        color: "#A855F7" // Purple
                    });
                }

                // 4. Add Industry Slides grouped by Category
                if (Array.isArray(industries) && industries.length > 0) {
                    const categories = Array.from(new Set(industries.map(i => i.category || 'Professional')))
                        .filter(Boolean);

                    categories.forEach((cat, idx) => {
                        const catIndustries = industries.filter(i => i.category === cat);
                        newDynamicSlides.push({
                            type: "list",
                            badge: "TRYITTECH LLP",
                            title: "Specialized",
                            highlight: `${cat} Verticals`,
                            subtitle: `Strategic talent acquisition for the ${cat} sector.`,
                            items: catIndustries.slice(0, 6).map(i => i.name),
                            image: catIndustries[0]?.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
                            color: ACCENT_COLORS[idx % ACCENT_COLORS.length]
                        });
                    });
                }

                setDynamicSlides(newDynamicSlides);
            } catch (error) {
                console.error('Failed to update Hero slides:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % dynamicSlides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [dynamicSlides.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % dynamicSlides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + dynamicSlides.length) % dynamicSlides.length);

    const activeSlide = dynamicSlides[currentSlide];

    return (
        <section className="relative h-screen min-h-[700px] w-full bg-[#020617] overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={activeSlide.image}
                        alt={activeSlide.title}
                        fill
                        priority
                        className="object-cover opacity-40 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/40 to-transparent" />
                </motion.div>
            </AnimatePresence>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex items-center">
                <div className="max-w-4xl pt-20">
                    <motion.div
                        key={`content-${currentSlide}`}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="space-y-8"
                    >
                        {activeSlide.badge && (
                            <div className="flex items-center gap-4">
                                <span className="w-12 h-[2px]" style={{ backgroundColor: activeSlide.color }} />
                                <span className="font-bold uppercase tracking-[0.4em] text-xs" style={{ color: activeSlide.color }}>
                                    {activeSlide.badge}
                                </span>
                            </div>
                        )}

                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter leading-[0.95] font-poppins">
                            {activeSlide.title} <br />
                            <span className="italic font-light" style={{ color: activeSlide.color }}>{activeSlide.highlight}</span>
                        </h1>

                        <div className="space-y-6">
                            <p className="text-base md:text-xl lg:text-2xl text-slate-300 max-w-2xl font-light leading-relaxed border-l-4 pl-5 md:pl-8" style={{ borderColor: activeSlide.color }}>
                                {activeSlide.subtitle}
                            </p>

                            {activeSlide.type === "list" && activeSlide.items && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4"
                                >
                                    {activeSlide.items.map((item: string, idx: number) => (
                                        <div key={idx} className="flex items-center gap-3 group/item">
                                            <div className="w-1.5 h-1.5 rounded-full transition-transform group-hover/item:scale-150" style={{ backgroundColor: activeSlide.color }} />
                                            <span className="text-white font-bold uppercase tracking-widest text-[10px] md:text-xs opacity-70 group-hover/item:opacity-100 transition-opacity">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Slider Controls */}
            <div className="absolute bottom-10 right-10 md:bottom-12 md:right-12 z-20 flex gap-3 md:gap-4">
                <button
                    onClick={prevSlide}
                    className="w-10 h-10 md:w-14 md:h-14 border border-white/20 rounded-full flex items-center justify-center text-white transition-all"
                    onMouseEnter={(e: any) => {
                        e.currentTarget.style.backgroundColor = activeSlide.color;
                        e.currentTarget.style.borderColor = activeSlide.color;
                    }}
                    onMouseLeave={(e: any) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    }}
                >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button
                    onClick={nextSlide}
                    className="w-10 h-10 md:w-14 md:h-14 border border-white/20 rounded-full flex items-center justify-center text-white transition-all"
                    onMouseEnter={(e: any) => {
                        e.currentTarget.style.backgroundColor = activeSlide.color;
                        e.currentTarget.style.borderColor = activeSlide.color;
                    }}
                    onMouseLeave={(e: any) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    }}
                >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
            </div>

            {/* Progress Indicators */}
            <div className="absolute bottom-10 left-6 md:bottom-12 md:left-12 z-20 flex md:flex-col gap-3 md:gap-4">
                {dynamicSlides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`transition-all duration-500 rounded-full ${currentSlide === i ? 'w-8 h-1 md:w-1 md:h-12' : 'w-2 h-1 md:w-1 md:h-4 bg-white/20'}`}
                        style={{ backgroundColor: currentSlide === i ? activeSlide.color : undefined }}
                    />
                ))}
            </div>

            {/* Background Decor */}
            <div className="absolute -bottom-10 -right-10 md:-bottom-20 md:-right-20 opacity-5 select-none pointer-events-none">
                <span className="text-[12rem] md:text-[25rem] font-black text-white leading-none">TT</span>
            </div>

            {/* Mobile Overlay for Contrast */}
            <div className="absolute inset-0 bg-[#020617]/40 md:hidden z-[5]" />
        </section>
    );
}

