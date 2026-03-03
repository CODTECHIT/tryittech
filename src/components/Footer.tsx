'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Linkedin, MessageSquare } from 'lucide-react';

const staticSections = [
    {
        title: "Services",
        links: [
            { name: 'Permanent Hiring', href: '/services/permanent-staffing' },
            { name: 'Contract Staffing', href: '/services/contract-staffing' },
            { name: 'Staff Augmentation', href: '/services/staff-augmentation' },
            { name: 'Offshore IT Hub', href: '/services/offshore-it-staffing' },
            { name: 'RPO Frameworks', href: '/services/managed-rpo' },
            { name: 'Payroll Services', href: '/services/payroll-services' },
        ]
    },
    {
        title: "Industries",
        links: [
            { name: 'Information Technology', href: '/industries/it' },
            { name: 'Healthcare', href: '/industries/healthcare' },
            { name: 'BFSI', href: '/industries/bfsi' },
        ]
    },
    {
        title: "Training",
        links: [
            { name: 'IT Training', href: '/training/it-training' },
            { name: 'General Training', href: '/training/general-training' },
        ]
    },
    {
        title: "Company",
        links: [
            { name: 'About Us', href: '/about#about' },
            { name: 'Core Values', href: '/about#values' },
            { name: 'Leadership', href: '/about#leadership' },
            { name: 'Our Policies', href: '/about#policies' },
        ]
    }
];

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [sections, setSections] = useState(staticSections);

    useEffect(() => {
        const fetchFooterData = async () => {
            try {
                const [servicesRes, industriesRes, trainingsRes] = await Promise.all([
                    fetch('/api/services').then(res => res.json()),
                    fetch('/api/industries').then(res => res.json()),
                    fetch('/api/trainings').then(res => res.json())
                ]);

                const updatedSections = staticSections.map(section => {
                    if (section.title === 'Services' && Array.isArray(servicesRes)) {
                        return {
                            ...section,
                            links: servicesRes.map((s: { title: string; slug: string }) => ({ name: s.title, href: `/services/${s.slug}` }))
                        };
                    }
                    if (section.title === 'Industries' && Array.isArray(industriesRes)) {
                        return {
                            ...section,
                            links: industriesRes.map((i: { name?: string; title?: string; slug: string }) => ({ name: i.name || i.title || 'Industry', href: `/industries/${i.slug}` }))
                        };
                    }
                    if (section.title === 'Training' && Array.isArray(trainingsRes)) {
                        return {
                            ...section,
                            links: trainingsRes.map((t: { title: string; slug: string }) => ({ name: t.title, href: `/training/${t.slug}` }))
                        };
                    }
                    return section;
                });

                setSections(updatedSections);
            } catch (error) {
                console.error('Failed to sync footer links:', error);
            }
        };

        fetchFooterData();
    }, []);

    return (
        <footer className="bg-[#020617] pt-24 pb-12 text-white border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Brand Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
                    <div className="lg:max-w-sm">
                        <Link href="/" className="group flex items-center gap-3 mb-8">
                            <Image
                                src="/images/clients/logoo.png"
                                alt="TRYITTECH LLP Logo"
                                width={220}
                                height={70}
                                className="h-16 w-auto transition-transform group-hover:scale-105"
                            />
                            <div className="flex flex-col">
                                <span className="text-xl font-black tracking-tight leading-none text-white">
                                    TRYITTECH <span className="text-[#008CC8]">LLP</span>
                                </span>
                                <span className="text-[8px] font-bold tracking-[0.2em] uppercase mt-1 text-slate-400">
                                    Staffing for What&apos;s Next
                                </span>
                            </div>
                        </Link>
                        <p className="text-[15px] leading-relaxed mb-10 text-slate-400">
                            Empowering organizations through specialized talent and strategic workforce transformation.
                        </p>
                        <div className="flex flex-col gap-4">
                            <a href="https://www.linkedin.com/company/tryittech-llp/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-[#008CC8] hover:border-[#008CC8] transition-all group rounded-lg">
                                <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-white" />
                            </a>
                            <a href="tel:+919642717172" className="text-[11px] font-bold text-slate-500 hover:text-[#008CC8] transition-colors tracking-widest uppercase">
                                +91 96427 17172
                            </a>
                        </div>
                    </div>

                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8">
                        {sections.map((section) => (
                            <div key={section.title}>
                                <h4 className="text-white font-black mb-8 text-[10px] uppercase tracking-[0.3em]">{section.title}</h4>
                                <ul className="space-y-4 text-[13px] font-medium">
                                    {section.links.map((link) => (
                                        <li key={link.name}>
                                            <Link href={link.href} className="text-slate-400 hover:text-[#008CC8] transition-colors">
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contacts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12 border-y border-white/10 mb-12">
                    <div className="flex items-center gap-5 p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-[#008CC8]/30 transition-colors group">
                        <div className="w-12 h-12 bg-[#25D366]/10 rounded-xl flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all">
                            <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest font-black text-slate-500 mb-1">WhatsApp Chat</p>
                            <a href="https://wa.me/919642717172" target="_blank" rel="noopener noreferrer" className="text-white font-bold hover:text-[#008CC8] transition-colors">Connect Instantly</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-[#008CC8]/30 transition-colors group">
                        <div className="w-12 h-12 bg-[#008CC8]/20 rounded-xl flex items-center justify-center text-[#008CC8] group-hover:bg-[#008CC8] group-hover:text-white transition-all">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest font-black text-slate-500 mb-1">Email Inquiry</p>
                            <a href="mailto:info@tryittech.in" className="text-white font-bold hover:text-[#008CC8] transition-colors">info@tryittech.in</a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center md:text-left leading-relaxed">
                            © {currentYear} TRYITTECH LLP. All Rights Reserved.
                            <br className="md:hidden" />
                            <span className="hidden md:inline mx-4 text-white/30">|</span>
                            Developed by <a href="https://www.codtechitsolutions.com/" target="_blank" rel="noopener noreferrer" className="text-[#008CC8] hover:text-white transition-colors">CODTECH IT Solutions</a>
                        </p>
                    </div>

                </div>
            </div>
        </footer>
    );
}

