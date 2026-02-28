"use client";

import IconButton from "@mui/material/IconButton";
import { X, Minus, Plus } from "lucide-react";
import { CartItem as CartItemType } from "@/contexts/CartContext";

interface CartItemProps {
    item: CartItemType;
    onRemove: (id: number) => void;
    onIncrement: (id: number) => void;
    onDecrement: (id: number) => void;
}

export default function CartItem({ item, onRemove, onIncrement, onDecrement }: CartItemProps) {
    return (
        <div className="mx-4 bg-white rounded-2xl shadow-sm p-3 flex gap-3 items-start">
            {/* Imagen */}
            <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-xl object-cover shrink-0"
            />

            {/* Contenido */}
            <div className="flex-1 min-w-0">
                {/* Fila nombre + botón eliminar */}
                <div className="flex items-start justify-between">
                    <p className="text-sm font-bold text-gray-900 leading-tight pr-1">{item.name}</p>
                    <IconButton
                        size="small"
                        onClick={() => onRemove(item.id)}
                        aria-label="Eliminar"
                        sx={{ p: 0.2, color: "#9CA3AF", "&:hover": { color: "#E53935" } }}
                    >
                        <X size={16} />
                    </IconButton>
                </div>

                {/* Descripción */}
                <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>

                {/* Fila precio + controles cantidad */}
                <div className="flex items-center justify-between mt-2">
                    <span className="text-base font-bold text-[#E53935]">{item.priceLabel}</span>

                    {/* Controles +/- */}
                    <div className="flex items-center gap-2">
                        <IconButton
                            size="small"
                            onClick={() => onDecrement(item.id)}
                            aria-label="Disminuir cantidad"
                            sx={{
                                width: 28, height: 28,
                                border: "1.5px solid #E5E7EB",
                                borderRadius: "50%",
                                color: "#6B7280",
                                "&:hover": { borderColor: "#E53935", color: "#E53935" },
                            }}
                        >
                            <Minus size={14} />
                        </IconButton>

                        <span className="text-sm font-semibold text-gray-800 w-4 text-center">
                            {item.quantity}
                        </span>

                        <IconButton
                            size="small"
                            onClick={() => onIncrement(item.id)}
                            aria-label="Aumentar cantidad"
                            sx={{
                                width: 28, height: 28,
                                backgroundColor: "#E53935",
                                borderRadius: "50%",
                                color: "#fff",
                                "&:hover": { backgroundColor: "#c62828" },
                                boxShadow: "0 2px 6px rgba(229,57,53,0.4)",
                            }}
                        >
                            <Plus size={14} />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
