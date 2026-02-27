// components/history/OrderHistoryCard.tsx
import { Box, Typography, Button, Chip, AvatarGroup, Avatar } from "@mui/material";
import { FileText } from "lucide-react"; // O usa el icono de lista que prefieras
import Link from "next/link";

interface OrderItem {
  image: string;
  quantity: number;
}

interface OrderHistoryCardProps {
  date: string;
  status: "EN CURSO" | "COMPLETADO";
  items: OrderItem[];
  total: string;
  summaryHref?: string;
}

export const OrderHistoryCard = ({ date, status, items, total, summaryHref }: OrderHistoryCardProps) => {
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

      {/* Botón Resumen */}
      <Button
        fullWidth
        component={summaryHref ? Link : "button"}
        href={summaryHref}
        startIcon={<FileText size={18} />}
        sx={{
          bgcolor: isPending ? "#13EC37" : "#D94E41",
          color: isPending ? "#1A5D1A" : "white",
          borderRadius: 3,
          py: 1.2,
          fontWeight: "bold",
          textTransform: "none",
          "&:hover": { bgcolor: isPending ? "#A6E876" : "#C13E32" }
        }}
      >
        Resumen del pedido
      </Button>
    </Box>
  );
};