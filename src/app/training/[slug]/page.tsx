import type { Metadata } from 'next';
import trainingsData from '@/data/trainings.json';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return trainingsData.map((training) => ({
        slug: training.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const training = trainingsData.find((t) => t.slug === slug);

    if (!training) {
        return {
            title: 'Training Not Found | TRYITTECH LLP',
            description: 'The requested training program page was not found.',
        };
    }

    const title = `${training.title} | Expert ${training.title} Courses in Hyderabad | TRYITTECH LLP`;
    const description = `${training.description} ${training.longDescription.slice(0, 200)}... Enroll in TRYITTECH LLP's ${training.title} program in Hyderabad. Expert instructors, industry-relevant curriculum & placement support.`;
    const url = `https://www.tryittech.in/training/${training.slug}`;

    const keywordsMap: Record<string, string[]> = {
        'it-training': [
            'IT training Hyderabad', 'software development course India', 'web development training Hyderabad',
            'data science course India', 'cloud computing training', 'AI machine learning course Hyderabad',
            'DevOps training India', 'cybersecurity course India', 'coding bootcamp Hyderabad', 'IT certification India'
        ],
        'general-training': [
            'general training Hyderabad', 'government exam coaching India', 'competitive exam preparation Hyderabad',
            'professional skills development India', 'communication skills training', 'leadership training Hyderabad',
            'interview preparation course India', 'personality development Hyderabad'
        ],
        'ehs-training': [
            'EHS training India', 'environment health safety training Hyderabad', 'fire safety training India',
            'workplace safety course India', 'CPR training Hyderabad', 'first aid certification India',
            'industrial safety training', 'OSHA training India', 'safety compliance training Hyderabad'
        ],
        'kids-language': [
            'kids training Hyderabad', 'phonics classes Hyderabad', 'public speaking kids India',
            'children skill development Hyderabad', 'language learning kids India', 'creative writing kids Hyderabad',
            'kids coding classes India', 'art workshop kids Hyderabad', 'math skills kids India'
        ],
    };

    return {
        title,
        description,
        keywords: [
            ...(keywordsMap[slug] || []),
            `${training.title.toLowerCase()} course`,
            'TRYITTECH training',
            'training programs Hyderabad',
            'skill development India',
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
                    url: training.image || '/images/clients/logoo.png',
                    width: 1200,
                    height: 630,
                    alt: `${training.title} Training - TRYITTECH LLP`,
                },
            ],
        },
        twitter: {
            title,
            description,
            images: [training.image || '/images/clients/logoo.png'],
        },
    };
}

export { default } from './TrainingDetailClient';
