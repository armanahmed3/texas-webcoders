import React from 'react';

interface TexasWebcodersLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'auto';
  showTagline?: boolean;
}

export const TexasWebcodersLogo: React.FC<TexasWebcodersLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'light'
}) => {
  // Exact proportional height scaling
  const heightClasses = {
    xs: 'h-6 sm:h-7',
    sm: 'h-7 sm:h-8 md:h-9',
    md: 'h-9 sm:h-10 md:h-11',
    lg: 'h-11 sm:h-13 md:h-15',
    xl: 'h-14 sm:h-16 md:h-20'
  };

  const isDark = variant === 'dark';

  return (
    <div
      className={`inline-flex items-center justify-start select-none flex-shrink-0 group cursor-pointer ${heightClasses[size]} ${className}`}
    >
      <img
        src={isDark ? '/assets/texas-webcoders-logo-exact-white.png' : '/assets/texas-webcoders-logo-exact.png'}
        alt="Texas Webcoders - Software . Innovation . Transformation"
        style={{ maxHeight: '90%' }}
        className="h-full w-auto max-h-[90%] object-contain transition-transform duration-300 group-hover:scale-[1.02] drop-shadow-sm"
        loading="eager"
      />
    </div>
  );
};
