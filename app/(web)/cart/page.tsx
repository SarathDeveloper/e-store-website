"use client";

import React from "react";
import { useCart, products } from "@/context/CartContext";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Tag, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/web/footer";

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, subtotal, gst, total, itemCount } = useCart();

    const formatPrice = (amount: number) => {
        return `₹${amount.toLocaleString()}`;
    };

    if (itemCount === 0) {
        return (
            <div className="min-h-screen bg-white font-sans">
                <main className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
                        <ShoppingBag className="w-8 h-8 text-zinc-300" />
                    </div>
                    <h1 className="text-xl md:text-2xl font-serif font-semibold text-[#1a1a1a] mb-3">Your Cart is Empty</h1>
                    <p className="text-zinc-500 text-[15px] mb-8 max-w-sm leading-relaxed">Looks like you haven&apos;t added anything to your cart yet. Explore our collection to find something special.</p>
                    <Link
                        href="/shop"
                        className="bg-primary px-6 py-3 rounded-xl text-white font-medium text-[13px] tracking-wide shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all"
                    >
                        Start Shopping
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans">
            <main className="max-w-7xl mx-auto px-6 py-10 md:py-16">
                <h1 className="text-lg md:text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-6 p-6 bg-white rounded-[32px] border border-zinc-100 shadow-sm hover:shadow-md transition-all">
                                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shrink-0 bg-zinc-50 border border-zinc-100">
                                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                                </div>
                                <div className="flex flex-col grow py-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-[15px] font-semibold text-[#1a1a1a] leading-tight mb-1">{item.title}</h3>
                                            <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">{item.category}</p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-2 text-zinc-300 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <p className="text-primary font-semibold mb-4">{item.price}</p>

                                    <div className="flex items-center gap-4 mt-auto">
                                        <div className="flex items-center gap-2 bg-zinc-50 rounded-xl p-1 border border-zinc-100">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-zinc-500 transition-all"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="w-8 text-center text-xs md:text-sm font-bold text-[#1a1a1a]">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-zinc-500 transition-all"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                    

                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-xl shadow-zinc-200/40 sticky top-24">
                            <h2 className="text-[18px] font-semibold text-[#1a1a1a] mb-6">Order Summary</h2>

                            {/* Coupon Code */}
                            <div className="mb-8">
                                <div className="flex gap-2">
                                    <div className="relative grow">
                                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                        <input
                                            type="text"
                                            placeholder="Coupon code"
                                            className="w-full pl-9 pr-4 py-2.5 bg-zinc-50 border border-zinc-100 rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        />
                                    </div>
                                    <button className="bg-primary/10 text-primary px-5 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-primary/20 transition-all">
                                        Apply
                                    </button>
                                </div>
                                <p className="mt-3 text-[10px] text-zinc-400 font-medium">Try: ESTORE10, BRIDAL20, FIRST15</p>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center text-[13px]">
                                    <span className="text-zinc-500 font-medium">Subtotal</span>
                                    <span className="text-[#1a1a1a] font-semibold">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between items-center text-[13px]">
                                    <span className="text-zinc-500 font-medium">GST (18%)</span>
                                    <span className="text-[#1a1a1a] font-semibold">{formatPrice(gst)}</span>
                                </div>
                                <div className="flex justify-between items-center text-[13px] pb-4">
                                    <div className="flex items-center gap-1.5 text-zinc-500 font-medium">
                                        <Truck className="w-3.5 h-3.5" />
                                        Shipping
                                    </div>
                                    <span className="text-green-600 font-semibold">Free</span>
                                </div>
                                <div className="pt-4 border-t border-zinc-100 flex justify-between items-center">
                                    <span className="text-sm md:text-base font-semibold text-[#1a1a1a]">Total</span>
                                    <span className="text-lg md:text-xl font-serif font-bold text-primary">{formatPrice(total)}</span>
                                </div>
                            </div>

                            <Link
                                href="/checkout"
                                className="w-full bg-primary py-3.5 rounded-xl text-white font-medium text-[13px] tracking-wide shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                            >
                                Proceed to Checkout
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
