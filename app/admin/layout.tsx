"use client";
import AdminBottomNav from "@/components/admin/AdminBottomNav";
import RouteGuard from "@/components/shared/RouteGuard";
import { Box } from "@mui/material";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard allowedRoles={["admin", "colaborador"]}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        overflow: 'hidden'
      }}>
        {/* El contenido de tus páginas (Pedidos, Inventario, etc.) */}
        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          {children}
        </Box>

        {/* Menú inferior del admin */}
        <AdminBottomNav />
      </Box>
    </RouteGuard>
  );
}