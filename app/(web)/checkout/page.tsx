"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import {
    ChevronRight,
    Home,
    Briefcase,
    CreditCard,
    Smartphone,
    Wallet,
    ShieldCheck,
    Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/web/footer";
import { MobileInput } from "@/components/web/mobile-input";

export default function CheckoutPage() {
    const { subtotal, gst, total, cartItems } = useCart();
    const router = useRouter();
    const [addressType, setAddressType] = useState<"home" | "office">("home");
    const [paymentMethod, setPaymentMethod] = useState<string>("upi");
    const [mobile, setMobile] = useState("");
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [error, setError] = useState("");

    const handlePay = () => {
        if (!fullName.trim() || !mobile.trim() || !address.trim() || !city.trim() || !pincode.trim()) {
            setError("Please fill in all delivery address fields before paying.");
            return;
        }
        setError("");
        router.push("/checkout/success");
    };

    const formatPrice = (amount: number) => `₹${amount.toLocaleString()}`;

    const steps = [
        { id: "cart", label: "Cart", completed: true },
        { id: "checkout", label: "Checkout", active: true },
        { id: "success", label: "Success" }
    ];

    return (
        <div className="min-h-screen bg-zinc-50 font-sans">
            <main className="max-w-7xl mx-auto px-6 py-10">
                {/* Progress Stepper */}
                <div className="flex items-center justify-center gap-4 mb-10">
                    {steps.map((step, i) => (
                        <React.Fragment key={step.id}>
                            <div className="flex items-center gap-2">
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold",
                                    step.active ? "bg-primary text-white" :
                                        step.completed ? "bg-green-500 text-white" : "bg-zinc-200 text-zinc-500"
                                )}>
                                    {step.completed ? "✓" : i + 1}
                                </div>
                                <span className={cn(
                                    "text-xs md:text-sm font-bold uppercase tracking-widest",
                                    step.active ? "text-[#1a1a1a]" : "text-zinc-400"
                                )}>
                                    {step.label}
                                </span>
                            </div>
                            {i < steps.length - 1 && (
                                <div className="w-12 h-[2px] bg-zinc-200" />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Address Section */}
                        <section className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-[18px] font-semibold text-[#1a1a1a]">Delivery Address</h2>
                                <div className="flex bg-zinc-50 p-1 rounded-xl border border-zinc-100">
                                    <button
                                        onClick={() => setAddressType("home")}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] md:text-xs font-bold transition-all",
                                            addressType === "home" ? "bg-white shadow-sm text-primary" : "text-zinc-400 hover:text-zinc-600"
                                        )}
                                    >
                                        <Home className="w-3.5 h-3.5" />
                                        Home
                                    </button>
                                    <button
                                        onClick={() => setAddressType("office")}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] md:text-xs font-bold transition-all",
                                            addressType === "office" ? "bg-white shadow-sm text-primary" : "text-zinc-400 hover:text-zinc-600"
                                        )}
                                    >
                                        <Briefcase className="w-3.5 h-3.5" />
                                        Office
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full Name" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl text-[13px] focus:ring-2 focus:ring-primary/20 outline-none" />
                                <MobileInput 
                                    value={mobile} 
                                    onChange={setMobile} 
                                    className="w-full pl-[4.5rem] pr-4 h-11 bg-zinc-50 border border-zinc-100 rounded-xl text-[13px] focus:ring-2 focus:ring-primary/20 outline-none" 
                                />
                                <div className="md:col-span-2">
                                    <textarea value={address} onChange={e => setAddress(e.target.value)} placeholder="Complete Address" rows={3} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl text-[13px] focus:ring-2 focus:ring-primary/20 outline-none resize-none" />
                                </div>
                                <input value={city} onChange={e => setCity(e.target.value)} placeholder="City" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl text-[13px] focus:ring-2 focus:ring-primary/20 outline-none" />
                                <input value={pincode} onChange={e => setPincode(e.target.value)} placeholder="Pincode" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl text-[13px] focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>
                        </section>

                        {/* Payment Section */}
                        <section className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
                            <h2 className="text-[18px] font-semibold text-[#1a1a1a] mb-6">Payment Method</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { id: "upi", label: "UPI / PhonePe", icon: Smartphone },
                                    { id: "card", label: "Credit / Debit Card", icon: CreditCard },
                                    { id: "net", label: "Net Banking", icon: Wallet },
                                ].map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => setPaymentMethod(method.id)}
                                        className={cn(
                                            "flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all active:scale-[0.98]",
                                            paymentMethod === method.id ?
                                                "border-primary bg-primary/[0.02] text-primary" :
                                                "border-zinc-100 bg-zinc-50 text-zinc-400 hover:border-zinc-200"
                                        )}
                                    >
                                        <method.icon className={cn("w-6 h-6", paymentMethod === method.id ? "text-primary" : "text-zinc-300")} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{method.label}</span>
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1 border-t border-zinc-100 pt-8 lg:pt-0 lg:border-t-0">
                        <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-xl shadow-zinc-200/40 sticky top-24">
                            <h2 className="text-[18px] font-semibold text-[#1a1a1a] mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-8">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex justify-between text-[13px]">
                                        <span className="text-zinc-500">{item.title} <span className="text-zinc-300">x{item.quantity}</span></span>
                                        <span className="font-semibold text-[#1a1a1a]">{item.price}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-6 border-t border-zinc-100 mb-8">
                                <div className="flex justify-between items-center text-xs md:text-sm">
                                    <span className="text-zinc-500 font-medium">Subtotal</span>
                                    <span className="text-[#1a1a1a] font-bold">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs md:text-sm">
                                    <span className="text-zinc-500 font-medium flex items-center gap-1">
                                        GST (18%)
                                        <Info className="w-3 h-3 text-zinc-300" />
                                    </span>
                                    <span className="text-[#1a1a1a] font-bold">{formatPrice(gst)}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs md:text-sm">
                                    <span className="text-zinc-500 font-medium">Shipping</span>
                                    <span className="text-green-500 font-bold uppercase tracking-widest text-[10px]">Free</span>
                                </div>
                                <div className="pt-6 border-t border-dashed border-zinc-200 flex justify-between items-end">
                                    <div>
                                        <span className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-1">Total Payable</span>
                                        <span className="text-xl md:text-2xl font-serif font-bold text-primary leading-none">{formatPrice(total)}</span>
                                    </div>
                                    <ShieldCheck className="w-6 h-6 text-green-500/30" />
                                </div>
                            </div>

                            {error && <p className="text-red-500 text-[11px] font-medium text-center mb-3 bg-red-50 p-2 rounded-lg">{error}</p>}
                            <button onClick={handlePay} className="w-full bg-primary py-3.5 rounded-xl text-white font-medium text-[13px] tracking-widest uppercase shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                                Pay Now
                                <ChevronRight className="w-4 h-4" />
                            </button>

                            <div className="mt-6 flex flex-col items-center gap-3 text-center">
                                <p className="text-[10px] text-zinc-400 font-medium leading-relaxed">
                                    Your personal data will be used to process your order and for other purposes described in our privacy policy.
                                </p>
                                <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-300 uppercase tracking-widest">
                                    <ShieldCheck className="w-3 h-3" />
                                    Secure SSL Encryption
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
