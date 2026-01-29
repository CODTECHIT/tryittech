import { notFound } from 'next/navigation';
import { ChevronRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { services } from '@/constants/services';

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
                subtitle="Detailed workforce solutions backed by a decade of global excellence."
            />

            <section className="section-padding">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex mb-12">
                        <Link href="/services" className="flex items-center gap-2 text-[#0d9488] font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all">
                            <ArrowLeft className="w-5 h-5" /> Back to All Services
                        </Link>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-20">
                        {/* Left Column: Detailed Content */}
                        <div className="lg:col-span-2 space-y-12">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold text-[#0a192f] flex items-center gap-4">
                                    Overview
                                </h2>
                                <div className="text-lg text-slate-600 leading-relaxed whitespace-pre-line">
                                    {service.fullDescription}
                                </div>
                            </div>

                            <div className="space-y-8 bg-slate-50 p-10 rounded-sm border border-slate-100">
                                <h3 className="text-2xl font-bold text-[#0a192f]">Key Strategic Benefits</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {service.benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex gap-4">
                                            <CheckCircle2 className="w-6 h-6 text-[#0d9488] shrink-0" />
                                            <p className="text-slate-600 font-medium">{benefit}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Process & Contact Sidebar */}
                        <div className="lg:col-span-1 space-y-12">
                            {/* Process Card */}
                            <div className="bg-[#0a192f] p-10 text-white rounded-sm">
                                <h4 className="text-xl font-bold mb-8 border-b border-white/10 pb-6 uppercase tracking-widest text-[#0d9488]">Delivery Process</h4>
                                <div className="space-y-8">
                                    {service.process.map((step, idx) => (
                                        <div key={idx} className="flex items-start gap-6 relative group">
                                            {idx < service.process.length - 1 && (
                                                <div className="absolute left-[15px] top-10 bottom-[-20px] w-px bg-white/10" />
                                            )}
                                            <div className="w-8 h-8 rounded-full border border-[#0d9488] flex items-center justify-center text-xs font-bold text-[#0d9488] shrink-0 group-hover:bg-[#0d9488] group-hover:text-white transition-all">
                                                {idx + 1}
                                            </div>
                                            <span className="text-sm font-bold tracking-wide pt-1">{step}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Contact Card */}
                            <div className="bg-[#0d9488] p-10 text-white rounded-sm shadow-xl">
                                <h4 className="text-xl font-bold mb-4">Need Talent?</h4>
                                <p className="text-white/80 text-sm mb-8 leading-relaxed">
                                    Discuss your specific {service.title} requirements with our strategic advisors today.
                                </p>
                                <Link href="/contact" className="block w-full bg-[#0a192f] text-white text-center py-4 font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-[#0a192f] transition-all">
                                    Consult Experts
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Contact />
            <Footer />
        </main>
    );
}
