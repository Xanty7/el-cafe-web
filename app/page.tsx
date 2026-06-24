import { Divider } from "@/components/Divider";
import { ScrollObserver } from "@/components/ScrollObserver";
import { GalleryCarousel } from "@/components/GalleryCarousel";
import { getMenuData } from "@/lib/sheets";
import { ImageWithLightbox } from "@/components/ImageWithLightbox";

export const revalidate = 60; // Revalidate at most every minute

export default async function Home() {
  const menuData = await getMenuData();

  // Pick 3 items to feature on the homepage.
  // We can pick specific ones or just the first few.
  const featuredItems = [];
  if (menuData.length > 0) {
    const specialCoffees = menuData.find(cat => {
      const normalized = cat.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return normalized.includes("cafeteria") || normalized.includes("cafe") || normalized.includes("coffee");
    });

    if (specialCoffees && specialCoffees.items.length > 0) {
      // Tomamos hasta 4 productos de la categoría de cafés
      featuredItems.push(...specialCoffees.items.slice(0, 4));
    }

    // Fallback if we couldn't find 4 items in the coffee category
    if (featuredItems.length < 4) {
      const allItems = menuData.flatMap(cat => cat.items);
      featuredItems.push(...allItems.slice(0, 4 - featuredItems.length));
    }
  }

  const galleryImages = [
    "/latte.jpg",
    "/atmosfera.jpg",
    "/desayuno.jpg"
  ];

  return (
    <>
      <ScrollObserver />
      <div id="scroll-progress"></div>
      <main className="min-h-screen">
        {/* HERO SECTION */}
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div id="hero-parallax-img" className="absolute inset-x-0 -top-[15%] h-[130%]">
              <img alt="Coffee Background" className="w-full h-full object-cover" src="/hero_portada.jpg" />
            </div>
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <div className="relative z-10 flex flex-col justify-between items-center h-full w-full max-w-container-max px-margin-mobile md:px-margin-desktop pt-32 pb-16">
            <div className="flex-1 flex items-center">
              <div className="text-center reveal-on-scroll">
                <span className="text-sm md:text-base font-semibold text-white tracking-[0.3em] uppercase mb-4 md:mb-6 block drop-shadow-lg">EST. 2026</span>
                <h1 className="font-display-lg text-5xl md:text-7xl text-white leading-none drop-shadow-2xl tracking-widest uppercase inline-block">
                  EL CAFÉ
                </h1>
                <p className="text-white/80 mt-6 md:mt-8 font-body-lg text-xl md:text-2xl italic drop-shadow-md max-w-2xl mx-auto">
                  Lorem ipsum dolor sit, amet.
                </p>
              </div>
            </div>
            <a href="#heritage" className="text-primary-fixed font-label-caps text-xs tracking-widest uppercase flex flex-col items-center gap-2 hover:opacity-80 transition-opacity animate-bounce-slow drop-shadow-md">
              Deslizá hacia abajo
              <span className="material-symbols-outlined font-light">keyboard_arrow_down</span>
            </a>
          </div>
        </section>

        {/* HERITAGE SECTION */}
        <section className="py-24 md:py-32 bg-primary-container text-primary-fixed relative overflow-hidden" id="heritage">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-fixed/20 to-transparent"></div>
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
              <div className="reveal-on-scroll text-center md:text-left">
                <span className="text-xs md:text-sm font-semibold text-primary-fixed/80 tracking-[0.2em] uppercase mb-6 block">Nuestra esencia</span>
                <h2 className="font-headline-md text-headline-md md:text-5xl text-primary-fixed leading-tight mb-8">
                  Desde el primer sorbo.
                </h2>
                <div className="space-y-6 text-primary-fixed/90 font-body-lg">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit potenti, parturient pretium vivamus faucibus interdum tempus cursus, facilisi ullamcorper condimentum auctor arcu pulvinar bibendum.
                  </p>
                  <p>
                    Eleifend commodo at molestie inceptos congue hac fringilla accumsan dignissim velit, facilisis ut sociis.
                  </p>
                </div>
                {/* Button for desktop only */}
                <div className="mt-10 hidden md:block">
                  <a className="inline-flex items-center justify-center gap-3 border border-primary-fixed text-primary-fixed px-10 py-5 font-label-caps text-label-caps uppercase hover:bg-primary-fixed hover:text-primary transition-all duration-500 tracking-widest hover:scale-105 active:scale-95 group/btn" href="/nosotros">
                    Leer Más
                    <span className="material-symbols-outlined text-base transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-10">
                <div className="relative h-[40vh] md:h-[80vh] w-full bg-surface-container-high overflow-hidden rounded-sm shadow-2xl reveal-on-scroll delay-200">
                  <ImageWithLightbox
                    alt="Interior Café"
                    className="w-full h-full object-cover transition-transform duration-[3000ms] hover:scale-105 opacity-90"
                    src="/gallery_interior.png"
                  />
                </div>
                {/* Button for mobile only */}
                <div className="md:hidden flex justify-center reveal-on-scroll delay-300">
                  <a className="inline-flex items-center justify-center gap-3 border border-primary-fixed text-primary-fixed px-10 py-5 font-label-caps text-label-caps uppercase hover:bg-primary-fixed hover:text-primary transition-all duration-500 tracking-widest hover:scale-105 active:scale-95 group/btn" href="/nosotros">
                    Leer Más
                    <span className="material-symbols-outlined text-base transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                  </a>
                </div>
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
                Donde cada grano cuenta una historia de aroma y sabor.
              </h2>
              <Divider isLight={true} />
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {featuredItems.map((item, i) => (
                <div key={i} className="group border-b border-primary/20 pb-4 hover:border-primary transition-all duration-500 reveal-on-scroll">
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-primary group-hover:italic group-hover:translate-x-2 transition-all duration-500 flex-1">
                      {item.name}
                      {item.portion && (
                        <span className="block md:inline md:ml-3 text-sm md:text-base font-normal italic opacity-80 text-on-surface-variant/70">
                          ({item.portion})
                        </span>
                      )}
                    </h3>
                    <span className="font-body-md text-primary font-bold transition-transform duration-500 group-hover:-translate-x-2 whitespace-nowrap">{item.price}</span>
                  </div>
                  {item.description && <p className="font-body-md text-sm text-on-surface-variant/70">{item.description}</p>}
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

        {/* GALLERY SECTION */}
        <section className="py-16 md:py-24" id="gallery">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center mb-12 md:mb-16 reveal-on-scroll">
              <h2 className="font-headline-md text-headline-md md:text-5xl text-primary leading-tight mb-4">
                Galería
              </h2>
              <Divider isLight={true} />
            </div>

            <GalleryCarousel images={galleryImages} />

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
                  <p className="font-body-lg text-primary-fixed/70 md:pl-9">Calle 17 500<br />Gral. Pico, La Pampa</p>
                </div>
                <div className="reveal-on-scroll delay-200">
                  <h3 className="text-2xl font-bold text-primary-fixed mb-6 flex items-center justify-center md:justify-start gap-3">
                    <span className="material-symbols-outlined text-primary-fixed-dim">phone_iphone</span>
                    Contacto
                  </h3>
                  <p className="font-body-lg text-primary-fixed/70 md:pl-9">+54 2302 554433</p>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102948.33744654922!2d-63.834015!3d-35.65664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95c37ce2b17f5413%3A0x6b2b73315a67a0a6!2sGeneral%20Pico%2C%20La%20Pampa!5e0!3m2!1sen!2sar!4v1718000000000!5m2!1sen!2sar"
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
