'use client';

export default function ClientTrust() {
    const clients = [
        { name: "AWS Partner", localPath: "https://innovasolutions.com/wp-content/uploads/2025/03/AWS-Partner-Services-All-services-2.png" },
        { name: "Microsoft Azure", localPath: "https://innovasolutions.com/wp-content/uploads/2025/06/Microsoft-Azure@2x-p1.png" },
        { name: "Salesforce", localPath: "https://innovasolutions.com/wp-content/uploads/2025/03/customer-360.jpg" },
        { name: "Microsoft Security", localPath: "https://innovasolutions.com/wp-content/uploads/2025/06/Microsoft-Security@2x-p4.png" },
        { name: "Microsoft App Innovation", localPath: "https://innovasolutions.com/wp-content/uploads/2025/06/Microsoft-Digitalapp@2x-p2.png" },
        { name: "Snowflake", localPath: "https://innovasolutions.com/wp-content/uploads/2025/03/transforming_data_experience_mobile.jpg" }
    ];

    // Double the array for seamless infinite loop
    const marqueeItems = [...clients, ...clients];

    return (
        <section className="py-24 bg-[#020617] border-t border-white/5 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 mb-16">
                <h3 className="text-2xl md:text-3xl font-bold text-white italic opacity-90 max-w-4xl mx-auto leading-relaxed">
                    &quot;Trusted by growing enterprises and established organizations across India&quot;
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-[#008C78] to-[#008CC8] mx-auto mt-8" />
            </div>

            <div className="relative flex overflow-hidden">
                <div className="marquee-container flex items-center gap-10 px-6">
                    {marqueeItems.map((client, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 flex items-center justify-center bg-white p-8 w-64 h-32 rounded-lg group hover:shadow-[0_0_20px_rgba(0,140,120,0.3)] transition-all duration-500 hover:scale-105"
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
                                <span className="hidden text-[#020617] font-black tracking-widest text-xs uppercase text-center opacity-70 group-hover:opacity-100 transition-opacity">
                                    {client.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Side Fades for Marquee */}
            <div className="absolute top-0 bottom-0 left-0 w-40 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-40 bg-gradient-to-l from-[#020617] via-[#020617]/80 to-transparent z-20 pointer-events-none" />

            {/* Floating gradient lights */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#008C78]/10 rounded-full blur-[120px] pointer-events-none -z-0" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#008CC8]/5 rounded-full blur-[120px] pointer-events-none -z-0" />
        </section>
    );
}
