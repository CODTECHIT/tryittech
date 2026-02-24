import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Industries from '@/components/Industries';
import Services from '@/components/Services';
import TrainingSection from '@/components/TrainingSection';
import ClientTrust from '@/components/ClientTrust';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Industries />
      <Services />
      <TrainingSection />
      <ClientTrust />
      <Contact />
      <Footer />
    </main>
  );
}
