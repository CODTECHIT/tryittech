'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, BookOpen, Clock, Users, GraduationCap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { trainingCategories } from '@/data/trainingData';

export default function TrainingDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    const category = trainingCategories.find(c => c.slug === slug);

    if (!category) {
        notFound();
    }

    return (
        <main className="bg-white min-h-screen">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative h-[70vh] w-full flex items-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/20 via-[#020617]/60 to-[#020617]" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <Link
                            href="/training"
                            className="inline-flex items-center gap-2 text-[#008C78] font-bold text-sm uppercase tracking-widest mb-8 hover:transform hover:translate-x-[-10px] transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Return to Training Catalog
                        </Link>

                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-widest">
                                <GraduationCap className="w-4 h-4 text-[#008C78]" />
                                Professional Certification
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] uppercase">
                                {category.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-200 font-medium leading-relaxed max-w-2xl">
                                {category.description}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* QUICK STATS */}
            <div className="relative z-20 mt-[-60px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: Clock, label: 'Duration', val: 'Flexible / Project-Based' },
                        { icon: Users, label: 'Eligibility', val: 'Students & Professionals' },
                        { icon: BookOpen, label: 'Learning Path', val: 'Expert-Led Virtual/On-Site' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-6">
                            <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-[#008C78]">
                                <stat.icon className="w-7 h-7" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">{stat.label}</p>
                                <p className="text-lg font-bold text-[#020617]">{stat.val}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* OVERVIEW & MODULES */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-5 gap-20">
                        {/* Left: Deep Info */}
                        <div className="lg:col-span-3 space-y-16">
                            <div className="space-y-8">
                                <h2 className="text-4xl font-black text-[#020617] tracking-tight">Program <span className="text-[#008C78]">Framework</span></h2>
                                <p className="text-xl text-slate-600 leading-relaxed font-medium">
                                    {category.longDescription}
                                </p>
                            </div>

                            <div className="space-y-8">
                                <h3 className="text-2xl font-bold text-[#020617] flex items-center gap-4">
                                    <div className="w-8 h-1 bg-[#008C78]" />
                                    Curriculum Blueprint
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {category.modules.map((module, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ scale: 1.02 }}
                                            className="flex items-center p-5 rounded-xl bg-slate-50 border border-slate-100 group hover:border-[#008C78] transition-all"
                                        >
                                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-4 shadow-sm border border-slate-100 group-hover:bg-[#008C78] transition-colors">
                                                <CheckCircle2 className="w-5 h-5 text-[#008C78] group-hover:text-white" />
                                            </div>
                                            <span className="font-bold text-slate-800 group-hover:text-[#020617] transition-colors">{module}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="sticky top-32 p-10 bg-[#020617] rounded-3xl text-white shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#008C78]/20 rounded-full blur-3xl transform translate-x-10 translate-y-[-10px]" />
                                <p className="text-slate-400 mb-10 leading-relaxed font-medium">
                                    Our admissions consultants are ready to assist you with customized training paths for your team or organization.
                                </p>
                                <ul className="space-y-4">
                                    {['Customized Syllabus', 'Industry Certification', 'Post-Training Support'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-200">
                                            <div className="w-5 h-5 bg-[#008C78] rounded-full flex items-center justify-center">
                                                <CheckCircle2 className="w-3 h-3 text-white" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Contact />
            <Footer />
        </main>
    );
}
