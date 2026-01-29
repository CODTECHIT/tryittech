'use client';

export default function ClientTrust() {
    const clients = [
        { name: "Tech Mahindra", localPath: "/images/clients/tech-mahindra.png" },
        { name: "BUDDI AI", localPath: "/images/clients/buddi-ai.png" },
        { name: "ICICI Bank", localPath: "/images/clients/icici-bank.jpg" },
        { name: "HDFC Bank", localPath: "/images/clients/hdfc-bank.png" },
        { name: "Aspire Systems", localPath: "/images/clients/aspire-systems.png" },
        { name: "CRMIT Solutions", localPath: "/images/clients/crmit-solutions.svg" },
        { name: "Cognizant", localPath: "/images/clients/cognizant.svg" },
        { name: "Qualcomm", localPath: "/images/clients/qualcomm.svg" },
        { name: "TCS", localPath: "/images/clients/tcs.svg" },
        { name: "Persistent", localPath: "/images/clients/persistent.svg" },
        { name: "Zensar", localPath: "/images/clients/zensar.svg" },
        { name: "Mphasis", localPath: "/images/clients/mphasis.svg" }
    ];

    // Double the array for seamless infinite loop
    const marqueeItems = [...clients, ...clients];

    return (
        <section className="py-24 bg-[#0a192f] border-t border-white/5 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 mb-16">
                <h3 className="text-2xl md:text-3xl font-bold text-white italic opacity-90 max-w-4xl mx-auto leading-relaxed">
                    &quot;Trusted by growing enterprises and established organizations across India&quot;
                </h3>
            </div>

            <div className="relative flex overflow-hidden">
                <div className="marquee-container flex items-center gap-10 px-6">
                    {marqueeItems.map((client, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 flex items-center justify-center bg-white p-8 w-64 h-32 rounded-lg group hover:shadow-[0_0_20px_rgba(13,148,136,0.3)] transition-all duration-500 hover:scale-105"
                        >
                            <div className="relative w-full h-full flex items-center justify-center">
                                <img
                                    src={client.localPath}
                                    alt={client.name}
                                    className="max-w-full max-h-full object-contain"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        target.nextElementSibling?.classList.remove('hidden');
                                    }}
                                />
                                <span className="hidden text-[#0a192f] font-black tracking-widest text-xs uppercase text-center opacity-70 group-hover:opacity-100 transition-opacity">
                                    {client.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Side Fades for Marquee */}
            <div className="absolute top-0 bottom-0 left-0 w-40 bg-gradient-to-r from-[#0a192f] via-[#0a192f]/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-40 bg-gradient-to-l from-[#0a192f] via-[#0a192f]/80 to-transparent z-20 pointer-events-none" />

            {/* Floating gradient lights */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0d9488]/10 rounded-full blur-[120px] pointer-events-none -z-0" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0d9488]/5 rounded-full blur-[120px] pointer-events-none -z-0" />
        </section>
    );
}
