"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import Link from "next/link";

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=800&auto=format&fit=crop", span: "md:col-span-2 md:row-span-2" },
  { id: 2, src: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop", span: "md:col-span-1 md:row-span-1" },
  { id: 3, src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop", span: "md:col-span-1 md:row-span-1" },
  { id: 4, src: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?q=80&w=800&auto=format&fit=crop", span: "md:col-span-1 md:row-span-1" },
  { id: 5, src: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=800&auto=format&fit=crop", span: "md:col-span-1 md:row-span-1" },
];

export default function InstagramGallery() {
  return (
    <section className="py-16 bg-white">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-lg md:text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight mb-3">Follow Us on Instagram</h2>
        <p className="text-zinc-500 mb-6">Tag @estore to be featured in our gallery.</p>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <Instagram className="w-4 h-4" />
          @estore
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 px-2 md:px-0">
        {galleryImages.map((img) => (
          <div key={img.id} className={`relative group overflow-hidden rounded-xl bg-zinc-100 aspect-square ${img.span.includes('row-span-2') ? 'md:aspect-auto' : ''} ${img.span}`}>
            <Image
              src={img.src}
              alt="Instagram Gallery Image"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
            </div>
            <Link href="https://instagram.com" target="_blank" className="absolute inset-0 z-10">
              <span className="sr-only">View on Instagram</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
