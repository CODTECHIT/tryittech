import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import AboutSection from '@/components/AboutSection';
import CoreValues from '@/components/CoreValues';
import Leadership from '@/components/Leadership';
import Policies from '@/components/Policies';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'About Us | TRYITTECH LLP',
    description: 'Meet the visionaries behind TRYITTECH LLP, and review our corporate policies including Human Rights, Ethics, and Data Protection.',
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





