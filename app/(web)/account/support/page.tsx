"use client";

import { MessageSquare, Phone, Mail, HelpCircle, ChevronRight, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const faqs = [
  { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days." },
  { q: "Can I return a custom stitched item?", a: "Custom stitched items are non-returnable unless there is a defect or measurement error on our part." },
  { q: "How do I track my order?", a: "You can track your order in the Orders section of your account or via the tracking link sent to your email/SMS." },
];

export default function SupportPage() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent to support! We will get back to you shortly.");
    setMessage("");
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-lg md:text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">Customer Support</h1>
        <p className="text-zinc-500 mt-2">Need help? We&apos;re here for you 24/7.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm text-center flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <Phone className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="font-bold text-[#1a1a1a]">Call Us</h3>
          <p className="text-xs md:text-sm text-zinc-500 mt-1 mb-3">Mon-Sat, 9AM-8PM</p>
          <a href="tel:+919876543210" className="font-bold text-primary hover:underline">+91 98765 43210</a>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm text-center flex flex-col items-center">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="font-bold text-[#1a1a1a]">Email Us</h3>
          <p className="text-xs md:text-sm text-zinc-500 mt-1 mb-3">We reply within 24 hours</p>
          <a href="mailto:support@estore.com" className="font-bold text-primary hover:underline">support@estore.com</a>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm text-center flex flex-col items-center relative overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <MessageSquare className="w-5 h-5 text-purple-500" />
          </div>
          <h3 className="font-bold text-[#1a1a1a]">Live Chat</h3>
          <p className="text-xs md:text-sm text-zinc-500 mt-1 mb-3">Instant support</p>
          <span className="font-bold text-primary text-xs md:text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Start Chat <ChevronRight className="w-4 h-4" /></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-100 shadow-sm">
          <h2 className="text-base md:text-lg font-serif font-bold text-[#1a1a1a] mb-6 flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" /> Send a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-wider">Subject</label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-xs md:text-sm bg-white">
                <option>Order Inquiry</option>
                <option>Returns & Exchanges</option>
                <option>Product Information</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-wider">Message</label>
              <textarea 
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5} 
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-xs md:text-sm resize-none"
                placeholder="How can we help you?"
              />
            </div>
            <button type="submit" className="w-full py-3 bg-[#1a1a1a] text-white rounded-xl font-semibold shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2 text-xs md:text-sm">
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        </div>

        {/* FAQs */}
        <div className="bg-zinc-50 p-6 md:p-8 rounded-3xl border border-zinc-100">
          <h2 className="text-base md:text-lg font-serif font-bold text-[#1a1a1a] mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" /> Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-zinc-100">
                <h3 className="font-bold text-[#1a1a1a] text-xs md:text-sm mb-2">{faq.q}</h3>
                <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/faq" className="text-primary font-bold text-xs md:text-sm hover:underline">View All FAQs</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
