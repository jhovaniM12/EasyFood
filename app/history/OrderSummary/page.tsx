"use client";

import { useEffect, useState, Suspense } from "react";
import { Box, Typography, IconButton, Badge, CircularProgress } from "@mui/material";
import { ChevronLeft, Bell, CheckCircle2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ordersService, TrackingInfo } from "@/services/orders/OrdersService";

function OrderSummaryContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");
    const orderStatus = searchParams.get("status");
    const isOrderInProgress = orderStatus !== "COMPLETADO";

    const [tracking, setTracking] = useState<TrackingInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!orderId) { setLoading(false); return; }
        ordersService.getTracking(Number(orderId))
            .then(setTracking)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [orderId]);

    const orderCode = tracking?.codigoVisual ?? "---";
    const qrCodeSrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(tracking?.qrCodeData ?? orderCode)}`;

    return (
        <Box sx={{ bgcolor: "#FDF4ED", minHeight: "100vh", p: 3, pb: 10 }}>
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                        onClick={() => router.push("/history")}
                        sx={{ bgcolor: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
                    >
                        <ChevronLeft size={20} color="#2D3142" />
                    </IconButton>
                    <Typography sx={{ fontWeight: 800, fontSize: "1.2rem", color: "#2D3142" }}>
                        Resumen del pedido
                    </Typography>
                </Box>
                <IconButton aria-label="Notificaciones" size="small">
                    <Badge
                        badgeContent={1}
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
            ) : !tracking ? (
                <Box sx={{ textAlign: "center", mt: 10 }}>
                    <Typography sx={{ color: "gray" }}>No se encontró el pedido</Typography>
                </Box>
            ) : (
                <>
                    {/* Título de la Orden */}
                    <Box sx={{ textAlign: "center", my: 4 }}>
                        <Typography sx={{ color: "gray", fontWeight: 700, fontSize: "0.8rem", letterSpacing: 1 }}>ORDEN:</Typography>
                        <Typography sx={{ color: "#2D3142", fontWeight: 900, fontSize: "2rem" }}>{orderCode}</Typography>
                    </Box>

                    {/* Items del pedido */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mx: 1 }}>
                        {tracking.items.map((item, idx) => (
                            <Box key={idx} sx={{
                                borderRadius: "24px", p: 2, display: "flex", alignItems: "center", gap: 2,
                                border: "1px solid #FFD6D2", bgcolor: "white"
                            }}>
                                <img
                                    src={item.imagenUrl ?? "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80"}
                                    alt={item.nombre}
                                    className="w-20 h-20 rounded-2xl object-cover"
                                />
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ fontWeight: 800, color: "#2D3142" }}>{item.nombre}</Typography>
                                    {item.observaciones && (
                                        <Typography sx={{ fontSize: "0.75rem", color: "gray" }}>{item.observaciones}</Typography>
                                    )}
                                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1, alignItems: "center" }}>
                                        <Typography sx={{ fontWeight: 800, color: "#D94E41" }}>
                                            ${Number(item.precioUnitario).toLocaleString("es-CO")}
                                        </Typography>
                                        <Typography sx={{ fontWeight: 800, color: "#2D3142" }}>x{item.cantidad}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>

                    {/* Sección Total */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, my: 5 }}>
                        <Typography sx={{ fontWeight: 900, fontSize: "1.2rem", color: "#2D3142" }}>TOTAL:</Typography>
                        <Typography sx={{ fontWeight: 900, fontSize: "1.3rem", color: "#D94E41" }}>
                            ${Number(tracking.total).toLocaleString("es-CO")}
                        </Typography>
                    </Box>

                    {/* QR y validación (solo pedidos en curso) */}
                    {isOrderInProgress ? (
                        <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                            <Typography sx={{ fontSize: "0.9rem", fontWeight: 700, color: "#2D3142", maxWidth: "200px" }}>
                                Muestra este código al llegar a la barra
                            </Typography>
                            <Box sx={{
                                bgcolor: "white", p: 2, borderRadius: "20px",
                                border: "3px solid #D94E41", boxShadow: "0 10px 20px rgba(217, 78, 65, 0.2)"
                            }}>
                                <img src={qrCodeSrc} alt={`QR de la orden ${orderCode}`} className="w-32 h-32" />
                            </Box>
                            <Box sx={{
                                display: "flex", alignItems: "center", gap: 1,
                                bgcolor: "#FFF2F1", px: 2, py: 0.5, borderRadius: "10px"
                            }}>
                                <CheckCircle2 size={16} className="text-[#D94E41]" />
                                <Typography sx={{ fontSize: "0.7rem", fontWeight: 800, color: "#D94E41", letterSpacing: 1 }}>
                                    VALIDACIÓN UAO
                                </Typography>
                            </Box>
                        </Box>
                    ) : (
                        <Box sx={{ textAlign: "center", mt: 3 }}>
                            <Typography sx={{ fontSize: "1rem", fontWeight: 800, color: "#2D3142" }}>
                                Pedido completado
                            </Typography>
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
}

export default function OrderSummaryPage() {
    return (
        <Suspense>
            <OrderSummaryContent />
        </Suspense>
    );
}