"use client";

import { Store } from "lucide-react";
import { Restaurant } from "@/services/catalog/CatalogService";

interface PickupPointSelectorProps {
    restaurants: Restaurant[];
    selected: number | null;
    onSelect: (id: number) => void;
}

export default function PickupPointSelector({ restaurants, selected, onSelect }: PickupPointSelectorProps) {
    return (
        <div className="px-4 mt-5">
            <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-gray-900">Punto de recogida</p>
                <span className="flex items-center gap-1 text-xs font-semibold text-[#E53935]">📍 UAO Campus</span>
            </div>
            <div className="flex gap-3">
                {restaurants.map((r) => {
                    const isActive = selected === r.id;
                    return (
                        <button
                            key={r.id}
                            onClick={() => onSelect(r.id)}
                            className={`flex-1 flex flex-col items-start gap-1 p-3 rounded-2xl bg-white shadow-sm border-2 transition-all ${isActive ? "border-[#E53935]" : "border-transparent"}`}
                        >
                            <Store size={22} className="text-gray-400" />
                            <p className="text-xs font-semibold text-gray-800 mt-1 text-left leading-tight">{r.nombre}</p>
                            <p className="text-[11px] text-gray-400">{r.ubicacion}</p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
