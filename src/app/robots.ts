import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.tryittech.in';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/ADMINTRYITTECH-LLP/',
                    '/api/',
                    '/_next/',
                    '/private/',
                ],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: [
                    '/ADMINTRYITTECH-LLP/',
                    '/api/',
                ],
            },
            {
                userAgent: 'Bingbot',
                allow: '/',
                disallow: [
                    '/ADMINTRYITTECH-LLP/',
                    '/api/',
                ],
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
        host: BASE_URL,
    };
}
