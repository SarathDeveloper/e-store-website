"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products, Product } from "@/context/CartContext";
import ProductCard from "./product-card";
import QuickView from "./quick-view";

export default function BestSellers() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Use a different subset of products for "Best Sellers"
  const bestSellers = products.slice(15, 19);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  return (
    <section className="py-16 bg-white border-t border-zinc-100">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-lg md:text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight mb-2">Best Sellers</h2>
          <p className="text-xs md:text-sm text-muted-foreground">Our most loved and highest-rated designs.</p>
        </div>
        <Link
          href="/shop?collection=bestsellers"
          className="group hidden sm:flex items-center gap-2 text-primary font-bold text-xs md:text-sm tracking-wide hover:opacity-80 transition-all pb-1"
        >
          View All
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {bestSellers.map((product) => (
          <div key={product.id}>
            <ProductCard product={{...product, badge: "Best Seller"}} onQuickView={handleQuickView} />
          </div>
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <Link
          href="/shop?collection=bestsellers"
          className="inline-flex items-center gap-2 text-[#1a1a1a] border border-[#1a1a1a] rounded-full px-6 py-2.5 font-medium text-xs md:text-sm hover:bg-[#1a1a1a] hover:text-white transition-colors"
        >
          View All Best Sellers
        </Link>
      </div>

      <QuickView
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </section>
  );
}
