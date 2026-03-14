'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';


interface DropdownItem {
  name: string;
  href: string;
  category?: string;
}

interface NavItem {
  name: string;
  href: string;
  dropdown?: DropdownItem[];
}

const podGradients = [
  'from-blue-500 to-cyan-500',
  'from-cyan-500 to-teal-500',
  'from-teal-500 to-green-600',
  'from-yellow-500 to-orange-500',
  'from-orange-500 to-red-500',
  'from-pink-500 to-purple-500',
  'from-purple-500 to-fuchsia-500',
  'from-violet-500 to-purple-600'
];

const staticNavItems: NavItem[] = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Services',
    href: '/services',
    dropdown: [
      { name: 'Permanent Hiring', href: '/services/permanent-staffing' },
      { name: 'Contract Staffing', href: '/services/contract-staffing' },
      { name: 'Staff Augmentation', href: '/services/staff-augmentation' },
      { name: 'Offshore IT Hub', href: '/services/offshore-it-staffing' },
      { name: 'RPO Frameworks', href: '/services/managed-rpo' },
      { name: 'Payroll Services', href: '/services/payroll-services' },
    ]
  },
  {
    name: 'Industries',
    href: '/industries',
    dropdown: [
      { name: 'Information Technology', href: '/industries/it', category: 'IT' },
      { name: 'Healthcare', href: '/industries/healthcare', category: 'Non-IT' },
      { name: 'BFSI', href: '/industries/bfsi', category: 'Non-IT' },
    ]
  },
  {
    name: 'Training',
    href: '/training',
    dropdown: [
      { name: 'IT Training', href: '/training/it-training' },
      { name: 'General Training', href: '/training/general-training' },
    ]
  },
  {
    name: 'Company',
    href: '/about',
    dropdown: [
      { name: 'About Us', href: '/about#about' },
      { name: 'Core Values', href: '/about#values' },
      { name: 'Leadership', href: '/about#leadership' },
      { name: 'Our Policies', href: '/about#policies' },
    ]
  },
  {
    name: 'Contact',
    href: '/contact',
    dropdown: [
      { name: 'Chat on WhatsApp', href: 'https://wa.me/919642717172?text=Hello%20TRYITTECH%20LLP%2C%20I%20am%20interested%20in%20your%20services.%20Can%20we%20discuss%20further%3F' },
    ]
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);
  const [navItems, setNavItems] = useState<NavItem[]>(staticNavItems);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [servicesRes, industriesRes, trainingsRes] = await Promise.all([
          fetch('/api/services', { cache: 'no-store' }).then(res => res.json()),
          fetch('/api/industries', { cache: 'no-store' }).then(res => res.json()),
          fetch('/api/trainings', { cache: 'no-store' }).then(res => res.json())
        ]);

        const updatedItems = staticNavItems.map(item => {
          if (item.name === 'Services' && Array.isArray(servicesRes)) {
            return {
              ...item,
              dropdown: servicesRes.map((s: { title: string; slug: string }) => ({ name: s.title, href: `/services/${s.slug}` }))
            };
          }
          if (item.name === 'Industries' && Array.isArray(industriesRes)) {
            return {
              ...item,
              dropdown: industriesRes.map((i: { name?: string; title?: string; slug: string; category?: string }) => ({
                name: i.name || i.title || 'Industry',
                href: `/industries/${i.slug}`,
                category: i.category || 'IT'
              }))
            } as NavItem;
          }
          if (item.name === 'Training' && Array.isArray(trainingsRes)) {
            return {
              ...item,
              dropdown: trainingsRes.map((t: { title: string; slug: string }) => ({ name: t.title, href: `/training/${t.slug}` }))
            };
          }
          return item;
        });

        setNavItems(updatedItems);
      } catch (error) {
        console.error('Failed to sync navbar dropdowns:', error);
      }
    };

    fetchDropdownData();
  }, []);

  // Determine navbar background based on scroll and page
  const navBg = (isHome && !isScrolled) ? 'bg-transparent py-5' : 'bg-white shadow-md py-3';

  const textColor = (isHome && !isScrolled) ? 'text-white' : 'text-[#020617]';
  const linkColor = (isHome && !isScrolled) ? 'text-white/90' : 'text-[#020617]';
  const dropdownBg = (isHome && !isScrolled) ? 'bg-white/10 backdrop-blur-md border border-white/10' : 'bg-white shadow-2xl border border-slate-100';
  const dropdownTextColor = (isHome && !isScrolled) ? 'text-white' : 'text-slate-700';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="group flex flex-col items-start" onClick={() => setIsOpen(false)}>
          <div className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/images/clients/logoo.png"
              alt="TRYITTECH LLP Logo"
              width={250}
              height={80}
              className="h-10 sm:h-12 md:h-20 w-auto transition-transform group-hover:scale-105"
              priority
            />
            <div className="flex flex-col">
              <span className={`text-lg sm:text-xl md:text-2xl font-black tracking-tight leading-none ${textColor}`}>
                TRYITTECH <span className="text-[#008CC8]">LLP</span>
              </span>
              <span className={`text-[8px] sm:text-[10px] font-bold tracking-[0.2em] uppercase mt-0.5 sm:mt-1 ${(isHome && !isScrolled) ? 'text-slate-400' : 'text-slate-500'}`}>
                Staffing for What&apos;s Next
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <div key={item.name} className="relative group px-4 py-2">
              <div className="flex items-center">
                <Link
                  href={item.href}
                  className={`nav-link flex items-center gap-1.5 py-1 font-bold transition-colors ${linkColor}`}
                >
                  {item.name}
                  {item.dropdown && (
                    <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
                  )}
                </Link>
              </div>

              {item.dropdown && (
                /* Mega Menu Dropdown */
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-4 z-50">
                  {/* Triangle Indicator */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-slate-100 shadow-[-5px_-5px_10px_-5px_rgba(0,0,0,0.05)]" />

                  <div className={`${item.name === 'Contact' ? 'w-[280px]' : 'w-[900px]'} rounded-2xl overflow-hidden p-10 ${dropdownBg} relative border border-slate-100/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)]`}>
                    {item.name === 'Industries' ? (
                      <div className={`grid ${Object.entries(item.dropdown.reduce((acc, ind) => {
                        const cat = ind.category || 'IT';
                        if (!acc[cat]) acc[cat] = [];
                        acc[cat].push(ind);
                        return acc;
                      }, {} as Record<string, DropdownItem[]>)).length > 2 ? 'grid-cols-3' : 'grid-cols-2'} gap-x-12 gap-y-16`}>
                        {Object.entries(item.dropdown.reduce((acc, ind) => {
                          const cat = ind.category || 'IT';
                          if (!acc[cat]) acc[cat] = [];
                          acc[cat].push(ind);
                          return acc;
                        }, {} as Record<string, DropdownItem[]>))
                          .sort(([a]) => a === 'IT' ? -1 : 1)
                          .map(([category, subs]) => (
                            <div key={category}>
                              <h3 className={`text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2 ${category === 'IT' ? 'text-[#008CC8]' : 'text-[#e11d48]'}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${category === 'IT' ? 'bg-[#008CC8]' : 'bg-[#e11d48]'}`} />
                                {category} Verticals
                              </h3>
                              <div className="grid grid-cols-1 gap-y-4">
                                {subs.map((subItem, sIdx) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    className={`group/link flex items-center gap-3 text-[14px] font-semibold transition-all ${dropdownTextColor} hover:text-[#008CC8]`}
                                  >
                                    <div className={`w-0.5 h-5 bg-gradient-to-b ${podGradients[sIdx % podGradients.length]} rounded-full transition-transform group-hover/link:scale-y-125 origin-center`} />
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className={`grid ${item.name === 'Contact' ? 'grid-cols-1' : 'grid-cols-4'} gap-y-7 gap-x-10`}>
                        {item.dropdown.map((subItem, sIdx) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`group/item flex items-center gap-3 text-[13.5px] font-semibold transition-all ${dropdownTextColor} hover:text-[#008CC8]`}
                          >
                            <div className={`w-0.5 h-5 bg-gradient-to-b ${podGradients[sIdx % podGradients.length]} rounded-full transition-transform group-hover/item:scale-y-125 origin-center`} />
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Footer decorative bar in dropdown */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#008CC8]/20 to-transparent" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className={textColor} /> : <Menu className={textColor} />}
        </button>
      </div>

      {/* Mobile Menu Sidebar */}
      <div className={`fixed inset-0 z-[60] bg-[#020617]/50 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)} />
      <div className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-white z-[70] shadow-2xl md:hidden transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col p-6 sm:p-8`}>
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <Image src="/images/clients/logoo.png" alt="TRYITTECH LLP Logo" width={180} height={60} className="h-16 w-auto" />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight leading-none text-[#020617]">
                TRYITTECH <span className="text-[#008CC8]">LLP</span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.1em] uppercase mt-1 text-slate-500">
                Staffing for What&apos;s Next
              </span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 text-slate-600">
            <X />
          </button>
        </div>
        <div className="flex flex-col space-y-4 overflow-y-auto pb-8">
          {navItems.map((item) => (
            <div key={item.name} className="flex flex-col border-b border-slate-50">
              <div className="flex justify-between items-center">
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-4 text-lg font-bold text-slate-700"
                >
                  {item.name}
                </Link>
                {item.dropdown && (
                  <button
                    onClick={() => setActiveMobileMenu(activeMobileMenu === item.name ? null : item.name)}
                    className="p-4"
                  >
                    <ChevronDown className={`w-5 h-5 transition-transform ${activeMobileMenu === item.name ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>
              {item.dropdown && (
                <div className={`flex flex-col space-y-2 pl-4 transition-all duration-300 ${activeMobileMenu === item.name ? 'max-h-[1000px] mb-4 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  {item.name === 'Industries' ? (
                    <>
                      {Object.entries(item.dropdown.reduce((acc, ind) => {
                        const cat = ind.category || 'IT';
                        if (!acc[cat]) acc[cat] = [];
                        acc[cat].push(ind);
                        return acc;
                      }, {} as Record<string, DropdownItem[]>))
                        .sort(([a]) => a === 'IT' ? -1 : 1)
                        .map(([category, subs]) => (
                          <div key={category} className="mt-4 first:mt-2">
                            <span className={`text-[10px] font-black uppercase tracking-widest ${category === 'IT' ? 'text-[#008CC8]' : 'text-[#e11d48]'}`}>
                              {category} Verticals
                            </span>
                            <div className="flex flex-col space-y-2 mt-2">
                              {subs.map((subItem, sIdx) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  onClick={() => setIsOpen(false)}
                                  className="py-2 text-slate-500 font-medium hover:text-[#008CC8] flex items-center gap-3"
                                >
                                  <div className={`w-1 h-3 bg-gradient-to-b ${podGradients[sIdx % podGradients.length]} rounded-full`} />
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                    </>
                  ) : (
                    item.dropdown.map((subItem, sIdx) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        onClick={() => setIsOpen(false)}
                        className="py-2 text-slate-500 font-medium hover:text-[#008CC8] flex items-center gap-3"
                      >
                        <div className={`w-1 h-3 bg-gradient-to-b ${podGradients[sIdx % podGradients.length]} rounded-full`} />
                        {subItem.name}
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav >
  );
}

