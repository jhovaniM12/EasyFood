"use client";
import { useEffect, useState } from 'react';
import AdminBottomNav from "@/components/admin/AdminBottomNav";
import { Box } from "@mui/material";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Aseguramos que el menú solo se renderice en el cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100dvh', // Usamos 100dvh para evitar problemas en móviles
      overflow: 'hidden' 
    }}>
      {/* El contenido de tus páginas (Pedidos, Inventario, etc.) */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        {children}
      </Box>

      {/* Solo mostramos el menú cuando el cliente esté listo */}
      {mounted && <AdminBottomNav />}
    </Box>
  );
}