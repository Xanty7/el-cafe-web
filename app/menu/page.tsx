import { Divider } from "@/components/Divider";
import { getMenuData } from "@/lib/sheets";
import { ScrollObserver } from "@/components/ScrollObserver";

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

        {menuData.map((category, index) => {
          const isLight = index % 3 === 0;
          const isDark = index % 3 === 1;
          
          const sectionBg = isLight ? 'bg-surface-container-low' : isDark ? 'dark-block' : 'bg-primary';
          const textMain = isLight ? 'text-primary' : 'text-primary-fixed';
          const textDesc = isLight ? 'text-on-surface-variant/70' : 'text-primary-fixed/70';
          const borderStyle = isLight ? 'border-primary/20 hover:border-primary' : 'border-primary-fixed/20 hover:border-primary-fixed';

          return (
            <section key={index} className={`py-16 md:py-24 ${sectionBg}`}>
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
      </main>
    </>
  );
}
