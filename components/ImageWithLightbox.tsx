"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ImageWithLightboxProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export const ImageWithLightbox: React.FC<ImageWithLightboxProps> = ({ src, alt, className, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  // Remove pointer-events-none from className if present to ensure the image is clickable
  const clickableClassName = className?.replace('pointer-events-none', '');

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`${clickableClassName} cursor-pointer`}
        onClick={() => setIsOpen(true)}
        {...props}
      />
      
      {mounted && isOpen && createPortal(
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-12 animate-modal-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 flex items-center justify-center text-white bg-white/10 hover:bg-white/25 rounded-full transition-all border border-white/20 hover:scale-105 active:scale-95 z-10 shadow-2xl"
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
            aria-label="Cerrar"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
          
          <img 
            src={src} 
            alt={alt} 
            className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-sm animate-modal-zoom-in"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>,
        document.body
      )}
    </>
  );
};
