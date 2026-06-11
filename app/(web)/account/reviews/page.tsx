"use client";

import { useEffect, useState } from "react";
import { Review, mockApi } from "@/lib/mock-account-api";
import { Star, MessageSquare, Edit2, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReviews(mockApi.getReviews());
  }, []);

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-sm md:text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">My Reviews</h1>
        <p className="text-zinc-500 mt-2">Manage your submitted product ratings and reviews.</p>
      </div>

      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-3xl border border-zinc-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Product Info */}
                <div className="flex gap-4 md:w-1/3 shrink-0">
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100 shrink-0">
                    <Image src={review.productImage} alt={review.productName} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a1a1a] text-xs md:text-sm line-clamp-2">{review.productName}</h3>
                    <Link href={`/products/${review.productId}`} className="text-[10px] md:text-xs text-primary hover:underline font-medium mt-1 inline-block">
                      View Product
                    </Link>
                  </div>
                </div>

                {/* Review Content */}
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={cn("w-4 h-4", star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-zinc-200 fill-zinc-200")} 
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-zinc-400 font-medium">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-xs md:text-sm text-zinc-700 leading-relaxed italic">&quot;{review.content}&quot;</p>
                  
                  <div className="flex items-center gap-4 mt-6 pt-4 border-t border-zinc-50">
                    <button className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-zinc-500 hover:text-primary transition-colors">
                      <Edit2 className="w-3.5 h-3.5" /> Edit Review
                    </button>
                    <button className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-zinc-500 hover:text-red-500 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-zinc-100 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="text-xs md:text-lg font-bold text-[#1a1a1a] mb-2">No reviews yet</h3>
            <p className="text-zinc-500 mb-6">Share your experience with products you&apos;ve purchased.</p>
            <Link href="/account/orders" className="flex items-center gap-2 text-primary font-bold hover:opacity-80 transition-opacity">
              Review Past Orders <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
