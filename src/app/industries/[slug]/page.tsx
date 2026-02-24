'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Shield,
    Zap,
    Target,
    ChevronRight,
    MessageSquare,
    Globe,
    BarChart3,
    Cpu,
    LucideIcon
} from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Contact from '../../../components/Contact';
import { Industry } from '@/lib/industries';

const ICON_MAP: Record<string, LucideIcon> = {
    Shield, Zap, Target, Globe, BarChart3, Cpu
};

export default function IndustryDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('overview');
    const [industry, setIndustry] = useState<Industry | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/industries')
            .then(res => res.json())
            .then(data => {
                const found = data.find((ind: Industry) => ind.slug === slug);
                setIndustry(found || null);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch industry:', err);
                setLoading(false);
            });
    }, [slug]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 500);

            const sections = ['overview', 'segments', 'edge'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= 300) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400 font-bold uppercase tracking-[0.3em] animate-pulse">
                Synchronizing Vertical Data...
            </div>
        );
    }

    if (!industry) {
        notFound();
    }

    const navLinks = [
        { id: 'overview', label: 'Overview' },
        { id: 'segments', label: 'Segments We Serve' },
        { id: 'edge', label: 'The Innova Edge' }
    ];

    return (
        <main className="bg-white min-h-screen font-inter">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative h-[85vh] w-full flex items-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={industry.image || 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80'}
                        alt={industry.name}
                        fill
                        className="object-cover scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-[#020617]/40" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-transparent opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-4xl"
                    >
                        <div className="flex items-center gap-3 text-[#008C78] mb-6">
                            <span className="w-12 h-[2px] bg-[#008C78]" />
                            <span className="text-sm font-bold uppercase tracking-[0.3em]">Vertical Excellence</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8">
                            {industry.name.split(' ').map((word, i) => (
                                <span key={i} className="block">{word}</span>
                            ))}
                        </h1>

                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium max-w-2xl mb-10 border-l-4 border-[#008C78] pl-8">
                            Empowering {industry.name} leaders with specialized talent and digital transformation strategies.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button className="px-8 py-4 bg-[#008C78] text-white font-bold rounded-full hover:bg-white hover:text-[#020617] transition-all flex items-center gap-2 group shadow-xl shadow-[#008C78]/20">
                                Explore Solutions
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <span className="text-white/40 text-[10px] uppercase tracking-widest font-black">Scroll Down</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-[#008C78] to-transparent" />
                </div>
            </section>

            {/* STICKY SUB-NAV */}
            <nav className={`sticky top-[72px] z-40 w-full transition-all duration-300 border-b ${isScrolled ? 'bg-white shadow-xl translate-y-0' : 'bg-transparent -translate-y-full border-transparent lg:hidden'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex gap-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    className={`relative text-xs font-black uppercase tracking-widest transition-colors ${activeSection === link.id ? 'text-[#008C78]' : 'text-slate-400 hover:text-[#020617]'}`}
                                >
                                    {link.label}
                                    {activeSection === link.id && (
                                        <motion.div layoutId="activeTab" className="absolute -bottom-[22px] left-0 right-0 h-1 bg-[#008C78]" />
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* OVERVIEW SECTION */}
            <section id="overview" className="py-32 relative overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-bold text-[#020617] tracking-tight leading-tight">
                                Navigating the future of <span className="text-[#008C78]">{industry.name}</span>
                            </h2>
                            <p className="text-xl text-slate-600 leading-relaxed font-light">
                                {industry.overview}
                            </p>

                            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                                <div>
                                    <div className="text-4xl font-black text-[#020617] mb-2">150+</div>
                                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none">Global Clients</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-black text-[#008C78] mb-2">98%</div>
                                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none">Retention Rate</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                { title: "Strategy First", icon: Target, desc: "Business-aligned talent strategy for Every project." },
                                { title: "Digital Core", icon: Zap, desc: "Modernizing core systems with cloud-native experts." },
                                { title: "Secure Scale", icon: Shield, desc: "Enterprise-grade security vetting for all placements." },
                                { title: "Global Reach", icon: Globe, desc: "24/7 delivery across 12+ international hubs." }
                            ].map((item, i) => (
                                <div key={i} className="p-8 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all group">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#008C78] transition-colors">
                                        <item.icon className="w-6 h-6 text-[#008C78] group-hover:text-white transition-colors" />
                                    </div>
                                    <h4 className="font-bold text-[#020617] mb-2">{item.title}</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* SEGMENTS GRID SECTION */}
            <section id="segments" className="py-32 bg-slate-50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-[#008C78] font-black uppercase tracking-[0.3em] text-xs mb-4">Vertical Footprint</h2>
                            <h3 className="text-5xl font-bold text-[#020617] tracking-tighter">Segments we <span className="text-[#008C78]">Specialize In</span></h3>
                        </div>
                        <p className="text-slate-500 max-w-sm text-right font-medium italic">
                            Deep domain expertise across the entire value chain of the {industry.name} sector.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {industry.segments.map((segment, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="group relative bg-white p-10 rounded-[40px] shadow-sm hover:shadow-2xl transition-all h-[320px] overflow-hidden flex flex-col justify-between"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#008C78]/5 rounded-bl-[100px] -z-0 group-hover:bg-[#008C78]/10 transition-colors" />
                                <div>
                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 border border-slate-100 group-hover:bg-[#008C78] transition-colors">
                                        <span className="text-xl font-black text-[#008C78] group-hover:text-white">0{idx + 1}</span>
                                    </div>
                                    <h4 className="text-2xl font-bold text-[#020617] mb-4 group-hover:text-[#008C78] transition-colors">{segment.title}</h4>
                                    <p className="text-slate-500 leading-relaxed">{segment.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* THE INNOVA EDGE */}
            <section id="edge" className="py-32 bg-[#020617] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                        <h3 className="text-[#008C78] font-black uppercase tracking-[0.4em] text-xs">Proprietary Value</h3>
                        <h2 className="text-5xl md:text-6xl font-black tracking-tight text-white">The Innova Edge</h2>
                        <div className="w-24 h-2 bg-[#008C78] mx-auto rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {industry.edge.map((item, idx) => {
                            const Icon = ICON_MAP[item.icon as string] || Target;
                            return (
                                <div key={idx} className="text-center space-y-6 group">
                                    <div className="mx-auto w-24 h-24 rounded-full border-2 border-white/10 flex items-center justify-center group-hover:border-[#008C78] group-hover:scale-110 transition-all duration-500">
                                        <Icon className="w-10 h-10 text-white group-hover:text-[#008C78] transition-colors" />
                                    </div>
                                    <h4 className="text-xl font-bold uppercase tracking-widest">{item.title}</h4>
                                    <p className="text-slate-400 leading-relaxed font-medium px-4">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-10">
                    <div className="mx-auto w-20 h-20 bg-[#008C78] rounded-3xl flex items-center justify-center mb-8 rotate-12 shadow-2xl">
                        <MessageSquare className="w-10 h-10 text-white -rotate-12" />
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-[#020617] tracking-tighter">Ready to innovate with us?</h2>
                    <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
                        Speak with our {industry.name} practice leads today and discover how we can accelerate your digital transformation journey.
                    </p>
                    <div className="flex justify-center gap-6 pt-4">
                        <button className="px-12 py-5 bg-[#008C78] text-white font-black rounded-full hover:bg-[#020617] transition-all shadow-xl shadow-[#008C78]/20 text-lg">
                            Let&apos;s Talk!
                        </button>
                    </div>
                </div>
            </section>

            <Contact />
            <Footer />
        </main>
    );
}
