"use client";

import { useEffect, useRef } from "react";

const images = [
  { src: "/interior.jpg", alt: "Interior" },
  { src: "/latte.jpg", alt: "Café especialidad" },
  { src: "/desayuno.jpg", alt: "Desayunos" },
  { src: "/frappe.jpg", alt: "Frappes" },
  { src: "/atmosfera.jpg", alt: "Atmosfera" },
  { src: "/pizza.jpg", alt: "Almuerzo" },
  { src: "/birra.jpg", alt: "Cerveza" },
  { src: "/cheesecake.jpg", alt: "Cheesecake" },
  { src: "/proceso.jpg", alt: "El proceso" },
];

export default function GaleriaPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = direction === 'left' ? -container.clientWidth / 1.5 : container.clientWidth / 1.5;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  useEffect(() => {
    // Scroll Progress Logic
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const progressEl = document.getElementById("scroll-progress");
      if (progressEl) {
        progressEl.style.width = scrolled + "%";
      }

      // Parallax effect for Hero Image
      const heroParallax = document.getElementById("hero-parallax-img");
      if (heroParallax) {
        heroParallax.style.transform = `translateY(${winScroll * 0.4}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Intersection Observer for Staggered Reveals
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      revealObserver.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      revealObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div id="scroll-progress"></div>
      <main className="pt-20 min-h-screen bg-surface-container-low">
        <section className="relative w-full py-32 md:py-48 flex items-center justify-center overflow-hidden border-b border-primary/10">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div id="hero-parallax-img" className="absolute inset-x-0 -top-[15%] h-[130%]">
              <img alt="Gallery Background" className="w-full h-full object-cover" src="/portada.jpg" />
            </div>
            <div className="absolute inset-0 bg-primary/70 mix-blend-multiply"></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop text-center reveal-on-scroll">
            <span className="text-xs md:text-sm font-semibold text-primary-fixed tracking-[0.2em] uppercase mb-6 block drop-shadow-md">Nuestra Esencia Visual</span>
            <h1 className="font-display-lg text-5xl md:text-7xl text-primary-fixed leading-none mb-6 uppercase tracking-widest drop-shadow-lg">
              GALERÍA
            </h1>
            <p className="text-lg md:text-2xl text-primary-fixed/90 italic drop-shadow-md">
              Momentos, detalles y la estética de lo cotidiano
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 overflow-hidden">
          <div className="relative group/carousel">
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto hide-scrollbar gap-8 px-margin-mobile md:px-margin-desktop pb-12 items-center transition-all snap-x snap-mandatory"
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex-none w-[85vw] md:w-[60vw] lg:w-[45vw] snap-center shrink-0 reveal-on-scroll delay-100"
                >
                  <div className="bg-surface-container overflow-hidden shadow-2xl group rounded-sm aspect-[4/5] md:aspect-video relative">
                    <img
                      alt={image.alt}
                      className="w-full h-full object-cover grayscale transition-all duration-[2000ms] group-hover:grayscale-0 group-hover:scale-105 pointer-events-none"
                      src={image.src}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      <span className="font-label-caps text-primary-fixed tracking-[0.3em] uppercase drop-shadow-md">{image.alt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollByAmount('left')}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-surface-container-low/90 backdrop-blur-md border border-primary/20 text-primary flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-primary hover:text-on-primary shadow-xl z-20 hover:scale-110 active:scale-95"
              aria-label="Anterior"
            >
              <span className="material-symbols-outlined">arrow_back_ios_new</span>
            </button>
            <button
              onClick={() => scrollByAmount('right')}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-surface-container-low/90 backdrop-blur-md border border-primary/20 text-primary flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-primary hover:text-on-primary shadow-xl z-20 hover:scale-110 active:scale-95"
              aria-label="Siguiente"
            >
              <span className="material-symbols-outlined">arrow_forward_ios</span>
            </button>
          </div>

          <div className="text-center mt-6 text-on-surface-variant/50 font-label-caps tracking-[0.3em] uppercase text-xs flex items-center justify-center gap-4 reveal-on-scroll delay-300">
            <span className="material-symbols-outlined text-sm hidden md:inline-block">mouse</span>
            <span className="material-symbols-outlined text-sm md:hidden">swipe</span>
            Usa las flechas para explorar
          </div>
        </section>
      </main>
    </>
  );
}
