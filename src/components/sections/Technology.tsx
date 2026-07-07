/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Cpu, Scale, Settings, Layers, Minimize } from "lucide-react";

export default function Technology() {
  const [activeSpecPoint, setActiveSpecPoint] = useState<number>(0);

  const specPoints = [
    {
      id: 0,
      title: "Aerospace Metallurgy Shell",
      subtitle: "Material: 6061-T6 aluminum block",
      desc: "Machined with high-precision CNC drillheads to achieve an exact thickness threshold of 0.8mm. Hard anodized to resist scratches and impact.",
      icon: <Layers className="w-5 h-5 text-bronze-300" />,
      coord: { x: "20%", y: "40%" },
    },
    {
      id: 1,
      title: "Electro-Magnetic RFID Shield",
      subtitle: "Guarding frequency: 13.56 MHz",
      desc: "Creates a structural Faraday cage around credit cards, completely dampening incoming RF signals from remote card readers.",
      icon: <Cpu className="w-5 h-5 text-bronze-300" />,
      coord: { x: "50%", y: "30%" },
    },
    {
      id: 2,
      title: "Slim Pocket Form Ratio",
      subtitle: "Thickness: 8mm, Length: 92mm",
      desc: "Perfect pocket matching designed for tailored suits and active casual wear alike. Lightweight profile fits securely anywhere.",
      icon: <Minimize className="w-5 h-5 text-bronze-300" />,
      coord: { x: "80%", y: "45%" },
    },
    {
      id: 3,
      title: "Mechanical Spring Snap Clasp",
      subtitle: "Tolerance: 10,000 cycles minimum",
      desc: "Constructed with precision latch hinges to ensure a tight air-seal closure. Prevents structural loose sagging under high loads.",
      icon: <Settings className="w-5 h-5 text-bronze-300" />,
      coord: { x: "45%", y: "75%" },
    },
  ];

  return (
    <section id="technology-section" className="bg-[#0c0c0c] py-28 relative border-y border-bronze-500/5">
      {/* Background glow flares */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-bronze-900/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left: Interactive Animated Vector Diagram */}
        <div className="col-span-1 lg:col-span-6 flex flex-col justify-center items-center">
          <div className="space-y-4 mb-10 text-left w-full">
            <span className="font-mono text-[10px] uppercase tracking-[6px] text-bronze-400 block font-semibold">
              BLUEPRINT SPECIFICATIONS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-f7ede3 tracking-tight">
              Interactive Schematic.
            </h2>
            <p className="text-xs text-bronze-100/50 leading-relaxed max-w-md font-sans font-light">
              Click on any of the interactive glowing nodes on the schematic outline below to reveal microscopic engineering details.
            </p>
          </div>

          {/* Interactive Blueprint Vector Frame */}
          <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl bg-obsidian-900 border border-bronze-500/10 overflow-hidden flex items-center justify-center p-8 shadow-inner">
            {/* Grid overlay background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(197,155,123,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(197,155,123,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Simulated Vector schematic outline of wallet */}
            <div className="w-[85%] h-[70%] rounded-xl border-2 border-bronze-500/25 relative flex flex-col justify-between p-6">
              {/* Corner markings */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-bronze-400" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-bronze-400" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-bronze-400" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-bronze-400" />

              {/* Logo outline inside diagram */}
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 border border-bronze-400/40 rounded flex items-center justify-center font-display text-[9px] text-bronze-400">V</div>
                <div className="w-20 h-2 bg-bronze-500/20 rounded" />
              </div>

              {/* RFID Waves visualization in background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <div className="w-32 h-32 rounded-full border border-bronze-400 animate-ping" />
              </div>

              {/* Accordion dividers outlines inside blueprint */}
              <div className="flex justify-between px-6 pt-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-1.5 h-16 bg-bronze-500/10 border border-dashed border-bronze-500/20 rounded" />
                ))}
              </div>

              {/* Interactive glowing hot-spots */}
              {specPoints.map((pt) => (
                <button
                  key={pt.id}
                  onClick={() => setActiveSpecPoint(pt.id)}
                  style={{ left: pt.coord.x, top: pt.coord.y }}
                  className={`absolute w-8 h-8 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-10 ${
                    activeSpecPoint === pt.id
                      ? "scale-125 bg-bronze-400 shadow-[0_0_20px_rgba(197,155,123,0.6)]"
                      : "bg-obsidian-950 border border-bronze-400/40 hover:bg-bronze-950 hover:border-bronze-400 shadow-md"
                  }`}
                  id={`spec-spot-${pt.id}`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      activeSpecPoint === pt.id ? "bg-obsidian-950" : "bg-bronze-400 animate-ping"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Spec measurement labels */}
            <div className="absolute bottom-4 left-6 font-mono text-[8px] text-bronze-400/40">
              SCALE: 1:1 CNC METROLOGY
            </div>
            <div className="absolute bottom-4 right-6 font-mono text-[8px] text-bronze-400/40">
              UNIT: MILLIMETERS (MM)
            </div>
          </div>
        </div>

        {/* Right: Technical Specification presentation card */}
        <div className="col-span-1 lg:col-span-6 flex flex-col space-y-6">
          <div className="p-8 rounded-lg glass-premium border border-bronze-500/15 min-h-[340px] flex flex-col justify-between">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-bronze-950 border border-bronze-500/15 rounded">
                  {specPoints[activeSpecPoint].icon}
                </div>
                <span className="font-mono text-[9px] tracking-widest text-bronze-300 bg-obsidian-900 border border-bronze-500/10 py-1 px-3 rounded uppercase">
                  ACTIVE LAYER
                </span>
              </div>

              <span className="font-mono text-[10px] text-bronze-400 tracking-wider font-semibold uppercase block mb-1">
                {specPoints[activeSpecPoint].subtitle}
              </span>
              <h3 className="font-display font-bold text-2xl text-f7ede3 tracking-tight leading-snug">
                {specPoints[activeSpecPoint].title}
              </h3>

              <p className="text-xs text-bronze-100/60 leading-relaxed font-light font-sans mt-4">
                {specPoints[activeSpecPoint].desc}
              </p>
            </div>

            {/* Card selector bullets indicator */}
            <div className="flex space-x-2 pt-6 border-t border-bronze-500/10 mt-6">
              {specPoints.map((pt) => (
                <button
                  key={pt.id}
                  onClick={() => setActiveSpecPoint(pt.id)}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    activeSpecPoint === pt.id ? "bg-bronze-400 scale-y-125" : "bg-bronze-500/15"
                  }`}
                  id={`spec-bullet-${pt.id}`}
                />
              ))}
            </div>
          </div>

          {/* Quick numbers section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-lg glass border border-bronze-500/5">
              <span className="font-mono text-[8px] text-bronze-400 uppercase tracking-widest block mb-1">
                SHELL HARDNESS
              </span>
              <p className="font-display font-medium text-lg text-f7ede3">60HRC Anodized</p>
            </div>
            <div className="p-5 rounded-lg glass border border-bronze-500/5">
              <span className="font-mono text-[8px] text-bronze-400 uppercase tracking-widest block mb-1">
                SKIMMING REJECTION
              </span>
              <p className="font-display font-medium text-lg text-f7ede3">99.9% Attenuation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
