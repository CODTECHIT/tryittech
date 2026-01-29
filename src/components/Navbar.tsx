'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine navbar background based on scroll and page
  const navBg = isHome
    ? (isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5')
    : 'bg-[#0a192f] shadow-md py-3';

  const textColor = isHome && !isScrolled ? 'text-white' : (isHome ? 'text-[#0a192f]' : 'text-white');
  const linkColor = isHome && !isScrolled ? 'text-white/90' : (isHome ? 'text-slate-600' : 'text-slate-300 hover:text-white');

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className={`text-2xl font-bold tracking-tighter ${textColor}`}>
            TRYIT<span className="text-[#0d9488]">TECH</span> <span className={`text-xs font-normal border-l ml-2 pl-2 ${isHome && !isScrolled ? 'border-white/30 text-white/70' : (isHome ? 'border-slate-300 text-slate-500' : 'border-white/20 text-slate-400')}`}>LLP</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          <Link href="/about" className={`nav-link ${linkColor}`}>About Us</Link>
          <Link href="/industries" className={`nav-link ${linkColor}`}>Industries</Link>
          <Link href="/services" className={`nav-link ${linkColor}`}>Services</Link>
          <Link href="/contact" className={`nav-link ${linkColor}`}>Contact</Link>
          <Link href="/contact" className={`px-6 py-2.5 rounded font-bold transition-all shadow-md ${isHome && !isScrolled ? 'bg-white text-[#0a192f] hover:bg-[#0d9488] hover:text-white' : 'bg-[#0d9488] text-white hover:bg-[#0a192f]'}`}>
            Hire Talent
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className={textColor} /> : <Menu className={textColor} />}
        </button>
      </div>

      {/* Mobile Menu Sidebar */}
      <div className={`fixed inset-0 z-[60] bg-[#0a192f]/50 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)} />
      <div className={`fixed top-0 right-0 h-full w-80 bg-white z-[70] shadow-2xl md:hidden transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col p-8`}>
        <div className="flex justify-between items-center mb-12">
          <span className="text-xl font-bold text-[#0a192f]">TRYIT<span className="text-[#0d9488]">TECH</span></span>
          <button onClick={() => setIsOpen(false)} className="p-2 text-slate-600">
            <X />
          </button>
        </div>
        <div className="flex flex-col space-y-6 text-lg font-medium text-slate-600">
          <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-[#0d9488]">About Us</Link>
          <Link href="/industries" onClick={() => setIsOpen(false)} className="hover:text-[#0d9488]">Industries</Link>
          <Link href="/services" onClick={() => setIsOpen(false)} className="hover:text-[#0d9488]">Services</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-[#0d9488]">Contact</Link>
          <hr className="border-slate-100" />
          <Link href="/contact" onClick={() => setIsOpen(false)} className="bg-[#0a192f] text-white text-center py-4 rounded font-bold">Hire Talent</Link>
        </div>
      </div>
    </nav>
  );
}
