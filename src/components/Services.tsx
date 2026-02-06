'use client';

import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { services } from '@/constants/services';

const ServiceCard = ({ title, image, info, slug }: { title: string, image: string, info: string, slug: string }) => {
    return (
        <StyledWrapper>
            <Link href={`/services/${slug}`} className="card-link">
                <div className="card">
                    <div className="first-content">
                        <div className="img-container">
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="overlay" />
                        </div>
                        <span className="card-title">{title}</span>
                    </div>
                    <div className="second-content">
                        <span className="info-text">{info}</span>
                        <div className="view-more">View Details →</div>
                    </div>
                </div>
            </Link>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .card-link {
    text-decoration: none;
    display: block;
  }

  .card {
    width: 100%;
    height: 320px;
    background: #0a192f;
    transition: all 0.4s;
    border-radius: 12px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;
  }

  .card:hover {
    box-shadow: 0px 0px 25px 0px rgba(13, 148, 136, 0.5);
  }

  .first-content {
    height: 100%;
    width: 100%;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 0;
    opacity: 1;
    position: relative;
    z-index: 2;
  }

  .img-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80%;
    background: linear-gradient(to top, rgba(10, 25, 47, 0.95), transparent);
    z-index: 2;
  }

  .card-title {
    position: relative;
    z-index: 3;
    padding: 0 20px 35px 20px;
    font-size: 22px;
    font-weight: 800;
    color: white;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    text-align: center;
    line-height: 1.2;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
    transition: all 0.4s;
  }

  .second-content {
    position: absolute;
    bottom: -100%;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 30px;
    background: #0d9488;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 3;
  }

  .info-text {
    font-size: 1.05rem;
    font-weight: 600;
    color: white;
    line-height: 1.5;
    margin-bottom: 20px;
  }

  .view-more {
    font-size: 0.85rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #0a192f;
    background: white;
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.3s;
  }

  .card:hover .first-content {
    transform: translateY(-20%);
    opacity: 0.2;
  }

  .card:hover .second-content {
    opacity: 1;
    bottom: 0;
  }
`;

export default function Services() {
    return (
        <section id="services" className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-[#0d9488] font-black uppercase tracking-[0.3em] text-xs mb-6 flex items-center gap-4">
                            <span className="w-10 h-[2px] bg-[#0d9488]" /> What We Deliver
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-[#0a192f] leading-tight font-display">
                            Workforce Optimization <br />& <span className="text-slate-400">Total Talent Solutions</span>
                        </h3>
                    </div>
                    <p className="text-slate-500 max-w-sm mb-2 font-medium">
                        Propelling businesses forward with custom-tailored human capital strategies and proven delivery frameworks.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {services.map((service, idx) => (
                        <ServiceCard
                            key={idx}
                            title={service.title}
                            image={service.image}
                            info={service.shortDescription}
                            slug={service.slug}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

