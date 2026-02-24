import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { services } from '@/constants/services';
import SolarSystemProcess from '@/components/SolarSystemProcess';

export async function generateStaticParams() {
    return services.map((service) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = services.find((s) => s.slug === slug);
    if (!service) return { title: 'Service Not Found' };

    return {
        title: `${service.title} | TRYITTECH LLP`,
        description: service.shortDescription,
    };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = services.find((s) => s.slug === slug);

    if (!service) {
        notFound();
    }

    return (
        <main className="bg-white">
            <Navbar />
            <PageHeader
                title={service.title}
                subtitle="Industry-leading workforce solutions designed for the future of global enterprise."
            />

            {/* Premium Service Image Section */}
            <section className="relative h-[500px] w-full mt-[-2rem]">
                <div className="absolute inset-0">
                    <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/40 to-[#020617]/80" />
                </div>
                <div className="absolute bottom-16 inset-x-0">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-1 bg-[#008C78] rounded-full" />
                            <p className="text-white text-lg font-bold tracking-widest uppercase">Service Excellence & Strategy</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -z-10 skew-x-12 translate-x-1/2" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex mb-16">
                        <Link href="/services" className="flex items-center gap-2 text-[#008C78] font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all">
                            <ArrowLeft className="w-5 h-5" /> Back to All Services
                        </Link>
                    </div>

                    <div className="space-y-32">
                        {/* Row 1: Strategic Content & Visual Narrative */}
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <span className="h-0.5 w-12 bg-[#008C78]" />
                                    <span className="text-[#008C78] font-black uppercase tracking-[0.3em] text-[10px]">Methodology & Approach</span>
                                </div>
                                <h2 className="text-5xl font-bold text-[#020617] tracking-tighter leading-tight">
                                    Strategic <span className="text-[#008C78]">Overview</span>
                                </h2>
                                <div className="text-xl text-slate-600 leading-relaxed space-y-6 max-w-xl">
                                    {service.fullDescription.split('\n\n').map((paragraph, i) => (
                                        <p key={i}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>
                            <div className="relative h-[550px] w-full rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,140,120,0.15)] group border border-slate-100">
                                <Image
                                    src={service.secondaryImage}
                                    alt="Service Strategy"
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#020617]/40 via-transparent to-[#008C78]/10" />
                                <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                                    <p className="text-white text-sm font-semibold tracking-wide">
                                        Empowering global enterprises with scalable workforce DNA.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Row 2: Insights, Impact & Value */}
                        <div className="grid lg:grid-cols-2 gap-16">
                            {/* Expert Insight Card */}
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-gradient-to-r from-[#008C78]/20 to-indigo-500/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-duration-700" />
                                <div className="relative h-full p-12 bg-[#020617] rounded-[2.5rem] text-white overflow-hidden shadow-2xl flex flex-col justify-center">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#008C78] blur-[120px] opacity-20" />
                                    <h4 className="text-[#008C78] font-black uppercase tracking-[0.4em] text-xs mb-8">Executive Perspective</h4>
                                    <p className="text-2xl font-medium leading-relaxed italic opacity-95 relative z-10">
                                        &quot;Our {service.title} engine is built to synchronize seamlessly with your internal operations, turning recruitment from a bottleneck into a competitive advantage.&quot;
                                    </p>
                                    <div className="mt-12 flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[#008C78]/20 flex items-center justify-center border border-[#008C78]/40">
                                            <span className="text-[#008C78] font-bold">TT</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">TryItTech Strategy Team</p>
                                            <p className="text-xs opacity-50 uppercase tracking-widest">Global Workforce Div.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Impact List */}
                            <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] space-y-10">
                                <div className="inline-block px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100 mb-2">
                                    <span className="text-[10px] font-black text-[#008C78] uppercase tracking-widest">Value Creation</span>
                                </div>
                                <h3 className="text-3xl font-bold text-[#020617]">Key Strategic <span className="text-[#008C78]">Impacts</span></h3>
                                <div className="grid gap-6">
                                    {service.benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex gap-6 group items-start">
                                            <div className="w-12 h-12 bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-[#008C78] transition-all duration-500 rounded-2xl border border-slate-100 group-hover:border-[#008C78] shadow-sm">
                                                <CheckCircle2 className="w-6 h-6 text-[#008C78] group-hover:text-white" />
                                            </div>
                                            <div className="space-y-1 pt-1.5">
                                                <p className="text-slate-800 font-bold leading-tight group-hover:text-[#008C78] transition-colors">{benefit}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Summary Stats Bar */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { label: 'Efficiency Gain', val: '40%' },
                                { label: 'Retention Rate', val: '95%+' },
                                { label: 'Global Talent', val: '1M+' },
                                { label: 'Support SLA', val: '24/7' }
                            ].map((stat, i) => (
                                <div key={i} className="p-8 bg-slate-50/50 backdrop-blur-sm rounded-3xl border border-white shadow-sm hover:shadow-md transition-all text-center group">
                                    <span className="block text-4xl font-black text-[#020617] mb-2 group-hover:text-[#008C78] transition-colors">{stat.val}</span>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Delivery Framework Section */}
                    <div className="mt-32 pt-24 border-t border-slate-100">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-16">
                                <h4 className="text-[#008C78] font-black uppercase tracking-[0.4em] text-xs mb-4">Our Methodology</h4>
                                <h2 className="text-4xl md:text-5xl font-bold text-[#020617] mb-6">Delivery <span className="text-[#008C78]">Framework</span></h2>
                                <div className="w-24 h-1.5 bg-[#008C78] mx-auto rounded-full" />
                            </div>

                            <SolarSystemProcess title={service.title} steps={service.process} />
                        </div>
                    </div>
                </div>
            </section>

            <Contact />
            <Footer />
        </main>
    );
}
