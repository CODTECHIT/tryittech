'use client';

import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { trainingCategories } from '@/data/trainingData';

const TrainingCard = ({ title, description, icon, image, subTrainings, slug }: { title: string, description: string, icon: React.ReactNode, image: string, subTrainings: string[], slug: string }) => {
  return (
    <StyledWrapper>
      <Link href={`/training/${slug}`} className="block h-full no-underline card-link-wrapper">
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
            <p className="description-text">{description}</p>
            <div className="mt-8 px-6 py-3 bg-white text-[#0a192f] text-sm font-bold uppercase tracking-wider rounded shadow-lg transform transition-transform hover:scale-105 inline-block">
              View Full Details
            </div>
          </div>
        </div>
      </Link>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card-link-wrapper {
    display: block;
    height: 100%;
    text-decoration: none;
  }

  .card {
    width: 100%;
    min-height: 380px; 
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
    margin-bottom: 25px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(4px);
    border-radius: 50%;
    transition: all 0.4s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .card-title {
    position: relative;
    z-index: 3;
    font-size: 24px;
    font-weight: 800;
    color: white;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
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
    align-items: center; /* Centered items */
    text-align: left;
    padding: 30px;
    background: rgba(13, 148, 136, 0.95);
    backdrop-filter: blur(5px);
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 3;
    overflow-y: auto; /* Handle content overflow */
  }

  .description-text {
    font-size: 0.95rem;
    font-weight: 600;
    color: white;
    margin-bottom: 12px;
    text-align: center;
    line-height: 1.4;
  }

  .separator {
    width: 40px;
    height: 2px;
    background: rgba(255,255,255,0.4);
    margin: 10px auto 15px; 
  }

  .modules-label {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 800;
    color: #0a192f;
    margin-bottom: 10px;
  }

  .modules-list {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    max-width: 300px; /* Constrain width for better look */
  }

  .modules-list li {
    display: flex;
    align-items: flex-start;
    padding: 6px 0;
    font-size: 0.9rem;
    font-weight: 600;
    color: white;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }
  
  .modules-list li:last-child {
    border-bottom: none;
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

export default function TrainingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {trainingCategories.map((category, index) => (
        <TrainingCard
          key={index}
          title={category.title}
          description={category.description}
          icon={category.icon}
          image={category.image}
          subTrainings={category.modules}
          slug={category.slug}
        />
      ))}
    </div>
  );
}
