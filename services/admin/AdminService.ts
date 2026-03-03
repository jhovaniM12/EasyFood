import { apiClient } from "@/services/http";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface AdminProduct {
    id: number;
    nombre: string;
    descripcion: string | null;
    precio: string;
    tiempoEspera: string | null;
    imagenUrl: string | null;
    esPopular: boolean;
    disponible: boolean;
    stock: number;
    categoriaId: number | null;
    categoria: string | null;
}

export interface AdminOrder {
    orderId: number;
    codigoVisual: string;
    estado: string;
    metodoPago: string;
    totalCompra: string;
    fechaPedido: string;
    cliente: string;
    codigoCliente: string;
    items: {
        name: string;
        quantity: number;
        image: string | null;
        precio: string;
    }[];
}

export interface AdminProfile {
    userId: number;
    nombre: string;
    codigoInstitucional: string;
    correo: string;
    fotoUrl: string | null;
    rol: string;
    restauranteId: number | null;
    restauranteNombre: string | null;
    restauranteUbicacion: string | null;
}

export interface CreateProductPayload {
    nombre: string;
    descripcion?: string;
    precio: number;
    tiempoEspera?: string;
    imagenUrl?: string;
    categoriaId?: number;
    stock?: number;
}

export interface UpdateProductPayload {
    nombre?: string;
    descripcion?: string;
    precio?: number;
    tiempoEspera?: string;
    imagenUrl?: string;
    disponible?: boolean;
    stock?: number;
    categoriaId?: number;
}

// ─── Service ────────────────────────────────────────────────────────────────

class AdminService {
    // ── Inventory ───────────────────────────────────────────────────────────
    getProducts = (): Promise<{ data: AdminProduct[] }> =>
        apiClient.get<{ data: AdminProduct[] }>("/admin/products");

    createProduct = (payload: CreateProductPayload): Promise<{ data: AdminProduct }> =>
        apiClient.post<{ data: AdminProduct }>("/admin/products", payload);

    updateProduct = (id: number, payload: UpdateProductPayload): Promise<{ data: AdminProduct }> =>
        apiClient.patch<{ data: AdminProduct }>(`/admin/products/${id}`, payload);

    // ── Orders ──────────────────────────────────────────────────────────────
    getOrders = (status?: string): Promise<{ data: AdminOrder[] }> => {
        const query = status ? `?status=${status}` : "";
        return apiClient.get<{ data: AdminOrder[] }>(`/admin/orders${query}`);
    };

    updateOrderStatus = (orderId: number, estado: string): Promise<unknown> =>
        apiClient.patch(`/orders/${orderId}/status`, { estado });

    // ── Profile ─────────────────────────────────────────────────────────────
    getProfile = (): Promise<{ data: AdminProfile }> =>
        apiClient.get<{ data: AdminProfile }>("/admin/profile");
}

export const adminService = new AdminService();
