'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProcessGlobeProps {
    steps: string[];
}

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 0.5; }
`;

const StyledGlobeContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  aspect-ratio: 1;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
`;

const OrbitRing = styled.div<{ $isAuto: boolean }>`
  position: absolute;
  width: 90%;
  height: 90%;
  border: 1px dashed rgba(13, 148, 136, 0.3);
  border-radius: 50%;
  animation: ${rotate} 40s linear infinite;
  animation-play-state: ${props => props.$isAuto ? 'running' : 'paused'};
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    border: 1px solid rgba(13, 148, 136, 0.1);
    border-radius: 50%;
  }
`;

const CentralGlobe = styled.div`
  position: relative;
  width: 65%;
  height: 65%;
  background: radial-gradient(circle at 30% 30%, #1a365d 0%, #0a192f 100%);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 40px;
  text-align: center;
  box-shadow: 
    inset -10px -10px 50px rgba(0,0,0,0.5),
    0 0 50px rgba(13, 148, 136, 0.2);
  z-index: 10;
  transition: all 0.5s ease;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: url('https://www.transparenttextures.com/patterns/carbon-fibre.png');
    opacity: 0.05;
    pointer-events: none;
  }
`;

const GlobeEffect = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 0%, rgba(13, 148, 136, 0.2) 0%, transparent 70%);
  animation: ${pulse} 4s ease-in-out infinite;
  pointer-events: none;
`;

const StepNode = styled.div<{ $angle: number; $active: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  margin: -20px;
  background: ${props => props.$active ? '#0d9488' : '#0a192f'};
  border: 2px solid #0d9488;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: 
    rotate(${props => props.$angle}deg) 
    translate(270px) 
    rotate(-${props => props.$angle}deg);
  z-index: 20;

  &:hover {
    transform: 
      rotate(${props => props.$angle}deg) 
      translate(270px) 
      rotate(-${props => props.$angle}deg) 
      scale(1.2);
    box-shadow: 0 0 15px #0d9488;
  }

  ${props => props.$active && css`
    box-shadow: 0 0 20px #0d9488;
    scale: 1.2;
  `}

  @media (max-width: 768px) {
    transform: 
      rotate(${props => props.$angle}deg) 
      translate(160px) 
      rotate(-${props => props.$angle}deg);
    
    &:hover {
      transform: 
        rotate(${props => props.$angle}deg) 
        translate(160px) 
        rotate(-${props => props.$angle}deg) 
        scale(1.2);
    }
  }
`;

const Controls = styled.div`
  position: absolute;
  bottom: -60px;
  display: flex;
  gap: 20px;
  z-index: 30;
`;

const ControlButton = styled.button`
  background: rgba(13, 148, 136, 0.1);
  border: 1px solid rgba(13, 148, 136, 0.3);
  color: #0d9488;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #0d9488;
    color: white;
    transform: scale(1.1);
  }
`;

export default function ProcessGlobe({ steps }: ProcessGlobeProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isAuto, setIsAuto] = useState(true);

    const nextStep = useCallback(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
    }, [steps.length]);

    const prevStep = useCallback(() => {
        setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
    }, [steps.length]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isAuto) {
            interval = setInterval(nextStep, 3000); // Rotate every 3 seconds
        }
        return () => clearInterval(interval);
    }, [isAuto, nextStep]);

    const handleNodeClick = (index: number) => {
        setCurrentStep(index);
        setIsAuto(false); // Stop auto-rotation on manual interaction
    };

    return (
        <div className="flex flex-col items-center py-10">
            <StyledGlobeContainer onMouseEnter={() => setIsAuto(false)} onMouseLeave={() => setIsAuto(true)}>
                <OrbitRing $isAuto={isAuto} />

                {steps.map((_, index) => {
                    const angle = (index / steps.length) * 360;
                    return (
                        <StepNode
                            key={index}
                            $angle={angle}
                            $active={currentStep === index}
                            onClick={() => handleNodeClick(index)}
                        >
                            {index + 1}
                        </StepNode>
                    );
                })}

                <CentralGlobe>
                    <GlobeEffect />
                    <div className="relative z-20">
                        <span className="text-[#0d9488] font-black text-6xl opacity-20 block mb-2">
                            {String(currentStep + 1).padStart(2, '0')}
                        </span>
                        <h4 className="text-2xl md:text-3xl font-bold mb-4 animate-in fade-in slide-in-from-bottom duration-500 text-white">
                            {steps[currentStep]}
                        </h4>
                        <div className="w-12 h-1 bg-[#0d9488] mx-auto rounded-full" />
                    </div>
                </CentralGlobe>

                <Controls>
                    <ControlButton onClick={prevStep} aria-label="Previous step">
                        <ChevronLeft />
                    </ControlButton>
                    <ControlButton onClick={nextStep} aria-label="Next step">
                        <ChevronRight />
                    </ControlButton>
                </Controls>
            </StyledGlobeContainer>
        </div>
    );
}
