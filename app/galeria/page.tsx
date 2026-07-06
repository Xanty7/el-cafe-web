"use client";

import { useEffect } from "react";
import { Divider } from "@/components/Divider";
import { Carousel_003 } from "@/components/Carousel_003";

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
          <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop text-center mb-16 md:mb-24 reveal-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Lorem ipsum dolor
            </h2>
            <Divider isLight={true} className="mb-8" />
            <p className="font-body-lg text-lg md:text-xl text-on-surface-variant/80 italic leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipiscing, elit orci inceptos himenaeos in odio, mus tellus consequat sem neque. Mattis magna netus mi blandit, volutpat primis quam nunc, lectus at platea. Fringilla ad habitant porttitor.
            </p>
          </div>

          <div className="flex w-full items-center justify-center overflow-hidden py-4">
            <Carousel_003 images={images} showPagination loop showNavigation autoplay />
          </div>
        </section>
      </main>
    </>
  );
}
