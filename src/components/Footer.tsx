'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Linkedin, MessageSquare, Phone, Quote } from 'lucide-react';

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
        <footer className="bg-[#020617] pt-24 pb-12 text-white border-t border-white/10 antialiased">
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
                                <span className="text-[9px] font-black tracking-[0.2em] uppercase mt-1 text-slate-300">
                                    Staffing for What&apos;s Next
                                </span>
                            </div>
                        </Link>
                        <div className="relative mb-10 max-w-sm">
                            <div className="relative p-5 bg-transparent rounded-2xl border-l-4 group" style={{ borderLeftColor: '#008CC8' }}>
                                <Quote
                                    className="absolute top-3 left-3 w-8 h-8 opacity-20 group-hover:opacity-40 transition-all duration-300 text-[#008CC8]"
                                />
                                <p className="text-sm leading-relaxed text-white/80 font-bold italic relative z-10 pl-4">
                                    &ldquo;  Empowering organizations through specialized talent and strategic workforce transformation.  &rdquo;
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <a
                                href="https://www.linkedin.com/company/tryittech-llp/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-white flex items-center justify-center rounded-xl shadow-md hover:scale-110 transition-all border border-slate-100"
                            >
                                <Image
                                    src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                                    alt="LinkedIn"
                                    width={24}
                                    height={24}
                                    className="object-contain"
                                />
                            </a>
                        </div>
                    </div>

                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 lg:gap-8">
                        {sections.map((section) => {
                            const hoverColor =
                                section.title === 'Services' ? '#F07A3A' :
                                    section.title === 'Industries' ? '#25D366' :
                                        section.title === 'Training' ? '#008CC8' :
                                            '#6ED3C3';

                            return (
                                <div key={section.title}>
                                    <h4 className="text-white font-black mb-6 text-[10px] md:text-[11px] uppercase tracking-[0.3em] opacity-90">{section.title}</h4>
                                    <ul className="space-y-3 text-[13px] font-bold">
                                        {section.links.map((link) => (
                                            <li key={link.name}>
                                                <Link
                                                    href={link.href}
                                                    className="text-white/60 transition-colors hover:translate-x-1 inline-block"
                                                    style={{
                                                        color: 'rgba(255, 255, 255, 0.6)'
                                                    } as React.CSSProperties}
                                                    onMouseEnter={(e) => e.currentTarget.style.color = hoverColor}
                                                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
                                                >
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Contacts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 py-12 border-y border-white/10 mb-12">
                    <div className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-[#F07A3A]/30 transition-colors group">
                        <div className="w-12 h-12 bg-[#F07A3A]/10 rounded-xl flex items-center justify-center text-[#F07A3A] group-hover:bg-[#F07A3A] group-hover:text-white transition-all">
                            <Phone className="w-5 h-5 transition-transform group-hover:rotate-[15deg]" />
                        </div>
                        <div>
                            <p className="text-[11px] uppercase tracking-widest font-black text-[#F07A3A] mb-1">Direct Callback</p>
                            <a href="tel:+919642717172" className="text-white text-lg font-black hover:text-[#F07A3A] transition-colors leading-none">+91 96427 17172</a>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-[#25D366]/30 transition-colors group">
                        <div className="w-12 h-12 bg-[#25D366]/10 rounded-xl flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all">
                            <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[11px] uppercase tracking-widest font-black text-[#6ED3C3] mb-1">WhatsApp Chat</p>
                            <a href="https://wa.me/919642717172" target="_blank" rel="noopener noreferrer" className="text-white text-lg font-black hover:text-[#008CC8] transition-colors leading-none">Connect Instantly</a>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-[#008CC8]/30 transition-colors group">
                        <div className="w-12 h-12 bg-[#008CC8]/20 rounded-xl flex items-center justify-center text-[#008CC8] group-hover:bg-[#008CC8] group-hover:text-white transition-all">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[11px] uppercase tracking-widest font-black text-[#008CC8] mb-1">Email Inquiry</p>
                            <a href="mailto:info@tryittech.in" className="text-white text-lg font-black hover:text-[#008CC8] transition-colors leading-none">info@tryittech.in</a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 text-center md:text-left leading-relaxed">
                            © {currentYear} TRYITTECH LLP. All Rights Reserved.
                            <br className="md:hidden" />
                            <span className="hidden md:inline mx-4 text-white/20">|</span>
                            <span className="text-[10px] text-white/20">Developed by <a href="https://www.codtechitsolutions.com/" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/50 transition-colors">CODTECH IT Solutions</a></span>
                        </p>
                    </div>

                </div>
            </div>
        </footer>
    );
}

