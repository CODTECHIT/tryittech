import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import AboutSection from '@/components/AboutSection';
import CoreValues from '@/components/CoreValues';
import Leadership from '@/components/Leadership';
import Policies from '@/components/Policies';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'About Us | TRYITTECH LLP - Leading Staffing Company India',
    description: 'Learn about TRYITTECH LLP, a premier staffing and HR solutions company in India with 10+ years of expertise in IT recruitment, staff augmentation, and workforce solutions.',
    keywords: ['About TRYITTECH', 'Staffing Company India', 'HR Solutions Hyderabad', 'Company History', 'Leadership Team', 'Core Values', 'Staffing Expertise'],
};

export default function AboutPage() {
    return (
        <main>
            <Navbar />
            <PageHeader
                title="Company"
                subtitle="“We don’t just fill roles—we build futures by connecting the right talent with the right opportunities.”"
            />
            <AboutSection />
            <CoreValues />
            <Leadership />
            <Policies />
            <Footer />
        </main>
    );
}






