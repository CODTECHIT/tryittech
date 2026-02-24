interface PageHeaderProps {
    title: string;
    subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <div className="relative pt-32 pb-20 bg-[#020617] overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://innovasolutions.com/wp-content/uploads/2025/03/SOL_TAL_L2_B1_Desktop-2.jpg')] bg-cover bg-center" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                        {subtitle}
                    </p>
                )}
                <div className="w-20 h-1 bg-[#008C78] mx-auto mt-10" />
            </div>
        </div>
    );
}
