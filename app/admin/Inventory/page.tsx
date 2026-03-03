"use client";
import { useState, useEffect } from "react";
import { Box, Fab, CircularProgress } from "@mui/material";
import { Plus } from "lucide-react";
import AdminHeaderInventory from "@/components/admin/AdminHeaderInventory";
import InventoryList from "@/components/admin/InventoryList";
import { InventoryCardProps } from "@/components/admin/InventoryCard";

// DATOS DE EJEMPLO DE INVENTARIO (MOCK DATA)
const MOCK_PRODUCTS: InventoryCardProps[] = [
  // Almuerzos
  {
    id: 1,
    name: "Almuerzo Ejecutivo",
    price: 12500, // Número para el formateador
    availability: "Disponible",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200", // Hamburguesa de ejemplo
    initialStatus: true,
    category: "lunches"
  },
  {
    id: 2,
    name: "Bowl Saludable",
    price: "$14.000",
    availability: "Agotado",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200", // Ensalada de ejemplo
    initialStatus: false,
    category: "lunches"
  },
  // Bebidas
  {
    id: 3,
    name: "Coca-Cola 350ml",
    price: 3500,
    availability: "Disponible",
    image: "https://images.unsplash.com/photo-1629203851022-3726ec17d13d?w=200", // Coca Cola de ejemplo
    initialStatus: true,
    category: "drinks"
  },
  {
    id: 4,
    name: "Agua Mineral UAO",
    price: 2800,
    availability: "Disponible",
    image: "https://images.unsplash.com/photo-1596706059276-85750868f638?w=200", // Agua de ejemplo
    initialStatus: true,
    category: "drinks"
  },

];

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<InventoryCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos carga de base de datos
    const timer = setTimeout(() => {
      setProducts(MOCK_PRODUCTS);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
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
          <InventoryList products={products} />
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