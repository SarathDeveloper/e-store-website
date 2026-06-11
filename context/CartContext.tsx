"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

import { Product, products } from "@/lib/mock-products";

export type { Product };

export interface CartItem extends Product {
    quantity: number;
    selectedSize?: string;
    selectedColor?: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product, selectedSize?: string, selectedColor?: string, quantity?: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    subtotal: number;
    gst: number;
    total: number;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export { products };

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = useCallback((product: Product, selectedSize?: string, selectedColor?: string, qty: number = 1) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
                        ? { ...item, quantity: item.quantity + qty }
                        : item
                );
            }
            return [...prev, { ...product, quantity: qty, selectedSize, selectedColor }];
        });
    }, []);

    const removeFromCart = useCallback((productId: number) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    }, []);

    const updateQuantity = useCallback((productId: number, quantity: number) => {
        if (quantity < 1) return;
        setCartItems(prev =>
            prev.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    }, []);

    const clearCart = useCallback(() => setCartItems([]), []);

    const parsePrice = (priceStr: string) => {
        return parseInt(priceStr.replace(/[^0-9]/g, "")) || 0;
    };

    const subtotal = cartItems.reduce((acc, item) =>
        acc + (parsePrice(item.price) * item.quantity), 0
    );

    const gst = Math.round(subtotal * 0.18);
    const total = subtotal + gst;
    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            subtotal,
            gst,
            total,
            itemCount
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
