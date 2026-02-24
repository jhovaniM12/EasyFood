"use client";

import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { Bell } from "lucide-react";

interface HomeHeaderProps {
    name?: string;
    greeting?: string;
    notificationCount?: number;
}

export default function HomeHeader({
    name = "Mateo",
    greeting = "Buenos días",
    notificationCount = 1,
}: HomeHeaderProps) {
    return (
        <div className="flex items-center justify-between px-4 pt-5 pb-2 bg-[#FDF4ED]">
            {/* Saludo */}
            <div>
                <p className="text-sm text-gray-500">{greeting}</p>
                <h1 className="text-xl font-bold text-[#E53935] leading-tight">
                    {name} 👋
                </h1>
            </div>

            {/* Iconos derecha */}
            <div className="flex items-center gap-1">
                {/* Campana con Badge de MUI */}
                <IconButton aria-label="Notificaciones" size="small">
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
                        <Bell size={22} className="text-gray-700" />
                    </Badge>
                </IconButton>

                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden border-2 border-gray-200 flex items-center justify-center ml-1">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500">
                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
