"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth/AuthService";

interface AuthUser {
    nombre: string;
    carrera: string;
    codigoInstitucional: string;
    rol: string;
    restauranteId?: number | null;
}

interface AuthContextValue {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (codigo: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Restore session from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("easyfood_user");
        if (stored) setUser(JSON.parse(stored));
        setIsLoading(false);
    }, []);

    const login = async (codigoInstitucional: string, password: string) => {
        const { token, user: loggedUser } = await authService.login(codigoInstitucional, password);
        localStorage.setItem("easyfood_token", token);
        localStorage.setItem("easyfood_user", JSON.stringify(loggedUser));
        setUser(loggedUser);

        // Redirect based on role
        if (loggedUser.rol === "admin" || loggedUser.rol === "colaborador") {
            router.push("/admin/order");
        } else {
            router.push("/home");
        }
    };

    const logout = () => {
        localStorage.removeItem("easyfood_token");
        localStorage.removeItem("easyfood_user");
        setUser(null);
        router.push("/");
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

/** Hook for consuming auth state in any client component. */
export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
}
