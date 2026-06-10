"use client";

import React, { useState } from "react";
import Footer from "@/components/web/footer";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            alert("Thank you for your message! We will get back to you soon.");
        }, 1500);
    };

    return (
        <div className="flex flex-col min-h-screen bg-white font-sans overflow-x-hidden">
            <main className="w-full max-w-7xl mx-auto px-6 py-12 md:py-20 flex-1">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-2xl md:text-3xl md:text-5xl font-serif font-semibold text-[#1a1a1a] mb-6 tracking-tight">
                        Get in Touch
                    </h1>
                    <p className="text-zinc-500 text-sm md:text-base md:text-lg leading-relaxed">
                        Have a question about a custom order, sizing, or our latest collection? We'd love to hear from you. Drop us a message and our team will be happy to assist.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Contact Information */}
                    <div className="space-y-10">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-8">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xs md:text-sm uppercase tracking-widest text-[#1a1a1a] mb-1">Our Store</h4>
                                        <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                                            123 Fashion Avenue<br />
                                            Banjara Hills, Hyderabad<br />
                                            Telangana 500034
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xs md:text-sm uppercase tracking-widest text-[#1a1a1a] mb-1">Call Us</h4>
                                        <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                                            +91 98765 43210<br />
                                            Mon-Fri, 9am to 6pm
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xs md:text-sm uppercase tracking-widest text-[#1a1a1a] mb-1">Email</h4>
                                        <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                                            hello@boutique-store.com<br />
                                            support@boutique-store.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                        <Clock className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xs md:text-sm uppercase tracking-widest text-[#1a1a1a] mb-1">Opening Hours</h4>
                                        <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                                            Monday - Saturday: 10:00 AM - 8:00 PM<br />
                                            Sunday: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-zinc-50 p-8 md:p-10 rounded-3xl border border-zinc-100 shadow-sm">
                        <h2 className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-8">Send a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">First Name</label>
                                    <input 
                                        type="text" 
                                        id="firstName"
                                        required
                                        className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                        placeholder="Jane"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">Last Name</label>
                                    <input 
                                        type="text" 
                                        id="lastName"
                                        required
                                        className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">Email Address</label>
                                <input 
                                    type="email" 
                                    id="email"
                                    required
                                    className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    placeholder="jane@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">Subject</label>
                                <input 
                                    type="text" 
                                    id="subject"
                                    required
                                    className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">Message</label>
                                <textarea 
                                    id="message"
                                    required
                                    rows={5}
                                    className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                    placeholder="Write your message here..."
                                ></textarea>
                            </div>

                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className={cn(
                                    "w-full bg-[#1a1a1a] text-white font-bold text-xs md:text-sm py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary transition-colors",
                                    isSubmitting && "opacity-70 cursor-not-allowed"
                                )}
                            >
                                {isSubmitting ? "Sending..." : (
                                    <>
                                        Send Message
                                        <Send className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
