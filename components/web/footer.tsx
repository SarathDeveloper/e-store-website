"use client";

import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#3d256a] text-white py-10 px-5 md:px-12 rounded-t-3xl mt-12">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <h2 className="text-lg md:text-xl font-semibold mb-4">E-Store</h2>
                        <p className="text-zinc-300 text-xs md:text-sm leading-relaxed">
                            Your premium destination for custom clothing and fashion online. Browse our exclusive collection and get the perfect fit delivered to your door.
                        </p>
                    </div>
                    {/* Shop Links */}
                    <div>
                        <h3 className="text-sm md:text-base font-semibold mb-4">Shop Categories</h3>
                        <ul className="space-y-2.5 text-zinc-300 text-xs md:text-sm">
                            <li><a href="/shop?category=ethnic-wear" className="hover:text-white transition-colors">Ethnic Wear</a></li>
                            <li><a href="/shop?category=western-wear" className="hover:text-white transition-colors">Western Wear</a></li>
                            <li><a href="/shop?category=bottom-wear" className="hover:text-white transition-colors">Bottom Wear</a></li>
                            <li><a href="/shop?category=party-wear" className="hover:text-white transition-colors">Party Wear</a></li>
                            <li><a href="/shop?category=office-wear" className="hover:text-white transition-colors">Office Wear</a></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-sm md:text-base font-semibold mb-4">Support</h3>
                        <ul className="space-y-2.5 text-zinc-300 text-xs md:text-sm">
                            <li><Link href="/account/orders" className="hover:text-white transition-colors">Track Orders</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">FAQs</Link></li>
                            <li><Link href="/account/rewards" className="hover:text-white transition-colors">Rewards</Link></li>
                            <li><Link href="/account/reviews" className="hover:text-white transition-colors">Reviews</Link></li>
                        </ul>
                    </div>

                    {/* Terms & Policies */}
                    <div>
                        <h3 className="text-sm md:text-base font-semibold mb-4">Terms & Policies</h3>
                        <ul className="space-y-2.5 text-zinc-300 text-xs md:text-sm">
                            <li><Link href="/policy/refund" className="hover:text-white transition-colors">Refund Policy</Link></li>
                            <li><Link href="/policy/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
                            <li><Link href="/policy/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
                            <li><Link href="/policy/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Get in Touch */}
                    <div>
                        <h3 className="text-sm md:text-base font-semibold mb-4">Get in Touch</h3>
                        <ul className="space-y-2.5 text-zinc-300 text-xs md:text-sm">
                            <li className="flex items-center gap-2">
                                <div className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 shrink-0">
                                    <Phone className="w-3.5 h-3.5" />
                                </div>
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 shrink-0">
                                    <Mail className="w-3.5 h-3.5" />
                                </div>
                                <span>hello@e-store.com</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 shrink-0 mt-0.5">
                                    <MapPin className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-xs md:text-sm">123 Tailoring Lane, K.K. Nagar, Chennai, Tamil Nadu.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex gap-3">
                        <Link href="https://instagram.com" target="_blank" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-colors">
                            <Instagram className="w-4 h-4" />
                        </Link>
                        <Link href="https://facebook.com" target="_blank" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-colors">
                            <Facebook className="w-4 h-4" />
                        </Link>
                        <Link href="https://twitter.com" target="_blank" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-colors">
                            <Twitter className="w-4 h-4" />
                        </Link>
                        <Link href="https://linkedin.com" target="_blank" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-colors">
                            <Linkedin className="w-4 h-4" />
                        </Link>
                    </div>

                    <p className="text-zinc-400 text-[11px]">
                        © 2026 E-Store. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
