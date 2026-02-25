"use client";
import { Box, Typography, IconButton, Badge } from "@mui/material";
import { ChevronLeft, Bell, CheckCircle2 } from "lucide-react";
import RestaurantSection from "@/components/home/RestaurantSection";

export default function OrderSummaryPage() {
    const notificationCount = 1;
    return (
        <Box sx={{ bgcolor: "#FDF4ED", minHeight: "100vh", p: 3, pb: 10 }}>
        
            {/* Header idéntico al Historial */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton sx={{ bgcolor: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                        <ChevronLeft size={20} color="#2D3142" />
                    </IconButton>

                    <Typography sx={{ fontWeight: 800, fontSize: "1.2rem", color: "#2D3142"}}>
                        Resumen del pedido
                    </Typography>
                </Box>
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

            {/* Título de la Orden */}
            <Box sx={{ textAlign: 'center', my: 4 }}>
                <Typography sx={{ color: 'gray', fontWeight: 700, fontSize: '0.8rem', letterSpacing: 1 }}>ORDEN:</Typography>
                <Typography sx={{ color: '#2D3142', fontWeight: 900, fontSize: '2rem' }}>EF-UAO-123</Typography>
            </Box>

            {/* REUTILIZANDO RestaurantSection para el producto */}
            <RestaurantSection name="" location="" showLocation={false}>
                <Box sx={{ 
                    bg: 'white', 
                    borderRadius: '24px', 
                    p: 2, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    border: '1px solid #FFD6D2',
                    bgcolor: 'white'
                }}>
                    <img 
                        src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80" 
                        className="w-20 h-20 rounded-2xl object-cover"
                    />
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 800, color: '#2D3142' }}>Hamburguesa especial UAO</Typography>
                        <Typography sx={{ fontSize: '0.75rem', color: 'gray' }}>Queso extra, sin cebolla</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, alignItems: 'center' }}>
                            <Typography sx={{ fontWeight: 800, color: '#D94E41' }}>$12.500</Typography>
                            <Typography sx={{ fontWeight: 800, color: '#2D3142' }}>x1</Typography>
                        </Box>
                    </Box>
                </Box>
            </RestaurantSection>

            {/* Sección Total */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, my: 5 }}>
                <Typography sx={{ fontWeight: 900, fontSize: '1.2rem', color: '#2D3142' }}>TOTAL:</Typography>
                <Typography sx={{ fontWeight: 900, fontSize: '1.3rem', color: '#D94E41' }}>$12.500</Typography>
            </Box>

            {/* Instrucción y QR */}
            <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: '#2D3142', maxWidth: '200px' }}>
                    Muestra este código al llegar a la barra
                </Typography>
                
                {/* Contenedor del QR */}
                <Box sx={{ 
                    bgcolor: 'white', 
                    p: 2, 
                    borderRadius: '20px', 
                    border: '3px solid #D94E41',
                    boxShadow: '0 10px 20px rgba(217, 78, 65, 0.2)'
                    }}>
                        <img src="/qr-placeholder.png" alt="QR Code" className="w-32 h-32" />
                </Box>

                {/* Badge de Validación */}
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    bgcolor: '#FFF2F1', 
                    px: 2, 
                    py: 0.5, 
                    borderRadius: '10px' 
                    }}>
                        <CheckCircle2 size={16} className="text-[#D94E41]" />
                        <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, color: '#D94E41', letterSpacing: 1 }}>
                            VALIDACIÓN UAO
                        </Typography>
                </Box>
            </Box>

        </Box>
    );
}