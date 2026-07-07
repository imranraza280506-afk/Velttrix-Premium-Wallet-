/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight, Star, Heart } from "lucide-react";
import WalletModel3D from "../WalletModel3D";

export default function BrandStory() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Fade in text blocks staggered on scroll
      gsap.fromTo(
        ".story-fade",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Line fill animation for heading
      gsap.fromTo(
        ".story-line-fill",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="brand-story-section"
      className="relative min-h-screen w-full flex items-center justify-center bg-[#0c0c0c] py-24 border-y border-bronze-500/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left Column: Embedded Auto-Rotating 3D Wallet & Specs */}
        <div className="col-span-1 md:col-span-5 flex flex-col space-y-6 order-2 md:order-1 relative">
          <div className="w-full h-[350px] md:h-[450px] relative glass rounded-2xl border border-bronze-500/10 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Soft decorative golden glowing aura around where the 3D model will float */}
              <div className="w-72 h-72 rounded-full bg-bronze-500/10 blur-[120px] animate-pulse" />
            </div>
            
            {/* Inline 3D model with continuous slow rotation */}
            <div className="w-full h-full relative z-10">
              <WalletModel3D autoRotateOnly={true} />
            </div>
          </div>

          {/* Decorative luxury specs cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
            <div className="glass p-5 rounded-lg border border-bronze-500/10 hover:border-bronze-500/20 transition-all duration-500 hover:-translate-y-1">
              <span className="font-mono text-[9px] text-bronze-400 uppercase tracking-widest block mb-1">
                Dimension Profile
              </span>
              <p className="font-display font-medium text-lg text-f7ede3">
                8mm Ultra Slim Casing
              </p>
              <p className="text-xs text-bronze-100/50 mt-1">
                Engineered to sit perfectly in any front pocket without causing bulk.
              </p>
            </div>
            <div className="glass p-5 rounded-lg border border-bronze-500/10 hover:border-bronze-500/20 transition-all duration-500 hover:-translate-y-1">
              <span className="font-mono text-[9px] text-bronze-400 uppercase tracking-widest block mb-1">
                Weight Profile
              </span>
              <p className="font-display font-medium text-lg text-f7ede3">
                64 Grams Featherweight
              </p>
              <p className="text-xs text-bronze-100/50 mt-1">
                Uncompromising durability of pure aluminum without adding weight to your daily gear.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Immersive story content */}
        <div className="col-span-1 md:col-span-7 flex flex-col space-y-8 order-1 md:order-2">
          <div className="space-y-4">
            <span className="story-fade font-mono text-[10px] uppercase tracking-[6px] text-bronze-400 block font-semibold">
              BRAND PHILOSOPHY
            </span>
            <h2 className="story-fade font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-f7ede3 tracking-tight leading-tight">
              An Icon of Modern <br />
              Craftsmanship & Vision.
            </h2>
            <div className="story-line-fill w-28 h-[1px] bg-bronze-400 origin-left" />
          </div>

          <p className="story-fade text-sm sm:text-base text-bronze-100/70 leading-relaxed font-light font-sans max-w-xl">
            Veltrix is a luxury lifestyle Accessories atelier dedicated to modern men. We reject the bulky,
            unstylish leather folds of the past. Our vision is to elevate your everyday carry into an object
            of admiration and style.
          </p>

          <p className="story-fade text-sm text-bronze-100/50 leading-relaxed font-light max-w-xl">
            The Veltrix Wallet Emblem Premium represents the zenith of this mission. Crafted from top-tier
            metals, laser-etched with minimalist elegance, and completed with an internal accordion multi-slot
            system, it merges luxurious aesthetics with everyday performance.
          </p>

          <div className="story-fade flex items-center space-x-6 pt-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-obsidian-950 bg-bronze-900/60 flex items-center justify-center font-display text-[10px] font-bold text-bronze-200"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center space-x-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-bronze-400 text-bronze-400" />
                ))}
              </div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-bronze-200 mt-1">
                TRUSTED BY 25,000+ ENTREPRENEURS
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
