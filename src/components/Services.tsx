'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Briefcase } from 'lucide-react';
import { Service } from '@/lib/services';

const DEFAULT_SERVICE_IMAGE = 'https://img.freepik.com/free-photo/businesspeople-working-finance-accounting-office_23-2148908915.jpg?w=740';

function getSafeImageUrl(url: string | undefined | null): string {
  if (!url || url.trim() === '') return DEFAULT_SERVICE_IMAGE;
  try {
    new URL(url);
    return url;
  } catch {
    return DEFAULT_SERVICE_IMAGE;
  }
}

const ACCENT_GRADIENTS = [
  { main: "#F97316", light: "#FDBA74" }, // Orange
  { main: "#10B981", light: "#6EE7B7" }, // Emerald
  { main: "#EC4899", light: "#F9A8D4" }, // Pink
  { main: "#F59E0B", light: "#FCD34D" }, // Amber
  { main: "#6366F1", light: "#A5B4FC" }, // Indigo
  { main: "#A855F7", light: "#D8B4FE" }, // Purple
  { main: "#06B6D4", light: "#67E8F9" }  // Cyan
];

const ServiceCard = ({ service }: { service: Service }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Use a stable hash of service.id for consistent color selection across SSR/client
  // This avoids hydration mismatches that occur with index-based color selection
  const colorIndex = React.useMemo(() => {
    if (!service.id) return 0;
    // Simple hash function to get consistent index from string
    let hash = 0;
    for (let i = 0; i < service.id.length; i++) {
      hash = ((hash << 5) - hash) + service.id.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash) % ACCENT_GRADIENTS.length;
  }, [service.id]);

  const colors = ACCENT_GRADIENTS[colorIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <CardWrapper $isFlipped={isFlipped} $mainColor={colors.main} $lightColor={colors.light}>
      <div className="card" onClick={handleFlip}>
        <div className="card-inner">
          {/* FRONTSIDE */}
          <div className="card-front">
            <div className="img-container">
              <Image
                src={getSafeImageUrl(service.image)}
                alt={service.title}
                fill
                className="object-cover"
              />
              <div className="overlay" />
            </div>

            <div className="content">
              <div className="icon-badge">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="card-title text-lg md:text-xl">{service.title}</h3>
            </div>

            {/* Shine effect */}
            <div className="shine-effect" />
          </div>

          {/* BACKSIDE */}
          <div className="card-back">
            <div className="back-content">
              <span className="back-label">Global Service</span>
              <h4 className="back-title text-xl md:text-2xl">{service.title}</h4>
              <p className="back-desc">{service.shortDescription}</p>
              <div className="arrow-btn font-black">
                View Details <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};

const CardWrapper = styled.div<{ $isFlipped: boolean; $mainColor: string; $lightColor: string }>`
  .card {
    width: 100%;
    height: 320px;
    @media (min-width: 768px) {
      height: 380px;
    }
    perspective: 1000px;
    cursor: pointer;
    
    /* Colored Glow/Shadow - Darkened */
    box-shadow: 0 10px 40px -5px ${props => props.$mainColor}77;
    border-radius: 20px;
    transition: all 0.5s ease;
  }

  .card:hover {
    transform: translateY(-8px);
    box-shadow: 0 30px 60px -10px ${props => props.$mainColor}bb;
  }

  .card-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    transform: ${props => props.$isFlipped ? "rotateY(180deg)" : "none"};
  }

  @media (min-width: 1024px) {
    .card:hover .card-inner {
      transform: rotateY(180deg);
    }
  }

  .card-front, .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 20px;
    overflow: hidden;
    
    /* Gradient Border Implementation */
    padding: 2px;
    background: linear-gradient(135deg, ${props => props.$mainColor}, ${props => props.$lightColor});
  }

  /* Inner containers for the border effect */
  .card-front > div:first-child, .card-back > div:first-child {
     /* This matches the internal background to keep the border looking like a line */
  }

  .img-container {
    position: absolute;
    inset: 2px;
    border-radius: 18px;
    overflow: hidden;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, #020617 0%, transparent 100%);
    opacity: 0.5;
  }

  .content {
    position: relative;
    height: 100%;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 15px;
    z-index: 2;
  }

  .icon-badge {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, ${props => props.$mainColor}, ${props => props.$lightColor});
    color: white;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .card-title {
    color: white;
    font-family: var(--font-quintessential), cursive;
    font-weight: 800;
    line-height: 1.3;
    letter-spacing: 0.02em;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  }

  .card-back {
    transform: rotateY(180deg);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2px;
  }
  
  .back-content {
    background: #020617;
    width: 100%;
    height: 100%;
    border-radius: 18px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .back-label {
    background: linear-gradient(135deg, ${props => props.$mainColor}, ${props => props.$lightColor});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 10px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    margin-bottom: 20px;
  }

  .back-title {
    color: white;
    font-family: var(--font-quintessential), cursive;
    font-weight: 800;
    margin-bottom: 15px;
  }

  .back-desc {
    color: rgba(255, 255, 255, 0.95);
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: 30px;
    font-weight: 600;
  }

  .arrow-btn {
    display: flex;
    align-items: center;
    color: ${props => props.$mainColor};
    font-weight: 800;
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 0.1em;
    transition: all 0.3s ease;
  }

  .arrow-btn:hover {
    gap: 10px;
    transform: translateX(5px);
  }

  /* Shine Animation */
  .shine-effect {
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transform: skewX(-25deg);
    transition: none;
    z-index: 3;
    pointer-events: none;
  }

  .card:hover .shine-effect {
    left: 150%;
    transition: left 0.8s ease-in-out;
  }
`;

export default function Services({ initialData = [] }: { initialData?: Service[] }) {
  const [items, setItems] = useState<Service[]>(initialData);
  const [loading, setLoading] = useState(initialData.length === 0);

  useEffect(() => {
    if (initialData.length === 0) {
      fetch('/api/services')
        .then(res => res.json())
        .then(data => {
          setItems(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch services:', err);
          setLoading(false);
        });
    }
  }, [initialData]);

  return (
    <section id="services" className="py-32 bg-[#f4f9ff] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-[#008CC8] font-black uppercase tracking-[0.4em] text-xs mb-4">Core Capabilities</h2>
          <h3 className="text-4xl md:text-5xl lg:text-[4.25rem] font-black text-[#020617] tracking-tighter leading-none font-poppins">Our Talent <span className="text-[#008CC8]">Solutions</span></h3>
        </div>

        {loading ? (
          <div className="flex justify-center text-slate-400 font-bold uppercase tracking-widest animate-pulse">Loading Services...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <Link key={item.slug || item.id} href={`/services/${item.slug}`} className="block">
                <ServiceCard service={item} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


