"use client";

import { useRef } from "react";
import { ImageWithLightbox } from "@/components/ImageWithLightbox";

interface GalleryCarouselProps {
  images: string[];
}

export function GalleryCarousel({ images }: GalleryCarouselProps) {
  const galleryScrollRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: 'left' | 'right') => {
    if (!galleryScrollRef.current) return;
    const container = galleryScrollRef.current;
    const scrollAmount = direction === 'left' ? -container.clientWidth / 1.5 : container.clientWidth / 1.5;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="relative group/carousel">
      <div 
        ref={galleryScrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 md:grid md:grid-cols-3 md:h-[50vh] pb-8 md:pb-0"
      >
        {images.map((img, i) => (
          <div key={i} className="flex-none w-[85vw] h-[50vh] md:w-auto md:h-full relative group overflow-hidden bg-primary rounded-sm shadow-xl reveal-on-scroll delay-100 snap-center">
            <ImageWithLightbox src={img} alt="Gallery" className="w-full h-full object-cover transition-all duration-[2000ms] group-hover:scale-110 group-hover:brightness-110 opacity-90 group-hover:opacity-100" />
          </div>
        ))}
      </div>
      
      <button
        onClick={() => scrollGallery('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-surface-container-low/90 backdrop-blur-md border border-primary/20 text-primary flex items-center justify-center opacity-80 md:hidden shadow-xl z-20 active:scale-95"
        aria-label="Anterior"
      >
        <span className="material-symbols-outlined">arrow_back_ios_new</span>
      </button>
      
      <button
        onClick={() => scrollGallery('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-surface-container-low/90 backdrop-blur-md border border-primary/20 text-primary flex items-center justify-center opacity-80 md:hidden shadow-xl z-20 active:scale-95"
        aria-label="Siguiente"
      >
        <span className="material-symbols-outlined">arrow_forward_ios</span>
      </button>
    </div>
  );
}
