'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface Slide {
    type: string;
    title: string;
    highlight: string;
    subtitle: string;
    image: string;
    items?: string[];
}

const slides: Slide[] = [
    {
        type: "primary",
        title: "Staffing for",
        highlight: "What's Next",
        subtitle: "Building the foundation of organizational success through specialized full-time talent acquisition and strategic headhunting.",
        image: "https://innovasolutions.com/wp-content/uploads/2025/03/SOL_TAL_L2_B1_Desktop-2.jpg"
    },
    {
        type: "list",
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
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop"
    },
    {
        type: "list",
        title: "Specialized",
        highlight: "Industries",
        subtitle: "Deep domain expertise across diverse global sectors.",
        items: [
            "Information Technology",
            "Healthcare",
            "BFSI",
            "Automotive",
            "Logistics",
            "Non-IT Professional",
            "Retail & E-commerce",
            "Telecom & Networking",
            "Manufacturing",
            "BPO Services"
        ],
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
    },
    {
        type: "list",
        title: "Excellence in",
        highlight: "Trainings",
        subtitle: "Empowering the next generation of professional talent.",
        items: [
            "IT Training",
            "General Trainings",
            "EHS Training",
            "Kids & Language"
        ],
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop"
    }
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [dynamicSlides, setDynamicSlides] = useState(slides);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesRes, industriesRes, trainingsRes] = await Promise.all([
                    fetch('/api/services').then(res => res.json()),
                    fetch('/api/industries').then(res => res.json()),
                    fetch('/api/trainings').then(res => res.json())
                ]);

                const updatedSlides = slides.map(slide => {
                    if (slide.highlight === "Services" && Array.isArray(servicesRes)) {
                        return { ...slide, items: servicesRes.map((s: { title: string }) => s.title) };
                    }
                    if (slide.highlight === "Industries" && Array.isArray(industriesRes)) {
                        return { ...slide, items: industriesRes.map((i: { name?: string; title?: string }) => i.name || i.title || '') };
                    }
                    if (slide.highlight === "Trainings" && Array.isArray(trainingsRes)) {
                        return { ...slide, items: trainingsRes.map((t: { title: string }) => t.title) };
                    }
                    return slide;
                });

                setDynamicSlides(updatedSlides);
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
                        <div className="flex items-center gap-4">
                            <span className="w-12 h-[2px] bg-[#008CC8]" />
                            <span className="text-[#008CC8] font-bold uppercase tracking-[0.4em] text-xs">Innovation in Motion</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter leading-[0.95] font-poppins">
                            {activeSlide.title} <br />
                            <span className="italic font-light text-[#008CC8]">{activeSlide.highlight}</span>
                        </h1>

                        <div className="space-y-6">
                            <p className="text-base md:text-xl lg:text-2xl text-slate-300 max-w-2xl font-light leading-relaxed border-l-4 border-[#008CC8] pl-5 md:pl-8">
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
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#008CC8] group-hover/item:scale-150 transition-transform" />
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
                    className="w-10 h-10 md:w-14 md:h-14 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#008CC8] hover:border-[#008CC8] transition-all"
                >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button
                    onClick={nextSlide}
                    className="w-10 h-10 md:w-14 md:h-14 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#008CC8] hover:border-[#008CC8] transition-all"
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
                        className={`transition-all duration-500 rounded-full ${currentSlide === i ? 'w-8 h-1 md:w-1 md:h-12 bg-[#008CC8]' : 'w-2 h-1 md:w-1 md:h-4 bg-white/20'}`}
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

