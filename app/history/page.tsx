"use client";

import { useEffect, useState } from "react";
import { Box, Typography, IconButton, Badge } from "@mui/material";
import { ChevronLeft, Bell } from "lucide-react";
import { OrderHistoryCard } from "@/components/history/OrderHistoryCard";
import { ordersService, Order } from "@/services/orders/OrdersService";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80";

export default function HistoryPage() {
    const [activeOrders, setActiveOrders] = useState<Order[]>([]);
    const [pastOrders, setPastOrders] = useState<Order[]>([]);

    useEffect(() => {
        ordersService.getActiveOrders().then(setActiveOrders).catch(console.error);
        ordersService
            .getOrders()
            .then((orders) => setPastOrders(orders.filter((o) => !["recibido", "confirmado", "en_preparacion"].includes(o.estado))))
            .catch(console.error);
    }, []);

    const formatDate = (iso?: string) =>
        iso ? new Date(iso).toLocaleString("es-CO", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }) : "";

    const formatStatus = (estado: string): "EN CURSO" | "COMPLETADO" | "LISTO" | "CANCELADO" => {
        const map: Record<string, "EN CURSO" | "COMPLETADO" | "LISTO" | "CANCELADO"> = {
            recibido: "EN CURSO", confirmado: "EN CURSO", en_preparacion: "EN CURSO",
            listo: "LISTO", entregado: "COMPLETADO", cancelado: "CANCELADO",
        };
        return map[estado] ?? "EN CURSO";
    };

    return (
        <Box sx={{ bgcolor: "#FDF4ED", minHeight: "100vh", p: 3, pb: 10 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton sx={{ bgcolor: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
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

            {activeOrders.length > 0 && (
                <>
                    <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#2D3142", mb: 2 }}>
                        Pedidos en curso
                    </Typography>
                    {activeOrders.map((order) => (
                        <OrderHistoryCard
                            key={order.orderId}
                            date={formatDate(order.fechaPedido)}
                            status={formatStatus(order.estado)}
                            total={`$${Number(order.totalCompra).toLocaleString("es-CO")}`}
                            items={(order.items ?? []).map((i) => ({ image: i.imagenUrl ?? FALLBACK_IMAGE, quantity: i.cantidad }))}
                        />
                    ))}
                </>
            )}

            <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#2D3142", mt: 4, mb: 2 }}>
                Historial de pedidos
            </Typography>
            {pastOrders.length === 0 ? (
                <Typography sx={{ color: "#9DA3B4", fontSize: "0.9rem", textAlign: "center", mt: 4 }}>
                    No tienes pedidos anteriores
                </Typography>
            ) : (
                pastOrders.map((order) => (
                    <OrderHistoryCard
                        key={order.orderId}
                        date={formatDate(order.fechaPedido)}
                        status={formatStatus(order.estado)}
                        total={`$${Number(order.totalCompra).toLocaleString("es-CO")}`}
                        items={(order.items ?? []).map((i) => ({ image: i.imagenUrl ?? FALLBACK_IMAGE, quantity: i.cantidad }))}
                    />
                ))
            )}
        </Box>
    );
}