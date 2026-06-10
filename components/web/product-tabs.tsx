"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: "Reviews (12)" },
  ];

  return (
    <div className="mt-16 pt-10 border-t border-zinc-100">
      <div className="flex gap-8 border-b border-zinc-200 mb-8 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-xs md:text-sm font-semibold tracking-wide whitespace-nowrap transition-colors relative ${
              activeTab === tab.id ? "text-primary" : "text-zinc-500 hover:text-[#1a1a1a]"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      <div className="min-h-[200px]">
        {activeTab === "description" && (
          <div className="prose prose-zinc max-w-none text-zinc-600 text-[15px] leading-relaxed">
            <p>
              Experience the perfect blend of tradition and elegance. Each piece is carefully curated to bring you the finest craftsmanship and timeless style. Our materials are sourced globally to ensure premium quality.
            </p>
            <p className="mt-4">
              Care Instructions: Dry clean only. Keep away from direct sunlight to preserve the color richness.
            </p>
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col py-3 border-b border-zinc-100">
              <span className="text-[10px] md:text-xs text-zinc-400 uppercase tracking-wider mb-1">Material</span>
              <span className="font-medium text-[#1a1a1a]">Premium Silk Blend</span>
            </div>
            <div className="flex flex-col py-3 border-b border-zinc-100">
              <span className="text-[10px] md:text-xs text-zinc-400 uppercase tracking-wider mb-1">Occasion</span>
              <span className="font-medium text-[#1a1a1a]">Festive / Wedding</span>
            </div>
            <div className="flex flex-col py-3 border-b border-zinc-100">
              <span className="text-[10px] md:text-xs text-zinc-400 uppercase tracking-wider mb-1">Work</span>
              <span className="font-medium text-[#1a1a1a]">Intricate Aari Embroidery</span>
            </div>
            <div className="flex flex-col py-3 border-b border-zinc-100">
              <span className="text-[10px] md:text-xs text-zinc-400 uppercase tracking-wider mb-1">Fit</span>
              <span className="font-medium text-[#1a1a1a]">Regular Fit</span>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">4.8</div>
              <div>
                <div className="flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#eab308] text-[#eab308]" />
                  ))}
                </div>
                <div className="text-xs md:text-sm text-zinc-500">Based on 12 reviews</div>
              </div>
            </div>
            
            {/* Sample Review */}
            <div className="border-t border-zinc-100 pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-[#1a1a1a]">Sneha K.</div>
                <span className="text-[10px] md:text-xs text-zinc-400">2 days ago</span>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#eab308] text-[#eab308]" />
                ))}
              </div>
              <p className="text-[15px] text-zinc-600">Absolutely stunning! The quality exceeded my expectations. I received so many compliments.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
