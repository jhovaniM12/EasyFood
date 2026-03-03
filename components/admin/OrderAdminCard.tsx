"use client";
import { Box, Typography, Button, Avatar } from "@mui/material";
import { CheckCircle2 } from "lucide-react";
import { Play } from "lucide-react";
import { PackageCheck } from "lucide-react";

export interface OrderAdminCardProps {
  orderId: string;
  customer: string;
  time: string;
  status: "new" | "preparing" | "ready";
  items: { name: string; details: string; image: string; quantity: number; }[];
}

export default function OrderAdminCard({ orderId, customer, time, status, items }: OrderAdminCardProps) {
  const isNew = status === "new";
  const isPreparing = status === "preparing";
  const isReady = status === "ready";
  return (
    <Box sx={{ bgcolor: "white", borderRadius: "24px", p: 2, mb: 2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
        <Box>
          <Typography sx={{ color: "#E53935", fontWeight: 800, fontSize: "0.7rem" }}>ORDEN {orderId}</Typography>
          <Typography sx={{ fontWeight: 800, fontSize: "1.1rem" }}>{customer}</Typography>
        </Box>
        <Typography sx={{ fontWeight: 800, color: isNew ? "#2D3142" : "#E53935" }}>{time}</Typography>
      </Box>
      {items.map((item, i) => (
        <Box key={i} sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Avatar src={item.image} variant="rounded" sx={{ width: 50, height: 50, borderRadius: "12px" }} />
            <Box>
                <Typography sx={{ fontWeight: 800, fontSize: "0.9rem" }}>{item.name}</Typography>
                <Typography sx={{ fontSize: "0.7rem", color: "gray" }}>{item.details}</Typography>
            </Box>
        </Box>
      ))}
      <Button fullWidth variant="contained" sx={{ bgcolor: isReady ? "#2E7D32" : "#E53935", borderRadius: "12px", textTransform: "none", fontWeight: 800, "&:hover": { bgcolor: isReady ? "#1B5E20" : "#c62828" } }}>
        {isNew && "Empezar a Cocinar"}
        {isPreparing && "Pedido Listo"}
        {isReady && "Pedido Entregado"}
      </Button>
    </Box>
  );
}