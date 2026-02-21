import React from 'react';

interface AdBannerProps {
    type: 'horizontal' | 'vertical' | 'square';
    imageUrl: string;
    linkUrl: string;
    label?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ type, imageUrl, linkUrl, label = "Espacio Publicitario" }) => {
    const containerClasses = {
        horizontal: "w-full h-32 md:h-48 rounded-3xl overflow-hidden relative group my-8 shadow-sm",
        vertical: "w-full h-full min-h-[400px] rounded-3xl overflow-hidden relative group shadow-sm",
        square: "aspect-square rounded-3xl overflow-hidden relative group shadow-sm"
    };

    return (
        <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${containerClasses[type]} block border border-gray-100 transition-all hover:border-dr-blue hover:shadow-xl`}
        >
            <div className="absolute top-2 right-4 z-10">
                <span className="bg-white/80 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full text-gray-500 shadow-sm">
                    {label}
                </span>
            </div>
            <img
                src={imageUrl}
                alt="Publicidad"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/40 transition-all"></div>
        </a>
    );
};

export default AdBanner;
