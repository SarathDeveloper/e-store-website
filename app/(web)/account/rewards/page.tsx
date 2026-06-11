"use client";

import { useEffect, useState } from "react";
import { RewardTransaction, mockApi } from "@/lib/mock-account-api";
import { Award, ArrowUpRight, ArrowDownRight, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RewardsPage() {
  const [transactions, setTransactions] = useState<RewardTransaction[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setTransactions(mockApi.getRewards());
  }, []);

  const totalPoints = transactions.reduce((acc, curr) => 
    curr.type === "earned" ? acc + curr.points : acc - curr.points
  , 0);

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-zinc-900 tracking-tight">Loyalty & Rewards</h1>
        <p className="text-sm md:text-base text-zinc-500 mt-2">Earn points on every purchase and redeem them for exclusive discounts.</p>
      </div>

      {/* Rewards Overview Card */}
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-black/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <p className="text-white/70 font-medium uppercase tracking-wider text-[10px] md:text-xs mb-2">Available Points</p>
            <div className="flex items-end gap-3">
              <span className="text-3xl md:text-5xl font-bold text-primary tracking-tight">{totalPoints}</span>
              <span className="text-sm md:text-lg text-white/80 pb-1">pts</span>
            </div>
            <p className="text-white/60 text-xs md:text-sm mt-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" /> Equals to ₹{totalPoints} in store value
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button className="bg-primary text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all text-sm md:text-base">
              Redeem Points
            </button>
            <button className="bg-white/10 text-white hover:bg-white/20 px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition-all backdrop-blur-sm text-sm md:text-base">
              Ways to Earn
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Available Coupons */}
        <div className="space-y-6">
          <h2 className="text-base md:text-lg font-serif font-bold text-[#1a1a1a] flex items-center gap-2">
            <Gift className="w-5 h-5 text-primary" /> Available Rewards
          </h2>
          <div className="grid gap-4">
            <div className="bg-white border border-zinc-200 rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
              <div className="flex-grow">
                <h3 className="text-sm md:text-base font-bold text-[#1a1a1a]">₹500 Off Coupon</h3>
                <p className="text-xs md:text-sm text-zinc-500 mt-1">Applicable on orders above ₹2000</p>
              </div>
              <div className="text-center shrink-0">
                <span className="block font-bold text-primary text-sm md:text-lg">500 pts</span>
                <button className="text-[10px] md:text-xs font-bold text-zinc-400 hover:text-[#1a1a1a] transition-colors mt-1 uppercase tracking-wider">Redeem</button>
              </div>
            </div>
            <div className="bg-white border border-zinc-200 rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
              <div className="flex-grow">
                <h3 className="text-sm md:text-base font-bold text-[#1a1a1a]">Free Shipping</h3>
                <p className="text-xs md:text-sm text-zinc-500 mt-1">Valid for one domestic order</p>
              </div>
              <div className="text-center shrink-0">
                <span className="block font-bold text-primary text-sm md:text-lg">250 pts</span>
                <button className="text-[10px] md:text-xs font-bold text-zinc-400 hover:text-[#1a1a1a] transition-colors mt-1 uppercase tracking-wider">Redeem</button>
              </div>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="space-y-6">
          <h2 className="text-base md:text-lg font-serif font-bold text-[#1a1a1a]">Points History</h2>
          <div className="bg-white border border-zinc-100 rounded-3xl overflow-hidden shadow-sm">
            {transactions.length > 0 ? (
              <div className="divide-y divide-zinc-100">
                {transactions.map(tx => (
                  <div key={tx.id} className="p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                        tx.type === "earned" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                      )}>
                        {tx.type === "earned" ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-semibold text-[#1a1a1a] text-xs md:text-sm">{tx.description}</p>
                        <p className="text-[11px] text-zinc-500 mt-0.5">{new Date(tx.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className={cn(
                      "font-bold text-xs md:text-sm",
                      tx.type === "earned" ? "text-green-600" : "text-[#1a1a1a]"
                    )}>
                      {tx.type === "earned" ? "+" : "-"}{tx.points}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-zinc-500 text-xs md:text-sm">No transaction history yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
