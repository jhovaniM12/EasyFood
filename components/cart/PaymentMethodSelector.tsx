"use client";

import { PAYMENT_OPTIONS } from "@/constants/PaymentOptions";

export type PaymentMethod = "nequi" | "pse" | "pago_local";



interface PaymentMethodSelectorProps {
    selected: PaymentMethod | null;
    onSelect: (method: PaymentMethod) => void;
}

export default function PaymentMethodSelector({
    selected,
    onSelect,
}: PaymentMethodSelectorProps) {
    return (
        <div className="px-4 mt-4 flex flex-col gap-3">
            <p className="text-sm font-semibold text-gray-700">
                Selecciona el metodo de pago
            </p>

            {PAYMENT_OPTIONS.map((option) => {
                const isSelected = selected === option.id;
                return (
                    <button
                        key={option.id}
                        onClick={() => onSelect(option.id)}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-2xl bg-white border-2 transition-all duration-200 shadow-sm ${isSelected
                            ? "border-[#E53935] shadow-md"
                            : "border-transparent"
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            {/* Icon */}
                            <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center ${option.iconBg}`}
                            >
                                {option.icon}
                            </div>

                            {/* Labels */}
                            <div className="text-left">
                                <p className="text-sm font-semibold text-gray-900 leading-tight">
                                    {option.label}
                                </p>
                                <p className="text-xs text-gray-400 leading-tight">
                                    {option.description}
                                </p>
                            </div>
                        </div>

                        {/* Radio indicator */}
                        <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${isSelected
                                ? "border-[#E53935]"
                                : "border-gray-300"
                                }`}
                        >
                            {isSelected && (
                                <div className="w-2.5 h-2.5 rounded-full bg-[#E53935]" />
                            )}
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
