/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Mail, Phone, MapPin, Shield, HelpCircle, FileText } from "lucide-react";

interface FooterProps {
  onNavClick: (index: number) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const collections = ["Emblem Premium", "Carbon Stealth Series", "Titanium Cardholder", "Bespoke Leather Folio"];
  const company = ["Our Story", "Metallurgy", "Bespoke Atelier", "The Journal"];
  const assistance = ["Acquisition Guide", "Secure Payments", "Express Shipping", "Lifetime Guarantee"];

  return (
    <footer className="bg-[#080808] border-t border-bronze-500/10 pt-24 pb-12 relative overflow-hidden" id="luxury-footer">
      {/* Background soft ambient flare */}
      <div className="absolute bottom-[-10%] left-[40%] w-[35%] h-[35%] rounded-full bg-bronze-950/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-bronze-500/10">
          {/* Big Brand Statement */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded bg-gradient-to-br from-bronze-400 to-bronze-700 flex items-center justify-center shadow">
                <span className="font-display font-bold text-lg text-obsidian-950">V</span>
              </div>
              <div>
                <span className="font-display font-semibold tracking-[6px] text-lg text-f7ede3">
                  VELTRIX
                </span>
                <span className="block font-mono text-[8px] text-bronze-400 tracking-[3px] uppercase">
                  Emblem Premium
                </span>
              </div>
            </div>

            <p className="text-xs text-bronze-100/50 leading-relaxed font-light max-w-sm">
              Crafting premium lifestyle accessories that embody mechanical precision, minimalist luxury, and robust everyday carry protection.
            </p>

            {/* Quick Contacts */}
            <div className="space-y-3 font-mono text-[10px] text-bronze-300 tracking-wider">
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-bronze-400" />
                <span>concierge@veltrix.com</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-bronze-400" />
                <span>+1 (800) 420-VELT</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 text-bronze-400" />
                <span>Atelier Copenhagen, DK / Kyoto, JP</span>
              </div>
            </div>
          </div>

          {/* Nav Column 1 */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono text-[10px] text-bronze-400 uppercase tracking-widest font-bold">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-bronze-100/40 font-sans font-light">
              {collections.map((item) => (
                <li key={item}>
                  <button className="hover:text-bronze-300 transition-colors duration-300 text-left">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav Column 2 */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono text-[10px] text-bronze-400 uppercase tracking-widest font-bold">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-bronze-100/40 font-sans font-light">
              {company.map((item) => (
                <li key={item}>
                  <button className="hover:text-bronze-300 transition-colors duration-300 text-left">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav Column 3 */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono text-[10px] text-bronze-400 uppercase tracking-widest font-bold">
              Assistance
            </h4>
            <ul className="space-y-2 text-xs text-bronze-100/40 font-sans font-light">
              {assistance.map((item) => (
                <li key={item}>
                  <button className="hover:text-bronze-300 transition-colors duration-300 text-left">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Nav shortcut */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono text-[10px] text-bronze-400 uppercase tracking-widest font-bold">
              Navigation
            </h4>
            <div className="flex flex-col space-y-2 text-left text-xs text-bronze-100/40">
              <button onClick={() => onNavClick(0)} className="hover:text-bronze-300 transition-colors duration-300 text-left">Intro</button>
              <button onClick={() => onNavClick(1)} className="hover:text-bronze-300 transition-colors duration-300 text-left">Brand Story</button>
              <button onClick={() => onNavClick(2)} className="hover:text-bronze-300 transition-colors duration-300 text-left">3D Atelier</button>
              <button onClick={() => onNavClick(3)} className="hover:text-bronze-300 transition-colors duration-300 text-left">Attributes</button>
              <button onClick={() => onNavClick(5)} className="hover:text-bronze-300 transition-colors duration-300 text-left">Monograph</button>
              <button onClick={() => onNavClick(8)} className="hover:text-bronze-300 transition-colors duration-300 text-left font-semibold text-bronze-400">Order Now</button>
            </div>
          </div>
        </div>

        {/* Lower footer information */}
        <div className="pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-8 text-center sm:text-left text-[10px] font-mono text-bronze-100/30">
            <span>© 2026 VELTRIX LIFESTYLE APPARATUS. ALL RIGHTS RESERVED.</span>
            <div className="flex space-x-4 mt-2 sm:mt-0 justify-center">
              <button className="hover:text-bronze-300">PRIVACY PROTOCOL</button>
              <span>/</span>
              <button className="hover:text-bronze-300">TERMS OF SERVICE</button>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-[10px] font-mono text-bronze-100/30">
            <span>DESIGNED IN COPENHAGEN</span>
            <span>•</span>
            <span>SHIPPED GLOBALLY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
