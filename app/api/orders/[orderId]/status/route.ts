import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/lib/db";
import { getAuthUser } from "@/lib/middleware";

interface RouteParams {
    params: Promise<{ orderId: string }>;
}

// Valid state transitions — enforces the business flow
const VALID_TRANSITIONS: Record<string, string[]> = {
    recibido: ["confirmado", "cancelado"],
    confirmado: ["en_preparacion", "cancelado"],
    en_preparacion: ["listo"],
    listo: ["entregado"],
    entregado: [],
    cancelado: [],
};

const statusSchema = z.object({
    estado: z.enum(["recibido", "confirmado", "en_preparacion", "listo", "entregado", "cancelado"]),
});

export async function PATCH(request: NextRequest, { params }: RouteParams) {
    const auth = getAuthUser(request);
    if ("error" in auth) return auth.error;

    // Only collaborators and admins can update order status
    if (auth.user.rol === "estudiante") {
        return NextResponse.json(
            { error: "Forbidden", message: "No tienes permiso para actualizar el estado de pedidos" },
            { status: 403 }
        );
    }

    const { orderId } = await params;
    const orderIdNum = parseInt(orderId, 10);

    if (isNaN(orderIdNum)) {
        return NextResponse.json(
            { error: "BadRequest", message: "El orderId debe ser un número entero" },
            { status: 400 }
        );
    }

    try {
        const body = await request.json();
        const parsed = statusSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: "BadRequest", message: "Estado inválido", details: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const { estado: newStatus } = parsed.data;

        // Fetch current order state
        const orders = await sql`
      SELECT id_pedido, estado
      FROM public.pedidos
      WHERE id_pedido = ${orderIdNum}
      LIMIT 1
    `;

        if (!orders[0]) {
            return NextResponse.json(
                { error: "NotFound", message: "Pedido no encontrado" },
                { status: 404 }
            );
        }

        const currentStatus = orders[0].estado as string;
        const allowedNext = VALID_TRANSITIONS[currentStatus] ?? [];

        // Enforce valid state machine transitions
        if (!allowedNext.includes(newStatus)) {
            return NextResponse.json(
                {
                    error: "Conflict",
                    message: `No se puede cambiar de "${currentStatus}" a "${newStatus}". Transiciones válidas: [${allowedNext.join(", ") || "ninguna"}]`,
                },
                { status: 409 }
            );
        }

        const [updated] = await sql`
      UPDATE public.pedidos
      SET estado = ${newStatus}
      WHERE id_pedido = ${orderIdNum}
      RETURNING id_pedido AS "orderId", codigo AS "codigoVisual", estado, metodo_pago AS "metodoPago", total_compra::text AS "totalCompra"
    `;

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        console.error("[PATCH /api/orders/[orderId]/status]", error);
        return NextResponse.json(
            { error: "InternalServerError", message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
