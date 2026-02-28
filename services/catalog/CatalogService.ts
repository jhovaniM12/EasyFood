import { apiClient } from "@/services/http";

export interface Product {
    id: number;
    nombre: string;
    descripcion: string;
    precio: string;
    tiempoEspera: string;
    imagenUrl: string | null;
    esPopular: boolean;
    stock: number;
    restaurante: string;
    categoria: string;
}

export interface ProductsResponse {
    data: Product[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

export interface Category {
    id: number;
    nombre: string;
}

export interface Restaurant {
    id: number;
    nombre: string;
    ubicacion: string;
    imagenUrl: string | null;
}

class CatalogService {
    getProducts(params: {
        page?: number;
        limit?: number;
        search?: string;
        restauranteId?: number;
        categoriaId?: number;
    } = {}): Promise<ProductsResponse> {
        const query = new URLSearchParams();
        Object.entries(params).forEach(([key, val]) => {
            if (val !== undefined && val !== null && val !== "") query.set(key, String(val));
        });
        return apiClient.get<ProductsResponse>(`/products?${query}`);
    }

    getCategories = (): Promise<Category[]> => apiClient.get<Category[]>("/categories");
    getRestaurants = (): Promise<Restaurant[]> => apiClient.get<Restaurant[]>("/restaurants");
}

export const catalogService = new CatalogService();
