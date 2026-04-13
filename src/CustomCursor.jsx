import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Outer ring smooth tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, { damping: 25, stiffness: 350, mass: 0.5 });
  const smoothY = useSpring(cursorY, { damping: 25, stiffness: 350, mass: 0.5 });

  // Inner dot instantaneous tracking
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      dotX.set(e.clientX - 4); // 8px width divided by 2
      dotY.set(e.clientY - 4);
      cursorX.set(e.clientX - 20); // 40px width divided by 2
      cursorY.set(e.clientY - 20);
    };

    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      // Smart hover detection algorithm targeting interactive nodes
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'zoom-in' ||
        window.getComputedStyle(target).cursor === 'zoom-out'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, dotX, dotY, isVisible]);

  // If mobile touch device, don't mount the custom cursor styles
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      {/* Hide native OS cursor recursively on desktop only */}
      <style>{`
        @media (pointer: fine) {
          body, *, a, button, input, textarea {
            cursor: none !important;
          }
        }
      `}</style>
      
      {/* Outer Spring Physics Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[99999] hidden md:flex items-center justify-center mix-blend-difference"
        style={{ x: smoothX, y: smoothY, opacity: isVisible ? 1 : 0 }}
        animate={{ scale: isHovering ? 1.6 : 1 }}
        transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
      >
        <div className={`w-full h-full rounded-full transition-all duration-300 ${
          isHovering 
          ? 'scale-[0.8] bg-white opacity-100 border-[0px]' 
          : 'scale-100 opacity-60 border border-white bg-transparent'
        }`} />
      </motion.div>

      {/* Inner High-Fidelity Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100000] hidden md:block mix-blend-difference"
        style={{ x: dotX, y: dotY, opacity: isVisible ? 1 : 0 }}
        animate={{ scale: isHovering ? 0 : 1 }}
        transition={{ scale: { duration: 0.15 } }}
      />
    </>
  );
}
