'use client';

import { Mail, Globe, Linkedin, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import NextImage from 'next/image';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        service: 'General Inquiry',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<{
        services: { title: string }[],
        industries: { name: string }[],
        trainings: { title: string }[]
    }>({
        services: [],
        industries: [],
        trainings: []
    });

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [srvRes, indRes, trnRes] = await Promise.all([
                    fetch('/api/services'),
                    fetch('/api/industries'),
                    fetch('/api/trainings')
                ]);
                const [srv, ind, trn] = await Promise.all([
                    srvRes.json(),
                    indRes.json(),
                    trnRes.json()
                ]);
                setOptions({
                    services: Array.isArray(srv) ? srv : [],
                    industries: Array.isArray(ind) ? ind : [],
                    trainings: Array.isArray(trn) ? trn : []
                });
            } catch (err) {
                console.error('Failed to fetch contact form options:', err);
            }
        };
        fetchOptions();
    }, []);

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
        <section id="contact" className="section-padding bg-light relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-white shadow-[0_40px_100px_-20px_rgba(31,41,55,0.1)] rounded-sm overflow-hidden grid lg:grid-cols-5 border border-slate-100">

                    {/* Info Side */}
                    <div
                        className="lg:col-span-2 p-8 md:p-12 lg:p-16 text-[#020617] flex flex-col justify-between relative overflow-hidden"
                    >
                        {/* Box Background Image */}
                        <div className="absolute inset-0 z-0">
                            <NextImage
                                src="/images/sd.jpg"
                                alt="Background"
                                fill
                                className="object-cover opacity-100"
                            />
                            <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-3xl md:text-4xl font-bold mb-6 md:mb-10 leading-tight text-[#020617]">Get in Touch with our Experts</h3>
                            <p className="text-base md:text-lg text-[#020617]/90 mb-10 md:mb-16 leading-relaxed font-bold">
                                Connect with our specialists today to discuss your talent requirements or strategic workforce goals.
                            </p>

                            <div className="space-y-10">

                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 bg-[#020617]/5 border border-[#020617]/10 flex items-center justify-center shrink-0 group-hover:bg-[#008CC8] group-hover:border-[#008CC8] transition-all duration-300">
                                        <Mail className="text-[#020617] w-6 h-6 group-hover:text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="block text-[10px] font-black text-[#008CC8] uppercase tracking-widest">Email Inquiry</span>
                                        <span className="text-sm text-[#020617] font-black">info@tryittech.in</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 bg-[#020617]/5 border border-[#020617]/10 flex items-center justify-center shrink-0 group-hover:bg-[#008CC8] group-hover:border-[#008CC8] transition-all duration-300">
                                        <Globe className="text-[#020617] w-6 h-6 group-hover:text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="block text-[10px] font-black text-[#020617]/50 uppercase tracking-widest">Global Portal</span>
                                        <span className="text-sm text-[#020617]/80 font-black">www.tryittech.in</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 pt-16 flex gap-4">
                            <a href="#" className="w-12 h-12 border border-[#020617]/10 flex items-center justify-center hover:bg-[#020617] hover:border-[#020617] transition-all group">
                                <Linkedin className="w-5 h-5 text-[#020617]/50 group-hover:text-white" />
                            </a>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#008CC8]/10 rounded-full blur-3xl -mr-32 -mt-32" />
                    </div>

                    {/* Form Side */}
                    <div className="lg:col-span-3 p-8 md:p-12 lg:p-20 bg-white">
                        <form onSubmit={handleSubmit} className="space-y-10">
                            <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                                <div className="relative group">
                                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest absolute -top-2.5 left-5 bg-white px-2 group-focus-within:text-[#008CC8] transition-colors">Your Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full border-2 border-slate-200 p-5 focus:outline-none focus:border-[#008CC8] transition-all outline-none rounded-sm font-semibold text-[#020617] placeholder:text-slate-400"
                                        placeholder="e.g. Johnathan Doe"
                                    />
                                </div>
                                <div className="relative group">
                                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest absolute -top-2.5 left-5 bg-white px-2 group-focus-within:text-[#008CC8] transition-colors">Email Address</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full border-2 border-slate-200 p-5 focus:outline-none focus:border-[#008CC8] transition-all outline-none rounded-sm font-semibold text-[#020617] placeholder:text-slate-400"
                                        placeholder="email@company.com"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                                <div className="relative group">
                                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest absolute -top-2.5 left-5 bg-white px-2 group-focus-within:text-[#008CC8] transition-colors">Mobile Number</label>
                                    <input
                                        required
                                        type="tel"
                                        value={formData.mobile}
                                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                        className="w-full border-2 border-slate-200 p-5 focus:outline-none focus:border-[#008CC8] transition-all outline-none rounded-sm font-semibold text-[#020617] placeholder:text-slate-400"
                                        placeholder="+91 00000 00000"
                                    />
                                </div>
                                <div className="relative group">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest absolute -top-2.5 left-5 bg-white px-2 group-focus-within:text-[#008CC8] transition-colors">Service Interest</label>
                                    <select
                                        value={formData.service}
                                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                        className="w-full border-2 border-slate-100 p-5 focus:outline-none focus:border-[#008CC8] transition-all outline-none rounded-sm appearance-none bg-transparent font-medium text-slate-700"
                                    >
                                        <option value="General Inquiry">General Inquiry</option>

                                        {options.services.length > 0 && (
                                            <optgroup label="Our Services">
                                                {options.services.map((srv, i) => (
                                                    <option key={`srv-${i}`} value={`Service: ${srv.title}`}>{srv.title}</option>
                                                ))}
                                            </optgroup>
                                        )}

                                        {options.industries.length > 0 && (
                                            <optgroup label="Market Verticals">
                                                {options.industries.map((ind, i) => (
                                                    <option key={`ind-${i}`} value={`Industry: ${ind.name}`}>{ind.name}</option>
                                                ))}
                                            </optgroup>
                                        )}

                                        {options.trainings.length > 0 && (
                                            <optgroup label="Training Programs">
                                                {options.trainings.map((trn, i) => (
                                                    <option key={`trn-${i}`} value={`Training: ${trn.title}`}>{trn.title}</option>
                                                ))}
                                            </optgroup>
                                        )}
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <Send className="w-4 h-4 rotate-90" />
                                    </div>
                                </div>
                            </div>

                            <div className="relative group">
                                <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest absolute -top-2.5 left-5 bg-white px-2 group-focus-within:text-[#008CC8] transition-colors">Your Message</label>
                                <textarea
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full border-2 border-slate-200 p-5 focus:outline-none focus:border-[#008CC8] transition-all outline-none rounded-sm font-semibold text-[#020617] placeholder:text-slate-400 resize-none"
                                    placeholder="How can we help your organization scale?"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#020617] text-white font-black py-6 hover:bg-[#008CC8] transition-all shadow-[0_20px_40px_-10px_rgba(10,25,47,0.3)] text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 group rounded-sm disabled:opacity-50"
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

