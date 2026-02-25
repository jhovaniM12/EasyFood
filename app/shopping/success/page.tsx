"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { ChevronLeft } from "lucide-react";
import PaymentSuccessIcon from "@/components/cart/success/PaymentSuccessIcon";
import PaymentOrderCard from "@/components/cart/success/PaymentOrderCard";
import PaymentSuccessActions from "@/components/cart/success/PaymentSuccessActions";
import { SUCCESS_COPY } from "@/constants/PaymentSuccess";
import { PaymentMethod } from "@/components/cart/PaymentMethodSelector";

function SuccessContent() {
    const params = useSearchParams();
    const router = useRouter();

    const orderNumber = params.get("order") ?? "EF-UAO-000";
    const total = Number(params.get("total") ?? 0);
    const paymentMethod = (params.get("method") ?? "local") as PaymentMethod;

    return (
        <div className="flex flex-col h-full bg-[#FDF4ED] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center px-2 pt-5 pb-2 bg-[#FDF4ED]">
                <button
                    onClick={() => router.push("/shopping")}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Volver al carrito"
                >
                    <ChevronLeft size={24} className="text-gray-800" />
                </button>
                <h1 className="flex-1 text-center text-lg font-bold text-gray-900 pr-8">
                    Mi Carrito
                </h1>
            </div>

            {/* Big checkmark icon */}
            <PaymentSuccessIcon />

            {/* Titles */}
            <div className="text-center px-6 mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
                    {SUCCESS_COPY.title}
                </h2>
                <p className="text-sm font-semibold text-[#E53935] leading-snug">
                    {SUCCESS_COPY.subtitle}
                </p>
            </div>

            {/* Order details card */}
            <PaymentOrderCard
                orderNumber={orderNumber}
                total={total}
                paymentMethod={paymentMethod}
            />

            {/* Action buttons */}
            <PaymentSuccessActions />
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense>
            <SuccessContent />
        </Suspense>
    );
}
