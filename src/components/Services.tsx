import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { services } from '@/constants/services';

export default function Services() {
    return (
        <section id="services" className="section-padding bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-[#0d9488] font-black uppercase tracking-[0.3em] text-xs mb-6 flex items-center gap-4">
                            <span className="w-10 h-[2px] bg-[#0d9488]" /> What We Deliver
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-[#0a192f] leading-tight font-display">
                            Workforce Optimization <br />& <span className="text-slate-400">Total Talent Solutions</span>
                        </h3>
                    </div>
                    <p className="text-slate-500 max-w-sm mb-2 font-medium">
                        Propelling businesses forward with custom-tailored human capital strategies and proven delivery frameworks.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {services.map((service, idx) => (
                        <Link
                            key={idx}
                            href={`/services/${service.slug}`}
                            className="bg-white border border-slate-100 flex flex-col group relative transition-all duration-500 overflow-hidden rounded-sm hover:border-[#0d9488]/30 hover:shadow-2xl"
                        >
                            {/* Card Number Background */}
                            <span className="absolute -top-4 -right-4 text-9xl font-black text-slate-50 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity leading-none select-none z-0">
                                {service.id}
                            </span>

                            {/* Service Image */}
                            <div className="relative h-48 w-full overflow-hidden z-10">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                <div className="absolute bottom-4 left-4">
                                    <span className="text-sm font-black text-white uppercase tracking-widest group-hover:text-[#0d9488] transition-colors bg-[#0d9488] px-3 py-1 rounded-sm">
                                        {service.id}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow relative z-10">
                                <div className="mb-6 flex justify-between items-start">
                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 group-hover:bg-[#0d9488] group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-1 shadow-sm">
                                        <service.icon className="w-6 h-6" />
                                    </div>
                                </div>

                                <h4 className="text-2xl font-bold text-[#0a192f] mb-4 group-hover:text-[#0d9488] transition-colors">{service.title}</h4>
                                <p className="text-slate-500 mb-6 leading-relaxed text-[15px] flex-grow">{service.shortDescription}</p>

                                <div className="mt-auto border-t border-slate-50 pt-6">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                        <span className="w-4 h-[1px] bg-slate-200" /> Hiring Excellence Process
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
                                        {service.process.slice(0, 3).map((step, sIdx) => (
                                            <div key={sIdx} className="flex items-center gap-2">
                                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight group-hover:text-slate-600 transition-colors whitespace-nowrap">
                                                    {step}
                                                </span>
                                                <ChevronRight className="w-3 h-3 text-slate-200 group-hover:text-[#0d9488] transition-colors" />
                                            </div>
                                        ))}
                                        <span className="text-[11px] font-bold text-[#0d9488] uppercase tracking-tight">View More</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
