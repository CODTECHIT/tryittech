import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import TrainingGrid from '@/components/TrainingGrid';

export const metadata = {
    title: 'Training Programs | TRYITTECH LLP',
    description: 'Explore our comprehensive training programs including General Trainings, EHS, and Kids Skill Development.',
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
                        <h2 className="text-[#0d9488] font-bold uppercase tracking-widest text-sm mb-3">Skill Development</h2>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-[#0a192f] mb-6">Explore Our Courses</h3>
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


