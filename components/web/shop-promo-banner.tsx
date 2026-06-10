import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function ShopPromoBanner() {
    return (
        <div className="w-full bg-[#f8e5e5] rounded-2xl overflow-hidden relative mb-8 border border-[#feeded]">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-full bg-linear-to-l from-white/40 to-transparent pointer-events-none"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="px-4 md:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-sm md:text-base md:text-lg font-serif font-semibold text-[#1a1a1a] leading-tight">
                            Exclusive Women's Fashion Sale
                        </h3>
                        <p className="text-zinc-600 text-[13px] md:text-sm mt-0.5">
                            Get up to <span className="font-bold text-primary">20% Off</span> on Premium Collections & Fast Delivery.
                        </p>
                    </div>
                </div>

                <Link
                    href="/shop?category=seasonal-collections"
                    className="shrink-0 bg-primary text-white text-[10px] md:text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-full hover:bg-primary/90 transition-colors shadow-md shadow-primary/20 flex items-center gap-2 group"
                >
                    Shop Offer <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}
