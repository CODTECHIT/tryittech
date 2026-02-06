import { notFound } from 'next/navigation';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import ProcessGlobe from '@/components/ProcessGlobe';
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

            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex mb-16">
                        <Link href="/services" className="flex items-center gap-2 text-[#0d9488] font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all">
                            <ArrowLeft className="w-5 h-5" /> Back to All Services
                        </Link>
                    </div>

                    <div className="space-y-24">
                        {/* Overview & Benefits (Now Full Width on Top) */}
                        <div className="space-y-16">
                            <div className="space-y-8">
                                <h2 className="text-4xl font-bold text-[#0a192f] flex items-center gap-4">
                                    <span className="w-8 h-1 bg-[#0d9488] rounded-full" /> Overview
                                </h2>
                                <div className="text-xl text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50/50 p-10 rounded-3xl border border-slate-100 shadow-sm">
                                    {service.fullDescription}
                                </div>
                            </div>

                            <div className="space-y-10">
                                <h3 className="text-3xl font-bold text-[#0a192f] text-center">Why Partner with Us for {service.title}?</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {service.benefits.map((benefit, idx) => (
                                        <div key={idx} className="group p-8 bg-white border border-slate-100 rounded-2xl hover:shadow-2xl hover:border-[#0d9488]/30 transition-all duration-500 flex flex-col items-center text-center">
                                            <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0d9488] text-[#0d9488] group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-1 shadow-inner">
                                                <CheckCircle2 className="w-7 h-7" />
                                            </div>
                                            <p className="text-slate-800 font-bold leading-tight text-lg">{benefit}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Process Globe Side (Now Centered Below) */}
                        <div className="pt-24 border-t border-slate-100">
                            <div className="max-w-4xl mx-auto">
                                <div className="text-center mb-16">
                                    <h4 className="text-[#0d9488] font-black uppercase tracking-[0.4em] text-xs mb-4">Our Methodology</h4>
                                    <h2 className="text-4xl md:text-5xl font-bold text-[#0a192f] mb-6">Delivery <span className="text-[#0d9488]">Framework</span></h2>
                                    <div className="w-24 h-1.5 bg-[#0d9488] mx-auto rounded-full" />
                                </div>
                                <ProcessGlobe steps={service.process} />
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
