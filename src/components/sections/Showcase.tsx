/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ShieldAlert, CreditCard, Sparkles, Sliders } from "lucide-react";

export default function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".showcase-fade",
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const highlights = [
    {
      icon: <CreditCard className="w-5 h-5 text-bronze-300" />,
      title: "6-Slot Accordion Vault",
      desc: "Instant card fanning with quick-slide access. Carries up to 12 cards + folded cash bills.",
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-bronze-300" />,
      title: "RFID / NFC Theft Guard",
      desc: "Aerospace aluminum casing forms an electromagnetic shield to completely block wireless thieves.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-bronze-300" />,
      title: "Premium Metal Engraving",
      desc: "Laser-etched V-shield insignia and brand name that never fade or rub off with heavy usage.",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="product-showcase-section"
      className="relative min-h-screen w-full flex items-center justify-center bg-[#080808] py-24 overflow-hidden"
    >
      {/* Background soft lighting glows */}
      <div className="absolute top-[30%] right-[-10%] w-[50%] h-[50%] rounded-full bg-bronze-950/20 blur-[130px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 w-full flex flex-col space-y-8">
        {/* Left Column: Interactive Highlights & Triggers */}
        <div className="flex flex-col space-y-8">
          <div className="space-y-4 text-center">
            <span className="showcase-fade font-mono text-[10px] uppercase tracking-[6px] text-bronze-400 block font-semibold">
              3D INTERACTIVE CUSTOMIZER
            </span>
            <h2 className="showcase-fade font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-f7ede3 tracking-tight leading-tight">
              Design is Details. <br />
              Tailored for You.
            </h2>
            <p className="showcase-fade text-sm text-bronze-100/60 font-light font-sans max-w-lg leading-relaxed mx-auto">
              Interact directly with the 3D studio on the right. Rotate, customize, and view the wallet's interior mechanics by switching premium finishes.
            </p>
          </div>

          {/* Highlights grid */}
          <div className="space-y-6 pt-2 max-w-2xl mx-auto w-full">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="showcase-fade flex items-start space-x-4 p-5 rounded-lg glass border border-bronze-500/5 hover:border-bronze-500/15 transition-all duration-300 hover:translate-x-2"
              >
                <div className="p-3 bg-bronze-950/60 rounded-sm border border-bronze-500/15 flex items-center justify-center shadow-md">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-semibold text-sm text-bronze-200 uppercase tracking-wider">
                    {item.title}
                  </h4>
                  <p className="text-xs text-bronze-100/50 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
