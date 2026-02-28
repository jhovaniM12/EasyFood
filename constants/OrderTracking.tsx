import { Check, RefreshCw, UtensilsCrossed } from "lucide-react";

export const ORDER_TRACKING_COPY = {
    header: "Mi Carrito",
    summaryLabel: "Ver resumen del pedido",
} as const;

export interface TrackingStep {
    id: string;
    label: string;
    icon: React.ReactNode;
    state: "done" | "active" | "pending";
}

type OrderState = "recibido" | "confirmado" | "en_preparacion" | "listo" | "entregado" | "cancelado";

/**
 * Builds the 3-step progress array based on the real order status.
 */
export function buildOrderSteps(estado: OrderState): TrackingStep[] {
    const stateOrder: OrderState[] = ["confirmado", "en_preparacion", "listo"];
    const idx = stateOrder.indexOf(estado);
    // For delivered/cancelled or recibido, treat as beyond/before the steps
    const activeIdx = estado === "recibido" ? -1
        : estado === "entregado" ? 3
            : estado === "cancelado" ? -1
                : idx;

    return [
        {
            id: "confirmed",
            label: "CONFIRMADO",
            icon: <Check size={18} strokeWidth={3} className="text-white" />,
            state: activeIdx > 0 || estado === "entregado" ? "done" : activeIdx === 0 ? "active" : "pending",
        },
        {
            id: "queue",
            label: "EN COLA",
            icon: <RefreshCw size={16} className={activeIdx === 1 ? "text-white animate-spin" : activeIdx > 1 || estado === "entregado" ? "text-white" : "text-gray-400"} />,
            state: activeIdx > 1 || estado === "entregado" ? "done" : activeIdx === 1 ? "active" : "pending",
        },
        {
            id: "ready",
            label: "LISTO",
            icon: <UtensilsCrossed size={16} className={activeIdx >= 2 || estado === "entregado" ? "text-white" : "text-gray-400"} />,
            state: estado === "entregado" ? "done" : activeIdx >= 2 ? "active" : "pending",
        },
    ];
}

/**
 * Returns the status banner text based on the real order state.
 */
export function getStatusBannerInfo(estado: OrderState, posicionFila: number, tiempoEstimado: string) {
    switch (estado) {
        case "recibido":
            return { title: "Pedido recibido", desc: "Estamos procesando tu pedido", est: "Pronto será confirmado.", color: "bg-[#FFF3E0]", border: "border-[#FFE0B2]", iconBg: "bg-[#FF9800]" };
        case "confirmado":
            return { title: "Pedido confirmado", desc: `Estás en la posición ${posicionFila + 1} de la fila`, est: `Estimado: ${tiempoEstimado}`, color: "bg-[#E8F5E9]", border: "border-[#C8E6C9]", iconBg: "bg-[#4CAF50]" };
        case "en_preparacion":
            return { title: "Tu comida se está cocinando", desc: `Te encuentras en la posición ${posicionFila + 1} de la fila`, est: `Estimado: ${tiempoEstimado}`, color: "bg-[#E8F5E9]", border: "border-[#C8E6C9]", iconBg: "bg-[#4CAF50]" };
        case "listo":
            return { title: "¡Tu pedido está listo!", desc: "Acércate al punto de recogida", est: "Muestra tu código QR al recoger.", color: "bg-[#E3F2FD]", border: "border-[#BBDEFB]", iconBg: "bg-[#1976D2]" };
        case "entregado":
            return { title: "Pedido entregado", desc: "¡Gracias por tu compra!", est: "Esperamos que lo disfrutes.", color: "bg-[#E8F5E9]", border: "border-[#C8E6C9]", iconBg: "bg-[#4CAF50]" };
        case "cancelado":
            return { title: "Pedido cancelado", desc: "Este pedido fue cancelado", est: "El stock ha sido restaurado.", color: "bg-[#FFEBEE]", border: "border-[#FFCDD2]", iconBg: "bg-[#E53935]" };
        default:
            return { title: "Estado desconocido", desc: "", est: "", color: "bg-gray-100", border: "border-gray-200", iconBg: "bg-gray-400" };
    }
}
