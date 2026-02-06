import Link from 'next/link';
import { Mail, Phone, Linkedin } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0a192f] pt-24 pb-12 text-slate-400 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 pb-20">
                    <div className="lg:col-span-1">
                        <Link href="/" className="text-2xl font-bold text-white mb-8 block">
                            TRYIT<span className="text-[#0d9488]">TECH</span> <span className="text-[10px] font-normal opacity-30 tracking-[0.3em] font-sans ml-1 uppercase">LLP</span>
                        </Link>
                        <p className="text-[15px] leading-relaxed mb-10 text-slate-400/80">
                            “Staffing for What’s Next” — Bridging global standards with Indian talent through 10+ years of US-backed expertise.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-[#0d9488] hover:border-[#0d9488] transition-all group">
                                <Linkedin className="w-5 h-5 group-hover:text-white" />
                            </a>

                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-black mb-10 text-[10px] uppercase tracking-[0.3em]">Quick Navigation</h4>
                        <ul className="space-y-5 text-[15px] font-medium">
                            <li><Link href="/about" className="hover:text-[#0d9488] transition-colors">Our Legacy</Link></li>
                            <li><Link href="/industries" className="hover:text-[#0d9488] transition-colors">Verticals Served</Link></li>
                            <li><Link href="/services" className="hover:text-[#0d9488] transition-colors">Core Portfolio</Link></li>
                            <li><Link href="/contact" className="hover:text-[#0d9488] transition-colors">Contact Center</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-black mb-10 text-[10px] uppercase tracking-[0.3em]">Human Capital</h4>
                        <ul className="space-y-5 text-[15px] font-medium">
                            <li><Link href="/services" className="hover:text-[#0d9488] transition-colors">Permanent Hiring</Link></li>
                            <li><Link href="/services" className="hover:text-[#0d9488] transition-colors">Contractual Talent</Link></li>
                            <li><Link href="/services" className="hover:text-[#0d9488] transition-colors">Offshore IT Hub</Link></li>
                            <li><Link href="/services" className="hover:text-[#0d9488] transition-colors">RPO Frameworks</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-black mb-10 text-[10px] uppercase tracking-[0.3em]">Direct Connectivity</h4>
                        <ul className="space-y-6 text-[15px] font-medium">
                            <li className="flex gap-4 items-start">
                                <Mail className="w-5 h-5 text-[#0d9488] shrink-0" />
                                <span>tryittechllp@proton.me</span>
                            </li>
                            <li className="flex gap-4 items-start">
                                <Phone className="w-5 h-5 text-[#0d9488] shrink-0" />
                                <span>+91 9640946464</span>
                            </li>

                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                            © {currentYear} TRYITTECH LLP. All Rights Reserved.
                        </p>
                        <span className="hidden md:block text-slate-700">|</span>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                            Developed by <a href="https://www.codtechitsolutions.com/" target="_blank" rel="noopener noreferrer" className="text-[#0d9488] hover:text-white transition-colors">CODTECH IT Solutions</a>
                        </p>
                    </div>
                    <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.2em]">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Principles</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Operations</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
