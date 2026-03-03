"use client";
import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, CircularProgress } from "@mui/material";
import OrderAdminCard, { OrderAdminCardProps } from "@/components/admin/OrderAdminCard";

interface OrderListProps {
  orders: OrderAdminCardProps[];
  loading: boolean;
  onAction: (orderId: number, nextStatus: string) => void;
}

const TAB_STATUSES = [
  ["recibido", "confirmado"],      // Tab 0: Nuevos
  ["en_preparacion"],               // Tab 1: Preparando
  ["listo"],                         // Tab 2: Listos
];

const TAB_TITLES = [
  "Pedidos Entrantes",
  "En Preparación",
  "Listos para Entregar",
];

export default function OrderList({ orders, loading, onAction }: OrderListProps) {
  const [tab, setTab] = useState(0);

  const filtered = orders.filter(o => TAB_STATUSES[tab]?.includes(o.status));

  const counts = TAB_STATUSES.map(
    statuses => orders.filter(o => statuses.includes(o.status)).length
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress sx={{ color: '#E53935' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ bgcolor: 'white', px: 2, pb: 1, borderRadius: "0 0 24px 24px", zIndex: 5 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="fullWidth"
          TabIndicatorProps={{ sx: { bgcolor: "#E53935", height: 3 } }}
        >
          <Tab label={`NUEVOS (${counts[0]})`} sx={{ fontWeight: 800, fontSize: '0.65rem' }} />
          <Tab label={`PREPARANDO (${counts[1]})`} sx={{ fontWeight: 800, fontSize: '0.65rem' }} />
          <Tab label={`LISTOS (${counts[2]})`} sx={{ fontWeight: 800, fontSize: '0.65rem' }} />
        </Tabs>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', p: 2, pb: 10 }}>
        <Typography sx={{ fontWeight: 900, mb: 2, fontSize: '1.1rem', color: '#2D3142' }}>
          {TAB_TITLES[tab]}
        </Typography>

        {filtered.length > 0 ? (
          filtered.map(order => (
            <OrderAdminCard key={order.orderId} {...order} onAction={onAction} />
          ))
        ) : (
          <Typography sx={{ textAlign: 'center', mt: 10, color: '#A0A0A0', fontWeight: 700 }}>
            No hay pedidos en esta sección
          </Typography>
        )}
      </Box>
    </Box>
  );
}