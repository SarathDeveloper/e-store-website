"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/context/CartContext";
import { Star } from "lucide-react";

interface CompactProductCardProps {
  product: Product;
}

export default function CompactProductCard({ product }: CompactProductCardProps) {
  // Calculate discount percentage if oldPrice exists
  let discount = 0;
  if (product.oldPrice && product.price) {
    const oldP = parseFloat(product.oldPrice.replace(/[^0-9.-]+/g, ""));
    const newP = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
    if (oldP > newP && oldP > 0) {
      discount = Math.round(((oldP - newP) / oldP) * 100);
    }
  }

  return (
    <div className="flex flex-col min-w-[140px] w-[140px] sm:min-w-[150px] sm:w-[150px] md:min-w-[200px] md:w-[200px] group">
      <Link href={`/products/${product.id}`} className="block relative aspect-[4/5] rounded-xl overflow-hidden mb-3 bg-[#f8f8f8] border border-zinc-100/60">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-0 left-0 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-br-lg z-10">
            {product.badge}
          </div>
        )}

        {/* Rating Overlay */}
        <div className="absolute bottom-2 left-2 bg-white px-1.5 py-0.5 rounded shadow-sm flex items-center gap-0.5 z-10">
          <span className="text-[10px] font-bold text-zinc-800">4.3</span>
          <Star className="w-2.5 h-2.5 fill-green-600 text-green-600" />
        </div>
      </Link>

      <Link href={`/products/${product.id}`} className="flex flex-col flex-1 px-1">
        <h3 className="text-xs md:text-sm font-medium text-zinc-800 leading-tight mb-1 line-clamp-1 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        
        {discount > 0 ? (
          <span className="text-[10px] md:text-xs font-bold text-green-600 mb-1">{discount}% OFF</span>
        ) : (
          <span className="text-[10px] md:text-xs font-bold text-transparent mb-1 select-none">0% OFF</span>
        )}

        <div className="flex items-baseline gap-1.5 mb-1">
          {product.oldPrice && (
            <span className="text-[10px] md:text-xs text-zinc-400 line-through">{product.oldPrice}</span>
          )}
          <span className="text-xs md:text-sm font-bold text-zinc-900">{product.price}</span>
        </div>

        {discount > 0 && (
          <p className="text-[11px] font-semibold text-primary mb-1 line-clamp-1">
            {product.price} with offers
          </p>
        )}

        <p className="text-[11px] text-zinc-500 mt-auto pt-1">
          Get it by <span className="font-bold text-zinc-700">Tomorrow</span>
        </p>
      </Link>
    </div>
  );
}
