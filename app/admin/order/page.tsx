"use client";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import AdminHeader from "@/components/admin/AdminHeader";
import OrderList from "@/components/admin/OrderList";
import { OrderAdminCardProps } from "@/components/admin/OrderAdminCard";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderAdminCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos carga de datos
    const timer = setTimeout(() => {
      setOrders([
        {
          orderId: "EF-UAO-102",
          customer: "Juan Pérez",
          time: "Hace 2 min",
          status: "new",
          items: [{ name: "Hamburguesa Clásica", details: "Sin cebolla", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200", quantity: 1 }]
        },
        {
          orderId: "EF-UAO-098",
          customer: "Carlos Mario",
          time: "08:24",
          status: "preparing",
          items: [{ name: "Hamburguesa Clásica", details: "Combo Papas", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200", quantity: 1 }]
        },
        {
          orderId: "EF-UAO-123",
          customer: "Jhovani Moreno",
          time: "08:24",
          status: "ready",
          items: [{ name: "Hamburguesa Clásica", details: "Combo Papas", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200", quantity: 1 }]
        }
      ]);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100dvh', bgcolor: "#FDF4ED" }}>
      <AdminHeader />
      <OrderList orders={orders} loading={loading} />
    </Box>
  );
}
