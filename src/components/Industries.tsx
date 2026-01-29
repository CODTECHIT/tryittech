import Image from 'next/image';

const industries = [
    { 
        name: 'Telecom', 
        image: '/images/industries/telecom.jpg',
        fallback: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop'
    },
    { 
        name: 'BFSI', 
        image: '/images/industries/bfsi.jpg',
        fallback: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop'
    },
    { 
        name: 'BPO / KPO', 
        image: '/images/industries/bpo-kpo.jpg',
        fallback: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop'
    },
    { 
        name: 'Software & IT', 
        image: '/images/industries/software-it.jpg',
        fallback: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop'
    },
    { 
        name: 'Pharma', 
        image: '/images/industries/pharma.jpg',
        fallback: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop'
    },
    { 
        name: 'Automobile', 
        image: '/images/industries/automobile.jpg',
        fallback: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop'
    },
    { 
        name: 'Engineering', 
        image: '/images/industries/engineering.jpg',
        fallback: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop'
    },
    { 
        name: 'E-Automotive', 
        image: '/images/industries/e-automotive.jpg',
        fallback: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=300&fit=crop'
    },
    { 
        name: 'Manufacturing', 
        image: '/images/industries/manufacturing.jpg',
        fallback: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&h=300&fit=crop'
    },
    { 
        name: 'Infrastructure', 
        image: '/images/industries/infrastructure.jpg',
        fallback: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop'
    },
];

export default function Industries() {
    return (
        <section id="industries" className="section-padding bg-slate-50 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-[#0d9488] font-black uppercase tracking-[0.3em] text-xs mb-4">Market Verticals</h2>
                    <h3 className="text-4xl font-bold text-[#0a192f]">Industries We Support</h3>
                    <div className="w-16 h-1 bg-[#0d9488] mx-auto mt-8" />
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
                    {industries.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white border border-slate-200 text-center hover:shadow-xl hover:border-[#0d9488] transition-all duration-300 group rounded-sm overflow-hidden"
                        >
                            <div className="relative h-40 w-full overflow-hidden">
                                <Image
                                    src={item.fallback}
                                    alt={`${item.name} industry`}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="p-4">
                                <h5 className="font-bold text-[#0a192f] text-sm uppercase tracking-wider group-hover:text-[#0d9488]">{item.name}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
