"use client";
import { Box, Typography, IconButton, Badge } from "@mui/material"; // Añadimos Badge aquí
import { ChevronLeft, Bell } from "lucide-react";
import { OrderHistoryCard } from "@/components/history/OrderHistoryCard";

export default function HistoryPage() {
    const imgBurger = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80";
    const imgWater = "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&q=80";
    const imgSalad = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80";
    
    // Puedes cambiar este número dinámicamente luego
    const notificationCount = 1;

    return (
        <Box sx={{ bgcolor: "#FDF4ED", minHeight: "100vh", p: 3, pb: 10 }}>

            {/* Header Superior */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton sx={{ bgcolor: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                        <ChevronLeft size={20} color="#2D3142" />
                    </IconButton>
                    <Typography sx={{ fontWeight: 800, fontSize: "1.2rem", color: "#2D3142"}}>
                        Estado de los Pedidos
                    </Typography>
                </Box>

                {/* Notificaciones con Badge actualizado */}
                <IconButton aria-label="Notificaciones" size="small">
                    <Badge
                        badgeContent={notificationCount}
                        sx={{
                            "& .MuiBadge-badge": {
                                backgroundColor: "#E53935",
                                color: "#fff",
                                fontSize: "0.6rem",
                                minWidth: "16px",
                                height: "16px",  
                            },
                        }}
                    >
                        <Bell size={24} className="text-[#000000]" strokeWidth={2}/>
                    </Badge>
                </IconButton>
            </Box>

            {/* Sección: Pedidos en Curso */}
            <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#2D3142", mb: 2 }}>
                Pedidos en curso
            </Typography>
            <OrderHistoryCard 
                date="11 febrero, 9:41"
                status="EN CURSO"
                total="$18.100"
                items={[
                { image: imgBurger, quantity: 1 },
                { image: imgWater, quantity: 2 }
                ]}
            />

            {/* Sección: Historial */}
            <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#2D3142", mt: 4, mb: 2 }}>
                Historial de pedidos
            </Typography>
        
            <OrderHistoryCard 
                date="25 enero, 12:30 PM"
                status="COMPLETADO"
                total="$12.500"
                items={[{ image: imgBurger, quantity: 1 }]}
            />

            <OrderHistoryCard 
                date="10 enero, 9:30 AM"
                status="COMPLETADO"
                total="$15.200"
                items={[{ image: imgSalad, quantity: 1 }]}
            />

        </Box>
    );
}