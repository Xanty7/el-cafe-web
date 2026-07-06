import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-margin-mobile text-center">
      <span className="text-xs md:text-sm font-semibold text-primary/60 tracking-[0.3em] uppercase mb-4 block">Error 404</span>
      <h1 className="font-display-lg text-4xl md:text-6xl text-primary mb-6 leading-none uppercase tracking-widest">
        Esta taza está vacía
      </h1>
      <p className="text-on-surface-variant font-body-lg text-base md:text-lg max-w-md leading-relaxed mb-12">
        La página que buscás no existe o se movió como un grano de café. Volvamos a empezar con un buen momento.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center gap-3 border border-primary text-primary px-8 py-4 font-label-caps text-xs md:text-label-caps uppercase hover:bg-primary hover:text-on-primary transition-all duration-500 tracking-widest hover:scale-105 active:scale-95 group/btn cursor-pointer"
      >
        <span className="material-symbols-outlined text-base transition-transform group-hover/btn:-translate-x-1">arrow_back</span>
        Volver al Inicio
      </Link>
    </main>
  );
}
