'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Briefcase } from 'lucide-react';
import { Service } from '@/lib/services';

const DEFAULT_SERVICE_IMAGE = 'https://img.freepik.com/free-photo/businesspeople-working-finance-accounting-office_23-2148908915.jpg?w=740';

const BACK_COLORS = [
  '#6A1B9A', // Purple
  '#F39C12', // Orange
  '#1E88E5', // Blue
  '#7CB342', // Green
  '#26A69A', // Teal
];

function getSafeImageUrl(url: string | undefined | null): string {
  if (!url || url.trim() === '') return DEFAULT_SERVICE_IMAGE;
  try {
    new URL(url);
    return url;
  } catch {
    return DEFAULT_SERVICE_IMAGE;
  }
}

const ServiceCard = ({ service, index = 0 }: { service: Service; index?: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const backColor = BACK_COLORS[index % BACK_COLORS.length];

  return (
    <CardWrapper $isFlipped={isFlipped} $backColor={backColor}>
      <div className="card" onClick={() => setIsFlipped(!isFlipped)}>
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
              <h3 className="card-title text-xl md:text-2xl">{service.title}</h3>
            </div>
          </div>

          {/* BACKSIDE */}
          <div className="card-back">
            <div className="back-content">
              <span className="back-label">Global Service</span>
              <h4 className="back-title text-2xl md:text-3xl">{service.title}</h4>
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

const CardWrapper = styled.div<{ $isFlipped: boolean; $backColor: string }>`
  .card {
    width: 100%;
    height: 320px;
    @media (min-width: 768px) {
      height: 380px;
    }
    perspective: 1000px;
    cursor: pointer;
  }

  .card-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    transform: ${props => props.$isFlipped ? 'rotateY(180deg)' : 'none'};
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
  }

  .img-container {
    position: absolute;
    inset: 0;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, #020617 0%, transparent 100%);
    opacity: 0.8;
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
    background: #008CC8;
    color: white;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 20px rgba(0, 140, 200, 0.3);
  }

  .card-title {
    color: white;
    font-size: 1.5rem;
    font-weight: 800;
    line-height: 1.1;
    text-transform: uppercase;
    letter-spacing: -0.02em;
  }

  .card-back {
    background: ${props => props.$backColor};
    transform: rotateY(180deg);
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .back-label {
    color: rgba(255, 255, 255, 0.5);
    font-size: 10px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    margin-bottom: 20px;
  }

  .back-title {
    color: white;
    font-size: 1.75rem;
    font-weight: 800;
    margin-bottom: 15px;
  }

  .back-desc {
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 30px;
    font-weight: 500;
  }

  .arrow-btn {
    display: flex;
    align-items: center;
    color: white;
    font-weight: 800;
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 0.1em;
    transition: all 0.3s ease;
  }

  .arrow-btn:hover {
    color: white;
    gap: 10px;
    transform: scale(1.05);
  }
`;

export default function Services() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  return (
    <section id="services" className="py-32 bg-[#f4f9ff] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-[#008CC8] font-black uppercase tracking-[0.4em] text-xs mb-4">Core Capabilities</h2>
          <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#020617] tracking-tighter leading-none font-poppins">Our Talent <span className="text-[#008CC8]">Solutions</span></h3>
        </div>

        {loading ? (
          <div className="flex justify-center text-slate-400 font-bold uppercase tracking-widest animate-pulse">Loading Services...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, idx) => (
              <Link key={item.slug || item.id} href={`/services/${item.slug}`} className="block">
                <ServiceCard service={item} index={idx} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


