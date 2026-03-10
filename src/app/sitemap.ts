import { MetadataRoute } from 'next';
import { getServices } from '@/lib/services';
import { getTrainings } from '@/lib/trainings';
import { getIndustries } from '@/lib/industries';

const BASE_URL = 'https://www.tryittech.in';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    // Fetch live data from DB for sitemap accuracy
    const [services, trainings, industries] = await Promise.all([
        getServices(),
        getTrainings(),
        getIndustries()
    ]);

    // Static core pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: now,
            changeFrequency: 'daily',
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

    // Dynamic service pages from DB
    const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
        url: `${BASE_URL}/services/${service.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // Dynamic training pages from DB
    const trainingPages: MetadataRoute.Sitemap = trainings.map((training) => ({
        url: `${BASE_URL}/training/${training.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    // Dynamic industry pages from DB
    const industryPages: MetadataRoute.Sitemap = industries.map((industry) => ({
        url: `${BASE_URL}/industries/${industry.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    return [...staticPages, ...servicePages, ...trainingPages, ...industryPages];
}
