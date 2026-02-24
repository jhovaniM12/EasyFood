"use client";

import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { Bell, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface CartHeaderProps {
    notificationCount?: number;
}

export default function CartHeader({ notificationCount = 1 }: CartHeaderProps) {
    const router = useRouter();

    return (
        <div className="flex items-center justify-between px-2 pt-5 pb-3 bg-[#FDF4ED]">
            {/* Botón atrás */}
            <IconButton onClick={() => router.back()} size="small" aria-label="Volver">
                <ChevronLeft size={24} className="text-gray-800" />
            </IconButton>

            {/* Título */}
            <h1 className="text-lg font-bold text-gray-900">Mi carrito</h1>

            {/* Campana */}
            <IconButton size="small" aria-label="Notificaciones">
                <Badge
                    badgeContent={notificationCount}
                    sx={{
                        "& .MuiBadge-badge": {
                            backgroundColor: "#E53935",
                            color: "#fff",
                            fontSize: "0.6rem",
                            minWidth: "16px",
                            height: "16px",
                        },
                    }}
                >
                    <Bell size={22} className="text-[#E53935]" />
                </Badge>
            </IconButton>
        </div>
    );
}
