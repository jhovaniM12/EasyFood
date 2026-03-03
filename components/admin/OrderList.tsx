"use client";
import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, CircularProgress } from "@mui/material";
import OrderAdminCard, { OrderAdminCardProps } from "@/components/admin/OrderAdminCard";

interface OrderListProps {
  orders: OrderAdminCardProps[];
  loading: boolean;
}

export default function OrderList({ orders, loading }: OrderListProps) {
  const [tab, setTab] = useState(0);

  // Filtrado ultra-claro
  const filtered = orders.filter(order => {
    const statusMap = ["new", "preparing", "ready"];
    return order.status === statusMap[tab];
  });

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress sx={{ color: '#E53935' }} /></Box>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ bgcolor: 'white', px: 2, pb: 1, borderRadius: "0 0 24px 24px", zIndex: 5 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth" TabIndicatorProps={{ sx: { bgcolor: "#E53935", height: 3 } }}>
          <Tab label={`NUEVOS (${orders.filter(o=>o.status==='new').length})`} sx={{ fontWeight: 800, fontSize: '0.65rem' }} />
          <Tab label={`PREPARANDO (${orders.filter(o=>o.status==='preparing').length})`} sx={{ fontWeight: 800, fontSize: '0.65rem' }} />
          <Tab label={`LISTOS (${orders.filter(o=>o.status==='ready').length})`} sx={{ fontWeight: 800, fontSize: '0.65rem' }} />
        </Tabs>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', p: 2, pb: 10 }}>
         {/* Título dinámico según el Tab */}
        <Typography sx={{ fontWeight: 900, mb: 2, fontSize: '1.1rem', color: '#2D3142' }}>
          {tab === 0 ? "Pedidos Entrantes" : tab === 1 ? "En Proceso" : "Listos para Entregar"}
        </Typography>

        {filtered.length > 0 ? (
          filtered.map(order => <OrderAdminCard key={order.orderId} {...order} />)
        ) : (
          <Typography sx={{ textAlign: 'center', mt: 10, color: '#A0A0A0', fontWeight: 700 }}>
            No hay pedidos en esta sección
          </Typography>
        )}
      </Box>
    </Box>
  );
}