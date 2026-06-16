"use client";

import { useEffect } from "react";

export function ScrollObserver() {
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

    // Wheel Event to force scroll past Hero (only for home page if hero exists)
    let isScrolling = false;
    const handleWheel = (e: WheelEvent) => {
      if (window.scrollY === 0 && e.deltaY > 0 && !isScrolling) {
        const nextSection = document.getElementById("heritage");
        if (nextSection) {
          e.preventDefault();
          isScrolling = true;
          const y = nextSection.getBoundingClientRect().top + window.scrollY - 80;
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

  return null;
}
