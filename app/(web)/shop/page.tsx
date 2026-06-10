"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ShoppingBag, Heart, Eye } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Footer from "@/components/web/footer";
import { useCart, Product, products } from "@/context/CartContext";
import QuickView from "@/components/web/quick-view";
import Link from "next/link";
import ShopPromoBanner from "@/components/web/shop-promo-banner";
import ShopTrustBanners from "@/components/web/shop-trust-banners";
import ProductCard from "@/components/web/product-card";

const categories = [
    { name: "All", count: 50 },
    { name: "Ethnic Wear", count: 12 },
    { name: "Western Wear", count: 10 },
    { name: "Bottom Wear", count: 8 },
    { name: "Office Wear", count: 6 },
    { name: "Party Wear", count: 6 },
    { name: "Seasonal Collections", count: 8 }
];

// Products are now centralized in CartContext

function ShopContent() {
    const searchParams = useSearchParams();
    const categoryQuery = searchParams.get("category");
    const searchQuery = searchParams.get("search");
    
    const [activeCategory, setActiveCategory] = useState(categoryQuery || "All");
    const { addToCart } = useCart();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

    useEffect(() => {
        if (categoryQuery) {
            setActiveCategory(categoryQuery);
        }
    }, [categoryQuery]);

    const filteredProducts = products.filter(p => {
        const matchesCategory = activeCategory === "All" || p.category === activeCategory;
        const matchesSearch = !searchQuery || 
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-white font-sans">
            <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-lg md:text-xl md:text-2xl font-serif font-semibold text-[#1a1a1a] mb-2">Our Collection</h1>
                    <p className="text-zinc-500 text-[13px] tracking-wide">Handpicked premium women's fashion, from elegant ethnic wear to chic western styles.</p>
                </div>

                <ShopPromoBanner />

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setActiveCategory(cat.name)}
                            className={cn(
                                "px-4 md:px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border",
                                activeCategory === cat.name
                                    ? "bg-primary border-primary text-white shadow-md shadow-primary/10"
                                    : "bg-[#f5f5f7] border-transparent text-zinc-500 hover:bg-zinc-200"
                            )}
                        >
                            {cat.name} ({cat.count})
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    {filteredProducts.map((product) => (
                        <div key={product.id}>
                            <ProductCard product={product} onQuickView={(p) => {
                                setSelectedProduct(p);
                                setIsQuickViewOpen(true);
                            }} />
                        </div>
                    ))}
                </div>

                <QuickView
                    product={selectedProduct}
                    isOpen={isQuickViewOpen}
                    onClose={() => setIsQuickViewOpen(false)}
                />

                <ShopTrustBanners />
            </main>
            <Footer />
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
            <ShopContent />
        </Suspense>
    );
}
