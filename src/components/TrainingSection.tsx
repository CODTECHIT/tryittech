'use client';

import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, ShieldCheck, Gamepad2, Laptop, ArrowRight } from 'lucide-react';
import { trainingCategories } from '@/data/trainingData';

const TrainingCard = ({ title, description, icon, image, link }: { title: string, description: string, icon: React.ReactNode, image: string, link: string }) => {
    return (
        <StyledWrapper>
            <Link href={link} className="card-link">
                <div className="card">
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
                    <div className="first-content">
                        <div className="content-overlay">
                            <div className="icon-container">
                                {icon}
                            </div>
                            <span className="card-title">{title}</span>
                        </div>
                    </div>
                    <div className="second-content">
                        <span className="info-text">{description}</span>
                        <div className="view-more">
                            Get Information <ArrowRight className="w-4 h-4 inline ml-1" />
                        </div>
                    </div>
                </div>
            </Link>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .card-link {
    text-decoration: none;
    display: block;
  }

  .card {
    width: 100%;
    height: 260px;
    background: transparent;
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
    justify-content: center;
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
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 2;
  }

  .content-overlay {
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .icon-container {
    margin-bottom: 12px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(4px);
    border-radius: 50%;
    transition: all 0.4s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .card-title {
    font-size: 1.25rem;
    font-weight: 800;
    color: white;
    text-transform: uppercase;
    letter-spacing: 1.1px;
    text-align: center;
    line-height: 1.2;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
    transition: all 0.4s;
    padding: 0 15px;
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
    padding: 20px;
    background: rgba(13, 148, 136, 0.95);
    backdrop-filter: blur(8px);
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 3;
  }

  .info-text {
    font-size: 1rem;
    font-weight: 600;
    color: white;
    line-height: 1.5;
    margin-bottom: 15px;
  }

  .view-more {
    font-size: 0.8rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #0a192f;
    background: white;
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.3s;
    display: flex;
    align-items: center;
  }

  .card:hover .first-content {
    transform: translateY(-20%);
    opacity: 0.2;
  }

  .card:hover .icon-container {
    transform: scale(0.8);
    opacity: 0.5;
  }

  .card:hover .second-content {
    opacity: 1;
    bottom: 0;
  }
`;

export default function TrainingSection() {
    return (
        <section className="section-padding bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-[#0d9488] font-bold uppercase tracking-widest text-sm mb-3">Empowering Growth</h2>
                    <h3 className="text-3xl md:text-5xl font-black text-[#0a192f] mb-6">Specialized Training Programs</h3>
                    <div className="w-20 h-1.5 bg-[#0d9488] mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {trainingCategories.map((category, index) => (
                        <TrainingCard
                            key={index}
                            title={category.title}
                            description={category.description}
                            icon={category.icon}
                            image={category.image}
                            link={`/training/${category.slug}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
