"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Box, CircularProgress } from "@mui/material";

interface RouteGuardProps {
    children: ReactNode;
    /** Roles allowed to access this route. If empty, any authenticated user can access. */
    allowedRoles?: string[];
}

export default function RouteGuard({ children, allowedRoles }: RouteGuardProps) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // Wait for AuthContext to finish hydrating from localStorage
        if (isLoading) return;

        if (!isAuthenticated || !user) {
            router.replace("/");
            return;
        }

        // Check role restrictions
        if (allowedRoles && allowedRoles.length > 0) {
            if (!allowedRoles.includes(user.rol)) {
                // Wrong role → redirect to their default page
                if (user.rol === "admin" || user.rol === "colaborador") {
                    router.replace("/admin/order");
                } else {
                    router.replace("/home");
                }
                return;
            }
        }

        setAuthorized(true);
    }, [isLoading, isAuthenticated, user, router, allowedRoles]);

    // Show loading spinner while AuthContext hydrates or before authorization check
    if (isLoading || !authorized) {
        return (
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100dvh",
                bgcolor: "#FDF4ED",
            }}>
                <CircularProgress sx={{ color: "#E53935" }} />
            </Box>
        );
    }

    return <>{children}</>;
}
