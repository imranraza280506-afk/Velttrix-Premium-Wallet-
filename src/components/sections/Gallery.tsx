/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, X, Plus, Sparkles, MapPin } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  details: string[];
  gradient: string;
}

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: "shell",
      title: "The Polished Copper Shell",
      tag: "Outer Shell",
      description: "Anodized space-grade aluminum shell plated with a premium brushed rose copper finish.",
      details: ["Corrosion-resistant coat", "Double-brushed metal texture", "Slightly chamfered grip edges"],
      gradient: "from-amber-800/40 via-amber-750/10 to-obsidian-950",
    },
    {
      id: "accordion",
      title: "Accordion Card Vault",
      tag: "Interior Mechanics",
      description: "Fanning multi-slot organizer made of high-tensile polymer webbing that opens smoothly up to 35°.",
      details: ["6 individual fanning pockets", "Secures up to 12 credit cards", "Central pocket for banknotes"],
      gradient: "from-stone-900 via-stone-850 to-obsidian-950",
    },
    {
      id: "everyday",
      title: "Everyday Carry Fit",
      tag: "Lifestyle Integration",
      description: "Designed for seamless front-pocket storage to optimize comfort and aesthetic appeal.",
      details: ["Only 8mm thick silhouette", "Smooth contours avoid lint", "Comfortable carry weight (64g)"],
      gradient: "from-amber-900/20 via-obsidian-900 to-obsidian-950",
    },
    {
      id: "latch",
      title: "Snap Latch Clasp",
      tag: "Hardware details",
      description: "Custom copper spring-locking latch designed to hold cards tightly shut under any pressure.",
      details: ["Custom physical lever", "Soft satisfying feedback", "Double rivet attachment"],
      gradient: "from-neutral-800 via-neutral-900 to-obsidian-950",
    },
  ];

  return (
    <section id="gallery-section" className="bg-[#080808] py-28 relative">
      <div className="absolute top-[20%] right-[10%] w-[35%] h-[35%] rounded-full bg-bronze-950/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-[6px] text-bronze-400 block font-semibold">
              PRODUCT MONOGRAPH
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-f7ede3 tracking-tight">
              A Symphony <br />
              of Form & Space.
            </h2>
          </div>
          <p className="text-sm text-bronze-100/50 font-light font-sans max-w-md leading-relaxed">
            Take a microscopic look at the technical layout and luxury aesthetics that make the Veltrix Wallet Emblem a masterpiece of functional lifestyle design.
          </p>
        </div>

        {/* Masonry-Style Interactive Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[340px]">
          {/* Card 1: Large primary */}
          <div
            onClick={() => setSelectedItem(galleryItems[0])}
            className="lg:col-span-7 md:row-span-2 group relative rounded-lg overflow-hidden glass border border-bronze-500/10 hover:border-bronze-400/40 transition-all duration-500 cursor-pointer flex flex-col justify-between p-8"
            id="gallery-card-1"
          >
            {/* Background gradient texture */}
            <div className={`absolute inset-0 bg-gradient-to-tr ${galleryItems[0].gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-700`} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,155,123,0.1),transparent_50%)]" />

            {/* Top Row info */}
            <div className="z-10 flex justify-between items-center">
              <span className="font-mono text-[9px] tracking-widest text-bronze-400 uppercase bg-bronze-950/80 py-1 px-3 border border-bronze-500/15 rounded-full">
                {galleryItems[0].tag}
              </span>
              <Maximize2 className="w-4.5 h-4.5 text-bronze-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Visual Abstract Blueprint */}
            <div className="z-10 flex-1 flex items-center justify-center py-6 opacity-30 group-hover:opacity-75 transition-opacity duration-500">
              {/* Brushed rose copper casing abstract mockup */}
              <div className="relative w-72 h-44 rounded-lg border-2 border-dashed border-bronze-500/40 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-700">
                <div className="w-[94%] h-[92%] rounded bg-gradient-to-br from-bronze-500/20 via-bronze-700/5 to-transparent border border-bronze-400/40 flex flex-col justify-end p-4">
                  <span className="font-display font-medium tracking-[4px] text-xs text-bronze-300">VELTRIX</span>
                  <span className="font-mono text-[7px] text-bronze-400/80">EMBLEM PREMIUM SERIES</span>
                </div>
              </div>
            </div>

            {/* Bottom Row Text */}
            <div className="z-10 space-y-2">
              <h3 className="font-display font-bold text-2xl text-f7ede3 tracking-tight">
                {galleryItems[0].title}
              </h3>
              <p className="text-xs text-bronze-100/60 leading-relaxed max-w-md font-light">
                {galleryItems[0].description}
              </p>
            </div>
          </div>

          {/* Card 2: Medium Secondary */}
          <div
            onClick={() => setSelectedItem(galleryItems[1])}
            className="lg:col-span-5 group relative rounded-lg overflow-hidden glass border border-bronze-500/10 hover:border-bronze-400/40 transition-all duration-500 cursor-pointer flex flex-col justify-between p-8"
            id="gallery-card-2"
          >
            <div className={`absolute inset-0 bg-gradient-to-tr ${galleryItems[1].gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-700`} />

            <div className="z-10 flex justify-between items-center">
              <span className="font-mono text-[9px] tracking-widest text-bronze-400 uppercase bg-bronze-950/80 py-1 px-3 border border-bronze-500/15 rounded-full">
                {galleryItems[1].tag}
              </span>
              <Maximize2 className="w-4.5 h-4.5 text-bronze-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Accordion visual helper */}
            <div className="z-10 flex justify-center py-4 opacity-40 group-hover:opacity-80 transition-opacity duration-500">
              <div className="flex space-x-1.5 items-end h-20">
                {[20, 45, 65, 80, 65, 45, 20].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className="w-2.5 rounded bg-gradient-to-t from-bronze-700 to-bronze-400"
                  />
                ))}
              </div>
            </div>

            <div className="z-10 space-y-1">
              <h3 className="font-display font-semibold text-lg text-f7ede3">
                {galleryItems[1].title}
              </h3>
              <p className="text-xs text-bronze-100/60 font-light">
                {galleryItems[1].description}
              </p>
            </div>
          </div>

          {/* Card 3: Small Card */}
          <div
            onClick={() => setSelectedItem(galleryItems[2])}
            className="lg:col-span-5 group relative rounded-lg overflow-hidden glass border border-bronze-500/10 hover:border-bronze-400/40 transition-all duration-500 cursor-pointer flex flex-col justify-between p-8"
            id="gallery-card-3"
          >
            <div className={`absolute inset-0 bg-gradient-to-tr ${galleryItems[2].gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-700`} />

            <div className="z-10 flex justify-between items-center">
              <span className="font-mono text-[9px] tracking-widest text-bronze-400 uppercase bg-bronze-950/80 py-1 px-3 border border-bronze-500/15 rounded-full">
                {galleryItems[2].tag}
              </span>
              <Maximize2 className="w-4.5 h-4.5 text-bronze-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="z-10 flex justify-center py-2 text-bronze-400/30 group-hover:text-bronze-400/80 transition-colors duration-500">
              <span className="font-mono text-xs tracking-widest">EDC / FRONT POCKET SILHOUETTE</span>
            </div>

            <div className="z-10 space-y-1">
              <h3 className="font-display font-semibold text-lg text-f7ede3">
                {galleryItems[2].title}
              </h3>
              <p className="text-xs text-bronze-100/60 font-light">
                {galleryItems[2].description}
              </p>
            </div>
          </div>

          {/* Card 4: Long Sidebar style */}
          <div
            onClick={() => setSelectedItem(galleryItems[3])}
            className="lg:col-span-12 group relative rounded-lg overflow-hidden glass border border-bronze-500/10 hover:border-bronze-400/40 transition-all duration-500 cursor-pointer flex items-center justify-between p-8"
            id="gallery-card-4"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${galleryItems[3].gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-700`} />

            <div className="z-10 flex flex-col justify-between h-full space-y-4">
              <div>
                <span className="font-mono text-[9px] tracking-widest text-bronze-400 uppercase bg-bronze-950/80 py-1 px-3 border border-bronze-500/15 rounded-full inline-block mb-3">
                  {galleryItems[3].tag}
                </span>
                <h3 className="font-display font-bold text-xl text-f7ede3 tracking-tight">
                  {galleryItems[3].title}
                </h3>
              </div>
              <p className="text-xs text-bronze-100/60 leading-relaxed max-w-md font-light">
                {galleryItems[3].description}
              </p>
            </div>

            <div className="z-10 p-5 bg-bronze-950/80 border border-bronze-500/20 rounded-full group-hover:rotate-45 transition-transform duration-500">
              <Plus className="w-6 h-6 text-bronze-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Interactive Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-obsidian-950/98 z-50 flex items-center justify-center p-6 md:p-12 backdrop-blur-lg"
            id="gallery-lightbox-modal"
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-8 right-8 p-3 rounded-full bg-obsidian-900 border border-bronze-500/15 text-bronze-200 hover:text-bronze-100 hover:bg-bronze-950 transition-colors"
              aria-label="Close Lightbox"
              id="close-lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-obsidian-900/60 p-8 md:p-12 rounded-2xl border border-bronze-500/15"
            >
              {/* Left Column Graphic */}
              <div className="h-64 md:h-[400px] rounded-xl bg-gradient-to-tr from-bronze-950/30 to-obsidian-950 border border-bronze-500/10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-4 left-4 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-bronze-400" />
                  <span className="font-mono text-[9px] tracking-widest text-bronze-300 uppercase">
                    HD MONOGRAPH
                  </span>
                </div>
                {/* Visual schematic outline */}
                <div className="w-48 h-48 rounded-full border border-dashed border-bronze-500/20 flex items-center justify-center animate-spin" style={{ animationDuration: "35s" }}>
                  <div className="w-40 h-40 rounded-full border border-bronze-500/10" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display font-black text-7xl text-bronze-500/5 select-none">
                    V
                  </span>
                </div>
              </div>

              {/* Right Column Technical Details */}
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-[9px] tracking-[4px] text-bronze-400 uppercase font-semibold">
                    {selectedItem.tag}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-f7ede3 tracking-tight mt-1">
                    {selectedItem.title}
                  </h3>
                </div>

                <p className="text-sm text-bronze-100/70 font-light leading-relaxed">
                  {selectedItem.description}
                </p>

                <div className="space-y-3 pt-2">
                  <h4 className="font-mono text-[10px] tracking-wider text-bronze-300 uppercase font-bold">
                    TECHNICAL PARAMETERS:
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedItem.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center space-x-2.5 text-xs text-bronze-100/50 font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-bronze-400" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
