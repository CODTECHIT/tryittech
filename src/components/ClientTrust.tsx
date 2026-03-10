'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Client {
    name: string;
    image: string;
}

export default function ClientTrust() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const res = await fetch('/api/clients');
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setClients(data);
                }
            } catch (error) {
                console.error('Failed to fetch clients:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    // Create a doubled list for the seamless infinite loop (-50% translation)
    const marqueeItems: Client[] = clients.length > 0 ? [...clients, ...clients] : [];

    if (loading) {
        return (
            <div className="py-20 bg-[#020617] text-center">
                <div className="inline-block w-8 h-8 border-4 border-[#008CC8]/20 border-t-[#008CC8] rounded-full animate-spin mb-4" />
                <p className="text-white/20 font-black uppercase tracking-widest text-xs">Synchronizing Partners...</p>
            </div>
        );
    }

    if (clients.length === 0) {
        return null; // Hide the section if no logos are available
    }

    return (
        <section className="py-16 md:py-24 bg-[#020617] border-t border-white/5 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 mb-16">
                <h3 className="text-2xl md:text-3xl font-extrabold text-white italic max-w-4xl mx-auto leading-relaxed">
                    &quot;Trusted by growing enterprises and established organizations across India&quot;
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-[#008CC8] to-[#008CC8] mx-auto mt-8" />
            </div>

            <div className="relative flex overflow-hidden">
                <div className="marquee-container flex items-center gap-10 px-6">
                    {marqueeItems.map((client, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 flex flex-col items-center justify-center bg-white p-6 w-64 h-44 rounded-xl group hover:shadow-[0_0_30px_rgba(0,140,200,0.2)] transition-all duration-500 hover:scale-105 border border-white/10"
                        >
                            <div className="relative w-full h-24 flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110">
                                <Image
                                    src={client.image}
                                    alt={client.name}
                                    fill
                                    className="object-contain p-2"
                                    unoptimized={true}
                                />
                            </div>
                            <div className="w-full pt-4 border-t border-slate-50 text-center">
                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-[#008CC8] transition-colors duration-300">
                                    {client.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Side Fades for Marquee */}
            <div className="absolute top-0 bottom-0 left-0 w-40 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-40 bg-gradient-to-l from-[#020617] via-[#020617]/80 to-transparent z-20 pointer-events-none" />

            {/* Floating gradient lights */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#008CC8]/10 rounded-full blur-[120px] pointer-events-none -z-0" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#008CC8]/5 rounded-full blur-[120px] pointer-events-none -z-0" />
        </section>
    );
}
