"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import OrderTrackingHeader from "@/components/history/OrderTrackingHeader";
import OrderStatusBanner from "@/components/history/OrderStatusBanner";
import OrderProgressTracker from "@/components/history/OrderProgressTracker";
import OrderSummaryCard from "@/components/history/OrderSummaryCard";
import { ORDER_TRACKING_COPY } from "@/constants/OrderTracking";

function OrderTrackingContent() {
    const params = useSearchParams();
    const orderNumber = params.get("order") ?? "EF-UAO-000";
    const total = Number(params.get("total") ?? 0);
    const itemCount = Number(params.get("items") ?? 1);

    return (
        <div className="flex flex-col h-full bg-[#FDF4ED] overflow-y-auto">
            {/* Header */}
            <OrderTrackingHeader />

            {/* Orden confirmada + número */}
            <div className="text-center mt-4 px-6">
                <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                    {ORDER_TRACKING_COPY.confirmed}
                </p>
                <h2 className="text-3xl font-extrabold text-gray-900 mt-1 tracking-tight">
                    {orderNumber}
                </h2>
            </div>

            {/* Banner verde */}
            <OrderStatusBanner />

            {/* Progress tracker */}
            <OrderProgressTracker />

            {/* Resumen del pedido */}
            <OrderSummaryCard
                itemCount={itemCount}
                total={total}
                summaryHref="/history/OrderSummary?status=EN_CURSO"
            />
            <br />
            <br />
            <p className="px-6 pb-6 text-center text-sm font-semibold text-gray-600">
                En el momento de recoger tu producto, entra al resumen del pedido para mostrar el codigo QR.
            </p>
        </div>
    );
}

export default function OrderTrackingPage() {
    return (
        <Suspense>
            <OrderTrackingContent />
        </Suspense>
    );
}
