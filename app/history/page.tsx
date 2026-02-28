"use client";

import { useEffect, useState } from "react";
import { Box, Typography, IconButton, Badge, CircularProgress } from "@mui/material";
import { ChevronLeft, Bell } from "lucide-react";
import { OrderHistoryCard } from "@/components/history/OrderHistoryCard";
import { useRouter } from "next/navigation";
import { ordersService, Order } from "@/services/orders/OrdersService";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80";

const ACTIVE_STATES = ["recibido", "confirmado", "en_preparacion"];

type DisplayStatus = "EN CURSO" | "COMPLETADO" | "LISTO" | "CANCELADO";

const formatStatus = (estado: string): DisplayStatus => {
    const map: Record<string, DisplayStatus> = {
        recibido: "EN CURSO", confirmado: "EN CURSO", en_preparacion: "EN CURSO",
        listo: "LISTO", entregado: "COMPLETADO", cancelado: "CANCELADO",
    };
    return map[estado] ?? "EN CURSO";
};

const formatDate = (iso?: string) =>
    iso ? new Date(iso).toLocaleString("es-CO", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }) : "";

const formatCOP = (value: string | number) =>
    "$" + Number(value).toLocaleString("es-CO");

export default function HistoryPage() {
    const router = useRouter();
    const [activeOrders, setActiveOrders] = useState<Order[]>([]);
    const [pastOrders, setPastOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            ordersService.getActiveOrders().then(setActiveOrders),
            ordersService.getOrders().then((orders) =>
                setPastOrders(orders.filter((o) => !ACTIVE_STATES.includes(o.estado)))
            ),
        ])
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <Box sx={{ bgcolor: "#FDF4ED", minHeight: "100vh", p: 3, pb: 10 }}>
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                        onClick={() => router.push("/home")}
                        sx={{ bgcolor: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
                    >
                        <ChevronLeft size={20} color="#2D3142" />
                    </IconButton>
                    <Typography sx={{ fontWeight: 800, fontSize: "1.2rem", color: "#2D3142" }}>
                        Estado de los Pedidos
                    </Typography>
                </Box>
                <IconButton aria-label="Notificaciones" size="small">
                    <Badge
                        badgeContent={activeOrders.length || undefined}
                        sx={{ "& .MuiBadge-badge": { backgroundColor: "#E53935", color: "#fff", fontSize: "0.6rem", minWidth: "16px", height: "16px" } }}
                    >
                        <Bell size={24} className="text-[#000000]" strokeWidth={2} />
                    </Badge>
                </IconButton>
            </Box>

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                    <CircularProgress sx={{ color: "#E53935" }} />
                </Box>
            ) : (
                <>
                    {/* Pedidos en curso */}
                    <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#2D3142", mb: 2 }}>
                        Pedidos en curso
                    </Typography>
                    {activeOrders.length === 0 ? (
                        <Typography sx={{ fontSize: "0.85rem", color: "#9DA3B4", mb: 3 }}>
                            No tienes pedidos en curso
                        </Typography>
                    ) : (
                        activeOrders.map((order) => (
                            <OrderHistoryCard
                                key={order.orderId}
                                date={formatDate(order.fechaPedido)}
                                status={formatStatus(order.estado)}
                                total={formatCOP(order.totalCompra)}
                                trackingHref={`/shopping/tracking?orderId=${order.orderId}&order=${order.codigoVisual}&total=${order.totalCompra}&items=${order.items?.reduce((s, i) => s + i.cantidad, 0) ?? 0}`}
                                summaryHref={`/history/OrderSummary?orderId=${order.orderId}&status=EN_CURSO`}
                                items={(order.items ?? []).map((i) => ({
                                    image: i.imagenUrl ?? FALLBACK_IMAGE,
                                    quantity: i.cantidad,
                                }))}
                            />
                        ))
                    )}

                    {/* Historial */}
                    <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#2D3142", mt: 4, mb: 2 }}>
                        Historial de pedidos
                    </Typography>
                    {pastOrders.length === 0 ? (
                        <Typography sx={{ fontSize: "0.85rem", color: "#9DA3B4" }}>
                            Aún no tienes pedidos completados
                        </Typography>
                    ) : (
                        pastOrders.map((order) => (
                            <OrderHistoryCard
                                key={order.orderId}
                                date={formatDate(order.fechaPedido)}
                                status={formatStatus(order.estado)}
                                total={formatCOP(order.totalCompra)}
                                summaryHref={`/history/OrderSummary?orderId=${order.orderId}&status=${order.estado === "entregado" ? "COMPLETADO" : order.estado.toUpperCase()}`}
                                items={(order.items ?? []).map((i) => ({
                                    image: i.imagenUrl ?? FALLBACK_IMAGE,
                                    quantity: i.cantidad,
                                }))}
                            />
                        ))
                    )}
                </>
            )}
        </Box>
    );
}