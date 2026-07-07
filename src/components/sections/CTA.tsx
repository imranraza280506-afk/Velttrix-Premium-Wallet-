/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
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

            <AnimatePresence mode="wait">
              {!success ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Pricing info */}
                  <div className="flex items-baseline justify-between border-b border-bronze-500/10 pb-5">
                    <div>
                      <h3 className="font-display font-bold text-lg text-f7ede3">
                        Veltrix Wallet Emblem
                      </h3>
                      <p className="text-xs text-bronze-400">Copper Rose Premium Edition</p>
                    </div>
                    <div className="text-right flex items-center space-x-3 shrink-0">
                      <div className="text-right">
                        <span className="block font-display text-3xl font-extrabold text-f7ede3">$9</span>
                        <span className="block text-[9px] font-mono text-bronze-100/40 line-through">$89.00</span>
                      </div>
                      <span className="bg-red-600 text-white text-[10px] font-mono tracking-wider px-2 py-1 rounded font-bold uppercase shadow-md border border-red-500 animate-pulse">
                        90% OFF
                      </span>
                    </div>
                  </div>

                  {/* Input fields */}
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="customer-name" className="block font-mono text-[9px] text-bronze-300 uppercase tracking-widest mb-1.5 font-semibold">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="customer-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Imran Raza"
                        className="w-full bg-obsidian-950/70 border border-bronze-500/15 py-3 px-4 rounded text-xs text-f7ede3 placeholder-bronze-100/25 focus:outline-none focus:border-bronze-400 transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="customer-phone" className="block font-mono text-[9px] text-bronze-300 uppercase tracking-widest mb-1.5 font-semibold">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="customer-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-obsidian-950/70 border border-bronze-500/15 py-3 px-4 rounded text-xs text-f7ede3 placeholder-bronze-100/25 focus:outline-none focus:border-bronze-400 transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="customer-email" className="block font-mono text-[9px] text-bronze-300 uppercase tracking-widest mb-1.5 font-semibold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="customer-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. imran@veltrix.com"
                        className="w-full bg-obsidian-950/70 border border-bronze-500/15 py-3 px-4 rounded text-xs text-f7ede3 placeholder-bronze-100/25 focus:outline-none focus:border-bronze-400 transition-colors"
                        required
                      />
                    </div>

                    {/* Finish Selector */}
                    <div>
                      <span className="block font-mono text-[9px] text-bronze-300 uppercase tracking-widest mb-2 font-semibold">
                        Select Leather/Case Finish
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {["Copper Bronze", "Stealth Black", "Titanium Silver"].map((col) => (
                          <button
                            type="button"
                            key={col}
                            onClick={() => setFinish(col)}
                            className={`py-2 px-1 rounded text-[10px] font-mono border transition-all duration-300 ${
                              finish === col
                                ? "bg-bronze-950/80 border-bronze-400 text-bronze-300"
                                : "bg-transparent border-bronze-500/10 text-bronze-100/40 hover:border-bronze-500/35 hover:text-bronze-200"
                            }`}
                            id={`cta-select-${col.toLowerCase().replace(" ", "-")}`}
                          >
                            {col}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-sm bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-400 hover:to-bronze-500 text-obsidian-950 font-mono text-xs tracking-widest font-bold uppercase transition-all duration-500 hover:shadow-[0_0_25px_rgba(197,155,123,0.35)] active:scale-98 flex items-center justify-center space-x-2"
                    id="submit-order-btn"
                  >
                    <span>SUBMIT SECURE ACQUISITION</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="text-center font-mono text-[8px] text-bronze-400/40 tracking-wider">
                    🔒 SSL 256-BIT ENCRYPTED CONNECTION
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10 space-y-6"
                  id="checkout-success-container"
                >
                  <div className="w-16 h-16 rounded-full bg-bronze-950 border border-bronze-400/30 flex items-center justify-center text-bronze-300 shadow">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-xl text-f7ede3">
                      Acquisition Initiated.
                    </h3>
                    <p className="text-xs text-bronze-100/60 leading-relaxed font-sans font-light max-w-sm">
                      Thank you for choosing Veltrix, <strong>{name}</strong>. An elegant confirmation summary alongside secure invoice payment links has been dispatched to <strong>{email}</strong>.
                    </p>
                  </div>
                  <div className="pt-4 w-full">
                    <button
                      onClick={() => {
                        setSuccess(false);
                        setName("");
                        setEmail("");
                        setPhone("");
                      }}
                      className="w-full py-2.5 rounded border border-bronze-500/20 hover:border-bronze-400 text-bronze-300 hover:text-bronze-200 font-mono text-[10px] tracking-widest uppercase transition-colors"
                      id="reset-order-form"
                    >
                      ORDER ANOTHER WALLET
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
