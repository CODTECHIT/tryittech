'use client';

import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { trainingCategories } from '@/data/trainingData';

const TrainingCard = ({ title, description, icon, image }: { title: string, description: string, icon: React.ReactNode, image: string, subTrainings: string[] }) => {
  return (
    <StyledWrapper>
      <div className="training-card">
        {/* FRONT: Visual State */}
        <div className="face-front">
          <div className="media">
            <Image src={image} alt={title} fill className="card-img" />
            <div className="scrim" />
          </div>
          <div className="info">
            <div className="icon-box">{icon}</div>
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

const StyledWrapper = styled.div`
  .training-card {
    position: relative;
    width: 100%;
    height: 380px;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
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
    background: linear-gradient(to top, #020617 0%, rgba(2, 6, 23, 0.4) 60%, transparent 100%);
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
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    color: white;
  }

  .card-title {
    font-size: 24px;
    font-weight: 900;
    color: white;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }

  /* BACK FACE */
  .face-back {
    background: #008C78;
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {trainingCategories.map((category, index) => (
        <Link key={index} href={`/training/${category.slug}`} className="block">
          <TrainingCard
            title={category.title}
            description={category.description}
            icon={category.icon}
            image={category.image}
            subTrainings={category.modules}
          />
        </Link>
      ))}
    </div>
  );
}
