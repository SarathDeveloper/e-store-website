"use client";

import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

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
        <h1 className="text-lg md:text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">My Wishlist</h1>
        <p className="text-zinc-500 mt-2">Products you have saved for later.</p>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl border border-zinc-100 overflow-hidden group shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="relative aspect-[4/5] bg-zinc-100">
                <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors z-10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-serif font-semibold text-[#1a1a1a] mb-1 line-clamp-1">{item.name}</h3>
                <p className="text-primary font-bold mb-4">₹{item.price.toLocaleString()}</p>
                
                <div className="mt-auto space-y-2">
                  <button 
                    onClick={() => handleMoveToCart(item)}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" /> Move to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-3xl border border-zinc-100 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-red-300 fill-red-100" />
          </div>
          <h3 className="text-base md:text-lg font-bold text-[#1a1a1a] mb-2">Your wishlist is empty</h3>
          <p className="text-zinc-500 mb-6">Save items you love and buy them later.</p>
          <Link href="/shop" className="flex items-center gap-2 text-primary font-bold hover:opacity-80 transition-opacity">
            Discover Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
