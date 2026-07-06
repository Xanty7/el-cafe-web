"use client";

import React, { useEffect, useRef } from "react";

interface TrustindexWidgetProps {
  widgetId: string;
  className?: string;
}

export function TrustindexWidget({ widgetId, className = "w-full min-h-[150px] flex justify-center items-center" }: TrustindexWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://cdn.trustindex.io/loader.js?${widgetId}`;
    script.defer = true;
    script.async = true;

    const container = containerRef.current;
    if (container) {
      container.appendChild(script);
    }

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [widgetId]);

  return (
    <div 
      ref={containerRef} 
      className={`transition-all duration-300 ${className}`}
    />
  );
}
