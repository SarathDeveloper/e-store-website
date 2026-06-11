"use client";

import { ShoppingBag, ArrowRight, Heart, Eye, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart, Product, products } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useState } from "react";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/web/product-card";
import QuickView from "@/components/web/quick-view";

const mainProducts = products.slice(0, 3);
// Ensure we have 4 products for the collection grid. If not enough products, loop back.
const collectionProducts = products.length >= 7 ? products.slice(3, 7) : [...products, ...products].slice(0, 4);

export default function FeaturedCollection() {
    const router = useRouter();
    const { addToCart } = useCart();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

    const handleQuickView = (product: Product) => {
        setSelectedProduct(product);
        setIsQuickViewOpen(true);
    };

    return (
        <section className="py-12 bg-white">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                <h2 className="text-lg md:text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">Trending Product</h2>
                <Link
                    href="/shop"
                    className="border border-zinc-300 text-zinc-700 rounded-full px-5 py-2 text-xs md:text-sm font-semibold hover:bg-zinc-50 hover:text-black transition-colors"
                >
                    View All
                </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                
                {/* Single Product Cards */}
                {mainProducts.map((product, idx) => (
                    <div key={product.id} className={cn(idx === 2 ? "hidden lg:block" : "")}>
                        <ProductCard product={product} onQuickView={handleQuickView} />
                    </div>
                ))}

                {/* Collection Card */}
                <div className="col-span-2 sm:col-span-2 lg:col-span-1 bg-white border border-zinc-100 rounded-2xl p-4 md:p-5 shadow-sm flex flex-col h-full">
                    <h3 className="text-sm md:text-lg font-bold text-zinc-900 mb-4 tracking-tight">Trend collection for you</h3>
                    
                    <div className="grid grid-cols-2 gap-3 flex-1">
                        {collectionProducts.map((product, idx) => (
                            <Link href={`/products/${product.id}`} key={`collection-${product.id}-${idx}`} className="relative bg-[#f8f9f8] rounded-xl overflow-hidden group border border-zinc-50 hover:border-zinc-200 transition-colors flex flex-col aspect-[4/5]">
                                
                                {/* Overlay Top Stats */}
                                <div className="absolute top-0 left-0 right-0 w-full p-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 z-10">
                                    <span className="text-[9px] font-medium text-zinc-500 bg-white/80 px-1.5 rounded backdrop-blur-sm whitespace-nowrap">20% off</span>
                                    <span className="text-[10px] font-bold text-primary bg-white/80 px-1.5 rounded backdrop-blur-sm whitespace-nowrap">{product.price}</span>
                                </div>

                                {/* Image */}
                                <div className="absolute inset-0 z-0 p-4 pt-8">
                                    <div className="relative w-full h-full rounded-lg overflow-hidden mix-blend-multiply">
                                        <Image
                                            src={product.image}
                                            alt={product.title}
                                            fill
                                            className="object-contain transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                </div>

                                {/* Buy Now Pill Overlay */}
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-max z-10">
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            addToCart(product);
                                            router.push("/checkout");
                                        }}
                                        className="bg-primary/10 text-primary border border-primary/20 text-[9px] sm:text-[10px] font-bold px-2 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-xs hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </Link>
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
