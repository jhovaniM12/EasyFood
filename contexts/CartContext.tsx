"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from "react";

export interface CartItem {
    id: number;
    name: string;
    description: string;
    price: number;
    priceLabel: string;
    image: string;
    quantity: number;
}

interface CartContextValue {
    items: CartItem[];
    totalItems: number;
    addItem: (product: Omit<CartItem, "quantity">) => void;
    removeItem: (id: number) => void;
    increment: (id: number) => void;
    decrement: (id: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = useCallback((product: Omit<CartItem, "quantity">) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === product.id);
            if (existing) {
                return prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    }, []);

    const removeItem = useCallback((id: number) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    }, []);

    const increment = useCallback((id: number) => {
        setItems((prev) => prev.map((i) => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
    }, []);

    const decrement = useCallback((id: number) => {
        setItems((prev) => prev.map((i) => i.id === id ? { ...i, quantity: i.quantity - 1 } : i).filter((i) => i.quantity > 0));
    }, []);

    const clearCart = useCallback(() => setItems([]), []);

    const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

    return (
        <CartContext.Provider value={{ items, totalItems, addItem, removeItem, increment, decrement, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart(): CartContextValue {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
    return ctx;
}
