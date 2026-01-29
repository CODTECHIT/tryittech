import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0a192f]">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
                    alt="Modern Corporate Building"
                    className="w-full h-full object-cover opacity-30 grayscale"
                />
                <div className="absolute inset-0 hero-overlay" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="max-w-4xl">
                    <div className="flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-left duration-700">
                        <span className="h-[2px] w-12 bg-[#0d9488]" />
                        <span className="text-[#0d9488] uppercase tracking-[0.3em] text-xs font-bold font-display">Premier HR Solutions Provider</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-bold text-white leading-[1.1] mb-8 animate-in fade-in slide-in-from-bottom duration-1000">
                        Staffing for <br />
                        <span className="text-[#0d9488] italic font-serif">What’s Next</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-3xl font-light animate-in fade-in duration-1000 delay-300">
                        Pan-India staffing, offshore IT talent, and workforce solutions backed by 10+ years of US staffing expertise. We bridge the gap between global standards and Indian talent.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 animate-in fade-in duration-1000 delay-500">
                        <a href="#services" className="px-10 py-5 bg-[#0d9488] text-white font-bold rounded-lg hover:bg-[#0b7a70] transition-all text-center flex items-center justify-center gap-2 group shadow-xl">
                            Hire Talent <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href="#contact" className="px-10 py-5 bg-transparent text-white font-bold rounded-lg border-2 border-white/20 hover:bg-white/10 transition-all text-center backdrop-blur-sm">
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>

            {/* Background Typography Decor */}
            <div className="absolute bottom-0 right-0 p-10 hidden lg:block select-none pointer-events-none opacity-5">
                <div className="text-white text-[15rem] font-bold leading-none tracking-tighter">TRYIT</div>
            </div>
        </section>
    );
}
