/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import SmoothScroll from "./components/SmoothScroll";
import WalletModel3D from "./components/WalletModel3D";

// Section Components
import Hero from "./components/sections/Hero";
import BrandStory from "./components/sections/BrandStory";
import InteriorShowcase from "./components/sections/InteriorShowcase";
import Showcase from "./components/sections/Showcase";
import Features from "./components/sections/Features";
import Gallery from "./components/sections/Gallery";
import Technology from "./components/sections/Technology";
import Testimonials from "./components/sections/Testimonials";
import Statistics from "./components/sections/Statistics";
import CTA from "./components/sections/CTA";
import Footer from "./components/sections/Footer";

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // References to section elements to track active viewport
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // 1. Setup IntersectionObserver to track which section is currently active
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -25% 0px", // Detect when section occupies center 50% of screen
      threshold: 0.15,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-section-index"));
          if (!isNaN(index)) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // 2. Track overall scroll progress for secondary animations
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Smooth scroll helper for navbar clicks
  const scrollToSection = (index: number) => {
    const targetRef = sectionRefs.current[index];
    if (targetRef) {
      // Use Lenis smooth scroll if globally registered
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(targetRef, { offset: 0, duration: 1.5 });
      } else {
        targetRef.scrollIntoView({ behavior: "smooth" });
      }
      setActiveIndex(index);
    }
  };

  return (
    <div className="relative bg-[#080808] min-h-screen selection:bg-bronze-400 selection:text-obsidian-950 overflow-x-hidden">
      {/* 1. Global Interactive Custom Follower Cursor */}
      <CustomCursor />

      {/* 2. Brand Luxury Navbar */}
      <Navbar onNavClick={scrollToSection} activeIndex={activeIndex} />

      {/* 3. Smooth kinetically-scrolling content wrapper */}
      <SmoothScroll>
        <main className="w-full relative">
          {/* Section 01: Hero */}
          <div
            ref={(el) => { sectionRefs.current[0] = el; }}
            data-section-index="0"
          >
            <Hero onExploreClick={() => scrollToSection(1)} onAcquireClick={() => scrollToSection(8)} />
          </div>

          {/* Section 02: Brand Story */}
          <div
            ref={(el) => { sectionRefs.current[1] = el; }}
            data-section-index="1"
          >
            <BrandStory />
          </div>

          {/* Expanded Interior Showcase with opened 3D auto-rotating wallet */}
          <InteriorShowcase />

          {/* Section 03: Product Showcase */}
          <div
            ref={(el) => { sectionRefs.current[2] = el; }}
            data-section-index="2"
          >
            <Showcase />
          </div>

          {/* Section 04: Features Grid */}
          <div
            ref={(el) => { sectionRefs.current[3] = el; }}
            data-section-index="3"
          >
            <Features />
          </div>

          {/* Section 05: Statistics Overview */}
          <div
            ref={(el) => { sectionRefs.current[4] = el; }}
            data-section-index="4"
          >
            <Statistics />
          </div>

          {/* Section 06: Masonry Gallery Monograph */}
          <div
            ref={(el) => { sectionRefs.current[5] = el; }}
            data-section-index="5"
          >
            <Gallery />
          </div>

          {/* Section 07: Technical breakdown / Blueprint */}
          <div
            ref={(el) => { sectionRefs.current[6] = el; }}
            data-section-index="6"
          >
            <Technology />
          </div>

          {/* Section 08: Testimonials Slider */}
          <div
            ref={(el) => { sectionRefs.current[7] = el; }}
            data-section-index="7"
          >
            <Testimonials />
          </div>

          {/* Section 09: Call To Action Secure Portal */}
          <div
            ref={(el) => { sectionRefs.current[8] = el; }}
            data-section-index="8"
          >
            <CTA />
          </div>

          {/* Section 10: Luxury Footer */}
          <Footer onNavClick={scrollToSection} />
        </main>
      </SmoothScroll>
    </div>
  );
}
