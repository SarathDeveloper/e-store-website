"use client";

import { CheckCircle2, ShieldCheck, Truck, RefreshCw, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    description: "Expert craftsmanship and high-grade materials for every piece."
  },
  {
    icon: CheckCircle2,
    title: "Secure Checkout",
    description: "100% secure payment processing with top-tier encryption."
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Expedited shipping options available on all readymade items."
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "Hassle-free 7-day return policy for eligible products."
  },
  {
    icon: HeadphonesIcon,
    title: "Customer Support",
    description: "Dedicated support team ready to assist you anytime."
  }
];

export default function WhyShopWithUs() {
  return (
    <section className="py-16 bg-zinc-50 rounded-3xl border border-zinc-100 my-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-zinc-900 tracking-tight mb-4">Why Shop With Us</h2>
        <p className="text-zinc-500">
          We bring premium women's fashion to your doorstep, ensuring every piece you purchase meets the highest standards of quality and design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4 md:px-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div 
              key={index} 
              className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow text-center group"
            >
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xs md:text-sm font-bold text-zinc-900 mb-1.5">{feature.title}</h3>
              <p className="text-[10px] md:text-xs text-zinc-500 leading-relaxed">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
