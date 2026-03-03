import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Contact Us | TRYITTECH LLP - Get in Touch',
    description: 'Contact TRYITTECH LLP for staffing and HR solutions. Reach our team in Hyderabad, India for IT recruitment, staff augmentation, and workforce solutions.',
    keywords: ['Contact TRYITTECH', 'HR Solutions Hyderabad', 'IT Staffing Contact', 'Get in Touch', 'Staffing Company India', 'WhatsApp Contact', 'HR Consultation'],
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

