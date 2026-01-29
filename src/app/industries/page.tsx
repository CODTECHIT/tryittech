import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import Industries from '@/components/Industries';
import ClientTrust from '@/components/ClientTrust';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Industries We Serve | TRYITTECH LLP',
    description: 'Specialized recruitment and staffing services across Telecom, BFSI, IT, Pharma, and more.',
};

export default function IndustriesPage() {
    return (
        <main>
            <Navbar />
            <PageHeader
                title="Industries"
                subtitle="Bringing specialized vertical expertise to high-growth sectors across the Indian landscape."
            />
            <Industries />
            <ClientTrust />
            <Footer />
        </main>
    );
}
