import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import Services from '@/components/Services';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Our Services | TRYITTECH LLP',
    description: 'Permanent Staffing, Contract Staffing, Offshore IT, Staff Augmentation, RPO, and Payroll Services.',
};

export default function ServicesPage() {
    return (
        <main>
            <Navbar />
            <PageHeader
                title="Our Services"
                subtitle="End-to-end workforce solutions designed to scale with your business needs and global standards."
            />
            <Services />
            <Footer />
        </main>
    );
}
