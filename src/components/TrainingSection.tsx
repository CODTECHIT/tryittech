'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap } from 'lucide-react';

export default function TrainingSection() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/trainings')
      .then(res => res.json())
      .then(data => {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch trainings:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="pt-16 md:pt-24 pb-32 bg-[#020617] text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#008CC8] blur-[150px] -mr-96 -mt-96 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="w-12 h-[2px] bg-[#008CC8]" />
                <span className="text-[#008CC8] font-bold uppercase tracking-[0.4em] text-xs">Advisory & Enablement</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-none">
                Empowering <br />
                <span className="text-[#008CC8]">Next-Gen</span> Talent
              </h2>
              <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-xl italic">
                Beyond staffing, we nurture the skills that define tomorrow&apos;s market leaders through immersive, expert-led training ecosystems.
              </p>
            </div>

            {loading ? (
              <div className="text-slate-500 font-bold uppercase tracking-widest animate-pulse">Synchronizing Global Talent...</div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-8">
                {items.map((category, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 10 }}
                    className="space-y-4 group cursor-pointer"
                  >
                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#008CC8] group-hover:border-[#008CC8] transition-all duration-300">
                      <GraduationCap className="w-6 h-6 text-[#008CC8] group-hover:text-white" />
                    </div>
                    <h4 className="text-xl font-bold uppercase tracking-widest">{category.title}</h4>
                    <p className="text-sm text-slate-500 line-clamp-2">{category.description}</p>
                    <Link
                      href={`/training/${category.slug}`}
                      className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#008CC8] hover:text-white transition-colors"
                    >
                      Learn More <ArrowRight className="w-3 h-3" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="relative mt-20 lg:mt-0">
            <div className="relative h-[400px] md:h-[600px] rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl border border-white/10 group">
              <Image
                src="https://innovasolutions.com/wp-content/uploads/2025/03/SOL_TAL_L2_B1_Desktop-2.jpg"
                alt="Training Excellence"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 p-6 md:p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-3xl">
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 uppercase text-white">Industry Integration</h3>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                  Our curriculum is developed in collaboration with Fortune 500 practice leads, ensuring every module delivers immediate operational value.
                </p>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#008CC8] rounded-full blur-[80px] opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
}

