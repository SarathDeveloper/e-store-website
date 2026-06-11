"use client";

import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2, ShoppingBag, ArrowRight, Star } from "lucide-react";

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const { products } = require("@/context/CartContext");

  const handleMoveToCart = (item: { id: string; name: string; price: number; image: string }) => {
    const product = products.find((p: any) => p.id === parseInt(item.id, 10));
    if (product) {
      addToCart(product);
    } else {
      // Fallback
      addToCart({
        id: parseInt(item.id, 10),
        title: item.name,
        price: `₹${item.price}`,
        image: item.image,
        category: "General",
        badge: "",
      } as any);
    }
    removeFromWishlist(item.id);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-sm md:text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">My Wishlist</h1>
        <p className="text-zinc-500 mt-2">Products you have saved for later.</p>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {items.map((item) => {
            const product = products.find((p: any) => p.id === parseInt(item.id, 10));
            
            const title = product ? product.title : item.name;
            const description = product ? product.description : "A beautifully crafted piece for your wardrobe.";
            const currentPrice = product ? product.price : `₹${item.price.toLocaleString()}`;
            const oldPrice = product ? product.oldPrice : (item.originalPrice ? `₹${item.originalPrice.toLocaleString()}` : undefined);

            return (
            <div key={item.id} className="bg-white rounded-2xl md:rounded-3xl border border-zinc-100 overflow-hidden group shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="relative aspect-[4/5] bg-zinc-100">
                <Image src={item.image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 md:top-4 md:right-4 w-7 h-7 md:w-8 md:h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors z-10"
                >
                  <Trash2 className="w-4 h-4 md:w-4 md:h-4" />
                </button>
              </div>
              <div className="flex flex-col flex-1 p-2 md:p-5 pt-3 md:pt-5">
                <div className="mb-auto">
                    <h3 className="text-xs md:text-lg font-bold text-zinc-900 leading-tight mb-1 md:mb-2 hover:text-primary transition-colors line-clamp-2">{title}</h3>
                    <p className="text-[10px] md:text-xs text-zinc-500 mb-2 md:mb-3 line-clamp-1 md:line-clamp-2 leading-relaxed">
                        {description || "A majestic crimson silk saree with intricate gold zari borders, perfect for grand occasions."}
                    </p>

                    {/* Ratings */}
                    <div className="flex items-center gap-1 mb-2 md:mb-4">
                        <div className="flex text-[#ffc107]">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <Star className="w-3.5 h-3.5 fill-current opacity-50" />
                        </div>
                        <span className="text-[11px] md:text-xs text-zinc-500 ml-1">(342 reviews)</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-end gap-1.5 md:gap-2 mt-1 md:mt-auto mb-3 md:mb-6">
                        <span className="text-primary text-sm md:text-xl font-black tracking-tight leading-none">{currentPrice}</span>
                        {oldPrice && (
                            <>
                                <span className="text-[10px] md:text-xs text-zinc-400 line-through font-medium leading-none">{oldPrice}</span>
                                <span className="text-[9px] md:text-[11px] font-bold text-black ml-auto md:ml-1 bg-zinc-100 px-1.5 py-0.5 rounded leading-none">20% Off</span>
                            </>
                        )}
                    </div>
                </div>
                
                <div className="mt-auto space-y-2 pt-2 border-t border-zinc-50">
                  <button 
                    onClick={() => handleMoveToCart(item)}
                    className="w-full flex items-center justify-center gap-1.5 md:gap-2 py-2 md:py-3 bg-primary text-white rounded-full md:rounded-xl text-[10px] md:text-sm font-semibold shadow-sm shadow-primary/20 hover:bg-primary/90 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 md:w-4 md:h-4" /> <span className="hidden sm:inline">Move to Cart</span><span className="sm:hidden">To Cart</span>
                  </button>
                </div>
              </div>
            </div>
          )})}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-3xl border border-zinc-100 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-red-300 fill-red-100" />
          </div>
          <h3 className="text-xs md:text-lg font-bold text-[#1a1a1a] mb-2">Your wishlist is empty</h3>
          <p className="text-zinc-500 mb-6">Save items you love and buy them later.</p>
          <Link href="/shop" className="flex items-center gap-2 text-primary font-bold hover:opacity-80 transition-opacity">
            Discover Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
