import { getMenuData } from "@/lib/sheets";
import { ScrollObserver } from "@/components/ScrollObserver";
import { MenuCategorized } from "@/components/MenuCategorized";

export const revalidate = 60; // Revalidate at most every minute

export default async function MenuPage() {
  const menuData = await getMenuData();

  return (
    <>
      <ScrollObserver />
      <div id="scroll-progress"></div>
      <main className="pt-20 min-h-screen">
        <section className="relative w-full py-32 md:py-48 flex items-center justify-center overflow-hidden border-b border-primary/10">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div id="hero-parallax-img" className="absolute inset-x-0 -top-[15%] h-[130%]">
              <img alt="Menu Background" className="w-full h-full object-cover" src="/menu_hero.png" />
            </div>
            <div className="absolute inset-0 bg-primary/70 mix-blend-multiply"></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop text-center reveal-on-scroll">
            <span className="text-xs md:text-sm font-semibold text-primary-fixed tracking-[0.2em] uppercase mb-6 block drop-shadow-md">Carta Completa</span>
            <h1 className="font-display-lg text-5xl md:text-7xl text-primary-fixed leading-none mb-6 uppercase tracking-widest drop-shadow-lg">
              NUESTRO MENÚ
            </h1>
            <p className="text-lg md:text-2xl text-primary-fixed/90 italic drop-shadow-md">
              Explora nuestra cuidada selección de sabores
            </p>
          </div>
        </section>

        <MenuCategorized menuData={menuData} />
      </main>
    </>
  );
}
