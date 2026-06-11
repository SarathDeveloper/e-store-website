"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, ShoppingBag, User2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useUser } from "@/context/UserContext";
import { cn } from "@/lib/utils";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user } = useUser();

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },
    {
      label: "Wishlist",
      href: "/account/wishlist",
      icon: Heart,
      badge: wishlistItems.length,
    },
    {
      label: "Cart",
      href: "/cart",
      icon: ShoppingBag,
      badge: itemCount,
    },
    {
      label: "Profile",
      href: user ? "/account" : "/auth/login?role=customer",
      icon: User2,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-100 z-50 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] pb-safe">
      <nav className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className="relative flex flex-col items-center justify-center p-2 min-w-[64px]"
            >
              <div
                className={cn(
                  "relative flex items-center justify-center p-1.5 rounded-full transition-colors",
                  isActive ? "bg-primary/10 text-primary" : "text-zinc-500 hover:text-zinc-800"
                )}
              >
                <item.icon
                  className={cn("w-5 h-5", isActive && "fill-primary/20")}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -top-1 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                ) : null}
              </div>
              <span
                className={cn(
                  "mt-1 text-[10px] font-medium transition-colors",
                  isActive ? "text-primary font-semibold" : "text-zinc-500"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
