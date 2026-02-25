"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { initialCartItems, CartItemType } from "@/constants/CartItems";
import CartHeader from "@/components/cart/CartHeader";
import CartItem from "@/components/cart/CartItem";
import PickupPointSelector from "@/components/cart/PickupPointSelector";
import CartSummary from "@/components/cart/CartSummary";
import CheckoutButton from "@/components/cart/CheckoutButton";
import PaymentMethodSelector, {
    PaymentMethod,
} from "@/components/cart/PaymentMethodSelector";
import DiscountCodeInput from "@/components/cart/DiscountCodeInput";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@mui/material/Button";

type Step = "cart" | "payment";

function formatCOP(value: number) {
    return "$" + value.toLocaleString("es-CO");
}

function generateOrderNumber() {
    const num = Math.floor(Math.random() * 900) + 100;
    return `EF-UAO-${num}`;
}

export default function ShoppingPage() {
    const router = useRouter();
    const [items, setItems] = useState<CartItemType[]>(initialCartItems);
    const [selectedPickup, setSelectedPickup] = useState<string | null>(null);
    const [step, setStep] = useState<Step>("cart");
    const [selectedPayment, setSelectedPayment] =
        useState<PaymentMethod | null>(null);
    const [discountApplied, setDiscountApplied] = useState(false);

    const subtotal = useMemo(
        () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
        [items]
    );

    const discount = discountApplied ? Math.floor(subtotal * 0.1) : 0;
    const total = subtotal - discount;

    const handleRemove = (id: number) =>
        setItems((prev) => prev.filter((item) => item.id !== id));

    const handleIncrement = (id: number) =>
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );

    const handleDecrement = (id: number) =>
        setItems((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );

    const handleApplyDiscount = (code: string) => {
        if (code.toUpperCase() === "UAO10") {
            setDiscountApplied(true);
        }
    };

    const handleConfirmPayment = () => {
        if (!selectedPayment) return;
        const order = generateOrderNumber();
        const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
        router.push(
            `/shopping/success?order=${order}&total=${total}&method=${selectedPayment}&items=${itemCount}`
        );
    };

    // ─── PAYMENT SCREEN ───────────────────────────────────────────────────────
    if (step === "payment") {
        return (
            <div className="flex flex-col h-full bg-[#FDF4ED] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center px-2 pt-5 pb-3 bg-[#FDF4ED]">
                    <button
                        onClick={() => setStep("cart")}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Volver al carrito"
                    >
                        <ChevronLeft size={24} className="text-gray-800" />
                    </button>
                    <h1 className="flex-1 text-center text-lg font-bold text-gray-900 pr-8">
                        Mi Carrito
                    </h1>
                </div>

                {/* Subtotal */}
                <div className="px-4 mt-2 flex items-center justify-between">
                    <span className="text-base font-extrabold text-gray-900 tracking-wide">
                        SUBTOTAL:
                    </span>
                    <span className="text-xl font-extrabold text-[#E53935]">
                        {formatCOP(subtotal)}
                    </span>
                </div>

                {/* Payment method selector */}
                <PaymentMethodSelector
                    selected={selectedPayment}
                    onSelect={setSelectedPayment}
                />

                {/* Discount code */}
                <DiscountCodeInput onApply={handleApplyDiscount} />

                {discountApplied && (
                    <p className="px-4 mt-2 text-xs text-green-600 font-medium">
                        ✅ Descuento del 10% aplicado
                    </p>
                )}

                {/* Divider */}
                <div className="mx-4 mt-5 border-t border-gray-200" />

                {/* Total */}
                <div className="px-4 mt-4 flex flex-col gap-1">
                    {discountApplied && (
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Descuento (10%)</span>
                            <span className="text-green-600 font-semibold">
                                -{formatCOP(discount)}
                            </span>
                        </div>
                    )}
                    <div className="flex items-center justify-between">
                        <span className="text-base font-extrabold text-gray-900 tracking-wide">
                            TOTAL:
                        </span>
                        <span className="text-xl font-extrabold text-[#E53935]">
                            {formatCOP(total)}
                        </span>
                    </div>
                </div>

                {/* Confirm button */}
                <div className="px-4 mt-5 pb-4">
                    <Button
                        fullWidth
                        variant="contained"
                        disabled={!selectedPayment}
                        onClick={handleConfirmPayment}
                        endIcon={<ChevronRight size={18} />}
                        sx={{
                            borderRadius: "16px",
                            py: 1.6,
                            fontWeight: "bold",
                            fontSize: "0.95rem",
                            textTransform: "none",
                            backgroundColor: !selectedPayment
                                ? "#9CA3AF"
                                : "#E53935",
                            "&:hover": {
                                backgroundColor: !selectedPayment
                                    ? "#9CA3AF"
                                    : "#c62828",
                            },
                            "&.Mui-disabled": {
                                backgroundColor: "#9CA3AF",
                                color: "#fff",
                            },
                            boxShadow: !selectedPayment
                                ? "none"
                                : "0 4px 14px rgba(229,57,53,0.35)",
                        }}
                    >
                        Confirmar pago
                    </Button>
                </div>

                <p className="text-center text-[10px] text-gray-400 tracking-widest mb-2">
                    EXPERIENCIA MÓVIL OFICIAL DE LA UAO
                </p>
            </div>
        );
    }

    // ─── CART SCREEN ─────────────────────────────────────────────────────────
    return (
        <div className="flex flex-col h-full bg-[#FDF4ED] overflow-y-auto">
            {/* Header */}
            <CartHeader />

            {/* Lista de ítems */}
            <div className="flex flex-col gap-3 mt-2">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-2">
                        <p className="text-gray-400 text-sm">
                            Tu carrito está vacío
                        </p>
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
            <CheckoutButton
                disabled={items.length === 0 || selectedPickup === null}
                onClick={() => setStep("payment")}
            />
        </div>
    );
}