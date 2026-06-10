"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, ChevronRight, Download, Package } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/web/footer";
import { useCart } from "@/context/CartContext";

export default function CheckoutSuccessPage() {
    const { clearCart } = useCart();
    const [orderId, setOrderId] = useState("");

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setOrderId(`ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
        
        // Clear cart on success
        clearCart();
    }, [clearCart]);

    const steps = [
        { id: "cart", label: "Cart", completed: true },
        { id: "checkout", label: "Checkout", completed: true },
        { id: "success", label: "Success", active: true }
    ];

    return (
        <div className="min-h-screen bg-zinc-50 font-sans">
            <main className="max-w-7xl mx-auto px-6 py-10">
                {/* Progress Stepper */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    {steps.map((step, i) => (
                        <React.Fragment key={step.id}>
                            <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold ${step.active ? "bg-primary text-white" : step.completed ? "bg-green-500 text-white" : "bg-zinc-200 text-zinc-500"}`}>
                                    {step.completed && !step.active ? "✓" : i + 1}
                                </div>
                                <span className={`text-xs md:text-sm font-bold uppercase tracking-widest ${step.active ? "text-[#1a1a1a]" : "text-zinc-400"}`}>
                                    {step.label}
                                </span>
                            </div>
                            {i < steps.length - 1 && (
                                <div className="w-12 h-[2px] bg-zinc-200" />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <div className="max-w-2xl mx-auto text-center space-y-8">
                    <div className="bg-white p-12 rounded-[3rem] border border-zinc-100 shadow-xl shadow-zinc-200/40">
                        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-12 h-12 text-green-500" />
                        </div>
                        <h1 className="text-xl md:text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-4">Payment Successful!</h1>
                        <p className="text-zinc-500 mb-8 max-w-md mx-auto">
                            Thank you for your order. We have sent a confirmation email with your order details and tracking information.
                        </p>

                        <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100 mb-8 max-w-sm mx-auto flex flex-col gap-3 text-left">
                            <div className="flex justify-between text-xs md:text-sm">
                                <span className="text-zinc-500 font-medium">Order ID</span>
                                <span className="font-bold text-[#1a1a1a]">{orderId}</span>
                            </div>
                            <div className="flex justify-between text-xs md:text-sm">
                                <span className="text-zinc-500 font-medium">Date</span>
                                <span className="font-bold text-[#1a1a1a]">{new Date().toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between text-xs md:text-sm">
                                <span className="text-zinc-500 font-medium">Status</span>
                                <span className="font-bold text-primary">Processing</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/shop"
                                className="w-full sm:w-auto bg-primary px-8 py-3.5 rounded-xl text-white font-medium tracking-wide shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                            >
                                Continue Shopping
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                            <button
                                className="w-full sm:w-auto bg-white px-8 py-3.5 rounded-xl text-[#1a1a1a] border border-zinc-200 font-medium tracking-wide hover:bg-zinc-50 transition-all flex items-center justify-center gap-2"
                            >
                                <Download className="w-4 h-4" />
                                Download Invoice
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-zinc-400 text-xs md:text-sm">
                        <Package className="w-4 h-4" />
                        <span>You will receive tracking details within 24 hours.</span>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
