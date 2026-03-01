import { Smartphone, Building2, Store } from "lucide-react";
import { PaymentMethod } from "@/components/cart/PaymentMethodSelector";

export interface PaymentOption {
    id: PaymentMethod;
    label: string;
    description: string;
    cardLabel: string;
    icon: React.ReactNode;
    iconBg: string;
}

export const PAYMENT_OPTIONS: PaymentOption[] = [
    {
        id: "nequi",
        label: "Nequi",
        description: "Pago directo con billetera",
        cardLabel: "Billetera Nequi",
        icon: <Smartphone size={22} className="text-[#6B21A8]" />,
        iconBg: "bg-purple-100",
    },
    {
        id: "pse",
        label: "PSE Banco Transferencia",
        description: "Soporta los bancos colombianos",
        cardLabel: "PSE Transferencia",
        icon: <Building2 size={22} className="text-[#1565C0]" />,
        iconBg: "bg-blue-100",
    },
    {
        id: "pago_local",
        label: "Pago en el Local",
        description: "Pagar al momento de la entrega",
        cardLabel: "Pago en Local",
        icon: <Store size={22} className="text-[#E53935]" />,
        iconBg: "bg-red-100",
    },
];
