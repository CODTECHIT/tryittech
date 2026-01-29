import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TRYITTECH LLP | Staffing for What’s Next",
  description: "Pan-India staffing, offshore IT talent, and workforce solutions backed by 10+ years of US staffing expertise. Based in Hyderabad, India.",
  keywords: ["HR Staffing", "IT Recruitment", "Staff Augmentation", "RPO India", "Payroll Services", "TRYITTECH LLP"],
  authors: [{ name: "TRYITTECH LLP" }],
  openGraph: {
    title: "TRYITTECH LLP | Staffing for What’s Next",
    description: "Pan-India recruitment and workforce solutions with global expertise.",
    url: "https://www.tryittech.in",
    siteName: "TRYITTECH LLP",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
