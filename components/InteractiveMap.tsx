"use client";

import React, { useState, useEffect, useRef } from "react";

export function InteractiveMap() {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Deactivate map when clicking outside its container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[400px] overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3217.172605553181!2d-63.75575402434551!3d-35.65924667259468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95c37de7c09bd151%3A0xc34edb57fb816ebf!2s12%20Onzas%20Cafe!5e0!3m2!1ses-419!2sar!4v1718000000000!5m2!1ses-419!2sar"
        className={`absolute inset-0 w-full h-full transition-all duration-300 ${
          isActive ? "pointer-events-auto" : "pointer-events-none md:pointer-events-auto"
        }`}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      
      {/* Mobile overlay - Only shown on smaller screens when map is not active */}
      {!isActive && (
        <div 
          onClick={() => setIsActive(true)}
          className="md:hidden absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 hover:bg-black/50 z-10"
        >
          <span className="material-symbols-outlined text-white text-3xl animate-pulse">touch_app</span>
          <span className="text-white font-label-caps text-xs tracking-widest uppercase text-center px-4 select-none">
            Toca para interactuar con el mapa
          </span>
        </div>
      )}
    </div>
  );
}
