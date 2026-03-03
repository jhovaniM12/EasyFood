"use client";
import React, { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import InventoryCard, { InventoryCardProps } from "./InventoryCard";

interface InventoryListProps {
  products: InventoryCardProps[];
  categories: string[];
  onToggle: (id: number, newValue: boolean) => void;
}

export default function InventoryList({ products, categories, onToggle }: InventoryListProps) {
  const [tab, setTab] = useState(0);

  const activeCategory = categories[tab] ?? null;

  const filtered = activeCategory === "Todos"
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* BLOQUE BLANCO DE TABS */}
      <Box sx={{ bgcolor: 'white', px: 1, pb: 1, borderRadius: "0 0 24px 24px", zIndex: 5, boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{ sx: { bgcolor: "#E53935", height: 3 } }}
        >
          {categories.map((cat) => (
            <Tab key={cat} label={cat} sx={{ fontWeight: 800, fontSize: '0.7rem', textTransform: 'capitalize', minWidth: 'auto', px: 2 }} />
          ))}
        </Tabs>
      </Box>

      {/* CONTENIDO SCROLLABLE */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2, pb: 15 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, mt: 1 }}>
          <Typography sx={{ fontWeight: 900, fontSize: '1.2rem', color: '#2D3142' }}>
            {activeCategory === "Todos" ? "Todos los productos" : activeCategory}
          </Typography>
          <Typography sx={{ fontSize: '0.6rem', color: '#A0A0A0', fontWeight: 900, textTransform: "uppercase" }}>
            {filtered.length} PRODUCTOS
          </Typography>
        </Box>

        {filtered.length > 0 ? (
          filtered.map(product => <InventoryCard key={product.id} {...product} onToggle={onToggle} />)
        ) : (
          <Typography sx={{ textAlign: 'center', mt: 10, color: '#A0A0A0', fontWeight: 700 }}>
            No hay productos en esta categoría
          </Typography>
        )}
      </Box>
    </Box>
  );
}