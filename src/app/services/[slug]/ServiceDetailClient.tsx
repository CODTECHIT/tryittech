'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';
import { CheckCircle2, ArrowLeft, Quote } from 'lucide-react';
import Link from 'next/link';
import servicesData from '@/data/services.json';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import SolarSystemProcess from '@/components/SolarSystemProcess';

interface Service {
    id: string;
    slug: string;
    title: string;
    icon: string;
    image: string;
    secondaryImage: string;
    shortDescription: string;
    fullDescription: string;
    benefits: string[];
    process: string[];
    startDate?: string;
    curriculumPdf?: string;
    executivePerspective?: string;
}

const BACK_COLORS = [
    '#6A1B9A', // Purple
    '#F39C12', // Orange
    '#1E88E5', // Blue
    '#7CB342', // Green
    '#26A69A', // Teal
];

export default function ServiceDetailClient() {
    const params = useParams();
    const slug = params?.slug as string;
    const [service, setService] = useState<Service | null>(null);
    const [serviceIndex, setServiceIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        fetch('/api/services')
            .then(res => res.json())
            .then(data => {
                const arr = Array.isArray(data) ? data : [];
                const idx = arr.findIndex((s: Service) => s.slug === slug);
                if (idx !== -1) {
                    setService(arr[idx]);
                    setServiceIndex(idx);
                } else {
                    setService(null);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching service:', err);
                setLoading(false);
            });
    }, [slug]);

    const activeColor = BACK_COLORS[serviceIndex % BACK_COLORS.length];

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest animate-pulse">
                Synchronizing Service Core...
            </div>
        );
    }

    if (!service) {
        notFound();
    }

    const defaultImage = 'https://img.freepik.com/free-photo/businesspeople-working-finance-accounting-office_23-2148908915.jpg?w=740';

    return (
        <main className="bg-white">
            <Navbar />
            {/* Premium Integrated Service Hero */}
            <section className="relative h-[60vh] sm:h-[70vh] w-full">
                <div className="absolute inset-0">
                    <Image
                        src={service.image || defaultImage}
                        alt={service.title}
                        fill
                        className="object-cover"
                        priority
                        quality={100}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col items-center justify-center text-center">
                    <div className="space-y-4 sm:space-y-6 max-w-4xl">
                        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4">
                            <span className="w-8 sm:w-12 h-[2px]" style={{ backgroundColor: activeColor }} />
                            <span className="font-black uppercase tracking-[0.4em] text-[8px] sm:text-[10px]" style={{ color: activeColor }}>Service Excellence & Strategy</span>
                            <span className="w-8 sm:w-12 h-[2px]" style={{ backgroundColor: activeColor }} />
                        </div>

                        <h1
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-tight"
                            style={{ color: activeColor }}
                        >
                            {service.title}
                        </h1>

                        <div className="relative max-w-2xl md:max-w-3xl mx-auto mt-4 sm:mt-8">
                            <div className="relative p-4 sm:p-6 md:p-8 bg-transparent rounded-xl md:rounded-2xl border-l-4 group shadow-sm" style={{ borderLeftColor: activeColor }}>
                                <Quote
                                    className="absolute top-3 left-3 sm:top-4 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 opacity-20 group-hover:opacity-40 transition-all duration-300"
                                    style={{ color: activeColor }}
                                />
                                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#020617] italic text-center relative z-10 leading-relaxed px-2 sm:px-0">
                                    &ldquo;  {service.shortDescription || "Industry-leading workforce solutions designed for the future of global enterprise."}  &rdquo;
                                </p>
                            </div>
                        </div>


                        <div
                            className="w-16 sm:w-20 md:w-24 h-1 sm:h-1.5 mx-auto mt-6 sm:mt-8 md:mt-12 rounded-full shadow-lg"
                            style={{ backgroundColor: activeColor }}
                        />
                    </div>
                </div>
            </section>

            <section className="py-24 relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -z-10 skew-x-12 translate-x-1/2" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex mb-16">
                        <Link href="/services" className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all" style={{ color: activeColor }}>
                            <ArrowLeft className="w-5 h-5" /> Back to All Services
                        </Link>
                    </div>

                    <div className="space-y-32">
                        {/* Row 1: Strategic Content & Visual Narrative */}
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <span className="h-0.5 w-12" style={{ backgroundColor: activeColor }} />
                                    <span className="font-black uppercase tracking-[0.3em] text-[10px]" style={{ color: activeColor }}>Methodology & Approach</span>
                                </div>
                                <h2 className="text-5xl font-black text-black tracking-tighter leading-tight">
                                    Strategic <span style={{ color: activeColor }}>Overview</span>
                                </h2>
                                <div className="text-xl text-gray-800 leading-relaxed space-y-6 max-w-xl font-medium">
                                    {service.fullDescription.split('\n\n').map((paragraph, i) => (
                                        <p key={i}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>
                            <div className="relative h-[550px] w-full rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,140,200,0.15)] group border border-slate-100">
                                <Image
                                    src={service.secondaryImage || defaultImage}
                                    alt={`${service.title} strategy`}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#020617]/40 via-transparent to-[#008CC8]/10" />
                                <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                                    <p className="text-white text-sm font-semibold tracking-wide">
                                        Empowering global enterprises with scalable workforce DNA.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Row 2: Insights, Impact & Value */}
                        <div className="grid lg:grid-cols-2 gap-16">
                            {/* Expert Insight Card */}
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-gradient-to-r from-[#008CC8]/20 to-indigo-500/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-duration-700" />
                                <div className="relative h-full p-12 bg-[#020617] rounded-[2.5rem] text-white overflow-hidden shadow-2xl flex flex-col justify-center">
                                    <div className="absolute top-0 right-0 w-64 h-64 blur-[120px] opacity-20" style={{ backgroundColor: activeColor }} />
                                    <h4 className="font-black uppercase tracking-[0.4em] text-xs mb-8" style={{ color: activeColor }}>Executive Perspective</h4>
                                    <p className="text-2xl font-medium leading-relaxed italic opacity-95 relative z-10">
                                        &quot;{service.executivePerspective ||
                                            (servicesData as Service[]).find(s => s.slug === service.slug)?.executivePerspective ||
                                            ((service.title?.toLowerCase().includes('onshore') || service.title?.toLowerCase().includes('on shore')) ? "Our Onshore Recruitment services align closely with your internal operations, enabling faster hiring, access to local talent, and efficient workforce management that transforms recruitment challenges into opportunities for business growth." : `Our ${service.title} engine is built to synchronize seamlessly with your internal operations, turning recruitment from a bottleneck into a competitive advantage.`)}&quot;
                                    </p>
                                    <div className="mt-12 flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center border" style={{ backgroundColor: `${activeColor}33`, borderColor: `${activeColor}66` }}>
                                            <span className="font-bold" style={{ color: activeColor }}>TT</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">TRYITTECH Strategy Team</p>
                                            <p className="text-xs opacity-50 uppercase tracking-widest">Global Workforce Div.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Impact List */}
                            <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] space-y-10">
                                <div className="inline-block px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100 mb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: activeColor }}>Value Creation</span>
                                </div>
                                <h3 className="text-3xl font-black text-black">Key Strategic <span style={{ color: activeColor }}>Impacts</span></h3>
                                <div className="grid gap-6">
                                    {service.benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex gap-6 group items-start">
                                            <div
                                                className="w-12 h-12 bg-slate-50 flex items-center justify-center shrink-0 transition-all duration-500 rounded-2xl border border-slate-100 shadow-sm"
                                            >
                                                <CheckCircle2 className="w-6 h-6 transition-colors shadow-none" style={{ color: activeColor }} />
                                            </div>
                                            <div className="space-y-1 pt-1.5">
                                                <p className="text-slate-800 font-bold leading-tight group-hover:text-[#008CC8] transition-colors">{benefit}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Summary Stats Bar */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { label: 'Efficiency Gain', val: '40%' },
                                { label: 'Retention Rate', val: '95%+' },
                                { label: 'Global Talent', val: '1M+' },
                                { label: 'Support SLA', val: '24/7' }
                            ].map((stat, i) => (
                                <div key={i} className="p-8 bg-slate-50/50 backdrop-blur-sm rounded-3xl border border-white shadow-sm hover:shadow-md transition-all text-center group">
                                    <span className="block text-4xl font-black text-[#020617] mb-2 group-hover:text-[#008CC8] transition-colors">{stat.val}</span>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Delivery Framework Section */}
                    <div className="mt-32 pt-24 border-t border-slate-100">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-16">
                                <h4 className="font-black uppercase tracking-[0.4em] text-xs mb-4" style={{ color: activeColor }}>Our Methodology</h4>
                                <h2 className="text-4xl md:text-5xl font-black text-black mb-6">Delivery <span style={{ color: activeColor }}>Framework</span></h2>
                                <div className="w-24 h-1.5 mx-auto rounded-full" style={{ backgroundColor: activeColor }} />
                            </div>

                            <SolarSystemProcess title={service.title} steps={service.process} />
                        </div>
                    </div>
                </div>
            </section>

            <Contact />
            <Footer />
        </main>
    );
}
