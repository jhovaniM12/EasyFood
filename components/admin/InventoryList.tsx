"use client";
import React, { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import InventoryCard, { InventoryCardProps } from "./InventoryCard";

interface InventoryListProps {
  products: InventoryCardProps[];
}

// Mapeo para los nombres legibles de categorías
const CATEGORY_LABELS = {
    lunches: "Lista de Almuerzos",
    drinks: "Lista de Bebidas",
    snacks: "Lista de Snacks",
    desserts: "Lista de Postres"
};

export default function InventoryList({ products }: InventoryListProps) {
  const [tab, setTab] = useState(0);

  // Definimos las categorías en el mismo orden que las Tabs
  const categories: (keyof typeof CATEGORY_LABELS)[] = ["lunches", "drinks", "snacks", "desserts"];
  
  // Filtramos los productos según la pestaña seleccionada
  const filtered = products.filter(p => p.category === categories[tab]);

  // Contadores para el diseño
  const counts = {
    lunches: products.filter(p=>p.category === 'lunches').length,
    drinks: products.filter(p=>p.category === 'drinks').length,
    snacks: products.filter(p=>p.category === 'snacks').length,
    desserts: products.filter(p=>p.category === 'desserts').length,
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* BLOQUE BLANCO DE TABS */}
      <Box sx={{ bgcolor: 'white', px: 2, pb: 1, borderRadius: "0 0 24px 24px", zIndex: 5, boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth" TabIndicatorProps={{ sx: { bgcolor: "#E53935", height: 3 } }}>
          <Tab label="Almuerzos" sx={{ fontWeight: 800, fontSize: '0.7rem', textTransform: 'capitalize' }} />
          <Tab label="Bebidas" sx={{ fontWeight: 800, fontSize: '0.7rem', textTransform: 'capitalize' }} />
          <Tab label="Snacks" sx={{ fontWeight: 800, fontSize: '0.7rem', textTransform: 'capitalize' }} />
          <Tab label="Postres" sx={{ fontWeight: 800, fontSize: '0.7rem', textTransform: 'capitalize' }} />
        </Tabs>
      </Box>

      {/* CONTENIDO SCROLLABLE */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2, pb: 15 /* Espacio para el BottomNav */ }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, mt: 1 }}>
            <Typography sx={{ fontWeight: 900, fontSize: '1.2rem', color: '#2D3142' }}>
                {CATEGORY_LABELS[categories[tab]]}
            </Typography>
            <Typography sx={{ fontSize: '0.6rem', color: '#A0A0A0', fontWeight: 900, textTransform: "uppercase" }}>
              {counts[categories[tab]]} PRODUCTOS
            </Typography>
        </Box>

        {filtered.length > 0 ? (
          filtered.map(product => <InventoryCard key={product.id} {...product} />)
        ) : (
          <Typography sx={{ textAlign: 'center', mt: 10, color: '#A0A0A0', fontWeight: 700 }}>
            No hay productos en esta categoría
          </Typography>
        )}
      </Box>
    </Box>
  );
}