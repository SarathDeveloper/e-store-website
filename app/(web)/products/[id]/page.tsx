"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useCart, products, Product } from "@/context/CartContext";
import { useRecentlyViewed } from "@/context/RecentlyViewedContext";
import { ShoppingBag, ArrowLeft, Heart, Share2, CheckCircle2, ShieldCheck, Truck, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import Footer from "@/components/web/footer";
import Link from "next/link";
import ProductGallery from "@/components/web/product-gallery";
import ProductTabs from "@/components/web/product-tabs";
import ProductCard from "@/components/web/product-card";
import CompactProductCard from "@/components/web/compact-product-card";
import QuickView from "@/components/web/quick-view";

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const { addViewedProduct } = useRecentlyViewed();
    const [isAdded, setIsAdded] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const product = products.find(p => p.id === Number(id));
    
    const [selectedSize, setSelectedSize] = useState<string>(product?.sizes?.[0] || "");
    const [selectedColor, setSelectedColor] = useState<string>(product?.colors?.[0] || "");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

    const handleQuickView = (product: Product) => {
        setSelectedProduct(product);
        setIsQuickViewOpen(true);
    };

    useEffect(() => {
        if (isAdded) {
            const timer = setTimeout(() => setIsAdded(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isAdded]);

    useEffect(() => {
        if (product) {
            addViewedProduct({
                id: product.id.toString(),
                name: product.title,
                price: parseFloat(product.price.replace(/[^0-9.-]+/g,"")),
                image: product.image,
                originalPrice: product.oldPrice ? parseFloat(product.oldPrice.replace(/[^0-9.-]+/g,"")) : undefined,
            });
        }
    }, [product, addViewedProduct]);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product, selectedSize, selectedColor, quantity);
        setIsAdded(true);
    };

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-xl md:text-2xl font-bold mb-4">Product Not Found</h1>
                    <button onClick={() => router.push("/shop")} className="text-primary font-bold">Back to Shop</button>
                </div>
            </div>
        );
    }

    const features = [
        { icon: CheckCircle2, text: "Premium Quality Fabrics" },
        { icon: ShieldCheck, text: "Quality Guaranteed" },
        { icon: Truck, text: "Fast Shipping & Easy Returns" },
    ];

    return (
        <div className="min-h-screen bg-white font-sans">
            <main className="max-w-7xl mx-auto px-6 py-8 md:py-12">
                {/* Breadcrumb / Back */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs md:text-sm font-bold uppercase tracking-widest">Back to Shop</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Image Section */}
                    <div className="relative">
                        <ProductGallery images={[product.image, "/images/boutique/home-hero-v2.png", "/images/boutique/home-hero-v2.png"]} />
                        {product.badge && (
                            <div className="absolute top-6 left-6 bg-primary text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg z-10">
                                {product.badge}
                            </div>
                        )}
                        <button className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-md rounded-full text-zinc-400 hover:text-red-500 transition-all shadow-md z-10">
                            <Heart className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col h-full py-2">
                        <div className="mb-8">
                            <span className="text-primary font-bold uppercase tracking-widest text-[10px] md:text-xs mb-3 block">{product.category}</span>
                            <h1 className="text-xl md:text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-4 leading-tight">{product.title}</h1>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-xl md:text-2xl md:text-3xl font-semibold text-primary">{product.price}</span>
                                {product.oldPrice && (
                                    <span className="text-sm md:text-base md:text-lg text-zinc-400 line-through font-medium">{product.oldPrice}</span>
                                )}
                            </div>
                            <p className="text-xs md:text-sm md:text-base text-zinc-500 leading-relaxed max-w-lg mb-8">
                                {product.description || "Experience the perfect blend of tradition and elegance. Each piece is carefully curated to bring you the finest craftsmanship and timeless style."}
                            </p>
                        </div>

                        {/* Feature List */}
                        <div className="space-y-4 mb-6">
                            {features.map((f, i) => (
                                <div key={i} className="flex items-center gap-3 text-zinc-600">
                                    <f.icon className="w-5 h-5 text-primary/60" />
                                    <span className="text-xs md:text-sm font-medium">{f.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Attributes Grid */}
                        <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-8 text-xs md:text-sm bg-zinc-50 p-5 rounded-2xl border border-zinc-100">
                            {product.brand && <div className="flex flex-col"><span className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold mb-1">Brand</span><span className="font-bold text-zinc-900">{product.brand}</span></div>}
                            {product.fabric && <div className="flex flex-col"><span className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold mb-1">Fabric</span><span className="font-bold text-zinc-900">{product.fabric}</span></div>}
                            {product.pattern && <div className="flex flex-col"><span className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold mb-1">Pattern</span><span className="font-bold text-zinc-900">{product.pattern}</span></div>}
                            {product.fitType && <div className="flex flex-col"><span className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold mb-1">Fit Type</span><span className="font-bold text-zinc-900">{product.fitType}</span></div>}
                            {product.occasion && <div className="flex flex-col"><span className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold mb-1">Occasion</span><span className="font-bold text-zinc-900">{product.occasion}</span></div>}
                            {product.washCare && <div className="flex flex-col"><span className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold mb-1">Wash Care</span><span className="font-bold text-zinc-900">{product.washCare}</span></div>}
                        </div>

                        {/* Selectors */}
                        <div className="flex flex-col gap-6 mb-8">
                            {product.sizes && product.sizes.length > 0 && (
                                <div>
                                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 block mb-3">Size</span>
                                    <div className="flex flex-wrap gap-2">
                                        {product.sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={cn(
                                                    "px-5 py-2 text-xs md:text-sm font-bold border rounded-full transition-all",
                                                    selectedSize === size 
                                                        ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20" 
                                                        : "border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
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
                                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 block mb-3">Color</span>
                                    <div className="flex flex-wrap gap-2">
                                        {product.colors.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={cn(
                                                    "px-5 py-2 text-xs md:text-sm font-bold border rounded-full transition-all",
                                                    selectedColor === color 
                                                        ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20" 
                                                        : "border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
                                                )}
                                            >
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-8">
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 block mb-3">Quantity</span>
                            <div className="flex items-center w-32 border border-zinc-200 rounded-full bg-zinc-50">
                                <button 
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="p-3 text-zinc-500 hover:text-primary transition-colors focus:outline-none"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <input 
                                    type="number" 
                                    value={quantity}
                                    readOnly
                                    className="w-10 bg-transparent text-center font-bold text-zinc-900 focus:outline-none appearance-none"
                                />
                                <button 
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="p-3 text-zinc-500 hover:text-primary transition-colors focus:outline-none"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                            <button
                                onClick={handleAddToCart}
                                className={cn(
                                    "flex-1 py-3 md:py-4 rounded-full border-2 border-primary text-primary font-bold text-xs md:text-sm md:text-base transition-all active:scale-[0.98] flex items-center justify-center gap-2",
                                    isAdded
                                        ? "bg-green-50 border-green-600 text-green-600"
                                        : "hover:bg-primary/5 bg-transparent"
                                )}
                            >
                                {isAdded ? (
                                    <>
                                        <CheckCircle2 className="w-5 h-5 animate-in zoom-in duration-300" />
                                        Added
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag className="w-5 h-5" />
                                        Add to Cart
                                    </>
                                )}
                            </button>
                            <Link
                                href="/checkout"
                                onClick={(e) => {
                                    handleAddToCart();
                                }}
                                className="flex-1 py-3 md:py-4 rounded-full bg-primary text-primary-foreground font-bold text-xs md:text-sm md:text-base shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 active:scale-[0.98] flex items-center justify-center"
                            >
                                Buy Now
                            </Link>
                            <button className="px-5 py-3 md:py-4 border-2 border-zinc-200 text-zinc-500 rounded-full hover:bg-zinc-50 hover:border-zinc-300 transition-all flex items-center justify-center">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="mt-12 pt-12 border-t border-zinc-100 overflow-hidden">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="text-lg md:text-xl font-bold text-zinc-900 tracking-tight">Similar Products</h4>
                                <button className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-zinc-800 transition-colors shadow-sm">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                                </button>
                            </div>
                            
                            <div className="flex overflow-x-auto gap-4 pb-4 -mx-1 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x">
                                {products
                                    .filter(p => p.id !== product.id && p.category === product.category)
                                    .map(relatedProduct => (
                                        <div key={relatedProduct.id} className="snap-start shrink-0">
                                            <CompactProductCard product={relatedProduct} />
                                        </div>
                                    ))}
                            </div>
                        </div>
                        
                        <ProductTabs />
                    </div>
                </div>
            </main>
            <QuickView
                product={selectedProduct}
                isOpen={isQuickViewOpen}
                onClose={() => setIsQuickViewOpen(false)}
            />
            <Footer />
        </div>
    );
}
