"use client";

import { useState, useEffect } from "react";

interface ImageGalleryProps {
    images: string[];
    title: string;
    status: string;
}

export function ImageGalleryClient({ images, title, status }: ImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000); // 3 seconds per image

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="w-full h-full relative bg-transparent flex flex-col overflow-hidden min-h-[350px]">
            {images.length > 0 ? (
                <>
                    {images.map((url, idx) => (
                        <div
                            key={idx}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                                }`}
                        >
                            <img
                                src={url}
                                alt={`${title} - Image ${idx + 1}`}
                                className="object-contain w-full h-full p-4 sm:p-8"
                            />
                        </div>
                    ))}

                    {/* Dots indicator */}
                    {images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-black/70 dark:bg-white/80 w-6" : "bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40 w-2"
                                        }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div className="w-full h-full absolute inset-0 flex flex-col items-center justify-center text-neutral-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-3 opacity-50">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <span>No images provided</span>
                </div>
            )}

            {/* Status Badge */}
            <div className="absolute top-5 right-5 z-20">
                <span className={`px-4 py-1.5 text-xs font-black tracking-widest uppercase rounded-full shadow-lg backdrop-blur-md transition-colors ${status === "ACTIVE" ? "bg-emerald-500/90 text-white" :
                    status === "SOLD" ? "bg-neutral-800/90 text-white border border-neutral-700" :
                        "bg-blue-600/90 text-white"
                    }`}>
                    {status}
                </span>
            </div>
        </div>
    );
}
