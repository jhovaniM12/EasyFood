"use client";
import { Box, Typography, Button, Avatar } from "@mui/material";

export interface OrderAdminCardProps {
  orderId: number;
  codigoVisual: string;
  customer: string;
  time: string;
  status: "recibido" | "confirmado" | "en_preparacion" | "listo" | "entregado" | "cancelado";
  total: string;
  items: { name: string; quantity: number; image: string | null; precio: string; }[];
  onAction?: (orderId: number, nextStatus: string) => void;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=80";

const STATUS_CONFIG: Record<string, { label: string; next: string; color: string; hoverColor: string }> = {
  recibido: { label: "Confirmar Pedido", next: "confirmado", color: "#E53935", hoverColor: "#c62828" },
  confirmado: { label: "Empezar a Preparar", next: "en_preparacion", color: "#E53935", hoverColor: "#c62828" },
  en_preparacion: { label: "Marcar como Listo", next: "listo", color: "#FF9800", hoverColor: "#E65100" },
  listo: { label: "Pedido Entregado", next: "entregado", color: "#2E7D32", hoverColor: "#1B5E20" },
};

export default function OrderAdminCard({ orderId, codigoVisual, customer, time, status, total, items, onAction }: OrderAdminCardProps) {
  const config = STATUS_CONFIG[status];

  return (
    <Box sx={{ bgcolor: "white", borderRadius: "24px", p: 2, mb: 2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
        <Box>
          <Typography sx={{ color: "#E53935", fontWeight: 800, fontSize: "0.7rem" }}>ORDEN {codigoVisual}</Typography>
          <Typography sx={{ fontWeight: 800, fontSize: "1.1rem" }}>{customer}</Typography>
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <Typography sx={{ fontWeight: 800, color: "#E53935", fontSize: "0.85rem" }}>{time}</Typography>
          <Typography sx={{ fontWeight: 700, color: "#A0A0A0", fontSize: "0.7rem" }}>${Number(total).toLocaleString("es-CO")}</Typography>
        </Box>
      </Box>

      {items.map((item, i) => (
        <Box key={i} sx={{ display: "flex", gap: 2, mb: 1.5, alignItems: "center" }}>
          <Avatar src={item.image ?? FALLBACK_IMAGE} variant="rounded" sx={{ width: 50, height: 50, borderRadius: "12px" }} />
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 800, fontSize: "0.9rem" }}>{item.name}</Typography>
            <Typography sx={{ fontSize: "0.7rem", color: "gray" }}>x{item.quantity} — ${Number(item.precio).toLocaleString("es-CO")}</Typography>
          </Box>
        </Box>
      ))}

      {config && (
        <Button
          fullWidth
          variant="contained"
          onClick={() => onAction?.(orderId, config.next)}
          sx={{
            bgcolor: config.color,
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 800,
            mt: 1,
            "&:hover": { bgcolor: config.hoverColor },
          }}
        >
          {config.label}
        </Button>
      )}
    </Box>
  );
}