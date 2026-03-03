import { MetadataRoute } from 'next';
import trainingsData from '@/data/trainings.json';
import servicesData from '@/data/services.json';
import industriesData from '@/data/industries.json';

const BASE_URL = 'https://www.tryittech.in';

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/services`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/industries`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/training`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ];

    // Dynamic service pages
    const servicePages: MetadataRoute.Sitemap = servicesData.map((service) => ({
        url: `${BASE_URL}/services/${service.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    // Dynamic training pages
    const trainingPages: MetadataRoute.Sitemap = trainingsData.map((training) => ({
        url: `${BASE_URL}/training/${training.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // Dynamic industry pages
    const industryPages: MetadataRoute.Sitemap = industriesData.map((industry) => ({
        url: `${BASE_URL}/industries/${industry.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...staticPages, ...servicePages, ...trainingPages, ...industryPages];
}
