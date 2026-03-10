'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Laptop,
  Briefcase,
  Smile,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

const podGradients = [
  { from: '#1d4ed8', to: '#1e3a8a', class: 'from-blue-700 to-blue-900', text: 'text-blue-700' },
  { from: '#0f766e', to: '#134e4a', class: 'from-teal-700 to-teal-900', text: 'text-teal-700' },
  { from: '#047857', to: '#064e3b', class: 'from-emerald-700 to-emerald-900', text: 'text-emerald-700' },
  { from: '#c2410c', to: '#7c2d12', class: 'from-orange-700 to-orange-900', text: 'text-orange-700' },
  { from: '#be123c', to: '#881337', class: 'from-rose-700 to-rose-900', text: 'text-rose-700' },
  { from: '#7e22ce', to: '#581c87', class: 'from-purple-700 to-purple-900', text: 'text-purple-700' },
  { from: '#a21caf', to: '#701a75', class: 'from-fuchsia-700 to-fuchsia-900', text: 'text-fuchsia-700' },
  { from: '#4338ca', to: '#312e81', class: 'from-indigo-700 to-indigo-900', text: 'text-indigo-700' }
];

const getIcon = (title: string) => {
  const t = title.toUpperCase();
  if (t.includes('IT')) return Laptop;
  if (t.includes('GENERAL')) return Briefcase;
  if (t.includes('KIDS') || t.includes('LANGUAGE')) return Smile;
  if (t.includes('EHS') || t.includes('SAFETY')) return ShieldCheck;
  return BookOpen;
};

export default function TrainingSection({ initialData = [] }: { initialData?: any[] }) {
  const [items, setItems] = useState<any[]>(initialData);
  const [loading, setLoading] = useState(initialData.length === 0);

  useEffect(() => {
    if (initialData.length === 0) {
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
    }
  }, [initialData]);

  return (
    <section className="pt-16 md:pt-24 pb-32 bg-[#020617] text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#008CC8] blur-[150px] -mr-96 -mt-96 rounded-full" />
      </div>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {/* Left Content Box with Custom Image Background */}
          <div className="relative p-8 md:p-12 lg:p-16 rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl border border-white/10 group flex flex-col justify-center">
            {/* Box Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/sd.jpg"
                alt="Background"
                fill
                className="object-cover opacity-100"
              />
              <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="w-12 h-[2px] bg-[#008CC8]" />
                  <span className="text-[#008CC8] font-black uppercase tracking-[0.4em] text-[10px]">Advisory & Enablement</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-[3rem] font-black tracking-tighter leading-[0.95] text-[#020617] drop-shadow-sm">
                  Empowering <span className="text-[#008CC8]">Next-Gen</span> Talent
                </h2>
                <p className="text-sm md:text-base lg:text-lg text-[#020617] font-black leading-relaxed max-w-xl italic opacity-90">
                  Beyond staffing, we nurture the skills that define tomorrow&apos;s market leaders through immersive, expert-led training ecosystems.
                </p>
              </div>

              {loading ? (
                <div className="text-[#008CC8] font-black uppercase tracking-widest animate-pulse text-xs">Synchronizing Global Talent...</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-x-8 md:gap-y-8">
                  {items.map((category, idx) => {
                    const gradient = podGradients[idx % podGradients.length];
                    const Icon = getIcon(category.title);
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -5 }}
                        className="space-y-4 group cursor-pointer relative"
                      >
                        <div className="relative p-[2px] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)]">
                          {/* Colorful Gradient Border */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${gradient.class} opacity-100`} />

                          <div className="relative bg-white rounded-[14px] p-5 flex flex-col gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 relative bg-slate-50 border border-slate-100`}>
                              <Icon className={`w-6 h-6 ${gradient.text} relative z-10`} strokeWidth={2.5} />
                              <div className={`absolute inset-0 bg-gradient-to-br ${gradient.class} opacity-10 rounded-xl`} />
                            </div>

                            <div className="space-y-2">
                              <h4 className="text-sm md:text-base font-black uppercase tracking-wider text-[#020617] leading-tight group-hover:text-[#008CC8] transition-colors line-clamp-1">
                                {category.title}
                              </h4>
                              <p className="text-[10px] md:text-xs text-slate-500 font-bold line-clamp-2 leading-relaxed group-hover:text-slate-700 transition-colors">
                                {category.description}
                              </p>
                            </div>

                            <Link
                              href={`/training/${category.slug}`}
                              className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${gradient.text} hover:opacity-70 transition-all group-hover:gap-3`}
                            >
                              Explore <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Main Existing Image */}
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-full rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl border border-white/10 group">
            <Image
              src="https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg"
              alt="Professional Industry Training"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />

            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 p-6 md:p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-3xl">
              <h3 className="text-xl md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 uppercase text-white">Industry Integration</h3>
              <p className="text-white text-xs md:text-sm leading-relaxed font-bold">
                Our curriculum is developed in collaboration with Fortune 500 practice leads, ensuring every module delivers immediate operational value.
              </p>
            </div>
            {/* Decorative background glow inside the container so it doesn't break grid */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#008CC8] rounded-full blur-[100px] opacity-10 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
