"use client";
import { useState, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import AdminHeader from "@/components/admin/AdminHeader";
import OrderList from "@/components/admin/OrderList";
import { OrderAdminCardProps } from "@/components/admin/OrderAdminCard";
import { adminService, AdminOrder } from "@/services/admin/AdminService";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Justo ahora";
  if (mins < 60) return `Hace ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `Hace ${hrs}h`;
  return new Date(dateStr).toLocaleDateString("es-CO", { day: "numeric", month: "short" });
}

function mapOrderToCard(o: AdminOrder): OrderAdminCardProps {
  return {
    orderId: o.orderId,
    codigoVisual: o.codigoVisual,
    customer: o.cliente,
    time: timeAgo(o.fechaPedido),
    status: o.estado as OrderAdminCardProps["status"],
    total: o.totalCompra,
    items: o.items,
  };
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderAdminCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(() => {
    setLoading(true);
    adminService.getOrders()
      .then(({ data }) => setOrders(data.map(mapOrderToCard)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleAction = useCallback(async (orderId: number, nextStatus: string) => {
    try {
      await adminService.updateOrderStatus(orderId, nextStatus);
      // Optimistic update: move the order to the next status locally
      setOrders(prev =>
        prev.map(o =>
          o.orderId === orderId
            ? { ...o, status: nextStatus as OrderAdminCardProps["status"] }
            : o
        ).filter(o => o.status !== "entregado") // Remove delivered from active list
      );
    } catch (err) {
      console.error("Error al actualizar pedido:", err);
    }
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100dvh', bgcolor: "#FDF4ED" }}>
      <AdminHeader />
      <OrderList orders={orders} loading={loading} onAction={handleAction} />
    </Box>
  );
}
