interface PageHeaderProps {
    title: string;
    subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <div className="relative pt-32 pb-20 bg-[#0a192f] overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full grayscale opacity-20 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
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
                <div className="w-20 h-1 bg-[#0d9488] mx-auto mt-10" />
            </div>
        </div>
    );
}
