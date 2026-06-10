"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FirstVisitPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const hasVisited = localStorage.getItem("leela_has_visited");
    if (!hasVisited) {
      // Small delay to let the user settle
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("leela_has_visited", "true");
  };

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate form submission
      localStorage.setItem("leela_has_visited", "true");
      setIsOpen(false);
      alert("Coupon code WELCOME10 sent to " + email);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-y-auto z-10"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>
            <div className="flex flex-col md:flex-row h-full">
              {/* Image Side */}
              <div className="md:w-2/5 h-48 md:h-auto bg-primary/10 relative">
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-primary/20" />
                {/* You can replace this with an actual image */}
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                  <div className="text-primary opacity-80 font-serif italic text-xl md:text-2xl">E-Store Couture</div>
                </div>
              </div>
              
              {/* Content Side */}
              <div className="md:w-3/5 p-8 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1a1a1a] mb-2">
                  Welcome to E-Store!
                </h3>
                <p className="text-xs md:text-sm text-zinc-500 mb-6 leading-relaxed">
                  Join our premium newsletter and get <strong className="text-primary font-bold">10% OFF</strong> your first purchase of custom or readymade couture.
                </p>

                <div className="bg-primary/5 border border-primary/20 rounded-xl py-3 px-4 mb-6 inline-block text-center mx-auto md:mx-0 w-full">
                  <span className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-500 font-bold block mb-1">Use Code</span>
                  <span className="text-base md:text-lg font-mono font-bold tracking-wider text-primary">WELCOME10</span>
                </div>

                <form onSubmit={handleClaim} className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-xs md:text-sm"
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-xl transition-all shadow-sm active:scale-[0.98]"
                  >
                    Claim Offer
                  </button>
                </form>
                <button
                  onClick={handleClose}
                  className="w-full text-center text-[10px] md:text-xs text-zinc-400 mt-4 hover:text-zinc-600 underline underline-offset-4"
                >
                  No thanks, I prefer paying full price
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
