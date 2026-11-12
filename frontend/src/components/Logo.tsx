/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  light?: boolean;
  showTagline?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * The official Indore Colleges brand emblem/icon.
 * Uses the exact SVG uploaded by the user from /logo.svg.
 */
export function LogoIcon({ 
  className = "h-9 w-9", 
  light = false 
}: { 
  className?: string; 
  light?: boolean; 
}) {
  return (
    <img 
      src={light ? "/logo-transparent.svg" : "/logo.svg"} 
      alt="Indore Colleges Logo" 
      width={1123}
      height={928}
      className={`${className} object-contain shrink-0`}
    />
  );
}

/**
 * Full Indore Colleges Official Brand Logo.
 * Displays the exact SVG asset uploaded by the user with responsive sizing.
 */
export default function Logo({ 
  className = "", 
  iconOnly = false, 
  light = false,
  showTagline = true,
  size = 'md'
}: LogoProps) {
  const sizeClasses: Record<string, string> = {
    xs: "h-8",
    sm: "h-10",
    md: "h-12 sm:h-14",
    lg: "h-16 sm:h-18 lg:h-20",
    xl: "h-22 sm:h-26"
  };

  const currentHeight = sizeClasses[size] || "h-12 sm:h-14";

  if (iconOnly) {
    return (
      <div className={`inline-flex items-center shrink-0 ${className}`}>
        <LogoIcon className={currentHeight} light={light} />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center select-none group ${className}`}>
      {light ? (
        <div className="bg-white/95 backdrop-blur-xs rounded-xl px-2.5 py-1.5 shadow-xs border border-white/25 inline-flex items-center">
          <img 
            src="/logo.svg" 
            alt="Indore Colleges" 
            width={1123}
            height={928}
            className={`${currentHeight} w-auto object-contain shrink-0 transition-transform duration-300 group-hover:scale-105`}
          />
        </div>
      ) : (
        <img 
          src="/logo.svg" 
          alt="Indore Colleges" 
          width={1123}
          height={928}
          className={`${currentHeight} w-auto object-contain shrink-0 transition-transform duration-300 group-hover:scale-105`}
        />
      )}
    </div>
  );
}
