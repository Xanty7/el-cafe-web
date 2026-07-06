"use client";

import React, { useState, useEffect, useRef } from "react";
import { Divider } from "@/components/Divider";
import { MenuCategory } from "@/lib/sheets";

interface MenuCategorizedProps {
  menuData: MenuCategory[];
}

export function MenuCategorized({ menuData }: MenuCategorizedProps) {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    if (menuData.length > 0 && !activeCategory) {
      setActiveCategory(menuData[0].category);
    }
  }, [menuData, activeCategory]);

  // Track which category is currently scrolled into view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-120px 0px -60% 0px", // triggers when section enters the top viewport area
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    menuData.forEach((category) => {
      const el = sectionRefs.current[category.category];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [menuData]);

  const scrollToCategory = (categoryName: string) => {
    setActiveCategory(categoryName);
    const el = sectionRefs.current[categoryName];
    if (el) {
      const offset = 140; // Height of navbar + sticky menu bar
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Sticky categories bar */}
      <div className="sticky top-20 bg-background/95 backdrop-blur-md z-30 border-b border-primary/10 shadow-sm transition-all duration-300">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex items-center gap-6 overflow-x-auto py-4 hide-scrollbar snap-x snap-mandatory">
            {menuData.map((cat, i) => {
              const isActive = activeCategory === cat.category;
              return (
                <button
                  key={i}
                  onClick={() => scrollToCategory(cat.category)}
                  className={`snap-center flex-none font-label-caps text-xs uppercase tracking-widest px-4 py-2 border-b-2 transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "border-primary text-primary font-bold scale-[1.02]"
                      : "border-transparent text-on-surface-variant/60 hover:text-primary hover:border-primary/30"
                  }`}
                >
                  {cat.category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      {menuData.map((category, index) => {
        const isLight = index % 3 === 0;
        const isDark = index % 3 === 1;
        
        const sectionBg = isLight ? 'bg-surface-container-low' : isDark ? 'dark-block' : 'bg-primary';
        const textMain = isLight ? 'text-primary' : 'text-primary-fixed';
        const textDesc = isLight ? 'text-on-surface-variant/70' : 'text-primary-fixed/70';
        const borderStyle = isLight ? 'border-primary/20 hover:border-primary' : 'border-primary-fixed/20 hover:border-primary-fixed';

        return (
          <section 
            key={index} 
            id={category.category}
            ref={(el) => { sectionRefs.current[category.category] = el; }}
            className={`py-16 md:py-24 transition-colors duration-500 scroll-mt-36 ${sectionBg}`}
          >
            <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
              <div className="text-center mb-12 reveal-on-scroll">
                <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${textMain}`}>
                  {category.category}
                </h2>
                <Divider isLight={isLight} />
              </div>
              
              <div className="grid grid-cols-1 gap-6 text-left">
                {category.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex} 
                    className={`group border-b pb-4 transition-all duration-500 reveal-on-scroll delay-100 ${borderStyle}`}
                  >
                    <div className="flex justify-between items-start mb-2 gap-4">
                      <h3 className={`text-xl md:text-2xl font-bold group-hover:italic group-hover:translate-x-2 transition-all duration-500 flex-1 ${textMain}`}>
                        {item.name}
                        {item.portion && (
                          <span className={`block md:inline md:ml-3 text-sm md:text-base font-normal italic opacity-80 ${textDesc}`}>
                            ({item.portion})
                          </span>
                        )}
                      </h3>
                      <span className={`font-body-md font-bold transition-transform duration-500 group-hover:-translate-x-2 whitespace-nowrap ${textMain}`}>
                        {item.price}
                      </span>
                    </div>
                    {item.description && (
                      <p className={`font-body-md ${textDesc}`}>
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
