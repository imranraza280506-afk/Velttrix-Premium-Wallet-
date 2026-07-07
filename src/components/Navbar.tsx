/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Shield, ShoppingBag, Menu, X, ArrowRight } from "lucide-react";

interface NavbarProps {
  onNavClick: (index: number) => void;
  activeIndex: number;
}

export default function Navbar({ onNavClick, activeIndex }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Intro", index: 0 },
    { label: "Story", index: 1 },
    { label: "Showcase", index: 2 },
    { label: "Specs", index: 3 },
    { label: "Gallery", index: 5 },
    { label: "Technology", index: 6 },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-obsidian-950/80 backdrop-blur-md border-b border-bronze-500/10"
            : "py-7 bg-transparent"
        }`}
        id="luxury-header"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Brand Title */}
          <button
            onClick={() => {
              onNavClick(0);
              setMobileMenuOpen(false);
            }}
            className="flex items-center space-x-2 text-left group"
            id="nav-logo"
          >
            <div className="w-10 h-10 rounded bg-gradient-to-br from-bronze-400 to-bronze-700 flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:rotate-12">
              <span className="font-display font-bold text-lg text-obsidian-950">V</span>
            </div>
            <div>
              <span className="font-display font-semibold tracking-[6px] text-lg text-f7ede3 group-hover:text-bronze-300 transition-colors duration-300">
                VELTRIX
              </span>
              <span className="block font-mono text-[8px] text-bronze-400 tracking-[3px] uppercase">
                Emblem Premium
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => onNavClick(link.index)}
                className={`font-mono text-[11px] tracking-widest uppercase transition-all duration-300 relative py-1.5 ${
                  activeIndex === link.index
                    ? "text-bronze-300"
                    : "text-bronze-100/60 hover:text-bronze-100"
                }`}
                id={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
                {activeIndex === link.index && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-bronze-300 origin-left scale-x-100 transition-transform duration-300" />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => onNavClick(8)}
              className="px-6 py-2.5 rounded-sm bg-bronze-400 text-obsidian-950 font-mono text-[11px] tracking-widest font-bold uppercase transition-all duration-500 hover:bg-bronze-200 hover:shadow-[0_0_20px_rgba(197,155,123,0.4)] active:scale-95 flex items-center space-x-2"
              id="header-order-btn"
            >
              <span>ACQUIRE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-bronze-100 hover:text-bronze-300 p-1"
            aria-label="Toggle Menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 bg-obsidian-950/98 z-30 flex flex-col justify-center px-8 transition-all duration-500 md:hidden ${
          mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-6 text-center">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                onNavClick(link.index);
                setMobileMenuOpen(false);
              }}
              className={`font-display text-2xl tracking-wider capitalize ${
                activeIndex === link.index ? "text-bronze-300 font-medium" : "text-bronze-100/60"
              }`}
              id={`mobile-nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-8 flex justify-center">
            <button
              onClick={() => {
                onNavClick(8);
                setMobileMenuOpen(false);
              }}
              className="w-full max-w-xs py-4 rounded bg-bronze-400 text-obsidian-950 font-mono text-sm tracking-widest font-bold uppercase hover:bg-bronze-200"
              id="mobile-header-acquire-btn"
            >
              ACQUIRE VELTRIX WALLET
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
