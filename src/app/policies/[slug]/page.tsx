import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { policiesContent, PolicySlug } from '@/constants/policiesContent';
import { Shield, Clock, FileText, CheckCircle } from 'lucide-react';

export async function generateStaticParams() {
    return Object.keys(policiesContent).map((slug) => ({
        slug: slug,
    }));
}

export default async function PolicyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const policy = policiesContent[slug as PolicySlug];

    if (!policy) {
        notFound();
    }

    return (
        <main className="bg-white">
            <Navbar />
            <PageHeader
                title={policy.title}
                subtitle={`Version ${policy.version} | Last Updated: ${policy.updatedDate}`}
            />

            <section className="py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Metadata Bar */}
                    <div className="flex flex-wrap gap-6 mb-16 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-2 text-slate-600">
                            <Shield className="w-5 h-5 text-[#0d9488]" />
                            <span className="text-sm font-semibold tracking-wide">Corporate Policy</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                            <Clock className="w-5 h-5 text-[#0d9488]" />
                            <span className="text-sm font-semibold tracking-wide">Updated {policy.updatedDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                            <FileText className="w-5 h-5 text-[#0d9488]" />
                            <span className="text-sm font-semibold tracking-wide">Revision {policy.version}</span>
                        </div>
                    </div>

                    {/* Policy Content */}
                    <div className="prose prose-slate prose-lg max-w-none">
                        {policy.sections.map((section) => (
                            <div key={section.id} className="mb-16">
                                <h2 className="text-3xl font-bold text-[#0a192f] mb-8 border-b border-slate-100 pb-4">
                                    {section.title}
                                </h2>
                                <div className="space-y-6">
                                    {section.content.map((item, idx) => (
                                        <p key={idx} className="text-slate-600 leading-relaxed">
                                            {item}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* User Compliance Section */}
                        {policy.userCompliance && (
                            <div className="mt-24 p-10 bg-[#0a192f] rounded-3xl text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#0d9488]/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                        <CheckCircle className="w-8 h-8 text-[#0d9488]" />
                                        User Compliance
                                    </h3>
                                    <ul className="space-y-4 mb-12">
                                        {policy.userCompliance.map((point, idx) => (
                                            <li key={idx} className="flex items-start gap-4 text-slate-300">
                                                <span className="w-1.5 h-1.5 bg-[#0d9488] rounded-full mt-2 flex-shrink-0" />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="pt-8 border-t border-white/10 text-slate-400 text-sm italic">
                                        * By accessing our systems, you agree to abide by the aforementioned terms and conditions.
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
