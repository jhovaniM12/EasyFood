"use client";
import React from "react";
import { Box, Typography, Avatar, Switch } from "@mui/material";

export interface InventoryCardProps {
  id: number;
  name: string;
  price: string;
  disponible: boolean;
  stock: number;
  image: string | null;
  category: string | null;
  onToggle?: (id: number, newValue: boolean) => void;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=80";

export default function InventoryCard({
  id,
  name,
  price,
  disponible,
  stock,
  image,
  onToggle,
}: InventoryCardProps) {
  const displayPrice = price.startsWith("$") ? price : `$${price}`;
  const availabilityText = disponible ? "Disponible" : "Agotado";
  const statusColor = disponible ? "#E53935" : "#A0A0A0";
  const textColor = disponible ? "#2E7D32" : "#A0A0A0";

  return (
    <Box sx={{
      bgcolor: "white",
      borderRadius: "24px",
      p: 2,
      mb: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      opacity: disponible ? 1 : 0.8,
      transition: "opacity 0.3s ease"
    }}>
      {/* LADO IZQUIERDO: IMAGEN E INFO */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1, minWidth: 0 }}>
        <Avatar
          src={image ?? FALLBACK_IMAGE}
          variant="rounded"
          sx={{
            width: 65, height: 65, borderRadius: "18px",
            border: `2px solid ${statusColor}`,
            transition: "border 0.3s ease",
            flexShrink: 0,
          }}
        />
        <Box sx={{ minWidth: 0 }}>
          <Typography noWrap sx={{ fontWeight: 800, fontSize: "1rem", color: "#2D3142" }}>
            {name}
          </Typography>
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: textColor }}>
            {displayPrice} • {availabilityText}
          </Typography>
          <Typography sx={{ fontSize: "0.7rem", color: "#A0A0A0", fontWeight: 600 }}>
            Cantidad: {stock} unidades
          </Typography>
        </Box>
      </Box>

      {/* LADO DERECHO: CONTROL (SWITCH) */}
      <Box sx={{ textAlign: "center", display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <Switch
          checked={disponible}
          onChange={(e) => onToggle?.(id, e.target.checked)}
          color="error"
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': { color: '#E53935' },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#E53935' },
          }}
        />
        <Typography sx={{
          fontSize: "0.6rem", fontWeight: 900, color: statusColor,
          textTransform: "uppercase", letterSpacing: '0.5px'
        }}>
          {disponible ? "ACTIVO" : "INACTIVO"}
        </Typography>
      </Box>
    </Box>
  );
}