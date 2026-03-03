"use client";
import React from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import { Search } from "lucide-react";

export default function AdminHeaderInventory() {
  return (
    <Box sx={{ flexShrink: 0, bgcolor: 'white', px: 2, pt: 3, pb: 1, zIndex: 10 }}>
      <Box sx={{ display: 'flex', alignItems: 'center',  justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
         
          <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0.5}}>
            <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#2D3142' }}>
              Inventario Admin
            </Typography>
            <Typography sx={{fontSize: '0.7rem', color: '#E53935', fontWeight: 800, textTransform: "uppercase"}}>
              Gestión de Productos • UAO
            </Typography>
          </Box>
        </Box>
        
      </Box>
    </Box>
  );
}