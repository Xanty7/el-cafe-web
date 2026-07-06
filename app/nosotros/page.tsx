"use client";

import { useEffect } from "react";
import { ImageWithLightbox } from "@/components/ImageWithLightbox";

export default function NosotrosPage() {
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
      threshold: 0.15,
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

  const storySteps = [
    {
      year: "2016",
      title: "El origen",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit odio, montes ligula aliquam urna tristique commodo ultricies lacus, nam primis aptent convallis aliquet ut dictum. Senectus viverra euismod vitae fringilla diam curabitur nibh sagittis, suspendisse elementum nostra varius himenaeos vestibulum cubilia.",
      image: "/nosotros_1.jpg",
      alt: "El local original"
    },
    {
      year: "2019",
      title: "Lorem ipsum dolor",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit odio, montes ligula aliquam urna tristique commodo ultricies lacus, nam primis aptent convallis aliquet ut dictum. Senectus viverra euismod vitae fringilla diam curabitur nibh sagittis, suspendisse elementum nostra varius himenaeos vestibulum cubilia.",
      image: "/nosotros_2.jpg",
      alt: "Barista preparando café de especialidad"
    },
    {
      year: "Hoy",
      title: "Lorem ipsum dolor",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit odio, montes ligula aliquam urna tristique commodo ultricies lacus, nam primis aptent convallis aliquet ut dictum. Senectus viverra euismod vitae fringilla diam curabitur nibh sagittis, suspendisse elementum nostra varius himenaeos vestibulum cubilia.",
      image: "/nosotros_3.jpg",
      alt: "Gente disfrutando en 12 Onzas"
    }
  ];

  return (
    <>
      <div id="scroll-progress"></div>
      <main className="pt-20 min-h-screen bg-surface-container-low overflow-x-hidden">
        <section className="relative w-full py-32 md:py-48 flex items-center justify-center overflow-hidden border-b border-primary/10">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div id="hero-parallax-img" className="absolute inset-x-0 -top-[15%] h-[130%]">
              <img alt="Fondo Nuestra Historia" className="w-full h-full object-cover" src="/nosotros_portada.jpg" />
            </div>
            <div className="absolute inset-0 bg-primary/70 mix-blend-multiply"></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop text-center reveal-on-scroll">
            <span className="text-xs md:text-sm font-semibold text-primary-fixed tracking-[0.2em] uppercase mb-6 block drop-shadow-md">Nuestra Historia</span>
            <h1 className="font-display-lg text-4xl md:text-7xl text-primary-fixed leading-none mb-6 uppercase tracking-widest drop-shadow-lg">
              NOSOTROS
            </h1>
            <p className="text-lg md:text-2xl text-primary-fixed/90 italic drop-shadow-md">
              El camino hacia el arte de la pausa
            </p>
          </div>
        </section>

        <section className="py-24 md:py-32 relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/10 -translate-x-1/2 z-0 hidden md:block"></div>

          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
            <div className="space-y-24 md:space-y-40">
              {storySteps.map((step, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={index} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 relative`}>

                    {/* Node marker on the central line */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary z-20 shadow-[0_0_0_12px_rgba(250,244,221,1)]"></div>

                    {/* Text Content */}
                    <div className={`w-full md:w-1/2 ${isEven ? 'md:text-right' : 'md:text-left'} reveal-on-scroll delay-100`}>
                      <span className="font-label-caps text-primary/60 tracking-[0.3em] uppercase mb-4 block text-lg">{step.year}</span>
                      <h2 className="text-3xl md:text-5xl font-display-lg text-primary mb-6 leading-tight">{step.title}</h2>
                      <p className="text-on-surface-variant font-body-lg md:text-lg leading-relaxed opacity-90">
                        {step.description}
                      </p>
                    </div>

                    {/* Image Content */}
                    <div className={`w-full md:w-1/2 reveal-on-scroll ${isEven ? 'delay-300' : 'delay-100'}`}>
                      <div className={`bg-surface-container overflow-hidden shadow-2xl rounded-sm aspect-[4/3] group relative`}>
                        <ImageWithLightbox
                          src={step.image}
                          alt={step.alt}
                          images={storySteps.map(s => ({ src: s.image, alt: s.alt }))}
                          initialIndex={index}
                          className="w-full h-full object-cover grayscale-[40%] transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-1000 pointer-events-none"></div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 bg-primary text-center border-t border-primary-fixed/10">
          <div className="max-w-2xl mx-auto px-margin-mobile md:px-margin-desktop reveal-on-scroll">
            <p className="font-display-lg text-3xl md:text-5xl text-primary-fixed mb-12 leading-tight italic">
              "Ven a escribir la próxima página con nosotros."
            </p>
            <a href="/menu" className="inline-flex items-center justify-center gap-3 border border-primary-fixed text-primary-fixed px-10 py-5 font-label-caps text-label-caps uppercase hover:bg-primary-fixed hover:text-primary transition-all duration-500 tracking-widest hover:scale-105 active:scale-95 group/btn">
              Descubrir Nuestro Menú
              <span className="material-symbols-outlined text-base transition-transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1">arrow_outward</span>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
