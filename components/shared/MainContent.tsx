"use client";

import { usePathname } from "next/navigation";

const NO_NAV_ROUTES = ["/"];

export default function MainContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hasNav = !NO_NAV_ROUTES.includes(pathname);

    return (
        <main className="flex-1 overflow-y-auto">
            {children}
        </main>
    );
}
