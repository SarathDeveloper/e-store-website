"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  User,
  ShoppingBag,
  MapPin,
  Heart,
  Bell,
  Award,
  Users,
  ShieldCheck,
  LifeBuoy,
  LogOut,
  ChevronRight
} from "lucide-react";
import Image from "next/image";

const sidebarLinks = [
  { name: "Overview", href: "/account", icon: LayoutDashboard },
  { name: "Profile Details", href: "/account/profile", icon: User },
  { name: "Orders", href: "/account/orders", icon: ShoppingBag },
  { name: "Addresses", href: "/account/addresses", icon: MapPin },
  { name: "Wishlist", href: "/account/wishlist", icon: Heart },
  { name: "Notifications", href: "/account/notifications", icon: Bell },
  { name: "Rewards", href: "/account/rewards", icon: Award },
  { name: "Referrals", href: "/account/referrals", icon: Users },
  { name: "Security", href: "/account/security", icon: ShieldCheck },
  { name: "Support", href: "/account/support", icon: LifeBuoy },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  const { user, logout } = useUser();

  if (!user) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* User Profile Summary */}
      <div className="bg-white p-6 rounded-3xl border border-zinc-100 flex items-center gap-4 shadow-sm">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border border-zinc-100 shrink-0">
          {user.avatar ? (
            <Image src={user.avatar} alt={user.name || "User"} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg md:text-xl">
              {user.name?.charAt(0) || "U"}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <h2 className="font-serif font-bold text-base md:text-lg text-[#1a1a1a]">{user.name || "Customer"}</h2>
          <p className="text-zinc-500 text-[13px]">{user.email || user.mobile}</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="bg-white p-4 rounded-3xl border border-zinc-100 flex flex-col gap-1 shadow-sm">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-2xl transition-all group",
                isActive 
                  ? "bg-primary/5 text-primary font-semibold" 
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-[#1a1a1a]"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-zinc-400 group-hover:text-zinc-600")} />
                <span className="text-xs md:text-sm">{link.name}</span>
              </div>
              <ChevronRight className={cn(
                "w-4 h-4 transition-transform", 
                isActive ? "text-primary opacity-100 translate-x-1" : "text-zinc-300 opacity-0 group-hover:opacity-100"
              )} />
            </Link>
          );
        })}

        <div className="h-px bg-zinc-100 my-2 mx-4" />

        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-all text-xs md:text-sm font-medium w-full text-left"
        >
          <LogOut className="w-5 h-5 opacity-70" />
          Log Out
        </button>
      </nav>
    </div>
  );
}
