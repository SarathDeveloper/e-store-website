"use client";

import React, { useState, useEffect } from "react";
import { X, ShoppingBag, Heart, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { Product, useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

interface QuickViewProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function QuickView({ product, isOpen, onClose }: QuickViewProps) {
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [isAdded, setIsAdded] = useState(false);
    
    const isWished = product ? isInWishlist(product.id.toString()) : false;

    const handleWishlist = () => {
        if (!product) return;
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
    
    // Default size and color based on product, but product can change so we use useEffect
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<string>("");

    useEffect(() => {
        if (product) {
            setSelectedSize(product.sizes?.[0] || "");
            setSelectedColor(product.colors?.[0] || "");
        }
    }, [product]);

    useEffect(() => {
        if (isAdded) {
            const timer = setTimeout(() => setIsAdded(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isAdded]);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product, selectedSize, selectedColor);
        setIsAdded(true);
    };

    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative bg-white w-full max-w-4xl rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 bg-white/80 backdrop-blur-md rounded-full text-zinc-400 hover:text-primary transition-all z-10 shadow-sm"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Left: Product Image */}
                <div className="md:w-1/2 relative bg-zinc-50 min-h-[300px]">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover"
                    />
                    {product.badge && (
                        <div className="absolute top-6 left-6 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm shadow-md">
                            {product.badge}
                        </div>
                    )}
                </div>

                {/* Right: Product Info */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto">
                    <div className="mb-6">
                        <span className="text-primary font-bold uppercase tracking-widest text-[10px] mb-2 block">{product.category}</span>
                        <h2 className="text-lg md:text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight mb-3 leading-tight">{product.title}</h2>
                        <div className="flex items-center gap-3">
                            <span className="text-xl md:text-2xl font-bold text-primary">{product.price}</span>
                            {product.oldPrice && (
                                <span className="text-xs md:text-sm text-zinc-400 line-through font-medium">{product.oldPrice}</span>
                            )}
                        </div>
                    </div>

                    <p className="text-zinc-500 text-xs md:text-sm leading-relaxed mb-8">
                        {product.description || "Elegant handcrafted piece from our premium collection. Each detail is thoughtfully designed to ensure a perfect blend of tradition and modern style."}
                    </p>

                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-zinc-600 text-[10px] md:text-xs font-medium">
                            <CheckCircle2 className="w-4 h-4 text-primary/60" />
                            Premium Quality Fabrics
                        </div>
                        <div className="flex items-center gap-2 text-zinc-600 text-[10px] md:text-xs font-medium">
                            <CheckCircle2 className="w-4 h-4 text-primary/60" />
                            Fast Shipping & Easy Returns
                        </div>
                    </div>

                    {/* Attributes Grid */}
                    <div className="grid grid-cols-2 gap-y-3 mb-6 text-xs md:text-sm">
                        {product.brand && <div className="flex flex-col"><span className="text-zinc-500 text-[10px] md:text-xs">Brand</span><span className="font-medium text-[#1a1a1a]">{product.brand}</span></div>}
                        {product.fabric && <div className="flex flex-col"><span className="text-zinc-500 text-[10px] md:text-xs">Fabric</span><span className="font-medium text-[#1a1a1a]">{product.fabric}</span></div>}
                        {product.pattern && <div className="flex flex-col"><span className="text-zinc-500 text-[10px] md:text-xs">Pattern</span><span className="font-medium text-[#1a1a1a]">{product.pattern}</span></div>}
                        {product.fitType && <div className="flex flex-col"><span className="text-zinc-500 text-[10px] md:text-xs">Fit Type</span><span className="font-medium text-[#1a1a1a]">{product.fitType}</span></div>}
                        {product.occasion && <div className="flex flex-col"><span className="text-zinc-500 text-[10px] md:text-xs">Occasion</span><span className="font-medium text-[#1a1a1a]">{product.occasion}</span></div>}
                        {product.washCare && <div className="flex flex-col"><span className="text-zinc-500 text-[10px] md:text-xs">Wash Care</span><span className="font-medium text-[#1a1a1a]">{product.washCare}</span></div>}
                    </div>

                    {/* Selectors */}
                    <div className="flex flex-col gap-4 mb-6">
                        {product.sizes && product.sizes.length > 0 && (
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-2">Size</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={cn(
                                                "px-3 py-1.5 text-[10px] md:text-xs font-medium border rounded-md transition-all",
                                                selectedSize === size 
                                                    ? "border-primary bg-primary text-white" 
                                                    : "border-zinc-200 text-zinc-600 hover:border-zinc-300"
                                            )}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {product.colors && product.colors.length > 0 && (
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-2">Color</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {product.colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={cn(
                                                "px-3 py-1.5 text-[10px] md:text-xs font-medium border rounded-md transition-all",
                                                selectedColor === color 
                                                    ? "border-primary bg-primary text-white" 
                                                    : "border-zinc-200 text-zinc-600 hover:border-zinc-300"
                                            )}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-auto flex gap-3 pt-6 border-t border-zinc-50">
                        <button
                            onClick={handleAddToCart}
                            className={cn(
                                "flex-1 py-4 rounded-xl font-bold text-[10px] md:text-xs tracking-widest uppercase shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2",
                                isAdded
                                    ? "bg-green-600 text-white shadow-green-200"
                                    : "bg-primary text-white shadow-primary/20 hover:bg-primary/90"
                            )}
                        >
                            {isAdded ? (
                                <>
                                    <CheckCircle2 className="w-4 h-4 animate-in zoom-in duration-300" />
                                    Added to Cart
                                </>
                            ) : (
                                <>
                                    <ShoppingBag className="w-4 h-4" />
                                    Add to Cart
                                </>
                            )}
                        </button>
                        <button 
                            onClick={handleWishlist}
                            className="p-4 bg-zinc-50 text-zinc-400 rounded-xl hover:bg-zinc-100 transition-all"
                        >
                            <Heart className={cn("w-5 h-5", isWished && "fill-red-500 text-red-500")} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
