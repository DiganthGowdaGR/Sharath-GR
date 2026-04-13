import React from 'react';

export const GlowingShadowCard = ({ children, className }) => {
  return (
    <div className={`glow-container ${className || ''}`}>
      <div className="glow-content relative h-full w-full">
        {children}
      </div>
    </div>
  );
};
