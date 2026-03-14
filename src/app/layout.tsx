import type { Metadata } from "next";
import { Inter, Poppins, Quintessential } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const quintessential = Quintessential({
  variable: "--font-quintessential",
  weight: ["400"],
  subsets: ["latin"],
});

const BASE_URL = 'https://www.tryittech.in';

export const metadata: Metadata = {
  title: {
    default: "TRYITTECH LLP | #1 Staffing & IT Recruitment Company in Hyderabad, India",
    template: "%s | TRYITTECH LLP"
  },
  description: "TRYITTECH LLP is India's premier staffing & HR solutions company based in Hyderabad. We specialize in IT recruitment, permanent hiring, contract staffing, staff augmentation, RPO frameworks, offshore IT hub, and payroll services. Trusted by 150+ global clients. Get expert talent solutions today!",
  keywords: [
    "staffing company India",
    "IT recruitment agency Hyderabad",
    "HR solutions India",
    "staff augmentation services",
    "RPO solutions India",
    "payroll services Hyderabad",
    "offshore IT staffing India",
    "permanent staffing India",
    "contract staffing Hyderabad",
    "tech recruitment Hyderabad",
    "TRYITTECH LLP",
    "IT staffing company India",
    "talent acquisition India",
    "HR outsourcing India",
    "software recruitment agency",
    "workforce solutions India",
    "manpower solutions Hyderabad",
    "executive search India",
    "bulk hiring India",
    "recruitment process outsourcing India",
    "IT training Hyderabad",
    "EHS training India",
    "corporate training India",
    "staffing for startups India",
    "placement agency Hyderabad"
  ],
  authors: [{ name: "TRYITTECH LLP", url: BASE_URL }],
  creator: "TRYITTECH LLP",
  publisher: "TRYITTECH LLP",
  category: "Staffing & HR Solutions",
  classification: "Business Services",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
    languages: {
      'en-IN': BASE_URL,
      'en-US': BASE_URL,
    },
  },
  icons: {
    icon: [
      { url: "/images/clients/logoo.png", type: "image/png" },
    ],
    shortcut: "/images/clients/logoo.png",
    apple: "/images/clients/logoo.png",
  },
  openGraph: {
    title: "TRYITTECH LLP | #1 Staffing & IT Recruitment Company in Hyderabad, India",
    description: "India's leading staffing & HR company. IT recruitment, staff augmentation, RPO, payroll & offshore IT solutions. 150+ global clients. Based in Hyderabad.",
    url: BASE_URL,
    siteName: "TRYITTECH LLP",
    type: "website",
    locale: "en_IN",
    alternateLocale: ["en_US", "en_GB"],
    images: [
      {
        url: "/images/clients/logoo.png",
        width: 1200,
        height: 630,
        alt: "TRYITTECH LLP - Premier Staffing & HR Solutions India",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TRYITTECH LLP | #1 Staffing & IT Recruitment Company in India",
    description: "India's premier staffing company in Hyderabad. IT recruitment, staff augmentation, RPO, payroll & offshore IT solutions. 150+ global clients.",
    creator: "@tryittech",
    site: "@tryittech",
    images: ["/images/clients/logoo.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-token',
  },
  other: {
    'msapplication-TileColor': '#008CC8',
    'theme-color': '#008CC8',
    'geo.region': 'IN-TG',
    'geo.placename': 'Hyderabad, Telangana, India',
    'geo.position': '17.3850;78.4867',
    'ICBM': '17.3850, 78.4867',
    'business:contact_data:street_address': 'Hyderabad',
    'business:contact_data:locality': 'Hyderabad',
    'business:contact_data:region': 'Telangana',
    'business:contact_data:postal_code': '500001',
    'business:contact_data:country_name': 'India',
    'og:email': 'info@tryittech.in',
    'og:phone_number': '+91-40-1234-5678',
    'og:fax_number': '+91-40-1234-5679',
    'og:latitude': '17.385044',
    'og:longitude': '78.486671',
    'og:street_address': 'Hyderabad',
    'og:locality': 'Hyderabad',
    'og:region': 'Telangana',
    'og:postal_code': '500001',
    'og:country_name': 'India',
    'og:website': 'https://www.tryittech.in',
    'twitter:creator': '@tryittech',
    'twitter:site': '@tryittech',
    'DC.title': 'TRYITTECH LLP - Premier Staffing & HR Solutions Company in India',
    'DC.creator': 'TRYITTECH LLP',
    'DC.subject': 'Staffing, HR Solutions, IT Recruitment, Payroll Services',
    'DC.description': 'India\'s premier staffing & HR solutions company in Hyderabad. Specialized in IT recruitment, permanent hiring, contract staffing, staff augmentation, RPO, offshore IT hub, and payroll services.',
    'DC.publisher': 'TRYITTECH LLP',
    'DC.contributor': 'TRYITTECH LLP',
    'DC.language': 'en-IN',
    'DC.coverage': 'India',
    'DC.source': 'TRYITTECH LLP',
    'abstract': 'TRYITTECH LLP is India\'s premier staffing and HR solutions company providing IT recruitment, staff augmentation, RPO, payroll services and corporate training across Hyderabad and all of India.',
    'summary': 'Leading staffing and HR solutions company in Hyderabad, India. Expert IT recruitment, contract staffing, RPO, payroll services and training.',
  },
};

import StyledComponentsRegistry from "@/lib/registry";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.tryittech.in/#organization",
  "name": "TRYITTECH LLP",
  "legalName": "TRYITTECH LLP",
  "url": "https://www.tryittech.in",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.tryittech.in/images/clients/logoo.png",
    "width": 200,
    "height": 80
  },
  "image": "https://www.tryittech.in/images/clients/logoo.png",
  "description": "TRYITTECH LLP is India's premier staffing & HR solutions company based in Hyderabad. We specialize in IT recruitment, permanent hiring, contract staffing, staff augmentation, RPO, offshore IT hub, and payroll services.",
  "foundingDate": "2014",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": 50
  },
  "address": {
    "@type": "PostalAddress",
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
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "areaServed": ["IN", "US", "GB", "AU"],
      "availableLanguage": ["English", "Hindi", "Telugu"]
    }
  ],
  "sameAs": [
    "https://www.linkedin.com/company/tryittech",
    "https://twitter.com/tryittech"
  ],
  "knowsAbout": [
    "IT Staffing", "HR Solutions", "Staff Augmentation", "RPO",
    "Payroll Services", "Offshore IT Staffing", "Talent Acquisition",
    "IT Training", "EHS Training", "Corporate Training"
  ],
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  "serviceType": [
    "Permanent Hiring", "Contract Staffing", "Offshore IT Hub",
    "Staff Augmentation", "RPO Frameworks", "Payroll Services",
    "IT Training", "EHS Training", "General Training", "Kids & Language"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.tryittech.in/#website",
  "name": "TRYITTECH LLP",
  "url": "https://www.tryittech.in",
  "description": "India's premier staffing & HR solutions company — IT recruitment, staff augmentation, RPO, payroll & training services.",
  "publisher": {
    "@id": "https://www.tryittech.in/#organization"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.tryittech.in/services?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EmploymentAgency"],
  "@id": "https://www.tryittech.in/#localbusiness",
  "name": "TRYITTECH LLP",
  "legalName": "TRYITTECH LLP",
  "url": "https://www.tryittech.in",
  "logo": "https://www.tryittech.in/images/clients/logoo.png",
  "image": "https://www.tryittech.in/images/clients/logoo.png",
  "description": "India's premier staffing & HR solutions company in Hyderabad providing IT recruitment, staff augmentation, RPO, payroll services and corporate training.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Plot No. 123, Cyber Hills, Madhapur",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
    "postalCode": "500081",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "17.4485",
    "longitude": "78.3908"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "14:00"
    }
  ],
  "priceRange": "$",
  "currenciesAccepted": "INR,USD",
  "paymentAccepted": "Cash, Credit Card, Bank Transfer",
  "telephone": "+91-40-1234-5678",
  "email": "info@tryittech.in",
  "areaServed": [
    { "@type": "State", "name": "Telangana" },
    { "@type": "State", "name": "Andhra Pradesh" },
    { "@type": "Country", "name": "India" },
    { "@type": "Country", "name": "United States" },
    { "@type": "Country", "name": "United Kingdom" }
  ],
  "serviceType": [
    "Permanent Hiring",
    "Contract Staffing",
    "Staff Augmentation",
    "RPO Frameworks",
    "Offshore IT Hub",
    "Payroll Services",
    "IT Training",
    "EHS Training"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "150",
    "bestRating": "5"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "author": {
        "@type": "Organization",
        "name": "TCS"
      },
      "reviewBody": "TRYITTECH has been an excellent staffing partner for our organization."
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${quintessential.variable} antialiased font-inter`} suppressHydrationWarning>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  for(let registration of registrations) {
                    registration.unregister();
                    console.log('Service Worker unregistered');
                  }
                  if(registrations.length > 0) window.location.reload();
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
