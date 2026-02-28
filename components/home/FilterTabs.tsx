"use client";

import { Category } from "@/services/catalog/CatalogService";

interface FilterTabsProps {
    categories: Category[];
    selected?: number;
    onSelect?: (id: number | undefined) => void;
}

export default function FilterTabs({ categories, selected, onSelect }: FilterTabsProps) {
    return (
        <div className="px-4 py-2 bg-[#FDF4ED]">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
                <button
                    onClick={() => onSelect?.(undefined)}
                    className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${!selected ? "bg-[#E53935] text-white shadow-sm" : "bg-white text-gray-700 border border-gray-200"}`}
                >
                    Todos
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => onSelect?.(cat.id)}
                        className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selected === cat.id ? "bg-[#E53935] text-white shadow-sm" : "bg-white text-gray-700 border border-gray-200"}`}
                    >
                        {cat.nombre}
                    </button>
                ))}
            </div>
        </div>
    );
}
