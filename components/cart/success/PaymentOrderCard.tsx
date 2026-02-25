import { SUCCESS_COPY } from "@/constants/PaymentSuccess";
import { PAYMENT_OPTIONS } from "@/constants/PaymentOptions";
import { PaymentMethod } from "@/components/cart/PaymentMethodSelector";

interface PaymentOrderCardProps {
    orderNumber: string;
    total: number;
    paymentMethod: PaymentMethod;
}

function formatCOP(value: number) {
    return "$" + value.toLocaleString("es-CO");
}

export default function PaymentOrderCard({
    orderNumber,
    total,
    paymentMethod,
}: PaymentOrderCardProps) {
    const option = PAYMENT_OPTIONS.find((o) => o.id === paymentMethod);

    return (
        <div className="mx-4 bg-white rounded-3xl shadow-sm overflow-hidden">
            {/* Row: Número de Pedido */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <span className="text-sm text-gray-500">
                    {SUCCESS_COPY.rows.orderNumber}
                </span>
                <span className="text-sm font-extrabold text-gray-900 tracking-wide">
                    {orderNumber}
                </span>
            </div>

            {/* Row: Total Pagado */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <span className="text-sm text-gray-500">
                    {SUCCESS_COPY.rows.totalPaid}
                </span>
                <span className="text-sm font-extrabold text-gray-900">
                    {formatCOP(total)}
                </span>
            </div>

            {/* Row: Método de Pago */}
            <div className="flex items-center justify-between px-5 py-4">
                <span className="text-sm text-gray-500">
                    {SUCCESS_COPY.rows.paymentMethod}
                </span>
                <div className="flex items-center gap-2">
                    {option && (
                        <div
                            className={`w-6 h-6 rounded-md flex items-center justify-center ${option.iconBg}`}
                        >
                            <span className="scale-75">{option.icon}</span>
                        </div>
                    )}
                    <span className="text-sm font-semibold text-gray-900">
                        {option?.cardLabel ?? paymentMethod}
                    </span>
                </div>
            </div>
        </div>
    );
}
