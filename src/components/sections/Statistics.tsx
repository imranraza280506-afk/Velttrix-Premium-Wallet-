/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Statistics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [dampening, setDampening] = useState(0);
  const [thickness, setThickness] = useState(0);
  const [weight, setWeight] = useState(0);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Dynamic count-up trigger using GSAP ScrollTrigger
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      onEnter: () => {
        // Ticking states
        gsap.to({ val: 0 }, {
          val: 99.9,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: function () {
            setDampening(Number(this.targets()[0].val.toFixed(1)));
          },
        });

        gsap.to({ val: 0 }, {
          val: 8,
          duration: 1.5,
          ease: "power3.out",
          onUpdate: function () {
            setThickness(Number(this.targets()[0].val.toFixed(0)));
          },
        });

        gsap.to({ val: 0 }, {
          val: 64,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: function () {
            setWeight(Number(this.targets()[0].val.toFixed(0)));
          },
        });

        gsap.to({ val: 0 }, {
          val: 10000,
          duration: 2.0,
          ease: "power1.out",
          onUpdate: function () {
            setCycles(Number(this.targets()[0].val.toFixed(0)));
          },
        });
      },
      once: true,
    });
  }, []);

  const stats = [
    {
      value: `${dampening}%`,
      label: "RFID shielding",
      desc: "Complete wave isolation against standard banking skimmer frequencies.",
    },
    {
      value: `${thickness}mm`,
      label: "Thickness threshold",
      desc: "An incredibly slim casing footprint that is imperceptible in pockets.",
    },
    {
      value: `${weight}g`,
      label: "Total lightweight",
      desc: "Featherweight aerospace alloy ensures comfort without structural fatigue.",
    },
    {
      value: `${cycles.toLocaleString()}+`,
      label: "Precision Latch cycles",
      desc: "Rigorously tested lock release mechanisms designed to open smoothly for a decade.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="statistics-section"
      className="bg-[#0c0c0c] py-28 relative border-t border-bronze-500/5"
    >
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-bronze-900/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Statistics title */}
        <div className="mb-20 max-w-xl text-left space-y-4">
          <span className="font-mono text-[10px] uppercase tracking-[6px] text-bronze-400 block font-semibold">
            PERFORMANCE SPECS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-f7ede3 tracking-tight">
            Metrology & Precision. <br />
            Backed by Numbers.
          </h2>
        </div>

        {/* Numbers Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-8 rounded-lg glass border border-bronze-500/5 hover:border-bronze-400/20 transition-all duration-500 hover:-translate-y-1 relative"
            >
              {/* Vertical accent */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-12 bg-bronze-400" />

              <span className="block font-display text-4xl lg:text-5xl font-bold text-f7ede3 tracking-tight glow-text">
                {stat.value}
              </span>
              <span className="block font-mono text-[10px] uppercase tracking-widest text-bronze-300 mt-2 font-semibold">
                {stat.label}
              </span>
              <p className="text-xs text-bronze-100/50 leading-relaxed font-light mt-3">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
