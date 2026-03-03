"use client";
import { useState, useEffect, useCallback } from "react";
import { Box, Fab, CircularProgress } from "@mui/material";
import { Plus } from "lucide-react";
import AdminHeaderInventory from "@/components/admin/AdminHeaderInventory";
import InventoryList from "@/components/admin/InventoryList";
import { InventoryCardProps } from "@/components/admin/InventoryCard";
import { adminService, AdminProduct } from "@/services/admin/AdminService";

function formatCOP(value: number) {
  return "$" + value.toLocaleString("es-CO");
}

function mapProductToCard(p: AdminProduct): InventoryCardProps {
  return {
    id: p.id,
    name: p.nombre,
    price: formatCOP(Number(p.precio)),
    disponible: p.disponible,
    stock: p.stock,
    image: p.imagenUrl,
    category: p.categoria,
  };
}

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<InventoryCardProps[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getProducts()
      .then(({ data }) => {
        const cards = data.map(mapProductToCard);
        setProducts(cards);

        // Build unique category list from real data
        const uniqueCats = Array.from(new Set(data.map(p => p.categoria ?? "Sin categoría")));
        setCategories(["Todos", ...uniqueCats]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = useCallback(async (id: number, newValue: boolean) => {
    try {
      await adminService.updateProduct(id, { disponible: newValue });
      setProducts(prev =>
        prev.map(p => p.id === id ? { ...p, disponible: newValue } : p)
      );
    } catch (err) {
      console.error("Error al actualizar producto:", err);
    }
  }, []);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100dvh',
      bgcolor: "#FDF4ED"
    }}>
      {/* 1. Header Fijo para Inventario */}
      <AdminHeaderInventory />

      {/* 2. Lista de productos y tabs */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <CircularProgress sx={{ color: '#E53935' }} />
        </Box>
      ) : (
        <InventoryList products={products} categories={categories} onToggle={handleToggle} />
      )}

      {/* 3. Botón Flotante de Acción (FAB) - El (+) */}
      <Fab
        color="error"
        aria-label="add"
        sx={{
          position: 'absolute',
          bottom: '100px',
          right: '24px',
          bgcolor: "#E53935",
          width: 60,
          height: 60,
          boxShadow: '0 8px 25px rgba(229, 57, 53, 0.4)',
          '&:hover': { bgcolor: "#c62828" }
        }}
      >
        <Plus size={30} color="white" strokeWidth={2.5} />
      </Fab>

    </Box>
  );
}