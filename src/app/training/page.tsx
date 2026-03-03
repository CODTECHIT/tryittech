import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import TrainingGrid from '@/components/TrainingGrid';

export const metadata: Metadata = {
    title: 'Training Programs | IT, EHS, General & Kids Skills Training in Hyderabad | TRYITTECH LLP',
    description: 'TRYITTECH LLP offers expert-led training programs in Hyderabad: IT Training (Web Dev, Data Science, Cloud, AI/ML), EHS Safety Training, General & Competitive Exam Preparation, and Kids Language & Skills Development. Enroll today and launch your career!',
    keywords: [
        'IT training Hyderabad',
        'software training institute Hyderabad',
        'EHS safety training India',
        'corporate training Hyderabad',
        'web development course Hyderabad',
        'data science training India',
        'cloud computing training Hyderabad',
        'AI machine learning training India',
        'government exam preparation Hyderabad',
        'competitive exam coaching India',
        'kids skill development Hyderabad',
        'phonics classes Hyderabad',
        'general training programs India',
        'professional development courses India',
        'online training programs India',
        'skill development courses Hyderabad',
        'DevOps training India',
        'cybersecurity training Hyderabad',
    ],
    alternates: {
        canonical: 'https://www.tryittech.in/training',
    },
    openGraph: {
        title: 'Training Programs | IT, EHS, General & Kids Skills | TRYITTECH LLP Hyderabad',
        description: 'Expert-led training programs in Hyderabad: IT (Web Dev, Cloud, AI/ML), EHS Safety, Competitive Exam Prep, and Kids Development. Enroll with TRYITTECH LLP today!',
        url: 'https://www.tryittech.in/training',
        images: [{ url: '/images/clients/logoo.png', width: 1200, height: 630, alt: 'TRYITTECH LLP Training Programs' }],
    },
    twitter: {
        title: 'Training Programs | IT, EHS & Skills Training | TRYITTECH LLP',
        description: 'Expert-led training in Hyderabad: IT, EHS Safety, Competitive Exams, Kids Development. Enroll today!',
    },
};

export default function TrainingPage() {
    return (
        <main className="bg-slate-50 min-h-screen flex flex-col">
            <Navbar />
            <PageHeader
                title="Our Training Programs"
                subtitle="Empowering individuals with specialized skills for every stage of life."
            />

            <section className="section-padding py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-[#008CC8] font-bold uppercase tracking-widest text-sm mb-3">Skill Development</h2>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-[#020617] mb-6">Explore Our Courses</h3>
                        <p className="text-slate-600 text-lg">
                            From professional certifications to early childhood development, we offer distinct training modules designed for success.
                        </p>
                    </div>

                    <TrainingGrid />
                </div>
            </section>

            <Footer />
        </main>
    );
}
