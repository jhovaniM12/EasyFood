import { SUCCESS_ICON } from "@/constants/PaymentSuccess";

export default function PaymentSuccessIcon() {
    return (
        <div className="flex justify-center mt-8 mb-6">
            {/* Outer glow ring */}
            <div className="relative">
                <div className="w-28 h-28 rounded-full bg-[#E53935]/10 flex items-center justify-center animate-pulse">
                    {/* Main red circle */}
                    <div className="w-22 h-22 rounded-full bg-[#E53935] flex items-center justify-center shadow-lg shadow-[#E53935]/40"
                        style={{ width: "5.5rem", height: "5.5rem" }}>
                        {SUCCESS_ICON}
                    </div>
                </div>

                {/* Star badge */}
                <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#E53935] border-2 border-white flex items-center justify-center shadow-md">
                    <span className="text-white text-xs leading-none">★</span>
                </div>
            </div>
        </div>
    );
}
