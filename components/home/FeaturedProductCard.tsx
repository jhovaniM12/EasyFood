"use client";

import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import { Clock, Plus } from "lucide-react";

interface FeaturedProductCardProps {
    image: string;
    badge?: string;
    name: string;
    price: string;
    description: string;
    waitTime: string;
    onAdd?: () => void;
}

export default function FeaturedProductCard({
    image,
    badge = "MÁS VENDIDO",
    name,
    price,
    description,
    waitTime,
    onAdd,
}: FeaturedProductCardProps) {
    return (
        <div className="mx-2 bg-white rounded-2xl overflow-hidden shadow-md flex">
            {/* Imagen izquierda */}
            <div className="relative w-[130px] shrink-0">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                />
                {/* Badge "MÁS VENDIDO" con MUI Chip */}
                {badge && (
                    <div className="absolute top-2 left-2">
                        <Chip
                            label={badge}
                            size="small"
                            sx={{
                                backgroundColor: "#E53935",
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: "0.6rem",
                                height: "20px",
                                "& .MuiChip-label": { px: 1 },
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Contenido derecha */}
            <div className="flex flex-col flex-1 p-3 gap-1 relative">
                <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold text-gray-900 leading-tight pr-2">{name}</h3>
                    <span className="text-sm font-bold text-[#E53935] shrink-0">{price}</span>
                </div>

                <p className="text-xs text-gray-500 leading-snug">{description}</p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-2">
                    {/* Chip de tiempo de espera */}
                    <Chip
                        icon={<Clock size={11} color="#fff" />}
                        label={waitTime}
                        size="small"
                        sx={{
                            backgroundColor: "#E53935",
                            color: "#fff",
                            fontSize: "0.7rem",
                            fontWeight: 500,
                            height: "24px",
                            "& .MuiChip-icon": { color: "#fff", ml: 0.5 },
                            "& .MuiChip-label": { px: 1 },
                        }}
                    />
                    <IconButton
                        size="small"
                        onClick={onAdd}
                        sx={{
                            backgroundColor: "#E53935",
                            color: "#fff",
                            width: 28,
                            height: 28,
                            "&:hover": { backgroundColor: "#c62828" },
                            boxShadow: "0 2px 6px rgba(229,57,53,0.4)",
                        }}
                    >
                        <Plus size={16} />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
