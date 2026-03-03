"use client";
import React, { useState } from "react";
import { Box, Typography, Avatar, Switch } from "@mui/material";


export interface InventoryCardProps {
  id: string | number;
  name: string;
  price: string | number;
  availability: "Disponible" | "Agotado";
  image: string;
  initialStatus: boolean;
  category: "lunches" | "drinks" | "snacks" | "desserts";
}

export default function InventoryCard({ 
  name, 
  price, 
  image, 
  initialStatus 
}: InventoryCardProps) {

  const [isActive, setIsActive] = useState(initialStatus);

  const displayPrice = typeof price === 'string' && price.startsWith('$') 
    ? price 
    : `$${price}`;
  const availabilityText = isActive ? "Disponible" : "Agotado";
  const statusColor = isActive ? "#E53935" : "#A0A0A0"; // Rojo activo, Gris inactivo
  const textColor = isActive ? "#2E7D32" : "#A0A0A0";   // Verde disponible, Gris agotado

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
      opacity: isActive ? 1 : 0.8, // Se opaca un poco si está inactivo
      transition: "opacity 0.3s ease"
    }}>
      {/* LADO IZQUIERDO: IMAGEN E INFO */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar 
          src={image} 
          variant="rounded" 
          sx={{ 
            width: 65, 
            height: 65, 
            borderRadius: "18px", 
            border: `2px solid ${statusColor}`, // El borde de la foto reacciona al switch
            transition: "border 0.3s ease"
          }} 
        />
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: "1rem", color: "#2D3142" }}>
            {name}
          </Typography>
          
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: textColor }}>
            {displayPrice} • {availabilityText}
          </Typography>
          
          <Typography sx={{ fontSize: "0.7rem", color: "#A0A0A0", fontWeight: 600 }}>
            Cantidad: {isActive ? "12 unidades" : "0 unidades"}
          </Typography>
        </Box>
      </Box>

      {/* LADO DERECHO: CONTROL (SWITCH) */}
      <Box sx={{ textAlign: "center", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Switch 
          checked={isActive} 
          onChange={(e) => setIsActive(e.target.checked)}
          color="error" // Usa el color rojo del tema
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: '#E53935',
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#E53935',
            },
          }}
        />
        <Typography 
          sx={{ 
            fontSize: "0.6rem", 
            fontWeight: 900, 
            color: statusColor, 
            textTransform: "uppercase",
            letterSpacing: '0.5px'
          }}
        >
          {isActive ? "ACTIVO" : "INACTIVO"}
        </Typography>
      </Box>
    </Box>
  );
}