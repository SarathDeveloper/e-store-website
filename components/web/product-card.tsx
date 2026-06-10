"use client";

import { ShoppingBag, Heart, Eye, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useCart, Product } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const isWished = isInWishlist(product.id.toString());

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    const snippet = {
      id: product.id.toString(),
      name: product.title,
      price: parseFloat(product.price.replace(/[^0-9.-]+/g,"")),
      image: product.image,
      originalPrice: product.oldPrice ? parseFloat(product.oldPrice.replace(/[^0-9.-]+/g,"")) : undefined,
    };

    if (isWished) {
      removeFromWishlist(product.id.toString());
    } else {
      addToWishlist(snippet);
    }
  };

  return (
    <div className="flex flex-col bg-white border border-zinc-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow h-full">
        
        {/* Image Container */}
        <Link href={`/products/${product.id}`} className="block relative aspect-square rounded-xl overflow-hidden mb-4 bg-zinc-100 group cursor-pointer">
            <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Badges */}
            {product.badge && (
                <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded shadow-md z-10">
                    {product.badge}
                </div>
            )}

            {/* Top Right Actions */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
                <button
                    onClick={handleWishlist}
                    className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm text-zinc-400 hover:text-red-500 transition-colors"
                    aria-label="Toggle Wishlist"
                >
                    <Heart className={cn("w-4 h-4", isWished && "fill-red-500 text-red-500")} />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onQuickView(product);
                    }}
                    className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm text-zinc-400 hover:text-primary transition-colors opacity-0 group-hover:opacity-100 md:opacity-100"
                    aria-label="Quick View"
                >
                    <Eye className="w-4 h-4" />
                </button>
            </div>
        </Link>

        {/* Product Info */}
        <div className="flex flex-col flex-1">
            <Link href={`/products/${product.id}`} className="block">
                <h3 className="text-base md:text-lg font-bold text-zinc-900 leading-tight mb-2 hover:text-primary transition-colors line-clamp-2">
                    {product.title}
                </h3>
                <p className="text-[10px] md:text-xs text-zinc-500 mb-3 line-clamp-2 leading-relaxed">
                    {product.description || "A majestic crimson silk saree with intricate gold zari borders, perfect for grand occasions."}
                </p>

                {/* Ratings */}
                <div className="flex items-center gap-1 mb-4">
                    <div className="flex text-[#ffc107]">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current opacity-50" />
                    </div>
                    <span className="text-[11px] text-zinc-500 ml-1">(342 reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-end gap-2 mb-6">
                    <span className="text-primary text-lg md:text-xl font-black tracking-tight">{product.price}</span>
                    {product.oldPrice && (
                        <>
                            <span className="text-[10px] md:text-xs text-zinc-400 line-through font-medium mb-1">{product.oldPrice}</span>
                            <span className="text-[11px] font-bold text-black mb-1 ml-1 bg-zinc-100 px-1.5 py-0.5 rounded">20% Off</span>
                        </>
                    )}
                </div>
            </Link>

            {/* Actions */}
            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
                <Link href={`/products/${product.id}`} className="text-primary text-[10px] md:text-xs sm:text-sm font-semibold hover:underline">
                    View Details
                </Link>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                    }}
                    className="bg-primary text-primary-foreground px-4 sm:px-5 py-2 rounded-full text-[10px] md:text-xs sm:text-sm font-bold hover:opacity-90 transition-opacity shadow-sm shadow-primary/30"
                >
                    Add to cart
                </button>
            </div>
        </div>
    </div>
  );
}
