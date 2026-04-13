import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, Github, Linkedin, Mail, Code2, ExternalLink, ChevronRight, X, Compass } from 'lucide-react';
import Hls from 'hls.js';
import { Link } from 'react-router-dom';
import { FluidParticlesBackground } from './components/ui/fluid-particles-background';

// Memoized BackgroundVideo using hls.js for .m3u8 streams natively
const HlsVideo = memo(({ src, className, opacity = "opacity-100" }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    let hls;
    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true });
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current?.play().catch(e => console.log('Autoplay prevented', e));
      });
    } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
      // iOS Safari fallback
      videoRef.current.src = src;
      videoRef.current.addEventListener('loadedmetadata', () => {
        videoRef.current?.play().catch(e => console.log('Autoplay prevented', e));
      });
    }
    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={`absolute inset-0 w-full h-full object-cover -z-10 pointer-events-none mix-blend-screen ${className}`}
      autoPlay
      loop
      muted
      playsInline
    />
  );
});

// Animation variants
const fadeUpContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [showMoreProjects, setShowMoreProjects] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const techSkills = [
    "React.js", "Next.js", "TypeScript", "Node.js",
    "Python", "PyTorch", "AWS", "Docker", "Jenkins",
    "MongoDB", "Scikit-learn", "FastAPI"
  ];

  const projects = [
    {
      id: 1,
      name: "StudyBuddy — AI RAG Companion",
      desc: "NeuroNex 2026 Hackathon Winner: Full-stack AI tutor with multi-modal modes (PDF Core, Web Intel, Fast Research) backed by FAISS semantic retrieval, Groq Voice STT/TTS, and Llama 3.",
      stack: ["React", "FastAPI", "FAISS", "LangChain"],
      video: "https://ik.imagekit.io/ltf5ygxg9/STUDYBUDDY.mp4",
      repo: "https://github.com/DiganthGowdaGR/StudyBudy.git"
    },
    {
      id: 2,
      name: "AI Governance Suite",
      desc: "ML-powered model recommender and benchmarking matrix (ModelMatrix). Evaluates responses via Gemini judge, streaming live SSE telemetry, and matching prompt contexts for LLM routing cost-optimization.",
      stack: ["React", "FastAPI", "AWS Bedrock", "VertexAI"],
      video: "https://ik.imagekit.io/ltf5ygxg9/AI-GOV-R2.mp4",
      repo: "https://github.com/Capstone-82/POC-02.git"
    },
    {
      id: 3,
      name: "Cron Job Manager",
      desc: "Web-based task scheduler with REST APIs, email notifications, and real-time health monitoring. Secured against SQLi/XSS with 116+ test cases and 81% test coverage.",
      stack: ["Python", "FastAPI", "APScheduler", "SQLite"],
      video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260228_065522_522e2295-ba22-457e-8fdb-fbcd68109c73.mp4",
      repo: "https://github.com/pestechnology/PESU_EC_CSE_F_P65_Scheduled_Task_Execution_Service_Cron_Job_Manager_Ica-Sonic.git"
    }
  ];

  const moreProjects = [
    {
      id: 4,
      name: "ML Evaluation Suite",
      desc: "Suite of ML models including CNNs, SVM, and Clustering algorithms achieving 97.95% image classification accuracy.",
      stack: ["PyTorch", "Scikit-learn", "Python"],
      video: "https://ik.imagekit.io/ltf5ygxg9/ML-CLIPS.mp4"
    },
    {
      id: 6,
      name: "PESU KKC-EC club",
      desc: "Developed and managed the official website for a university club of 160+ members as the appointed IT Head.",
      stack: ["React", "Node.js", "Tailwind CSS"],
      video: "https://ik.imagekit.io/ltf5ygxg9/KKC-EC-CLIPS.mp4"
    }
  ];


  const blogs = [
    {
      id: 1,
      title: "1st Place — NeuroNex 2026 Hackathon",
      date: "Awarded",
      category: "Hackathon",
      link: "https://drive.google.com/file/d/1JkPeQXNuHyljfrIcfFM1h2_rytTDJ4YD/view",
      image: "/hacthonNeuroNex.jpeg"
    },
    {
      id: 2,
      title: "DevOps Internship (4 months) - Built CI/CD pipelines & Dockerized apps",
      date: "April 2024",
      category: "Experience",
      link: "https://drive.google.com/file/d/15_PaU78GsyUyjoBFB49V0vlFMAEE5Lyk/view",
      image: "/DevOps Certificate.jpg"
    },
    {
      id: 3,
      title: "Applied Data Science with Python - Simplilearn",
      date: "Completed",
      category: "Cert",
      link: "https://drive.google.com/file/d/1AHfbBdNqg1cuydz3ffXw5gP5PP8BOK_d/view",
      image: "/DataSCience SimpliLEarn.png"
    },
    {
      id: 4,
      title: "Machine Learning Workshop Certification",
      date: "Completed",
      category: "Training",
      link: "https://drive.google.com/file/d/1qcNLPOCteO8kzuOP87Q4Kk1_zVUBoeJs/view",
      image: "/ML.jpg"
    }
  ];

  const logoisumVideoMp4 = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4";
  const synapseLiquidM3u8 = "https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8";
  const clearInvoiceWaveM3u8 = "https://stream.mux.com/hUT6X11m1Vkw1QMxPOLgI761x2cfpi9bHFbi5cNg4014.m3u8";

  return (
    <>
      {/* PRELOADER */}
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-700 ease-in-out ${showPreloader ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div className="text-white font-barlow text-2xl md:text-4xl font-medium tracking-tight h-10 flex items-center">
          <span className="typewriter inline-block text-white/90">Welcome to my portfolio...</span>
        </div>
      </div>

      <div className="relative w-full overflow-x-hidden flex flex-col font-barlow selection:bg-white/20 text-white">

        {/* SECTION 1: HERO - Cinematic Dark Theme */}
        <section id="home" className="relative min-h-[100vh] w-full flex flex-col pt-6 z-10 bg-black">
          <div className="absolute inset-0 bg-black/40 z-[5] pointer-events-none mix-blend-multiply" />
          <video
            className="absolute top-0 left-0 w-full h-full object-contain z-0 opacity-90"
            src={logoisumVideoMp4}
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Smooth shadow transition at the very bottom blending into the About section's black background */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-black z-10 pointer-events-none" />

          <div className="relative z-20 flex flex-col h-full flex-grow">
            <header className="w-full flex justify-center px-4 sm:px-10 mt-2">
              <nav className="w-full max-w-4xl flex items-center justify-between bg-black/40 backdrop-blur-xl rounded-[16px] py-3 lg:py-4 px-6 shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300 border border-white/10">
                <div className="flex-shrink-0 cursor-pointer group flex items-center gap-2">
                  <div className="w-[22px] h-[22px] rounded-full border-[3px] border-white flex items-center justify-center relative">
                    <div className="w-[6px] h-[6px] bg-white rounded-full absolute -top-[5px] -right-[5px]"></div>
                  </div>
                  <span className="text-xl font-bold tracking-tight text-white group-hover:text-white/70 transition-colors">
                    SharartGR<span className="text-white/40">.</span>
                  </span>
                </div>

                <div className="hidden md:flex items-center space-x-10">
                  {['About', 'Works', 'Achievements', 'Gallery'].map((item) => (
                    item === 'Gallery' ? (
                      <Link
                        key={item}
                        to="/blogs"
                        className="text-[14px] font-semibold text-white/70 hover:text-white transition-colors"
                      >
                        {item}
                      </Link>
                    ) : (
                      <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-[14px] font-semibold text-white/70 hover:text-white transition-colors"
                      >
                        {item}
                      </a>
                    )
                  ))}
                </div>

                <div className="flex-shrink-0">
                  <a href="#contact" className="group flex items-center gap-3 bg-white text-black hover:bg-white/90 py-[10px] pl-[18px] pr-[10px] rounded-[12px] transition-all duration-300">
                    <span className="text-[13px] font-bold tracking-wide">Let's Connect</span>
                    <div className="bg-black/10 text-black w-7 h-7 flex items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight strokeWidth={2.5} size={15} />
                    </div>
                  </a>
                </div>
              </nav>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center text-center px-4 -mt-20">
              <motion.div
                initial="hidden" animate="show" variants={fadeUpContainer}
                className="flex flex-col items-center select-none max-w-3xl"
              >
                <motion.h1 variants={fadeUpItem} className="flex flex-col items-center mb-5 drop-shadow-[0_0_20px_rgba(0,0,0,0.6)] relative z-20">
                  <span className="font-semibold text-[38px] md:text-[64px] lg:text-[76px] leading-[1.1] tracking-[-2px] md:tracking-[-3px] text-white">
                    Hey hi, I'm
                  </span>
                  <span className="font-instrument italic text-[46px] md:text-[72px] lg:text-[86px] leading-[1.1] font-medium text-white drop-shadow-md">
                    Sharath GR
                  </span>
                </motion.h1>

                <motion.p variants={fadeUpItem} className="text-[15px] md:text-[17px] font-medium text-white/80 max-w-xl tracking-wide mb-10 drop-shadow-[0_0_10px_rgba(0,0,0,0.7)] relative z-20">
                  Full stack and DevOps engineer passionate about building high-performance, production-ready AI solutions and robust cloud infrastructure.
                </motion.p>

                <motion.div variants={fadeUpItem} className="flex gap-4 relative z-20">
                  {/* UPDATE YOUR DRIVE LINK HERE inside the href */}
                  <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white text-black px-8 py-[15px] rounded-2xl shadow-[0_8px_30px_rgb(255,255,255,0.08)] hover:shadow-[0_8px_40px_rgb(255,255,255,0.15)] hover:-translate-y-1 transition-all duration-300 font-bold text-[15px] tracking-wide group">
                    <span className="relative z-10">View My CV</span>
                    <ExternalLink size={18} strokeWidth={2.5} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </motion.div>
              </motion.div>
            </main>
          </div>
        </section>

        {/* SECTION 2: ABOUT ME - Synapse Dark Liquid Glassmorphism */}
        <section id="about" className="relative w-full pt-20 pb-16 bg-black text-white z-20 overflow-hidden">
          <HlsVideo src={synapseLiquidM3u8} className="opacity-90 saturate-0 portrait:opacity-70" />
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <motion.div
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUpContainer}
              className="flex flex-col md:flex-row gap-16 items-center"
            >
              <motion.div variants={fadeUpItem} className="w-full md:w-1/2">
                <div className="liquid-glass-strong rounded-[2.5rem] p-10 md:p-14 relative group bg-black/20 backdrop-blur-3xl">
                  <h2 className="text-[40px] md:text-[60px] font-instrument italic mb-8 drop-shadow-sm">About Me</h2>
                  <div className="space-y-6 text-white/80 text-lg leading-relaxed font-medium">
                    <p>
                      I am an engineering student with hands-on experience in building responsive web applications, scalable backend systems, and machine learning models.
                    </p>
                    <p>
                      Skilled in React, PyTorch, and AWS cloud infrastructure. I'm passionate about developing high-performance solutions across the full stack with a focus on real-world impact. Recently, I won <a href="https://drive.google.com/file/d/1JkPeQXNuHyljfrIcfFM1h2_rytTDJ4YD/view" target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:text-green-400 underline decoration-white/30 hover:decoration-green-400 transition-colors">1st place in the NeuroNex 24hr state-level hackathon</a> over 54 competing teams!
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUpItem} className="w-full md:w-1/2 flex justify-center relative">
                {/* Background glowing orb */}
                <div className="absolute w-64 h-64 bg-white/10 rounded-full blur-[80px] -z-10" />

                <div className="liquid-glass w-72 h-72 md:w-96 md:h-96 rounded-full flex items-center justify-center relative group transition-transform duration-700 hover:scale-[1.02] p-2 border border-white/10">
                  <img src="/SharathGR2.png" alt="Sharath GR" className="w-full h-full object-cover rounded-full filter grayscale hover:grayscale-0 transition-all duration-700 opacity-90 group-hover:opacity-100" />
                </div>
              </motion.div>
            </motion.div>

            {/* Infinite Marquee moving Tech Skills */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-24 pb-8 overflow-hidden relative w-full">
              <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none"></div>

              <div className="marquee-container gap-16 pause-on-hover px-10">
                {[...techSkills, ...techSkills].map((skill, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-2xl md:text-5xl font-instrument italic text-white/40 hover:text-white/90 transition-colors cursor-default whitespace-nowrap">{skill}</span>
                    <span className="w-2 h-2 rounded-full bg-white/20"></span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: PROJECTS - Timeline UI */}
        <section id="works" className="relative w-full pt-16 pb-32 bg-black text-white z-20 overflow-hidden">
          {/* Fluid Particles Background replacing old Earth video */}
          <FluidParticlesBackground className="opacity-90 saturate-150 mix-blend-screen" particleCount={1500} />

          {/* Edge gradients to blend with connecting sections, but center kept mostly clear */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none -z-10" />

          <div className="max-w-[80rem] mx-auto px-6 lg:px-12 relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="mb-40 flex flex-col items-center"
            >
              <h2 className="text-[52px] md:text-[76px] lg:text-[90px] font-instrument italic leading-[0.9] tracking-tight">Selected work</h2>
              {/* Removed redundant nav tab as requested */}
            </motion.div>

            <motion.div
              initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUpContainer}
              className="relative flex flex-col space-y-32 md:space-y-48"
            >
              {/* Central Timeline Line (Desktop only) */}
              <div className="absolute top-10 bottom-10 left-1/2 -ml-[1px] w-[2px] bg-white/5 hidden lg:block rounded-full" />

              {projects.map((proj, idx) => (
                <motion.div key={proj.id} variants={fadeUpItem} className={`group relative w-full flex flex-col lg:flex-row ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''} items-center justify-between gap-12 lg:gap-0`}>

                  {/* Timeline dot */}
                  <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-white/20 bg-black hidden lg:flex items-center justify-center z-10 shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:scale-125 transition-transform duration-500">
                    <div className="w-2 h-2 rounded-full bg-white/70 group-hover:bg-white group-hover:shadow-[0_0_10px_white] transition-all" />
                  </div>

                  {/* Text Container with Liquid Glass Card styling */}
                  <div className={`w-full lg:w-[42%] flex flex-col ${idx % 2 !== 0 ? 'lg:items-start' : 'lg:items-end lg:text-right'} items-start`}>
                    <div className={`relative p-8 md:p-12 liquid-glass rounded-[2.5rem] bg-black/20 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.02)] group-hover:shadow-[0_0_50px_rgba(255,255,255,0.05)] transition-all duration-700 flex flex-col ${idx % 2 !== 0 ? 'items-start' : 'items-start lg:items-end lg:text-right'}`}>
                      {/* Inner ambient glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-white/5 blur-[50px] -z-10 rounded-[2.5rem]" />

                      <h3 className="text-[32px] md:text-[42px] lg:text-[48px] font-instrument italic tracking-tight mb-4 leading-[1.05] drop-shadow-sm text-white group-hover:text-white transition-colors">{proj.name}</h3>
                      <p className={`text-[15px] md:text-[17px] text-white/50 mb-8 leading-relaxed font-medium`}>{proj.desc}</p>

                      <div className={`flex flex-wrap gap-2 mb-10 ${idx % 2 !== 0 ? 'justify-start' : 'justify-start lg:justify-end'}`}>
                        {proj.stack.map(tech => (
                          <span key={tech} className="px-5 py-[6px] liquid-glass bg-white/5 border border-white/5 rounded-full text-[12px] font-bold text-white/80 transition-colors tracking-wide">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className={`flex items-center gap-4 ${idx % 2 !== 0 ? 'justify-start' : 'justify-start lg:justify-end'} w-full`}>
                        <a href={proj.live || proj.repo || "#"} target={proj.live || proj.repo ? "_blank" : "_self"} rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 liquid-glass rounded-full text-[14px] font-bold bg-white/5 hover:bg-white text-white hover:text-black transition-all duration-500 group/btn border border-white/10 shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                          View Project
                          <ArrowUpRight strokeWidth={2.5} size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </a>
                        <a href={proj.repo || "#"} target={proj.repo ? "_blank" : "_self"} rel="noopener noreferrer" className="liquid-glass w-[52px] h-[52px] flex items-center justify-center rounded-full bg-white/5 hover:bg-white transition-all duration-500 group/github border border-white/10 shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] text-white hover:text-black">
                          <Github size={20} className="group-hover/github:scale-110 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Video Thumbnail with Glass Bezel */}
                  <div className="w-full lg:w-[45%]">
                    <div className="p-3 liquid-glass rounded-[2.5rem] bg-black/20 backdrop-blur-sm border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.03)] group-hover:shadow-[0_0_80px_rgba(255,255,255,0.08)] group-hover:-translate-y-2 transition-all duration-700">
                      <div className="relative aspect-[16/10] w-full rounded-[2rem] overflow-hidden">
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-700 z-10 pointer-events-none" />
                        <video
                          className="w-full h-full object-cover saturate-50 group-hover:saturate-120 transition-all duration-1000 scale-105 group-hover:scale-100"
                          src={proj.video} autoPlay loop muted playsInline
                        />
                      </div>
                    </div>
                  </div>

                </motion.div>
              ))}
            </motion.div>

            {/* Load More Button */}
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-32 flex justify-center w-full"
            >
              <button
                onClick={() => setShowMoreProjects(!showMoreProjects)}
                className="group relative px-10 py-4 liquid-glass rounded-full text-[15px] font-bold text-white hover:bg-white transition-all duration-500 overflow-hidden border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
              >
                <span className="relative z-10 group-hover:text-black flex items-center gap-3">
                  {showMoreProjects ? 'Hide Projects' : 'More Projects'}
                  <ArrowUpRight strokeWidth={3} className={`transition-transform duration-500 ${showMoreProjects ? 'rotate-180' : 'group-hover:rotate-45'}`} />
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></div>
              </button>
            </motion.div>

            {/* More Projects - Old Design Grid */}
            <motion.div
              initial={false}
              animate={{ height: showMoreProjects ? 'auto' : 0, opacity: showMoreProjects ? 1 : 0 }}
              className="overflow-hidden"
            >
              <div className="pt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                {moreProjects.map((proj) => (
                  <div key={proj.id} className="group relative liquid-glass rounded-[2rem] flex flex-col transition-all duration-500 hover:-translate-y-3 z-10 bg-[#111]">

                    {/* Subtle hover glow tied to liquid glass border interaction */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-[2rem] -z-10" />

                    {/* Video Thumbnail Area */}
                    <div className="relative aspect-video w-full bg-black/50 overflow-hidden rounded-t-[2rem] m-[1.5px] mt-0 w-[calc(100%-3px)] border-b border-white/10">
                      <div className="absolute inset-0 bg-black/60 group-hover:opacity-0 transition-opacity duration-500 z-10 flex items-center justify-center text-white/30 group-hover:text-white/0">
                        <Play size={40} className="stroke-[1.5]" />
                      </div>
                      <video
                        className="absolute top-0 left-0 w-full h-full object-cover z-0 saturate-0 group-hover:saturate-100 transition-all duration-700"
                        src={proj.video} autoPlay loop muted playsInline
                      />
                    </div>

                    {/* Project Details */}
                    <div className="p-8 flex flex-col flex-grow relative z-20">
                      <h3 className="text-2xl font-bold mb-3 tracking-tight text-white">{proj.name}</h3>
                      <p className="text-[15px] text-white/50 mb-8 flex-grow leading-relaxed">{proj.desc}</p>

                      {/* Tech Stacks */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {proj.stack.map(tech => (
                          <span key={tech} className="text-xs font-semibold px-4 py-[6px] liquid-glass bg-white/5 rounded-full text-white/80">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex items-center justify-between pt-6 border-t border-white/10">
                        <div className="flex gap-4">
                          <a href="#" className="liquid-glass w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white group/btn" title="Live Demo">
                            <ExternalLink size={16} className="group-hover/btn:scale-110 transition-transform" />
                          </a>
                          <a href="#" className="liquid-glass w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white group/btn" title="GitHub">
                            <Github size={16} className="group-hover/btn:scale-110 transition-transform" />
                          </a>
                        </div>
                        <a href="#" className="text-sm font-semibold hover:text-white/80 tracking-wide flex items-center gap-1 group/rm text-white">
                          Read More <ChevronRight size={16} className="group-hover/rm:translate-x-1 transition-transform inline" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </section>

        {/* SECTION 4: ACHIEVEMENTS */}
        <section id="achievements" className="relative w-full py-32 bg-black text-white z-20 overflow-hidden">
          <div className="max-w-[80rem] mx-auto px-6 lg:px-12 relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="mb-12 border-b border-white/10 pb-6"
            >
              <h2 className="text-[50px] md:text-[70px] lg:text-[90px] font-instrument italic leading-[0.9] tracking-tight">Achievements</h2>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={fadeUpContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
            >
              {blogs.slice(0, 3).map((blog, idx) => (
                <motion.a href={blog.link || "#"} target="_blank" rel="noopener noreferrer" key={blog.id} variants={fadeUpItem} className="group cursor-pointer flex flex-col p-6 liquid-glass rounded-[2.5rem] bg-black/20 hover:bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.01)] hover:shadow-[0_0_50px_rgba(255,255,255,0.05)] hover:-translate-y-2">

                  {/* Elevated Premium Abstract Image Placeholder */}
                  <div className="w-full aspect-[4/3] liquid-glass-strong rounded-[2rem] mb-8 overflow-hidden relative border border-white/10 shadow-[inner_0_0_50px_rgba(255,255,255,0.05)] bg-[#0a0a0a]">
                    <div className={`absolute top-0 left-0 w-full h-full opacity-30 group-hover:opacity-60 transition-opacity duration-700 blur-[40px] mix-blend-screen
                      ${idx === 0 ? 'bg-[radial-gradient(ellipse_at_top_right,_#4ade80,_transparent)]' :
                        idx === 1 ? 'bg-[radial-gradient(ellipse_at_bottom_left,_#60a5fa,_transparent)]' :
                          idx === 2 ? 'bg-[radial-gradient(ellipse_at_center,_#c084fc,_transparent)]' :
                            'bg-[radial-gradient(ellipse_at_top_left,_#f472b6,_transparent)]'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/80" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                      <span className="text-xs font-bold tracking-widest uppercase text-white drop-shadow-md">View Activity</span>
                      <div className="w-8 h-8 rounded-full liquid-glass bg-white text-black flex items-center justify-center">
                        <ArrowUpRight size={16} strokeWidth={3} />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow px-2">
                    <div className="flex items-center gap-3 text-[11px] text-white/40 font-bold mb-4 uppercase tracking-[0.2em]">
                      <span className="text-white/70">{blog.category}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20"></span>
                      <span>{blog.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white/80 group-hover:text-white transition-colors leading-[1.3] tracking-tight">
                      {blog.title}
                    </h3>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SECTION 5: CONTACT / FOOTER - ClearInvoice Vibrant Spectral Wave */}
        <section id="contact" className="relative w-full pt-40 pb-12 bg-black border-t border-white/5 z-20 overflow-hidden text-white">
          <HlsVideo src={clearInvoiceWaveM3u8} className="opacity-90 saturate-150 object-cover" />
          <div className="absolute inset-x-0 -top-20 h-40 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
          {/* Subtle dimming but NO BLUR, ensuring crystal clear video quality */}
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />

          <div className="max-w-[80rem] mx-auto px-6 lg:px-12 relative z-20">
            <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 w-full mb-32">

              {/* Left Column: Big Typography */}
              <motion.div
                initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                className="w-full lg:w-5/12 flex flex-col justify-center"
              >
                <div className="liquid-glass w-fit px-4 py-2 rounded-full mb-8 flex items-center gap-3 border border-white/10 shadow-lg">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_10px_#22c55e]"></span>
                  </span>
                  <span className="text-xs font-bold tracking-widest uppercase text-white/70">Available for work</span>
                </div>

                <h1 className="text-[60px] md:text-[80px] lg:text-[100px] font-instrument italic leading-[0.9] tracking-tight mb-8">
                  Let’s build<br /><span className="text-white/60">the future.</span>
                </h1>

                <p className="text-lg text-white/50 leading-relaxed font-medium mb-12 max-w-md">
                  I'm currently accepting new projects. Whether you have a massive idea or just want to chat about tech, I'd love to hear from you.
                </p>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-2">Direct Contact</span>
                  <a href="mailto:sharathgowdagr08@gmail.com" className="text-2xl md:text-3xl font-bold hover:text-white/70 transition-colors inline-block w-fit relative group">
                    sharathgowdagr08@gmail.com
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full"></span>
                  </a>
                </div>
              </motion.div>

              {/* Right Column: Premium Form */}
              <motion.div
                initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full lg:w-7/12"
              >
                <form className="liquid-glass-strong p-8 md:p-12 rounded-[2.5rem] bg-black/30 backdrop-blur-2xl shadow-[0_0_50px_rgba(255,255,255,0.03)] border border-white/10 relative group">
                  {/* Form ambient glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-white/5 blur-[80px] -z-10 rounded-[2.5rem]" />

                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex flex-col gap-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/40">Name</label>
                        <input type="text" placeholder="John Doe" className="bg-transparent border-b border-white/20 pb-3 focus:outline-none focus:border-white text-white placeholder-white/20 transition-colors rounded-none" />
                      </div>
                      <div className="flex flex-col gap-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email</label>
                        <input type="email" placeholder="john@example.com" className="bg-transparent border-b border-white/20 pb-3 focus:outline-none focus:border-white text-white placeholder-white/20 transition-colors rounded-none" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Message</label>
                      <textarea rows="4" placeholder="Tell me about your project..." className="bg-transparent border-b border-white/20 pb-3 focus:outline-none focus:border-white text-white placeholder-white/20 transition-colors resize-none rounded-none"></textarea>
                    </div>

                    <button type="button" className="w-full py-5 rounded-full liquid-glass bg-white/5 hover:bg-white text-white hover:text-black font-bold text-lg transition-all duration-500 shadow-lg hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] mt-4">
                      Send Message
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>

            {/* Footer Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 liquid-glass px-10 py-6 rounded-full bg-black/40"
            >
              <div className="flex gap-4">
                <a href="https://github.com/DiganthGowdaGR" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:border-white/50 hover:bg-white text-white hover:text-black transition-all group shadow-sm">
                  <Github size={20} className="group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.linkedin.com/in/sharath-gowda-g-r-372832281/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:border-white/50 hover:bg-white text-white hover:text-black transition-all group shadow-sm">
                  <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
                </a>
                <a href="mailto:sharathgowdagr08@gmail.com" className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:border-white/50 hover:bg-white text-white hover:text-black transition-all group shadow-sm">
                  <Mail size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              </div>

              <div className="text-sm text-white/60 font-semibold tracking-widest uppercase">
                © {new Date().getFullYear()} SharartGR. <span className="opacity-40">All rights reserved.</span>
              </div>
            </motion.div>

          </div>
        </section>

      </div>

      {/* GLOBAL FLOATING NAVIGATION LOGIC */}
      <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[100] flex flex-col items-end gap-3 pointer-events-none">
        <AnimatePresence>
          {isNavOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col gap-3 items-end mb-2 pointer-events-auto"
            >
              {["Let's Connect", "Gallery", "Achievements", "Works", "About"].map((item) => (
                item === 'Gallery' ? (
                  <Link
                    key={item}
                    to="/blogs"
                    onClick={() => setIsNavOpen(false)}
                    className="px-6 py-[14px] liquid-glass rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-[15px] font-bold text-white hover:text-black hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                  >
                    {item}
                  </Link>
                ) : (
                  <a
                    key={item}
                    href={item === "Let's Connect" ? '#contact' : `#${item.toLowerCase()}`}
                    onClick={() => setIsNavOpen(false)}
                    className="px-6 py-[14px] liquid-glass rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-[15px] font-bold text-white hover:text-black hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                  >
                    {item}
                  </a>
                )
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="pointer-events-auto w-[60px] h-[60px] rounded-full liquid-glass bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center text-white"
        >
          {isNavOpen ? <X size={26} strokeWidth={2.5} /> : <Compass size={28} strokeWidth={2} className="animate-[pulse_3s_ease-in-out_infinite]" />}
        </button>
      </div>
    </>
  );
}

export default App;
