"use client";

import React, { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products, Product } from "@/context/CartContext";
import ProductCard from "./product-card";
import QuickView from "./quick-view";

export default function NewArrivalsSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  // Use a subset of products for "New Arrivals"
  const newArrivals = products.slice(7, 15);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-lg md:text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight mb-2">New Arrivals</h2>
          <p className="text-zinc-500 text-xs md:text-sm">Be the first to wear our latest premium designs.</p>
        </div>
        <div className="hidden md:flex gap-2">
          <button 
            onClick={scrollPrev}
            className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-primary hover:border-primary transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={scrollNext}
            className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-primary hover:border-primary transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {newArrivals.map((product) => (
              <div key={product.id} className="flex-[0_0_80%] sm:flex-[0_0_40%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] pl-4 min-w-0">
                <ProductCard product={product} onQuickView={handleQuickView} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <QuickView
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </section>
  );
}
