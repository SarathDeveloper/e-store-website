"use client";

import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const reviewsRow1 = [
  {
    id: 1,
    name: "Emily R.",
    role: "Regular Customer",
    content: "Fast delivery and fantastic quality! The customer support team was quick to resolve my query. The boutique has earned a loyal customer.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "John D",
    role: "Verified Buyer",
    content: "Beautiful elegant designs and excellent customer service. I bought a party wear dress and it exceeded my expectations in every way.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop",
    highlighted: true
  },
  {
    id: 3,
    name: "Ahmed M.",
    role: "Verified Buyer",
    content: "Their western wear collection is so chic. The material is premium and comfortable for all-day office wear. My new go-to boutique.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Priya Sharma",
    role: "Bride-to-be",
    content: "The ethnic wear is stunning. Perfect fitting and elegant designs. They really know how to make a woman feel special with their collections.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Sarah L.",
    role: "Verified Buyer",
    content: "Absolutely love the craftsmanship. Every detail is perfect. I will definitely be shopping here again for my next big event.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  }
];

const reviewsRow2 = [
  {
    id: 6,
    name: "Alex T",
    role: "Regular Customer",
    content: "Fast delivery and fantastic quality! The customer support team was quick to resolve my query. They have earned a loyal customer.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "David H",
    role: "Verified Buyer",
    content: "Beautiful elegant designs and excellent customer service. I bought a party wear dress and it exceeded my expectations in every way.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Meera Reddy",
    role: "Verified Buyer",
    content: "Their western wear collection is so chic. The material is premium and comfortable for all-day office wear. My new go-to boutique.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 9,
    name: "Divya K.",
    role: "Bride-to-be",
    content: "The ethnic wear is stunning. Perfect fitting and elegant designs. They really know how to make a woman feel special with their collections.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 10,
    name: "Jessica W.",
    role: "Verified Buyer",
    content: "Incredible attention to detail. The dress fit me perfectly and the fabric feels so luxurious. Highly recommend to anyone looking for quality.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=150&auto=format&fit=crop"
  }
];

const ReviewCard = ({ review }: { review: any }) => (
  <div className={`p-6 rounded-2xl w-[85vw] sm:w-[350px] md:w-[400px] shrink-0 flex flex-col justify-between transition-colors duration-300 ${review.highlighted ? "bg-primary/10 border border-primary/20" : "bg-white border border-zinc-100 shadow-sm"}`}>
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-zinc-200">
          <Image src={review.image} alt={review.name} fill className="object-cover" />
        </div>
        <h4 className="font-semibold text-zinc-900">{review.name}</h4>
        <div className="flex ml-auto gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${i < review.rating ? "fill-[#eab308] text-[#eab308]" : "fill-zinc-200 text-zinc-200"}`} 
            />
          ))}
        </div>
      </div>
      <p className="text-zinc-600 text-xs md:text-sm leading-relaxed">
        &quot;{review.content}&quot;
      </p>
    </div>
  </div>
);

export default function CustomerReviews() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 60s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 60s linear infinite;
        }
        .hover-pause:hover .animate-marquee-left,
        .hover-pause:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `}</style>

      <div className="text-center max-w-3xl mx-auto mb-16 px-4">
        <h2 className="text-2xl md:text-3xl md:text-4xl font-bold text-primary tracking-tight mb-4">Our Happy Customers</h2>
        <p className="text-zinc-600 text-base md:text-lg">
          Don&apos;t just take our word for it - see how our products and services have delighted customers across the globe, one experience at a time.
        </p>
      </div>

      <div className="flex flex-col gap-6 overflow-hidden hover-pause group">
        {/* Row 1 - Moving Left */}
        <div className="flex w-fit">
          <div className="flex shrink-0 animate-marquee-left gap-6 pr-6">
            {reviewsRow1.map((review) => (
              <ReviewCard key={`r1-1-${review.id}`} review={review} />
            ))}
          </div>
          <div className="flex shrink-0 animate-marquee-left gap-6 pr-6" aria-hidden="true">
            {reviewsRow1.map((review) => (
              <ReviewCard key={`r1-2-${review.id}`} review={review} />
            ))}
          </div>
        </div>

        {/* Row 2 - Moving Right */}
        <div className="flex w-fit">
          <div className="flex shrink-0 animate-marquee-right gap-6 pr-6">
            {reviewsRow2.map((review) => (
              <ReviewCard key={`r2-1-${review.id}`} review={review} />
            ))}
          </div>
          <div className="flex shrink-0 animate-marquee-right gap-6 pr-6" aria-hidden="true">
            {reviewsRow2.map((review) => (
              <ReviewCard key={`r2-2-${review.id}`} review={review} />
            ))}
          </div>
        </div>
      </div>


    </section>
  );
}

