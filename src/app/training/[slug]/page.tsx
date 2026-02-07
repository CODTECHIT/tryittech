'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { trainingCategories } from '@/data/trainingData';

export default function TrainingDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    const category = trainingCategories.find(c => c.slug === slug);

    if (!category) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <h1 className="text-4xl font-bold text-[#0a192f] mb-4">Training Not Found</h1>
                <Link href="/training" className="text-[#0d9488] hover:underline flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Training Programs
                </Link>
            </main>
        );
    }

    return (
        <main className="bg-slate-50 min-h-screen flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
                <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-[#0a192f]/80" /> {/* Dark overlay */}

                <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
                        {category.icon}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-wider">{category.title}</h1>
                    <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto font-light leading-relaxed">
                        {category.description}
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: Description */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-8">
                            <h2 className="text-2xl font-bold text-[#0a192f] mb-4">About the Program</h2>
                            <p className="text-slate-600 leading-8 text-lg">
                                {category.longDescription}
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-bold text-[#0a192f] mb-8 flex items-center">
                                Program Modules
                                <span className="ml-4 text-sm font-normal text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                                    {category.modules.length} Modules
                                </span>
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {category.modules.map((module, idx) => (
                                    <div key={idx} className="flex items-start p-4 rounded-xl bg-slate-50 border border-slate-100 transition-all hover:border-[#0d9488] hover:bg-teal-50 group">
                                        <CheckCircle2 className="w-5 h-5 text-[#0d9488] mt-0.5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                        <span className="font-medium text-slate-700 group-hover:text-[#0a192f]">{module}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar / CTA */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-[#0a192f] rounded-2xl p-8 text-white text-center shadow-xl">
                                <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
                                <p className="text-slate-300 mb-8 leading-relaxed">
                                    Enrolling in this course is the first step towards mastering new skills. Contact us today to get the full syllabus and schedule.
                                </p>
                                <Link
                                    href="/contact"
                                    className="block w-full py-4 px-6 bg-[#0d9488] hover:bg-[#0f766e] text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-cyan-500/25 uppercase tracking-widest text-sm"
                                >
                                    Contact Us Now
                                </Link>
                            </div>

                            <div className="mt-8 text-center">
                                <Link href="/training" className="text-slate-500 hover:text-[#0a192f] font-medium flex items-center justify-center transition-colors">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    View Other Programs
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
