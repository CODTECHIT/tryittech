'use client';

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
    { label: "Talent Network", val: "1.2M+", detail: "Pre-screened professionals" },
    { label: "Client Partners", val: "500+", detail: "Across 12+ industry verticals" },
    { label: "Retention Rate", val: "98%", detail: "Industry-leading stability" },
    { label: "Global Presence", val: "15+", detail: "Delivery hubs & GCCs" }
];

export default function SuccessStats() {
    return (
        <section className="relative z-20 mt-[-80px] mb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-12 lg:p-16 rounded-[60px] shadow-2xl border border-slate-100 grid md:grid-cols-2 lg:grid-cols-4 gap-12 items-center">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className="text-center group"
                    >
                        <div className="space-y-3">
                            <span className="text-5xl md:text-6xl font-black text-[#020617] tracking-tighter group-hover:text-[#008C78] transition-colors duration-500 block">
                                {stat.val}
                            </span>
                            <div className="space-y-1">
                                <span className="text-xs font-black text-[#008C78] uppercase tracking-[0.2em] block">
                                    {stat.label}
                                </span>
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-none">
                                    {stat.detail}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
