"use client";

import React, { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-margin-mobile text-center">
      <span className="text-xs md:text-sm font-semibold text-primary/60 tracking-[0.3em] uppercase mb-4 block">Algo salió mal</span>
      <h1 className="font-display-lg text-4xl md:text-6xl text-primary mb-6 leading-none uppercase tracking-widest">
        Hubo una interrupción
      </h1>
      <p className="text-on-surface-variant font-body-lg text-base md:text-lg max-w-md leading-relaxed mb-12">
        No pudimos cargar la información en este momento. Puede deberse a un problema de conexión temporal.
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center justify-center gap-3 border border-primary text-primary px-8 py-4 font-label-caps text-xs md:text-label-caps uppercase hover:bg-primary hover:text-on-primary transition-all duration-500 tracking-widest hover:scale-105 active:scale-95 group/btn cursor-pointer"
      >
        <span className="material-symbols-outlined text-base">refresh</span>
        Reintentar Carga
      </button>
    </main>
  );
}
