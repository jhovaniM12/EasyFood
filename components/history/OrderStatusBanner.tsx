import { UtensilsCrossed } from "lucide-react";

interface OrderStatusBannerProps {
    title: string;
    desc: string;
    est: string;
    color: string;
    border: string;
    iconBg: string;
}

export default function OrderStatusBanner({ title, desc, est, color, border, iconBg }: OrderStatusBannerProps) {
    return (
        <div className={`mx-4 mt-4 ${color} rounded-2xl px-4 py-4 flex items-start gap-3 border ${border}`}>
            <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <UtensilsCrossed size={20} className="text-white" />
            </div>
            <div>
                <p className="text-sm font-bold text-gray-900 leading-tight">{title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-snug">{desc}</p>
                <p className="text-xs text-gray-500 leading-snug">{est}</p>
            </div>
        </div>
    );
}
