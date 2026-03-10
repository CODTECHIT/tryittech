'use client';

import { Quote } from 'lucide-react';
import Image from 'next/image';

const leaders = [
    {
        name: 'Messe Rachuri',
        role: 'Founder',
        image: '/images/1.jpeg',
        bio: "Messe Rachuri is a highly skilled recruitment professional with a competent educational background in Business Administration. She holds a Graduation from BR Ambedkar University and has over 10+ years of experience in staff augmentation, client relations, operations, and delivery. Her expertise has helped TRYITTECH LLP to establish long-term relationships with blue-chip clients. One of Messe's greatest strengths is her ability to customise and provide high-quality and prompt client delivery models, which helps build strong, long-lasting partnerships.",
        linkedin: 'https://www.linkedin.com/company/tryittech-llp/'
    },
    {
        name: 'Shobharani Bulla',
        role: 'Co-Founder',
        image: '/images/2.jpeg',
        bio: "Shobharani Bulla is a talented and experienced professional with a Master's Degree in Business Administration. She has over a decade of experience in the Talent & Staffing industry, making her a valuable asset to any team. In addition to her strong educational and professional background. Overall, Shobharani is a well-rounded individual with a passion for her work and a drive to succeed.",
        linkedin: 'https://www.linkedin.com/company/tryittech-llp/'
    }
];

export default function Leadership() {
    return (
        <section id="leadership" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-[#008CC8] font-black uppercase tracking-[0.3em] text-xs mb-4">Our Leadership</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#020617] mb-6 md:mb-8">Executive Visionaries</h3>
                    <div className="w-16 h-1 bg-[#008CC8] mx-auto mb-10" />

                    {/* Quotation */}
                    <div className="relative p-6 md:p-8 bg-slate-50 rounded-2xl border-l-4 border-[#008CC8] group">
                        <Quote className="absolute top-4 left-4 w-10 h-10 text-[#008CC8]/10 group-hover:text-[#008CC8]/20 transition-colors" />
                        <p className="text-xl md:text-2xl font-bold text-[#020617] italic relative z-10">
                            &ldquo;Converting real-world experience into future-ready solutions.&rdquo;
                        </p>
                    </div>
                </div>

                {/* Leaders Grid */}
                <div className="grid md:grid-cols-2 gap-10 lg:gap-12 max-w-5xl mx-auto">
                    {leaders.map((leader, index) => (
                        <div key={index} className="flex flex-col bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                            {/* Top Image Section */}
                            <div className="relative w-full h-[320px] md:h-[400px] overflow-hidden">
                                <Image
                                    src={leader.image}
                                    alt={leader.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    style={{ objectPosition: index === 0 ? '50% 80%' : '30% 30%' }}
                                    sizes="(max-w-768px) 100vw, 50vw"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/30 to-transparent opacity-40" />

                                {/* Floating Role Tag */}
                                <div className="absolute bottom-5 left-6">
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white shadow-lg ${index === 0 ? 'bg-[#008CC8]' : 'bg-[#F0960A]'}`}>
                                        {leader.role}
                                    </span>
                                </div>
                            </div>

                            {/* Bottom Content Section */}
                            <div className="p-6 md:p-8 flex flex-col flex-grow bg-white">
                                <h4 className="text-xl md:text-2xl font-black text-[#020617] mb-3 tracking-tight">
                                    {leader.name}
                                </h4>
                                <div className={`w-10 h-1 mb-4 rounded-full ${index === 0 ? 'bg-[#008CC8]' : 'bg-[#F0960A]'}`} />
                                <p className="text-slate-900 leading-relaxed text-sm font-bold opacity-100">
                                    {leader.bio}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
