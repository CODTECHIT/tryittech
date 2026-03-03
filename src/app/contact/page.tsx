import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Contact TRYITTECH LLP | Get Expert Staffing & HR Solutions in Hyderabad',
    description: 'Contact TRYITTECH LLP for expert staffing & HR solutions in Hyderabad, India. Reach our team via WhatsApp or email for IT recruitment, staff augmentation, contract staffing, RPO, payroll services, and corporate training. We respond within 24 hours!',
    keywords: [
        'contact TRYITTECH LLP',
        'staffing company contact Hyderabad',
        'IT recruitment inquiry Hyderabad',
        'HR solutions contact India',
        'staffing agency Hyderabad phone',
        'hire IT professionals India',
        'get talent solutions India',
        'staffing consultation India',
        'WhatsApp HR India',
        'recruitment inquiry Hyderabad',
    ],
    alternates: {
        canonical: 'https://www.tryittech.in/contact',
    },
    openGraph: {
        title: 'Contact TRYITTECH LLP | Staffing & HR Solutions Hyderabad',
        description: 'Get in touch with TRYITTECH LLP for IT recruitment, staff augmentation, RPO, payroll & training. Fast response — contact us via WhatsApp or email today!',
        url: 'https://www.tryittech.in/contact',
        images: [{ url: '/images/clients/logoo.png', width: 1200, height: 630, alt: 'Contact TRYITTECH LLP' }],
    },
    twitter: {
        title: 'Contact TRYITTECH LLP | HR & Staffing Solutions Hyderabad',
        description: 'IT recruitment, staff augmentation, RPO, payroll & training. Contact TRYITTECH LLP for expert HR solutions in Hyderabad.',
    },
};

export default function ContactPage() {
    return (
        <main>
            <Navbar />
            <PageHeader
                title="Contact Us"
                subtitle="Initialize your strategic consultation today and find the talent that propels your business forward."
            />
            <Contact />
            <Footer />
        </main>
    );
}
