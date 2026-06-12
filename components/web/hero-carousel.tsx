"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 2,
    headline: "Festive Collection Is Here",
    description: "Celebrate every moment in style.",
    cta: "Explore Festive Wear",
    link: "/shop?category=seasonal-collections",
    image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=1200&auto=format&fit=crop",
    bgColor: "bg-primary/5",
  },
  {
    id: 3,
    headline: "New Arrivals Every Week",
    description: "Stay ahead of fashion trends.",
    cta: "View New Arrivals",
    link: "/shop",
    image: "https://images.unsplash.com/photo-1615886753866-79396abc446e?q=80&w=1200&auto=format&fit=crop",
    bgColor: "bg-[#e2d8f3]/30",
  },
  {
    id: 4,
    headline: "Flat 20% Off On Selected Styles",
    description: "Limited-time offer on premium collections.",
    cta: "Shop Now",
    link: "/shop",
    image: "https://images.unsplash.com/photo-1615886753866-79396abc446e?q=80&w=1200&auto=format&fit=crop",
    bgColor: "bg-zinc-50",
  },
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden mt-6 shadow-sm border border-zinc-100 group">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={slide.id} className={cn("flex-[0_0_100%] min-w-0 relative h-[300px] md:h-[400px]", slide.bgColor)}>
              <div className="absolute inset-0 bg-linear-to-r from-black/40 to-transparent md:bg-none z-10" />
              <div className="container mx-auto px-6 lg:px-12 h-full flex items-center relative z-20">
                <div className="w-full md:w-1/2 space-y-6">
                  <h2 className="text-2xl md:text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white md:text-[#1a1a1a] leading-tight">
                    {slide.headline}
                  </h2>
                  <p className="text-xs md:text-sm md:text-base text-zinc-200 md:text-zinc-600 max-w-md">
                    {slide.description}
                  </p>
                  <div>
                    <Link
                      href={slide.link}
                      className="inline-block bg-primary text-white px-6 py-3 rounded-full font-medium text-xs md:text-sm transition-transform hover:-translate-y-1 shadow-lg shadow-primary/30"
                    >
                      {slide.cta}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Background Image Setup */}
              <div className="absolute right-0 top-0 w-full md:w-3/5 h-full -z-10 md:z-0 opacity-40 md:opacity-100">
                <div className="relative w-full h-full md:clip-path-slant bg-zinc-200">
                  <Image
                    src={slide.image}
                    alt={slide.headline}
                    fill
                    className="object-cover object-center"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 md:bg-linear-to-l md:from-transparent md:to-white/80" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm text-zinc-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-white z-30"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm text-zinc-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-white z-30"
      >
        <ChevronRight />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              index === selectedIndex ? "bg-primary w-8" : "bg-zinc-300 md:bg-zinc-400 hover:bg-primary/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
