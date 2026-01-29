import { MapPin, Phone, Mail, Globe, Linkedin, Twitter, Send } from 'lucide-react';

export default function Contact() {
    return (
        <section id="contact" className="section-padding bg-slate-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-white shadow-[0_40px_100px_-20px_rgba(10,25,47,0.1)] rounded-sm overflow-hidden grid lg:grid-cols-5 border border-slate-100">

                    {/* Info Side */}
                    <div className="lg:col-span-2 bg-[#0a192f] p-12 lg:p-16 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-4xl font-bold mb-10 leading-tight">Get in Touch with our Experts</h3>
                            <p className="text-slate-400 mb-16 text-lg leading-relaxed">
                                Connect with our HR specialists today to discuss your talent requirements or strategic workforce goals.
                            </p>

                            <div className="space-y-10">
                                <div className="flex items-start gap-6 group">
                                    <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#0d9488] group-hover:border-[#0d9488] transition-all duration-300">
                                        <MapPin className="text-[#0d9488] w-6 h-6 group-hover:text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Office Address</span>
                                        <span className="text-sm text-slate-300 leading-relaxed font-medium">
                                            9-346, Sita Homes, New Gayathri Nagar, Jillelaguda,<br />
                                            Hyderabad, Telangana – 500097
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#0d9488] group-hover:border-[#0d9488] transition-all duration-300">
                                        <Phone className="text-[#0d9488] w-6 h-6 group-hover:text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Phone Support</span>
                                        <span className="text-sm text-slate-300 font-medium">+91 9640946464</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#0d9488] group-hover:border-[#0d9488] transition-all duration-300">
                                        <Mail className="text-[#0d9488] w-6 h-6 group-hover:text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Email Inquiry</span>
                                        <span className="text-sm text-slate-300 font-medium">tryittechllp@proton.me</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#0d9488] group-hover:border-[#0d9488] transition-all duration-300">
                                        <Globe className="text-[#0d9488] w-6 h-6 group-hover:text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Portal</span>
                                        <span className="text-sm text-slate-300 font-medium">www.tryittech.in</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 pt-16 flex gap-4">
                            <a href="#" className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-[#0d9488] hover:border-[#0d9488] transition-all group">
                                <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-white" />
                            </a>
                            <a href="#" className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-[#0d9488] hover:border-[#0d9488] transition-all group">
                                <Twitter className="w-5 h-5 text-slate-400 group-hover:text-white" />
                            </a>
                        </div>

                        {/* Decor */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0d9488]/5 rounded-full blur-3xl -mr-32 -mt-32" />
                    </div>

                    {/* Form Side */}
                    <div className="lg:col-span-3 p-12 lg:p-20 bg-white">
                        <form action="#" method="POST" className="space-y-10">
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="relative group">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest absolute -top-2.5 left-5 bg-white px-2 group-focus-within:text-[#0d9488] transition-colors">Your Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full border-2 border-slate-100 p-5 focus:outline-none focus:border-[#0d9488] transition-all outline-none rounded-sm font-medium placeholder:text-slate-300"
                                        placeholder="e.g. Johnathan Doe"
                                    />
                                </div>
                                <div className="relative group">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest absolute -top-2.5 left-5 bg-white px-2 group-focus-within:text-[#0d9488] transition-colors">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full border-2 border-slate-100 p-5 focus:outline-none focus:border-[#0d9488] transition-all outline-none rounded-sm font-medium placeholder:text-slate-300"
                                        placeholder="email@company.com"
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest absolute -top-2.5 left-5 bg-white px-2 group-focus-within:text-[#0d9488] transition-colors">Service Interest</label>
                                <select className="w-full border-2 border-slate-100 p-5 focus:outline-none focus:border-[#0d9488] transition-all outline-none rounded-sm appearance-none bg-transparent font-medium text-slate-700">
                                    <option>Permanent Hiring</option>
                                    <option>Contract Staffing</option>
                                    <option>Offshore IT Solutions</option>
                                    <option>Managed RPO & Payroll</option>
                                    <option>General Inquiry</option>
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <Send className="w-4 h-4 rotate-90" />
                                </div>
                            </div>

                            <div className="relative group">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest absolute -top-2.5 left-5 bg-white px-2 group-focus-within:text-[#0d9488] transition-colors">Your Message</label>
                                <textarea
                                    rows={5}
                                    className="w-full border-2 border-slate-100 p-5 focus:outline-none focus:border-[#0d9488] transition-all outline-none rounded-sm font-medium placeholder:text-slate-300 resize-none"
                                    placeholder="How can we help your organization scale?"
                                />
                            </div>

                            <button type="submit" className="w-full bg-[#0a192f] text-white font-black py-6 hover:bg-[#0d9488] transition-all shadow-[0_20px_40px_-10px_rgba(10,25,47,0.3)] text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 group rounded-sm">
                                Initialize Consultation
                                <Send className="w-4 h-4 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
