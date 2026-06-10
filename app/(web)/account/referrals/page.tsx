"use client";

import { Users, Copy, Share2, CheckCircle2, Gift } from "lucide-react";
import { useState } from "react";

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = "SARAH2026";
  const referralLink = `https://e-store.com/ref/${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-lg md:text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">Refer a Friend</h1>
        <p className="text-zinc-500 mt-2">Invite your friends and earn rewards when they make their first purchase.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Share Section */}
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-primary/20">
          <div className="relative z-10 space-y-6">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
              <Gift className="w-8 h-8 text-white" />
            </div>
            
            <div>
              <h2 className="text-xl md:text-2xl font-serif font-bold mb-2">Give ₹500, Get ₹500</h2>
              <p className="text-white/80 text-xs md:text-sm leading-relaxed">
                Share your unique link. When a friend signs up and completes an order, you both get ₹500 in store credit!
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/60">Your Referral Link</p>
              <div className="flex bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/20">
                <input 
                  type="text" 
                  value={referralLink} 
                  readOnly 
                  className="bg-transparent text-white w-full px-4 text-xs md:text-sm outline-none font-medium"
                />
                <button 
                  onClick={handleCopy}
                  className="bg-white text-primary px-4 py-2 rounded-lg text-xs md:text-sm font-bold flex items-center gap-2 hover:bg-zinc-50 transition-colors shrink-0"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <button className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
              <Share2 className="w-4 h-4" /> Share via WhatsApp
            </button>
          </div>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        </div>

        {/* Stats */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm flex items-center gap-6">
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-zinc-500 text-xs md:text-sm font-medium">Successful Referrals</p>
              <p className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight">3</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm flex items-center gap-6">
            <div className="w-14 h-14 bg-yellow-50 rounded-full flex items-center justify-center shrink-0">
              <Gift className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-zinc-500 text-xs md:text-sm font-medium">Total Rewards Earned</p>
              <p className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight">₹1,500</p>
            </div>
          </div>

          <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100">
            <h3 className="font-bold text-[#1a1a1a] mb-4">How it works</h3>
            <ul className="space-y-4 relative before:absolute before:inset-y-2 before:left-3 before:w-0.5 before:bg-zinc-200">
              <li className="relative pl-8">
                <div className="absolute left-0 top-0.5 w-6 h-6 bg-white border-2 border-primary rounded-full flex items-center justify-center text-[10px] font-bold text-primary">1</div>
                <p className="text-xs md:text-sm font-semibold text-[#1a1a1a]">Share your link</p>
                <p className="text-[10px] md:text-xs text-zinc-500 mt-1">Send your unique link to your friends.</p>
              </li>
              <li className="relative pl-8">
                <div className="absolute left-0 top-0.5 w-6 h-6 bg-white border-2 border-primary rounded-full flex items-center justify-center text-[10px] font-bold text-primary">2</div>
                <p className="text-xs md:text-sm font-semibold text-[#1a1a1a]">Friend makes a purchase</p>
                <p className="text-[10px] md:text-xs text-zinc-500 mt-1">They get ₹500 off their first order.</p>
              </li>
              <li className="relative pl-8">
                <div className="absolute left-0 top-0.5 w-6 h-6 bg-white border-2 border-primary rounded-full flex items-center justify-center text-[10px] font-bold text-primary">3</div>
                <p className="text-xs md:text-sm font-semibold text-[#1a1a1a]">You get rewarded</p>
                <p className="text-[10px] md:text-xs text-zinc-500 mt-1">Once their order is delivered, you get ₹500.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
