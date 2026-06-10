"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type ProductSnippet = {
  id: string;
  name: string;
  price: number;
  image: string;
  originalPrice?: number;
};

type RecentlyViewedContextType = {
  items: ProductSnippet[];
  addViewedProduct: (product: ProductSnippet) => void;
  clearHistory: () => void;
};

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export function RecentlyViewedProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ProductSnippet[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("leela_recently_viewed");
    if (stored) {
      try {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setItems(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse recently viewed from local storage", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("leela_recently_viewed", JSON.stringify(items));
  }, [items]);

  const addViewedProduct = React.useCallback((product: ProductSnippet) => {
    setItems((prev) => {
      // Remove it if it already exists to move it to the front
      const filtered = prev.filter((p) => p.id !== product.id);
      // Keep only last 10 viewed products
      return [product, ...filtered].slice(0, 10);
    });
  }, []);

  const clearHistory = React.useCallback(() => {
    setItems([]);
  }, []);

  return (
    <RecentlyViewedContext.Provider value={{ items, addViewedProduct, clearHistory }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (context === undefined) {
    throw new Error("useRecentlyViewed must be used within a RecentlyViewedProvider");
  }
  return context;
}
