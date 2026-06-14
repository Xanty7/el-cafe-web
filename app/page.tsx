"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const galleryScrollRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: 'left' | 'right') => {
    if (!galleryScrollRef.current) return;
    const container = galleryScrollRef.current;
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

    // Wheel Event to force scroll past Hero
    let isScrolling = false;
    const handleWheel = (e: WheelEvent) => {
      // If at the very top and scrolling down
      if (window.scrollY === 0 && e.deltaY > 0 && !isScrolling) {
        e.preventDefault();
        isScrolling = true;
        const nextSection = document.getElementById("heritage");
        if (nextSection) {
          const y = nextSection.getBoundingClientRect().top + window.scrollY - 80; // 80px navbar offset
          window.scrollTo({ top: y, behavior: "smooth" });

          setTimeout(() => {
            isScrolling = false;
          }, 1000);
        }
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      revealObserver.disconnect();
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <>
      <div id="scroll-progress"></div>
      <main className="min-h-screen">
        {/* HERO SECTION */}
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div id="hero-parallax-img" className="absolute inset-x-0 -top-[15%] h-[130%]">
              <img alt="Artisanal Coffee" className="w-full h-full object-cover hero-breath" src="/hero_portada.jpg" />
            </div>
            <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
          </div>
          <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center reveal-on-scroll">
            <span className="font-label-caps text-label-caps text-primary-fixed tracking-[0.4em] uppercase mb-12 block">Est. 2016</span>
            <h1 className="font-display-lg text-5xl md:text-7xl text-primary-fixed mb-6 leading-none tracking-widest uppercase">
              BARTOLO <span className="italic font-normal lowercase text-primary-fixed-dim">café</span>
            </h1>
            <p className="text-xl md:text-3xl text-primary-fixed/90 italic mb-16 tracking-tight">
              Lorem ipsum dolor sit, amet.
            </p>
          </div>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60 reveal-on-scroll delay-400">
            <span className="font-label-caps text-[10px] text-primary-fixed uppercase tracking-widest">deslizá hacia abajo</span>
            <span className="material-symbols-outlined text-primary-fixed text-sm animate-bounce">arrow_downward</span>

          </div>
        </section>

        {/* NUESTRA ESENCIA */}
        <section className="dark-block py-16 md:py-24" id="heritage">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
            <div className="max-w-3xl mx-auto">
              <span className="text-xs md:text-sm font-semibold text-secondary-fixed tracking-[0.2em] uppercase mb-8 block reveal-on-scroll">Nuestra Esencia</span>
              <h2 className="text-2xl md:text-3xl font-light italic text-primary-fixed/90 mb-12 reveal-on-scroll delay-100">
                "Lorem ipsum dolor sit amet consectetur, adipiscing elit aenean dictumst."
              </h2>
              <div className="aspect-square md:aspect-video w-full mb-16 overflow-hidden reveal-on-scroll delay-200 group rounded-sm">
                <img src="/gallery_interior.png" alt="Interior Bartolo Cafe" className="w-full h-full object-cover transition-all duration-[1500ms] group-hover:scale-105 group-hover:brightness-110" />
              </div>
              <div className="reveal-on-scroll delay-300">
                <p className="text-on-surface-variant font-body-lg md:text-lg mb-8 opacity-90 leading-relaxed max-w-2xl mx-auto text-primary-fixed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mollis nunc ut feugiat vehicula. Donec mattis vehicula sollicitudin. Cras luctus condimentum lacus et porttitor. Aliquam ac blandit sapien.
                </p>
                <a href="/nosotros" className="inline-flex items-center gap-3 mt-4 border border-primary-fixed text-primary-fixed px-10 py-5 font-label-caps text-label-caps uppercase hover:bg-primary-fixed hover:text-primary transition-all duration-500 tracking-widest hover:scale-105 active:scale-95 group/btn">
                  Leer más
                  <span className="material-symbols-outlined text-base transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* MENU PREVIEW */}
        <section className="py-16 md:py-24 bg-surface-container-low" id="menu">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center mb-16 reveal-on-scroll">
              <span className="text-xs md:text-sm font-semibold text-on-surface-variant tracking-[0.2em] uppercase mb-4 block">Carta Seleccionada</span>
              <h2 className="font-headline-md text-headline-md md:text-5xl text-primary leading-tight mb-4">
                Desde el primer café de la mañana hasta el sabor de cada plato.
              </h2>
              <div className="w-16 h-1 bg-primary/20 mx-auto rounded-full"></div>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                { name: "Café Bartolo", desc: "Café, baileys, crema y canela", price: "$7,500.00" },
                { name: "Bartoccino", desc: "Café, leche, dulce de leche y crema chantilly", price: "$6,500.00" },
                { name: "Avocado Toast", desc: "Pan de masa madre, palta pisada, huevo poché y semillas", price: "$6,000.00" },
              ].map((item, i) => (
                <div key={i} className="group border-b border-primary/20 pb-4 hover:border-primary transition-all duration-500 reveal-on-scroll">
                  <div className="flex justify-between items-end mb-2 gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-primary group-hover:italic group-hover:translate-x-2 transition-all duration-500 flex-1">{item.name}</h3>
                    <span className="font-body-md text-primary font-bold transition-transform duration-500 group-hover:-translate-x-2 whitespace-nowrap">{item.price}</span>
                  </div>
                  <p className="font-body-md text-sm text-on-surface-variant/70">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center reveal-on-scroll delay-400 md:mt-24">
              <a className="inline-flex items-center justify-center gap-3 border border-primary text-primary px-10 py-5 font-label-caps text-label-caps uppercase hover:bg-primary hover:text-on-primary transition-all duration-500 tracking-widest hover:scale-105 active:scale-95 group/btn" href="/menu">
                Ver Menú Completo
                <span className="material-symbols-outlined text-base transition-transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1">arrow_outward</span>
              </a>
            </div>
          </div>
        </section>

        {/* GALLERY PREVIEW */}
        <section className="py-16 md:py-24" id="gallery">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center mb-12 md:mb-16 reveal-on-scroll">
              <h2 className="font-headline-md text-headline-md md:text-5xl text-primary leading-tight mb-4">
                Galería
              </h2>
              <div className="w-16 h-1 bg-primary/20 mx-auto rounded-full"></div>
            </div>
            <div className="relative group/carousel">
              <div 
                ref={galleryScrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 md:grid md:grid-cols-3 md:h-[50vh] pb-8 md:pb-0"
              >
                {[
                  "/latte.jpg",
                  "/atmosfera.jpg",
                  "/desayuno.jpg"
                ].map((img, i) => (
                  <div key={i} className="flex-none w-[85vw] h-[50vh] md:w-auto md:h-full relative group overflow-hidden bg-primary rounded-sm shadow-xl reveal-on-scroll delay-100 snap-center">
                    <img src={img} alt="Gallery" className="w-full h-full object-cover transition-all duration-[2000ms] group-hover:scale-110 group-hover:brightness-110 opacity-90 group-hover:opacity-100" />
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
            
            <div className="text-center mt-6 text-on-surface-variant/50 font-label-caps tracking-[0.3em] uppercase text-xs flex items-center justify-center gap-4 md:hidden reveal-on-scroll delay-300">
              <span className="material-symbols-outlined text-sm animate-pulse">swipe_right</span>
              <span>Desliza para ver más</span>
            </div>
          </div>
          <div className="text-center mt-12 md:mt-24 reveal-on-scroll">
            <a className="inline-flex items-center justify-center gap-3 border border-primary text-primary px-10 py-5 font-label-caps text-label-caps uppercase hover:bg-primary hover:text-on-primary transition-all duration-500 tracking-widest hover:scale-105 active:scale-95 group/btn" href="/galeria">
              Explorar Galería
              <span className="material-symbols-outlined text-base transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
            </a>
          </div>
        </section>

        {/* REVIEWS SECTION */}
        <section className="py-16 md:py-24 bg-primary text-on-primary" id="reviews">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
            <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-12 block reveal-on-scroll opacity-60">Reseñas</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-12">
              {[
                { text: "Lorem ipsum dolor sit amet consectetur, adipiscing elit facilisi scelerisque.", author: "María S." },
                { text: "Lorem ipsum dolor sit amet consectetur, adipiscing elit felis.", author: "Juan P." },
                { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit habitant scelerisque, massa cursus dictumst.", author: "Ana L." }
              ].map((review, i) => (
                <div key={i} className={`flex flex-col items-center text-center reveal-on-scroll delay-${(i + 1) * 100}`}>
                  <span className="text-4xl leading-none h-6 font-display-lg opacity-30">"</span>
                  <p className="font-body-md text-sm md:text-base italic mb-4 max-w-xs opacity-90">
                    {review.text}
                  </p>
                  <span className="font-label-caps text-[10px] uppercase tracking-[0.2em] opacity-60">— {review.author}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ENCUENTRANOS SECTION */}
        <section className="bg-background overflow-hidden" id="hours">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-margin-mobile md:p-16 dark-block flex flex-col justify-center text-center md:text-left reveal-on-scroll">
              <span className="text-xs md:text-sm font-semibold text-primary-fixed-dim tracking-[0.2em] uppercase mb-12 block">Encuéntranos</span>
              <div className="space-y-16">
                <div className="reveal-on-scroll delay-100">
                  <h3 className="text-2xl font-bold text-primary-fixed mb-6 flex items-center justify-center md:justify-start gap-3">
                    <span className="material-symbols-outlined text-primary-fixed-dim">location_on</span>
                    Ubicación
                  </h3>
                  <p className="font-body-lg text-primary-fixed/70 md:pl-9">Calle 18 700-800<br />Gral. Pico, La Pampa</p>
                </div>
                <div className="reveal-on-scroll delay-200">
                  <h3 className="text-2xl font-bold text-primary-fixed mb-6 flex items-center justify-center md:justify-start gap-3">
                    <span className="material-symbols-outlined text-primary-fixed-dim">phone_iphone</span>
                    Contacto
                  </h3>
                  <p className="font-body-lg text-primary-fixed/70 md:pl-9">+54 2302 342711</p>
                </div>
                <div className="reveal-on-scroll delay-300">
                  <h3 className="text-2xl font-bold text-primary-fixed mb-6 flex items-center justify-center md:justify-start gap-3">
                    <span className="material-symbols-outlined text-primary-fixed-dim">schedule</span>
                    Horarios
                  </h3>
                  <ul className="font-body-md text-primary-fixed/70 space-y-4 md:pl-9">
                    <li className="flex justify-between border-b border-primary-fixed/20 pb-2 transition-colors hover:border-primary-fixed">
                      <span>Lun - Vie</span>
                      <span>08:00 - 20:00</span>
                    </li>
                    <li className="flex justify-between border-b border-primary-fixed/20 pb-2 transition-colors hover:border-primary-fixed">
                      <span>Sábados</span>
                      <span>09:00 - 21:00</span>
                    </li>
                    <li className="flex justify-between border-b border-primary-fixed/20 pb-2 transition-colors hover:border-primary-fixed">
                      <span>Domingos</span>
                      <span>Cerrado</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] md:h-auto overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.6644898814097!2d-63.756241525148596!3d-35.66063701408118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95c37d5ba4a02571%3A0x24e13f0cb6cfffeb!2sBartolo!5e0!3m2!1ses-419!2sar!4v1781390591113!5m2!1ses-419!2sar" 
                className="absolute inset-0 w-full h-full" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
