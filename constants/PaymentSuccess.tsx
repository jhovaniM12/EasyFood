import { CheckCircle2 } from "lucide-react";

export const SUCCESS_COPY = {
    title: "¡Pago Exitoso!",
    subtitle: "Tu pedido ya está en camino a la cocina",
    trackLabel: "Seguir mi pedido",
    backLabel: "Volver al inicio",
    rows: {
        orderNumber: "Número de Pedido",
        totalPaid: "Total Pagado",
        paymentMethod: "Método de Pago",
    },
} as const;

export const SUCCESS_ICON = <CheckCircle2 size={40} className="text-white" />;
