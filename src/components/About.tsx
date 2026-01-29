import { Target, ShieldCheck } from 'lucide-react';

export default function About() {
    return (
        <section id="about" className="section-padding bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 group">
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200"
                                alt="Corporate Leadership Meeting"
                                className="w-full h-[650px] object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <div className="absolute -bottom-10 -right-6 lg:-right-10 bg-[#0a192f] text-white p-12 shadow-2xl hidden md:block border-l-8 border-[#0d9488] z-20">
                            <div className="text-6xl font-black text-[#0d9488] mb-2">10+</div>
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
                        <h2 className="text-[#0d9488] font-black uppercase tracking-[0.3em] text-xs mb-8 flex items-center gap-4">
                            <span className="w-10 h-[2px] bg-[#0d9488]" /> Who We Are
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-[#0a192f] mb-10 leading-tight">
                            A Global Extension of <br />
                            <span className="text-slate-400">Proven Excellence</span>
                        </h3>

                        <div className="space-y-8 text-lg text-slate-600 leading-relaxed">
                            <p>
                                Established in 2025, <strong className="text-[#0a192f]">TryITTech LLP</strong> is a dynamic HR service provider based in Hyderabad, India. We are a strategic extension of a USA-based parent company with over 10 years of proven staffing experience across the United States.
                            </p>
                            <div className="p-8 bg-slate-50 rounded-xl border-l-4 border-[#0d9488] italic shadow-sm relative quote-decor">
                                "Led by our directors <strong className="text-[#0a192f]">Mrs. Messe Rachuri</strong> and <strong className="text-[#0a192f]">Mrs. Shobharani Bulla</strong>, we are committed to delivering reliable, scalable, and future-ready human capital solutions for the modern enterprise."
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 mt-16">
                            <div className="group">
                                <div className="w-14 h-14 bg-slate-50 flex items-center justify-center mb-6 text-[#0d9488] border border-slate-100 group-hover:bg-[#0d9488] group-hover:text-white transition-all duration-300 shadow-sm">
                                    <Target className="w-7 h-7" />
                                </div>
                                <h4 className="text-xl font-bold text-[#0a192f] mb-4">Our Vision</h4>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    To establish long-term strategic recruitment partnerships and guide clients into tomorrow’s success through innovation and integrity.
                                </p>
                            </div>
                            <div className="group">
                                <div className="w-14 h-14 bg-slate-50 flex items-center justify-center mb-6 text-[#0d9488] border border-slate-100 group-hover:bg-[#0d9488] group-hover:text-white transition-all duration-300 shadow-sm">
                                    <ShieldCheck className="w-7 h-7" />
                                </div>
                                <h4 className="text-xl font-bold text-[#0a192f] mb-4">Our Mission</h4>
                                <p className="text-slate-500 text-sm leading-relaxed">
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
