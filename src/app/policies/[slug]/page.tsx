import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import Image from 'next/image';
import { policiesContent, PolicySlug } from '@/constants/policiesContent';
import { Shield, CheckCircle } from 'lucide-react';

const BASE_URL = 'https://www.tryittech.in';

export async function generateStaticParams() {
    return Object.keys(policiesContent).map((slug) => ({
        slug: slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const policy = policiesContent[slug as PolicySlug];

    if (!policy) {
        return {
            title: 'Policy Not Found | TRYITTECH LLP',
            description: 'The requested policy page was not found.',
        };
    }

    const title = `${policy.title} | Corporate Policies | TRYITTECH LLP`;
    const description = `${policy.title} - TRYITTECH LLP corporate policy. ${policy.sections[0]?.content.slice(0, 150).join(' ')}... Learn about our commitment to compliance, data security, and best practices.`;
    const url = `${BASE_URL}/policies/${slug}`;

    const keywordsMap: Record<string, string[]> = {
        'privacy-policy': ['privacy policy India', 'data protection policy Hyderabad', 'personal data processing policy', 'GDPR compliance India', 'data security policy TRYITTECH'],
        'terms-of-service': ['terms of service India', 'service agreement Hyderabad', 'terms and conditions TRYITTECH', 'usage policy India', 'legal terms staffing'],
        'cookie-policy': ['cookie policy India', 'cookie consent Hyderabad', 'tracking policy TRYITTECH', 'cookies GDPR India', 'website cookies policy'],
        'hr-policies': ['HR policies India', 'employee handbook Hyderabad', 'workplace policies TRYITTECH', 'human resources policies India', 'employment policies Hyderabad'],
        'code-of-conduct': ['code of conduct India', 'employee code of ethics Hyderabad', 'business ethics TRYITTECH', 'professional conduct India', 'workplace ethics Hyderabad'],
        'data-security': ['data security policy India', 'information security Hyderabad', 'cybersecurity policy TRYITTECH', 'data protection India', 'IT security policy Hyderabad'],
        'compliance': ['compliance policy India', 'regulatory compliance Hyderabad', 'legal compliance TRYITTECH', 'industry standards India', 'audit compliance Hyderabad'],
        'anti-harassment': ['anti-harassment policy India', 'workplace harassment Hyderabad', 'sexual harassment policy TRYITTECH', 'workplace safety India', 'employee protection Hyderabad'],
    };

    return {
        title,
        description,
        keywords: [
            ...(keywordsMap[slug] || []),
            'corporate policy TRYITTECH',
            'company policies India',
            'HR policies Hyderabad',
            'staffing company policies',
        ],
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            type: 'article',
            publishedTime: '2024-01-01T00:00:00Z',
            modifiedTime: new Date().toISOString(),
            authors: ['TRYITTECH LLP'],
            section: 'Corporate Policies',
            images: [{ url: '/images/clients/logoo.png', width: 1200, height: 630, alt: `${policy.title} - TRYITTECH LLP` }],
        },
        twitter: {
            title,
            description,
            card: 'summary_large_image',
            images: ['/images/clients/logoo.png'],
        },
        robots: {
            index: true,
            follow: true,
        },
    };
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
            />

            <section className="py-24 relative overflow-hidden">
                {/* Watermark Logo */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] overflow-hidden">
                    <div className="relative w-[500px] h-[500px]">
                        <Image
                            src="/images/clients/logoo.png"
                            alt="Watermark"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Metadata Bar */}
                    <div className="flex flex-wrap gap-6 mb-16 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-2 text-slate-600">
                            <Shield className="w-5 h-5 text-[#008CC8]" />
                            <span className="text-sm font-semibold tracking-wide">Corporate Policy</span>
                        </div>
                    </div>

                    {/* Policy Content */}
                    <div className="prose prose-slate prose-lg max-w-none">
                        {policy.sections.map((section) => (
                            <div key={section.id} className="mb-16">
                                <h2 className="text-3xl font-bold text-[#020617] mb-8 border-b border-slate-100 pb-4">
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
                    </div>

                    {/* User Compliance Section */}
                    {policy.userCompliance && (
                        <div className="mt-24 p-10 bg-[#020617] rounded-3xl text-white relative overflow-hidden not-prose">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#008CC8]/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
                                    <CheckCircle className="w-8 h-8 text-[#008CC8]" />
                                    User Compliance
                                </h3>
                                <ul className="space-y-4 mb-12">
                                    {policy.userCompliance.map((point, idx) => (
                                        <li key={idx} className="flex items-start gap-4 text-slate-300">
                                            <span className="w-1.5 h-1.5 bg-[#008CC8] rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-slate-200 leading-relaxed font-medium">{point}</span>
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
            </section>

            <Footer />
        </main >
    );
}
