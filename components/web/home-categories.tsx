"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
  { id: 1, name: "Ethnic Wear", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop" },
  { id: 2, name: "Western Wear", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop" },
  { id: 3, name: "Bottom Wear", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop" },
  { id: 4, name: "Party Wear", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop" },
  { id: 5, name: "Office Wear", image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=600&auto=format&fit=crop" },
  { id: 6, name: "Seasonal\nCollections", image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=600&auto=format&fit=crop" },
];

export default function HomeCategories() {
  return (
    <section className="py-12 bg-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1 block">Featured</span>
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 tracking-tight">Explore our Collection</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {categories.map((category) => (
          <Link 
            key={category.id} 
            href={`/shop?category=${category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} 
            className="group block text-center"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-white border border-zinc-100 shadow-sm hover:shadow-md transition-all">
              <Image
                src={category.image}
                alt={category.name.replace('\n', ' ')}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out p-1 rounded-2xl"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 rounded-2xl" />
            </div>
            <h3 className="text-sm md:text-base font-bold text-zinc-900 leading-tight group-hover:text-primary transition-colors">
              {category.name.replace('\n', ' ')}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
