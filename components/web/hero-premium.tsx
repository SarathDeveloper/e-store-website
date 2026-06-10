"use client";

import { ShoppingBag, Scissors, Phone, MessageCircle, Star, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HeroPremium() {
    return (
        <section className="relative overflow-hidden bg-[#fbf9f6] py-10 md:py-16 lg:py-20 rounded-[3.5rem] shadow-[inset_0_-40px_100px_rgba(0,0,0,0.02)] border border-primary/5 mt-6">
            {/* Elegant Background Blobs */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/4" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#4a3a6b]/5 rounded-full blur-[100px] -z-10 -translate-x-1/4 translate-y-1/3" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left Content Area */}
                    <div className="flex-1 space-y-8 lg:max-w-2xl text-center lg:text-left">
                        {/* Eyebrow Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/15 shadow-sm">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4a3a6b]">Medavakkam&apos;s Premier Couture</span>
                        </div>

                        {/* Main Typography */}
                        <div className="space-y-6">
                            <h1 className="text-2xl md:text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-[#1a1a1a] leading-tight tracking-tight">
                                Premium Women&apos;s Tailoring <br />
                                <span className="relative">
                                    <span className="relative z-10 text-primary italic pr-4">Women&apos;s Tailoring Boutique</span>
                                    {/* Swash decorative underline */}
                                    <svg className="absolute w-full h-4 -bottom-1 left-0 text-primary/20 -z-10" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00032 6.55172C41.5235 2.11207 101.956 -2.32759 198.001 6.55172" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </span>
                            </h1>
                            <p className="text-xs md:text-sm md:text-base text-zinc-500 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                                15+ years of tradition meets modern design. From intricate bridal Aari work to daily-wear elegance, with convenient doorstep pickup.
                            </p>
                        </div>

                        {/* Action Buttons (The 4 requested CTAs) */}
                        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                            {/* Primary Services Group */}
                            <div className="flex gap-3 w-full sm:w-auto">
                                <Link
                                    href="/services"
                                    className="flex-1 sm:flex-none bg-primary text-white px-6 py-3 rounded-2xl font-medium text-xs md:text-sm transition-all group active:scale-95 flex items-center justify-center gap-2 shadow-[0_8px_30px_rgb(228,64,95,0.25)] hover:shadow-[0_8px_30px_rgb(228,64,95,0.4)] hover:-translate-y-0.5"
                                >
                                    <Scissors className="w-4 h-4" />
                                    Explore Services
                                </Link>

                                <Link
                                    href="/shop"
                                    className="flex-1 sm:flex-none bg-white text-[#4a3a6b] border border-[#4a3a6b]/20 px-6 py-3 rounded-2xl font-medium text-xs md:text-sm transition-all group active:scale-95 flex items-center justify-center gap-2 hover:border-primary hover:text-primary hover:-translate-y-0.5 shadow-sm"
                                >
                                    <ShoppingBag className="w-4 h-4" />
                                    Shop Sarees
                                </Link>
                            </div>

                            {/* Contact Group */}
                            <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 sm:pl-4 sm:border-l border-zinc-200">
                                <a
                                    href="tel:+919876543210"
                                    className="flex items-center gap-2 text-[#4a3a6b] hover:text-primary transition-colors bg-white hover:bg-zinc-50 px-4 py-2.5 rounded-xl border border-zinc-200 shadow-sm font-medium text-[13px] active:scale-95"
                                >
                                    <Phone className="w-4 h-4" />
                                    Call Us
                                </a>
                                <a
                                    href="https://wa.me/919876543210"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-[#25D366] hover:text-[#1ebd5b] transition-colors bg-white hover:bg-[#25D366]/5 px-4 py-2.5 rounded-xl border border-zinc-200 shadow-sm font-medium text-[13px] active:scale-95"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-col lg:flex-row lg:items-center gap-x-8 gap-y-4 pt-6">
                            <div className="flex items-center gap-3 text-[14px] font-medium text-zinc-700">
                                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                                </div>
                                Doorstep Pickup
                            </div>
                            <div className="flex items-center gap-3 text-[14px] font-medium text-zinc-700">
                                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                                </div>
                                Expert Bridal Artisans
                            </div>
                            <div className="flex items-center gap-3 text-[14px] font-medium text-zinc-700">
                                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                                </div>
                                Fast Delivery
                            </div>
                        </div>
                    </div>

                    {/* Right Visual Area */}
                    <div className="flex-1 w-full max-w-lg lg:max-w-none relative mt-8 lg:mt-0">
                        {/* Main Image Frame - Custom clean landscape shape */}
                        <div className="relative aspect-4/3 w-full rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] bg-zinc-100 z-10 group ring-4 ring-white">
                            <Image
                                src="/images/boutique/home-hero-v2.png"
                                alt="Premium Saree Boutique"
                                fill
                                className="object-cover object-center transition-transform duration-10000 ease-out group-hover:scale-105"
                                priority
                            />

                            {/* Inner gradient overlay for depth */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-60" />
                        </div>

                        {/* Abstract Background Shapes */}
                        <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl border border-[#4a3a6b]/20 bg-white -z-10 rotate-3 transition-transform group-hover:rotate-6 duration-700" />
                        <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-primary/20 rounded-full blur-[60px] -z-10" />

                        {/* Floating Experience Badge */}
                        <div className="absolute -bottom-6 -left-6 lg:-left-10 bg-white p-4 lg:p-5 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-zinc-100 z-20 flex items-center gap-4">
                            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-[#4a3a6b]/5 rounded-2xl flex items-center justify-center">
                                <Star className="w-6 h-6 lg:w-7 lg:h-7 text-[#4a3a6b] fill-[#4a3a6b]" />
                            </div>
                            <div>
                                <p className="text-base md:text-lg lg:text-xl font-bold font-serif text-[#1a1a1a] leading-none">15+</p>
                                <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-zinc-400 mt-1">Years Auth. Quality</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
