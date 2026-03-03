import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import Industries from '@/components/Industries';
import ClientTrust from '@/components/ClientTrust';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Industries We Serve | IT, Healthcare, BFSI, Telecom & More | TRYITTECH LLP',
    description: 'TRYITTECH LLP provides specialized staffing & workforce solutions across 10+ industry verticals — IT & Technology, Healthcare, BFSI (Banking & Finance), Telecom, Retail, Manufacturing, Energy, Pharma, and more. Deep domain expertise for high-growth sectors across India.',
    keywords: [
        'industries TRYITTECH serves',
        'IT sector staffing India',
        'healthcare recruitment India',
        'BFSI staffing Hyderabad',
        'banking finance insurance recruitment',
        'telecom staffing India',
        'manufacturing recruitment India',
        'retail staffing solutions',
        'pharma recruitment India',
        'energy sector staffing',
        'market verticals staffing India',
        'domain expertise recruitment India',
        'industry specific hiring India',
        'vertical staffing solutions',
        'niche industry recruitment Hyderabad',
    ],
    alternates: {
        canonical: 'https://www.tryittech.in/industries',
    },
    openGraph: {
        title: 'Industries We Serve | IT, Healthcare, BFSI, Telecom & More | TRYITTECH LLP',
        description: 'Specialized staffing across IT, Healthcare, BFSI, Telecom, Retail, Manufacturing & more. Deep domain expertise for high-growth sectors in India.',
        url: 'https://www.tryittech.in/industries',
        images: [{ url: '/images/clients/logoo.png', width: 1200, height: 630, alt: 'Industries TRYITTECH LLP Serves' }],
    },
    twitter: {
        title: 'Industries We Serve | TRYITTECH LLP — IT, Healthcare, BFSI & More',
        description: 'Specialized staffing for IT, Healthcare, BFSI, Telecom, Manufacturing & more in India. Domain experts in every vertical.',
    },
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
