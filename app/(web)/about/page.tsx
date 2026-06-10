"use client";

import React from "react";
import Image from "next/image";
import Footer from "@/components/web/footer";
import { CheckCircle2, Heart, Star } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white font-sans overflow-x-hidden">
            <main className="w-full max-w-7xl mx-auto px-6 py-12 md:py-20 flex-1">
                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-2xl md:text-3xl md:text-5xl font-serif font-semibold text-[#1a1a1a] mb-6 tracking-tight">
                        Our Story
                    </h1>
                    <p className="text-zinc-500 text-sm md:text-base md:text-lg leading-relaxed">
                        We believe in crafting timeless elegance. Every piece we create is a celebration of artistry, premium fabrics, and impeccable tailoring designed just for you.
                    </p>
                </div>

                {/* Content Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-100 shadow-sm">
                        <Image
                            src="/images/boutique/home-hero-v2.png"
                            alt="Our boutique tailoring process"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-xl md:text-2xl md:text-3xl font-serif font-semibold text-[#1a1a1a] tracking-tight">
                            A Tradition of Excellence
                        </h2>
                        <p className="text-zinc-600 leading-relaxed">
                            Founded with a passion for high-quality fashion, our boutique started as a small local tailor shop. Over the years, we have grown into a beloved destination for both ethnic and western wear, keeping our core promise of unmatched quality and fit.
                        </p>
                        <p className="text-zinc-600 leading-relaxed">
                            Our team of master tailors and designers work tirelessly to bring you collections that blend traditional techniques with modern trends. We source only the finest fabrics and pay attention to the smallest details.
                        </p>
                        
                        <div className="pt-6 grid grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-2xl md:text-3xl font-black text-primary mb-1">10+</h4>
                                <p className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-500 font-bold">Years Experience</p>
                            </div>
                            <div>
                                <h4 className="text-2xl md:text-3xl font-black text-primary mb-1">5k+</h4>
                                <p className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-500 font-bold">Happy Clients</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="bg-zinc-50 rounded-3xl p-8 md:p-16 border border-zinc-100">
                    <div className="text-center mb-12">
                        <h2 className="text-xl md:text-2xl md:text-3xl font-serif font-semibold text-[#1a1a1a] tracking-tight mb-4">Our Core Values</h2>
                        <p className="text-zinc-500 max-w-2xl mx-auto">We are guided by principles that ensure every customer leaves our boutique feeling confident and beautiful.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow">
                            <Star className="w-8 h-8 text-primary mb-6" />
                            <h3 className="text-base md:text-lg font-bold text-[#1a1a1a] mb-3">Premium Quality</h3>
                            <p className="text-xs md:text-sm text-zinc-500 leading-relaxed">We never compromise on materials. From pure silks to breathable cottons, we select fabrics that look beautiful and last long.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow">
                            <CheckCircle2 className="w-8 h-8 text-primary mb-6" />
                            <h3 className="text-base md:text-lg font-bold text-[#1a1a1a] mb-3">Perfect Fit</h3>
                            <p className="text-xs md:text-sm text-zinc-500 leading-relaxed">Our master tailors ensure that every garment is tailored to perfection, offering a flattering silhouette for every body type.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow">
                            <Heart className="w-8 h-8 text-primary mb-6" />
                            <h3 className="text-base md:text-lg font-bold text-[#1a1a1a] mb-3">Customer First</h3>
                            <p className="text-xs md:text-sm text-zinc-500 leading-relaxed">Your satisfaction is our priority. We listen, adapt, and go the extra mile to provide a delightful shopping experience.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
