/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Testimonial } from "../../types";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const list: Testimonial[] = [
    {
      id: "1",
      name: "Marcus Vance",
      role: "Founder, Capital Tech",
      quote: "The copper finish is gorgeous—it matches my desk setup and EDC items perfectly. The accordion fanning mechanism is super slick and reliable.",
      rating: 5,
      avatarLetter: "M",
    },
    {
      id: "2",
      name: "Jonathan Cole",
      role: "Product Design Director",
      quote: "Absolute architectural honesty. Minimalist design paired with robust metal engineering. It has replaced my bulky bifold completely.",
      rating: 5,
      avatarLetter: "J",
    },
    {
      id: "3",
      name: "Imran Raza",
      role: "Business Executive",
      quote: "The 8mm profile slips into my slim-fit suits without creating an ugly bulk. RFID protection gives me complete confidence while traveling.",
      rating: 5,
      avatarLetter: "I",
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % list.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + list.length) % list.length);
  };

  return (
    <section id="testimonials-section" className="bg-[#080808] py-28 relative overflow-hidden">
      <div className="absolute top-[10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-bronze-950/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left: Heading and slider buttons */}
        <div className="col-span-1 lg:col-span-5 space-y-8 text-left">
          <div className="space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-[6px] text-bronze-400 block font-semibold">
              COMMUNITY VOICES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-f7ede3 tracking-tight">
              Adored by <br />
              Connoisseurs.
            </h2>
            <p className="text-sm text-bronze-100/50 leading-relaxed font-sans font-light">
              We create accessories for those who value detail and appreciate fine styling. Here is what some of our premium global customers have to say.
            </p>
          </div>

          {/* Luxury slider buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePrev}
              className="p-4 rounded-full border border-bronze-500/10 hover:border-bronze-400 bg-obsidian-900 text-bronze-200 hover:text-bronze-100 transition-colors"
              aria-label="Previous Testimonial"
              id="prev-testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-4 rounded-full border border-bronze-500/10 hover:border-bronze-400 bg-obsidian-900 text-bronze-200 hover:text-bronze-100 transition-colors"
              aria-label="Next Testimonial"
              id="next-testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right: Immersive Slider Card */}
        <div className="col-span-1 lg:col-span-7 h-[380px] md:h-[320px] relative flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute w-full p-8 md:p-10 rounded-xl glass-premium border border-bronze-500/15 flex flex-col justify-between h-full shadow-2xl"
            >
              {/* Quote Mark Icon */}
              <div className="absolute top-8 right-8 opacity-10">
                <Quote className="w-16 h-16 text-bronze-400" />
              </div>

              <div>
                {/* Rating Stars */}
                <div className="flex items-center space-x-1 mb-6">
                  {Array.from({ length: list[activeIndex].rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-bronze-400 text-bronze-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-sm md:text-base text-f7ede3 font-display italic leading-relaxed font-light">
                  "{list[activeIndex].quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center space-x-4 pt-6 border-t border-bronze-500/10 mt-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bronze-400 to-bronze-700 flex items-center justify-center font-display font-bold text-sm text-obsidian-950 shadow">
                  {list[activeIndex].avatarLetter}
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-bronze-200">
                    {list[activeIndex].name}
                  </h4>
                  <p className="font-mono text-[9px] text-bronze-400 uppercase tracking-widest mt-0.5">
                    {list[activeIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
