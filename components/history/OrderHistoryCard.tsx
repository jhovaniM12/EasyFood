// components/history/OrderHistoryCard.tsx
import { Box, Typography, Button, Chip, AvatarGroup, Avatar } from "@mui/material";
import { FileText, Truck } from "lucide-react"; // O usa el icono de lista que prefieras
import Link from "next/link";

interface OrderItem {
  image: string;
  quantity: number;
}

interface OrderHistoryCardProps {
  date: string;
  status: "EN CURSO" | "COMPLETADO" | "LISTO" | "CANCELADO";
  items: OrderItem[];
  total: string;
  summaryHref?: string;
  trackingHref?: string;
}

export const OrderHistoryCard = ({ date, status, items, total, summaryHref, trackingHref }: OrderHistoryCardProps) => {
  const isPending = status === "EN CURSO";

  return (
    <Box sx={{
      bgcolor: "white",
      borderRadius: 6,
      p: 2.5,
      mb: 3,
      boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
    }}>
      {/* Header: Fecha y Status */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography sx={{ fontSize: "0.75rem", color: "#9DA3B4", fontWeight: 600 }}>
          {date}
        </Typography>
        <Chip
          label={status}
          size="small"
          sx={{
            bgcolor: isPending ? "#13EC37" : "#F5F5F5",
            color: isPending ? "#1A5D1A" : "#9DA3B4",
            fontWeight: 800,
            fontSize: "0.65rem",
            borderRadius: 2
          }}
        />
      </Box>

      {/* Cuerpo: Fotos y Total */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          {items.map((item, idx) => (
            <Box key={idx} sx={{ position: "relative" }}>
              <Avatar
                src={item.image}
                variant="rounded"
                sx={{ width: 60, height: 60, borderRadius: 3 }}
              />
              <Box sx={{
                position: "absolute", bottom: -5, right: -5,
                bgcolor: "#D94E41", color: "white",
                borderRadius: "50%", width: 20, height: 20,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.6rem", fontWeight: "bold", border: "2px solid white"
              }}>
                x{item.quantity}
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ textAlign: "right" }}>
          <Typography sx={{ fontSize: "0.8rem", color: "#2D3142", fontWeight: 600 }}>TOTAL:</Typography>
          <Typography sx={{ fontSize: "1.1rem", color: "#D94E41", fontWeight: 800 }}>{total}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1.25 }}>
        {trackingHref && (
          <Button
            fullWidth
            component={Link}
            href={trackingHref}
            startIcon={<Truck size={16} />}
            sx={{
              width: "100%",
              minHeight: 44,
              bgcolor: isPending ? "#13EC37" : "#D94E41",
              color: isPending ? "#1A5D1A" : "white",
              borderRadius: 3,
              py: 0.9,
              fontWeight: "bold",
              fontSize: "0.85rem",
              textTransform: "none",
              "&:hover": { bgcolor: isPending ? "#A6E876" : "#C13E32" }
            }}
          >
            Seguimiento de producto
          </Button>
        )}

        <Button
          fullWidth
          component={summaryHref ? Link : "button"}
          href={summaryHref}
          startIcon={<FileText size={18} />}
          sx={{
            width: "100%",
            minHeight: 44,
            bgcolor: "transparent",
            color: isPending ? "#1A5D1A" : "#D94E41",
            border: isPending ? "1.5px solid #13EC37" : "1.5px solid #D94E41",
            borderRadius: 3,
            py: 1.2,
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": { bgcolor: isPending ? "#E9FBEF" : "#FFF2F1" }
          }}
        >
          Resumen del pedido
        </Button>
      </Box>
    </Box>
  );
};