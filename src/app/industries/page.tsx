import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import Industries from '@/components/Industries';
import ClientTrust from '@/components/ClientTrust';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Industries We Serve | TRYITTECH LLP - Market Vertices We Support',
    description: 'TRYITTECH LLP provides specialized staffing solutions across IT, Healthcare, BFSI, Telecom, Retail, Manufacturing, and more industries in India.',
    keywords: ['Industries We Serve', 'IT Staffing', 'Healthcare Recruitment', 'BFSI Staffing', 'Telecom Recruitment', 'Manufacturing Staffing', 'Retail Hiring', 'Market Verticals India'],
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

