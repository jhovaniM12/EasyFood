"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import OrderTrackingHeader from "@/components/history/OrderTrackingHeader";
import OrderStatusBanner from "@/components/history/OrderStatusBanner";
import OrderProgressTracker from "@/components/history/OrderProgressTracker";
import OrderSummaryCard from "@/components/history/OrderSummaryCard";
import { ORDER_TRACKING_COPY, buildOrderSteps, getStatusBannerInfo } from "@/constants/OrderTracking";
import { ordersService, TrackingInfo } from "@/services/orders/OrdersService";
import { CircularProgress } from "@mui/material";

function OrderTrackingContent() {
    const params = useSearchParams();
    const orderNumber = params.get("order") ?? "EF-UAO-000";
    const total = Number(params.get("total") ?? 0);
    const itemCount = Number(params.get("items") ?? 1);
    const orderId = params.get("orderId") ?? "";

    const [tracking, setTracking] = useState<TrackingInfo | null>(null);
    const [loading, setLoading] = useState(!!orderId);

    useEffect(() => {
        if (!orderId) return;
        ordersService.getTracking(Number(orderId))
            .then(setTracking)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [orderId]);

    const estado = (tracking?.estado ?? "recibido") as "recibido" | "confirmado" | "en_preparacion" | "listo" | "entregado" | "cancelado";
    const steps = buildOrderSteps(estado);
    const bannerInfo = getStatusBannerInfo(
        estado,
        tracking?.posicionFila ?? 0,
        tracking?.tiempoEstimadoEntrega ?? "calculando..."
    );

    const headerLabel = estado === "listo" ? "ORDEN LISTA"
        : estado === "entregado" ? "ORDEN ENTREGADA"
            : estado === "cancelado" ? "ORDEN CANCELADA"
                : "ORDEN CONFIRMADA";

    return (
        <div className="flex flex-col h-full bg-[#FDF4ED] overflow-y-auto">
            <OrderTrackingHeader />

            <div className="text-center mt-4 px-6">
                <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                    {headerLabel}
                </p>
                <h2 className="text-3xl font-extrabold text-gray-900 mt-1 tracking-tight">
                    {tracking?.codigoVisual ?? orderNumber}
                </h2>
            </div>

            {loading ? (
                <div className="flex justify-center mt-10">
                    <CircularProgress sx={{ color: "#E53935" }} />
                </div>
            ) : (
                <>
                    <OrderStatusBanner {...bannerInfo} />
                    <OrderProgressTracker steps={steps} />
                </>
            )}

            <OrderSummaryCard
                itemCount={itemCount}
                total={total}
                summaryHref={`/history/OrderSummary?orderId=${orderId}&status=EN_CURSO`}
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
