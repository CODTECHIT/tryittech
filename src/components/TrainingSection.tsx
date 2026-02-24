'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { trainingCategories } from '@/data/trainingData';

export default function TrainingSection() {
  return (
    <section className="py-32 bg-[#020617] text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#008C78] blur-[150px] -mr-96 -mt-96 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="w-12 h-[2px] bg-[#008C78]" />
                <span className="text-[#008C78] font-bold uppercase tracking-[0.4em] text-xs">Advisory & Enablement</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                Empowering <br />
                <span className="text-[#008C78]">Next-Gen</span> Talent
              </h2>
              <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl italic">
                Beyond staffing, we nurture the skills that define tomorrow&apos;s market leaders through immersive, expert-led training ecosystems.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {trainingCategories.map((category, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 10 }}
                  className="space-y-4 group cursor-pointer"
                >
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#008C78] group-hover:border-[#008C78] transition-all duration-300">
                    {/* We use the icon from category if it's a component or just generic ones for now */}
                    <GraduationCap className="w-6 h-6 text-[#008C78] group-hover:text-white" />
                  </div>
                  <h4 className="text-xl font-bold uppercase tracking-widest">{category.title}</h4>
                  <p className="text-sm text-slate-500 line-clamp-2">{category.description}</p>
                  <Link
                    href={`/training/${category.slug}`}
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#008C78] hover:text-white transition-colors"
                  >
                    Learn More <ArrowRight className="w-3 h-3" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[600px] rounded-[60px] overflow-hidden shadow-2xl border border-white/10 group">
              <Image
                src="https://innovasolutions.com/wp-content/uploads/2025/03/SOL_TAL_L2_B1_Desktop-2.jpg"
                alt="Training Excellence"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-12 left-12 right-12 p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl">
                <h3 className="text-2xl font-bold mb-4 uppercase">Industry Integration</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Our curriculum is developed in collaboration with Fortune 500 practice leads, ensuring every module delivers immediate operational value.
                </p>
              </div>
            </div>
            {/* Decor */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#008C78] rounded-full blur-[80px] opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
