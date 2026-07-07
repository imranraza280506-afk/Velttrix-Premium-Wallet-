/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ArrowDown, Shield, Award, Sparkles } from "lucide-react";
import WalletModel3D from "../WalletModel3D";

interface HeroProps {
  onExploreClick: () => void;
  onAcquireClick: () => void;
}

export default function Hero({ onExploreClick, onAcquireClick }: HeroProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Elegant entry animation for elements using GSAP
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: "power4.out",
          delay: 0.5,
        }
      );

      gsap.fromTo(
        ".hero-badge",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "back.out(1.7)",
          delay: 0.3,
        }
      );
    }, textContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero-section"
      className="relative min-h-screen w-full flex items-center justify-start overflow-hidden bg-[#080808]"
    >
      {/* Premium ambient light background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-bronze-950/15 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-bronze-800/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-20 z-10">
        {/* Left Text Block */}
        <div ref={textContainerRef} className="col-span-1 lg:col-span-5 flex flex-col justify-center space-y-8">
          {/* Elite Award/Shield Badge */}
          <div className="hero-badge inline-flex items-center space-x-2 bg-bronze-950/40 border border-bronze-500/15 py-1 px-3.5 rounded-full w-fit">
            <Sparkles className="w-4.5 h-4.5 text-bronze-300 animate-pulse" />
            <span className="font-mono text-[9px] font-semibold tracking-widest text-bronze-200 uppercase">
              AWWRD-WINNING IMMERSIVE SHOWCASE
            </span>
          </div>

          {/* Heading with elegant typography */}
          <div className="space-y-4">
            <h1
              ref={headingRef}
              className="hero-reveal font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-f7ede3 tracking-tight leading-[1.05]"
            >
              The Metal Casing <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-bronze-300 via-bronze-400 to-bronze-600 font-display">
                Reimagined.
              </span>
            </h1>
            <p className="hero-reveal text-sm sm:text-base text-bronze-100/65 max-w-lg leading-relaxed font-sans font-light">
              Veltrix Wallet Emblem Premium unites aerospace durability with ultra-slim multi-slot utility.
              Engineered with modern metal mechanics and interactive accordion storage.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="hero-reveal grid grid-cols-2 gap-4 max-w-md pt-2">
            <div className="flex items-start space-x-2.5">
              <Shield className="w-5 h-5 text-bronze-400 mt-0.5" />
              <div>
                <h4 className="font-display font-medium text-xs text-bronze-200 uppercase tracking-wider">
                  Aerospace Casing
                </h4>
                <p className="text-[11px] text-bronze-100/50">High-grade aluminum brush</p>
              </div>
            </div>
            <div className="flex items-start space-x-2.5">
              <Award className="w-5 h-5 text-bronze-400 mt-0.5" />
              <div>
                <h4 className="font-display font-medium text-xs text-bronze-200 uppercase tracking-wider">
                  Durable Finish
                </h4>
                <p className="text-[11px] text-bronze-100/50">Anti-scratch copper plating</p>
              </div>
            </div>
          </div>

          {/* Action Call to Actions */}
          <div className="hero-reveal flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-5 pt-4">
            <div className="relative inline-block">
              <button
                onClick={onAcquireClick}
                className="px-8 py-4 rounded-sm bg-bronze-400 hover:bg-bronze-300 text-obsidian-950 font-mono text-xs tracking-widest font-bold uppercase transition-all duration-500 shadow-xl shadow-bronze-500/10 hover:shadow-bronze-400/30 active:scale-95 text-center w-full"
                id="hero-acquire-btn"
              >
                ACQUIRE VELTRIX — $9
              </button>
              <span className="absolute -top-3 -right-2.5 bg-red-600 text-white text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-full font-bold uppercase shadow-lg border border-red-500 animate-pulse z-20">
                90% OFF
              </span>
            </div>
            <button
              onClick={onExploreClick}
              className="px-8 py-4 rounded-sm border border-bronze-500/20 hover:border-bronze-400/80 bg-obsidian-900/40 hover:bg-obsidian-900/80 text-bronze-200 font-mono text-xs tracking-widest uppercase transition-all duration-300 active:scale-95 text-center"
              id="hero-explore-btn"
            >
              EXPLORE CRAFTSMANSHIP
            </button>
          </div>
        </div>

        {/* Right side container: Houses BOTH interactive 3D wallet models side-by-side */}
        <div className="col-span-1 lg:col-span-7 w-full flex flex-col space-y-6 justify-center">
          {/* Side-by-Side 3D Canvas Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full h-[380px] sm:h-[440px] md:h-[520px]">
            {/* Left Model: Closed Exterior Model */}
            <div className="relative w-full h-full glass rounded-3xl border border-bronze-500/10 overflow-hidden flex flex-col bg-[#070707]/90 shadow-2xl">
              {/* Decorative design elements */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[220px] h-[220px] rounded-full border border-bronze-500/5 animate-spin" style={{ animationDuration: "50s" }} />
                <div className="absolute top-4 left-4 font-mono text-[8px] text-bronze-300 uppercase tracking-widest bg-bronze-950/80 px-2 py-1 rounded border border-bronze-500/15">
                  01 / EXTERIOR FINISH
                </div>
              </div>
              <div className="w-full h-full relative z-10">
                <WalletModel3D autoRotateOnly={true} isOpenOverride={false} />
              </div>
            </div>

            {/* Right Model: Fanned-Open Interior Model */}
            <div className="relative w-full h-full glass rounded-3xl border border-bronze-500/10 overflow-hidden flex flex-col bg-[#070707]/90 shadow-2xl">
              {/* Decorative design elements */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[220px] h-[220px] rounded-full border border-dashed border-bronze-500/5 animate-spin" style={{ animationDuration: "35s", animationDirection: "reverse" }} />
                <div className="absolute top-4 left-4 font-mono text-[8px] text-bronze-300 uppercase tracking-widest bg-bronze-950/80 px-2 py-1 rounded border border-bronze-500/15">
                  02 / INTERNAL VAULT
                </div>
              </div>
              <div className="w-full h-full relative z-10">
                <WalletModel3D forceOpen={true} />
              </div>
            </div>
          </div>

          {/* Luxury Interactive Instruction Overlay */}
          <div className="text-center px-4 py-2.5 rounded-xl border border-bronze-500/10 bg-bronze-950/25 max-w-md mx-auto w-full">
            <p className="font-mono text-[9px] text-bronze-300 tracking-[3px] uppercase flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze-400 animate-ping" />
              INTERACTIVE 360° • CLICK & DRAG TO ROTATE INDIVIDUALLY
            </p>
          </div>
        </div>
      </div>

      {/* Elegant scroll prompt */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 pointer-events-none">
        <span className="font-mono text-[9px] tracking-[6px] text-bronze-400 uppercase animate-pulse">
          SCROLL TO UNRAVEL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-bronze-400/80" />
        </motion.div>
      </div>
    </section>
  );
}
