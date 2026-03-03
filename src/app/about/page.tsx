import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import AboutSection from '@/components/AboutSection';
import CoreValues from '@/components/CoreValues';
import Leadership from '@/components/Leadership';
import Policies from '@/components/Policies';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'About Us | TRYITTECH LLP — Leading Staffing & HR Company in India',
    description: 'Learn about TRYITTECH LLP — India\'s premier staffing & HR company based in Hyderabad with 10+ years of expertise. Discover our story, mission, leadership team, core values, and commitment to transforming talent acquisition across IT and Non-IT sectors.',
    keywords: [
        'about TRYITTECH LLP',
        'staffing company Hyderabad',
        'HR solutions company India',
        'TRYITTECH history',
        'IT staffing leadership team',
        'core values staffing India',
        'HR company Hyderabad',
        'talent acquisition experts India',
        'recruitment agency Hyderabad',
        'about us staffing firm India',
    ],
    alternates: {
        canonical: 'https://www.tryittech.in/about',
    },
    openGraph: {
        title: 'About TRYITTECH LLP | Leading Staffing & HR Company in India',
        description: 'India\'s premier staffing company in Hyderabad — 10+ years of expertise in IT recruitment, staff augmentation, and comprehensive HR solutions. Meet our leadership team.',
        url: 'https://www.tryittech.in/about',
        images: [{ url: '/images/clients/logoo.png', width: 1200, height: 630, alt: 'About TRYITTECH LLP' }],
    },
    twitter: {
        title: 'About TRYITTECH LLP | Leading Staffing & HR Company in India',
        description: 'India\'s premier staffing company — 10+ years of IT recruitment & HR expertise. Meet the leadership team driving innovation in talent acquisition.',
    },
};

export default function AboutPage() {
    return (
        <main>
            <Navbar />
            <PageHeader
                title="Company"
                subtitle={`"We don't just fill roles\u2014we build futures by connecting the right talent with the right opportunities."`}
            />
            <AboutSection />
            <CoreValues />
            <Leadership />
            <Policies />
            <Footer />
        </main>
    );
}
