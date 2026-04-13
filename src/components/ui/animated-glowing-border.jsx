import React from 'react';

export const AnimatedGlowingBorder = ({ children, className }) => {
  return (
    <div className={`relative flex items-center justify-center group rounded-[16px] p-[1.5px] isolation-auto ${className || ''}`}>
        {/* Glow Layer 1 */}
        <div className="absolute z-[-1] overflow-hidden h-full w-full rounded-[16px] blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[2000px] before:h-[2000px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-60
                        before:bg-[conic-gradient(#000,#402fb5_5%,#000_38%,#000_50%,#cf30aa_60%,#000_87%)] before:transition-all before:duration-2000
                        group-hover:before:rotate-[-120deg]">
        </div>
        
        {/* Glow Layer 2 */}
        <div className="absolute z-[-1] overflow-hidden h-full w-full rounded-[16px] blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[2000px] before:h-[2000px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg]
                        before:bg-[conic-gradient(rgba(0,0,0,0),#18116a,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#6e1b60,rgba(0,0,0,0)_60%)] before:transition-all before:duration-2000
                        group-hover:before:rotate-[-98deg]">
        </div>

        {/* Glow Layer 3 */}
        <div className="absolute z-[-1] overflow-hidden h-full w-full rounded-[16px] blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[2000px] before:h-[2000px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg]
                        before:bg-[conic-gradient(rgba(0,0,0,0),#18116a,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#6e1b60,rgba(0,0,0,0)_60%)] before:transition-all before:duration-2000
                        group-hover:before:rotate-[-98deg]">
        </div>

        {/* Glow Layer 4 */}
        <div className="absolute z-[-1] overflow-hidden h-full w-full rounded-[16px] blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[2000px] before:h-[2000px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg]
                        before:bg-[conic-gradient(rgba(0,0,0,0),#18116a,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#6e1b60,rgba(0,0,0,0)_60%)] before:transition-all before:duration-2000
                        group-hover:before:rotate-[-98deg]">
        </div>

        {/* High Brightness Detail Layer */}
        <div className="absolute z-[-1] overflow-hidden h-full w-full rounded-[16px] blur-[2px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[2000px] before:h-[2000px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[83deg]
                        before:bg-[conic-gradient(rgba(0,0,0,0)_0%,#a099d8,rgba(0,0,0,0)_8%,rgba(0,0,0,0)_50%,#dfa2da,rgba(0,0,0,0)_58%)] before:brightness-140
                        before:transition-all before:duration-2000 group-hover:before:rotate-[-97deg]">
        </div>

        {/* Dark Core Detail Layer */}
        <div className="absolute z-[-1] overflow-hidden h-full w-full rounded-[16px] blur-[0.5px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[2000px] before:h-[2000px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-70
                        before:bg-[conic-gradient(#1c191c,#402fb5_5%,#1c191c_14%,#1c191c_50%,#cf30aa_60%,#1c191c_64%)] before:brightness-130
                        before:transition-all before:duration-2000 group-hover:before:rotate-[-110deg]">
        </div>

        <div className="relative z-10 w-full h-full rounded-[15px] bg-[#010201]/95 backdrop-blur-xl">
           {children}
        </div>
    </div>
  );
};
