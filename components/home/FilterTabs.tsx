"use client";

import { useState } from "react";

const CATEGORIES = ["Recomendados", "Desayunos", "Veganas", "Postres"];

export default function FilterTabs() {
    const [active, setActive] = useState("Recomendados");

    return (
        <div className="px-4 py-2 bg-[#FDF4ED]">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActive(cat)}
                        className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${active === cat
                            ? "bg-[#E53935] text-white shadow-sm"
                            : "bg-white text-gray-700 border border-gray-200"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
}
