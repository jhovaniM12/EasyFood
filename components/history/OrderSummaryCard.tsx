import { ChevronRight, ClipboardList } from "lucide-react";
import { ORDER_TRACKING_COPY } from "@/constants/OrderTracking";

interface OrderSummaryCardProps {
    itemCount: number;
    total: number;
}

function formatCOP(value: number) {
    return "$" + value.toLocaleString("es-CO");
}

export default function OrderSummaryCard({ itemCount, total }: OrderSummaryCardProps) {
    const articleLabel = itemCount === 1 ? "artículo" : "artículos";

    return (
        <div className="mx-4 mt-6 bg-white rounded-2xl shadow-sm px-4 py-4 flex items-center justify-between border border-gray-100">
            <div className="flex items-center gap-3">
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-[#FDF4ED] flex items-center justify-center">
                    <ClipboardList size={20} className="text-[#E53935]" />
                </div>

                {/* Labels */}
                <div>
                    <p className="text-sm font-semibold text-gray-900 leading-tight">
                        {ORDER_TRACKING_COPY.summaryLabel}
                    </p>
                    <p className="text-xs text-gray-400 leading-tight">
                        {itemCount} {articleLabel} • {formatCOP(total)}
                    </p>
                </div>
            </div>

            <ChevronRight size={20} className="text-gray-400" />
        </div>
    );
}
