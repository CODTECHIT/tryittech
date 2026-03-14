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
            className="relative pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20 overflow-hidden"
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
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-6 md:mb-10 uppercase tracking-tighter"
                    style={{ color: finalTextColor }}
                >
                    {title}
                </h1>

                {subtitle && (
                    <div className="relative max-w-2xl md:max-w-3xl mx-auto">
                        <div
                            className="relative p-4 md:p-6 lg:p-8 bg-transparent rounded-xl md:rounded-2xl border-l-4 group"
                            style={{ borderLeftColor: finalAccentColor }}
                        >
                            <Quote
                                className="absolute top-3 left-3 md:top-4 md:left-4 w-6 h-6 md:w-10 md:h-10 opacity-20 group-hover:opacity-40 transition-all duration-300"
                                style={{ color: finalAccentColor }}
                            />
                            <p className="text-base md:text-xl lg:text-2xl font-bold italic text-center relative z-10 leading-relaxed px-2 md:px-0" style={{ color: finalTextColor }}>
                                &ldquo;  {subtitle.replace(/^"|"$/g, '')}  &rdquo;
                            </p>
                        </div>
                    </div>
                )}

                <div
                    className="w-16 md:w-20 h-1 md:h-1.5 mx-auto mt-8 md:mt-12 rounded-full"
                    style={{ backgroundColor: finalAccentColor }}
                />
            </div>
        </div>
    );
}

