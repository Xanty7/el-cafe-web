"use client";

import { useState } from "react";
import Link from "next/link";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 h-20 flex items-center bg-background border-b border-primary/10 text-primary">
        <div className="max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop flex justify-between items-center">
          <Link className="font-body-md text-2xl tracking-wide font-light text-primary transition-transform duration-300 hover:scale-[0.98]" href="/" onClick={() => setIsOpen(false)}>
            12oz
          </Link>
          <ul className="hidden md:flex items-center gap-8 font-label-caps text-on-surface-variant/80 uppercase text-body-md tracking-[0.3em]">
            <li><Link className="nav-link hover:text-primary transition-colors" href="/">Inicio</Link></li>
            <li><Link className="nav-link hover:text-primary transition-colors" href="/menu">Menú</Link></li>
            <li><Link className="nav-link hover:text-primary transition-colors" href="/galeria">Galería</Link></li>
            <li><Link className="nav-link hover:text-primary transition-colors" href="/nosotros">Nosotros</Link></li>
            <li><Link className="nav-link hover:text-primary transition-colors" href="/#hours">Encuéntranos</Link></li>
          </ul>
          <button 
            aria-label="Toggle Menu" 
            className="md:hidden text-primary transition-transform active:scale-90 relative w-8 h-8 flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span 
              className={`material-symbols-outlined absolute transition-all duration-300 transform ${
                isOpen ? "rotate-95 opacity-0 scale-75" : "rotate-0 opacity-100 scale-100"
              }`} 
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              menu
            </span>
            <span 
              className={`material-symbols-outlined absolute transition-all duration-300 transform ${
                isOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-95 opacity-0 scale-75"
              }`} 
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              close
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden fixed top-20 left-0 right-0 bottom-0 bg-primary z-40 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex items-center justify-center`}
      >
        <ul className="flex flex-col items-center gap-10 font-headline-md text-on-primary text-3xl uppercase tracking-widest w-full px-8 text-center">
          <li><Link href="/" onClick={() => setIsOpen(false)} className="block py-2 hover:opacity-70 transition-opacity">Inicio</Link></li>
          <li><Link href="/menu" onClick={() => setIsOpen(false)} className="block py-2 hover:opacity-70 transition-opacity">Menú</Link></li>
          <li><Link href="/galeria" onClick={() => setIsOpen(false)} className="block py-2 hover:opacity-70 transition-opacity">Galería</Link></li>
          <li><Link href="/nosotros" onClick={() => setIsOpen(false)} className="block py-2 hover:opacity-70 transition-opacity">Nosotros</Link></li>
          <li><Link href="/#hours" onClick={() => setIsOpen(false)} className="block py-2 hover:opacity-70 transition-opacity">Encuéntranos</Link></li>
        </ul>
      </div>
    </>
  );
}
