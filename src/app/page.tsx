import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import IndustriesOrbit from '@/components/IndustriesOrbit';
import Services from '@/components/Services';
import TrainingSection from '@/components/TrainingSection';
import ClientTrust from '@/components/ClientTrust';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'TRYITTECH LLP | #1 Staffing & IT Recruitment Company in Hyderabad, India',
  description: "TRYITTECH LLP — India's #1 staffing & HR solutions company in Hyderabad. We offer IT recruitment, permanent hiring, contract staffing, staff augmentation, RPO, offshore IT hub, payroll services, and corporate training. 150+ global clients. 10+ years of expertise. Contact us today!",
  keywords: [
    'staffing company Hyderabad',
    'IT recruitment agency India',
    'HR solutions Hyderabad',
    'staff augmentation India',
    'RPO company India',
    'payroll outsourcing India',
    'offshore IT staffing Hyderabad',
    'TRYITTECH LLP',
    'permanent hiring India',
    'contract staffing India',
    'manpower solutions Hyderabad',
    'talent acquisition India',
    'IT training Hyderabad',
    'placement services India',
    'workforce solutions India',
  ],
  alternates: {
    canonical: 'https://www.tryittech.in',
  },
  openGraph: {
    title: 'TRYITTECH LLP | #1 Staffing & IT Recruitment Company in Hyderabad, India',
    description: "India's leading staffing & HR company in Hyderabad. IT recruitment, staff augmentation, RPO, payroll, training & offshore IT solutions. Trusted by 150+ global clients.",
    url: 'https://www.tryittech.in',
    images: [
      {
        url: '/images/clients/logoo.png',
        width: 1200,
        height: 630,
        alt: 'TRYITTECH LLP - Staffing & HR Solutions India',
      },
    ],
  },
};

const homepageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.tryittech.in/#professionalservice",
  "name": "TRYITTECH LLP",
  "image": "https://www.tryittech.in/images/clients/logoo.png",
  "url": "https://www.tryittech.in",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Hyderabad",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
    "postalCode": "500001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 17.385044,
    "longitude": 78.486671
  },
  "priceRange": "$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "150"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Staffing & HR Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Permanent Hiring" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Contract Staffing" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Staff Augmentation" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "RPO Frameworks" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Offshore IT Hub" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Payroll Services" } }
    ]
  }
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
      />
      <main className="min-h-screen bg-white">
        <Navbar />
        <Hero />
        <IndustriesOrbit />
        <Services />
        <TrainingSection />
        <ClientTrust />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
