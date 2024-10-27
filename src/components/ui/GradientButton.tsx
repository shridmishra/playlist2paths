"use client";

import React from 'react';

const GradientButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ 
  children,
  className,
  ...props 
}) => {
  return (
    <button
      {...props}
      className={`
        relative
        inline-flex
        items-center
        justify-center
        px-4
        py-2
        sm:px-6
        sm:py-3
        text-sm
        sm:text-base
        font-medium
        text-white
        rounded-full
        overflow-hidden
        shadow-md
        transition-all
        duration-500
        ease-in-out
        bg-[#2c62e0]
        hover:shadow-lg
        hover:scale-[1.02]
        active:scale-[0.98]
        disabled:opacity-70
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        focus:outline-none
        focus:ring-2
        focus:ring-[#2c62e0]/50
        focus:ring-offset-2
        ${className || ''}
      `.trim()}
    >
      {/* Base gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
      
      {/* Top corner shine effect */}
      <div className="absolute -inset-1 bg-gradient-to-br from-white/20 via-transparent to-transparent blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default GradientButton;