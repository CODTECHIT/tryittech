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
  title: "TRYITTECH LLP | Staffing for What’s Next",
  description: "Pan-India staffing, offshore IT talent, and workforce solutions backed by 10+ years of US staffing expertise. Based in Hyderabad, India.",
  keywords: ["HR Staffing", "IT Recruitment", "Staff Augmentation", "RPO India", "Payroll Services", "TRYITTECH LLP"],
  authors: [{ name: "TRYITTECH LLP" }],
  icons: {
    icon: "/images/clients/logoo.png",
    shortcut: "/images/clients/logoo.png",
    apple: "/images/clients/logoo.png",
  },
  openGraph: {
    title: "TRYITTECH LLP | Staffing for What’s Next",
    description: "Pan-India recruitment and workforce solutions with global expertise.",
    url: "https://www.tryittech.in",
    siteName: "TRYITTECH LLP",
    type: "website",
  }
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
      </body>
    </html>
  );
}

