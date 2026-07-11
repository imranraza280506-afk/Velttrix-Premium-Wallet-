/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Sparkles, CheckCircle } from "lucide-react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [finish, setFinish] = useState("Copper Bronze");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !phone) return;
    setSuccess(true);
  };

  return (
    <section id="cta-section" className="bg-[#080808] py-28 relative overflow-hidden border-t border-bronze-500/5">
      {/* Background radial flares */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-[radial-gradient(circle_at_center,rgba(197,155,123,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center z-10">
        {/* Left Column: Spotlight Text */}
        <div className="col-span-1 lg:col-span-6 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-bronze-950/50 border border-bronze-500/15 py-1 px-3.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-bronze-400" />
              <span className="font-mono text-[9px] font-semibold tracking-widest text-bronze-200 uppercase">
                ACQUISITION PROTOCOL
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-f7ede3 tracking-tight leading-tight">
              Elevate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-bronze-300 via-bronze-400 to-bronze-600 font-display">
                Everyday carry.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-bronze-100/60 leading-relaxed font-light font-sans max-w-lg">
              Acquire the Veltrix Wallet Emblem Premium today. Join thousands of entrepreneurs who carry with absolute security and minimalist luxury.
            </p>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 max-w-lg">
            <div className="flex items-start space-x-3">
              <Truck className="w-5 h-5 text-bronze-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-display font-medium text-xs text-bronze-200 uppercase tracking-wider">
                  Express delivery
                </h4>
                <p className="text-[10px] text-bronze-100/40">Free Global UPS 4–5 Days</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-bronze-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-display font-medium text-xs text-bronze-200 uppercase tracking-wider">
                  1-Year Warranty
                </h4>
                <p className="text-[10px] text-bronze-100/40">Built for a lifetime</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <RefreshCw className="w-5 h-5 text-bronze-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-display font-medium text-xs text-bronze-200 uppercase tracking-wider">
                  Easy Return
                </h4>
                <p className="text-[10px] text-bronze-100/40">Within 2 Days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Premium High-Converting Checkout Card */}
        <div className="col-span-1 lg:col-span-6">
          <div className="glass-premium p-8 md:p-10 rounded-2xl border border-bronze-500/20 max-w-lg mx-auto relative glow-bronze">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-bronze-400 to-bronze-600 rounded text-[9px] font-mono tracking-widest uppercase font-bold text-obsidian-950 shadow-md">
              SECURE ACQUISITION PORTAL
            </div>

            <div
  style={{ width: "100%", height: "500px" }}
  data-fillout-id="m3jd1dABxyus"
  data-fillout-embed-type="standard"
  data-fillout-inherit-parameters
  data-fillout-dynamic-resize
></div>
          </div>
        </div>
      </div>
    </section>
  );
}
