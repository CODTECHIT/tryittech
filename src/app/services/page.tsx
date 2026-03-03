import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import Services from '@/components/Services';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Staffing & HR Services | Permanent Hiring, Contract Staffing, RPO & More | TRYITTECH LLP',
    description: 'Explore TRYITTECH LLP\'s comprehensive staffing & HR services: Permanent Hiring, Contract Staffing, Staff Augmentation, Offshore IT Hub, RPO Frameworks, and Payroll Services. End-to-end workforce solutions for businesses across India and globally.',
    keywords: [
        'staffing services India',
        'IT staffing solutions',
        'permanent hiring India',
        'contract staffing Hyderabad',
        'staff augmentation services India',
        'offshore IT hub India',
        'RPO frameworks India',
        'recruitment process outsourcing India',
        'payroll services Hyderabad',
        'HR outsourcing India',
        'workforce solutions India',
        'manpower services Hyderabad',
        'temporary staffing India',
        'executive recruitment India',
        'bulk hiring India',
    ],
    alternates: {
        canonical: 'https://www.tryittech.in/services',
    },
    openGraph: {
        title: 'Staffing & HR Services | TRYITTECH LLP — Permanent, Contract, RPO & More',
        description: 'TRYITTECH LLP offers 6 end-to-end staffing & HR solutions: Permanent Hiring, Contract Staffing, Staff Augmentation, Offshore IT Hub, RPO, and Payroll Services. Serving 150+ global clients.',
        url: 'https://www.tryittech.in/services',
        images: [{ url: '/images/clients/logoo.png', width: 1200, height: 630, alt: 'TRYITTECH LLP Services' }],
    },
    twitter: {
        title: 'HR & Staffing Services | TRYITTECH LLP India',
        description: '6 end-to-end staffing services: Permanent Hiring, Contract Staffing, Staff Augmentation, Offshore IT Hub, RPO & Payroll. 150+ global clients.',
    },
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
