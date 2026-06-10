"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { buttonVariants } from "../ui/button";
import { Menu, X, Store, ShoppingBag, User2, LogOut, Settings, History, Search, Heart, MapPin, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, logout } = useUser();
  const { items: wishlistItems } = useWishlist();
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationName, setLocationName] = useState("Your address");
  const [isLocating, setIsLocating] = useState(false);

  const fetchLocation = () => {
    if ("geolocation" in navigator) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await res.json();
            
            const city = data.address.city || data.address.town || data.address.village || data.address.suburb || data.address.state_district || "Unknown Location";
            setLocationName(city);
          } catch (error) {
            console.error("Error fetching location details:", error);
            setLocationName("Location unavailable");
          } finally {
            setIsLocating(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationName("Location access denied");
          setIsLocating(false);
        }
      );
    } else {
      setLocationName("Not supported");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
    }
  };

  const mainLinks = [
    { label: "Home", href: "/" },
    { label: "Product", href: "/shop" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const categoryLinks = [
    { label: "Ethnic Wear", href: "/shop?category=Ethnic Wear" },
    { label: "Western Wear", href: "/shop?category=Western Wear" },
    { label: "Party Wear", href: "/shop?category=Party Wear" },
    { label: "Office Wear", href: "/shop?category=Office Wear" },
    { label: "Bottom Wear", href: "/shop?category=Bottom Wear" },
    { label: "Seasonal Collections", href: "/shop?category=Seasonal Collections" },
    { label: "Custom Tailoring", href: "/about" },
    { label: "Bridal Aari Work", href: "/about" },
    { label: "See more", href: "/shop", highlight: true },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="w-full flex flex-col z-50 sticky top-0 bg-white shadow-xs">
      
      {/* --- TIER 1: Top Bar --- */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4 lg:gap-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="bg-primary/10 text-primary p-1.5 rounded-sm">
            <Store className="w-6 h-6" />
          </div>
          <h1 className="text-xl md:text-2xl font-black tracking-tighter text-primary uppercase">
            E-Store
          </h1>
        </Link>

        {/* Location (Desktop Only) */}
        <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
          <button 
            onClick={fetchLocation}
            className="flex items-center gap-2 text-left hover:bg-zinc-50 p-1.5 rounded-md transition-colors"
          >
            <MapPin className={cn("w-5 h-5", isLocating ? "animate-bounce text-primary" : "text-zinc-700")} />
            <div className="flex flex-col max-w-[120px]">
              <span className="text-[10px] text-zinc-500 leading-none">Deliver to</span>
              <span className="text-[10px] md:text-xs font-bold leading-tight truncate">{isLocating ? "Locating..." : locationName}</span>
            </div>
          </button>
        </div>

        {/* Search Bar (Expanded) */}
        <div className="flex-1 max-w-2xl hidden md:flex">
          <form onSubmit={handleSearch} className="relative w-full flex items-center">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What you're looking for" 
              className="w-full bg-primary/5 text-xs md:text-sm px-6 py-3 rounded-full border border-transparent focus:outline-none focus:border-primary/20 transition-colors placeholder:text-zinc-500"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-zinc-800 hover:bg-zinc-100 border border-zinc-200 px-4 py-1.5 rounded-full flex items-center gap-2 text-xs md:text-sm font-semibold transition-colors shadow-sm">
              <Search className="w-4 h-4" />
              Search
            </button>
          </form>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3 lg:gap-6 flex-shrink-0">
          
          {/* User Profile */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 p-2 rounded-lg text-zinc-800 hover:text-primary hover:bg-zinc-50 transition-all cursor-pointer outline-none">
                <User2 className="w-5 h-5" />
                <span className="hidden lg:inline-block text-xs md:text-sm font-semibold truncate max-w-[80px]">Profile</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 rounded-2xl shadow-xl border-zinc-100">
                <DropdownMenuLabel className="flex flex-col gap-0.5 py-3">
                  <span className="text-xs md:text-sm font-semibold">My Account</span>
                  <span className="text-[10px] text-muted-foreground font-normal">{user.mobile}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="gap-2 cursor-pointer rounded-xl">
                  <Link href="/account"><User2 className="w-4 h-4 opacity-50" /> Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="gap-2 cursor-pointer rounded-xl">
                  <Link href="/account/orders"><History className="w-4 h-4 opacity-50" /> Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="gap-2 cursor-pointer rounded-xl">
                  <Link href="/account/profile"><Settings className="w-4 h-4 opacity-50" /> Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => logout()}
                  className="gap-2 cursor-pointer rounded-xl text-red-500 focus:text-red-500 focus:bg-red-50"
                >
                  <LogOut className="w-4 h-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 p-2 rounded-lg text-zinc-800 hover:text-primary hover:bg-zinc-50 transition-all cursor-pointer outline-none">
                <User2 className="w-5 h-5" />
                <span className="hidden lg:inline-block text-xs md:text-sm font-semibold">Sign In</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 mt-2 rounded-2xl shadow-xl border-zinc-100 p-1.5">
                <DropdownMenuItem asChild>
                  <Link href="/auth/login?role=customer" className="w-full cursor-pointer rounded-xl py-2 font-medium">
                    Login / Sign Up
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Wishlist (Mobile only, or keep if preferred) */}
          <Link
            href="/account/wishlist"
            className="md:hidden relative p-2 rounded-lg text-zinc-800 hover:text-primary hover:bg-zinc-50 cursor-pointer transition-all flex items-center gap-2"
          >
            <Heart className="w-5 h-5" />
            {wishlistItems.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white shadow-sm">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            key={itemCount}
            className="relative p-2 rounded-lg text-zinc-800 hover:text-primary hover:bg-zinc-50 cursor-pointer transition-all flex items-center gap-2"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white shadow-sm">
                  {itemCount}
                </span>
              )}
            </div>
            <span className="hidden lg:inline-block text-xs md:text-sm font-semibold">Cart</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* --- TIER 2: Secondary Nav (Desktop) --- */}
      <div className="hidden md:block w-full border-t border-zinc-100">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          {/* Left: Explore / Deals / Saved */}
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 font-semibold text-xs md:text-sm hover:text-primary transition-colors pr-6 border-r border-zinc-200">
              <Menu className="w-4 h-4" />
              Menu
            </button>
            <Link href="/shop" className="text-xs md:text-sm font-medium text-zinc-600 hover:text-primary transition-colors">Explore</Link>
            <Link href="/shop" className="text-xs md:text-sm font-medium text-zinc-600 hover:text-primary transition-colors">Deals</Link>
            <Link href="/account/wishlist" className="text-xs md:text-sm font-medium text-zinc-600 hover:text-primary transition-colors">Saved</Link>
          </div>

          {/* Right: Main Links */}
          <div className="flex items-center gap-8">
            {mainLinks.map((item) => (
              <Link
                key={item.href}
                className={cn(
                  "text-xs md:text-sm font-semibold transition-all hover:text-primary relative",
                  isActive(item.href) ? "text-primary after:absolute after:bottom-[-13px] after:left-0 after:w-full after:h-0.5 after:bg-primary" : "text-zinc-800"
                )}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* --- TIER 3: Categories (Desktop) --- */}
      <div className="hidden md:block w-full border-t border-zinc-100 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-8 whitespace-nowrap min-w-max">
            {categoryLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[13px] font-medium transition-colors hover:text-primary",
                  item.highlight ? "text-primary" : "text-zinc-600"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* --- Mobile Search (Shown below top bar on mobile) --- */}
      <div className="md:hidden w-full px-4 pb-4">
        <form onSubmit={handleSearch} className="relative w-full flex items-center">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What you're looking for" 
              className="w-full bg-primary/5 text-xs md:text-sm px-4 py-2.5 rounded-full border border-transparent focus:outline-none focus:border-primary/20 transition-colors placeholder:text-zinc-500"
            />
            <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 bg-white text-zinc-800 border border-zinc-200 w-8 h-8 rounded-full flex items-center justify-center shadow-sm">
              <Search className="w-3.5 h-3.5" />
            </button>
        </form>
      </div>

      {/* --- Mobile Menu Overlay --- */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b z-50 h-[calc(100vh-115px)] overflow-y-auto">
          <div className="flex flex-col gap-1 p-4">
            
            {/* User mobile section */}
            {user ? (
              <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                  <User2 className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs md:text-sm font-bold">{user.name || "Account"}</span>
                  <span className="text-[11px] text-zinc-500">{user.email || user.mobile}</span>
                </div>
              </div>
            ) : null}

            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mt-2 mb-1 px-2">Menu</span>
            {mainLinks.map((item) => (
              <Link
                key={item.href}
                className={buttonVariants({
                  variant: isActive(item.href) ? "secondary" : "ghost",
                  className: "w-full justify-start rounded-xl font-medium",
                })}
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <hr className="my-4 border-dashed opacity-50" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1 px-2">Categories</span>
            
            <div className="grid grid-cols-2 gap-2">
                {categoryLinks.map((item) => (
                <Link
                    key={item.href}
                    className={buttonVariants({
                    variant: "ghost",
                    className: cn("w-full justify-start rounded-xl text-[10px] md:text-xs", item.highlight && "text-primary"),
                    })}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                >
                    {item.label}
                </Link>
                ))}
            </div>

            <hr className="my-4 border-dashed opacity-50" />

            {user ? (
              <div className="flex flex-col gap-2 pb-8">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1 px-2">Account</span>
                <Link href="/account" className={buttonVariants({ variant: "ghost", className: "justify-start text-xs md:text-sm rounded-xl" })} onClick={() => setIsOpen(false)}>Dashboard</Link>
                <Link href="/account/orders" className={buttonVariants({ variant: "ghost", className: "justify-start text-xs md:text-sm rounded-xl" })} onClick={() => setIsOpen(false)}>Orders</Link>
                <Link href="/account/wishlist" className={buttonVariants({ variant: "ghost", className: "justify-start text-xs md:text-sm rounded-xl" })} onClick={() => setIsOpen(false)}>Wishlist</Link>
                <Link href="/account/profile" className={buttonVariants({ variant: "ghost", className: "justify-start text-xs md:text-sm rounded-xl" })} onClick={() => setIsOpen(false)}>Profile</Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className={buttonVariants({
                    variant: "ghost",
                    className: "w-full justify-start gap-3 rounded-xl text-red-500 mt-2",
                  })}
                >
                  <LogOut className="w-4 h-4" /> Log out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pb-8 mt-2">
                <Link
                  className={buttonVariants({
                    variant: "default",
                    className: "w-full justify-center rounded-xl py-6",
                  })}
                  href="/auth/login?role=customer"
                  onClick={() => setIsOpen(false)}
                >
                  Login / Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
