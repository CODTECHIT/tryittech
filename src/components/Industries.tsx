'use client';

import styled from 'styled-components';
import Image from 'next/image';

const industries = [
    {
        name: 'IT',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
        info: 'Innovative tech leadership search.'
    },
    {
        name: 'Non-IT',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
        info: 'Diverse professional staffing solutions.'
    },
    {
        name: 'Healthcare',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80',
        info: 'Specialized medical talent acquisition.'
    },
    {
        name: 'BFSI',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
        info: 'Secure banking and finance staffing.'
    },
    {
        name: 'Automotive',
        image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
        info: 'Driving automotive excellence.'
    },
    {
        name: 'Logistics',
        image: 'https://images.unsplash.com/photo-1566650554919-44ec6bbe2518?w=800&q=80',
        info: 'Optimizing supply chain talent.'
    },
    {
        name: 'Retail',
        image: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=800&q=80',
        info: 'Customer-centric retail staffing.'
    },
    {
        name: 'Telecom',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
        info: 'Next-gen network solutions.'
    },
    {
        name: 'Manufacturing',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
        info: 'Industrial growth through talent.'
    },
    {
        name: 'BPO Services',
        image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
        info: 'Efficiency-driven outsourcing talent.'
    },
];

const IndustryCard = ({ name, image, info }: { name: string, image: string, info: string }) => {
    return (
        <StyledWrapper>
            <div className="card">
                <div className="card-inner">
                    <div className="card-front">
                        <div className="img-container">
                            <Image src={image} alt={name} fill className="object-cover" />
                            <div className="overlay" />
                        </div>
                        <span className="card-title">{name}</span>
                    </div>
                    <div className="card-back">
                        <span className="info-text">{info}</span>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .card {
    background-color: transparent;
    width: 100%;
    height: 254px;
    perspective: 1000px;
    border-radius: 12px;
  }

  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    transform-style: preserve-3d;
  }

  .card:hover .card-inner {
    transform: rotateY(180deg);
  }

  .card-front, .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  }

  .card-front {
    background-color: #0a192f;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
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
    height: 75%;
    background: linear-gradient(to top, rgba(10, 25, 47, 0.98), transparent);
    z-index: 2;
  }

  .card-title {
    position: relative;
    z-index: 3;
    padding-bottom: 25px;
    font-size: 18px;
    font-weight: 800;
    color: white;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
  }

  .card-back {
    background-color: #0d9488;
    color: white;
    transform: rotateY(180deg);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    z-index: 1;
  }

  .info-text {
    font-size: 1.15rem;
    font-weight: 700;
    color: white;
    line-height: 1.5;
  }

  .card:hover {
    cursor: pointer;
  }
`;

export default function Industries() {
    return (
        <section id="industries" className="section-padding bg-slate-50 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-[#0d9488] font-black uppercase tracking-[0.3em] text-xs mb-4">Market Verticals</h2>
                    <h3 className="text-4xl font-bold text-[#0a192f]">Industries We Support</h3>
                    <div className="w-16 h-1 bg-[#0d9488] mx-auto mt-8" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10">
                    {industries.map((item, index) => (
                        <IndustryCard
                            key={index}
                            name={item.name}
                            image={item.image}
                            info={item.info}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

