/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Layers, Eye, ShieldCheck, Cpu } from "lucide-react";
import WalletModel3D from "../WalletModel3D";

export default function InteriorShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Elegant fade-in staggered animation for the text and elements
      gsap.fromTo(
        ".interior-fade",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      // Fine line accent animation
      gsap.fromTo(
        ".interior-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="interior-showcase-section"
      className="relative w-full bg-[#0a0a0a] py-24 border-b border-bronze-500/5 overflow-hidden"
    >
      {/* Decorative luxury gradient ambient lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-bronze-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mb-16">
          <span className="interior-fade font-mono text-[10px] uppercase tracking-[6px] text-bronze-400 block font-semibold">
            ACCORDION INTERNAL VAULT
          </span>
          <h2 className="interior-fade font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-f7ede3 tracking-tight leading-tight">
            Fanned Security & Access.
          </h2>
          <div className="interior-line w-24 h-[1px] bg-bronze-400 mx-auto" />
          <p className="interior-fade text-sm text-bronze-100/60 font-light font-sans leading-relaxed">
            Experience the internal masterpiece of our multi-slot mechanism. Fully fanned open at a precision 35° angle, organized to present your essential cards effortlessly.
          </p>
        </div>

        {/* Specifications grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl">
          
          {/* Left specification descriptors */}
          <div className="space-y-8">
            <div className="interior-fade space-y-2 border-l border-bronze-500/20 pl-5">
              <span className="font-mono text-[9px] text-bronze-400 tracking-wider uppercase block">
                01 / DESIGN PROFILE
              </span>
              <h4 className="font-display font-medium text-base text-f7ede3">
                Precision Hinge Pivot
              </h4>
              <p className="text-xs text-bronze-100/50 leading-relaxed font-sans font-light">
                Engineered with dual stainless steel spring joints that snap open reliably for lifetime operation.
              </p>
            </div>

            <div className="interior-fade space-y-2 border-l border-bronze-500/20 pl-5">
              <span className="font-mono text-[9px] text-bronze-400 tracking-wider uppercase block">
                02 / ARCHITECTURE
              </span>
              <h4 className="font-display font-medium text-base text-f7ede3">
                6-Compartment Fan
              </h4>
              <p className="text-xs text-bronze-100/50 leading-relaxed font-sans font-light">
                High-grade carbon polymer folds spread cards perfectly, avoiding overlapping and keeping magnetic strips safe.
              </p>
            </div>
          </div>

          {/* Right specification descriptors */}
          <div className="space-y-8">
            <div className="interior-fade space-y-2 border-l border-bronze-500/20 pl-5">
              <span className="font-mono text-[9px] text-bronze-400 tracking-wider uppercase block">
                03 / SHIELD TECHNOLOGY
              </span>
              <h4 className="font-display font-medium text-base text-f7ede3">
                Interlocking Seal
              </h4>
              <p className="text-xs text-bronze-100/50 leading-relaxed font-sans font-light">
                Features a silver metal internal protective rim to form an airtight dust and moisture block when clicked shut.
              </p>
            </div>

            <div className="interior-fade space-y-2 border-l border-bronze-500/20 pl-5">
              <span className="font-mono text-[9px] text-bronze-400 tracking-wider uppercase block">
                04 / PERFORMANCE
              </span>
              <h4 className="font-display font-medium text-base text-f7ede3">
                Secure Silver Clasp
              </h4>
              <p className="text-xs text-bronze-100/50 leading-relaxed font-sans font-light">
                Tactile releasing latch crafted from silver-chrome alloys. Opens smoothly in 0.2 seconds under single thumb pressure.
              </p>
            </div>
          </div>

        </div>

        {/* Technical annotation footer inside the section */}
        <div className="interior-fade mt-16 px-6 py-4 rounded-xl border border-bronze-500/10 bg-bronze-950/20 max-w-2xl text-center">
          <p className="font-mono text-[9px] text-bronze-300 tracking-[3px] uppercase flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-bronze-400 animate-ping" />
            Active Copper Finish Profile — Zero Interaction Required
          </p>
        </div>

      </div>
    </section>
  );
}
