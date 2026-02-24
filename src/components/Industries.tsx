'use client';

import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { industriesData, Industry } from '../constants/industries';

const IndustryCard = ({ industry }: { industry: Industry }) => {
  return (
    <StyledWrapper>
      <div className="card-container">
        <div className="card-flipper">
          {/* FRONT: Visual Identity */}
          <div className="face front">
            <div className="image-wrapper">
              <Image src={industry.image} alt={industry.name} fill className="card-img" priority />
              <div className="image-overlay" />
            </div>
            <div className="front-content">
              <div className="title-container">
                <span className="label-tiny">Division</span>
                <h4 className="industry-title">{industry.name}</h4>
              </div>
            </div>
          </div>

          {/* BACK: Strategic Value */}
          <div className="face back">
            <div className="back-content">
              <div className="back-header">
                <span className="label">Expertise</span>
                <h5 className="back-title">{industry.name}</h5>
              </div>
              <p className="description">{industry.info}</p>
              <div className="learn-more-btn">
                <span>Learn More</span>
                <div className="btn-line" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card-container {
    width: 100%;
    height: 340px;
    perspective: 1500px;
    cursor: pointer;
  }

  .card-flipper {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .card-container:hover .card-flipper {
    transform: rotateY(-180deg);
  }

  .face {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  }

  .front {
    transform: rotateY(0deg);
    background: #020617;
  }

  .image-wrapper {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .card-img {
    object-fit: cover;
    transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .card-container:hover .card-img {
    transform: scale(1.1);
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top, 
      rgba(2, 6, 23, 0.95) 0%, 
      rgba(2, 6, 23, 0.4) 50%, 
      transparent 100%
    );
    z-index: 1;
  }

  .front-content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 24px;
  }

  .title-container {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .label-tiny {
    font-size: 9px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #008C78;
    opacity: 0.9;
  }

  .industry-title {
    font-size: 1.15rem;
    font-weight: 800;
    color: white;
    letter-spacing: -0.01em;
    line-height: 1.2;
    margin: 0;
    text-transform: capitalize;
    transition: transform 0.4s ease;
  }

  .card-container:hover .industry-title {
    transform: translateX(5px);
  }

  .back {
    transform: rotateY(180deg);
    background: #008C78;
    padding: 35px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .back-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: white;
  }

  .back-header {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .label {
    font-size: 10px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #020617;
  }

  .back-title {
    font-size: 22px;
    font-weight: 800;
  }

  .description {
    font-size: 14px;
    line-height: 1.6;
    font-weight: 500;
    opacity: 0.95;
  }

  .learn-more-btn {
    margin-top: 10px;
    display: inline-flex;
    flex-direction: column;
    gap: 6px;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .learn-more-btn span {
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #020617;
  }

  .btn-line {
    width: 40px;
    height: 2px;
    background: #020617;
    transition: width 0.3s ease;
  }

  .learn-more-btn:hover .btn-line {
    width: 100%;
  }

  .card-container:hover .face {
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
  }
`;

export default function Industries() {
  return (
    <section id="industries" className="py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[#008C78] font-black uppercase tracking-[0.3em] text-xs mb-4">Global Reach</h2>
            <h3 className="text-5xl font-bold text-[#020617] tracking-tighter font-poppins">Market Verticals <span className="text-[#008C78]">We Support</span></h3>
          </div>
          <div className="hidden md:block">
            <p className="text-slate-500 font-medium max-w-xs text-right italic font-poppins">
              Empowering innovation through specialized talent across major global industries.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {industriesData.map((item, index) => (
            <Link key={index} href={`/industries/${item.slug}`} className="block">
              <IndustryCard industry={item} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
