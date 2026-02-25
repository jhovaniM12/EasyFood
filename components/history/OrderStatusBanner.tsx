import { UtensilsCrossed } from "lucide-react";
import { ORDER_TRACKING_COPY } from "@/constants/OrderTracking";

export default function OrderStatusBanner() {
    return (
        <div className="mx-4 mt-4 bg-[#E8F5E9] rounded-2xl px-4 py-4 flex items-start gap-3 border border-[#C8E6C9]">
            {/* Fork icon circle */}
            <div className="w-10 h-10 rounded-xl bg-[#4CAF50] flex items-center justify-center flex-shrink-0 mt-0.5">
                <UtensilsCrossed size={20} className="text-white" />
            </div>

            <div>
                <p className="text-sm font-bold text-gray-900 leading-tight">
                    {ORDER_TRACKING_COPY.cookingTitle}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                    {ORDER_TRACKING_COPY.cookingDesc}
                </p>
                <p className="text-xs text-gray-500 leading-snug">
                    {ORDER_TRACKING_COPY.cookingEst}
                </p>
            </div>
        </div>
    );
}
