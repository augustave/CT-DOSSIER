import React from 'react';

export const AnimatedGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative w-full h-full animate-grid-enter motion-reduce:animate-none">
      {children}
    </div>
  );
};
