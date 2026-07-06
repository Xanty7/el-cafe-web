import { Divider } from "@/components/Divider";

export default function MenuLoading() {
  const skeletonCategories = [
    { name: "Cargando...", itemsCount: 4 },
    { name: "Preparando especialidades...", itemsCount: 3 },
  ];

  return (
    <>
      <div id="scroll-progress" className="w-[30%] transition-all duration-1000"></div>
      <main className="pt-20 min-h-screen bg-background">
        {/* HERO SKELETON */}
        <section className="relative w-full py-32 md:py-48 flex items-center justify-center overflow-hidden border-b border-primary/10 bg-primary/5 animate-pulse">
          <div className="relative z-10 max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop text-center">
            <span className="h-4 w-24 bg-primary/10 rounded-full inline-block mb-6"></span>
            <div className="h-12 md:h-16 w-64 md:w-96 bg-primary/10 rounded-lg mx-auto mb-6"></div>
            <div className="h-6 w-48 bg-primary/10 rounded-md mx-auto"></div>
          </div>
        </section>

        {/* STICKY BAR SKELETON */}
        <div className="sticky top-20 bg-background border-b border-primary/5 z-30 py-4 shadow-sm animate-pulse">
          <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop flex gap-6 overflow-hidden">
            <div className="h-8 w-28 bg-primary/5 rounded-full flex-none"></div>
            <div className="h-8 w-32 bg-primary/5 rounded-full flex-none"></div>
            <div className="h-8 w-24 bg-primary/5 rounded-full flex-none"></div>
          </div>
        </div>

        {/* CATEGORIES SKELETONS */}
        {skeletonCategories.map((cat, catIdx) => (
          <section key={catIdx} className="py-16 md:py-24 bg-surface-container-low animate-pulse">
            <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
              <div className="text-center mb-12 flex flex-col items-center">
                <div className="h-8 w-48 bg-primary/10 rounded-md mb-6 animate-pulse"></div>
                <Divider isLight={true} />
              </div>
              
              <div className="grid grid-cols-1 gap-6 text-left">
                {Array.from({ length: cat.itemsCount }).map((_, itemIdx) => (
                  <div key={itemIdx} className="border-b border-primary/5 pb-4">
                    <div className="flex justify-between items-start mb-2 gap-4">
                      <div className="h-6 w-1/3 bg-primary/10 rounded-md"></div>
                      <div className="h-6 w-16 bg-primary/10 rounded-md"></div>
                    </div>
                    <div className="h-4 w-2/3 bg-primary/5 rounded-md mt-2"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
