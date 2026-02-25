import { Check, RefreshCw, UtensilsCrossed } from "lucide-react";

export const ORDER_TRACKING_COPY = {
    header: "Mi Carrito",
    confirmed: "ORDEN CONFIRMADA",
    cookingTitle: "Tu comida se está cocinando",
    cookingDesc: "Usted se encuentra de 5° en la fila",
    cookingEst: "Estimado: 5-9 minutos para entrega.",
    summaryLabel: "Ver resumen del pedido",
} as const;

export interface TrackingStep {
    id: string;
    label: string;
    icon: React.ReactNode;
    state: "done" | "active" | "pending";
}

export const ORDER_STEPS: TrackingStep[] = [
    {
        id: "confirmed",
        label: "CONFIRMADO",
        icon: <Check size={18} strokeWidth={3} className="text-white" />,
        state: "done",
    },
    {
        id: "queue",
        label: "EN COLA",
        icon: <RefreshCw size={16} className="text-white animate-spin" />,
        state: "active",
    },
    {
        id: "ready",
        label: "LISTO",
        icon: <UtensilsCrossed size={16} className="text-gray-400" />,
        state: "pending",
    },
];
