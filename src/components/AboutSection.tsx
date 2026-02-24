'use client';

import { Target, Lightbulb, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';

export default function AboutSection() {
    return (
        <section id="about" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* About Us Content */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                    <div className="relative">
                        <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://innovasolutions.com/wp-content/uploads/2025/03/SOL_TAL_L2_B1_Desktop-2.jpg"
                                alt="Strategic Workforce Solutions Team"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/60 to-transparent" />
                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                <p className="text-sm uppercase tracking-widest font-bold mb-2 text-[#008C78]">The Future of Work</p>
                                <h4 className="text-2xl font-bold">Empowering India&apos;s Talent Economy</h4>
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#008C78]/10 rounded-full blur-2xl -z-10" />
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#020617]/5 rounded-full blur-3xl -z-10" />
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h2 className="text-[#008C78] font-black uppercase tracking-[0.3em] text-xs mb-4 flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-[#008C78]" /> About Us
                            </h2>
                            <h3 className="text-4xl font-bold text-[#020617] leading-tight mb-6">
                                Delivering Agile & Future-Ready <br />
                                <span className="text-[#008C78]">Workforce Solutions</span>
                            </h3>
                        </div>

                        <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                            <p>
                                <strong className="text-[#020617]">TRYITTECH LLP</strong> is an India-based Staffing, Workforce Solutions, and Education Technology company dedicated to helping organizations build agile, compliant, and future-ready workforces. We combine deep industry expertise, AI-driven digital platforms, and structured learning solutions to address evolving talent and skill requirements across industries.
                            </p>
                            <p>
                                We support clients across <span className="font-semibold text-slate-800">IT, Non-IT, Healthcare, BFSI, Automotive, Logistics, Retail, Telecom, Manufacturing and BPO services</span>, delivering end-to-end workforce solutions that enhance productivity, reduce operational complexity, and enable sustainable growth.
                            </p>
                            <p>
                                At the core of our approach is the integration of <span className="text-[#008C78] font-semibold">education technology</span> with workforce solutions. Through digital learning platforms and skill development programs, we help bridge the gap between industry demand and workforce readiness.
                            </p>
                            <p>
                                Our operations are built on ethical practices and regulatory compliance. We are committed to creating formal employment opportunities and fostering inclusive workplaces that reflect the communities we serve.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Our Vision Section */}
                <div className="bg-[#020617] rounded-3xl p-12 lg:p-20 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#008C78]/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#008C78]/10 rounded-full -ml-32 -mb-32 blur-3xl" />

                    <div className="relative z-10 grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-1">
                            <h2 className="text-[#008C78] font-black uppercase tracking-[0.3em] text-xs mb-4">The Blueprint</h2>
                            <h3 className="text-4xl font-bold text-white mb-6">Our Vision</h3>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Shaping the future of global staffing through an integrated ecosystem of technology and human potential.
                            </p>
                            <div className="mt-12 w-20 h-1 bg-gradient-to-r from-[#008C78] to-[#008CC8]" />
                        </div>

                        <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
                            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                                <div className="w-12 h-12 bg-[#008C78]/20 rounded-lg flex items-center justify-center text-[#008C78] mb-6">
                                    <Target className="w-6 h-6" />
                                </div>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    To become India&apos;s most trusted and technology-driven workforce partner, empowering organizations with AI-enabled staffing solutions and digital skill development.
                                </p>
                            </div>

                            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                                <div className="w-12 h-12 bg-[#643282]/20 rounded-lg flex items-center justify-center text-[#643282] mb-6">
                                    <Lightbulb className="w-6 h-6" />
                                </div>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    We envision building an integrated ecosystem where staffing, education technology, and workforce transformation work together to enhance productivity.
                                </p>
                            </div>

                            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                                <div className="w-12 h-12 bg-[#6EB428]/20 rounded-lg flex items-center justify-center text-[#6EB428] mb-6">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    Through innovation and data-driven insights, we aim to bridge the gap between industry demand and workforce capability, shaping a resilient future of work.
                                </p>
                            </div>

                            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                                <div className="w-12 h-12 bg-[#F0960A]/20 rounded-lg flex items-center justify-center text-[#F0960A] mb-6">
                                    <Users className="w-6 h-6" />
                                </div>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    To foster inclusive growth by delivering scalable education technology solutions and improving employability across diverse industrial sectors.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
