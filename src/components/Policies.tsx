'use client';

import { Scale, ShieldAlert, Gavel, Lock, ShieldCheck, ChevronRight, Monitor } from 'lucide-react';
import Link from 'next/link';

const policies = [
    {
        title: 'Human Rights Policy',
        icon: Scale,
        summary: 'Upholding dignity, equality, and fundamental freedoms for everyone.',
        slug: 'human-rights'
    },
    {
        title: 'Anti-Bribery & Corruption',
        icon: ShieldAlert,
        summary: 'Zero-tolerance policy towards bribery, fraud, and unethical business practices.',
        slug: 'anti-bribery-corruption'
    },
    {
        title: 'Code of Ethics',
        icon: Gavel,
        summary: 'Our commitment to integrity, transparency, and ethical business conduct.',
        slug: 'code-of-ethics'
    },
    {
        title: 'Privacy & Data Protection',
        icon: Lock,
        summary: 'Ensuring your information remains secure, private, and confidential.',
        slug: 'privacy-policy'
    },
    {
        title: 'Information Security Policy',
        icon: Monitor,
        summary: 'Comprehensive guidelines for protecting customer information and digital assets.',
        slug: 'it-policy'
    },
    {
        title: 'Vulnerability Disclosure',
        icon: ShieldCheck,
        summary: 'Collaborative framework for identifying and resolving security issues.',
        slug: 'vulnerability-disclosure'
    }
];

export default function Policies() {
    return (
        <section id="policies" className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#008C78]/5 rounded-full -mr-48 -mt-48 blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-[#008C78] font-black uppercase tracking-[0.3em] text-xs mb-4 flex items-center gap-3">
                            <span className="w-10 h-[2px] bg-[#008C78]" /> Governance
                        </h2>
                        <h3 className="text-4xl font-bold text-[#020617] leading-tight">
                            Our Corporate <span className="text-[#008C78]">Policies</span>
                        </h3>
                    </div>
                    <p className="text-slate-500 max-w-sm mb-2 italic">
                        Ensuring transparency, safety, and ethical standards across all global operations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {policies.map((policy, index) => (
                        <Link
                            key={index}
                            href={`/policies/${policy.slug}`}
                            className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#008C78]/30 transition-all duration-300 group flex flex-col items-start"
                        >
                            <div className="w-14 h-14 bg-slate-50 flex items-center justify-center rounded-xl text-[#008C78] mb-6 group-hover:bg-[#008C78] group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-1">
                                <policy.icon className="w-7 h-7" />
                            </div>
                            <h4 className="text-xl font-bold text-[#020617] mb-3 group-hover:text-[#008C78] transition-colors">
                                {policy.title}
                            </h4>
                            <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                                {policy.summary}
                            </p>
                            <div className="flex items-center gap-2 text-[#008C78] font-bold text-xs uppercase tracking-widest mt-auto">
                                Read Policy <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
