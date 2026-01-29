import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Industries from '@/components/Industries';
import Services from '@/components/Services';
import ClientTrust from '@/components/ClientTrust';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Industries />
      <Services />
      <ClientTrust />
      <Contact />
      <Footer />
    </main>
  );
}
