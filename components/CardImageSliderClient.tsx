"use client";

import { useState, useEffect } from "react";

interface CardImageSliderProps {
    images: string[];
    title: string;
}

export function CardImageSliderClient({ images, title }: CardImageSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3500); // 3.5 seconds per image

        return () => clearInterval(interval);
    }, [images.length]);

    if (images.length === 0) return null;

    return (
        <div className="relative w-full h-full">
            {images.map((url, idx) => (
                <img
                    key={idx}
                    src={url}
                    alt={`${title} - Thumbnail ${idx + 1}`}
                    className={`absolute inset-0 h-full w-full object-contain p-2 drop-shadow-lg transition-all duration-1000 ease-in-out group-hover:scale-105 ${idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 scale-95"
                        }`}
                />
            ))}

            {/* Dots indicator for cards */}
            {images.length > 1 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {images.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-white w-4 shadow-sm" : "bg-white/40 w-1.5"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
