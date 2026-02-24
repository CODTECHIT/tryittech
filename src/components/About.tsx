import { Target, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function About() {
    return (
        <section id="about" className="py-32 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
                    <div className="relative">
                        <div className="relative rounded-[40px] overflow-hidden shadow-2xl border border-slate-100 group h-[650px]">
                            <Image
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200"
                                alt="Corporate Leadership Meeting"
                                fill
                                className="object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <div className="absolute -bottom-10 -right-6 lg:-right-10 bg-[#020617] text-white p-12 shadow-2xl hidden md:block border-l-8 border-[#008C78] z-20 rounded-2xl">
                            <div className="text-6xl font-black text-[#008C78] mb-2 font-poppins tracking-tighter">10+</div>
                            <div className="text-xs uppercase tracking-[0.2em] font-black text-slate-400 leading-tight">
                                Years of Global<br />Staffing Expertise
                            </div>
                        </div>

                        {/* Decors */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-slate-50 flex flex-wrap -z-10 opacity-50">
                            {[...Array(16)].map((_, i) => <div key={i} className="w-10 h-10 border border-slate-200" />)}
                        </div>
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-[#008C78] font-black uppercase tracking-[0.3em] text-xs mb-8 flex items-center gap-4">
                            <span className="w-10 h-[2px] bg-[#008C78]" /> Who We Are
                        </h2>
                        <h3 className="text-5xl md:text-7xl font-black text-[#020617] mb-10 leading-none tracking-tighter font-poppins">
                            A Global Extension of <br />
                            <span className="text-slate-400">Proven Excellence</span>
                        </h3>

                        <div className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
                            <p>
                                Established in 2025, <strong className="text-[#020617]">TryITTech LLP</strong> is a dynamic HR service provider based in Hyderabad, India. We are a strategic extension of a USA-based parent company with over 10 years of proven staffing experience across the United States.
                            </p>
                            <div className="p-8 bg-slate-50 rounded-3xl border-l-4 border-[#008C78] italic shadow-sm relative font-medium group text-[#020617]">
                                &quot;Led by our directors <strong className="text-[#008C78]">Mrs. Messe Rachuri</strong> and <strong className="text-[#008C78]">Mrs. Shobharani Bulla</strong>, we are committed to delivering reliable, scalable, and future-ready human capital solutions for the modern enterprise.&quot;
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 mt-16">
                            <div className="group">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 text-[#008C78] border border-slate-100 group-hover:bg-[#008C78] group-hover:text-white transition-all duration-300 shadow-sm">
                                    <Target className="w-8 h-8" />
                                </div>
                                <h4 className="text-2xl font-black text-[#020617] mb-4 uppercase tracking-tighter">Our Vision</h4>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                    To establish long-term strategic recruitment partnerships and guide clients into tomorrow’s success through innovation and integrity.
                                </p>
                            </div>
                            <div className="group">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 text-[#008C78] border border-slate-100 group-hover:bg-[#008C78] group-hover:text-white transition-all duration-300 shadow-sm">
                                    <ShieldCheck className="w-8 h-8" />
                                </div>
                                <h4 className="text-2xl font-black text-[#020617] mb-4 uppercase tracking-tighter">Our Mission</h4>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                    To be the preferred staffing partner for clients and candidates by consistently delivering quality, trust, and exceptional growth.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
