import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getAuthUser } from "@/lib/middleware";

interface RouteParams {
    params: Promise<{ orderId: string }>;
}

// Only orders in these states can be cancelled by the user
const CANCELLABLE_STATES = ["recibido", "confirmado"];

export async function DELETE(request: NextRequest, { params }: RouteParams) {
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
        // Fetch order — must belong to the authenticated user
        const orders = await sql`
      SELECT id_pedido, estado
      FROM public.pedidos
      WHERE id_pedido = ${orderIdNum}
        AND id_usuario = ${auth.user.userId}
      FOR UPDATE
      LIMIT 1
    `;

        if (!orders[0]) {
            return NextResponse.json(
                { error: "NotFound", message: "Pedido no encontrado" },
                { status: 404 }
            );
        }

        const currentStatus = orders[0].estado as string;

        // Block cancellation once the kitchen has started preparing
        if (!CANCELLABLE_STATES.includes(currentStatus)) {
            return NextResponse.json(
                {
                    error: "Conflict",
                    message: `No se puede cancelar un pedido en estado "${currentStatus}". Solo se permite cancelar pedidos en: ${CANCELLABLE_STATES.join(", ")}`,
                },
                { status: 409 }
            );
        }

        // Restore stock for every item in the order
        const items = await sql`
      SELECT id_producto, cantidad
      FROM public.detalle_pedido
      WHERE id_pedido = ${orderIdNum}
    `;

        for (const item of items) {
            await sql`
        UPDATE public.productos
        SET stock = stock + ${item.cantidad}
        WHERE id_producto = ${item.id_producto}
      `;
        }

        // Mark as cancelled (soft delete — preserves order history)
        await sql`
      UPDATE public.pedidos
      SET estado = 'cancelado'
      WHERE id_pedido = ${orderIdNum}
    `;

        return NextResponse.json(
            { message: "Pedido cancelado exitosamente. El stock ha sido restaurado." },
            { status: 200 }
        );
    } catch (error) {
        console.error("[DELETE /api/orders/[orderId]]", error);
        return NextResponse.json(
            { error: "InternalServerError", message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
