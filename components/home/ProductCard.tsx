"use client";

import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import { Clock, Plus } from "lucide-react";

interface ProductCardProps {
    image: string;
    name: string;
    description: string;
    price: string;
    waitTime: string;
    onAdd?: () => void;
}

export default function ProductCard({
    image,
    name,
    description,
    price,
    waitTime,
    onAdd,
}: ProductCardProps) {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-md flex flex-col">
            {/* Imagen con badge de precio */}
            <div className="relative">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-[110px] object-cover"
                />
                {/* Badge de precio con MUI Chip */}
                <div className="absolute bottom-2 right-2">
                    <Chip
                        label={price}
                        size="small"
                        sx={{
                            backgroundColor: "#E53935",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "0.65rem",
                            height: "20px",
                            "& .MuiChip-label": { px: 1 },
                        }}
                    />
                </div>
            </div>

            {/* Info */}
            <div className="p-2.5 flex flex-col gap-1 flex-1">
                <p className="text-xs font-bold text-gray-900 leading-tight line-clamp-1">{name}</p>
                <p className="text-[11px] text-gray-400 leading-snug line-clamp-1">{description}</p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-1">
                    <span className="flex items-center gap-1 text-[11px] text-gray-500">
                        <Clock size={11} className="text-gray-400" />
                        {waitTime}
                    </span>
                    <IconButton
                        size="small"
                        onClick={onAdd}
                        sx={{
                            backgroundColor: "#E53935",
                            color: "#fff",
                            width: 24,
                            height: 24,
                            "&:hover": { backgroundColor: "#c62828" },
                            boxShadow: "0 1px 4px rgba(229,57,53,0.35)",
                        }}
                    >
                        <Plus size={13} />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
