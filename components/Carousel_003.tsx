"use client";

import { motion } from "framer-motion";
import React from "react";
import { ImageWithLightbox } from "@/components/ImageWithLightbox";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";

import { cn } from "@/lib/utils";

const Carousel_003 = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 0,
}: {
  images: { src: string; alt: string }[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}) => {
  const css = `
  .Carousal_003 {
    width: 100%;
    height: 350px;
    padding-bottom: 50px !important;
  }
  
  .Carousal_003 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
  }

  .swiper-pagination-bullet {
    background-color: var(--color-on-surface) !important;
  }

  .Carousal_003 .swiper-button-next,
  .Carousal_003 .swiper-button-prev {
    display: none !important;
  }

  .Carousal_003 .custom-swiper-btn {
    position: absolute !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    background: rgba(255, 255, 255, 0.75) !important;
    backdrop-filter: blur(8px) !important;
    -webkit-backdrop-filter: blur(8px) !important;
    width: 46px !important;
    height: 46px !important;
    border-radius: 50% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
    border: 1px solid rgba(255, 255, 255, 0.4) !important;
    z-index: 10 !important;
    cursor: pointer !important;
    transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1) !important;
  }

  .Carousal_003 .custom-swiper-btn:hover {
    background: rgba(255, 255, 255, 0.95) !important;
    transform: translateY(-50%) scale(1.08) !important;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12) !important;
  }

  .Carousal_003 .custom-swiper-btn:active {
    transform: translateY(-50%) scale(0.95) !important;
  }

  .Carousal_003 .custom-swiper-next {
    right: 16px !important;
  }

  .Carousal_003 .custom-swiper-prev {
    left: 16px !important;
  }
`;

  // Swiper loop mode needs at least slidesPerView + active slides to render correctly.
  // For slidesPerView="auto" coverflow effect, we repeat the images to have at least 6 slides.
  const displayImages = React.useMemo(() => {
    if (!loop || images.length === 0) return images;
    let list = [...images];
    while (list.length < 6) {
      list = [...list, ...images];
    }
    return list;
  }, [images, loop]);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative w-full max-w-4xl px-5", className)}
    >
      <style>{css}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Swiper
          spaceBetween={spaceBetween}
          autoplay={
            autoplay
              ? {
                  delay: 1500,
                  disableOnInteraction: true,
                }
              : false
          }
          effect="coverflow"
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          loop={loop}
          coverflowEffect={{
            rotate: 40,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={
            showPagination
              ? {
                  clickable: true,
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: ".custom-swiper-next",
                  prevEl: ".custom-swiper-prev",
                }
              : false
          }
          className="Carousal_003"
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        >
          {displayImages.map((image, index) => (
            <SwiperSlide key={index} className="">
              <ImageWithLightbox
                className="h-full w-full object-cover rounded-sm"
                src={image.src}
                alt={image.alt}
                images={images}
                initialIndex={index % images.length}
              />
            </SwiperSlide>
          ))}
          {showNavigation && (
            <div>
              <div className="custom-swiper-next custom-swiper-btn">
                <span className="material-symbols-outlined text-primary select-none text-2xl">chevron_right</span>
              </div>
              <div className="custom-swiper-prev custom-swiper-btn">
                <span className="material-symbols-outlined text-primary select-none text-2xl">chevron_left</span>
              </div>
            </div>
          )}
        </Swiper>
      </motion.div>
    </motion.div>
  );
};

export { Carousel_003 };

// Skiper49 with hardcoded illustrations for reference/attribution
const Skiper49 = () => {
  const images = [
    {
      src: "/images/x.com/13.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/32.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/20.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/21.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/19.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/1.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/2.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/3.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/4.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/5.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/6.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-[#f5f4f3]">
      <Carousel_003 className="" images={images} showPagination loop />
    </div>
  );
};

export { Skiper49 };
