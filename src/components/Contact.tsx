'use client';

import { Phone, Mail, Globe, Linkedin, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        service: 'Permanent Hiring',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Store in Database
            await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    source: 'Website Contact Form'
                }),
            });

            // 2. Redirect to WhatsApp
            const whatsappMessage = `Hello Tryittech, I am ${formData.name}. %0A%0A*Service:* ${formData.service} %0A*Mobile:* ${formData.mobile} %0A*Email:* ${formData.email} %0A%0A*Message:* ${formData.message}`;
            const whatsappUrl = `https://wa.me/919642717172?text=${whatsappMessage}`;
            window.open(whatsappUrl, '_blank');

            // Reset form
            setFormData({ name: '', email: '', mobile: '', service: 'Permanent Hiring', message: '' });
            alert('Thank you! Your inquiry has been sent and recorded.');
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong, but you can still contact us via WhatsApp directly.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="section-padding bg-slate-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-white shadow-[0_40px_100px_-20px_rgba(10,25,47,0.1)] rounded-sm overflow-hidden grid lg:grid-cols-5 border border-slate-100">

                    {/* Info Side */}
                    <div className="lg:col-span-2 bg-[#020617] p-12 lg:p-16 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-4xl font-bold mb-10 leading-tight">Get in Touch with our Experts</h3>
                            <p className="text-slate-400 mb-16 text-lg leading-relaxed">
                                Connect with our specialists today to discuss your talent requirements or strategic workforce goals.
                            </p>

                            <div className="space-y-10">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#008C78] group-hover:border-[#008C78] transition-all duration-300">
                                        <Phone className="text-[#008C78] w-6 h-6 group-hover:text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Phone Support</span>
                                        <span className="text-sm text-slate-300 font-medium">+91 9642717172</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#008C78] group-hover:border-[#008C78] transition-all duration-300">
                                        <Mail className="text-[#008C78] w-6 h-6 group-hover:text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Email Inquiry</span>
                                        <span className="text-sm text-slate-300 font-medium">info@tryittech.in</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#008C78] group-hover:border-[#008C78] transition-all duration-300">
                                        <Globe className="text-[#008C78] w-6 h-6 group-hover:text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Portal</span>
                                        <span className="text-sm text-slate-300 font-medium">www.tryittech.in</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 pt-16 flex gap-4">
                            <a href="#" className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-[#008C78] hover:border-[#008C78] transition-all group">
                                <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-white" />
                            </a>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#008C78]/5 rounded-full blur-3xl -mr-32 -mt-32" />
                    </div>

                    {/* Form Side */}
                    <div className="lg:col-span-3 p-12 lg:p-20 bg-white">
                        <form onSubmit={handleSubmit} className="space-y-10">
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="relative group">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest absolute -top-2.5 left-5 bg-white px-2 group-focus-within:text-[#008C78] transition-colors">Your Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full border-2 border-slate-100 p-5 focus:outline-none focus:border-[#008C78] transition-all outline-none rounded-sm font-medium placeholder:text-slate-300"
                                        placeholder="e.g. Johnathan Doe"
                                    />
                                </div>
                                <div className="relative group">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest absolute -top-2.5 left-5 bg-white px-2 group-focus-within:text-[#008C78] transition-colors">Email Address</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full border-2 border-slate-100 p-5 focus:outline-none focus:border-[#008C78] transition-all outline-none rounded-sm font-medium placeholder:text-slate-300"
                                        placeholder="email@company.com"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="relative group">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest absolute -top-2.5 left-5 bg-white px-2 group-focus-within:text-[#008C78] transition-colors">Mobile Number</label>
                                    <input
                                        required
                                        type="tel"
                                        value={formData.mobile}
                                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                        className="w-full border-2 border-slate-100 p-5 focus:outline-none focus:border-[#008C78] transition-all outline-none rounded-sm font-medium placeholder:text-slate-300"
                                        placeholder="+91 00000 00000"
                                    />
                                </div>
                                <div className="relative group">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest absolute -top-2.5 left-5 bg-white px-2 group-focus-within:text-[#008C78] transition-colors">Service Interest</label>
                                    <select
                                        value={formData.service}
                                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                        className="w-full border-2 border-slate-100 p-5 focus:outline-none focus:border-[#008C78] transition-all outline-none rounded-sm appearance-none bg-transparent font-medium text-slate-700"
                                    >
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
                            </div>

                            <div className="relative group">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest absolute -top-2.5 left-5 bg-white px-2 group-focus-within:text-[#008C78] transition-colors">Your Message</label>
                                <textarea
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full border-2 border-slate-100 p-5 focus:outline-none focus:border-[#008C78] transition-all outline-none rounded-sm font-medium placeholder:text-slate-300 resize-none"
                                    placeholder="How can we help your organization scale?"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#020617] text-white font-black py-6 hover:bg-[#008C78] transition-all shadow-[0_20px_40px_-10px_rgba(10,25,47,0.3)] text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 group rounded-sm disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : 'Initialize Consultation'}
                                <Send className="w-4 h-4 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
