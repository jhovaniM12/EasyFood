const API_BASE = "/api";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

interface RequestOptions {
    method?: HttpMethod;
    body?: unknown;
}

class ApiClient {
    private getToken(): string | null {
        if (typeof window === "undefined") return null;
        return localStorage.getItem("easyfood_token");
    }

    private buildHeaders(): HeadersInit {
        const token = this.getToken();
        return {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };
    }

    async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const { method = "GET", body } = options;

        const res = await fetch(`${API_BASE}${endpoint}`, {
            method,
            headers: this.buildHeaders(),
            ...(body ? { body: JSON.stringify(body) } : {}),
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({ message: "Error desconocido" }));
            throw new Error(error.message ?? `HTTP ${res.status}`);
        }

        return res.json() as Promise<T>;
    }

    get = <T>(endpoint: string) => this.request<T>(endpoint);
    post = <T>(endpoint: string, body: unknown) => this.request<T>(endpoint, { method: "POST", body });
    patch = <T>(endpoint: string, body: unknown) => this.request<T>(endpoint, { method: "PATCH", body });
    delete = <T>(endpoint: string) => this.request<T>(endpoint, { method: "DELETE" });
}

// Singleton — shared across all services
export const apiClient = new ApiClient();
