"use client";

import { useState, useMemo } from "react";
import { initialCartItems, CartItemType } from "@/constants/CartItems";
import CartHeader from "@/components/cart/CartHeader";
import CartItem from "@/components/cart/CartItem";
import PickupPointSelector from "@/components/cart/PickupPointSelector";
import CartSummary from "@/components/cart/CartSummary";
import CheckoutButton from "@/components/cart/CheckoutButton";

export default function ShoppingPage() {
    const [items, setItems] = useState<CartItemType[]>(initialCartItems);
    const [selectedPickup, setSelectedPickup] = useState<string | null>(null);

    const subtotal = useMemo(
        () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
        [items]
    );

    const handleRemove = (id: number) =>
        setItems((prev) => prev.filter((item) => item.id !== id));

    const handleIncrement = (id: number) =>
        setItems((prev) =>
            prev.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
        );

    const handleDecrement = (id: number) =>
        setItems((prev) =>
            prev
                .map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
                .filter((item) => item.quantity > 0)
        );

    return (
        <div className="flex flex-col h-full bg-[#FDF4ED] overflow-y-auto">
            {/* Header */}
            <CartHeader />

            {/* Lista de ítems */}
            <div className="flex flex-col gap-3 mt-2">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-2">
                        <p className="text-gray-400 text-sm">Tu carrito está vacío</p>
                    </div>
                ) : (
                    items.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onRemove={handleRemove}
                            onIncrement={handleIncrement}
                            onDecrement={handleDecrement}
                        />
                    ))
                )}
            </div>

            {/* Punto de recogida */}
            {items.length > 0 && (
                <PickupPointSelector
                    selected={selectedPickup}
                    onSelect={setSelectedPickup}
                />
            )}

            {/* Separador */}
            <div className="mx-4 mt-5 border-t border-gray-200" />

            {/* Subtotal */}
            <CartSummary subtotal={subtotal} />

            {/* Botón de pago */}
            <CheckoutButton disabled={items.length === 0 || selectedPickup === null} />
        </div>
    );
}