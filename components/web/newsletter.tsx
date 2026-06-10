"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Subscribed with " + email);
    setEmail("");
  };

  return (
    <section className="py-20 relative overflow-hidden bg-[#4a3a6b] rounded-[3rem] text-white my-12">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-6 backdrop-blur-sm">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-4">Stay Updated With The Latest Fashion Trends</h2>
          <p className="text-white/80 text-base md:text-lg mb-8 leading-relaxed">
            Get exclusive offers, style tips, and early access to new arrivals.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition-all"
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-full bg-white text-[#4a3a6b] font-bold hover:bg-zinc-100 transition-colors shadow-lg"
            >
              Subscribe
            </button>
          </form>
          <p className="text-[10px] md:text-xs text-white/50 mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  );
}
