'use client';

import styled from 'styled-components';
import Image from 'next/image';

const coreValues = [
    {
        title: 'Integrity & Trust',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
        info: 'We operate with the highest standards of ethics, transparency, and accountability. Trust is our foundation.',
        color: '#008C78' // Teal
    },
    {
        title: 'Client Success',
        image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
        info: 'Our clients’ business objectives guide everything we do. We are committed to delivering measurable outcomes.',
        color: '#6EB428' // Green
    },
    {
        title: 'People First',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
        info: 'We believe people are the true drivers of success, creating safe and empowering work environments.',
        color: '#008CC8' // Blue
    },
    {
        title: 'Innovation & Tech',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
        info: 'We leverage AI-driven platforms and data-led insights to build smarter, faster workforce solutions.',
        color: '#643282' // Purple
    },
    {
        title: 'DE&I',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
        info: 'We celebrate diversity and actively promote inclusive hiring practices for equitable opportunities.',
        color: '#F0960A' // Orange
    },
    {
        title: 'Continuous Learning',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
        info: 'We invest in upskilling and reskilling to ensure our workforce remains relevant and future-ready.',
        color: '#008C78' // Teal
    },
    {
        title: 'Social Resp.',
        image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
        info: 'Committed to responsible practices, formal employment, and contributing to economic growth.',
        color: '#6EB428' // Green
    },
    {
        title: 'Excellence',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
        info: 'We hold ourselves to high standards, taking ownership to ensure quality and reliability.',
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
    height: 254px;
    background: #020617;
    transition: all 0.4s;
    border-radius: 12px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
    position: relative;
    overflow: hidden;
  }

  .card:hover {
    cursor: pointer;
    box-shadow: 0px 0px 25px 0px ${props => props.color}99;
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
    height: 70%;
    background: linear-gradient(to top, rgba(10, 25, 47, 0.95), transparent);
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
    padding: 24px;
    background: ${props => props.color};
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 3;
  }

  .info-text {
    font-size: 1.1rem;
    font-weight: 700;
    color: white;
    line-height: 1.4;
    transition: all 0.4s;
  }

  .card:hover .first-content {
    transform: translateY(-20%);
    opacity: 0.3;
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
                    <h2 className="text-[#008C78] font-black uppercase tracking-[0.3em] text-xs mb-4">Our Foundation</h2>
                    <h3 className="text-4xl font-bold text-[#020617]">Our Core Values</h3>
                    <div className="w-16 h-1 bg-[#008C78] mx-auto mt-8" />
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
