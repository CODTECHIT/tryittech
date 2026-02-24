'use client';

import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { services, Service } from '@/constants/services';

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <CardWrapper>
      <div className="card">
        <div className="card-inner">
          {/* FRONTSIDE */}
          <div className="card-front">
            <div className="img-container">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
              <div className="overlay" />
            </div>

            <div className="content">
              <div className="icon-badge">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="card-title">{service.title}</h3>
            </div>
          </div>

          {/* BACKSIDE */}
          <div className="card-back">
            <div className="back-content">
              <span className="back-label">Global Service</span>
              <h4 className="back-title">{service.title}</h4>
              <p className="back-desc">{service.shortDescription}</p>
              <div className="arrow-btn">
                View Details <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  .card {
    width: 100%;
    height: 380px;
    perspective: 1000px;
  }

  .card-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .card:hover .card-inner {
    transform: rotateY(180deg);
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
    background: #008C78;
    color: white;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 20px rgba(0, 140, 120, 0.3);
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
    background: #020617;
    transform: rotateY(180deg);
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid rgba(0, 140, 120, 0.2);
  }

  .back-label {
    color: #008C78;
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
    color: #94a3b8;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 30px;
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
    color: #008C78;
    gap: 10px;
  }
`;

export default function Services() {
  return (
    <section id="services" className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-[#008C78] font-black uppercase tracking-[0.4em] text-xs mb-4">Core Capabilities</h2>
          <h3 className="text-5xl md:text-7xl font-black text-[#020617] tracking-tighter leading-none font-poppins">Our Talent <span className="text-[#008C78]">Solutions</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, index) => (
            <Link key={index} href={`/services/${item.slug}`} className="block">
              <ServiceCard service={item} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

