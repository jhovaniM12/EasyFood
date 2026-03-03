"use client";
import { Box, Typography, Avatar, IconButton, Badge } from "@mui/material";
import { Bell } from "lucide-react";

export default function AdminHeader() {
  return (
    <Box sx={{ flexShrink: 0, bgcolor: 'white', borderRadius: "24px 24px 0 0", zIndex: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <Box sx={{ p: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar 
            src="/admin-avatar.png" 
            sx={{ width: 45, height: 45, border: "2px solid #E53935" }} 
          />
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: "1rem", color: "#2D3142" }}>
              Admin EasyFood UAO
            </Typography>
            <Typography sx={{ fontSize: "0.7rem", color: "#E53935", fontWeight: 700 }}>
              CHEF PRINCIPAL • EN TURNO
            </Typography>
          </Box>
        </Box>
        
        <IconButton sx={{ 
          bgcolor: "#E53935", 
          color: "white",
          '&:hover': { bgcolor: '#d32f2f' } 
        }}>
          <Badge badgeContent={4} color="error">
            <Bell size={20} />
          </Badge>
        </IconButton>
      </Box>
    </Box>
  );
}