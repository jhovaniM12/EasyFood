import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/lib/db";
import { getAuthUser } from "@/lib/middleware";

// --- Input schema ---
const orderItemSchema = z.object({
    productoId: z.number().int().positive(),
    cantidad: z.number().int().positive(),
    observaciones: z.string().nullable().optional(),
});

const orderSchema = z.object({
    puntoRecogidaId: z.number().int().positive(),
    metodoPago: z.enum(["nequi", "pse", "pago_local"]),
    codigoDescuento: z.string().nullable().optional(),
    items: z.array(orderItemSchema).min(1, "El pedido debe tener al menos un producto"),
});

/** Generates a unique visual code like EF-482931 */
function generateOrderCode(): string {
    const digits = Math.floor(100000 + Math.random() * 900000);
    return `EF-${digits}`;
}

// ── GET /api/orders — Order history for the authenticated user ──────────────
export async function GET(request: NextRequest) {
    const auth = getAuthUser(request);
    if ("error" in auth) return auth.error;

    try {
        const rows = await sql`
      SELECT
        p.id_pedido             AS "orderId",
        p.codigo_visual         AS "codigoVisual",
        p.estado,
        p.metodo_pago           AS "metodoPago",
        p.total_compra::text    AS "totalCompra",
        p.fecha_pedido          AS "fechaPedido",
        COALESCE(
          json_agg(
            json_build_object(
              'nombre',    pr.nombre,
              'cantidad',  dp.cantidad,
              'imagenUrl', pr.imagen_url
            )
          ) FILTER (WHERE dp.id_detalle IS NOT NULL),
          '[]'
        ) AS items
      FROM public.pedidos p
      LEFT JOIN public.detalle_pedido dp ON dp.id_pedido = p.id_pedido
      LEFT JOIN public.productos pr     ON pr.id_producto = dp.id_producto
      WHERE p.id_usuario = ${auth.user.userId}
      GROUP BY p.id_pedido
      ORDER BY p.fecha_pedido DESC
    `;

        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        console.error("[GET /api/orders]", error);
        return NextResponse.json(
            { error: "InternalServerError", message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}

// ── POST /api/orders — Create a new order with atomic stock check ─────────────
export async function POST(request: NextRequest) {
    const auth = getAuthUser(request);
    if ("error" in auth) return auth.error;

    try {
        const body = await request.json();
        const parsed = orderSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    error: "BadRequest",
                    message: "Datos de entrada inválidos",
                    details: parsed.error.flatten(),
                },
                { status: 400 }
            );
        }

        const { puntoRecogidaId, metodoPago, codigoDescuento, items } = parsed.data;
        const productIds = items.map((i) => i.productoId);

        // 1. Lock rows and fetch current price + stock (FOR UPDATE prevents race conditions)
        const products = await sql`
      SELECT id_producto, nombre, precio, stock
      FROM public.productos
      WHERE id_producto = ANY(${productIds}::int[])
        AND disponible = true
      FOR UPDATE
    `;

        if (products.length !== productIds.length) {
            return NextResponse.json(
                { error: "BadRequest", message: "Uno o más productos no están disponibles" },
                { status: 400 }
            );
        }

        // 2. Validate stock for every item in the order
        const productMap = new Map(
            products.map((p) => [p.id_producto, { nombre: p.nombre, precio: Number(p.precio), stock: p.stock }])
        );

        for (const item of items) {
            const product = productMap.get(item.productoId)!;
            if (product.stock < item.cantidad) {
                return NextResponse.json(
                    {
                        error: "Conflict",
                        message: `Stock insuficiente para "${product.nombre}". Disponibles: ${product.stock}`,
                    },
                    { status: 409 }
                );
            }
        }

        // 3. Calculate total from DB prices (never trust client-side prices)
        const totalCompra = items.reduce((sum, item) => {
            const unitPrice = productMap.get(item.productoId)!.precio;
            return sum + unitPrice * item.cantidad;
        }, 0);

        // 4. Insert the order
        const codigoVisual = generateOrderCode();

        const [newOrder] = await sql`
      INSERT INTO public.pedidos
        (codigo_visual, id_usuario, id_punto_recogida, metodo_pago, total_compra, codigo_descuento_aplicado)
      VALUES
        (
          ${codigoVisual},
          ${auth.user.userId},
          ${puntoRecogidaId},
          ${metodoPago},
          ${totalCompra},
          ${codigoDescuento ?? null}
        )
      RETURNING id_pedido, codigo_visual, estado, metodo_pago, total_compra::text
    `;

        // 5. Insert detail rows and decrement stock atomically for each item
        for (const item of items) {
            const unitPrice = productMap.get(item.productoId)!.precio;

            await sql`
        INSERT INTO public.detalle_pedido
          (id_pedido, id_producto, cantidad, precio_unitario, observaciones)
        VALUES
          (${newOrder.id_pedido}, ${item.productoId}, ${item.cantidad}, ${unitPrice}, ${item.observaciones ?? null})
      `;

            await sql`
        UPDATE public.productos
        SET stock = stock - ${item.cantidad}
        WHERE id_producto = ${item.productoId}
      `;
        }

        return NextResponse.json(
            {
                orderId: newOrder.id_pedido,
                codigoVisual: newOrder.codigo_visual,
                estado: newOrder.estado,
                metodoPago: newOrder.metodo_pago,
                totalCompra: newOrder.total_compra,
                mensaje: "Pedido creado exitosamente",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("[POST /api/orders]", error);
        return NextResponse.json(
            { error: "InternalServerError", message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
