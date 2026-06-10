"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type ProductSnippet = {
  id: string;
  name: string;
  price: number;
  image: string;
  originalPrice?: number;
};

type WishlistContextType = {
  items: ProductSnippet[];
  addToWishlist: (product: ProductSnippet) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ProductSnippet[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("leela_wishlist");
    if (stored) {
      try {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setItems(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse wishlist from local storage", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("leela_wishlist", JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product: ProductSnippet) => {
    setItems((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const isInWishlist = (id: string) => {
    return items.some((p) => p.id === id);
  };

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
