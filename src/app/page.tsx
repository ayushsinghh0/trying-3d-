"use client";

import { useEffect, useState } from "react";
import FrameSequence from "@/components/FrameSequence";
import FloatingGallery from "@/components/FloatingGallery";
import { SplineScene } from "@/components/SplineScene";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const COLLECTION_URL = "https://www.memeraki.com/collections/the-tree-of-life-paintings";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  const handleSequenceComplete = () => {
    setIntroFinished(true);
    const tl = gsap.timeline();
    tl.fromTo(
      ".reveal-text",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" }
    ).fromTo(
      ".reveal-line",
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 1.5, ease: "power4.out", transformOrigin: "top" },
      "-=1.0"
    );
  };

  const goToCollection = () => {
    window.open(COLLECTION_URL, "_blank");
  };

  return (
    <main className="relative min-h-screen bg-[#050505] text-[#f1f1f1] selection:bg-white selection:text-black">
      {!introFinished && <FrameSequence onComplete={handleSequenceComplete} />}

      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col overflow-hidden z-10 bg-[#050505]">

        {/* Background — Spline 3D Scene */}
        <div className="absolute inset-0 z-0">
          <img
            src="/products/tree_of_life.png"
            alt="Tree of Life Background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0">
            <SplineScene
              scene="https://prod.spline.design/GuyFukf478kZYzMq/scene.splinecode"
              className="w-full h-full"
            />
          </div>
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </div>

        {/* Top Navbar */}
        <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-20 reveal-text opacity-0">
          <div className="hidden md:block w-1/3 text-[10px] md:text-xs tracking-[0.15em] font-sans font-medium uppercase text-white/80">
            Artistry, Elevated
          </div>
          <a
            href={COLLECTION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-1/3 text-left md:text-center text-sm md:text-base tracking-[0.2em] font-serif uppercase text-white hover:text-white/70 transition-colors cursor-pointer"
          >
            Memeraki
          </a>
          <div className="hidden md:flex w-1/3 justify-end gap-6 text-[10px] md:text-xs tracking-[0.1em] font-sans font-medium text-white/80 uppercase">
            <a href={COLLECTION_URL} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-white transition-colors">Projects</a>
            <a href={COLLECTION_URL} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-white transition-colors">About</a>
            <a href={COLLECTION_URL} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-white transition-colors">Contact</a>
          </div>
        </div>

        {/* Hero Content - Center Massive — text is non-blocking so Spline 3D stays interactive */}
        <div className="relative flex-1 flex flex-col items-center justify-center w-full z-20 pointer-events-none px-4">
          <h1 className="w-full text-center text-[15vw] sm:text-[14vw] leading-[0.85] tracking-[-0.01em] font-serif uppercase text-white reveal-text opacity-0" style={{ transform: "scaleY(1.1)" }}>
             Memeraki
          </h1>
          <h2 className="mt-8 sm:mt-10 text-sm md:text-xl tracking-[0.4em] font-sans font-medium uppercase text-white/80 reveal-text opacity-0">
             Collection of Tree
          </h2>
        </div>

        {/* Bottom Elements */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-20 reveal-text opacity-0 pointer-events-auto hidden md:flex">
          {/* Bottom Left Paragraph */}
          <div className="w-1/3 max-w-sm">
            <p className="text-[10px] md:text-[11px] text-white/80 font-sans tracking-[0.02em] leading-[1.6]">
              We partner with the artisan community of India, and ambitious teams to push today&apos;s boundaries to design the possibilities of tomorrow through heritage art, motion design, and immersive 3D experiences.
            </p>
          </div>

          {/* Bottom Center Arrow */}
          <div className="w-1/3 flex justify-center pb-2">
               <button onClick={goToCollection} className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#f4f2ec] text-[#050505] flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
               </button>
          </div>

          {/* Bottom Right Legal / Copyright */}
          <div className="w-1/3 text-right">
             <div className="text-xl md:text-2xl font-serif tracking-widest text-white mb-2">©2026</div>
             <p className="text-[8px] md:text-[9px] text-white/50 tracking-[0.1em] uppercase font-sans leading-relaxed">
               Shipping Globally • Shark Tank India Featured<br/>
               Privacy Policy • Terms of Use • Cookie Policy
             </p>
          </div>
        </div>
        
        {/* Mobile bottom elements */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-col items-center gap-6 z-20 reveal-text opacity-0 pointer-events-auto md:hidden">
            <p className="text-[10px] text-center text-white/80 font-sans tracking-[0.02em] leading-relaxed">
              We partner with the artisan community of India, and ambitious teams to push today&apos;s boundaries to design the possibilities of tomorrow through heritage art.
            </p>
            <button onClick={goToCollection} className="w-12 h-12 rounded-full bg-[#f4f2ec] text-[#050505] flex items-center justify-center cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </button>
        </div>
      </section>

      {/* Floating Gallery Section */}
      <FloatingGallery />

      {/* Footer / Outro */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center bg-[#050505] overflow-hidden">
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none opacity-20">
          <div className="text-[25vw] font-serif font-bold tracking-tighter whitespace-nowrap opacity-10 blur-sm">
            MEMERAKI
          </div>
        </div>

        <div className="z-10 text-center mb-16">
          <a href={COLLECTION_URL} target="_blank" rel="noopener noreferrer">
            <h3 className="text-4xl md:text-5xl font-light font-serif tracking-tight mb-8 hover:text-white/70 transition-colors cursor-pointer">
              The Heritage Awaits
            </h3>
          </a>
          <a href={COLLECTION_URL} target="_blank" rel="noopener noreferrer">
            <button className="px-8 py-4 bg-white text-black text-xs font-mono tracking-widest uppercase hover:bg-neutral-200 transition-colors duration-300">
              Browse All Art
            </button>
          </a>
        </div>

        {/* Shark Tank Placeholder */}
        <a
          href={COLLECTION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-12 left-0 right-0 flex flex-col items-center justify-center z-20 cursor-pointer group"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase mb-4">Supported By</span>
          <div className="flex items-center gap-4 text-white/90 text-sm md:text-base font-medium tracking-widest uppercase font-serif group-hover:text-white transition-colors">
            <span>Memeraki</span>
            <span className="w-1.5 h-1.5 bg-white/30 rounded-full" />
            <span>Shark Tank India</span>
          </div>
        </a>
      </section>
    </main>
  );
}
