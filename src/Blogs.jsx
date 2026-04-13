import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// --- SECTION 1: Loading Screen ---
const LoadingScreen = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const words = ["Welcome", "to", "my Gallery"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 2700;
    
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * 100));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setTimeout(onComplete, 400);
      }
    };
    window.requestAnimationFrame(step);

    const intv = setInterval(() => {
      setWordIndex(prev => (prev + 1) % words.length);
    }, 900);
    return () => clearInterval(intv);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-8 text-text-primary">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-xs text-muted uppercase tracking-[0.3em]">
        Portfolio
      </motion.div>
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
          >
            {words[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex flex-col items-end w-full">
        <div className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums leading-none">
          {String(count).padStart(3, '0')}
        </div>
        <div className="w-full h-[3px] bg-stroke/50 mt-4 overflow-hidden relative">
          <div 
            className="absolute inset-y-0 left-0 accent-gradient w-full origin-left shadow-[0_0_8px_rgba(137,170,204,0.35)]"
            style={{ transform: `scaleX(${count / 100})` }}
          />
        </div>
      </div>
    </div>
  );
};


export default function Blogs() {
  const [isLoading, setIsLoading] = useState(true);
  const [expandedImg, setExpandedImg] = useState(null);

  // Animation References
  const parallaxRef = useRef(null);
  const contentRef = useRef(null);

  // Parallax GSAP
  useEffect(() => {
    if (isLoading) return;
    
    const ctx = gsap.context(() => {
      // Move columns in opposite directions as user scrolls through the min-h-[400vh] wrapper
      gsap.to(".parallax-col-1", {
        yPercent: -30, ease: "none",
        scrollTrigger: { trigger: parallaxRef.current, scrub: true }
      });
      gsap.to(".parallax-col-2", {
        yPercent: 30, ease: "none",
        scrollTrigger: { trigger: parallaxRef.current, scrub: true }
      });
    });
    
    return () => ctx.revert();
  }, [isLoading]);

  return (
    <div className="font-body bg-bg text-text-primary min-h-screen relative overflow-x-hidden">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      {/* Background Cosmic Video Fixed Behind Gallery */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video 
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_055001_8e16d972-3b2b-441c-86ad-2901a54682f9.mp4"
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Navbar fixed to top */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
        <div className="inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/50 p-1 transition-shadow duration-300">
          <Link to="/" className="relative group text-xs sm:text-sm rounded-full px-5 py-2 hover:text-text-primary transition-colors inline-block overflow-hidden">
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity -z-20" />
            <div className="absolute inset-[1px] rounded-full bg-bg backdrop-blur-md -z-10" />
            <span className="relative z-10 flex items-center gap-2 font-medium text-muted group-hover:text-white transition-colors">
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Home
            </span>
          </Link>
        </div>
      </nav>

      {/* Layer 1: Fixed Center Title (Independent of scrolling flow) */}
      <div className="fixed inset-0 flex flex-col items-center justify-center z-10 pointer-events-none w-screen h-screen">
          <div className="text-center px-6 w-full max-w-[800px] mx-auto">
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-bold drop-shadow-[0_0_10px_rgba(0,0,0,1)]">My Gallery</span>
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-display italic tracking-tight text-white mt-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Visual playground
              </h2>
              <p className="max-w-sm mx-auto mt-6 text-[#ccc] font-medium text-sm pb-8 drop-shadow-[0_0_10px_rgba(0,0,0,1)]">
                A scrolling view of exploratory layouts, moments, and visual memories.
              </p>
          </div>
      </div>

      {/* Main Parallax Gallery */}
      <main className="relative z-20 w-full pt-10">
        <section ref={parallaxRef} className="relative min-h-[400vh] parallax-wrapper">
          {/* Layer 2: Scrolling Images */}
          <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none w-full max-w-[1400px] mx-auto opacity-90 h-[100%] pt-[20vh] px-4 md:px-10">
            <div className="grid grid-cols-2 gap-8 md:gap-40 items-start h-[150%]">
               {/* Left Column Scrolls Upwards (-) */}
               <div className="parallax-col-1 flex flex-col gap-24 items-start pointer-events-none">
                 {[1,2,3,4,5,6].map(i => (
                   <motion.div 
                     key={`left-${i}`}
                     animate={{ y: [0, -15, 0] }}
                     transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                     className="w-full max-w-[400px] pointer-events-auto"
                   >
                     <motion.img 
                       src="/SharathGR2.png" 
                       alt="Gallery Entry" 
                       layoutId={`gallery-left-${i}`}
                       onClick={() => setExpandedImg({ id: `gallery-left-${i}`, src: "/SharathGR2.png" })}
                       initial={{ rotate: -4, scale: 1 }}
                       whileHover={{ rotate: 0, scale: 1.05, zIndex: 30 }}
                       transition={{ type: "spring", stiffness: 300, damping: 20 }}
                       className="w-full aspect-[4/5] object-cover bg-surface rounded-[40px] border border-white/10 shadow-2xl backdrop-blur-sm cursor-zoom-in" 
                     />
                   </motion.div>
                 ))}
               </div>
               
               {/* Right Column Scrolls Downwards (+) */}
               <div className="parallax-col-2 flex flex-col gap-32 items-end pt-[30vh] pointer-events-none">
                 {[1,2,3,4,5,6].map(i => (
                   <motion.div 
                     key={`right-${i}`}
                     animate={{ y: [0, 15, 0] }}
                     transition={{ duration: 5 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                     className="w-full max-w-[400px] pointer-events-auto"
                   >
                     <motion.img 
                       src="/SharathGR2.png" 
                       alt="Gallery Entry"
                       layoutId={`gallery-right-${i}`}
                       onClick={() => setExpandedImg({ id: `gallery-right-${i}`, src: "/SharathGR2.png" })}
                       initial={{ rotate: 3, scale: 1 }}
                       whileHover={{ rotate: 0, scale: 1.05, zIndex: 30 }}
                       transition={{ type: "spring", stiffness: 300, damping: 20 }}
                       className="w-full aspect-square object-cover bg-surface rounded-[40px] border border-white/10 shadow-2xl backdrop-blur-sm cursor-zoom-in" 
                     />
                   </motion.div>
                 ))}
               </div>
            </div>
          </div>

        </section>
      </main>

      {/* Lightbox / Img Expansion */}
      <AnimatePresence>
        {expandedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedImg(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-lg cursor-zoom-out p-4 md:p-12 overflow-hidden"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute top-8 text-white/50 text-sm tracking-widest uppercase font-bold"
            >
              Click anywhere to close
            </motion.div>
            
            <motion.img 
              layoutId={expandedImg.id}
              src={expandedImg.src}
              className="w-auto h-auto max-w-full max-h-full object-contain rounded-2xl md:rounded-[40px] shadow-2xl border border-white/10"
              alt="Expanded view"
              draggable={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
