"use client";

import { usePathname } from "next/navigation";
import RouteGuard from "@/components/shared/RouteGuard";

// Routes that don't require authentication
const PUBLIC_ROUTES = ["/"];
// Admin routes are handled by their own layout — skip guard here
const ADMIN_PREFIX = "/admin";

export default function MainContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isPublic = PUBLIC_ROUTES.includes(pathname);
    const isAdmin = pathname.startsWith(ADMIN_PREFIX);

    // Public pages (login) and admin pages (have their own guard) render directly
    if (isPublic || isAdmin) {
        return (
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        );
    }

    // All other student routes require authentication
    return (
        <main className="flex-1 overflow-y-auto">
            <RouteGuard allowedRoles={["estudiante"]}>
                {children}
            </RouteGuard>
        </main>
    );
}
