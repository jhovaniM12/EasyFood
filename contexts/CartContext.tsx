"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from "react";
import RestaurantConflictModal from "@/components/cart/RestaurantConflictModal";

export interface CartItem {
    id: number;
    name: string;
    description: string;
    price: number;
    priceLabel: string;
    image: string;
    quantity: number;
    restauranteId: number;
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
    const [pendingProduct, setPendingProduct] = useState<Omit<CartItem, "quantity"> | null>(null);

    const addItem = useCallback((product: Omit<CartItem, "quantity">) => {
        setItems((prev) => {
            // Validar que el producto sea del mismo restaurante que los existentes
            if (prev.length > 0 && prev[0].restauranteId !== product.restauranteId) {
                setPendingProduct(product);
                return prev;
            }

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

    const handleConfirmConflict = () => {
        if (pendingProduct) {
            setItems([{ ...pendingProduct, quantity: 1 }]);
        }
        setPendingProduct(null);
    };

    const handleCancelConflict = () => {
        setPendingProduct(null);
    };

    return (
        <CartContext.Provider value={{ items, totalItems, addItem, removeItem, increment, decrement, clearCart }}>
            {children}
            <RestaurantConflictModal
                open={!!pendingProduct}
                onClose={handleCancelConflict}
                onConfirm={handleConfirmConflict}
            />
        </CartContext.Provider>
    );
}

export function useCart(): CartContextValue {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
    return ctx;
}
