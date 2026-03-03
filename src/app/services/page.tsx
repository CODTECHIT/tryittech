import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import Services from '@/components/Services';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Our Services | TRYITTECH LLP - IT Staffing & HR Solutions',
    description: 'Explore TRYITTECH LLP comprehensive staffing services including permanent hiring, contract staffing, staff augmentation, offshore IT hub, RPO frameworks, and payroll services in India.',
    keywords: ['Staffing Services', 'IT Staffing', 'Permanent Hiring', 'Contract Staffing', 'Staff Augmentation', 'Offshore IT Hub', 'RPO', 'Payroll Services', 'HR Solutions India'],
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

