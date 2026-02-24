'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    ShieldCheck,
    Laptop,
    BookOpen,
    Gamepad2,
    MessageSquare,
    Zap,
    Target,
    Globe
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

const iconMap: { [key: string]: React.ElementType } = {
    Laptop,
    BookOpen,
    ShieldCheck,
    Gamepad2
};

interface Training {
    id: string;
    title: string;
    slug: string;
    description: string;
    longDescription: string;
    image: string;
    icon: string;
    modules: string[];
}

export default function TrainingDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const [training, setTraining] = useState<Training | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/trainings')
            .then(res => res.json())
            .then(data => {
                const arr = Array.isArray(data) ? data : [];
                const found = arr.find((t: Training) => t.slug === slug);
                setTraining(found || null);
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Error fetching training:', err);
                setIsLoading(false);
            });
    }, [slug]);

    if (isLoading) {
        return <div className="min-h-screen bg-white flex items-center justify-center text-slate-400">Loading training details...</div>;
    }

    if (!training) {
        notFound();
    }

    const IconComponent = iconMap[training.icon] || Laptop;

    return (
        <main className="bg-white min-h-screen font-inter">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative h-[70vh] w-full flex items-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={training.image || 'https://img.freepik.com/free-photo/business-startup-strategy-goals-concept_53876-120909.jpg'}
                        alt={training.title}
                        fill
                        className="object-cover scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-[#020617]/50" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-transparent opacity-80" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <div className="flex items-center gap-3 text-[#008C78] mb-6">
                            <IconComponent className="w-8 h-8" />
                            <span className="text-sm font-bold uppercase tracking-[0.3em]">Specialized Training</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-8">
                            {training.title}
                        </h1>

                        <p className="text-xl text-white/90 leading-relaxed font-medium max-w-2xl mb-10 border-l-4 border-[#008C78] pl-8">
                            {training.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* CONTENT SECTION */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-20">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#020617] tracking-tight">
                                Program <span className="text-[#008C78]">Overview</span>
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                {training.longDescription}
                            </p>

                            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-[#008C78]">
                                        <Target className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#020617]">Expert Led</h4>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Training</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-[#008C78]">
                                        <Globe className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#020617]">Global Standards</h4>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Certification</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100">
                            <h3 className="text-2xl font-bold text-[#020617] mb-8 flex items-center gap-3">
                                <Zap className="w-6 h-6 text-[#008C78]" />
                                Curriculum Modules
                            </h3>
                            <div className="space-y-4">
                                {training.modules.map((module, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 group hover:border-[#008C78] transition-colors">
                                        <div className="w-8 h-8 bg-[#008C78]/10 rounded-full flex items-center justify-center text-[#008C78] font-bold text-xs group-hover:bg-[#008C78] group-hover:text-white transition-all">
                                            {idx + 1}
                                        </div>
                                        <span className="font-bold text-slate-700">{module}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-10">
                    <div className="mx-auto w-20 h-20 bg-[#008C78] rounded-3xl flex items-center justify-center mb-8 rotate-12 shadow-2xl">
                        <MessageSquare className="w-10 h-10 text-white -rotate-12" />
                    </div>
                    <h2 className="text-5xl font-black text-[#020617] tracking-tighter">Ready to enroll?</h2>
                    <p className="text-xl text-slate-500 font-medium">
                        Start your journey with us today and gain the skills that matter.
                    </p>
                    <button className="px-12 py-5 bg-[#008C78] text-white font-black rounded-full hover:bg-[#020617] transition-all shadow-xl shadow-[#008C78]/20 text-lg">
                        Inquire Now
                    </button>
                </div>
            </section>

            <Contact />
            <Footer />
        </main>
    );
}
