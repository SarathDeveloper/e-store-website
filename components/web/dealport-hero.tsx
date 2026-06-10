"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DealportHero() {
  return (
    <section className="w-full flex flex-col gap-6 my-6 font-sans">
      
      {/* --- TOP BANNER --- */}
      <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-[#1e3a40]">
        {/* We use a placeholder image that matches the boutique vibe, or just a solid color with text if image isn't available. */}
        <div className="absolute inset-0 z-0">
            <Image
                src="/images/boutique/home-hero-v2.png" 
                alt="Banner"
                fill
                className="object-cover opacity-50"
            />
        </div>
        <div className="relative z-10 w-full h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl">
          <h2 className="text-white text-xl md:text-2xl sm:text-3xl md:text-5xl font-light mb-2">
            Discover the Latest Deals &ndash;
          </h2>
          <h1 className="text-white text-2xl md:text-3xl sm:text-4xl md:text-6xl font-bold italic mb-8">
            Up to 50% Off!
          </h1>
          <Link
            href="/shop"
            className="bg-[#eaf4eb] text-[#1e3a40] font-bold px-8 py-3 rounded-full w-max hover:bg-white transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>


    </section>
  );
}
