"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
  { id: 1, name: "Ethnic Wear", image: "/images/boutique/home-hero-v2.png" },
  { id: 2, name: "Western Wear", image: "/images/boutique/home-hero-v2.png" },
  { id: 3, name: "Bottom Wear", image: "/images/boutique/home-hero-v2.png" },
  { id: 4, name: "Party Wear", image: "/images/boutique/home-hero-v2.png" },
  { id: 5, name: "Office Wear", image: "/images/boutique/home-hero-v2.png" },
  { id: 6, name: "Seasonal\nCollections", image: "/images/boutique/home-hero-v2.png" },
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
