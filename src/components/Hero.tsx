'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const slides = [
    {
        title: "Staffing for",
        highlight: "What's Next",
        subtitle: "Building the foundation of organizational success through specialized full-time talent acquisition and strategic headhunting.",
        image: "https://innovasolutions.com/wp-content/uploads/2025/03/SOL_TAL_L2_B1_Desktop-2.jpg",
        cta: "Hire Talent"
    },
    {
        title: "Contract",
        highlight: "Staffing",
        subtitle: "Agile and compliant temporary staffing solutions that empower your business to scale rapidly with project demands.",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop",
        cta: "Scale Now"
    },
    {
        title: "Staff",
        highlight: "Augmentation",
        subtitle: "Plug-and-play specialized expertise directly into your internal teams for immediate technical impact.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
        cta: "Add Expertise"
    },
    {
        title: "Offshore",
        highlight: "IT Hub",
        subtitle: "Empowering global enterprises with high-performance GCCs and managed offshore delivery teams in India.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
        cta: "Launch Hub"
    },
    {
        title: "RPO",
        highlight: "Frameworks",
        subtitle: "Transforming your recruitment lifecycle with scalable, data-driven frameworks for large-scale hiring surges.",
        image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=2047&auto=format&fit=crop",
        cta: "Scale Hiring"
    },
    {
        title: "Payroll",
        highlight: "Services",
        subtitle: "Zero-error, 100% compliant payroll engine managing PF, ESI, and statutory needs for Indian enterprises.",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop",
        cta: "Setup Payroll"
    }
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

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
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].title}
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
                            <span className="w-12 h-[2px] bg-[#008C78]" />
                            <span className="text-[#008C78] font-bold uppercase tracking-[0.4em] text-xs">Innovation in Motion</span>
                        </div>

                        <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.9] font-poppins">
                            {slides[currentSlide].title} <br />
                            <span className="italic font-light text-[#008C78]">{slides[currentSlide].highlight}</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-300 max-w-2xl font-light leading-relaxed border-l-4 border-[#008C78] pl-8">
                            {slides[currentSlide].subtitle}
                        </p>

                        <div className="flex flex-wrap gap-6 pt-4">
                            <button className="px-10 py-5 bg-[#008C78] text-white font-black text-xs uppercase tracking-widest rounded-sm hover:bg-white hover:text-[#020617] transition-all flex items-center gap-3 group shadow-2xl">
                                {slides[currentSlide].cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Slider Controls */}
            <div className="absolute bottom-12 right-12 z-20 flex gap-4">
                <button
                    onClick={prevSlide}
                    className="w-14 h-14 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#008C78] hover:border-[#008C78] transition-all"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={nextSlide}
                    className="w-14 h-14 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#008C78] hover:border-[#008C78] transition-all"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Progress Indicators */}
            <div className="absolute bottom-12 left-12 z-20 flex flex-col gap-4">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`w-1 transition-all duration-500 rounded-full ${currentSlide === i ? 'h-12 bg-[#008C78]' : 'h-4 bg-white/20'}`}
                    />
                ))}
            </div>

            {/* Background Decor */}
            <div className="absolute -bottom-20 -right-20 opacity-5 select-none pointer-events-none">
                <span className="text-[25rem] font-black text-white leading-none">TT</span>
            </div>
        </section>
    );
}
