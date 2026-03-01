"use client";

import { Store } from "lucide-react";
import { Restaurant } from "@/services/catalog/CatalogService";

interface PickupPointSelectorProps {
    restaurants: Restaurant[];
    selected: number;
}

export default function PickupPointSelector({ restaurants, selected }: PickupPointSelectorProps) {
    const r = restaurants.find((res) => res.id === selected);
    if (!r) return null;

    return (
        <div className="px-4 mt-5">
            <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-gray-900">Punto de recogida</p>
                <span className="flex items-center gap-1 text-xs font-semibold text-[#E53935]">📍 UAO Campus</span>
            </div>
            <div className="flex gap-3">
                <div
                    className="flex-1 flex flex-col items-start gap-1 p-3 rounded-2xl bg-[#FFEBEE] shadow-sm border-2 border-[#E53935]"
                >
                    <Store size={22} className="text-[#E53935]" />
                    <p className="text-xs font-semibold text-gray-900 mt-1 text-left leading-tight line-clamp-2">{r.nombre}</p>
                    <p className="text-[11px] text-gray-500 line-clamp-2">{r.ubicacion}</p>
                </div>
            </div>
        </div>
    );
}
