import type { Metadata } from 'next';
import servicesData from '@/data/services.json';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return servicesData.map((service) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = servicesData.find((s) => s.slug === slug);

    if (!service) {
        return {
            title: 'Service Not Found | TRYITTECH LLP',
            description: 'The requested staffing service page was not found.',
        };
    }

    const title = `${service.title} | Expert ${service.title} Services in India | TRYITTECH LLP`;
    const description = `${service.shortDescription} TRYITTECH LLP delivers expert ${service.title} solutions for businesses across India. ${service.benefits.slice(0, 2).join(' ')} Contact us for a free consultation.`;
    const url = `https://www.tryittech.in/services/${service.slug}`;

    const keywordsMap: Record<string, string[]> = {
        'permanent-staffing': ['permanent staffing India', 'permanent hiring solutions', 'full-time recruitment India', 'executive search Hyderabad', 'direct hire recruitment India', 'IT permanent staffing'],
        'contract-staffing': ['contract staffing India', 'temporary staffing Hyderabad', 'contract to hire India', 'temp staffing solutions', 'contract workers India', 'short term staffing'],
        'offshore-it-staffing': ['offshore IT staffing India', 'offshore development center India', 'global capability center Hyderabad', 'offshore software team', 'nearshore staffing India', 'IT outsourcing Hyderabad'],
        'staff-augmentation': ['staff augmentation India', 'IT staff augmentation Hyderabad', 'dedicated development team India', 'augmented IT team', 'resource augmentation India', 'on-demand IT talent'],
        'managed-rpo': ['RPO India', 'recruitment process outsourcing Hyderabad', 'managed RPO solutions', 'enterprise RPO India', 'talent pipeline management', 'RPO company India'],
        'payroll-services': ['payroll services India', 'payroll outsourcing Hyderabad', 'payroll management India', 'statutory compliance India', 'PF ESI management India', 'employee payroll services'],
    };

    return {
        title,
        description,
        keywords: [
            ...(keywordsMap[slug] || []),
            `${service.title.toLowerCase()} TRYITTECH`,
            'staffing company India',
            'HR solutions Hyderabad',
            'TRYITTECH LLP services',
        ],
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            images: [
                {
                    url: service.image || '/images/clients/logoo.png',
                    width: 1200,
                    height: 630,
                    alt: `${service.title} - TRYITTECH LLP`,
                },
            ],
        },
        twitter: {
            title,
            description,
            images: [service.image || '/images/clients/logoo.png'],
        },
    };
}

export { default } from './ServiceDetailClient';
