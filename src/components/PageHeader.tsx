import { Quote } from 'lucide-react';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    bgColor?: string;
    accentColor?: string;
    textColor?: string;
    transparent?: boolean;
}

export default function PageHeader({ title, subtitle, bgColor, accentColor, textColor, transparent }: PageHeaderProps) {
    const finalTextColor = textColor || 'white';
    const finalAccentColor = accentColor || '#008CC8';

    return (
        <div
            className={`relative pt-40 pb-20 overflow-hidden ${transparent ? 'bg-transparent' : ''}`}
            style={{ backgroundColor: !transparent ? (bgColor || '#020617') : undefined }}
        >
            {/* Background Decor */}
            <div className="absolute inset-0 opacity-10">
                {!transparent && (
                    <div className="absolute top-0 left-0 w-full h-full opacity-25 bg-[url('https://innovasolutions.com/wp-content/uploads/2025/03/SOL_TAL_L2_B1_Desktop-2.jpg')] bg-cover bg-center" />
                )}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <h1
                    className="text-5xl md:text-7xl font-black mb-10 uppercase tracking-tighter"
                    style={{ color: finalTextColor }}
                >
                    {title}
                </h1>

                {subtitle && (
                    <div className="relative max-w-3xl mx-auto">
                        <div
                            className="relative p-6 md:p-8 bg-transparent rounded-2xl border-l-4 group"
                            style={{ borderLeftColor: finalAccentColor }}
                        >
                            <Quote
                                className="absolute top-4 left-4 w-10 h-10 opacity-20 group-hover:opacity-40 transition-all duration-300"
                                style={{ color: finalAccentColor }}
                            />
                            <p className="text-xl md:text-2xl font-bold italic text-center relative z-10 leading-relaxed" style={{ color: finalTextColor }}>
                                &ldquo;  {subtitle.replace(/^"|"$/g, '')}  &rdquo;
                            </p>
                        </div>
                    </div>
                )}

                <div
                    className="w-20 h-1.5 mx-auto mt-12 rounded-full"
                    style={{ backgroundColor: finalAccentColor }}
                />
            </div>
        </div>
    );
}

