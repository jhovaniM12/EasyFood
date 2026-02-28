import { apiClient } from "@/services/http";

export interface OrderItem {
    productoId: number;
    cantidad: number;
    observaciones?: string | null;
}

export interface CreateOrderPayload {
    puntoRecogidaId: number;
    metodoPago: "nequi" | "pse" | "pago_local";
    codigoDescuento?: string | null;
    items: OrderItem[];
}

export interface Order {
    orderId: number;
    codigoVisual: string;
    estado: string;
    metodoPago: string;
    totalCompra: string;
    fechaPedido?: string;
    items?: Array<{
        nombre: string;
        cantidad: number;
        imagenUrl: string | null;
    }>;
}

export interface TrackingInfo {
    codigoVisual: string;
    estado: string;
    posicionFila: number;
    tiempoEstimadoEntrega: string;
    qrCodeData: string;
    total: string;
    items: Array<{
        nombre: string;
        precioUnitario: string;
        cantidad: number;
        imagenUrl: string | null;
        observaciones: string | null;
    }>;
}

class OrdersService {
    getOrders = (): Promise<Order[]> => apiClient.get<Order[]>("/orders");
    getActiveOrders = (): Promise<Order[]> => apiClient.get<Order[]>("/orders/active");
    createOrder = (payload: CreateOrderPayload): Promise<Order> => apiClient.post<Order>("/orders", payload);
    cancelOrder = (orderId: number): Promise<{ message: string }> => apiClient.delete(`/orders/${orderId}`);
    getTracking = (orderId: number): Promise<TrackingInfo> => apiClient.get<TrackingInfo>(`/orders/${orderId}/tracking`);
    updateStatus = (orderId: number, estado: string): Promise<Order> =>
        apiClient.patch<Order>(`/orders/${orderId}/status`, { estado });
}

export const ordersService = new OrdersService();
