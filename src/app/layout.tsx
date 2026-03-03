import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: "TRYITTECH LLP | Premier Staffing & HR Solutions India",
    template: "%s | TRYITTECH LLP"
  },
  description: "TRYITTECH LLP is a leading staffing and HR solutions company in India. We provide IT recruitment, staff augmentation, RPO, payroll services, and offshore IT talent solutions. Based in Hyderabad, serving Pan-India and global clients with 10+ years of expertise.",
  keywords: [
    "HR Staffing India",
    "IT Recruitment Agency",
    "Staff Augmentation Services",
    "RPO Solutions India",
    "Payroll Services",
    "Offshore IT Staffing",
    "Permanent Hiring",
    "Contract Staffing",
    "Tech Recruitment Hyderabad",
    "TRYITTECH LLP",
    "Staffing for What's Next",
    "IT Staffing Company India",
    "Talent Acquisition",
    "HR Outsourcing India",
    "Software Recruitment"
  ],
  authors: [{ name: "TRYITTECH LLP" }],
  creator: "TRYITTECH LLP",
  publisher: "TRYITTECH LLP",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.tryittech.in'),
  alternates: {
    canonical: 'https://www.tryittech.in',
    languages: {
      'en': 'https://www.tryittech.in',
    },
  },
  icons: {
    icon: "/images/clients/logoo.png",
    shortcut: "/images/clients/logoo.png",
    apple: "/images/clients/logoo.png",
  },
  openGraph: {
    title: "TRYITTECH LLP | Premier Staffing & HR Solutions India",
    description: "Leading staffing and HR solutions company in India. IT recruitment, staff augmentation, RPO, payroll services, and offshore IT talent solutions.",
    url: "https://www.tryittech.in",
    siteName: "TRYITTECH LLP",
    type: "website",
    locale: "en_IN",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TRYITTECH LLP | Premier Staffing & HR Solutions India",
    description: "Leading staffing and HR solutions company in India. IT recruitment, staff augmentation, RPO, payroll services.",
    creator: "@tryittech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import StyledComponentsRegistry from "@/lib/registry";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} antialiased font-inter`}>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
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
