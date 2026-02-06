import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Training & Development | TRYITTECH LLP',
    description: 'Empowering talent through specialized training and skill development programs.',
};

export default function TrainingPage() {
    return (
        <main>
            <Navbar />
            <PageHeader
                title="Training"
                subtitle="Upskilling the next generation of professionals with industry-leading expertise."
            />

            <section className="section-padding bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0a192f] mb-8">Coming Soon</h2>
                        <p className="text-lg text-slate-600 leading-relaxed mb-12">
                            We are currently developing comprehensive training modules designed to bridge the gap between academic knowledge and industry requirements. Our programs will focus on technical excellence, leadership skills, and global standards.
                        </p>
                        <div className="inline-block px-8 py-4 bg-[#0d9488] text-white font-bold rounded-sm shadow-lg">
                            Stay Tuned for Updates
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
