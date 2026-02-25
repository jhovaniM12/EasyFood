"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, Bell } from "lucide-react";
import { ORDER_TRACKING_COPY } from "@/constants/OrderTracking";

export default function OrderTrackingHeader() {
    const router = useRouter();

    return (
        <div className="flex items-center justify-between px-2 pt-5 pb-3 bg-[#FDF4ED]">
            <button
                onClick={() => router.back()}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Volver"
            >
                <ChevronLeft size={24} className="text-gray-800" />
            </button>

            <h1 className="text-lg font-bold text-gray-900">
                {ORDER_TRACKING_COPY.header}
            </h1>

            <button className="p-1 rounded-full hover:bg-gray-100 transition-colors relative" aria-label="Notificaciones">
                <Bell size={22} className="text-[#E53935]" />
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#E53935]" />
            </button>
        </div>
    );
}
