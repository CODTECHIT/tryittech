import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import About from '@/components/About';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'About Us | TRYITTECH LLP',
    description: 'Learn about TryITTech LLP, our leadership, and our 10+ years of US staffing expertise.',
};

export default function AboutPage() {
    return (
        <main>
            <Navbar />
            <PageHeader
                title="About Us"
                subtitle="A strategic extension of proven global excellence, delivering future-ready human capital solutions."
            />
            <About />
            <Footer />
        </main>
    );
}
