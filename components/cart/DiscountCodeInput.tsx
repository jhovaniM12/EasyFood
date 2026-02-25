"use client";

import { useState } from "react";
import { Tag } from "lucide-react";

interface DiscountCodeInputProps {
    onApply?: (code: string) => void;
}

export default function DiscountCodeInput({ onApply }: DiscountCodeInputProps) {
    const [code, setCode] = useState("");

    const handleApply = () => {
        if (code.trim() && onApply) {
            onApply(code.trim());
        }
    };

    return (
        <div className="px-4 mt-4">
            <div className="flex items-center bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                {/* Tag icon inside input */}
                <div className="pl-3 pr-2 flex items-center">
                    <Tag size={18} className="text-[#4CAF50]" />
                </div>

                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Codigo de descuento"
                    className="flex-1 py-3 text-sm text-gray-500 placeholder-gray-400 bg-transparent outline-none"
                />

                <button
                    onClick={handleApply}
                    className="bg-[#E53935] text-white text-sm font-semibold px-5 py-3 transition-colors hover:bg-[#c62828] active:scale-95"
                >
                    Aplicar
                </button>
            </div>
        </div>
    );
}
