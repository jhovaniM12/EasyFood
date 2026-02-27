import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getAuthUser } from "@/lib/middleware";

interface RouteParams {
    params: Promise<{ orderId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const auth = getAuthUser(request);
    if ("error" in auth) return auth.error;

    const { orderId } = await params;
    const orderIdNum = parseInt(orderId, 10);

    if (isNaN(orderIdNum)) {
        return NextResponse.json(
            { error: "BadRequest", message: "El orderId debe ser un número entero" },
            { status: 400 }
        );
    }

    try {
        // Fetch order — ensure it belongs to the authenticated user
        const orders = await sql`
      SELECT
        id_pedido,
        codigo            AS "codigoVisual",
        estado,
        metodo_pago       AS "metodoPago",
        total_compra::text AS total,
        fecha_pedido      AS "fechaPedido"
      FROM public.pedidos
      WHERE id_pedido = ${orderIdNum}
        AND id_usuario = ${auth.user.userId}
      LIMIT 1
    `;

        if (!orders[0]) {
            return NextResponse.json(
                { error: "NotFound", message: "Pedido no encontrado" },
                { status: 404 }
            );
        }

        const order = orders[0];

        // Fetch order items with product details
        const items = await sql`
      SELECT
        pr.nombre                   AS nombre,
        dp.precio_unitario::text    AS "precioUnitario",
        dp.cantidad,
        pr.imagen_url               AS "imagenUrl",
        dp.observaciones
      FROM public.detalle_pedido dp
      JOIN public.productos pr ON pr.id_producto = dp.id_producto
      WHERE dp.id_pedido = ${orderIdNum}
    `;

        // Real queue position: count active orders that arrived before this one
        const queueResult = await sql`
      SELECT COUNT(*)::int AS position
      FROM public.pedidos
      WHERE estado IN ('recibido', 'confirmado', 'en_preparacion')
        AND fecha_pedido < ${order.fechaPedido}
    `;

        const queuePosition = queueResult[0]?.position ?? 0;

        // Estimate time based on real queue position (5 min per order ahead)
        const estimatedMinutes = queuePosition * 5;
        const estimatedTime =
            order.estado === "listo"
                ? "Listo para recoger"
                : order.estado === "entregado"
                    ? "Entregado"
                    : order.estado === "cancelado"
                        ? "Cancelado"
                        : estimatedMinutes === 0
                            ? "Menos de 5 min"
                            : `${estimatedMinutes}-${estimatedMinutes + 5} min`;

        return NextResponse.json(
            {
                codigoVisual: order.codigoVisual,
                estado: order.estado,
                posicionFila: queuePosition,
                tiempoEstimadoEntrega: estimatedTime,
                qrCodeData: `EASYFOOD:${order.codigoVisual}`,
                total: order.total,
                items,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("[GET /api/orders/[orderId]/tracking]", error);
        return NextResponse.json(
            { error: "InternalServerError", message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
