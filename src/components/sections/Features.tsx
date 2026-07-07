/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Shield, Sparkles, Feather, Minimize, Lock, Gift } from "lucide-react";

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const featureItems = [
    {
      icon: <Shield className="w-6 h-6 text-bronze-300" />,
      title: "RFID Guard protection",
      desc: "Complete shielding ensures absolute security from RFID/NFC skimming theft.",
      badge: "MIL-SPEC",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-bronze-300" />,
      title: "aerospace metallurgy",
      desc: "CNC brushed aluminum with multi-coat copper rose gold finish.",
      badge: "PREMIUM",
    },
    {
      icon: <Minimize className="w-6 h-6 text-bronze-300" />,
      title: "slim pocket outline",
      desc: "A pure front-pocket companion, just 8mm thin. Banishes pocket bulges.",
      badge: "8MM THIN",
    },
    {
      icon: <Feather className="w-6 h-6 text-bronze-300" />,
      title: "featherweight 64g",
      desc: "Weighs less than an average key fob, while providing rigid armor for your cards.",
      badge: "64 GRAMS",
    },
    {
      icon: <Lock className="w-6 h-6 text-bronze-300" />,
      title: "precision snap latch",
      desc: "Heavy-duty custom copper metal latch opens seamlessly with a soft premium click.",
      badge: "SNAP LOCK",
    },
    {
      icon: <Gift className="w-6 h-6 text-bronze-300" />,
      title: "gift-ready casing",
      desc: "Packaged inside an ultra-matte, gold-foiled luxury presentation gift drawer box.",
      badge: "GIFT WRAP",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="features-section"
      className="relative bg-[#0c0c0c] py-28 border-t border-bronze-500/5"
    >
      <div className="absolute top-[-10%] left-[30%] w-[40%] h-[40%] rounded-full bg-bronze-950/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-20">
          <span className="font-mono text-[10px] uppercase tracking-[6px] text-bronze-400 font-semibold">
            ENGINEERING ATTRIBUTES
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-f7ede3 tracking-tight">
            Forged in Durability. <br />
            Designed for Comfort.
          </h2>
          <p className="text-sm text-bronze-100/50 leading-relaxed font-light font-sans max-w-lg mx-auto">
            A precise synthesis of modern metallurgy, high-security data guarding, and ultimate ergonomic portability.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureItems.map((item) => (
            <div
              key={item.title}
              className="feature-card group relative p-8 rounded-lg glass-premium border border-bronze-500/10 hover:border-bronze-400/40 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between min-h-[250px]"
            >
              {/* Card top flare */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-bronze-400/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-bronze-950/70 border border-bronze-500/15 rounded group-hover:scale-110 transition-transform duration-500 shadow-md">
                    {item.icon}
                  </div>
                  <span className="font-mono text-[8px] font-bold tracking-widest text-bronze-400 bg-bronze-950/90 py-1 px-2.5 rounded border border-bronze-500/10 uppercase">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-f7ede3 uppercase tracking-wider mb-2 group-hover:text-bronze-300 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-xs text-bronze-100/50 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>

              {/* Bottom decorative anchor */}
              <div className="pt-6 border-t border-bronze-500/5 flex items-center justify-between mt-6">
                <span className="font-mono text-[9px] text-bronze-400/60 uppercase tracking-widest">
                  Active Security
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-bronze-400 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
