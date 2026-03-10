import type { Metadata } from 'next';
import { getIndustries, getIndustryBySlug, Industry } from '@/lib/industries';
import IndustryDetailClient from './IndustryDetailClient';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const industries = await getIndustries();
    return industries.map((industry: Industry) => ({
        slug: industry.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const industry = await getIndustryBySlug(slug);

    if (!industry) {
        return {
            title: 'Industry Not Found | TRYITTECH LLP',
            description: 'The requested industry page was not found.',
        };
    }

    const title = `${industry.name} Staffing & Recruitment | Domain Experts | TRYITTECH LLP`;
    const description = `TRYITTECH LLP provides specialized ${industry.name} staffing & recruitment solutions in India. ${industry.overview.slice(0, 200)}... 150+ global clients. Expert talent acquisition for ${industry.name} sector.`;
    const url = `https://www.tryittech.in/industries/${industry.slug}`;

    const keywordsMap: Record<string, string[]> = {
        'it': ['IT staffing India', 'software engineer recruitment', 'cloud architect staffing', 'DevOps hiring India', 'AI ML talent India', 'tech recruitment Hyderabad'],
        'healthcare': ['healthcare staffing India', 'medical recruitment India', 'healthtech talent', 'clinical staffing Hyderabad', 'hospital recruitment India'],
        'bfsi': ['BFSI staffing India', 'banking recruitment India', 'fintech hiring India', 'financial services talent', 'insurance recruitment India'],
        'automotive': ['automotive staffing India', 'EV engineer recruitment', 'automobile talent India', 'automotive manufacturing hiring'],
        'logistics': ['logistics staffing India', 'supply chain recruitment', 'warehouse staffing India', 'freight talent India'],
        'non-it': ['non-IT staffing India', 'executive recruitment India', 'leadership hiring Hyderabad', 'management staffing India'],
        'retail': ['retail staffing India', 'ecommerce recruitment India', 'retail talent Hyderabad', 'omnichannel retail hiring'],
        'telecom': ['telecom staffing India', '5G engineer recruitment India', 'networking talent India', 'telecom recruitment Hyderabad'],
        'manufacturing': ['manufacturing staffing India', 'industrial recruitment India', 'factory talent Hyderabad', 'automation engineer India'],
        'bpo': ['BPO staffing India', 'customer support hiring India', 'BPO recruitment Hyderabad', 'outsourcing talent India'],
    };

    return {
        title,
        description,
        keywords: [
            ...(keywordsMap[slug] || []),
            `${industry.name.toLowerCase()} talent acquisition`,
            'staffing company India',
            'TRYITTECH LLP industries',
            'vertical staffing India',
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
                    url: industry.image || '/images/clients/logoo.png',
                    width: 1200,
                    height: 630,
                    alt: `${industry.name} Staffing - TRYITTECH LLP`,
                },
            ],
        },
        twitter: {
            title,
            description,
            images: [industry.image || '/images/clients/logoo.png'],
        },
    };
}

export default async function IndustryPage({ params }: Props) {
    const { slug } = await params;
    const industry = await getIndustryBySlug(slug);

    if (!industry) {
        notFound();
    }

    return <IndustryDetailClient initialData={industry} slug={slug} />;
}
