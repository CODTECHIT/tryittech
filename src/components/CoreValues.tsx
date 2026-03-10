'use client';

import styled from 'styled-components';
import Image from 'next/image';

const coreValues = [
    {
        title: 'Integrity & Trust',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
        info: 'We operate with the highest standards of ethics, transparency, and accountability. Trust is the foundation of every relationship we build—with clients, employees, and partners.',
        color: '#008CC8' // Teal
    },
    {
        title: 'Client Success',
        image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
        info: 'Our clients’ business objectives guide everything we do. We are committed to delivering measurable outcomes, operational excellence, and long-term value through customized workforce solutions.',
        color: '#6EB428' // Green
    },
    {
        title: 'People First',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
        info: 'We believe people are the true drivers of success. We are dedicated to creating safe, compliant, and empowering work environments that enable individuals to grow, perform, and thrive.',
        color: '#008CC8' // Blue
    },
    {
        title: 'Innovation & Tech',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
        info: 'We embrace innovation and leverage AI-driven platforms and data-led insights to build smarter, faster, and more scalable staffing and workforce solutions.',
        color: '#643282' // Purple
    },
    {
        title: 'Diversity, Equity & Inclusion',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
        info: 'We celebrate diversity and actively promote inclusive hiring practices. Our goal is to build a workforce that reflects the communities we serve and supports equitable opportunities for all.',
        color: '#F0960A' // Orange
    },
    {
        title: 'Skill Development',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
        info: 'We invest in continuous learning, upskilling, and reskilling to ensure our workforce remains relevant, competitive, and prepared for the future of work.',
        color: '#008CC8' // Teal
    },
    {
        title: 'Social Responsibility',
        image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
        info: 'We are committed to responsible workforce practices, including formal employment, social security coverage, and compliance—contributing to economic growth and social well-being.',
        color: '#6EB428' // Green
    },
    {
        title: 'Excellence & Accountability',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
        info: 'We hold ourselves to high standards of performance and take ownership of outcomes, ensuring consistency, quality, and reliability in everything we deliver.',
        color: '#008CC8' // Blue
    }
];

const ValueCard = ({ title, image, info, color }: { title: string, image: string, info: string, color: string }) => {
    return (
        <StyledWrapper color={color}>
            <div className="card">
                <div className="first-content">
                    <div className="img-container">
                        <Image src={image} alt={title} fill className="object-cover" />
                        <div className="overlay" />
                    </div>
                    <span className="card-title">{title}</span>
                </div>
                <div className="second-content">
                    <span className="info-text">{info}</span>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div<{ color: string }>`
  .card {
    width: 100%;
    height: 320px;
    background: #020617;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    
    /* Gradient Border */
    border: 4px solid transparent;
    background-image: linear-gradient(#020617, #020617), 
                      linear-gradient(135deg, ${props => props.color}, ${props => props.color}44, ${props => props.color});
    background-origin: border-box;
    background-clip: content-box, border-box;
    
    /* Shadow Gradient Glow */
    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5),
                0 4px 20px -5px ${props => props.color}44;
  }

  .card:hover {
    cursor: pointer;
    transform: translateY(-8px);
    box-shadow: 0 20px 40px -15px rgba(0,0,0,0.6),
                0 0 30px 0 ${props => props.color}66;
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
    background: linear-gradient(to top, rgba(1, 4, 18, 1) 10%, rgba(1, 4, 18, 0.4) 50%, transparent 100%);
    z-index: 2;
  }

  .card-title {
    position: relative;
    z-index: 3;
    padding-bottom: 30px;
    font-size: 15px;
    font-weight: 900;
    color: white;
    text-transform: uppercase;
    text-align: center;
    padding-left: 20px;
    padding-right: 20px;
    letter-spacing: 2px;
    text-shadow: 0 2px 10px rgba(0,0,0,0.5);
    transition: all 0.4s;
  }

  /* Slide Up Animation */
  .second-content {
    position: absolute;
    bottom: -100%;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 30px;
    background: ${props => props.color};
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 3;
  }

  .info-text {
    font-size: 0.875rem;
    font-weight: 800;
    color: white;
    line-height: 1.7;
    transition: all 0.4s;
  }

  .card:hover .first-content {
    transform: scale(0.9);
    opacity: 0;
  }

  .card:hover .second-content {
    opacity: 1;
    bottom: 0;
  }
`;

export default function CoreValues() {
    return (
        <section id="values" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-[#008CC8] font-black uppercase tracking-[0.3em] text-xs mb-4">Our Foundation</h2>
                    <h3 className="text-4xl font-bold text-[#020617]">Our Core Values</h3>
                    <div className="w-16 h-1 bg-[#008CC8] mx-auto mt-8" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {coreValues.map((value, index) => (
                        <ValueCard
                            key={index}
                            title={value.title}
                            image={value.image}
                            info={value.info}
                            color={value.color}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

