import { apiClient } from "@/services/http";

interface LoginResponse {
    token: string;
    user: {
        nombre: string;
        carrera: string;
        codigoInstitucional: string;
        rol: string;
    };
}

class AuthService {
    async login(codigoInstitucional: string, password: string): Promise<LoginResponse> {
        return apiClient.post<LoginResponse>("/auth/login", { codigoInstitucional, password });
    }
}

export const authService = new AuthService();
