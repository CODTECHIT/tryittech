import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Contact Us | TRYITTECH LLP',
    description: 'Connect with our HR experts today to discuss your talent requirements.',
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
