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
    Zap,
    Target,
    Globe,
    Calendar,
    CheckCircle2,
    FileText,
    Download,
    Users,
    Send,
    Phone,
    Mail,
    User,
    ChevronRight,
    Star
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const iconMap: { [key: string]: React.ElementType } = {
    Laptop,
    BookOpen,
    ShieldCheck,
    Gamepad2
};

interface PlacedLearner {
    name: string;
    photo: string;
}

interface Training {
    id: string;
    title: string;
    slug: string;
    description: string;
    longDescription: string;
    image: string;
    icon: string;
    modules: string[];
    startDate?: string;
    keyHighlights?: string[];
    curriculumPdf?: string;
    placedCount?: number;
    placedLearners?: PlacedLearner[];
}

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919000000000';

export default function TrainingDetailClient() {
    const params = useParams();
    const slug = params?.slug as string;
    const [training, setTraining] = useState<Training | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Enquiry form state
    const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
    const [formError, setFormError] = useState('');

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

    const handleEnquiry = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.phone) {
            setFormError('Name and phone are required.');
            return;
        }
        setFormError('');
        const text = encodeURIComponent(
            `Hi, I'm interested in the *${training?.title}* training.\n\nName: ${form.name}\nPhone: ${form.phone}${form.email ? `\nEmail: ${form.email}` : ''}${form.message ? `\nMessage: ${form.message}` : ''}`
        );
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest animate-pulse">
                Loading Training...
            </div>
        );
    }

    if (!training) notFound();

    const IconComponent = iconMap[training.icon] || Laptop;
    const formattedDate = training.startDate
        ? new Date(training.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
        : null;

    return (
        <main className="bg-white min-h-screen font-inter">
            <Navbar />

            {/* ── HERO ── */}
            <section className="relative h-[75vh] w-full flex items-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={training.image || 'https://img.freepik.com/free-photo/business-startup-strategy-goals-concept_53876-120909.jpg'}
                        alt={training.title}
                        fill className="object-cover scale-105" priority quality={100}
                    />
                    <div className="absolute inset-0 bg-[#020617]/55" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/60 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }} className="max-w-4xl"
                    >
                        <div className="flex items-center gap-3 text-[#008CC8] mb-6">
                            <IconComponent className="w-8 h-8" />
                            <span className="text-sm font-bold uppercase tracking-[0.3em]">Specialized Training Program</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-6">
                            {training.title}
                        </h1>

                        <p className="text-xl text-white/90 leading-relaxed font-medium max-w-2xl mb-8 border-l-4 border-[#008CC8] pl-8">
                            {training.description}
                        </p>

                        {/* Quick meta badges */}
                        <div className="flex flex-wrap gap-4">
                            {formattedDate && (
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5">
                                    <Calendar className="w-4 h-4 text-[#008CC8]" />
                                    <span className="text-white font-bold text-sm">Starts: {formattedDate}</span>
                                </div>
                            )}
                            {training.curriculumPdf && (
                                <a
                                    href={training.curriculumPdf}
                                    download="curriculum.pdf"
                                    className="flex items-center gap-2 bg-[#008CC8] rounded-full px-5 py-2.5 text-white font-bold text-sm hover:bg-white hover:text-[#020617] transition-all"
                                >
                                    <Download className="w-4 h-4" />
                                    Download Curriculum
                                </a>
                            )}
                            <a
                                href="#enquire"
                                className="flex items-center gap-2 bg-white text-[#020617] rounded-full px-5 py-2.5 font-bold text-sm hover:bg-[#008CC8] hover:text-white transition-all"
                            >
                                <Send className="w-4 h-4" />
                                Enquire Now
                                <ChevronRight className="w-4 h-4" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── OVERVIEW + MODULES ── */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-20">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#020617] tracking-tight">
                                Program <span className="text-[#008CC8]">Overview</span>
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                {training.longDescription}
                            </p>

                            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-100">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-[#008CC8]">
                                        <Target className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#020617]">Expert Led</h4>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Training</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-[#008CC8]">
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
                                <Zap className="w-6 h-6 text-[#008CC8]" />
                                courses
                            </h3>

                            <div className="space-y-4">
                                {training.modules.length > 0 ? training.modules.map((module, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 group hover:border-[#008CC8] transition-colors">
                                        <div className="w-8 h-8 bg-[#008CC8]/10 rounded-full flex items-center justify-center text-[#008CC8] font-bold text-xs group-hover:bg-[#008CC8] group-hover:text-white transition-all">
                                            {idx + 1}
                                        </div>
                                        <span className="font-bold text-slate-700">{module}</span>
                                    </div>
                                )) : (
                                    <p className="text-slate-400 text-sm italic">Curriculum will be updated soon.</p>
                                )}
                            </div>

                            {training.curriculumPdf && (
                                <a
                                    href={training.curriculumPdf}
                                    download="curriculum.pdf"
                                    className="mt-8 flex items-center justify-center gap-3 w-full py-4 bg-[#008CC8] text-white font-black rounded-2xl hover:bg-[#020617] transition-all"
                                >
                                    <Download className="w-5 h-5" />
                                    Download Full Curriculum PDF
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── KEY HIGHLIGHTS ── */}
            {training.keyHighlights && training.keyHighlights.length > 0 && (
                <section className="py-20 bg-[#020617]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#008CC8] font-black uppercase tracking-[0.4em] text-xs block mb-2">Why Choose This Program</span>
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Key <span className="text-[#008CC8]">Highlights</span></h2>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {training.keyHighlights.map((highlight, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.08 }}
                                    className="flex items-start gap-4 p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-[#008CC8]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#008CC8] transition-all">
                                        <CheckCircle2 className="w-5 h-5 text-[#008CC8] group-hover:text-white transition-colors" />
                                    </div>
                                    <p className="text-white/90 font-semibold leading-relaxed">{highlight}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── PLACED LEARNERS ── */}
            {training.placedLearners && training.placedLearners.length > 0 && (
                <section className="py-24 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#008CC8] font-black uppercase tracking-[0.4em] text-xs block mb-2">Success Stories</span>
                            <h2 className="text-4xl md:text-5xl font-black text-[#020617] tracking-tighter">
                                Our <span className="text-[#008CC8]">Placed Learners</span>
                            </h2>
                            <p className="text-slate-500 mt-4 font-medium max-w-xl mx-auto">
                                Real graduates, real outcomes. These professionals transformed their careers through this program.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                            {training.placedLearners.map((learner, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.06 }}
                                    className="flex flex-col items-center gap-3 text-center group"
                                >
                                    <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-white shadow-xl group-hover:ring-[#008CC8] transition-all">
                                        {learner.photo ? (
                                            <Image src={learner.photo} alt={learner.name} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-[#008CC8] to-[#020617] flex items-center justify-center">
                                                <User className="w-8 h-8 text-white" />
                                            </div>
                                        )}
                                        {/* Placed badge */}
                                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                                            <CheckCircle2 className="w-3 h-3 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-black text-[#020617] text-sm leading-tight">{learner.name}</p>
                                        <div className="flex items-center justify-center gap-0.5 mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <div className="inline-flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-8 py-4">
                                <Users className="w-6 h-6 text-green-600" />
                                <span className="font-black text-green-700 text-lg">
                                    {(training.placedCount && training.placedCount > 0) ? training.placedCount : (training.placedLearners?.length || 0)}+ Learners Placed
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ── ENQUIRY FORM ── */}
            <section id="enquire" className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left info */}
                        <div className="space-y-8">
                            <div>
                                <span className="text-[#008CC8] font-black uppercase tracking-[0.4em] text-xs block mb-3">Get In Touch</span>
                                <h2 className="text-4xl md:text-5xl font-black text-[#020617] tracking-tighter leading-tight">
                                    Ready to <span className="text-[#008CC8]">Start?</span>
                                </h2>
                                <p className="text-slate-500 mt-4 font-medium leading-relaxed">
                                    Fill in your details and our training advisor will connect with you immediately on WhatsApp to help you register.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {formattedDate && (
                                    <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                        <Calendar className="w-6 h-6 text-[#008CC8] flex-shrink-0" />
                                        <div>
                                            <p className="font-black text-[#020617] text-sm">Next Batch Starts</p>
                                            <p className="text-[#008CC8] font-bold">{formattedDate}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                    <FileText className="w-6 h-6 text-[#008CC8] flex-shrink-0" />
                                    <div>
                                        <p className="font-black text-[#020617] text-sm">Program</p>
                                        <p className="text-slate-600 font-medium">{training.title}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enquiry form */}
                        <div className="bg-[#020617] p-10 rounded-[40px] shadow-2xl">
                            <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                                    <Send className="w-5 h-5 text-white" />
                                </div>
                                Enquire via WhatsApp
                            </h3>

                            <form onSubmit={handleEnquiry} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-white/50">Your Name *</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                        <input
                                            type="text"
                                            required
                                            value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                            placeholder="e.g. Rahul Sharma"
                                            className="w-full bg-white/10 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white font-bold placeholder:text-white/30 outline-none focus:border-[#008CC8] transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-white/50">Phone Number *</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                        <input
                                            type="tel"
                                            required
                                            value={form.phone}
                                            onChange={e => setForm({ ...form, phone: e.target.value })}
                                            placeholder="+91 98765 43210"
                                            className="w-full bg-white/10 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white font-bold placeholder:text-white/30 outline-none focus:border-[#008CC8] transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-white/50">Email (Optional)</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={e => setForm({ ...form, email: e.target.value })}
                                            placeholder="you@email.com"
                                            className="w-full bg-white/10 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white font-bold placeholder:text-white/30 outline-none focus:border-[#008CC8] transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-white/50">Message (Optional)</label>
                                    <textarea
                                        rows={3}
                                        value={form.message}
                                        onChange={e => setForm({ ...form, message: e.target.value })}
                                        placeholder="Any specific questions or requirements..."
                                        className="w-full bg-white/10 border border-white/10 rounded-2xl px-4 py-4 text-white font-bold placeholder:text-white/30 outline-none focus:border-[#008CC8] transition-all resize-none"
                                    />
                                </div>

                                {formError && (
                                    <p className="text-red-400 text-sm font-bold">{formError}</p>
                                )}

                                <button
                                    type="submit"
                                    className="w-full py-5 bg-green-500 hover:bg-green-400 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-3 text-lg shadow-xl shadow-green-500/20"
                                >
                                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.017.5 3.922 1.38 5.6L0 24l6.545-1.717A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-5.006-1.37l-.36-.214-3.727.977.996-3.635-.234-.374A9.77 9.77 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
                                    </svg>
                                    Send Enquiry on WhatsApp
                                </button>

                                <p className="text-center text-white/30 text-xs font-medium">
                                    You&apos;ll be redirected to WhatsApp with your details pre-filled.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
