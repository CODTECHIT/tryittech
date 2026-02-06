'use client';

import { Mail, Linkedin, Quote } from 'lucide-react';
import Image from 'next/image';

const leaders = [
    {
        name: 'Messe Rachuri',
        role: 'Founder',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
        bio: 'Messe Rachuri is a highly skilled recruitment professional with a competent educational background in Business Administration. She holds a Graduation from BR Ambedkar University and has over 10+ years of experience in staff augmentation, client relations, operations, and delivery. Her expertise has helped TRYITTECH LLP to establish long-term relationships with blue-chip clients. One of Messe’s greatest strengths is her ability to customise and provide high-quality and prompt client delivery models, which helps build strong, long-lasting partnerships.',
        linkedin: '#'
    },
    {
        name: 'Shobharani Bulla',
        role: 'Co-Founder',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80',
        bio: 'Shobharani Bulla is a talented and experienced professional with a Master’s Degree in Business Administration. She has over a decade of experience in the Talent & Staffing industry, making her a valuable asset to any team. In addition to her strong educational and professional background. Overall, Shobharani is a well-rounded individual with a passion for her work and a drive to succeed.',
        linkedin: '#'
    }
];

export default function Leadership() {
    return (
        <section id="leadership" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-[#0d9488] font-black uppercase tracking-[0.3em] text-xs mb-4">Our Leadership</h2>
                    <h3 className="text-4xl font-bold text-[#0a192f] mb-8">Executive Visionaries</h3>
                    <div className="w-16 h-1 bg-[#0d9488] mx-auto mb-10" />

                    {/* Quotation */}
                    <div className="relative p-8 bg-slate-50 rounded-2xl border-l-4 border-[#0d9488] group">
                        <Quote className="absolute top-4 left-4 w-10 h-10 text-[#0d9488]/10 group-hover:text-[#0d9488]/20 transition-colors" />
                        <p className="text-2xl font-medium text-[#0a192f] italic relative z-10">
                            &ldquo;Converting real-world experience into future-ready solutions.&rdquo;
                        </p>
                    </div>
                </div>

                {/* Leaders Grid */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {leaders.map((leader, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-8 items-start group">
                            {/* Image Placeholder with Frame */}
                            <div className="relative w-full md:w-72 h-80 flex-shrink-0">
                                <div className="absolute inset-0 border-2 border-[#0d9488] translate-x-3 translate-y-3 rounded-xl -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-500" />
                                <div className="relative h-full w-full rounded-xl overflow-hidden shadow-xl">
                                    <Image
                                        src={leader.image}
                                        alt={leader.name}
                                        fill
                                        className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>
                            </div>

                            {/* Bio Content */}
                            <div className="flex-grow space-y-4">
                                <div>
                                    <span className="text-[#0d9488] font-bold text-sm uppercase tracking-widest">{leader.role}</span>
                                    <h4 className="text-3xl font-bold text-[#0a192f] mt-1">{leader.name}</h4>
                                </div>
                                <p className="text-slate-600 leading-relaxed text-[15px]">
                                    {leader.bio}
                                </p>
                                <div className="flex gap-4 pt-4">
                                    <a href={leader.linkedin} className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-[#0a192f] hover:bg-[#0d9488] hover:text-white transition-all">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-[#0a192f] hover:bg-[#0d9488] hover:text-white transition-all">
                                        <Mail className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
