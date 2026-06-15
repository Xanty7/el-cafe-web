import React from 'react';

interface DividerProps {
  className?: string;
  isLight?: boolean;
}

export const Divider: React.FC<DividerProps> = ({ className = "", isLight = true }) => {
  const lineClass = isLight ? "bg-primary/30" : "bg-primary-fixed/30";
  const iconClass = isLight ? "border-primary/40" : "border-primary-fixed/40";
  const solidClass = isLight ? "bg-primary/40" : "bg-primary-fixed/40";

  return (
    <div className={`flex items-center justify-center gap-3 mx-auto w-48 opacity-80 ${className}`}>
      <div className={`h-[1px] w-full ${lineClass}`}></div>
      <div className={`w-1.5 h-1.5 rotate-45 ${solidClass} flex-none rounded-sm`}></div>
      <div className={`w-2.5 h-2.5 rotate-45 border border-[1.5px] ${iconClass} flex-none rounded-sm`}></div>
      <div className={`w-1.5 h-1.5 rotate-45 ${solidClass} flex-none rounded-sm`}></div>
      <div className={`h-[1px] w-full ${lineClass}`}></div>
    </div>
  );
};
