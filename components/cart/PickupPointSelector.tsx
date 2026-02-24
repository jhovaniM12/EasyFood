"use client";

import { Store, UtensilsCrossed } from "lucide-react";
import { pickupPoints } from "@/constants/CartItems";

const ICONS: Record<string, React.ReactNode> = {
    store: <Store size={22} className="text-gray-400" />,
    utensils: <UtensilsCrossed size={22} className="text-gray-400" />,
};

interface PickupPointSelectorProps {
    selected: string | null;
    onSelect: (id: string) => void;
}

export default function PickupPointSelector({ selected, onSelect }: PickupPointSelectorProps) {
    return (
        <div className="px-4 mt-5">
            {/* Encabezado */}
            <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-gray-900">Punto de recogida</p>
                <span className="flex items-center gap-1 text-xs font-semibold text-[#E53935]">
                    📍 UAO Campus
                </span>
            </div>

            {/* Tarjetas */}
            <div className="flex gap-3">
                {pickupPoints.map((point) => {
                    const isActive = selected === point.id;
                    return (
                        <button
                            key={point.id}
                            onClick={() => onSelect(point.id)}
                            className={`flex-1 flex flex-col items-start gap-1 p-3 rounded-2xl bg-white shadow-sm border-2 transition-all ${isActive ? "border-[#E53935]" : "border-transparent"
                                }`}
                        >
                            {ICONS[point.icon]}
                            <p className="text-xs font-semibold text-gray-800 mt-1 text-left leading-tight">
                                {point.label}
                            </p>
                            <p className="text-[11px] text-gray-400">{point.waitTime}</p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
