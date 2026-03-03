'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Industry } from '@/lib/industries';

export default function Industries() {
  const [items, setItems] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch('/api/industries')
      .then(res => res.json())
      .then(data => {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
        // Set initial active index to middle
        if (Array.isArray(data) && data.length > 0) {
          setActiveIndex(Math.floor(data.length / 2));
        }
      })
      .catch(err => {
        console.error('Failed to fetch industries:', err);
        setLoading(false);
      });
  }, []);

  const next = () => {
    if (items.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    if (items.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <SectionWrapper id="industries">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <header className="text-center mb-16 space-y-4">
          <span className="text-[#008CC8] font-black uppercase tracking-[0.4em] text-xs block mb-2">Global Reach</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#020617] tracking-tighter font-poppins">
            Market Verticals <span className="text-[#008CC8]">We Support</span>
          </h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Specialized talent solutions across diverse industries, powered by deep domain expertise.
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64 text-slate-400 font-bold uppercase tracking-widest animate-pulse">
            Synchronizing Market Verticals...
          </div>
        ) : (
          <div className="relative overflow-visible py-20">
            {/* Navigation Arrows */}
            <div className="absolute top-[65%] md:top-1/2 -translate-y-1/2 left-2 md:left-4 z-30">
              <NavButton onClick={prev}>
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </NavButton>
            </div>
            <div className="absolute top-[65%] md:top-1/2 -translate-y-1/2 right-2 md:right-4 z-30">
              <NavButton onClick={next}>
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </NavButton>
            </div>

            {/* Carousel Container */}
            <CarouselTrack>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  className="flex items-center justify-center gap-10"
                  initial={false}
                  animate={{ x: ((items.length - 1) / 2 - activeIndex) * (typeof window !== 'undefined' && window.innerWidth < 768 ? 160 : 290) }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                >
                  {items.map((industry, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <Link key={industry.id} href={`/industries/${industry.slug}`}>
                        <IndustryItem
                          $isActive={isActive}
                          initial={false}
                          animate={{
                            scale: isActive ? 1.2 : 0.85,
                            opacity: 1,
                            zIndex: isActive ? 20 : 10
                          }}
                        >
                          <HaloContainer>
                            <Halo className="halo-1" />
                            <Halo className="halo-2" />
                            <Halo className="halo-3" />
                            <Circle $isActive={isActive}>
                              <Content>
                                <Title $isActive={isActive}>{industry.name}</Title>
                                {isActive && (
                                  <>
                                    <Divider />
                                    <Plus className="w-6 h-6 text-white" />
                                  </>
                                )}
                              </Content>
                            </Circle>
                          </HaloContainer>
                        </IndustryItem>
                      </Link>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </CarouselTrack>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  background: linear-gradient(to bottom, #ffffff, #f0f7ff, #ffffff);
  padding: 100px 0;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(#008CC8 0.5px, transparent 0.5px);
    background-size: 30px 30px;
    opacity: 0.03;
    pointer-events: none;
  }
`;

const NavButton = styled.button`
  width: 40px;
  height: 60px;
  @media (min-width: 768px) {
    width: 50px;
    height: 80px;
  }
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #020617;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  z-index: 40;

  &:hover {
    background: #008CC8;
    color: white;
    border-color: #008CC8;
    box-shadow: 0 8px 16px rgba(0, 140, 200, 0.2);
  }
`;

const CarouselTrack = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const IndustryItem = styled(motion.div) <{ $isActive: boolean }>`
  position: relative;
  flex-shrink: 0;
  width: 160px;
  @media (min-width: 768px) {
    width: 250px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.4s ease;

  ${props => !props.$isActive && `
    filter: opacity(0.7);
    &:hover {
        filter: opacity(1);
        transform: translateY(-5px);
    }
  `}
`;

const HaloContainer = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const Halo = styled.div`
  position: absolute;
  border-radius: 50%;
  background: #008CC8;
  opacity: 0.03;
  
  &.halo-1 {
    width: 140px; height: 140px;
    @media (min-width: 768px) { width: 260px; height: 260px; }
    opacity: 0.02;
  }
  &.halo-2 {
    width: 120px; height: 120px;
    @media (min-width: 768px) { width: 230px; height: 230px; }
    opacity: 0.04;
  }
  &.halo-3 {
    width: 110px; height: 110px;
    @media (min-width: 768px) { width: 215px; height: 215px; }
    opacity: 0.06;
  }
`;

const Circle = styled.div<{ $isActive: boolean }>`
  position: relative;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: ${props => props.$isActive ? '#008CC8' : 'linear-gradient(135deg, #0a192f 0%, #020617 100%)'};
  border: ${props => props.$isActive ? '3px solid #020617' : '2px solid rgba(0, 140, 200, 0.2)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 5;
  transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  box-shadow: ${props => props.$isActive ? '0 10px 40px rgba(0, 140, 200, 0.4)' : '0 10px 30px rgba(0, 0, 0, 0.15)'};

  @media (min-width: 768px) {
    width: 180px;
    height: 180px;
    border-width: 4px;
  }

  ${props => !props.$isActive && `
    &::after {
        content: '';
        position: absolute;
        inset: 4px;
        border-radius: 50%;
        border: 1px solid rgba(0, 140, 200, 0.1);
    }
  `}
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h4<{ $isActive: boolean }>`
  color: ${props => props.$isActive ? '#ffffff' : '#ffffff'};
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const Divider = styled.div`
  width: 80px;
  height: 2px;
  background: #ffffff;
  margin: 15px 0;
  opacity: 0.8;
`;
