"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

interface ImageWithLightboxProps {
  src: string;
  alt: string;
  className?: string;
  images?: { src: string; alt: string }[];
  initialIndex?: number;
}

export const ImageWithLightbox: React.FC<ImageWithLightboxProps> = ({ 
  src, 
  alt, 
  className, 
  images, 
  initialIndex = 0
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Sync index when lightbox opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  const hasMultipleImages = !!(images && images.length > 1);

  const handleNext = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
    if (e) e.stopPropagation();
    if (images) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
  }, [images]);

  const handlePrev = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
    if (e) e.stopPropagation();
    if (images) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  }, [images]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      } else if (e.key === 'ArrowRight' && hasMultipleImages) {
        handleNext(e);
      } else if (e.key === 'ArrowLeft' && hasMultipleImages) {
        handlePrev(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hasMultipleImages, handleNext, handlePrev]);

  // Remove pointer-events-none from className if present to ensure the image is clickable
  const clickableClassName = className?.replace('pointer-events-none', '');

  const activeSrc = images && images.length > 0 ? images[currentIndex].src : src;
  const activeAlt = images && images.length > 0 ? images[currentIndex].alt : alt;

  return (
    <>
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`${clickableClassName} cursor-pointer transition-all duration-500 hover:brightness-105 hover:scale-[1.02] active:scale-[0.98] object-cover`}
          onClick={() => setIsOpen(true)}
        />
      </div>
      
      {mounted && isOpen && createPortal(
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-12 animate-modal-fade-in"
          onClick={() => setIsOpen(false)}
        >
          {/* Botón Cerrar */}
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 flex items-center justify-center text-white bg-white/10 hover:bg-white/25 rounded-full transition-all border border-white/20 hover:scale-105 active:scale-95 z-50 shadow-2xl cursor-pointer"
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
            aria-label="Cerrar"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
          
          {/* Botón Anterior */}
          {hasMultipleImages && (
            <button
              className="absolute left-4 md:left-8 w-12 h-12 flex items-center justify-center text-white bg-white/10 hover:bg-white/25 rounded-full transition-all border border-white/20 hover:scale-105 active:scale-95 z-50 shadow-2xl cursor-pointer"
              onClick={handlePrev}
              aria-label="Anterior"
            >
              <span className="material-symbols-outlined text-2xl">chevron_left</span>
            </button>
          )}

          {/* Contenedor Imagen */}
          <div className="relative max-w-full max-h-[90vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={activeSrc} 
              alt={activeAlt} 
              className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-sm animate-modal-zoom-in"
              key={activeSrc}
            />
            {activeAlt && (
              <p className="text-white/80 font-body-md text-sm mt-4 select-none text-center bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-sm">
                {activeAlt}
              </p>
            )}
          </div>

          {/* Botón Siguiente */}
          {hasMultipleImages && (
            <button
              className="absolute right-4 md:right-8 w-12 h-12 flex items-center justify-center text-white bg-white/10 hover:bg-white/25 rounded-full transition-all border border-white/20 hover:scale-105 active:scale-95 z-50 shadow-2xl cursor-pointer"
              onClick={handleNext}
              aria-label="Siguiente"
            >
              <span className="material-symbols-outlined text-2xl">chevron_right</span>
            </button>
          )}
        </div>,
        document.body
      )}
    </>
  );
};
