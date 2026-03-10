'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { Laptop, BookOpen, ShieldCheck, Gamepad2 } from 'lucide-react';

const cardGradients = [
  { theme: '#008CC8', border: 'linear-gradient(135deg, #008CC8, #00D1FF)', text: 'text-[#008CC8]', glow: 'rgba(0, 209, 255, 0.7)' },
  { theme: '#F43F5E', border: 'linear-gradient(135deg, #F43F5E, #FB7185)', text: 'text-[#F43F5E]', glow: 'rgba(244, 63, 94, 0.7)' },
  { theme: '#10B981', border: 'linear-gradient(135deg, #10B981, #34D399)', text: 'text-[#10B981]', glow: 'rgba(16, 185, 129, 0.7)' },
  { theme: '#F59E0B', border: 'linear-gradient(135deg, #F59E0B, #FBBF24)', text: 'text-[#F59E0B]', glow: 'rgba(245, 158, 11, 0.7)' },
  { theme: '#8B5CF6', border: 'linear-gradient(135deg, #8B5CF6, #C084FC)', text: 'text-[#8B5CF6]', glow: 'rgba(139, 92, 246, 0.7)' },
  { theme: '#EC4899', border: 'linear-gradient(135deg, #EC4899, #F472B6)', text: 'text-[#EC4899]', glow: 'rgba(236, 72, 153, 0.7)' },
];

const renderIcon = (iconName: string, className: string) => {
  const props = { className: `${className} relative z-10`, strokeWidth: 3 };
  switch (iconName) {
    case 'Laptop': return <Laptop {...props} />;
    case 'BookOpen': return <BookOpen {...props} />;
    case 'ShieldCheck': return <ShieldCheck {...props} />;
    case 'Gamepad2': return <Gamepad2 {...props} />;
    default: return <BookOpen {...props} />;
  }
};

interface Training {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  modules: string[];
}

interface GradientTheme {
  theme: string;
  border: string;
  text: string;
  glow: string;
}

const TrainingCard = ({ title, description, icon, image, gradient }: { title: string, description: string, icon: string, image: string, gradient: GradientTheme }) => {
  return (
    <StyledWrapper gradient={gradient}>
      <div className="training-card">
        {/* FRONT: Visual State */}
        <div className="face-front">
          <div className="media">
            <Image src={image || 'https://img.freepik.com/free-photo/business-startup-strategy-goals-concept_53876-120909.jpg'} alt={title} fill className="card-img" />
            <div className="scrim" />
          </div>
          <div className="info">
            <div className="icon-box">
              {renderIcon(icon, `w-7 h-7 ${gradient.text}`)}
            </div>
            <h4 className="card-title">{title}</h4>
          </div>
        </div>

        {/* BACK: Hover State */}
        <div className="face-back">
          <div className="back-wrap">
            <div className="tag">Training Program</div>
            <h5 className="back-title">{title}</h5>
            <p className="back-desc">{description}</p>
            <div className="learn-more">
              <span>Learn More</span>
              <div className="line" />
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ gradient: GradientTheme }>`
  .training-card {
    position: relative;
    width: 100%;
    height: 310px;
    border-radius: 24px;
    overflow: hidden;
    cursor: pointer;
    background: white;
    box-shadow: 0 15px 35px -12px rgba(0,0,0,0.5), 0 0 30px -5px ${props => props.gradient.glow};
    border: 5px solid transparent;
    background-clip: padding-box;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    
    &::before {
      content: '';
      position: absolute;
      inset: -5px; 
      z-index: -1;
      background: ${props => props.gradient.border};
      border-radius: inherit;
    }
  }

  .training-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.6), 0 0 50px 0 ${props => props.gradient.glow};
  }

  .face-front, .face-back {
    position: absolute;
    inset: 0;
    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  }

  /* FRONT FACE */
  .face-front {
    z-index: 2;
    transform: translateY(0);
  }

  .media {
    position: absolute;
    inset: 0;
  }

  .card-img {
    object-fit: cover;
  }

  .scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, #020617 0%, rgba(2, 6, 23, 0.3) 50%, transparent 100%);
  }

  .info {
    position: relative;
    z-index: 3;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 30px;
    align-items: center;
    text-align: center;
  }

  .icon-box {
    width: 64px;
    height: 64px;
    background: white;
    box-shadow: 0 8px 30px rgba(0,0,0,0.2);
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    transform: rotate(-3deg);
    transition: all 0.3s ease;
  }

  .training-card:hover .icon-box {
    transform: rotate(0deg) scale(1.15);
  }

  .card-title {
    font-size: 26px;
    font-weight: 900;
    color: white;
    letter-spacing: -0.01em;
    line-height: 1;
    text-shadow: 0 3px 15px rgba(0,0,0,0.6);
  }

  /* BACK FACE */
  .face-back {
    background: ${props => props.gradient.border};
    z-index: 1;
    transform: translateY(100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
  }

  .training-card:hover .face-front {
    transform: translateY(-100%);
  }

  .training-card:hover .face-back {
    transform: translateY(0);
  }

  .back-wrap {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    color: white;
  }

  .tag {
    font-size: 10px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #020617;
    margin-bottom: 5px;
  }

  .back-title {
    font-size: 20px;
    font-weight: 800;
  }

  .back-desc {
    font-size: 14px;
    line-height: 1.6;
    font-weight: 500;
    opacity: 0.95;
  }

  .learn-more {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    text-decoration: none;
  }

  .learn-more span {
    font-size: 11px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #020617;
  }

  .line {
    width: 30px;
    height: 2px;
    background: #020617;
    transition: width 0.3s ease;
  }

  .learn-more:hover .line {
    width: 100%;
  }
`;

export default function TrainingGrid() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/trainings')
      .then(res => res.json())
      .then(data => {
        setTrainings(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching trainings:', err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="text-center py-20 text-slate-400">Loading courses...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {trainings.map((category, idx) => (
        <Link key={category.id} href={`/training/${category.slug}`} className="block">
          <TrainingCard
            title={category.title}
            description={category.description}
            icon={category.icon}
            image={category.image}
            gradient={cardGradients[idx % cardGradients.length]}
          />
        </Link>
      ))}
    </div>
  );
}

